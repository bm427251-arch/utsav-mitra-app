import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CreditCard, 
  Receipt, 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  ExternalLink,
  ChevronRight,
  QrCode,
  Share2
} from 'lucide-react';
import { CheckoutItem } from './CheckoutScreen';

interface PaymentScreenProps {
  onBack: () => void;
  onSelectCheckout: (item: CheckoutItem) => void;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({
  onBack,
  onSelectCheckout
}) => {
  const [activeTab, setActiveTab] = useState<'pay' | 'history'>('pay');

  // Sample recent transactions
  const transactions = [
    {
      id: 'UM-882194',
      paymentId: 'pay_P10k8A2Z8wL9v',
      service: 'রয়্যাল বেঙ্গল ক্যাটারার্স (মুখরোচক প্যাকেজ)',
      date: '২৩ সেপ্টেম্বর, ২০২৬',
      amount: 15000,
      type: '২০% অগ্রিম টোকেন',
      status: 'সফল (Success)'
    },
    {
      id: 'UM-742910',
      paymentId: 'pay_M93vQ5N7xK4p',
      service: 'পণ্ডিত সৌমেন্দ্র নারায়ণ ভট্টাচার্য (অন্নপ্রাশন পূজা)',
      date: '১৮ সেপ্টেম্বর, ২০২৬',
      amount: 5100,
      type: 'সম্পূর্ণ পরিশোধ',
      status: 'সফল (Success)'
    }
  ];

  const quickServices: CheckoutItem[] = [
    {
      id: 'bundle_annaprashan_gold',
      title: 'সম্পূর্ণ অন্নপ্রাশন উৎসব প্যাকেজ (Gold)',
      category: 'অন্নপ্রাশন',
      vendorName: 'উৎসব মিত্র ভেরিফাইড টিম',
      price: 45000
    },
    {
      id: 'purohit_booking',
      title: 'বৈদিক ব্রাহ্মণ পুরোহিত বুকিং ফি',
      category: 'পূজা ও রিচুয়াল',
      vendorName: 'পণ্ডিত সৌমেন্দ্র নারায়ণ ভট্টাচার্য',
      price: 5100
    },
    {
      id: 'emergency_shraddha',
      title: 'জরুরি শ্রাদ্ধ ও অন্ত্যেষ্টিক্রিয়া সেবা',
      category: 'জরুরি সেবা',
      vendorName: 'শান্তিধাম রিচুয়াল সার্ভিস',
      price: 8500
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 text-gray-900 font-sans">
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
          <h1 className="text-base font-bold font-bengali">পেমেন্ট ও বুকিং হিসাব</h1>
          <p className="text-[10px] text-[#F5E08C] flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
            রেজরপে (Razorpay) সার্টিফায়েড গেটওয়ে
          </p>
        </div>
        <div className="w-12"></div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Navigation Tabs */}
        <div className="flex bg-gray-200/80 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('pay')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all font-bengali ${
              activeTab === 'pay' 
                ? 'bg-white text-[#800020] shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            পেমেন্ট ও বুকিং সার্ভিস
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all font-bengali ${
              activeTab === 'history' 
                ? 'bg-white text-[#800020] shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            লেনদেনের রসিদ ও ইতিহাস
          </button>
        </div>

        {activeTab === 'pay' ? (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-[#800020] to-[#5A0016] text-white rounded-2xl p-4 shadow-md border border-[#D4AF37]/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5E08C]">
                  রেজরপে সুরক্ষিত বুকিং
                </span>
                <span className="text-xs bg-[#D4AF37]/20 border border-[#D4AF37] px-2 py-0.5 rounded-full text-[#F5E08C] font-semibold">
                  INR (₹) পেমেন্ট
                </span>
              </div>
              <h2 className="text-lg font-bold font-bengali">ক্যাশলেস উৎসবের প্রতিশ্রুতি</h2>
              <p className="text-xs text-white/80 mt-1">
                UPI (GPay/PhonePe), কার্ড অথবা নেটব্যাংকিং-এর মাধ্যমে ২০% অগ্রিম টোকেন পরিশোধ করে ভেন্ডার কনফার্ম করুন।
              </p>
            </div>

            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider font-bengali">
              দ্রুত বুকিং ও পেমেন্ট সার্ভিস
            </h3>

            <div className="space-y-2.5">
              {quickServices.map((service) => (
                <div
                  key={service.id}
                  onClick={() => onSelectCheckout(service)}
                  className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-[#800020] shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#800020] bg-[#800020]/10 px-2 py-0.5 rounded-full">
                      {service.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 font-bengali group-hover:text-[#800020] transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-xs text-gray-500 font-bengali">
                      {service.vendorName}
                    </p>
                    <p className="text-xs font-bold text-[#800020]">
                      ₹{service.price.toLocaleString('en-IN')}{' '}
                      <span className="text-[10px] text-gray-500 font-normal">
                        (২০% অগ্রিম: ₹{Math.round(service.price * 0.2).toLocaleString('en-IN')})
                      </span>
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#800020] transition-colors" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider font-bengali">
              সম্পন্ন পেমেন্টের তালিকা
            </h3>

            {transactions.map((tx) => (
              <div 
                key={tx.id}
                className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 font-bold px-2 py-0.5 rounded-full">
                      {tx.status}
                    </span>
                    <h4 className="text-xs font-bold text-gray-900 font-bengali mt-1.5">{tx.service}</h4>
                  </div>
                  <p className="font-bold text-sm text-[#800020]">
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="text-[11px] text-gray-500 space-y-0.5 pt-1 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span>বুকিং আইডি:</span>
                    <span className="font-mono text-gray-700">{tx.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>রেজরপে পেমেন্ট আইডি:</span>
                    <span className="font-mono text-gray-700">{tx.paymentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>তারিখ:</span>
                    <span>{tx.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>পেমেন্ট ধরন:</span>
                    <span className="text-gray-700">{tx.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
