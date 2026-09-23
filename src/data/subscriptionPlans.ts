import { VendorSubscriptionPlan } from '../types';

export const VENDOR_SUBSCRIPTION_PLANS: VendorSubscriptionPlan[] = [
  {
    id: '1_month',
    durationMonths: 1,
    titleBn: '১ মাস বেসিক প্ল্যান',
    titleEn: '1 Month Plan',
    price: 599,
    originalPrice: 799,
    savingsPercentage: 25,
    features: [
      '30 days listing উৎসব মিত্র ডিরেক্টরিতে',
      '10 guaranteed leads সরাসরি গ্রাহকের কল',
      'পেমেন্টের সাথে সাথে প্রোফাইল অটো-লাইভ',
      'সরাসরি কাস্টমার কল ও WhatsApp সংযোগ'
    ]
  },
  {
    id: '6_months',
    durationMonths: 6,
    titleBn: '৬ মাস সিলভার গ্রোথ প্ল্যান',
    titleEn: '6 Months Plan',
    price: 2999,
    originalPrice: 3594,
    popular: true,
    savingsPercentage: 20,
    features: [
      'মাত্র ₹৪৯৯/মাস (২০% সাশ্রয়ী প্যাকেজ)',
      'Top Search Placement - সার্চের শীর্ষ সারিতে নাম',
      '100 verified leads নিশ্চিত গ্রাহক অনুসন্ধান',
      'Verified Badge - ভেরিফাইড প্রফেশনাল ব্যাজ',
      'রেজরপে অনলাইন অ্যাডভান্স পেমেন্ট গ্রহণ সুবিধা'
    ]
  },
  {
    id: '1_year',
    durationMonths: 12,
    titleBn: '১ বছর গোল্ড মেম্বারশিপ',
    titleEn: '1 Year Plan',
    price: 4999,
    originalPrice: 7188,
    savingsPercentage: 35,
    features: [
      'মাত্র ₹৪১৬/মাস (৩৫% সাশ্রয়ী ভিআইপি প্যাকেজ)',
      'Homepage Featured - হোমপেজের শীর্ষে ডিসপ্লে',
      'Unlimited Leads - সারা বছর সীমাহীন কাস্টমার লিড',
      'Gold Royal Verified Badge ব্লু-টিক ক্রেডিবিলিটি',
      '২৪ ঘণ্টা জরুরি সেবা নেটওয়ার্কে অগ্রাধিকার',
      'ডেডিকেটেড বিজনেস ম্যানেজার ও অ্যাকাউন্ট সাপোর্ট'
    ]
  }
];
