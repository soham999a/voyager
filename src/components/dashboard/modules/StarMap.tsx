'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Planet {
  id: string;
  name: string;
  distance: number;
  type: string;
  status: 'explored' | 'unexplored' | 'hostile' | 'friendly';
  coordinates: { x: number; y: number; z: number };
}

const StarMap = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [scanMode, setScanMode] = useState(false);
  const [planets] = useState<Planet[]>([
    {
      id: '1',
      name: 'Kepler-442b',
      distance: 1200,
      type: 'Super-Earth',
      status: 'friendly',
      coordinates: { x: 1500, y: -800, z: 400 }
    },
    {
      id: '2',
      name: 'Proxima Centauri b',
      distance: 4.24,
      type: 'Terrestrial',
      status: 'unexplored',
      coordinates: { x: -200, y: 300, z: -100 }
    },
    {
      id: '3',
      name: 'TRAPPIST-1e',
      distance: 39.5,
      type: 'Rocky',
      status: 'explored',
      coordinates: { x: 800, y: 600, z: -300 }
    },
    {
      id: '4',
      name: 'Wolf 359 b',
      distance: 7.9,
      type: 'Gas Giant',
      status: 'hostile',
      coordinates: { x: -600, y: -400, z: 200 }
    },
    {
      id: '5',
      name: 'Gliese 667Cc',
      distance: 23.6,
      type: 'Super-Earth',
      status: 'friendly',
      coordinates: { x: 400, y: -200, z: 500 }
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'friendly': return 'text-neon-green';
      case 'hostile': return 'text-red-400';
      case 'explored': return 'text-neon-blue';
      case 'unexplored': return 'text-gray-400';
      default: return 'text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'friendly': return '🟢';
      case 'hostile': return '🔴';
      case 'explored': return '🔵';
      case 'unexplored': return '⚪';
      default: return '⚪';
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-orbitron text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent">
            STAR MAP
          </span>
        </h1>
        <p className="font-mono text-sm sm:text-base text-gray-400">
          Interactive Galaxy Navigation System
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Star Map Display */}
        <div className="lg:col-span-2 glass-strong rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-orbitron text-xl font-bold text-white flex items-center">
              <span className="mr-2">🌌</span>
              Galaxy Map
            </h2>
            <button
              onClick={() => setScanMode(!scanMode)}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200 ${
                scanMode
                  ? 'bg-neon-green/20 text-neon-green'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {scanMode ? 'SCANNING...' : 'DEEP SCAN'}
            </button>
          </div>

          {/* 3D-style Star Map */}
          <div className="relative bg-black rounded-lg h-96 overflow-hidden">
            {/* Stars background */}
            <div className="absolute inset-0">
              {[...Array(100)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    opacity: Math.random() * 0.8 + 0.2
                  }}
                />
              ))}
            </div>

            {/* Planets */}
            {planets.map((planet, index) => (
              <motion.div
                key={planet.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${50 + (planet.coordinates.x / 20)}%`,
                  top: `${50 + (planet.coordinates.y / 20)}%`,
                }}
                onClick={() => setSelectedPlanet(planet)}
              >
                <div className={`relative group ${scanMode ? 'animate-pulse' : ''}`}>
                  <div className={`w-4 h-4 rounded-full ${
                    planet.status === 'friendly' ? 'bg-neon-green' :
                    planet.status === 'hostile' ? 'bg-red-500' :
                    planet.status === 'explored' ? 'bg-neon-blue' :
                    'bg-gray-400'
                  } shadow-lg`}>
                    {scanMode && (
                      <div className="absolute inset-0 rounded-full border-2 border-white animate-ping"></div>
                    )}
                  </div>

                  {/* Planet label */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/80 px-2 py-1 rounded text-xs font-mono text-white whitespace-nowrap">
                      {planet.name}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Current ship position */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-6 h-6 bg-neon-purple rounded-full animate-pulse shadow-lg shadow-neon-purple/50"></div>
                <div className="absolute inset-0 border-2 border-neon-purple rounded-full animate-ping"></div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <span className="font-mono text-xs text-neon-purple">VOYAGER PALEN</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Planet Details */}
        <div className="glass-strong rounded-xl p-6">
          <h3 className="font-orbitron text-lg font-bold text-white mb-4 flex items-center">
            <span className="mr-2">🪐</span>
            Planet Details
          </h3>

          {selectedPlanet ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <h4 className="font-orbitron text-xl font-bold text-white mb-2">
                  {selectedPlanet.name}
                </h4>
                <div className="flex items-center space-x-2 mb-4">
                  <span>{getStatusIcon(selectedPlanet.status)}</span>
                  <span className={`font-mono text-sm ${getStatusColor(selectedPlanet.status)}`}>
                    {selectedPlanet.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="font-mono text-xs text-gray-400 mb-1">DISTANCE</p>
                  <p className="font-mono text-sm text-white">{selectedPlanet.distance} light years</p>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="font-mono text-xs text-gray-400 mb-1">TYPE</p>
                  <p className="font-mono text-sm text-white">{selectedPlanet.type}</p>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="font-mono text-xs text-gray-400 mb-1">COORDINATES</p>
                  <p className="font-mono text-xs text-white">
                    X: {selectedPlanet.coordinates.x}<br/>
                    Y: {selectedPlanet.coordinates.y}<br/>
                    Z: {selectedPlanet.coordinates.z}
                  </p>
                </div>
              </div>

              <button className="w-full py-2 bg-neon-blue/20 hover:bg-neon-blue/30 rounded-lg font-mono text-sm text-neon-blue transition-all duration-200">
                SET COURSE
              </button>
            </motion.div>
          ) : (
            <div className="text-center py-8">
              <p className="font-mono text-gray-400 text-sm">
                Click on a planet to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StarMap;
