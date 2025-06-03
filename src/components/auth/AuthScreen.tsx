
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Waves, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, username);
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen luxury-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="w-20 h-20 ocean-gradient rounded-full flex items-center justify-center mx-auto shadow-xl">
            <Waves className="w-10 h-10 text-white animate-wave" />
          </div>
          <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-navy-700 to-navy-500 bg-clip-text text-transparent">
            Solymar
          </h1>
          <p className="text-navy-600 dark:text-navy-300 font-medium">
            {t('welcomeToSolymar')}
          </p>
        </div>

        {/* Auth Form */}
        <Card className="luxury-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-serif text-center">
              {isLogin ? t('signIn') : t('createAccount')}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin ? t('signInDescription') : t('signUpDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="username">{t('username')}</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder={t('enterUsername')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-ivory-50 dark:bg-navy-800 border-ivory-300 dark:border-navy-600"
                    required={!isLogin}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('enterEmail')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-ivory-50 dark:bg-navy-800 border-ivory-300 dark:border-navy-600"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('enterPassword')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-ivory-50 dark:bg-navy-800 border-ivory-300 dark:border-navy-600"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full ocean-gradient text-white font-semibold py-3 hover:shadow-lg transition-all duration-300"
                disabled={loading}
              >
                {loading ? t('loading') : (isLogin ? t('signIn') : t('createAccount'))}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t('orContinueWith')}
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full border-ivory-300 dark:border-navy-600 hover:bg-ivory-50 dark:hover:bg-navy-800"
            >
              <Mail className="w-4 h-4 mr-2" />
              Google
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                {isLogin ? t('noAccount') : t('hasAccount')}
              </span>
              <Button
                type="button"
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-navy-600 dark:text-gold-400 font-semibold p-0 ml-1"
              >
                {isLogin ? t('signUpLink') : t('signInLink')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthScreen;
