'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MobileCardProps {
  children: ReactNode;
  title?: string;
  icon?: string;
  className?: string;
  gradient?: 'blue' | 'purple' | 'green' | 'orange' | 'red';
}

const MobileCard = ({ 
  children, 
  title, 
  icon, 
  className = '',
  gradient = 'blue'
}: MobileCardProps) => {
  const gradients = {
    blue: 'border-neon-blue/30 bg-gradient-to-br from-neon-blue/10 to-transparent',
    purple: 'border-neon-purple/30 bg-gradient-to-br from-neon-purple/10 to-transparent',
    green: 'border-neon-green/30 bg-gradient-to-br from-neon-green/10 to-transparent',
    orange: 'border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent',
    red: 'border-red-500/30 bg-gradient-to-br from-red-500/10 to-transparent'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`
        bg-black/40 backdrop-blur-xl rounded-2xl border
        ${gradients[gradient]}
        p-4 sm:p-6 transition-all duration-300
        hover:bg-black/60 hover:border-opacity-50
        ${className}
      `}
    >
      {title && (
        <div className="flex items-center mb-4">
          {icon && <span className="mr-3 text-xl">{icon}</span>}
          <h3 className="font-orbitron text-lg sm:text-xl font-bold text-white">
            {title}
          </h3>
        </div>
      )}
      
      <div className="text-sm sm:text-base">
        {children}
      </div>
    </motion.div>
  );
};

export default MobileCard;
