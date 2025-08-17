import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { CyberButton } from '@/components/ui/cyber-button';
import { CyberInput } from '@/components/ui/cyber-input';
import { CyberTextarea } from '@/components/ui/cyber-textarea';
import MatrixBackground from '@/components/MatrixBackground';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    pronouns: '',
    bio: '',
    musicUrl: '',
    color: '#00ffff',
    avatar: '🤖'
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "PASSWORD MISMATCH",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const success = await register(formData);
      if (success) {
        toast({
          title: "ACCOUNT CREATED",
          description: "Welcome to the digital realm",
        });
        navigate('/');
      } else {
        toast({
          title: "REGISTRATION FAILED",
          description: "Username already exists",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "SYSTEM ERROR",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative py-8">
      <MatrixBackground />
      
      <div className="w-full max-w-md p-8 border-2 border-cyber-cyan bg-black/90 glow-cyan">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-cyber-header font-black text-cyber-cyan mb-2 tracking-wider">
            REGISTER.EXE
          </h1>
          <p className="text-cyber-green text-sm">
            &gt;&gt;&gt; Create your digital identity &lt;&lt;&lt;
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <CyberInput
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            placeholder="Username"
            required
          />
          
          <CyberInput
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            placeholder="Password"
            required
          />
          
          <CyberInput
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            placeholder="Confirm Password"
            required
          />
          
          <CyberInput
            type="text"
            value={formData.pronouns}
            onChange={(e) => setFormData({...formData, pronouns: e.target.value})}
            placeholder="Pronouns (optional)"
          />
          
          <CyberTextarea
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            placeholder="Bio (optional)"
            rows={3}
          />

          <CyberButton 
            type="submit" 
            className="w-full" 
            disabled={loading}
            variant="cyber"
          >
            {loading ? 'CREATING...' : 'CREATE ACCOUNT >'}
          </CyberButton>
        </form>

        <div className="mt-6 text-center">
          <div className="cyber-divider mb-4"></div>
          <p className="text-cyber-green text-sm">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-cyber-magenta hover:text-cyber-cyan transition-colors underline"
            >
              LOGIN HERE
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;