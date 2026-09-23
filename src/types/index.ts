export type EventCategoryId = 
  | 'wedding_engagement' 
  | 'birthday_annaprashan' 
  | 'shraddha_rituals' 
  | 'club_stage';

export interface EventCategory {
  id: EventCategoryId;
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  keywords: string[];
  iconName: string;
  themeColor: string;
  bannerImage: string;
  vendorCount: number;
}

export interface VendorSocialLinks {
  instagram?: string;
  facebook?: string;
  youtube?: string;
}

export type VendorSubscriptionPlanId = '1_month' | '6_months' | '1_year';

export interface VendorSubscriptionPlan {
  id: VendorSubscriptionPlanId;
  durationMonths: number;
  titleBn: string;
  titleEn: string;
  price: number;
  originalPrice: number;
  popular?: boolean;
  savingsPercentage: number;
  features: string[];
}

export interface VendorSubscription {
  planId: VendorSubscriptionPlanId;
  planTitleBn: string;
  price: number;
  startDate: string;
  expiryDate: string;
  active: boolean;
  paymentId?: string;
}

export interface Vendor {
  id: string;
  name: string;
  businessNameBn: string;
  categoryId: EventCategoryId;
  categoryTitleEn: string;
  services: string[];
  keywords: string[];
  rating: number;
  reviewCount: number;
  verified: boolean;
  pinCode: string;
  area: string;
  city: string;
  distanceKm: number;
  startingPrice: number;
  priceUnit: string;
  contactNumber: string;
  whatsappNumber: string;
  socialLinks: VendorSocialLinks;
  photos: string[];
  emergencySupported: boolean;
  bio: string;
  experienceYears: number;
  featured?: boolean;
  subscription?: VendorSubscription;
}

export interface EventBundle {
  id: string;
  titleEn: string;
  titleBn: string;
  categoryId: EventCategoryId;
  badge: string;
  priceEstimate: number;
  originalPrice?: number;
  items: string[];
  description: string;
  descriptionBn: string;
  highlightTag: string;
  iconName: string;
  isEmergency?: boolean;
  deliveryTime: string;
}

export interface KeywordSearchResult {
  keyword: string;
  matchedCategories: EventCategory[];
  relevanceScore: number;
  suggestedVendorsCount: number;
}

export interface FilterOptions {
  categoryId?: EventCategoryId | 'all';
  searchQuery: string;
  selectedRadiusKm: number;
  selectedPinCode: string;
  verifiedOnly: boolean;
  minRating: number;
  sortBy: 'relevance' | 'rating' | 'price_low' | 'price_high' | 'distance';
  selectedTag?: string;
}
