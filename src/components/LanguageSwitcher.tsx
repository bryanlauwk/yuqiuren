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
      className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded border-2 border-foreground text-xs font-bold uppercase tracking-wide text-foreground bg-background hover:bg-muted transition-colors"
      title={language === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      <Globe className="w-4 h-4" />
      <span className="hidden sm:inline">{language === 'zh' ? 'EN' : '中文'}</span>
    </button>
  );
}
