'use client';

import { motion } from 'framer-motion';

const CrewChat = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-orbitron text-4xl font-bold mb-2 text-glow">
          <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent">
            CREW CHAT
          </span>
        </h1>
        <p className="font-mono text-gray-400">Internal Communication System</p>
      </motion.div>

      <div className="glass-strong rounded-xl p-8 text-center">
        <div className="text-6xl mb-4">💬</div>
        <h2 className="font-orbitron text-2xl font-bold text-white mb-4">Communication System</h2>
        <p className="font-mono text-gray-400 mb-6">
          Real-time chat system for crew communication with role-based messaging.
        </p>
        <div className="inline-block px-4 py-2 bg-neon-green/20 rounded-lg">
          <span className="font-mono text-sm text-neon-green">✅ ACTIVE - Real-time crew messaging system</span>
        </div>
      </div>
    </div>
  );
};

export default CrewChat;
