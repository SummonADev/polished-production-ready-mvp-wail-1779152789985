import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import OnboardingPage from '@/pages/OnboardingPage';
import DashboardPage from '@/pages/DashboardPage';
import WorkflowPage from '@/pages/WorkflowPage';
import AdminPage from '@/pages/AdminPage';
import HowItWorksPage from '@/pages/HowItWorksPage';
import ProductPage from '@/pages/ProductPage';
import TestimonialsPage from '@/pages/TestimonialsPage';
import AboutPage from '@/pages/AboutPage';
import CareersPage from '@/pages/CareersPage';
import PressPage from '@/pages/PressPage';
import ContactPage from '@/pages/ContactPage';
import { AppProvider } from '@/lib/AppContext';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/workflow" element={<WorkflowPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/press" element={<PressPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
