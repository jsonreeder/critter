import React, { useRef } from 'react';
import { Circle, Layer, Stage } from 'react-konva';

function App() {
  const creature = useRef<any>(null);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Circle
          x={200}
          y={200}
          width={50}
          height={50}
          fill="purple"
          ref={creature}
          onClick={() => creature.current.to({ x: 100 })}
        />
      </Layer>
    </Stage>
  );
}

export default App;
