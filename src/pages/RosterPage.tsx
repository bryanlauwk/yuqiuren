import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { RosterSection } from '@/components/RosterSection';

export default function RosterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <RosterSection />
      </main>
      <Footer />
    </div>
  );
}
