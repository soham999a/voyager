'use client';

import { motion } from 'framer-motion';
import { useDashboardStore } from '@/store/dashboardStore';
import { MODULES } from '@/lib/constants';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ activeModule, setActiveModule, collapsed, setCollapsed }: SidebarProps) => {
  const user = useDashboardStore((state) => state.user);
  const modulePermissions = useDashboardStore((state) => state.modulePermissions);
  const systemAlerts = useDashboardStore((state) => state.systemAlerts);
  const unacknowledgedAlerts = systemAlerts.filter(alert => !alert.acknowledged).length;

  const menuItems = [
    {
      id: MODULES.COMMAND_CENTER,
      label: 'Command Center',
      icon: '🎛️',
      enabled: true,
      description: 'Main dashboard and ship status'
    },
    {
      id: MODULES.STAR_MAP,
      label: 'Star Map',
      icon: '🌌',
      enabled: modulePermissions.starMap,
      description: 'Galaxy navigation and exploration'
    },
    {
      id: MODULES.CREW_HUB,
      label: 'Crew Hub',
      icon: '👥',
      enabled: modulePermissions.crewHub,
      description: 'Crew status and management'
    },
    {
      id: MODULES.AI_ASSISTANT,
      label: 'AI Assistant',
      icon: '🤖',
      enabled: modulePermissions.aiAssistant,
      description: 'Ship AI communication interface'
    },
    {
      id: MODULES.MISSION_LOGS,
      label: 'Mission Logs',
      icon: '📋',
      enabled: modulePermissions.missionLogs,
      description: 'Mission history and reports'
    },
    {
      id: MODULES.COMMUNICATION_LOGS,
      label: 'Communications',
      icon: '📡',
      enabled: modulePermissions.communicationLogs,
      description: 'Transmission logs and messages'
    },
    {
      id: MODULES.SHIP_TRACKING,
      label: 'Ship Tracking',
      icon: '🛰️',
      enabled: modulePermissions.shipTracking,
      description: 'Real-time position and navigation'
    },
    {
      id: MODULES.CREW_CHAT,
      label: 'Crew Chat',
      icon: '💬',
      enabled: modulePermissions.crewChat,
      description: 'Internal communication system',
      badge: unacknowledgedAlerts > 0 ? unacknowledgedAlerts : undefined
    },
    {
      id: MODULES.AMBIENT_CONTROLS,
      label: 'Ambient Controls',
      icon: '🎵',
      enabled: modulePermissions.ambientControls,
      description: 'Environment and audio settings'
    },
    {
      id: MODULES.SETTINGS,
      label: 'Settings',
      icon: '⚙️',
      enabled: modulePermissions.systemSettings,
      description: 'System configuration and preferences'
    }
  ];

  return (
    <div className={`h-full flex flex-col ${collapsed ? 'w-16' : 'w-64 lg:w-72'} bg-gradient-to-b from-black/95 via-black/90 to-black/95 backdrop-blur-xl border-r border-neon-blue/30 transition-all duration-300`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-neon-blue/20">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1"
              >
                <h1 className="font-orbitron text-lg font-bold text-neon-blue">
                  VOYAGER PALEN
                </h1>
                <p className="font-mono text-xs text-gray-400">
                  VP-2077 • {user?.role.toUpperCase()}
                </p>
              </motion.div>
            )}
            
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg bg-neon-blue/10 hover:bg-neon-blue/20 transition-colors"
            >
              <motion.div
                animate={{ rotate: collapsed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-neon-blue">◀</span>
              </motion.div>
            </button>
          </div>
        </div>

        {/* User Info */}
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 border-b border-gray-700/50"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                <span className="font-orbitron font-bold text-sm">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm font-semibold text-white truncate">
                  {user?.name}
                </p>
                <p className="font-mono text-xs text-gray-400">
                  {user?.role}
                </p>
              </div>
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
            </div>
          </motion.div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-2">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => item.enabled && setActiveModule(item.id)}
                disabled={!item.enabled}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group relative ${
                  activeModule === item.id
                    ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                    : item.enabled
                    ? 'hover:bg-gray-800/50 text-gray-300 hover:text-white'
                    : 'text-gray-600 cursor-not-allowed opacity-50'
                }`}
                whileHover={item.enabled ? { scale: 1.02 } : {}}
                whileTap={item.enabled ? { scale: 0.98 } : {}}
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex-1 text-left"
                  >
                    <div className="font-mono text-sm font-medium">
                      {item.label}
                    </div>
                    <div className="font-mono text-xs opacity-70">
                      {item.description}
                    </div>
                  </motion.div>
                )}

                {/* Badge for notifications */}
                {item.badge && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute ${collapsed ? '-top-1 -right-1' : 'top-2 right-2'} w-5 h-5 bg-critical-red rounded-full flex items-center justify-center`}
                  >
                    <span className="text-xs font-bold text-white">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  </motion.div>
                )}

                {/* Active indicator */}
                {activeModule === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-neon-blue rounded-r"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Tooltip for collapsed state */}
                {collapsed && item.enabled && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-black/90 border border-neon-blue/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                    <div className="font-mono text-sm font-medium text-white">
                      {item.label}
                    </div>
                    <div className="font-mono text-xs text-gray-400">
                      {item.description}
                    </div>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </nav>

        {/* System Status */}
        <div className="p-4 border-t border-gray-700/50">
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gray-400">SYSTEM STATUS</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse delay-100" />
                  <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse delay-200" />
                </div>
              </div>
              <div className="font-mono text-xs text-neon-green">
                ALL SYSTEMS OPERATIONAL
              </div>
            </motion.div>
          ) : (
            <div className="flex justify-center">
              <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
