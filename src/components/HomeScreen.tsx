import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  Flame, 
  HeartHandshake, 
  Cake, 
  Music, 
  PhoneCall, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  MapPin, 
  Clock,
  Zap,
  Tag
} from 'lucide-react';
import { EventCategory, EventBundle, Vendor, EventCategoryId } from '../types';
import { EVENT_CATEGORIES, getKeywordSuggestions } from '../utils/keywordEngine';
import { READY_EVENT_BUNDLES } from '../data/mockData';
import { useDebounce } from '../hooks/useDebounce';

interface HomeScreenProps {
  onSearchSubmit: (query: string, categoryId?: EventCategoryId) => void;
  onSelectCategory: (categoryId: EventCategoryId) => void;
  onSelectBundle: (bundle: EventBundle) => void;
  onOpenEmergency: () => void;
  onSelectVendor: (vendor: Vendor) => void;
  onOpenVendorRegistration?: () => void;
  onOpenSubscription?: () => void;
  featuredVendors: Vendor[];
  selectedPin: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSearchSubmit,
  onSelectCategory,
  onSelectBundle,
  onOpenEmergency,
  onSelectVendor,
  onOpenVendorRegistration,
  onOpenSubscription,
  featuredVendors,
  selectedPin
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounce search query by 300ms to eliminate screen stutter and raster glitches
  const debouncedQuery = useDebounce(searchQuery, 300);
  const suggestions = getKeywordSuggestions(debouncedQuery, 6);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsDropdownOpen(false);
      onSearchSubmit(searchQuery);
    }
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6" />;
      case 'Cake':
        return <Cake className="w-6 h-6" />;
      case 'Flame':
        return <Flame className="w-6 h-6" />;
      case 'Music':
        return <Music className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const popularKeywords = [
    { label: 'Biye Catering (বিয়ে)', query: 'biye' },
    { label: 'Mukhe Bhat (মুখে ভাত)', query: 'mukhe bhat' },
    { label: 'Sradho Purohit (শ্রাদ্ধ)', query: 'sradho' },
    { label: 'Baul Artist (বাউল গান)', query: 'baul artist' },
    { label: 'Mandap Decor', query: 'mandap' },
    { label: 'Magician Show', query: 'magician' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Section with Search & Bengali Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#800020] via-[#6B001B] to-[#FAFAFA] text-white pt-6 pb-8 px-4 sm:px-6 rounded-b-3xl shadow-sm">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F5E08C] text-xs font-bengali">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>পশ্চিমবঙ্গের নির্ভরযোগ্য ইভেন্ট ও রিচুয়াল প্ল্যাটফর্ম</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight font-bengali leading-tight">
            আনন্দ উৎসব হোক কিংবা শ্রদ্ধার্ঘ্য — <br className="hidden sm:inline" />
            <span className="text-[#D4AF37]">উৎসব মিত্র</span> সবসময় আপনার পাশে
          </h1>

          <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto font-bengali">
            বিবাহ, অন্নপ্রাশন, জন্মদিন কিংবা শ্রাদ্ধের পারলৌকিক অনুষ্ঠান — যাচাইকৃত পুরোহিত, ক্যাটারিং ও ডেকোরেটর খুঁজুন নিমিষেই।
          </p>

          {/* Dynamic Top Search Bar with auto-keyword matching */}
          <div ref={searchContainerRef} className="relative max-w-2xl mx-auto pt-2 text-left">
            <div className="relative flex items-center bg-white rounded-2xl shadow-xl p-1.5 border-2 border-[#D4AF37]">
              <div className="pl-3 text-[#800020]">
                <Search className="w-5 h-5" />
              </div>
              <input
                id="main-keyword-search"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                onKeyDown={handleSearchKeyDown}
                placeholder="সার্চ করুন: catering, biye, mukhe bhat, sradho, purohit, baul..."
                className="w-full pl-3 pr-4 py-2 text-sm text-[#1F1A1C] placeholder:text-gray-400 focus:outline-none font-medium"
              />
              <button
                id="search-submit-btn"
                onClick={() => {
                  setIsDropdownOpen(false);
                  onSearchSubmit(searchQuery);
                }}
                className="bg-[#800020] hover:bg-[#66001A] text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-1 shrink-0"
              >
                <span>খুঁজুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Keyword Auto-Match Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                <div className="p-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1 text-[#800020] font-semibold">
                    <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {searchQuery ? 'স্বয়ংক্রিয় কিওয়ার্ড ম্যাচিং' : 'জনপ্রিয় কিওয়ার্ড সমূহ'}
                  </span>
                  <span>PIN: {selectedPin}</span>
                </div>

                <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
                  {suggestions.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSearchQuery(item.keyword);
                        setIsDropdownOpen(false);
                        onSearchSubmit(item.keyword, item.categoryId);
                      }}
                      className="px-4 py-2.5 hover:bg-[#FFFDF7] flex items-center justify-between cursor-pointer group transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Tag className="w-3.5 h-3.5 text-[#D4AF37] group-hover:text-[#800020]" />
                        <span className="text-sm font-medium text-gray-800 group-hover:text-[#800020]">
                          {item.keyword}
                        </span>
                      </div>
                      <span className="text-[11px] bg-gray-100 group-hover:bg-[#800020]/10 text-gray-600 group-hover:text-[#800020] px-2 py-0.5 rounded-md">
                        {item.categoryTitle}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Keyword Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 text-xs">
              <span className="text-white/70 text-[11px] shrink-0 font-bengali">জনপ্রিয়:</span>
              {popularKeywords.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(item.query);
                    onSearchSubmit(item.query);
                  }}
                  className="bg-white/15 hover:bg-white/30 text-white px-2.5 py-1 rounded-full whitespace-nowrap text-[11px] transition-colors cursor-pointer font-bengali border border-white/10"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Emergency Ritual & Funeral Logistics Support Banner */}
        <section className="bg-gradient-to-r from-[#FF6F61] via-[#E85D4F] to-[#800020] text-white rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#FF6F61]/40">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-[#F5E08C]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-white text-[#800020] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  24x7 Emergency
                </span>
                <span className="text-xs text-white/90 font-medium">শ্রাদ্ধ ও পারলৌকিক ক্রিয়া সাপোর্ট</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-bengali text-white mt-0.5">
                জরুরি পুরোহিত, নিয়ম সেবা ও সামগ্রী সরবরাহ প্রয়োজন?
              </h2>
              <p className="text-xs text-white/80 font-bengali">
                যেকোনো সময় সরাসরি সহায়তা ও ২ ঘণ্টার মধ্যে প্রতিনিধি উপস্থিতির নিশ্চয়তা।
              </p>
            </div>
          </div>

          <button
            id="home-emergency-call-btn"
            onClick={onOpenEmergency}
            className="w-full sm:w-auto bg-white hover:bg-gray-100 text-[#800020] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer shrink-0 flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-[#FF6F61]" />
            <span className="font-bengali font-semibold">জরুরি সহায়তা নিন</span>
          </button>
        </section>

        {/* 1-Click Event Bundles Carousel */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
                <h2 className="text-lg sm:text-xl font-bold text-[#800020] font-bengali">
                  ১-ক্লিক রেডি প্যাকেজ (1-Click Event Bundles)
                </h2>
              </div>
              <p className="text-xs text-gray-500 font-bengali">
                কোনো ঝামেলা ছাড়াই সম্পূর্ণ আয়োজনের প্যাকেজ — এক ক্লিকে বুকিং
              </p>
            </div>
            <span className="text-xs font-semibold text-[#800020] bg-[#800020]/10 px-2.5 py-1 rounded-lg">
              ৩টি স্পেশাল প্যাকেজ
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {READY_EVENT_BUNDLES.map((bundle) => (
              <div
                key={bundle.id}
                onClick={() => onSelectBundle(bundle)}
                className="bg-white rounded-2xl border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer group relative overflow-hidden"
              >
                {/* Top Gold Ribbon */}
                <div className="absolute top-0 right-0">
                  <span className="bg-[#D4AF37] text-[#800020] text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider block">
                    {bundle.badge}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-[#800020]/10 text-[#800020] flex items-center justify-center">
                      {bundle.categoryId === 'shraddha_rituals' ? (
                        <Flame className="w-5 h-5 text-[#800020]" />
                      ) : (
                        <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-gray-900 font-bengali group-hover:text-[#800020] transition-colors leading-snug">
                        {bundle.titleBn}
                      </h3>
                      <p className="text-[11px] text-gray-500 font-medium">
                        {bundle.titleEn}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-2 font-bengali">
                    {bundle.descriptionBn}
                  </p>

                  {/* Included Items Checklist */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-[#800020] uppercase tracking-wider block">
                      প্যাকেজের অন্তর্ভুক্ত:
                    </span>
                    {bundle.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 block leading-none">আনুমানিক খরচ</span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-lg font-bold text-[#800020]">
                        ₹{bundle.priceEstimate.toLocaleString('en-IN')}
                      </span>
                      {bundle.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{bundle.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  <button 
                    id={`view-bundle-${bundle.id}`}
                    className="bg-[#800020] group-hover:bg-[#D4AF37] text-white group-hover:text-[#800020] text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>বিস্তারিত</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4 Core Event Categories Grid */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#800020]"></span>
                <h2 className="text-lg sm:text-xl font-bold text-[#800020] font-bengali">
                  ইভেন্ট ক্যাটাগরি ও সেবা সমূহ
                </h2>
              </div>
              <p className="text-xs text-gray-500 font-bengali">
                আপনার প্রয়োজন অনুযায়ী ক্যাটাগরি নির্বাচন করুন
              </p>
            </div>
            <button
              onClick={() => onSearchSubmit('')}
              className="text-xs font-semibold text-[#800020] hover:text-[#5A0016] flex items-center gap-1 cursor-pointer"
            >
              <span>সকল ভেন্ডার</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EVENT_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                id={`cat-card-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-[#800020] shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-[#800020]/10 text-[#800020] group-hover:bg-[#800020] group-hover:text-[#D4AF37] flex items-center justify-center transition-colors">
                      {getCategoryIcon(cat.iconName)}
                    </div>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                      {cat.vendorCount}+ ভেন্ডার
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 group-hover:text-[#800020] font-bengali transition-colors">
                    {cat.titleBn}
                  </h3>
                  <p className="text-xs font-semibold text-[#800020] mb-1">
                    {cat.titleEn}
                  </p>
                  <p className="text-xs text-gray-500 font-bengali line-clamp-2">
                    {cat.subtitleBn}
                  </p>

                  {/* Keywords preview pills */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {cat.keywords.slice(0, 4).map((kw, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-mono"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#800020]">
                  <span>ভেন্ডার তালিকা দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Verified Vendors Spotlight */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#800020]" />
                <h2 className="text-lg sm:text-xl font-bold text-[#800020] font-bengali">
                  শীর্ষ যাচাইকৃত ভেন্ডার (Verified Local Vendors)
                </h2>
              </div>
              <p className="text-xs text-gray-500 font-bengali">
                PIN: {selectedPin} এলাকার নিকটবর্তী সেরা রেটিংপ্রাপ্ত সেবাদানকারী
              </p>
            </div>
            <button
              onClick={() => onSearchSubmit('')}
              className="text-xs font-semibold text-[#800020] hover:text-[#5A0016] flex items-center gap-1 cursor-pointer"
            >
              <span>আরও দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredVendors.slice(0, 3).map((vendor) => (
              <div
                key={vendor.id}
                onClick={() => onSelectVendor(vendor)}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#D4AF37] shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col"
              >
                <div className="relative h-40 bg-gray-100 overflow-hidden">
                  <img
                    src={vendor.photos[0]}
                    alt={vendor.name}
                    width={400}
                    height={160}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#800020] text-white text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                    <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                    <span>যাচাইকৃত ভেন্ডার</span>
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-white/95 text-gray-800 text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{vendor.rating}</span>
                    <span className="text-[10px] text-gray-500">({vendor.reviewCount})</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm font-bengali group-hover:text-[#800020] transition-colors">
                      {vendor.businessNameBn}
                    </h3>
                    <p className="text-xs font-medium text-gray-600">
                      {vendor.name}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#800020]" />
                      <span>{vendor.area} ({vendor.distanceKm} km)</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-gray-500 block">শুরু হচ্ছে</span>
                      <span className="font-bold text-[#800020] text-sm">
                        ₹{vendor.startingPrice}
                      </span>
                      <span className="text-[10px] text-gray-500 ml-0.5">/{vendor.priceUnit}</span>
                    </div>
                    <span className="bg-[#800020]/10 text-[#800020] font-semibold px-2 py-1 rounded text-[11px]">
                      প্রোফাইল দেখুন
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vendor Onboarding Callout Banner */}
        {(onOpenVendorRegistration || onOpenSubscription) && (
          <section className="bg-gradient-to-r from-[#800020] via-[#600018] to-[#800020] rounded-2xl p-5 sm:p-6 text-white border-2 border-[#D4AF37]/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold tracking-wider bg-[#D4AF37]/20 text-[#F5E08C] border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-full">
                ভেন্ডার পার্টনারশিপ ও মেম্বারশিপ
              </span>
              <h3 className="text-base sm:text-lg font-bold font-bengali">
                আপনি কি পুরোহিত, ক্যাটারার, ডেকোরেটর বা ফটোগ্রাফার?
              </h3>
              <p className="text-xs text-gray-200 font-bengali max-w-xl">
                উৎসব মিত্রে যুক্ত হয়ে সরাসরি গ্রাহক লিড পান। ১ মাস, ৬ মাস ও ১ বছরের সুলভ সাবস্ক্রিপশন প্ল্যান নিয়ে ব্যবসা বাড়ান।
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0">
              {onOpenSubscription && (
                <button
                  onClick={onOpenSubscription}
                  id="home-vendor-plans-btn"
                  className="bg-[#D4AF37] hover:bg-[#bfa032] text-[#5A0016] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#5A0016]" />
                  <span>প্ল্যান ও অফার (₹৫৯৯)</span>
                </button>
              )}
              {onOpenVendorRegistration && (
                <button
                  onClick={onOpenVendorRegistration}
                  id="home-vendor-register-btn"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-white/30 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>রেজিস্ট্রেশন করুন</span>
                </button>
              )}
            </div>
          </section>
        )}

        {/* Trust Guarantees */}
        <section className="bg-white rounded-2xl p-5 border border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center p-2 space-y-1">
            <div className="w-10 h-10 rounded-full bg-[#800020]/10 text-[#800020] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#800020]" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 font-bengali">১০০% যাচাইকৃত সেবাদাতা</h3>
            <p className="text-xs text-gray-500 font-bengali">আইডি, রিভিউ ও ব্যাকগ্রাউন্ড ভেরিফাইড প্রফেশনাল</p>
          </div>

          <div className="flex flex-col items-center p-2 space-y-1">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 text-[#800020] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#800020]" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 font-bengali">সময়মতো নির্ভরযোগ্য উপস্থিতি</h3>
            <p className="text-xs text-gray-500 font-bengali">নির্দিষ্ট সময়ে পুরোহিত ও সামগ্রী পৌঁছানোর নিশ্চয়তা</p>
          </div>

          <div className="flex flex-col items-center p-2 space-y-1">
            <div className="w-10 h-10 rounded-full bg-[#FF6F61]/20 text-[#800020] flex items-center justify-center">
              <PhoneCall className="w-5 h-5 text-[#FF6F61]" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 font-bengali">২৪/৭ কাস্টমার হেল্পলাইন</h3>
            <p className="text-xs text-gray-500 font-bengali">যেকোনো প্রশ্ন বা ইভেন্ট পরিচালনায় সার্বক্ষণিক বন্ধু</p>
          </div>
        </section>
      </div>
    </div>
  );
};
