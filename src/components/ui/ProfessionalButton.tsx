'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ProfessionalButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  glow?: boolean;
}

const ProfessionalButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  glow = false
}: ProfessionalButtonProps) => {
  const variants = {
    primary: {
      bg: 'bg-gradient-to-r from-neon-blue to-neon-purple',
      hover: 'hover:from-neon-blue/80 hover:to-neon-purple/80',
      text: 'text-white',
      border: 'border-neon-blue/50',
      shadow: glow ? 'shadow-lg shadow-neon-blue/30' : '',
      hoverShadow: glow ? 'hover:shadow-xl hover:shadow-neon-blue/50' : ''
    },
    secondary: {
      bg: 'bg-white/10',
      hover: 'hover:bg-white/20',
      text: 'text-white',
      border: 'border-white/20',
      shadow: '',
      hoverShadow: ''
    },
    success: {
      bg: 'bg-gradient-to-r from-neon-green to-emerald-500',
      hover: 'hover:from-neon-green/80 hover:to-emerald-500/80',
      text: 'text-white',
      border: 'border-neon-green/50',
      shadow: glow ? 'shadow-lg shadow-neon-green/30' : '',
      hoverShadow: glow ? 'hover:shadow-xl hover:shadow-neon-green/50' : ''
    },
    warning: {
      bg: 'bg-gradient-to-r from-warning-orange to-yellow-500',
      hover: 'hover:from-warning-orange/80 hover:to-yellow-500/80',
      text: 'text-white',
      border: 'border-warning-orange/50',
      shadow: glow ? 'shadow-lg shadow-warning-orange/30' : '',
      hoverShadow: glow ? 'hover:shadow-xl hover:shadow-warning-orange/50' : ''
    },
    danger: {
      bg: 'bg-gradient-to-r from-critical-red to-red-600',
      hover: 'hover:from-critical-red/80 hover:to-red-600/80',
      text: 'text-white',
      border: 'border-critical-red/50',
      shadow: glow ? 'shadow-lg shadow-critical-red/30' : '',
      hoverShadow: glow ? 'hover:shadow-xl hover:shadow-critical-red/50' : ''
    },
    ghost: {
      bg: 'bg-transparent',
      hover: 'hover:bg-white/10',
      text: 'text-gray-300 hover:text-white',
      border: 'border-transparent',
      shadow: '',
      hoverShadow: ''
    }
  };

  const sizes = {
    sm: {
      padding: 'px-4 py-2',
      text: 'text-sm',
      icon: 'text-sm'
    },
    md: {
      padding: 'px-6 py-3',
      text: 'text-base',
      icon: 'text-base'
    },
    lg: {
      padding: 'px-8 py-4',
      text: 'text-lg',
      icon: 'text-lg'
    },
    xl: {
      padding: 'px-10 py-5',
      text: 'text-xl',
      icon: 'text-xl'
    }
  };

  const variantStyles = variants[variant];
  const sizeStyles = sizes[size];

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden rounded-xl
        ${variantStyles.bg} ${variantStyles.hover}
        ${variantStyles.text} ${variantStyles.border}
        ${variantStyles.shadow} ${variantStyles.hoverShadow}
        ${sizeStyles.padding} ${sizeStyles.text}
        font-orbitron font-semibold
        border backdrop-blur-sm
        transition-all duration-300 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-neon-blue/50
        ${className}
      `}
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center space-x-2">
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className={`w-4 h-4 border-2 border-current border-t-transparent rounded-full ${sizeStyles.icon}`}
          />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className={sizeStyles.icon}>{icon}</span>
            )}
            <span>{children}</span>
            {icon && iconPosition === 'right' && (
              <span className={sizeStyles.icon}>{icon}</span>
            )}
          </>
        )}
      </div>

      {/* Glow Effect */}
      {glow && !disabled && (
        <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className={`absolute inset-0 rounded-xl blur-md ${variantStyles.bg} opacity-30`} />
        </div>
      )}
    </motion.button>
  );
};

export default ProfessionalButton;
