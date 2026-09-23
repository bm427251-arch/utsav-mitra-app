import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  PhoneCall, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  PhoneForwarded, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { POPULAR_PIN_CODES } from '../data/mockData';

interface EmergencySupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPin: string;
}

export const EmergencySupportModal: React.FC<EmergencySupportModalProps> = ({
  isOpen,
  onClose,
  selectedPin
}) => {
  if (!isOpen) return null;

  const [contactNumber, setContactNumber] = useState('');
  const [patientOrRitualLocation, setLocation] = useState('Nimtala Ghat / Kolkata');
  const [selectedServiceType, setSelectedServiceType] = useState('purohit_and_samagri');
  const [isDispatched, setIsDispatched] = useState(false);

  const emergencyServices = [
    { id: 'purohit_and_samagri', label: 'বৈদিক পুরোহিত ও ১০৮ প্রকার সামগ্রী কিট (Purohit & Samagri Kit)' },
    { id: 'ghat_helper', label: 'ঘাট সহকারী ও লজিস্টিক সহায়তা (Ghat Helper & Transport)' },
    { id: 'niyom_seba_catering', label: 'নিয়ম সেবা ও নিরামিষ সাত্বিক খাবার (Veg Sattvic Catering)' },
    { id: 'all_inclusive', label: 'সম্পূর্ণ পারলৌকিক দায়িত্ব প্যাকেজ (End-to-End Shraddha)' }
  ];

  const handleEmergencyDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDispatched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border-2 border-[#FF6F61] relative flex flex-col"
      >
        {/* Emergency Red Banner */}
        <div className="bg-gradient-to-r from-[#800020] via-[#A81830] to-[#FF6F61] text-white p-5 rounded-t-[22px] relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 p-1.5 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white text-[#800020] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
              ২৪x৭ সার্বক্ষণিক জরুরি সেবা
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-bengali text-white">
            শ্রাদ্ধ ও অন্ত্যোষ্টিক্রিয়া জরুরি সহায়তা
          </h2>
          <p className="text-xs text-white/90 mt-1 font-bengali">
            শোকাবহ মুহূর্তে নিয়ম সেবা, পুরোহিত ও সামগ্রী সহায়তায় আমরা আছি আপনার পাশে।
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 flex-1">
          {/* Direct Hotline Call Box */}
          <div className="bg-[#FFF5F5] border border-[#FF6F61]/40 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#FF6F61] text-white flex items-center justify-center shrink-0 shadow-md">
                <PhoneCall className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider block">
                  সরাসরি জরুরি হটলাইন
                </span>
                <span className="text-base sm:text-lg font-bold text-[#800020] tracking-wide font-mono">
                  +91 98311 00099
                </span>
              </div>
            </div>

            <a
              href="tel:+919831100099"
              className="bg-[#800020] hover:bg-[#600018] text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-transform active:scale-95 flex items-center gap-1 shrink-0"
            >
              <span>কল দিন</span>
            </a>
          </div>

          {isDispatched ? (
            <div className="py-8 text-center space-y-3 bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 font-bengali">
                জরুরি রিকোয়েস্ট গৃহীত হয়েছে!
              </h3>
              <p className="text-xs text-gray-600 font-bengali">
                আমাদের জরুরি সমন্বয়কারী আগামী ৫ মিনিটের মধ্যে আপনার দেওয়া নম্বর (<span className="font-bold">{contactNumber}</span>) এ কল করে পুরোহিত ও সেবা নিশ্চিত করছেন।
              </p>
              <div className="text-[11px] text-emerald-800 font-medium bg-white p-2 rounded-lg border border-emerald-100">
                নির্বাচিত স্থান: {patientOrRitualLocation} (PIN: {selectedPin})
              </div>
            </div>
          ) : (
            <form onSubmit={handleEmergencyDispatch} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                  প্রয়োজনীয় জরুরি সেবার ধরন
                </label>
                <div className="space-y-2">
                  {emergencyServices.map((srv) => (
                    <label
                      key={srv.id}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        selectedServiceType === srv.id
                          ? 'bg-[#FFF5F5] border-[#FF6F61] text-gray-900 font-semibold'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="service_type"
                        checked={selectedServiceType === srv.id}
                        onChange={() => setSelectedServiceType(srv.id)}
                        className="text-[#800020] focus:ring-[#800020] mt-0.5"
                      />
                      <span>{srv.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="emergency-contact-number" className="text-xs font-medium text-gray-700 block">
                  আপনার ফোন নম্বর (যাতে আমরা সাথে সাথে কল করতে পারি)
                </label>
                <input
                  id="emergency-contact-number"
                  type="tel"
                  required
                  placeholder="+91 98XXX XXXXX"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-medium focus:outline-none focus:border-[#FF6F61]"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="emergency-location-input" className="text-xs font-medium text-gray-700 block">
                  স্থান / শ্মশান ঘাট বা বাড়ির ঠিকানা
                </label>
                <input
                  id="emergency-location-input"
                  type="text"
                  required
                  value={patientOrRitualLocation}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="যেমন: নিমতলা ঘাট, কেওড়াতলা, বা সল্টলেক সেক্টর ৫"
                  className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-medium focus:outline-none focus:border-[#FF6F61]"
                />
              </div>

              <button
                type="submit"
                id="emergency-dispatch-submit-btn"
                className="w-full bg-[#FF6F61] hover:bg-[#E85D4F] text-white font-bold text-xs sm:text-sm py-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4" />
                <span className="font-bengali font-bold">তাত্ক্ষণিক সহায়তা টিম প্রেরণ করুন</span>
              </button>
            </form>
          )}

          {/* Guarantees */}
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1 text-xs text-gray-600">
            <div className="flex items-center gap-1.5 font-semibold text-gray-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>উৎসব মিত্র জরুরি নিশ্চয়তা:</span>
            </div>
            <p className="text-[11px] font-bengali text-gray-500">
              • সম্পূর্ণ খাঁটি বৈদিক নিয়মানুযায়ী আয়োজন • শ্মশান ঘাটে সরাসরি সমন্বয়কারী উপস্থিতি • ন্যায্য ও পূর্বনির্ধারিত সাম্মানিক।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
