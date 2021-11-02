import Konva from 'konva';
import { Easings } from 'konva/lib/Tween';
import React, { useEffect, useRef, MouseEvent } from 'react';
import { Image, Layer, Stage } from 'react-konva';

import useImage from 'use-image';

function App() {
  const critter = useRef<Konva.Image>(null);
  const poops = [
    useRef<Konva.Image>(null),
    useRef<Konva.Image>(null),
    useRef<Konva.Image>(null),
    useRef<Konva.Image>(null),
    useRef<Konva.Image>(null),
    useRef<Konva.Image>(null),
    useRef<Konva.Image>(null),
    useRef<Konva.Image>(null),
    useRef<Konva.Image>(null),
    useRef<Konva.Image>(null),
  ];
  let nextPoop = 0;

  const urlCritter =
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/critter.png?alt=media&token=b7518137-bbe0-47f6-92cc-b6501a656cc3';
  const [imageCritter] = useImage(urlCritter);
  const urlPoop =
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/poop.png?alt=media&token=ce8fcdef-1e57-4213-8ac0-98991107a943';
  const [imagePoop] = useImage(urlPoop);
  const urlPlant =
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/plant.png?alt=media&token=1ed59c0d-b854-4ef6-830c-1a605e82883e';
  const [imagePlant] = useImage(urlPlant);

  const [imageJump0] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/jump%2Fjump0.png?alt=media&token=5d429073-f5e9-47c2-9503-89b7ed2ca68a',
  );
  const [imageJump1] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/jump%2Fjump1.png?alt=media&token=4ac56d32-19c5-46c9-9bdb-f49d8fdcdf60',
  );
  const [imageJump2] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/jump%2Fjump2.png?alt=media&token=823e1e7d-75ec-4113-a79c-2f6ad08c2605',
  );
  const [imageJump3] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/jump%2Fjump3.png?alt=media&token=768feef6-e1c8-437c-98a0-0c62fad4845e',
  );
  const [imageJump4] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/jump%2Fjump4.png?alt=media&token=8d5b313f-4fc2-4440-b870-43e5eb39d588',
  );

  const critterSize = 100;
  const width = window.innerWidth;
  const height = window.innerHeight;

  const randomX = () => Math.random() * (width - critterSize);
  const randomY = () => Math.random() * (height - critterSize);
  const initialX = randomX();
  const initialY = randomY();

  const randomSpeed = () => Math.floor(Math.random() * 4) + 1;

  const moveRecursively = () => {
    critter.current?.to({
      x: randomX(),
      y: randomY(),
      duration: randomSpeed(),
      onFinish: () => {
        const willPoop = decideWillPoop();
        const milliseconds = willPoop ? 4000 : 1500;
        setTimeout(() => {
          if (willPoop) setPoop();
          moveRecursively();
        }, milliseconds);
      },
    });
  };

  const jump = (event: Konva.KonvaEventObject<any>) => {
    const target = event.target as Konva.Image;
    target.image(imageJump1);
    target.to({
      y: target.y() - 50,
      duration: 0.2,
    });
  };

  const setPoop = () => {
    const poop = poops[nextPoop % poops.length].current;
    if (!poop || !critter.current) return;
    poop.position({
      x: critter.current.x() + critterSize * 0.5,
      y: critter.current.y() + critterSize * 0.5,
    });
    poop.show();
    nextPoop++;
  };

  const decideWillPoop = () => {
    return Math.random() > 0.5; // Poop half the time
  };

  useEffect(() => {
    // moveRecursively();
    // jump();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = (event: any) => {
    event.target.offsetY(100);
    event.target.image(imagePlant);
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {poops.map((ref, idx) => (
          <Image
            image={imagePoop}
            ref={ref}
            visible={false}
            key={idx}
            draggable={true}
            onClick={handleClick}
            scaleX={0.2}
            scaleY={0.2}
          />
        ))}
        <Image
          image={imageCritter}
          width={critterSize}
          height={critterSize}
          x={initialX}
          y={initialY}
          ref={critter}
          onClick={jump}
        />
      </Layer>
    </Stage>
  );
}

export default App;
