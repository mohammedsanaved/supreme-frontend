import HeroSection from './components/HeroSection';
import { Data } from '../data/data';
import Navbar from './components/Navbar';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import SolutionSection from './components/SolutionSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection {...Data.heroSection} />
      <SolutionSection />
      <ContactSection />
      <Footer />
    </>
  );
}
