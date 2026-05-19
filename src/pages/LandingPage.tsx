import { useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import Packages from '@/components/landing/Packages';
import SocialProof from '@/components/landing/SocialProof';
import WaitlistBanner from '@/components/landing/WaitlistBanner';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  const navigate = useNavigate();
  const { track } = useApp();

  const handleCTA = () => {
    track('landing_page_cta_click');
    navigate('/onboarding');
  };

  return (
    <div>
      <Navbar onCTA={handleCTA} />
      <Hero onCTA={handleCTA} />
      <HowItWorks />
      <Packages onCTA={handleCTA} />
      <SocialProof />
      <WaitlistBanner />
      <Footer />
    </div>
  );
}
