import Hero from '../components/home/Hero';
import DigitoMes from '../components/home/DigitoMes';
import ServiciosGrid from '../components/home/ServiciosGrid';
import QuienesSomos from '../components/home/QuienesSomos';
import OficinasSection from '../components/home/OficinasSection';
import NoticiasSection from '../components/home/NoticiasSection';
import TransparenciaSection from '../components/home/TransparenciaSection';
import ContactoSection from '../components/home/ContactoSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <DigitoMes />
      <ServiciosGrid />
      <QuienesSomos />
      <OficinasSection />
      <NoticiasSection />
      <TransparenciaSection />
      <ContactoSection />
    </>
  );
}
