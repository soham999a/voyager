'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDashboardStore } from '@/store/dashboardStore';
import { SHIP_NAME, SHIP_DESIGNATION } from '@/lib/constants';

const TopBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const user = useDashboardStore((state) => state.user);
  const shipMetrics = useDashboardStore((state) => state.shipMetrics);
  const systemAlerts = useDashboardStore((state) => state.systemAlerts);
  const setUser = useDashboardStore((state) => state.setUser);
  
  const unacknowledgedAlerts = systemAlerts.filter(alert => !alert.acknowledged);
  const criticalAlerts = unacknowledgedAlerts.filter(alert => alert.type === 'critical');

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        relative sticky top-0 z-40
        bg-gradient-to-r from-black/90 via-black/80 to-black/90
        backdrop-blur-2xl border-b border-white/20
        px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5
        shadow-lg shadow-black/20
      "
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 via-transparent to-neon-purple/5" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />

      <div className="relative z-10 flex items-center justify-between">
        {/* Mobile-Responsive Left Section */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center shadow-lg shadow-neon-blue/30">
              <span className="text-sm sm:text-base">🚀</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-orbitron text-base sm:text-lg font-bold text-white">
                {SHIP_NAME}
              </h1>
              <p className="font-mono text-xs text-gray-400">
                {SHIP_DESIGNATION} • DEEP SPACE EXPLORATION
              </p>
            </div>
            {/* Mobile Ship Name */}
            <div className="sm:hidden">
              <h1 className="font-orbitron text-sm font-bold text-white">
                VOYAGER PALEN
              </h1>
            </div>
          </div>

          {/* Quick Status Indicators */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span className="font-mono text-xs text-gray-300">
                SPEED: {shipMetrics.speed.toLocaleString()} KM/H
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                shipMetrics.fuel > 50 ? 'bg-neon-green' : 
                shipMetrics.fuel > 20 ? 'bg-warning-orange' : 'bg-critical-red'
              } animate-pulse`} />
              <span className="font-mono text-xs text-gray-300">
                FUEL: {shipMetrics.fuel}%
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                shipMetrics.hullIntegrity > 80 ? 'bg-neon-green' : 
                shipMetrics.hullIntegrity > 50 ? 'bg-warning-orange' : 'bg-critical-red'
              } animate-pulse`} />
              <span className="font-mono text-xs text-gray-300">
                HULL: {shipMetrics.hullIntegrity}%
              </span>
            </div>
          </div>
        </div>

        {/* Center Section - Time and Date */}
        <div className="hidden lg:block text-center">
          <div className="font-orbitron text-2xl font-bold text-neon-blue">
            {formatTime(currentTime)}
          </div>
          <div className="font-mono text-xs text-gray-400">
            SHIP TIME • {formatDate(currentTime)}
          </div>
        </div>

        {/* Right Section - User and Alerts */}
        <div className="flex items-center space-x-4">
          {/* System Alerts */}
          {unacknowledgedAlerts.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative"
            >
              <button className={`p-2 rounded-lg transition-colors ${
                criticalAlerts.length > 0
                  ? 'bg-critical-red/20 text-critical-red hover:bg-critical-red/30'
                  : 'bg-warning-orange/20 text-warning-orange hover:bg-warning-orange/30'
              }`}>
                <span className="text-lg">🚨</span>
              </button>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-critical-red rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {unacknowledgedAlerts.length > 9 ? '9+' : unacknowledgedAlerts.length}
                </span>
              </div>
            </motion.div>
          )}

          {/* Destination Info */}
          <div className="hidden md:block text-right">
            <div className="font-mono text-sm text-white">
              → {shipMetrics.destination}
            </div>
            <div className="font-mono text-xs text-gray-400">
              ETA: {shipMetrics.eta}
            </div>
          </div>

          {/* User Menu */}
          <div className="relative group">
            <button className="flex items-center space-x-3 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                <span className="font-orbitron font-bold text-sm">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <div className="font-mono text-sm text-white">
                  {user?.name}
                </div>
                <div className="font-mono text-xs text-gray-400">
                  {user?.role}
                </div>
              </div>
              <span className="text-gray-400">▼</span>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-black/90 backdrop-blur-xl border border-neon-blue/30 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <div className="px-3 py-2 border-b border-gray-700/50">
                  <div className="font-mono text-sm text-white">
                    {user?.name}
                  </div>
                  <div className="font-mono text-xs text-gray-400">
                    {user?.email}
                  </div>
                  <div className="font-mono text-xs text-neon-blue mt-1">
                    {user?.role} • Level {
                      user?.role === 'Commander' ? '10' :
                      user?.role === 'Engineer' ? '7' : '3'
                    }
                  </div>
                </div>
                
                <button className="w-full px-3 py-2 text-left font-mono text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded transition-colors">
                  Profile Settings
                </button>
                
                <button className="w-full px-3 py-2 text-left font-mono text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded transition-colors">
                  Preferences
                </button>
                
                <div className="border-t border-gray-700/50 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-left font-mono text-sm text-critical-red hover:text-white hover:bg-critical-red/20 rounded transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Time Display */}
      <div className="lg:hidden mt-3 pt-3 border-t border-gray-700/50 text-center">
        <div className="font-orbitron text-lg font-bold text-neon-blue">
          {formatTime(currentTime)}
        </div>
        <div className="font-mono text-xs text-gray-400">
          SHIP TIME • {formatDate(currentTime)}
        </div>
      </div>

      {/* Mobile Status Indicators */}
      <div className="md:hidden mt-3 pt-3 border-t border-gray-700/50">
        <div className="flex justify-between text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-neon-green rounded-full" />
            <span className="font-mono text-gray-300">
              {shipMetrics.speed.toLocaleString()} KM/H
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              shipMetrics.fuel > 50 ? 'bg-neon-green' : 
              shipMetrics.fuel > 20 ? 'bg-warning-orange' : 'bg-critical-red'
            }`} />
            <span className="font-mono text-gray-300">
              FUEL {shipMetrics.fuel}%
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              shipMetrics.hullIntegrity > 80 ? 'bg-neon-green' : 
              shipMetrics.hullIntegrity > 50 ? 'bg-warning-orange' : 'bg-critical-red'
            }`} />
            <span className="font-mono text-gray-300">
              HULL {shipMetrics.hullIntegrity}%
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default TopBar;
