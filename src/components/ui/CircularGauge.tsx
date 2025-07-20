'use client';

import { motion } from 'framer-motion';

interface CircularGaugeProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

const CircularGauge = ({ 
  value, 
  max, 
  label, 
  unit, 
  color, 
  size = 'md',
  showValue = true 
}: CircularGaugeProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * 45; // radius of 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
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
    <div className="flex flex-col items-center space-y-2">
      <div className={`relative ${sizeClasses[size]}`}>
        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            fill="transparent"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke={colorValue}
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 8px ${colorValue})`
            }}
          />
        </svg>
        
        {/* Center content */}
        {showValue && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className={`font-orbitron font-bold ${textSizes[size]}`}
              style={{ color: colorValue }}
            >
              {value.toLocaleString()}
            </motion.div>
            <div className="font-mono text-xs text-gray-400">
              {unit}
            </div>
          </div>
        )}
      </div>
      
      <div className="text-center">
        <div className={`font-mono ${textSizes[size]} font-semibold text-gray-300`}>
          {label}
        </div>
      </div>
    </div>
  );
};

export default CircularGauge;
