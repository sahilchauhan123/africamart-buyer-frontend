"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, Search, MessageSquareMore, X, Cpu, Factory, Building2, Shirt, Leaf, Activity, CheckCircle2, ChevronRight, Phone, MessageCircle, Star, MapPin, BadgeCheck, LayoutGrid, SlidersHorizontal, FilePlus, Bell } from 'lucide-react';
import SearchPage from './SearchPage';
import CategoriesPage from './CategoriesPage';
import Drawer from './Drawer';
import Messages from './Messages';
import ChatSession from './ChatSession';
import SubCategoryPage from './SubCategoryPage';
import ProductListingPage from './ProductListingPage';
import PostRequirement from './PostRequirement';
import Notifications from './Notifications';
import RegionSearch from './RegionSearch';
import ProductDetailsPage from './ProductDetailsPage';
import { View } from '../types';

type HeroAd = {
    badge: string;
    title: string;
    description: string;
    cardClassName: string;
    overlayClassName: string;
    gradientClassName: string;
    descriptionClassName: string;
    overlayStyle?: React.CSSProperties;
    buttonLabel?: string;
    buttonClassName?: string;
    imageSrc?: string;
    imageAlt?: string;
    contentWidthClassName?: string;
    imageContainerClassName?: string;
    imageClassName?: string;
    badgeClassName?: string;
};

const heroAds: HeroAd[] = [
    {
        badge: 'Seasonal',
        title: 'Fresh Harvest',
        description: 'Bulk supply of grains and organic produce.',
        buttonLabel: 'Order Now',
        imageSrc: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&q=80&w=400',
        imageAlt: 'Agriculture',
        cardClassName: 'bg-emerald-900 shadow-lg shadow-emerald-900/20',
        overlayClassName: 'absolute inset-0 opacity-20',
        overlayStyle: { backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" },
        gradientClassName: 'bg-gradient-to-r from-emerald-950/90 to-transparent',
        contentWidthClassName: 'w-2/3',
        imageContainerClassName: 'w-1/3 flex justify-end relative h-24',
        imageClassName: 'object-cover rounded-full border-4 border-emerald-500/30',
        badgeClassName: 'bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider',
        descriptionClassName: 'text-emerald-100 text-[10px] mt-1 font-medium',
        buttonClassName: 'mt-3 bg-emerald-500 text-white text-[10px] font-bold px-4 py-2 rounded-lg uppercase tracking-widest',
    },
] ;

const nearbyProducts = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC20__f91qvOgJaKEPgLVYJo9_X9DcW1xjOSvX570uhuMtq7MPeT2NOm9XPTi9a0jrLAO8etuLjdcKm5QPtdMZEwgy3uZeJQYVFXLtFNBqBZ5cG3DqfkIwTurOl07UvxeNdppOIUBNJ0-Tc0FbCNnDBYwNH7NuXsrH87gcw3m2wUXTwE5oftVmRKKavFnwje3HZnIjgJJ1f5wGdaplaCXmsrRaXpr9kD_9jDPaTN3RDC3L1mE5DQHTUhJQ1LyTvUcv39Sru8iHg2To',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBQR-W23CjrNPcoCJ11ARnBoUXfpPZr_3Hzz0unIoUk4f0Br_s7d24jD9JSwqw_8cB0ye0hPLiInLTWQshzcE327Xj1TKxedtnF-CYTbIbzZp592345-jDw8vx7q85UwCb3itPME3YCmtpSO5gEq5XQx8PnF0YWlcEu-zkDXuXC1KeEw99xRRazs5AWAXKkmS4e7kbsbc7ccNlcBNimMcnlWD-oo54biznomi_Jr9ubBL2ipb323L0dxs3RgtAN5DhBtpw2okwftOQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC20__f91qvOgJaKEPgLVYJo9_X9DcW1xjOSvX570uhuMtq7MPeT2NOm9XPTi9a0jrLAO8etuLjdcKm5QPtdMZEwgy3uZeJQYVFXLtFNBqBZ5cG3DqfkIwTurOl07UvxeNdppOIUBNJ0-Tc0FbCNnDBYwNH7NuXsrH87gcw3m2wUXTwE5oftVmRKKavFnwje3HZnIjgJJ1f5wGdaplaCXmsrRaXpr9kD_9jDPaTN3RDC3L1mE5DQHTUhJQ1LyTvUcv39Sru8iHg2To',
] as const;

const grainProducts = [
    { category: 'Grains', name: 'Premium White Flour', price: '$12.50', unit: '/25kg bag', rating: 5, reviews: '(120+)', imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR3qWqOw5cb7Xe8NEVHVEKxMDNofXv-4NkjX65Tf-l830tWfR-sOt8asgBpmaJbshew3ByvAcKPsvGPQWt3S7bASEj7L_aC7v8o6NqOWfxgef_Kv6wc2tgrGGJjL31g_8-4Tx-1fItFFdIgZrS2OW7NPNP4Y68Tpq3ZyJt0HPmOUZtUjeHXIbXIo1Q2h1vcn_r2hrLLypiUkSFMeXGeZ4s6W5AK3z58be5j6sCvi_hS3haAX7EcinLZJda0H-TybCMRrrWl5PEbAw', imageAlt: 'Premium White Flour', imageClassName: 'object-contain p-2' },
    { category: 'Bulk Grains', name: 'Long Grain White Rice', price: '$45.00', unit: '/50kg bag', rating: 4, reviews: '(85)', imageSrc: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400', imageAlt: 'Long Grain Rice', imageClassName: 'object-cover' },
    { category: 'Oils', name: 'Refined Vegetable Oil', price: '$32.00', unit: '/20L Jerrican', rating: 5, reviews: '(210+)', imageSrc: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400', imageAlt: 'Refined Vegetable Oil', imageClassName: 'object-cover' },
    { category: 'Legumes', name: 'Organic Kidney Beans', price: '$1.20', unit: '/kg', rating: 5, reviews: '(56)', imageSrc: 'https://images.unsplash.com/photo-1551462147-ff29053fad31?auto=format&fit=crop&q=80&w=400', imageAlt: 'Organic Red Beans', imageClassName: 'object-cover' },
    { category: 'Spices', name: 'Export Quality Spices', price: '$3.50', unit: '/500g', rating: 5, reviews: '(94)', imageSrc: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400', imageAlt: 'Assorted Spices', imageClassName: 'object-cover' },
    { category: 'Cooking Gear', name: 'Industrial Pot Set (3pcs)', price: '$85.00', unit: '/set', rating: 5, reviews: '(42)', imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7kEukXzKXAqpI2ZytxqSzXaFvgokVCWUtS4gHn9OrET9NBkpBsZBVzDgkZLYCp4DJVh9qBkagRPgMzv5SA2caFejJ5VH502ZdcasCzWvJcFX8p5wRkBjmioBUsDk9s24x7rs4IPOgm-cFF5I3r0ll_BaydaTsi9olYMUvhw-E28mGmH1Biy7UYeHB0YISU4tpibnrN8_8DR-OZRBNoVgTyLn9_JB9nBIlSCC0B_hS_iIh6YoUmxUa6pu1rCHTfP3-eFpEC9RHIvM', imageAlt: 'Stainless Steel Cookware', imageClassName: 'object-contain p-2' },
] as const;

const categoryRows = [
    [
        { name: 'Electronics', imageSrc: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=150' },
        { name: 'Machinery', imageSrc: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=150' },
        { name: 'Construction', imageSrc: 'https://images.unsplash.com/photo-1502444330042-d1a1ddf9d779?auto=format&fit=crop&q=80&w=150' },
        { name: 'Agriculture', imageSrc: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&q=80&w=150' },
        { name: 'Apparel', imageSrc: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=150' },
        { name: 'Medical', imageSrc: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=150' },
    ],
    [
        { name: 'Home Decor', imageSrc: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=150' },
        { name: 'Packaging', imageSrc: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&q=80&w=150' },
        { name: 'Vehicles', imageSrc: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=150' },
        { name: 'Beauty', imageSrc: 'https://images.unsplash.com/photo-1612803875323-9529cc534f37?auto=format&fit=crop&q=80&w=150' },
        { name: 'Sports', imageSrc: 'https://images.unsplash.com/photo-1542616422-799ff051f4ff?auto=format&fit=crop&q=80&w=150' },
        { name: 'Tools', imageSrc: 'https://images.unsplash.com/photo-1581147036324-c1784ca13bb7?auto=format&fit=crop&q=80&w=150' },
    ],
] as const;

const suggestedProducts = [
    { category: 'Energy', name: 'Monocrystalline Solar Panel', price: '$45.00', unit: '/unit', rating: 5, reviews: '(112)', imageSrc: 'https://images.unsplash.com/photo-1509391366360-1e97d5259d81?auto=format&fit=crop&q=80&w=400', imageAlt: 'Solar Panels' },
    { category: 'Construction', name: 'Industrial Safety Helmet', price: '$5.50', unit: '/piece', rating: 4, reviews: '(85)', imageSrc: 'https://images.unsplash.com/photo-1582214695500-47decc75fb95?auto=format&fit=crop&q=80&w=400', imageAlt: 'Safety Helmets' },
    { category: 'Materials', name: 'Portland Cement 50kg', price: '$6.20', unit: '/bag', rating: 4, reviews: '(240+)', imageSrc: 'https://images.unsplash.com/photo-1502444330042-d1a1ddf9d779?auto=format&fit=crop&q=80&w=400', imageAlt: 'Cement Bags' },
    { category: 'Electrical', name: 'Pure Copper Wire/Cable', price: '$2.80', unit: '/meter', rating: 5, reviews: '(73)', imageSrc: 'https://images.unsplash.com/photo-1596404285854-448c4f58c445?auto=format&fit=crop&q=80&w=400', imageAlt: 'Copper Cables' },
] as const;

const topSuppliers = [
    { name: 'Global Trade Hub', imageSrc: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=150' },
    { name: 'Elite Goods Co.', imageSrc: 'https://images.unsplash.com/photo-1542616422-799ff051f4ff?auto=format&fit=crop&q=80&w=150' },
    { name: 'Summit Materials', imageSrc: 'https://images.unsplash.com/photo-1502444330042-d1a1ddf9d779?auto=format&fit=crop&q=80&w=150' },
    { name: 'Apex Machinery', imageSrc: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=150' },
] as const;

const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rating ? '' : 'text-gray-300'}>
            ★
        </span>
    ));

const MobileHome: React.FC = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isCategoriesPageOpen, setIsCategoriesPageOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isSubCategoryPageOpen, setIsSubCategoryPageOpen] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
    const [isProductListingOpen, setIsProductListingOpen] = useState(false);
    const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
    const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
    const [isOnboarding, setIsOnboarding] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    // Persistence: Load state on mount
    useEffect(() => {
        const savedState = localStorage.getItem('africamart_nav_state');
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                if (parsed.currentView) setCurrentView(parsed.currentView);
                if (parsed.isSearchOpen !== undefined) setIsSearchOpen(parsed.isSearchOpen);
                if (parsed.isCategoriesPageOpen !== undefined) setIsCategoriesPageOpen(parsed.isCategoriesPageOpen);
                if (parsed.isSubCategoryPageOpen !== undefined) setIsSubCategoryPageOpen(parsed.isSubCategoryPageOpen);
                if (parsed.selectedCategory !== undefined) setSelectedCategory(parsed.selectedCategory);
                if (parsed.selectedSubCategory !== undefined) setSelectedSubCategory(parsed.selectedSubCategory);
                if (parsed.isProductListingOpen !== undefined) setIsProductListingOpen(parsed.isProductListingOpen);
                if (parsed.isProductDetailsOpen !== undefined) setIsProductDetailsOpen(parsed.isProductDetailsOpen);
            } catch (e) {
                console.error('Failed to load nav state', e);
            }
        }
        setIsHydrated(true);
    }, []);

    // Persistence: Save state on change
    useEffect(() => {
        if (!isHydrated) return;

        const stateToSave = {
            currentView,
            isSearchOpen,
            isCategoriesPageOpen,
            isSubCategoryPageOpen,
            selectedCategory,
            selectedSubCategory,
            isProductListingOpen,
            isProductDetailsOpen,
            isPostRequirementOpen: currentView === View.POST_REQUIREMENT
        };
        localStorage.setItem('africamart_nav_state', JSON.stringify(stateToSave));
    }, [currentView, isSearchOpen, isCategoriesPageOpen, isSubCategoryPageOpen, selectedCategory, isHydrated, isProductDetailsOpen]);

    // Handle Hardware/Browser Back Button
    useEffect(() => {
        if (!isHydrated) return;

        const handlePopState = (event: PopStateEvent) => {
            // Priority 0: Product Details
            if (isProductDetailsOpen) {
                setIsProductDetailsOpen(false);
                return;
            }
            // Priority 1: Product Listing
            if (isProductListingOpen) {
                setIsProductListingOpen(false);
                return;
            }
            // Priority 2: Sub-Category Page
            if (isSubCategoryPageOpen) {
                setIsSubCategoryPageOpen(false);
                return;
            }
            // Priority 3: Search Page
            if (isSearchOpen) {
                setIsSearchOpen(false);
                return;
            }
            // Priority 4: Categories Page
            if (isCategoriesPageOpen) {
                setIsCategoriesPageOpen(false);
                return;
            }
            // Priority 5: Drawer/Menu
            if (isDrawerOpen) {
                setIsDrawerOpen(false);
                return;
            }
            // Priority 6: Inner Views (Messages, Chat, etc.)
            if (currentView === View.CHAT_SESSION) {
                setCurrentView(View.MESSAGES);
                return;
            }
            if (currentView === View.POST_REQUIREMENT) {
                setCurrentView(View.DASHBOARD);
                return;
            }
            if (currentView === View.MY_ORDERS) {
                setCurrentView(View.DASHBOARD);
                return;
            }
            if (currentView !== View.DASHBOARD) {
                setCurrentView(View.DASHBOARD);
                return;
            }
        };

        window.addEventListener('popstate', handlePopState);

        // Push state whenever an overlay opens so that back button works
        const anyOverlayOpen = isSearchOpen || isCategoriesPageOpen || isSubCategoryPageOpen || isProductListingOpen || isProductDetailsOpen || isDrawerOpen || currentView !== View.DASHBOARD;

        if (anyOverlayOpen) {
            window.history.pushState({ overlay: true }, "");
        }

        return () => window.removeEventListener('popstate', handlePopState);
    }, [isHydrated, isSearchOpen, isCategoriesPageOpen, isSubCategoryPageOpen, isProductListingOpen, isProductDetailsOpen, isDrawerOpen, currentView]);

    const handleNavigate = (view: View) => {
        setCurrentView(view);
        if (view === View.CATEGORIES) {
            setIsCategoriesPageOpen(true);
        }
        console.log(`Navigating to ${view}`);
    };

    // Don't render until hydrated to avoid mismatch
    if (!isHydrated) return <div className="min-h-screen bg-brand-blue" />;

    if (currentView === View.POST_REQUIREMENT) {
        return <PostRequirement onBack={() => setCurrentView(View.DASHBOARD)} onNavigate={handleNavigate} />;
    }

    if (currentView === View.MY_ORDERS) {
        return <RegionSearch onBack={() => setCurrentView(View.DASHBOARD)} />;
    }

    if (isProductDetailsOpen) {
        return <ProductDetailsPage onBack={() => setIsProductDetailsOpen(false)} onNavigate={handleNavigate} onOpenSearch={() => setIsSearchOpen(true)} />;
    }

    if (isSearchOpen) {
        return <SearchPage onBack={() => setIsSearchOpen(false)} />;
    }

    if (isProductListingOpen && selectedSubCategory) {
        return (
            <ProductListingPage
                subCategoryName={selectedSubCategory}
                onBack={() => setIsProductListingOpen(false)}
            />
        );
    }

    if (isSubCategoryPageOpen && selectedCategory) {
        return (
            <SubCategoryPage
                categoryName={selectedCategory}
                onBack={() => setIsSubCategoryPageOpen(false)}
                onSubCategoryClick={(subCatName) => {
                    setSelectedSubCategory(subCatName);
                    setIsProductListingOpen(true);
                }}
            />
        );
    }

    if (isCategoriesPageOpen) {
        return (
            <>
                <CategoriesPage
                    onBack={() => setIsCategoriesPageOpen(false)}
                    onNavigate={(view) => {
                        setIsCategoriesPageOpen(false);
                        handleNavigate(view);
                    }}
                    onOpenMenu={() => setIsDrawerOpen(true)}
                    onOpenSearch={() => setIsSearchOpen(true)}
                    onCategoryClick={(catName) => {
                        setSelectedCategory(catName);
                        setIsSubCategoryPageOpen(true);
                    }}
                    currentView={currentView}
                />
                <Drawer
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    onNavigate={(view) => {
                        setIsCategoriesPageOpen(false);
                        handleNavigate(view);
                    }}
                    currentView={currentView}
                    isOnboarding={isOnboarding}
                />
            </>
        );
    }

    if (currentView === View.CHAT_SESSION) {
        return <ChatSession onBack={() => setCurrentView(View.MESSAGES)} />;
    }

    if (currentView === View.MESSAGES) {
        return (
            <>
                <Messages
                    onOpenMenu={() => setIsDrawerOpen(true)}
                    onNavigate={handleNavigate}
                />
                <Drawer
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    onNavigate={handleNavigate}
                    currentView={currentView}
                    isOnboarding={isOnboarding}
                />
            </>
        );
    }

    if (currentView === View.NOTIFICATIONS) {
        return (
            <Notifications 
                onBack={() => setCurrentView(View.DASHBOARD)} 
                onNavigate={handleNavigate} 
            />
        );
    }

    return (
        <div className="bg-[#f8fafc] min-h-screen">
            {/* BEGIN: MainHeader */}
            <header className="bg-brand-blue text-white sticky top-0 z-50">
                <div className="px-4 py-3 flex items-center justify-between gap-3">
                    {/* Menu Icon */}
                    <button
                        aria-label="Menu"
                        className="p-1 hover:bg-white/10 rounded-full transition-colors active:scale-95"
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        <Menu className="h-8 w-8" />
                    </button>

                    {/* Notifications Icon */}
                    <button
                        aria-label="Notifications"
                        className="relative p-1 hover:bg-white/10 rounded-full transition-colors active:scale-95"
                        onClick={() => handleNavigate(View.NOTIFICATIONS)}
                    >
                        <Bell className="h-7 w-7" />
                        <span className="absolute top-1 right-1.5 bg-red-500 text-white text-[8px] font-black w-3.5 h-3.5 rounded-full border-2 border-brand-blue flex items-center justify-center">2</span>
                    </button>

                    <div className="flex-grow relative group" onClick={() => setIsSearchOpen(true)}>
                        <input
                            className="w-full py-2.5 pl-4 pr-10 rounded-xl text-gray-900 placeholder:text-gray-400 text-sm bg-white border-none focus:outline-none focus:ring-0 transition-all duration-300 shadow-sm"
                            placeholder="Search products or sellers..."
                            type="text"
                            readOnly
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
                        </div>
                    </div>

                    <div className="flex gap-2 isolate">

                        {/* Message Icon */}
                        <button
                            aria-label="Messages"
                            className="relative p-1 hover:bg-white/10 rounded-full transition-colors active:scale-95"
                            onClick={() => handleNavigate(View.MESSAGES)}
                        >
                            <MessageSquareMore className="h-7 w-7" />
                            <span className="absolute top-1 right-1 bg-emerald-500 w-3 h-3 rounded-full border-2 border-brand-blue"></span>
                        </button>
                    </div>
                </div>


            </header>
            {/* END: MainHeader */}

            <main className="mt-2 text-left">

    
                {/* BEGIN: AdSection */}
                <section className="mb-6 relative group">
                    <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-4 px-4 pb-2">
                        {heroAds.map((ad) => (
                            <div key={ad.title} className={`relative min-w-[90%] sm:min-w-[85%] h-40 rounded-2xl overflow-hidden snap-center shrink-0 ${ad.cardClassName}`}>
                                <div className={ad.overlayClassName} style={ad.overlayStyle}></div>
                                <div className={`relative h-full flex items-center p-6 z-10 ${ad.gradientClassName}`}>
                                    <div className={ad.contentWidthClassName ?? 'w-full'}>
                                        <span className={ad.badgeClassName ?? 'bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider'}>{ad.badge}</span>
                                        <h2 className="text-lg font-black text-white mt-1 leading-tight italic uppercase">{ad.title}</h2>
                                        <p className={ad.descriptionClassName}>{ad.description}</p>
                                        {ad.buttonLabel && <button className={ad.buttonClassName}>{ad.buttonLabel}</button>}
                                    </div>
                                    {ad.imageSrc && ad.imageAlt && (
                                        <div className={ad.imageContainerClassName}>
                                            <Image src={ad.imageSrc} alt={ad.imageAlt} fill className={ad.imageClassName ?? 'object-cover'} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                </section>
                {/* END: AdSection */}
            
                {/* BEGIN: HeroSection */}
                <section className="px-4 mb-4">
                    <h2 className="text-lg font-bold text-gray-900 tracking-tight">Goods Available Near You</h2>
                </section>
                {/* END: HeroSection */}

                {/* BEGIN: ProductListVertical */}
                <section className="grid grid-cols-2 gap-3 px-4 mb-4">
                    {nearbyProducts.map((imageSrc, index) => (
                        <article
                            key={`${imageSrc}-${index}`}
                            className={`cursor-pointer hover:shadow-md transition-all flex flex-col ${index === 2 ? 'p-3' : ''}`}
                            data-purpose="product-card"
                            onClick={() => setIsProductDetailsOpen(true)}
                        >
                            <div className="w-full aspect-[4/3] relative rounded-md overflow-hidden mb-2">
                                <Image alt={`Nearby product ${index + 1}`} fill className="object-contain" src={imageSrc} />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-tight truncate">Product Name</h3>
                                <p className="text-sm font-bold text-gray-900 leading-tight">$00.00/kg</p>
                                <p className="text-[10px] font-bold text-gray-800 mt-1 truncate">Business&apos;s Seller Name</p>
                                <div className="flex items-center text-[9px] text-gray-400 mt-1">
                                    <MapPin className="h-3 w-3 mr-1 shrink-0" />
                                    <span className="truncate">Location/Address</span>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                    <div className="flex text-orange-400 text-[10px]">{renderStars(4)}</div>
                                </div>
                                <div className="mt-auto pt-3">
                                    <button className="w-full bg-brand-accent text-white py-2 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 hover:opacity-90 transition-opacity uppercase tracking-widest shadow-lg shadow-brand-accent/30 active:scale-95">
                                        <MessageCircle className="h-3.5 w-3.5" />
                                        Best Offers
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
                {/* END: ProductListVertical */}

                <hr className="my-6 border-gray-200" />

                {/* BEGIN: QuickOrderSection */}
                <section className="px-4 mb-10">
                    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                        <div className="flex gap-5">
                            <div className="w-28 h-28 bg-blue-50 rounded-2xl overflow-hidden shrink-0 relative p-2 group">
                                <Image
                                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200"
                                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                                    alt="Product thumbnail"
                                    fill
                                />
                                <div className="absolute inset-0 bg-brand-blue/5"></div>
                            </div>
                            <div className="flex-1 py-1">
                                <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest bg-brand-blue/5 px-2 py-0.5 rounded">Quick Inquiry</span>
                                <h2 className="text-lg font-extrabold text-gray-900 mt-2 leading-tight">Desire a custom quote for this product?</h2>
                                <p className="text-xs text-gray-500 mt-1.5 font-medium">Specify your needs and get instant responses.</p>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div className="relative">
                                <input
                                    className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue/30 transition-all outline-none"
                                    placeholder="Quantity"
                                    type="number"
                                />
                            </div>
                            <div className="relative">
                                <select className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue/30 transition-all outline-none appearance-none cursor-pointer">
                                    <option>Units (pcs)</option>
                                    <option>Kilograms (kg)</option>
                                    <option>Boxes</option>
                                    <option>Metric Tons</option>
                                </select>
                            </div>
                        </div>

                        <button className="w-full bg-brand-blue text-white mt-4 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl shadow-brand-blue/25 active:scale-[0.98] transition-all">
                            get quick enquiry
                            <BadgeCheck className="h-5 w-5 text-blue-300" />
                        </button>
                    </div>
                </section>
                {/* END: QuickOrderSection */}

                {/* BEGIN: SlidableCategorySection */}
                <section className="bg-white pt-4 pb-8 overflow-hidden">
                    <div className="px-4 mb-6 flex justify-between items-end">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Grains & Cooking Materials</h2>
                            <p className="text-xs text-gray-500 font-medium mt-1">Bulk supplies from top agricultural hubs</p>
                        </div>
                        <button className="text-brand-blue text-xs font-bold uppercase tracking-wider hover:underline">View All</button>
                    </div>

                    <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-4 px-4 pb-4">
                        {grainProducts.map((product) => (
                            <div key={product.name} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm min-w-[200px] snap-center flex flex-col items-center">
                                <div className="w-full aspect-square mb-3 relative rounded-2xl overflow-hidden bg-gray-50">
                                    <Image alt={product.imageAlt} className={product.imageClassName} fill src={product.imageSrc} />
                                </div>
                                <div className="w-full text-left">
                                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{product.category}</p>
                                    <p className="text-sm font-bold text-gray-900 mt-1 truncate">{product.name}</p>
                                    <p className="text-lg font-black text-brand-blue mt-1">
                                        {product.price}
                                        <span className="text-[10px] text-gray-500 font-medium ml-1">{product.unit}</span>
                                    </p>
                                    <div className="flex items-center gap-1.5 mt-2">
                                        <div className="flex text-[10px] text-orange-400">{renderStars(product.rating)}</div>
                                        <span className="text-[10px] text-gray-400 font-bold">{product.reviews}</span>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <button className="w-full bg-brand-blue text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-blue/20">Contact Seller</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                {/* END: SlidableCategorySection */}

                {/* BEGIN: SmallCategoriesSection */}
                <section className="bg-[#f8fafc] pt-2 pb-4 overflow-hidden md:hidden space-y-4">
                    {categoryRows.map((row, rowIndex) => (
                        <div key={rowIndex} className={`flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-4 px-4 ${rowIndex === 0 ? 'pb-1' : 'pb-2'}`}>
                            {row.map((category) => (
                                <div key={category.name} className="flex flex-col items-center gap-2 w-[72px] cursor-pointer snap-center shrink-0" onClick={() => setIsCategoriesPageOpen(true)}>
                                    <div className="w-[72px] h-[72px] rounded-2xl bg-white flex items-center justify-center overflow-hidden border border-gray-100 relative shadow-sm">
                                        <Image src={category.imageSrc} alt={category.name} fill className="object-cover" />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-700 text-center leading-tight truncate w-full px-1">{category.name}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </section>
                {/* END: SmallCategoriesSection */}

                {/* BEGIN: SuggestedProductsSection */}
                <section className="bg-[#f8fafc] pt-4 pb-8 overflow-hidden">
                    <div className="px-4 mb-6 flex justify-between items-end">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Suggested for You</h2>
                            <p className="text-xs text-gray-500 font-medium mt-1">Based on your recent activity</p>
                        </div>
                    </div>

                    <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-4 px-4 pb-4">
                        {suggestedProducts.map((product) => (
                            <div key={product.name} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm min-w-[200px] snap-center flex flex-col items-center">
                                <div className="w-full aspect-square mb-3 relative rounded-2xl overflow-hidden bg-gray-50" onClick={() => setIsProductDetailsOpen(true)}>
                                    <Image alt={product.imageAlt} className="object-cover" fill src={product.imageSrc} />
                                </div>
                                <div className="w-full text-left" onClick={() => setIsProductDetailsOpen(true)}>
                                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{product.category}</p>
                                    <p className="text-sm font-bold text-gray-900 mt-1 truncate">{product.name}</p>
                                    <p className="text-lg font-black text-brand-blue mt-1">
                                        {product.price}
                                        <span className="text-[10px] text-gray-500 font-medium ml-1">{product.unit}</span>
                                    </p>
                                    <div className="flex items-center gap-1.5 mt-2">
                                        <div className="flex text-[10px] text-orange-400">{renderStars(product.rating)}</div>
                                        <span className="text-[10px] text-gray-400 font-bold">{product.reviews}</span>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <button className="w-full bg-brand-blue text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-blue/20">Contact Seller</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                {/* END: SuggestedProductsSection */}

                {/* BEGIN: TopSuppliersSection */}
                <section className="bg-white pt-6 pb-8">
                    <div className="px-4 mb-4 flex justify-between items-end">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Top Suppliers in Monrovia</h2>
                            <p className="text-xs text-gray-500 font-medium mt-1">Verified wholesale distributors</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 px-4">
                        {topSuppliers.map((supplier) => (
                            <div key={supplier.name} className="bg-white rounded-xl p-3 border border-gray-200 shadow-md shadow-gray-200/50 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-all" onClick={() => setIsProductDetailsOpen(true)}>
                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 overflow-hidden relative">
                                    <Image src={supplier.imageSrc} alt={supplier.name} fill className="object-cover" />
                                </div>
                                <h3 className="text-[11px] font-bold text-gray-900 leading-tight">{supplier.name}</h3>
                                <div className="flex items-center gap-1 mt-1 text-[9px] text-gray-500">
                                    <BadgeCheck className="w-3 h-3 text-blue-500" /> Verified
                                </div>
                                <button className="mt-4 w-full bg-[#007D3E] text-white text-xs font-bold py-2.5 rounded-xl active:scale-95 transition-all">Message</button>
                            </div>
                        ))}
                    </div>
                </section>
                {/* END: TopSuppliersSection */}
            </main>

            <Drawer
                currentView={currentView}
                isOpen={isDrawerOpen}
                isOnboarding={isOnboarding}
                onClose={() => setIsDrawerOpen(false)}
                onNavigate={handleNavigate}
            />


        </div>
    );
};

export default MobileHome;
