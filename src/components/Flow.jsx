import React from 'react'
import { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  ConnectionLineType,
} from 'reactflow';

import dagre from 'dagre';
import { initialNodes, initialEdges } from '../nodes-edges.js';

import 'reactflow/dist/style.css';
import './Flow.css'

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = 'TB', graphAlign = 'UL') => {
  dagreGraph.setGraph({ rankdir: direction, align: graphAlign });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

function Flow() {
  const [nodes, setNodes] = useState(layoutedNodes);
  const [edges, setEdges] = useState(layoutedEdges);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  //Кнопка добавления новых элементов
  const yPos = useRef(0);

  const addNode = useCallback(() => {
    yPos.current += 50;

    setNodes((nodes) => {
      let maxId = nodes.length;
      return [
        ...nodes,
        {
          id: maxId + 1,
          position: { x: 100, y: yPos.current },
          data: { label: "Новый элемент" },
          width: nodeWidth,
          height: nodeHeight
        }
      ];
    
    });
  }, []);

  const onConnect = useCallback((edges) => setEdges((eds) => addEdge({ ...edges, type: ConnectionLineType.Step }, eds)), []);

    return (
        <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        >
        <MiniMap />
        <Controls />
        <Background />
        <button onClick={addNode}>Add</button>
        </ReactFlow>
    );
}

export default Flow
