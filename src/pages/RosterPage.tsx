import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { RosterSection } from '@/components/RosterSection';

export default function RosterPage() {
  return (
    <div className="courtside cs-page">
      <Header />
      <main id="main-content" className="flex-1">
        <RosterSection />
      </main>
      <Footer />
    </div>
  );
}
