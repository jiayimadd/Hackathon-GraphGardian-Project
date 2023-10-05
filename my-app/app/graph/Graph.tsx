"use client";
import React from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Edge,
  Node,
  NodeMouseHandler,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";
import { nodes as nodesData, dependencyMap } from "./data";
import JobNode from "./JobNode";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 200;

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  dagreGraph.setGraph({ rankdir: "LR" });

  const visited = nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = Position.Left;
    node.sourcePosition = Position.Right;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const Graph: React.FC = () => {
  const initialNodes: Node[] = React.useMemo(() => {
    return nodesData.map(
      (node) =>
        ({
          ...node,
          position: { x: 0, y: 0 },
          sourcePosition: "left",
          targetPosition: "right",
          style: node.parentNode
            ? { backgroundColor: "rgba(0, 0, 0, 0.1)" }
            : {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                width: 200,
                height: 200,
              },
        } as Node)
    );
  }, []);

  const initialEdges = React.useMemo(() => {
    return Object.entries(dependencyMap).reduce((acc, cur) => {
      const [jobId, dependencyMap] = cur;
      return [
        ...acc,
        ...dependencyMap.dependencyVars.map((varId) => ({
          id: `${varId}-${jobId}`,
          source: varId,
          target: jobId,
          animated: false,
        })),
      ];
    }, [] as Edge[]);
  }, []);
  const [nodes, setNodes] = React.useState(initialNodes);
  const [edges, setEdges] = React.useState(initialEdges);

  const onNodesChange: OnNodesChange = React.useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = React.useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect: OnConnect = React.useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onNodeClick: NodeMouseHandler = React.useCallback((event, node) => {
    console.log({
      event,
      node,
    });
  }, []);

  const nodeTypes = React.useMemo(() => ({ job: JobNode }), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodeClick={onNodeClick}
      onEdgesChange={onEdgesChange}
      onNodesChange={onNodesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      zoomOnDoubleClick={false}
      zoomOnPinch={false}
      zoomOnScroll={false}
      draggable={false}
      panOnDrag={false}
      nodesConnectable={false}
      fitView
      // style={{
      //   backgroundColor: "#D0C0F7",
      // }}
      attributionPosition="top-right"
    >
      <Background />
    </ReactFlow>
  );
};

export default Graph;
