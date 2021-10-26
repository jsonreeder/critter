import React, { useEffect, useRef } from 'react';
import { Circle, Layer, Stage } from 'react-konva';

function App() {
  const creature = useRef<any>(null);

  const randomX = () => Math.random() * window.innerHeight;

  useEffect(() => {
    setTimeout(() => creature.current.to({ x: randomX() }), 100);
    setTimeout(() => creature.current.to({ x: randomX() }), 500);
    setTimeout(() => creature.current.to({ x: randomX() }), 1000);
  }, []);

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
        />
      </Layer>
    </Stage>
  );
}

export default App;
