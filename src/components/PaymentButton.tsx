import React, { useState } from 'react';
import { ExternalLink, ShieldCheck, X, RefreshCw, AlertCircle } from 'lucide-react';

interface PaymentButtonProps {
  totalAmount: number;
  bookingId: string;
  onPaymentInitiated?: () => void;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  totalAmount,
  bookingId,
  onPaymentInitiated
}) => {
  const [showWebViewFallback, setShowWebViewFallback] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Razorpay.me official link with amount param (in INR)
  const razorpayMeUrl = `https://razorpay.me/@bharatmitrainfotech?amount=${totalAmount}`;

  const openRazorpayMe = (amount: number, id: string) => {
    if (onPaymentInitiated) onPaymentInitiated();

    try {
      // In Web / Mobile environment, open the official Razorpay.me page
      const opened = window.open(razorpayMeUrl, '_blank', 'noopener,noreferrer');
      
      // If popup blocker intervened or opened failed, open via location or webview fallback
      if (!opened || opened.closed || typeof opened.closed === 'undefined') {
        window.location.href = razorpayMeUrl;
      }
    } catch (err) {
      console.warn('Direct linking failed, activating WebView fallback:', err);
      setShowWebViewFallback(true);
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Primary Pay Button */}
      <button
        type="button"
        id="razorpay-me-pay-btn"
        onClick={() => openRazorpayMe(totalAmount, bookingId)}
        style={{
          backgroundColor: '#800020',
          padding: 16,
          borderRadius: 12,
          width: '100%',
          cursor: 'pointer',
          border: 'none',
          boxShadow: '0 4px 14px rgba(128, 0, 32, 0.3)',
          transition: 'all 0.2s ease-in-out'
        }}
        className="hover:brightness-110 active:scale-[0.98] transition-all flex flex-col items-center justify-center group"
      >
        <span 
          style={{ 
            color: '#D4AF37', 
            fontWeight: 'bold', 
            textAlign: 'center',
            fontSize: '15px',
            letterSpacing: '0.3px'
          }}
          className="font-bengali sm:text-base flex items-center gap-1.5"
        >
          Pay ₹{totalAmount.toLocaleString('en-IN')} with Razorpay
        </span>
        <span className="text-[11px] text-[#F5E08C]/90 mt-1 flex items-center gap-1">
          <span>GPay / PhonePe / Paytm UPI &amp; Cards</span>
          <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
        </span>
      </button>

      {/* After Payment Instructions */}
      <div className="bg-[#800020]/5 border border-[#800020]/15 rounded-xl p-3 text-center space-y-1">
        <p className="text-xs font-bold text-[#800020] flex items-center justify-center gap-1 font-bengali">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          Payment to Bharat Mitra Infotech - Utsav Mitra App
        </p>
        <p className="text-[11px] text-gray-600 font-bengali">
          বুকিং রেফারেন্স: <span className="font-mono font-bold text-gray-800">{bookingId}</span> • অর্থ পরিশোধের পর রসিদটি সংরক্ষণ করুন।
        </p>
      </div>

      {/* Alternative option to open in embedded WebView modal */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => setShowWebViewFallback(true)}
          className="text-[11px] text-gray-500 hover:text-[#800020] underline transition-colors"
        >
          অ্যাপের ভেতর পেমেন্ট স্ক্রিন খুলতে চান? (Open in-app view)
        </button>
      </div>

      {/* WebView Fallback Modal */}
      {showWebViewFallback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg h-[85vh] flex flex-col overflow-hidden shadow-2xl relative">
            {/* Modal Header */}
            <div className="bg-[#800020] text-white p-3.5 flex items-center justify-between border-b border-[#D4AF37]/30">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#D4AF37]">রেজরপে সুরক্ষিত পেমেন্ট</span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/90">
                  Bharat Mitra Infotech
                </span>
              </div>
              <button
                onClick={() => setShowWebViewFallback(false)}
                className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* In-app Frame */}
            <div className="flex-1 w-full bg-gray-50 relative">
              <iframe
                src={razorpayMeUrl}
                title="Razorpay Payment - Bharat Mitra Infotech"
                className="w-full h-full border-0"
                onError={() => setLoadError(true)}
              />

              {loadError && (
                <div className="absolute inset-0 bg-white p-6 flex flex-col items-center justify-center text-center space-y-3">
                  <AlertCircle className="w-10 h-10 text-amber-600" />
                  <h4 className="font-bold text-sm text-gray-800">
                    ব্রাউজারে সরাসরি পেমেন্ট পেজ খুলুন
                  </h4>
                  <p className="text-xs text-gray-600">
                    রেজরপে সিকিউরিটি পলিসির কারণে আইফ্রেম লোড না হলে সরাসরি লিংকে ক্লিক করুন:
                  </p>
                  <a
                    href={razorpayMeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#800020] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5"
                  >
                    <span>Open https://razorpay.me/@bharatmitrainfotech</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </a>
                </div>
              )}
            </div>

            {/* Bottom bar of modal */}
            <div className="p-3 bg-white border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500 text-[11px]">
                বুকিং: <strong className="text-gray-800">{bookingId}</strong>
              </span>
              <a
                href={razorpayMeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#800020] font-bold text-[11px] flex items-center gap-1 hover:underline"
              >
                <span>আলাদা ট্যাবে খুলুন</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
