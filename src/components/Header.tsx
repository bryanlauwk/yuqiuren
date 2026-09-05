import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Shield, Trophy, Users, PlaySquare } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

export function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const navItems = [
    { to: '/', label: isZh ? '积分榜' : 'Rankings', icon: Trophy },
    { to: '/roster', label: isZh ? '球员' : 'Players', icon: Users },
    { to: '/history', label: isZh ? '比赛记录' : 'Matches', icon: PlaySquare },
  ];
  const isPublicPage = navItems.some((item) => pathname === item.to);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      {isPublicPage && <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:p-3 focus:text-accent-foreground">
        {isZh ? '跳至主要内容' : 'Skip to content'}
      </a>}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-xl">
        <div className="cs-shell flex min-h-[72px] flex-wrap items-center justify-between gap-2 py-3 md:min-h-[84px] md:flex-nowrap md:gap-4 md:py-0">
          <Link to="/" className="shrink-0 leading-none" aria-label={isZh ? '羽球人首页' : 'Yuqiuren home'}>
            <span className="block text-2xl font-extrabold tracking-tight">羽球人</span>
            <span className="mt-1.5 block text-xs font-semibold tracking-[0.22em] text-muted-foreground">YUQIUREN</span>
          </Link>
          <nav className="hidden items-center gap-2 md:flex" aria-label={isZh ? '主导航' : 'Main navigation'}>
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} aria-current={pathname === item.to ? 'page' : undefined}
                className={cn('relative px-5 py-7 text-sm font-semibold transition-colors after:absolute after:inset-x-5 after:bottom-3 after:h-0.5 after:rounded-full',
                  pathname === item.to ? 'text-foreground after:bg-accent dark:text-accent' : 'text-muted-foreground hover:text-foreground')}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1 sm:gap-2">
            {isAdmin && <Link to="/admin" className="cs-icon-button" aria-label={isZh ? '管理后台' : 'Admin'}><Shield className="h-4 w-4" /></Link>}
            <LanguageSwitcher />
            <ThemeToggle />
            {user && isAdmin && <button type="button" className="cs-icon-button" onClick={handleSignOut} aria-label={isZh ? '退出登录' : 'Sign out'}><LogOut className="h-4 w-4" /></button>}
          </div>
        </div>
      </header>
      {isPublicPage && <nav className="cs-mobile-nav fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-background/95 px-3 pt-2 backdrop-blur-xl md:hidden" aria-label={isZh ? '移动导航' : 'Mobile navigation'}>
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to} aria-current={pathname === to ? 'page' : undefined}
            className={cn('flex min-h-14 flex-col items-center justify-center gap-1.5 rounded-xl px-1 text-xs font-semibold', pathname === to ? 'bg-accent/10 text-foreground dark:text-accent' : 'text-muted-foreground')}>
            <Icon className="h-5 w-5" strokeWidth={pathname === to ? 2.3 : 1.7} aria-hidden />{label}
          </Link>
        ))}
      </nav>}
    </>
  );
}
