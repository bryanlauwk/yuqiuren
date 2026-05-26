import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRankings } from "@/hooks/useRankings";
import { Globe } from "lucide-react";

export function Footer() {
  const { t, language, setLanguage } = useLanguage();
  const { players, sessions } = useRankings();
  const currentYear = new Date().getFullYear();

  const toggleLanguage = () => {
    setLanguage(language === "zh" ? "en" : "zh");
  };

  const isZh = language === "zh";

  const navLinks = [
    { to: "/", label: isZh ? "排行榜" : "Rankings" },
    { to: "/history", label: isZh ? "场次记录" : "Match History" },
    { to: "/auth", label: isZh ? "管理员登录" : "Admin Login" },
  ];

  return (
    <footer className="mt-auto border-t-2 border-foreground bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand + slogan */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-accent border-2 border-foreground" />
              <span className="font-display text-lg tracking-tight text-foreground uppercase">
                {isZh ? "羽球人" : "YuQiuRen"}
              </span>
            </Link>
            <p className="font-display text-xs md:text-sm tracking-wider text-muted-foreground uppercase text-center md:text-left max-w-[240px]">
              {isZh ? "球不落地 · 永不放弃" : "NEVER LET THE BIRDIE DROP"}
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-col items-center gap-2">
            <span className="font-display text-[10px] tracking-[0.25em] text-muted-foreground uppercase mb-1">
              {isZh ? "导航" : "Navigate"}
            </span>
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="font-display text-sm tracking-wide text-foreground uppercase hover:text-accent transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Stats + lang + copyright */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-2">
              <span className="font-display text-[10px] tracking-wider px-2 py-1 border-2 border-foreground rounded bg-background text-foreground">
                {players.length}{isZh ? " 人" : " P"}
              </span>
              <span className="font-display text-[10px] tracking-wider px-2 py-1 border-2 border-foreground rounded bg-background text-foreground">
                {sessions.length}{isZh ? " 场" : " S"}
              </span>
              <span className="font-display text-[10px] tracking-wider px-2 py-1 border-2 border-foreground rounded bg-accent text-accent-foreground">
                {currentYear}
              </span>
            </div>
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded border-2 border-foreground text-xs font-bold uppercase tracking-wide text-foreground hover:bg-primary transition-colors"
              title={isZh ? "Switch to English" : "切换到中文"}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isZh ? "English" : "中文"}</span>
            </button>
            <p className="font-display text-[10px] md:text-xs tracking-wider text-muted-foreground uppercase">
              {t.footer.designedBy} <span className="text-foreground">bryanlauwk</span>
              <span className="inline-block mx-2 w-1 h-1 bg-accent align-middle" />
              © {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
