// Voyager Palen Command Dashboard Constants

export const SHIP_NAME = "Voyager Palen";
export const SHIP_DESIGNATION = "VP-2077";

export const USER_ROLES = {
  COMMANDER: 'Commander',
  ENGINEER: 'Engineer',
  OBSERVER: 'Observer'
} as const;

export const CREW_STATUS = {
  AWAKE: 'awake',
  SLEEPING: 'sleeping',
  CRITICAL: 'critical',
  OFFLINE: 'offline'
} as const;

export const HEALTH_STATUS = {
  HEALTHY: 'healthy',
  WARNING: 'warning',
  CRITICAL: 'critical'
} as const;

export const MISSION_OUTCOMES = {
  SUCCESS: 'success',
  FAILED: 'failed',
  PENDING: 'pending'
} as const;

export const ALERT_TYPES = {
  INFO: 'info',
  WARNING: 'warning',
  CRITICAL: 'critical'
} as const;

export const COMMUNICATION_TYPES = {
  INCOMING: 'incoming',
  OUTGOING: 'outgoing'
} as const;

export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
} as const;

export const THEMES = {
  DEFAULT: 'default',
  SOLAR_STORM: 'solar-storm',
  NIGHT_VIEW: 'night-view',
  NEBULA: 'nebula'
} as const;

export const ANIMATION_SPEEDS = {
  SLOW: 'slow',
  NORMAL: 'normal',
  FAST: 'fast'
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  NASA_APOD: 'https://api.nasa.gov/planetary/apod',
  NASA_EARTH: 'https://api.nasa.gov/planetary/earth',
  ISS_LOCATION: 'http://api.open-notify.org/iss-now.json',
  ISS_PEOPLE: 'http://api.open-notify.org/astros.json',
  RANDOM_USER: 'https://randomuser.me/api/',
  SPACEFLIGHT_NEWS: 'https://api.spaceflightnewsapi.net/v3/articles',
} as const;

// Default Ship Metrics
export const DEFAULT_SHIP_METRICS = {
  speed: 28000, // km/h
  fuel: 85,
  hullIntegrity: 98,
  engineTemperature: 2847,
  destination: "Kepler-442b",
  eta: "47 days, 12 hours",
  coordinates: {
    x: 1247.8,
    y: -892.3,
    z: 445.7
  }
};

// System Modules
export const MODULES = {
  COMMAND_CENTER: 'command-center',
  STAR_MAP: 'star-map',
  CREW_HUB: 'crew-hub',
  AI_ASSISTANT: 'ai-assistant',
  MISSION_LOGS: 'mission-logs',
  COMMUNICATION_LOGS: 'communication-logs',
  SHIP_TRACKING: 'ship-tracking',
  CREW_CHAT: 'crew-chat',
  AMBIENT_CONTROLS: 'ambient-controls',
  SETTINGS: 'settings'
} as const;

// Default Permissions by Role
export const DEFAULT_PERMISSIONS = {
  [USER_ROLES.COMMANDER]: {
    starMap: true,
    aiAssistant: true,
    crewHub: true,
    missionLogs: true,
    communicationLogs: true,
    shipTracking: true,
    crewChat: true,
    ambientControls: true,
    systemSettings: true
  },
  [USER_ROLES.ENGINEER]: {
    starMap: true,
    aiAssistant: true,
    crewHub: true,
    missionLogs: true,
    communicationLogs: false,
    shipTracking: true,
    crewChat: true,
    ambientControls: true,
    systemSettings: false
  },
  [USER_ROLES.OBSERVER]: {
    starMap: true,
    aiAssistant: false,
    crewHub: true,
    missionLogs: true,
    communicationLogs: false,
    shipTracking: true,
    crewChat: false,
    ambientControls: false,
    systemSettings: false
  }
};

// Mock Data for Development
export const MOCK_PLANETS = [
  {
    id: '1',
    name: 'Kepler-442b',
    distance: 1206,
    atmosphereType: 'Nitrogen-Oxygen',
    habitabilityRating: 0.97,
    coordinates: { x: 1500, y: -800, z: 400 },
    description: 'Super-Earth exoplanet with high habitability potential'
  },
  {
    id: '2',
    name: 'Proxima Centauri b',
    distance: 4.24,
    atmosphereType: 'Unknown',
    habitabilityRating: 0.87,
    coordinates: { x: -200, y: 150, z: -50 },
    description: 'Closest potentially habitable exoplanet to Earth'
  },
  {
    id: '3',
    name: 'TRAPPIST-1e',
    distance: 39.6,
    atmosphereType: 'Potentially Earth-like',
    habitabilityRating: 0.95,
    coordinates: { x: 800, y: 600, z: -200 },
    description: 'Earth-sized planet in the habitable zone'
  }
];

export const MOCK_CREW_ROLES = [
  'Navigation Officer',
  'Chief Engineer',
  'Medical Officer',
  'Communications Specialist',
  'Security Chief',
  'Science Officer',
  'Pilot',
  'Systems Analyst'
];

export const MOCK_TASKS = [
  'Monitoring engine systems',
  'Analyzing stellar data',
  'Maintaining life support',
  'Conducting research',
  'System diagnostics',
  'Navigation calculations',
  'Communication protocols',
  'Security patrol',
  'Medical checkup',
  'Equipment maintenance'
];

// Audio Files (to be added to public/audio/)
export const AUDIO_FILES = {
  ENGINE_HUM: '/audio/engine-hum.mp3',
  ALERT_BEEP: '/audio/alert-beep.mp3',
  BUTTON_CLICK: '/audio/button-click.mp3',
  NOTIFICATION: '/audio/notification.mp3',
  AMBIENT_SPACE: '/audio/ambient-space.mp3',
  METEOR_STORM: '/audio/meteor-storm.mp3',
  WORMHOLE: '/audio/wormhole.mp3'
};

// Color Schemes for Different Themes
export const THEME_COLORS = {
  [THEMES.DEFAULT]: {
    primary: '#00d4ff',
    secondary: '#8b5cf6',
    accent: '#ff6b9d',
    background: '#0a0a0f'
  },
  [THEMES.SOLAR_STORM]: {
    primary: '#ff6b35',
    secondary: '#f7931e',
    accent: '#ffcc02',
    background: '#1a0f0a'
  },
  [THEMES.NIGHT_VIEW]: {
    primary: '#4c1d95',
    secondary: '#1e1b4b',
    accent: '#312e81',
    background: '#050505'
  },
  [THEMES.NEBULA]: {
    primary: '#ec4899',
    secondary: '#a855f7',
    accent: '#06b6d4',
    background: '#0f0a1a'
  }
};

// Animation Durations
export const ANIMATION_DURATIONS = {
  [ANIMATION_SPEEDS.SLOW]: {
    transition: '0.8s',
    pulse: '3s',
    flicker: '4s'
  },
  [ANIMATION_SPEEDS.NORMAL]: {
    transition: '0.5s',
    pulse: '2s',
    flicker: '3s'
  },
  [ANIMATION_SPEEDS.FAST]: {
    transition: '0.3s',
    pulse: '1s',
    flicker: '2s'
  }
};
