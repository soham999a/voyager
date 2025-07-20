'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  duration?: number;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

const NotificationSystem = ({ notifications, onRemove }: NotificationSystemProps) => {
  const getNotificationStyles = (type: string) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-neon-green/20 to-emerald-500/20',
          border: 'border-neon-green/50',
          icon: '✓',
          iconColor: 'text-neon-green'
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-warning-orange/20 to-yellow-500/20',
          border: 'border-warning-orange/50',
          icon: '⚠',
          iconColor: 'text-warning-orange'
        };
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-critical-red/20 to-red-600/20',
          border: 'border-critical-red/50',
          icon: '✕',
          iconColor: 'text-critical-red'
        };
      case 'info':
      default:
        return {
          bg: 'bg-gradient-to-r from-neon-blue/20 to-neon-purple/20',
          border: 'border-neon-blue/50',
          icon: 'ℹ',
          iconColor: 'text-neon-blue'
        };
    }
  };

  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.duration !== 0) {
        const timer = setTimeout(() => {
          onRemove(notification.id);
        }, notification.duration || 5000);

        return () => clearTimeout(timer);
      }
    });
  }, [notifications, onRemove]);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => {
          const styles = getNotificationStyles(notification.type);
          
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`
                relative overflow-hidden rounded-xl p-4
                ${styles.bg} ${styles.border}
                backdrop-blur-xl border
                shadow-2xl shadow-black/50
              `}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex items-start space-x-3">
                {/* Icon */}
                <div className={`
                  flex-shrink-0 w-8 h-8 rounded-full
                  bg-black/20 backdrop-blur-sm
                  flex items-center justify-center
                  ${styles.iconColor} text-lg font-bold
                `}>
                  {styles.icon}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-orbitron text-sm font-bold text-white mb-1">
                    {notification.title}
                  </h4>
                  <p className="font-mono text-xs text-gray-300 leading-relaxed">
                    {notification.message}
                  </p>
                </div>

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemove(notification.id)}
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <span className="text-xs">×</span>
                </motion.button>
              </div>

              {/* Progress Bar (for timed notifications) */}
              {notification.duration && notification.duration > 0 && (
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: notification.duration / 1000, ease: "linear" }}
                  className={`absolute bottom-0 left-0 h-1 ${styles.bg} origin-left`}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

// Hook for using notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll
  };
};

export default NotificationSystem;
