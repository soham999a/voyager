'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Rocket, Globe } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Animated Earth in background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800 opacity-20"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => {
          // Use deterministic values based on index to avoid hydration mismatch
          const left = (i * 17.3) % 100;
          const top = (i * 23.7) % 100;
          const duration = 3 + (i % 3);
          const delay = (i * 0.3) % 2;

          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [-20, 20],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
              }}
            />
          );
        })}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 text-glow leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              VOYAGER
            </span>
            <br />
            <span className="text-white">STATION</span>
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-4 sm:mb-6 text-cyan-300 px-4">
            Your Next Vacation is in Orbit
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            Book your stay at the world's first luxury space hotel. Experience zero gravity,
            stunning Earth views, and the ultimate space vacation 400km above our planet.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
        >
          <motion.button
            className="btn-futuristic flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('tour')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Explore the 3D station tour"
          >
            <Rocket className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            Explore Station
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          </motion.button>

          <motion.button
            className="glass px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold text-white border-2 border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 flex items-center gap-3 w-full sm:w-auto"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 212, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Start booking your space suite"
          >
            <Globe className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            Reserve Your Suite
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto px-4"
        >
          {[
            { number: "400", unit: "KM", label: "Above Earth" },
            { number: "0.3", unit: "G", label: "Artificial Gravity" },
            { number: "24/7", unit: "", label: "Earth Views" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="glass-strong rounded-xl p-4 sm:p-6 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
            >
              <div className="font-orbitron text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-400 mb-2">
                {stat.number}
                <span className="text-sm sm:text-lg text-purple-400 ml-1">{stat.unit}</span>
              </div>
              <div className="text-gray-300 font-medium text-sm sm:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
