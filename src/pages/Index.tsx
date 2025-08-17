import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { CyberButton } from '@/components/ui/cyber-button';
import { CyberInput } from '@/components/ui/cyber-input';
import { CyberTextarea } from '@/components/ui/cyber-textarea';
import { CyberSelect } from '@/components/ui/cyber-select';
import MatrixBackground from '@/components/MatrixBackground';
import { VentPost } from '@/types/forum';

const Index = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [vents, setVents] = useState<VentPost[]>([]);
  const [newVent, setNewVent] = useState({ mood: 'frustrated', content: '' });

  // Sample data
  useEffect(() => {
    setVents([
      {
        id: '1',
        userId: '2',
        username: 'PixelDreamer',
        user: { color: '#ff00ff', avatar: '👾', pronouns: 'she/her' },
        mood: 'frustrated',
        content: 'Working from home is driving me insane. The line between work and life has completely disappeared and I feel like I\'m always "on". Anyone else feeling this way?',
        timestamp: '2025-08-17 14:30',
        supports: 23,
        supportedBy: []
      },
      {
        id: '2',
        userId: '3',
        username: 'CyberNomad',
        user: { color: '#00ffff', avatar: '🚀', pronouns: 'he/him' },
        mood: 'anxious',
        content: 'Job interview tomorrow and I can\'t sleep. Keep running through all the ways it could go wrong. Why does my brain do this to me?',
        timestamp: '2025-08-17 13:45',
        supports: 18,
        supportedBy: []
      }
    ]);
  }, []);

  const handleVentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !newVent.content.trim()) return;

    const vent: VentPost = {
      id: Date.now().toString(),
      userId: user!.id,
      username: user!.username,
      user: {
        color: user!.color,
        avatar: user!.avatar,
        pronouns: user!.pronouns
      },
      mood: newVent.mood,
      content: newVent.content,
      timestamp: new Date().toLocaleString(),
      supports: 0,
      supportedBy: []
    };

    setVents([vent, ...vents]);
    setNewVent({ mood: 'frustrated', content: '' });
  };

  return (
    <div className="min-h-screen relative">
      <MatrixBackground />
      
      <div className="max-w-6xl mx-auto p-6 relative z-10">
        {/* Header */}
        <header className="text-center mb-8 p-6 border-2 border-cyber-green bg-black/80 glow-green">
          <h1 className="text-5xl font-cyber-header font-black text-cyber-green mb-2 tracking-widest">
            CYBERVENT.EXE
          </h1>
          <div className="text-cyber-magenta text-lg font-cyber-body">
            &gt;&gt;&gt; DIGITAL THERAPY TERMINAL ONLINE &lt;&lt;&lt;
          </div>
        </header>

        {/* User Panel */}
        <div className="flex justify-between items-center p-4 border border-cyber-magenta bg-black/90 mb-8">
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className="w-12 h-12 rounded-full border-2 border-cyber-cyan bg-gradient-cyber flex items-center justify-center text-black text-xl">
                  {user?.avatar}
                </div>
                <div>
                  <div className="text-cyber-cyan font-cyber-header">{user?.username}</div>
                  {user?.pronouns && <div className="text-muted-foreground text-sm">({user.pronouns})</div>}
                </div>
              </>
            ) : (
              <div className="text-cyber-green">Guest User - Login to participate</div>
            )}
          </div>
          
          <div className="flex gap-2">
            {isAuthenticated ? (
              <CyberButton variant="outline" onClick={logout}>
                LOGOUT
              </CyberButton>
            ) : (
              <>
                <Link to="/login">
                  <CyberButton variant="cyber">LOGIN</CyberButton>
                </Link>
                <Link to="/register">
                  <CyberButton variant="outline">REGISTER</CyberButton>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vent Form */}
          <div className="border border-cyber-cyan p-6 bg-black/80">
            <h2 className="text-xl font-cyber-header text-cyber-cyan mb-4 border-b border-cyber-cyan pb-2">
              // UPLOAD YOUR THOUGHTS
            </h2>
            
            {isAuthenticated ? (
              <form onSubmit={handleVentSubmit} className="space-y-4">
                <CyberSelect
                  value={newVent.mood}
                  onChange={(e) => setNewVent({...newVent, mood: e.target.value})}
                >
                  <option value="frustrated">FRUSTRATED.exe</option>
                  <option value="anxious">ANXIOUS.dll</option>
                  <option value="angry">ANGRY.bat</option>
                  <option value="sad">SAD.wav</option>
                  <option value="confused">CONFUSED.zip</option>
                  <option value="overwhelmed">OVERWHELMED.rar</option>
                  <option value="hopeful">HOPEFUL.mp3</option>
                  <option value="grateful">GRATEFUL.gif</option>
                </CyberSelect>
                
                <CyberTextarea
                  value={newVent.content}
                  onChange={(e) => setNewVent({...newVent, content: e.target.value})}
                  placeholder="// Initialize emotional output...&#10;// Share your thoughts, experiences, or whatever's on your mind&#10;// This is a safe space in cyberspace"
                  rows={6}
                />
                
                <CyberButton type="submit" className="w-full">
                  TRANSMIT DATA &gt;
                </CyberButton>
              </form>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Login required to share thoughts</p>
                <Link to="/login">
                  <CyberButton>ACCESS TERMINAL</CyberButton>
                </Link>
              </div>
            )}
          </div>

          {/* Vents Feed */}
          <div className="lg:col-span-2 border border-cyber-cyan p-6 bg-black/80">
            <h2 className="text-xl font-cyber-header text-cyber-cyan mb-4 border-b border-cyber-cyan pb-2">
              // RECENT TRANSMISSIONS
            </h2>
            
            <div className="space-y-4">
              {vents.map((vent) => (
                <div key={vent.id} className="border-l-2 border-cyber-magenta p-4 bg-black/70 slide-in">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full border border-cyber-cyan flex items-center justify-center text-sm bg-gradient-cyber text-black"
                      >
                        {vent.user.avatar}
                      </div>
                      <div>
                        <span className="font-cyber-header text-cyber-cyan">{vent.username}</span>
                        {vent.user.pronouns && (
                          <span className="text-muted-foreground text-sm ml-2">({vent.user.pronouns})</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-cyber-magenta font-cyber-header text-sm uppercase">{vent.mood}</div>
                      <div className="text-muted-foreground text-xs">{vent.timestamp}</div>
                    </div>
                  </div>
                  
                  <p className="text-cyber-green mb-3 leading-relaxed">{vent.content}</p>
                  
                  <CyberButton variant="outline" size="sm">
                    +SUPPORT ({vent.supports})
                  </CyberButton>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around bg-black/90 p-6 border border-cyber-magenta mt-8">
          <div className="text-center">
            <div className="text-3xl font-cyber-header text-cyber-magenta">42</div>
            <div className="text-cyber-cyan text-sm uppercase">Total Vents</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-cyber-header text-cyber-magenta">127</div>
            <div className="text-cyber-cyan text-sm uppercase">Users Online</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-cyber-header text-cyber-magenta">1337</div>
            <div className="text-cyber-cyan text-sm uppercase">Support Given</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
