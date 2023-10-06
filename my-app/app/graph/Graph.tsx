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
import {
  nodes as nodesData,
  dependencyMap,
  getReactFlowNodes,
  getReactFlowEdges,
  getReactFlowLayoutEdges,
  getReactFlowLayoutNodes,
} from "./data";
import JobNode from "./JobNode";

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
    node.targetPosition = Position.Right;
    node.sourcePosition = Position.Left;

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
    () => getReactFlowLayoutNodes(nodesData),
    []
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

  console.log(mergedNodes);

  const [nodes, setNodes] = React.useState(mergedNodes);
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
