import { EventCategory, EventCategoryId, Vendor } from '../types';

export const EVENT_CATEGORIES: EventCategory[] = [
  {
    id: 'wedding_engagement',
    titleEn: 'Wedding & Engagement',
    titleBn: 'বিবাহ ও শুভ পরিণয়',
    subtitleEn: 'Mandap, Catering, Shehnai & Photography',
    subtitleBn: 'বিয়ে, ক্যাটারিং, মেকআপ ও ফটোশুটের পূর্ণাঙ্গ আয়োজন',
    keywords: [
      'catering',
      'wedding',
      'khatarar',
      'biye',
      'pujor khabar',
      'decoration',
      'mandap',
      'mehendi',
      'makeup artist',
      'shehnai',
      'photographer'
    ],
    iconName: 'HeartHandshake',
    themeColor: '#800020',
    bannerImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    vendorCount: 142
  },
  {
    id: 'birthday_annaprashan',
    titleEn: 'Birthday & Annaprashan',
    titleBn: 'জন্মদিন ও অন্নপ্রাশন',
    subtitleEn: 'Kids celebrations, Mukhe Bhat & Themes',
    subtitleBn: 'মুখে ভাত, ম্যাজিশিয়ান, বেলুন ও কিডস ক্যাটারিং',
    keywords: [
      'annaprashan',
      'onnoprashon',
      'mukhe bhat',
      'birthday',
      'balloon decorator',
      'magician',
      'cartoon mascot',
      'tattoo artist',
      'kids catering',
      'purohit'
    ],
    iconName: 'Cake',
    themeColor: '#D4AF37',
    bannerImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
    vendorCount: 98
  },
  {
    id: 'shraddha_rituals',
    titleEn: 'Shraddha & Rituals',
    titleBn: 'শ্রাদ্ধ ও পারলৌকিক ক্রিয়া',
    subtitleEn: 'Funeral Support, Purohit & Veg Catering',
    subtitleBn: 'নিয়ম সেবা, পণ্ডিত, সামগ্রী ও নিরামিষ ভোজের বিশ্বস্ত ব্যবস্থা',
    keywords: [
      'shraddha',
      'sradho',
      'funeral',
      'niyom seba',
      'purohit',
      'pundit',
      'veg catering',
      'samagri supply',
      'helper'
    ],
    iconName: 'Flame',
    themeColor: '#4A3B32',
    bannerImage: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=600&q=80',
    vendorCount: 64
  },
  {
    id: 'club_stage',
    titleEn: 'Club Events & Stage',
    titleBn: 'ক্লাব ইভেন্ট ও স্টেজ শো',
    subtitleEn: 'Live Band, Baul, DJ & Event Security',
    subtitleBn: 'লাইভ ব্যান্ড, বাউল শিল্পী, ডিজে, বাউন্সার ও সাউন্ড',
    keywords: [
      'dance group',
      'artist booking',
      'live band',
      'dj',
      'baul artist',
      'anchor',
      'mc',
      'bouncer',
      'valet parking'
    ],
    iconName: 'Music',
    themeColor: '#FF6F61',
    bannerImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
    vendorCount: 86
  }
];

// Bengali synonym mapping for enhanced local dialect searching
export const BENGALI_SYNONYMS: Record<string, string[]> = {
  'biye': ['wedding', 'biye', 'বিবাহ', 'বিয়ে', 'mandap'],
  'khatarar': ['catering', 'খাবার', 'khatarar', 'ক্যাটারিং'],
  'mukhe bhat': ['annaprashan', 'onnoprashon', 'মুখে ভাত', 'অন্নপ্রাশন'],
  'onnoprashon': ['annaprashan', 'onnoprashon', 'মুখে ভাত'],
  'sradho': ['shraddha', 'sradho', 'শ্রাদ্ধ', 'শ্রাদ্ধানুষ্ঠান'],
  'niyom seba': ['niyom seba', 'নিয়ম সেবা', 'ritual'],
  'purohit': ['purohit', 'pundit', 'পুরোহিত', 'পণ্ডিত', 'ঠাকুর'],
  'baul': ['baul artist', 'বাউল', 'বাউল গান'],
  'dj': ['dj', 'ডিজে', 'sound', 'মিউজিক'],
  'mandap': ['mandap', 'প্যান্ডেল', 'মণ্ডপ', 'decoration'],
  'mehendi': ['mehendi', 'মেহেন্দি'],
  'magician': ['magician', 'ম্যাজিক', 'ম্যাজিশিয়ান']
};

/**
 * Normalizes search terms for uniform matching
 */
export function normalizeKeyword(term: string): string {
  return term
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u0980-\u09FF]/gi, '');
}

/**
 * Evaluates match score between query and a vendor / category
 */
export function calculateMatchScore(query: string, itemKeywords: string[], itemName: string): number {
  const normQuery = normalizeKeyword(query);
  if (!normQuery) return 0;

  const queryTokens = normQuery.split(/\s+/);
  let score = 0;

  // Exact full match
  if (itemName.toLowerCase().includes(normQuery)) {
    score += 50;
  }

  for (const token of queryTokens) {
    if (token.length < 2) continue;

    // Check directly in item keywords
    for (const kw of itemKeywords) {
      const normKw = normalizeKeyword(kw);
      if (normKw === token) {
        score += 30;
      } else if (normKw.includes(token) || token.includes(normKw)) {
        score += 15;
      }
    }

    // Check Bengali synonyms
    for (const [key, syns] of Object.entries(BENGALI_SYNONYMS)) {
      if (token.includes(key) || syns.some(s => s.includes(token))) {
        for (const kw of itemKeywords) {
          if (syns.some(s => kw.toLowerCase().includes(s))) {
            score += 25;
          }
        }
      }
    }
  }

  return score;
}

/**
 * Suggests matching keywords as user types in the search bar
 */
export function getKeywordSuggestions(query: string, limit = 6): { keyword: string; categoryTitle: string; categoryId: EventCategoryId }[] {
  const cleanQuery = query.trim();
  if (cleanQuery.length < 2) {
    return [];
  }

  const normQuery = normalizeKeyword(cleanQuery);
  if (!normQuery) {
    return [];
  }

  const suggestions: { keyword: string; categoryTitle: string; categoryId: EventCategoryId; score: number }[] = [];

  EVENT_CATEGORIES.forEach(category => {
    category.keywords.forEach(keyword => {
      const normKw = normalizeKeyword(keyword);
      if (normKw.includes(normQuery) || normQuery.includes(normKw)) {
        suggestions.push({
          keyword,
          categoryTitle: category.titleEn,
          categoryId: category.id,
          score: normKw.startsWith(normQuery) ? 2 : 1
        });
      }
    });
  });

  return suggestions
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ keyword, categoryTitle, categoryId }) => ({ keyword, categoryTitle, categoryId }));
}

/**
 * Filter vendors dynamically by search query, radius, pin code, category and verification
 */
export function filterVendors(
  vendors: Vendor[],
  params: {
    query?: string;
    categoryId?: EventCategoryId | 'all';
    radiusKm?: number;
    pinCode?: string;
    verifiedOnly?: boolean;
    minRating?: number;
    sortBy?: 'relevance' | 'rating' | 'price_low' | 'price_high' | 'distance';
  }
): Vendor[] {
  const {
    query = '',
    categoryId = 'all',
    radiusKm = 25,
    pinCode = '',
    verifiedOnly = false,
    minRating = 0,
    sortBy = 'relevance'
  } = params;

  let results = vendors.filter(vendor => {
    // 1. Category match
    if (categoryId !== 'all' && vendor.categoryId !== categoryId) {
      return false;
    }

    // 2. Radius match
    if (radiusKm && vendor.distanceKm > radiusKm) {
      return false;
    }

    // 3. PIN code match (exact or prefix match)
    if (pinCode.trim() && !vendor.pinCode.startsWith(pinCode.trim())) {
      return false;
    }

    // 4. Verification flag
    if (verifiedOnly && !vendor.verified) {
      return false;
    }

    // 5. Minimum rating
    if (minRating && vendor.rating < minRating) {
      return false;
    }

    // 6. Search keyword match
    if (query.trim()) {
      const score = calculateMatchScore(query, vendor.keywords, vendor.name + ' ' + vendor.businessNameBn);
      return score > 0;
    }

    return true;
  });

  // Sorting
  results.sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'price_low') {
      return a.startingPrice - b.startingPrice;
    }
    if (sortBy === 'price_high') {
      return b.startingPrice - a.startingPrice;
    }
    if (sortBy === 'distance') {
      return a.distanceKm - b.distanceKm;
    }
    // Default 'relevance'
    if (query.trim()) {
      const scoreA = calculateMatchScore(query, a.keywords, a.name + ' ' + a.businessNameBn);
      const scoreB = calculateMatchScore(query, b.keywords, b.name + ' ' + b.businessNameBn);
      return scoreB - scoreA;
    }
    // Fallback sort: verified first, then rating
    if (a.verified !== b.verified) {
      return a.verified ? -1 : 1;
    }
    return b.rating - a.rating;
  });

  return results;
}
