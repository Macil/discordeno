import React from 'react'
import ReactFlow, { Background, Controls, Edge, Position } from 'reactflow'
import 'reactflow/dist/style.css'

export const defaultNodeOptions = {
  targetPosition: Position.Top,
  sourcePosition: Position.Bottom,
  draggable: false,
  style: { width: '65px', height: '50px', padding: '10px 0' },
}

const genServer = (x: number, id: number) => {
  const server = [
    {
      id: `s${id + 1}`,
      data: { label: `Server ${id}` },
      position: { x: x, y: 100 },
      ...defaultNodeOptions,
    },
  ]

  for (let i = 0; i < 3; i++) {
    console.log(i == 2 ? i : 50)
    server.push(
      ...[
        {
          id: `w${id * 50 + (i == 2 ? 49 : i) + 1}`,
          data: { label: `Worker w${id * 50 + (i == 2 ? 49 : i) + 1}` },
          position: { x: x - 75 + 75 * i, y: 200 },
          ...defaultNodeOptions,
        },
        {
          id: `w${id * 50 + (i == 2 ? 49 : i) + 1}s`,
          data: {
            label: `Shard ${id * 500 + (i == 2 ? 49 : i) * 10}-${
              id * 500 + (i == 2 ? 49 : i) * 10 + 9
            }`,
          },
          position: { x: x - 75 + 75 * i, y: 300 },
          ...defaultNodeOptions,
        },
      ],
    )
  }

  return server
}

const nodes = [
  {
    id: 'gwm',
    data: { label: 'Gateway Manager' },
    position: { x: 0, y: 0 },
    type: 'input',
    ...defaultNodeOptions,
  },
  ...genServer(-250, 0),
  ...genServer(0, 1),
  ...genServer(250, 9),
  {
    id: 'baseLineNodeText-6',
    type: 'baseLineNodeText',
    position: { x: -40, y: 100 },
    data: {
      label: '...............',
    },
  },
]

const edges: Edge<any>[] = [
  { id: 'gwm-s1', source: 'gwm', target: 's1', type: 'step' },
  { id: 'gwm-s2', source: 'gwm', target: 's2', type: 'step' },
  { id: 'gwm-s10', source: 'gwm', target: 's10', type: 'step' },
  { id: 's1-w1', source: 's1', target: 'w1', type: 'step' },
  { id: 's1-w2', source: 's1', target: 'w2', type: 'step' },
  { id: 's1-w50', source: 's1', target: 'w50', type: 'step' },
  { id: 's2-w51', source: 's2', target: 'w51', type: 'step' },
  { id: 's2-w52', source: 's2', target: 'w52', type: 'step' },
  { id: 's2-w100', source: 's2', target: 'w100', type: 'step' },
  { id: 's10-w451', source: 's10', target: 'w451', type: 'step' },
  { id: 's10-w452', source: 's10', target: 'w452', type: 'step' },
  { id: 's10-w500', source: 's10', target: 'w500', type: 'step' },
  { id: 'w1-w1s', source: 'w1', target: 'w1s', type: 'step' },
  { id: 'w2-w2s', source: 'w2', target: 'w2s', type: 'step' },
  { id: 'w50-w50s', source: 'w50', target: 'w50s', type: 'step' },
  { id: 'w51-w51s', source: 'w51', target: 'w51s', type: 'step' },
  { id: 'w52-w52s', source: 'w52', target: 'w52s', type: 'step' },
  { id: 'w100-w100s', source: 'w100', target: 'w100s', type: 'step' },
  { id: 'w451-w451s', source: 'w451', target: 'w451s', type: 'step' },
  { id: 'w452-w452s', source: 'w452', target: 'w452s', type: 'step' },
  { id: 'w500-w500s', source: 'w500', target: 'w500s', type: 'step' },
]

function Flow() {
  return (
    <div style={{ height: '40vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={{
          baseLineNodeText: n => (
            <div
              style={{
                textAlign: 'center',
                width: '400px',
              }}
            >
              <h3>{n.data.label}</h3>
            </div>
          ),
        }}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default Flow
