
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Waves, Sun, Palmtree, Camera, Coffee } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ExploreTab: React.FC = () => {
  const { t } = useLanguage();

  const inspirationalContent = [
    {
      id: 1,
      title: 'Consejos para el Cuidado Solar Premium',
      description: 'Descubre los secretos de una protección solar elegante y efectiva',
      icon: Sun,
      color: 'from-gold-400 to-gold-600',
      tags: ['Cuidado', 'Solar', 'Premium']
    },
    {
      id: 2,
      title: 'Estilo Costero: Looks de Playa Sofisticados',
      description: 'Inspírate con los últimos trends en moda playera de lujo',
      icon: Sparkles,
      color: 'from-coral-400 to-coral-600',
      tags: ['Moda', 'Estilo', 'Lujo']
    },
    {
      id: 3,
      title: 'Fotografía Marina: Captura la Belleza',
      description: 'Técnicas profesionales para fotografiar paisajes costeros',
      icon: Camera,
      color: 'from-navy-400 to-navy-600',
      tags: ['Fotografía', 'Arte', 'Mar']
    },
    {
      id: 4,
      title: 'Wellness Costero: Meditación y Relajación',
      description: 'Encuentra tu paz interior con el sonido de las olas',
      icon: Waves,
      color: 'from-teal-400 to-teal-600',
      tags: ['Wellness', 'Meditación', 'Paz']
    },
    {
      id: 5,
      title: 'Gastronomía Playera Gourmet',
      description: 'Sabores del mar con un toque culinario refinado',
      icon: Coffee,
      color: 'from-amber-400 to-amber-600',
      tags: ['Gastronomía', 'Gourmet', 'Mar']
    },
    {
      id: 6,
      title: 'Destinos Secretos: Playas Exclusivas',
      description: 'Explora rincones paradisíacos poco conocidos',
      icon: Palmtree,
      color: 'from-emerald-400 to-emerald-600',
      tags: ['Destinos', 'Exclusivo', 'Paraíso']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif font-bold text-navy-800 dark:text-ivory-100">
          {t('explore')}
        </h1>
        <p className="text-navy-600 dark:text-navy-300">
          {t('discoverLuxuryCoastalLife')}
        </p>
      </div>

      {/* Featured Card */}
      <Card className="luxury-card overflow-hidden">
        <div className="sunset-gradient p-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold">
                {t('dailyInspiration')}
              </h2>
              <p className="text-white/90 text-sm">
                {t('elevateYourBeachExperience')}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Content Grid */}
      <div className="space-y-4">
        {inspirationalContent.map((item) => {
          const Icon = item.icon;
          
          return (
            <Card key={item.id} className="luxury-card hover:shadow-xl transition-all duration-300 cursor-pointer">
              <CardContent className="p-0">
                <div className="flex">
                  {/* Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${item.color} flex-shrink-0 flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-4">
                    <h3 className="font-serif font-semibold text-navy-800 dark:text-ivory-100 leading-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-navy-600 dark:text-navy-300 mb-3">
                      {item.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="text-xs bg-ivory-100 text-navy-600 dark:bg-navy-800 dark:text-navy-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottom Inspiration Quote */}
      <Card className="luxury-card">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-navy-800 dark:text-ivory-100">
            "{t('lifeIsBeautifulQuote')}"
          </CardTitle>
          <p className="text-sm text-navy-600 dark:text-navy-300 italic">
            - Solymar
          </p>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ExploreTab;
