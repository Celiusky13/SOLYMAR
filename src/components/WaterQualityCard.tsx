
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Thermometer, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WaterQuality {
  temperature: number;
  clarity: 'excellent' | 'good' | 'fair' | 'poor';
  warnings: string[];
}

const WaterQualityCard: React.FC = () => {
  const { t } = useLanguage();
  
  // Simulated data
  const waterQuality: WaterQuality = {
    temperature: 24,
    clarity: 'excellent',
    warnings: []
  };

  const getClarityColor = (clarity: string) => {
    switch (clarity) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-blue-500';
      case 'fair': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getClarityBg = (clarity: string) => {
    switch (clarity) {
      case 'excellent': return 'from-green-400 to-green-600';
      case 'good': return 'from-blue-400 to-blue-600';
      case 'fair': return 'from-yellow-400 to-yellow-600';
      case 'poor': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{t('waterQuality')}</CardTitle>
        <Waves className="h-4 w-4 text-turquoise-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">{t('waterTemp')}</span>
            </div>
            <span className="text-lg font-semibold">{waterQuality.temperature}°C</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('clarity')}</span>
              <span className={`text-sm font-medium ${getClarityColor(waterQuality.clarity)}`}>
                {t(waterQuality.clarity)}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 bg-gradient-to-r ${getClarityBg(waterQuality.clarity)} rounded-full transition-all duration-500`}
                style={{ 
                  width: waterQuality.clarity === 'excellent' ? '100%' : 
                         waterQuality.clarity === 'good' ? '75%' : 
                         waterQuality.clarity === 'fair' ? '50%' : '25%' 
                }}
              />
            </div>
          </div>
          
          {waterQuality.warnings.length > 0 && (
            <div className="flex items-start space-x-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
              <div className="text-xs text-yellow-700 dark:text-yellow-300">
                {waterQuality.warnings.join(', ')}
              </div>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground">
            Última medición: hace 15 minutos
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterQualityCard;
