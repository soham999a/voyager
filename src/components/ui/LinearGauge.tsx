'use client';

import { motion } from 'framer-motion';

interface LinearGaugeProps {
  value: number;
  max: number;
  color: string;
  height?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  animated?: boolean;
}

const LinearGauge = ({ 
  value, 
  max, 
  color, 
  height = 'md',
  showPercentage = false,
  animated = true 
}: LinearGaugeProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  const heightClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const getColorClass = (colorName: string) => {
    const colorMap: { [key: string]: string } = {
      'neon-blue': '#00d4ff',
      'neon-green': '#00ff88',
      'neon-purple': '#8b5cf6',
      'warning-orange': '#fbbf24',
      'critical-red': '#ef4444'
    };
    return colorMap[colorName] || '#00d4ff';
  };

  const colorValue = getColorClass(color);

  return (
    <div className="w-full">
      <div className={`relative ${heightClasses[height]} bg-gray-800 rounded-full overflow-hidden`}>
        {/* Background glow */}
        <div 
          className="absolute inset-0 rounded-full opacity-20"
          style={{ backgroundColor: colorValue }}
        />
        
        {/* Progress bar */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 rounded-full"
          style={{ 
            backgroundColor: colorValue,
            boxShadow: `0 0 10px ${colorValue}`
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: animated ? 1.2 : 0, 
            ease: "easeOut" 
          }}
        />
        
        {/* Animated shine effect */}
        {animated && (
          <motion.div
            className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              left: ['-2rem', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          />
        )}
      </div>
      
      {showPercentage && (
        <div className="mt-1 text-right">
          <span className="font-mono text-xs" style={{ color: colorValue }}>
            {percentage.toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default LinearGauge;
