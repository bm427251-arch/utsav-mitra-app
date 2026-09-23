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
