
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Sun, CloudRain, Wind, Droplets, Eye } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
}

const WeatherCard: React.FC = () => {
  const { t } = useLanguage();
  
  // Simulated data
  const weather: WeatherData = {
    temperature: 28,
    humidity: 72,
    windSpeed: 15,
    uvIndex: 8,
    condition: 'sunny'
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-8 h-8 text-blue-500" />;
      default: return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{t('currentWeather')}</CardTitle>
        {getWeatherIcon(weather.condition)}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">{weather.temperature}°C</div>
            <div className="text-sm text-muted-foreground capitalize">
              {weather.condition}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span className="text-muted-foreground">{t('humidity')}</span>
              <span className="font-medium">{weather.humidity}%</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Wind className="w-4 h-4 text-gray-500" />
              <span className="text-muted-foreground">{t('windSpeed')}</span>
              <span className="font-medium">{weather.windSpeed} km/h</span>
            </div>
            
            <div className="flex items-center space-x-2 col-span-2">
              <Eye className="w-4 h-4 text-orange-500" />
              <span className="text-muted-foreground">{t('uvIndex')}</span>
              <span className="font-medium">{weather.uvIndex}/10</span>
              <span className="text-xs text-orange-500">Alto</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
