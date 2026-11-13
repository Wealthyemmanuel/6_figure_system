import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

interface OptinPageProps {
  onSuccess: (lead: { name: string; email: string }) => void;
}

export const OptinPage: React.FC<OptinPageProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Embed the requested Systeme.io remote form script tag
    const container = document.getElementById('systeme-embed-container');
    if (container && !document.getElementById('form-script-tag-26163748')) {
      const script = document.createElement('script');
      script.id = 'form-script-tag-26163748';
      script.src =
        'https://wealthyemmanuelifenna.systeme.io/public/remote/page/46684905c79eae8907d5de939064fd1ae1d0ce0d.js';
      script.async = true;
      container.appendChild(script);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setErrorMessage('Please enter your Name.');
      return;
    }

    if (!trimmedEmail) {
      setErrorMessage('Please enter your Email.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Forward lead to Systeme.io via server proxy
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
        }),
      });
    } catch (err) {
      console.warn('Systeme.io sync fallback:', err);
    }

    // Redirect seamlessly to Thank You page
    setIsSubmitting(false);
    onSuccess({ name: trimmedName, email: trimmedEmail });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between px-4 py-8 sm:py-16">
      <div className="max-w-4xl mx-auto w-full text-center my-auto">
        {/* Preheader */}
        <div className="mb-4 sm:mb-6">
          <p className="text-[#00C3FF] text-base sm:text-xl md:text-2xl font-black uppercase tracking-wider">
            ATTENTION: IN THE NEXT 60 SECONDS YOU WILL DISCOVER...
          </p>
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase leading-tight sm:leading-tight tracking-tight text-white max-w-3xl mx-auto font-sans">
          &ldquo;HOW A YOUNG BROKE GUY MOVED FROM BEING BROKE TO MAKE 6 FIGURES ONLINE WITH A SIMPLE SYSTEM.... EVEN IF YOU ARE JUST A BEGINNER&rdquo;
        </h1>

        {/* Sub-instruction */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base text-neutral-300 max-w-xl mx-auto font-medium">
          <span className="text-amber-400 font-bold uppercase">Important:</span>{' '}
          Fill with your Name and email below now to Discover this secret system while it&apos;s still available!
        </p>

        {/* Form Container with Embedded Systeme.io Script */}
        <div className="mt-8 max-w-lg mx-auto">
          {/* Embedded Remote Script Target Container */}
          <div id="systeme-embed-container" className="w-full empty:hidden mb-4" />

          {/* Clean Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {errorMessage && (
              <div className="p-3 bg-red-950/80 border border-red-500 text-red-200 text-sm rounded flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your First & Last Name..."
                required
                className="w-full px-4 py-3.5 bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 rounded focus:outline-none focus:border-[#00C3FF] focus:ring-1 focus:ring-[#00C3FF] text-base font-medium"
              />
            </div>

            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Best Active Email Address..."
                required
                className="w-full px-4 py-3.5 bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 rounded focus:outline-none focus:border-[#00C3FF] focus:ring-1 focus:ring-[#00C3FF] text-base font-medium"
              />
            </div>

            {/* Squeeze Page Button matching Billy Gene reference */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 sm:py-5 px-6 bg-[#00C3FF] hover:bg-[#20cdff] active:bg-[#00b0e6] text-black font-black text-lg sm:text-xl uppercase tracking-wider rounded shadow-lg transition-transform active:scale-[0.99] cursor-pointer disabled:opacity-75 disabled:cursor-wait"
              >
                {isSubmitting ? 'CONNECTING ACCESS...' : '> CLICK HERE NOW FOR INSTANT ACCESS'}
              </button>
            </div>

            {/* Privacy Note */}
            <p className="text-xs text-neutral-400 text-center pt-2 leading-relaxed max-w-md mx-auto">
              Make sure to use the email you check regularly so that you can get this info and other information. We will never share your email or sell it with anyone.
            </p>
          </form>
        </div>
      </div>

      {/* Clean Minimalist Footer */}
      <div className="pt-12 text-center text-xs text-neutral-500 space-y-2">
        <p className="font-semibold text-neutral-400">Emmanuel Ifenna (Naval)</p>
        <p className="text-[11px] text-neutral-600">
          &copy; {new Date().getFullYear()} Emmanuel Ifenna · All Rights Reserved
        </p>
      </div>
    </div>
  );
};
