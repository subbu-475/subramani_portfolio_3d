import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../store/journeyStore';

export const Character: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const journeyProgress = useJourneyStore((state) => state.journeyProgress);
  const prevZ = useRef(0);
  const isMoving = useRef(false);

  // Load the 3D GLB model of Subbu
  const { scene } = useGLTF('/models/subbu_sample.glb');

  // Clone scene so it can be safely manipulated and shadows enabled
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Follow journey progress along 360 units, staying ~4.5 units ahead of camera
    const targetZ = -360 * journeyProgress - 4.5;

    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      delta * 4.5
    );

    // Subtle natural sway across trail
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      Math.sin(state.clock.elapsedTime * 0.35) * 0.1,
      delta * 2
    );

    // Detect movement speed along Z
    const speed = Math.abs(groupRef.current.position.z - prevZ.current) / Math.max(delta, 0.001);
    isMoving.current = speed > 0.035;
    prevZ.current = groupRef.current.position.z;

    const walkSpeed = 9;

    // Natural walking motion & breathing on the 3D model
    if (modelRef.current) {
      if (isMoving.current) {
        // Dynamic walking bob and slight yaw/tilt sway while moving
        const bob = Math.abs(Math.sin(state.clock.elapsedTime * walkSpeed)) * 0.06;
        const sway = Math.sin(state.clock.elapsedTime * (walkSpeed / 2)) * 0.03;
        const tilt = Math.cos(state.clock.elapsedTime * (walkSpeed / 2)) * 0.02;
        modelRef.current.position.y = 0.9 + bob;
        modelRef.current.rotation.z = tilt;
        modelRef.current.rotation.y = Math.PI + sway; // Facing down -Z with subtle walking sway
      } else {
        // Idle breathing motion when standing at a chapter stop
        const breathe = Math.sin(state.clock.elapsedTime * 1.5) * 0.012;
        modelRef.current.position.y = THREE.MathUtils.lerp(
          modelRef.current.position.y,
          0.9 + breathe,
          delta * 4
        );
        modelRef.current.rotation.z = THREE.MathUtils.lerp(
          modelRef.current.rotation.z,
          0,
          delta * 4
        );
        modelRef.current.rotation.y = THREE.MathUtils.lerp(
          modelRef.current.rotation.y,
          Math.PI,
          delta * 4
        );
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -4.5]}>
      {/* 3D GLB Model of Subbu Traveler (scaled to realistic human proportions) */}
      <group ref={modelRef} position={[0, 0.9, 0]} rotation={[0, Math.PI, 0]}>
        <primitive object={clonedScene} scale={[1.8, 1.8, 1.8]} />
      </group>

      {/* Ground Contact Shadow */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.45, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.45} />
      </mesh>
    </group>
  );
};

useGLTF.preload('/models/subbu_sample.glb');

export default Character;
