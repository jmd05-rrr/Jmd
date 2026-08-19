'use client';

import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  Calculator,
  ShieldCheck,
  Award,
  Gem,
  ChevronDown,
  Check,
  Clock,
  ArrowRight,
  Send,
  Star,
  Search,
  Menu,
  X,
  Compass,
  Cpu,
  Scale,
  RefreshCw,
  Crown,
  HeartHandshake,
  MessageCircle,
  Percent,
} from 'lucide-react';

interface Product {
  id: string;
  title: string;
  category: 'bridal' | 'necklaces' | 'bangles' | 'rings' | 'silver';
  categoryLabel: string;
  badge: string;
  purity: string;
  weight: string;
  estimatedPrice: string;
  description: string;
  imageIcon: 'crown' | 'necklace' | 'bangle' | 'ring' | 'silver' | 'mangalsutra';
  tag: string;
}

const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-1',
    title: 'Royal Rajputana Kundan Choker Set',
    category: 'bridal',
    categoryLabel: 'Bridal Collection',
    badge: '916 Hallmark',
    purity: '22K (916 BIS)',
    weight: '48.50g',
    estimatedPrice: '₹3,56,800',
    description: 'Heirloom bridal choker with handcrafted meenakari and uncut gemstones.',
    imageIcon: 'crown',
    tag: 'Bridal Pick',
  },
  {
    id: 'prod-2',
    title: 'Temple Antique Lakshmi Haar',
    category: 'necklaces',
    categoryLabel: 'Necklaces & Haar',
    badge: 'Heritage Gold',
    purity: '22K Gold',
    weight: '36.20g',
    estimatedPrice: '₹2,66,400',
    description: 'Traditional temple carving depicting Goddess Lakshmi with ruby accents.',
    imageIcon: 'necklace',
    tag: 'Bestseller',
  },
  {
    id: 'prod-3',
    title: 'Meenakari Gold Filigree Kadas (Pair)',
    category: 'bangles',
    categoryLabel: 'Bangles & Kadas',
    badge: 'Best Seller',
    purity: '22K BIS',
    weight: '28.40g',
    estimatedPrice: '₹2,09,100',
    description: 'Intricate hand-engraved royal kadas with screw lock & ruby enamel work.',
    imageIcon: 'bangle',
    tag: 'Craftsman Choice',
  },
  {
    id: 'prod-4',
    title: 'Imperial Solitaire Diamond Band',
    category: 'rings',
    categoryLabel: 'Rings & Solitaires',
    badge: 'IGI Certified',
    purity: '18K Gold (0.75ct)',
    weight: '5.80g',
    estimatedPrice: '₹1,24,000',
    description: 'Brilliant round-cut VVS/EF certified diamond on a sculpted 18K band.',
    imageIcon: 'ring',
    tag: 'Certified Diamond',
  },
  {
    id: 'prod-5',
    title: 'Traditional Silver Bridal Payal Set',
    category: 'silver',
    categoryLabel: 'Pure Silver',
    badge: '999 Fine Silver',
    purity: '92.5 / 999 Purity',
    weight: '120.00g',
    estimatedPrice: '₹14,800',
    description: 'Heavy traditional bridal anklets with delicate hand-strung silver ghunghroos.',
    imageIcon: 'silver',
    tag: 'Festive Wear',
  },
  {
    id: 'prod-6',
    title: 'Contemporary 22K Gold Mangalsutra',
    category: 'necklaces',
    categoryLabel: 'Chains & Mangalsutra',
    badge: 'Daily Elegance',
    purity: '22K (916 BIS)',
    weight: '14.80g',
    estimatedPrice: '₹1,09,200',
    description: 'Modern lightweight diamond & black-bead mangalsutra for everyday luxury.',
    imageIcon: 'mangalsutra',
    tag: 'Modern Classic',
  },
  {
    id: 'prod-7',
    title: 'Kundan Floral Hathphool with Rings',
    category: 'bridal',
    categoryLabel: 'Bridal Collection',
    badge: 'Royal Vivah',
    purity: '22K Gold',
    weight: '32.10g',
    estimatedPrice: '₹2,36,500',
    description: 'Grand bridal wrist-to-finger ornament adorned with south sea pearls.',
    imageIcon: 'crown',
    tag: 'Bridal Set',
  },
  {
    id: 'prod-8',
    title: 'Royal Peacock Polki Jhumkas',
    category: 'necklaces',
    categoryLabel: 'Earrings & Jhumkas',
    badge: 'Handcrafted',
    purity: '22K BIS',
    weight: '22.60g',
    estimatedPrice: '₹1,66,500',
    description: 'Grand festive jhumkas with layered pearl drops and emerald highlights.',
    imageIcon: 'necklace',
    tag: 'Must Have',
  },
];

export default function JMDJewellersApp() {
  // Navigation & Modal State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live Rates State (per gram)
  const [rates] = useState({
    gold24k: 7450,
    gold22k: 6830,
    gold18k: 5590,
    silver: 89.5,
  });

  // Calculator State
  const [calcPurityRate, setCalcPurityRate] = useState<number>(6830);
  const [calcPurityLabel, setCalcPurityLabel] = useState<string>('22K Gold (916 BIS)');
  const [calcWeight, setCalcWeight] = useState<number>(10);
  const [calcMakingPercent, setCalcMakingPercent] = useState<number>(8);

  // Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openCare, setOpenCare] = useState<number | null>(0);

  // Bespoke Form State
  const [bespokeName, setBespokeName] = useState('');
  const [bespokePhone, setBespokePhone] = useState('');
  const [bespokeType, setBespokeType] = useState('22K Gold Bridal Set / Necklace');
  const [bespokeBudget, setBespokeBudget] = useState('');
  const [bespokeNotes, setBespokeNotes] = useState('');

  // Appointment Form State
  const [apptName, setApptName] = useState('');
  const [apptPhone, setApptPhone] = useState('');
  const [apptDate, setApptDate] = useState('');
  const [apptTime, setApptTime] = useState('11:00 AM - 01:00 PM');
  const [apptCategory, setApptCategory] = useState('Bridal Wedding Set');

  const customNameId = useId();
  const customPhoneId = useId();
  const customTypeId = useId();
  const customBudgetId = useId();
  const customNotesId = useId();
  const apptNameId = useId();
  const apptPhoneId = useId();
  const apptDateId = useId();
  const apptTimeId = useId();
  const apptCategoryId = useId();

  // Toast Trigger Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Calculator Calculations
  const rawMetalCost = calcPurityRate * calcWeight;
  const makingChargeAmount = rawMetalCost * (calcMakingPercent / 100);
  const subtotalBeforeGst = rawMetalCost + makingChargeAmount;
  const gstAmount = subtotalBeforeGst * 0.03; // 3% standard jewellery GST
  const grandTotal = Math.round(subtotalBeforeGst + gstAmount);

  // WhatsApp Estimator Action
  const handleLockRateWhatsApp = () => {
    const text = `*Gold Rate Lock & Price Estimation - JMD Jewellers*%0A------------------------------%0A*Selected Purity:* ${calcPurityLabel}%0A*Rate per Gram:* ₹${calcPurityRate.toLocaleString('en-IN')}%0A*Weight:* ${calcWeight} Grams%0A*Making Charges:* ${calcMakingPercent}%%0A*Base Metal Cost:* ₹${Math.round(rawMetalCost).toLocaleString('en-IN')}%0A*Making Charges:* ₹${Math.round(makingChargeAmount).toLocaleString('en-IN')}%0A*GST (3%):* ₹${Math.round(gstAmount).toLocaleString('en-IN')}%0A*Estimated Total:* ₹${grandTotal.toLocaleString('en-IN')}%0A------------------------------%0APlease confirm availability and lock this rate for my purchase.`;
    window.open(`https://wa.me/919569407857?text=${text}`, '_blank');
    showToast('Redirecting to WhatsApp with your personalized gold price estimation!');
  };

  // Bespoke Form Submit
  const handleBespokeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bespokeName.trim() || !bespokePhone.trim()) {
      showToast('Please enter your name and phone number.');
      return;
    }
    const text = `*New Custom Jewellery Design Request*%0A*Store:* JMD Jewellers, Mohripur, Gorakhpur%0A------------------------------%0A*Client Name:* ${bespokeName}%0A*Contact Phone:* ${bespokePhone}%0A*Ornament Category:* ${bespokeType}%0A*Budget/Weight Target:* ${bespokeBudget || 'Not specified'}%0A*Design Description & Notes:* ${bespokeNotes || 'Standard custom consultation'}%0A------------------------------%0APlease connect with me for 3D CAD modeling and live gold purity valuation.`;
    window.open(`https://wa.me/919569407857?text=${text}`, '_blank');
    showToast('Your custom design inquiry has been sent to our master jeweller!');
    setBespokeNotes('');
  };

  // Appointment Form Submit
  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apptName.trim() || !apptPhone.trim() || !apptDate) {
      showToast('Please fill in your name, contact phone, and preferred date.');
      return;
    }
    const text = `*Store Visit & Bridal Consultation Booking*%0A*Showroom:* JMD Jewellers, Mohripur, Gorakhpur%0A------------------------------%0A*Client Name:* ${apptName}%0A*Phone Number:* ${apptPhone}%0A*Preferred Date:* ${apptDate}%0A*Time Slot:* ${apptTime}%0A*Requirement / Category:* ${apptCategory}%0A------------------------------%0APlease reserve a dedicated jewelry specialist and VIP viewing desk for my visit.`;
    window.open(`https://wa.me/919569407857?text=${text}`, '_blank');
    setIsAppointmentModalOpen(false);
    showToast('Your visit request is booked! We look forward to welcoming you.');
  };

  // Filtered Products
  const filteredProducts = PRODUCTS_DATA.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.purity.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="jmd-app-root" className="min-h-screen bg-[#0d0b0a] text-stone-100 flex flex-col font-sans relative">
      {/* =========================================================================
          1. TOP BAR / LIVE RATES TICKER
          ========================================================================= */}
      <div id="top-rate-bar" className="bg-[#070605] border-b border-[#d4af37]/20 text-xs py-2 text-stone-400 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
          {/* Live Rates Ticker */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-0.5">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live Rates
            </span>

            <div className="inline-flex items-center gap-1 bg-[#1a1614] px-2.5 py-1 rounded-full border border-[#d4af37]/25 shrink-0">
              <span className="text-stone-400">24K Gold:</span>
              <strong className="text-[#f7e7a9]">₹{rates.gold24k.toLocaleString('en-IN')}/g</strong>
            </div>

            <div className="inline-flex items-center gap-1 bg-[#1a1614] px-2.5 py-1 rounded-full border border-[#d4af37]/40 shrink-0">
              <span className="text-[#d4af37]">22K (916 BIS):</span>
              <strong className="text-[#f7e7a9]">₹{rates.gold22k.toLocaleString('en-IN')}/g</strong>
            </div>

            <div className="inline-flex items-center gap-1 bg-[#1a1614] px-2.5 py-1 rounded-full border border-[#d4af37]/20 shrink-0 hidden md:inline-flex">
              <span className="text-stone-400">18K Gold:</span>
              <strong className="text-[#f7e7a9]">₹{rates.gold18k.toLocaleString('en-IN')}/g</strong>
            </div>

            <div className="inline-flex items-center gap-1 bg-[#1a1614] px-2.5 py-1 rounded-full border border-stone-700 shrink-0">
              <span className="text-stone-400">Fine Silver:</span>
              <strong className="text-stone-200">₹{rates.silver}/g</strong>
            </div>
          </div>

          {/* Quick Contact & Store Location */}
          <div className="flex items-center gap-4 text-[12px] ml-auto shrink-0">
            <a
              id="top-call-link"
              href="tel:9569407857"
              className="flex items-center gap-1.5 text-stone-300 hover:text-[#d4af37] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="font-semibold tracking-wide">9569407857</span>
            </a>
            <a
              id="top-location-link"
              href="#location"
              className="flex items-center gap-1 text-stone-400 hover:text-[#f7e7a9] transition-colors hidden sm:flex"
            >
              <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Mohripur, Gorakhpur</span>
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. MAIN HEADER & LUXURY NAVIGATION
          ========================================================================= */}
      <header
        id="main-navigation-header"
        className="sticky top-[37px] z-30 bg-[#0d0b0a]/95 backdrop-blur-md border-b border-[#d4af37]/25 transition-all"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          {/* Brand Logo */}
          <a id="brand-logo-link" href="#home" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full border-2 border-[#d4af37] bg-gradient-to-br from-[#2a2016] to-[#0d0b0a] flex items-center justify-center font-display font-bold text-[#f7e7a9] text-lg shadow-[0_0_15px_rgba(212,175,55,0.35)] group-hover:scale-105 transition-transform">
              JMD
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-[0.15em] text-white block leading-tight">
                JMD JEWELLERS
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold block">
                Mohripur • Gorakhpur
              </span>
            </div>
          </a>

          {/* Desktop Nav Menu */}
          <nav className="hidden lg:flex items-center gap-7">
            <a href="#home" className="text-xs uppercase tracking-widest text-stone-300 hover:text-[#f7e7a9] transition-colors font-medium">
              Home
            </a>
            <a href="#rates" className="text-xs uppercase tracking-widest text-stone-300 hover:text-[#f7e7a9] transition-colors font-medium">
              Gold Rates
            </a>
            <a href="#collections" className="text-xs uppercase tracking-widest text-stone-300 hover:text-[#f7e7a9] transition-colors font-medium">
              Collections
            </a>
            <a href="#bespoke" className="text-xs uppercase tracking-widest text-stone-300 hover:text-[#f7e7a9] transition-colors font-medium">
              Custom Studio
            </a>
            <a href="#bridal" className="text-xs uppercase tracking-widest text-stone-300 hover:text-[#f7e7a9] transition-colors font-medium">
              Bridal Lounge
            </a>
            <a href="#trust" className="text-xs uppercase tracking-widest text-stone-300 hover:text-[#f7e7a9] transition-colors font-medium">
              Why Us
            </a>
            <a href="#location" className="text-xs uppercase tracking-widest text-stone-300 hover:text-[#f7e7a9] transition-colors font-medium">
              Store
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              id="header-book-visit-btn"
              onClick={() => setIsAppointmentModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 border border-[#d4af37]/60 bg-[#d4af37]/10 hover:bg-[#d4af37] text-[#f7e7a9] hover:text-black font-semibold text-xs uppercase tracking-wider px-3.5 py-2 rounded transition-all duration-300 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Visit</span>
            </button>

            <a
              id="header-whatsapp-btn"
              href="https://wa.me/919569407857?text=Hello%20JMD%20Jewellers,%20I%20would%20like%20to%20inquire%20about%20your%20gold%20and%20bridal%20jewellery."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs tracking-wider uppercase px-3.5 py-2 rounded shadow-md hover:shadow-lg transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded border border-[#d4af37]/40 text-[#f7e7a9] hover:bg-[#d4af37]/10 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#110e0c] border-b border-[#d4af37]/30 px-6 py-5 flex flex-col gap-4 text-sm uppercase tracking-wider overflow-hidden"
            >
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-stone-200 hover:text-[#d4af37] border-b border-stone-800"
              >
                Home
              </a>
              <a
                href="#rates"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-stone-200 hover:text-[#d4af37] border-b border-stone-800"
              >
                Gold Rates & Calculator
              </a>
              <a
                href="#collections"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-stone-200 hover:text-[#d4af37] border-b border-stone-800"
              >
                Jewellery Collections
              </a>
              <a
                href="#bespoke"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-stone-200 hover:text-[#d4af37] border-b border-stone-800"
              >
                Custom Design Studio
              </a>
              <a
                href="#bridal"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-stone-200 hover:text-[#d4af37] border-b border-stone-800"
              >
                Bridal Lounge
              </a>
              <a
                href="#trust"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-stone-200 hover:text-[#d4af37] border-b border-stone-800"
              >
                The JMD Promise
              </a>
              <a
                href="#location"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-stone-200 hover:text-[#d4af37]"
              >
                Showroom Location
              </a>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAppointmentModalOpen(true);
                  }}
                  className="w-full bg-[#d4af37] text-black font-bold py-2.5 rounded text-center text-xs tracking-widest uppercase"
                >
                  Book Store Consultation
                </button>
                <a
                  href="tel:9569407857"
                  className="w-full border border-stone-700 text-stone-200 hover:border-[#d4af37] py-2.5 rounded text-center text-xs tracking-widest uppercase flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  Call: 9569407857
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =========================================================================
          3. HERO SECTION
          ========================================================================= */}
      <section
        id="home"
        className="relative min-h-[85vh] flex items-center py-16 lg:py-24 border-b border-[#d4af37]/25 overflow-hidden bg-radial from-[#381017]/35 via-[#0d0b0a] to-[#0a0808]"
      >
        {/* Subtle decorative background light */}
        <div className="absolute -top-24 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#7a1c28]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div
                id="hero-badge-cert"
                className="inline-flex items-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/60 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-[#f7e7a9] mb-6 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>100% BIS Hallmarked • Certified Gold</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] text-white mb-6">
                Gorakhpur’s Sacred Heritage in{' '}
                <span className="gold-gradient-text">Pure Gold & Solitaires</span>
              </h1>

              <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-sans font-normal">
                Experience regal craftsmanship, certified 916 hallmarked purity, and transparent pricing at Mohripur, Gorakhpur. Specializing in bespoke bridal sets, heirloom antique gold, and certified diamonds.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
                <a
                  id="hero-explore-btn"
                  href="#collections"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] text-[#110d06] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded shadow-[0_6px_20px_rgba(191,149,63,0.35)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.5)] hover:-translate-y-0.5 transition-all"
                >
                  <Gem className="w-4 h-4" />
                  <span>Explore Collections</span>
                </a>

                <a
                  id="hero-calc-btn"
                  href="#rates"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 border border-[#d4af37]/60 bg-[#d4af37]/5 hover:bg-[#d4af37] text-[#f7e7a9] hover:text-black font-semibold text-xs uppercase tracking-wider px-5 py-3.5 rounded transition-all"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Price Calculator</span>
                </a>

                <a
                  id="hero-call-btn"
                  href="tel:9569407857"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#7a1c28] to-[#4a0d15] hover:brightness-110 text-white font-semibold text-xs uppercase tracking-wider px-5 py-3.5 rounded border border-white/20 transition-all shadow-md"
                >
                  <Phone className="w-4 h-4 text-[#f7e7a9]" />
                  <span>Call 9569407857</span>
                </a>
              </div>

              {/* Trust Metric Counters */}
              <div className="w-full grid grid-cols-3 gap-4 pt-6 border-t border-[#d4af37]/20">
                <div>
                  <span className="font-display text-xl sm:text-2xl font-bold text-[#f7e7a9] block">
                    916 / 22K
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-stone-400">
                    BIS Laser Hallmark
                  </span>
                </div>
                <div>
                  <span className="font-display text-xl sm:text-2xl font-bold text-[#f7e7a9] block">
                    100%
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-stone-400">
                    Live Karatmeter Test
                  </span>
                </div>
                <div>
                  <span className="font-display text-xl sm:text-2xl font-bold text-[#f7e7a9] block">
                    Lifetime
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-stone-400">
                    Exchange & Buyback
                  </span>
                </div>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative border border-[#d4af37]/50 rounded-2xl p-4 bg-gradient-to-br from-[#1f1a17] to-[#120f0e] shadow-[0_0_30px_rgba(212,175,55,0.25)]">
                {/* Hero Showcase Display */}
                <div className="h-[380px] sm:h-[430px] rounded-xl bg-gradient-to-b from-[#3a151e] via-[#1f1614] to-[#120f0e] border border-[#d4af37]/30 flex flex-col items-center justify-center text-center p-6 relative overflow-hidden group">
                  {/* Decorative ambient ring */}
                  <div className="w-52 h-52 rounded-full border border-[#d4af37]/20 absolute animate-pulse pointer-events-none" />

                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#7a1c28]/30 border border-[#d4af37] flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform">
                    <Crown className="w-12 h-12 text-[#f7e7a9]" />
                  </div>

                  <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-2">
                    Heritage Bridal Series
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                    The Royal Vivah Collection
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-300 max-w-xs leading-relaxed mb-6">
                    Handcrafted antique chokers, jadau bridal sets, and temple gold jewellery.
                  </p>

                  <button
                    onClick={() => setIsAppointmentModalOpen(true)}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#f7e7a9] font-bold border-b border-[#d4af37] pb-1 hover:text-white transition-colors"
                  >
                    <span>Request VIP Bridal Preview</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Floating Japanese Karatmeter Badge */}
                <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-[#0d0b0a]/95 border border-[#d4af37] p-3.5 rounded-xl backdrop-blur-md flex items-center gap-3 shadow-2xl">
                  <div className="w-10 h-10 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div>
                    <strong className="text-white text-xs block font-display tracking-wide">
                      Japanese Karatmeter
                    </strong>
                    <span className="text-stone-400 text-[11px] block">
                      Instant In-Store Purity Testing (0% Loss)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. LIVE RATES & INTERACTIVE CALCULATOR
          ========================================================================= */}
      <section id="rates" className="py-20 bg-[#0f0d0b] border-b border-[#d4af37]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37] mb-3">
              <span className="w-6 h-[1px] bg-[#d4af37]" />
              <span>Transparent Daily Pricing</span>
              <span className="w-6 h-[1px] bg-[#d4af37]" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Today&apos;s <span className="gold-gradient-text">Live Metal Rates</span>
            </h2>
            <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
              Real-time benchmark gold and silver rates for the Gorakhpur market. 100% transparent pricing with zero hidden markups.
            </p>
          </div>

          {/* 4 Rate Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {/* Card 1: 24K */}
            <div className="bg-[#151210] border border-[#d4af37]/25 rounded-xl p-6 text-center hover:border-[#d4af37] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group shadow-md">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#bf953f] to-[#aa771c]" />
              <span className="text-[11px] uppercase tracking-widest text-stone-400 block mb-2 font-medium">
                99.9% Pure Metal
              </span>
              <h3 className="font-display text-lg font-bold text-white mb-2">24K Fine Gold</h3>
              <div className="text-2xl sm:text-3xl font-bold text-[#f7e7a9] mb-1 font-sans">
                ₹{rates.gold24k.toLocaleString('en-IN')}
              </div>
              <span className="text-xs text-stone-400 block">Per 1 Gram (Excl. GST)</span>
              <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-emerald-400 font-medium">
                Bullion & Sovereign Coins
              </div>
            </div>

            {/* Card 2: 22K Standard */}
            <div className="bg-[#181310] border-2 border-[#d4af37] rounded-xl p-6 text-center hover:-translate-y-1 transition-all duration-300 relative overflow-hidden shadow-[0_0_25px_rgba(212,175,55,0.2)]">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c]" />
              <div className="inline-block bg-[#d4af37] text-black text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider mb-2">
                Most Popular
              </div>
              <span className="text-[11px] uppercase tracking-widest text-[#f7e7a9] block mb-1 font-semibold">
                91.6% BIS Hallmark
              </span>
              <h3 className="font-display text-lg font-bold text-white mb-2">22K Standard Gold</h3>
              <div className="text-2xl sm:text-3xl font-bold text-[#f7e7a9] mb-1 font-sans">
                ₹{rates.gold22k.toLocaleString('en-IN')}
              </div>
              <span className="text-xs text-stone-400 block">Per 1 Gram (Standard Jewellery)</span>
              <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-[#d4af37] font-semibold">
                Ideal for Bridal Sets & Chains
              </div>
            </div>

            {/* Card 3: 18K Diamond Gold */}
            <div className="bg-[#151210] border border-[#d4af37]/25 rounded-xl p-6 text-center hover:border-[#d4af37] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group shadow-md">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#bf953f] to-[#aa771c]" />
              <span className="text-[11px] uppercase tracking-widest text-stone-400 block mb-2 font-medium">
                75.0% Hallmarked
              </span>
              <h3 className="font-display text-lg font-bold text-white mb-2">18K Diamond Gold</h3>
              <div className="text-2xl sm:text-3xl font-bold text-[#f7e7a9] mb-1 font-sans">
                ₹{rates.gold18k.toLocaleString('en-IN')}
              </div>
              <span className="text-xs text-stone-400 block">Per 1 Gram (Studded Ornaments)</span>
              <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-stone-400 font-medium">
                Solitaires & Contemporary Bands
              </div>
            </div>

            {/* Card 4: Fine Silver */}
            <div className="bg-[#151210] border border-[#d4af37]/25 rounded-xl p-6 text-center hover:border-[#d4af37] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group shadow-md">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-stone-400 to-stone-600" />
              <span className="text-[11px] uppercase tracking-widest text-stone-400 block mb-2 font-medium">
                99.9% Pure Silver
              </span>
              <h3 className="font-display text-lg font-bold text-white mb-2">Fine Silver</h3>
              <div className="text-2xl sm:text-3xl font-bold text-stone-200 mb-1 font-sans">
                ₹{rates.silver}
              </div>
              <span className="text-xs text-stone-400 block">Per 1 Gram (₹89,500/kg)</span>
              <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-stone-400 font-medium">
                Payals, Utensils & Coins
              </div>
            </div>
          </div>

          {/* Interactive Calculator Wrapper */}
          <div
            id="calculator"
            className="bg-gradient-to-br from-[#191512] to-[#100d0b] border border-[#d4af37]/50 rounded-2xl p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#f7e7a9]">
                  Smart Gold Price & Making Charge Estimator
                </h3>
                <p className="text-xs text-stone-400">
                  Instant calculation with live 3% GST and transparent making breakdown.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Controls Column */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Purity Select */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="calcPuritySelect" className="text-xs uppercase tracking-wider text-stone-300 font-semibold">
                    Select Metal / Purity
                  </label>
                  <select
                    id="calcPuritySelect"
                    aria-label="Select Metal or Purity"
                    value={calcPurityRate}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setCalcPurityRate(val);
                      if (val === 6830) setCalcPurityLabel('22K Gold (916 BIS)');
                      else if (val === 7450) setCalcPurityLabel('24K Pure Gold');
                      else if (val === 5590) setCalcPurityLabel('18K Diamond Gold');
                      else if (val === 89.5) setCalcPurityLabel('Fine Silver (999)');
                    }}
                    className="bg-[#0d0b0a] border border-[#d4af37]/40 focus:border-[#d4af37] text-white p-3 rounded-lg text-sm outline-none transition-all cursor-pointer"
                  >
                    <option value={6830}>22K Gold (916 BIS Hallmark) - ₹6,830/g</option>
                    <option value={7450}>24K Pure Gold - ₹7,450/g</option>
                    <option value={5590}>18K Diamond Gold - ₹5,590/g</option>
                    <option value={89.5}>Fine Silver (999) - ₹89.50/g</option>
                  </select>
                </div>

                {/* Weight Input with Quick Chips */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="calcWeightInput" className="text-xs uppercase tracking-wider text-stone-300 font-semibold">
                      Weight (in Grams)
                    </label>
                    <div className="flex gap-1.5">
                      {[5, 10, 20, 50].map((w) => (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setCalcWeight(w)}
                          className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                            calcWeight === w
                              ? 'bg-[#d4af37] text-black border-[#d4af37] font-bold'
                              : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-[#d4af37]'
                          }`}
                        >
                          {w}g
                        </button>
                      ))}
                    </div>
                  </div>
                  <input
                    id="calcWeightInput"
                    aria-label="Weight in Grams"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(parseFloat(e.target.value) || 0)}
                    className="bg-[#0d0b0a] border border-[#d4af37]/40 focus:border-[#d4af37] text-white p-3 rounded-lg text-sm outline-none transition-all"
                  />
                </div>

                {/* Making Charges Slider & Input */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="calcMakingInput" className="text-xs uppercase tracking-wider text-stone-300 font-semibold">
                      Making Charges (%)
                    </label>
                    <span className="text-xs font-bold text-[#d4af37]">{calcMakingPercent}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      id="calcMakingSlider"
                      aria-label="Making Charges Slider"
                      type="range"
                      min="0"
                      max="25"
                      step="1"
                      value={calcMakingPercent}
                      onChange={(e) => setCalcMakingPercent(parseInt(e.target.value) || 0)}
                      className="flex-1 accent-[#d4af37] cursor-pointer"
                    />
                    <input
                      id="calcMakingInput"
                      aria-label="Making Charges Percentage"
                      type="number"
                      min="0"
                      max="30"
                      value={calcMakingPercent}
                      onChange={(e) => setCalcMakingPercent(parseFloat(e.target.value) || 0)}
                      className="w-16 bg-[#0d0b0a] border border-[#d4af37]/40 text-center p-2 rounded text-xs text-white"
                    />
                  </div>
                </div>

                {/* Applicable GST */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="calcGstDisplay" className="text-xs uppercase tracking-wider text-stone-300 font-semibold">
                    Applicable GST
                  </label>
                  <div className="bg-[#0d0b0a]/60 border border-stone-800 text-stone-400 p-3 rounded-lg text-sm flex items-center justify-between">
                    <span id="calcGstDisplay">3% Standard Government Tax</span>
                    <Percent className="w-4 h-4 text-stone-500" />
                  </div>
                </div>
              </div>

              {/* Result Column */}
              <div className="lg:col-span-5 bg-[#090706] border-2 border-dashed border-[#d4af37] rounded-xl p-6 text-center flex flex-col justify-center">
                <span className="text-xs uppercase tracking-[0.2em] text-stone-400 block mb-2 font-medium">
                  Estimated Total Price (Incl. 3% GST)
                </span>
                <div id="calculator-grand-total" className="font-display text-3xl sm:text-4xl font-bold text-[#f7e7a9] mb-3">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </div>

                {/* Breakdown details */}
                <div className="bg-[#151210] rounded-lg p-3 text-xs text-stone-300 mb-5 text-left space-y-1.5 border border-stone-800">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Base Metal Cost:</span>
                    <strong className="text-white">₹{Math.round(rawMetalCost).toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Making ({calcMakingPercent}%):</span>
                    <strong className="text-white">₹{Math.round(makingChargeAmount).toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">GST (3%):</span>
                    <strong className="text-white">₹{Math.round(gstAmount).toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <button
                  id="calc-lock-rate-btn"
                  type="button"
                  onClick={handleLockRateWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] text-black font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Lock Rate on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. FESTIVE SPECIAL OFFERS BANNER
          ========================================================================= */}
      <section
        id="festive-offer"
        className="py-14 bg-gradient-to-r from-[#7a1c28] via-[#5c131d] to-[#4a0d15] border-y border-[#d4af37] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#d4af37] text-black font-extrabold text-[11px] uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-3 shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Shubh Vivah & Festive Season Offer</span>
            </div>
            <h3 className="font-display text-2xl sm:text-4xl font-bold text-white mb-2 leading-tight">
              Flat 25% Off on Gold Making Charges
            </h3>
            <p className="text-rose-100/90 text-sm sm:text-base leading-relaxed">
              Plan your wedding jewellery with Gorakhpur’s most trusted jeweller. Enjoy special maker discounts, 0% making on selected diamond solitaires, and instant karatmeter verification.
            </p>
          </div>

          <div className="shrink-0">
            <a
              id="claim-festive-offer-btn"
              href="https://wa.me/919569407857?text=Hello%20JMD%20Jewellers,%20I%20want%20to%20claim%20the%20Festive%20Making%20Charge%20Discount%20for%20my%20purchase!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] text-black font-bold text-xs uppercase tracking-widest px-7 py-4 rounded shadow-[0_6px_20px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform"
            >
              <Sparkles className="w-4 h-4" />
              <span>Claim Festive Offer</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. COLLECTIONS & PRODUCT SHOWCASE
          ========================================================================= */}
      <section id="collections" className="py-24 bg-[#0d0b0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37] mb-3">
              <span className="w-6 h-[1px] bg-[#d4af37]" />
              <span>Exquisite Handcrafted Creations</span>
              <span className="w-6 h-[1px] bg-[#d4af37]" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Signature <span className="gold-gradient-text">Jewellery Showcase</span>
            </h2>
            <p className="text-stone-400 text-sm sm:text-base">
              From heirloom bridal masterpieces to everyday 22K gold accents and certified diamond solitaires.
            </p>
          </div>

          {/* Filter Bar & Search Input */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { key: 'all', label: 'All Ornaments' },
                { key: 'bridal', label: 'Bridal Sets' },
                { key: 'necklaces', label: 'Necklaces & Chokers' },
                { key: 'bangles', label: 'Bangles & Kadas' },
                { key: 'rings', label: 'Rings & Solitaires' },
                { key: 'silver', label: 'Pure Silver' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  id={`filter-tab-${tab.key}`}
                  onClick={() => setActiveCategory(tab.key)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeCategory === tab.key
                      ? 'bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] text-black shadow-[0_4px_15px_rgba(212,175,55,0.4)]'
                      : 'bg-transparent border border-[#d4af37]/30 text-stone-300 hover:border-[#d4af37] hover:text-[#f7e7a9]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quick Search Field */}
            <div className="relative w-full md:w-64">
              <input
                id="search-products-input"
                type="text"
                placeholder="Search jewellery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#151210] border border-[#d4af37]/30 focus:border-[#d4af37] text-white text-xs pl-9 pr-4 py-2 rounded-full outline-none"
              />
              <Search className="w-3.5 h-3.5 text-[#d4af37] absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2 text-stone-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div id="products-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#151210] border border-[#d4af37]/30 rounded-xl overflow-hidden hover:border-[#d4af37] hover:-translate-y-1.5 transition-all duration-300 flex flex-col group shadow-lg"
              >
                {/* Visual Image Showcase Box */}
                <div className="h-56 bg-gradient-to-b from-[#2a221c] via-[#1a1411] to-[#120f0e] flex flex-col items-center justify-center p-6 relative border-b border-[#d4af37]/20 group-hover:brightness-110 transition-all">
                  <span className="absolute top-3 left-3 bg-[#0d0b0a]/90 border border-[#d4af37] text-[#f7e7a9] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    {product.badge}
                  </span>

                  <span className="absolute top-3 right-3 text-[10px] font-semibold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/30">
                    {product.tag}
                  </span>

                  {/* Representative Luxury Jewellery Graphic */}
                  <div className="w-20 h-20 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    {product.imageIcon === 'crown' && <Crown className="w-10 h-10" />}
                    {product.imageIcon === 'necklace' && <Gem className="w-10 h-10" />}
                    {product.imageIcon === 'bangle' && <Compass className="w-10 h-10" />}
                    {product.imageIcon === 'ring' && <Sparkles className="w-10 h-10" />}
                    {product.imageIcon === 'silver' && <Scale className="w-10 h-10" />}
                    {product.imageIcon === 'mangalsutra' && <ShieldCheck className="w-10 h-10" />}
                  </div>

                  <span className="text-[11px] text-stone-400 mt-3 font-sans">
                    Ref Code: JMD-{product.id.toUpperCase()}
                  </span>
                </div>

                {/* Product Info Body */}
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-1">
                    {product.categoryLabel}
                  </span>
                  <h4 className="font-display text-base font-bold text-white mb-2 line-clamp-1 group-hover:text-[#f7e7a9] transition-colors">
                    {product.title}
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed line-clamp-2 mb-4">
                    {product.description}
                  </p>

                  <div className="mt-auto pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs mb-4">
                    <div>
                      <span className="text-stone-400 text-[11px] block">Purity</span>
                      <strong className="text-[#f7e7a9] font-medium">{product.purity}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-stone-400 text-[11px] block">Weight</span>
                      <strong className="text-white font-medium">{product.weight}</strong>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`https://wa.me/919569407857?text=Hello%20JMD%20Jewellers,%20I%20am%20inquiring%20about%20${encodeURIComponent(
                        product.title
                      )}%20(Purity:%20${encodeURIComponent(product.purity)},%20Weight:%20${encodeURIComponent(
                        product.weight
                      )}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] font-bold uppercase tracking-wider py-2 rounded transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Inquire</span>
                    </a>
                    <button
                      onClick={() => {
                        setApptCategory(product.title);
                        setIsAppointmentModalOpen(true);
                      }}
                      className="inline-flex items-center justify-center gap-1 border border-[#d4af37]/40 hover:bg-[#d4af37] text-stone-300 hover:text-black text-[11px] font-semibold uppercase tracking-wider py-2 rounded transition-all"
                    >
                      <span>Try in Store</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-[#151210] rounded-xl border border-stone-800">
              <Search className="w-8 h-8 text-stone-500 mx-auto mb-3" />
              <h4 className="font-display text-lg font-bold text-white mb-1">No Ornaments Found</h4>
              <p className="text-xs text-stone-400 mb-4">
                We could not find any jewelry matching &quot;{searchQuery}&quot;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="text-xs text-[#d4af37] underline font-semibold"
              >
                Clear Search and Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          7. BESPOKE CUSTOM DESIGN STUDIO
          ========================================================================= */}
      <section id="bespoke" className="py-24 bg-[#080706] border-y border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Steps */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom Craftsmanship</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                Bespoke <span className="gold-gradient-text">Jewellery Studio</span>
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8">
                Have a dream design or Pinterest inspiration? Share your concept with our master craftsmen in Mohripur, Gorakhpur. We bring your vision to life with precision 3D CAD modeling and guaranteed hallmarked gold.
              </p>

              {/* 3 Step List */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full border border-[#d4af37] bg-[#d4af37]/10 text-[#f7e7a9] flex items-center justify-center font-display font-bold text-sm shrink-0">
                    01
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-white mb-1">
                      Share Your Concept or Sketch
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                      Upload a photo or explain your desired weight, metal, and gemstone preference.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full border border-[#d4af37] bg-[#d4af37]/10 text-[#f7e7a9] flex items-center justify-center font-display font-bold text-sm shrink-0">
                    02
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-white mb-1">
                      3D CAD Design & Purity Validation
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                      Preview accurate 3D renders with exact gram weight and live pricing breakdown before casting.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full border border-[#d4af37] bg-[#d4af37]/10 text-[#f7e7a9] flex items-center justify-center font-display font-bold text-sm shrink-0">
                    03
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-white mb-1">
                      Master Handcrafting & Hallmarking
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                      Artisanal manufacturing followed by government BIS laser hallmarking & certification.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Bespoke Form Card */}
            <div className="lg:col-span-6">
              <div className="bg-[#151210] border border-[#d4af37]/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_35px_rgba(212,175,55,0.2)]">
                <h3 className="font-display text-xl font-bold text-[#f7e7a9] mb-1 flex items-center gap-2">
                  <Gem className="w-5 h-5 text-[#d4af37]" />
                  <span>Request Custom Jewelry Quote</span>
                </h3>
                <p className="text-xs text-stone-400 mb-6">
                  Direct connection with master jewellers in Gorakhpur.
                </p>

                <form onSubmit={handleBespokeSubmit} className="space-y-4">
                  <div>
                    <label htmlFor={customNameId} className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      id={customNameId}
                      type="text"
                      placeholder="e.g. Ritik Verma"
                      required
                      value={bespokeName}
                      onChange={(e) => setBespokeName(e.target.value)}
                      className="w-full bg-[#0d0b0a] border border-[#d4af37]/30 focus:border-[#d4af37] text-white px-3.5 py-2.5 rounded-lg text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor={customPhoneId} className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                      Contact Phone / WhatsApp Number
                    </label>
                    <input
                      id={customPhoneId}
                      type="tel"
                      placeholder="e.g. 9569407857"
                      required
                      value={bespokePhone}
                      onChange={(e) => setBespokePhone(e.target.value)}
                      className="w-full bg-[#0d0b0a] border border-[#d4af37]/30 focus:border-[#d4af37] text-white px-3.5 py-2.5 rounded-lg text-sm outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={customTypeId} className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                        Jewellery Type
                      </label>
                      <select
                        id={customTypeId}
                        value={bespokeType}
                        onChange={(e) => setBespokeType(e.target.value)}
                        className="w-full bg-[#0d0b0a] border border-[#d4af37]/30 focus:border-[#d4af37] text-white px-3 py-2.5 rounded-lg text-xs outline-none"
                      >
                        <option>22K Gold Bridal Set / Necklace</option>
                        <option>22K Gold Bangles / Kadas</option>
                        <option>18K Diamond Engagement Ring</option>
                        <option>22K Gold Heavy Men&apos;s Chain</option>
                        <option>Pure Silver Antique Ornaments</option>
                        <option>Custom Coin / Religious Artifact</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor={customBudgetId} className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                        Budget / Weight Target
                      </label>
                      <input
                        id={customBudgetId}
                        type="text"
                        placeholder="e.g. 20g or ₹1.5 Lakhs"
                        value={bespokeBudget}
                        onChange={(e) => setBespokeBudget(e.target.value)}
                        className="w-full bg-[#0d0b0a] border border-[#d4af37]/30 focus:border-[#d4af37] text-white px-3.5 py-2.5 rounded-lg text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={customNotesId} className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                      Design Notes & Style Preferences
                    </label>
                    <textarea
                      id={customNotesId}
                      rows={3}
                      placeholder="Describe the style, engravings, gemstone choices, or reference details..."
                      value={bespokeNotes}
                      onChange={(e) => setBespokeNotes(e.target.value)}
                      className="w-full bg-[#0d0b0a] border border-[#d4af37]/30 focus:border-[#d4af37] text-white px-3.5 py-2 rounded-lg text-sm outline-none resize-none"
                    />
                  </div>

                  <button
                    id="bespoke-submit-btn"
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] text-black font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-lg shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Custom Request to 9569407857</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. TRUST PILLARS & THE JMD PROMISE
          ========================================================================= */}
      <section id="trust" className="py-24 bg-[#0d0b0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37] mb-3">
              <span className="w-6 h-[1px] bg-[#d4af37]" />
              <span>Purity • Trust • Transparency</span>
              <span className="w-6 h-[1px] bg-[#d4af37]" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              The <span className="gold-gradient-text">JMD Jewellers Promise</span>
            </h2>
            <p className="text-stone-400 text-sm sm:text-base">
              Why families across Gorakhpur and Purvanchal trust us for their precious milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="bg-gradient-to-br from-[#161311] to-[#100d0c] border border-[#d4af37]/30 rounded-xl p-7 text-center hover:border-[#d4af37] hover:-translate-y-1.5 transition-all duration-300 shadow-md">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37] flex items-center justify-center text-[#f7e7a9] mx-auto mb-5 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">100% BIS Hallmarked</h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Every ornament is stamped with a 6-digit laser HUID code for authentic 22K (916) and 18K purity verification.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-gradient-to-br from-[#161311] to-[#100d0c] border border-[#d4af37]/30 rounded-xl p-7 text-center hover:border-[#d4af37] hover:-translate-y-1.5 transition-all duration-300 shadow-md">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37] flex items-center justify-center text-[#f7e7a9] mx-auto mb-5 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
                <Cpu className="w-8 h-8" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">Japanese Karatmeter</h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Test your old gold or new purchases on our computerized XRF Karatmeter with zero metal loss in under 60 seconds.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-gradient-to-br from-[#161311] to-[#100d0c] border border-[#d4af37]/30 rounded-xl p-7 text-center hover:border-[#d4af37] hover:-translate-y-1.5 transition-all duration-300 shadow-md">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37] flex items-center justify-center text-[#f7e7a9] mx-auto mb-5 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
                <Scale className="w-8 h-8" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">Honest Making Charges</h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Complete itemized billing with competitive making charges and no hidden weight deductions or wastage charges.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-gradient-to-br from-[#161311] to-[#100d0c] border border-[#d4af37]/30 rounded-xl p-7 text-center hover:border-[#d4af37] hover:-translate-y-1.5 transition-all duration-300 shadow-md">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37] flex items-center justify-center text-[#f7e7a9] mx-auto mb-5 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
                <RefreshCw className="w-8 h-8" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">Guaranteed Buyback</h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                100% exchange and buyback assurance based on prevailing daily gold rates across all our ornaments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. BRIDAL LOUNGE & VIP CONSULTATION
          ========================================================================= */}
      <section
        id="bridal"
        className="py-24 bg-radial from-[#2e0e15] via-[#0d0b0a] to-[#070606] border-y border-[#d4af37]/30 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#120e0d]/90 border border-[#d4af37]/70 rounded-2xl p-8 sm:p-12 shadow-[0_15px_50px_rgba(0,0,0,0.7)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37] mb-3">
                  <Crown className="w-3.5 h-3.5" />
                  <span>Exclusive Bridal Lounge</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                  Book a Private <span className="gold-gradient-text">Bridal Styling Session</span>
                </h2>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  Planning for your wedding? Book a dedicated one-on-one bridal styling appointment at our Mohripur showroom. Preview full bridal sets matched to your wedding lehenga with complete budget planning.
                </p>

                <ul className="space-y-3 mb-8 text-sm text-stone-200">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>Private VIP viewing lounge with family hospitality</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>Personalized trousseau & wedding budget curation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>Complimentary live gold purity verification on Japanese Karatmeter</span>
                  </li>
                </ul>

                <button
                  id="bridal-book-session-btn"
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] text-black font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Bridal Consultation</span>
                </button>
              </div>

              {/* Right Column: Quick Call Box */}
              <div className="lg:col-span-5 bg-[#0d0b0a] border border-[#d4af37]/40 rounded-xl p-6 sm:p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/15 border border-[#d4af37] flex items-center justify-center text-[#d4af37] mx-auto mb-4">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">Direct Wedding Helpline</h3>
                <p className="text-xs text-stone-400 mb-6 leading-relaxed">
                  Speak directly with our senior jewelry consultant for immediate appointment scheduling or custom bridal inquiries.
                </p>

                <div className="space-y-3">
                  <a
                    id="bridal-direct-call-btn"
                    href="tel:9569407857"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#7a1c28] to-[#4a0d15] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider py-3 rounded border border-white/20 transition-all"
                  >
                    <Phone className="w-4 h-4 text-[#f7e7a9]" />
                    <span>Call 9569407857</span>
                  </a>

                  <a
                    id="bridal-whatsapp-desk-btn"
                    href="https://wa.me/919569407857?text=Hello%20JMD%20Jewellers,%20I%20want%20to%20book%20a%20Bridal%20Consultation%20at%20Mohripur."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider py-3 rounded shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Wedding Desk</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. CARE GUIDE & FAQ ACCORDIONS
          ========================================================================= */}
      <section className="py-24 bg-[#090807]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* FAQ Column */}
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37] mb-2">
                <span>Got Questions?</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">
                Frequently Asked <span className="gold-gradient-text">Questions</span>
              </h3>

              <div className="space-y-3">
                {[
                  {
                    q: 'What is 916 BIS Hallmarked Gold?',
                    a: '916 indicates 22-karat gold containing 91.6% pure gold. Every ornament at JMD Jewellers bears the official government BIS Hallmark logo and a unique 6-digit alphanumeric HUID code for absolute authenticity.',
                  },
                  {
                    q: 'Can I exchange or sell my old gold at JMD Jewellers?',
                    a: 'Yes! We offer 100% fair exchange value for old gold ornaments. We test your gold in front of you using our computerized Japanese Karatmeter for exact purity determination with 0% weight loss.',
                  },
                  {
                    q: 'How long does custom jewelry manufacturing take?',
                    a: 'Standard custom designs take 5 to 10 working days. Complex bridal sets or handmade filigree pieces take 12 to 18 days with regular photo & video progress updates on WhatsApp.',
                  },
                  {
                    q: 'What payment methods do you accept?',
                    a: 'We accept UPI, Credit/Debit Cards, Net Banking, RTGS/NEFT, and Cash (within statutory limits) accompanied by authentic computerized GST invoices.',
                  },
                ].map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-[#151210] border border-[#d4af37]/25 rounded-lg overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-[#f7e7a9] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#d4af37] transition-transform duration-300 ${
                          openFaq === idx ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-5 pb-4 text-xs sm:text-sm text-stone-400 leading-relaxed border-t border-stone-800/80 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Care Tips Column */}
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37] mb-2">
                <span>Preserve The Shine</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">
                Jewellery <span className="gold-gradient-text">Care Tips</span>
              </h3>

              <div className="space-y-3">
                {[
                  {
                    q: 'How to prevent silver jewelry from tarnishing?',
                    a: 'Silver reacts with airborne sulfur compounds to form silver sulfide tarnish. Store silver items (like payals and chains) in airtight zip-lock pouches with anti-tarnish strips, away from perfumes and moisture.',
                  },
                  {
                    q: 'Cleaning gold ornaments at home safely',
                    a: 'Soak gold jewelry in lukewarm water with mild baby shampoo for 10 minutes. Gently brush with an ultra-soft toothbrush, rinse in clean water, and pat dry with a microfiber cloth.',
                  },
                  {
                    q: 'Complimentary In-Store Ultrasonic Spa',
                    a: 'Visit JMD Jewellers at Mohripur anytime for complimentary ultrasonic cleaning and prong-tightening checks for all your precious jewelry.',
                  },
                  {
                    q: 'Storage advice for Diamond & Kundan sets',
                    a: 'Store diamond jewelry in individual padded velvet slots to avoid surface scratches. Kundan and polki should always be protected from water exposure and stored in moisture-free fabric boxes.',
                  },
                ].map((care, idx) => (
                  <div
                    key={idx}
                    className="bg-[#151210] border border-[#d4af37]/25 rounded-lg overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenCare(openCare === idx ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-[#f7e7a9] transition-colors"
                    >
                      <span>{care.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#d4af37] transition-transform duration-300 ${
                          openCare === idx ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openCare === idx && (
                      <div className="px-5 pb-4 text-xs sm:text-sm text-stone-400 leading-relaxed border-t border-stone-800/80 pt-3">
                        {care.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. TESTIMONIALS
          ========================================================================= */}
      <section className="py-24 bg-[#0d0b0a] border-t border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37] mb-3">
              <span className="w-6 h-[1px] bg-[#d4af37]" />
              <span>Customer Trust</span>
              <span className="w-6 h-[1px] bg-[#d4af37]" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Words from Our <span className="gold-gradient-text">Valued Patrons</span>
            </h2>
            <p className="text-stone-400 text-sm sm:text-base">
              Real experiences from families in Gorakhpur who celebrate life&apos;s finest moments with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-[#151210] border border-[#d4af37]/25 rounded-xl p-7 flex flex-col justify-between hover:border-[#d4af37] transition-all">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-stone-300 text-sm italic leading-relaxed mb-6 font-serif-luxury">
                  &quot;Purchased my daughter&apos;s wedding bridal choker and bangles from JMD Jewellers. The Japanese Karatmeter test done right in front of us gave our entire family complete peace of mind. Truly honest pricing.&quot;
                </p>
              </div>
              <div className="pt-4 border-t border-stone-800">
                <h4 className="font-display text-sm font-bold text-[#f7e7a9]">Anand Prakash Pandey</h4>
                <span className="text-xs text-stone-400">Gorakhpur Resident</span>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-[#151210] border border-[#d4af37]/25 rounded-xl p-7 flex flex-col justify-between hover:border-[#d4af37] transition-all">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-stone-300 text-sm italic leading-relaxed mb-6 font-serif-luxury">
                  &quot;I ordered a customized 18K solitaire engagement ring. They shared the 3D design on WhatsApp first and delivered it ahead of time. The finishing was top-tier boutique quality.&quot;
                </p>
              </div>
              <div className="pt-4 border-t border-stone-800">
                <h4 className="font-display text-sm font-bold text-[#f7e7a9]">Pooja Srivastava</h4>
                <span className="text-xs text-stone-400">Mohripur, Gorakhpur</span>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-[#151210] border border-[#d4af37]/25 rounded-xl p-7 flex flex-col justify-between hover:border-[#d4af37] transition-all">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-stone-300 text-sm italic leading-relaxed mb-6 font-serif-luxury">
                  &quot;Best making charges in the entire region and 100% transparent GST billing. Their collection of antique gold necklaces and silver payals is unmatched.&quot;
                </p>
              </div>
              <div className="pt-4 border-t border-stone-800">
                <h4 className="font-display text-sm font-bold text-[#f7e7a9]">Rajesh Kumar Gupta</h4>
                <span className="text-xs text-stone-400">Bargadwa, Gorakhpur</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          12. STORE LOCATION & MAP
          ========================================================================= */}
      <section id="location" className="py-24 bg-[#090807] border-t border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Showroom Info */}
            <div className="lg:col-span-5 bg-[#151210] border border-[#d4af37]/60 rounded-2xl p-7 sm:p-9 shadow-lg">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37] mb-2">
                <span>Visit Our Showroom</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                JMD <span className="gold-gradient-text">JEWELLERS</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mb-6">
                Experience our full collections in person at our flagship showroom in Mohripur, Gorakhpur.
              </p>

              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Store Address</h4>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      Main Road, Mohripur (Opposite Shanivaar Bazaar), Gorakhpur, Uttar Pradesh – 273007
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Direct Phone & WhatsApp</h4>
                    <p className="text-xs text-stone-400">
                      <a href="tel:9569407857" className="text-[#f7e7a9] font-bold hover:underline">
                        +91 9569407857
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Business Hours</h4>
                    <p className="text-xs text-stone-400">Open All 7 Days: 10:00 AM – 08:30 PM</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  id="location-call-btn"
                  href="tel:9569407857"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] text-black font-bold text-xs uppercase tracking-wider py-3 rounded"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Store</span>
                </a>
                <a
                  id="location-directions-btn"
                  href="https://maps.google.com/?q=Mohripur,Gorakhpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-[#d4af37] hover:bg-[#d4af37]/10 text-[#f7e7a9] font-semibold text-xs uppercase tracking-wider py-3 rounded transition-colors"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>
              </div>
            </div>

            {/* Right Map Frame */}
            <div className="lg:col-span-7 h-[420px] rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-xl relative bg-stone-900">
              <iframe
                title="JMD Jewellers Mohripur Gorakhpur Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14243.918917849182!2d83.3551523!3d26.8087277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399144410292723d%3A0xb36b5357dbdd8880!2sMoharipur%2C%20Gorakhpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          13. FOOTER
          ========================================================================= */}
      <footer className="bg-[#050404] border-t border-[#d4af37] pt-16 pb-8 text-stone-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
            {/* Col 1: Brand */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#d4af37] bg-[#2a2016] flex items-center justify-center font-display font-bold text-[#f7e7a9] text-base">
                  JMD
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-white tracking-widest">
                    JMD JEWELLERS
                  </h4>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]">
                    Mohripur • Gorakhpur
                  </span>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-stone-400">
                Gorakhpur’s trusted jewelry destination for 100% BIS Hallmarked gold, heirloom bridal sets, certified diamond rings, and bespoke handcrafted masterpieces.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://wa.me/919569407857"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#d4af37]/40 flex items-center justify-center text-[#f7e7a9] hover:bg-[#d4af37] hover:text-black transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="tel:9569407857"
                  className="w-8 h-8 rounded-full border border-[#d4af37]/40 flex items-center justify-center text-[#f7e7a9] hover:bg-[#d4af37] hover:text-black transition-colors"
                  aria-label="Phone"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="lg:col-span-3 space-y-3">
              <h5 className="font-display text-sm font-bold text-[#f7e7a9] uppercase tracking-wider">
                Quick Navigation
              </h5>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-[#f7e7a9] transition-colors">Home Showcase</a></li>
                <li><a href="#rates" className="hover:text-[#f7e7a9] transition-colors">Live Gold & Silver Rates</a></li>
                <li><a href="#calculator" className="hover:text-[#f7e7a9] transition-colors">Smart Price Calculator</a></li>
                <li><a href="#collections" className="hover:text-[#f7e7a9] transition-colors">Bridal & Antique Collections</a></li>
                <li><a href="#bespoke" className="hover:text-[#f7e7a9] transition-colors">Custom CAD Design Studio</a></li>
                <li><a href="#location" className="hover:text-[#f7e7a9] transition-colors">Mohripur Showroom Location</a></li>
              </ul>
            </div>

            {/* Col 3: Purity & Standards */}
            <div className="lg:col-span-2 space-y-3">
              <h5 className="font-display text-sm font-bold text-[#f7e7a9] uppercase tracking-wider">
                Purity & Standards
              </h5>
              <ul className="space-y-2">
                <li><a href="#trust" className="hover:text-[#f7e7a9] transition-colors">BIS Hallmark 916</a></li>
                <li><a href="#trust" className="hover:text-[#f7e7a9] transition-colors">6-Digit HUID Stamping</a></li>
                <li><a href="#trust" className="hover:text-[#f7e7a9] transition-colors">Japanese Karatmeter</a></li>
                <li><a href="#trust" className="hover:text-[#f7e7a9] transition-colors">IGI Solitaire Certified</a></li>
                <li><a href="#trust" className="hover:text-[#f7e7a9] transition-colors">100% Lifetime Buyback</a></li>
              </ul>
            </div>

            {/* Col 4: Contact & Hours */}
            <div className="lg:col-span-3 space-y-3">
              <h5 className="font-display text-sm font-bold text-[#f7e7a9] uppercase tracking-wider">
                Contact & Showroom
              </h5>
              <p className="text-xs">
                <strong className="text-white block">Helpline:</strong>
                <a href="tel:9569407857" className="text-[#f7e7a9] font-bold">9569407857</a>
              </p>
              <p className="text-xs">
                <strong className="text-white block">Location:</strong>
                Main Road, Mohripur (Opp. Shanivaar Bazaar), Gorakhpur, UP – 273007
              </p>
              <p className="text-xs">
                <strong className="text-white block">Hours:</strong>
                Open All 7 Days: 10:00 AM – 08:30 PM
              </p>
              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="w-full bg-[#d4af37] text-black font-bold py-2 rounded text-center text-xs tracking-wider uppercase mt-2 hover:brightness-110 transition-all"
              >
                Book VIP Consultation
              </button>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-400">
            <div>
              © 2026 JMD Jewellers, Mohripur, Gorakhpur. All Rights Reserved.
            </div>
            <div className="text-[#f7e7a9] font-medium">
              100% BIS Hallmarked • Certified Gold & Diamonds
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          14. FLOATING ACTION BUTTONS (CALL + WHATSAPP)
          ========================================================================= */}
      {/* Floating Call Button */}
      <a
        id="floating-call-btn"
        href="tel:9569407857"
        aria-label="Call JMD Jewellers"
        className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] text-black flex items-center justify-center shadow-[0_6px_20px_rgba(212,175,55,0.5)] hover:scale-110 transition-transform"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Floating WhatsApp Button */}
      <a
        id="floating-whatsapp-btn"
        href="https://wa.me/919569407857?text=Hello%20JMD%20Jewellers,%20I%20am%20visiting%20your%20website%20and%20need%20assistance."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-7 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.6)] hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* =========================================================================
          15. APPOINTMENT / BRIDAL VISIT BOOKING MODAL
          ========================================================================= */}
      <AnimatePresence>
        {isAppointmentModalOpen && (
          <div
            id="appointment-modal-overlay"
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#151210] border border-[#d4af37] rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-[0_0_40px_rgba(212,175,55,0.3)] text-left"
            >
              <button
                id="close-appointment-modal-btn"
                onClick={() => setIsAppointmentModalOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white text-lg p-1"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="flex items-center gap-2.5 text-[#d4af37] mb-1.5">
                <Calendar className="w-5 h-5" />
                <span className="text-xs uppercase tracking-widest font-bold">Priority Appointment</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                Book Store Visit / Bridal Consultation
              </h3>
              <p className="text-xs text-stone-400 mb-6">
                Reserve your dedicated consultation desk at JMD Jewellers, Mohripur, Gorakhpur.
              </p>

              <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                <div>
                  <label htmlFor={apptNameId} className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1">
                    Your Full Name
                  </label>
                  <input
                    id={apptNameId}
                    type="text"
                    placeholder="Enter your name"
                    required
                    value={apptName}
                    onChange={(e) => setApptName(e.target.value)}
                    className="w-full bg-[#0d0b0a] border border-[#d4af37]/40 focus:border-[#d4af37] text-white px-3.5 py-2.5 rounded-lg text-sm outline-none"
                  />
                </div>

                <div>
                  <label htmlFor={apptPhoneId} className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1">
                    Mobile / WhatsApp Number
                  </label>
                  <input
                    id={apptPhoneId}
                    type="tel"
                    placeholder="Enter 10-digit number"
                    required
                    value={apptPhone}
                    onChange={(e) => setApptPhone(e.target.value)}
                    className="w-full bg-[#0d0b0a] border border-[#d4af37]/40 focus:border-[#d4af37] text-white px-3.5 py-2.5 rounded-lg text-sm outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={apptDateId} className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1">
                      Preferred Date
                    </label>
                    <input
                      id={apptDateId}
                      type="date"
                      required
                      value={apptDate}
                      onChange={(e) => setApptDate(e.target.value)}
                      className="w-full bg-[#0d0b0a] border border-[#d4af37]/40 focus:border-[#d4af37] text-white px-3 py-2.5 rounded-lg text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor={apptTimeId} className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      id={apptTimeId}
                      value={apptTime}
                      onChange={(e) => setApptTime(e.target.value)}
                      className="w-full bg-[#0d0b0a] border border-[#d4af37]/40 focus:border-[#d4af37] text-white px-3 py-2.5 rounded-lg text-xs outline-none"
                    >
                      <option>11:00 AM - 01:00 PM</option>
                      <option>01:00 PM - 03:00 PM</option>
                      <option>03:00 PM - 05:00 PM</option>
                      <option>05:00 PM - 08:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor={apptCategoryId} className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1">
                    Looking For
                  </label>
                  <select
                    id={apptCategoryId}
                    value={apptCategory}
                    onChange={(e) => setApptCategory(e.target.value)}
                    className="w-full bg-[#0d0b0a] border border-[#d4af37]/40 focus:border-[#d4af37] text-white px-3 py-2.5 rounded-lg text-xs outline-none"
                  >
                    <option>Bridal Wedding Set</option>
                    <option>Daily Wear Gold Chains & Bangles</option>
                    <option>Diamond Rings & Solitaires</option>
                    <option>Old Gold Exchange & Purity Testing</option>
                    <option>Custom Jewelry CAD Order</option>
                    <option>Silver Utensils & Payals</option>
                  </select>
                </div>

                <button
                  id="confirm-booking-whatsapp-btn"
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-lg shadow-md transition-all mt-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm Booking via WhatsApp</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          16. NOTIFICATION TOAST
          ========================================================================= */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1f1a17] border border-[#d4af37] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs max-w-md w-[90%]"
          >
            <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span className="flex-1">{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-stone-400 hover:text-white">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
