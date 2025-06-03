
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, TrendingDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface OccupancyLevel {
  level: 'low' | 'moderate' | 'high' | 'veryHigh';
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

const OccupancyCard: React.FC = () => {
  const { t } = useLanguage();
  
  // Simulated data - in real app this would come from API
  const occupancy: OccupancyLevel = {
    level: 'moderate',
    percentage: 65,
    trend: 'up'
  };

  const getOccupancyColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-500';
      case 'moderate': return 'text-yellow-500';
      case 'high': return 'text-orange-500';
      case 'veryHigh': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getOccupancyBg = (level: string) => {
    switch (level) {
      case 'low': return 'from-green-400 to-green-600';
      case 'moderate': return 'from-yellow-400 to-yellow-600';
      case 'high': return 'from-orange-400 to-orange-600';
      case 'veryHigh': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{t('beachOccupancy')}</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{occupancy.percentage}%</div>
            <div className={`flex items-center text-sm ${getOccupancyColor(occupancy.level)}`}>
              {occupancy.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : occupancy.trend === 'down' ? (
                <TrendingDown className="w-4 h-4 mr-1" />
              ) : null}
              {t(occupancy.level)}
            </div>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 bg-gradient-to-r ${getOccupancyBg(occupancy.level)} rounded-full transition-all duration-500`}
              style={{ width: `${occupancy.percentage}%` }}
            />
          </div>
          
          <div className="text-xs text-muted-foreground">
            Actualizado hace 5 minutos
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OccupancyCard;
