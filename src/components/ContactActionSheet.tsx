import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  MessageCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck,
  Clock
} from 'lucide-react';
import { Vendor } from '../types';

interface ContactActionSheetProps {
  vendor: Vendor | null;
  mode: 'call' | 'whatsapp' | null;
  onClose: () => void;
}

export const ContactActionSheet: React.FC<ContactActionSheetProps> = ({
  vendor,
  mode,
  onClose
}) => {
  if (!vendor || !mode) return null;

  const [copied, setCopied] = useState(false);

  const defaultMessage = `নমস্কার ${vendor.businessNameBn}! উৎসব মিত্র (Utsav Mitra) অ্যাপ থেকে আপনার সাথে যোগাযোগ করছি। আপনার সার্ভিস সম্পর্কে বুকিং তথ্য ও কোটেশন জানতে আগ্রহী।`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-gray-200 relative overflow-hidden"
      >
        {/* Header */}
        <div className={`p-4 text-white flex items-center justify-between ${
          mode === 'call' ? 'bg-[#800020]' : 'bg-[#1EBE5D]'
        }`}>
          <div className="flex items-center gap-2">
            {mode === 'call' ? (
              <Phone className="w-5 h-5 text-[#D4AF37]" />
            ) : (
              <MessageCircle className="w-5 h-5 text-white" />
            )}
            <h3 className="font-bold text-base font-bengali">
              {mode === 'call' ? 'সরাসরি ফোন কল' : 'হোয়াটসঅ্যাপ মেসেজ'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white bg-black/20 p-1 rounded-full cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
              <img 
                src={vendor.photos[0]} 
                alt="" 
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900 font-bengali">
                {vendor.businessNameBn}
              </h4>
              <p className="text-xs text-gray-500 font-medium">{vendor.name}</p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>যাচাইকৃত নম্বর ও সেবাদাতা</span>
              </div>
            </div>
          </div>

          {mode === 'call' ? (
            <div className="space-y-3">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase">ফোন নম্বর</span>
                  <span className="text-base font-bold text-gray-900 font-mono">
                    {vendor.contactNumber}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(vendor.contactNumber)}
                  className="p-2 text-gray-500 hover:text-[#800020] bg-white rounded-lg border border-gray-200 transition-colors cursor-pointer"
                  title="নম্বর কপি করুন"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a
                href={`tel:${vendor.contactNumber.replace(/\s+/g, '')}`}
                className="w-full bg-[#800020] hover:bg-[#600018] text-white font-bold text-xs sm:text-sm py-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>সরাসরি ডায়াল করুন</span>
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-700 block">
                  হোয়াটসঅ্যাপ বার্তা প্রিভিউ (WhatsApp Message Preview):
                </label>
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-xs text-gray-800 leading-relaxed font-bengali">
                  "{defaultMessage}"
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600 px-1">
                <span>নম্বর: <strong className="font-mono">{vendor.whatsappNumber}</strong></span>
                <button
                  onClick={() => copyToClipboard(vendor.whatsappNumber)}
                  className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copied ? 'কপি হয়েছে' : 'নম্বর কপি'}
                </button>
              </div>

              <a
                href={`https://wa.me/${vendor.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(defaultMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm py-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp এ চ্যাট খুলুন</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          <div className="flex items-center justify-center gap-1 text-[11px] text-gray-400">
            <Clock className="w-3 h-3" />
            <span>গড় রেসপন্স সময়: ১০ মিনিট</span>
          </div>
        </div>
      </div>
    </div>
  );
};
