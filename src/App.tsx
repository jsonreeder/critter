import React, { useEffect, useRef } from 'react';
import { Image, Layer, Stage } from 'react-konva';

import useImage from 'use-image';

function App() {
  const critter = useRef<any>(null);
  const url =
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/critter.png?alt=media&token=b7518137-bbe0-47f6-92cc-b6501a656cc3';
  const [image] = useImage(url);

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
        <Image
          image={image}
          width={critterRadius}
          height={critterRadius}
          x={randomX()}
          y={randomY()}
          ref={critter}
        />
      </Layer>
    </Stage>
  );
}

export default App;
