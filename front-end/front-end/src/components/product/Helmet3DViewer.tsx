import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import { Helmet3DModel } from './Helmet3DModel';
import { RotateCw, ZoomIn, Eye, Sparkles, Box, RefreshCw } from 'lucide-react';

interface Helmet3DViewerProps {
  initialColor?: string;
  modelUrl?: string;
  helmetName?: string;
}

export const Helmet3DViewer: React.FC<Helmet3DViewerProps> = ({
  initialColor = 'Negro Mate',
  modelUrl = '/models/casco.glb',
  helmetName = 'Casco Deportivo'
}) => {
  const [selectedColor, setSelectedColor] = useState<string>(initialColor);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [visorOpen, setVisorOpen] = useState<boolean>(false);
  const controlsRef = useRef<any>(null);

  const colors = [
    { name: 'Negro Mate', hex: '#18181b', label: 'Negro' },
    { name: 'Rojo Racing', hex: '#ef4444', label: 'Rojo' },
    { name: 'Titanio', hex: '#4b5563', label: 'Titanio' },
    { name: 'Blanco Perla', hex: '#f4f4f5', label: 'Blanco' }
  ];

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#13131a] to-[#0a0a0e] border border-[#272732] overflow-hidden shadow-2xl flex flex-col">
      {/* Barra superior de herramientas 3D */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-[#161620]/90 backdrop-blur-md border-b border-[#272732] z-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-red-600/10 border border-red-500/30 text-red-500">
            <Box className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-500">Visualizador 3D Interactivo</span>
            <p className="text-sm font-semibold text-white truncate max-w-[200px] sm:max-w-xs">{helmetName}</p>
          </div>
        </div>

        {/* Acciones interactivas */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVisorOpen(!visorOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              visorOpen
                ? 'bg-red-600/20 text-red-400 border-red-500/50 shadow-sm'
                : 'bg-[#1e1e28] text-zinc-300 border-[#2f303f] hover:text-white hover:border-zinc-500'
            }`}
            title="Abrir o cerrar el visor"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{visorOpen ? 'Cerrar Visor' : 'Abrir Visor'}</span>
          </button>

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              autoRotate
                ? 'bg-red-600/20 text-red-400 border-red-500/50'
                : 'bg-[#1e1e28] text-zinc-300 border-[#2f303f] hover:text-white'
            }`}
            title="Alternar rotación automática"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Giro 360°</span>
          </button>

          <button
            onClick={handleResetCamera}
            className="p-1.5 rounded-lg bg-[#1e1e28] text-zinc-300 border border-[#2f303f] hover:text-white hover:border-zinc-500 transition-colors"
            title="Restablecer posición inicial"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Canvas 3D de Three.js */}
      <div className="relative w-full h-[400px] sm:h-[460px] cursor-grab active:cursor-grabbing">
        <Canvas
          shadows
          camera={{ position: [0, 0.8, 3.8], fov: 45 }}
          className="w-full h-full"
        >
          {/* Iluminación de estudio */}
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <directionalLight position={[-5, 3, -3]} intensity={0.6} color="#ef4444" />
          <directionalLight position={[0, -3, 2]} intensity={0.4} color="#3b82f6" />
          <spotLight position={[0, 5, 0]} intensity={0.8} angle={0.6} penumbra={1} />

          {/* Modelo flotante suave con física de visor */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <Helmet3DModel
              color={selectedColor}
              modelUrl={modelUrl}
              visorOpen={visorOpen}
            />
          </Float>

          {/* Sombra de contacto suave en el piso */}
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.65}
            scale={6}
            blur={2.4}
            far={4}
            color="#000000"
          />

          {/* Controles de cámara con amortiguación */}
          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.05}
            autoRotate={autoRotate}
            autoRotateSpeed={1.8}
            minDistance={2}
            maxDistance={6.5}
            maxPolarAngle={Math.PI / 2 + 0.1}
          />
        </Canvas>

        {/* Guía visual para el usuario (hover o touch) */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2 text-xs text-zinc-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 pointer-events-none">
          <ZoomIn className="w-3.5 h-3.5 text-red-500" />
          <span>Arrastra para rotar • Rueda para zoom • Clic derecho para mover</span>
        </div>
      </div>

      {/* Barra inferior: Selector de acabados y nota de backend */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3.5 bg-[#121218] border-t border-[#272732]">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            Acabado 3D:
          </span>
          <div className="flex items-center gap-2">
            {colors.map(c => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                  selectedColor === c.name
                    ? 'border-red-500 bg-red-500/10 text-white'
                    : 'border-[#272732] bg-[#1a1a24] text-zinc-400 hover:text-white hover:border-zinc-600'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-black/30 shadow-inner"
                  style={{ backgroundColor: c.hex }}
                />
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Banner informativo de arquitectura .glb */}
        <div className="text-right">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-500 bg-[#181824] px-2.5 py-1 rounded border border-[#262736]">
            <Box className="w-3 h-3 text-red-400" />
            Soporta carga directa de <code className="text-red-400">/models/casco.glb</code>
          </span>
        </div>
      </div>
    </div>
  );
};
