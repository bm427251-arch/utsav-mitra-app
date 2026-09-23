import React from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Star, 
  Calendar, 
  CheckCircle2, 
  Instagram, 
  Facebook, 
  Youtube, 
  Share2,
  Clock,
  Award
} from 'lucide-react';
import { Vendor } from '../types';

interface VendorDetailModalProps {
  vendor: Vendor | null;
  onClose: () => void;
  onCall: (vendor: Vendor) => void;
  onWhatsApp: (vendor: Vendor) => void;
}

export const VendorDetailModal: React.FC<VendorDetailModalProps> = ({
  vendor,
  onClose,
  onCall,
  onWhatsApp
}) => {
  if (!vendor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200 relative flex flex-col"
      >
        {/* Gallery Banner */}
        <div className="relative h-60 sm:h-72 w-full bg-gray-900 shrink-0">
          <img
            src={vendor.photos[0]}
            alt={vendor.name}
            width={600}
            height={300}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute top-4 left-4 bg-[#800020] text-[#D4AF37] text-xs font-bold px-3 py-1 rounded-md flex items-center gap-1.5 shadow-md border border-[#D4AF37]/30">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>যাচাইকৃত ভেন্ডার (Verified Partner)</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-bengali drop-shadow-md">
                {vendor.businessNameBn}
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 font-medium">
                {vendor.name} • {vendor.categoryTitleEn}
              </p>
            </div>
            <div className="bg-white/95 text-gray-900 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-bold text-sm">{vendor.rating}</span>
              <span className="text-[11px] text-gray-500">({vendor.reviewCount} রিভিউ)</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 flex-1">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-100 text-center">
            <div>
              <span className="text-[10px] text-gray-500 block uppercase">অভিজ্ঞতা</span>
              <span className="text-sm font-bold text-gray-800">{vendor.experienceYears}+ বছর</span>
            </div>
            <div className="border-x border-gray-200">
              <span className="text-[10px] text-gray-500 block uppercase">দূরত্ব</span>
              <span className="text-sm font-bold text-[#800020]">{vendor.distanceKm} কিমি</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 block uppercase">শুরু হচ্ছে</span>
              <span className="text-sm font-bold text-[#800020]">₹{vendor.startingPrice}</span>
            </div>
          </div>

          {/* Location details */}
          <div className="flex items-center gap-2 text-xs text-gray-700 bg-[#FFFDF7] border border-[#D4AF37]/40 p-3 rounded-xl">
            <MapPin className="w-4 h-4 text-[#800020] shrink-0" />
            <div>
              <span className="font-semibold">{vendor.area}, Kolkata - {vendor.pinCode}</span>
              <span className="text-gray-500 ml-1">(সার্ভিস এলাকা: সমগ্র কলকাতা ও পার্শ্ববর্তী অঞ্চল)</span>
            </div>
          </div>

          {/* About / Bio */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold text-[#800020] uppercase tracking-wider">
              ভেন্ডার পরিচিতি (About Vendor)
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-bengali">
              {vendor.bio}
            </p>
          </div>

          {/* Services Provided */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[#800020] uppercase tracking-wider">
              বিশেষায়িত সেবা সমূহ (Specialized Services)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {vendor.services.map((svc, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="font-medium">{svc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Gallery thumbnails */}
          {vendor.photos.length > 1 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#800020] uppercase tracking-wider">
                কাজের নমুনা (Recent Work Samples)
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {vendor.photos.map((photo, i) => (
                  <div key={i} className="h-20 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                    <img 
                      src={photo} 
                      alt="" 
                      width={120}
                      height={80}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Media Links */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-xs font-semibold text-gray-700">সোশ্যাল মিডিয়া প্রোফাইল:</span>
            <div className="flex items-center gap-2">
              {vendor.socialLinks.instagram && (
                <a
                  href={vendor.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs bg-pink-100 hover:bg-pink-200 text-pink-700 px-2.5 py-1 rounded-lg transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              )}
              {vendor.socialLinks.facebook && (
                <a
                  href={vendor.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2.5 py-1 rounded-lg transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </a>
              )}
              {vendor.socialLinks.youtube && (
                <a
                  href={vendor.socialLinks.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 px-2.5 py-1 rounded-lg transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span>YouTube</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-b-3xl flex items-center justify-between gap-3 shadow-lg">
          <div>
            <span className="text-[10px] text-gray-500 block">শুরু হচ্ছে</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-[#800020]">₹{vendor.startingPrice}</span>
              <span className="text-xs text-gray-500">/{vendor.priceUnit}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onCall(vendor)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>সরাসরি কল</span>
            </button>

            <button
              onClick={() => onWhatsApp(vendor)}
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp চ্যাট</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
