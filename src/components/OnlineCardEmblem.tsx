import React from 'react';

interface OnlineCardEmblemProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const OnlineCardEmblem: React.FC<OnlineCardEmblemProps> = ({
  className = 'w-11 h-11 sm:w-12 sm:h-12',
  showText = false,
}) => {
  return (
    <div className={`relative flex flex-col items-center justify-center shrink-0 ${className} select-none`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-[0_2px_8px_rgba(8,124,240,0.25)]"
      >
        <defs>
          {/* Dark Navy Background Gradient matching user screenshot */}
          <radialGradient id="globeBgGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0F243E" />
            <stop offset="70%" stopColor="#0B1B32" />
            <stop offset="100%" stopColor="#071324" />
          </radialGradient>

          {/* Soft Steel-Cyan Globe Line Gradient */}
          <linearGradient id="globeLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9BC2DE" />
            <stop offset="50%" stopColor="#80A5C2" />
            <stop offset="100%" stopColor="#6C92AF" />
          </linearGradient>

          {/* Holographic rim light */}
          <linearGradient id="globeRimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#087CF0" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Circular Outer Navy Base Container */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#globeBgGrad)"
          stroke="url(#globeRimGrad)"
          strokeWidth="2"
        />

        {/* Outer Circular Rim */}
        <circle
          cx="50"
          cy="50"
          r="38"
          stroke="url(#globeLineGrad)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Central Vertical Line (Meridian) */}
        <line
          x1="50"
          y1="12"
          x2="50"
          y2="88"
          stroke="url(#globeLineGrad)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Central Horizontal Line (Equator) */}
        <line
          x1="12"
          y1="50"
          x2="88"
          y2="50"
          stroke="url(#globeLineGrad)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Symmetrical Inner Ellipse (Curved Meridians) */}
        <ellipse
          cx="50"
          cy="50"
          rx="18"
          ry="38"
          stroke="url(#globeLineGrad)"
          strokeWidth="6"
          fill="none"
        />

        {/* Subtle Center Axis Point */}
        <circle cx="50" cy="50" r="2.5" fill="#BAE6FD" />
      </svg>

      {showText && (
        <span className="text-[10px] font-bold tracking-wider text-[#80A5C2] uppercase mt-1">
          Verified Mode
        </span>
      )}
    </div>
  );
};

/**
 * Clean SVG stamp icon for embedding directly on card surfaces
 */
export const OnlineGlobeStamp: React.FC<{
  className?: string;
  color?: string;
  opacity?: number;
}> = ({ className = 'w-6 h-6', color = '#88A9C3', opacity = 1 }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none`}
      style={{ opacity }}
    >
      {/* Outer Circle */}
      <circle
        cx="50"
        cy="50"
        r="38"
        stroke={color}
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      {/* Vertical Meridian */}
      <line
        x1="50"
        y1="12"
        x2="50"
        y2="88"
        stroke={color}
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      {/* Horizontal Equator */}
      <line
        x1="12"
        y1="50"
        x2="88"
        y2="50"
        stroke={color}
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      {/* Inner Elliptical Meridians */}
      <ellipse
        cx="50"
        cy="50"
        rx="18"
        ry="38"
        stroke={color}
        strokeWidth="6.5"
        fill="none"
      />
    </svg>
  );
};
