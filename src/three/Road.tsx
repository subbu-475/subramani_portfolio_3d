import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  createRoadGeometry,
  JOURNEY_WAYPOINTS,
  journeyCurve,
  ROAD_END_PROGRESS,
  getJourneyNormal,
  getJourneyTangent
} from './JourneyPath';

export const Road: React.FC = () => {
  const roadGeometry = useMemo(() => createRoadGeometry(500, 3.2), []);

  // Generate road center-line dashes (city-style markings in later chapters)
  const centerDashes = useMemo(() => {
    const dashes: Array<{ position: THREE.Vector3; rotation: number }> = [];
    // Only show road markings from career section onward (~progress 0.33 to road end)
    for (let t = 0.33; t < ROAD_END_PROGRESS; t += 0.007) {
      const pt = journeyCurve.getPointAt(t);
      const tangent = journeyCurve.getTangentAt(t).normalize();
      const yaw = Math.atan2(tangent.x, -tangent.z);
      dashes.push({ position: pt.clone(), rotation: yaw });
    }
    return dashes;
  }, []);

  // Calculate waypoint landmark lantern positions aligned with road normals
  const milestoneLanterns = useMemo(() => {
    // Landmark waypoint indices on ground: 3 (College), 5 (Code), 7 (Career), 9 (Projects), 11 (Skills), 13 (Today)
    const indices = [3, 5, 7, 9, 11, 13];
    return indices.map((idx) => {
      const wp = JOURNEY_WAYPOINTS[idx];
      // Progress along spline
      const t = idx / (JOURNEY_WAYPOINTS.length - 1);
      const normal = getJourneyNormal(t);
      const tangent = getJourneyTangent(t);
      const yaw = Math.atan2(tangent.x, -tangent.z);

      const leftPos = wp.clone().addScaledVector(normal, 2.0);
      const rightPos = wp.clone().addScaledVector(normal, -2.0);

      return {
        key: `wp-lantern-${idx}`,
        center: wp,
        leftPos,
        rightPos,
        yaw,
      };
    });
  }, []);

  return (
    <group>
      {/* Main Spline Road Ribbon */}
      <mesh geometry={roadGeometry} receiveShadow>
        <meshStandardMaterial
          color="#16181e"
          roughness={0.7}
          metalness={0.15}
          polygonOffset
          polygonOffsetFactor={-1}
        />
      </mesh>

      {/* Road Center Line Dashes (appear from career chapter onward) */}
      {centerDashes.map((dash, idx) => (
        <mesh
          key={`dash-${idx}`}
          position={[dash.position.x, dash.position.y + 0.025, dash.position.z]}
          rotation={[-Math.PI / 2, 0, dash.rotation]}
        >
          <planeGeometry args={[0.2, 1.4]} />
          <meshBasicMaterial color="#FDE047" transparent opacity={0.75} />
        </mesh>
      ))}

      {/* Chapter Milestone Lanterns positioned along perpendicular road normals */}
      {milestoneLanterns.map((m) => (
        <group key={m.key}>
          {/* Left lantern */}
          <group position={[m.leftPos.x, m.leftPos.y, m.leftPos.z]}>
            <mesh position={[0, 0.45, 0]}>
              <cylinderGeometry args={[0.04, 0.06, 0.9, 8]} />
              <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.95, 0]}>
              <boxGeometry args={[0.16, 0.22, 0.16]} />
              <meshStandardMaterial
                color="#06B6D4"
                emissive="#06B6D4"
                emissiveIntensity={1.2}
                transparent
                opacity={0.9}
              />
            </mesh>
            <pointLight position={[0, 0.95, 0]} color="#06B6D4" intensity={0.5} distance={5} />
          </group>

          {/* Right lantern */}
          <group position={[m.rightPos.x, m.rightPos.y, m.rightPos.z]}>
            <mesh position={[0, 0.45, 0]}>
              <cylinderGeometry args={[0.04, 0.06, 0.9, 8]} />
              <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.95, 0]}>
              <boxGeometry args={[0.16, 0.22, 0.16]} />
              <meshStandardMaterial
                color="#06B6D4"
                emissive="#06B6D4"
                emissiveIntensity={1.2}
                transparent
                opacity={0.9}
              />
            </mesh>
            <pointLight position={[0, 0.95, 0]} color="#06B6D4" intensity={0.5} distance={5} />
          </group>

          {/* Ground Chapter Milestone Disc */}
          <mesh position={[m.center.x, m.center.y + 0.025, m.center.z]} rotation={[-Math.PI / 2, 0, m.yaw]}>
            <ringGeometry args={[0.7, 0.85, 32]} />
            <meshBasicMaterial color="#06B6D4" transparent opacity={0.35} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default Road;
