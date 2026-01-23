import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Medal, Shield, LogOut, History, Share2 } from 'lucide-react';
import logo from '@/assets/logo.png';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShareRankingModal } from '@/components/ShareRankingModal';
import { useRankings } from '@/hooks/useRankings';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { user, isAdmin, signOut } = useAuth();
  const { t } = useLanguage();
  const { rankings } = useRankings();
  const [shareModalOpen, setShareModalOpen] = useState(false);

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
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        {/* Top accent bar */}
        <div className="h-1 accent-bar" />
        
        <div className="container flex items-center justify-between h-14 sm:h-16">
          <Link to="/" className="flex items-center group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img src={logo} alt="Logo" className="w-full h-full object-cover" />
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
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}

            {/* Share Button */}
            <button
              onClick={() => setShareModalOpen(true)}
              disabled={rankings.length === 0}
              className={cn(
                'px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
                'text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              title={t.header.share}
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{t.header.share}</span>
            </button>

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

      {/* Share Modal */}
      <ShareRankingModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        rankings={rankings}
      />
    </>
  );
}
