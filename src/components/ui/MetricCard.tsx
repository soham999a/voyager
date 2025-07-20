'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  status?: 'normal' | 'warning' | 'critical' | 'excellent';
  className?: string;
  animated?: boolean;
}

const MetricCard = ({
  title,
  value,
  unit,
  icon,
  trend,
  trendValue,
  status = 'normal',
  className = '',
  animated = true
}: MetricCardProps) => {
  const statusColors = {
    normal: 'text-white',
    warning: 'text-warning-orange',
    critical: 'text-critical-red',
    excellent: 'text-neon-green'
  };

  const statusBorders = {
    normal: 'border-white/20',
    warning: 'border-warning-orange/30',
    critical: 'border-critical-red/30',
    excellent: 'border-neon-green/30'
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    stable: '→'
  };

  const trendColors = {
    up: 'text-neon-green',
    down: 'text-critical-red',
    stable: 'text-gray-400'
  };

  return (
    <motion.div
      initial={animated ? { opacity: 0, scale: 0.9 } : {}}
      animate={animated ? { opacity: 1, scale: 1 } : {}}
      whileHover={{ scale: 1.02 }}
      className={`
        relative overflow-hidden rounded-xl
        bg-gradient-to-br from-white/10 via-white/5 to-transparent
        backdrop-blur-xl
        border ${statusBorders[status]}
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        p-6
        transition-all duration-300 ease-out
        hover:bg-white/8 hover:border-white/30
        ${className}
      `}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {icon && (
              <div className="text-xl opacity-80">
                {icon}
              </div>
            )}
            <h3 className="font-mono text-sm text-gray-300 uppercase tracking-wider">
              {title}
            </h3>
          </div>
          
          {trend && trendValue && (
            <div className={`flex items-center space-x-1 ${trendColors[trend]}`}>
              <span className="text-sm">{trendIcons[trend]}</span>
              <span className="font-mono text-xs">{trendValue}</span>
            </div>
          )}
        </div>

        {/* Value */}
        <div className="flex items-baseline space-x-2">
          <motion.span
            initial={animated ? { opacity: 0, y: 20 } : {}}
            animate={animated ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className={`font-orbitron text-3xl font-bold ${statusColors[status]}`}
          >
            {value}
          </motion.span>
          {unit && (
            <span className="font-mono text-sm text-gray-400 uppercase">
              {unit}
            </span>
          )}
        </div>

        {/* Status Indicator */}
        <div className="mt-4 flex items-center space-x-2">
          <div className={`
            w-2 h-2 rounded-full
            ${status === 'excellent' ? 'bg-neon-green' :
              status === 'warning' ? 'bg-warning-orange' :
              status === 'critical' ? 'bg-critical-red' :
              'bg-neon-blue'
            }
            shadow-lg animate-pulse
          `} />
          <span className="font-mono text-xs text-gray-400 uppercase">
            {status}
          </span>
        </div>
      </div>

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(45deg, transparent, ${
            status === 'excellent' ? 'rgba(0,255,136,0.1)' :
            status === 'warning' ? 'rgba(251,191,36,0.1)' :
            status === 'critical' ? 'rgba(239,68,68,0.1)' :
            'rgba(0,212,255,0.1)'
          }, transparent)`
        }}
      />
    </motion.div>
  );
};

export default MetricCard;
