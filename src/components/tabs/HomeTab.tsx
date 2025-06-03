
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, Droplets, Wind, Eye, ThermometerSun, Waves } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const HomeTab: React.FC = () => {
  const { t } = useLanguage();

  // Fetch beach conditions data
  const { data: beachConditions, isLoading } = useQuery({
    queryKey: ['beach-conditions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('beach_conditions')
        .select(`
          *,
          beaches:beach_id (name, location)
        `)
        .limit(1)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-48 bg-ivory-200 dark:bg-navy-800 rounded-2xl"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-32 bg-ivory-200 dark:bg-navy-800 rounded-xl"></div>
          <div className="h-32 bg-ivory-200 dark:bg-navy-800 rounded-xl"></div>
        </div>
      </div>
    );
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-8 h-8 text-gold-500" />;
      case 'partly_cloudy': return <Sun className="w-8 h-8 text-gold-400" />;
      default: return <Sun className="w-8 h-8 text-gold-500" />;
    }
  };

  const getOccupancyColor = (level: number) => {
    if (level < 30) return 'text-green-500 bg-green-50 dark:bg-green-900/20';
    if (level < 60) return 'text-gold-600 bg-gold-50 dark:bg-gold-900/20';
    if (level < 80) return 'text-coral-500 bg-coral-50 dark:bg-coral-900/20';
    return 'text-red-500 bg-red-50 dark:bg-red-900/20';
  };

  const getWaterQualityColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-gold-600';
    if (score >= 40) return 'text-coral-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif font-bold text-navy-800 dark:text-ivory-100">
          {t('welcomeToSolymar')}
        </h1>
        <p className="text-navy-600 dark:text-navy-300">
          {t('todaysBeachConditions')}
        </p>
      </div>

      {/* Main Weather Card */}
      <Card className="luxury-card overflow-hidden">
        <div className="sunset-gradient p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif font-bold">
                {beachConditions?.beaches?.name || 'Playa Principal'}
              </h2>
              <p className="text-white/90">
                {beachConditions?.beaches?.location || 'Ubicación'}
              </p>
            </div>
            {getWeatherIcon(beachConditions?.weather_condition || 'sunny')}
          </div>
          
          <div className="mt-6 flex items-end space-x-4">
            <div className="text-5xl font-bold">
              {Math.round(beachConditions?.air_temperature || 28)}°C
            </div>
            <div className="pb-2 space-y-1">
              <div className="flex items-center space-x-2">
                <ThermometerSun className="w-4 h-4" />
                <span className="text-sm">Agua: {Math.round(beachConditions?.water_temperature || 24)}°C</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span className="text-sm">UV: {beachConditions?.uv_index || 8}/10</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Occupancy */}
        <Card className="luxury-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600 dark:text-navy-300">
              {t('beachOccupancy')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className={`text-2xl font-bold ${getOccupancyColor(beachConditions?.occupancy_level || 0).split(' ')[0]}`}>
                {beachConditions?.occupancy_level || 0}%
              </div>
              <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getOccupancyColor(beachConditions?.occupancy_level || 0)}`}>
                {t(beachConditions?.occupancy_status || 'low')}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Water Quality */}
        <Card className="luxury-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600 dark:text-navy-300">
              {t('waterQuality')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className={`text-2xl font-bold ${getWaterQualityColor(beachConditions?.water_quality_score || 0)}`}>
                {beachConditions?.water_quality_score || 0}/100
              </div>
              <div className="flex items-center space-x-2">
                <Waves className="w-4 h-4 text-navy-500" />
                <span className="text-sm text-muted-foreground capitalize">
                  {t(beachConditions?.water_clarity || 'good')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wind */}
        <Card className="luxury-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600 dark:text-navy-300">
              {t('windSpeed')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3">
              <Wind className="w-6 h-6 text-navy-500" />
              <div>
                <div className="text-xl font-bold text-navy-800 dark:text-ivory-100">
                  {Math.round(beachConditions?.wind_speed || 0)} km/h
                </div>
                <div className="text-xs text-muted-foreground">
                  {t('lightBreeze')}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Humidity */}
        <Card className="luxury-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600 dark:text-navy-300">
              {t('humidity')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3">
              <Droplets className="w-6 h-6 text-blue-500" />
              <div>
                <div className="text-xl font-bold text-navy-800 dark:text-ivory-100">
                  {beachConditions?.humidity || 0}%
                </div>
                <div className="text-xs text-muted-foreground">
                  {t('comfortable')}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeTab;
