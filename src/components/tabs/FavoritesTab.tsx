
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Waves, Thermometer, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const FavoritesTab: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch favorite beaches
  const { data: favoriteBeaches, isLoading } = useQuery({
    queryKey: ['favorite-beaches'],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_favorite_beaches')
        .select(`
          beach_id,
          beaches (
            *,
            beach_conditions (
              occupancy_level,
              occupancy_status,
              water_temperature,
              water_clarity,
              water_quality_score,
              weather_condition,
              air_temperature
            )
          )
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Remove favorite mutation
  const removeFavoriteMutation = useMutation({
    mutationFn: async (beachId: string) => {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('user_favorite_beaches')
        .delete()
        .eq('user_id', user.id)
        .eq('beach_id', beachId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorite-beaches'] });
      queryClient.invalidateQueries({ queryKey: ['user-favorites'] });
      toast({
        title: "Eliminado de favoritos",
        description: "La playa ha sido removida de tus favoritos",
      });
    },
  });

  const getWaterQualityStars = (score: number) => {
    const stars = Math.round((score / 100) * 5);
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < stars ? 'text-gold-500 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <Heart className="w-16 h-16 text-coral-300" />
        <h2 className="text-2xl font-serif font-bold text-navy-800 dark:text-ivory-100">
          {t('signInRequired')}
        </h2>
        <p className="text-navy-600 dark:text-navy-300 max-w-sm">
          {t('signInToSaveFavorites')}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-ivory-200 dark:bg-navy-800 rounded-xl animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (!favoriteBeaches?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <Heart className="w-16 h-16 text-coral-300" />
        <h2 className="text-2xl font-serif font-bold text-navy-800 dark:text-ivory-100">
          {t('noFavoritesYet')}
        </h2>
        <p className="text-navy-600 dark:text-navy-300 max-w-sm">
          {t('startAddingFavorites')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif font-bold text-navy-800 dark:text-ivory-100">
          {t('favorites')}
        </h1>
        <p className="text-navy-600 dark:text-navy-300">
          {t('yourFavoriteBeaches')}
        </p>
      </div>

      {/* Favorites List */}
      <div className="space-y-4">
        {favoriteBeaches.map((favorite) => {
          const beach = favorite.beaches;
          const condition = beach.beach_conditions?.[0];
          
          return (
            <Card key={beach.id} className="luxury-card overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  {/* Image placeholder */}
                  <div className="w-24 h-24 bg-gradient-to-br from-coral-400 to-coral-600 flex-shrink-0">
                    <div className="w-full h-full bg-black/20 flex items-center justify-center">
                      <Waves className="w-8 h-8 text-white/70" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-serif font-semibold text-navy-800 dark:text-ivory-100 leading-tight">
                          {beach.name}
                        </h3>
                        <div className="flex items-center mt-1 text-sm text-navy-600 dark:text-navy-300">
                          <MapPin className="w-3 h-3 mr-1" />
                          {beach.location}
                        </div>
                        
                        {/* Conditions */}
                        <div className="flex items-center space-x-3 mt-2">
                          <div className="flex items-center space-x-1">
                            <Thermometer className="w-3 h-3 text-coral-500" />
                            <span className="text-xs text-navy-600 dark:text-navy-300">
                              {Math.round(condition?.air_temperature || 0)}°C
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-navy-600 dark:text-navy-300">
                              {t('waterTemp')}: {Math.round(condition?.water_temperature || 0)}°C
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            {getWaterQualityStars(condition?.water_quality_score || 0)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFavoriteMutation.mutate(beach.id)}
                        className="ml-2 h-8 w-8 p-0 hover:bg-coral-100 dark:hover:bg-coral-900/20"
                      >
                        <Heart className="w-4 h-4 text-coral-500 fill-current" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritesTab;
