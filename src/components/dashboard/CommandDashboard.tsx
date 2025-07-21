'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardStore } from '@/store/dashboardStore';
import { MODULES, type ModuleType } from '@/lib/constants';

// Import dashboard modules
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import CommandCenter from './modules/CommandCenter';
import StarMap from './modules/StarMap';
import CrewHub from './modules/CrewHub';
import AIAssistant from './modules/AIAssistant';
import MissionLogs from './modules/MissionLogs';
import CommunicationLogs from './modules/CommunicationLogs';
import ShipTracking from './modules/ShipTracking';
import CrewChat from './modules/CrewChat';
import AmbientControls from './modules/AmbientControls';
import Settings from './modules/Settings';
import SystemAlerts from './SystemAlerts';

const CommandDashboard = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(MODULES.COMMAND_CENTER);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const user = useDashboardStore((state) => state.user);
  const modulePermissions = useDashboardStore((state) => state.modulePermissions);
  const systemAlerts = useDashboardStore((state) => state.systemAlerts);

  // Initialize dashboard data
  useEffect(() => {
    // Here we would typically fetch initial data from APIs
    // For now, we'll use mock data
    console.log('Dashboard initialized for user:', user?.name);
  }, [user]);

  const renderActiveModule = () => {
    switch (activeModule) {
      case MODULES.COMMAND_CENTER:
        return <CommandCenter />;
      case MODULES.STAR_MAP:
        return modulePermissions.starMap ? <StarMap /> : <AccessDenied />;
      case MODULES.CREW_HUB:
        return modulePermissions.crewHub ? <CrewHub /> : <AccessDenied />;
      case MODULES.AI_ASSISTANT:
        return modulePermissions.aiAssistant ? <AIAssistant /> : <AccessDenied />;
      case MODULES.MISSION_LOGS:
        return modulePermissions.missionLogs ? <MissionLogs /> : <AccessDenied />;
      case MODULES.COMMUNICATION_LOGS:
        return modulePermissions.communicationLogs ? <CommunicationLogs /> : <AccessDenied />;
      case MODULES.SHIP_TRACKING:
        return modulePermissions.shipTracking ? <ShipTracking /> : <AccessDenied />;
      case MODULES.CREW_CHAT:
        return modulePermissions.crewChat ? <CrewChat /> : <AccessDenied />;
      case MODULES.AMBIENT_CONTROLS:
        return modulePermissions.ambientControls ? <AmbientControls /> : <AccessDenied />;
      case MODULES.SETTINGS:
        return modulePermissions.systemSettings ? <Settings /> : <AccessDenied />;
      default:
        return <CommandCenter />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Mobile-First Layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* Mobile Header */}
        <div className="lg:hidden bg-black/90 backdrop-blur-xl border-b border-neon-blue/30 p-4 z-50 sticky top-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-lg bg-neon-blue/20 hover:bg-neon-blue/30 transition-colors"
              >
                <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                  <div className="w-full h-0.5 bg-neon-blue rounded-full"></div>
                  <div className="w-full h-0.5 bg-neon-blue rounded-full"></div>
                  <div className="w-full h-0.5 bg-neon-blue rounded-full"></div>
                </div>
              </motion.button>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">VP</span>
                </div>
                <div>
                  <h1 className="font-orbitron text-sm font-bold text-white">VOYAGER PALEN</h1>
                  <p className="font-mono text-xs text-gray-400">VP-2077</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              <span className="font-mono text-xs text-neon-green">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Sidebar - Mobile Overlay */}
        <AnimatePresence>
          {!sidebarCollapsed && (
            <>
              {/* Mobile Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setSidebarCollapsed(true)}
              />

              {/* Mobile Sidebar */}
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 h-full w-80 bg-black/95 backdrop-blur-xl border-r border-neon-blue/30 z-50 lg:hidden overflow-y-auto"
              >
                <Sidebar
                  activeModule={activeModule}
                  setActiveModule={setActiveModule}
                  collapsed={false}
                  setCollapsed={setSidebarCollapsed}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            activeModule={activeModule}
            setActiveModule={setActiveModule}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Desktop TopBar */}
          <div className="hidden lg:block">
            <TopBar />
          </div>

          {/* Main Content Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-full"
                >
                  {renderActiveModule()}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>

      {/* System Alerts Overlay */}
      <SystemAlerts />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Scanning Lines */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent"
          animate={{
            top: ['0%', '100%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue/30 rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Access Denied Component
const AccessDenied = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-24 h-24 mx-auto mb-6 relative"
      >
        <div className="absolute inset-0 border-4 border-critical-red rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">🚫</span>
        </div>
      </motion.div>
      
      <h2 className="font-orbitron text-2xl font-bold text-critical-red mb-4">
        ACCESS DENIED
      </h2>
      <p className="font-mono text-gray-400 mb-2">
        Insufficient clearance level for this module
      </p>
      <p className="font-mono text-sm text-gray-500">
        Contact your commanding officer for access authorization
      </p>
    </div>
  </div>
);

export default CommandDashboard;
