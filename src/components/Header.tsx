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
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-primary border-2 border-foreground rounded flex items-center justify-center transition-transform group-hover:-translate-y-0.5 group-hover:-translate-x-0.5">
            <svg
              viewBox="0 0 32 32"
              className="w-6 h-6 sm:w-7 sm:h-7 text-foreground"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
            >
              <path d="M6 26 C10 18, 12 10, 26 6" />
              <path d="M26 26 C22 18, 20 10, 6 6" />
              <circle cx="16" cy="13" r="2.2" fill="currentColor" stroke="none" />
            </svg>
          </div>
          <span className="font-display text-lg sm:text-xl text-foreground hidden xs:inline">
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
