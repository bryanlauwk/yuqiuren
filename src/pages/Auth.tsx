import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Loader2, LogIn, UserPlus } from 'lucide-react';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAdmin, loading, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: t.auth.accountExistsTitle,
              description: t.auth.accountExistsDesc,
              variant: 'destructive',
            });
          } else {
            toast({
              title: t.auth.signUpFailedTitle,
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: t.auth.accountCreatedTitle,
            description: t.auth.accountCreatedDesc,
          });
          setIsSignUp(false);
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: t.auth.signInFailedTitle,
            description: error.message,
            variant: 'destructive',
          });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container flex items-center justify-center py-12 sm:py-16">
        <div className="w-full max-w-md">
          {/* Crest header */}
          <div className="text-center mb-8">
            <div className="relative inline-flex w-16 h-16 rounded-full border-[3px] border-primary bg-background items-center justify-center overflow-hidden mb-4">
              <span
                className="text-primary text-4xl font-black italic leading-none pr-[3px] mt-1.5 font-serif"
                aria-hidden
              >
                Y
              </span>
              <div className="absolute left-1/2 top-1/2 w-[150%] h-[3px] bg-accent -translate-x-1/2 -translate-y-1/2 -rotate-45" />
            </div>
            <h1 className="font-display text-3xl text-foreground mb-2">
              <span className="lime-slab">{isSignUp ? t.auth.createAccount : t.auth.adminLogin}</span>
            </h1>
            <p className="font-display text-[11px] tracking-[0.25em] text-muted-foreground">
              {t.auth.tagline}
            </p>
          </div>

          {/* Login card */}
          <div className="bg-card border-2 border-foreground rounded shadow-[6px_6px_0_0_hsl(var(--foreground))] p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="font-display text-[11px] tracking-widest text-foreground"
                >
                  {t.auth.email}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.auth.emailPlaceholder}
                  required
                  className="h-12 bg-background border-2 border-foreground rounded focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="font-display text-[11px] tracking-widest text-foreground"
                >
                  {t.auth.password}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="h-12 bg-background border-2 border-foreground rounded focus-visible:ring-primary"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-pop w-full h-12 inline-flex items-center justify-center gap-2 rounded-md font-display text-sm disabled:opacity-60 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isSignUp ? (
                  <>
                    <UserPlus className="w-5 h-5" />
                    {t.auth.signUpAction}
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    {t.auth.signIn}
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t-2 border-foreground/10">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isSignUp ? (
                  <>{t.auth.haveAccount} <span className="text-primary font-bold">{t.auth.signInLink}</span></>
                ) : (
                  <>{t.auth.noAccount} <span className="text-primary font-bold">{t.auth.signUpLink}</span></>
                )}
              </button>
            </div>
          </div>

          <p className="text-center font-display text-[10px] tracking-[0.2em] text-muted-foreground mt-6">
            {t.auth.adminOnlyNote}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
