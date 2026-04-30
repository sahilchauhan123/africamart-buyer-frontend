"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronRight, ArrowRight, ShieldCheck, Truck, Clock, Rocket, Zap, Star, Shield, HelpCircle as HelpIcon, Send, MapPin } from 'lucide-react';
import Header from './Header';
import Image from 'next/image';
import logo from '../logo.png';

// --- UI Components ---
const ProductCard = ({ name, price, unit, image, supplier, location, rating = 4.5, reviews = 0, isVerified = false, isLocal = false, onClick, onContact }: any) => {
    return (
        <div
            className="bg-white rounded-lg sm:rounded-sm overflow-hidden border border-slate-100 flex flex-col h-full cursor-pointer group transition-all hover:shadow-lg hover:-translate-y-0.5"
            onClick={onClick}
        >
            <div className="aspect-square bg-slate-50 relative overflow-hidden">
                <img
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={String(image).replace("_800", "_400")}
                />
                {isVerified && (
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">VERIFIED</span>
                )}
                {isLocal && (
                    <span className="absolute top-2 left-2 bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">LOCAL</span>
                )}
            </div>
            <div className="p-2.5 flex-1 flex flex-col">
                <h3 className="font-headline font-bold text-slate-800 text-sm leading-tight line-clamp-2 mb-1 group-hover:text-[#0026C0] transition-colors">{name.length > 35 ? name.substring(0, 35) + "..." : name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-base font-black text-[#0026C0]">{price}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{" / " + unit}</span>
                </div>

                <button
                    className="w-full bg-[#0026C0] text-white text-xs font-bold py-2 rounded sm:rounded-sm transition-all flex items-center justify-center gap-2 mb-2 hover:bg-[#001da2] active:scale-95 shadow-sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        onContact?.(e);
                    }}
                >
                    <Send className="w-3.5 h-3.5" />
                    Contact Supplier
                </button>

                <div className="mt-auto space-y-0.5 border-t border-slate-50 pt-1.5">
                    {supplier && (
                        <p className="text-[10px] font-medium text-slate-500 truncate">{supplier}</p>
                    )}
                    {location && (
                        <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{location}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Page Components ---
import DesktopSearchResult from './DesktopSearchResult';
import Link from 'next/link';

export default function DesktopHome({ initialSearchQuery = '', initialProducts = [], initialFacets = [], initialCategories = [] }: { initialSearchQuery?: string, initialProducts?: any[], initialFacets?: any[], initialCategories?: any[] }) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
    const [submittedQuery, setSubmittedQuery] = useState(initialSearchQuery || '');
    const [isSearchSubmitted, setIsSearchSubmitted] = useState(!!initialSearchQuery);

    const FALLBACK_CATEGORY_IMAGES: Record<string, string> = {
        'raw-materials': "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80",
        'construction': "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80",
        'electronics': "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
        'machinery': "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=400&q=80",
        'agriculture': "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80"
    };

    const getCategoryImage = (cat: any) => {
        if (cat.img_url) return cat.img_url;
        return FALLBACK_CATEGORY_IMAGES[cat.slug] || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80";
    };

    const createSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .trim()
            .replace(/\s+/g, '-')         // Replace spaces with hyphens
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleProductClick = (productData: any) => {
        const slug = createSlug(productData.name || productData.title);
        router.push(`/product/${productData.id}/${slug}`);
    };

    useEffect(() => {
        setSearchQuery(initialSearchQuery || '');
        setSubmittedQuery(initialSearchQuery || '');
        setIsSearchSubmitted(!!initialSearchQuery);
    }, [initialSearchQuery]);

    return (
        <div className="bg-slate-50 font-body text-slate-900 min-h-screen">
            <Header />

            {isSearchSubmitted ? (
                <DesktopSearchResult
                    key={submittedQuery}
                    searchQuery={submittedQuery}
                    onProductClick={handleProductClick}
                    initialProducts={initialProducts}
                    initialFacets={initialFacets}
                    initialQuery={initialSearchQuery}
                />
            ) : (
                <div className="max-w-[1600px] mx-auto">
                    <main className="w-full p-6 lg:p-8 space-y-12">
                        <section className="relative h-[280px] lg:h-[420px] rounded-2xl overflow-hidden shadow-2xl bg-slate-900 flex items-center">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="hidden lg:block absolute inset-0 w-full h-full object-cover z-0 opacity-80"
                            >
                                <source src="https://pub-f7a836f6fb2b4d8dbef935fc1009971a.r2.dev/lassomaherosectionvideo.mp4" type="video/mp4" />
                            </video>
                            <img
                                src="https://assets.weforum.org/article/image/large_S-gx3IJcoovd78Bcrw_B-lzvxi9W9g3W38AmJS2IRVY.png"
                                alt="African Trade"
                                className="lg:hidden absolute inset-0 w-full h-full object-cover z-0 opacity-60"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent z-10"></div>
                            <div className="relative z-20 px-6 lg:px-12 space-y-4 lg:space-y-6 max-w-2xl text-left">
                                <h1 className="text-3xl lg:text-5xl font-black text-white leading-tight tracking-tight">Africa's First <br className="lg:hidden" /> B2B Marketplace.</h1>
                                <p className="text-slate-200 text-sm lg:text-lg">First marketplace for African businesses, manufacturers, suppliers and buyers connect with each other</p>
                                <Link href="/search?q=*" className="bg-[#0026C0] hover:bg-[#0020A0] text-white font-bold px-6 py-3 lg:px-8 lg:py-4 rounded-md transition-all shadow-lg flex items-center gap-2 group text-sm lg:text-base w-fit">
                                    Browse Products <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </section>

                        {/* Looking for something, like? (Square Categories) */}
                        <section className="py-8 lg:py-16 flex flex-col items-center">
                            <h2 className="text-xl lg:text-3xl font-black text-slate-900 mb-8 lg:mb-10 tracking-tight">Looking for something, like?</h2>
                            <div className="flex flex-wrap justify-center gap-4 lg:gap-10">
                                {(initialCategories || []).slice(0, 5).map((cat: any, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col items-center gap-3 lg:gap-5 group cursor-pointer"
                                        onClick={() => router.push(`/categories/${cat.slug}`)}
                                    >
                                        <div className="w-24 h-24 lg:w-48 lg:h-48 rounded-2xl lg:rounded-[32px] overflow-hidden border-2 border-transparent group-hover:border-[#0026C0] transition-all duration-500 shadow-xl bg-white p-1">
                                            <div className="w-full h-full rounded-xl lg:rounded-[24px] overflow-hidden">
                                                <img src={getCategoryImage(cat)} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            </div>
                                        </div>
                                        <span className="text-[10px] lg:text-[13px] font-black text-slate-700 uppercase tracking-widest group-hover:text-[#0026C0] transition-colors">{cat.name}</span>
                                    </div>
                                ))}
                                <div
                                    onClick={() => router.push('/categories')}
                                    className="flex flex-col items-center gap-3 lg:gap-5 group cursor-pointer"
                                >
                                    <div className="w-24 h-24 lg:w-48 lg:h-48 rounded-2xl lg:rounded-[32px] bg-slate-900 flex items-center justify-center text-white shadow-xl group-hover:bg-[#0026C0] transition-all duration-500">
                                        <div className="flex flex-col items-center gap-1">
                                            <ChevronRight className="w-6 h-6 lg:w-10 lg:h-10 group-hover:translate-x-1 transition-transform" />
                                            <span className="text-[10px] lg:text-xs font-black uppercase tracking-widest lg:hidden">More</span>
                                        </div>
                                    </div>
                                    <span className="hidden lg:block text-[10px] lg:text-[13px] font-black text-slate-700 uppercase tracking-widest group-hover:text-[#0026C0] transition-colors">See All</span>
                                </div>
                            </div>
                        </section>

                        {/* Sourcing Request Banner */}
                        <section className="relative bg-[#0026C0] rounded-xl p-6 lg:p-10 overflow-hidden shadow-2xl">
                            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
                                <div className="text-left space-y-2 lg:space-y-3 max-w-xl">
                                    <div className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full text-[9px] lg:text-[10px] font-black uppercase tracking-widest">
                                        <Rocket className="w-3 h-3" />
                                        B2B Fast Track
                                    </div>
                                    <h2 className="text-2xl lg:text-4xl font-black text-white leading-tight">Can't find it?</h2>
                                    <p className="text-blue-100 text-sm lg:text-base font-medium">Post your buying request and get verified quotes fast.</p>
                                </div>

                                <div className="w-full lg:max-w-3xl bg-white rounded-lg p-1 flex flex-col md:flex-row gap-1.5 shadow-inner">
                                    <input
                                        type="text"
                                        placeholder="What do you need?"
                                        className="flex-1 h-11 lg:h-12 px-4 lg:px-6 bg-transparent outline-none font-bold text-slate-700 text-sm border-b md:border-b-0 md:border-r border-slate-100"
                                    />
                                    <div className="flex items-center">
                                        <input
                                            type="number"
                                            placeholder="Qty"
                                            className="w-20 lg:w-24 h-11 lg:h-12 px-4 bg-transparent outline-none font-bold text-slate-700 text-sm"
                                        />
                                        <div className="h-6 w-px bg-slate-100"></div>
                                        <select className="h-11 lg:h-12 px-3 lg:px-4 bg-transparent outline-none font-black text-slate-600 text-[10px] lg:text-xs cursor-pointer appearance-none">
                                            <option>Units</option>
                                            <option>Kg</option>
                                            <option>Tons</option>
                                        </select>
                                        <ChevronDown className="w-3 h-3 text-slate-400 mr-2" />
                                    </div>
                                    <button className="bg-[#0026C0] hover:bg-[#001da2] text-white font-black px-6 lg:px-10 py-3 lg:py-3 rounded-md transition-all flex items-center justify-center gap-2 group whitespace-nowrap text-sm">
                                        Sourcing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </section>

                        <section className="py-2">
                            <div className="flex items-center justify-between mb-6 lg:mb-8">
                                <div>
                                    <h2 className="text-xl lg:text-3xl font-black tracking-tight text-slate-900">Featured Products</h2>
                                    <p className="text-slate-500 text-xs lg:text-sm font-medium">Top-rated goods from across the continent.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                                {(initialProducts && initialProducts.length > 0 ? initialProducts : [])
                                    .map((p, idx) => (
                                        <ProductCard
                                            key={idx}
                                            {...p}
                                            onClick={() => handleProductClick(p)}
                                        />
                                    ))}
                            </div>
                        </section>

                        {/* Why Choose Us Section
                        <section className="py-8 lg:py-12 border-t border-slate-100">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                                <div className="space-y-3 lg:space-y-4 text-center lg:text-left">
                                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0026C0] mx-auto lg:mx-0">
                                        <ShieldCheck className="w-6 h-6 lg:w-8 lg:h-8" />
                                    </div>
                                    <h3 className="text-lg lg:text-xl font-bold text-slate-900">Verified Sellers Only</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">Every manufacturer undergoes a rigorous 5-step background check.</p>
                                </div>
                                <div className="space-y-3 lg:space-y-4 text-center lg:text-left">
                                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto lg:mx-0">
                                        <Truck className="w-6 h-6 lg:w-8 lg:h-8" />
                                    </div>
                                    <h3 className="text-lg lg:text-xl font-bold text-slate-900">Global Logistics</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">Integrated shipping solutions across Africa.</p>
                                </div>
                                <div className="space-y-3 lg:space-y-4 text-center lg:text-left">
                                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mx-auto lg:mx-0">
                                        <Zap className="w-6 h-6 lg:w-8 lg:h-8" />
                                    </div>
                                    <h3 className="text-lg lg:text-xl font-bold text-slate-900">Bulk Pricing</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">Connect directly with factories to unlock manufacturing prices.</p>
                                </div>
                            </div>
                        </section> */}

                        {/* Seller CTA Banner */}
                        <section className="bg-[#0026C0] rounded-3xl p-8 lg:p-12 overflow-hidden relative shadow-2xl">
                            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path d="M0 0 L100 0 L100 100 Z" fill="white" />
                                </svg>
                            </div>
                            <div className="relative z-10 max-w-2xl space-y-4 lg:space-y-6">
                                <h2 className="text-2xl lg:text-4xl font-black text-white leading-tight">Want to take your business online?</h2>
                                <p className="text-blue-100 text-sm lg:text-lg">Sign up as a manufacturer or supplier and reach customers across the continent.</p>
                                <div className="flex flex-wrap gap-3 lg:gap-4">
                                    <Link href="https://seller.lasomaa.com" className="bg-white text-[#0026C0] font-black px-6 py-3 lg:px-8 lg:py-4 rounded-xl hover:bg-blue-50 transition-all shadow-xl text-sm lg:text-base">
                                        Start Selling
                                    </Link>
                                    <Link href="/contact" className="bg-white/10 text-white border border-white/20 font-bold px-6 py-3 lg:px-8 lg:py-4 rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm text-sm lg:text-base">
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </main>

                    {/* Footer Section */}
                    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-6 lg:px-8 mt-12">
                        <div className="max-w-[1600px] mx-auto">
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                                <div className="col-span-2 space-y-6">
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={logo}
                                            alt="LASOMAA"
                                            width={143}
                                            height={28}
                                            className="object-contain"
                                        />
                                    </div>
                                    <p className="text-slate-500 max-w-sm leading-relaxed">
                                        First Digital Marketplace in Africa connecting buyers with manufacturers,suppliers and exporters.
                                    </p>

                                </div>

                                <div className="space-y-6">
                                    <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Help & Support</h4>
                                    <ul className="space-y-3 text-slate-500 text-sm font-medium">
                                        <li className="hover:text-[#0026C0] cursor-pointer">Contact Support</li>
                                        <li className="hover:text-[#0026C0] cursor-pointer">FAQ</li>
                                        {/* <li className="hover:text-[#0026C0] cursor-pointer">Logistics Partners</li> */}
                                        {/* <li className="hover:text-[#0026C0] cursor-pointer">Safety Guidelines</li> */}
                                    </ul>
                                </div>
                                <div className="space-y-6">
                                    <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Business</h4>
                                    <ul className="space-y-3 text-slate-500 text-sm font-medium">
                                        <li className="hover:text-[#0026C0] cursor-pointer">
                                            <a href="https://seller.lasomaa.com" target="_blank" rel="noopener noreferrer">Sell on Lasomaa</a>
                                        </li>
                                        {/* <li className="hover:text-[#0026C0] cursor-pointer">Enterprise Solutions</li> */}
                                        {/* <li className="hover:text-[#0026C0] cursor-pointer">Market Analysis</li>
                                        <li className="hover:text-[#0026C0] cursor-pointer">Advertise</li> */}
                                    </ul>
                                </div>
                            </div>
                            <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">© 2026 Lasomaa B2B. All rights reserved.</p>
                                <div className="flex gap-8">
                                    <span className="text-slate-400 text-[10px] font-black hover:text-[#0026C0] cursor-pointer uppercase tracking-widest">Privacy Policy</span>
                                    <span className="text-slate-400 text-[10px] font-black hover:text-[#0026C0] cursor-pointer uppercase tracking-widest">Terms of Service</span>
                                    <span className="text-slate-400 text-[10px] font-black hover:text-[#0026C0] cursor-pointer uppercase tracking-widest">Cookie Settings</span>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            )}
        </div>
    );
}
