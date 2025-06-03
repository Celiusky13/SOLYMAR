
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Settings, Globe, Moon, Sun, LogOut, Heart, Waves } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ProfileTab: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user profile
  const { data: profile } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch user stats
  const { data: stats } = useQuery({
    queryKey: ['user-stats'],
    queryFn: async () => {
      if (!user) return { favoritesCount: 0 };
      
      const { count, error } = await supabase
        .from('user_favorite_beaches')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      
      if (error) throw error;
      return { favoritesCount: count || 0 };
    },
    enabled: !!user,
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async ({ language: newLanguage, theme: newTheme }: { language?: string; theme?: string }) => {
      if (!user) throw new Error('User not authenticated');

      const updates: any = {};
      if (newLanguage) updates.preferred_language = newLanguage;
      if (newTheme) updates.preferred_theme = newTheme;

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      toast({
        title: "Configuración actualizada",
        description: "Tus preferencias han sido guardadas",
      });
    },
  });

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as 'es' | 'en' | 'de');
    if (user) {
      updateProfileMutation.mutate({ language: newLanguage });
    }
  };

  const handleThemeToggle = () => {
    toggleTheme();
    if (user) {
      updateProfileMutation.mutate({ theme: theme === 'light' ? 'dark' : 'light' });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <User className="w-16 h-16 text-navy-300" />
        <h2 className="text-2xl font-serif font-bold text-navy-800 dark:text-ivory-100">
          {t('signInRequired')}
        </h2>
        <p className="text-navy-600 dark:text-navy-300 max-w-sm">
          {t('signInToAccessProfile')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif font-bold text-navy-800 dark:text-ivory-100">
          {t('profile')}
        </h1>
        <p className="text-navy-600 dark:text-navy-300">
          {t('manageYourPreferences')}
        </p>
      </div>

      {/* User Info Card */}
      <Card className="luxury-card">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 ocean-gradient rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-navy-800 dark:text-ivory-100">
                {profile?.username || user.email?.split('@')[0]}
              </CardTitle>
              <p className="text-sm text-navy-600 dark:text-navy-300">
                {user.email}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-ivory-50 dark:bg-navy-800 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Heart className="w-4 h-4 text-coral-500 mr-1" />
                <span className="text-lg font-bold text-navy-800 dark:text-ivory-100">
                  {stats?.favoritesCount || 0}
                </span>
              </div>
              <p className="text-xs text-navy-600 dark:text-navy-300">
                {t('favoriteBeaches')}
              </p>
            </div>
            <div className="text-center p-3 bg-ivory-50 dark:bg-navy-800 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Waves className="w-4 h-4 text-navy-500 mr-1" />
                <span className="text-lg font-bold text-navy-800 dark:text-ivory-100">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-navy-600 dark:text-navy-300">
                {t('memberSince')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Card */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle className="flex items-center text-navy-800 dark:text-ivory-100">
            <Settings className="w-5 h-5 mr-2" />
            {t('preferences')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Language Setting */}
          <div className="space-y-2">
            <Label className="flex items-center text-navy-700 dark:text-navy-200">
              <Globe className="w-4 h-4 mr-2" />
              {t('language')}
            </Label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="bg-ivory-50 dark:bg-navy-800 border-ivory-300 dark:border-navy-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">🇪🇸 Español</SelectItem>
                <SelectItem value="en">🇺🇸 English</SelectItem>
                <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Theme Setting */}
          <div className="flex items-center justify-between">
            <Label className="flex items-center text-navy-700 dark:text-navy-200">
              {theme === 'light' ? (
                <Sun className="w-4 h-4 mr-2" />
              ) : (
                <Moon className="w-4 h-4 mr-2" />
              )}
              {t('darkMode')}
            </Label>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={handleThemeToggle}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Button
        variant="outline"
        onClick={handleSignOut}
        className="w-full border-coral-300 text-coral-600 hover:bg-coral-50 dark:border-coral-600 dark:text-coral-400 dark:hover:bg-coral-900/20"
      >
        <LogOut className="w-4 h-4 mr-2" />
        {t('signOut')}
      </Button>
    </div>
  );
};

export default ProfileTab;
