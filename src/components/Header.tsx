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
        <Link to="/" className="flex items-center group">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-primary/80 to-accent/60 flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
              <ellipse cx="12" cy="19" rx="3" ry="2" fill="hsl(45 100% 70%)" />
              <ellipse cx="12" cy="18" rx="2.5" ry="1.5" fill="hsl(45 100% 85%)" />
              <path d="M12 17 L8 4 L10 5 L12 3 L14 5 L16 4 L12 17Z" fill="white" opacity="0.95" />
              <path d="M10 5 L12 17 L14 5 L12 6 Z" fill="hsl(0 0% 95%)" opacity="0.8" />
              <line x1="9" y1="6" x2="12" y2="15" stroke="hsl(0 0% 80%)" strokeWidth="0.3" />
              <line x1="15" y1="6" x2="12" y2="15" stroke="hsl(0 0% 80%)" strokeWidth="0.3" />
              <line x1="12" y1="3" x2="12" y2="15" stroke="hsl(0 0% 80%)" strokeWidth="0.3" />
            </svg>
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
