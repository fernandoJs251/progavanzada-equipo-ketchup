import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface HelmetModelProps {
  color?: string;
  modelUrl?: string;
  visorOpen?: boolean;
}

// Subcomponente que intenta cargar el archivo .glb si existe
const ExternalGLTFModel: React.FC<{ url: string; color: string }> = ({ url }) => {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene.clone()} scale={1.8} position={[0, -0.4, 0]} />;
};

// Componente procedural que simula un casco de motocicleta deportivo de alta gama
export const ProceduralHelmet: React.FC<{ color: string; visorOpen: boolean }> = ({ color, visorOpen }) => {
  const groupRef = useRef<THREE.Group>(null);
  const visorGroupRef = useRef<THREE.Group>(null);

  // Animación suave de apertura y cierre de visor
  useFrame((_, delta) => {
    if (visorGroupRef.current) {
      const targetRotation = visorOpen ? -Math.PI / 4 : 0;
      visorGroupRef.current.rotation.x = THREE.MathUtils.damp(
        visorGroupRef.current.rotation.x,
        targetRotation,
        8,
        delta
      );
    }
  });

  // Convertir color hex a Three.Color
  const shellColor = color.toLowerCase().includes('rojo')
    ? '#ef4444'
    : color.toLowerCase().includes('titanio') || color.toLowerCase().includes('gris')
    ? '#4b5563'
    : color.toLowerCase().includes('blanco')
    ? '#f3f4f6'
    : '#18181b';

  return (
    <group ref={groupRef} position={[0, 0, 0]} dispose={null}>
      {/* 1. Calota Principal (Shell Exterior) */}
      <mesh position={[0, 0.2, -0.1]} castShadow receiveShadow>
        <sphereGeometry args={[1.1, 48, 48]} />
        <meshStandardMaterial
          color={shellColor}
          metalness={0.6}
          roughness={0.25}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* 2. Mentonera deportiva / Chin Guard */}
      <mesh position={[0, -0.25, 0.45]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[1.4, 0.65, 0.9]} />
        <meshStandardMaterial
          color="#09090b"
          metalness={0.4}
          roughness={0.4}
        />
      </mesh>

      {/* 3. Tomas de aire frontales (Chin Vents) */}
      <mesh position={[0, -0.25, 0.92]} castShadow>
        <boxGeometry args={[0.45, 0.15, 0.05]} />
        <meshStandardMaterial color="#ef4444" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.25, 0.94]}>
        <boxGeometry args={[0.35, 0.08, 0.02]} />
        <meshBasicMaterial color="#000000" wireframe />
      </mesh>

      {/* 4. Spoiler Aerodinámico Trasero con Acento Rojo */}
      <mesh position={[0, 0.65, -0.8]} rotation={[-0.4, 0, 0]} castShadow>
        <boxGeometry args={[1.2, 0.15, 0.6]} />
        <meshStandardMaterial color="#ef4444" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Difusores laterales del spoiler */}
      <mesh position={[-0.6, 0.65, -0.7]} rotation={[-0.4, 0.2, 0]}>
        <boxGeometry args={[0.15, 0.2, 0.5]} />
        <meshStandardMaterial color="#09090b" />
      </mesh>
      <mesh position={[0.6, 0.65, -0.7]} rotation={[-0.4, -0.2, 0]}>
        <boxGeometry args={[0.15, 0.2, 0.5]} />
        <meshStandardMaterial color="#09090b" />
      </mesh>

      {/* 5. Tomas de aire superiores (Top Air Intakes) */}
      <mesh position={[-0.35, 1.15, 0.1]} rotation={[0.4, -0.1, 0]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.4]} />
        <meshStandardMaterial color="#09090b" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0.35, 1.15, 0.1]} rotation={[0.4, 0.1, 0]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.4]} />
        <meshStandardMaterial color="#09090b" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* 6. Pivotes laterales del visor (Visor Hinges) */}
      <mesh position={[-1.12, 0.15, 0.1]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 32]} />
        <meshStandardMaterial color="#ef4444" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[1.12, 0.15, 0.1]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 32]} />
        <meshStandardMaterial color="#ef4444" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* 7. Grupo de Visor Abatible (Visor Shield) */}
      <group ref={visorGroupRef} position={[0, 0.15, 0.1]}>
        {/* Pantalla curvada tintada (tinted polycarbonate) */}
        <mesh position={[0, 0.05, 0.7]} rotation={[0.1, 0, 0]} castShadow>
          <cylinderGeometry
            args={[1.05, 1.05, 0.65, 32, 1, true, -Math.PI / 3, (2 * Math.PI) / 3]}
          />
          <meshPhysicalMaterial
            color="#050508"
            roughness={0.05}
            metalness={0.1}
            transmission={0.8}
            ior={1.52}
            reflectivity={0.9}
            transparent={true}
            opacity={0.82}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Borde aerodinámico del visor con sello de goma */}
        <mesh position={[0, 0.36, 0.68]} rotation={[0.1, 0, 0]}>
          <cylinderGeometry
            args={[1.06, 1.06, 0.04, 32, 1, true, -Math.PI / 3, (2 * Math.PI) / 3]}
          />
          <meshStandardMaterial color="#ef4444" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      {/* 8. Acolchado interior / Cuello de protección (Neck Roll) */}
      <mesh position={[0, -0.65, -0.05]} castShadow>
        <torusGeometry args={[0.85, 0.22, 16, 40]} />
        <meshStandardMaterial color="#1f1f23" roughness={0.9} />
      </mesh>

      {/* 9. Insignia BIKERSTOCK3D frontal sutil */}
      <mesh position={[0, 0.85, 0.6]} rotation={[0.3, 0, 0]}>
        <planeGeometry args={[0.4, 0.12]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

export const Helmet3DModel: React.FC<HelmetModelProps> = ({
  color = 'Negro Mate',
  modelUrl = '/models/casco.glb',
  visorOpen = false
}) => {
  const [hasCustomModel, setHasCustomModel] = useState<boolean>(false);

  // Comprobar si el archivo /models/casco.glb existe en el servidor público
  useEffect(() => {
    if (!modelUrl) return;
    fetch(modelUrl, { method: 'HEAD' })
      .then(res => {
        if (res.ok && res.headers.get('content-type')?.includes('octet-stream')) {
          setHasCustomModel(true);
        } else {
          setHasCustomModel(false);
        }
      })
      .catch(() => {
        setHasCustomModel(false);
      });
  }, [modelUrl]);

  if (hasCustomModel && modelUrl) {
    return (
      <React.Suspense fallback={<ProceduralHelmet color={color} visorOpen={visorOpen} />}>
        <ExternalGLTFModel url={modelUrl} color={color} />
      </React.Suspense>
    );
  }

  return <ProceduralHelmet color={color} visorOpen={visorOpen} />;
};
