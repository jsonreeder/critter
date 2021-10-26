import React, { useEffect, useRef } from 'react';
import { Circle, Layer, Stage } from 'react-konva';

function App() {
  const creature = useRef<any>(null);

  const randomX = () => Math.random() * window.innerWidth;
  const randomY = () => Math.random() * window.innerHeight;
  const randomSpeed = () => Math.random() * 50;

  const moveRecursively = (node: any) => {
    node.current.to({
      x: randomX(),
      y: randomY(),
      duration: randomSpeed(),
      onFinish: () => moveRecursively(node),
    });
  };

  useEffect(() => {
    moveRecursively(creature);
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
