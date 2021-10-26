import React, { useEffect, useRef } from 'react';
import { Circle, Layer, Stage } from 'react-konva';

function App() {
  const critter = useRef<any>(null);
  const critterRadius = 25;
  const width = window.innerWidth;
  const height = window.innerHeight;

  const randomX = () =>
    critterRadius + Math.random() * (width - 2 * critterRadius);
  const randomY = () =>
    critterRadius + Math.random() * (height - 2 * critterRadius);
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
          radius={critterRadius}
          fill="purple"
          ref={critter}
        />
      </Layer>
    </Stage>
  );
}

export default App;
