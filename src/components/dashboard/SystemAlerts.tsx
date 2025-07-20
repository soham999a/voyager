'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardStore } from '@/store/dashboardStore';

const SystemAlerts = () => {
  const systemAlerts = useDashboardStore((state) => state.systemAlerts);
  const acknowledgeAlert = useDashboardStore((state) => state.acknowledgeAlert);
  
  const unacknowledgedAlerts = systemAlerts.filter(alert => !alert.acknowledged);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'critical-red';
      case 'warning': return 'warning-orange';
      case 'info': return 'neon-blue';
      default: return 'neon-blue';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return '🚨';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="fixed top-20 right-6 z-50 space-y-3 max-w-sm">
      <AnimatePresence>
        {unacknowledgedAlerts.slice(0, 3).map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`glass-strong rounded-lg p-4 border-l-4 border-${getAlertColor(alert.type)} shadow-lg`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="text-xl">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <div className={`font-orbitron text-sm font-bold text-${getAlertColor(alert.type)} mb-1`}>
                    {alert.title}
                  </div>
                  <div className="font-mono text-xs text-gray-300 mb-2">
                    {alert.message}
                  </div>
                  <div className="font-mono text-xs text-gray-500">
                    {alert.timestamp.toLocaleTimeString()} • {alert.module.toUpperCase()}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => acknowledgeAlert(alert.id)}
                className="text-gray-400 hover:text-white transition-colors ml-2"
              >
                ✕
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SystemAlerts;
