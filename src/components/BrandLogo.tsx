import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  align?: 'center' | 'left';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  align = 'center',
}) => {
  const iconHeights = {
    sm: 'h-5',
    md: 'h-6 sm:h-7',
    lg: 'h-8 sm:h-9',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-2xl',
    lg: 'text-xl sm:text-3xl',
  };

  const subSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px] sm:text-[11.5px]',
    lg: 'text-xs sm:text-sm',
  };

  const isLeft = align === 'left';

  return (
    <div
      className={`flex flex-col ${
        isLeft ? 'items-start text-left' : 'items-center justify-center text-center'
      } select-none ${className}`}
    >
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Stylized Aerodynamic Winged 'D' (ডি-এর ঝাপটা) Logomark */}
        <svg
          viewBox="0 0 46 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${iconHeights[size]} w-auto shrink-0 drop-shadow-xs`}
          aria-hidden="true"
        >
          <defs>
            {/* Wing Feather 1 (Top) Gradient: Brilliant Cyan -> Sky Blue */}
            <linearGradient id="wingGradTop" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="45%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            {/* Wing Feather 2 (Middle) Gradient: Vibrant Cerulean -> Electric Royal Blue */}
            <linearGradient id="wingGradMid" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="55%" stopColor="#087CF0" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>

            {/* Wing Feather 3 (Bottom) Gradient: Sharp Dagger Wing -> Deep Cobalt Navy */}
            <linearGradient id="wingGradBot" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#087CF0" />
              <stop offset="45%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#0A2446" />
            </linearGradient>

            {/* Main D Body Gradient: Cyan-Blue sheen at top -> Royal Navy -> Deep Midnight */}
            <linearGradient id="brandDBodyGrad" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#00D2FF" />
              <stop offset="18%" stopColor="#087CF0" />
              <stop offset="55%" stopColor="#0D2B52" />
              <stop offset="100%" stopColor="#06182C" />
            </linearGradient>

            {/* Glossy top-rim highlight */}
            <linearGradient id="dTopRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#087CF0" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Wing Feather 1 (Top Wing Blade / ঝাপটা ১) */}
          <path
            d="M2 7.5C5.5 7.6 10.2 8.2 16.5 9L15.2 12.8C10.8 12.1 5.8 11 0.8 8.8C0.2 8.5 0.8 7.5 2 7.5Z"
            fill="url(#wingGradTop)"
          />

          {/* Wing Feather 2 (Middle Wing Blade / ঝাপটা ২ - Longest sweep) */}
          <path
            d="M0.2 14.8C5.2 14.8 10.8 15.4 15.6 16.2L14.3 20.2C9.5 19.3 4.5 17.8 0 16C-0.4 15.8 0 14.8 0.2 14.8Z"
            fill="url(#wingGradMid)"
          />

          {/* Wing Feather 3 (Bottom Dagger Wing / ঝাপটা ৩ - Sharp base fin) */}
          <path
            d="M3 22.2C7 22.3 11.2 22.8 14.5 23.5L13.2 27.2C9.2 26.4 5.2 24.8 2 23.2C1.5 22.9 2.1 22.2 3 22.2Z"
            fill="url(#wingGradBot)"
          />

          {/* Main Italic 'D' Loop with negative space counter */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.2 3.5H28.5C37.8 3.5 44.5 9 42.5 19C40.8 27.5 33.2 33.5 23.5 33.5H9.5L13.2 3.5ZM20.8 9.8L17.8 27.2H23.2C29.2 27.2 34 23 35.2 16.8C36.2 11.5 32.5 9.8 26.8 9.8H20.8Z"
            fill="url(#brandDBodyGrad)"
          />

          {/* Subtle top rim highlight for sleek metallic/sports finish */}
          <path
            d="M13.2 3.5H28.5C32.5 3.5 36.5 4.8 39.5 7.2L38 8.8C35.5 6.8 32 5.5 28.5 5.5H15.5L13.2 3.5Z"
            fill="url(#dTopRim)"
          />
        </svg>

        {/* Brand Text: DREAD in dark navy, DYN in bright electric blue */}
        <div className={`font-black italic tracking-tight ${textSizes[size]} leading-none`}>
          <span className="text-[#0B1E38]">DREAD</span>{' '}
          <span className="text-[#087CF0]">DYN</span>
        </div>
      </div>

      {showSubtitle && (
        <span
          className={`font-medium tracking-normal text-[#4A5F7D] mt-1 leading-tight ${subSizes[size]}`}
        >
          Premium Card Store
        </span>
      )}
    </div>
  );
};
