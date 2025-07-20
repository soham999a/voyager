'use client';

import { motion } from 'framer-motion';
import { useDashboardStore } from '@/store/dashboardStore';

const CrewStatusPanel = () => {
  const crew = useDashboardStore((state) => state.crew);

  // Mock crew data for now
  const mockCrew = [
    { name: 'Sarah Chen', role: 'Navigation Officer', status: 'awake', health: 'healthy' },
    { name: 'Marcus Rodriguez', role: 'Chief Engineer', status: 'awake', health: 'healthy' },
    { name: 'Dr. Elena Vasquez', role: 'Medical Officer', status: 'sleeping', health: 'healthy' },
    { name: 'James Park', role: 'Communications', status: 'awake', health: 'warning' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'awake': return 'neon-green';
      case 'sleeping': return 'neon-blue';
      case 'critical': return 'critical-red';
      default: return 'gray-400';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'neon-green';
      case 'warning': return 'warning-orange';
      case 'critical': return 'critical-red';
      default: return 'gray-400';
    }
  };

  return (
    <div className="glass-strong rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-orbitron text-xl font-bold text-white">
          Crew Status
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
          <span className="font-mono text-xs text-gray-400">4 ACTIVE</span>
        </div>
      </div>

      <div className="space-y-3">
        {mockCrew.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-lg p-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                  <span className="font-orbitron font-bold text-xs">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-mono text-sm font-semibold text-white">
                    {member.name}
                  </div>
                  <div className="font-mono text-xs text-gray-400">
                    {member.role}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className={`font-mono text-xs text-${getStatusColor(member.status)}`}>
                    {member.status.toUpperCase()}
                  </div>
                  <div className={`font-mono text-xs text-${getHealthColor(member.health)}`}>
                    {member.health.toUpperCase()}
                  </div>
                </div>
                <div className={`w-2 h-2 bg-${getStatusColor(member.status)} rounded-full animate-pulse`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Crew Summary */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="glass rounded-lg p-3 text-center">
          <div className="font-orbitron text-lg font-bold text-neon-green">3</div>
          <div className="font-mono text-xs text-gray-400">AWAKE</div>
        </div>
        <div className="glass rounded-lg p-3 text-center">
          <div className="font-orbitron text-lg font-bold text-neon-blue">1</div>
          <div className="font-mono text-xs text-gray-400">SLEEPING</div>
        </div>
        <div className="glass rounded-lg p-3 text-center">
          <div className="font-orbitron text-lg font-bold text-warning-orange">1</div>
          <div className="font-mono text-xs text-gray-400">ALERTS</div>
        </div>
      </div>
    </div>
  );
};

export default CrewStatusPanel;
