import { create } from 'zustand';
import type { 
  DashboardState, 
  User, 
  ShipMetrics, 
  CrewMember, 
  SystemAlert,
  ChatMessage,
  AmbientSettings,
  ModulePermissions
} from '@/types';
import { DEFAULT_SHIP_METRICS, DEFAULT_PERMISSIONS, USER_ROLES } from '@/lib/constants';

interface DashboardStore extends DashboardState {
  // Actions
  setUser: (user: User | null) => void;
  updateShipMetrics: (metrics: Partial<ShipMetrics>) => void;
  addSystemAlert: (alert: Omit<SystemAlert, 'id' | 'timestamp'>) => void;
  acknowledgeAlert: (alertId: string) => void;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  updateAmbientSettings: (settings: Partial<AmbientSettings>) => void;
  updateModulePermissions: (permissions: Partial<ModulePermissions>) => void;
  setCrew: (crew: CrewMember[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  resetDashboard: () => void;
}

const initialState: DashboardState = {
  user: null,
  shipMetrics: DEFAULT_SHIP_METRICS,
  crew: [],
  planets: [],
  missionLogs: [],
  communicationLogs: [],
  systemAlerts: [],
  chatMessages: [],
  navigationData: {
    currentPosition: { x: 0, y: 0, z: 0 },
    destination: { x: 1500, y: -800, z: 400, name: "Kepler-442b" },
    route: [],
    speed: 28000,
    eta: "47 days, 12 hours"
  },
  ambientSettings: {
    backgroundMusic: true,
    ambientSounds: true,
    soundVolume: 0.7,
    theme: 'default',
    animationSpeed: 'normal',
    autoAlerts: true
  },
  modulePermissions: {
    starMap: false,
    aiAssistant: false,
    crewHub: false,
    missionLogs: false,
    communicationLogs: false,
    shipTracking: false,
    crewChat: false,
    ambientControls: false,
    systemSettings: false
  },
  isLoading: false,
  error: null
};

export const useDashboardStore = create<DashboardStore>((set, get) => ({
      ...initialState,

      setUser: (user) => {
        const permissions = user ? DEFAULT_PERMISSIONS[user.role] : initialState.modulePermissions;
        set({ user, modulePermissions: permissions });
      },

      updateShipMetrics: (metrics) =>
        set((state) => ({
          shipMetrics: { ...state.shipMetrics, ...metrics }
        })),

      addSystemAlert: (alertData) => {
        const alert: SystemAlert = {
          ...alertData,
          id: crypto.randomUUID(),
          timestamp: new Date(),
          acknowledged: false
        };
        
        set((state) => ({
          systemAlerts: [alert, ...state.systemAlerts].slice(0, 50) // Keep only last 50 alerts
        }));
      },

      acknowledgeAlert: (alertId) =>
        set((state) => ({
          systemAlerts: state.systemAlerts.map(alert =>
            alert.id === alertId ? { ...alert, acknowledged: true } : alert
          )
        })),

      addChatMessage: (messageData) => {
        const message: ChatMessage = {
          ...messageData,
          id: crypto.randomUUID(),
          timestamp: new Date()
        };
        
        set((state) => ({
          chatMessages: [...state.chatMessages, message].slice(-100) // Keep only last 100 messages
        }));
      },

      updateAmbientSettings: (settings) =>
        set((state) => ({
          ambientSettings: { ...state.ambientSettings, ...settings }
        })),

      updateModulePermissions: (permissions) =>
        set((state) => ({
          modulePermissions: { ...state.modulePermissions, ...permissions }
        })),

      setCrew: (crew) => set({ crew }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),

      resetDashboard: () => set(initialState)
    }));

// Selectors for better performance
export const useUser = () => useDashboardStore((state) => state.user);
export const useShipMetrics = () => useDashboardStore((state) => state.shipMetrics);
export const useCrew = () => useDashboardStore((state) => state.crew);
export const useSystemAlerts = () => useDashboardStore((state) => state.systemAlerts);
export const useChatMessages = () => useDashboardStore((state) => state.chatMessages);
export const useAmbientSettings = () => useDashboardStore((state) => state.ambientSettings);
export const useModulePermissions = () => useDashboardStore((state) => state.modulePermissions);
export const useIsLoading = () => useDashboardStore((state) => state.isLoading);
export const useError = () => useDashboardStore((state) => state.error);

// Action selectors
export const useDashboardActions = () => useDashboardStore((state) => ({
  setUser: state.setUser,
  updateShipMetrics: state.updateShipMetrics,
  addSystemAlert: state.addSystemAlert,
  acknowledgeAlert: state.acknowledgeAlert,
  addChatMessage: state.addChatMessage,
  updateAmbientSettings: state.updateAmbientSettings,
  updateModulePermissions: state.updateModulePermissions,
  setCrew: state.setCrew,
  setLoading: state.setLoading,
  setError: state.setError,
  clearError: state.clearError,
  resetDashboard: state.resetDashboard
}));
