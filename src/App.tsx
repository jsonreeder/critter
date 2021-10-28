import React, { useEffect, useRef } from 'react';
import { Image, Layer, Stage } from 'react-konva';

import useImage from 'use-image';

function App() {
  const critter = useRef<any>(null);
  const poop = useRef<any>(null);
  const urlCritter =
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/critter.png?alt=media&token=b7518137-bbe0-47f6-92cc-b6501a656cc3';
  const [imageCritter] = useImage(urlCritter);
  const urlPoop =
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/poop.png?alt=media&token=ce8fcdef-1e57-4213-8ac0-98991107a943';
  const [imagePoop] = useImage(urlPoop);

  const critterSize = 100;
  const sizePoop = 30;
  const width = window.innerWidth;
  const height = window.innerHeight;

  const randomX = () => Math.random() * (width - critterSize);
  const randomY = () => Math.random() * (height - critterSize);
  const initialX = randomX();
  const initialY = randomY();

  const randomSpeed = () => Math.floor(Math.random() * 4) + 1;

  const moveRecursively = (node: any) => {
    node.current.to({
      x: randomX(),
      y: randomY(),
      duration: randomSpeed(),
      onFinish: () => {
        setTimeout(() => {
          poop.current.position({
            x: node.current.x() + critterSize * 0.5,
            y: node.current.y() + critterSize * 0.5,
          });
          poop.current.show();
          moveRecursively(node);
        }, 2000);
      },
    });
  };

  useEffect(() => {
    moveRecursively(critter);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Image
          image={imagePoop}
          width={sizePoop}
          height={sizePoop}
          ref={poop}
          visible={false}
        />
        <Image
          image={imageCritter}
          width={critterSize}
          height={critterSize}
          x={initialX}
          y={initialY}
          ref={critter}
        />
      </Layer>
    </Stage>
  );
}

export default App;
