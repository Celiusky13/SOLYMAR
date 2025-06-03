
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sun, Moon, Globe, Waves } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b glass-effect">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 ocean-gradient rounded-full flex items-center justify-center">
            <Waves className="w-5 h-5 text-white animate-wave" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-ocean-600 to-turquoise-600 bg-clip-text text-transparent">
            BeachInfo
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline-block">
                  {languages.find(lang => lang.code === language)?.flag}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as 'es' | 'en' | 'de')}
                  className={`flex items-center space-x-2 ${
                    language === lang.code ? 'bg-accent' : ''
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="flex items-center space-x-1"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </Button>

          {/* Future: Auth buttons will go here */}
        </div>
      </div>
    </header>
  );
};

export default Header;
