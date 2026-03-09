import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Medal, Shield, LogOut, History } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { user, isAdmin, signOut } = useAuth();
  const { t } = useLanguage();

  const navItems = [
    { path: '/', label: t.header.rankings, icon: Medal },
    { path: '/history', label: t.header.sessionHistory, icon: History },
    { path: '/admin', label: t.header.admin, icon: Shield, requiresAuth: true },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 sm:h-18">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-primary/80 to-accent/60 flex items-center justify-center shadow-lg ring-1 ring-white/10 ring-inset">
            <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" fill="none" style={{ transform: 'rotate(-15deg)' }}>
              {/* Motion trail arc */}
              <path d="M6 8 Q10 4, 16 6" stroke="hsl(210 100% 80%)" strokeWidth="0.6" fill="none" opacity="0.5" />
              <path d="M5 11 Q9 6, 16 8" stroke="hsl(210 100% 80%)" strokeWidth="0.4" fill="none" opacity="0.3" />
              
              {/* Feather plumes - 6 separate feathers fanning out */}
              <path d="M16 22 L12.5 5 L14 8 Z" fill="white" opacity="0.85" />
              <path d="M16 22 L14 4 L15.5 7.5 Z" fill="hsl(210 20% 95%)" opacity="0.9" />
              <path d="M16 22 L16 3 L16.5 7 Z" fill="white" opacity="0.95" />
              <path d="M16 22 L18 4 L16.8 7.5 Z" fill="hsl(210 20% 95%)" opacity="0.9" />
              <path d="M16 22 L19.5 5 L18 8 Z" fill="white" opacity="0.85" />
              <path d="M16 22 L20.5 7 L18.5 9 Z" fill="hsl(210 20% 92%)" opacity="0.75" />
              
              {/* Feather spine lines */}
              <line x1="13" y1="5" x2="16" y2="20" stroke="hsl(210 15% 80%)" strokeWidth="0.25" />
              <line x1="16" y1="3" x2="16" y2="20" stroke="hsl(210 15% 80%)" strokeWidth="0.3" />
              <line x1="19" y1="5" x2="16" y2="20" stroke="hsl(210 15% 80%)" strokeWidth="0.25" />
              
              {/* Cork base */}
              <defs>
                <linearGradient id="cork-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(45 100% 75%)" />
                  <stop offset="100%" stopColor="hsl(35 80% 45%)" />
                </linearGradient>
              </defs>
              <ellipse cx="16" cy="23" rx="3.2" ry="2.2" fill="url(#cork-grad)" />
              <ellipse cx="16" cy="22.2" rx="2.6" ry="1.5" fill="hsl(45 100% 82%)" opacity="0.6" />
              
              {/* Cork rim highlight */}
              <ellipse cx="16" cy="21.8" rx="2" ry="0.5" fill="hsl(45 100% 90%)" opacity="0.4" />
            </svg>
          </div>
          <span className="hidden sm:inline text-base font-display text-foreground tracking-tight group-hover:text-primary transition-colors">
            羽球人
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map(({ path, label, icon: Icon, requiresAuth }) => {
            if (requiresAuth && !isAdmin) return null;
            
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  'px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
                  currentPath === path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}

          <LanguageSwitcher />

          {user && isAdmin && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-muted-foreground hover:text-destructive ml-1 sm:ml-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">{t.header.signOut}</span>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
