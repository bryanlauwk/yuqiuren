import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <button
      onClick={toggleLanguage}
      type="button"
      aria-label={language === 'zh' ? 'Switch to English' : '切换到中文'}
      className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-border px-3 text-sm font-semibold transition-colors hover:bg-muted"
      title={language === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      <Globe className="hidden h-4 w-4 sm:block" aria-hidden />
      <span>{language === 'zh' ? 'EN' : '中文'}</span>
    </button>
  );
}
