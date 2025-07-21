import { create } from 'zustand';

export interface Suite {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
}

export interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export interface BookingData {
  suite: string;
  dates: {
    checkin: string;
    checkout: string;
  };
  guests: number;
  addons: string[];
  profile: {
    name: string;
    email: string;
    phone: string;
    emergencyContact: string;
  };
}

interface BookingStore {
  bookingData: BookingData;
  currentStep: number;
  updateBookingData: (data: Partial<BookingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  getTotalPrice: () => number;
  getSelectedSuite: () => Suite | undefined;
  getSelectedAddons: () => Addon[];
  completeBooking: () => void;
  resetBooking: () => void;
}

const initialBookingData: BookingData = {
  suite: '',
  dates: {
    checkin: '',
    checkout: '',
  },
  guests: 1,
  addons: [],
  profile: {
    name: '',
    email: '',
    phone: '',
    emergencyContact: '',
  },
};

export const suites: Suite[] = [
  {
    id: 'observatory',
    name: 'Observatory Suite',
    description: 'Panoramic views of Earth and space with premium amenities',
    price: 250000,
    features: [
      '360° observation dome',
      'Premium space cuisine',
      'Personal space guide',
      'Zero-gravity recreation area'
    ]
  },
  {
    id: 'commander',
    name: 'Commander Suite',
    description: 'Luxury accommodation with command deck access',
    price: 500000,
    features: [
      'Command deck access',
      'Private dining area',
      'Holographic entertainment',
      'Personal AI assistant',
      'Exclusive EVA experience'
    ]
  },
  {
    id: 'presidential',
    name: 'Presidential Suite',
    description: 'The ultimate space luxury experience',
    price: 1000000,
    features: [
      'Private shuttle service',
      'Personal chef',
      'Spa and wellness center',
      'Private observation deck',
      'Unlimited EVA access',
      'Personal space photographer'
    ]
  }
];

export const addons: Addon[] = [
  {
    id: 'eva',
    name: 'EVA Experience',
    description: 'Guided spacewalk outside the station',
    price: 50000,
    icon: '🚀'
  },
  {
    id: 'photography',
    name: 'Space Photography',
    description: 'Professional photos of your space journey',
    price: 15000,
    icon: '📸'
  },
  {
    id: 'fitness',
    name: 'Zero-G Fitness',
    description: 'Personal trainer for zero gravity workouts',
    price: 25000,
    icon: '💪'
  },
  {
    id: 'dining',
    name: 'Gourmet Dining',
    description: 'Michelin-starred meals prepared in space',
    price: 35000,
    icon: '🍽️'
  }
];

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookingData: initialBookingData,
  currentStep: 1,

  updateBookingData: (data) =>
    set((state) => ({
      bookingData: { ...state.bookingData, ...data }
    })),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 5)
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1)
    })),

  getTotalPrice: () => {
    const { bookingData } = get();
    const selectedSuite = suites.find(s => s.id === bookingData.suite);
    const selectedAddons = addons.filter(a => bookingData.addons.includes(a.id));
    
    const suitePrice = selectedSuite?.price || 0;
    const addonsPrice = selectedAddons.reduce((total, addon) => total + addon.price, 0);
    
    return suitePrice + addonsPrice;
  },

  getSelectedSuite: () => {
    const { bookingData } = get();
    return suites.find(s => s.id === bookingData.suite);
  },

  getSelectedAddons: () => {
    const { bookingData } = get();
    return addons.filter(a => bookingData.addons.includes(a.id));
  },

  completeBooking: () => {
    // Here you would typically send the booking data to your backend
    console.log('Booking completed:', get().bookingData);
    // Reset to initial state after completion
    set({ bookingData: initialBookingData, currentStep: 1 });
  },

  resetBooking: () =>
    set({ bookingData: initialBookingData, currentStep: 1 })
}));
