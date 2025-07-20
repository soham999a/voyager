// Voyager Palen Command Dashboard Types

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Commander' | 'Engineer' | 'Observer';
  avatar?: string;
  isOnline: boolean;
  lastSeen: Date;
}

export interface ShipMetrics {
  speed: number; // km/h
  fuel: number; // percentage
  hullIntegrity: number; // percentage
  engineTemperature: number; // celsius
  destination: string;
  eta: string;
  coordinates: {
    x: number;
    y: number;
    z: number;
  };
}

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  status: 'awake' | 'sleeping' | 'critical' | 'offline';
  healthStatus: 'healthy' | 'warning' | 'critical';
  currentTask: string;
  avatar: string;
  bio: string;
}

export interface Planet {
  id: string;
  name: string;
  distance: number;
  atmosphereType: string;
  habitabilityRating: number;
  coordinates: {
    x: number;
    y: number;
    z: number;
  };
  description: string;
  image?: string;
}

export interface MissionLog {
  id: string;
  title: string;
  date: Date;
  crew: string[];
  description: string;
  outcome: 'success' | 'failed' | 'pending';
  images?: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface CommunicationLog {
  id: string;
  timestamp: Date;
  type: 'incoming' | 'outgoing';
  source: string;
  destination: string;
  message: string;
  encrypted: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  module: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'system' | 'alert';
}

export interface AIResponse {
  id: string;
  query: string;
  response: string;
  timestamp: Date;
  confidence: number;
}

export interface NavigationData {
  currentPosition: {
    x: number;
    y: number;
    z: number;
  };
  destination: {
    x: number;
    y: number;
    z: number;
    name: string;
  };
  route: Array<{
    x: number;
    y: number;
    z: number;
    timestamp: Date;
  }>;
  speed: number;
  eta: string;
}

export interface AmbientSettings {
  backgroundMusic: boolean;
  ambientSounds: boolean;
  soundVolume: number;
  theme: 'default' | 'solar-storm' | 'night-view' | 'nebula';
  animationSpeed: 'slow' | 'normal' | 'fast';
  autoAlerts: boolean;
}

export interface ModulePermissions {
  starMap: boolean;
  aiAssistant: boolean;
  crewHub: boolean;
  missionLogs: boolean;
  communicationLogs: boolean;
  shipTracking: boolean;
  crewChat: boolean;
  ambientControls: boolean;
  systemSettings: boolean;
}

export interface DashboardState {
  user: User | null;
  shipMetrics: ShipMetrics;
  crew: CrewMember[];
  planets: Planet[];
  missionLogs: MissionLog[];
  communicationLogs: CommunicationLog[];
  systemAlerts: SystemAlert[];
  chatMessages: ChatMessage[];
  navigationData: NavigationData;
  ambientSettings: AmbientSettings;
  modulePermissions: ModulePermissions;
  isLoading: boolean;
  error: string | null;
}

export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// NASA API Types
export interface NASAImageOfDay {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export interface ISSLocation {
  iss_position: {
    latitude: string;
    longitude: string;
  };
  message: string;
  timestamp: number;
}

// Random User API Types
export interface RandomUserResponse {
  results: Array<{
    name: {
      first: string;
      last: string;
    };
    email: string;
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
    login: {
      uuid: string;
    };
  }>;
}

// SpaceFlight News API Types
export interface SpaceNewsArticle {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  publishedAt: string;
  updatedAt: string;
}
