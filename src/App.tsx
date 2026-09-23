import React, { useState, useMemo } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Gift, 
  PhoneCall, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2,
  SlidersHorizontal,
  CreditCard,
  Crown
} from 'lucide-react';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { VendorListingScreen } from './components/VendorListingScreen';
import { BundleDetailModal } from './components/BundleDetailModal';
import { VendorDetailModal } from './components/VendorDetailModal';
import { EmergencySupportModal } from './components/EmergencySupportModal';
import { ContactActionSheet } from './components/ContactActionSheet';
import { CheckoutScreen, CheckoutItem } from './components/CheckoutScreen';
import { PaymentScreen } from './components/PaymentScreen';
import { VendorRegistrationModal } from './components/VendorRegistrationModal';
import { VendorSubscriptionScreen } from './screens/VendorSubscriptionScreen';
import { MOCK_VENDORS, READY_EVENT_BUNDLES } from './data/mockData';
import { filterVendors, EVENT_CATEGORIES } from './utils/keywordEngine';
import { EventBundle, EventCategoryId, Vendor } from './types';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<'home' | 'vendors' | 'checkout' | 'payments' | 'subscription'>('home');
  const [selectedPin, setSelectedPin] = useState<string>('700091');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<EventCategoryId | 'all'>('all');
  const [selectedRadius, setSelectedRadius] = useState<number>(25);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'price_low' | 'price_high' | 'distance'>('relevance');

  // Checkout & Payment State
  const [checkoutItem, setCheckoutItem] = useState<CheckoutItem | null>(null);

  // Dynamic Vendors list with persistent local storage
  const [allVendors, setAllVendors] = useState<Vendor[]>(() => {
    try {
      const stored = localStorage.getItem('utsav_custom_vendors');
      if (stored) {
        const custom = JSON.parse(stored);
        return [...custom, ...MOCK_VENDORS];
      }
    } catch (e) {
      console.warn(e);
    }
    return MOCK_VENDORS;
  });

  // Modals state
  const [selectedBundle, setSelectedBundle] = useState<EventBundle | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [contactVendor, setContactVendor] = useState<Vendor | null>(null);
  const [contactMode, setContactMode] = useState<'call' | 'whatsapp' | null>(null);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);
  const [isVendorRegOpen, setIsVendorRegOpen] = useState<boolean>(false);

  // Filtered vendors using the keyword & filter engine
  const filteredVendors = useMemo(() => {
    return filterVendors(allVendors, {
      query: searchQuery,
      categoryId: selectedCategoryId,
      radiusKm: selectedRadius,
      pinCode: selectedPin,
      verifiedOnly,
      sortBy
    });
  }, [allVendors, searchQuery, selectedCategoryId, selectedRadius, selectedPin, verifiedOnly, sortBy]);

  // Featured vendors near current pin
  const featuredVendors = useMemo(() => {
    return allVendors.filter(v => v.verified && v.distanceKm <= selectedRadius).slice(0, 4);
  }, [allVendors, selectedRadius]);

  const handleSearchSubmit = (query: string, categoryId?: EventCategoryId) => {
    setSearchQuery(query);
    if (categoryId) {
      setSelectedCategoryId(categoryId);
    }
    setActiveScreen('vendors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (catId: EventCategoryId) => {
    setSelectedCategoryId(catId);
    setSearchQuery('');
    setActiveScreen('vendors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateFilters = (params: {
    query?: string;
    categoryId?: EventCategoryId | 'all';
    radius?: number;
    pin?: string;
    verifiedOnly?: boolean;
    sortBy?: 'relevance' | 'rating' | 'price_low' | 'price_high' | 'distance';
  }) => {
    if (params.query !== undefined) setSearchQuery(params.query);
    if (params.categoryId !== undefined) setSelectedCategoryId(params.categoryId);
    if (params.radius !== undefined) setSelectedRadius(params.radius);
    if (params.pin !== undefined) setSelectedPin(params.pin);
    if (params.verifiedOnly !== undefined) setVerifiedOnly(params.verifiedOnly);
    if (params.sortBy !== undefined) setSortBy(params.sortBy);
  };

  const handleCallVendor = (vendor: Vendor) => {
    setContactVendor(vendor);
    setContactMode('call');
  };

  const handleWhatsAppVendor = (vendor: Vendor) => {
    setContactVendor(vendor);
    setContactMode('whatsapp');
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#FAFAFA] text-[#1F1A1C] flex flex-col font-sans">
        {/* Top Application Header */}
      <Header
        selectedPin={selectedPin}
        onSelectPin={setSelectedPin}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenVendorRegistration={() => setIsVendorRegOpen(true)}
        onNavigateSubscription={() => {
          setActiveScreen('subscription');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeScreen={activeScreen}
        onNavigateHome={() => {
          setActiveScreen('home');
          setSearchQuery('');
          setSelectedCategoryId('all');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeScreen === 'subscription' ? (
          <VendorSubscriptionScreen
            onBack={() => {
              setActiveScreen('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRegisterCustom={() => setIsVendorRegOpen(true)}
          />
        ) : activeScreen === 'checkout' && checkoutItem ? (
          <CheckoutScreen
            item={checkoutItem}
            onBack={() => {
              setActiveScreen('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSuccess={(paymentId, bookingId) => {
              console.log('Payment successful:', paymentId, bookingId);
            }}
          />
        ) : activeScreen === 'payments' ? (
          <PaymentScreen
            onBack={() => {
              setActiveScreen('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectCheckout={(item) => {
              setCheckoutItem(item);
              setActiveScreen('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : activeScreen === 'home' ? (
          <HomeScreen
            onSearchSubmit={handleSearchSubmit}
            onSelectCategory={handleSelectCategory}
            onSelectBundle={(bundle) => setSelectedBundle(bundle)}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
            onSelectVendor={(vendor) => setSelectedVendor(vendor)}
            onOpenVendorRegistration={() => setIsVendorRegOpen(true)}
            onOpenSubscription={() => {
              setActiveScreen('subscription');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            featuredVendors={featuredVendors}
            selectedPin={selectedPin}
          />
        ) : (
          <div className="pt-4">
            <VendorListingScreen
              vendors={filteredVendors}
              searchQuery={searchQuery}
              selectedCategoryId={selectedCategoryId}
              selectedRadius={selectedRadius}
              selectedPin={selectedPin}
              verifiedOnly={verifiedOnly}
              onUpdateFilters={handleUpdateFilters}
              onSelectVendor={(vendor) => setSelectedVendor(vendor)}
              onBack={() => setActiveScreen('home')}
              onCallVendor={handleCallVendor}
              onWhatsAppVendor={handleWhatsAppVendor}
            />
          </div>
        )}
      </main>

      {/* Floating Bottom Navigation for Mobile App Feel */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-xl px-2 sm:px-4 py-2 flex items-center justify-around sm:hidden">
        <button
          onClick={() => {
            setActiveScreen('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
            activeScreen === 'home' ? 'text-[#800020] font-bold' : 'text-gray-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>হোম</span>
        </button>

        <button
          onClick={() => {
            setActiveScreen('vendors');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
            activeScreen === 'vendors' ? 'text-[#800020] font-bold' : 'text-gray-500'
          }`}
        >
          <Search className="w-5 h-5" />
          <span>ভেন্ডার</span>
        </button>

        <button
          onClick={() => {
            setActiveScreen('subscription');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
            activeScreen === 'subscription' ? 'text-[#800020] font-bold' : 'text-gray-500'
          }`}
        >
          <Crown className="w-5 h-5 text-[#D4AF37]" />
          <span>প্ল্যান</span>
        </button>

        <button
          onClick={() => {
            setSelectedBundle(READY_EVENT_BUNDLES[0]);
          }}
          className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-gray-500 hover:text-[#800020]"
        >
          <Gift className="w-5 h-5 text-[#D4AF37]" />
          <span>প্যাকেজ</span>
        </button>

        <button
          onClick={() => {
            setActiveScreen('payments');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
            activeScreen === 'payments' ? 'text-[#800020] font-bold' : 'text-gray-500'
          }`}
        >
          <CreditCard className="w-5 h-5 text-[#800020]" />
          <span>পেমেন্ট</span>
        </button>

        <button
          onClick={() => setIsEmergencyOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-[#FF6F61]"
        >
          <div className="w-5 h-5 rounded-full bg-[#FF6F61] text-white flex items-center justify-center text-xs">
            <PhoneCall className="w-3 h-3 animate-pulse" />
          </div>
          <span>জরুরি সেবা</span>
        </button>
      </nav>

      {/* Modals */}
      <BundleDetailModal
        bundle={selectedBundle}
        onClose={() => setSelectedBundle(null)}
        onBookBundle={(bundle, details) => {
          setSelectedBundle(null);
          setCheckoutItem({
            id: bundle.id,
            title: bundle.titleBn,
            category: bundle.categoryId,
            price: bundle.priceEstimate,
            date: details.date,
            guests: details.guests,
            pinCode: selectedPin
          });
          setActiveScreen('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <VendorDetailModal
        vendor={selectedVendor}
        onClose={() => setSelectedVendor(null)}
        onCall={handleCallVendor}
        onWhatsApp={handleWhatsAppVendor}
        onBookAdvance={(vendor) => {
          setSelectedVendor(null);
          setCheckoutItem({
            id: `vendor_${vendor.id}`,
            title: `${vendor.businessNameBn} - অগ্রিম বুকিং ফি`,
            category: vendor.categoryTitleEn || vendor.categoryId,
            vendorName: vendor.businessNameBn,
            price: vendor.startingPrice,
            pinCode: selectedPin
          });
          setActiveScreen('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <EmergencySupportModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        selectedPin={selectedPin}
      />

      <ContactActionSheet
        vendor={contactVendor}
        mode={contactMode}
        onClose={() => {
          setContactVendor(null);
          setContactMode(null);
        }}
      />

      <VendorRegistrationModal
        isOpen={isVendorRegOpen}
        onClose={() => setIsVendorRegOpen(false)}
        onRegisterSuccess={(newVendor) => {
          setAllVendors(prev => [newVendor, ...prev]);
        }}
        onViewLiveProfile={(vendor) => {
          setSelectedVendor(vendor);
        }}
      />
    </div>
  </Router>
);
}

