import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  return (
    <footer id="about" className="mt-auto border-t border-border/60">
      <div className="cs-shell flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold">{isZh ? '球不落地，永不放弃。' : 'Never let the birdie drop.'}</p>
          <p className="mt-2 text-xs text-muted-foreground">© {new Date().getFullYear()} 羽球人 · BRYANLAUWK</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground" aria-label={isZh ? '页脚导航' : 'Footer navigation'}>
          <Link className="hover:text-foreground" to="/roster">{isZh ? '球员名册' : 'Player roster'}</Link>
          <Link className="hover:text-foreground" to="/history#highlights">{isZh ? '精彩片段' : 'Highlights'}</Link>
          <Link className="hover:text-foreground" to="/auth">{isZh ? '管理员登录' : 'Admin'}</Link>
        </nav>
      </div>
    </footer>
  );
}
