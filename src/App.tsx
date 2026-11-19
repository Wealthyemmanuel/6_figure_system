import React, { useState } from 'react';
import { OptinPage } from './components/OptinPage';
import { ThankYouPage } from './components/ThankYouPage';

export default function App() {
  const [currentView, setCurrentView] = useState<'optin' | 'thank-you'>('optin');
  const [currentLead, setCurrentLead] = useState<{ name: string; email: string } | null>(() => {
    try {
      const name = localStorage.getItem('lead_name');
      const email = localStorage.getItem('lead_email');
      if (name && email) return { name, email };
    } catch {
      // ignore
    }
    return null;
  });

  React.useEffect(() => {
    const syncRoute = () => {
      if (
        window.location.hash === '#thank-you' ||
        window.location.pathname === '/thank-you'
      ) {
        setCurrentView('thank-you');
      } else if (window.location.hash === '#optin' || window.location.pathname === '/') {
        setCurrentView('optin');
      }
    };
    syncRoute();
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  const handleSuccess = (lead: { name: string; email: string }) => {
    try {
      localStorage.setItem('lead_name', lead.name);
      localStorage.setItem('lead_email', lead.email);
    } catch {
      // ignore
    }
    setCurrentLead(lead);
    setCurrentView('thank-you');
    window.location.hash = '#thank-you';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#00C3FF] selection:text-black">
      <main>
        {currentView === 'optin' ? (
          <OptinPage onSuccess={handleSuccess} />
        ) : (
          <ThankYouPage lead={currentLead} />
        )}
      </main>
    </div>
  );
}
