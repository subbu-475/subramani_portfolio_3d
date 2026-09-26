import * as THREE from 'three';
import { type TechnologyCubeData } from '../../data/technologyCubes';

const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Draws the vector logo for each technology onto a 2D canvas context.
 */
function drawLogo(ctx: CanvasRenderingContext2D, cube: TechnologyCubeData, cx: number, cy: number, size: number) {
  ctx.save();
  ctx.translate(cx, cy);

  const r = size / 2;

  switch (cube.id) {
    case 'react': {
      // React central nucleus
      ctx.fillStyle = '#00D8FF';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
      ctx.fill();

      // 3 orbital rings
      ctx.strokeStyle = '#00D8FF';
      ctx.lineWidth = size * 0.065;
      for (let angle of [0, Math.PI / 3, (2 * Math.PI) / 3]) {
        ctx.save();
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 0.95, r * 0.38, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      break;
    }

    case 'typescript': {
      ctx.fillStyle = '#3178C6';
      ctx.fillRect(-r * 0.9, -r * 0.9, r * 1.8, r * 1.8);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${Math.round(size * 0.58)}px "Segoe UI", Roboto, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('TS', 0, 0);
      break;
    }

    case 'javascript': {
      ctx.fillStyle = '#F7DF1E';
      ctx.fillRect(-r * 0.9, -r * 0.9, r * 1.8, r * 1.8);
      ctx.fillStyle = '#000000';
      ctx.font = `bold ${Math.round(size * 0.58)}px "Segoe UI", Roboto, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('JS', 0, 0);
      break;
    }

    case 'angular': {
      // Angular Shield
      ctx.fillStyle = '#DD0031';
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.95);
      ctx.lineTo(r * 0.85, -r * 0.45);
      ctx.lineTo(r * 0.65, r * 0.65);
      ctx.lineTo(0, r * 0.95);
      ctx.lineTo(-r * 0.65, r * 0.65);
      ctx.lineTo(-r * 0.85, -r * 0.45);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = `900 ${Math.round(size * 0.55)}px "Segoe UI", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('A', 0, r * 0.05);
      break;
    }

    case 'vue': {
      // Outer V (green)
      ctx.fillStyle = '#42B883';
      ctx.beginPath();
      ctx.moveTo(-r * 0.9, -r * 0.8);
      ctx.lineTo(-r * 0.4, -r * 0.8);
      ctx.lineTo(0, 0);
      ctx.lineTo(r * 0.4, -r * 0.8);
      ctx.lineTo(r * 0.9, -r * 0.8);
      ctx.lineTo(0, r * 0.9);
      ctx.closePath();
      ctx.fill();

      // Inner V (dark slate)
      ctx.fillStyle = '#35495E';
      ctx.beginPath();
      ctx.moveTo(-r * 0.45, -r * 0.8);
      ctx.lineTo(0, 0);
      ctx.lineTo(r * 0.45, -r * 0.8);
      ctx.lineTo(r * 0.22, -r * 0.8);
      ctx.lineTo(0, -r * 0.35);
      ctx.lineTo(-r * 0.22, -r * 0.8);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'tailwind': {
      ctx.fillStyle = '#38BDF8';
      // Dual wave ribbons
      ctx.beginPath();
      ctx.arc(-r * 0.35, -r * 0.2, r * 0.35, Math.PI * 0.7, Math.PI * 1.8);
      ctx.arc(r * 0.25, -r * 0.25, r * 0.3, Math.PI * 0.9, Math.PI * 2.2);
      ctx.lineTo(r * 0.5, r * 0.1);
      ctx.arc(r * 0.35, r * 0.2, r * 0.35, Math.PI * 1.7, Math.PI * 0.8, true);
      ctx.fill();
      break;
    }

    case 'bootstrap': {
      ctx.fillStyle = '#7952B3';
      ctx.beginPath();
      ctx.roundRect(-r * 0.85, -r * 0.85, r * 1.7, r * 1.7, r * 0.35);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${Math.round(size * 0.65)}px "Segoe UI", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('B', 0, 0);
      break;
    }

    case 'mui': {
      ctx.fillStyle = '#007FFF';
      ctx.beginPath();
      ctx.moveTo(-r * 0.7, r * 0.6);
      ctx.lineTo(-r * 0.7, -r * 0.4);
      ctx.lineTo(-r * 0.2, 0);
      ctx.lineTo(-r * 0.2, r * 0.6);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#0059B2';
      ctx.beginPath();
      ctx.moveTo(-r * 0.2, 0);
      ctx.lineTo(r * 0.3, -r * 0.5);
      ctx.lineTo(r * 0.3, r * 0.1);
      ctx.lineTo(-r * 0.2, r * 0.6);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#3399FF';
      ctx.beginPath();
      ctx.moveTo(r * 0.3, -r * 0.5);
      ctx.lineTo(r * 0.75, 0);
      ctx.lineTo(r * 0.75, r * 0.6);
      ctx.lineTo(r * 0.3, r * 0.1);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'nodejs': {
      // Node.js Hexagon
      ctx.fillStyle = '#339933';
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3 - Math.PI / 6;
        const hx = Math.cos(a) * r * 0.9;
        const hy = Math.sin(a) * r * 0.9;
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${Math.round(size * 0.42)}px "Segoe UI", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('JS', 0, 0);
      break;
    }

    case 'express': {
      ctx.fillStyle = '#F8FAFC';
      ctx.font = `italic bold ${Math.round(size * 0.36)}px "Georgia", serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Express', 0, 0);
      break;
    }

    case 'python': {
      // Python interlocking snakes
      ctx.fillStyle = '#387EB8';
      ctx.beginPath();
      ctx.arc(-r * 0.18, -r * 0.35, r * 0.38, Math.PI * 0.8, Math.PI * 2.2);
      ctx.lineTo(-r * 0.18, 0);
      ctx.lineTo(r * 0.2, 0);
      ctx.arc(r * 0.2, -r * 0.15, r * 0.15, 0, Math.PI);
      ctx.fill();
      // Eye
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(-r * 0.22, -r * 0.48, r * 0.08, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFE052';
      ctx.beginPath();
      ctx.arc(r * 0.18, r * 0.35, r * 0.38, -Math.PI * 0.2, Math.PI * 1.2);
      ctx.lineTo(r * 0.18, 0);
      ctx.lineTo(-r * 0.2, 0);
      ctx.arc(-r * 0.2, r * 0.15, r * 0.15, Math.PI, 0);
      ctx.fill();
      // Eye
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(r * 0.22, r * 0.48, r * 0.08, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'java': {
      // Coffee cup
      ctx.strokeStyle = '#ED8B00';
      ctx.lineWidth = size * 0.07;
      ctx.beginPath();
      ctx.arc(0, r * 0.2, r * 0.45, 0, Math.PI);
      ctx.lineTo(-r * 0.45, -r * 0.05);
      ctx.lineTo(r * 0.45, -r * 0.05);
      ctx.stroke();

      // Handle
      ctx.beginPath();
      ctx.arc(r * 0.45, r * 0.05, r * 0.2, -Math.PI / 2, Math.PI / 2);
      ctx.stroke();

      // Steam wisps
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = size * 0.045;
      for (let sx of [-r * 0.2, 0, r * 0.2]) {
        ctx.beginPath();
        ctx.moveTo(sx, -r * 0.15);
        ctx.bezierCurveTo(sx + r * 0.1, -r * 0.35, sx - r * 0.1, -r * 0.55, sx, -r * 0.75);
        ctx.stroke();
      }
      break;
    }

    case 'django': {
      ctx.fillStyle = '#2BA977';
      ctx.fillRect(-r * 0.85, -r * 0.85, r * 1.7, r * 1.7);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${Math.round(size * 0.52)}px "Segoe UI", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('dj', 0, 0);
      break;
    }

    case 'nestjs': {
      ctx.fillStyle = '#E0234E';
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.85);
      ctx.lineTo(r * 0.75, -r * 0.35);
      ctx.lineTo(r * 0.55, r * 0.75);
      ctx.lineTo(0, r * 0.45);
      ctx.lineTo(-r * 0.55, r * 0.75);
      ctx.lineTo(-r * 0.75, -r * 0.35);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(0, -r * 0.05, r * 0.25, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'php': {
      ctx.fillStyle = '#777BB4';
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 0.9, r * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${Math.round(size * 0.36)}px "Segoe UI", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('php', 0, 0);
      break;
    }

    case 'laravel': {
      ctx.fillStyle = '#FF2D20';
      ctx.beginPath();
      ctx.moveTo(-r * 0.7, -r * 0.4);
      ctx.lineTo(0, -r * 0.8);
      ctx.lineTo(r * 0.7, -r * 0.4);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#D62217';
      ctx.beginPath();
      ctx.moveTo(-r * 0.7, -r * 0.4);
      ctx.lineTo(0, 0);
      ctx.lineTo(0, r * 0.75);
      ctx.lineTo(-r * 0.7, r * 0.35);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#B31A11';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(r * 0.7, -r * 0.4);
      ctx.lineTo(r * 0.7, r * 0.35);
      ctx.lineTo(0, r * 0.75);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'mongodb': {
      // MongoDB Leaf
      ctx.fillStyle = '#10AA50';
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.9);
      ctx.bezierCurveTo(r * 0.8, -r * 0.3, r * 0.6, r * 0.5, 0, r * 0.9);
      ctx.bezierCurveTo(-r * 0.6, r * 0.5, -r * 0.8, -r * 0.3, 0, -r * 0.9);
      ctx.fill();

      // Leaf spine
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.75);
      ctx.lineTo(r * 0.06, r * 0.7);
      ctx.lineTo(0, r * 0.85);
      ctx.lineTo(-r * 0.06, r * 0.7);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'postgresql': {
      // Elephant silhouette
      ctx.fillStyle = '#336791';
      ctx.beginPath();
      ctx.arc(-r * 0.15, -r * 0.15, r * 0.55, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(r * 0.3, -r * 0.1, r * 0.35, r * 0.45, 0, 0, Math.PI * 2);
      ctx.fill();
      // Trunk
      ctx.lineWidth = size * 0.1;
      ctx.strokeStyle = '#336791';
      ctx.beginPath();
      ctx.moveTo(r * 0.45, -r * 0.05);
      ctx.bezierCurveTo(r * 0.7, r * 0.2, r * 0.5, r * 0.65, r * 0.25, r * 0.55);
      ctx.stroke();
      break;
    }

    case 'mysql': {
      // Dolphin outline
      ctx.strokeStyle = '#00758F';
      ctx.lineWidth = size * 0.08;
      ctx.beginPath();
      ctx.moveTo(-r * 0.75, r * 0.4);
      ctx.bezierCurveTo(-r * 0.5, -r * 0.7, r * 0.3, -r * 0.8, r * 0.8, -r * 0.1);
      ctx.bezierCurveTo(r * 0.3, 0, -r * 0.1, r * 0.5, -r * 0.75, r * 0.4);
      ctx.stroke();
      ctx.fillStyle = '#F29111';
      ctx.beginPath();
      ctx.arc(r * 0.45, -r * 0.25, r * 0.1, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'redis': {
      // Stacked isometric diamonds
      const drawLayer = (offsetY: number, color: string) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, offsetY - r * 0.25);
        ctx.lineTo(r * 0.75, offsetY);
        ctx.lineTo(0, offsetY + r * 0.25);
        ctx.lineTo(-r * 0.75, offsetY);
        ctx.closePath();
        ctx.fill();
      };
      drawLayer(r * 0.35, '#8B1410');
      drawLayer(0, '#BA2520');
      drawLayer(-r * 0.35, '#DC382D');
      break;
    }

    case 'mariadb': {
      // MariaDB Seal
      ctx.fillStyle = '#003545';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.85, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${Math.round(size * 0.32)}px "Segoe UI", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('MARIA', 0, 0);
      break;
    }

    case 'oracle': {
      ctx.fillStyle = '#F80000';
      ctx.font = `900 ${Math.round(size * 0.36)}px "Segoe UI", Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ORACLE', 0, 0);
      break;
    }

    case 'firebase': {
      // Firebase flame
      ctx.fillStyle = '#FFA000';
      ctx.beginPath();
      ctx.moveTo(-r * 0.65, r * 0.55);
      ctx.lineTo(0, -r * 0.85);
      ctx.lineTo(r * 0.2, -r * 0.3);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#F57C00';
      ctx.beginPath();
      ctx.moveTo(r * 0.65, r * 0.55);
      ctx.lineTo(0, -r * 0.85);
      ctx.lineTo(-r * 0.1, 0);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#FFCA28';
      ctx.beginPath();
      ctx.moveTo(-r * 0.5, r * 0.6);
      ctx.lineTo(0, -r * 0.15);
      ctx.lineTo(r * 0.5, r * 0.6);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'elasticsearch': {
      ctx.fillStyle = '#FED10A';
      ctx.beginPath();
      ctx.arc(0, -r * 0.45, r * 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#005571';
      ctx.beginPath();
      ctx.arc(-r * 0.45, r * 0.35, r * 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#24B6AC';
      ctx.beginPath();
      ctx.arc(r * 0.45, r * 0.35, r * 0.35, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'docker': {
      // Docker whale with containers
      ctx.fillStyle = '#2496ED';
      // Whale body
      ctx.beginPath();
      ctx.ellipse(-r * 0.05, r * 0.25, r * 0.7, r * 0.35, 0, 0, Math.PI * 2);
      ctx.fill();
      // Tail
      ctx.beginPath();
      ctx.moveTo(r * 0.55, r * 0.25);
      ctx.lineTo(r * 0.85, r * 0.05);
      ctx.lineTo(r * 0.75, r * 0.45);
      ctx.closePath();
      ctx.fill();

      // Containers on top
      ctx.fillStyle = '#FFFFFF';
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 3; col++) {
          const bx = -r * 0.55 + col * (r * 0.35);
          const by = -r * 0.35 + row * (r * 0.28);
          ctx.fillRect(bx, by, r * 0.28, r * 0.22);
        }
      }
      break;
    }

    case 'kubernetes': {
      // 7-spoke ship helm
      ctx.strokeStyle = '#326CE5';
      ctx.lineWidth = size * 0.08;
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.65, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 0; i < 7; i++) {
        const a = (i * 2 * Math.PI) / 7;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * r * 0.95, Math.sin(a) * r * 0.95);
        ctx.stroke();
      }
      ctx.fillStyle = '#326CE5';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.25, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'aws': {
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${Math.round(size * 0.48)}px "Segoe UI", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('aws', 0, -r * 0.15);

      // Curved orange smile
      ctx.strokeStyle = '#FF9900';
      ctx.lineWidth = size * 0.08;
      ctx.beginPath();
      ctx.arc(0, -r * 0.2, r * 0.65, Math.PI * 0.25, Math.PI * 0.75);
      ctx.stroke();
      break;
    }

    case 'gcp': {
      // Google Cloud 4-bubble cloud
      ctx.fillStyle = '#4285F4';
      ctx.beginPath();
      ctx.arc(-r * 0.3, r * 0.1, r * 0.35, 0, Math.PI * 2);
      ctx.arc(0, -r * 0.2, r * 0.45, 0, Math.PI * 2);
      ctx.arc(r * 0.35, r * 0.1, r * 0.32, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'azure': {
      // Azure folded triangle A
      ctx.fillStyle = '#0089D6';
      ctx.beginPath();
      ctx.moveTo(-r * 0.75, r * 0.7);
      ctx.lineTo(-r * 0.15, -r * 0.8);
      ctx.lineTo(r * 0.35, -r * 0.8);
      ctx.lineTo(r * 0.15, r * 0.1);
      ctx.lineTo(-r * 0.25, r * 0.7);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#0072C6';
      ctx.beginPath();
      ctx.moveTo(r * 0.75, r * 0.7);
      ctx.lineTo(0, -r * 0.4);
      ctx.lineTo(-r * 0.15, -r * 0.05);
      ctx.lineTo(r * 0.35, r * 0.7);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'jenkins': {
      ctx.fillStyle = '#D24939';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${Math.round(size * 0.3)}px "Segoe UI", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('JENKINS', 0, 0);
      break;
    }

    case 'gitlab': {
      // Origami fox head
      ctx.fillStyle = '#E24329';
      ctx.beginPath();
      ctx.moveTo(0, r * 0.8);
      ctx.lineTo(-r * 0.7, -r * 0.4);
      ctx.lineTo(-r * 0.45, -r * 0.75);
      ctx.lineTo(-r * 0.2, -r * 0.3);
      ctx.lineTo(r * 0.2, -r * 0.3);
      ctx.lineTo(r * 0.45, -r * 0.75);
      ctx.lineTo(r * 0.7, -r * 0.4);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'github': {
      // Octocat silhouette
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#181717';
      // Head with ears
      ctx.beginPath();
      ctx.moveTo(-r * 0.45, -r * 0.45);
      ctx.lineTo(-r * 0.3, -r * 0.15);
      ctx.lineTo(r * 0.3, -r * 0.15);
      ctx.lineTo(r * 0.45, -r * 0.45);
      ctx.arc(0, 0, r * 0.45, 0, Math.PI);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'vscode': {
      // VS Code folded infinity ribbon
      ctx.fillStyle = '#007ACC';
      ctx.beginPath();
      ctx.moveTo(-r * 0.65, -r * 0.35);
      ctx.lineTo(r * 0.55, -r * 0.8);
      ctx.lineTo(r * 0.55, r * 0.8);
      ctx.lineTo(-r * 0.65, r * 0.35);
      ctx.lineTo(-r * 0.2, 0);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'postman': {
      // Spaceman face in circle
      ctx.fillStyle = '#FF6C37';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.85, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(0, -r * 0.1, r * 0.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#222222';
      ctx.beginPath();
      ctx.arc(0, -r * 0.1, r * 0.25, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'figma': {
      const fr = r * 0.35;
      // Top left
      ctx.fillStyle = '#F24E1E';
      ctx.beginPath();
      ctx.arc(-fr, -fr * 1.5, fr, Math.PI / 2, -Math.PI / 2);
      ctx.fill();
      // Top right
      ctx.fillStyle = '#FF7262';
      ctx.beginPath();
      ctx.arc(fr, -fr * 1.5, fr, 0, Math.PI * 2);
      ctx.fill();
      // Mid left
      ctx.fillStyle = '#A259FF';
      ctx.beginPath();
      ctx.arc(-fr, 0, fr, Math.PI / 2, -Math.PI / 2);
      ctx.fill();
      // Mid right
      ctx.fillStyle = '#1ABCFE';
      ctx.beginPath();
      ctx.arc(fr, 0, fr, 0, Math.PI * 2);
      ctx.fill();
      // Bottom left
      ctx.fillStyle = '#0ACF83';
      ctx.beginPath();
      ctx.arc(-fr, fr * 1.5, fr, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'discord': {
      // Discord controller smiley
      ctx.fillStyle = '#5865F2';
      ctx.beginPath();
      ctx.roundRect(-r * 0.85, -r * 0.6, r * 1.7, r * 1.2, r * 0.35);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(-r * 0.35, -r * 0.05, r * 0.18, 0, Math.PI * 2);
      ctx.arc(r * 0.35, -r * 0.05, r * 0.18, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'notion': {
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.roundRect(-r * 0.85, -r * 0.85, r * 1.7, r * 1.7, r * 0.25);
      ctx.fill();

      ctx.fillStyle = '#000000';
      ctx.font = `900 ${Math.round(size * 0.65)}px "Times New Roman", serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('N', 0, 0);
      break;
    }

    case 'jira': {
      // Jira double chevron
      ctx.fillStyle = '#0052CC';
      ctx.beginPath();
      ctx.moveTo(-r * 0.45, -r * 0.7);
      ctx.lineTo(r * 0.2, 0);
      ctx.lineTo(-r * 0.45, r * 0.7);
      ctx.lineTo(-r * 0.1, r * 0.7);
      ctx.lineTo(r * 0.55, 0);
      ctx.lineTo(-r * 0.1, -r * 0.7);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'confluence': {
      ctx.fillStyle = '#2684FF';
      ctx.beginPath();
      ctx.arc(-r * 0.25, -r * 0.15, r * 0.45, Math.PI * 0.3, Math.PI * 1.4);
      ctx.arc(r * 0.25, r * 0.15, r * 0.45, Math.PI * 1.3, Math.PI * 2.4);
      ctx.fill();
      break;
    }

    case 'trello': {
      ctx.fillStyle = '#0079BF';
      ctx.beginPath();
      ctx.roundRect(-r * 0.85, -r * 0.85, r * 1.7, r * 1.7, r * 0.25);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(-r * 0.55, -r * 0.55, r * 0.45, r * 1.0);
      ctx.fillRect(r * 0.1, -r * 0.55, r * 0.45, r * 0.65);
      break;
    }

    default: {
      ctx.fillStyle = cube.brandColor;
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.6, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }

  ctx.restore();
}

/**
 * Creates a high-definition 512x512 CanvasTexture for the front face of each cube.
 */
export function getCubeFrontTexture(cube: TechnologyCubeData): THREE.CanvasTexture {
  if (textureCache.has(cube.id)) {
    return textureCache.get(cube.id)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // 1. Sleek glossy gradient background matching brand color
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, cube.bgColor);
  grad.addColorStop(1, '#050B14');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // 2. Beveled border highlight
  ctx.strokeStyle = cube.brandColor;
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, 498, 498);

  // 3. Subtle inner glow border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 4;
  ctx.strokeRect(18, 18, 476, 476);

  // 4. Authentic Brand Logo drawn in the upper section
  drawLogo(ctx, cube, 256, 195, 205);

  // 5. Tech Name Label in the lower section
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px "Segoe UI", Roboto, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
  ctx.shadowBlur = 10;
  ctx.fillText(cube.name, 256, 395);
  ctx.shadowBlur = 0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  textureCache.set(cube.id, texture);
  return texture;
}
