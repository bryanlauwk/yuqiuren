import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

export function Footer() {
  const { t, language, setLanguage } = useLanguage();
  const currentYear = new Date().getFullYear();

  const toggleLanguage = () => {
    setLanguage(language === "zh" ? "en" : "zh");
  };

  return (
    <footer className="mt-auto border-t-2 border-foreground bg-background">
      <div className="container py-16 md:py-20">
        <div className="flex flex-col items-center gap-5">
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded border-2 border-foreground text-xs font-bold uppercase tracking-wide text-foreground hover:bg-primary transition-colors"
            title={language === "zh" ? "Switch to English" : "切换到中文"}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === "zh" ? "English" : "中文"}</span>
          </button>
          <p className="text-center text-xs md:text-sm font-bold uppercase tracking-wider text-foreground">
            {t.footer.designedBy} <span>bryanlauwk</span>
            <span className="inline-block mx-2 w-1.5 h-1.5 bg-primary border border-foreground align-middle" />
            <span>© {currentYear}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
