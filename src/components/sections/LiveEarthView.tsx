'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Satellite, Clock, MapPin, Wifi } from 'lucide-react';
import ClientOnly from '@/components/ui/ClientOnly';

interface ISSPosition {
  latitude: number;
  longitude: number;
  timestamp: number;
}

interface OrbitData {
  altitude: number;
  velocity: number;
  period: number;
}

export default function LiveEarthView() {
  const [issPosition, setIssPosition] = useState<ISSPosition | null>(null);
  const [orbitData] = useState<OrbitData>({
    altitude: 408,
    velocity: 27600,
    period: 92.68
  });
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isLive, setIsLive] = useState(true);

  // Simulate ISS position updates (in a real app, you'd fetch from an API)
  useEffect(() => {
    const updatePosition = () => {
      // Simulate orbital movement
      const now = Date.now();
      const orbitProgress = (now / 1000 / 60) % orbitData.period; // Minutes into current orbit
      const angle = (orbitProgress / orbitData.period) * 2 * Math.PI;
      
      setIssPosition({
        latitude: Math.sin(angle * 0.5) * 51.6, // ISS orbital inclination
        longitude: ((angle * 180 / Math.PI) + (now / 1000 / 60) * 4) % 360 - 180,
        timestamp: now
      });
    };

    updatePosition();
    const interval = setInterval(updatePosition, 2000);
    return () => clearInterval(interval);
  }, [orbitData.period]);

  // Update current time
  useEffect(() => {
    // Set initial time on client side only
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getLocationName = (lat: number, lng: number) => {
    // Simplified location detection
    if (lat > 40 && lng > -10 && lng < 40) return "Over Europe";
    if (lat > 20 && lng > -130 && lng < -60) return "Over North America";
    if (lat > -40 && lng > 100 && lng < 150) return "Over Australia";
    if (lat > -10 && lat < 30 && lng > -20 && lng < 50) return "Over Africa";
    if (lat > 0 && lng > 70 && lng < 140) return "Over Asia";
    if (lat < -20 && lng > -80 && lng < -30) return "Over South America";
    return "Over Ocean";
  };

  const formatCoordinate = (coord: number, type: 'lat' | 'lng') => {
    const abs = Math.abs(coord);
    const direction = type === 'lat' ? (coord >= 0 ? 'N' : 'S') : (coord >= 0 ? 'E' : 'W');
    return `${abs.toFixed(2)}° ${direction}`;
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-glow">
            <span className="bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
              Live Earth View
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto px-4">
            Experience real-time views from Voyager Station's orbital position 400km above Earth
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Earth View */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="glass-strong rounded-2xl p-4 sm:p-6 h-64 sm:h-80 lg:h-96 relative overflow-hidden"
            >
              {/* Live indicator */}
              <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
                <span className="text-white font-semibold text-sm">
                  {isLive ? 'LIVE' : 'OFFLINE'}
                </span>
              </div>

              {/* Earth visualization */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-600 to-green-600 rounded-2xl">
                {/* Simulated Earth surface */}
                <div className="absolute inset-0 opacity-30">
                  <div className="w-full h-full bg-gradient-to-r from-green-800 via-blue-800 to-green-800 animate-pulse" />
                </div>
                
                {/* Cloud layer */}
                <div className="absolute inset-0 opacity-40">
                  <motion.div
                    className="w-full h-full bg-gradient-to-r from-white/20 via-transparent to-white/20"
                    animate={{ x: [-100, 100] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                {/* Station position indicator */}
                {issPosition && (
                  <motion.div
                    className="absolute w-4 h-4 bg-cyan-400 rounded-full shadow-lg"
                    style={{
                      left: `${((issPosition.longitude + 180) / 360) * 100}%`,
                      top: `${((90 - issPosition.latitude) / 180) * 100}%`,
                    }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping" />
                  </motion.div>
                )}
              </div>

              {/* Current location overlay */}
              {issPosition && (
                <div className="absolute bottom-4 left-4 right-4 glass rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <span className="text-white font-semibold text-sm">
                        {getLocationName(issPosition.latitude, issPosition.longitude)}
                      </span>
                    </div>
                    <div className="text-cyan-400 text-sm">
                      {formatCoordinate(issPosition.latitude, 'lat')}, {formatCoordinate(issPosition.longitude, 'lng')}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Station Data Panel */}
          <div className="space-y-4 sm:space-y-6 mt-6 lg:mt-0">
            {/* Current Time */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-strong rounded-xl p-4"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-5 h-5 text-cyan-400" />
                <h3 className="font-orbitron text-lg font-bold text-white">Station Time</h3>
              </div>
              <ClientOnly fallback={
                <div className="text-2xl font-mono text-cyan-400">--:--:-- UTC</div>
              }>
                <div className="text-2xl font-mono text-cyan-400">
                  {currentTime ? currentTime.toLocaleTimeString('en-US', {
                    hour12: false,
                    timeZone: 'UTC'
                  }) : '--:--:--'} UTC
                </div>
                <div className="text-gray-400 text-sm mt-1">
                  {currentTime ? currentTime.toLocaleDateString() : 'Loading...'}
                </div>
              </ClientOnly>
            </motion.div>

            {/* Orbital Data */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-strong rounded-xl p-4"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Satellite className="w-5 h-5 text-purple-400" />
                <h3 className="font-orbitron text-lg font-bold text-white">Orbital Data</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Altitude</span>
                  <span className="text-purple-400 font-semibold">{orbitData.altitude} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Velocity</span>
                  <span className="text-purple-400 font-semibold">{orbitData.velocity.toLocaleString()} km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Orbital Period</span>
                  <span className="text-purple-400 font-semibold">{orbitData.period} min</span>
                </div>
              </div>
            </motion.div>

            {/* Connection Status */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-strong rounded-xl p-4"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Wifi className="w-5 h-5 text-green-400" />
                <h3 className="font-orbitron text-lg font-bold text-white">Connection</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Ground Link</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Satellite Relay</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-sm">Strong</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Data Rate</span>
                  <span className="text-cyan-400 font-semibold">1.2 Gbps</span>
                </div>
              </div>
            </motion.div>

            {/* Next Pass Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-strong rounded-xl p-4"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Globe className="w-5 h-5 text-yellow-400" />
                <h3 className="font-orbitron text-lg font-bold text-white">Next Sunrise</h3>
              </div>
              <div className="text-yellow-400 font-semibold">
                In 23 minutes
              </div>
              <div className="text-gray-400 text-sm mt-1">
                Duration: 45 minutes
              </div>
            </motion.div>
          </div>
        </div>

        {/* Earth Facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid md:grid-cols-4 gap-6"
        >
          {[
            { label: "Orbits per Day", value: "15.5", unit: "" },
            { label: "Sunrises per Day", value: "16", unit: "" },
            { label: "Earth Coverage", value: "90", unit: "%" },
            { label: "View Distance", value: "2,000", unit: "km" },
          ].map((stat, index) => (
            <div key={index} className="glass rounded-xl p-4 text-center">
              <div className="font-orbitron text-2xl font-bold text-cyan-400 mb-1">
                {stat.value}
                <span className="text-sm text-purple-400 ml-1">{stat.unit}</span>
              </div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
