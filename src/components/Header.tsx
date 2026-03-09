import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import shuttlecockLogo from '@/assets/shuttlecock-logo.png';
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
            <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" fill="none" style={{ transform: 'rotate(-30deg)' }}>
              <defs>
                <linearGradient id="cork-base" x1="0" y1="0" x2="0.3" y2="1">
                  <stop offset="0%" stopColor="hsl(0 0% 85%)" />
                  <stop offset="50%" stopColor="hsl(0 0% 65%)" />
                  <stop offset="100%" stopColor="hsl(0 0% 45%)" />
                </linearGradient>
                <linearGradient id="feather-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(0 0% 100%)" />
                  <stop offset="100%" stopColor="hsl(0 0% 90%)" />
                </linearGradient>
              </defs>

              {/* Feather skirt — 8 overlapping curved feathers fanning from cork */}
              {/* Outermost feathers (back layer) */}
              <path d="M10 20 Q6 14, 7 6 Q9 8, 12 18 Z" fill="url(#feather-fill)" stroke="hsl(0 0% 55%)" strokeWidth="0.3" opacity="0.7" />
              <path d="M22 20 Q26 14, 25 6 Q23 8, 20 18 Z" fill="url(#feather-fill)" stroke="hsl(0 0% 55%)" strokeWidth="0.3" opacity="0.7" />

              {/* Mid-outer feathers */}
              <path d="M11.5 20 Q8 12, 8.5 4.5 Q10.5 7, 13.5 18 Z" fill="url(#feather-fill)" stroke="hsl(0 0% 50%)" strokeWidth="0.3" opacity="0.8" />
              <path d="M20.5 20 Q24 12, 23.5 4.5 Q21.5 7, 18.5 18 Z" fill="url(#feather-fill)" stroke="hsl(0 0% 50%)" strokeWidth="0.3" opacity="0.8" />

              {/* Mid feathers */}
              <path d="M13 20 Q10.5 11, 11 3.5 Q12.5 6.5, 15 18 Z" fill="url(#feather-fill)" stroke="hsl(0 0% 45%)" strokeWidth="0.35" opacity="0.85" />
              <path d="M19 20 Q21.5 11, 21 3.5 Q19.5 6.5, 17 18 Z" fill="url(#feather-fill)" stroke="hsl(0 0% 45%)" strokeWidth="0.35" opacity="0.85" />

              {/* Inner feathers (front layer) */}
              <path d="M14.5 20 Q13 10, 13.5 3 Q14.5 6, 16 18 Z" fill="url(#feather-fill)" stroke="hsl(0 0% 40%)" strokeWidth="0.35" opacity="0.9" />
              <path d="M17.5 20 Q19 10, 18.5 3 Q17.5 6, 16 18 Z" fill="url(#feather-fill)" stroke="hsl(0 0% 40%)" strokeWidth="0.35" opacity="0.9" />

              {/* Center feather */}
              <path d="M15.5 20 Q15 9, 16 2.5 Q17 9, 16.5 20 Z" fill="hsl(0 0% 98%)" stroke="hsl(0 0% 40%)" strokeWidth="0.35" />

              {/* Feather spine lines for texture */}
              <line x1="8" y1="5.5" x2="11.5" y2="19" stroke="hsl(0 0% 70%)" strokeWidth="0.2" opacity="0.5" />
              <line x1="10" y1="4" x2="13" y2="19" stroke="hsl(0 0% 70%)" strokeWidth="0.2" opacity="0.5" />
              <line x1="12" y1="3.2" x2="14.5" y2="19" stroke="hsl(0 0% 70%)" strokeWidth="0.2" opacity="0.5" />
              <line x1="16" y1="2.5" x2="16" y2="19" stroke="hsl(0 0% 65%)" strokeWidth="0.25" opacity="0.6" />
              <line x1="20" y1="3.2" x2="17.5" y2="19" stroke="hsl(0 0% 70%)" strokeWidth="0.2" opacity="0.5" />
              <line x1="22" y1="4" x2="19" y2="19" stroke="hsl(0 0% 70%)" strokeWidth="0.2" opacity="0.5" />
              <line x1="24" y1="5.5" x2="20.5" y2="19" stroke="hsl(0 0% 70%)" strokeWidth="0.2" opacity="0.5" />

              {/* Cork base — sphere with band */}
              <ellipse cx="16" cy="23.5" rx="4" ry="3.2" fill="url(#cork-base)" />
              <ellipse cx="16" cy="21.8" rx="3.6" ry="1.8" fill="hsl(0 0% 75%)" opacity="0.5" />
              {/* Dark rim band */}
              <ellipse cx="16" cy="22" rx="3.8" ry="0.6" fill="none" stroke="hsl(0 0% 35%)" strokeWidth="0.5" />
              {/* Highlight */}
              <ellipse cx="14.8" cy="22.5" rx="1.2" ry="0.8" fill="hsl(0 0% 95%)" opacity="0.4" />
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
