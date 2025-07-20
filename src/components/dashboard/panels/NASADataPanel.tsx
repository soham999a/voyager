'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NASAApi } from '@/lib/api';

interface APODData {
  title: string;
  explanation: string;
  url: string;
  hdurl: string;
  date: string;
}

const NASADataPanel = () => {
  const [apodData, setApodData] = useState<APODData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullImage, setShowFullImage] = useState(false);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const response = await NASAApi.getAPOD();
        if (response.success) {
          setApodData(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch NASA APOD:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAPOD();
  }, []);

  if (isLoading) {
    return (
      <div className="glass-strong rounded-xl p-6">
        <h3 className="font-orbitron text-lg font-bold text-neon-purple mb-4 flex items-center">
          <span className="mr-2">🌌</span>
          NASA Deep Space View
        </h3>
        <div className="animate-pulse">
          <div className="h-32 bg-gray-700 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!apodData) {
    return (
      <div className="glass-strong rounded-xl p-6">
        <h3 className="font-orbitron text-lg font-bold text-neon-purple mb-4 flex items-center">
          <span className="mr-2">🌌</span>
          NASA Deep Space View
        </h3>
        <div className="text-center py-8">
          <p className="font-mono text-gray-400">Unable to load space imagery</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-strong rounded-xl p-6">
      <h3 className="font-orbitron text-lg font-bold text-neon-purple mb-4 flex items-center">
        <span className="mr-2">🌌</span>
        NASA Deep Space View
      </h3>
      
      <div className="space-y-4">
        {/* Image */}
        <div className="relative">
          <img
            src={apodData.url}
            alt={apodData.title}
            className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setShowFullImage(true)}
          />
          <div className="absolute top-2 right-2 bg-black/50 rounded px-2 py-1">
            <span className="font-mono text-xs text-white">{apodData.date}</span>
          </div>
        </div>
        
        {/* Title */}
        <h4 className="font-orbitron text-sm font-semibold text-white">
          {apodData.title}
        </h4>
        
        {/* Description (truncated) */}
        <p className="font-mono text-xs text-gray-400 line-clamp-3">
          {apodData.explanation.length > 150 
            ? `${apodData.explanation.substring(0, 150)}...`
            : apodData.explanation
          }
        </p>
        
        {/* View Full Button */}
        <button
          onClick={() => setShowFullImage(true)}
          className="w-full py-2 bg-neon-purple/20 hover:bg-neon-purple/30 rounded-lg font-mono text-xs text-neon-purple transition-all duration-200"
        >
          VIEW FULL IMAGE
        </button>
      </div>

      {/* Full Image Modal */}
      {showFullImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowFullImage(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="max-w-4xl max-h-full bg-gray-900 rounded-xl p-6 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-orbitron text-xl font-bold text-white">
                {apodData.title}
              </h3>
              <button
                onClick={() => setShowFullImage(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            <img
              src={apodData.hdurl || apodData.url}
              alt={apodData.title}
              className="w-full max-h-96 object-contain rounded-lg mb-4"
            />
            
            <div className="space-y-2">
              <p className="font-mono text-xs text-gray-400">
                <strong>Date:</strong> {apodData.date}
              </p>
              <p className="font-mono text-sm text-gray-300">
                {apodData.explanation}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default NASADataPanel;
