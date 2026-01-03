import { useLanguage } from '@/contexts/LanguageContext';
import { Heart } from 'lucide-react';
import { BadmintonRally } from './BadmintonRally';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-dashed border-border/50 mt-auto relative">
      {/* Decorative squiggle line */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2">
        <svg className="w-20 h-3 text-primary/30 animate-wiggle-subtle" viewBox="0 0 80 12" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M0 6 Q20 2, 40 6 T80 6" strokeLinecap="round"/>
        </svg>
      </div>
      
      {/* Animated Badminton Rally */}
      <div className="container pt-4">
        <BadmintonRally />
      </div>
      
      <div className="container py-4">
        <div className="flex items-center justify-center gap-2">
          <p className="text-center text-muted-foreground text-sm">
            {t.footer.designedBy}{' '}
            <span className="font-medium text-foreground/80 wavy-underline">bryanlauwk</span>{' '}
            © {currentYear}
          </p>
          <Heart className="w-3 h-3 text-primary/50 animate-pulse-grow" />
        </div>
        
        {/* Decorative dots */}
        <div className="flex justify-center gap-2 mt-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-bounce-subtle" />
          <span className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-bounce-subtle" style={{ animationDelay: '0.2s' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-bounce-subtle" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </footer>
  );
}
