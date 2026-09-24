import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useJourneyStore } from '../store/journeyStore';

export const Character: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  const journeyProgress = useJourneyStore((state) => state.journeyProgress);
  const qualityLevel = useJourneyStore((state) => state.qualityLevel);
  const prevZ = useRef(0);
  const isMoving = useRef(false);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Follow the journey progress along 360 units, staying ~5 units ahead of camera
    const targetZ = -360 * journeyProgress - 4.5;

    // Smooth lerp to position
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      delta * 4.5
    );

    // Keep character on center of trail with subtle natural drift
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      Math.sin(state.clock.elapsedTime * 0.3) * 0.15,
      delta * 2
    );

    // Detect if moving
    const speed = Math.abs(groupRef.current.position.z - prevZ.current) / Math.max(delta, 0.001);
    isMoving.current = speed > 0.04;
    prevZ.current = groupRef.current.position.z;

    const walkSpeed = 9;
    const walkCycle = Math.sin(state.clock.elapsedTime * walkSpeed);

    // Legs animation with knee bends
    if (leftLegRef.current && rightLegRef.current) {
      if (isMoving.current) {
        leftLegRef.current.rotation.x = walkCycle * 0.65;
        rightLegRef.current.rotation.x = -walkCycle * 0.65;
      } else {
        leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, delta * 5);
        rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, delta * 5);
      }
    }

    // Arms animation
    if (leftArmRef.current && rightArmRef.current) {
      if (isMoving.current) {
        leftArmRef.current.rotation.x = -walkCycle * 0.55;
        rightArmRef.current.rotation.x = walkCycle * 0.55;
      } else {
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, delta * 5);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, delta * 5);
      }
    }

    // Torso bobbing and head slight sway
    if (torsoRef.current) {
      const bobY = isMoving.current
        ? Math.abs(Math.sin(state.clock.elapsedTime * walkSpeed)) * 0.09
        : Math.sin(state.clock.elapsedTime * 1.5) * 0.015;
      torsoRef.current.position.y = 1.1 + bobY;
    }

    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });

  if (qualityLevel === 'low') {
    return (
      <group ref={groupRef} position={[0, 0, -4.5]}>
        <mesh position={[0, 1.1, 0]}>
          <capsuleGeometry args={[0.3, 0.9, 4, 8]} />
          <meshStandardMaterial color="#1a202c" />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={groupRef} position={[0, 0, -4.5]} rotation={[0, Math.PI, 0]}>
      {/* Upper Body (Torso, Backpack, Head) */}
      <group ref={torsoRef} position={[0, 1.1, 0]}>
        {/* Jacket / Chest */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.54, 0.65, 0.32]} />
          <meshStandardMaterial color="#1E293B" roughness={0.7} />
        </mesh>

        {/* Jacket hood / collar */}
        <mesh position={[0, 0.35, -0.06]}>
          <boxGeometry args={[0.42, 0.16, 0.3]} />
          <meshStandardMaterial color="#0F172A" roughness={0.8} />
        </mesh>

        {/* Backpacker Hiking Pack */}
        <group position={[0, 0.06, 0.22]}>
          {/* Main pack compartment */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.44, 0.56, 0.24]} />
            <meshStandardMaterial color="#334155" roughness={0.7} />
          </mesh>

          {/* Rolled sleeping pad / bedroll strapped on top */}
          <mesh position={[0, 0.34, -0.02]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.09, 0.09, 0.54, 16]} />
            <meshStandardMaterial color="#475569" roughness={0.8} />
          </mesh>

          {/* Strap loops on bedroll */}
          <mesh position={[-0.14, 0.34, -0.02]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.095, 0.095, 0.04, 16]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
          <mesh position={[0.14, 0.34, -0.02]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.095, 0.095, 0.04, 16]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>

          {/* Side utility bottle / pouch */}
          <mesh position={[-0.24, -0.05, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.24, 12]} />
            <meshStandardMaterial color="#06B6D4" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0.24, -0.05, 0]}>
            <boxGeometry args={[0.08, 0.22, 0.12]} />
            <meshStandardMaterial color="#1E293B" />
          </mesh>
        </group>

        {/* Head */}
        <group ref={headRef} position={[0, 0.54, 0]}>
          {/* Neck */}
          <mesh position={[0, -0.12, 0]}>
            <cylinderGeometry args={[0.09, 0.1, 0.1, 8]} />
            <meshStandardMaterial color="#C89666" />
          </mesh>
          {/* Face / Head */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.26, 0.28, 0.28]} />
            <meshStandardMaterial color="#C89666" roughness={0.8} />
          </mesh>
          {/* Dark hair (seen from behind) */}
          <mesh position={[0, 0.08, 0.04]}>
            <boxGeometry args={[0.28, 0.2, 0.26]} />
            <meshStandardMaterial color="#171717" roughness={0.9} />
          </mesh>
        </group>
      </group>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.36, 1.05, 0]}>
        <mesh position={[0, -0.22, 0]}>
          <boxGeometry args={[0.14, 0.52, 0.16]} />
          <meshStandardMaterial color="#1E293B" roughness={0.7} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[0.09, 0.12, 0.1]} />
          <meshStandardMaterial color="#C89666" />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.36, 1.05, 0]}>
        <mesh position={[0, -0.22, 0]}>
          <boxGeometry args={[0.14, 0.52, 0.16]} />
          <meshStandardMaterial color="#1E293B" roughness={0.7} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[0.09, 0.12, 0.1]} />
          <meshStandardMaterial color="#C89666" />
        </mesh>
      </group>

      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.16, 0.72, 0]}>
        {/* Cargo pant thigh & shin */}
        <mesh position={[0, -0.34, 0]}>
          <boxGeometry args={[0.18, 0.68, 0.2]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
        {/* Cargo pocket */}
        <mesh position={[-0.09, -0.25, 0]}>
          <boxGeometry args={[0.04, 0.18, 0.14]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        {/* Hiking Boot */}
        <mesh position={[0, -0.68, -0.06]}>
          <boxGeometry args={[0.16, 0.14, 0.28]} />
          <meshStandardMaterial color="#171717" roughness={0.9} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.16, 0.72, 0]}>
        {/* Cargo pant thigh & shin */}
        <mesh position={[0, -0.34, 0]}>
          <boxGeometry args={[0.18, 0.68, 0.2]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
        {/* Cargo pocket */}
        <mesh position={[0.09, -0.25, 0]}>
          <boxGeometry args={[0.04, 0.18, 0.14]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        {/* Hiking Boot */}
        <mesh position={[0, -0.68, -0.06]}>
          <boxGeometry args={[0.16, 0.14, 0.28]} />
          <meshStandardMaterial color="#171717" roughness={0.9} />
        </mesh>
      </group>

      {/* Ground Contact Shadow */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.45, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

export default Character;
