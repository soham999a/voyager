'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NASAApi } from '@/lib/api';

interface ISSPosition {
  latitude: number;
  longitude: number;
  timestamp: number;
}

interface CrewMember {
  name: string;
  craft: string;
}

const ShipTracking = () => {
  const [issPosition, setIssPosition] = useState<ISSPosition | null>(null);
  const [crewData, setCrewData] = useState<CrewMember[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchISSData = async () => {
    try {
      // Get ISS position
      const positionResponse = await NASAApi.getISSLocation();
      if (positionResponse.success) {
        setIssPosition({
          latitude: parseFloat(positionResponse.data.iss_position.latitude),
          longitude: parseFloat(positionResponse.data.iss_position.longitude),
          timestamp: positionResponse.data.timestamp
        });
      }

      // Get people in space
      const crewResponse = await NASAApi.getPeopleInSpace();
      if (crewResponse.success) {
        setCrewData(crewResponse.data.people || []);
      }

      setLastUpdate(new Date());
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch ISS data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchISSData();
    const interval = setInterval(fetchISSData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getLocationName = (lat: number, lng: number) => {
    // Simple location approximation
    if (lat > 0) {
      return lng > 0 ? 'Northern Pacific' : 'Northern Atlantic';
    } else {
      return lng > 0 ? 'Southern Pacific' : 'Southern Atlantic';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-orbitron text-4xl font-bold mb-2 text-glow">
          <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent">
            SHIP TRACKING
          </span>
        </h1>
        <p className="font-mono text-gray-400">Real-time Position Monitoring</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Current Position */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-strong rounded-xl p-6"
        >
          <h2 className="font-orbitron text-xl font-bold text-neon-blue mb-4 flex items-center">
            <span className="mr-2">🛰️</span>
            Current Position
          </h2>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="font-mono text-gray-400">Acquiring satellite lock...</p>
            </div>
          ) : issPosition ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="font-mono text-xs text-gray-400 mb-1">LATITUDE</p>
                  <p className="font-mono text-lg text-white">{issPosition.latitude.toFixed(4)}°</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="font-mono text-xs text-gray-400 mb-1">LONGITUDE</p>
                  <p className="font-mono text-lg text-white">{issPosition.longitude.toFixed(4)}°</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="font-mono text-xs text-gray-400 mb-1">REGION</p>
                <p className="font-mono text-sm text-neon-green">
                  {getLocationName(issPosition.latitude, issPosition.longitude)}
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="font-mono text-xs text-gray-400 mb-1">ALTITUDE</p>
                <p className="font-mono text-sm text-white">~408 km above Earth</p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="font-mono text-xs text-gray-400 mb-1">ORBITAL SPEED</p>
                <p className="font-mono text-sm text-white">~27,600 km/h</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="font-mono text-red-400">Unable to acquire position data</p>
            </div>
          )}
        </motion.div>

        {/* Crew Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-strong rounded-xl p-6"
        >
          <h2 className="font-orbitron text-xl font-bold text-neon-green mb-4 flex items-center">
            <span className="mr-2">👨‍🚀</span>
            Crew Aboard
          </h2>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded"></div>
              </div>
            </div>
          ) : crewData.length > 0 ? (
            <div className="space-y-3">
              {crewData.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 rounded-lg p-3 flex items-center justify-between"
                >
                  <div>
                    <p className="font-mono text-white font-semibold">{member.name}</p>
                    <p className="font-mono text-xs text-gray-400">{member.craft}</p>
                  </div>
                  <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                </motion.div>
              ))}

              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="font-mono text-xs text-gray-400">
                  Total crew members: <span className="text-neon-green">{crewData.length}</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="font-mono text-gray-400">No crew data available</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ShipTracking;
