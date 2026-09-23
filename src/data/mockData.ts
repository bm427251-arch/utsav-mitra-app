import { EventBundle, Vendor } from '../types';

export const READY_EVENT_BUNDLES: EventBundle[] = [
  {
    id: 'bundle_shraddha_complete',
    titleEn: 'Shraddha Complete Support Package',
    titleBn: 'শ্রাদ্ধানুষ্ঠান সম্পূর্ণ সহায়তা প্যাকেজ',
    categoryId: 'shraddha_rituals',
    badge: '24/7 Priority Emergency',
    priceEstimate: 18500,
    originalPrice: 22000,
    items: [
      'Experienced Vedic Purohit (বৈদিক পুরোহিত)',
      '100% Shuddho Ritual Items Supply (শ্রাদ্ধ সামগ্রী কিট)',
      'Pure Veg Satvik Catering (৫০ জন নিরামিষ ভোজ)',
      'Dedicated Logistics Helper & Ghat Assistance (লজিস্টিক হেল্পার)'
    ],
    description: 'A compassionate, dignified end-to-end ritual arrangement handled by certified Vedic scholars and experienced helpers.',
    descriptionBn: 'শোকাবহ মুহূর্তে পরিবারের পাশে থেকে নিয়ম সেবা, পুরোহিত, সামগ্রী ও নিরামিষ আহারের নিখুঁত ও মর্যাদাপূর্ণ আয়োজন।',
    highlightTag: 'Most Trusted for Funeral Support',
    iconName: 'Flame',
    isEmergency: true,
    deliveryTime: 'Immediate Dispatch within 2 Hours'
  },
  {
    id: 'bundle_annaprashan_gold',
    titleEn: 'Annaprashan Gold Bundle',
    titleBn: 'অন্নপ্রাশন গোল্ড প্রিমিয়াম বান্ডিল',
    categoryId: 'birthday_annaprashan',
    badge: 'Popular Choice',
    priceEstimate: 34500,
    originalPrice: 39900,
    items: [
      'Traditional Purohit for Mukhe Bhat (মুখে ভাতের পুরোহিত)',
      'Royal Bengali Theme Decoration & Mandap (থিম ডেকোরেশন ও আলপনা)',
      'Special Kids & Family Catering (50 Persons Gourmet Menu)',
      'Candid Traditional & Baby Photographer (ক্যান্ডিড ফটোগ্রাফি ও অ্যালবাম)'
    ],
    description: 'Celebrate your child’s auspicious first grain ceremony with sacred rituals, opulent stage decor, authentic food, and heirloom photography.',
    descriptionBn: 'শিশুর মুখে ভাতের শুভ দিনে পুরোহিত, রাজকীয় ডেকোরেশন, ৫০ জনের বাঙালি ভোজ এবং ক্যান্ডিড ফটোশুটের সেরা প্যাকেজ।',
    highlightTag: 'All-in-One Ritual & Banquet',
    iconName: 'Sparkles',
    deliveryTime: 'Advance Booking (2-5 Days)'
  },
  {
    id: 'bundle_kids_birthday',
    titleEn: 'Kids Birthday Fun Package',
    titleBn: 'বাচ্চাদের বার্থডে ধামাকা প্যাকেজ',
    categoryId: 'birthday_annaprashan',
    badge: 'High Energy & Fun',
    priceEstimate: 16200,
    originalPrice: 19500,
    items: [
      'Vibrant Balloon Decor & Theme Backdrop (বেলুন ডেকোর ও এন্ট্রি আর্চ)',
      'Interactive Comedy Magician Show 45m (লাইভ ম্যাজিশিয়ান শো)',
      'Favorite Cartoon Mascot (Mickey/Chhota Bheem মাসকট)',
      'Live Fast Food Counter: Popcorn, Candy Floss & Fries'
    ],
    description: 'Transform your kid’s special day into a wonderland with captivating magic, beloved mascots, balloon artistry, and live snacks.',
    descriptionBn: 'শিশুর জন্মদিনে আনন্দ ও উল্লাসের রঙিন আয়োজন — ম্যাজিক শো, মাসকট, ডেকোরেশন ও লাইভ স্ন্যাক্স কাউন্টার।',
    highlightTag: 'Kids Favorite Choice',
    iconName: 'Cake',
    deliveryTime: '24 Hours Prior Notice'
  }
];

export const MOCK_VENDORS: Vendor[] = [
  // Wedding & Engagement
  {
    id: 'v_royal_bengal_caterers',
    name: 'Royal Bengal Catering & Banquets',
    businessNameBn: 'রয়্যাল বেঙ্গল ক্যাটারিং সার্ভিস',
    categoryId: 'wedding_engagement',
    categoryTitleEn: 'Wedding & Engagement',
    services: ['Biye Catering', 'Pujor Khabar', 'Fish Fry & Biryani Counter', 'Dessert Station'],
    keywords: ['catering', 'wedding', 'khatarar', 'biye', 'pujor khabar', 'veg catering'],
    rating: 4.9,
    reviewCount: 312,
    verified: true,
    pinCode: '700091',
    area: 'Salt Lake Sector V',
    city: 'Kolkata',
    distanceKm: 2.4,
    startingPrice: 480,
    priceUnit: 'per plate',
    contactNumber: '+91 98301 22450',
    whatsappNumber: '+919830122450',
    socialLinks: {
      instagram: 'https://instagram.com/royalbengalcatering',
      facebook: 'https://facebook.com/royalbengalkolkata',
      youtube: 'https://youtube.com/@royalbengalcaterers'
    },
    photos: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
    ],
    emergencySupported: false,
    bio: 'Serving authentic Kolkata wedding delicacies for 22+ years. Famous for Bhetki Paturi, Chingri Malaikari, and authentic mishti.',
    experienceYears: 22,
    featured: true
  },
  {
    id: 'v_utsab_mandap_decor',
    name: 'Utsab Mandap & Theme Decorators',
    businessNameBn: 'উৎসব মণ্ডপ ও আলোকসজ্জা',
    categoryId: 'wedding_engagement',
    categoryTitleEn: 'Wedding & Engagement',
    services: ['Mandap Design', 'Mehendi Lounge', 'Shehnai Stage', 'Flower Canopy'],
    keywords: ['decoration', 'mandap', 'mehendi', 'shehnai', 'wedding', 'biye'],
    rating: 4.8,
    reviewCount: 184,
    verified: true,
    pinCode: '700029',
    area: 'Gariahat',
    city: 'Kolkata',
    distanceKm: 6.8,
    startingPrice: 28000,
    priceUnit: 'per event',
    contactNumber: '+91 98310 99412',
    whatsappNumber: '+919831099412',
    socialLinks: {
      instagram: 'https://instagram.com/utsabmandap',
      facebook: 'https://facebook.com/utsabmandapkolkata'
    },
    photos: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80'
    ],
    emergencySupported: false,
    bio: 'Traditional and contemporary Bengali wedding mandap designs, eco-friendly floral craft, and grand entrance canopies.',
    experienceYears: 15
  },
  {
    id: 'v_alokchitra_studio',
    name: 'Alokchitra Wedding Stories',
    businessNameBn: 'আলোকচিত্র সিনেমাটিক স্টুডিও',
    categoryId: 'wedding_engagement',
    categoryTitleEn: 'Wedding & Engagement',
    services: ['Pre-wedding Shoots', 'Cinematic Wedding Film', 'Traditional Photography', 'Drone Coverage'],
    keywords: ['photographer', 'wedding', 'biye', 'makeup artist'],
    rating: 4.9,
    reviewCount: 228,
    verified: true,
    pinCode: '700064',
    area: 'Salt Lake Sector I',
    city: 'Kolkata',
    distanceKm: 3.1,
    startingPrice: 22000,
    priceUnit: 'per day',
    contactNumber: '+91 90511 44521',
    whatsappNumber: '+919051144521',
    socialLinks: {
      instagram: 'https://instagram.com/alokchitraweddings',
      youtube: 'https://youtube.com/@alokchitrafilms'
    },
    photos: [
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80'
    ],
    emergencySupported: false,
    bio: 'Award-winning wedding photography duo specializing in emotive candid moments, sindoor daan highlights, and cinematic teaser films.',
    experienceYears: 10,
    featured: true
  },
  {
    id: 'v_roopkotha_makeover',
    name: 'Roopkotha Bridal Makeover & Mehendi',
    businessNameBn: 'রূপকথা ব্রাইডাল মেকওভার ও মেহেন্দি',
    categoryId: 'wedding_engagement',
    categoryTitleEn: 'Wedding & Engagement',
    services: ['Bridal HD Makeup', 'Kolkata Chandan Art', 'Organic Mehendi', 'Saree Draping'],
    keywords: ['makeup artist', 'mehendi', 'biye', 'wedding', 'khatarar'],
    rating: 4.7,
    reviewCount: 146,
    verified: true,
    pinCode: '700091',
    area: 'Bidhannagar',
    city: 'Kolkata',
    distanceKm: 1.8,
    startingPrice: 8500,
    priceUnit: 'per session',
    contactNumber: '+91 97482 11984',
    whatsappNumber: '+919748211984',
    socialLinks: {
      instagram: 'https://instagram.com/roopkothabridal'
    },
    photos: [
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80'
    ],
    emergencySupported: false,
    bio: 'Certified bridal makeup artist adept in traditional Bengali bride look with exquisite chandan drawing.',
    experienceYears: 8
  },

  // Birthday & Annaprashan (Kids & Celebrations)
  {
    id: 'v_purohit_subhasish',
    name: 'Pandit Subhasish Bhattacharya',
    businessNameBn: 'পণ্ডিত শুভাশিস ভট্টাচার্য (পুরোহিত সেবা)',
    categoryId: 'birthday_annaprashan',
    categoryTitleEn: 'Birthday & Annaprashan',
    services: ['Mukhe Bhat Vedic Rituals', 'Namkaran', 'Annaprashan Hom', 'Samagri Advice'],
    keywords: ['purohit', 'pundit', 'annaprashan', 'onnoprashon', 'mukhe bhat', 'samagri supply'],
    rating: 5.0,
    reviewCount: 419,
    verified: true,
    pinCode: '700091',
    area: 'Salt Lake Karunamoyee',
    city: 'Kolkata',
    distanceKm: 1.5,
    startingPrice: 2500,
    priceUnit: 'per puja',
    contactNumber: '+91 98300 77123',
    whatsappNumber: '+919830077123',
    socialLinks: {
      youtube: 'https://youtube.com/@vedicpurohitkolkata'
    },
    photos: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=600&q=80'
    ],
    emergencySupported: true,
    bio: 'Devoted Purohit with 30 years experience performing Vedic Annaprashan, Upanayan, and family pujas with sacred clarity.',
    experienceYears: 30,
    featured: true
  },
  {
    id: 'v_joyful_kids_events',
    name: 'Joyful Moments Kids Party Studio',
    businessNameBn: 'জয়ফুল মোমেন্টস কিডস ইভেন্টস',
    categoryId: 'birthday_annaprashan',
    categoryTitleEn: 'Birthday & Annaprashan',
    services: ['Balloon Decorator', 'Magician Show', 'Cartoon Mascot', 'Tattoo Artist', 'Kids Catering'],
    keywords: ['balloon decorator', 'magician', 'cartoon mascot', 'tattoo artist', 'birthday', 'kids catering'],
    rating: 4.8,
    reviewCount: 195,
    verified: true,
    pinCode: '700054',
    area: 'Kankurgachi',
    city: 'Kolkata',
    distanceKm: 4.2,
    startingPrice: 6500,
    priceUnit: 'package starting',
    contactNumber: '+91 94331 66890',
    whatsappNumber: '+919433166890',
    socialLinks: {
      instagram: 'https://instagram.com/joyfulkidsevents',
      facebook: 'https://facebook.com/joyfulkidskolkata'
    },
    photos: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80'
    ],
    emergencySupported: false,
    bio: 'Premier children party planners with trained entertainers, sanitized mascot costumes, and organic face tattoos.',
    experienceYears: 9
  },
  {
    id: 'v_magic_sarkar',
    name: 'PC Sarkar Junior Magic & Entertainment',
    businessNameBn: 'জাদুকর সৌম্য সরকার ম্যাজিক শো',
    categoryId: 'birthday_annaprashan',
    categoryTitleEn: 'Birthday & Annaprashan',
    services: ['45-Minute Kids Illusion Show', 'Balloon Animals', 'Interactive Stage Tricks'],
    keywords: ['magician', 'birthday', 'cartoon mascot', 'artist booking'],
    rating: 4.9,
    reviewCount: 167,
    verified: true,
    pinCode: '700091',
    area: 'Salt Lake',
    city: 'Kolkata',
    distanceKm: 2.1,
    startingPrice: 4500,
    priceUnit: 'per show',
    contactNumber: '+91 98362 55431',
    whatsappNumber: '+919836255431',
    socialLinks: {
      youtube: 'https://youtube.com/@soumyamagicworld'
    },
    photos: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80'
    ],
    emergencySupported: false,
    bio: 'Mind-boggling interactive comedy illusions tailored specifically for kids birthdays and family gatherings.',
    experienceYears: 12
  },

  // Shraddha & Rituals (Funeral Support)
  {
    id: 'v_moksha_seva',
    name: 'Moksha Seva 24x7 Ritual & Funeral Logistics',
    businessNameBn: 'মোক্ষ সেবা ২৪x৭ পারলৌকিক সহায়তা',
    categoryId: 'shraddha_rituals',
    categoryTitleEn: 'Shraddha & Rituals',
    services: ['24/7 Purohit & Pundit', 'Shuddho Samagri Kit Delivery', 'Veg Satvik Catering', 'Nimtala / Keoratala Helper'],
    keywords: ['shraddha', 'sradho', 'funeral', 'niyom seba', 'purohit', 'pundit', 'veg catering', 'samagri supply', 'helper'],
    rating: 5.0,
    reviewCount: 520,
    verified: true,
    pinCode: '700091',
    area: 'Kolkata & Howrah (All Wards)',
    city: 'Kolkata',
    distanceKm: 0.8,
    startingPrice: 3500,
    priceUnit: 'base kit & purohit',
    contactNumber: '+91 98311 00099',
    whatsappNumber: '+919831100099',
    socialLinks: {
      facebook: 'https://facebook.com/mokshasevakolkata'
    },
    photos: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=600&q=80'
    ],
    emergencySupported: true,
    bio: 'Dignified, round-the-clock funeral assistance. We arrange verified Vedic priests, ritual brassware, Ganga mitti, and spotless satvik vegetarian meals.',
    experienceYears: 18,
    featured: true
  },
  {
    id: 'v_shanti_veg_catering',
    name: 'Shanti Niyom Seba & Pure Veg Caterers',
    businessNameBn: 'শান্তি নিয়ম সেবা ও নিরামিষ ক্যাটারিং',
    categoryId: 'shraddha_rituals',
    categoryTitleEn: 'Shraddha & Rituals',
    services: ['Niyom Seba Thali', 'Shraddha Bhoj (50-500 Pax)', 'Satvik Cooking Helper', 'Disposables & Packets'],
    keywords: ['veg catering', 'shraddha', 'sradho', 'niyom seba', 'helper', 'catering'],
    rating: 4.8,
    reviewCount: 231,
    verified: true,
    pinCode: '700034',
    area: 'Behala',
    city: 'Kolkata',
    distanceKm: 12.5,
    startingPrice: 220,
    priceUnit: 'per thali',
    contactNumber: '+91 98314 33201',
    whatsappNumber: '+919831433201',
    socialLinks: {
      facebook: 'https://facebook.com/shantivegcaterers'
    },
    photos: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
    ],
    emergencySupported: true,
    bio: 'Dedicated sattvic kitchen preparing without onion and garlic for ritual meals. Strict hygiene and traditional brass service.',
    experienceYears: 25
  },
  {
    id: 'v_ganga_samagri_bhandar',
    name: 'Ganga Ritual Samagri & Logistics',
    businessNameBn: 'গঙ্গা পারলৌকিক সামগ্রী ভাণ্ডার',
    categoryId: 'shraddha_rituals',
    categoryTitleEn: 'Shraddha & Rituals',
    services: ['Samagri Supply Kit', 'Ghat Helper Assistance', 'Asthi Visarjan Logistics', 'Purohit Coordination'],
    keywords: ['samagri supply', 'helper', 'shraddha', 'sradho', 'funeral', 'pundit'],
    rating: 4.9,
    reviewCount: 178,
    verified: true,
    pinCode: '700006',
    area: 'Shyambazar / Bagbazar',
    city: 'Kolkata',
    distanceKm: 7.2,
    startingPrice: 1800,
    priceUnit: 'kit starting',
    contactNumber: '+91 93310 88210',
    whatsappNumber: '+919331088210',
    socialLinks: {
      facebook: 'https://facebook.com/gangasamagrikolkata'
    },
    photos: [
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=600&q=80'
    ],
    emergencySupported: true,
    bio: 'Fresh sesame, kusha grass, pure ghee, brass lamps, and certified helpers for ghat rituals.',
    experienceYears: 35
  },

  // Club Events & Stage Performance
  {
    id: 'v_sur_o_taal_baul',
    name: 'Sur O Taal Baul & Folk Ensemble',
    businessNameBn: 'সুর ও তাল বাউল গানের দল',
    categoryId: 'club_stage',
    categoryTitleEn: 'Club Events & Stage',
    services: ['Baul Artist Group', 'Ektara & Dotara Live', 'Folk Fusion', 'Stage Anchor'],
    keywords: ['baul artist', 'artist booking', 'live band', 'anchor', 'mc'],
    rating: 4.9,
    reviewCount: 164,
    verified: true,
    pinCode: '700091',
    area: 'Salt Lake City',
    city: 'Kolkata',
    distanceKm: 3.5,
    startingPrice: 14000,
    priceUnit: 'per 2hr concert',
    contactNumber: '+91 98322 99011',
    whatsappNumber: '+919832299011',
    socialLinks: {
      youtube: 'https://youtube.com/@surotaalfolk',
      instagram: 'https://instagram.com/surotaal'
    },
    photos: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80'
    ],
    emergencySupported: false,
    bio: 'Authentic Baul singers from Shantiniketan and Nadia performing soul-stirring Lalon, Radharaman, and Bengali folk classics for cultural clubs.',
    experienceYears: 16,
    featured: true
  },
  {
    id: 'v_kolkata_beats_dj',
    name: 'Kolkata Beats DJ & Live Band Production',
    businessNameBn: 'কলকাতা বিটস ডিজে ও সাউন্ড প্রোডাকশন',
    categoryId: 'club_stage',
    categoryTitleEn: 'Club Events & Stage',
    services: ['Club DJ & Light Rig', 'Live Rock & Fusion Band', 'Line Array Audio', 'Visual LED Wall'],
    keywords: ['dj', 'live band', 'artist booking', 'dance group'],
    rating: 4.7,
    reviewCount: 288,
    verified: true,
    pinCode: '700019',
    area: 'Ballygunge',
    city: 'Kolkata',
    distanceKm: 8.5,
    startingPrice: 18000,
    priceUnit: 'per night',
    contactNumber: '+91 98305 66782',
    whatsappNumber: '+919830566782',
    socialLinks: {
      instagram: 'https://instagram.com/kolkatabeatsdj',
      youtube: 'https://youtube.com/@kolkatabeatslive'
    },
    photos: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80'
    ],
    emergencySupported: false,
    bio: 'Professional stage sound, high-impact festival lighting, Bollywood & EDM DJs for college fests, club reunions, and wedding sangeet.',
    experienceYears: 11
  },
  {
    id: 'v_vanguard_security',
    name: 'Vanguard Event Security & Valet Management',
    businessNameBn: 'ভ্যানগার্ড বাউন্সার ও ভ্যালেট সার্ভিস',
    categoryId: 'club_stage',
    categoryTitleEn: 'Club Events & Stage',
    services: ['Bouncer Squad', 'Valet Parking Team', 'Crowd Barricade', 'VIP Protocol'],
    keywords: ['bouncer', 'valet parking', 'dance group', 'anchor'],
    rating: 4.8,
    reviewCount: 142,
    verified: true,
    pinCode: '700091',
    area: 'Sector V',
    city: 'Kolkata',
    distanceKm: 1.2,
    startingPrice: 1200,
    priceUnit: 'per guard / 6hrs',
    contactNumber: '+91 98319 77800',
    whatsappNumber: '+919831977800',
    socialLinks: {
      facebook: 'https://facebook.com/vanguardsecuritykol'
    },
    photos: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80'
    ],
    emergencySupported: true,
    bio: 'Disciplined, certified security bouncers and uniformed valet drivers with full vehicle liability insurance for hassle-free club evenings.',
    experienceYears: 14
  }
];

export const POPULAR_PIN_CODES = [
  { pin: '700091', area: 'Salt Lake Sector V / Bidhannagar' },
  { pin: '700064', area: 'Salt Lake Sector I / Karunamoyee' },
  { pin: '700029', area: 'Gariahat / South Kolkata' },
  { pin: '700019', area: 'Ballygunge / Dover Park' },
  { pin: '700034', area: 'Behala / Taratala' },
  { pin: '700054', area: 'Kankurgachi / Phoolbagan' },
  { pin: '700006', area: 'Shyambazar / North Kolkata' },
  { pin: '711101', area: 'Howrah Station / Mandirtala' }
];
