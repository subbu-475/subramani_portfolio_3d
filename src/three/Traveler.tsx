import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../store/journeyStore';
import { getJourneyPosition, getJourneyFacingYaw } from './JourneyPath';

export interface TravelerProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  followPath?: boolean;
  animation?: 'idle' | 'walk' | 'look';
}

/**
 * Universal Traveler component representing Subramani travelling through the 3D portfolio.
 * Calibrated for exact 1.71m human scale, natural walking kinematics, path tangent alignment,
 * and contact shadow. Handles vertical ascent into space.
 */
export const Traveler: React.FC<TravelerProps> = ({
  position,
  rotation,
  scale = 0.19,
  followPath = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const journeyProgress = useJourneyStore((state) => state.journeyProgress);

  const prevPos = useRef(new THREE.Vector3());
  const isMoving = useRef(false);
  const currentPathPos = useRef(new THREE.Vector3());
  const currentYaw = useRef(-Math.PI / 2);

  // Load the traveler GLB model
  const [modelError, setModelError] = useState(false);
  
  const gltfPath = '/models/traveler/subramani-traveler.glb';
  const gltf = useGLTF(gltfPath, undefined, undefined, () => {
    setModelError(true);
  });

  // Clone scene so materials and shadows can be cleanly managed
  const clonedScene = useMemo(() => {
    if (!gltf?.scene) return null;
    const clone = gltf.scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [gltf?.scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (followPath) {
      // Calculate target position on the 3D spline curve
      const splineTarget = getJourneyPosition(journeyProgress);

      // Smoothly lerp towards target position
      currentPathPos.current.lerp(splineTarget, Math.min(1, delta * 5.0));
      groupRef.current.position.copy(currentPathPos.current);

      // Calculate path tangent facing yaw (handles vertical movement)
      const targetYaw = getJourneyFacingYaw(journeyProgress);
      // Smoothly interpolate yaw to avoid snap turns during switchbacks
      currentYaw.current = THREE.MathUtils.lerp(currentYaw.current, targetYaw, delta * 3.5);

      // Detect movement speed
      const distMoved = groupRef.current.position.distanceTo(prevPos.current);
      const speed = distMoved / Math.max(delta, 0.001);
      isMoving.current = speed > 0.04;
      prevPos.current.copy(groupRef.current.position);
    } else if (position) {
      groupRef.current.position.set(position[0], position[1], position[2]);
    }

    // Kinematic motion & animations
    if (modelRef.current) {
      const walkSpeed = 9;

      if (followPath) {
        if (isMoving.current) {
          // Dynamic walking bob and torso sway while traveling along the path
          const bob = Math.abs(Math.sin(state.clock.elapsedTime * walkSpeed)) * 0.038;
          const sway = Math.sin(state.clock.elapsedTime * (walkSpeed / 2)) * 0.025;
          const tilt = Math.cos(state.clock.elapsedTime * (walkSpeed / 2)) * 0.015;

          modelRef.current.position.y = 0.855 + bob;
          modelRef.current.rotation.z = tilt;
          modelRef.current.rotation.y = currentYaw.current + sway;
        } else {
          // Idle breathing and gentle posture when standing at a chapter stop
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
            currentYaw.current,
            delta * 4
          );
        }
      } else if (rotation) {
        modelRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);
        modelRef.current.position.y = 0.855;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* 
        Traveler Model:
        - Scale [0.19, 0.19, 0.19] normalizes 9.0 unit source mesh to 1.71m realistic height
        - Y = 0.855 places shoes flush on ground/road surface
        - Rotation aligns chest forward down road tangent and back facing camera
      */}
      <group
        ref={modelRef}
        position={[0, 0.855, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        {clonedScene && !modelError ? (
          <primitive object={clonedScene} scale={[scale, scale, scale]} />
        ) : (
          // Silhouette fallback if GLB is loading or unavailable
          <group scale={[scale, scale, scale]}>
            <mesh position={[0, 4.0, 0]} castShadow>
              <capsuleGeometry args={[0.9, 3.2, 8, 16]} />
              <meshStandardMaterial color="#06B6D4" roughness={0.4} />
            </mesh>
            <mesh position={[0, 6.2, 0]} castShadow>
              <sphereGeometry args={[0.7, 16, 16]} />
              <meshStandardMaterial color="#06B6D4" roughness={0.4} />
            </mesh>
          </group>
        )}
      </group>

      {/* Ground Contact Shadow beneath character sneakers */}
      <mesh position={[0, 0.018, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.38, 24]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.45} depthWrite={false} />
      </mesh>
    </group>
  );
};

// Preload the traveler model
useGLTF.preload('/models/traveler/subramani-traveler.glb');
useGLTF.preload('/models/subbu_sample.glb');

export default Traveler;
