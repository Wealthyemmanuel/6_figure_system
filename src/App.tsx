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

  const handleSuccess = (lead: { name: string; email: string }) => {
    try {
      localStorage.setItem('lead_name', lead.name);
      localStorage.setItem('lead_email', lead.email);
    } catch {
      // ignore
    }
    setCurrentLead(lead);
    setCurrentView('thank-you');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#00C3FF] selection:text-black">
      {/* Subtle testing switcher at the very top for previewing both pages */}
      <div className="fixed top-2 right-2 z-50 opacity-40 hover:opacity-100 transition-opacity">
        <div className="inline-flex rounded bg-neutral-900 border border-neutral-800 p-0.5 text-[11px]">
          <button
            onClick={() => setCurrentView('optin')}
            className={`px-2 py-0.5 rounded ${
              currentView === 'optin'
                ? 'bg-[#00C3FF] text-black font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Optin
          </button>
          <button
            onClick={() => setCurrentView('thank-you')}
            className={`px-2 py-0.5 rounded ${
              currentView === 'thank-you'
                ? 'bg-[#00C3FF] text-black font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Thank You
          </button>
        </div>
      </div>

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
