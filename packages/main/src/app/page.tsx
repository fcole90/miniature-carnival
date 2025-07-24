'use client';

import type { CSSProperties } from 'react';
import { motion, useSpring } from 'motion/react';
import React, { useState, useRef, useEffect } from 'react';
import StackLayout from '@swiftpost/elysium/layouts/StackLayout';
import Stack from '@swiftpost/elysium/ui/Stack';
import Text from '@swiftpost/elysium/ui/Text';
import { blue, red } from '@mui/material/colors';

import bergen from './bergen.jpg';
import ps5boxCiv from './ps5boxCiv.webp';
import albertoAngela from './albertoAngela.jpg';
import winter from './winter.gif';
import Image from 'next/image';

//Spring animation parameters
const spring = {
  stiffness: 300,
  damping: 40,
};

interface FlippableComponentProps {
  width: number | string;
  height: number | string;
  style: CSSProperties;
  variant: 'Front' | 'Back';
}

/**
 * 3D Flip
 * Created By Joshua Guo
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */

export function withClick(Component: React.FC<FlippableComponentProps>) {
  const InnerComponent: React.FC<{
    width: number | string;
    height: number | string;
  }> = (props) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
      setIsFlipped((prevState) => !prevState);
    };

    const [rotateXaxis, _setRotateXaxis] = useState(0);
    const [rotateYaxis, _setRotateYaxis] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    // const handleMouseMove = (event: MouseEvent) => {
    //   const element = ref.current;
    //   if (element == null) {
    //     return;
    //   }
    //   const elementRect = element.getBoundingClientRect();
    //   const elementWidth = elementRect.width;
    //   const elementHeight = elementRect.height;
    //   const elementCenterX = elementWidth / 2;
    //   const elementCenterY = elementHeight / 2;
    //   const mouseX = event.clientY - elementRect.y - elementCenterY;
    //   const mouseY = event.clientX - elementRect.x - elementCenterX;
    //   const degreeX = (mouseX / elementWidth) * 20; //The number is the rotation factor
    //   const degreeY = (mouseY / elementHeight) * 20; //The number is the rotation factor
    //   setRotateXaxis(degreeX);
    //   setRotateYaxis(degreeY);
    // };

    // const handleMouseEnd = () => {
    //   setRotateXaxis(0);
    //   setRotateYaxis(0);
    // };

    const dx = useSpring(0, spring);
    const dy = useSpring(0, spring);

    useEffect(() => {
      dx.set(-rotateXaxis);
      dy.set(rotateYaxis);
    }, [rotateXaxis, rotateYaxis]);

    return (
      <motion.div
        onClick={handleClick}
        transition={spring}
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          width: `${props.width}`,
          height: `${props.height}`,
          backgroundColor: 'black',
        }}
      >
        <motion.div
          ref={ref}
          // whileHover={{ scale: 1.1 }} //Change the scale of zooming in when hovering
          // onMouseMove={handleMouseMove}
          // onMouseLeave={handleMouseEnd}
          transition={spring}
          style={{
            width: '100%',
            height: '100%',
            rotateX: dx,
            rotateY: dy,
          }}
        >
          <div
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
              width: '100%',
              height: '100%',
            }}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? -180 : 0 }}
              transition={spring}
              style={{
                width: '100%',
                height: '100%',
                zIndex: isFlipped ? 0 : 1,
                backfaceVisibility: 'hidden',
                position: 'absolute',
              }}
            >
              <Component
                {...props}
                variant="Front"
                style={{
                  width: '10%',
                  height: '10%',
                }}
              />
            </motion.div>
            <motion.div
              initial={{ rotateY: 180 }}
              animate={{ rotateY: isFlipped ? 0 : 180 }}
              transition={spring}
              style={{
                width: '100%',
                height: '100%',
                zIndex: isFlipped ? 1 : 0,
                backfaceVisibility: 'hidden',
                position: 'absolute',
              }}
            >
              <Component
                {...props}
                variant="Back"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return InnerComponent;
}

const MyCard: React.FC<FlippableComponentProps> = ({
  width,
  height,
  style,
  variant,
}) => {
  const [number, setNumber] = useState(0);

  const list = [
    <Stack key="bergen" position={'relative'}>
      <Image alt="bergen" src={bergen} style={{ maxWidth: '100%' }}></Image>
      <Text
        sx={{ color: red['A700'], margin: 'auto' }}
        position="absolute"
        margin="auto"
        top="5rem"
        align="center"
        width="100%"
        variant="h2"
      >
        Tantissimi Auguri!
      </Text>
    </Stack>,
    <Stack key="winter">
      <Image
        alt="winter"
        src={winter}
        style={{ maxWidth: '100%', height: 'auto' }}
      ></Image>
    </Stack>,
    <Stack key="question">
      <Text align="center" color={blue[900]} variant="h3">
        {"Come fare quando l'inverno arriva?"}
      </Text>
    </Stack>,
    <Stack key="roma" position={'relative'}>
      <Image
        alt="albertoAngela"
        src={albertoAngela}
        style={{ maxWidth: '100%', height: 'auto' }}
      ></Image>
      <Text
        sx={{ color: blue[900], margin: 'auto' }}
        margin="auto"
        align="center"
        width="100%"
        variant="h2"
      >
        {"Sempre pensando all'Impero Romano?"}
      </Text>
    </Stack>,
    <Stack key="ps5box" position={'relative'}>
      <Image
        alt="albertoAngela"
        src={ps5boxCiv}
        style={{ maxWidth: '100%', height: 'auto' }}
      ></Image>
      <Text
        sx={{ color: blue[900], margin: 'auto' }}
        margin="auto"
        align="center"
        width="100%"
        variant="h3"
      >
        {'Magari anche altri imperi!'}{' '}
        <Text
          color={red['A700']}
          component="span"
          variant="h3"
          fontWeight="bold"
        >
          Auguriii!
        </Text>
      </Text>
    </Stack>,
    <Stack key="trailer">
      <iframe
        width="100%"
        height="auto"
        src="https://www.youtube.com/embed/NXdqtwPpB3g?si=EV5lQ-CHCCXifmUY"
        title="YouTube video player"
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share, fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <Text color={blue[900]} align="center">
        <a href="https://www.youtube.com/watch?v=NXdqtwPpB3g" target="__blank">
          Trailer Civilization 7
        </a>
      </Text>
    </Stack>,
    <Stack key="end">
      <Text fontWeight="bold" color={blue[900]}>
        Ricarica la pagina per ricominciare!
      </Text>
    </Stack>,
  ];

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      onClick={() => {
        setTimeout(() => {
          setNumber((number) => number + 2);
        }, 50);
      }}
      sx={{
        ...style,
        width,
        height,
        backgroundColor: 'wheat',
        border: '1px solid black',
        borderRadius: '10px',
      }}
    >
      {variant === 'Front' ?
        <Stack maxWidth="100%" maxHeight="100%">
          {list[Math.min(number, list.length - 1)]}
        </Stack>
      : <Stack maxWidth="100%" maxHeight="100%">
          {list[Math.min(number + 1, list.length - 1)]}
        </Stack>
      }
    </Stack>
  );
};

const FlipCard = withClick(MyCard);

const Home: React.FC = () => {
  return (
    <StackLayout
      elements={{
        mainContent: (
          <Stack
            alignItems="center"
            justifyContent="center"
            width="100vw"
            height="100vh"
            sx={{
              overflow: 'hidden',
              backgroundColor: 'black',
            }}
          >
            <Stack>
              <FlipCard width={'90vw'} height={'90vh'} />
            </Stack>
          </Stack>
        ),
      }}
    />
  );
};

export default Home;
