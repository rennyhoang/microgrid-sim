//import { useCallback } from 'react';
import { Handle, Position, Node, NodeProps } from '@xyflow/react';
 
type PanelNodeData = { label: string, price: number, wattage: number };
type PanelNode = Node<PanelNodeData, 'panel'>;

export default function PanelNode({ data }: NodeProps<PanelNode>) {
    const scale = 0.5 + (data.wattage / 1000);
    return (
        <div className="w-48 bg-slate-800 rounded-md p-4 border-2 border-blue-400 relative" style={{ transform: `scale(${scale})` }}>
          <div className="grid grid-cols-2 gap-2 bg-blue-900/30 p-2 rounded-sm">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-blue-400/80 h-8 rounded-sm" />
            ))}
          </div>
          <div className="mt-3 text-white text-center">
            <h3 className="font-semibold text-lg">{data.label}</h3>
            <p className="text-green-400 font-mono">${data.price}</p>
            <p className="text-blue-300">{data.wattage}W</p>
          </div>
          <Handle 
            type="source" 
            position={Position.Bottom} 
            id="a"
            className="w-3 h-3 !bg-blue-400" 
            style={{ left: '50%', transform: 'translateX(-50%)' }}
          />
        </div>
    );
  }