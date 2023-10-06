"use client";
import React from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  Edge,
  EdgeMarker,
  MarkerType,
  Node,
  NodeChange,
  NodeMouseHandler,
  NodeSelectionChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  OnSelectionChangeFunc,
  Panel,
  Position,
  ReactFlowState,
  useEdgesState,
  useNodesState,
  useStore,
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
  nodeSelectOptions,
  jobNodeSelectOptions,
} from "./data";
import JobNode from "./JobNode";
import VarNode from "./VarNode";
import Select from "react-select";
import ContextMenu, { ContextMenuProps } from "./ContextMenu";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  dagreGraph.setGraph({ rankdir: "LR" });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: node.style!.width!,
      height: node.style!.height!,
    });
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
    const size = {
      width: node.style!.width! as number,
      height: node.style!.height! as number,
    };

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - size.width / 2,
      y: nodeWithPosition.y - size.height / 2,
    };
    return {
      ...acc,
      [cur.id]: node,
    };
  }, {} as Record<string, Node>);
};

const Graph: React.FC = () => {
  const [showVars, setShowVars] = React.useState(false);
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

  const [nodes, setNodes, onNodesChange] = useNodesState(mergedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = React.useState<undefined | Node>();

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

  const { unselectAll } = useStore((state: ReactFlowState) => {
    return {
      unselectAll: state.unselectNodesAndEdges,
    };
  });

  React.useEffect(() => {
    unselectAll();
    setSelectedNode(undefined);
  }, [showVars, unselectAll]);

  const nodesWithHighlight = React.useMemo(() => {
    if (selectedNode === undefined) return nodes;
    const id = selectedNode.parentNode || selectedNode.id;
    const connected: Record<string, boolean> = [
      ...(selectedNode.parentNode ? [selectedNode.parentNode] : []),
      ...dependencyMap[id].dependents.filter((dependentJobId) =>
        dependencyMap[dependentJobId].dependencyVars.find((v) =>
          v.includes(selectedNode.id)
        )
      ),
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
      const { target, source } = edge;
      if (
        source === selectedNode.id ||
        (selectedNode.parentNode && target === selectedNode.parentNode)
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

  const nodesNoVars = React.useMemo(() => {
    if (showVars) return [];
    const layouted = getLayoutedElements(
      getReactFlowLayoutNodes(nodesWithHighlight.filter((n) => !n.parentNode)),
      layoutEdges
    );
    return Object.values(layouted).map((node) => ({
      ...node,
      data: { ...node.data, hideVars: true },
    }));
  }, [layoutEdges, nodesWithHighlight, showVars]);

  const edgesNoVar = React.useMemo(() => {
    if (showVars) return layoutEdges;
    if (selectedNode === undefined) return layoutEdges;
    return layoutEdges.map((edge) => {
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
  }, [layoutEdges, selectedNode, showVars]);

  const nodeTypes = React.useMemo(() => ({ job: JobNode, var: VarNode }), []);

  const [menu, setMenu] = React.useState<ContextMenuProps | null>(null);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const onNodeContextMenu: NodeMouseHandler = React.useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();

      if (!ref.current) return;

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node!.id,
        top: event.clientY < pane.height - 200 ? event.clientY : undefined,
        left: event.clientX < pane.width - 200 ? event.clientX : undefined,
        right:
          event.clientX >= pane.width - 200
            ? pane.width - event.clientX
            : undefined,
        bottom:
          event.clientY >= pane.height - 200
            ? pane.height - event.clientY
            : undefined,
      });
    },
    [setMenu]
  );
  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = React.useCallback(() => setMenu(null), [setMenu]);

  // console.log({
  //   nodes: showVars ? nodesWithHighlight : nodesNoVars,
  //   edges: showVars ? edgesWithHighlight : edgesNoVar,
  // });

  return (
    <ReactFlow
      ref={ref}
      nodes={showVars ? nodesWithHighlight : nodesNoVars}
      edges={showVars ? edgesWithHighlight : edgesNoVar}
      onSelectionChange={onSelectionChange}
      onEdgesChange={onEdgesChange}
      onNodesChange={onNodesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      onNodeContextMenu={onNodeContextMenu}
      onPaneClick={onPaneClick}
      // zoomOnDoubleClick={false}
      // zoomOnPinch={false}
      zoomOnScroll={false}
      draggable={false}
      // panOnDrag={false}
      nodesConnectable={false}
      fitView
      minZoom={0.1}
      style={{ backgroundColor: "#f7f7f7" }}
      attributionPosition="top-right"
    >
      <Controls />
      <Panel position="top-center" style={{ zIndex: 99, margin: 0 }}>
        <div className="w-screen h-[60px] bg-white rounded flex flex-row items-center justify-center space-x-8">
          <button
            className="bg-[#e7e7e7] rounded-full h-[40px] px-[12px] font-[13px] font-[600]"
            onClick={() => {
              setShowVars((prev) => !prev);
            }}
          >
            {showVars ? "Hide" : "Show"} Vars
          </button>
          <div className="flex flex-row space-x-4 items-center">
            <div>Search:</div>
            <div className="w-[200px]">
              <Select
                options={showVars ? nodeSelectOptions : jobNodeSelectOptions}
                isSearchable
                isClearable
                inputId="node-select-input"
                value={
                  selectedNode
                    ? {
                        value: selectedNode.id,
                        label: selectedNode.data.label,
                      }
                    : undefined
                }
                onChange={(selection) => {
                  if (selection === null) {
                    if (!selectedNode) return;
                    onNodesChange([
                      {
                        id: selectedNode.id,
                        type: "select",
                        selected: false,
                      },
                    ]);
                  } else {
                    if (selectedNode) {
                      onNodesChange([
                        {
                          id: selectedNode!.id,
                          type: "select",
                          selected: false,
                        },
                        {
                          id: selection.value,
                          type: "select",
                          selected: true,
                        },
                      ]);
                    } else {
                      onNodesChange([
                        {
                          id: selection.value,
                          type: "select",
                          selected: true,
                        },
                      ]);
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </Panel>
      {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
    </ReactFlow>
  );
};

export default Graph;
