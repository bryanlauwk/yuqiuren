import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 mt-auto">
      <div className="container py-6">
        <p className="text-center text-muted-foreground text-sm">
          {t.footer.designedBy} <span className="font-medium text-foreground/80">bryanlauwk</span> © {currentYear}
        </p>
      </div>
    </footer>
  );
}
