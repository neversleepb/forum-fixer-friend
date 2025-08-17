export interface User {
  id: string;
  username: string;
  email?: string;
  color: string;
  avatar: string;
  pronouns?: string;
  bio?: string;
  musicUrl?: string;
  createdAt: string;
}

export interface VentPost {
  id: string;
  userId: string;
  username: string;
  user: {
    color: string;
    avatar: string;
    pronouns?: string;
  };
  mood: string;
  content: string;
  timestamp: string;
  supports: number;
  supportedBy: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}