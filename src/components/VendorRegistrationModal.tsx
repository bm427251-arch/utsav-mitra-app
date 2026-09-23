import React, { useState } from 'react';
import { 
  X, 
  Store, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  IndianRupee, 
  Sparkles,
  Award,
  Clock,
  MessageCircle,
  AlertCircle,
  Check,
  Zap,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  Crown
} from 'lucide-react';
import { Vendor, EventCategoryId, VendorSubscriptionPlanId } from '../types';
import { EVENT_CATEGORIES } from '../utils/keywordEngine';
import { VENDOR_SUBSCRIPTION_PLANS } from '../data/subscriptionPlans';
import { initiatePayment } from '../services/razorpayService';

interface VendorRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (newVendor: Vendor) => void;
  onViewLiveProfile?: (vendor: Vendor) => void;
}

export const VendorRegistrationModal: React.FC<VendorRegistrationModalProps> = ({
  isOpen,
  onClose,
  onRegisterSuccess,
  onViewLiveProfile
}) => {
  if (!isOpen) return null;

  // Step flow: 1 = Details, 2 = Plan Selection, 3 = Payment & Auto-Live, 4 = Success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [businessNameBn, setBusinessNameBn] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [categoryId, setCategoryId] = useState<EventCategoryId>('wedding_engagement');
  const [servicesInput, setServicesInput] = useState('');
  const [pinCode, setPinCode] = useState('700091');
  const [area, setArea] = useState('Salt Lake / Kolkata');
  const [startingPrice, setStartingPrice] = useState('3500');
  const [priceUnit, setPriceUnit] = useState('প্রতি অনুষ্ঠান');
  const [experienceYears, setExperienceYears] = useState('5');
  const [emergencySupported, setEmergencySupported] = useState(false);
  const [bio, setBio] = useState('');

  // Selected Subscription Plan (Default: 6 months / most popular)
  const [selectedPlanId, setSelectedPlanId] = useState<VendorSubscriptionPlanId>('6_months');

  // Completed / Live Vendor
  const [liveVendor, setLiveVendor] = useState<Vendor | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const selectedPlan = VENDOR_SUBSCRIPTION_PLANS.find(p => p.id === selectedPlanId) || VENDOR_SUBSCRIPTION_PLANS[1];

  // Calculate expiry date based on plan duration
  const getExpiryDate = (months: number) => {
    const d = new Date();
    d.setMonth(d.getMonth() + months);
    return d.toLocaleDateString('bn-BD', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Move from Step 1 (Details) to Step 2 (Plan Selection)
  const handleDetailsProceed = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!businessNameBn.trim() || !contactNumber.trim() || !ownerName.trim()) {
      setValidationError('অনুগ্রহ করে ব্যবসার নাম, যোগাযোগের নম্বর এবং মালিকের নাম পূরণ করুন।');
      return;
    }

    if (contactNumber.length < 10) {
      setValidationError('অনুগ্রহ করে সঠিক ১০ সংখ্যার মোবাইল নম্বর দিন।');
      return;
    }

    setStep(2);
  };

  // Complete Payment & Auto-Activate Live Profile
  const handleAutoActivateProfile = async (paymentMethod: 'razorpay_me' | 'razorpay_sdk' = 'razorpay_me') => {
    setIsProcessingPayment(true);
    setValidationError(null);

    const bookingRefId = `SUB-${Math.floor(100000 + Math.random() * 900000)}`;
    const categoryObj = EVENT_CATEGORIES.find(c => c.id === categoryId);
    const servicesList = servicesInput
      ? servicesInput.split(',').map(s => s.trim()).filter(Boolean)
      : ['কাস্টম রিচুয়াল ও ইভেন্ট সার্ভিস'];

    const newPaymentId = `pay_sub_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    // Create the vendor object with ACTIVE LIVE subscription
    const activatedVendor: Vendor = {
      id: `v_sub_${Date.now()}`,
      name: ownerName,
      businessNameBn: businessNameBn,
      categoryId: categoryId,
      categoryTitleEn: categoryObj?.titleEn || 'Event Services',
      services: servicesList,
      keywords: [businessNameBn, ownerName, ...servicesList, area, pinCode, selectedPlan.titleBn],
      rating: 5.0,
      reviewCount: 1,
      verified: true, // Automatically verified via paid subscription
      pinCode: pinCode,
      area: area,
      city: 'Kolkata',
      distanceKm: 2.1,
      startingPrice: Number(startingPrice) || 3500,
      priceUnit: priceUnit,
      contactNumber: contactNumber,
      whatsappNumber: whatsappNumber || contactNumber,
      socialLinks: {},
      photos: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600'
      ],
      emergencySupported: emergencySupported || selectedPlanId === '1_year',
      bio: bio || `${businessNameBn} - উৎসব মিত্রের গোল্ড পার্টনার। প্রফেশনাল পরিষেবা নিশ্চিত।`,
      experienceYears: Number(experienceYears) || 5,
      featured: selectedPlanId === '1_year' || selectedPlanId === '6_months',
      subscription: {
        planId: selectedPlanId,
        planTitleBn: selectedPlan.titleBn,
        price: selectedPlan.price,
        startDate: new Date().toISOString().split('T')[0],
        expiryDate: getExpiryDate(selectedPlan.durationMonths),
        active: true, // Automatically Live
        paymentId: newPaymentId
      }
    };

    if (paymentMethod === 'razorpay_me') {
      // Official Razorpay.me payment link with amount
      const url = `https://razorpay.me/@bharatmitrainfotech?amount=${selectedPlan.price}`;
      window.open(url, '_blank', 'noopener,noreferrer');

      // Auto-activate and show success confirmation
      setTimeout(() => {
        setIsProcessingPayment(false);
        setLiveVendor(activatedVendor);
        onRegisterSuccess(activatedVendor);
        saveToLocalStorage(activatedVendor);
        setStep(4);
      }, 1000);
    } else {
      // In-App Razorpay SDK checkout
      try {
        const result = await initiatePayment(selectedPlan.price, bookingRefId, {
          serviceName: `Vendor Subscription: ${selectedPlan.titleBn}`,
          customerName: ownerName,
          customerPhone: contactNumber,
          notes: {
            business_name: businessNameBn,
            plan_id: selectedPlanId
          }
        });

        if (result.success) {
          activatedVendor.subscription!.paymentId = result.paymentId || newPaymentId;
          setIsProcessingPayment(false);
          setLiveVendor(activatedVendor);
          onRegisterSuccess(activatedVendor);
          saveToLocalStorage(activatedVendor);
          setStep(4);
        } else {
          setIsProcessingPayment(false);
          setValidationError(result.error || 'পেমেন্ট সম্পন্ন হয়নি।');
        }
      } catch (err: any) {
        setIsProcessingPayment(false);
        setValidationError(err.message || 'একটি সমস্যা হয়েছে।');
      }
    }
  };

  const saveToLocalStorage = (vendor: Vendor) => {
    try {
      const stored = localStorage.getItem('utsav_custom_vendors');
      const customVendors = stored ? JSON.parse(stored) : [];
      customVendors.unshift(vendor);
      localStorage.setItem('utsav_custom_vendors', JSON.stringify(customVendors));
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }
  };

  const openAdminWhatsApp = () => {
    if (!liveVendor) return;
    const msg = `নমস্কার উৎসব মিত্র টিম,\nআমি ${liveVendor.subscription?.planTitleBn} সাবস্ক্রিপশন নিয়েছি (₹${liveVendor.subscription?.price})।\n\nব্যবসা: ${liveVendor.businessNameBn}\nমালিক: ${liveVendor.name}\nমোবাইল: ${liveVendor.contactNumber}\nপিন: ${liveVendor.pinCode}\nপেমেন্ট আইডি: ${liveVendor.subscription?.paymentId}\nপ্রোফাইল অটো-লাইভ কনফার্মেশন।`;
    window.open(`https://wa.me/919830099999?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border-2 border-[#D4AF37] relative flex flex-col"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#800020] via-[#5A0016] to-[#800020] text-white p-5 rounded-t-[22px] relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#D4AF37]/20 border border-[#D4AF37] px-2.5 py-0.5 rounded-full text-[#F5E08C] text-[11px] font-semibold">
              <Store className="w-3 h-3" />
              ভেন্ডার অনবোর্ডিং ও মেম্বারশিপ
            </span>
            <span className="text-[11px] text-white/80">
              ধাপ {step} / ৩
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-bengali tracking-wide mt-1.5">
            {step === 1 && '১. ব্যবসার বিবরণ লিখুন'}
            {step === 2 && '২. যুক্তিসঙ্গত সাবস্ক্রিপশন প্ল্যান নির্বাচন'}
            {step === 3 && '৩. পেমেন্ট ও অটো-লাইভ অ্যাক্টিভেশন'}
            {step === 4 && '🎉 আপনার প্রোফাইল এখন লাইভ!'}
          </h2>
          <p className="text-xs text-gray-200 mt-1 font-bengali">
            {step === 1 && 'পুরোহিত, ক্যাটারার, ডেকোরেটর ও আর্টিস্টদের জন্য কলকাতার শীর্ষ নেটওয়ার্ক'}
            {step === 2 && 'পেমেন্ট সম্পন্ন হলেই আপনার প্রোফাইল তাৎক্ষণিকভাবে অটো-লাইভ হবে'}
            {step === 3 && 'রেজরপে সুরক্ষিত গেটওয়েতে সাবস্ক্রিপশন সম্পন্ন করুন'}
            {step === 4 && 'গ্রাহকরা এখন সরাসরি আপনার সাথে কল ও WhatsApp-এ যোগাযোগ করতে পারবেন'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-100 h-1.5">
          <div 
            className="bg-[#D4AF37] h-1.5 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4">
          {validationError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{validationError}</span>
            </div>
          )}

          {/* STEP 1: BUSINESS DETAILS */}
          {step === 1 && (
            <form onSubmit={handleDetailsProceed} className="space-y-4">
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-gray-600 font-medium mb-1">
                      ব্যবসা / প্রতিষ্ঠানের নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={businessNameBn}
                      onChange={(e) => setBusinessNameBn(e.target.value)}
                      placeholder="উদাঃ রয়্যাল ক্যাটারার্স / পণ্ডিত সৌভিক শর্মা"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#800020] text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-600 font-medium mb-1">
                      ক্যাটাগরি নির্বাচন করুন *
                    </label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value as EventCategoryId)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#800020] text-xs bg-white"
                    >
                      {EVENT_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.titleBn} ({cat.titleEn})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-600 font-medium mb-1">
                      মালিক বা পরিচালকের নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="আপনার পুরো নাম"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#800020] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-600 font-medium mb-1">
                      মোবাইল নম্বর (কল ও লিড পাওয়ার জন্য) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="9830000000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#800020] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-600 font-medium mb-1">
                      সার্ভিস পিন কোড (PIN Code) *
                    </label>
                    <input
                      type="text"
                      required
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      placeholder="700091"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#800020] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-600 font-medium mb-1">
                      পরিষেবার এলাকা (সার্ভিস এরিয়া)
                    </label>
                    <input
                      type="text"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="সল্টলেক, নিউটাউন, বেহালা ও কলকাতা"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#800020] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-600 font-medium mb-1">
                      প্রারম্ভিক দর (Starting Price ₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={startingPrice}
                      onChange={(e) => setStartingPrice(e.target.value)}
                      placeholder="3500"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#800020] text-xs font-bold text-[#800020]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-600 font-medium mb-1">
                      রেট ইউনিট
                    </label>
                    <select
                      value={priceUnit}
                      onChange={(e) => setPriceUnit(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#800020] text-xs bg-white"
                    >
                      <option value="প্রতি অনুষ্ঠান">প্রতি অনুষ্ঠান</option>
                      <option value="প্রতি প্লেট">প্রতি প্লেট</option>
                      <option value="প্রতি দিন">প্রতি দিন</option>
                      <option value="প্যাকেজ">প্যাকেজ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 font-medium mb-1">
                    নির্দিষ্ট পরিষেবা সমূহ (কমা দিয়ে লিখুন)
                  </label>
                  <input
                    type="text"
                    value={servicesInput}
                    onChange={(e) => setServicesInput(e.target.value)}
                    placeholder="উদাঃ বুফে ক্যাটারিং, মিষ্টি, মণ্ডপ ডেকোরেশন, তর্পণ পূজা"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#800020] text-xs"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#800020] hover:bg-[#600018] text-[#D4AF37] font-bold text-sm py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>সাবস্ক্রিপশন প্ল্যান নির্বাচন করুন</span>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: SUBSCRIPTION PLAN SELECTION (1 MONTH / 6 MONTHS / 1 YEAR) */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="text-center">
                <span className="text-xs bg-[#800020]/10 text-[#800020] font-bold px-3 py-1 rounded-full">
                  পেমেন্ট করলেই অটো লাইভ হবে আপনার প্রোফাইল
                </span>
                <p className="text-xs text-gray-500 mt-1 font-bengali">
                  আপনার ব্যবসার প্রয়োজন অনুযায়ী সবচেয়ে উপযুক্ত মেম্বারশিপ নির্বাচন করুন:
                </p>
              </div>

              <div className="space-y-3">
                {VENDOR_SUBSCRIPTION_PLANS.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`relative rounded-2xl p-4 border-2 transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-[#800020] bg-[#800020]/5 shadow-md ring-2 ring-[#800020]/20' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-2.5 right-4 bg-[#800020] text-[#D4AF37] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                          <Crown className="w-3 h-3 text-[#D4AF37]" />
                          সর্বাধিক জনপ্রিয়
                        </span>
                      )}

                      {plan.id === '1_year' && (
                        <span className="absolute -top-2.5 right-4 bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          সেরা সাশ্রয়ী (৬০% ছাড়)
                        </span>
                      )}

                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                              isSelected ? 'border-[#800020] bg-[#800020]' : 'border-gray-400'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </span>
                            <h3 className="font-bold text-sm text-gray-900 font-bengali">
                              {plan.titleBn}
                            </h3>
                          </div>
                          <span className="text-[11px] text-gray-500 ml-6 block">
                            মেয়াদ: {plan.durationMonths === 1 ? '৩০ দিন' : plan.durationMonths === 6 ? '১৮০ দিন' : '৩৬৫ দিন (১ বছর)'}
                          </span>
                        </div>

                        <div className="text-right">
                          <div className="flex items-baseline justify-end gap-1.5">
                            <span className="text-xs text-gray-400 line-through">
                              ₹{plan.originalPrice}
                            </span>
                            <span className="text-lg font-extrabold text-[#800020]">
                              ₹{plan.price}
                            </span>
                          </div>
                          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                            {plan.savingsPercentage}% সাশ্রয়
                          </span>
                        </div>
                      </div>

                      {/* Plan Highlights */}
                      <div className="mt-3 pt-2.5 border-t border-gray-100 text-[11px] text-gray-600 space-y-1">
                        {plan.features.slice(0, 3).map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl text-xs flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>তথ্য সম্পাদনা</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 bg-[#800020] hover:bg-[#600018] text-[#D4AF37] font-bold text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>পেমেন্ট ধাপে যান (₹{selectedPlan.price})</span>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT & AUTO-ACTIVATION */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Order summary box */}
              <div className="bg-[#800020]/5 border border-[#800020]/20 rounded-2xl p-4 text-xs space-y-2">
                <div className="flex justify-between items-center border-b border-[#800020]/15 pb-2">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">নির্বাচিত মেম্বারশিপ</span>
                    <h4 className="font-bold text-sm text-[#800020] font-bengali">{selectedPlan.titleBn}</h4>
                  </div>
                  <span className="text-base font-extrabold text-[#800020]">₹{selectedPlan.price}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 pt-1">
                  <div>
                    <span className="text-gray-400 block">ব্যবসার নাম:</span>
                    <strong className="text-gray-800">{businessNameBn}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block">মালিক / মোবাইল:</span>
                    <strong className="text-gray-800">{contactNumber}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block">অটো-লাইভ মেয়াদ:</span>
                    <strong className="text-emerald-700">{getExpiryDate(selectedPlan.durationMonths)} পর্যন্ত</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block">প্ল্যাটফর্ম কমিশন:</span>
                    <strong className="text-emerald-700">০% (সম্পূর্ণ বিনামূল্যে)</strong>
                  </div>
                </div>
              </div>

              {/* Payment Action Buttons */}
              <div className="space-y-3 pt-1">
                <div className="text-center space-y-1">
                  <p className="text-xs font-bold text-gray-800 font-bengali">
                    পেমেন্ট সম্পূর্ণ করুন - সাথে সাথে প্রোফাইল অটো-লাইভ হবে:
                  </p>
                </div>

                {/* Primary Button: Razorpay.me direct link */}
                <button
                  type="button"
                  id="vendor-sub-razorpay-me-btn"
                  onClick={() => handleAutoActivateProfile('razorpay_me')}
                  disabled={isProcessingPayment}
                  style={{
                    backgroundColor: '#800020',
                    padding: 16,
                    borderRadius: 12,
                    width: '100%',
                    cursor: 'pointer',
                    border: 'none',
                    boxShadow: '0 4px 14px rgba(128, 0, 32, 0.3)'
                  }}
                  className="hover:brightness-110 active:scale-[0.98] transition-all flex flex-col items-center justify-center cursor-pointer disabled:opacity-50"
                >
                  <span style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '15px' }} className="font-bengali flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    Pay ₹{selectedPlan.price} &amp; Activate Live Profile
                  </span>
                  <span className="text-[11px] text-[#F5E08C] mt-1 flex items-center gap-1">
                    <span>Razorpay.me/bharatmitrainfotech</span>
                    <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
                  </span>
                </button>

                {/* After payment instructions as requested */}
                <div className="bg-[#800020]/5 border border-[#800020]/15 rounded-xl p-2.5 text-center">
                  <p className="text-xs font-bold text-[#800020] flex items-center justify-center gap-1 font-bengali">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Payment to Bharat Mitra Infotech - Utsav Mitra App
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    UPI (Google Pay, PhonePe, Paytm), ক্রেডিট/ডেবিট কার্ড বা নেটব্যাংকিং সাপোর্ট
                  </p>
                </div>

                {/* Alternative In-App Razorpay Checkout */}
                <button
                  type="button"
                  onClick={() => handleAutoActivateProfile('razorpay_sdk')}
                  disabled={isProcessingPayment}
                  className="w-full text-center text-xs text-gray-600 hover:text-[#800020] underline transition-colors"
                >
                  অথবা অ্যাপের ভেতর পপ-আপ দিয়ে টেস্ট পেমেন্ট করুন
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-gray-500 hover:underline flex items-center gap-1 mx-auto"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>প্ল্যান পরিবর্তন করতে ফিরে যান</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS & PROFILE IS LIVE */}
          {step === 4 && liveVendor && (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  <span>🟢 প্রোফাইল এখন সক্রিয় ও লাইভ (Active &amp; Live)</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-bengali">
                  অভিনন্দন {liveVendor.businessNameBn}!
                </h3>
                <p className="text-xs text-gray-600 mt-1 font-bengali">
                  আপনার সাবস্ক্রিপশন সফলভাবে সক্রিয় হয়েছে। এখন কলকাতার গ্রাহকরা সরাসরি আপনার সাথে বুকিং করতে পারবেন।
                </p>
              </div>

              {/* Membership badge card */}
              <div className="bg-gradient-to-r from-[#800020] to-[#5A0016] text-white rounded-2xl p-4 text-left text-xs space-y-2 border border-[#D4AF37]/50 shadow-md">
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span className="font-bold text-[#F5E08C] font-bengali flex items-center gap-1">
                    <Crown className="w-4 h-4 text-[#D4AF37]" />
                    {liveVendor.subscription?.planTitleBn}
                  </span>
                  <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded font-mono">
                    {liveVendor.subscription?.paymentId}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-white/90">
                  <div>
                    <span className="text-white/60 block">মালিকের নাম:</span>
                    <strong>{liveVendor.name}</strong>
                  </div>
                  <div>
                    <span className="text-white/60 block">যোগাযোগ:</span>
                    <strong>{liveVendor.contactNumber}</strong>
                  </div>
                  <div>
                    <span className="text-white/60 block">পরিষেবা এলাকা:</span>
                    <strong>{liveVendor.area} ({liveVendor.pinCode})</strong>
                  </div>
                  <div>
                    <span className="text-white/60 block">মেয়াদ উত্তীর্ণ:</span>
                    <strong className="text-[#F5E08C]">{liveVendor.subscription?.expiryDate}</strong>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2 pt-2">
                {onViewLiveProfile && (
                  <button
                    onClick={() => {
                      onClose();
                      onViewLiveProfile(liveVendor);
                    }}
                    className="w-full bg-[#800020] hover:bg-[#600018] text-[#D4AF37] font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <span>আপনার লাইভ প্রোফাইল দেখুন</span>
                    <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                )}

                <button
                  onClick={openAdminWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>অ্যাডমিনকে WhatsApp-এ জানান ও ব্যানার সাপোর্ট নিন</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full text-xs text-gray-500 hover:text-gray-800 py-1.5"
                >
                  অ্যাপে ফিরে যান
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
