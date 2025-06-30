
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ThemeSelector from './ThemeSelector';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading time for smooth transition
    setTimeout(() => {
      const success = login(username, password);
      if (!success) {
        setError('Invalid credentials. Use username: rst, password: big fan of RS');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-electric relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse-neon"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-neon"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Theme Selector */}
        <div className="flex justify-center mb-8">
          <ThemeSelector />
        </div>

        <Card className="glass-card border-primary/30 hover-lift">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-electric rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">RST</span>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Welcome to RST
            </CardTitle>
            <p className="text-muted-foreground">
              Enter your credentials to access your learning portal
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Username</label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-background/50 border-primary/30 focus:border-primary"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50 border-primary/30 focus:border-primary"
                  placeholder="Enter password"
                  required
                />
              </div>

              {error && (
                <div className="text-destructive text-sm text-center bg-destructive/10 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-electric hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 neon-glow"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Logging in...
                  </div>
                ) : (
                  'Login'
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground mt-4">
                <p>Demo credentials:</p>
                <p className="text-primary">Username: rst</p>
                <p className="text-primary">Password: big fan of RS</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
