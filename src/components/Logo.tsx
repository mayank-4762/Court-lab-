import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'horizontal' | 'icon-only';
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showTagline = true,
  size = 'md',
  variant = 'horizontal',
  onClick,
}) => {
  // Height and sizing scales
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-lg sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-5xl',
  };

  const taglineSizes = {
    sm: 'text-[7px] tracking-[0.2em]',
    md: 'text-[8px] sm:text-[9.5px] tracking-[0.22em]',
    lg: 'text-[10px] sm:text-xs tracking-[0.25em]',
    xl: 'text-xs sm:text-sm tracking-[0.28em]',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col items-center justify-center text-left select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
    >
      {variant === 'full' ? (
        /* Vertical Stacked Logo (Matches exact layout in provided image) */
        <div className="flex flex-col items-center text-center">
          {/* CL Monogram Symbol */}
          <div className="mb-1.5 transition-transform group-hover:scale-105 duration-300">
            <svg
              viewBox="0 0 200 110"
              className={`${iconSizes[size]} h-auto overflow-visible`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* C Shape (White) */}
              <path
                d="M 50 15 C 10 15 -10 40 -10 70 C -10 100 10 125 50 125 L 120 125 L 120 105 L 55 105 C 30 105 15 90 15 70 C 15 50 30 35 55 35 L 120 35 L 120 15 Z"
                fill="#FFFFFF"
              />
              {/* Slanted L Shape (Neon Green #ccff00) */}
              <path
                d="M 90 80 L 115 20 L 140 20 L 110 80 L 190 80 L 190 103 L 90 103 Z"
                fill="#CCFF00"
              />
            </svg>
          </div>

          {/* COURT LAB Wordmark */}
          <div className={`font-black uppercase tracking-tight font-display leading-none ${textSizes[size]}`}>
            <span className="text-white">COURT</span>
            <span className="text-[#ccff00] ml-1.5">LAB</span>
          </div>

          {/* Tagline Below Name with Accent Lines */}
          {showTagline && (
            <div className={`mt-1.5 flex items-center justify-center gap-2 font-mono font-bold text-white uppercase ${taglineSizes[size]}`}>
              <span className="w-4 sm:w-6 h-[1.5px] bg-[#ccff00] shrink-0" />
              <span className="whitespace-nowrap text-zinc-200">PERFORMANCE ON EVERY POINT</span>
              <span className="w-4 sm:w-6 h-[1.5px] bg-[#ccff00] shrink-0" />
            </div>
          )}
        </div>
      ) : variant === 'icon-only' ? (
        /* Icon Only */
        <div className="transition-transform group-hover:scale-105 duration-200">
          <svg
            viewBox="0 0 200 110"
            className={`${iconSizes[size]} h-auto overflow-visible`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 50 15 C 10 15 -10 40 -10 70 C -10 100 10 125 50 125 L 120 125 L 120 105 L 55 105 C 30 105 15 90 15 70 C 15 50 30 35 55 35 L 120 35 L 120 15 Z"
              fill="#FFFFFF"
            />
            <path
              d="M 90 80 L 115 20 L 140 20 L 110 80 L 190 80 L 190 103 L 90 103 Z"
              fill="#CCFF00"
            />
          </svg>
        </div>
      ) : (
        /* Horizontal Logo with Tagline Below Name */
        <div className="flex items-center gap-3">
          {/* Emblem Icon */}
          <div className="shrink-0 transition-transform group-hover:scale-105 duration-200">
            <svg
              viewBox="0 0 200 110"
              className={`${iconSizes[size]} h-auto overflow-visible`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 50 15 C 10 15 -10 40 -10 70 C -10 100 10 125 50 125 L 120 125 L 120 105 L 55 105 C 30 105 15 90 15 70 C 15 50 30 35 55 35 L 120 35 L 120 15 Z"
                fill="#FFFFFF"
              />
              <path
                d="M 90 80 L 115 20 L 140 20 L 110 80 L 190 80 L 190 103 L 90 103 Z"
                fill="#CCFF00"
              />
            </svg>
          </div>

          {/* Name & Tagline */}
          <div className="flex flex-col">
            <div className={`font-black uppercase tracking-tight font-display leading-none ${textSizes[size]}`}>
              <span className="text-white group-hover:text-zinc-100 transition-colors">COURT</span>
              <span className="text-[#ccff00] ml-1">LAB</span>
            </div>

            {showTagline && (
              <div className={`mt-1 flex items-center gap-1.5 font-mono font-bold text-white uppercase ${taglineSizes[size]}`}>
                <span className="w-2.5 sm:w-3.5 h-[1.5px] bg-[#ccff00] shrink-0" />
                <span className="whitespace-nowrap text-zinc-300">PERFORMANCE ON EVERY POINT</span>
                <span className="w-2.5 sm:w-3.5 h-[1.5px] bg-[#ccff00] shrink-0" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
