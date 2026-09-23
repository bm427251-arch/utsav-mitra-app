import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Ensure directories exist
if (!fs.existsSync('public')) fs.mkdirSync('public', { recursive: true });
if (!fs.existsSync('screenshots')) fs.mkdirSync('screenshots', { recursive: true });

// 1. Generate Logo: Primary Maroon #800020, Gold #D4AF37 logo text "Utsav Mitra" with diya icon
const logoSvg = `
<svg width="560" height="160" viewBox="0 0 560 160" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5E08C"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#AA820A"/>
    </linearGradient>
    <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#E85D4F"/>
      <stop offset="60%" stop-color="#FF9E40"/>
      <stop offset="100%" stop-color="#FFEE55"/>
    </linearGradient>
  </defs>

  <!-- Maroon Background -->
  <rect width="560" height="160" rx="20" fill="#800020"/>

  <!-- Diya Icon on the left -->
  <g transform="translate(32, 28)">
    <!-- Base / Diya Bowl -->
    <path d="M 12 60 Q 52 105 92 60 C 98 52 88 48 80 50 Q 52 68 24 50 C 16 48 6 52 12 60 Z" fill="url(#goldGrad)" stroke="#AA820A" stroke-width="2"/>
    <!-- Diya Stand -->
    <path d="M 40 82 L 32 96 L 72 96 L 64 82 Z" fill="url(#goldGrad)"/>
    <ellipse cx="52" cy="98" rx="28" ry="6" fill="#F5E08C"/>
    <!-- Diya Flame -->
    <path d="M 52 10 C 66 28 68 44 52 50 C 36 44 38 28 52 10 Z" fill="url(#flameGrad)"/>
    <circle cx="52" cy="40" r="4" fill="#FFFFFF" opacity="0.8"/>
  </g>

  <!-- Typography: Utsav Mitra & উৎসব মিত্র -->
  <g transform="translate(155, 48)">
    <!-- Bengali Subtitle / Title -->
    <text x="0" y="24" font-family="'Hind Siliguri', 'Segoe UI', Arial, sans-serif" font-size="34" font-weight="bold" fill="url(#goldGrad)" letter-spacing="1">উৎসব মিত্র</text>
    
    <!-- English Royal Name -->
    <text x="0" y="66" font-family="'Cinzel', 'Plus Jakarta Sans', 'Times New Roman', serif" font-size="30" font-weight="800" fill="#FFFFFF" letter-spacing="2">UTSAV MITRA</text>
    
    <!-- Tagline -->
    <text x="2" y="92" font-family="'Hind Siliguri', 'Segoe UI', Arial, sans-serif" font-size="16" font-weight="600" fill="#F5E08C" opacity="0.9" letter-spacing="0.5">আপনার প্রতিটি আয়োজনে বিশ্বস্ত বন্ধু</text>
  </g>
</svg>
`;

await sharp(Buffer.from(logoSvg))
  .png()
  .toFile('public/logo.png');

console.log('Created public/logo.png successfully');

// 2. Generate clean screenshots 1080x1920 without phone frames, using inner UI
const screens = [
  {
    name: 'screenshot-1-home.png',
    title: 'উৎসব মিত্র (Utsav Mitra)',
    subtitle: 'Verified Event Logistics & Bengali Ritual Services',
    hero: '1-Click Complete Event Bundles & Verified Vendors'
  },
  {
    name: 'screenshot-2-categories.png',
    title: 'স্মার্ট বেঙ্গলি কিওয়ার্ড সার্চ',
    subtitle: 'বিয়ে, অন্নপ্রাশন, উপনয়ন, পূজা ও শ্রাদ্ধানুষ্ঠান',
    hero: '6 Core Event Categories & Kolkata Pincode Matching'
  },
  {
    name: 'screenshot-3-emergency.png',
    title: '২৪×৭ জরুরি শ্রাদ্ধ ও সেবা সাপোর্ট',
    subtitle: 'পুরোহিত, অন্তিম সংস্কার সামগ্রী ও দ্রুত পরিবহন লজিস্টিকস',
    hero: 'Emergency Dispatch Helpline & Instant Direct Contact'
  }
];

// Clean existing screenshots
const screenshotFiles = fs.readdirSync('screenshots');
for (const f of screenshotFiles) {
  fs.unlinkSync(path.join('screenshots', f));
}

for (const sc of screens) {
  const screenshotSvg = `
  <svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#800020"/>
        <stop offset="100%" stop-color="#5A0016"/>
      </linearGradient>
      <linearGradient id="goldBar" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#F5E08C"/>
        <stop offset="50%" stop-color="#D4AF37"/>
        <stop offset="100%" stop-color="#AA820A"/>
      </linearGradient>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#FFFDF7"/>
      </linearGradient>
      <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FF6F61"/>
        <stop offset="100%" stop-color="#800020"/>
      </linearGradient>
    </defs>

    <!-- Clean App Canvas Background -->
    <rect width="1080" height="1920" fill="#FAFAFA"/>

    <!-- App Header Top Bar -->
    <rect width="1080" height="220" fill="url(#headerGrad)"/>
    <rect y="216" width="1080" height="4" fill="url(#goldBar)"/>

    <!-- Micro banner -->
    <rect width="1080" height="50" fill="#440010"/>
    <circle cx="50" cy="25" r="8" fill="#D4AF37"/>
    <text x="75" y="32" font-family="'Hind Siliguri', sans-serif" font-size="24" fill="#F5E08C" font-weight="bold">আপনার প্রতিটি আয়োজনে বিশ্বস্ত বন্ধু • ২৪×৭ সহায়তা</text>

    <!-- Header Content: Logo & Location -->
    <g transform="translate(50, 80)">
      <!-- Logo Box -->
      <rect width="320" height="96" rx="16" fill="#800020" stroke="#D4AF37" stroke-width="2"/>
      <circle cx="55" cy="48" r="28" fill="#D4AF37"/>
      <text x="40" y="58" font-family="'Hind Siliguri', sans-serif" font-size="34" font-weight="bold" fill="#800020">উ</text>
      <text x="100" y="46" font-family="'Hind Siliguri', sans-serif" font-size="32" font-weight="bold" fill="#FFFFFF">উৎসব মিত্র</text>
      <text x="100" y="76" font-family="sans-serif" font-size="18" font-weight="bold" fill="#F5E08C" letter-spacing="2">UTSAV MITRA</text>
    </g>

    <!-- Location Pill -->
    <g transform="translate(680, 100)">
      <rect width="350" height="60" rx="30" fill="rgba(255,255,255,0.15)" stroke="rgba(212,175,55,0.5)" stroke-width="2"/>
      <circle cx="35" cy="30" r="12" fill="#FF6F61"/>
      <text x="65" y="38" font-family="'Hind Siliguri', sans-serif" font-size="24" fill="#FFFFFF" font-weight="600">সল্টলেক (700091) ▼</text>
    </g>

    <!-- Search Bar Banner -->
    <g transform="translate(50, 260)">
      <rect width="980" height="90" rx="24" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="2"/>
      <circle cx="55" cy="45" r="18" fill="#800020"/>
      <text x="100" y="54" font-family="'Hind Siliguri', sans-serif" font-size="28" fill="#9CA3AF">খুঁজুন: ক্যাটারিং, ঠাকুরমশাই, বাউল, সানাই...</text>
      <rect x="780" y="15" width="180" height="60" rx="16" fill="#800020"/>
      <text x="830" y="53" font-family="'Hind Siliguri', sans-serif" font-size="26" fill="#FFFFFF" font-weight="bold">অনুসন্ধান</text>
    </g>

    <!-- Feature Showcase Card -->
    <g transform="translate(50, 390)">
      <rect width="980" height="260" rx="32" fill="url(#accentGrad)"/>
      <text x="60" y="80" font-family="'Hind Siliguri', sans-serif" font-size="44" font-weight="bold" fill="#FFFFFF">${sc.title.replace(/&/g, '&amp;')}</text>
      <text x="60" y="140" font-family="'Hind Siliguri', sans-serif" font-size="30" fill="#F5E08C">${sc.subtitle.replace(/&/g, '&amp;')}</text>
      <rect x="60" y="175" width="460" height="55" rx="14" fill="#FFFFFF"/>
      <text x="85" y="212" font-family="'Hind Siliguri', sans-serif" font-size="24" font-weight="bold" fill="#800020">⚡ ${sc.hero.replace(/&/g, '&amp;').slice(0, 32)}</text>
    </g>

    <!-- Event Category Quick Tiles -->
    <g transform="translate(50, 690)">
      <text x="0" y="40" font-family="'Hind Siliguri', sans-serif" font-size="36" font-weight="bold" fill="#1F2937">জনপ্রিয় ইভেন্ট সেবা সমূহ</text>
      
      <!-- 6 Grid Tiles -->
      <!-- Tile 1 -->
      <g transform="translate(0, 70)">
        <rect width="470" height="180" rx="24" fill="url(#cardGrad)" stroke="#E5E7EB" stroke-width="2"/>
        <circle cx="65" cy="65" r="35" fill="#FDF2E9"/>
        <text x="50" y="78" font-size="34">💍</text>
        <text x="125" y="65" font-family="'Hind Siliguri', sans-serif" font-size="30" font-weight="bold" fill="#111827">বিবাহ ও সঙ্গীত</text>
        <text x="125" y="105" font-family="'Hind Siliguri', sans-serif" font-size="22" fill="#6B7280">বোরযাত্রী, ক্যাটারিং ও মালাবদল</text>
        <rect x="25" y="130" width="130" height="32" rx="8" fill="#FEF3C7"/>
        <text x="35" y="152" font-family="sans-serif" font-size="18" font-weight="bold" fill="#92400E">১-ক্লিক প্যাকেজ</text>
      </g>

      <!-- Tile 2 -->
      <g transform="translate(510, 70)">
        <rect width="470" height="180" rx="24" fill="url(#cardGrad)" stroke="#E5E7EB" stroke-width="2"/>
        <circle cx="65" cy="65" r="35" fill="#EFF6FF"/>
        <text x="50" y="78" font-size="34">👶</text>
        <text x="125" y="65" font-family="'Hind Siliguri', sans-serif" font-size="30" font-weight="bold" fill="#111827">অন্নপ্রাশন ও জন্মদিন</text>
        <text x="125" y="105" font-family="'Hind Siliguri', sans-serif" font-size="22" fill="#6B7280">মুখেভাত, বেলুন থিম ও পুরোহিত</text>
        <rect x="25" y="130" width="140" height="32" rx="8" fill="#DBEAFE"/>
        <text x="35" y="152" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1E40AF">ভেরিফাইড ভেন্ডার</text>
      </g>

      <!-- Tile 3 -->
      <g transform="translate(0, 280)">
        <rect width="470" height="180" rx="24" fill="url(#cardGrad)" stroke="#E5E7EB" stroke-width="2"/>
        <circle cx="65" cy="65" r="35" fill="#FEF2F2"/>
        <text x="50" y="78" font-size="34">🕊️</text>
        <text x="125" y="65" font-family="'Hind Siliguri', sans-serif" font-size="30" font-weight="bold" fill="#111827">শ্রাদ্ধ ও অন্ত্যেষ্টিক্রিয়া</text>
        <text x="125" y="105" font-family="'Hind Siliguri', sans-serif" font-size="22" fill="#6B7280">২৪×৭ তাৎক্ষণিক শাস্ত্রীয় সেবা</text>
        <rect x="25" y="130" width="120" height="32" rx="8" fill="#FEE2E2"/>
        <text x="35" y="152" font-family="sans-serif" font-size="18" font-weight="bold" fill="#991B1B">জরুরি সেবা</text>
      </g>

      <!-- Tile 4 -->
      <g transform="translate(510, 280)">
        <rect width="470" height="180" rx="24" fill="url(#cardGrad)" stroke="#E5E7EB" stroke-width="2"/>
        <circle cx="65" cy="65" r="35" fill="#ECFDF5"/>
        <text x="50" y="78" font-size="34">🪔</text>
        <text x="125" y="65" font-family="'Hind Siliguri', sans-serif" font-size="30" font-weight="bold" fill="#111827">বাৎসরিক পূজা ও গৃহপ্রবেশ</text>
        <text x="125" y="105" font-family="'Hind Siliguri', sans-serif" font-size="22" fill="#6B7280">সত্যনারায়ণ, বাস্তু ও হোম সামগ্রী</text>
        <rect x="25" y="130" width="130" height="32" rx="8" fill="#D1FAE5"/>
        <text x="35" y="152" font-family="sans-serif" font-size="18" font-weight="bold" fill="#065F46">পণ্ডিত বুকিং</text>
      </g>
    </g>

    <!-- Verified Vendors Showcase -->
    <g transform="translate(50, 1200)">
      <text x="0" y="40" font-family="'Hind Siliguri', sans-serif" font-size="36" font-weight="bold" fill="#1F2937">যাচাইকৃত বিশ্বস্ত ভেন্ডার</text>

      <!-- Vendor Card 1 -->
      <g transform="translate(0, 70)">
        <rect width="980" height="240" rx="28" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="2"/>
        <rect x="20" y="20" width="200" height="200" rx="20" fill="#800020"/>
        <text x="65" y="135" font-size="80">👨‍🍳</text>
        <text x="250" y="70" font-family="'Hind Siliguri', sans-serif" font-size="34" font-weight="bold" fill="#111827">রয়্যাল বেঙ্গল ক্যাটারার্স</text>
        <text x="250" y="115" font-family="'Hind Siliguri', sans-serif" font-size="24" fill="#4B5563">প্রকৃত খাঁটি বাঙালি প্রিমিয়াম মেনু ও মাছের পদ</text>
        <text x="250" y="160" font-family="'Hind Siliguri', sans-serif" font-size="22" fill="#D4AF37" font-weight="bold">⭐ ৪.৯ (১২০+ রিভিউ) • সল্টলেক</text>
        
        <rect x="740" y="145" width="210" height="65" rx="16" fill="#800020"/>
        <text x="770" y="186" font-family="'Hind Siliguri', sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF">যোগাযোগ করুন</text>
      </g>

      <!-- Vendor Card 2 -->
      <g transform="translate(0, 340)">
        <rect width="980" height="240" rx="28" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="2"/>
        <rect x="20" y="20" width="200" height="200" rx="20" fill="#AA820A"/>
        <text x="65" y="135" font-size="80">🕉️</text>
        <text x="250" y="70" font-family="'Hind Siliguri', sans-serif" font-size="34" font-weight="bold" fill="#111827">পণ্ডিত সৌমেন্দ্র নারায়ণ ভট্টাচার্য</text>
        <text x="250" y="115" font-family="'Hind Siliguri', sans-serif" font-size="24" fill="#4B5563">শাস্ত্রীয় বেদজ্ঞ পুরোহিত • বিয়ে, পৈতে ও শান্তি পূজা</text>
        <text x="250" y="160" font-family="'Hind Siliguri', sans-serif" font-size="22" fill="#D4AF37" font-weight="bold">⭐ ৫.০ (৯৫+ রিভিউ) • শ্যামবাজার</text>
        
        <rect x="740" y="145" width="210" height="65" rx="16" fill="#25D366"/>
        <text x="775" y="186" font-family="'Hind Siliguri', sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF">হোয়াটসঅ্যাপ</text>
      </g>
    </g>

    <!-- Bottom Navigation Bar for Mobile App Feel -->
    <rect y="1820" width="1080" height="100" fill="#FFFFFF"/>
    <line x1="0" y1="1820" x2="1080" y2="1820" stroke="#E5E7EB" stroke-width="2"/>
    <g transform="translate(140, 1870)">
      <text x="0" y="0" font-family="'Hind Siliguri', sans-serif" font-size="28" font-weight="bold" fill="#800020">🏠 হোম</text>
      <text x="260" y="0" font-family="'Hind Siliguri', sans-serif" font-size="28" fill="#6B7280">🔍 ভেন্ডার তালিকা</text>
      <text x="560" y="0" font-family="'Hind Siliguri', sans-serif" font-size="28" fill="#DC2626">🚨 জরুরি সেবা</text>
    </g>
  </svg>
  `;

  const cleanSvg = screenshotSvg.replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;');

  await sharp(Buffer.from(cleanSvg))
    .png()
    .toFile(path.join('screenshots', sc.name));

  console.log(`Generated clean 1080x1920 screenshot: ${sc.name}`);
}
