
import React from 'react';
import { Home, Waves, Heart, User, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const { t } = useLanguage();

  const tabs = [
    { id: 'home', icon: Home, label: t('home'), color: 'text-navy-600' },
    { id: 'beaches', icon: Waves, label: t('beaches'), color: 'text-navy-600' },
    { id: 'favorites', icon: Heart, label: t('favorites'), color: 'text-coral-500' },
    { id: 'explore', icon: Compass, label: t('explore'), color: 'text-gold-600' },
    { id: 'profile', icon: User, label: t('profile'), color: 'text-navy-600' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-ivory-200 dark:border-navy-700">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 h-16 px-3 tab-transition ${
                isActive 
                  ? 'text-navy-700 dark:text-gold-400 bg-ivory-100 dark:bg-navy-800' 
                  : 'text-navy-400 hover:text-navy-600 dark:text-navy-300 dark:hover:text-gold-300'
              }`}
            >
              <Icon 
                className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform duration-200`} 
              />
              <span className="text-xs font-medium leading-none">
                {tab.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
