import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Medal, Shield, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { user, isAdmin, signOut } = useAuth();

  const navItems = [
    { path: '/', label: '排行榜', icon: Medal },
    { path: '/admin', label: '管理', icon: Shield, requiresAuth: true },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border card-shadow">
      {/* Top accent bar */}
      <div className="h-1 accent-bar" />
      
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground group-hover:scale-105 transition-transform shadow-lg">
            <span className="text-xl">🏸</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg leading-tight text-foreground">
              羽球人联赛
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              2026 积分排行榜
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map(({ path, label, icon: Icon, requiresAuth }) => {
            if (requiresAuth && !isAdmin) return null;
            
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2',
                  currentPath === path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}

          {user && isAdmin && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-muted-foreground hover:text-destructive ml-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">退出</span>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
