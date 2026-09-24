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

    // Follow journey progress along 360 units, staying ~4.0 units ahead of camera
    const targetZ = -360 * journeyProgress - 3.8;

    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      delta * 4.5
    );

    // Subtle natural sway across trail
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      Math.sin(state.clock.elapsedTime * 0.35) * 0.08,
      delta * 2
    );

    // Detect movement speed along Z
    const speed = Math.abs(groupRef.current.position.z - prevZ.current) / Math.max(delta, 0.001);
    isMoving.current = speed > 0.035;
    prevZ.current = groupRef.current.position.z;

    const walkSpeed = 9;

    // Natural walking motion & breathing on the 3D model
    // -Math.PI / 2 (-90 deg) is the EXACT orientation where the character's back faces camera (+Z)
    // and chest/face/toes point down the road (-Z)
    const baseFacingAngle = -Math.PI / 2;

    if (modelRef.current) {
      if (isMoving.current) {
        // Dynamic walking bob and slight yaw/tilt sway while moving
        const bob = Math.abs(Math.sin(state.clock.elapsedTime * walkSpeed)) * 0.04;
        const sway = Math.sin(state.clock.elapsedTime * (walkSpeed / 2)) * 0.025;
        const tilt = Math.cos(state.clock.elapsedTime * (walkSpeed / 2)) * 0.015;
        modelRef.current.position.y = 0.855 + bob;
        modelRef.current.rotation.z = tilt;
        modelRef.current.rotation.y = baseFacingAngle + sway;
      } else {
        // Idle breathing motion when standing at a chapter stop
        const breathe = Math.sin(state.clock.elapsedTime * 1.5) * 0.008;
        modelRef.current.position.y = THREE.MathUtils.lerp(
          modelRef.current.position.y,
          0.855 + breathe,
          delta * 4
        );
        modelRef.current.rotation.z = THREE.MathUtils.lerp(
          modelRef.current.rotation.z,
          0,
          delta * 4
        );
        modelRef.current.rotation.y = THREE.MathUtils.lerp(
          modelRef.current.rotation.y,
          baseFacingAngle,
          delta * 4
        );
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -3.8]}>
      {/* 
        Raw GLB model height is 9.0 units (Y from -4.5 to +4.5).
        Scale 0.19 makes it exactly 1.71 units tall (realistic human height).
        Position Y = 0.855 places the shoes perfectly flat on ground Y = 0.0.
        Rotation Y = -Math.PI / 2 makes the character face forward down -Z (away from camera).
      */}
      <group
        ref={modelRef}
        position={[0, 0.855, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <primitive object={clonedScene} scale={[0.19, 0.19, 0.19]} />
      </group>

      {/* Ground Contact Shadow beneath character's shoes */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.38, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

useGLTF.preload('/models/subbu_sample.glb');

export default Character;
