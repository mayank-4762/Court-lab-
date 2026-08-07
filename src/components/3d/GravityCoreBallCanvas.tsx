import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Zap, Eye, RefreshCw } from 'lucide-react';

interface GravityCoreBallCanvasProps {
  mode?: 'ball' | 'wireframe' | 'thermal';
  interactive?: boolean;
  className?: string;
  autoRotateSpeed?: number;
}

/**
 * Procedurally generates high-resolution textures for the 3D Aero-Kinetic Core Sphere.
 */
function generateCoreTexture(mode: 'ball' | 'wireframe' | 'thermal'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  if (mode === 'thermal') {
    // Thermal heat map gradient
    const grad = ctx.createRadialGradient(256, 256, 20, 256, 256, 250);
    grad.addColorStop(0, '#ef4444'); // Core thermal center
    grad.addColorStop(0.35, '#f59e0b'); // High friction dissipation
    grad.addColorStop(0.7, '#10b981'); // Optimal temp zone
    grad.addColorStop(1, '#38bdf8'); // Active cooling edge
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Micro-pore thermal grid
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    for (let x = 0; x < 512; x += 16) {
      for (let y = 0; y < 512; y += 16) {
        ctx.beginPath();
        ctx.arc(x + 8, y + 8, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else {
    // Sleek Dark Matte Micro-Vent Mesh Texture
    ctx.fillStyle = '#0f1118';
    ctx.fillRect(0, 0, 512, 512);

    // Kinetic micro-vent hexagonal grid
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.strokeStyle = 'rgba(204, 255, 0, 0.35)'; // Silver-ion neon line
    ctx.lineWidth = 1;

    for (let y = 0; y < 512; y += 20) {
      const offsetX = (Math.floor(y / 20) % 2) * 12;
      for (let x = -12; x < 512; x += 24) {
        const cx = x + offsetX;
        const cy = y;

        // Micro pore
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fill();

        // Silver-ion conductive ring
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Latitude accent grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 512; i += 32) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

export const GravityCoreBallCanvas: React.FC<GravityCoreBallCanvasProps> = ({
  mode = 'ball',
  interactive = true,
  className = '',
  autoRotateSpeed = 0.008,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const objectGroupRef = useRef<THREE.Group | null>(null);
  const ringsGroupRef = useRef<THREE.Group | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [currentMode, setCurrentMode] = useState<'ball' | 'wireframe' | 'thermal'>(mode);

  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // Clear container
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(5, 8, 6);
    scene.add(mainLight);

    const limeRimLight = new THREE.PointLight(0xccff00, 2.2, 12);
    limeRimLight.position.set(-4, 3, 3);
    scene.add(limeRimLight);

    const cyanRimLight = new THREE.PointLight(0x38bdf8, 2.0, 12);
    cyanRimLight.position.set(4, -3, 4);
    scene.add(cyanRimLight);

    // 5. Main 3D Group
    const group = new THREE.Group();
    objectGroupRef.current = group;
    scene.add(group);

    // Generate procedural texture
    const coreTexture = generateCoreTexture(currentMode);

    // Core Geometry: High-resolution smooth sphere
    const sphereGeo = new THREE.SphereGeometry(1.25, 64, 64);

    let coreMaterial: THREE.Material;

    if (currentMode === 'wireframe') {
      coreMaterial = new THREE.MeshStandardMaterial({
        color: 0x34d399,
        wireframe: true,
        emissive: 0x059669,
        emissiveIntensity: 0.6,
      });
    } else if (currentMode === 'thermal') {
      coreMaterial = new THREE.MeshStandardMaterial({
        map: coreTexture,
        roughness: 0.25,
        metalness: 0.2,
      });
    } else {
      // Sleek High-Performance Aero Mesh
      coreMaterial = new THREE.MeshStandardMaterial({
        map: coreTexture,
        bumpMap: coreTexture,
        bumpScale: 0.05,
        roughness: 0.35,
        metalness: 0.25,
      });
    }

    const coreMesh = new THREE.Mesh(sphereGeo, coreMaterial);
    group.add(coreMesh);

    // Outer Aerodynamic Orbital Rings
    const ringsGroup = new THREE.Group();
    ringsGroupRef.current = ringsGroup;
    group.add(ringsGroup);

    // Ring 1: Equatorial Lime Accent Ring
    const ring1Geo = new THREE.TorusGeometry(1.52, 0.025, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xccff00,
      emissive: 0xccff00,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI * 0.45;
    ringsGroup.add(ring1Mesh);

    // Ring 2: Polar Cyan Accent Ring
    const ring2Geo = new THREE.TorusGeometry(1.68, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.8,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.y = Math.PI * 0.35;
    ringsGroup.add(ring2Mesh);

    // Orbiting Particle Cloud (Airflow Stream Simulation)
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount; p++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.7 + Math.random() * 0.6;

      particlePositions[p * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[p * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[p * 3 + 2] = r * Math.cos(phi);
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xccff00,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    // 6. Animation Loop
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      if (objectGroupRef.current) {
        if (!isDragging.current) {
          objectGroupRef.current.rotation.y += autoRotateSpeed;
          objectGroupRef.current.rotation.x += autoRotateSpeed * 0.3;
        }

        if (ringsGroupRef.current) {
          ringsGroupRef.current.rotation.z += 0.012;
          ringsGroupRef.current.rotation.y -= 0.008;
        }

        particles.rotation.y -= 0.005;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      resizeObserver.disconnect();
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, [currentMode, autoRotateSpeed]);

  // Mouse Drag Handlers
  const handleStart = (clientX: number, clientY: number) => {
    if (!interactive) return;
    isDragging.current = true;
    previousMousePosition.current = { x: clientX, y: clientY };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging.current || !objectGroupRef.current) return;
    const deltaX = clientX - previousMousePosition.current.x;
    const deltaY = clientY - previousMousePosition.current.y;

    objectGroupRef.current.rotation.y += deltaX * 0.01;
    objectGroupRef.current.rotation.x += deltaY * 0.01;

    previousMousePosition.current = { x: clientX, y: clientY };
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const onWindowMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onWindowMouseUp = () => handleEnd();
    const onWindowTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onWindowTouchEnd = () => handleEnd();

    window.addEventListener('mousemove', onWindowMouseMove);
    window.addEventListener('mouseup', onWindowMouseUp);
    window.addEventListener('touchmove', onWindowTouchMove);
    window.addEventListener('touchend', onWindowTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onWindowMouseUp);
      window.removeEventListener('touchmove', onWindowTouchMove);
      window.removeEventListener('touchend', onWindowTouchEnd);
    };
  }, []);

  return (
    <div
      className={`relative flex flex-col items-center justify-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={containerRef}
        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          if (e.touches.length > 0) handleStart(e.touches[0].clientX, e.touches[0].clientY);
        }}
        className="w-full h-full min-h-[300px] cursor-grab active:cursor-grabbing"
      />

      {/* Mode Controls Overlay */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#0b0c0e]/90 backdrop-blur-md p-1.5 rounded-full border border-white/10 text-[11px] font-mono text-zinc-300 shadow-xl z-10">
        <button
          onClick={() => setCurrentMode('ball')}
          className={`px-3 py-1 rounded-full transition-all font-bold ${
            currentMode === 'ball'
              ? 'bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/20'
              : 'hover:text-white'
          }`}
        >
          3D FABRIC MESH
        </button>
        <button
          onClick={() => setCurrentMode('wireframe')}
          className={`px-3 py-1 rounded-full transition-all font-bold ${
            currentMode === 'wireframe'
              ? 'bg-emerald-400 text-black shadow-md'
              : 'hover:text-white'
          }`}
        >
          AERO MESH
        </button>
        <button
          onClick={() => setCurrentMode('thermal')}
          className={`px-3 py-1 rounded-full transition-all font-bold ${
            currentMode === 'thermal'
              ? 'bg-amber-400 text-black shadow-md'
              : 'hover:text-white'
          }`}
        >
          THERMAL MAP
        </button>
      </div>

      {isHovered && (
        <div className="absolute top-4 right-4 pointer-events-none bg-black/80 backdrop-blur-sm border border-white/15 px-3 py-1 rounded-lg text-[10px] font-mono text-[#ccff00] uppercase tracking-wider">
          Drag to Orbit 360°
        </div>
      )}
    </div>
  );
};
