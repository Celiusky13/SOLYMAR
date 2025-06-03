
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Star, Heart, Thermometer, Waves } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const BeachesTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const filters = [
    { id: 'all', label: t('all') },
    { id: 'low', label: t('low') },
    { id: 'moderate', label: t('moderate') },
    { id: 'high', label: t('high') },
  ];

  // Fetch beaches with conditions
  const { data: beaches, isLoading } = useQuery({
    queryKey: ['beaches-with-conditions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('beaches')
        .select(`
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
        `);
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch user favorites
  const { data: favorites = [] } = useQuery({
    queryKey: ['user-favorites'],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_favorite_beaches')
        .select('beach_id')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data.map(fav => fav.beach_id);
    },
    enabled: !!user,
  });

  // Toggle favorite mutation
  const toggleFavoriteMutation = useMutation({
    mutationFn: async ({ beachId, isFavorite }: { beachId: string; isFavorite: boolean }) => {
      if (!user) throw new Error('User not authenticated');

      if (isFavorite) {
        const { error } = await supabase
          .from('user_favorite_beaches')
          .delete()
          .eq('user_id', user.id)
          .eq('beach_id', beachId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('user_favorite_beaches')
          .insert({ user_id: user.id, beach_id: beachId });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-favorites'] });
      toast({
        title: "¡Actualizado!",
        description: "Tus favoritos han sido actualizados",
      });
    },
  });

  const filteredBeaches = beaches?.filter(beach => {
    const matchesSearch = beach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beach.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    
    const condition = beach.beach_conditions?.[0];
    return matchesSearch && condition?.occupancy_status === selectedFilter;
  });

  const getOccupancyColor = (status: string) => {
    switch (status) {
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'moderate': return 'bg-gold-100 text-gold-700 dark:bg-gold-900/20 dark:text-gold-400';
      case 'high': return 'bg-coral-100 text-coral-700 dark:bg-coral-900/20 dark:text-coral-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getWaterQualityStars = (score: number) => {
    const stars = Math.round((score / 100) * 5);
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < stars ? 'text-gold-500 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-ivory-200 dark:bg-navy-800 rounded-xl animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif font-bold text-navy-800 dark:text-ivory-100">
          {t('beaches')}
        </h1>
        <p className="text-navy-600 dark:text-navy-300">
          {t('discoverBeaches')}
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-400 w-4 h-4" />
        <Input
          placeholder={t('searchBeaches')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-ivory-50 dark:bg-navy-800 border-ivory-300 dark:border-navy-600"
        />
      </div>

      {/* Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={selectedFilter === filter.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter(filter.id)}
            className={`whitespace-nowrap ${
              selectedFilter === filter.id 
                ? 'ocean-gradient text-white' 
                : 'border-ivory-300 dark:border-navy-600'
            }`}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Beaches List */}
      <div className="space-y-4">
        {filteredBeaches?.map((beach) => {
          const condition = beach.beach_conditions?.[0];
          const isFavorite = favorites.includes(beach.id);
          
          return (
            <Card key={beach.id} className="luxury-card overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  {/* Image placeholder */}
                  <div className="w-24 h-24 bg-gradient-to-br from-navy-400 to-navy-600 flex-shrink-0">
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
                          <Badge className={`text-xs ${getOccupancyColor(condition?.occupancy_status || 'low')}`}>
                            {condition?.occupancy_level || 0}% {t('occupancy')}
                          </Badge>
                          
                          <div className="flex items-center space-x-1">
                            <Thermometer className="w-3 h-3 text-coral-500" />
                            <span className="text-xs text-navy-600 dark:text-navy-300">
                              {Math.round(condition?.air_temperature || 0)}°C
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            {getWaterQualityStars(condition?.water_quality_score || 0)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Favorite Button */}
                      {user && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavoriteMutation.mutate({ 
                            beachId: beach.id, 
                            isFavorite 
                          })}
                          className="ml-2 h-8 w-8 p-0"
                        >
                          <Heart 
                            className={`w-4 h-4 ${
                              isFavorite 
                                ? 'text-coral-500 fill-current' 
                                : 'text-navy-400'
                            }`} 
                          />
                        </Button>
                      )}
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

export default BeachesTab;
