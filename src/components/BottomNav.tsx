import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CreditCard, Star, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const location = useLocation();

  // Orders option completely removed as requested
  const navItems = [
    { label: 'Cards', path: '/', icon: CreditCard },
    { label: 'Reviews', path: '/reviews', icon: Star },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#DFEAF7] z-40 px-4 py-2 flex items-center justify-around shadow-[0_-4px_16px_rgba(16,37,68,0.05)]">
      {navItems.map((item) => {
        const isActive =
          item.path === '/'
            ? location.pathname === '/' || location.pathname === '/catalogue'
            : location.pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            to={item.path}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition select-none relative ${
              isActive ? 'text-[#087CF0]' : 'text-[#7B8EA5] hover:text-[#102544]'
            }`}
          >
            <Icon
              className={`w-5 h-5 transition-transform ${
                isActive ? 'stroke-[#087CF0] stroke-[2.2] scale-105' : 'stroke-[1.8]'
              }`}
            />
            <span
              className={`text-[10px] mt-1 font-semibold tracking-tight ${
                isActive ? 'text-[#087CF0] font-bold' : 'text-[#7B8EA5]'
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
