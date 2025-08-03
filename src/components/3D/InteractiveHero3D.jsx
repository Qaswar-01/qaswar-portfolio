import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Text3D, Center } from '@react-three/drei';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import FloatingGeometry from './FloatingGeometry';

const HeroContainer = styled(motion.div)`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-align: center;
  pointer-events: none;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 900;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-shadow: 0 0 30px ${props => props.theme.accent}50;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 3vw, 2rem);
  color: ${props => props.theme.textSecondary};
  margin: 1rem 0 0 0;
  font-weight: 300;
`;

const Scene = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating geometric shapes */}
      <FloatingGeometry position={[-4, 2, -2]} color="#00cfc8" scale={0.8} />
      <FloatingGeometry position={[4, -1, -1]} color="#266150" scale={1.2} />
      <FloatingGeometry position={[-2, -2, 1]} color="#ce9e62" scale={0.6} />
      <FloatingGeometry position={[3, 3, 0]} color="#137dc5" scale={0.9} />
      <FloatingGeometry position={[0, 0, -3]} color="#bf1922" scale={1.5} />
      
      {/* Contact shadows for depth */}
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={20}
        blur={2}
        far={4}
      />
    </group>
  );
};

const InteractiveHero3D = () => {
  return (
    <HeroContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#00cfc8" intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#ce9e62" intensity={0.3} />
          
          <Scene />
          
          <Environment preset="city" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      
      <HeroContent>

      </HeroContent>
    </HeroContainer>
  );
};

export default InteractiveHero3D;