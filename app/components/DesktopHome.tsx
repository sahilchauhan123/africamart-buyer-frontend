"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronRight, ArrowRight, ShieldCheck, Truck, Clock, Rocket, Zap, Star, Shield, HelpCircle as HelpIcon, Send, MapPin } from 'lucide-react';
import Header from './Header';

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
                    src={image}
                />
                {isVerified && (
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">VERIFIED</span>
                )}
                {isLocal && (
                    <span className="absolute top-2 left-2 bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">LOCAL</span>
                )}
            </div>
            <div className="p-2.5 flex-1 flex flex-col">
                <h3 className="font-headline font-bold text-slate-800 text-sm leading-tight line-clamp-2 mb-1 group-hover:text-[#0026C0] transition-colors">{name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-base font-black text-[#0026C0]">{price}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{unit}</span>
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

export default function DesktopHome({ initialSearchQuery = '', initialProducts = [], initialFacets = [] }: { initialSearchQuery?: string, initialProducts?: any[], initialFacets?: any[] }) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
    const [submittedQuery, setSubmittedQuery] = useState(initialSearchQuery || '');
    const [isSearchSubmitted, setIsSearchSubmitted] = useState(!!initialSearchQuery);

    const createSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .trim();
    };

    const handleProductClick = (productData: any) => {
        const slug = createSlug(productData.name || productData.title);
        const idOrSlug = productData.id ? `${slug}-${productData.id}` : slug;
        router.push(`/product/${idOrSlug}`);
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
                        <section className="relative h-[420px] rounded-2xl overflow-hidden shadow-2xl bg-slate-900 flex items-center">
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent z-10"></div>
                            <div className="relative z-20 px-12 space-y-6 max-w-2xl text-left">
                                <h1 className="text-5xl font-black text-white leading-tight tracking-tight">Africa's Leading B2B Marketplace.</h1>
                                <p className="text-slate-200 text-lg">Connect with over 10,000+ verified global manufacturers and unlock exclusive bulk pricing.</p>
                                <button className="bg-[#0026C0] hover:bg-[#0020A0] text-white font-bold px-8 py-4 rounded-md transition-all shadow-lg flex items-center gap-2 group text-base">
                                    Browse Quality Products <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </section>

                        {/* Looking for something, like? (Circular Categories) */}
                        <section className="py-12 flex flex-col items-center">
                            <h2 className="text-3xl font-bold text-slate-900 mb-12">Looking for something, like?</h2>
                            <div className="flex flex-wrap justify-center gap-10 lg:gap-16">
                                {[
                                    { name: "Raw Materials", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80" },
                                    { name: "Construction", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" },
                                    { name: "Electronics", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
                                    { name: "Machinery", img: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=400&q=80" },
                                    { name: "Agriculture", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80" }
                                ].map((cat, idx) => (
                                    <div key={idx} className="flex flex-col items-center gap-4 group cursor-pointer">
                                        <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#0026C0] transition-all duration-300 shadow-lg">
                                            <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <span className="text-xs font-black text-slate-700 uppercase tracking-wider group-hover:text-[#0026C0] transition-colors">{cat.name}</span>
                                    </div>
                                ))}
                                <div
                                    onClick={() => router.push('/categories')}
                                    className="flex flex-col items-center gap-4 group cursor-pointer"
                                >
                                    <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-lg group-hover:bg-[#0026C0] transition-all duration-300">
                                        <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <span className="text-xs font-black text-slate-700 uppercase tracking-wider group-hover:text-[#0026C0] transition-colors">All Categories</span>
                                </div>
                            </div>
                        </section>

                        {/* Sourcing Request Banner */}
                        <section className="relative bg-[#0026C0] rounded-xl p-8 lg:p-10 overflow-hidden shadow-2xl">
                            <div className="flex flex-col xl:flex-row items-center justify-between gap-8 relative z-10">
                                <div className="text-left space-y-3 max-w-xl">
                                    <div className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        <Rocket className="w-3 h-3" />
                                        B2B Fast Track
                                    </div>
                                    <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight">Can't find what you're looking for?</h2>
                                    <p className="text-blue-100 font-medium">Post your buying request and get verified quotes within 24 hours.</p>
                                </div>

                                <div className="w-full lg:max-w-3xl bg-white rounded-lg p-1.5 flex flex-col md:flex-row gap-2 shadow-inner">
                                    <input
                                        type="text"
                                        placeholder="Tell us what you need..."
                                        className="flex-1 h-12 px-6 bg-transparent outline-none font-bold text-slate-700 border-b md:border-b-0 md:border-r border-slate-100"
                                    />
                                    <div className="flex items-center">
                                        <input
                                            type="number"
                                            placeholder="Qty"
                                            className="w-24 h-12 px-4 bg-transparent outline-none font-bold text-slate-700"
                                        />
                                        <div className="h-8 w-px bg-slate-100"></div>
                                        <select className="h-12 px-4 bg-transparent outline-none font-black text-slate-600 text-xs cursor-pointer appearance-none">
                                            <option>Units</option>
                                            <option>Kg</option>
                                            <option>Tons</option>
                                            <option>Bags</option>
                                        </select>
                                        <ChevronDown className="w-4 h-4 text-slate-400 mr-2" />
                                    </div>
                                    <button className="bg-[#0026C0] hover:bg-[#001da2] text-white font-black px-10 py-3 rounded-md transition-all flex items-center justify-center gap-2 group whitespace-nowrap">
                                        Sourcing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </section>

                        <section className="py-2">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-3xl font-black tracking-tight text-slate-900">Featured Manufacturers</h2>
                                    <p className="text-slate-500 font-medium">Top-rated goods from across the continent.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {(initialProducts && initialProducts.length > 0 ? initialProducts : [
                                    { name: "Industrial Milling Machine", price: "₹2,50,000", unit: "Unit", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop", supplier: "Global Machineries Ltd", location: "Mumbai, India", isVerified: true },
                                    { name: "Raw Coffee Beans - Bulk", price: "₹450", unit: "kg", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop", supplier: "East Africa Exports", location: "Addis Ababa, Ethiopia", isVerified: true },
                                    { name: "Hydraulic Jack 10T", price: "₹12,400", unit: "piece", image: "https://images.unsplash.com/photo-1530124560677-bdaea92c5a31?w=800&auto=format&fit=crop", supplier: "AutoTools India", location: "Pune, India", isVerified: false },
                                    { name: "Solar Panel 400W Mono", price: "₹8,500", unit: "panel", image: "https://images.unsplash.com/photo-1509391366360-fe5bb6583e2c?w=800&auto=format&fit=crop", supplier: "GreenEnergy Solutions", location: "Nairobi, Kenya", isVerified: true },
                                    { name: "Textile Cotton Fabric", price: "₹120", unit: "meter", image: "https://images.unsplash.com/photo-1520038410233-7141f71df421?w=800&auto=format&fit=crop", supplier: "Surat Textiles", location: "Surat, India", isVerified: false }
                                ]).map((p, idx) => (
                                    <ProductCard
                                        key={idx}
                                        {...p}
                                        onClick={() => handleProductClick(p)}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Why Choose Us Section */}
                        <section className="py-12 border-t border-slate-100">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                <div className="space-y-4">
                                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0026C0]">
                                        <ShieldCheck className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">Verified Sellers Only</h3>
                                    <p className="text-slate-500 leading-relaxed">Every manufacturer undergoes a rigorous 5-step background check ensuring quality and trust.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                                        <Truck className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">Global Logistics</h3>
                                    <p className="text-slate-500 leading-relaxed">Integrated shipping solutions that handle customs and last-mile delivery across Africa.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                                        <Zap className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">Bulk Pricing</h3>
                                    <p className="text-slate-500 leading-relaxed">Connect directly with factories to unlock manufacturing prices without the middleman markups.</p>
                                </div>
                            </div>
                        </section>

                        {/* Seller CTA Banner */}
                        <section className="bg-[#0026C0] rounded-3xl p-12 overflow-hidden relative shadow-2xl">
                            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path d="M0 0 L100 0 L100 100 Z" fill="white" />
                                </svg>
                            </div>
                            <div className="relative z-10 max-w-2xl space-y-6">
                                <h2 className="text-4xl font-black text-white">Ready to take your manufacturing business global?</h2>
                                <p className="text-blue-100 text-lg">Join 50,000+ African enterprises already selling on AfricaMart and reach millions of buyers worldwide.</p>
                                <div className="flex flex-wrap gap-4">
                                    <button className="bg-white text-[#0026C0] font-black px-8 py-4 rounded-xl hover:bg-blue-50 transition-all shadow-xl">
                                        Start Selling Today
                                    </button>
                                    <button className="bg-white/10 text-white border border-white/20 font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">
                                        Learn More
                                    </button>
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
                                        <div className="w-10 h-10 bg-[#0026C0] rounded-xl flex items-center justify-center">
                                            <div className="w-6 h-6 bg-white rounded-sm rotate-45"></div>
                                        </div>
                                        <span className="text-2xl font-black tracking-tight">AFRICA<span className="text-[#0026C0]">MART</span></span>
                                    </div>
                                    <p className="text-slate-500 max-w-sm leading-relaxed">
                                        Africa's largest B2B wholesale marketplace connecting global buyers with certified African manufacturers.
                                    </p>
                                    <div className="flex gap-4">
                                        {['fb', 'tw', 'ln', 'ig'].map(s => (
                                            <div key={s} className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#0026C0] hover:border-[#0026C0] cursor-pointer transition-all">
                                                <span className="uppercase text-[10px] font-black">{s}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Platform</h4>
                                    <ul className="space-y-3 text-slate-500 text-sm font-medium">
                                        <li className="hover:text-[#0026C0] cursor-pointer">Buyer Central</li>
                                        <li className="hover:text-[#0026C0] cursor-pointer">Verify Business</li>
                                        <li className="hover:text-[#0026C0] cursor-pointer">How it Works</li>
                                        <li className="hover:text-[#0026C0] cursor-pointer">Pricing</li>
                                    </ul>
                                </div>
                                <div className="space-y-6">
                                    <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Help & Support</h4>
                                    <ul className="space-y-3 text-slate-500 text-sm font-medium">
                                        <li className="hover:text-[#0026C0] cursor-pointer">Contact Support</li>
                                        <li className="hover:text-[#0026C0] cursor-pointer">FAQ</li>
                                        <li className="hover:text-[#0026C0] cursor-pointer">Logistics Partners</li>
                                        <li className="hover:text-[#0026C0] cursor-pointer">Safety Guidelines</li>
                                    </ul>
                                </div>
                                <div className="space-y-6">
                                    <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Business</h4>
                                    <ul className="space-y-3 text-slate-500 text-sm font-medium">
                                        <li className="hover:text-[#0026C0] cursor-pointer">Sell on AfricaMart</li>
                                        <li className="hover:text-[#0026C0] cursor-pointer">Enterprise Solutions</li>
                                        <li className="hover:text-[#0026C0] cursor-pointer">Market Analysis</li>
                                        <li className="hover:text-[#0026C0] cursor-pointer">Advertise</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">© 2026 AfricaMart Global Ltd. All rights reserved.</p>
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
