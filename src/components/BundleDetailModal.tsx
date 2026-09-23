import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Users, 
  Clock, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Check 
} from 'lucide-react';
import { EventBundle } from '../types';

interface BundleDetailModalProps {
  bundle: EventBundle | null;
  onClose: () => void;
  onBookBundle: (bundle: EventBundle, details: { guests: number; date: string; phone: string }) => void;
}

export const BundleDetailModal: React.FC<BundleDetailModalProps> = ({
  bundle,
  onClose,
  onBookBundle
}) => {
  if (!bundle) return null;

  const [guestCount, setGuestCount] = useState(bundle.id === 'bundle_annaprashan_gold' ? 50 : 30);
  const [eventDate, setEventDate] = useState('2026-09-15');
  const [phone, setPhone] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const calculateTotalPrice = () => {
    if (bundle.id === 'bundle_annaprashan_gold') {
      const baseGuests = 50;
      const extraPerGuest = 380;
      const guestDiff = Math.max(0, guestCount - baseGuests);
      return bundle.priceEstimate + (guestDiff * extraPerGuest);
    }
    return bundle.priceEstimate;
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      onBookBundle(bundle, { guests: guestCount, date: eventDate, phone });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border-2 border-[#D4AF37] relative flex flex-col"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#800020] via-[#5A0016] to-[#800020] text-white p-5 rounded-t-[22px] relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 p-1.5 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-block bg-[#D4AF37] text-[#800020] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
            {bundle.badge}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-bengali text-white">
            {bundle.titleBn}
          </h2>
          <p className="text-xs text-[#F5E08C] font-medium">
            {bundle.titleEn}
          </p>
          <p className="text-xs text-white/80 mt-1 font-bengali">
            {bundle.deliveryTime}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5 flex-1">
          {isBooked ? (
            <div className="py-12 text-center space-y-3 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-bengali">
                প্যাকেজ বুকিং আবেদন গৃহীত হয়েছে!
              </h3>
              <p className="text-xs text-gray-600 max-w-sm mx-auto font-bengali">
                উৎসব মিত্র হেল্পডেস্ক টিম আগামী ১৫ মিনিটের মধ্যে আপনার নম্বরে যোগাযোগ করে পুরোহিত ও সেবা নিশ্চিত করবে।
              </p>
              <div className="bg-[#FFFDF7] border border-[#D4AF37]/50 rounded-xl p-3 text-xs text-[#800020] font-semibold">
                বুকিং রেফারেন্স আইডি: UM-{Math.floor(100000 + Math.random() * 900000)}
              </div>
            </div>
          ) : (
            <>
              {/* Description */}
              <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-bengali">
                  {bundle.descriptionBn}
                </p>
                <p className="text-xs text-gray-500 mt-1 italic">
                  {bundle.description}
                </p>
              </div>

              {/* Package Inclusions List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#800020] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  প্যাকেজের ৪টি প্রধান অন্তর্ভুক্ত সেবা (Inclusions)
                </h4>
                <div className="space-y-2">
                  {bundle.items.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-gray-200 shadow-xs"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#800020]/10 text-[#800020] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        {idx + 1}
                      </div>
                      <div className="text-xs font-semibold text-gray-800 leading-snug">
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customization Form */}
              <form onSubmit={handleBooking} className="space-y-4 pt-2 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  ইভেন্টের তারিখ ও বিবরণ
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="bundle-event-date" className="text-xs font-medium text-gray-700 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#800020]" />
                      অনুষ্ঠানের তারিখ
                    </label>
                    <input
                      id="bundle-event-date"
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      required
                      className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-2 font-medium focus:outline-none focus:border-[#800020]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="bundle-guest-count" className="text-xs font-medium text-gray-700 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#800020]" />
                      অতিথি সংখ্যা (Guest Count)
                    </label>
                    <input
                      id="bundle-guest-count"
                      type="number"
                      min={10}
                      max={500}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-2 font-medium focus:outline-none focus:border-[#800020]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="bundle-contact-phone" className="text-xs font-medium text-gray-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#800020]" />
                    আপনার যোগাযোগের ফোন নম্বর
                  </label>
                  <input
                    id="bundle-contact-phone"
                    type="tel"
                    placeholder="+91 98XXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg p-2 font-medium focus:outline-none focus:border-[#800020]"
                  />
                </div>

                {/* Total Price Calculation */}
                <div className="bg-[#FFFDF7] p-3.5 rounded-xl border border-[#D4AF37]/50 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase">সর্বমোট আনুমানিক মূল্য</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-[#800020]">
                        ₹{calculateTotalPrice().toLocaleString('en-IN')}
                      </span>
                      {bundle.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{bundle.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    id="confirm-bundle-booking-btn"
                    className="bg-[#800020] hover:bg-[#600018] text-[#D4AF37] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>১-ক্লিক বুক করুন</span>
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
              </form>

              {/* Guarantees */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-gray-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  জিরো ক্যান্সেলেশন ফি
                </span>
                <span>•</span>
                <span>বৈদিক পুরোহিত নিশ্চিত</span>
                <span>•</span>
                <span>২৪/৭ হেল্পলাইন</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
