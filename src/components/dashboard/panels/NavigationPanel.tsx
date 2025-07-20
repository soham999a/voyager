'use client';

import { motion } from 'framer-motion';
import { useDashboardStore } from '@/store/dashboardStore';

const NavigationPanel = () => {
  const shipMetrics = useDashboardStore((state) => state.shipMetrics);

  return (
    <div className="glass-strong rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-orbitron text-xl font-bold text-white">
          Navigation
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
          <span className="font-mono text-xs text-gray-400">AUTOPILOT</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Current Destination */}
        <div className="glass rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-sm text-gray-400">DESTINATION</span>
            <span className="font-mono text-sm text-neon-blue">LOCKED</span>
          </div>
          <div className="font-orbitron text-lg font-bold text-white">
            {shipMetrics.destination}
          </div>
          <div className="font-mono text-sm text-gray-400">
            ETA: {shipMetrics.eta}
          </div>
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-3 gap-3">
          <div className="glass rounded-lg p-3 text-center">
            <div className="font-mono text-xs text-gray-400 mb-1">X</div>
            <div className="font-orbitron text-sm font-bold text-neon-blue">
              {shipMetrics.coordinates.x.toFixed(1)}
            </div>
          </div>
          <div className="glass rounded-lg p-3 text-center">
            <div className="font-mono text-xs text-gray-400 mb-1">Y</div>
            <div className="font-orbitron text-sm font-bold text-neon-purple">
              {shipMetrics.coordinates.y.toFixed(1)}
            </div>
          </div>
          <div className="glass rounded-lg p-3 text-center">
            <div className="font-mono text-xs text-gray-400 mb-1">Z</div>
            <div className="font-orbitron text-sm font-bold text-neon-green">
              {shipMetrics.coordinates.z.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Speed and Direction */}
        <div className="glass rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-mono text-sm text-gray-400">VELOCITY</div>
              <div className="font-orbitron text-lg font-bold text-white">
                {shipMetrics.speed.toLocaleString()} KM/H
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-sm text-gray-400">HEADING</div>
              <div className="font-orbitron text-lg font-bold text-neon-green">
                047.3°
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-gray-400">AUTOPILOT</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span className="font-mono text-xs text-neon-green">ACTIVE</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-gray-400">COLLISION AVOIDANCE</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span className="font-mono text-xs text-neon-green">ENABLED</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-gray-400">WARP DRIVE</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-warning-orange rounded-full animate-pulse" />
              <span className="font-mono text-xs text-warning-orange">STANDBY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationPanel;
