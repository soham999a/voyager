'use client';

import { motion } from 'framer-motion';
import { useDashboardStore } from '@/store/dashboardStore';

const SystemStatusPanel = () => {
  const systemAlerts = useDashboardStore((state) => state.systemAlerts);

  const systems = [
    { name: 'Life Support', status: 'optimal', value: 98 },
    { name: 'Power Grid', status: 'optimal', value: 87 },
    { name: 'Navigation', status: 'optimal', value: 100 },
    { name: 'Communications', status: 'optimal', value: 94 },
    { name: 'Shields', status: 'warning', value: 76 },
    { name: 'Weapons', status: 'standby', value: 0 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'neon-green';
      case 'warning': return 'warning-orange';
      case 'critical': return 'critical-red';
      case 'standby': return 'gray-400';
      default: return 'gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal': return '✓';
      case 'warning': return '⚠';
      case 'critical': return '✗';
      case 'standby': return '○';
      default: return '○';
    }
  };

  return (
    <div className="glass-strong rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-orbitron text-xl font-bold text-white">
          System Status
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
          <span className="font-mono text-xs text-gray-400">ALL SYSTEMS</span>
        </div>
      </div>

      <div className="space-y-3">
        {systems.map((system, index) => (
          <motion.div
            key={system.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-lg p-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full bg-${getStatusColor(system.status)}/20 flex items-center justify-center`}>
                  <span className={`text-${getStatusColor(system.status)} text-sm`}>
                    {getStatusIcon(system.status)}
                  </span>
                </div>
                <div>
                  <div className="font-mono text-sm font-semibold text-white">
                    {system.name}
                  </div>
                  <div className={`font-mono text-xs text-${getStatusColor(system.status)}`}>
                    {system.status.toUpperCase()}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-orbitron text-sm font-bold text-white">
                  {system.value}%
                </div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-${getStatusColor(system.status)} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${system.value}%` }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* System Summary */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="glass rounded-lg p-3 text-center">
          <div className="font-orbitron text-lg font-bold text-neon-green">5</div>
          <div className="font-mono text-xs text-gray-400">OPTIMAL</div>
        </div>
        <div className="glass rounded-lg p-3 text-center">
          <div className="font-orbitron text-lg font-bold text-warning-orange">1</div>
          <div className="font-mono text-xs text-gray-400">WARNINGS</div>
        </div>
      </div>

      {/* Recent Alerts */}
      {systemAlerts.length > 0 && (
        <div className="mt-4">
          <div className="font-mono text-xs text-gray-400 mb-2">RECENT ALERTS</div>
          <div className="space-y-1">
            {systemAlerts.slice(0, 2).map((alert, index) => (
              <div key={alert.id} className="glass rounded p-2">
                <div className={`font-mono text-xs text-${
                  alert.type === 'critical' ? 'critical-red' :
                  alert.type === 'warning' ? 'warning-orange' : 'neon-blue'
                }`}>
                  {alert.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemStatusPanel;
