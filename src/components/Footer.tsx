import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-auto">
      <div className="container py-6">
        <div className="flex items-center justify-center">
          <p className="text-center text-muted-foreground text-sm">
            {t.footer.designedBy}{' '}
            <span className="font-medium text-foreground/70">bryanlauwk</span>{' '}
            © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
