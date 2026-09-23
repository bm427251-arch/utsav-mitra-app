import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  CheckCircle, 
  Copy, 
  Check, 
  Share2, 
  AlertCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  PhoneCall, 
  Receipt,
  Sparkles
} from 'lucide-react';
import { initiatePayment, createPaymentLink, PaymentResult } from '../services/razorpayService';
import { PaymentButton } from './PaymentButton';

export interface CheckoutItem {
  id: string;
  title: string;
  category: string;
  vendorName?: string;
  price: number;
  date?: string;
  guests?: number;
  pinCode?: string;
}

interface CheckoutScreenProps {
  item: CheckoutItem;
  onBack: () => void;
  onSuccess: (paymentId: string, bookingId: string) => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  item,
  onBack,
  onSuccess
}) => {
  const [paymentType, setPaymentType] = useState<'advance' | 'full'>('advance');
  const [customerName, setCustomerName] = useState('অরিন্দম মুখোপাধ্যায়');
  const [customerPhone, setCustomerPhone] = useState('9830123456');
  const [customerEmail, setCustomerEmail] = useState('arindam.m@gmail.com');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Payment Link State
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Generate unique booking ID
  const [bookingId] = useState(() => `UM-${Math.floor(100000 + Math.random() * 900000)}`);

  // Calculations
  const fullAmount = item.price;
  const advanceAmount = Math.round(item.price * 0.20); // 20% Advance Token
  const payableAmount = paymentType === 'advance' ? advanceAmount : fullAmount;
  const balanceDue = fullAmount - payableAmount;

  // Handle Pay with Razorpay
  const handlePayWithRazorpay = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await initiatePayment(payableAmount, bookingId, {
        serviceName: item.title,
        customerName,
        customerPhone,
        customerEmail,
        notes: {
          vendor: item.vendorName || 'Utsav Mitra Verified Vendor',
          payment_type: paymentType,
          full_amount: String(fullAmount),
          balance_due: String(balanceDue)
        }
      });

      if (result.success && result.paymentId) {
        setPaymentResult(result);
        onSuccess(result.paymentId, bookingId);
      } else {
        setErrorMessage(result.error || 'পেমেন্ট সম্পন্ন করা যায়নি।');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'একটি ত্রুটি ঘটেছে।');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Generate Payment Link
  const handleGeneratePaymentLink = async () => {
    setIsLoading(true);
    const linkRes = await createPaymentLink(
      payableAmount,
      customerName,
      customerPhone,
      `Utsav Mitra Booking: ${item.title}`
    );
    setIsLoading(false);

    if (linkRes.success && linkRes.paymentLinkUrl) {
      setGeneratedLink(linkRes.paymentLinkUrl);
    }
  };

  const copyToClipboard = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-24 text-gray-900 font-sans">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-[#800020] text-white px-4 py-3.5 flex items-center justify-between shadow-md border-b border-[#D4AF37]/30">
        <button 
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>ফিরে যান</span>
        </button>
        <div className="text-center">
          <h1 className="text-base font-bold font-bengali">সুরক্ষিত চেকআউট</h1>
          <p className="text-[10px] text-[#F5E08C] flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
            রেজরপে সুরক্ষিত গেটওয়ে (Razorpay 256-bit SSL)
          </p>
        </div>
        <div className="w-12"></div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Success Banner if already paid */}
        {paymentResult?.success && (
          <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-5 text-center shadow-lg animate-in zoom-in-95">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-emerald-900 font-bengali">পেমেন্ট সফল হয়েছে!</h2>
            <p className="text-xs text-emerald-700 mt-1">আপনার উৎসব বুকিং নিশ্চিত করা হয়েছে</p>
            
            <div className="bg-white rounded-xl p-3 my-4 border border-emerald-200 text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-gray-500">বুকিং আইডি:</span>
                <span className="font-bold text-gray-900">{bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">রেজরপে পেমেন্ট আইডি:</span>
                <span className="font-mono font-bold text-emerald-800">{paymentResult.paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">পরিশোধিত অর্থ:</span>
                <span className="font-bold text-[#800020]">₹{payableAmount.toLocaleString('en-IN')}</span>
              </div>
              {balanceDue > 0 && (
                <div className="flex justify-between pt-1 border-t border-gray-100 text-amber-700">
                  <span>অনুষ্ঠানের দিন বকেয়া:</span>
                  <span className="font-bold">₹{balanceDue.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            <button
              onClick={onBack}
              className="w-full bg-[#800020] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#600018] transition-colors"
            >
              হোম স্ক্রিনে ফিরে যান
            </button>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">পেমেন্ট সম্পন্ন হয়নি</p>
              <p className="text-[11px] mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between border-b border-gray-100 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#800020] bg-[#800020]/10 px-2 py-0.5 rounded-full">
                {item.category}
              </span>
              <h2 className="text-base font-bold text-gray-900 font-bengali mt-1">
                {item.title}
              </h2>
              {item.vendorName && (
                <p className="text-xs text-gray-600 mt-0.5 flex items-center gap-1 font-bengali">
                  <span>ভেন্ডার:</span>
                  <span className="font-semibold text-gray-800">{item.vendorName}</span>
                </p>
              )}
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-400">বুকিং রেফারেন্স</span>
              <p className="font-mono text-xs font-bold text-gray-700">{bookingId}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs py-3 border-b border-gray-100 text-gray-600">
            {item.date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#800020]" />
                <span>তারিখ: {item.date}</span>
              </div>
            )}
            {item.guests && (
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#800020]" />
                <span>অতিথি: {item.guests} জন</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 col-span-2">
              <MapPin className="w-3.5 h-3.5 text-[#800020]" />
              <span>লোকেশন: কলকাতা ও সংলগ্ন এলাকা (PIN {item.pinCode || '700091'})</span>
            </div>
          </div>

          {/* Payment Type Selection: Advance 20% vs Full Payment */}
          <div className="pt-3">
            <label className="text-xs font-bold text-gray-800 block mb-2 font-bengali">
              পেমেন্ট বিকল্প নির্বাচন করুন:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentType('advance')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentType === 'advance'
                    ? 'border-[#800020] bg-[#800020]/5 ring-2 ring-[#800020]/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900 font-bengali">২০% অগ্রিম টোকেন</span>
                  {paymentType === 'advance' && <Check className="w-3.5 h-3.5 text-[#800020]" />}
                </div>
                <p className="text-sm font-bold text-[#800020] mt-1">₹{advanceAmount.toLocaleString('en-IN')}</p>
                <span className="text-[10px] text-gray-500 block">বাকি টাকা কাজের দিন প্রদেয়</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentType('full')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentType === 'full'
                    ? 'border-[#800020] bg-[#800020]/5 ring-2 ring-[#800020]/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900 font-bengali">সম্পূর্ণ পরিশোধ</span>
                  {paymentType === 'full' && <Check className="w-3.5 h-3.5 text-[#800020]" />}
                </div>
                <p className="text-sm font-bold text-[#800020] mt-1">₹{fullAmount.toLocaleString('en-IN')}</p>
                <span className="text-[10px] text-emerald-600 block">১০০% ক্যাশলেস নিশ্চয়তা</span>
              </button>
            </div>
          </div>
        </div>

        {/* Customer Information Inputs */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 space-y-3">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider font-bengali flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#800020]" />
            যোগাযোগ ও রসিদ তথ্য
          </h3>

          <div className="grid grid-cols-1 gap-2.5 text-xs">
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">গ্রাহকের নাম (Customer Name)</label>
              <input 
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#800020] text-xs font-medium"
                placeholder="আপনার পুরো নাম লিখুন"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">ফোন নম্বর (WhatsApp)</label>
                <input 
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#800020] text-xs font-medium"
                  placeholder="9830000000"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">ইমেইল (রসিদ পাঠাতে)</label>
                <input 
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#800020] text-xs font-medium"
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 space-y-2 text-xs">
          <div className="flex justify-between text-gray-600">
            <span>প্যাকেজ / সার্ভিস মূল্য:</span>
            <span>₹{fullAmount.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>প্ল্যাটফর্ম চার্জ ও জিএসটি (GST):</span>
            <span className="text-emerald-700 font-medium">বিনামূল্যে (₹০)</span>
          </div>
          <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-sm text-gray-900">
            <span className="font-bengali">এখন প্রদেয় অর্থ:</span>
            <span className="text-[#800020] text-base">₹{payableAmount.toLocaleString('en-IN')}</span>
          </div>
          {balanceDue > 0 && (
            <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg mt-1 font-bengali">
              * অবশিষ্ট ₹{balanceDue.toLocaleString('en-IN')} টাকা কাজের দিন সরাসরি ভেন্ডারকে দেবেন।
            </p>
          )}
        </div>

        {/* RAZORPAY.ME IMMEDIATE PAYMENT BUTTON */}
        <div className="space-y-3 pt-2">
          <PaymentButton
            totalAmount={payableAmount}
            bookingId={bookingId}
            onPaymentInitiated={() => {
              console.log('Initiated Razorpay.me payment for booking:', bookingId);
            }}
          />

          {/* Alternative direct SDK payment trigger if required */}
          <div className="pt-1 flex items-center justify-between">
            <button 
              type="button"
              onClick={handlePayWithRazorpay}
              disabled={isLoading}
              className="text-[11px] text-gray-500 hover:text-[#800020] underline transition-colors"
            >
              রেজরপে পপ-আপ SDK দিয়ে পে করুন
            </button>

            {/* Payment Link generator option for vendors / remote bookings */}
            <button
              type="button"
              onClick={handleGeneratePaymentLink}
              disabled={isLoading}
              className="text-[11px] text-[#800020] hover:underline font-semibold font-bengali flex items-center gap-1"
            >
              <Share2 className="w-3 h-3" />
              <span>কাস্টম লিংক</span>
            </button>
          </div>
        </div>

        {/* Generated Payment Link Preview Box */}
        {generatedLink && (
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-3.5 text-xs animate-in fade-in duration-200">
            <p className="font-bold text-amber-900 mb-1 font-bengali">
              🔗 রেজরপে পেমেন্ট লিংক প্রস্তুত:
            </p>
            <div className="flex items-center gap-2 bg-white border border-amber-200 rounded-lg p-2 font-mono text-[11px] text-gray-800 break-all select-all">
              <span className="truncate flex-1">{generatedLink}</span>
              <button 
                onClick={copyToClipboard}
                className="shrink-0 p-1 bg-amber-100 hover:bg-amber-200 rounded text-amber-900 flex items-center gap-1 text-[10px] font-sans font-bold"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'কপি হয়েছে' : 'কপি করুন'}</span>
              </button>
            </div>
            <div className="mt-2 flex gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Utsav Mitra Booking Payment Link for ${item.title}: ₹${payableAmount}\n${generatedLink}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 hover:brightness-105"
              >
                হোয়াটসঅ্যাপে পাঠান
              </a>
            </div>
          </div>
        )}

        {/* Security and Accepted Payments footer */}
        <div className="pt-4 border-t border-gray-200 text-center space-y-2">
          <div className="flex items-center justify-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-[#800020]" />
              UPI (GPay / PhonePe / Paytm)
            </span>
            <span>•</span>
            <span>Credit / Debit Cards</span>
            <span>•</span>
            <span>NetBanking</span>
          </div>
          <p className="text-[10px] text-gray-400">
            রেজরপে (Razorpay) ভারতের আরবিআই নিয়ন্ত্রিত অন্যতম শীর্ষস্থানীয় পেমেন্ট গেটওয়ে। সমস্ত লেনদেন সম্পূর্ণ এনক্রিপ্টেড।
          </p>
        </div>
      </div>
    </div>
  );
};
