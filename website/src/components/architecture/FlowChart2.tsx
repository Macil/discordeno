import React from 'react'
import { type Edge, type Node, Position } from 'reactflow'
import 'reactflow/dist/style.css'
import BaseFlowChart, {
  defaultGroupOptions,
  defaultNodeOptions,
  multiplier,
} from './BaseFlowChart'

const initialNodes: Node[] = [
  {
    id: 'discordGateway',
    type: 'input',
    position: { x: 0 * multiplier, y: 0 },
    data: { label: 'Discord Gateway' },
    ...defaultNodeOptions,
  },
  {
    id: 'baseLineNode-1',
    type: 'baseLineNode',
    position: { x: 0.85 * multiplier, y: 170 },
    data: {},
  },
  {
    id: 'baseLineNode-2',
    type: 'baseLineNode',
    position: { x: 0.85 * multiplier, y: -130 },
    data: {},
  },
  {
    id: 'baseLineNode-3',
    type: 'baseLineNode',
    position: { x: 3.75 * multiplier, y: 170 },
    data: {},
  },
  {
    id: 'baseLineNode-4',
    type: 'baseLineNode',
    position: { x: 3.75 * multiplier, y: -130 },
    data: {},
  },
  {
    id: 'baseLineNodeText-1',
    type: 'baseLineNodeText',
    position: { x: 0 * multiplier, y: -130 },
    data: { label: 'Discord' },
  },
  {
    id: 'baseLineNodeText-2',
    type: 'baseLineNodeText',
    position: { x: 2 * multiplier, y: -130 },
    data: { label: 'Gateway' },
  },
  {
    id: 'baseLineNodeText-3',
    type: 'baseLineNodeText',
    position: { x: 4 * multiplier, y: -130 },
    data: { label: 'Bot' },
  },
  {
    id: 'gatewayManager',
    type: 'input',
    position: { x: 2.0625 * multiplier, y: -80 },
    data: { label: 'Gateway Manager' },
    ...defaultNodeOptions,
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
  },
  {
    id: 'shard-1',
    type: 'output',
    position: { x: 1.25 * multiplier, y: -20 },
    data: { label: 'Shard-1' },
    style: { width: `${multiplier * 2}px`, height: '80px' },
    ...defaultGroupOptions,
  },
  {
    id: 'shard-1-socket',
    position: { x: 0.125 * multiplier, y: 20 },
    data: { label: 'webSocket' },
    ...defaultNodeOptions,
    parentNode: 'shard-1',
    extent: 'parent',
  },
  {
    id: 'shard-1-handleMessage',
    position: { x: 1.125 * multiplier, y: 20 },
    data: { label: 'HandleMessage' },
    ...defaultNodeOptions,
    parentNode: 'shard-1',
    extent: 'parent',
  },
  {
    id: 'shard-2',
    type: 'output',
    position: { x: 1.375 * multiplier, y: 0 },
    data: { label: 'Shard-2' },
    style: { width: `${multiplier * 2}px`, height: '80px' },
    ...defaultGroupOptions,
  },
  {
    id: 'shard-2-socket',
    position: { x: 0.125 * multiplier, y: 20 },
    data: { label: 'webSocket' },
    ...defaultNodeOptions,
    parentNode: 'shard-2',
    extent: 'parent',
  },
  {
    id: 'shard-2-handleMessage',
    position: { x: 1.125 * multiplier, y: 20 },
    data: { label: 'HandleMessage' },
    ...defaultNodeOptions,
    parentNode: 'shard-2',
    extent: 'parent',
  },
  {
    id: 'shard-3',
    type: 'output',
    position: { x: 1.5 * multiplier, y: 20 },
    data: { label: 'Shard-3' },
    style: { width: `${multiplier * 2}px`, height: '80px' },
    ...defaultGroupOptions,
  },
  {
    id: 'shard-3-socket',
    position: { x: 0.125 * multiplier, y: 20 },
    data: { label: 'webSocket' },
    ...defaultNodeOptions,
    parentNode: 'shard-3',
    extent: 'parent',
  },
  {
    id: 'shard-3-handleMessage',
    position: { x: 1.125 * multiplier, y: 20 },
    data: { label: 'HandleMessage' },
    ...defaultNodeOptions,
    parentNode: 'shard-3',
    extent: 'parent',
  },
  {
    id: 'shard-n',
    type: 'output',
    position: { x: 1.625 * multiplier, y: 40 },
    data: { label: 'Shard-N' },
    style: { width: `${multiplier * 2}px`, height: '80px' },
    ...defaultGroupOptions,
  },
  {
    id: 'shard-n-socket',
    position: { x: 0.125 * multiplier, y: 20 },
    data: { label: 'webSocket' },
    ...defaultNodeOptions,
    parentNode: 'shard-n',
    extent: 'parent',
  },
  {
    id: 'shard-n-handleMessage',
    position: { x: 1.125 * multiplier, y: 20 },
    data: { label: 'HandleMessage' },
    ...defaultNodeOptions,
    parentNode: 'shard-n',
    extent: 'parent',
  },
  {
    id: 'bot',
    type: 'output',
    position: { x: 4 * multiplier, y: 0 },
    data: { label: 'Bot' },
    ...defaultNodeOptions,
  },
]

const initialEdges: Edge[] = [
  { id: 'd-g', source: 'discordGateway', target: 'gateway' },
  { id: 'g-b', source: 'gateway', target: 'bot' },
  { id: 'b-y', source: 'bot', target: 'yourCode' },
  { id: 'y-r', source: 'yourCode', target: 'rest' },
  { id: 'r-d', source: 'rest', target: 'discordApiGateway' },
  {
    id: 'baseLine-1',
    source: 'baseLineNode-1',
    target: 'baseLineNode-2',
    style: { stroke: 'blue', strokeDasharray: 20 },
    animated: false,
  },
  {
    id: 'baseLine-2',
    source: 'baseLineNode-3',
    target: 'baseLineNode-4',
    style: { stroke: 'blue', strokeDasharray: 20 },
    animated: false,
  },
  {
    id: 'baseLine-3',
    source: 'baseLineNode-5',
    target: 'baseLineNode-6',
    style: { stroke: 'blue', strokeDasharray: 20 },
    animated: false,
  },
  {
    id: 'baseLine-4',
    source: 'baseLineNode-7',
    target: 'baseLineNode-8',
    style: { stroke: 'blue', strokeDasharray: 20 },
    animated: false,
  },
  {
    id: 'd-shard-1',
    source: 'discordGateway',
    target: 'shard-1-socket',
    zIndex: 100,
  },
  {
    id: 'd-shard-2',
    source: 'discordGateway',
    target: 'shard-2-socket',
    zIndex: 100,
  },
  {
    id: 'd-shard-3',
    source: 'discordGateway',
    target: 'shard-3-socket',
    zIndex: 100,
  },
  {
    id: 'd-shard-n',
    source: 'discordGateway',
    target: 'shard-n-socket',
    zIndex: 100,
  },
  {
    id: 'shard-1-socket-handleMessage',
    source: 'shard-1-socket',
    target: 'shard-1-handleMessage',
    zIndex: 100,
  },
  {
    id: 'shard-2-socket-handleMessage',
    source: 'shard-2-socket',
    target: 'shard-2-handleMessage',
    zIndex: 100,
  },
  {
    id: 'shard-3-socket-handleMessage',
    source: 'shard-3-socket',
    target: 'shard-3-handleMessage',
    zIndex: 100,
  },
  {
    id: 'shard-n-socket-handleMessage',
    source: 'shard-n-socket',
    target: 'shard-n-handleMessage',
    zIndex: 100,
  },
  {
    id: 'shard-1-handleMessage-bot',
    source: 'shard-1-handleMessage',
    target: 'bot',
    zIndex: 100,
  },
  {
    id: 'shard-2-handleMessage-bot',
    source: 'shard-2-handleMessage',
    target: 'bot',
    zIndex: 100,
  },
  {
    id: 'shard-3-handleMessage-bot',
    source: 'shard-3-handleMessage',
    target: 'bot',
    zIndex: 100,
  },
  {
    id: 'shard-n-handleMessage-bot',
    source: 'shard-n-handleMessage',
    target: 'bot',
    zIndex: 100,
  },
  {
    id: 'gatewayManager-shard-1',
    source: 'gatewayManager',
    target: 'shard-1',
    zIndex: 10,
  },
  {
    id: 'gatewayManager-shard-2',
    source: 'gatewayManager',
    target: 'shard-2',
    zIndex: 100,
  },
  {
    id: 'gatewayManager-shard-3',
    source: 'gatewayManager',
    target: 'shard-3',
    zIndex: 100,
  },
  {
    id: 'gatewayManager-shard-n',
    source: 'gatewayManager',
    target: 'shard-n',
    zIndex: 100,
  },
]

export default function FlowChart2() {
  return (
    <BaseFlowChart initialNodes={initialNodes} initialEdges={initialEdges} />
  )
}
