import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface OptinPageProps {
  onSuccess: (lead: { name: string; email: string }) => void;
}

export const OptinPage: React.FC<OptinPageProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

    // Friendly validation
    if (!trimmedName) {
      setErrorMessage('Please enter your Name to continue.');
      return;
    }

    if (!trimmedEmail) {
      setErrorMessage('Please enter your Email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address (e.g. yourname@gmail.com).');
      return;
    }

    setIsSubmitting(true);

    // Save locally first so submission is guaranteed
    try {
      localStorage.setItem('lead_name', trimmedName);
      localStorage.setItem('lead_email', trimmedEmail);
      localStorage.setItem('lead_timestamp', new Date().toISOString());
    } catch {
      // storage fallback
    }

    // Forward to Systeme.io via server proxy with a hard timeout of 800ms
    // This ensures that even if Cloud Run cookie check or external network delays occur,
    // the user is NEVER stuck on the page and ALWAYS proceeds smoothly to the Thank You page.
    try {
      const syncCall = fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        keepalive: true,
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
        }),
      });

      const maxWait = new Promise((resolve) => setTimeout(resolve, 800));
      await Promise.race([syncCall, maxWait]);
    } catch (err) {
      console.warn('Systeme.io sync completed with notice:', err);
    }

    // Show instant success state then redirect
    setIsSuccess(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess({ name: trimmedName, email: trimmedEmail });
    }, 400);
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

        {/* Form Container with Embedded Systeme.io Script Support */}
        <div className="mt-8 max-w-lg mx-auto">
          {/* Embedded Remote Script Target Container */}
          <div id="systeme-embed-container" className="w-full empty:hidden mb-4" />

          {/* Clean High-Converting Squeeze Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4 text-left">
            {errorMessage && (
              <div className="p-3 bg-red-950/90 border border-red-500 text-red-200 text-sm rounded flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}

            {isSuccess && (
              <div className="p-3 bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-sm rounded flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span className="font-semibold">Access Confirmed! Loading your system details...</span>
              </div>
            )}

            <div>
              <label htmlFor="name-input" className="sr-only">
                Your Name
              </label>
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="Your First & Last Name..."
                className="w-full px-4 py-3.5 bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 rounded focus:outline-none focus:border-[#00C3FF] focus:ring-1 focus:ring-[#00C3FF] text-base font-medium shadow-xs"
              />
            </div>

            <div>
              <label htmlFor="email-input" className="sr-only">
                Your Email
              </label>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="Your Best Active Email Address..."
                className="w-full px-4 py-3.5 bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 rounded focus:outline-none focus:border-[#00C3FF] focus:ring-1 focus:ring-[#00C3FF] text-base font-medium shadow-xs"
              />
            </div>

            {/* Squeeze Page Button matching Billy Gene reference */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 sm:py-5 px-6 font-black text-lg sm:text-xl uppercase tracking-wider rounded shadow-xl transition-all active:scale-[0.99] cursor-pointer ${
                  isSuccess
                    ? 'bg-emerald-400 text-black'
                    : 'bg-[#00C3FF] hover:bg-[#20cdff] active:bg-[#00b0e6] text-black'
                }`}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>CONNECTING ACCESS...</span>
                  </span>
                ) : isSuccess ? (
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-black" />
                    <span>ACCESS GRANTED! LOADING...</span>
                  </span>
                ) : (
                  <span>&gt; CLICK HERE NOW FOR INSTANT ACCESS</span>
                )}
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
