'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'badge';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'w-7 h-9',
    md: 'w-9 h-12',
    lg: 'w-12 h-16',
  };

  const textSizes = {
    sm: 'text-xs tracking-wider',
    md: 'text-sm tracking-widest',
    lg: 'text-base tracking-widest',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Leaf SVG with Circuit / Grid veins */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 group`}>
        <svg
          viewBox="0 0 45 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_8px_rgba(200,241,105,0.4)] transition-transform duration-300 group-hover:scale-105"
        >
          {/* Outer Leaf Silhouette */}
          <path
            d="M22.5 3 C10 16, 4 28, 4 40 C4 51, 12 57, 22.5 57 C33 57, 41 51, 41 40 C41 28, 35 16, 22.5 3 Z"
            stroke="#C8F169"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central Stem */}
          <path
            d="M22.5 14 L22.5 54"
            stroke="#C8F169"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Upper Circuit Branch Left */}
          <path
            d="M22.5 25 L12 21"
            stroke="#C8F169"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Upper Circuit Branch Right */}
          <path
            d="M22.5 25 L33 21"
            stroke="#C8F169"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Mid Circuit Branch Left with 90-degree Grid Trace */}
          <path
            d="M22.5 36 L15 36 L15 31 L8 31"
            stroke="#C8F169"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Mid Circuit Branch Right with 90-degree Grid Trace */}
          <path
            d="M22.5 36 L30 36 L30 31 L37 31"
            stroke="#C8F169"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Lower Circuit Loop / Bus Node Left */}
          <path
            d="M22.5 45 L15 45 C11 45, 11 39, 15 39"
            stroke="#C8F169"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Lower Circuit Loop / Bus Node Right */}
          <path
            d="M22.5 45 L30 45 C34 45, 34 39, 30 39"
            stroke="#C8F169"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Glowing Center Node Point */}
          <circle cx="22.5" cy="36" r="2.2" fill="#FAF1E8" />
        </svg>
      </div>

      {variant !== 'icon' && (
        <div className="flex flex-col leading-tight">
          <span className={`font-extrabold uppercase font-sans text-offwhite ${textSizes[size]}`}>
            ENERGIE
          </span>
          <span className={`font-semibold uppercase font-sans text-lime ${textSizes[size]}`}>
            GEMEINSCHAFT
          </span>
          <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase mt-0.5">
            Hertha Firnberg
          </span>
        </div>
      )}
    </div>
  );
};
