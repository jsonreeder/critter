import { useSpring, animated } from 'react-spring';

import React from 'react';
import { Circle, Layer, Stage } from 'react-konva';

function App() {
  const styles = useSpring({
    loop: { reverse: true },
    from: { x: 0 },
    to: { x: 100 },
  });

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Circle x={200} y={200} width={50} height={50} fill="purple" />
      </Layer>
    </Stage>
  );
}

export default App;
