'use client';

import { motion } from 'framer-motion';
import { useDashboardStore } from '@/store/dashboardStore';
import CircularGauge from '../../ui/CircularGauge';
import LinearGauge from '../../ui/LinearGauge';

const ShipMetricsPanel = () => {
  const shipMetrics = useDashboardStore((state) => state.shipMetrics);

  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return 'neon-green';
    if (value >= thresholds.warning) return 'warning-orange';
    return 'critical-red';
  };

  return (
    <div className="glass-strong rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-orbitron text-xl font-bold text-white">
          Ship Metrics
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
          <span className="font-mono text-xs text-gray-400">LIVE DATA</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Speed */}
        <div className="text-center">
          <CircularGauge
            value={shipMetrics.speed}
            max={50000}
            label="SPEED"
            unit="KM/H"
            color="neon-blue"
            size="lg"
          />
        </div>

        {/* Fuel */}
        <div className="text-center">
          <CircularGauge
            value={shipMetrics.fuel}
            max={100}
            label="FUEL"
            unit="%"
            color={getStatusColor(shipMetrics.fuel, { good: 50, warning: 20 })}
            size="lg"
          />
        </div>

        {/* Hull Integrity */}
        <div className="text-center">
          <CircularGauge
            value={shipMetrics.hullIntegrity}
            max={100}
            label="HULL"
            unit="%"
            color={getStatusColor(shipMetrics.hullIntegrity, { good: 80, warning: 50 })}
            size="lg"
          />
        </div>

        {/* Engine Temperature */}
        <div className="text-center">
          <CircularGauge
            value={shipMetrics.engineTemperature}
            max={5000}
            label="ENGINE"
            unit="°C"
            color="neon-purple"
            size="lg"
          />
        </div>
      </div>

      {/* Linear Gauges */}
      <div className="mt-8 space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-sm text-gray-300">POWER OUTPUT</span>
            <span className="font-mono text-sm text-neon-blue">87%</span>
          </div>
          <LinearGauge value={87} max={100} color="neon-blue" />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-sm text-gray-300">LIFE SUPPORT</span>
            <span className="font-mono text-sm text-neon-green">98%</span>
          </div>
          <LinearGauge value={98} max={100} color="neon-green" />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-sm text-gray-300">SHIELD STRENGTH</span>
            <span className="font-mono text-sm text-neon-purple">76%</span>
          </div>
          <LinearGauge value={76} max={100} color="neon-purple" />
        </div>
      </div>

      {/* Status Indicators */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="glass rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-gray-400">WARP DRIVE</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span className="font-mono text-xs text-neon-green">READY</span>
            </div>
          </div>
        </div>

        <div className="glass rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-gray-400">WEAPONS</span>
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

export default ShipMetricsPanel;
