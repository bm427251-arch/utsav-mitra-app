import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Crown, 
  Sparkles, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Users, 
  Star, 
  PhoneCall, 
  MessageCircle, 
  HelpCircle,
  Clock,
  ExternalLink,
  Flame,
  Award
} from 'lucide-react';

interface VendorSubscriptionScreenProps {
  onBack: () => void;
  onRegisterCustom?: () => void;
}

export const VendorSubscriptionScreen: React.FC<VendorSubscriptionScreenProps> = ({ 
  onBack,
  onRegisterCustom
}) => {
  const [selectedTab, setSelectedTab] = useState<'plans' | 'comparison' | 'costAnalysis'>('plans');

  // Razorpay.me payment link function as requested by business owner
  const openPayment = (amount: number) => {
    const url = `https://razorpay.me/@bharatmitrainfotech?amount=${amount}`;
    window.open(url, '_blank');
  };

  const openWhatsAppSupport = () => {
    const text = encodeURIComponent(
      'নমস্কার উৎসব মিত্র টিম, আমি ভেন্ডার সাবস্ক্রিপশন প্ল্যান নিয়ে কথা বলতে চাই।'
    );
    window.open(`https://wa.me/919830099999?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1F1A1C] pb-24">
      {/* Top Header */}
      <div className="bg-[#800020] text-white p-4 sticky top-0 z-30 shadow-md border-b border-[#D4AF37]/30">
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 text-[#D4AF37] hover:text-white transition-colors text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ফিরে যান</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-sm sm:text-base font-bold text-[#D4AF37] font-bengali">
              ভেন্ডার সাবস্ক্রিপশন প্যাকেজ
            </h1>
            <p className="text-[10px] text-gray-200">Utsav Mitra Partner Membership</p>
          </div>

          <button
            onClick={openWhatsAppSupport}
            className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white text-xs"
            title="Help"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
          </button>
        </div>
      </div>

      {/* Hero Banner with Maroon & Gold */}
      <div className="bg-gradient-to-b from-[#800020] via-[#600018] to-[#800020] text-white pt-6 pb-8 px-4 text-center space-y-3 relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F5E08C] text-xs font-bold font-bengali">
          <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>কলকাতা ও সংলগ্ন এলাকার শীর্ষ ভেন্ডার নেটওয়ার্ক</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold font-bengali tracking-wide leading-snug">
          আপনার ব্যবসার প্রসারে সঠিক প্ল্যান বেছে নিন
        </h2>
        
        <p className="text-xs text-gray-200 max-w-md mx-auto font-bengali">
          পেমেন্ট করার সাথে সাথে আপনার প্রোফাইল উৎসব মিত্রে লাইভ হবে। সরাসরি গ্রাহকদের কল ও লিড পেতে শুরু করুন।
        </p>

        {/* FOUNDER OFFER BANNER AS SPECIFIED */}
        <div className="mt-4 bg-gradient-to-r from-[#D4AF37] via-[#F5E08C] to-[#D4AF37] text-[#5A0016] rounded-2xl p-4 shadow-xl border-2 border-amber-200 text-left relative animate-pulse">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-600 fill-rose-600 shrink-0" />
                <span className="font-extrabold text-xs uppercase tracking-wider text-rose-700 font-sans">
                  Exclusive Founder Offer
                </span>
              </div>
              <h3 className="font-bold text-sm sm:text-base font-bengali mt-0.5 text-gray-900">
                প্রথম ২০ জন ভেন্ডারের জন্য ১ বছরের প্ল্যান মাত্র ₹২,৯৯৯!
              </h3>
              <p className="text-xs text-gray-800 font-bengali mt-0.5">
                নিয়মিত মূল্য <span className="line-through text-gray-500 font-bold">₹৪,৯৯৯</span> — আজই যোগ দিন এবং ২,০০০ টাকা সাশ্রয় করুন।
              </p>
            </div>
            
            <button
              onClick={() => openPayment(2999)}
              style={{ background: '#800020', color: '#D4AF37' }}
              className="shrink-0 px-3.5 py-2.5 rounded-xl font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
            >
              <span>দাবি করুন ₹২৯৯৯</span>
              <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="max-w-md mx-auto px-4 -mt-4 relative z-10">
        <div className="bg-white p-1 rounded-2xl shadow-md border border-gray-200 flex text-xs font-semibold">
          <button
            onClick={() => setSelectedTab('plans')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              selectedTab === 'plans' 
                ? 'bg-[#800020] text-[#D4AF37] shadow' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            প্যাকেজসমূহ
          </button>
          <button
            onClick={() => setSelectedTab('comparison')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              selectedTab === 'comparison' 
                ? 'bg-[#800020] text-[#D4AF37] shadow' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            তুলনা টেবিল
          </button>
          <button
            onClick={() => setSelectedTab('costAnalysis')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              selectedTab === 'costAnalysis' 
                ? 'bg-[#800020] text-[#D4AF37] shadow' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            খরচ ও লাভ বিশ্লেষণ
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 mt-6 space-y-6">
        {/* TAB 1: 3 SUBSCRIPTION CARDS */}
        {selectedTab === 'plans' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Card 1: 1 Month Plan */}
            <div className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-sm relative space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Basic</span>
                  <h3 className="text-base font-bold text-gray-900 font-bengali">১ মাস লিস্টিং প্ল্যান</h3>
                  <p className="text-xs text-gray-500">৩০ দিনের সক্রিয় উপস্থিতি</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-[#800020]">₹৫৯৯</span>
                  <span className="text-[10px] text-gray-400 block">/ ১ মাস</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-600 pt-1 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>30 days listing</strong> উৎসব মিত্র ডিরেক্টরিতে</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>10 guaranteed leads</strong> সরাসরি গ্রাহকের কল</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>কাস্টমার WhatsApp সরাসরি কানেক্ট</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>৫% প্ল্যাটফর্ম বুকিং চার্জ</span>
                </div>
              </div>

              {/* Exact requested button code style */}
              <div className="pt-2">
                <button 
                  onClick={() => openPayment(599)} 
                  style={{ background: '#800020', color: '#D4AF37' }}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm shadow-md hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Pay Rs.599 - 1 Month</span>
                  <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </div>

            {/* Card 2: 6 Months Plan (Popular) */}
            <div className="bg-white rounded-2xl p-5 border-2 border-[#800020] shadow-md relative space-y-3 ring-2 ring-[#800020]/10">
              <span className="absolute -top-3 right-4 bg-[#800020] text-[#D4AF37] text-[10px] font-bold px-3 py-1 rounded-full shadow flex items-center gap-1">
                <Crown className="w-3 h-3 text-[#D4AF37]" />
                সর্বাধিক জনপ্রিয় • 20% Discount
              </span>

              <div className="flex justify-between items-start pt-1">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#800020] tracking-wider">Growth Plan</span>
                  <h3 className="text-base font-bold text-gray-900 font-bengali">৬ মাস সিলভার প্ল্যান</h3>
                  <p className="text-xs text-emerald-700 font-semibold">মাত্র ₹৪৯৯ / মাস (২০% ছাড়)</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 line-through mr-1">₹৩,৫৯৪</span>
                  <span className="text-2xl font-extrabold text-[#800020]">₹২৯৯৯</span>
                  <span className="text-[10px] text-gray-400 block">/ ৬ মাস (১৮০ দিন)</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-600 pt-1 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Top Search Placement</strong> সার্চে ওপরের সারিতে নাম</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>100 verified leads</strong> নিশ্চিত গ্রাহক অনুসন্ধান</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Verified Badge</strong> বিশ্বস্ত ভেন্ডার প্রতীক</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>অনলাইন অ্যাডভান্স পেমেন্ট গ্রহণ সুবিধা</span>
                </div>
              </div>

              {/* Exact requested button code style */}
              <div className="pt-2">
                <button 
                  onClick={() => openPayment(2999)} 
                  style={{ background: '#800020', color: '#D4AF37' }}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm shadow-md hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Pay Rs.2999 - 6 Months</span>
                  <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </div>

            {/* Card 3: 1 Year Plan (Best Value) */}
            <div className="bg-gradient-to-b from-[#800020]/5 to-amber-50/30 rounded-2xl p-5 border-2 border-[#D4AF37] shadow-lg relative space-y-3">
              <span className="absolute -top-3 right-4 bg-gradient-to-r from-[#D4AF37] to-[#B89020] text-[#5A0016] text-[10px] font-extrabold px-3 py-1 rounded-full shadow flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#5A0016]" />
                সেরা সাশ্রয়ী • 35% Discount
              </span>

              <div className="flex justify-between items-start pt-1">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">Royal VIP</span>
                  <h3 className="text-base font-bold text-gray-900 font-bengali">১ বছর গোল্ড মেম্বারশিপ</h3>
                  <p className="text-xs text-emerald-700 font-semibold">মাত্র ₹৪১৬ / মাস (৩৫% ছাড়)</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 line-through mr-1">₹৭,১৮৮</span>
                  <span className="text-2xl font-extrabold text-[#800020]">₹৪৯৯৯</span>
                  <span className="text-[10px] text-gray-400 block">/ ১ বছর (৩৬৫ দিন)</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-700 pt-1 border-t border-amber-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Homepage Featured</strong> হোমপেজে সরাসরি শীর্ষ ডিসপ্লে</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Unlimited Leads</strong> সারা বছর সীমাহীন গ্রাহক কল</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Gold Royal Verified Badge</strong> ব্লু-টিক ক্রেডিবিলিটি</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>২৪ ঘণ্টা জরুরি সেবা নেটওয়ার্কে অগ্রাধিকার</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ডেডিকেটেড বিজনেস ম্যানেজার ও অ্যাকাউন্ট সাপোর্ট</span>
                </div>
              </div>

              {/* Exact requested button code style */}
              <div className="pt-2 space-y-2">
                <button 
                  onClick={() => openPayment(4999)} 
                  style={{ background: '#800020', color: '#D4AF37' }}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm shadow-md hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Pay Rs.4999 - 1 Year</span>
                  <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
                </button>

                {/* Founder offer quick trigger */}
                <button
                  onClick={() => openPayment(2999)}
                  className="w-full py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 border border-amber-300"
                >
                  <Flame className="w-3.5 h-3.5 text-rose-600" />
                  <span>প্রথম ২০ জনের স্পেশাল রেটে পে করুন (Rs. 2999)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COMPARISON TABLE */}
        {selectedTab === 'comparison' && (
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm space-y-4 animate-in fade-in duration-200">
            <h3 className="font-bold text-sm text-gray-900 font-bengali">
              সাবস্ক্রিপশন প্ল্যানের বিস্তারিত তুলনা
            </h3>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 text-[11px]">
                    <th className="py-2 pr-2">ফিচার</th>
                    <th className="py-2 px-1 text-center">১ মাস</th>
                    <th className="py-2 px-1 text-center text-[#800020] font-bold">৬ মাস</th>
                    <th className="py-2 pl-1 text-center text-[#B89020] font-bold">১ বছর</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2 font-medium">মূল্য (Price)</td>
                    <td className="py-2 text-center font-bold">₹৫৯৯</td>
                    <td className="py-2 text-center font-bold text-[#800020]">₹২,৯৯৯</td>
                    <td className="py-2 text-center font-bold text-amber-700">₹৪,৯৯৯</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">মাসিক খরচ</td>
                    <td className="py-2 text-center">₹৫৯৯</td>
                    <td className="py-2 text-center font-semibold text-emerald-700">₹৪৯৯</td>
                    <td className="py-2 text-center font-semibold text-emerald-700">₹৪১৬</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">ছাড় (Discount)</td>
                    <td className="py-2 text-center text-gray-400">—</td>
                    <td className="py-2 text-center text-emerald-600 font-bold">২০%</td>
                    <td className="py-2 text-center text-emerald-600 font-bold">৩৫%</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">গ্রাহক লিড (Leads)</td>
                    <td className="py-2 text-center">১০ টি</td>
                    <td className="py-2 text-center font-semibold">১০০ টি</td>
                    <td className="py-2 text-center font-bold text-emerald-700">আনলিমিটেড</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">সার্চ স্থান (Ranking)</td>
                    <td className="py-2 text-center">স্ট্যান্ডার্ড</td>
                    <td className="py-2 text-center font-semibold text-[#800020]">Top Search</td>
                    <td className="py-2 text-center font-bold text-amber-700">Featured</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">হোমপেজ ফিচার</td>
                    <td className="py-2 text-center text-gray-300">✕</td>
                    <td className="py-2 text-center text-gray-300">✕</td>
                    <td className="py-2 text-center text-emerald-600 font-bold">✓ হ্যাঁ</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">ভেরিফাইড ব্যাজ</td>
                    <td className="py-2 text-center text-gray-300">✕</td>
                    <td className="py-2 text-center text-emerald-600 font-bold">✓ সিলভার</td>
                    <td className="py-2 text-center text-amber-600 font-bold">✓ গোল্ড রয়েল</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">কমিশন মডেল</td>
                    <td className="py-2 text-center">৫%</td>
                    <td className="py-2 text-center">৫%</td>
                    <td className="py-2 text-center">৫%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => openPayment(2999)}
                style={{ background: '#800020', color: '#D4AF37' }}
                className="flex-1 py-2.5 rounded-xl font-bold text-xs"
              >
                ৬ মাস ₹২৯৯৯
              </button>
              <button
                onClick={() => openPayment(4999)}
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-xs"
              >
                ১ বছর ₹৪৯৯৯
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: COST & PROFIT ANALYSIS AS SPECIFIED */}
        {selectedTab === 'costAnalysis' && (
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-4 animate-in fade-in duration-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#800020] tracking-wider">Business Metrics</span>
              <h3 className="font-bold text-base text-gray-900 font-bengali">
                প্ল্যাটফর্ম খরচ ও প্রফিট অ্যানালাইসিস
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                উৎসব মিত্র প্ল্যাটফর্মের স্বচ্ছ অপারেশনাল হিসাব:
              </p>
            </div>

            {/* Monthly Fixed Cost Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs space-y-2">
              <h4 className="font-bold text-gray-800 font-bengali flex items-center justify-between">
                <span>মাসিক ফিক্সড খরচ (Fixed Cost per month):</span>
                <span className="text-[#800020] font-extrabold text-sm">~₹১০,০০০</span>
              </h4>
              <div className="space-y-1 text-gray-600 pl-1 text-[11px]">
                <div className="flex justify-between">
                  <span>• সার্ভার ও ক্লাউড হোস্টিং:</span>
                  <span className="font-mono font-bold">₹১,৫০০</span>
                </div>
                <div className="flex justify-between">
                  <span>• কাস্টমার সাপোর্ট ও হেল্পলাইন:</span>
                  <span className="font-mono font-bold">₹৫,০০০</span>
                </div>
                <div className="flex justify-between">
                  <span>• সিস্টেম মেইনটেন্যান্স ও টেকনোলজি:</span>
                  <span className="font-mono font-bold">₹৩,০০০</span>
                </div>
              </div>
            </div>

            {/* Per Vendor Cost */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs flex items-center justify-between">
              <span className="font-medium text-amber-900 font-bengali">প্রতি ভেন্ডার অপারেশনাল খরচ:</span>
              <span className="font-bold text-amber-900 text-sm">₹৫০০ / মাস</span>
            </div>

            {/* Profit Margin Per Plan */}
            <div className="space-y-2 pt-1">
              <h4 className="font-bold text-xs text-gray-800 font-bengali">
                প্রতি ভেন্ডার থেকে লাভ (Profit Per Vendor):
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5">
                  <span className="text-[10px] text-gray-500 block">১ মাস প্ল্যান</span>
                  <span className="font-extrabold text-emerald-800 text-base">₹৯৯</span>
                  <span className="text-[9px] text-gray-400 block">লাভ / ভেন্ডার</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5">
                  <span className="text-[10px] text-gray-500 block">৬ মাস প্ল্যান</span>
                  <span className="font-extrabold text-emerald-800 text-base">₹১,২০০</span>
                  <span className="text-[9px] text-gray-400 block">লাভ / ভেন্ডার</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5">
                  <span className="text-[10px] text-gray-500 block">১ বছর প্ল্যান</span>
                  <span className="font-extrabold text-emerald-800 text-base">₹২,৫০০</span>
                  <span className="text-[9px] text-gray-400 block">লাভ / ভেন্ডার</span>
                </div>
              </div>
              <p className="text-[11px] text-emerald-700 font-medium text-center pt-1 font-bengali">
                + প্রতিটি কনফার্ম বুকিং থেকে অতিরিক্ত ৫% প্ল্যাটফর্ম কমিশন
              </p>
            </div>
          </div>
        )}

        {/* After Payment Instructions Card */}
        <div className="bg-[#800020]/5 border border-[#800020]/15 rounded-2xl p-4 text-center space-y-1.5">
          <p className="text-xs font-bold text-[#800020] flex items-center justify-center gap-1.5 font-bengali">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            Payment to Bharat Mitra Infotech - Utsav Mitra App
          </p>
          <p className="text-[11px] text-gray-600 font-bengali">
            অফিসিয়াল লিংক: <span className="font-mono text-[#800020] font-bold">https://razorpay.me/@bharatmitrainfotech</span>
          </p>
          <p className="text-[10px] text-gray-500">
            UPI (Google Pay, PhonePe, Paytm), ক্রেডিট/ডেবিট কার্ড ও নেট ব্যাংকিং সুরক্ষিত। পেমেন্টের পরই প্রোফাইল লাইভ হবে।
          </p>
        </div>

        {/* Support & Contact */}
        <div className="text-center pt-2">
          <button
            onClick={openWhatsAppSupport}
            className="text-xs text-gray-600 hover:text-[#800020] flex items-center justify-center gap-1.5 mx-auto font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>যেকোনো প্রশ্নে সরাসরি হোয়াটসঅ্যাপে সহায়তা নিন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
