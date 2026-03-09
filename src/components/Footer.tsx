import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

export function Footer() {
  const { t, language, setLanguage } = useLanguage();
  const currentYear = new Date().getFullYear();

  const toggleLanguage = () => {
    setLanguage(language === "zh" ? "en" : "zh");
  };

  return (
    <footer className="mt-auto border-t border-border/10">
      <div className="container py-20 md:py-24">
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            title={language === "zh" ? "Switch to English" : "切换到中文"}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === "zh" ? "English" : "中文"}</span>
          </button>
          <p className="text-center text-xs md:text-sm font-light text-muted-foreground/70 tracking-wide">
            {t.footer.designedBy} <span className="font-normal">bryanlauwk</span>
            <span className="mx-2 opacity-60">•</span>
            <span className="opacity-80">© {currentYear}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
