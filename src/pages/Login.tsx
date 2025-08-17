import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { CyberButton } from '@/components/ui/cyber-button';
import { CyberInput } from '@/components/ui/cyber-input';
import MatrixBackground from '@/components/MatrixBackground';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        toast({
          title: "ACCESS GRANTED",
          description: "Welcome back to the digital realm",
        });
        navigate('/');
      } else {
        toast({
          title: "ACCESS DENIED",
          description: "Invalid credentials. Try demo_user/password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "SYSTEM ERROR",
        description: "Login failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <MatrixBackground />
      
      <div className="w-full max-w-md p-8 border-2 border-cyber-cyan bg-black/90 glow-cyan">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-cyber-header font-black text-cyber-cyan mb-2 tracking-wider">
            LOGIN.EXE
          </h1>
          <p className="text-cyber-green text-sm">
            &gt;&gt;&gt; Enter your credentials to access the terminal &lt;&lt;&lt;
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-cyber-cyan text-sm font-cyber-header mb-2">
              USERNAME:
            </label>
            <CyberInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username..."
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-cyber-cyan text-sm font-cyber-header mb-2">
              PASSWORD:
            </label>
            <CyberInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              required
              disabled={loading}
            />
          </div>

          <CyberButton 
            type="submit" 
            className="w-full" 
            disabled={loading}
            variant="cyber"
          >
            {loading ? 'AUTHENTICATING...' : 'ACCESS SYSTEM >'}
          </CyberButton>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm mb-4">
            Demo credentials: demo_user / password
          </p>
          <div className="cyber-divider mb-4"></div>
          <p className="text-cyber-green text-sm">
            New to the system?{' '}
            <Link 
              to="/register" 
              className="text-cyber-magenta hover:text-cyber-cyan transition-colors underline"
            >
              CREATE ACCOUNT
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;