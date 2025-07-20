'use client';

import { motion } from 'framer-motion';

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'warning' | 'critical' | 'active' | 'inactive';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  showLabel?: boolean;
}

const StatusIndicator = ({ 
  status, 
  label, 
  size = 'md', 
  pulse = true,
  showLabel = true 
}: StatusIndicatorProps) => {
  const statusConfig = {
    online: { color: 'bg-neon-green', shadow: 'shadow-neon-green/50', text: 'ONLINE' },
    active: { color: 'bg-neon-green', shadow: 'shadow-neon-green/50', text: 'ACTIVE' },
    offline: { color: 'bg-gray-500', shadow: 'shadow-gray-500/50', text: 'OFFLINE' },
    inactive: { color: 'bg-gray-500', shadow: 'shadow-gray-500/50', text: 'INACTIVE' },
    warning: { color: 'bg-warning-orange', shadow: 'shadow-warning-orange/50', text: 'WARNING' },
    critical: { color: 'bg-critical-red', shadow: 'shadow-critical-red/50', text: 'CRITICAL' }
  };

  const sizeConfig = {
    sm: { dot: 'w-2 h-2', text: 'text-xs', container: 'gap-1' },
    md: { dot: 'w-3 h-3', text: 'text-sm', container: 'gap-2' },
    lg: { dot: 'w-4 h-4', text: 'text-base', container: 'gap-3' }
  };

  const config = statusConfig[status];
  const sizeStyles = sizeConfig[size];

  return (
    <div className={`flex items-center ${sizeStyles.container}`}>
      <div className="relative">
        <motion.div
          className={`
            ${sizeStyles.dot} rounded-full ${config.color}
            shadow-lg ${config.shadow}
          `}
          animate={pulse ? {
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1]
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {pulse && (
          <motion.div
            className={`
              absolute inset-0 rounded-full ${config.color} opacity-30
            `}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>
      
      {showLabel && (
        <span className={`
          font-mono font-medium ${sizeStyles.text}
          ${status === 'online' || status === 'active' ? 'text-neon-green' :
            status === 'warning' ? 'text-warning-orange' :
            status === 'critical' ? 'text-critical-red' :
            'text-gray-400'
          }
        `}>
          {label || config.text}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;
