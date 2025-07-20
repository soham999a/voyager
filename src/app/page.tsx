'use client';

import { useEffect, useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import LoginScreen from '@/components/auth/LoginScreen';
import CommandDashboard from '@/components/dashboard/CommandDashboard';
import LoadingScreen from '@/components/ui/LoadingScreen';

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false);
  const user = useDashboardStore((state) => state.user);
  const isLoading = useDashboardStore((state) => state.isLoading);

  useEffect(() => {
    // Initialize the dashboard
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isInitialized || isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LoginScreen />;
  }

  return <CommandDashboard />;
}
