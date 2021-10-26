import React, { useEffect, useRef } from 'react';
import { Circle, Layer, Stage } from 'react-konva';

function App() {
  const creature = useRef<any>(null);

  const randomX = () => Math.random() * window.innerHeight;

  useEffect(() => {
    creature.current.to({
      x: randomX(),
      duration: 5,
      onFinish: () => creature.current.to({ x: randomX() }),
    });
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
