import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Star, 
  SlidersHorizontal, 
  X, 
  Instagram, 
  Facebook, 
  Youtube, 
  ExternalLink,
  ChevronRight,
  Filter,
  Check
} from 'lucide-react';
import { Vendor, EventCategoryId } from '../types';
import { EVENT_CATEGORIES } from '../utils/keywordEngine';
import { POPULAR_PIN_CODES } from '../data/mockData';

interface VendorListingScreenProps {
  vendors: Vendor[];
  searchQuery: string;
  selectedCategoryId: EventCategoryId | 'all';
  selectedRadius: number;
  selectedPin: string;
  verifiedOnly: boolean;
  onUpdateFilters: (params: {
    query?: string;
    categoryId?: EventCategoryId | 'all';
    radius?: number;
    pin?: string;
    verifiedOnly?: boolean;
    sortBy?: 'relevance' | 'rating' | 'price_low' | 'price_high' | 'distance';
  }) => void;
  onSelectVendor: (vendor: Vendor) => void;
  onBack: () => void;
  onCallVendor: (vendor: Vendor) => void;
  onWhatsAppVendor: (vendor: Vendor) => void;
}

export const VendorListingScreen: React.FC<VendorListingScreenProps> = ({
  vendors,
  searchQuery,
  selectedCategoryId,
  selectedRadius,
  selectedPin,
  verifiedOnly,
  onUpdateFilters,
  onSelectVendor,
  onBack,
  onCallVendor,
  onWhatsAppVendor
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'price_low' | 'price_high' | 'distance'>('relevance');

  const radiusOptions = [3, 5, 10, 25, 50];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateFilters({ query: localQuery });
  };

  const currentCategory = EVENT_CATEGORIES.find(c => c.id === selectedCategoryId);

  return (
    <div className="space-y-4 pb-16 max-w-7xl mx-auto px-3 sm:px-6">
      {/* Top Header & Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-200 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <button
            id="back-to-home-btn"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#800020] hover:bg-[#800020]/10 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোমে ফিরুন</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">
              <span className="font-bold text-[#800020]">{vendors.length}</span> জন ভেন্ডার পাওয়া গেছে
            </span>
            <button
              id="toggle-filter-drawer-btn"
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                isFilterDrawerOpen || verifiedOnly || selectedRadius < 25
                  ? 'bg-[#800020] text-white border-[#800020]'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>ফিল্টার</span>
              {(verifiedOnly || selectedRadius < 25) && (
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
              )}
            </button>
          </div>
        </div>

        {/* Search input in listing */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              id="listing-search-input"
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="কিওয়ার্ড দিয়ে ফিল্টার করুন (e.g., purohit, catering, sradho)..."
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#800020] focus:bg-white transition-all font-medium"
            />
            {localQuery && (
              <button
                type="button"
                onClick={() => {
                  setLocalQuery('');
                  onUpdateFilters({ query: '' });
                }}
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#800020] hover:bg-[#66001A] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shrink-0 cursor-pointer"
          >
            সার্চ
          </button>
        </form>

        {/* Category Horizontal Scroll Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <button
            onClick={() => onUpdateFilters({ categoryId: 'all' })}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
              selectedCategoryId === 'all'
                ? 'bg-[#800020] text-white shadow-xs font-bold'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            সকল সেবা (All)
          </button>
          {EVENT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onUpdateFilters({ categoryId: cat.id })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-all font-bengali ${
                selectedCategoryId === cat.id
                  ? 'bg-[#800020] text-[#D4AF37] border border-[#D4AF37] shadow-xs font-bold'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {cat.titleBn}
            </button>
          ))}
        </div>

        {/* Active Filter Chips */}
        {(searchQuery || selectedCategoryId !== 'all' || verifiedOnly || selectedRadius < 25) && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs border-t border-gray-100">
            <span className="text-gray-400 text-[11px]">সক্রিয় ফিল্টার:</span>
            {searchQuery && (
              <span className="bg-[#800020]/10 text-[#800020] px-2 py-0.5 rounded-md flex items-center gap-1">
                কিওয়ার্ড: "{searchQuery}"
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => {
                    setLocalQuery('');
                    onUpdateFilters({ query: '' });
                  }} 
                />
              </span>
            )}
            {selectedCategoryId !== 'all' && currentCategory && (
              <span className="bg-[#D4AF37]/20 text-[#800020] px-2 py-0.5 rounded-md flex items-center gap-1 font-bengali">
                {currentCategory.titleBn}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => onUpdateFilters({ categoryId: 'all' })} 
                />
              </span>
            )}
            {verifiedOnly && (
              <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                শুধু যাচাইকৃত
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => onUpdateFilters({ verifiedOnly: false })} 
                />
              </span>
            )}
            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
              ব্যাসার্ধ: {selectedRadius} km
            </span>
          </div>
        )}
      </div>

      {/* Filter Drawer / Panel (Expandable) */}
      {isFilterDrawerOpen && (
        <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-200 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h3 className="font-bold text-sm text-[#800020] flex items-center gap-1.5 font-bengali">
              <Filter className="w-4 h-4 text-[#D4AF37]" />
              লোকেশন ও সার্চ ফিল্টার কনফিগারেশন
            </h3>
            <button
              onClick={() => setIsFilterDrawerOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-xs"
            >
              বন্ধ করুন
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Radius Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">
                সার্চ ব্যাসার্ধ (Radius distance)
              </label>
              <div className="flex items-center gap-1.5">
                {radiusOptions.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => onUpdateFilters({ radius: r })}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedRadius === r
                        ? 'bg-[#800020] text-white shadow-xs'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {r} km
                  </button>
                ))}
              </div>
            </div>

            {/* PIN Code Quick Select */}
            <div className="space-y-1.5">
              <label htmlFor="filter-drawer-pin" className="text-xs font-semibold text-gray-700 block">
                PIN কোড পরিবর্তন করুন
              </label>
              <select
                id="filter-drawer-pin"
                value={selectedPin}
                onChange={(e) => onUpdateFilters({ pin: e.target.value })}
                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-2 font-medium focus:outline-none focus:border-[#800020]"
              >
                {POPULAR_PIN_CODES.map((p) => (
                  <option key={p.pin} value={p.pin}>
                    {p.pin} - {p.area}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options & Verified Toggle */}
            <div className="space-y-2">
              <div>
                <label htmlFor="filter-drawer-sort" className="text-xs font-semibold text-gray-700 block mb-1">
                  সর্টিং পদ্ধতি (Sort by)
                </label>
                <select
                  id="filter-drawer-sort"
                  value={sortBy}
                  onChange={(e) => {
                    const val = e.target.value as any;
                    setSortBy(val);
                    onUpdateFilters({ sortBy: val });
                  }}
                  className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-2 font-medium focus:outline-none focus:border-[#800020]"
                >
                  <option value="relevance">প্রাসঙ্গিকতা (Relevance)</option>
                  <option value="rating">সেরা রেটিং (Highest Rating)</option>
                  <option value="distance">নিকটবর্তী দূরত্ব (Nearest Distance)</option>
                  <option value="price_low">কম খরচ প্রথমে (Price: Low to High)</option>
                  <option value="price_high">বেশি খরচ প্রথমে (Price: High to Low)</option>
                </select>
              </div>

              <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => onUpdateFilters({ verifiedOnly: e.target.checked })}
                  className="rounded text-[#800020] focus:ring-[#800020]"
                />
                <span>শুধু ভেরিফাইড ভেন্ডার দেখান (Verified Only)</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Vendor Cards List */}
      {vendors.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 space-y-3">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-gray-800 font-bengali">
            কোনো ভেন্ডার খুঁজে পাওয়া যায়নি
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto font-bengali">
            আপনার নির্বাচিত PIN কোড ({selectedPin}) বা কিওয়ার্ডের জন্য এই মুহূর্তে কোনো সার্ভিস পাওয়া যায়নি। অনুগ্রহ করে সার্চ ফিল্টার বা ব্যাসার্ধ বাড়িয়ে দেখুন।
          </p>
          <button
            onClick={() => {
              setLocalQuery('');
              onUpdateFilters({ query: '', categoryId: 'all', radius: 50, verifiedOnly: false });
            }}
            className="bg-[#800020] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            ফিল্টার রিসেট করুন
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white rounded-2xl border border-gray-200 hover:border-[#D4AF37] shadow-xs hover:shadow-md transition-all p-4 sm:p-5 flex flex-col md:flex-row gap-4 sm:gap-6 group"
            >
              {/* Vendor Image & Verification Tag */}
              <div 
                onClick={() => onSelectVendor(vendor)}
                className="w-full md:w-56 h-44 sm:h-48 md:h-auto rounded-xl overflow-hidden relative shrink-0 bg-gray-100 cursor-pointer"
              >
                <img
                  src={vendor.photos[0]}
                  alt={vendor.name}
                  width={320}
                  height={200}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 bg-[#800020] text-[#D4AF37] text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1 border border-[#D4AF37]/40">
                  <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                  <span>যাচাইকৃত ভেন্ডার</span>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/85 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#FF6F61]" />
                  <span>{vendor.distanceKm} km away</span>
                </div>
              </div>

              {/* Vendor Information & Details */}
              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 
                          onClick={() => onSelectVendor(vendor)}
                          className="font-bold text-base sm:text-lg text-gray-900 font-bengali group-hover:text-[#800020] transition-colors cursor-pointer"
                        >
                          {vendor.businessNameBn}
                        </h2>
                      </div>
                      <p className="text-xs text-gray-600 font-medium">
                        {vendor.name} • <span className="text-[#800020] font-semibold">{vendor.experienceYears}+ বছর অভিজ্ঞতা</span>
                      </p>
                    </div>

                    {/* Rating Badge */}
                    <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-xs font-bold text-amber-900">{vendor.rating}</span>
                      <span className="text-[10px] text-gray-500">({vendor.reviewCount})</span>
                    </div>
                  </div>

                  {/* Location and Category */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#800020]" />
                      {vendor.area}, Kolkata - {vendor.pinCode}
                    </span>
                    <span>•</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[11px]">
                      {vendor.categoryTitleEn}
                    </span>
                  </div>

                  {/* Bio snippet */}
                  <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                    {vendor.bio}
                  </p>

                  {/* Service specializations */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {vendor.services.map((srv, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-[#FFF8E7] text-[#800020] border border-[#D4AF37]/30 px-2 py-0.5 rounded-md font-medium"
                      >
                        ✓ {srv}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Media Previews & Action Buttons */}
                <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  {/* Social Media Links Preview */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-500 font-medium">পোর্টফোলিও:</span>
                    {vendor.socialLinks.instagram && (
                      <a
                        href={vendor.socialLinks.instagram}
                        target="_blank"
                        rel="noreferrer"
                        title="Instagram Portfolio"
                        className="w-7 h-7 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 flex items-center justify-center transition-colors"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {vendor.socialLinks.facebook && (
                      <a
                        href={vendor.socialLinks.facebook}
                        target="_blank"
                        rel="noreferrer"
                        title="Facebook Page"
                        className="w-7 h-7 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-colors"
                      >
                        <Facebook className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {vendor.socialLinks.youtube && (
                      <a
                        href={vendor.socialLinks.youtube}
                        target="_blank"
                        rel="noreferrer"
                        title="YouTube Videos"
                        className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors"
                      >
                        <Youtube className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Starting Price and Direct Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <div className="text-left sm:text-right pr-2">
                      <span className="text-[10px] text-gray-400 block leading-none">শুরু হচ্ছে</span>
                      <span className="text-sm font-bold text-[#800020]">
                        ₹{vendor.startingPrice}
                      </span>
                      <span className="text-[10px] text-gray-500 ml-0.5">/{vendor.priceUnit}</span>
                    </div>

                    {/* Direct [Call] Action Button */}
                    <button
                      id={`call-vendor-${vendor.id}`}
                      onClick={() => onCallVendor(vendor)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                      title="Direct Call"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>কল করুন</span>
                    </button>

                    {/* Direct [WhatsApp] Action Button */}
                    <button
                      id={`whatsapp-vendor-${vendor.id}`}
                      onClick={() => onWhatsAppVendor(vendor)}
                      className="bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                      title="Direct WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
