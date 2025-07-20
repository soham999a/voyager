'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NASAApi } from '@/lib/api';

interface CrewMember {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'sleeping' | 'maintenance' | 'emergency';
  health: 'excellent' | 'good' | 'fair' | 'critical';
  currentTask: string;
  location: string;
  avatar: string;
  experience: number;
}

const CrewHub = () => {
  const [crewMembers, setCrewMembers] = useState<CrewMember[]>([]);
  const [selectedCrew, setSelectedCrew] = useState<CrewMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCrewData = async () => {
      try {
        // Get real people in space from NASA
        const response = await NASAApi.getPeopleInSpace();
        if (response.success && response.data.people) {
          const realCrew = response.data.people.map((person: any, index: number) => ({
            id: `crew-${index}`,
            name: person.name,
            role: person.craft === 'ISS' ? 'Flight Engineer' : 'Mission Specialist',
            status: Math.random() > 0.7 ? 'sleeping' : 'active',
            health: ['excellent', 'good', 'fair'][Math.floor(Math.random() * 3)],
            currentTask: [
              'System Diagnostics',
              'Scientific Research',
              'Equipment Maintenance',
              'Navigation Monitoring',
              'Communication Relay',
              'Life Support Check'
            ][Math.floor(Math.random() * 6)],
            location: person.craft,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${person.name}`,
            experience: Math.floor(Math.random() * 15) + 5
          }));
          setCrewMembers(realCrew);
        }
      } catch (error) {
        console.error('Failed to fetch crew data:', error);
        // Fallback to mock data
        setCrewMembers([
          {
            id: 'crew-1',
            name: 'Commander Sarah Chen',
            role: 'Mission Commander',
            status: 'active',
            health: 'excellent',
            currentTask: 'Navigation Monitoring',
            location: 'Command Bridge',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
            experience: 12
          },
          {
            id: 'crew-2',
            name: 'Dr. Marcus Webb',
            role: 'Chief Medical Officer',
            status: 'active',
            health: 'good',
            currentTask: 'Health Assessments',
            location: 'Medical Bay',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
            experience: 8
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCrewData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-neon-green';
      case 'sleeping': return 'text-blue-400';
      case 'maintenance': return 'text-yellow-400';
      case 'emergency': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-neon-green';
      case 'good': return 'text-blue-400';
      case 'fair': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '🟢';
      case 'sleeping': return '😴';
      case 'maintenance': return '🔧';
      case 'emergency': return '🚨';
      default: return '⚪';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-orbitron text-4xl font-bold mb-2 text-glow">
          <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent">
            CREW HUB
          </span>
        </h1>
        <p className="font-mono text-gray-400">
          Live Crew Management & Status Monitoring
        </p>
      </motion.div>

      {isLoading ? (
        <div className="glass-strong rounded-xl p-8">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex space-x-4">
                <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Crew List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-neon-blue/30 p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 gap-2">
                <h2 className="font-orbitron text-lg lg:text-xl font-bold text-white flex items-center">
                  <span className="mr-2">👥</span>
                  Active Crew ({crewMembers.length})
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                  <span className="font-mono text-xs text-neon-green">LIVE</span>
                </div>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {crewMembers.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800/70 transition-all duration-200 cursor-pointer"
                      onClick={() => setSelectedCrew(member)}
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-16 h-16 rounded-full bg-gray-700"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-orbitron text-lg font-semibold text-white">
                              {member.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span>{getStatusIcon(member.status)}</span>
                              <span className={`font-mono text-sm ${getStatusColor(member.status)}`}>
                                {member.status.toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <p className="font-mono text-sm text-gray-400 mb-1">{member.role}</p>
                          <p className="font-mono text-xs text-gray-500">
                            Current Task: {member.currentTask}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-mono text-xs text-gray-400">
                              Location: {member.location}
                            </span>
                            <span className={`font-mono text-xs ${getHealthColor(member.health)}`}>
                              Health: {member.health.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Crew Details */}
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-neon-purple/30 p-4 lg:p-6">
            <h3 className="font-orbitron text-lg font-bold text-white mb-4 flex items-center">
              <span className="mr-2">👤</span>
              Crew Details
            </h3>

            {selectedCrew ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <img
                    src={selectedCrew.avatar}
                    alt={selectedCrew.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 bg-gray-700"
                  />
                  <h4 className="font-orbitron text-xl font-bold text-white mb-2">
                    {selectedCrew.name}
                  </h4>
                  <p className="font-mono text-sm text-gray-400">{selectedCrew.role}</p>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="font-mono text-xs text-gray-400 mb-1">STATUS</p>
                    <div className="flex items-center space-x-2">
                      <span>{getStatusIcon(selectedCrew.status)}</span>
                      <span className={`font-mono text-sm ${getStatusColor(selectedCrew.status)}`}>
                        {selectedCrew.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="font-mono text-xs text-gray-400 mb-1">HEALTH</p>
                    <span className={`font-mono text-sm ${getHealthColor(selectedCrew.health)}`}>
                      {selectedCrew.health.toUpperCase()}
                    </span>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="font-mono text-xs text-gray-400 mb-1">CURRENT TASK</p>
                    <p className="font-mono text-sm text-white">{selectedCrew.currentTask}</p>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="font-mono text-xs text-gray-400 mb-1">LOCATION</p>
                    <p className="font-mono text-sm text-white">{selectedCrew.location}</p>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="font-mono text-xs text-gray-400 mb-1">EXPERIENCE</p>
                    <p className="font-mono text-sm text-white">{selectedCrew.experience} years</p>
                  </div>
                </div>

                <button className="w-full py-2 bg-neon-green/20 hover:bg-neon-green/30 rounded-lg font-mono text-sm text-neon-green transition-all duration-200">
                  CONTACT CREW MEMBER
                </button>
              </motion.div>
            ) : (
              <div className="text-center py-8">
                <p className="font-mono text-gray-400 text-sm">
                  Select a crew member to view details
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CrewHub;
