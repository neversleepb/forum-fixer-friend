import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types/forum';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string; confirmPassword: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for the system
const defaultUsers: Record<string, User & { password: string }> = {
  'demo_user': {
    id: '1',
    username: 'demo_user',
    password: 'password',
    color: '#00ffff',
    avatar: '🤖',
    pronouns: 'they/them',
    bio: 'Digital wanderer in the cyber realm',
    musicUrl: '',
    createdAt: '2025-01-01T00:00:00Z'
  },
  'PixelDreamer': {
    id: '2',
    username: 'PixelDreamer',
    password: 'pixel123',
    color: '#ff00ff',
    avatar: '👾',
    pronouns: 'she/her',
    bio: 'Lost in the digital void',
    musicUrl: '',
    createdAt: '2025-01-01T00:00:00Z'
  },
  'CyberNomad': {
    id: '3',
    username: 'CyberNomad',
    password: 'cyber123',
    color: '#00ffff',
    avatar: '🚀',
    pronouns: 'he/him',
    bio: 'Exploring virtual frontiers',
    musicUrl: '',
    createdAt: '2025-01-01T00:00:00Z'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('cybervent_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({ user, isAuthenticated: true });
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('cybervent_user');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const users = getStoredUsers();
    const user = users[username];
    
    if (user && user.password === password) {
      const { password: _, ...userWithoutPassword } = user;
      setAuthState({ user: userWithoutPassword, isAuthenticated: true });
      localStorage.setItem('cybervent_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (userData: Partial<User> & { password: string; confirmPassword: string }): Promise<boolean> => {
    if (userData.password !== userData.confirmPassword) {
      return false;
    }

    const users = getStoredUsers();
    if (users[userData.username!]) {
      return false; // User already exists
    }

    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      username: userData.username!,
      password: userData.password,
      color: userData.color || '#00ffff',
      avatar: userData.avatar || '🤖',
      pronouns: userData.pronouns || '',
      bio: userData.bio || '',
      musicUrl: userData.musicUrl || '',
      createdAt: new Date().toISOString()
    };

    users[userData.username!] = newUser;
    saveUsers(users);

    const { password: _, ...userWithoutPassword } = newUser;
    setAuthState({ user: userWithoutPassword, isAuthenticated: true });
    localStorage.setItem('cybervent_user', JSON.stringify(userWithoutPassword));
    return true;
  };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false });
    localStorage.removeItem('cybervent_user');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (!authState.user) return;

    const updatedUser = { ...authState.user, ...userData };
    setAuthState({ user: updatedUser, isAuthenticated: true });
    localStorage.setItem('cybervent_user', JSON.stringify(updatedUser));

    // Update in users storage
    const users = getStoredUsers();
    if (users[authState.user.username]) {
      users[authState.user.username] = { ...users[authState.user.username], ...userData };
      saveUsers(users);
    }
  };

  const getStoredUsers = () => {
    const stored = localStorage.getItem('cybervent_users');
    return stored ? JSON.parse(stored) : defaultUsers;
  };

  const saveUsers = (users: Record<string, User & { password: string }>) => {
    localStorage.setItem('cybervent_users', JSON.stringify(users));
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};