'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MissionLog {
  id: string;
  timestamp: Date;
  type: 'system' | 'crew' | 'navigation' | 'emergency' | 'discovery';
  title: string;
  description: string;
  officer: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

const MissionLogs = () => {
  const [logs, setLogs] = useState<MissionLog[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<MissionLog | null>(null);

  useEffect(() => {
    // Generate realistic mission logs
    const generateLogs = () => {
      const logTypes = ['system', 'crew', 'navigation', 'emergency', 'discovery'];
      const priorities = ['low', 'medium', 'high', 'critical'];
      const officers = ['Commander Chen', 'Dr. Webb', 'Lt. Rodriguez', 'Engineer Park'];

      const logTemplates = [
        { type: 'system', title: 'Life Support Systems Check', description: 'All life support systems operating within normal parameters. Oxygen levels stable at 21%.' },
        { type: 'crew', title: 'Crew Health Assessment', description: 'Weekly health checkups completed. All crew members in excellent condition.' },
        { type: 'navigation', title: 'Course Correction Applied', description: 'Minor trajectory adjustment made to account for gravitational anomaly.' },
        { type: 'emergency', title: 'Micrometeorite Impact', description: 'Small impact detected on hull section 7. Damage minimal, repairs completed.' },
        { type: 'discovery', title: 'Anomalous Signal Detected', description: 'Unknown radio signal detected from Kepler-442b system. Analysis ongoing.' },
        { type: 'system', title: 'Engine Performance Report', description: 'Fusion engines operating at 98% efficiency. Fuel consumption within expected parameters.' },
        { type: 'crew', title: 'EVA Mission Completed', description: 'External maintenance EVA completed successfully. Solar panel efficiency restored.' },
        { type: 'navigation', title: 'Deep Space Scan Results', description: 'Long-range sensors detected 3 potentially habitable worlds in nearby system.' },
        { type: 'discovery', title: 'Mineral Deposits Located', description: 'Spectral analysis reveals rare earth elements on asteroid VP-2077-A.' },
        { type: 'system', title: 'Communication Array Update', description: 'Quantum communication array upgraded. Signal strength increased by 15%.' }
      ];

      const generatedLogs: MissionLog[] = [];

      for (let i = 0; i < 15; i++) {
        const template = logTemplates[Math.floor(Math.random() * logTemplates.length)];
        const log: MissionLog = {
          id: `log-${i}`,
          timestamp: new Date(Date.now() - (i * 3600000) - Math.random() * 86400000), // Random times in last few days
          type: template.type as any,
          title: template.title,
          description: template.description,
          officer: officers[Math.floor(Math.random() * officers.length)],
          priority: priorities[Math.floor(Math.random() * priorities.length)] as any
        };
        generatedLogs.push(log);
      }

      return generatedLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    };

    setLogs(generateLogs());
  }, []);

  const filteredLogs = selectedType === 'all'
    ? logs
    : logs.filter(log => log.type === selectedType);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'system': return 'text-neon-blue';
      case 'crew': return 'text-neon-green';
      case 'navigation': return 'text-neon-purple';
      case 'emergency': return 'text-red-400';
      case 'discovery': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'system': return '⚙️';
      case 'crew': return '👥';
      case 'navigation': return '🧭';
      case 'emergency': return '🚨';
      case 'discovery': return '🔍';
      default: return '📋';
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
            MISSION LOGS
          </span>
        </h1>
        <p className="font-mono text-gray-400">Mission History and Reports</p>
      </motion.div>

      <div className="glass-strong rounded-xl p-6">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'system', 'crew', 'navigation', 'emergency', 'discovery'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200 ${
                selectedType === type
                  ? 'bg-neon-blue/20 text-neon-blue'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {type === 'all' ? '📋 ALL' : `${getTypeIcon(type)} ${type.toUpperCase()}`}
            </button>
          ))}
        </div>

        {/* Logs List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {filteredLogs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800/70 transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedLog(log)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-lg">{getTypeIcon(log.type)}</span>
                      <h3 className="font-orbitron text-sm font-semibold text-white">
                        {log.title}
                      </h3>
                      <span className={`font-mono text-xs px-2 py-1 rounded ${getPriorityColor(log.priority)} bg-gray-700`}>
                        {log.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-gray-400 mb-2 line-clamp-2">
                      {log.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-gray-500">
                        Officer: {log.officer}
                      </span>
                      <span className="font-mono text-xs text-gray-500">
                        {formatTimestamp(log.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-8">
            <p className="font-mono text-gray-400">No logs found for selected filter</p>
          </div>
        )}
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedLog(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="max-w-2xl max-h-full bg-gray-900 rounded-xl p-6 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getTypeIcon(selectedLog.type)}</span>
                <div>
                  <h3 className="font-orbitron text-xl font-bold text-white">
                    {selectedLog.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`font-mono text-xs ${getTypeColor(selectedLog.type)}`}>
                      {selectedLog.type.toUpperCase()}
                    </span>
                    <span className={`font-mono text-xs px-2 py-1 rounded ${getPriorityColor(selectedLog.priority)} bg-gray-800`}>
                      {selectedLog.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-mono text-sm text-gray-300 mb-4">
                  {selectedLog.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                <div>
                  <p className="font-mono text-xs text-gray-400 mb-1">REPORTING OFFICER</p>
                  <p className="font-mono text-sm text-white">{selectedLog.officer}</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-gray-400 mb-1">TIMESTAMP</p>
                  <p className="font-mono text-sm text-white">
                    {selectedLog.timestamp.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MissionLogs;
