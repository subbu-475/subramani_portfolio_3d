import * as THREE from 'three';

/**
 * 18-point serpentine journey path with dramatic LEFT/RIGHT switchback turns.
 *
 * Top-down view (X-Z plane):
 *   START ─────► straight village road
 *       └──── TURN LEFT ──── CH01 Education (college on left)
 *                                └──── TURN RIGHT ──── CH02 First Code (garage on right)
 *                                                          └──── TURN LEFT ──── CH03 Career (towers on left)
 *                                                                                   └──── TURN RIGHT ──── ... etc
 *
 * Y-axis:  flat ground (Y≈0) for CH00-CH06, then dramatic vertical ascent for CH07 (rocket launch) → CH08 (orbit)
 */
export const JOURNEY_WAYPOINTS: THREE.Vector3[] = [
  // ══════ CH 00: THE BEGINNING — Straight village road (Morning) ══════
  new THREE.Vector3(  0,    0,     0),     // WP0:  Start on village dirt road
  new THREE.Vector3(  0,    0,   -40),     // WP1:  Walk straight forward, end of intro stretch

  // ══════ TURN LEFT → CH 01: EDUCATION (Late Morning) ══════
  new THREE.Vector3(-20,    0,   -60),     // WP2:  Road bends left (intermediate)
  new THREE.Vector3(-42,    0,   -75),     // WP3:  ★ College campus landmark (LEFT side)

  // ══════ TURN RIGHT → CH 02: FIRST LINE OF CODE (Mid-Afternoon) ══════
  new THREE.Vector3(-38,    0,  -105),     // WP4:  Road curves right, leaving campus
  new THREE.Vector3( -8,    0,  -125),     // WP5:  ★ Coding garage landmark (RIGHT side)

  // ══════ TURN LEFT → CH 03: CAREER (Late Afternoon / Golden Hour) ══════
  new THREE.Vector3(-12,    0,  -152),     // WP6:  Road curves left into city
  new THREE.Vector3(-42,    0,  -170),     // WP7:  ★ Career city boulevard landmark (LEFT side)

  // ══════ TURN RIGHT → CH 04: PROJECTS (Sunset) ══════
  new THREE.Vector3(-38,    0,  -200),     // WP8:  Road curves right
  new THREE.Vector3( -8,    0,  -220),     // WP9:  ★ Project pavilion landmark (RIGHT side)

  // ══════ TURN LEFT → CH 05: TECHNOLOGY GALAXY (Early Evening / Twilight) ══════
  new THREE.Vector3(-12,    0,  -248),     // WP10: Road curves left
  new THREE.Vector3(-42,  0.2,  -265),     // WP11: ★ Skills holographic arena (LEFT side)

  // ══════ TURN RIGHT → CH 06: WHERE I AM TODAY (Night) ══════
  new THREE.Vector3(-38,  0.5,  -295),     // WP12: Road curves right
  new THREE.Vector3( -8,  0.8,  -315),     // WP13: ★ Night city skyline balcony (RIGHT side)

  // ══════ TURN LEFT → CH 07: THE JOURNEY CONTINUES (Pre-Dawn → Space) ══════
  new THREE.Vector3(-12,  1.5,  -340),     // WP14: Approach launch pad (intermediate)
  new THREE.Vector3(-28,   15,  -365),     // WP15: ★ Rocket ascending! (LEFT, ascending)

  // ══════ CH 08: NEXT DESTINATION — ORBITAL SPACE ══════
  new THREE.Vector3(-12,   42,  -388),     // WP16: ★ In orbit — space station
  new THREE.Vector3(  0,   55,  -405),     // WP17: Deep space endpoint
];

/**
 * Centripetal Catmull-Rom curve — no cusps or overshoot through the dramatic turns.
 */
export const journeyCurve = new THREE.CatmullRomCurve3(
  JOURNEY_WAYPOINTS,
  false,          // not closed
  'centripetal',  // centripetal parameterization for smoothest turns
  0.5             // moderate tension
);

/**
 * Gets the 3D position along the path for a progress value between 0.0 and 1.0
 */
export function getJourneyPosition(progress: number, target = new THREE.Vector3()): THREE.Vector3 {
  const p = Math.max(0, Math.min(1, progress));
  return journeyCurve.getPointAt(p, target);
}

/**
 * Gets the tangent unit vector along the path for a progress value
 */
export function getJourneyTangent(progress: number, target = new THREE.Vector3()): THREE.Vector3 {
  const p = Math.max(0.0001, Math.min(0.9999, progress));
  return journeyCurve.getTangentAt(p, target);
}

/**
 * Computes a stable "right-perpendicular" normal for any tangent direction.
 * Handles the edge case where the tangent is nearly vertical (during space ascent),
 * which would make the standard cross(tangent, worldUp) degenerate to zero.
 */
export function getJourneyNormal(progress: number): THREE.Vector3 {
  const tangent = getJourneyTangent(progress).normalize();
  // When tangent is nearly vertical, use world-forward as the reference axis instead
  const upRef = Math.abs(tangent.y) > 0.7
    ? new THREE.Vector3(0, 0, -1)
    : new THREE.Vector3(0, 1, 0);
  return new THREE.Vector3().crossVectors(tangent, upRef).normalize();
}

/**
 * Calculates the character facing yaw (in radians) aligned with the path tangent.
 * Projects tangent onto the XZ plane so vertical movement doesn't spin the character.
 */
export function getJourneyFacingYaw(progress: number): number {
  const tangent = getJourneyTangent(progress);
  const xzLen = Math.sqrt(tangent.x * tangent.x + tangent.z * tangent.z);

  if (xzLen < 0.05) {
    // Nearly vertical — fall back to a slightly earlier position on the path
    const fallbackP = Math.max(0.001, progress - 0.02);
    const fallbackT = getJourneyTangent(fallbackP);
    return -Math.PI / 2 + Math.atan2(fallbackT.x, -fallbackT.z);
  }

  const angleDeviation = Math.atan2(tangent.x, -tangent.z);
  return -Math.PI / 2 + angleDeviation;
}

/**
 * The progress value beyond which the road stops rendering (space begins).
 * Road dissolves before the rocket launch ramp.
 */
export const ROAD_END_PROGRESS = 0.83;

/**
 * Generates ribbon geometry vertices for the continuous road surface.
 * Stops at ROAD_END_PROGRESS so there's no road floating in space.
 */
export function createRoadGeometry(segments = 500, width = 3.0): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const halfWidth = width / 2;

  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * ROAD_END_PROGRESS;
    const pt = journeyCurve.getPointAt(t);
    const tangent = journeyCurve.getTangentAt(Math.min(t, 0.9999)).normalize();

    // Stable normal — handles vertical tangent during ascent
    const upRef = Math.abs(tangent.y) > 0.7
      ? new THREE.Vector3(0, 0, -1)
      : new THREE.Vector3(0, 1, 0);
    const normal = new THREE.Vector3().crossVectors(tangent, upRef).normalize();

    // Left and right edge vertices
    const left = pt.clone().addScaledVector(normal, halfWidth);
    const right = pt.clone().addScaledVector(normal, -halfWidth);

    positions.push(left.x, left.y + 0.015, left.z);
    positions.push(right.x, right.y + 0.015, right.z);

    uvs.push(0, t * 100);
    uvs.push(1, t * 100);

    if (i < segments) {
      const v0 = i * 2;
      const v1 = i * 2 + 1;
      const v2 = (i + 1) * 2;
      const v3 = (i + 1) * 2 + 1;

      // Two triangles per quad
      indices.push(v0, v2, v1);
      indices.push(v1, v2, v3);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}
