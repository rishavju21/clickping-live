import { useState } from "react";
import { LandingPage } from "./components/landing-page";
import { LoginPage } from "./components/auth/login-page";
import { SignupPage } from "./components/auth/signup-page";
import { ForgotPasswordPage } from "./components/auth/forgot-password-page";
import { OnboardingFlow } from "./components/onboarding/onboarding-flow";
import { DashboardPage } from "./components/dashboard/dashboard-page";
import { WebsiteDetailPage } from "./components/website/website-detail-page";
import { CheckResultsPage } from "./components/check-results/check-results-page";
import { AlertsPage } from "./components/alerts/alerts-page";
import { SettingsPage } from "./components/settings/settings-page";

type Page = 
  | 'landing'
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'onboarding'
  | 'dashboard'
  | 'website-detail'
  | 'check-results'
  | 'alerts'
  | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState<string>('1');
  const [selectedCheckId, setSelectedCheckId] = useState<string>('1');

  const handleNavigate = (page: Page, id?: string) => {
    if (page === 'website-detail' && id) {
      setSelectedWebsiteId(id);
    }
    if (page === 'check-results' && id) {
      setSelectedCheckId(id);
    }
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    // For demo, assume user has already completed onboarding
    setHasCompletedOnboarding(true);
    setCurrentPage('dashboard');
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    setHasCompletedOnboarding(false);
    setCurrentPage('onboarding');
  };

  const handleCompleteOnboarding = () => {
    setHasCompletedOnboarding(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setHasCompletedOnboarding(false);
    setCurrentPage('landing');
  };

  // Render the current page
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      
      case 'login':
        return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      
      case 'signup':
        return <SignupPage onNavigate={handleNavigate} onSignup={handleSignup} />;
      
      case 'forgot-password':
        return <ForgotPasswordPage onNavigate={handleNavigate} />;
      
      case 'onboarding':
        return <OnboardingFlow onComplete={handleCompleteOnboarding} />;
      
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} onLogout={handleLogout} />;
      
      case 'website-detail':
        return (
          <WebsiteDetailPage 
            websiteId={selectedWebsiteId}
            onNavigate={handleNavigate}
            onViewCheckResults={(checkId) => handleNavigate('check-results', checkId)}
          />
        );
      
      case 'check-results':
        return (
          <CheckResultsPage 
            checkId={selectedCheckId}
            onNavigate={handleNavigate}
          />
        );
      
      case 'alerts':
        return <AlertsPage onNavigate={handleNavigate} />;
      
      case 'settings':
        return <SettingsPage onNavigate={handleNavigate} />;
      
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="size-full">
      {renderPage()}
    </div>
  );
}
