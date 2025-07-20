'use client';

import { motion } from 'framer-motion';
import { useDashboardStore } from '@/store/dashboardStore';
import ShipMetricsPanel from '../panels/ShipMetricsPanel';
import NavigationPanel from '../panels/NavigationPanel';
import CrewStatusPanel from '../panels/CrewStatusPanel';
import SystemStatusPanel from '../panels/SystemStatusPanel';
import NASADataPanel from '../panels/NASADataPanel';

const CommandCenter = () => {
  const user = useDashboardStore((state) => state.user);
  const shipMetrics = useDashboardStore((state) => state.shipMetrics);

  return (
    <div className="space-y-6">
      {/* Mobile-Responsive Professional Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative text-center mb-8 sm:mb-10 md:mb-12"
      >
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 via-neon-purple/10 to-neon-green/10 blur-2xl sm:blur-3xl rounded-full" />

        <div className="relative z-10 px-4">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4"
          >
            <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent drop-shadow-2xl">
              COMMAND CENTER
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-2 sm:space-y-3"
          >
            <p className="font-inter text-base sm:text-lg md:text-xl text-gray-300 px-2">
              Welcome back, <span className="text-neon-blue font-semibold">{user?.role}</span> <span className="text-white font-semibold">{user?.name}</span>
            </p>
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 flex-wrap">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse shadow-lg shadow-neon-green/50" />
              <span className="font-mono text-xs sm:text-sm text-neon-green uppercase tracking-wider">All Systems Operational</span>
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse shadow-lg shadow-neon-green/50" />
            </div>
          </motion.div>

          {/* Animated Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-32 sm:w-48 md:w-64 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent mx-auto mt-4 sm:mt-6"
          />
        </div>
      </motion.div>

      {/* Mobile-First Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
        {/* Ship Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="order-1"
        >
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-neon-blue/30 p-4 lg:p-6">
            <h3 className="font-orbitron text-lg lg:text-xl font-bold text-white mb-4 flex items-center">
              <span className="mr-2">🚀</span>
              Ship Metrics
            </h3>
            <ShipMetricsPanel />
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="order-2"
        >
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-neon-purple/30 p-4 lg:p-6">
            <h3 className="font-orbitron text-lg lg:text-xl font-bold text-white mb-4 flex items-center">
              <span className="mr-2">⚡</span>
              System Status
            </h3>
            <SystemStatusPanel />
          </div>
        </motion.div>
      </div>

      {/* Mobile-First Secondary Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-neon-green/30 p-4 lg:p-6 h-full">
            <h3 className="font-orbitron text-lg font-bold text-white mb-4 flex items-center">
              <span className="mr-2">🧭</span>
              Navigation
            </h3>
            <NavigationPanel />
          </div>
        </motion.div>

        {/* Crew Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-yellow-500/30 p-4 lg:p-6 h-full">
            <h3 className="font-orbitron text-lg font-bold text-white mb-4 flex items-center">
              <span className="mr-2">👥</span>
              Crew Status
            </h3>
            <CrewStatusPanel />
          </div>
        </motion.div>

        {/* NASA Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-red-500/30 p-4 lg:p-6 h-full">
            <h3 className="font-orbitron text-lg font-bold text-white mb-4 flex items-center">
              <span className="mr-2">🛰️</span>
              NASA Data
            </h3>
            <NASADataPanel />
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-strong rounded-xl p-6"
      >
        <h3 className="font-orbitron text-xl font-bold text-white mb-4">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="glass rounded-lg p-4 hover:bg-neon-blue/10 transition-colors group">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🚨</div>
            <div className="font-mono text-sm text-gray-300 group-hover:text-white">
              Emergency
            </div>
          </button>
          
          <button className="glass rounded-lg p-4 hover:bg-neon-purple/10 transition-colors group">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🔧</div>
            <div className="font-mono text-sm text-gray-300 group-hover:text-white">
              Diagnostics
            </div>
          </button>
          
          <button className="glass rounded-lg p-4 hover:bg-neon-green/10 transition-colors group">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📡</div>
            <div className="font-mono text-sm text-gray-300 group-hover:text-white">
              Communications
            </div>
          </button>
          
          <button className="glass rounded-lg p-4 hover:bg-warning-orange/10 transition-colors group">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🛰️</div>
            <div className="font-mono text-sm text-gray-300 group-hover:text-white">
              Navigation
            </div>
          </button>
        </div>
      </motion.div>

      {/* Mission Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-strong rounded-xl p-6"
      >
        <h3 className="font-orbitron text-xl font-bold text-white mb-4">
          Current Mission Status
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 glass rounded-lg">
            <div>
              <div className="font-mono text-sm font-semibold text-white">
                Deep Space Exploration - Kepler System
              </div>
              <div className="font-mono text-xs text-gray-400">
                Mission ID: KPL-2077-ALPHA
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-sm text-neon-green">
                IN PROGRESS
              </div>
              <div className="font-mono text-xs text-gray-400">
                Day 127 of 365
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 glass rounded-lg">
              <div className="font-orbitron text-lg font-bold text-neon-blue">
                {shipMetrics.coordinates.x.toFixed(1)}
              </div>
              <div className="font-mono text-xs text-gray-400">X COORDINATE</div>
            </div>
            
            <div className="text-center p-3 glass rounded-lg">
              <div className="font-orbitron text-lg font-bold text-neon-purple">
                {shipMetrics.coordinates.y.toFixed(1)}
              </div>
              <div className="font-mono text-xs text-gray-400">Y COORDINATE</div>
            </div>
            
            <div className="text-center p-3 glass rounded-lg">
              <div className="font-orbitron text-lg font-bold text-neon-green">
                {shipMetrics.coordinates.z.toFixed(1)}
              </div>
              <div className="font-mono text-xs text-gray-400">Z COORDINATE</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CommandCenter;
