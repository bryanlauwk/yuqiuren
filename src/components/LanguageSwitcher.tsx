import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="text-muted-foreground hover:text-foreground gap-1.5"
      title={language === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      <Globe className="w-4 h-4" />
      <span className="text-xs font-medium">
        {language === 'zh' ? 'EN' : '中'}
      </span>
    </Button>
  );
}
