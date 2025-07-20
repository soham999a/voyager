'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Station Ring Component
function StationRing({ radius, position, rotationSpeed }: { radius: number; position: [number, number, number]; rotationSpeed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * delta;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[radius, 0.3, 16, 100]} />
      <meshStandardMaterial 
        color="#00d4ff" 
        emissive="#001122" 
        metalness={0.8} 
        roughness={0.2} 
      />
    </mesh>
  );
}

// Central Hub Component
function CentralHub() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * delta;
      meshRef.current.rotation.z += 0.005 * delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1, 1, 4, 32]} />
      <meshStandardMaterial 
        color="#8b5cf6" 
        emissive="#220044" 
        metalness={0.9} 
        roughness={0.1} 
      />
    </mesh>
  );
}

// Docking Port Component
function DockingPort({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.5, 0.3, 1, 16]} />
      <meshStandardMaterial 
        color="#ff6b9d" 
        emissive="#440022" 
        metalness={0.7} 
        roughness={0.3} 
      />
    </mesh>
  );
}

// Solar Panel Component
function SolarPanel({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={[4, 0.1, 2]} />
      <meshStandardMaterial 
        color="#001122" 
        emissive="#000044" 
        metalness={0.9} 
        roughness={0.1} 
      />
    </mesh>
  );
}

// Main Station Component
function Station() {
  return (
    <group>
      {/* Central Hub */}
      <CentralHub />
      
      {/* Main Habitat Ring */}
      <StationRing radius={8} position={[0, 0, 0]} rotationSpeed={0.1} />
      
      {/* Secondary Ring */}
      <StationRing radius={6} position={[0, 3, 0]} rotationSpeed={-0.15} />
      
      {/* Docking Ports */}
      <DockingPort position={[0, 2.5, 0]} />
      <DockingPort position={[0, -2.5, 0]} />
      
      {/* Solar Panels */}
      <SolarPanel position={[12, 2, 0]} rotation={[0, 0, Math.PI / 2]} />
      <SolarPanel position={[-12, 2, 0]} rotation={[0, 0, -Math.PI / 2]} />
      <SolarPanel position={[0, 2, 12]} rotation={[Math.PI / 2, 0, 0]} />
      <SolarPanel position={[0, 2, -12]} rotation={[-Math.PI / 2, 0, 0]} />
      
      {/* Station Labels */}
      <Text
        position={[0, -4, 0]}
        fontSize={0.5}
        color="#00d4ff"
        anchorX="center"
        anchorY="middle"
      >
        VOYAGER STATION
      </Text>
    </group>
  );
}

// Hotspot Component for Interactive Areas
function Hotspot({ position, label, onClick }: { position: [number, number, number]; label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.2]} />
      <meshBasicMaterial 
        color={hovered ? "#ff6b9d" : "#00d4ff"} 
        transparent 
        opacity={0.8} 
      />
      {hovered && (
        <Html>
          <div className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
            {label}
          </div>
        </Html>
      )}
    </mesh>
  );
}

// Main 3D Scene Component
export default function StationModel() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const hotspots = [
    { position: [8, 0, 0] as [number, number, number], label: "Luxury Suites", area: "suites" },
    { position: [-8, 0, 0] as [number, number, number], label: "Dining Hall", area: "dining" },
    { position: [0, 0, 8] as [number, number, number], label: "Observatory", area: "observatory" },
    { position: [0, 0, -8] as [number, number, number], label: "Fitness Center", area: "fitness" },
    { position: [6, 3, 0] as [number, number, number], label: "Command Center", area: "command" },
  ];

  return (
    <div className="relative w-full h-screen min-h-[600px]">
      <Canvas camera={{ position: [20, 10, 20], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <Station />
        
        {hotspots.map((hotspot, index) => (
          <Hotspot
            key={index}
            position={hotspot.position}
            label={hotspot.label}
            onClick={() => setSelectedArea(hotspot.area)}
          />
        ))}
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={50}
        />
        
        {/* Stars background */}
        <mesh>
          <sphereGeometry args={[100]} />
          <meshBasicMaterial 
            color="#000011" 
            side={THREE.BackSide}
          />
        </mesh>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-4 left-4 glass-strong rounded-lg p-3 sm:p-4 max-w-xs sm:max-w-sm">
        <h3 className="font-orbitron text-cyan-400 font-semibold mb-2 text-sm sm:text-base">
          Interactive Station Tour
        </h3>
        <p className="text-gray-300 text-xs sm:text-sm mb-3">
          Click and drag to rotate • Scroll to zoom • Click hotspots to explore
        </p>
        {selectedArea && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-2 sm:p-3 bg-cyan-400/10 rounded-lg border border-cyan-400/20"
          >
            <h4 className="text-cyan-400 font-semibold capitalize text-sm">
              {selectedArea.replace('-', ' ')}
            </h4>
            <p className="text-gray-300 text-xs sm:text-sm mt-1">
              {getAreaDescription(selectedArea)}
            </p>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 right-4 glass-strong rounded-lg p-2 sm:p-4">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button className="px-2 sm:px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded text-xs sm:text-sm hover:bg-cyan-400/30 transition-colors">
            Reset View
          </button>
          <button className="px-2 sm:px-3 py-1 bg-purple-400/20 text-purple-400 rounded text-xs sm:text-sm hover:bg-purple-400/30 transition-colors">
            Auto Rotate
          </button>
        </div>
      </div>
    </div>
  );
}

function getAreaDescription(area: string): string {
  const descriptions: Record<string, string> = {
    suites: "Luxurious accommodations with panoramic Earth views and artificial gravity.",
    dining: "Fine dining experience with cuisine from around the world and beyond.",
    observatory: "360-degree viewing dome for stargazing and Earth observation.",
    fitness: "Zero-gravity fitness center with specialized equipment and training.",
    command: "Mission control center and navigation hub of the station.",
  };
  return descriptions[area] || "Explore this area of the station.";
}
