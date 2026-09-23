import React from 'react';
import { MapPin, PhoneCall, ShieldCheck, ChevronDown, Store } from 'lucide-react';
import { POPULAR_PIN_CODES } from '../data/mockData';

interface HeaderProps {
  selectedPin: string;
  onSelectPin: (pin: string) => void;
  onOpenEmergency: () => void;
  onOpenVendorRegistration: () => void;
  onNavigateSubscription?: () => void;
  activeScreen: 'home' | 'vendors' | 'checkout' | 'payments' | 'subscription';
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedPin,
  onSelectPin,
  onOpenEmergency,
  onOpenVendorRegistration,
  onNavigateSubscription,
  activeScreen,
  onNavigateHome
}) => {
  const currentArea = POPULAR_PIN_CODES.find(p => p.pin === selectedPin)?.area || 'Kolkata';

  return (
    <header className="sticky top-0 z-40 bg-[#800020] text-white shadow-md border-b border-[#D4AF37]/30">
      {/* Top micro bar with Bengali tagline */}
      <div className="bg-[#5A0016] px-3 sm:px-6 py-1 text-xs flex items-center justify-between border-b border-[#800020]/50">
        <div className="flex items-center gap-1.5 text-[#D4AF37] font-medium font-bengali tracking-wide truncate">
          <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span className="truncate">আপনার প্রতিটি আয়োজনে বিশ্বস্ত বন্ধু • Utsav Mitra 24x7</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[#F5E08C]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="hidden sm:inline font-bengali">১০০% ভেরিফাইড ভেন্ডার নেটওয়ার্ক</span>
          <span className="sm:hidden font-bengali">ভেরিফাইড</span>
        </div>
      </div>

      {/* Main App Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand & Logo */}
        <div 
          onClick={onNavigateHome}
          className="flex items-center cursor-pointer group select-none"
        >
          <div style={{width: '140px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img src="/logo.png" alt="Utsav Mitra" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
          </div>
        </div>

        {/* Location / PIN Code selector */}
        <div className="flex items-center gap-2">
          <div className="relative group">
            <label htmlFor="header-pin-select" className="sr-only">Select Kolkata PIN Code Location</label>
            <div className="flex items-center gap-1 bg-[#5A0016]/90 hover:bg-[#460011] border border-[#D4AF37]/40 rounded-lg px-2.5 py-1.5 text-xs text-white transition-colors cursor-pointer">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <select
                id="header-pin-select"
                value={selectedPin}
                onChange={(e) => onSelectPin(e.target.value)}
                className="bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer pr-1"
              >
                {POPULAR_PIN_CODES.map((p) => (
                  <option key={p.pin} value={p.pin} className="bg-[#800020] text-white">
                    {p.pin} - {p.area.split('/')[0]}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-[#D4AF37]" />
            </div>
          </div>

          {/* Vendor Registration Button */}
          <button
            id="join-vendor-btn"
            onClick={onOpenVendorRegistration}
            className="flex items-center gap-1 bg-[#D4AF37] hover:bg-[#c29f2e] text-[#5A0016] font-bold text-xs px-2.5 py-1.5 rounded-lg shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            <Store className="w-3.5 h-3.5" />
            <span className="font-bengali hidden sm:inline">ভেন্ডার যোগ দিন</span>
            <span className="font-bengali sm:hidden">ভেন্ডার</span>
          </button>

          {/* Emergency Support Button */}
          <button
            id="emergency-support-btn"
            onClick={onOpenEmergency}
            className="flex items-center gap-1.5 bg-[#FF6F61] hover:bg-[#ff5747] text-white font-medium text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 rounded-lg shadow-md transition-transform active:scale-95 cursor-pointer animate-pulse"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="font-bengali font-semibold">জরুরি</span>
            <span className="hidden md:inline text-[11px] bg-black/20 px-1.5 py-0.5 rounded ml-0.5">২৪/৭</span>
          </button>
        </div>
      </div>
    </header>
  );
};
