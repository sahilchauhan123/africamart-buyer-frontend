"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, Search, MessageSquareMore, MessageSquareDot, X, Cpu, Factory, Building2, Shirt, Leaf, Activity, CheckCircle2, ChevronRight, Phone, MessageCircle, Star, MapPin, BadgeCheck, LayoutGrid, SlidersHorizontal, FilePlus, Bell } from 'lucide-react';
import SearchPage from './SearchPage';
import CategoriesPage from './CategoriesPage';
import Drawer from './Drawer';
import Messages from './Messages';
import ChatSession from './ChatSession';
import SubCategoryPage from './SubCategoryPage';
import ProductListingPage from './ProductListingPage';
import PostRequirement from './PostRequirement';
import Notifications from './Notifications';

import ProductDetailsPage from './ProductDetailsPage';
import ReachSellerOverlay from './ReachSellerOverlay';
import SignInOverlay from './SignInOverlay';
import SignUpPage from './SignUpPage';
import GetQuotePage from './GetQuotePage';
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
];

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
    const [detailsHasPricing, setDetailsHasPricing] = useState(true);
    const [isReachSellerOpen, setIsReachSellerOpen] = useState(false);
    const [reachSellerProduct, setReachSellerProduct] = useState("");
    const [reachSellerImage, setReachSellerImage] = useState("");
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isGetQuoteOpen, setIsGetQuoteOpen] = useState(false);
    const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
    const [isOnboarding, setIsOnboarding] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [shouldShowSticky, setShouldShowSticky] = useState(false);

    const openProductDetails = (hasPrice: boolean) => {
        setDetailsHasPricing(hasPrice);
        setIsProductDetailsOpen(true);
    };

    const openReachSeller = (e: React.MouseEvent, productName: string, productImg: string) => {
        e.stopPropagation();
        setReachSellerProduct(productName);
        setReachSellerImage(productImg);
        setIsReachSellerOpen(true);
    };

    useEffect(() => {
        const handleScroll = () => {
            const hasScrolled = window.scrollY > 80;
            setIsScrolled(hasScrolled);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isScrolled) {
            timer = setTimeout(() => {
                setShouldShowSticky(true);
            }, 50);
        } else {
            setShouldShowSticky(false);
        }
        return () => clearTimeout(timer);
    }, [isScrolled]);

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



    if (currentView === View.SIGNUP) {
        return (
            <SignUpPage
                onBack={() => setCurrentView(View.DASHBOARD)}
                onLogin={() => {
                    setCurrentView(View.DASHBOARD);
                    setIsSignInOpen(true);
                }}
            />
        );
    }

    if (isGetQuoteOpen) {
        return <GetQuotePage onBack={() => setIsGetQuoteOpen(false)} productName="Heavy Duty Industrial Pump Model X-200" businessName="Six" productImage="https://lh3.googleusercontent.com/aida-public/AB6AXuCfE1vWrW9fM1qDnsVTCzFqc2Jy15k7VP7jDw0XiI7xBOfxl7CWNKpfKdjt6a1Cn33Jpdq5MfcO_of6I22NUlUj36lgqyMCeOvmJR8GitEkCqQZiUjbEuJkeyFlPZbJJZNRjRGdjiPQ3BDTz41vT-C9Kf0fujSyKMpFqKKUoHHDvx3dsV1nvNg0cHQstk1BrURc7ItmCIAj3X9NCmR-lsetujm_o2q8jh4cOHCBQdIkTc-ghPhMwHQbQxnkO0k_crtHgpSqnHaeyeE" productPrice="₹ 45,000 - ₹ 55,000 / Unit" />;
    }

    if (isProductDetailsOpen) {
        return (
            <ProductDetailsPage
                onBack={() => setIsProductDetailsOpen(false)}
                onNavigate={handleNavigate}
                onOpenSearch={() => setIsSearchOpen(true)}
                onGetQuote={() => setIsGetQuoteOpen(true)}
                onMessage={() => setCurrentView(View.CHAT_SESSION)}
                hasPricing={detailsHasPricing}
            />
        );
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
        <div className="bg-surface font-body text-on-surface min-h-[100dvh]">
            {/* Default Original Header (Scrolls out of view naturally) */}
            <header 
                className="relative w-full z-40 px-4 h-[144px] flex flex-col pt-3"
                style={{ background: 'linear-gradient(180deg, hsla(224, 39%, 58%, 1) 0%, hsla(224, 39%, 81%, 0.1) 85%, transparent 100%)' }}
            >
                <div className="flex items-center justify-between w-full h-11">
                    <div className="flex items-center gap-3">
                        <button
                            className="flex items-center justify-center w-10 h-11 flex-shrink-0 text-white active:scale-90 transition-transform duration-300"
                            onClick={() => setIsDrawerOpen(true)}
                        >
                            <span className="material-symbols-outlined text-xl font-[400]">menu</span>
                        </button>
                        <h1 className="font-headline font-bold text-lg tracking-tight text-white italic">
                            AfricaMart B2B
                        </h1>
                    </div>
                    <div className="flex flex-shrink-0">
                        <button
                            className="bg-primary text-on-primary px-4 py-2 rounded-sm text-xs font-bold shadow-sm active:scale-95 transition-transform duration-200 flex items-center gap-1.5"
                            onClick={() => setIsSignInOpen(true)}
                        >
                            <span className="material-symbols-outlined text-[18px]">person</span>
                            Sign In
                        </button>
                    </div>
                </div>

                <div className="flex w-full mt-2">
                    <div
                        className="w-full bg-white rounded-lg flex items-center px-4 h-11 border-0 outline outline-1 outline-slate-200/50 cursor-pointer relative"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            className="bg-transparent border-none text-sm w-full pl-7 focus:ring-0 placeholder:text-slate-400 pointer-events-none font-semibold"
                            placeholder="Search for goods and services..."
                            type="text"
                            readOnly
                        />
                    </div>
                </div>
            </header>

            {/* New Sticky Header (Slides down seamlessly with enhanced timing and fade) */}
            <header 
                className={`fixed top-0 w-full z-50 backdrop-blur-xl px-4 h-[72px] transition-all will-change-[transform,opacity] flex items-center gap-3 ${shouldShowSticky ? 'translate-y-0 opacity-100 scale-100 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]' : '-translate-y-full opacity-0 scale-95 duration-300 ease-out'}`}
                style={{ background: 'linear-gradient(180deg, hsla(224, 39%, 58%, 0.8) 0%, hsla(224, 39%, 81%, 0.4) 100%)' }}
            >
                <button
                    className="flex items-center justify-center w-10 h-11 flex-shrink-0 text-white active:scale-90 transition-transform duration-300"
                    onClick={() => setIsDrawerOpen(true)}
                >
                    <span className="material-symbols-outlined text-xl font-[400]">menu</span>
                </button>
                <div className="flex-1">
                    <div
                        className="w-full bg-white rounded-lg flex items-center px-3 h-10 border-0 outline outline-1 outline-slate-200/50 cursor-pointer relative"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            className="bg-transparent border-none text-[12px] w-full pl-6 focus:ring-0 placeholder:text-slate-400 pointer-events-none font-semibold"
                            placeholder="Search for goods and services..."
                            type="text"
                            readOnly
                        />
                    </div>
                </div>
            </header>

            {/* Main content sits naturally below the static header */}
            <main className="pt-4 sm:pt-6 pb-24 px-4 space-y-8 sm:space-y-10">
                {/* Advertisement/Banner Section */}


                <div className="flex flex-col gap-4">
                    <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-2">
                        {/* Slide 1 - Mission Banner */}
                        <div className="relative h-36 sm:h-44 w-full flex-shrink-0 snap-center rounded-xl sm:rounded-2xl overflow-hidden shadow-lg shadow-brand-blue/5 border border-slate-100">
                            <img
                                alt="Modern industrial facility with heavy machinery"
                                className="absolute inset-0 w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyzZyhMt2iXnNIsZw8YpciLpIpmXzIR7-T6AlkFP_RRj4XMh4Pspvc32IIw57PTZ0FBCL-L1Vo0hgwojKyGXppOj6NJNUIs-vkVIskoJ_0_Fcrse0VZvKXdXV3Nboy6EBcK2cVsyJu2gGTXdT5K03ZiflDYkgq7lZabSuTIRz-P0cmQNsgciFLlm8lHFuG-KHxu_zgpcYsvOKG0KHV7_EiebDyQHtyUNUdqt54jFTym4gXCJSuaAr4a5PnOSUA6cbWtcgEDhXCJWc"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 via-brand-blue/40 to-transparent"></div>
                            <div className="relative h-full flex flex-col justify-center px-8 items-start max-w-[85%] text-left">
                                <span className="text-white/60 font-black text-[10px] tracking-widest mb-2 uppercase">Our Mission</span>
                                <h2 className="text-white font-black text-xl leading-tight mb-1">Empowering Global B2B Commerce</h2>
                                <p className="text-white/70 font-medium text-[11px] leading-relaxed max-w-[200px]">Connecting trusted manufacturers with quality-conscious buyers worldwide.</p>
                            </div>
                        </div>

                        {/* Slide 2 - Help Video */}
                        <div className="relative h-36 sm:h-44 w-full flex-shrink-0 snap-center rounded-xl sm:rounded-2xl overflow-hidden shadow-lg shadow-brand-blue/5 border border-slate-100 bg-slate-900">
                            <Image
                                fill
                                alt="Help Video Tutorial Thumbnail"
                                className="object-cover opacity-60"
                                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                <div className="size-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-3 border border-white/20 active:scale-90 transition-all cursor-pointer">
                                    <span className="material-symbols-outlined text-white text-4xl leading-none">play_arrow</span>
                                </div>
                                <h3 className="text-white font-black text-lg tracking-tight">Watch Tutorial</h3>
                                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">Get started in 60 seconds</p>
                            </div>
                        </div>
                    </div>


                </div>

                {/* Featured Section: Products Near You */}
                <section>
                    <div className="flex justify-between items-end mb-4 sm:mb-6">
                        <div>
                            <h2 className="text- tracking-tight text-xl font-bold">Goods Available Near You</h2>
                        </div>
                    </div>
                    {/* Horizontal High-Density Items */}
                    <div className="divide-y divide-outline-variant/20">
                        {/* Item 1 */}
                        <div className="py-4 sm:py-6 first:pt-0 flex gap-3 sm:gap-4" onClick={() => setIsProductDetailsOpen(true)}>
                            <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-surface-container-low rounded-lg overflow-hidden relative">
                                <img className="w-full h-full object-cover" alt="Close-up of high-grade industrial ball bearings" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKhMJpqzFX5JirQPSttiIp7sjSj-HtaFBqx2A8faI9cPDI5N96myy6KBgvL5cm9q5HlveP7-kTuWr8t_A5UkwCgYd9AoGCahwhHn_Y0QOt7aTmF2H4VgiKGfTvPAYTpixgS8fNOeUmVchq-nABUw68Liem0pRSWhtar_dKIqnLZUuKegILtUY3GcJJlCnArY3uFbjsb2R_2N_nD64cPbdNDzYo7ZEcKSCRGLlT6fi2aNIwP1U39LkX-wiOW7rmvwBCkzsrrajcoBk" />
                                <div className="absolute top-2 left-2 bg-secondary-container text-on-secondary-container text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Verified</div>
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text text-base leading-tight">Precision Grade Ball <br /> Bearings</h3>
                                    </div>
                                    <p className="text-secondary font-extrabold text-lg mt-1">$45.00 <span className="text-on-surface-variant text-[10px] font-medium uppercase tracking-tighter">/ Unit</span></p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <span className="material-symbols-outlined text-amber-500 text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="text-on-surface text-xs font-bold">4.8</span>
                                        <span className="text-outline-variant text-xs">(124)</span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-1 text-on-surface-variant">
                                        <span className="material-symbols-outlined text-xs">store</span>
                                        <span className="text-[11px] font-medium">Atlas Industrial Supplies</span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-0.5 text-on-surface-variant/70">
                                        <span className="material-symbols-outlined text-xs">location_on</span>
                                        <span className="text-[10px] font-medium">Bushrod Island, Monrovia</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <button className="flex-1 bg-primary text-on-primary text-[11px] font-bold py-2 rounded-lg active:scale-95 transition-transform" onClick={(e) => { e.stopPropagation(); openProductDetails(true); }}>Contact Now</button>
                                    <button className="flex-1 border border-brand-blue text-brand-blue text-[11px] font-bold py-2 rounded-lg active:bg-blue-50 flex items-center justify-center gap-1.5" onClick={(e) => { e.stopPropagation(); setCurrentView(View.CHAT_SESSION); }}>
                                        <MessageSquareMore className="w-3.5 h-3.5" />
                                        Message
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Item 2 */}
                        <div className="py-4 sm:py-6 flex gap-3 sm:gap-4" onClick={() => setIsProductDetailsOpen(true)}>
                            <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-surface-container-low rounded-lg overflow-hidden relative">
                                <img className="w-full h-full object-cover" alt="Safety Protocol Gear Set" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwkITnOQ3JK2meqnz-Q15Ofn2JEDFEkvFbuzr4TbT0H5G8qd7qYUD_3VM3pWxbLN-x1_mnrXHXdtCOLr6Y1xQ5VSLpHovzuesGafVVdGnbsMv_yoP_y1diHxDPWhoGCQ4ABrtAmahFYojAp37UsqQwk6XtQU-rSe8vZr7Q9LlRbnZf9zWcbhVdydB1oaESsG54c3ayh5yuH_lOfBEA6G4NjK8BJEc5Oev5iyKr8UMSrKKHZUjgpNlW3VlLLOp2sDxhmbIpXkqCSFY" />
                                <div className="absolute top-2 left-2 bg-secondary-container text-on-secondary-container text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Fast Ship</div>
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text text-base leading-tight">Safety Protocol Gear Set</h3>
                                    </div>
                                    <p className="text-secondary font-extrabold text-lg mt-1">$128.50 <span className="text-on-surface-variant text-[10px] font-medium uppercase tracking-tighter">/ Kit</span></p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <span className="material-symbols-outlined text-amber-500 text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="text-on-surface text-xs font-bold">4.9</span>
                                        <span className="text-outline-variant text-xs">(86)</span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-1 text-on-surface-variant">
                                        <span className="material-symbols-outlined text-xs">store</span>
                                        <span className="text-[11px] font-medium">SafeGuard Solutions Ltd.</span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-0.5 text-on-surface-variant/70">
                                        <span className="material-symbols-outlined text-xs">location_on</span>
                                        <span className="text-[10px] font-medium">Gardnersville, Monrovia</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <button className="flex-1 bg-primary text-on-primary text-[11px] font-bold py-2 rounded-lg active:scale-95 transition-transform" onClick={(e) => { e.stopPropagation(); setIsProductDetailsOpen(true); }}>Contact Now</button>
                                    <button className="flex-1 border border-brand-blue text-brand-blue text-[11px] font-bold py-2 rounded-lg active:bg-blue-50 flex items-center justify-center gap-1.5" onClick={(e) => { e.stopPropagation(); setCurrentView(View.CHAT_SESSION); }}>
                                        <MessageSquareMore className="w-3.5 h-3.5" />
                                        Message
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Interested Goods/Services Section */}
                <section>
                    <div className="flex justify-between items-end mb-4 sm:mb-6">
                        <div>
                            <span className="text font-bold text-xs tracking-widest mb-1 block">Based on your activity</span>
                            <h2 className="text-xl font-extrabold text tracking-tight">Interested Goods &amp; Services</h2>
                        </div>
                    </div>
                    <div className="flex overflow-x-auto gap-3 pb-4 hide-scrollbar snap-x">
                        {[
                            { id: 'machinery', label: 'Machinery', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=200' },
                            { id: 'grains', label: 'Food & Grains', img: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&q=80&w=200' },
                            { id: 'construction', label: 'Building Mats', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=200' },
                            { id: 'apparel', label: 'Apparel', img: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=200' },
                            { id: 'electronics', label: 'Electronics', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=200' },
                            { id: 'medical', label: 'Medical Supplies', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200' },
                            { id: 'energy', label: 'Energy Tech', img: 'https://images.unsplash.com/photo-1509391366360-1e97d5259d81?auto=format&fit=crop&q=80&w=200' },
                            { id: 'logistics', label: 'Logistics Options', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=200' },
                        ].map((topic, i) => (
                            <div
                                key={topic.id}
                                className="flex-shrink-0 w-24 sm:w-28 snap-start flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
                                onClick={() => setIsCategoriesPageOpen(true)}
                            >
                                <div className="w-full aspect-square rounded-lg overflow-hidden mb-1.5 sm:mb-2 relative shadow-sm border border-slate-100 bg-slate-50">
                                    <img
                                        src={topic.img}
                                        alt={topic.label}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                </div>
                                <h4 className="font-bold text-xs text-center leading-tight">{topic.label}</h4>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Category Section: Grains & Cooking Materials */}
                <section>
                    <div className="flex justify-between items-end mb-4 sm:mb-6">
                        <div>
                            <span className="text font-bold text-xs tracking-widest mb-1 block">Top Manufacturers</span>
                            <h2 className="text-xl font-extrabold text tracking-tight">Grains &amp; Cooking Materials</h2>
                        </div>
                    </div>
                    {/* Grid without Containers */}
                    <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-y-10">
                        {/* Product 1 */}
                        <div className="flex flex-col cursor-pointer" onClick={(e) => openReachSeller(e, "Premium Basmati Bulk", "https://lh3.googleusercontent.com/aida-public/AB6AXuDPd9rjIPozlrWK7mB2Bjb906VosUzKDqWQQyW1hzy8BsBG5A541Xor8ut1E1EwCehz9sCXtls3KLQt3Mk58yfe5YKEwL8MK0cJlkAXig8qyEAlMZpysnmLcxSmk9fXWHPd0u3utw6b2G037c5cC2cOoLoWHFFbT96jRgFwjB6sK_qLzO3nONEH6hY6ZsAWaYMPmcaoaNoqpcI8afm3_nFBLqUMyogaJ_-jEpifsODwQaa5oMqgGCWa84inzxvSBC7XjkKIvhCJSKM")}>
                            <div className="h-32 sm:h-40 bg-surface-container-low overflow-hidden rounded-lg">
                                <img className="w-full h-full object-cover" alt="Premium Basmati Bulk" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPd9rjIPozlrWK7mB2Bjb906VosUzKDqWQQyW1hzy8BsBG5A541Xor8ut1E1EwCehz9sCXtls3KLQt3Mk58yfe5YKEwL8MK0cJlkAXig8qyEAlMZpysnmLcxSmk9fXWHPd0u3utw6b2G037c5cC2cOoLoWHFFbT96jRgFwjB6sK_qLzO3nONEH6hY6ZsAWaYMPmcaoaNoqpcI8afm3_nFBLqUMyogaJ_-jEpifsODwQaa5oMqgGCWa84inzxvSBC7XjkKIvhCJSKM" />
                            </div>
                            <div className="pt-3 flex-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="font-bold text-sm line-clamp-1">Premium Basmati Bulk</h4>
                                    <p className="text-on-surface-variant text-[12px] mt-1">Available in 50kg bags</p>
                                    <p className="text-secondary font-bold text-md mt-2">$0.85 <span className="text-[9px] font-medium uppercase tracking-tighter">/ Kg</span></p>
                                </div>
                                <button className="w-full mt-3 bg-secondary/5 text-secondary text-[10px] font-extrabold py-2 rounded-lg tracking-wider hover:bg-secondary/10 transition-colors border border-secondary/10">Reach Supplier</button>
                            </div>
                        </div>
                        {/* Product 2 */}
                        <div className="flex flex-col cursor-pointer" onClick={(e) => openReachSeller(e, "Whole Grain Wheat", "https://lh3.googleusercontent.com/aida-public/AB6AXuBILnvcu5s-Xbr0TNxlp7XRXG7rN0_jj2EnJ1u8Q-528ofDmhIcokhHyEPLVm_oI6J4PeYomB63uykCvvejheTfbQgTRlc45jP6f6S7oMRYBnHsewJphReFev55IjHAYRAe_T671DvHBOt0wADYqEcVR-7C5Ci6Ky-pJsZwab1aQdfPFy8I-EZIrE5GUvz46hBaE0jh5D_k_ytSHQRs19E7eLcOG0ah3B2EqnFak8Dg3XgsynBpm5H0k2qIAiqQfGPYz0zV3l6xD-E")}>
                            <div className="h-32 sm:h-40 bg-surface-container-low overflow-hidden rounded-lg">
                                <img className="w-full h-full object-cover" alt="Whole Grain Wheat" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBILnvcu5s-Xbr0TNxlp7XRXG7rN0_jj2EnJ1u8Q-528ofDmhIcokhHyEPLVm_oI6J4PeYomB63uykCvvejheTfbQgTRlc45jP6f6S7oMRYBnHsewJphReFev55IjHAYRAe_T671DvHBOt0wADYqEcVR-7C5Ci6Ky-pJsZwab1aQdfPFy8I-EZIrE5GUvz46hBaE0jh5D_k_ytSHQRs19E7eLcOG0ah3B2EqnFak8Dg3XgsynBpm5H0k2qIAiqQfGPYz0zV3l6xD-E" />
                            </div>
                            <div className="pt-3 flex-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="font-bold text-sm line-clamp-1">Whole Grain Wheat</h4>
                                    <p className="text-on-surface-variant text-[12px] mt-1">Organic certified local</p>
                                    <p className="text-secondary font-bold text-md mt-2">$0.62 <span className="text-[9px] font-medium uppercase tracking-tighter">/ Kg</span></p>
                                </div>
                                <button className="w-full mt-3 bg-secondary/5 text-secondary text-[10px] font-extrabold py-2 rounded-lg tracking-wider hover:bg-secondary/10 transition-colors border border-secondary/10">Reach Suppliers</button>
                            </div>
                        </div>
                        {/* Product 3 */}
                        <div className="flex flex-col cursor-pointer" onClick={(e) => openReachSeller(e, "Whole Grain Wheat", "https://lh3.googleusercontent.com/aida-public/AB6AXuBILnvcu5s-Xbr0TNxlp7XRXG7rN0_jj2EnJ1u8Q-528ofDmhIcokhHyEPLVm_oI6J4PeYomB63uykCvvejheTfbQgTRlc45jP6f6S7oMRYBnHsewJphReFev55IjHAYRAe_T671DvHBOt0wADYqEcVR-7C5Ci6Ky-pJsZwab1aQdfPFy8I-EZIrE5GUvz46hBaE0jh5D_k_ytSHQRs19E7eLcOG0ah3B2EqnFak8Dg3XgsynBpm5H0k2qIAiqQfGPYz0zV3l6xD-E")}>
                            <div className="h-32 sm:h-40 bg-surface-container-low overflow-hidden rounded-lg">
                                <img className="w-full h-full object-cover" alt="Whole Grain Wheat" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBILnvcu5s-Xbr0TNxlp7XRXG7rN0_jj2EnJ1u8Q-528ofDmhIcokhHyEPLVm_oI6J4PeYomB63uykCvvejheTfbQgTRlc45jP6f6S7oMRYBnHsewJphReFev55IjHAYRAe_T671DvHBOt0wADYqEcVR-7C5Ci6Ky-pJsZwab1aQdfPFy8I-EZIrE5GUvz46hBaE0jh5D_k_ytSHQRs19E7eLcOG0ah3B2EqnFak8Dg3XgsynBpm5H0k2qIAiqQfGPYz0zV3l6xD-E" />
                            </div>
                            <div className="pt-3 flex-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="font-bold text-sm line-clamp-1">Whole Grain Wheat</h4>
                                    <p className="text-on-surface-variant text-[12px] mt-1">Organic certified local</p>
                                    <p className="text-secondary font-bold text-md mt-2">$0.62 <span className="text-[9px] font-medium uppercase tracking-tighter">/ Kg</span></p>
                                </div>
                                <button className="w-full mt-3 bg-secondary/5 text-secondary text-[10px] font-extrabold py-2 rounded-lg tracking-wider hover:bg-secondary/10 transition-colors border border-secondary/10">Reach Supplier</button>
                            </div>
                        </div>
                        {/* Product 4 */}
                        <div className="flex flex-col cursor-pointer" onClick={(e) => openReachSeller(e, "Whole Grain Wheat", "https://lh3.googleusercontent.com/aida-public/AB6AXuBILnvcu5s-Xbr0TNxlp7XRXG7rN0_jj2EnJ1u8Q-528ofDmhIcokhHyEPLVm_oI6J4PeYomB63uykCvvejheTfbQgTRlc45jP6f6S7oMRYBnHsewJphReFev55IjHAYRAe_T671DvHBOt0wADYqEcVR-7C5Ci6Ky-pJsZwab1aQdfPFy8I-EZIrE5GUvz46hBaE0jh5D_k_ytSHQRs19E7eLcOG0ah3B2EqnFak8Dg3XgsynBpm5H0k2qIAiqQfGPYz0zV3l6xD-E")}>
                            <div className="h-32 sm:h-40 bg-surface-container-low overflow-hidden rounded-lg">
                                <img className="w-full h-full object-cover" alt="Whole Grain Wheat" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBILnvcu5s-Xbr0TNxlp7XRXG7rN0_jj2EnJ1u8Q-528ofDmhIcokhHyEPLVm_oI6J4PeYomB63uykCvvejheTfbQgTRlc45jP6f6S7oMRYBnHsewJphReFev55IjHAYRAe_T671DvHBOt0wADYqEcVR-7C5Ci6Ky-pJsZwab1aQdfPFy8I-EZIrE5GUvz46hBaE0jh5D_k_ytSHQRs19E7eLcOG0ah3B2EqnFak8Dg3XgsynBpm5H0k2q6IAiqQfGPYz0zV3l6xD-E" />
                            </div>
                            <div className="pt-3 flex-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="font-bold text-sm line-clamp-1">Whole Grain Wheat</h4>
                                    <p className="text-on-surface-variant text-[12px] mt-1">Organic certified local</p>
                                    <p className="text-secondary font-bold text-md mt-2">$0.62 <span className="text-[9px] font-medium uppercase tracking-tighter">/ Kg</span></p>
                                </div>
                                <button className="w-full mt-3 bg-secondary/5 text-secondary text-[10px] font-extrabold py-2 rounded-lg tracking-wider hover:bg-secondary/10 transition-colors border border-secondary/10">Reach Supplier</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Category Quick Links Section */}
                <section className="border-t-1 border-b-1 border-gray-300 py-5">
                    <h2 className="text-xl font-extrabold text tracking-tight mb-4 sm:mb-6">Looking for something, like?</h2>
                    <div className="grid grid-cols-4 gap-y-5 sm:gap-y-8 gap-x-4">
                        {[
                            { name: "Raw Materials", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=200" },
                            { name: "Construction", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=200" },
                            { name: "Electronics", img: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=200" },
                            { name: "Construction", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=200" },
                            { name: "Electronics", img: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=200" },
                            { name: "Machinery", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=200" },
                            { name: "Agriculture", img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=200" },
                            { name: "All Categories", img: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=200" }
                        ].map((cat, i) => (
                            <div key={i} className="flex flex-col items-center text-center group active:scale-95 duration-200 cursor-pointer" onClick={() => setIsCategoriesPageOpen(true)}>
                                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden relative mb-1.5 sm:mb-2 group-hover:shadow-md transition-all border border-slate-100 flex items-center justify-center ${cat.name === "All Categories" ? 'bg-white shadow-sm' : 'bg-slate-50'}`}>
                                    {cat.name === "All Categories" ? (
                                        <LayoutGrid className="w-6 h-6 text-brand-blue" />
                                    ) : (
                                        <Image
                                            fill
                                            className="object-cover"
                                            src={cat.img}
                                            alt={cat.name}
                                        />
                                    )}
                                </div>
                                <span className="text-[11px] font-bold text-on-surface leading-tight">{cat.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Newest Liberian Manufacturers Section */}
                <section>
                    <div className="flex justify-between items-end mb-4 sm:mb-6">
                        <div>
                            <span className="text font-bold text-xs uppercase tracking-widest mb-1 block">Local Spotlight</span>
                            <h2 className="text tracking-tight text-xl font-bold">Liberian Made Businesses</h2>
                        </div>
                    </div>
                    <div className="flex overflow-x-auto gap-3 pb-4 hide-scrollbar snap-x">
                        {/* Manufacturer Card 1 */}
                        <div className="flex-shrink-0 w-56 sm:w-64 snap-start flex flex-col">
                            <div className="w-full aspect-square bg-surface-container-low overflow-hidden rounded-lg mb-3 relative">
                                <img className="w-full h-full object-cover" alt="Monrovia Iron Works" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3M6u7e_rL7mQ-W0E-m5R8zP8GvV-D-T6fX-Z9K-y-p9v_m1Q-t9Z-S5V-T6fX-Z9K-y-p9v_m1Q-t9Z-S5V-T6fX-Z9K-y-p9v_m1Q" />
                                <div className="absolute top-2 left-2 bg-amber-400 text-[#000042] text-[9px] px-2 py-1 rounded-sm font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                                    <BadgeCheck className="w-3 h-3 text-[#000042]" />
                                    Verified
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <h4 className="font-bold text-base text">Monrovia Iron Works</h4>
                                <p className="text-on-surface-variant text-[12px] mt-1">Metal Fabrication &amp; Engineering</p>
                                <div className="flex items-center gap-1 mt-2 text-on-surface-variant">
                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                    <span className="text-[11px] font-medium">Bushrod Island, Monrovia</span>
                                </div>
                                <div className="flex items-center gap-1.5 mt-1.5">
                                    <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-700">4.8</span>
                                    <span className="text-[10px] text-slate-400">(56)</span>
                                </div>
                                <button className="w-full mt-4 bg-[#000042] text-white text-[11px] font-extrabold py-3 rounded-lg uppercase tracking-wider active:scale-[0.98] transition-all shadow-md shadow-[#000042]/10">Check Us Out</button>
                            </div>
                        </div>
                        {/* Manufacturer Card 2 */}
                        <div className="flex-shrink-0 w-56 sm:w-64 snap-start flex flex-col">
                            <div className="w-full aspect-square bg-surface-container-low overflow-hidden rounded-lg mb-3 relative">
                                <img className="w-full h-full object-cover" alt="Liberia Textile Group" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5N8v9w0-P2v-Q7R-S5T-V-W8X-Y-Z1A-B2C-D3E-F4G-H5I-J6K-L7M-N8O-P9Q" />
                                <div className="absolute top-2 left-2 bg-amber-400 text-[#000042] text-[9px] px-2 py-1 rounded-sm font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                                    <BadgeCheck className="w-3 h-3 text-[#000042]" />
                                    Verified
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <h4 className="font-bold text-base text">Liberia Textile Group</h4>
                                <p className="text-on-surface-variant text-[12px] mt-1">Industrial Garments &amp; Fabrics</p>
                                <div className="flex items-center gap-1 mt-2 text-on-surface-variant">
                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                    <span className="text-[11px] font-medium">Freeport Zone, Monrovia</span>
                                </div>
                                <div className="flex items-center gap-1.5 mt-1.5">
                                    <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-700">5.0</span>
                                    <span className="text-[10px] text-slate-400">(82)</span>
                                </div>
                                <button className="w-full mt-4 bg-[#000042] text-white text-[11px] font-extrabold py-3 rounded-lg uppercase tracking-wider active:scale-[0.98] transition-all shadow-md shadow-[#000042]/10">Check Us Out</button>
                            </div>
                        </div>
                        {/* Manufacturer Card 3 */}
                        <div className="flex-shrink-0 w-64 snap-start flex flex-col">
                            <div className="w-full aspect-square bg-surface-container-low overflow-hidden rounded-lg mb-3 relative">
                                <img className="w-full h-full object-cover" alt="Kakata Wood Processing" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9R0S1T2U3V4W5X6Y7Z8A9B0C1D2E3F4G5H6I7J8K9L0M1N2O3P4Q5R6S7T8U9V0W" />
                                <div className="absolute top-2 left-2 bg-amber-400 text-[#000042] text-[9px] px-2 py-1 rounded-sm font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                                    <BadgeCheck className="w-3 h-3 text-[#000042]" />
                                    Verified
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <h4 className="font-bold text-base text">Kakata Wood Processing</h4>
                                <p className="text-on-surface-variant text-[12px] mt-1">Timber &amp; Custom Furniture</p>
                                <div className="flex items-center gap-1 mt-2 text-on-surface-variant">
                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                    <span className="text-[11px] font-medium">Margibi County, Liberia</span>
                                </div>
                                <div className="flex items-center gap-1.5 mt-1.5">
                                    <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-700">4.7</span>
                                    <span className="text-[10px] text-slate-400">(34)</span>
                                </div>
                                <button className="w-full mt-4 bg-[#000042] text-white text-[11px] font-extrabold py-3 rounded-lg uppercase tracking-wider active:scale-[0.98] transition-all shadow-md shadow-[#000042]/10">Check Us Out</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recent Quote Requests Section */}
                <section>
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <span className="text font-bold text-xs uppercase tracking-widest mb-1 block">Quick Request</span>
                            <h2 className="text tracking-tight text-xl font-bold">Send Quote Requests</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-x-2 gap-y-8">
                        {[
                            { name: "Heavy Duty Industrial Pump", supplier: "Six", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfE1vWrW9fM1qDnsVTCzFqc2Jy15k7VP7jDw0XiI7xBOfxl7CWNKpfKdjt6a1Cn33Jpdq5MfcO_of6I22NUlUj36lgqyMCeOvmJR8GitEkCqQZiUjbEuJkeyFlPZbJJZNRjRGdjiPQ3BDTz41vT-C9Kf0fujSyKMpFqKKUoHHDvx3dsV1nvNg0cHQstk1BrURc7ItmCIAj3X9NCmR-lsetujm_o2q8jh4cOHCBQdIkTc-ghPhMwHQbQxnkO0k_crtHgpSqnHaeyeE" },
                            { name: "Precision Grade Ball Bearings", supplier: "Atlas", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKhMJpqzFX5JirQPSttiIp7sjSj-HtaFBqx2A8faI9cPDI5N96myy6KBgvL5cm9q5HlveP7-kTuWr8t_A5UkwCgYd9AoGCahwhHn_Y0QOt7aTmF2H4VgiKGfTvPAYTpixgS8fNOeUmVchq-nABUw68Liem0pRSWhtar_dKIqnLZUuKegILtUY3GcJJlCnArY3uFbjsb2R_2N_nD64cPbdNDzYo7ZEcKSCRGLlT6fi2aNIwP1U39LkX-wiOW7rmvwBCkzsrrajcoBk" },
                            { name: "Premium Basmati Bulk Export", supplier: "Six", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPd9rjIPozlrWK7mB2Bjb906VosUzKDqWQQyW1hzy8BsBG5A541Xor8ut1E1EwCehz9sCXtls3KLQt3Mk58yfe5YKEwL8MK0cJlkAXig8qyEAlMZpysnmLcxSmk9fXWHPd0u3utw6b2G037c5cC2cOoLoWHFFbT96jRgFwjB6sK_qLzO3nONEH6hY6ZsAWaYMPmcaoaNoqpcI8afm3_nFBLqUMyogaJ_-jEpifsODwQaa5oMqgGCWa84inzxvSBC7XjkKIvhCJSKM" },
                            { name: "Raw Portland Cement Grade A", supplier: "Atlas", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=200" },
                            { name: "Iron Rebar 12mm Standard", supplier: "Monrovia Iron", img: "https://images.unsplash.com/photo-1541933224312-45e59273c88c?auto=format&fit=crop&q=80&w=200" },
                            { name: "Industrial Uniform Fabrics", supplier: "Liberia Textile", img: "https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?auto=format&fit=crop&q=80&w=200" },
                            { name: "Whole Grain Wheat Bulk", supplier: "Six", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBILnvcu5s-Xbr0TNxlp7XRXG7rN0_jj2EnJ1u8Q-528ofDmhIcokhHyEPLVm_oI6J4PeYomB63uykCvvejheTfbQgTRlc45jP6f6S7oMRYBnHsewJphReFev55IjHAYRAe_T671DvHBOt0wADYqEcVR-7C5Ci6Ky-pJsZwab1aQdfPFy8I-EZIrE5GUvz46hBaE0jh5D_k_ytSHQRs19E7eLcOG0ah3B2EqnFak8Dg3XgsynBpm5H0k2qIAiqQfGPYz0zV3l6xD-E" },
                            { name: "Refined White Sugar 50kg", supplier: "Six", img: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&q=80&w=200" },
                            { name: "Agricultural Solar Panels", supplier: "Atlas", img: "https://images.unsplash.com/photo-1509391366360-1e97d5259d81?auto=format&fit=crop&q=80&w=400" }
                        ].map((quote, idx) => (
                            <div key={idx} className="flex flex-col gap-2 active:scale-95 transition-all cursor-pointer" onClick={() => openProductDetails(false)}>
                                <div className="w-full aspect-square bg-slate-50 rounded-lg overflow-hidden relative">
                                    <img
                                        src={quote.img}
                                        alt={quote.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col px-0.5 mt-1">
                                    <h4 className="font-bold text-[10px] text-slate-800 leading-[1.2] line-clamp-1 h-auto tracking-tight">{quote.name}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Drawer
                currentView={currentView}
                isOpen={isDrawerOpen}
                isOnboarding={isOnboarding}
                onClose={() => setIsDrawerOpen(false)}
                onNavigate={handleNavigate}
            />

            <ReachSellerOverlay
                isOpen={isReachSellerOpen}
                onClose={() => setIsReachSellerOpen(false)}
                productName={reachSellerProduct}
                productImage={reachSellerImage}
            />

            <SignInOverlay
                isOpen={isSignInOpen}
                onClose={() => setIsSignInOpen(false)}
                onSwitchToSignUp={() => handleNavigate(View.SIGNUP)}
            />
        </div>
    );
};

export default MobileHome;
