import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container flex items-center justify-center py-16">
        <div className="text-center">
          <h1 className="font-display text-7xl sm:text-9xl text-foreground tracking-tighter mb-6">
            <span className="red-slab">404</span>
          </h1>
          <p className="font-display text-sm sm:text-base tracking-[0.25em] text-muted-foreground mb-8">
            {t.notFound.message}
          </p>
          <Link
            to="/"
            className="btn-pop inline-flex items-center gap-2 px-6 py-3 font-display uppercase tracking-wide text-sm rounded-md"
          >
            {t.notFound.back}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
