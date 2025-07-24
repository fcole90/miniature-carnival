'use client';

import type { CSSProperties, MouseEvent } from 'react';
import { motion, useSpring } from 'motion/react';
import React, { useState, useRef, useEffect } from 'react';
import StackLayout from '@swiftpost/elysium/layouts/StackLayout';
import Stack from '@swiftpost/elysium/ui/Stack';
import Text from '@swiftpost/elysium/ui/Text';

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

    const [rotateXaxis, setRotateXaxis] = useState(0);
    const [rotateYaxis, setRotateYaxis] = useState(0);
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
        <Text>Front: {number}</Text>
      : <Text>Back: {number + 1}</Text>}
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
