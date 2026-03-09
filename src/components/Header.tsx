import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Medal, Shield, LogOut, History } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

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
          <svg
            viewBox="0 0 32 32"
            className="w-8 h-8 sm:w-9 sm:h-9 text-primary transition-transform duration-300 group-hover:scale-105"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <path d="M6 26 C10 18, 12 10, 26 6" />
            <path d="M26 26 C22 18, 20 10, 6 6" />
            <circle cx="16" cy="13" r="2.2" fill="currentColor" stroke="none" />
          </svg>
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
