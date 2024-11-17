import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

function Flow() {
  return (
    <div style={{ height: '75vh', width: '100vw' }}>
      <ReactFlow>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
 
export default Flow;