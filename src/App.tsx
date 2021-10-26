import React, { useEffect, useRef } from 'react';
import { Circle, Layer, Stage } from 'react-konva';

function App() {
  const critter = useRef<any>(null);
  const critterSize = 25;
  const critterPadding = 2 * critterSize;

  const randomX = () => Math.random() * (window.innerWidth + critterPadding);
  const randomY = () => Math.random() * (window.innerHeight + critterPadding);
  const randomSpeed = () => Math.floor(Math.random() * 4) + 1;

  const moveRecursively = (node: any) => {
    node.current.to({
      x: randomX(),
      y: randomY(),
      duration: randomSpeed(),
      onFinish: () => moveRecursively(node),
    });
  };

  useEffect(() => {
    moveRecursively(critter);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Circle
          x={randomX()}
          y={randomY()}
          radius={critterSize}
          fill="purple"
          ref={critter}
        />
      </Layer>
    </Stage>
  );
}

export default App;
