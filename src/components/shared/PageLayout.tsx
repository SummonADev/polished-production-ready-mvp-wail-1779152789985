import { useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import type { ReactNode } from 'react';

type PageLayoutProps = {
  children: ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  const navigate = useNavigate();
  const { track } = useApp();

  const handleCTA = () => {
    track('landing_page_cta_click');
    navigate('/onboarding');
  };

  return (
    <div>
      <Navbar onCTA={handleCTA} />
      {children}
      <Footer />
    </div>
  );
}
