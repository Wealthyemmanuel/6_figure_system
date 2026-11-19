import React, { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface OptinPageProps {
  onSuccess: (lead: { name: string; email: string }) => void;
}

export const OptinPage: React.FC<OptinPageProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hasEmailConsent, setHasEmailConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

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

    if (!hasEmailConsent) {
      setErrorMessage('Please check the box to permit us to send you the free guide and promotional emails.');
      return;
    }

    setIsSubmitting(true);

    try {
      localStorage.setItem('lead_name', trimmedName);
      localStorage.setItem('lead_email', trimmedEmail);
      localStorage.setItem('lead_consent', 'true');
      localStorage.setItem('lead_timestamp', new Date().toISOString());
    } catch {
      // storage fallback
    }

    // Forward to Systeme.io via server proxy with a timeout guard so the user is never stuck
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
          consent: true,
        }),
      });

      const maxWait = new Promise((resolve) => setTimeout(resolve, 2000));
      await Promise.race([syncCall, maxWait]);
    } catch (err) {
      console.warn('Systeme.io sync completed with notice:', err);
    }

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
            IN THE NEXT 60 SECONDS...
          </p>
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase leading-tight sm:leading-tight tracking-tight text-white max-w-3xl mx-auto font-sans">
          I AM GOING TO SHOW YOU THE 5 MISTAKES PEOPLE MAKE WHEN TRYING TO MAKE MONEY ONLINE
        </h1>

        {/* Sub-instruction */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base text-neutral-300 max-w-xl mx-auto font-medium">
          <span className="text-amber-400 font-bold uppercase">Important:</span>{' '}
          Fill with your Name and email below now to Discover this secret system while it&apos;s still available!
        </p>

        {/* Clean High-Converting Squeeze Form */}
        <div className="mt-8 max-w-lg mx-auto">
          <form onSubmit={handleSubmit} noValidate className="space-y-4 text-left">
            {errorMessage && (
              <div className="p-3 bg-red-950/90 border border-red-500 text-red-200 text-sm rounded flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}

            {isSuccess && (
              <div className="p-3 bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-sm rounded flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span className="font-semibold">Access Confirmed! Loading your free gift...</span>
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

            {/* Promotional Email Permission Checkmark */}
            <label
              htmlFor="email-consent-checkbox"
              className="flex items-start gap-3 p-3 rounded bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 cursor-pointer select-none transition-colors"
            >
              <input
                id="email-consent-checkbox"
                type="checkbox"
                checked={hasEmailConsent}
                onChange={(e) => {
                  setHasEmailConsent(e.target.checked);
                  if (errorMessage) setErrorMessage(null);
                }}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-neutral-600 bg-neutral-950 accent-[#00C3FF] cursor-pointer"
              />
              <span className="text-xs sm:text-sm text-neutral-300 leading-snug">
                Yes, I give permission to Emmanuel Ifenna to send me the free guide and promotional emails with tips, updates, and offers. I can unsubscribe at any time.
              </span>
            </label>

            {/* Squeeze Page Button */}
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
