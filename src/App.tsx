import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { RankingsProvider } from "@/hooks/useRankings";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import RankingPage from "./pages/RankingPage";

const AdminRanking = lazy(() => import("./pages/AdminRanking"));
const SessionHistoryPage = lazy(() => import("./pages/SessionHistoryPage"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

function HashScroll() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }

    window.requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    });
  }, [hash, pathname]);

  return null;
}

function RouteFallback() {
  return (
    <div className="grid min-h-[45dvh] place-items-center bg-background">
      <div className="font-display text-2xl text-primary animate-pulse-arena">YUQIUREN</div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <LanguageProvider>
      <RankingsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-center" />
          <BrowserRouter>
            <HashScroll />
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<RankingPage />} />
                <Route path="/history" element={<SessionHistoryPage />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminRanking />
                    </ProtectedRoute>
                  }
                />
                <Route path="/auth" element={<Auth />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </RankingsProvider>
    </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
