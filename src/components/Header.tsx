import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Trophy, Shield } from 'lucide-react';

export function Header() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary" />
          <span className="font-display text-xl tracking-wide">BADMINTON LIVE</span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            to="/"
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              !isAdmin 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Scoreboard
          </Link>
          <Link
            to="/admin"
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5',
              isAdmin 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Shield className="w-3.5 h-3.5" />
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
