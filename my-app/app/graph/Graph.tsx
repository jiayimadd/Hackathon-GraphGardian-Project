"use client";
import React from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Edge,
  EdgeMarker,
  MarkerType,
  Node,
  NodeMouseHandler,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  OnSelectionChangeFunc,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";
import {
  nodes as nodesData,
  dependencyMap,
  getReactFlowNodes,
  getReactFlowEdges,
  getReactFlowLayoutEdges,
  getReactFlowLayoutNodes,
} from "./data";
import JobNode from "./JobNode";
import VarNode from "./VarNode";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 200;

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  dagreGraph.setGraph({ rankdir: "LR" });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return nodes.reduce((acc, cur) => {
    const node = { ...cur };
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = Position.Left;
    node.sourcePosition = Position.Right;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
    return {
      ...acc,
      [cur.id]: node,
    };
  }, {} as Record<string, Node>);
};

const Graph: React.FC = () => {
  const initialNodes: Node[] = React.useMemo(
    () => getReactFlowNodes(nodesData),
    []
  );
  const initialEdges = React.useMemo(
    () => getReactFlowEdges(dependencyMap),
    []
  );

  const layoutNodes = React.useMemo(
    () => initialNodes.filter((node) => !node.parentNode),
    [initialNodes]
  );
  const layoutEdges = React.useMemo(
    () => getReactFlowLayoutEdges(dependencyMap),
    []
  );

  const layoutedNodes = React.useMemo(
    () => getLayoutedElements(layoutNodes, layoutEdges),
    [layoutNodes, layoutEdges]
  );

  const mergedNodes = React.useMemo(() => {
    let merged: Node[] = [];

    for (const n of initialNodes) {
      if (layoutedNodes[n.id]) {
        merged.push(layoutedNodes[n.id]);
      } else {
        merged.push(n);
      }
    }
    return merged;
  }, [initialNodes, layoutedNodes]);

  const [nodes, setNodes] = React.useState(mergedNodes);
  const [edges, setEdges] = React.useState(initialEdges);
  const [selectedNode, setSelectedNode] = React.useState<undefined | Node>();

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

  const onSelectionChange: OnSelectionChangeFunc = React.useCallback(
    ({ nodes, edges }) => {
      if (nodes.length > 0) {
        setSelectedNode(nodes[0]);
      } else {
        setSelectedNode(undefined);
      }
    },
    []
  );

  const nodesWithHighlight = React.useMemo(() => {
    if (selectedNode === undefined) return nodes;
    const id = selectedNode.parentNode || selectedNode.id;
    const connected: Record<string, boolean> = [
      ...(selectedNode.parentNode ? [selectedNode.parentNode] : []),
      ...dependencyMap[id].dependents,
      ...dependencyMap[id].dependencyVars,
      ...dependencyMap[id].dependencyJobs,
    ].reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: true,
      }),
      {}
    );
    return nodes.map((node) => {
      if (connected[node.id]) {
        return { ...node, data: { ...node.data, highlighted: true } };
      }
      return node;
    });
  }, [selectedNode, nodes]);

  const edgesWithHighlight = React.useMemo(() => {
    if (selectedNode === undefined) return edges;
    return edges.map((edge) => {
      console.log(
        edge.id,
        selectedNode.id,
        selectedNode.parentNode,
        edge.id.includes(selectedNode.id) ||
          (selectedNode.parentNode && edge.id.includes(selectedNode.parentNode))
      );
      if (
        edge.id.includes(selectedNode.id) ||
        (selectedNode.parentNode && edge.id.includes(selectedNode.parentNode))
      ) {
        return {
          ...edge,
          style: { ...edge.style, stroke: "#00838a", strokeWidth: 2 },
          markerEnd: {
            ...(edge.markerEnd as EdgeMarker),
            color: "#00838a",
            width: 20,
            height: 20,
          },
          zIndex: 99,
        };
      }
      return edge;
    });
  }, [selectedNode, edges]);

  const nodeTypes = React.useMemo(() => ({ job: JobNode, var: VarNode }), []);

  return (
    <ReactFlow
      nodes={nodesWithHighlight}
      edges={edgesWithHighlight}
      onSelectionChange={onSelectionChange}
      onEdgesChange={onEdgesChange}
      onNodesChange={onNodesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      // zoomOnDoubleClick={false}
      // zoomOnPinch={false}
      zoomOnScroll={false}
      draggable={false}
      // panOnDrag={false}
      nodesConnectable={false}
      fitView
      style={{ backgroundColor: "#f7f7f7" }}
      attributionPosition="top-right"
    ></ReactFlow>
  );
};

export default Graph;
