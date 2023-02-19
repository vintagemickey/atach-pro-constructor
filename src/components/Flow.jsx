import React from 'react'
import { useCallback, useRef } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
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
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.Step }, eds)
      ),
    []
  );
  
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  //Кнопка добавления новых элементов
  const yPos = useRef(0);

  const addNode = useCallback(() => {
    yPos.current += 50;

    setNodes((layoutedNodes) => {
      return [
        ...layoutedNodes,
        {
          id: Math.random(),
          position: { x: 100, y: yPos.current },
          data: { label: "Новый элемент" },
          width: nodeWidth,
          height: nodeHeight
        }
      ];
    });
  }, []);

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
