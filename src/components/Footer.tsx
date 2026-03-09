import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/10">
      <div className="container py-20 md:py-24">
        <p className="text-center text-xs md:text-sm font-light text-muted-foreground/70 tracking-wide">
          {t.footer.designedBy} <span className="font-normal">bryanlauwk</span>
          <span className="mx-2 opacity-60">•</span>
          <span className="opacity-80">© {currentYear}</span>
        </p>
      </div>
    </footer>
  );
}
