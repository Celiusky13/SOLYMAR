
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import OccupancyCard from './OccupancyCard';
import WeatherCard from './WeatherCard';
import WaterQualityCard from './WaterQualityCard';
import { RefreshCw, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  const handleRefresh = () => {
    // Future: Implement data refresh
    console.log('Refreshing data...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-ocean-600 via-turquoise-500 to-ocean-700 bg-clip-text text-transparent">
            {t('welcome')}
          </h1>
          
          <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-6">
            <MapPin className="w-4 h-4" />
            <span>Playa del Carmen, México</span>
          </div>
          
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t('refresh')}</span>
          </Button>
        </div>

        {/* Main Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <OccupancyCard />
          <WeatherCard />
          <WaterQualityCard />
        </div>

        {/* Additional Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Beach Tips */}
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="w-2 h-2 bg-turquoise-500 rounded-full mr-2"></span>
              Consejos para hoy
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Usa protector solar SPF 30+ debido al alto índice UV</li>
              <li>• Buen momento para actividades acuáticas</li>
              <li>• Condiciones ideales para fotografía</li>
              <li>• Hidratación recomendada cada 30 minutos</li>
            </ul>
          </div>

          {/* Quick Stats */}
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="w-2 h-2 bg-sand-500 rounded-full mr-2"></span>
              Estadísticas rápidas
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-2xl font-bold text-ocean-600">8.2/10</div>
                <div className="text-muted-foreground">Calidad general</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-turquoise-600">142</div>
                <div className="text-muted-foreground">Visitantes hoy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-sand-600">6.2m</div>
                <div className="text-muted-foreground">Altura de olas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-coral-600">07:15</div>
                <div className="text-muted-foreground">Amanecer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
