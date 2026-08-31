import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

export function Header() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const navItems = [
    { to: '/#rankings-anchor', label: isZh ? '排行榜' : 'Rankings', active: pathname === '/' && hash !== '#about' },
    { to: '/history', label: isZh ? '赛事纪录' : 'Matches', active: pathname === '/history' && hash !== '#highlights' },
    { to: '/history#highlights', label: isZh ? '精彩片段' : 'Highlights', active: pathname === '/history' && hash === '#highlights' },
    { to: '/#about', label: isZh ? '关于' : 'About', active: pathname === '/' && hash === '#about' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-foreground bg-background/95 backdrop-blur-xl">
      <div className="container grid min-h-16 grid-cols-[1fr_auto] items-center gap-4 md:min-h-20 md:grid-cols-[1fr_auto_1fr]">
        <Link to="/" className="group flex w-fit items-center gap-3" aria-label={isZh ? '羽球人首页' : 'YuQiuRen home'}>
          <div className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border-[3px] border-primary bg-background sm:h-11 sm:w-11">
            <span className="pr-[2px] pt-1 font-serif text-[22px] font-black italic leading-none text-primary sm:text-2xl" aria-hidden>
              Y
            </span>
            <div className="absolute left-1/2 top-1/2 h-[2.5px] w-[150%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-accent" />
          </div>
          <div className="leading-none">
            <span className="block font-display text-xl tracking-tight text-foreground sm:text-2xl">羽球人</span>
            <span className="hidden font-sans text-[8px] font-black uppercase tracking-[0.26em] text-muted-foreground sm:block">
              Badminton League
            </span>
          </div>
        </Link>

        <nav className="order-3 col-span-2 flex items-center overflow-x-auto border-t border-border md:order-none md:col-span-1 md:border-0" aria-label={isZh ? '主导航' : 'Main navigation'}>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'relative shrink-0 px-3 py-3 font-sans text-[10px] font-black uppercase tracking-[0.15em] text-foreground transition-colors sm:px-4 md:py-7 md:text-xs',
                'after:absolute after:inset-x-3 after:bottom-1 after:h-[3px] after:origin-left after:bg-accent after:transition-transform md:after:bottom-4',
                item.active ? 'after:scale-x-100' : 'after:scale-x-0 hover:text-primary hover:after:scale-x-100',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-1">
          {isAdmin && (
            <Link
              to="/admin"
              aria-label={isZh ? '管理后台' : 'Admin'}
              className="grid h-9 w-9 place-items-center text-foreground transition-colors hover:bg-muted hover:text-primary"
            >
              <Shield className="h-4 w-4" />
            </Link>
          )}
          <LanguageSwitcher />
          <ThemeToggle />
          {user && isAdmin && (
            <button
              type="button"
              onClick={handleSignOut}
              aria-label={isZh ? '退出登录' : 'Sign out'}
              className="grid h-9 w-9 place-items-center text-foreground transition-colors hover:bg-muted hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
