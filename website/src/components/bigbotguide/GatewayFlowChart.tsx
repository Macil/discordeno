import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

const nodes = [
  {
    id: "gwm",
    data: { label: "Gateway Manager" },
    position: { x: 0, y: 0 },
    type: "input",
  },
  {
    id: "s1",
    data: { label: "Server 1" },
    position: { x: -525, y: 100 },
  },
  {
    id: "s2",
    data: { label: "Server 2" },
    position: { x: 0, y: 100 },
  },
  {
    id: "s10",
    data: { label: "Server 10" },
    position: { x: 525, y: 100 },
  },
  {
    id: "w1",
    data: { label: "Worker 1" },
    position: { x: -700, y: 200 },
  },
  {
    id: "w2",
    data: { label: "Worker 2" },
    position: { x: -525, y: 200 },
  },
  {
    id: "w50",
    data: { label: "Worker 50" },
    position: { x: -350, y: 200 },
  },
  {
    id: "w51",
    data: { label: "Worker 51" },
    position: { x: -175, y: 200 },
  },
  {
    id: "w52",
    data: { label: "Worker 52" },
    position: { x: 0, y: 200 },
  },
  {
    id: "w100",
    data: { label: "Worker 100" },
    position: { x: 175, y: 200 },
  },
  {
    id: "w451",
    data: { label: "Worker 451" },
    position: { x: 350, y: 200 },
  },
  {
    id: "w452",
    data: { label: "Worker 452" },
    position: { x: 525, y: 200 },
  },
  {
    id: "w500",
    data: { label: "Worker 500" },
    position: { x: 700, y: 200 },
  },
  //
  {
    id: "w1s",
    data: { label: "Shard 0 - 9" },
    position: { x: -700, y: 300 },
  },
  {
    id: "w2s",
    data: { label: "Shard 10 - 19" },
    position: { x: -525, y: 300 },
  },
  {
    id: "w50s",
    data: { label: "Shard 490 - 500" },
    position: { x: -350, y: 300 },
  },
  {
    id: "w51s",
    data: { label: "Shard 500 - 509" },
    position: { x: -175, y: 300 },
  },
  {
    id: "w52s",
    data: { label: "Shard 510 - 519" },
    position: { x: 0, y: 300 },
  },
  {
    id: "w100s",
    data: { label: "Shard 990 - 1000" },
    position: { x: 175, y: 300 },
  },
  {
    id: "w451s",
    data: { label: "Shard 4500 - 4509" },
    position: { x: 350, y: 300 },
    type: "output",
  },
  {
    id: "w452s",
    data: { label: "Shard 4510 - 4519" },
    position: { x: 525, y: 300 },
    type: "output",
  },
  {
    id: "w500s",
    data: { label: "Shard 4990 - 4999" },
    position: { x: 700, y: 300 },
    type: "output",
  },
];

const edges = [
  { id: "gwm-s1", source: "gwm", target: "s1", type: "step" },
  { id: "gwm-s2", source: "gwm", target: "s2", type: "step" },
  { id: "gwm-s10", source: "gwm", target: "s10", type: "step" },
  { id: "s1-w1", source: "s1", target: "w1", type: "step" },
  { id: "s1-w2", source: "s1", target: "w2", type: "step" },
  { id: "s1-w50", source: "s1", target: "w50", type: "step" },
  { id: "s2-w51", source: "s2", target: "w51", type: "step" },
  { id: "s2-w52", source: "s2", target: "w52", type: "step" },
  { id: "s2-w100", source: "s2", target: "w100", type: "step" },
  { id: "s10-w451", source: "s10", target: "w451", type: "step" },
  { id: "s10-w452", source: "s10", target: "w452", type: "step" },
  { id: "s10-w500", source: "s10", target: "w500", type: "step" },
  { id: "w1-w1s", source: "w1", target: "w1s", type: "step" },
  { id: "w2-w2s", source: "w2", target: "w2s", type: "step" },
  { id: "w50-w50s", source: "w50", target: "w50s", type: "step" },
  { id: "w51-w51s", source: "w51", target: "w51s", type: "step" },
  { id: "w52-w52s", source: "w52", target: "w52s", type: "step" },
  { id: "w100-w100s", source: "w100", target: "w100s", type: "step" },
  { id: "w451-w451s", source: "w451", target: "w451s", type: "step" },
  { id: "w452-w452s", source: "w452", target: "w452s", type: "step" },
  { id: "w500-w500s", source: "w500", target: "w500s", type: "step" },
];

function Flow() {
  return (
    <div style={{ height: "100%" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
