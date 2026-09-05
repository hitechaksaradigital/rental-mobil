import { useState } from 'react';
import Header from './Header';
import HeroBooking from './HeroBooking';
import FleetShowcase from './FleetShowcase';
import ValueProps from './ValueProps';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import PromoBanner from './PromoBanner';
import Footer from './Footer';
import VehicleModal from './VehicleModal';
import WhatsAppFab from './WhatsAppFab';

export default function App() {
  const [modalCar, setModalCar] = useState(null);
  const [feedback, setFeedback] = useState(false);

  const handleBook = (car) => {
    const formatted = Number(car.price).toLocaleString('id-ID');
    const msg = `Halo Velocis Fleet, saya ingin memesan unit *${car.name}* dengan tarif Rp ${formatted}/hari. Mohon info ketersediaan dan prosedur berikutnya.`;
    window.open(`https://wa.me/628118356247?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleSearch = () => {
    setFeedback(true);
    setTimeout(() => {
      setFeedback(false);
      const el = document.getElementById('armada-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 900);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroBooking onSearch={handleSearch} />
        <FleetShowcase
          onBook={handleBook}
          onDetail={(car) => setModalCar(car.key)}
        />
        <ValueProps />
        <HowItWorks />
        <Testimonials />
        <PromoBanner onScrollBooking={handleSearch} />
      </main>
      <Footer />
      <WhatsAppFab />

      {feedback && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-inverse-surface text-inverse-on-surface px-space-lg py-space-sm rounded-full shadow-2xl flex items-center gap-space-sm">
          <span className="material-symbols-outlined text-tertiary-fixed text-[20px] animate-spin">
            sync
          </span>
          <span className="font-label-md text-label-md">
            Menyaring ketersediaan unit untuk jadwal pilihan Anda...
          </span>
        </div>
      )}

      <VehicleModal carKey={modalCar} onClose={() => setModalCar(null)} />
    </div>
  );
}