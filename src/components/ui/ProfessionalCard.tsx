'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ProfessionalCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  gradient?: boolean;
  onClick?: () => void;
}

const ProfessionalCard = ({ 
  children, 
  className = '', 
  hover = true, 
  glow,
  gradient = false,
  onClick 
}: ProfessionalCardProps) => {
  const glowClasses = {
    blue: 'hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:border-neon-blue/50',
    green: 'hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] hover:border-neon-green/50',
    purple: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-neon-purple/50',
    orange: 'hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:border-warning-orange/50',
    red: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:border-critical-red/50'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : {}}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl
        ${gradient 
          ? 'bg-gradient-to-br from-white/10 via-white/5 to-transparent' 
          : 'bg-white/5'
        }
        backdrop-blur-xl
        border border-white/10
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        transition-all duration-300 ease-out
        ${hover ? 'hover:bg-white/8 hover:border-white/20' : ''}
        ${glow ? glowClasses[glow] : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Animated border effect */}
      {hover && (
        <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-green/20 blur-sm" />
        </div>
      )}
    </motion.div>
  );
};

export default ProfessionalCard;
