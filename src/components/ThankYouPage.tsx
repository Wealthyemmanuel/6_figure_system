import React from 'react';

const DRIVE_LINK = 'https://drive.google.com/file/d/1YPuJAUOXQI0c_vhyLTdigVeohESsIA_G/view?usp=drivesdk';

export const ThankYouPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between px-4 py-8 sm:py-16">
      <div className="max-w-4xl mx-auto w-full my-auto">
        {/* Headline with THANK YOU highlighted & Link directly underneath */}
        <div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto space-y-6">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase leading-tight tracking-tight text-white">
            <span className="text-[#00C3FF] underline decoration-[#00C3FF]/50 underline-offset-6">
              THANK YOU
            </span>
            , READ ON FOR FULL DETAILS ABOUT THIS SECRET SIMPLE INCOME SYSTEM YOU CAN USE NOW
          </h1>

          {/* Link Directly Under The Headline */}
          <div className="pt-1 max-w-xl mx-auto">
            <a
              href={DRIVE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block text-center py-4 sm:py-5 px-6 bg-[#00C3FF] hover:bg-[#20cdff] active:bg-[#00b0e6] text-black font-black text-lg sm:text-xl uppercase tracking-wider rounded shadow-xl transition-transform active:scale-[0.99] cursor-pointer"
            >
              &gt; CLICK HERE TO GET THIS SYSTEM NOW
            </a>
          </div>
        </div>

        {/* 2-Column: Picture on Left, Simple Short Story on Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-neutral-950 border border-neutral-800 p-6 sm:p-10 rounded-lg">
          {/* Picture on the left with NO caption */}
          <div className="md:col-span-5 flex justify-center">
            <img
              src="https://i.ibb.co/b5GxMwhC/i54kw8.jpg"
              alt="Emmanuel Ifenna"
              className="w-full max-w-[280px] rounded object-cover shadow-2xl border border-neutral-700"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Simple Story on the Right (<700 characters) */}
          <div className="md:col-span-7 space-y-5 text-left">
            <div className="text-xs font-bold text-[#00C3FF] uppercase tracking-wider">
              From Emmanuel Ifenna
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Dear Friend,
            </h2>

            <div className="text-neutral-300 text-sm sm:text-base leading-relaxed space-y-3 font-normal">
              <p>
                My name is Emmanuel. In 2023, after secondary school in Enugu State, I failed my exams. I was broke, confused, and felt completely invisible.
              </p>
              <p>
                I spent months getting scammed by online noise and fake WhatsApp courses before I finally learned the real principle of leverage at ZTHA Academy Batch 4.
              </p>
              <p>
                I was once standing exactly where you are today. I made it out, and I built this free system so you don&apos;t have to waste time or money making the same mistakes.
              </p>
            </div>

            {/* Link also accessible right after reading */}
            <div className="pt-2">
              <a
                href={DRIVE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-block text-center py-3.5 px-6 bg-[#00C3FF] hover:bg-[#20cdff] active:bg-[#00b0e6] text-black font-black text-sm sm:text-base uppercase tracking-wider rounded shadow transition-transform active:scale-[0.99]"
              >
                &gt; GET THE FREE SYSTEM (GOOGLE DRIVE)
              </a>
            </div>
          </div>
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
