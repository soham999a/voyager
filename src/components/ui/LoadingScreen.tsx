'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [loadingText, setLoadingText] = useState('Initializing Systems');
  const [progress, setProgress] = useState(0);

  const loadingSteps = [
    'Initializing Systems',
    'Connecting to Ship Network',
    'Loading Navigation Data',
    'Synchronizing Crew Status',
    'Establishing Communication Links',
    'Calibrating Sensors',
    'Loading Mission Parameters',
    'System Ready'
  ];

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length - 1) {
        currentStep++;
        setLoadingText(loadingSteps[currentStep]);
        setProgress((currentStep / (loadingSteps.length - 1)) * 100);
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-black via-dark-panel to-space-black flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue/5 to-transparent animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-blue rounded-full animate-ping" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-neon-purple rounded-full animate-ping delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-neon-green rounded-full animate-ping delay-500" />
      </div>

      <div className="text-center z-10">
        {/* Ship Logo/Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto relative">
            <div className="absolute inset-0 border-4 border-neon-blue/30 rounded-full animate-spin" />
            <div className="absolute inset-2 border-2 border-neon-purple/50 rounded-full animate-spin animate-reverse" />
            <div className="absolute inset-4 border border-neon-green/70 rounded-full animate-pulse" />
            <div className="absolute inset-6 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full" />
          </div>
        </motion.div>

        {/* Ship Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-orbitron text-4xl md:text-6xl font-bold mb-2 text-glow"
        >
          <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent">
            VOYAGER PALEN
          </span>
        </motion.h1>

        {/* Ship Designation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="font-mono text-lg text-gray-400 mb-8 tracking-wider"
        >
          VP-2077 • COMMAND INTERFACE
        </motion.p>

        {/* Loading Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="w-80 mx-auto"
        >
          {/* Progress Bar */}
          <div className="relative mb-4">
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="absolute -top-1 -bottom-1 left-0 right-0 border border-neon-blue/30 rounded-full" />
          </div>

          {/* Loading Text */}
          <motion.p
            key={loadingText}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="font-mono text-neon-blue text-sm tracking-wide"
          >
            {loadingText}
            <span className="terminal-cursor ml-1">_</span>
          </motion.p>

          {/* Progress Percentage */}
          <p className="font-mono text-xs text-gray-500 mt-2">
            {Math.round(progress)}% Complete
          </p>
        </motion.div>

        {/* System Status Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex justify-center space-x-6 mt-8"
        >
          {[
            { label: 'NAV', status: progress > 20 },
            { label: 'COM', status: progress > 40 },
            { label: 'ENG', status: progress > 60 },
            { label: 'SYS', status: progress > 80 }
          ].map((system, index) => (
            <div key={system.label} className="text-center">
              <div className={`w-3 h-3 rounded-full mb-1 mx-auto transition-all duration-300 ${
                system.status 
                  ? 'bg-neon-green shadow-lg shadow-neon-green/50' 
                  : 'bg-gray-600'
              }`} />
              <p className="font-mono text-xs text-gray-400">{system.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Warning Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="font-mono text-xs text-gray-600 mt-8 max-w-md mx-auto"
        >
          AUTHORIZED PERSONNEL ONLY • CLASSIFIED MISSION PARAMETERS
        </motion.p>
      </div>

      {/* Scanning Line Effect */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent"
        animate={{
          top: ['0%', '100%', '0%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default LoadingScreen;
