import Konva from 'konva';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Layer, Stage } from 'react-konva';

import useImage from 'use-image';

function sleep(milliseconds: number) {
  return new Promise((f) => setTimeout(f, milliseconds));
}

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

  const urlCritter =
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/critter.png?alt=media&token=b7518137-bbe0-47f6-92cc-b6501a656cc3';
  const [imageCritter, imageCritterStatus] = useImage(urlCritter);
  const urlCritterChew =
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/eat%2Fcritter-chew.png?alt=media&token=07230c02-47da-40ad-8ed1-29ed56365dd5';
  const [imageCritterChew, imageCritterChewStatus] = useImage(urlCritterChew);
  const urlPoop =
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/poop.png?alt=media&token=ce8fcdef-1e57-4213-8ac0-98991107a943';
  const [imagePoop, imagePoopStatus] = useImage(urlPoop);
  const urlPlant =
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/plant.png?alt=media&token=1ed59c0d-b854-4ef6-830c-1a605e82883e';
  const [imagePlant, imagePlantStatus] = useImage(urlPlant);
  const urlPlantChewed =
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/eat%2Fplant-chewed.png?alt=media&token=712b0594-e228-4660-b808-36bc09f8c054';
  const [imagePlantChewed, imagePlantChewedStatus] = useImage(urlPlantChewed);

  const [imageJump0, imageJump0Status] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/jump%2Fjump0.png?alt=media&token=5d429073-f5e9-47c2-9503-89b7ed2ca68a',
  );
  const [imageJump1, imageJump1Status] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/jump%2Fjump1.png?alt=media&token=4ac56d32-19c5-46c9-9bdb-f49d8fdcdf60',
  );
  const [imageJump2, imageJump2Status] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/jump%2Fjump2.png?alt=media&token=823e1e7d-75ec-4113-a79c-2f6ad08c2605',
  );
  const [imageJump3, imageJump3Status] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/jump%2Fjump3.png?alt=media&token=768feef6-e1c8-437c-98a0-0c62fad4845e',
  );
  const [imageJump4, imageJump4Status] = useImage(
    'https://firebasestorage.googleapis.com/v0/b/critter-8c09a.appspot.com/o/jump%2Fjump4.png?alt=media&token=8d5b313f-4fc2-4440-b870-43e5eb39d588',
  );

  const [imagesLoaded, setImagesLoaded] = useState(false);

  const imageStatuses = [
    imageCritterStatus,
    imageCritterChewStatus,
    imagePoopStatus,
    imagePlantStatus,
    imagePlantChewedStatus,
    imageJump0Status,
    imageJump1Status,
    imageJump2Status,
    imageJump3Status,
    imageJump4Status,
  ];

  useEffect(() => {
    setImagesLoaded(imageStatuses.every((status) => status === 'loaded'));
  }, imageStatuses); // eslint-disable-line react-hooks/exhaustive-deps

  const critterSize = 100;
  const width = window.innerWidth;
  const height = window.innerHeight;

  const randomX = () => Math.random() * (width - critterSize);
  const randomY = () => Math.random() * (height - critterSize);

  const randomSpeed = () => Math.floor(Math.random() * 4) + 1;

  const moveTween = useRef<Konva.Tween>();

  const moveRecursively = () => {
    if (!critter.current) return;
    const onFinish = async () => {
      const plant = firstPlant();
      if (plant) {
        await moveToPlant(plant!.current!);
      } else {
        const willPoop = decideWillPoop();
        const milliseconds = willPoop ? 4000 : 1500;
        if (willPoop) setPoop();
        await sleep(milliseconds);
      }
      moveRecursively();
    };

    moveTween.current = new Konva.Tween({
      node: critter.current,
      x: randomX(),
      y: randomY(),
      duration: randomSpeed(),
      onFinish,
    });
    moveTween.current.play();
  };

  const startMovement = async () => {
    if (!critter.current) return;
    const duration = 4;
    critter.current.x(randomX());
    critter.current.y(randomY());
    critter.current.to({
      opacity: 1,
      duration,
      onFinish: moveRecursively,
      easing: Konva.Easings.BounceEaseIn,
    });
  };

  const pauseMovement = () => moveTween.current?.destroy();
  const resumeMovement = async () => {
    await sleep(2000);
    moveRecursively();
  };

  const jump = async (event: Konva.KonvaEventObject<any>) => {
    pauseMovement();
    const target = event.target as Konva.Image;
    const milliseconds = 100;
    const duration = 0.1;
    const initialY = target.y();

    target.image(imageJump0);

    target.to({
      y: initialY - 10,
      duration,
    });
    await sleep(milliseconds);
    target.image(imageJump1);

    target.to({
      y: initialY - 20,
      duration,
    });
    await sleep(milliseconds);
    target.image(imageJump2);

    target.to({
      y: initialY - 40,
      duration,
    });
    await sleep(milliseconds);
    target.image(imageJump3);

    target.to({
      y: initialY - 20,
      duration,
    });
    await sleep(milliseconds);
    target.image(imageJump4);

    target.to({
      y: initialY,
      duration,
    });
    await sleep(milliseconds);
    target.image(imageJump0);
    await sleep(milliseconds);

    target.image(imageCritter);
    moveRecursively();
  };

  const setPoop = () => {
    const poop = poops.find((el: any) => !el.current.visible())?.current;
    if (!poop || !critter.current) return;
    poop.position({
      x: critter.current.x() + critterSize * 0.5,
      y: critter.current.y() + critterSize * 0.5,
    });
    poop.show();
  };

  const decideWillPoop = () => {
    return true; // TODO: Remove
    return Math.random() > 0.5; // Poop half the time
  };

  const firstPlant = () => {
    return poops.find((poop) => poop.current?.name() === 'plant');
  };

  const moveToPlant = async (node: Konva.Image) => {
    node.zIndex(10);
    const duration = 2;
    const currentY = node.y();
    critter.current!.to({
      x: node.x() - critterSize * 0.25,
      y: currentY - critterSize * 0.8,
      duration,
    });
    await sleep(duration * 1000); // Arrive at the plant
    await sleep(1000); // Bite 1
    critter.current!.image(imageCritterChew);
    node.image(imagePlantChewed);
    node.y(currentY + 12);
    await sleep(1000);
    critter.current!.image(imageCritter);
    await sleep(1000); // Bite 2
    critter.current!.image(imageCritterChew);
    node.hide();
    node.image(imagePoop);
    node.name('poop');
    node.zIndex(1);
    await sleep(1000);
    critter.current!.image(imageCritter);
    await sleep(1000);
  };

  useEffect(() => {
    if (!imagesLoaded) return;
    startMovement();
  }, [imagesLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  const convertToPlant = (event: any) => {
    event.target.offsetY(100);
    event.target.image(imagePlant);
    event.target.name('plant');
  };

  if (!imagesLoaded) return null;

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
            onClick={convertToPlant}
            onTap={convertToPlant}
            scaleX={0.2}
            scaleY={0.2}
            name="poop"
          />
        ))}
        <Image
          image={imageCritter}
          scaleX={0.2}
          scaleY={0.2}
          ref={critter}
          onClick={jump}
          onTap={jump}
          draggable={true}
          onDragMove={pauseMovement}
          onDragEnd={resumeMovement}
          opacity={0}
        />
      </Layer>
    </Stage>
  );
}

export default App;
