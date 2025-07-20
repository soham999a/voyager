# 🚀 Voyager Station - Luxury Space Hotel Website

A futuristic, ultra-premium website for a fictional luxury space hotel called **Voyager Station**, inspired by real concepts by Orbital Assembly Corporation. This immersive, cinematic website feels like booking a space vacation in the year 2035.

![Voyager Station](https://img.shields.io/badge/Status-Demo-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-cyan)

## 🌌 Overview

Voyager Station represents the ultimate luxury space travel experience, featuring:

- **Hyper-futuristic design** with glassmorphism and neon glows
- **Interactive 3D station tour** using Three.js and React Three Fiber
- **Immersive animations** with Framer Motion
- **Complete booking flow** with state management
- **Live Earth view simulation** with orbital tracking
- **Crew profiles and testimonials**
- **Responsive design** for all devices

## ✨ Features

### 🎨 Design & UX
- **Dark space theme** with deep blacks and cosmic colors
- **Glassmorphism effects** for cards and panels
- **Smooth animations** and parallax scrolling
- **Starfield background** with animated nebula effects
- **Futuristic typography** using Orbitron and Inter fonts

### 🚀 Interactive Elements
- **3D Station Model** - Rotate, zoom, and explore the space station

## 🚀 Quick Start

### Option 1: Easy Start (Windows)
Double-click `START-VOYAGER.bat` to launch the development server.

### Option 2: Manual Start
```bash
# Make sure Node.js is in your PATH
npm run dev
```

The server will start at **http://localhost:3001**

## 🎮 Usage

1. **Launch the Station**: Run the development server
2. **Navigate Systems**: Use the command interface to access different modules
3. **Monitor Status**: Real-time system monitoring and alerts
4. **Interactive 3D**: Explore the 3D space station environment

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start development server (port 3001)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```
- **Booking System** - Complete 5-step reservation process
- **Live Earth Tracking** - Simulated orbital position updates
- **Crew Profiles** - Meet the astronaut team
- **Guest Testimonials** - Reviews from space travelers

### 🛠️ Technical Features
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Three.js** for 3D graphics
- **Zustand** for state management
- **Responsive design** with mobile-first approach

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (portable version included)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd voyager-station
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` with your API keys (optional for demo)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
voyager-station/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css      # Global styles with space theme
│   │   ├── layout.tsx       # Root layout with metadata
│   │   └── page.tsx         # Main page component
│   ├── components/          # React components
│   │   ├── 3d/             # Three.js components
│   │   │   └── StationModel.tsx
│   │   ├── sections/        # Page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── BookingFlow.tsx
│   │   │   ├── CrewSection.tsx
│   │   │   └── LiveEarthView.tsx
│   │   └── ui/             # UI components
│   │       ├── Navigation.tsx
│   │       └── Footer.tsx
│   ├── lib/                # Utilities
│   │   └── utils.ts
│   └── store/              # State management
│       └── useBookingStore.ts
├── public/                 # Static assets
├── .env.local             # Environment variables
└── package.json           # Dependencies
```

## 🎯 Key Components

### Hero Section
- Animated space station background
- Floating particles and Earth visualization
- Call-to-action buttons with hover effects
- Station statistics display

### 3D Station Tour
- Interactive Three.js model
- Clickable hotspots for different areas
- Orbital controls for navigation
- Real-time information panels

### Booking Flow
- 5-step reservation process
- Suite selection with pricing
- Date and guest selection
- Add-on experiences
- Profile creation
- Booking confirmation

### Live Earth View
- Simulated ISS position tracking
- Orbital data display
- Connection status indicators
- Earth facts and statistics

## 🌟 Customization

### Colors
The color scheme can be customized in `globals.css`:
```css
:root {
  --primary: #00d4ff;      /* Cyan */
  --secondary: #8b5cf6;    /* Purple */
  --accent: #ff6b9d;       /* Pink */
}
```

### Fonts
Typography uses Google Fonts:
- **Orbitron** - Futuristic headings
- **Inter** - Clean body text

### Animations
Framer Motion animations can be customized in individual components or using the utilities in `lib/utils.ts`.

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# API Keys (optional for demo)
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_NASA_API_KEY=your_nasa_api_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key

# Firebase (optional)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# App Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Voyager Station"
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Other Platforms
```bash
npm run build
npm run start
```

## 🎨 Design Inspiration

- **Tesla** - Clean, futuristic interface
- **Apple Vision Pro** - Spatial design elements
- **SpaceX** - Space exploration aesthetics
- **Orbital Assembly Corporation** - Real space station concepts

## 🤝 Contributing

This is a demonstration project, but contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is for demonstration purposes. The Voyager Station concept is fictional and inspired by real space tourism developments.

## 🌟 Acknowledgments

- **Orbital Assembly Corporation** for space station inspiration
- **NASA** for space imagery and data
- **Three.js** community for 3D graphics resources
- **Framer Motion** for animation capabilities

---

**Experience the future of luxury travel at Voyager Station - Your Next Vacation is in Orbit! 🚀**
