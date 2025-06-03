
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en' | 'de';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // Navigation
  home: { es: 'Inicio', en: 'Home', de: 'Startseite' },
  beaches: { es: 'Playas', en: 'Beaches', de: 'Strände' },
  favorites: { es: 'Favoritas', en: 'Favorites', de: 'Favoriten' },
  explore: { es: 'Explora', en: 'Explore', de: 'Entdecken' },
  profile: { es: 'Perfil', en: 'Profile', de: 'Profil' },

  // Auth
  welcomeToSolymar: { es: 'Tu refugio costero premium', en: 'Your premium coastal refuge', de: 'Ihr Premium-Küstenrefugium' },
  signIn: { es: 'Iniciar Sesión', en: 'Sign In', de: 'Anmelden' },
  signUp: { es: 'Registrarse', en: 'Sign Up', de: 'Registrieren' },
  createAccount: { es: 'Crear Cuenta', en: 'Create Account', de: 'Konto Erstellen' },
  signInDescription: { es: 'Accede a tu oasis costero personal', en: 'Access your personal coastal oasis', de: 'Zugang zu Ihrer persönlichen Küstenoase' },
  signUpDescription: { es: 'Únete a la experiencia Solymar', en: 'Join the Solymar experience', de: 'Treten Sie der Solymar-Erfahrung bei' },
  username: { es: 'Nombre de usuario', en: 'Username', de: 'Benutzername' },
  email: { es: 'Correo electrónico', en: 'Email', de: 'E-Mail' },
  password: { es: 'Contraseña', en: 'Password', de: 'Passwort' },
  enterUsername: { es: 'Introduce tu nombre de usuario', en: 'Enter your username', de: 'Geben Sie Ihren Benutzernamen ein' },
  enterEmail: { es: 'Introduce tu correo electrónico', en: 'Enter your email', de: 'Geben Sie Ihre E-Mail ein' },
  enterPassword: { es: 'Introduce tu contraseña', en: 'Enter your password', de: 'Geben Sie Ihr Passwort ein' },
  loading: { es: 'Cargando...', en: 'Loading...', de: 'Wird geladen...' },
  orContinueWith: { es: 'o continúa con', en: 'or continue with', de: 'oder fortfahren mit' },
  noAccount: { es: '¿No tienes cuenta?', en: "Don't have an account?", de: 'Haben Sie kein Konto?' },
  hasAccount: { es: '¿Ya tienes cuenta?', en: 'Already have an account?', de: 'Haben Sie bereits ein Konto?' },
  signUpLink: { es: 'Regístrate aquí', en: 'Sign up here', de: 'Hier registrieren' },
  signInLink: { es: 'Inicia sesión', en: 'Sign in', de: 'Anmelden' },
  signOut: { es: 'Cerrar Sesión', en: 'Sign Out', de: 'Abmelden' },

  // Home
  todaysBeachConditions: { es: 'Condiciones de playa de hoy', en: "Today's beach conditions", de: 'Heutige Strandbedingungen' },
  currentWeather: { es: 'Clima Actual', en: 'Current Weather', de: 'Aktuelles Wetter' },
  beachOccupancy: { es: 'Ocupación de Playa', en: 'Beach Occupancy', de: 'Strandbelegung' },
  waterQuality: { es: 'Calidad del Agua', en: 'Water Quality', de: 'Wasserqualität' },
  windSpeed: { es: 'Velocidad del Viento', en: 'Wind Speed', de: 'Windgeschwindigkeit' },
  humidity: { es: 'Humedad', en: 'Humidity', de: 'Luftfeuchtigkeit' },
  uvIndex: { es: 'Índice UV', en: 'UV Index', de: 'UV-Index' },
  waterTemp: { es: 'Temp. Agua', en: 'Water Temp', de: 'Wassertemp' },
  lightBreeze: { es: 'Brisa suave', en: 'Light breeze', de: 'Leichte Brise' },
  comfortable: { es: 'Cómodo', en: 'Comfortable', de: 'Komfortabel' },

  // Occupancy levels
  low: { es: 'Baja', en: 'Low', de: 'Niedrig' },
  moderate: { es: 'Moderada', en: 'Moderate', de: 'Mäßig' },
  high: { es: 'Alta', en: 'High', de: 'Hoch' },
  very_high: { es: 'Muy Alta', en: 'Very High', de: 'Sehr Hoch' },

  // Water clarity
  excellent: { es: 'Excelente', en: 'Excellent', de: 'Ausgezeichnet' },
  good: { es: 'Buena', en: 'Good', de: 'Gut' },
  fair: { es: 'Regular', en: 'Fair', de: 'Durchschnittlich' },
  poor: { es: 'Pobre', en: 'Poor', de: 'Schlecht' },

  // Beaches
  discoverBeaches: { es: 'Descubre playas excepcionales', en: 'Discover exceptional beaches', de: 'Entdecken Sie außergewöhnliche Strände' },
  searchBeaches: { es: 'Buscar playas...', en: 'Search beaches...', de: 'Strände suchen...' },
  all: { es: 'Todas', en: 'All', de: 'Alle' },
  occupancy: { es: 'ocupación', en: 'occupancy', de: 'Belegung' },

  // Favorites
  yourFavoriteBeaches: { es: 'Tus playas favoritas', en: 'Your favorite beaches', de: 'Ihre Lieblingsstrände' },
  signInRequired: { es: 'Inicia sesión requerido', en: 'Sign in required', de: 'Anmeldung erforderlich' },
  signInToSaveFavorites: { es: 'Inicia sesión para guardar tus playas favoritas', en: 'Sign in to save your favorite beaches', de: 'Melden Sie sich an, um Ihre Lieblingsstrände zu speichern' },
  noFavoritesYet: { es: 'Aún no tienes favoritos', en: 'No favorites yet', de: 'Noch keine Favoriten' },
  startAddingFavorites: { es: 'Comienza a agregar playas a tus favoritos desde la sección de playas', en: 'Start adding beaches to your favorites from the beaches section', de: 'Beginnen Sie, Strände zu Ihren Favoriten hinzuzufügen' },
  favoriteBeaches: { es: 'Playas Favoritas', en: 'Favorite Beaches', de: 'Lieblings-Strände' },

  // Explore
  discoverLuxuryCoastalLife: { es: 'Descubre la vida costera de lujo', en: 'Discover luxury coastal life', de: 'Entdecken Sie das luxuriöse Küstenleben' },
  dailyInspiration: { es: 'Inspiración Diaria', en: 'Daily Inspiration', de: 'Tägliche Inspiration' },
  elevateYourBeachExperience: { es: 'Eleva tu experiencia playera', en: 'Elevate your beach experience', de: 'Verbessern Sie Ihr Stranderlebnis' },
  lifeIsBeautifulQuote: { es: 'La vida es hermosa cuando abrazas la serenidad del mar', en: 'Life is beautiful when you embrace the serenity of the sea', de: 'Das Leben ist schön, wenn man die Ruhe des Meeres umarmt' },

  // Profile
  manageYourPreferences: { es: 'Gestiona tus preferencias', en: 'Manage your preferences', de: 'Verwalten Sie Ihre Einstellungen' },
  signInToAccessProfile: { es: 'Inicia sesión para acceder a tu perfil', en: 'Sign in to access your profile', de: 'Melden Sie sich an, um auf Ihr Profil zuzugreifen' },
  preferences: { es: 'Preferencias', en: 'Preferences', de: 'Einstellungen' },
  language: { es: 'Idioma', en: 'Language', de: 'Sprache' },
  darkMode: { es: 'Modo Oscuro', en: 'Dark Mode', de: 'Dunkler Modus' },
  memberSince: { es: 'Miembro desde', en: 'Member since', de: 'Mitglied seit' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
