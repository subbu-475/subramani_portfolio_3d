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
  const currentChapter = useJourneyStore((state) => state.currentChapter);
  const prevZ = useRef(0);
  const isMoving = useRef(false);

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

    // Detect movement speed
    const speed = Math.abs(groupRef.current.position.z - prevZ.current) / Math.max(delta, 0.001);
    isMoving.current = speed > 0.035;
    prevZ.current = groupRef.current.position.z;

    const walkSpeed = 9;
    const walkCycle = Math.sin(state.clock.elapsedTime * walkSpeed);

    // Realistic walking stride animation
    if (leftLegRef.current && rightLegRef.current) {
      if (isMoving.current) {
        leftLegRef.current.rotation.x = walkCycle * 0.65;
        rightLegRef.current.rotation.x = -walkCycle * 0.65;
      } else {
        leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, delta * 5);
        rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, delta * 5);
      }
    }

    // Natural arm swinging opposite to legs
    if (leftArmRef.current && rightArmRef.current) {
      if (isMoving.current) {
        leftArmRef.current.rotation.x = -walkCycle * 0.55;
        rightArmRef.current.rotation.x = walkCycle * 0.55;
      } else {
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, delta * 5);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, delta * 5);
      }
    }

    // Natural torso bobbing and spine breathing
    if (torsoRef.current) {
      const bobY = isMoving.current
        ? Math.abs(Math.sin(state.clock.elapsedTime * walkSpeed)) * 0.08
        : Math.sin(state.clock.elapsedTime * 1.5) * 0.015;
      torsoRef.current.position.y = 1.08 + bobY;
    }

    // Head posture reflecting current chapter surroundings
    if (headRef.current) {
      if (currentChapter === 1) {
        // Look up at university clock tower
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -0.32, delta * 3);
      } else if (currentChapter === 3) {
        // Look up at skyscrapers in Career City
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -0.22, delta * 3);
      } else {
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0, delta * 3);
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -4.5]} rotation={[0, Math.PI, 0]}>
      {/* ========================================================= */}
      {/* 1. TORSO, HOODIE & HIKING BACKPACK */}
      {/* ========================================================= */}
      <group ref={torsoRef} position={[0, 1.08, 0]}>
        {/* Dark Charcoal / Navy Zip-up Hoodie */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.54, 0.65, 0.3]} />
          <meshStandardMaterial color="#1E232A" roughness={0.7} />
        </mesh>

        {/* White Crewneck T-Shirt peaking out at open front and collar */}
        <mesh position={[0, 0.12, -0.152]}>
          <planeGeometry args={[0.18, 0.32]} />
          <meshBasicMaterial color="#F8FAFC" />
        </mesh>

        {/* Rolled Hoodie Collar around the neck */}
        <mesh position={[0, 0.32, 0.08]}>
          <boxGeometry args={[0.42, 0.18, 0.22]} />
          <meshStandardMaterial color="#171C22" roughness={0.8} />
        </mesh>

        {/* 3D HIKING BACKPACK (Matching Subramani's reference model sheet) */}
        <group position={[0, 0.04, 0.2]}>
          {/* Main Canvas Backpack Body */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.46, 0.58, 0.24]} />
            <meshStandardMaterial color="#2B323B" roughness={0.7} />
          </mesh>

          {/* Top Flap */}
          <mesh position={[0, 0.25, 0.02]}>
            <boxGeometry args={[0.47, 0.16, 0.26]} />
            <meshStandardMaterial color="#1E242B" roughness={0.8} />
          </mesh>

          {/* Cognac Brown Leather Vertical Straps (Dual vertical harness) */}
          <mesh position={[-0.14, 0, 0.125]}>
            <boxGeometry args={[0.04, 0.52, 0.02]} />
            <meshStandardMaterial color="#7C3A21" roughness={0.5} />
          </mesh>
          <mesh position={[0.14, 0, 0.125]}>
            <boxGeometry args={[0.04, 0.52, 0.02]} />
            <meshStandardMaterial color="#7C3A21" roughness={0.5} />
          </mesh>

          {/* Metallic Brass Buckle Clips */}
          <mesh position={[-0.14, -0.05, 0.138]}>
            <boxGeometry args={[0.06, 0.05, 0.02]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0.14, -0.05, 0.138]}>
            <boxGeometry args={[0.06, 0.05, 0.02]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Rolled Bedroll / Sleeping Pad strapped on top */}
          <mesh position={[0, 0.35, -0.02]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 0.52, 16]} />
            <meshStandardMaterial color="#334155" roughness={0.8} />
          </mesh>

          {/* Top Leather Carry Handle */}
          <mesh position={[0, 0.44, 0]}>
            <torusGeometry args={[0.07, 0.016, 8, 16, Math.PI]} rotation={[0, 0, 0]} />
            <meshStandardMaterial color="#7C3A21" />
          </mesh>

          {/* Side Utility Pockets */}
          <mesh position={[-0.24, -0.06, 0]}>
            <boxGeometry args={[0.06, 0.26, 0.14]} />
            <meshStandardMaterial color="#222831" />
          </mesh>
          <mesh position={[0.24, -0.06, 0]}>
            <boxGeometry args={[0.06, 0.26, 0.14]} />
            <meshStandardMaterial color="#222831" />
          </mesh>
        </group>

        {/* 3D HEAD & FACIAL STRUCTURE (Subramani's features from reference image) */}
        <group ref={headRef} position={[0, 0.52, 0]}>
          {/* Neck */}
          <mesh position={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.08, 0.09, 0.12, 12]} />
            <meshStandardMaterial color="#C89364" roughness={0.7} />
          </mesh>
          {/* Head & Face */}
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.26, 0.28, 0.26]} />
            <meshStandardMaterial color="#C89364" roughness={0.7} />
          </mesh>
          {/* Trimmed Dark Beard & Mustache */}
          <mesh position={[0, -0.06, -0.132]}>
            <boxGeometry args={[0.2, 0.14, 0.02]} />
            <meshStandardMaterial color="#1A1513" roughness={0.9} />
          </mesh>
          {/* Short Dark Hair with slight fade */}
          <mesh position={[0, 0.1, 0.02]}>
            <boxGeometry args={[0.28, 0.18, 0.26]} />
            <meshStandardMaterial color="#1A1513" roughness={0.9} />
          </mesh>
        </group>
      </group>

      {/* ========================================================= */}
      {/* 2. ARMS (Dark Charcoal Hoodie sleeves pushed up to forearms) */}
      {/* ========================================================= */}
      {/* Left Arm with Black Smartwatch on wrist */}
      <group ref={leftArmRef} position={[-0.35, 1.05, 0]}>
        {/* Upper Arm (Charcoal Hoodie Fabric) */}
        <mesh position={[0, -0.16, 0]}>
          <boxGeometry args={[0.14, 0.32, 0.15]} />
          <meshStandardMaterial color="#1E232A" roughness={0.7} />
        </mesh>
        {/* Forearm (Bare skin - pushed up sleeves) */}
        <mesh position={[0, -0.38, 0]}>
          <boxGeometry args={[0.11, 0.26, 0.12]} />
          <meshStandardMaterial color="#C89364" roughness={0.7} />
        </mesh>
        {/* Black Modern Smartwatch on Left Wrist */}
        <mesh position={[0, -0.44, 0]}>
          <boxGeometry args={[0.13, 0.06, 0.14]} />
          <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.54, 0]}>
          <boxGeometry args={[0.08, 0.12, 0.1]} />
          <meshStandardMaterial color="#C89364" />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.35, 1.05, 0]}>
        <mesh position={[0, -0.16, 0]}>
          <boxGeometry args={[0.14, 0.32, 0.15]} />
          <meshStandardMaterial color="#1E232A" roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.38, 0]}>
          <boxGeometry args={[0.11, 0.26, 0.12]} />
          <meshStandardMaterial color="#C89364" roughness={0.7} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.54, 0]}>
          <boxGeometry args={[0.08, 0.12, 0.1]} />
          <meshStandardMaterial color="#C89364" />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 3. LEGS & FOOTWEAR (Olive Green Cargo Joggers + White Trainers) */}
      {/* ========================================================= */}
      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.15, 0.72, 0]}>
        {/* Olive Green Cargo Joggers */}
        <mesh position={[0, -0.34, 0]}>
          <boxGeometry args={[0.18, 0.68, 0.2]} />
          <meshStandardMaterial color="#4A5644" roughness={0.8} />
        </mesh>
        {/* Side Flap Cargo Pocket */}
        <mesh position={[-0.1, -0.22, 0]}>
          <boxGeometry args={[0.04, 0.2, 0.15]} />
          <meshStandardMaterial color="#3E4939" roughness={0.8} />
        </mesh>
        {/* Ribbed Ankle Cuff */}
        <mesh position={[0, -0.66, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.08, 12]} />
          <meshStandardMaterial color="#343D2F" />
        </mesh>
        {/* Clean White Sneaker / Trainer */}
        <mesh position={[0, -0.73, -0.06]}>
          <boxGeometry args={[0.15, 0.12, 0.28]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.35} />
        </mesh>
        {/* Grey Runner Sole */}
        <mesh position={[0, -0.78, -0.06]}>
          <boxGeometry args={[0.16, 0.04, 0.3]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.6} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.15, 0.72, 0]}>
        <mesh position={[0, -0.34, 0]}>
          <boxGeometry args={[0.18, 0.68, 0.2]} />
          <meshStandardMaterial color="#4A5644" roughness={0.8} />
        </mesh>
        {/* Side Flap Cargo Pocket */}
        <mesh position={[0.1, -0.22, 0]}>
          <boxGeometry args={[0.04, 0.2, 0.15]} />
          <meshStandardMaterial color="#3E4939" roughness={0.8} />
        </mesh>
        {/* Ribbed Ankle Cuff */}
        <mesh position={[0, -0.66, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.08, 12]} />
          <meshStandardMaterial color="#343D2F" />
        </mesh>
        {/* Clean White Sneaker / Trainer */}
        <mesh position={[0, -0.73, -0.06]}>
          <boxGeometry args={[0.15, 0.12, 0.28]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.35} />
        </mesh>
        {/* Grey Runner Sole */}
        <mesh position={[0, -0.78, -0.06]}>
          <boxGeometry args={[0.16, 0.04, 0.3]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.6} />
        </mesh>
      </group>

      {/* Ground Contact Shadow */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.45, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.45} />
      </mesh>
    </group>
  );
};

export default Character;
