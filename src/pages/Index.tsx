
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthScreen from '@/components/auth/AuthScreen';
import BottomNavigation from '@/components/BottomNavigation';
import HomeTab from '@/components/tabs/HomeTab';
import BeachesTab from '@/components/tabs/BeachesTab';
import FavoritesTab from '@/components/tabs/FavoritesTab';
import ExploreTab from '@/components/tabs/ExploreTab';
import ProfileTab from '@/components/tabs/ProfileTab';

const Index = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  if (loading) {
    return (
      <div className="min-h-screen luxury-gradient flex items-center justify-center">
        <div className="w-16 h-16 ocean-gradient rounded-full animate-pulse"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'beaches':
        return <BeachesTab />;
      case 'favorites':
        return <FavoritesTab />;
      case 'explore':
        return <ExploreTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen luxury-gradient">
      <div className="container mx-auto px-4 pb-20 pt-6">
        {renderActiveTab()}
      </div>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
