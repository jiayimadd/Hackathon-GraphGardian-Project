import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, applyEdgeChanges, applyNodeChanges, Background } from 'reactflow';
import 'reactflow/dist/style.css';

import initialNodes from './nodes.jsx';
import initialEdges from './edges.jsx';
import parentEdges from './parentEdges.jsx';

const rfStyle = {
  backgroundColor: '#D0C0F7',
};

export default function App() {

  const isChildNode = (node) => node.parentNode;

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [hidden, setHidden] = useState(true);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  useEffect(() => {
    if (hidden) {
      const childNodeIds = nodes.filter(isChildNode).map((node) => node.id);
      const filteredNodes = nodes.filter((node) => !childNodeIds.includes(node.id));
      setNodes(filteredNodes);
    } else {
      setNodes(initialNodes);
    }
  }, [hidden]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={hidden ? parentEdges : edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        style={rfStyle}
        attributionPosition="top-right"
      >
        <Background />
        <Controls />

        <div style={{ position: 'absolute', left: 10, top: 10, zIndex: 4 }}>
          <div>
            <label htmlFor="ishidden">
              showVariables
              <input
                id="ishidden"
                type="checkbox"
                checked={!hidden}
                onChange={(event) => setHidden(!event.target.checked)}
                className="react-flow__ishidden"
              />
            </label>
          </div>
        </div>
      </ReactFlow>
    </div>
  );
}