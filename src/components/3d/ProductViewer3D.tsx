import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, RefreshCw, Eye, Sparkles, Layers, Sliders } from 'lucide-react';
import { Product } from '../../types';

interface ProductViewer3DProps {
  product: Product;
  selectedColorHex?: string;
  className?: string;
}

/**
 * Creates a procedural high-resolution canvas texture representing the aerodynamic micro-vent mesh.
 * This simulates micro-porous airflow vents, silver-ion conductive threads, and kinetic fabric weave.
 */
function generateAerodynamicMeshTexture(baseColorHex: string, mode: 'mesh' | 'thermal' | 'carbon'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  if (mode === 'thermal') {
    // Heat dissipation thermal map
    const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 250);
    grad.addColorStop(0, '#ef4444'); // Core thermal zone
    grad.addColorStop(0.4, '#f59e0b');
    grad.addColorStop(0.7, '#10b981');
    grad.addColorStop(1, '#38bdf8'); // Active cooling edge
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Micro-vent overlay dots
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    for (let x = 0; x < 512; x += 16) {
      for (let y = 0; y < 512; y += 16) {
        ctx.beginPath();
        ctx.arc(x + 8, y + 8, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (mode === 'carbon') {
    // Carbon fiber / paddle weave texture
    ctx.fillStyle = '#0f1015';
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = '#1e2029';
    for (let i = 0; i < 512; i += 32) {
      for (let j = 0; j < 512; j += 32) {
        ctx.fillRect(i, j, 16, 16);
        ctx.fillRect(i + 16, j + 16, 16, 16);
      }
    }
    // Neon accent lines
    ctx.strokeStyle = '#ccff00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(256, 256, 120, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    // Default Aerodynamic Micro-Vent Fabric Mesh
    ctx.fillStyle = baseColorHex || '#12141c';
    ctx.fillRect(0, 0, 512, 512);

    // Draw hexagonal kinetic micro-vent pore grid
    const hexRadius = 8;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.strokeStyle = 'rgba(204, 255, 0, 0.15)'; // Lime silver-ion thread outline
    ctx.lineWidth = 1;

    for (let y = 0; y < 512; y += 18) {
      const offsetX = (Math.floor(y / 18) % 2) * 12;
      for (let x = -12; x < 512; x += 24) {
        const cx = x + offsetX;
        const cy = y;

        // Micro-pore dark center
        ctx.beginPath();
        ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Silver-ion outline ring
        ctx.beginPath();
        ctx.arc(cx, cy, 5.5, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Subtle moisture-wicking directional grain lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 512; i += 8) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

export const ProductViewer3D: React.FC<ProductViewer3DProps> = ({
  product,
  selectedColorHex,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const objectGroupRef = useRef<THREE.Group | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const [renderMode, setRenderMode] = useState<'solid' | 'aero-mesh' | 'wireframe' | 'thermal'>('aero-mesh');
  const [isRotating, setIsRotating] = useState(true);
  const [zoomDistance, setZoomDistance] = useState(5.2);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  const activeColorHex = selectedColorHex || product.colors[0]?.hex || '#14161f';

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
    camera.position.z = zoomDistance;
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.4);
    mainLight.position.set(5, 8, 6);
    scene.add(mainLight);

    const rimLightLime = new THREE.PointLight(0xccff00, 2.0, 10);
    rimLightLime.position.set(-4, 3, 3);
    scene.add(rimLightLime);

    const rimLightBlue = new THREE.PointLight(0x38bdf8, 1.8, 10);
    rimLightBlue.position.set(4, -2, 4);
    scene.add(rimLightBlue);

    // 5. Group for 3D Product Mesh
    const group = new THREE.Group();
    objectGroupRef.current = group;
    scene.add(group);

    const isPaddle = product.id.includes('paddle') || product.id.includes('cover');
    const isHat = product.id.includes('cap') || product.id.includes('hat') || product.id.includes('visor');

    // Generate Procedural Textures
    const aeroTexture = generateAerodynamicMeshTexture(activeColorHex, 'mesh');
    const thermalTexture = generateAerodynamicMeshTexture(activeColorHex, 'thermal');
    const carbonTexture = generateAerodynamicMeshTexture(activeColorHex, 'carbon');

    if (isPaddle) {
      // 3D Carbon Fiber Paddle Geometry
      const paddleShape = new THREE.Shape();
      paddleShape.moveTo(0, -1.1);
      paddleShape.quadraticCurveTo(0.85, -1.0, 0.85, 0);
      paddleShape.quadraticCurveTo(0.85, 1.1, 0, 1.1);
      paddleShape.quadraticCurveTo(-0.85, 1.1, -0.85, 0);
      paddleShape.quadraticCurveTo(-0.85, -1.0, 0, -1.1);

      const paddleExtrudeSettings = { steps: 1, depth: 0.12, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 3 };
      const paddleGeo = new THREE.ExtrudeGeometry(paddleShape, paddleExtrudeSettings);
      paddleGeo.center();

      const handleGeo = new THREE.CylinderGeometry(0.18, 0.22, 1.2, 16);
      handleGeo.translate(0, -1.6, 0);

      let faceMat: THREE.Material;
      if (renderMode === 'wireframe') {
        faceMat = new THREE.MeshStandardMaterial({ color: 0x34d399, wireframe: true, emissive: 0x059669 });
      } else if (renderMode === 'thermal') {
        faceMat = new THREE.MeshStandardMaterial({ map: thermalTexture, roughness: 0.3 });
      } else if (renderMode === 'aero-mesh') {
        faceMat = new THREE.MeshStandardMaterial({ map: carbonTexture, roughness: 0.25, metalness: 0.5 });
      } else {
        faceMat = new THREE.MeshStandardMaterial({ color: activeColorHex === '#0a0a0c' ? '#18181b' : activeColorHex, roughness: 0.3, metalness: 0.6 });
      }

      const handleMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.8 });
      const faceMesh = new THREE.Mesh(paddleGeo, faceMat);
      const handleMesh = new THREE.Mesh(handleGeo, handleMat);

      // Edge guard trim
      const edgeGeo = new THREE.TorusGeometry(0.86, 0.04, 16, 32);
      const edgeMat = new THREE.MeshStandardMaterial({ color: 0xccff00, roughness: 0.2, metalness: 0.8 });
      const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);

      group.add(faceMesh);
      group.add(handleMesh);
      group.add(edgeMesh);
    } else if (isHat) {
      // 3D Cap / Visor Geometry
      const crownGeo = new THREE.SphereGeometry(1.0, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
      const brimShape = new THREE.Shape();
      brimShape.moveTo(-0.9, 0);
      brimShape.quadraticCurveTo(0, 1.2, 0.9, 0);
      brimShape.quadraticCurveTo(0, -0.3, -0.9, 0);

      const brimGeo = new THREE.ExtrudeGeometry(brimShape, { depth: 0.04, bevelEnabled: true, bevelThickness: 0.01 });
      brimGeo.center();
      brimGeo.rotateX(Math.PI * 0.4);
      brimGeo.translate(0, -0.1, 0.7);

      let hatMat: THREE.Material;
      if (renderMode === 'wireframe') {
        hatMat = new THREE.MeshStandardMaterial({ color: 0x34d399, wireframe: true });
      } else if (renderMode === 'thermal') {
        hatMat = new THREE.MeshStandardMaterial({ map: thermalTexture, roughness: 0.3 });
      } else if (renderMode === 'aero-mesh') {
        hatMat = new THREE.MeshStandardMaterial({ map: aeroTexture, roughness: 0.4 });
      } else {
        hatMat = new THREE.MeshStandardMaterial({ color: activeColorHex, roughness: 0.5 });
      }

      const crownMesh = new THREE.Mesh(crownGeo, hatMat);
      const brimMesh = new THREE.Mesh(brimGeo, hatMat);

      group.add(crownMesh);
      group.add(brimMesh);
    } else {
      // 3D Garment / T-Shirt Mesh
      const tShirtShape = new THREE.Shape();
      tShirtShape.moveTo(0.8, -1.25);
      tShirtShape.lineTo(-0.8, -1.25);
      tShirtShape.lineTo(-0.85, 0.25);
      tShirtShape.lineTo(-1.55, -0.05);
      tShirtShape.lineTo(-1.42, 0.52);
      tShirtShape.lineTo(-0.55, 0.92);
      tShirtShape.quadraticCurveTo(0, 0.6, 0.55, 0.92);
      tShirtShape.lineTo(1.42, 0.52);
      tShirtShape.lineTo(1.55, -0.05);
      tShirtShape.lineTo(0.85, 0.25);
      tShirtShape.closePath();

      const extrudeSettings = {
        steps: 3,
        depth: 0.32,
        bevelEnabled: true,
        bevelThickness: 0.08,
        bevelSize: 0.08,
        bevelSegments: 6,
      };

      const tShirtGeo = new THREE.ExtrudeGeometry(tShirtShape, extrudeSettings);
      tShirtGeo.center();

      let garmentMat: THREE.Material;
      if (renderMode === 'wireframe') {
        garmentMat = new THREE.MeshStandardMaterial({
          color: 0x34d399,
          wireframe: true,
          emissive: 0x059669,
          emissiveIntensity: 0.5,
        });
      } else if (renderMode === 'thermal') {
        garmentMat = new THREE.MeshStandardMaterial({ map: thermalTexture, roughness: 0.3 });
      } else if (renderMode === 'aero-mesh') {
        garmentMat = new THREE.MeshStandardMaterial({
          map: aeroTexture,
          bumpMap: aeroTexture,
          bumpScale: 0.04,
          roughness: 0.35,
          metalness: 0.1,
        });
      } else {
        garmentMat = new THREE.MeshStandardMaterial({
          color: activeColorHex === '#0a0a0c' ? '#181922' : activeColorHex,
          roughness: 0.45,
          metalness: 0.15,
        });
      }

      const tShirtMesh = new THREE.Mesh(tShirtGeo, garmentMat);
      group.add(tShirtMesh);

      // Collar Trim
      const collarGeo = new THREE.TorusGeometry(0.35, 0.04, 16, 32);
      const collarMat = new THREE.MeshStandardMaterial({ color: 0xccff00, roughness: 0.2, metalness: 0.6 });
      const collarMesh = new THREE.Mesh(collarGeo, collarMat);
      collarMesh.position.set(0, 0.62, 0.18);
      collarMesh.rotation.x = Math.PI * 0.15;
      group.add(collarMesh);
    }

    // 6. Animation loop
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      if (objectGroupRef.current && isRotating && !isDragging.current) {
        objectGroupRef.current.rotation.y += 0.008;
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
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      resizeObserver.disconnect();
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, [product, renderMode, isRotating, activeColorHex, zoomDistance]);

  // Update Camera Zoom
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = zoomDistance;
    }
  }, [zoomDistance]);

  // Drag Interaction
  const handleStart = (clientX: number, clientY: number) => {
    isDragging.current = true;
    previousMousePosition.current = { x: clientX, y: clientY };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging.current || !objectGroupRef.current) return;

    const deltaX = clientX - previousMousePosition.current.x;
    const deltaY = clientY - previousMousePosition.current.y;

    objectGroupRef.current.rotation.y += deltaX * 0.01;
    objectGroupRef.current.rotation.x += deltaY * 0.01;

    // Clamp tilt
    objectGroupRef.current.rotation.x = Math.max(-Math.PI * 0.35, Math.min(Math.PI * 0.35, objectGroupRef.current.rotation.x));

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

  const handleZoomIn = () => setZoomDistance((prev) => Math.max(2.8, prev - 0.6));
  const handleZoomOut = () => setZoomDistance((prev) => Math.min(8.0, prev + 0.6));
  const handleReset = () => {
    setZoomDistance(5.2);
    if (objectGroupRef.current) {
      objectGroupRef.current.rotation.x = 0;
      objectGroupRef.current.rotation.y = 0;
    }
  };

  return (
    <div className={`relative bg-[#121318] border border-white/10 rounded-2xl p-5 overflow-hidden shadow-2xl ${className}`}>
      {/* Header Overlay */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 z-10 relative font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse" />
          <span className="text-white font-extrabold tracking-wider uppercase">
            360° THREE.JS REAL-TIME INSPECTION
          </span>
        </div>

        <div className="flex items-center gap-3 text-zinc-400">
          <span>DRAG TO ROTATE</span>
          <span className="text-[#ccff00] font-bold">AERO-DRAG: {product.specSheet.airflowDragCoeff}</span>
        </div>
      </div>

      {/* 3D Viewport Canvas */}
      <div className="relative">
        <div
          ref={containerRef}
          onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
          onTouchStart={(e) => {
            if (e.touches.length > 0) handleStart(e.touches[0].clientX, e.touches[0].clientY);
          }}
          className="w-full h-[360px] sm:h-[420px] cursor-grab active:cursor-grabbing flex items-center justify-center bg-[#09090c] rounded-xl border border-white/10 shadow-inner"
        />

        {/* Micro-Vent Texture Badge Overlay */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1.5 text-[10px] font-mono text-zinc-300 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#ccff00]" />
          <span>MICRO-POROUS MESH POROSITY: <strong>0.12mm</strong></span>
        </div>

        {/* Zoom & Orbit Quick Floating Controls */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-md border border-white/15 p-1 rounded-xl">
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            className="p-1.5 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            className="p-1.5 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            title="Reset Camera & Tilt"
            className="p-1.5 hover:bg-white/20 text-[#ccff00] rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Material Render Modes & Orbit Toggle */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3 text-xs font-mono">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-zinc-400 text-[10px] uppercase font-bold mr-1">TEXTURE MODE:</span>
          <button
            onClick={() => setRenderMode('aero-mesh')}
            className={`px-3 py-1.5 rounded-lg transition-all font-bold ${
              renderMode === 'aero-mesh'
                ? 'bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/20'
                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
            }`}
          >
            AERO-MESH PORES
          </button>
          <button
            onClick={() => setRenderMode('solid')}
            className={`px-3 py-1.5 rounded-lg transition-all font-bold ${
              renderMode === 'solid'
                ? 'bg-white text-black'
                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
            }`}
          >
            COLORWAY SOLID
          </button>
          <button
            onClick={() => setRenderMode('thermal')}
            className={`px-3 py-1.5 rounded-lg transition-all font-bold ${
              renderMode === 'thermal'
                ? 'bg-orange-500 text-black font-extrabold'
                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
            }`}
          >
            THERMAL MAP
          </button>
          <button
            onClick={() => setRenderMode('wireframe')}
            className={`px-3 py-1.5 rounded-lg transition-all font-bold ${
              renderMode === 'wireframe'
                ? 'bg-emerald-400 text-black font-extrabold'
                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
            }`}
          >
            WIND TUNNEL MESH
          </button>
        </div>

        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
            isRotating
              ? 'text-[#ccff00] border-[#ccff00]/40 bg-[#ccff00]/10'
              : 'text-zinc-400 border-white/10 hover:text-white'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
          <span>{isRotating ? 'ORBIT: ACTIVE' : 'ORBIT: PAUSED'}</span>
        </button>
      </div>
    </div>
  );
};
