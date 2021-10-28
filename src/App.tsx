import React, { useEffect, useRef } from 'react';
import { Image, Layer, Stage } from 'react-konva';

import useImage from 'use-image';

function App() {
  const critter = useRef<any>(null);
  const poops = [useRef<any>(null), useRef<any>(null), useRef<any>(null)];
  let nextPoop = 0;

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

  const moveRecursively = () => {
    critter.current.to({
      x: randomX(),
      y: randomY(),
      duration: randomSpeed(),
      onFinish: () => {
        setTimeout(() => {
          setPoop();
          moveRecursively();
        }, 2000);
      },
    });
  };

  const setPoop = () => {
    const poop = poops[nextPoop % 3].current;
    poop.position({
      x: critter.current.x() + critterSize * 0.5,
      y: critter.current.y() + critterSize * 0.5,
    });
    poop.show();
    nextPoop++;
  };

  useEffect(() => {
    moveRecursively();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {poops.map((ref, idx) => (
          <Image
            image={imagePoop}
            width={sizePoop}
            height={sizePoop}
            ref={ref}
            visible={false}
            key={idx}
          />
        ))}
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
