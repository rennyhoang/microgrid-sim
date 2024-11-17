import { Handle, Position, Node, NodeProps } from '@xyflow/react';
 
type BatteryNodeData = { label: string, price: number, capacity: number };
type BatteryNode = Node<BatteryNodeData, 'battery'>;

export default function BatteryNode({ data }: NodeProps<BatteryNode>) {
  const scale = Math.max(0.5, Math.min(2, data.capacity / 5000));
  return (
      <div className="relative bg-gray-800 rounded-lg p-4 w-32 border-2 border-yellow-400" style={{transform: `scale(${scale})`}}>
  <Handle type="target" position={Position.Top} id="a" />
  <div className="flex flex-col items-center">
    <div className="w-16 h-24 bg-gray-600 rounded relative mb-2">
      {/* Battery terminal */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-500" />
      {/* Battery level indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-green-400 rounded" />
    </div>
    <label className="text-white font-bold">{data.label}</label>
    <p className="text-green-400">{"$" + data.price}</p>
    <p className="text-white">{data.capacity + "Wh"}</p>
  </div>
</div>
  );
}