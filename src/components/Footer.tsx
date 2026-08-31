import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRankings } from '@/hooks/useRankings';

export function Footer() {
  const { t, language } = useLanguage();
  const { players, sessions } = useRankings();
  const currentYear = new Date().getFullYear();
  const isZh = language === 'zh';

  const navLinks = [
    { to: '/#rankings-anchor', label: isZh ? '排行榜' : 'Rankings' },
    { to: '/history', label: isZh ? '赛事纪录' : 'Matches' },
    { to: '/history#highlights', label: isZh ? '精彩片段' : 'Highlights' },
    { to: '/auth', label: isZh ? '管理员登录' : 'Admin' },
  ];

  return (
    <footer id="about" className="brand-surface scroll-mt-28 border-t-2 border-foreground">
      <div className="container py-12 sm:py-16">
        <div className="border-b border-[hsl(var(--band-foreground))]/20 pb-10">
          <div className="mb-3 font-sans text-[10px] font-black uppercase tracking-[0.28em] text-[hsl(var(--band-foreground))]/60">
            {isZh ? '关于羽球人' : 'ABOUT YUQIUREN'}
          </div>
          <div className="max-w-5xl font-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.86] band-fg">
            {isZh ? '球不落地' : 'NEVER LET THE'}
            <br />
            <span className="text-accent">{isZh ? '永不放弃' : 'BIRDIE DROP'}</span>
          </div>
        </div>

        <div className="grid gap-10 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-[hsl(var(--band-foreground))] font-display text-xl band-fg">Y</span>
              <span className="font-display text-2xl band-fg">羽球人</span>
            </Link>
            <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-[hsl(var(--band-foreground))]/65">
              {isZh
                ? '记录每一场相聚、每一次得分与每一位球员的成长。'
                : 'Tracking every match day, every point, and every player in our badminton community.'}
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-5 gap-y-3 md:grid-cols-1" aria-label={isZh ? '页脚导航' : 'Footer navigation'}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-sans text-xs font-black uppercase tracking-[0.14em] band-fg transition-colors hover:text-accent"
              >
                {link.label} →
              </Link>
            ))}
          </nav>

          <div className="md:text-right">
            <div className="flex gap-6 md:justify-end">
              <div>
                <div className="font-display text-4xl text-accent">{players.length}</div>
                <div className="font-sans text-[9px] font-black uppercase tracking-[0.2em] text-[hsl(var(--band-foreground))]/55">
                  {isZh ? '球员' : 'Players'}
                </div>
              </div>
              <div>
                <div className="font-display text-4xl text-accent">{sessions.length}</div>
                <div className="font-sans text-[9px] font-black uppercase tracking-[0.2em] text-[hsl(var(--band-foreground))]/55">
                  {isZh ? '场次' : 'Matches'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[hsl(var(--band-foreground))]/20 pt-5 font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-[hsl(var(--band-foreground))]/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {currentYear} YUQIUREN BADMINTON LEAGUE</span>
          <span>{t.footer.designedBy} BRYANLAUWK</span>
        </div>
      </div>
    </footer>
  );
}
