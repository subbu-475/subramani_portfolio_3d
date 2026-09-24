import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useJourneyStore } from '../store/journeyStore';

export const Character: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const torsoRef = useRef<THREE.Group>(null);

  const journeyProgress = useJourneyStore((state) => state.journeyProgress);
  const qualityLevel = useJourneyStore((state) => state.qualityLevel);
  const prevZ = useRef(0);
  const isMoving = useRef(false);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // The camera moves from z=0 to z=-280. Character stays ~6 units ahead.
    const targetZ = -280 * journeyProgress - 6;

    // Smooth lerp to position
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      delta * 4.5
    );

    // Subtle sway across road
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      Math.sin(state.clock.elapsedTime * 0.4) * 0.4,
      delta * 2
    );

    // Detect if character is actively moving along Z
    const speed = Math.abs(groupRef.current.position.z - prevZ.current) / Math.max(delta, 0.001);
    isMoving.current = speed > 0.05;
    prevZ.current = groupRef.current.position.z;

    const walkSpeed = 8;
    const walkCycle = Math.sin(state.clock.elapsedTime * walkSpeed);

    // Legs animation
    if (leftLegRef.current && rightLegRef.current) {
      if (isMoving.current) {
        leftLegRef.current.rotation.x = walkCycle * 0.6;
        rightLegRef.current.rotation.x = -walkCycle * 0.6;
      } else {
        // Idle breathing
        leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, delta * 4);
        rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, delta * 4);
      }
    }

    // Arms animation
    if (leftArmRef.current && rightArmRef.current) {
      if (isMoving.current) {
        leftArmRef.current.rotation.x = -walkCycle * 0.5;
        rightArmRef.current.rotation.x = walkCycle * 0.5;
      } else {
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, delta * 4);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, delta * 4);
      }
    }

    // Torso bobbing
    if (torsoRef.current) {
      const bobY = isMoving.current ? Math.abs(Math.sin(state.clock.elapsedTime * walkSpeed)) * 0.08 : Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
      torsoRef.current.position.y = 1.1 + bobY;
    }
  });

  if (qualityLevel === 'low') {
    // Simplified silhouette for low quality
    return (
      <group ref={groupRef} position={[0, 0, -6]}>
        <mesh position={[0, 1, 0]}>
          <capsuleGeometry args={[0.3, 0.9, 4, 8]} />
          <meshStandardMaterial color="#0B0D10" emissive="#06B6D4" emissiveIntensity={0.2} />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={groupRef} position={[0, 0, -6]} rotation={[0, Math.PI, 0]}>
      {/* Torso & Head */}
      <group ref={torsoRef} position={[0, 1.1, 0]}>
        {/* Jacket / Chest */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.6, 0.3]} />
          <meshStandardMaterial color="#11151A" roughness={0.7} metalness={0.2} />
        </mesh>

        {/* Tech Backpack / Energy core */}
        <mesh position={[0, 0.05, 0.2]}>
          <boxGeometry args={[0.35, 0.45, 0.15]} />
          <meshStandardMaterial color="#0B0D10" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Backpack light strip */}
        <mesh position={[0, 0.05, 0.28]}>
          <planeGeometry args={[0.08, 0.3]} />
          <meshBasicMaterial color="#06B6D4" />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.08, 0.09, 0.1, 8]} />
          <meshStandardMaterial color="#0B0D10" />
        </mesh>

        {/* Head */}
        <mesh position={[0, 0.52, 0]}>
          <boxGeometry args={[0.26, 0.28, 0.26]} />
          <meshStandardMaterial color="#11151A" roughness={0.6} metalness={0.4} />
        </mesh>

        {/* Visor glowing line (facing backward since character looks forward along -Z) */}
        <mesh position={[0, 0.54, -0.135]}>
          <planeGeometry args={[0.22, 0.06]} />
          <meshBasicMaterial color="#06B6D4" />
        </mesh>
      </group>

      {/* Left Arm */}
      <mesh ref={leftArmRef} position={[-0.35, 1.05, 0]}>
        <boxGeometry args={[0.12, 0.55, 0.14]} />
        <meshStandardMaterial color="#0B0D10" roughness={0.7} />
      </mesh>

      {/* Right Arm */}
      <mesh ref={rightArmRef} position={[0.35, 1.05, 0]}>
        <boxGeometry args={[0.12, 0.55, 0.14]} />
        <meshStandardMaterial color="#0B0D10" roughness={0.7} />
      </mesh>

      {/* Left Leg */}
      <mesh ref={leftLegRef} position={[-0.15, 0.4, 0]}>
        <boxGeometry args={[0.16, 0.75, 0.18]} />
        <meshStandardMaterial color="#050505" roughness={0.8} />
      </mesh>

      {/* Right Leg */}
      <mesh ref={rightLegRef} position={[0.15, 0.4, 0]}>
        <boxGeometry args={[0.16, 0.75, 0.18]} />
        <meshStandardMaterial color="#050505" roughness={0.8} />
      </mesh>

      {/* Subtle footstep shadow / ground glow */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.4, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

export default Character;
