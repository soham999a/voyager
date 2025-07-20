'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardStore } from '@/store/dashboardStore';
import { USER_ROLES } from '@/lib/constants';
import type { User } from '@/types';

const LoginScreen = () => {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [userName, setUserName] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const setUser = useDashboardStore((state) => state.setUser);

  const roles = [
    {
      id: USER_ROLES.COMMANDER,
      title: 'Commander',
      description: 'Full system access and command authority',
      icon: '⭐',
      color: 'from-yellow-400 to-orange-500',
      access: 'Level 10 - Unrestricted'
    },
    {
      id: USER_ROLES.ENGINEER,
      title: 'Engineer',
      description: 'Technical systems and crew management',
      icon: '⚙️',
      color: 'from-blue-400 to-cyan-500',
      access: 'Level 7 - Technical'
    },
    {
      id: USER_ROLES.OBSERVER,
      title: 'Observer',
      description: 'Read-only access to ship systems',
      icon: '👁️',
      color: 'from-purple-400 to-pink-500',
      access: 'Level 3 - Limited'
    }
  ];

  const handleBiometricScan = async () => {
    if (!selectedRole || !userName.trim()) return;

    setIsScanning(true);
    
    // Simulate biometric scanning
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setScanComplete(true);
    
    // Create user and login
    setTimeout(() => {
      const user: User = {
        id: crypto.randomUUID(),
        name: userName.trim(),
        email: `${userName.toLowerCase().replace(' ', '.')}@voyager-palen.space`,
        role: selectedRole as any,
        isOnline: true,
        lastSeen: new Date()
      };
      
      setUser(user);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-black via-dark-panel to-space-black flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-4xl mx-auto p-6 z-10">
        <AnimatePresence mode="wait">
          {!isScanning && !scanComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              {/* Header */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6 sm:mb-8 px-4"
              >
                <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 text-glow leading-tight">
                  <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent">
                    VOYAGER PALEN
                  </span>
                </h1>
                <p className="font-mono text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 tracking-wider">
                  COMMAND INTERFACE ACCESS
                </p>
                <div className="w-16 sm:w-20 md:w-24 h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent mx-auto mt-3 sm:mt-4" />
              </motion.div>

              {/* User Name Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <label className="block font-mono text-sm text-gray-400 mb-2 text-left max-w-md mx-auto">
                  OFFICER NAME
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full max-w-md mx-auto block bg-black/50 border border-neon-blue/30 rounded-lg px-4 py-3 font-mono text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20 transition-all"
                />
              </motion.div>

              {/* Role Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-8"
              >
                <h2 className="font-orbitron text-2xl font-bold text-white mb-6">
                  SELECT YOUR ROLE
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-2">
                  {roles.map((role, index) => (
                    <motion.div
                      key={role.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className={`relative cursor-pointer transition-all duration-300 ${
                        selectedRole === role.id
                          ? 'scale-105'
                          : 'hover:scale-102'
                      }`}
                      onClick={() => setSelectedRole(role.id)}
                    >
                      <div className={`glass-strong rounded-xl p-6 border-2 transition-all duration-300 ${
                        selectedRole === role.id
                          ? 'border-neon-blue neon-glow-blue'
                          : 'border-gray-600 hover:border-gray-400'
                      }`}>
                        <div className="text-4xl mb-4">{role.icon}</div>
                        <h3 className="font-orbitron text-xl font-bold text-white mb-2">
                          {role.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">
                          {role.description}
                        </p>
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono bg-gradient-to-r ${role.color} text-black font-semibold`}>
                          {role.access}
                        </div>
                      </div>
                      
                      {selectedRole === role.id && (
                        <motion.div
                          layoutId="selection"
                          className="absolute inset-0 border-2 border-neon-blue rounded-xl pointer-events-none"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Biometric Scan Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <motion.button
                  onClick={handleBiometricScan}
                  disabled={!selectedRole || !userName.trim()}
                  whileHover={selectedRole && userName.trim() ? { scale: 1.05 } : {}}
                  whileTap={selectedRole && userName.trim() ? { scale: 0.95 } : {}}
                  className={`
                    relative overflow-hidden font-orbitron text-lg font-bold px-10 py-5 rounded-xl
                    transition-all duration-500 ease-out
                    ${selectedRole && userName.trim()
                      ? 'bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green text-white shadow-2xl shadow-neon-blue/30 hover:shadow-neon-blue/60'
                      : 'bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-600'
                    }
                  `}
                >
                  {/* Animated Background */}
                  {selectedRole && userName.trim() && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  )}

                  <span className="relative z-10 flex items-center space-x-3">
                    <span className="text-2xl">🔍</span>
                    <span>INITIATE BIOMETRIC SCAN</span>
                  </span>
                </motion.button>
                
                <p className="font-mono text-xs text-gray-500 mt-4">
                  Biometric authentication required for system access
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Scanning Animation */}
          {isScanning && !scanComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="relative w-64 h-64 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-neon-blue/30 rounded-full animate-spin" />
                <div className="absolute inset-4 border-2 border-neon-green/50 rounded-full animate-spin animate-reverse" />
                <div className="absolute inset-8 border border-neon-purple/70 rounded-full animate-pulse" />
                
                <motion.div
                  className="absolute inset-0 border-4 border-neon-blue rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">👁️</div>
                </div>
              </div>
              
              <h2 className="font-orbitron text-3xl font-bold text-neon-blue mb-4">
                SCANNING IN PROGRESS
              </h2>
              <p className="font-mono text-gray-400">
                Please remain still while we verify your identity...
              </p>
              
              <div className="flex justify-center space-x-2 mt-6">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-neon-blue rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Scan Complete */}
          {scanComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-32 h-32 mx-auto mb-8 relative"
              >
                <div className="absolute inset-0 bg-neon-green rounded-full flex items-center justify-center">
                  <div className="text-6xl">✓</div>
                </div>
                <div className="absolute inset-0 border-4 border-neon-green rounded-full animate-ping" />
              </motion.div>
              
              <h2 className="font-orbitron text-3xl font-bold text-neon-green mb-4">
                ACCESS GRANTED
              </h2>
              <p className="font-mono text-gray-400 mb-2">
                Welcome aboard, {selectedRole} {userName}
              </p>
              <p className="font-mono text-sm text-gray-500">
                Initializing command interface...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginScreen;
