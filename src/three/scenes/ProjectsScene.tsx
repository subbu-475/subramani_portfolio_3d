import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../../store/journeyStore';
import { PROJECT_COMPARTMENTS, type ProjectCompartment } from '../../data/projectCompartments';

/**
 * CHAPTER 04 — PROJECTS: INDIAN VANDE BHARAT EXPRESS AT RAILWAY LEVEL CROSSING
 * 
 * Cinematic Indian Railway Level Crossing (Railway Gate) experience.
 * The high-speed Indian Vande Bharat Express (Train 18) speeds across the
 * road from RIGHT to LEFT on dual broad-gauge electrified tracks.
 * 
 * Each compartment features interactive project details, illuminated 3D screens,
 * exterior digital coach boards, and authentic Vande Bharat livery.
 * 
 * Level Crossing Elements:
 * - Red & white striped railway gate boom barriers with flashing red warning beacons
 * - Classic Indian Railways gatekeeper cabin (Ghumti) with tiled roof and solar panel
 * - Indian Railways caution signboard & "W/L" / "सी/फा" whistle boards
 * - Overhead Electrification (OHE) catenary portal masts with high-voltage contact wire
 * - Color Light Signal (CLS) showing green clear for the express
 * - Dual steel tracks with crushed basalt ballast and concrete sleepers
 */

// ─── 1. BOGIE WHEEL TRUCK (FLANGED STEEL WHEELS ON RAILS) ─────────────────────
interface BogieProps {
  position: [number, number, number];
  wheelRotation: number;
}

const BogieTruck: React.FC<BogieProps> = ({ position, wheelRotation }) => {
  return (
    <group position={position}>
      {/* Bogie Steel Chassis Frame */}
      <mesh position={[0, 0.28, 0]}>
        <boxGeometry args={[2.5, 0.16, 2.1]} />
        <meshStandardMaterial color="#1E232E" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* Secondary Air Spring Bellows & Pivot Bolster */}
      <mesh position={[0, 0.44, 0]}>
        <cylinderGeometry args={[0.32, 0.36, 0.2, 12]} />
        <meshStandardMaterial color="#0F172A" metalness={0.7} />
      </mesh>
      {/* Primary Coil Suspension */}
      {[-0.85, 0.85].map((sx, i) => (
        <group key={`susp-${i}`} position={[sx, 0.3, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.24, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </group>
      ))}

      {/* 4 Flanged Steel Wheels (y = 0.22) */}
      {[-0.9, 0.9].map((wx, i) => (
        <group key={`axle-${i}`} position={[wx, 0.22, 0]}>
          {/* Steel Axle Shaft */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 2.0, 12]} />
            <meshStandardMaterial color="#334155" metalness={0.9} />
          </mesh>

          {/* Left Flanged Wheel (Z = +0.84) */}
          <group position={[0, 0, 0.84]} rotation={[0, 0, wheelRotation]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.34, 0.34, 0.12, 24]} />
              <meshStandardMaterial color="#64748B" metalness={0.95} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0, -0.06]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.38, 0.38, 0.03, 24]} />
              <meshStandardMaterial color="#475569" metalness={0.95} />
            </mesh>
          </group>

          {/* Right Flanged Wheel (Z = -0.84) */}
          <group position={[0, 0, -0.84]} rotation={[0, 0, wheelRotation]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.34, 0.34, 0.12, 24]} />
              <meshStandardMaterial color="#64748B" metalness={0.95} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.38, 0.38, 0.03, 24]} />
              <meshStandardMaterial color="#475569" metalness={0.95} />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
};

// ─── 2. CATEGORY-SPECIFIC INTERIOR 3D PROJECT EXHIBIT ─────────────────────────
interface WindowScreenProps {
  type: string;
  active: boolean;
  accent: string;
}

const CategoryProjectExhibit: React.FC<WindowScreenProps> = ({ type, active, accent }) => {
  const intensity = active ? 1.0 : 0.3;

  return (
    <group position={[0, 1.85, 0.6]}>
      {type === 'ecommerce' && (
        <group>
          {/* E-Commerce Shopping Experience & Payment Checkout Flow */}
          <mesh position={[-1.3, 0.05, 0]}>
            <boxGeometry args={[1.3, 0.8, 0.04]} />
            <meshStandardMaterial color="#07111E" emissive={accent} emissiveIntensity={intensity} />
          </mesh>
          <mesh position={[0.1, -0.05, 0]}>
            <boxGeometry args={[1.1, 0.65, 0.04]} />
            <meshStandardMaterial color="#0A1628" emissive="#38BDF8" emissiveIntensity={intensity * 0.8} />
          </mesh>
          <mesh position={[1.4, 0.1, 0]}>
            <boxGeometry args={[0.9, 0.7, 0.04]} />
            <meshStandardMaterial color="#07111E" emissive="#10B981" emissiveIntensity={intensity * 0.9} />
          </mesh>
        </group>
      )}

      {(type === 'hrms' || type === 'hrms-workforce') && (
        <group>
          {/* HRMS Employee Telemetry & Attendance Cycles */}
          <mesh position={[-1.2, 0, 0]}>
            <boxGeometry args={[1.3, 0.8, 0.04]} />
            <meshStandardMaterial color="#09141D" emissive="#10B981" emissiveIntensity={intensity} />
          </mesh>
          <mesh position={[0.2, 0.1, 0]}>
            <boxGeometry args={[1.0, 0.65, 0.04]} />
            <meshStandardMaterial color="#07111E" emissive={accent} emissiveIntensity={intensity * 0.7} />
          </mesh>
          <mesh position={[1.5, -0.05, 0]}>
            <boxGeometry args={[0.85, 0.7, 0.04]} />
            <meshStandardMaterial color="#09141D" emissive="#38BDF8" emissiveIntensity={intensity * 0.8} />
          </mesh>
        </group>
      )}

      {(type === 'frappe-erp' || type === 'erp-business') && (
        <group>
          {/* ERP Automated Workflows & DocType Schema Nodes */}
          <mesh position={[-1.3, 0.05, 0]}>
            <boxGeometry args={[1.3, 0.8, 0.04]} />
            <meshStandardMaterial color="#0F172A" emissive="#F59E0B" emissiveIntensity={intensity} />
          </mesh>
          <mesh position={[0.1, -0.05, 0]}>
            <boxGeometry args={[1.1, 0.65, 0.04]} />
            <meshStandardMaterial color="#0B132B" emissive={accent} emissiveIntensity={intensity * 0.8} />
          </mesh>
          <mesh position={[1.4, 0.1, 0]}>
            <boxGeometry args={[0.9, 0.7, 0.04]} />
            <meshStandardMaterial color="#0F172A" emissive="#E2E8F0" emissiveIntensity={intensity * 0.6} />
          </mesh>
        </group>
      )}

      {(type === 'service-booking') && (
        <group>
          {/* Service Booking Smartphone & Schedule Displays */}
          {[-1.1, 0.15, 1.4].map((px, i) => (
            <mesh key={`phone-${i}`} position={[px, 0, 0]}>
              <boxGeometry args={[0.55, 0.95, 0.04]} />
              <meshStandardMaterial
                color="#060A14"
                emissive="#38BDF8"
                emissiveIntensity={intensity * (i === 1 ? 1.0 : 0.7)}
              />
            </mesh>
          ))}
        </group>
      )}

      {(type === 'task-management' || type === 'admin-analytics') && (
        <group>
          {/* Task Management Telemetry & Real-Time Sync */}
          <mesh position={[-1.3, 0.05, 0]}>
            <boxGeometry args={[1.3, 0.8, 0.04]} />
            <meshStandardMaterial color="#0B1220" emissive="#F59E0B" emissiveIntensity={intensity} />
          </mesh>
          <mesh position={[0.1, -0.05, 0]}>
            <boxGeometry args={[1.1, 0.65, 0.04]} />
            <meshStandardMaterial color="#0A0F1D" emissive="#38BDF8" emissiveIntensity={intensity * 0.8} />
          </mesh>
          <mesh position={[1.4, 0.1, 0]}>
            <boxGeometry args={[0.9, 0.7, 0.04]} />
            <meshStandardMaterial color="#0B1220" emissive="#34D399" emissiveIntensity={intensity * 0.7} />
          </mesh>
        </group>
      )}

      {(type === 'mobile-applications' || type === 'saas-web' || type === 'mobile-apps') && (
        <group>
          {/* Mobile Applications & Cross-Platform Suite */}
          <mesh position={[-1.2, 0, 0]}>
            <boxGeometry args={[1.4, 0.8, 0.04]} />
            <meshStandardMaterial color="#07111E" emissive="#34D399" emissiveIntensity={intensity} />
          </mesh>
          <mesh position={[0.3, 0.08, 0]}>
            <boxGeometry args={[1.1, 0.7, 0.04]} />
            <meshStandardMaterial color="#09141D" emissive="#38BDF8" emissiveIntensity={intensity * 0.9} />
          </mesh>
          <mesh position={[1.5, -0.08, 0]}>
            <boxGeometry args={[0.8, 0.6, 0.04]} />
            <meshStandardMaterial color="#07111E" emissive="#FAF7F0" emissiveIntensity={intensity * 0.6} />
          </mesh>
        </group>
      )}
    </group>
  );
};

// ─── 3. INDIAN VANDE BHARAT COACH (COMPARTMENT) ──────────────────────────────
interface VandeBharatCoachProps {
  data: ProjectCompartment;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  wheelRotation: number;
  offsetPos: number; // position along train X
}

const VandeBharatCoach: React.FC<VandeBharatCoachProps> = ({
  data,
  isSelected,
  onSelect,
  wheelRotation,
  offsetPos,
}) => {
  const [hovered, setHovered] = useState(false);
  const interiorLightRef = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    if (interiorLightRef.current) {
      const targetInt = isSelected ? 2.6 : hovered ? 1.6 : 0.9;
      interiorLightRef.current.intensity = THREE.MathUtils.lerp(
        interiorLightRef.current.intensity,
        targetInt,
        delta * 5.0
      );
    }
  });

  return (
    <group
      position={[offsetPos, 0, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* ── Main Coach Body: Pristine Vande Bharat Glossy White ── */}
      <mesh position={[0, 1.88, 0]} castShadow receiveShadow>
        <boxGeometry args={[7.2, 2.7, 2.5]} />
        <meshStandardMaterial
          color="#FAF7F0"
          roughness={0.25}
          metalness={0.2}
        />
      </mesh>

      {/* ── Vande Bharat Signature Continuous Royal Navy Blue Window Band ── */}
      <mesh position={[0, 2.05, 0]}>
        <boxGeometry args={[7.22, 1.05, 2.52]} />
        <meshStandardMaterial
          color="#0F2C59"
          roughness={0.2}
          metalness={0.35}
        />
      </mesh>

      {/* ── Vande Bharat Signature Vibrant Saffron / Orange Speed Pinstripe ── */}
      <mesh position={[0, 1.48, 0]}>
        <boxGeometry args={[7.23, 0.08, 2.53]} />
        <meshStandardMaterial
          color="#FF671F"
          emissive="#EA580C"
          emissiveIntensity={isSelected ? 0.9 : 0.4}
          metalness={0.8}
        />
      </mesh>

      {/* ── Dark Charcoal Underbody Equipment Skirt ── */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[7.25, 0.35, 2.45]} />
        <meshStandardMaterial color="#1E232E" roughness={0.6} metalness={0.9} />
      </mesh>

      {/* ── Aerodynamic Rooftop Enclosure & HVAC Cowling ── */}
      <mesh position={[0, 3.28, 0]}>
        <boxGeometry args={[7.15, 0.22, 2.38]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.3} metalness={0.3} />
      </mesh>
      <mesh position={[0, 3.46, 0]}>
        <boxGeometry args={[4.4, 0.16, 1.4]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>

      {/* ── Panoramic Flush Dark-Tinted Passenger Windows (Crossing View Side Z = +1.26) ── */}
      {[-2.1, -0.7, 0.7, 2.1].map((wx, i) => (
        <group key={`win-${i}`} position={[wx, 2.05, 1.26]}>
          <mesh>
            <boxGeometry args={[1.15, 0.88, 0.04]} />
            <meshPhysicalMaterial
              color="#CBD5E1"
              transmission={0.88}
              opacity={0.35}
              transparent
              roughness={0.08}
              thickness={0.2}
            />
          </mesh>
          {/* Black Rubber Window Gasket Frame */}
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[1.19, 0.92, 0.01]} />
            <meshStandardMaterial color="#0A0F1D" metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* ── Category-Specific 3D Project Exhibit Visible Inside ── */}
      <CategoryProjectExhibit
        type={data.id}
        active={isSelected || hovered}
        accent={data.accentColor}
      />

      {/* ── Automatic Sliding Plug Passenger Door with Orange Status LED ── */}
      <group position={[0.0, 1.62, 1.27]}>
        <mesh>
          <boxGeometry args={[0.95, 2.1, 0.02]} />
          <meshStandardMaterial color="#0F2C59" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Door Glass Inset */}
        <mesh position={[0, 0.35, 0.02]}>
          <boxGeometry args={[0.42, 0.7, 0.02]} />
          <meshPhysicalMaterial color="#94A3B8" transmission={0.9} transparent opacity={0.3} />
        </mesh>
        {/* Door Orange Status Indicator LED */}
        <mesh position={[0.35, 1.15, 0.02]}>
          <cylinderGeometry args={[0.03, 0.03, 0.02, 12]} />
          <meshStandardMaterial color="#FF671F" emissive="#FF671F" emissiveIntensity={1.8} />
        </mesh>
      </group>

      {/* ── Exterior Illuminated Digital Coach LED Destination Board ── */}
      <group position={[-2.2, 2.76, 1.27]}>
        <mesh>
          <boxGeometry args={[1.9, 0.42, 0.04]} />
          <meshStandardMaterial color="#050B14" roughness={0.3} metalness={0.9} />
        </mesh>
        {/* LED Matrix Face */}
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[1.82, 0.35]} />
          <meshStandardMaterial
            color="#080E18"
            emissive={isSelected ? data.accentColor : '#F59E0B'}
            emissiveIntensity={isSelected ? 0.9 : 0.35}
          />
        </mesh>

        {/* Coach Code (e.g. EC1, C1) & Project Category Title */}
        <group position={[0, 0, 0.035]}>
          <Text
            position={[-0.72, 0.04, 0]}
            fontSize={0.14}
            color={isSelected ? '#FDE047' : '#F59E0B'}
            letterSpacing={0.1}
            anchorX="left"
            anchorY="middle"
          >
            {data.coachCode}
          </Text>
          <Text
            position={[-0.32, 0.04, 0]}
            fontSize={0.11}
            color="#FAF7F0"
            letterSpacing={0.08}
            anchorX="left"
            anchorY="middle"
          >
            {data.title}
          </Text>
          <Text
            position={[-0.72, -0.11, 0]}
            fontSize={0.075}
            color="#94A3B8"
            letterSpacing={0.05}
            anchorX="left"
            anchorY="middle"
          >
            VANDE BHARAT // 20608
          </Text>
        </group>
      </group>

      {/* ── Bogie Wheel Trucks (Front and Rear) ── */}
      <BogieTruck position={[-2.3, 0, 0]} wheelRotation={wheelRotation} />
      <BogieTruck position={[2.3, 0, 0]} wheelRotation={wheelRotation} />

      {/* Flexible Gangway Interconnect Bellows (linking to previous coach on right) */}
      <mesh position={[3.65, 1.85, 0]}>
        <boxGeometry args={[0.5, 2.5, 2.2]} />
        <meshStandardMaterial color="#111827" roughness={0.9} />
      </mesh>

      {/* Warm Passenger Cabin Ambiance Light */}
      <pointLight
        ref={interiorLightRef}
        position={[0, 2.2, 0.5]}
        color={isSelected ? '#FFFDF0' : '#FED7AA'}
        intensity={isSelected ? 2.6 : 0.9}
        distance={9}
      />

      {/* Highlight Spotlight for Selected Compartment */}
      {isSelected && (
        <spotLight
          position={[0, 7.5, 2.5]}
          target-position={[0, 1.8, 0]}
          color="#FFFDF0"
          intensity={3.8}
          distance={12}
          angle={0.5}
          penumbra={0.6}
        />
      )}
    </group>
  );
};

// ─── 4. INDIAN VANDE BHARAT AERODYNAMIC BULLET NOSE LOCOMOTIVE ───────────────
interface VandeBharatNoseProps {
  position: [number, number, number];
  wheelRotation: number;
}

const VandeBharatNose: React.FC<VandeBharatNoseProps> = ({ position, wheelRotation }) => {
  return (
    <group position={position}>
      {/* ── Main Engine Coach Body ── */}
      <mesh position={[0, 1.88, 0]} castShadow receiveShadow>
        <boxGeometry args={[7.8, 2.7, 2.5]} />
        <meshStandardMaterial color="#FAF7F0" roughness={0.25} metalness={0.2} />
      </mesh>

      {/* ── Royal Navy Blue Window Band extending to front ── */}
      <mesh position={[0, 2.05, 0]}>
        <boxGeometry args={[7.82, 1.05, 2.52]} />
        <meshStandardMaterial color="#0F2C59" roughness={0.2} metalness={0.35} />
      </mesh>

      {/* ── Saffron Waistline Speed Stripe ── */}
      <mesh position={[0, 1.48, 0]}>
        <boxGeometry args={[7.83, 0.08, 2.53]} />
        <meshStandardMaterial color="#FF671F" emissive="#EA580C" emissiveIntensity={0.6} metalness={0.8} />
      </mesh>

      {/* ── Aerodynamic Bullet Nose Cone (Sloping forward towards -X = Left!) ── */}
      <mesh position={[-4.3, 1.55, 0]} rotation={[0, 0, 0.45]} castShadow>
        <boxGeometry args={[2.2, 2.1, 2.48]} />
        <meshStandardMaterial color="#FAF7F0" roughness={0.25} metalness={0.2} />
      </mesh>

      {/* Nose Front Aerodynamic Cowling & Lower Lip */}
      <mesh position={[-5.1, 0.72, 0]} castShadow>
        <boxGeometry args={[1.3, 0.95, 2.44]} />
        <meshStandardMaterial color="#0F2C59" roughness={0.2} metalness={0.4} />
      </mesh>

      {/* Vande Bharat Saffron Accent on Lower Nose Lip */}
      <mesh position={[-5.3, 0.45, 0]}>
        <boxGeometry args={[0.9, 0.2, 2.46]} />
        <meshStandardMaterial color="#FF671F" emissive="#EA580C" emissiveIntensity={0.7} />
      </mesh>

      {/* Aerodynamic Cowcatcher / Cattle Guard under Nose */}
      <group position={[-5.5, 0.22, 0]}>
        <mesh>
          <boxGeometry args={[0.4, 0.32, 2.4]} />
          <meshStandardMaterial color="#1E232E" metalness={0.9} roughness={0.4} />
        </mesh>
        {/* Yellow Hazard Stripes */}
        {[-0.8, -0.3, 0.2, 0.7].map((hz, i) => (
          <mesh key={`haz-${i}`} position={[-0.21, 0, hz]}>
            <boxGeometry args={[0.02, 0.28, 0.12]} />
            <meshStandardMaterial color="#EAB308" />
          </mesh>
        ))}
      </group>

      {/* ── Aerodynamic Driver Panoramic Windshield with Black Visor Mask ── */}
      <mesh position={[-3.9, 2.4, 0]} rotation={[0, 0, 0.45]}>
        <boxGeometry args={[0.08, 0.95, 2.1]} />
        <meshPhysicalMaterial
          color="#0A0F1D"
          transmission={0.8}
          transparent
          opacity={0.3}
          roughness={0.08}
        />
      </mesh>
      {/* Black Visor Bezel Mask around Windshield */}
      <mesh position={[-3.86, 2.4, 0]} rotation={[0, 0, 0.45]}>
        <boxGeometry args={[0.04, 1.05, 2.16]} />
        <meshStandardMaterial color="#050B14" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* ── Triple High-Power Vande Bharat LED Headlights ── */}
      {/* Lower Twin Headlights */}
      {[0.72, -0.72].map((hz, i) => (
        <group key={`headlight-${i}`} position={[-5.6, 0.9, hz]}>
          <mesh rotation={[0, -Math.PI / 2, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.08, 24]} />
            <meshStandardMaterial color="#FEF08A" emissive="#FFFBEB" emissiveIntensity={3.2} />
          </mesh>
          {/* Forward Headlight Beam casting light to the Left (-X) */}
          <spotLight
            position={[-0.2, 0, 0]}
            target-position={[-25, 0, 0]}
            color="#FFFBEB"
            intensity={4.5}
            distance={45}
            angle={0.45}
            penumbra={0.5}
          />
        </group>
      ))}

      {/* Upper Central Twin Headlight */}
      <group position={[-4.7, 2.65, 0]}>
        <mesh rotation={[0, -Math.PI / 2, 0]}>
          <boxGeometry args={[0.35, 0.15, 0.08]} />
          <meshStandardMaterial color="#FEF08A" emissive="#FFFBEB" emissiveIntensity={3.2} />
        </mesh>
      </group>

      {/* ── Ashoka / Vande Bharat Emblem Badge on Nose ── */}
      <group position={[-5.45, 1.45, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.24, 0.24, 0.04, 24]} />
          <meshStandardMaterial color="#D97706" metalness={0.95} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.025, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.02, 16]} />
          <meshStandardMaterial color="#1E3A8A" metalness={0.8} />
        </mesh>
      </group>

      {/* ── Vande Bharat & Project Express Typographic Livery ── */}
      <group position={[-1.2, 2.45, 1.27]}>
        <Text
          fontSize={0.22}
          color="#0F2C59"
          letterSpacing={0.16}
          anchorX="center"
          anchorY="middle"
        >
          VANDE BHARAT
        </Text>
        <Text
          position={[0, -0.25, 0]}
          fontSize={0.11}
          color="#FF671F"
          letterSpacing={0.2}
          anchorX="center"
          anchorY="middle"
        >
          PROJECT EXPRESS // 20608
        </Text>
      </group>

      {/* ── Streamlined High-Speed Roof Pantograph (Articulated Z-Arm) ── */}
      <group position={[1.5, 3.55, 0]}>
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[1.8, 0.08, 1.2]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.42, 0]} rotation={[0, 0, -0.35]}>
          <cylinderGeometry args={[0.03, 0.03, 0.9, 8]} />
          <meshStandardMaterial color="#EA580C" metalness={0.9} />
        </mesh>
        {/* Overhead Graphite Contact Shoe */}
        <mesh position={[-0.2, 0.85, 0]}>
          <boxGeometry args={[0.25, 0.04, 1.4]} />
          <meshStandardMaterial color="#1F2937" metalness={0.95} />
        </mesh>
      </group>

      {/* Dual Bogies */}
      <BogieTruck position={[-2.4, 0, 0]} wheelRotation={wheelRotation} />
      <BogieTruck position={[2.4, 0, 0]} wheelRotation={wheelRotation} />
    </group>
  );
};

// ─── 5. RAILWAY LEVEL CROSSING (RAILWAY GATE BOOM BARRIERS) ──────────────────
interface RailwayGateProps {
  approachZ: number; // Z position of gate across the road
  armSide: 'left' | 'right';
  isFlashing: boolean;
}

const RailwayBoomGate: React.FC<RailwayGateProps> = ({ approachZ, armSide, isFlashing }) => {
  const pivotX = armSide === 'right' ? 3.8 : -3.8;
  const boomDir = armSide === 'right' ? -1 : 1;

  return (
    <group position={[pivotX, 0, approachZ]}>
      {/* ── Heavy Cast Steel Gate Pivot Pedestal ── */}
      <mesh position={[0, 0.65, 0]} castShadow>
        <boxGeometry args={[0.65, 1.3, 0.65]} />
        <meshStandardMaterial color="#EAB308" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* Black Hazard Stripes on Pedestal */}
      {[-0.3, 0.0, 0.3].map((sy, i) => (
        <mesh key={`hstripe-${i}`} position={[0, 0.65 + sy, 0]}>
          <boxGeometry args={[0.66, 0.12, 0.66]} />
          <meshStandardMaterial color="#0F172A" roughness={0.5} />
        </mesh>
      ))}

      {/* Counterweight Box at rear of pivot */}
      <mesh position={[-boomDir * 0.5, 0.85, 0]}>
        <boxGeometry args={[0.5, 0.55, 0.45]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>

      {/* ── Red & White Striped Railway Gate Boom Barrier Pole (7.2m long) ── */}
      <group position={[0, 0.9, 0]}>
        {/* Alternating Red and White Segments */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((seg) => {
          const isRed = seg % 2 === 0;
          return (
            <mesh key={`seg-${seg}`} position={[boomDir * (0.5 + seg * 0.85), 0, 0]}>
              <boxGeometry args={[0.85, 0.12, 0.12]} />
              <meshStandardMaterial
                color={isRed ? '#DC2626' : '#FFFFFF'}
                roughness={0.3}
                metalness={0.2}
              />
            </mesh>
          );
        })}

        {/* Suspended Red Retro-Reflective "STOP" Circular Disc at center of boom */}
        <group position={[boomDir * 3.4, -0.22, 0]}>
          <mesh>
            <cylinderGeometry args={[0.26, 0.26, 0.02, 24]} />
            <meshStandardMaterial color="#DC2626" emissive="#B91C1C" emissiveIntensity={0.6} />
          </mesh>
          {/* Inner White Rim */}
          <mesh position={[0, 0.015, 0]}>
            <cylinderGeometry args={[0.23, 0.23, 0.01, 24]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          <mesh position={[0, 0.025, 0]}>
            <cylinderGeometry args={[0.20, 0.20, 0.01, 24]} />
            <meshStandardMaterial color="#DC2626" />
          </mesh>
        </group>
      </group>

      {/* ── Alternating Flashing Red LED Warning Lamps on Stanchion ── */}
      <group position={[0, 1.8, 0]}>
        {/* Signal Stanchion Pole */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
          <meshStandardMaterial color="#1E293B" metalness={0.9} />
        </mesh>
        {/* Crossbar holding twin red lamps */}
        <mesh>
          <boxGeometry args={[0.85, 0.08, 0.08]} />
          <meshStandardMaterial color="#0F172A" metalness={0.9} />
        </mesh>
        {/* Left Lamp (flashing on even beats) */}
        <group position={[-0.32, 0, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 0.08, 16]} />
            <meshStandardMaterial color="#0A0F1D" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.045]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.02, 16]} />
            <meshStandardMaterial
              color="#DC2626"
              emissive="#EF4444"
              emissiveIntensity={isFlashing ? 3.5 : 0.2}
            />
          </mesh>
        </group>
        {/* Right Lamp (flashing on odd beats) */}
        <group position={[0.32, 0, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 0.08, 16]} />
            <meshStandardMaterial color="#0A0F1D" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.045]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.02, 16]} />
            <meshStandardMaterial
              color="#DC2626"
              emissive="#EF4444"
              emissiveIntensity={!isFlashing ? 3.5 : 0.2}
            />
          </mesh>
        </group>
        {/* Acoustic Warning Bell Dome */}
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.1, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
};

// ─── 6. CLASSIC INDIAN RAILWAYS GATEKEEPER CABIN (GHUMTI) ─────────────────────
const GatekeeperCabin: React.FC = () => {
  return (
    <group position={[7.5, 0, 5.2]}>
      {/* ── Stone Foundation Plinth ── */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[4.2, 0.4, 4.2]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>

      {/* ── Whitewashed Stucco Cabin Walls with Royal Navy Blue Trim ── */}
      <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 2.8, 3.8]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.6} />
      </mesh>
      {/* Indian Railways Navy Blue Lower Wainscot Band */}
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[3.84, 0.9, 3.84]} />
        <meshStandardMaterial color="#1E3A8A" roughness={0.5} />
      </mesh>

      {/* ── Sloping Terracotta Tiled Overhanging Hip Roof ── */}
      <mesh position={[0, 3.45, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[3.3, 1.1, 4]} />
        <meshStandardMaterial color="#9A3412" roughness={0.65} />
      </mesh>

      {/* ── Large Multi-Pane Track Observation Windows ── */}
      {/* Window Facing Tracks (along -Z) */}
      <group position={[0, 1.9, -1.92]}>
        <mesh>
          <boxGeometry args={[1.8, 1.2, 0.04]} />
          <meshStandardMaterial color="#EAB308" metalness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[1.65, 1.05, 0.02]} />
          <meshPhysicalMaterial color="#93C5FD" transmission={0.9} transparent opacity={0.35} />
        </mesh>
      </group>

      {/* ── Official Indian Railways Cabin Signboard ── */}
      <group position={[0, 2.8, -1.93]}>
        <mesh>
          <boxGeometry args={[2.8, 0.42, 0.04]} />
          <meshStandardMaterial color="#0A0F1D" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[2.72, 0.35]} />
          <meshStandardMaterial color="#FAF7F0" />
        </mesh>
        <Text
          position={[0, 0.05, 0.035]}
          fontSize={0.11}
          color="#0F172A"
          letterSpacing={0.08}
          anchorX="center"
          anchorY="middle"
        >
          LC GATE NO. 47 // SPL 'C' CLASS
        </Text>
        <Text
          position={[0, -0.08, 0.035]}
          fontSize={0.08}
          color="#1E3A8A"
          letterSpacing={0.12}
          anchorX="center"
          anchorY="middle"
        >
          PROJECT EXPRESS CORRIDOR
        </Text>
      </group>

      {/* ── Rooftop VHF Antenna Mast & Solar Power Panel ── */}
      <group position={[-1.2, 4.0, 0]}>
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.02, 0.03, 1.4, 8]} />
          <meshStandardMaterial color="#64748B" metalness={0.9} />
        </mesh>
        {/* Solar Panel */}
        <mesh position={[0.4, 0.1, 0.4]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.8, 0.04, 0.6]} />
          <meshStandardMaterial color="#1E3A8A" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>

      {/* Cozy Warm Interior Light Leaking out of Cabin Windows */}
      <pointLight position={[0, 2.0, 0]} color="#FED7AA" intensity={2.2} distance={8} />
    </group>
  );
};

// ─── 7. INDIAN RAILWAYS SIGNAGE, SIGNALS & OVERHEAD CATENARY (OHE) ───────────
const RailwaySignageAndOHE: React.FC = () => {
  return (
    <group>
      {/* ── 1. Indian Railways Large Yellow Caution Signboard ── */}
      <group position={[-5.8, 0, 5.8]}>
        {/* Support Stanchion Posts */}
        {[-0.9, 0.9].map((sx, i) => (
          <mesh key={`spost-${i}`} position={[sx, 1.2, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 2.4, 8]} />
            <meshStandardMaterial color="#334155" metalness={0.9} />
          </mesh>
        ))}
        {/* Board Face */}
        <mesh position={[0, 2.0, 0.04]}>
          <boxGeometry args={[2.5, 1.3, 0.06]} />
          <meshStandardMaterial color="#FBBF24" roughness={0.4} />
        </mesh>
        {/* Sign Inscription */}
        <group position={[0, 2.0, 0.08]}>
          <Text
            position={[0, 0.38, 0]}
            fontSize={0.16}
            color="#0F172A"
            letterSpacing={0.12}
            anchorX="center"
            anchorY="middle"
          >
            CAUTION
          </Text>
          <Text
            position={[0, 0.08, 0]}
            fontSize={0.12}
            color="#0F172A"
            letterSpacing={0.08}
            anchorX="center"
            anchorY="middle"
          >
            LEVEL CROSSING
          </Text>
          <Text
            position={[0, -0.18, 0]}
            fontSize={0.10}
            color="#DC2626"
            letterSpacing={0.06}
            anchorX="center"
            anchorY="middle"
          >
            STOP • LOOK • LISTEN
          </Text>
          <Text
            position={[0, -0.42, 0]}
            fontSize={0.08}
            color="#0F172A"
            letterSpacing={0.08}
            anchorX="center"
            anchorY="middle"
          >
            2 TRACKS // HIGH SPEED
          </Text>
        </group>
      </group>

      {/* ── 2. Indian Railways Whistle Board (W/L and सी/फा) ── */}
      <group position={[28, 0, 3.2]}>
        <mesh position={[0, 1.0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 2.0, 8]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} />
        </mesh>
        {/* White Board */}
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[0.9, 0.7, 0.04]} />
          <meshStandardMaterial color="#FAF7F0" roughness={0.3} />
        </mesh>
        <Text
          position={[0, 1.95, 0.025]}
          fontSize={0.18}
          color="#0F172A"
          letterSpacing={0.12}
          anchorX="center"
          anchorY="middle"
        >
          W / L
        </Text>
        <Text
          position={[0, 1.68, 0.025]}
          fontSize={0.12}
          color="#0F172A"
          letterSpacing={0.1}
          anchorX="center"
          anchorY="middle"
        >
          सी / फा
        </Text>
      </group>

      {/* ── 3. Color Light Signal Mast (CLS) showing Green Clear ── */}
      <group position={[-18, 0, 3.4]}>
        {/* Steel Signal Post */}
        <mesh position={[0, 3.2, 0]}>
          <cylinderGeometry args={[0.08, 0.09, 6.4, 12]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>
        {/* 3-Aspect Signal Housing Head */}
        <mesh position={[0, 5.6, 0]}>
          <boxGeometry args={[0.4, 1.4, 0.3]} />
          <meshStandardMaterial color="#0A0F1D" metalness={0.9} />
        </mesh>
        {/* Red, Yellow, Green Lenses */}
        <mesh position={[0, 6.0, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.04, 16]} />
          <meshStandardMaterial color="#330000" />
        </mesh>
        <mesh position={[0, 5.6, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.04, 16]} />
          <meshStandardMaterial color="#332200" />
        </mesh>
        {/* Glowing Green Signal Lens */}
        <mesh position={[0, 5.2, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.04, 16]} />
          <meshStandardMaterial color="#22C55E" emissive="#10B981" emissiveIntensity={3.2} />
        </mesh>
        {/* Green Signal Light */}
        <pointLight position={[0, 5.2, 0.4]} color="#10B981" intensity={2.0} distance={10} />
      </group>

      {/* ── 4. Overhead Electrification (OHE) Catenary Portal Masts ── */}
      {[-34, -14, 14, 34].map((mx, idx) => (
        <group key={`ohe-${idx}`} position={[mx, 0, 0]}>
          {/* Trackside Steel H-Beam Mast */}
          <mesh position={[0, 4.4, 4.5]}>
            <boxGeometry args={[0.25, 8.8, 0.25]} />
            <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.3} />
          </mesh>
          {/* Cantilever Bracket Arm reaching over track */}
          <mesh position={[0, 7.8, 2.2]}>
            <boxGeometry args={[0.12, 0.12, 4.8]} />
            <meshStandardMaterial color="#475569" metalness={0.9} />
          </mesh>
          {/* Porcelain Insulator */}
          <mesh position={[0, 7.5, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.35, 8]} />
            <meshStandardMaterial color="#854D0E" roughness={0.3} metalness={0.7} />
          </mesh>
          {/* Dropper & Contact Wire Holder */}
          <mesh position={[0, 6.8, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 1.2, 6]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.95} />
          </mesh>
        </group>
      ))}

      {/* Continuous High-Voltage OHE Contact Wire spanning length */}
      <mesh position={[0, 6.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 84, 8]} />
        <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.3} metalness={0.9} />
      </mesh>
      {/* Supporting Catenary Messenger Wire */}
      <mesh position={[0, 7.6, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 84, 8]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.9} />
      </mesh>
    </group>
  );
};

// ─── 8. DUAL RAILWAY TRACKS & LEVEL CROSSING ROAD SURFACE ─────────────────────
const RailwayTracksAndRoadCrossing: React.FC = () => {
  const tieCount = 100;
  const ties = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < tieCount; i++) {
      arr.push(-42 + i * 0.84);
    }
    return arr;
  }, [tieCount]);

  return (
    <group position={[0, 0, 0]}>
      {/* ── Main Track Ballast Gravel Bed (Crushed Basalt Rock) ── */}
      <mesh position={[0, 0.06, 0]} receiveShadow>
        <boxGeometry args={[86, 0.16, 4.4]} />
        <meshStandardMaterial color="#141923" roughness={0.95} />
      </mesh>

      {/* ── Concrete Sleepers with Steel Pandrol Clips ── */}
      {ties.map((tx, idx) => (
        <mesh key={`tie-${idx}`} position={[tx, 0.14, 0]}>
          <boxGeometry args={[0.26, 0.12, 2.7]} />
          <meshStandardMaterial color="#334155" roughness={0.8} metalness={0.2} />
        </mesh>
      ))}

      {/* ── Twin Heavy Steel Rails (Indian Broad Gauge: Z = -0.84 and +0.84) ── */}
      {[-0.84, 0.84].map((rz, i) => (
        <group key={`rail-${i}`} position={[0, 0.24, rz]}>
          <mesh>
            <boxGeometry args={[86, 0.12, 0.09]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Polished Wheel Contact Head */}
          <mesh position={[0, 0.065, 0]}>
            <boxGeometry args={[86, 0.015, 0.07]} />
            <meshStandardMaterial
              color="#F8FAFC"
              emissive="#E2E8F0"
              emissiveIntensity={0.2}
              metalness={0.98}
              roughness={0.06}
            />
          </mesh>
        </group>
      ))}

      {/* ── Road Level Crossing Surface (Rubber Flangeway Planks where Road crosses) ── */}
      <group position={[0, 0.18, 0]}>
        {/* Center Pad between rails */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[7.2, 0.08, 1.45]} />
          <meshStandardMaterial color="#1E2430" roughness={0.8} />
        </mesh>
        {/* Outer Approach Pads */}
        {[-1.3, 1.3].map((pz, i) => (
          <mesh key={`pad-${i}`} position={[0, 0, pz]}>
            <boxGeometry args={[7.2, 0.08, 0.85]} />
            <meshStandardMaterial color="#1E2430" roughness={0.8} />
          </mesh>
        ))}
        {/* White Zebra Road Hazard Stripes at Crossing Approach */}
        {[-3.0, 3.0].map((sz, i) => (
          <mesh key={`zebra-${i}`} position={[0, 0.01, sz]}>
            <boxGeometry args={[6.8, 0.01, 0.25]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// ─── 9. ATMOSPHERIC TRACKSIDE SPEED DUST & AIR PARTICLES ─────────────────────
const TracksideDust: React.FC<{ active: boolean }> = ({ active }) => {
  const count = 40;
  const [pointsObj, geo, particles] = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const pData: { pos: THREE.Vector3; speed: number; life: number }[] = [];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;
      pData.push({
        pos: new THREE.Vector3((Math.random() - 0.5) * 44, 0.25, (Math.random() - 0.5) * 2.2),
        speed: 0.4 + Math.random() * 0.5,
        life: Math.random(),
      });
    }

    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.25,
      color: '#CBD5E1',
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pts = new THREE.Points(g, mat);
    return [pts, g, pData];
  }, [count]);

  useFrame((_, delta) => {
    if (!active) return;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;

    particles.forEach((p, idx) => {
      p.life += delta * p.speed;
      if (p.life > 1.0) {
        p.life = 0;
        p.pos.set(22 + (Math.random() - 0.5) * 10, 0.2, (Math.random() - 0.5) * 2.4);
      } else {
        p.pos.x -= delta * 12.0; // rushing from right to left!
        p.pos.y += delta * 0.2;
      }
      posAttr.setXYZ(idx, p.pos.x, p.pos.y, p.pos.z);
    });
    posAttr.needsUpdate = true;
  });

  return <primitive object={pointsObj} />;
};

// ─── MAIN PROJECTS SCENE: VANDE BHARAT AT RAILWAY LEVEL CROSSING ──────────────
export const ProjectsScene: React.FC = () => {
  const journeyProgress = useJourneyStore((state) => state.journeyProgress);
  const selectedProjectIndex = useJourneyStore((state) => state.selectedProjectIndex);
  const setSelectedProjectIndex = useJourneyStore((state) => state.setSelectedProjectIndex);

  // Train Movement State along Track X axis (Right to Left continuous cruising)
  const trainPosRef = useRef(0);
  const wheelRotRef = useRef(0);
  const [wheelRotation, setWheelRotation] = useState(0);

  // User manual hold timer (when a user clicks a coach, hold it steady for 4s before resuming cruise)
  const userHoldTimerRef = useRef(0);
  const lastSelectedIndexRef = useRef(selectedProjectIndex);

  // Alternating red warning flasher state (1.5 Hz)
  const [flasherState, setFlasherState] = useState(false);
  const flasherTimerRef = useRef(0);

  // 6 Coach base offsets along train X (Pitch = 7.8m, Total Cycle = 46.8m):
  // When coach k is at center (X = 0), trainPos equals -coachOffsets[k]
  const CYCLE_LENGTH = 46.8; // 6 * 7.8m
  const compartmentOffsets = useMemo(() => [
    -19.5, // Coach 01: EC1 (E-Commerce)
    -11.7, // Coach 02: C1  (ERP & Business)
     -3.9, // Coach 03: C2  (HRMS & Workforce)
      3.9, // Coach 04: C3  (Mobile Apps)
     11.7, // Coach 05: C4  (Admin & Analytics)
     19.5, // Coach 06: C5  (SaaS & Web)
  ], []);

  useFrame((_, delta) => {
    // When past the railway crossing into Technology chapter or beyond, stop updating train
    if (journeyProgress >= 0.55) return;

    // 1. Alternating Level Crossing Warning Lights
    flasherTimerRef.current += delta;
    if (flasherTimerRef.current > 0.38) {
      flasherTimerRef.current = 0;
      setFlasherState((prev) => !prev);
    }

    // 2. Detect User Manual Selection (e.g. user clicked a coach in UI or in 3D scene)
    if (selectedProjectIndex !== lastSelectedIndexRef.current) {
      lastSelectedIndexRef.current = selectedProjectIndex;
      userHoldTimerRef.current = 4.2; // Pause / slow cruise for 4.2 seconds to inspect
    }

    // 3. Continuous Train Motion from Right (+X) to Left (-X)
    let currentSpeed = 2.2; // standard cruising speed 2.2 m/s

    if (userHoldTimerRef.current > 0) {
      userHoldTimerRef.current -= delta;
      // Smoothly steer train towards the manually selected coach
      const targetOffset = -compartmentOffsets[selectedProjectIndex];
      // Normalize target within current cycle range
      let diff = targetOffset - trainPosRef.current;
      while (diff > CYCLE_LENGTH / 2) diff -= CYCLE_LENGTH;
      while (diff < -CYCLE_LENGTH / 2) diff += CYCLE_LENGTH;
      trainPosRef.current += diff * Math.min(1, delta * 3.5);
      currentSpeed = 0.4; // gentle crawl while inspecting
    } else {
      // Normal continuous right-to-left cruising!
      trainPosRef.current -= delta * currentSpeed;

      // Wrap continuously modulo CYCLE_LENGTH for an infinite train rake
      if (trainPosRef.current < -CYCLE_LENGTH) {
        trainPosRef.current += CYCLE_LENGTH;
      }
      if (trainPosRef.current > 0) {
        trainPosRef.current -= CYCLE_LENGTH;
      }

      // 4. Content Auto-Sync: find which coach is currently crossing the center (X = 0)
      let closestIdx = 0;
      let minDistance = Infinity;

      for (let i = 0; i < compartmentOffsets.length; i++) {
        // Check coach position in Set 0 and Set 1
        const pos0 = trainPosRef.current + compartmentOffsets[i];
        const pos1 = pos0 + CYCLE_LENGTH;
        const d = Math.min(Math.abs(pos0), Math.abs(pos1));
        if (d < minDistance) {
          minDistance = d;
          closestIdx = i;
        }
      }

      // When the passing coach is nicely centered within +/- 3.2m of the crossing
      if (minDistance < 3.2 && closestIdx !== selectedProjectIndex) {
        lastSelectedIndexRef.current = closestIdx;
        setSelectedProjectIndex(closestIdx);
      }
    }

    // 5. Wheel rotation proportional to movement displacement
    wheelRotRef.current -= delta * currentSpeed * 2.8;
    setWheelRotation(wheelRotRef.current);
  });

  const handleCoachSelect = (idx: number) => {
    setSelectedProjectIndex(idx);
    lastSelectedIndexRef.current = idx;
    userHoldTimerRef.current = 4.2;
  };

  // When departing towards the Technology chapter, completely hide the Projects train and crossing
  // so it does NOT block or overlap the Technology section
  if (journeyProgress >= 0.55) {
    return null;
  }

  return (
    // ══════════════════════════════════════════════════════════════════════════
    // WORLD POSITION & ORIENTATION:
    // Placed precisely where the road crosses at progress p ≈ 0.51:
    // pt = [-19.39, 0, -211.41], road yaw = -1.14 rad (-65.3 deg)
    // In this local frame:
    // - Z is along the road path (paper airplane flies along road)
    // - X is across the road (tracks run along X)
    // - +X is to the RIGHT of the road
    // - -X is to the LEFT of the road
    // - The Vande Bharat train moves from RIGHT (+X) to LEFT (-X)!
    // ══════════════════════════════════════════════════════════════════════════
    <group position={[-19.39, 0, -211.41]} rotation={[0, -1.14, 0]}>
      {/* ── 1. DUAL RAILWAY TRACKS & FLUSH ROAD CROSSING SURFACE ── */}
      <RailwayTracksAndRoadCrossing />

      {/* ── 2. RAILWAY GATE BOOM BARRIERS (Approach & Exit) ── */}
      {/* Approach Gate (Z = +4.0m) */}
      <RailwayBoomGate approachZ={4.0} armSide="right" isFlashing={flasherState} />
      {/* Exit Gate (Z = -4.0m) */}
      <RailwayBoomGate approachZ={-4.0} armSide="left" isFlashing={!flasherState} />

      {/* ── 3. CLASSIC INDIAN RAILWAYS GATEKEEPER CABIN (GHUMTI) ── */}
      <GatekeeperCabin />

      {/* ── 4. SIGNAGE, SIGNALS & OVERHEAD ELECTRIFICATION (OHE) ── */}
      <RailwaySignageAndOHE />

      {/* ── 5. ATMOSPHERIC TRACKSIDE SPEED DUST & AIR PARTICLES ── */}
      <TracksideDust active={journeyProgress >= 0.44 && journeyProgress <= 0.58} />

      {/* ── 6. CONTINUOUS MOVING INDIAN VANDE BHARAT EXPRESS ── */}
      {/* Set 0 Rake */}
      <group position={[trainPosRef.current, 0, 0]}>
        {/* High-Speed Aerodynamic Bullet Nose Locomotive Cab (Facing -X / Left!) */}
        <VandeBharatNose position={[-27.3, 0, 0]} wheelRotation={wheelRotation} />

        {/* 6 Curated Software Project Category Coaches (EC1 through C5) */}
        {PROJECT_COMPARTMENTS.map((category, idx) => (
          <VandeBharatCoach
            key={`set0-${category.id}`}
            data={category}
            index={idx}
            isSelected={idx === selectedProjectIndex}
            onSelect={() => handleCoachSelect(idx)}
            wheelRotation={wheelRotation}
            offsetPos={compartmentOffsets[idx]}
          />
        ))}

        {/* Articulated High-Speed Gangway Coupler */}
        <mesh position={[23.4, 1.88, 0]}>
          <boxGeometry args={[0.8, 2.6, 2.3]} />
          <meshStandardMaterial color="#1E232E" roughness={0.7} />
        </mesh>
      </group>

      {/* Set 1 Rake (Seamless continuous loop following directly behind Set 0) */}
      <group position={[trainPosRef.current + CYCLE_LENGTH, 0, 0]}>
        {PROJECT_COMPARTMENTS.map((category, idx) => (
          <VandeBharatCoach
            key={`set1-${category.id}`}
            data={category}
            index={idx}
            isSelected={idx === selectedProjectIndex}
            onSelect={() => handleCoachSelect(idx)}
            wheelRotation={wheelRotation}
            offsetPos={compartmentOffsets[idx]}
          />
        ))}

        {/* Rear Aerodynamic Tail Coach Cab */}
        <mesh position={[27.3, 1.88, 0]}>
          <boxGeometry args={[7.2, 2.7, 2.5]} />
          <meshStandardMaterial color="#FAF7F0" roughness={0.25} />
        </mesh>
        <mesh position={[27.3, 2.05, 0]}>
          <boxGeometry args={[7.22, 1.05, 2.52]} />
          <meshStandardMaterial color="#0F2C59" roughness={0.2} metalness={0.35} />
        </mesh>
      </group>
    </group>
  );
};

export default ProjectsScene;
