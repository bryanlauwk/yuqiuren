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
    <header className="sticky top-0 z-50 bg-background border-b-2 border-foreground">
      <div className="container flex items-center justify-between h-16 sm:h-20">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center">
            <svg
              viewBox="0 0 40 40"
              className="w-full h-full"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Shuttlecock — minimal monoline */}
              <circle cx="20" cy="27" r="4.5" className="text-accent" fill="currentColor" stroke="none" />
              <path
                d="M20 22.5 L13 8 M20 22.5 L17 7 M20 22.5 L23 7 M20 22.5 L27 8"
                className="text-foreground"
                strokeWidth="2"
              />
              <path
                d="M13 8 L17 7 L23 7 L27 8"
                className="text-foreground"
                strokeWidth="2"
              />
            </svg>
          </div>
          <span className="font-display text-lg sm:text-xl text-foreground tracking-tight hidden xs:inline">
            羽球人
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map(({ path, label, icon: Icon, requiresAuth }) => {
            if (requiresAuth && !isAdmin) return null;
            const active = currentPath === path;

            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  'px-3 sm:px-4 py-2 rounded text-sm font-bold uppercase tracking-wide transition-all flex items-center gap-2 border-2',
                  active
                    ? 'bg-primary text-primary-foreground border-foreground shadow-[3px_3px_0_0_hsl(var(--foreground))]'
                    : 'bg-transparent text-foreground border-transparent hover:border-foreground hover:bg-muted'
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
              className="text-foreground hover:text-destructive ml-1 sm:ml-2"
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
