"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, HelpCircle, MessageSquare, User, ChevronDown, ChevronRight, ArrowRight, ShieldCheck, Truck, Clock, Rocket, Zap, Star, Shield, HelpCircle as HelpIcon } from 'lucide-react';
import ProductCard from './ProductCard';
import DesktopSearchResult from './DesktopSearchResult';
import DesktopProductDetails from './DesktopProductDetails';
import SignInOverlay from './SignInOverlay';
import DesktopSignUpOverlay from './DesktopSignUpOverlay';

export default function DesktopHome() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isProductViewOpen, setIsProductViewOpen] = useState(false);
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

    const handleProductClick = (productData: any) => {
        setSelectedProduct({
            ...productData,
            isVerified: productData.isVerified ?? true
        });
        setIsProductViewOpen(true);
    };

    const suggestions = [
        { name: "Centrifugal Water Pump for Industrial Irrigation", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfE1vWrW9fM1qDnsVTCzFqc2Jy15k7VP7jDw0XiI7xBOfxl7CWNKpfKdjt6a1Cn33Jpdq5MfcO_of6I22NUlUj36lgqyMCeOvmJR8GitEkCqQZiUjbEuJkeyFlPZbJJZNRjRGdjiPQ3BDTz41vT-C9Kf0fujSyKMpFqKKUoHHDvx3dsV1nvNg0cHQstk1BrURc7ItmCIAj3X9NCmR-lsetujm_o2q8jh4cOHCBQdIkTc-ghPhMwHQbQxnkO0k_crtHgpSqnHaeyeE" },
        { name: "High Pressure Multistage Industrial Pump", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfE1vWrW9fM1qDnsVTCzFqc2Jy15k7VP7jDw0XiI7xBOfxl7CWNKpfKdjt6a1Cn33Jpdq5MfcO_of6I22NUlUj36lgqyMCeOvmJR8GitEkCqQZiUjbEuJkeyFlPZbJJZNRjRGdjiPQ3BDTz41vT-C9Kf0fujSyKMpFqKKUoHHDvx3dsV1nvNg0cHQstk1BrURc7ItmCIAj3X9NCmR-lsetujm_o2q8jh4cOHCBQdIkTc-ghPhMwHQbQxnkO0k_crtHgpSqnHaeyeE" },
        { name: "Submersible Deep Well Boring Pump", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBILnvcu5s-Xbr0TNxlp7XRXG7rN0_jj2EnJ1u8Q-528ofDmhIcokhHyEPLVm_oI6J4PeYomB63uykCvvejheTfbQgTRlc45jP6f6S7oMRYBnHsewJphReFev55IjHAYRAe_T671DvHBOt0wADYqEcVR-7C5Ci6Ky-pJsZwab1aQdfPFy8I-EZIrE5GUvz46hBaE0jh5D_k_ytSHQRs19E7eLcOG0ah3B2EqnFak8Dg3XgsynBpm5H0k2qIAiqQfGPYz0zV3l6xD-E" },
        { name: "Premium Basmati Rice Bulk", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEvFQB1H88fuOka7yp8h49qObv55xA1cM6DKc7JIAZgAW7orn15wB_v3qPidwWKuzWeRACovWHghmMy9z_0m6eDQ6D-wCEVAYTqGLzJYDYx5Qcz80z-dZRZBVFzrnCxBLJuZVzJaLmmYmH9BMwTgl_SP4PrtIy-cT_TFFfhmuM6z3p5Odq5dslAFKgEvT6HTQIajdF_VHTmPM14TCJG5xU0LaTyOu7wezQl2N-cMr_i3YJYk8h8D6j8jbN1PHNfJInF62lsI9UQVE" },
        { name: "Fresh Farm Eggs - Crate", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgANGbe0k8YhJtNZGtOOmnyb83ndLzoL_y9ZzQBTtWd_Vk9v0DYCAvbYLN29EsJ2roxxttjp3WhFwBI1AEQkW6vXR7T54Ii8EzbY2xe9Sc1LUEhj8cQFjzYuKEcBT_dZxHWmovlsAtZbmpFKfF6hasJJ8sJhOyxFtEfAApViUkukc_L9MMFKO3wE5-RIcWo5w3aIUbgbjwKDyW4-5JNWmr7Fsc0RvPrWDPshXae61c_0AUxM54HjdFGmSqPoTXKcc0S8iUMI5XArQ" }
    ];

    const filteredSuggestions = searchQuery.length > 0
        ? suggestions.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    return (
        <div className="bg-slate-50 font-body text-slate-900 min-h-screen">
            {/* Standardized Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="px-4 lg:px-8 py-3">
                    <div className="max-w-[1600px] mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-8">
                        {/* Brand Logo */}
                        <div className="flex items-center gap-3 flex-shrink-0 cursor-pointer" onClick={() => { setIsSearchSubmitted(false); setIsProductViewOpen(false); setSelectedProduct(null); setSearchQuery(''); }}>
                            <div className="w-9 h-9 bg-[#0026C0] rounded-lg flex items-center justify-center">
                                <div className="w-5 h-5 bg-white rounded-sm rotate-45"></div>
                            </div>
                            <span className="text-xl font-bold tracking-tight hidden sm:block">AFRICA<span className="text-[#0026C0]">MART</span></span>
                        </div>

                        {/* Centered Search Bar */}
                        <div className="flex justify-center">
                            <div className="w-full max-w-3xl relative">
                                <div className="relative group">
                                    <input
                                        className="w-full h-11 pl-11 pr-24 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#0026C0]/20 focus:border-[#0026C0] transition-all text-sm outline-none"
                                        placeholder="Search for products, brands or suppliers..."
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setIsDropdownOpen(true);
                                        }}
                                        onFocus={() => setIsDropdownOpen(true)}
                                        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                setIsSearchSubmitted(true);
                                                setIsDropdownOpen(false);
                                            }
                                        }}
                                    />
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0026C0] w-5 h-5" />
                                    <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex gap-1">
                                        <button
                                            onClick={() => {
                                                setIsSearchSubmitted(true);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="px-5 py-2 bg-[#0026C0] text-white text-xs font-bold rounded-md hover:bg-blue-700 transition-all shadow-md active:scale-95"
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>

                                {/* Search Dropdown */}
                                {isDropdownOpen && filteredSuggestions.length > 0 && (
                                    <div className="absolute top-full left-0 w-full bg-white mt-1 rounded-xl shadow-2xl border border-slate-100 z-[100] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                        {filteredSuggestions.map((item, idx) => (
                                            <button
                                                key={idx}
                                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors text-left group"
                                                onClick={() => {
                                                    setSearchQuery(item.name);
                                                    setIsSearchSubmitted(true);
                                                    setIsDropdownOpen(false);
                                                }}
                                            >
                                                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-700 group-hover:text-[#0026C0] transition-colors line-clamp-1">{item.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Utility Links */}
                        <nav className="flex items-center gap-6">
                            <div className="hidden lg:flex items-center gap-1 text-slate-600 text-sm font-medium cursor-pointer hover:text-[#0026C0] transition-colors relative group/help py-2">
                                <HelpCircle className="w-5 h-5" />
                                <span>Help</span>
                                <ChevronDown className="w-4 h-4 text-slate-400 group-hover/help:text-[#0026C0] group-hover/help:rotate-180 transition-transform" />

                                {/* Help Dropdown */}
                                <div className="absolute top-full left-0 mt-1 w-56 bg-white shadow-2xl border border-slate-100 rounded-lg overflow-hidden z-[60] opacity-0 translate-y-4 group-hover/help:opacity-100 group-hover/help:translate-y-0 pointer-events-none group-hover/help:pointer-events-auto transition-all duration-300">
                                    <div className="p-3 space-y-1">
                                        <div className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-md transition-colors group/item">
                                            <HelpIcon className="w-4 h-4 text-slate-400 group-hover/item:text-[#0026C0]" />
                                            <span className="text-xs font-bold text-slate-700">Help Center</span>
                                        </div>
                                        <div className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-md transition-colors group/item">
                                            <Shield className="w-4 h-4 text-slate-400 group-hover/item:text-[#0026C0]" />
                                            <span className="text-xs font-bold text-slate-700">Your Feedback</span>
                                        </div>
                                        <div className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-md transition-colors group/item">
                                            <Zap className="w-4 h-4 text-slate-400 group-hover/item:text-[#0026C0]" />
                                            <span className="text-xs font-bold text-slate-700">Dispute Resolution</span>
                                        </div>
                                        <div className="h-px bg-slate-100 my-2"></div>
                                        <div className="flex items-center gap-3 px-3 py-2 hover:bg-[#0026C0] rounded-md transition-colors group/contact">
                                            <HelpCircle className="w-4 h-4 text-slate-400 group-hover/contact:text-white" />
                                            <span className="text-xs font-bold text-slate-700 group-hover/contact:text-white">Contact Us</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors leading-none">
                                <MessageSquare className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                            <div className="h-8 w-[1px] bg-slate-200"></div>
                            <div className="flex items-center gap-3 cursor-pointer group relative">
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs text-slate-500 font-medium">Hello, Sign in</p>
                                    <div className="flex items-center gap-1">
                                        <p className="text-sm font-bold text-slate-900"></p>
                                        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#0026C0] group-hover:rotate-180 transition-transform" />
                                    </div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 group-hover:border-[#0026C0] transition-colors relative overflow-hidden">
                                    <User className="w-5 h-5 text-slate-400 group-hover:text-[#0026C0] transition-colors" />
                                </div>

                                {/* Premium Account Dropdown */}
                                <div className="absolute top-full right-0 mt-2 w-80 bg-white shadow-2xl border border-slate-100 rounded-lg overflow-hidden z-[60] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto transition-all duration-300">
                                    <div className="p-4 bg-slate-50 border-b border-slate-100">
                                        <button
                                            onClick={() => setIsSignInOpen(true)}
                                            className="w-full h-11 bg-slate-900 text-white font-black rounded text-sm shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 mb-3 active:scale-[0.98]"
                                        >
                                            Sign in
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                        <p className="text-[11px] text-center text-slate-500">New customer? <span className="text-[#0026C0] font-bold hover:underline cursor-pointer" onClick={() => setIsSignUpOpen(true)}>Start here.</span></p>
                                    </div>
                                    <div className="p-4 grid grid-cols-2 gap-x-6 gap-y-4">
                                        <div className="space-y-3">
                                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Buying Hub</h4>
                                            <div className="space-y-2">
                                                <div className="text-xs font-bold text-slate-700 hover:text-[#0026C0] cursor-pointer">Your Orders</div>
                                                <div className="text-xs font-bold text-slate-700 hover:text-[#0026C0] cursor-pointer">Buying Requests</div>
                                                <div className="text-xs font-bold text-slate-700 hover:text-[#0026C0] cursor-pointer">Quote Requests</div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Weelcome User</h4>
                                            <div className="space-y-2">
                                                <div className="text-xs font-bold text-slate-700 hover:text-[#0026C0] cursor-pointer">Your Profile</div>
                                                <div className="text-xs font-bold text-slate-700 hover:text-[#0026C0] cursor-pointer">Message Center</div>
                                                <div className="text-xs font-bold text-slate-700 hover:text-[#0026C0] cursor-pointer">Wholesale Deals</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            {isProductViewOpen && selectedProduct ? (
                <DesktopProductDetails
                    product={selectedProduct}
                    onBack={() => {
                        setIsProductViewOpen(false);
                        setSelectedProduct(null);
                    }}
                />
            ) : isSearchSubmitted ? (
                <DesktopSearchResult
                    searchQuery={searchQuery}
                    onProductClick={(product) => {
                        setSelectedProduct(product);
                        setIsProductViewOpen(true);
                    }}
                />
            ) : (
                <div className="max-w-[1600px] mx-auto">
                    {/* Main Content - Now Full Width */}
                    <main className="w-full p-6 lg:p-8 space-y-12">
                        {/* Ad Video Section */}
                        <section className="relative h-[320px] rounded-lg overflow-hidden shadow-2xl flex items-center mb-6">
                            {/* Video Background */}
                            <video
                                className="absolute inset-0 w-full h-full object-cover z-0"
                                autoPlay
                                muted
                                loop
                                playsInline
                            >
                                <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent z-10"></div>

                            {/* Content */}
                            <div className="relative z-20 px-12 space-y-6 max-w-2xl text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0026C0] text-white rounded-full text-[10px] font-bold tracking-widest uppercase mb-4">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span> Sponsored Spotlight
                                </div>
                                <h2 className="text-5xl font-black text-white leading-tight">Empower Your Supply Chain Today</h2>
                                <p className="text-slate-200 text-lg">Connect with over 10,000+ verified global manufacturers and unlock exclusive bulk pricing on premium industrial goods.</p>
                                <div className="flex items-center gap-3 pt-2">
                                    <button className="bg-[#0026C0] hover:bg-[#0020A0] text-white font-bold px-6 py-3 rounded-md transition-all shadow-lg flex items-center gap-2 group text-sm">
                                        Start Exploring <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <button className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-md transition-all backdrop-blur-md border border-white/10 text-sm">
                                        Learn More
                                    </button>
                                </div>
                            </div>

                            {/* Floating Badges */}
                            <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-20">
                                {[
                                    { icon: ShieldCheck, label: '100% Verified' },
                                    { icon: Shield, label: 'Trade Assurance' },
                                    { icon: Truck, label: 'Global Logistics' }
                                ].map((badge, idx) => (
                                    <div key={idx} className="bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-lg flex items-center gap-3 text-white shadow-xl">
                                        <badge.icon className="w-5 h-5 text-blue-400" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">{badge.label}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Grid Section 1 */}
                        <section className="py-2">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">Products Available Near You</h2>
                                    <p className="text-slate-500 text-sm mt-1">Sourced from verified local suppliers in Springfield, IL</p>
                                </div>
                                <a className="text-[#0026C0] font-bold hover:underline flex items-center gap-1 text-sm" href="#">
                                    View All Products <ChevronRight className="w-5 h-5 text-[#0026C0]" />
                                </a>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
                                <ProductCard
                                    name="Premium Fresh Farm Eggs"
                                    price="$12.50"
                                    unit="/ crate"
                                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuAgANGbe0k8YhJtNZGtOOmnyb83ndLzoL_y9ZzQBTtWd_Vk9v0DYCAvbYLN29EsJ2roxxttjp3WhFwBI1AEQkW6vXR7T54Ii8EzbY2xe9Sc1LUEhj8cQFjzYuKEcBT_dZxHWmovlsAtZbmpFKfF6hasJJ8sJhOyxFtEfAApViUkukc_L9MMFKO3wE5-RIcWo5w3aIUbgbjwKDyW4-5JNWmr7Fsc0RvPrWDPshXae61c_0AUxM54HjdFGmSqPoTXKcc0S8iUMI5XArQ"
                                    supplier="Green Harvest Farms"
                                    location="Springfield, IL"
                                    rating={4.8}
                                    reviews="1.2k"
                                    isLocal={true}
                                    onClick={() => handleProductClick({
                                        name: "Premium Fresh Farm Eggs",
                                        price: "$12.50",
                                        unit: "/ crate",
                                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgANGbe0k8YhJtNZGtOOmnyb83ndLzoL_y9ZzQBTtWd_Vk9v0DYCAvbYLN29EsJ2roxxttjp3WhFwBI1AEQkW6vXR7T54Ii8EzbY2xe9Sc1LUEhj8cQFjzYuKEcBT_dZxHWmovlsAtZbmpFKfF6hasJJ8sJhOyxFtEfAApViUkukc_L9MMFKO3wE5-RIcWo5w3aIUbgbjwKDyW4-5JNWmr7Fsc0RvPrWDPshXae61c_0AUxM54HjdFGmSqPoTXKcc0S8iUMI5XArQ",
                                        supplier: "Green Harvest Farms",
                                        location: "Springfield, IL",
                                        rating: 4.8,
                                        isLocal: true
                                    })}
                                />
                                <ProductCard
                                    name="Professional Luggage Set"
                                    price="$185.00"
                                    unit="/ set"
                                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuC8vMmnU2EGswtctk93XGYiSUSKOX3PSJkH0jvU1ksCMkZVramzMVySMqMj2SgDHzL5tOFDXgavf6oBtOii5Ik9XD4ZEzmg1-NHt0GmthZs-cWgAxuVG2VUVBzK10ptYsmjw-rHZAmBheYr0NXnifep8fx_YAYaVGTe1ilLUoxp9cC6AUufF1Gp5ZbRnmBt3PVI6sQVqTq7kZrs8R2nL1dJ857Mysseebdz8ftX5TXg9H60Osyx2b9Y_CVpQbuWLLdqafwsu1smDH0"
                                    supplier="Global Travel Gear"
                                    location="Chicago, IL"
                                    rating={4.9}
                                    reviews="850"
                                    onClick={() => handleProductClick({
                                        name: "Professional Luggage Set",
                                        price: "$185.00",
                                        unit: "/ set",
                                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8vMmnU2EGswtctk93XGYiSUSKOX3PSJkH0jvU1ksCMkZVramzMVySMqMj2SgDHzL5tOFDXgavf6oBtOii5Ik9XD4ZEzmg1-NHt0GmthZs-cWgAxuVG2VUVBzK10ptYsmjw-rHZAmBheYr0NXnifep8fx_YAYaVGTe1ilLUoxp9cC6AUufF1Gp5ZbRnmBt3PVI6sQVqTq7kZrs8R2nL1dJ857Mysseebdz8ftX5TXg9H60Osyx2b9Y_CVpQbuWLLdqafwsu1smDH0",
                                        supplier: "Global Travel Gear",
                                        location: "Chicago, IL",
                                        rating: 4.9
                                    })}
                                />
                                <ProductCard
                                    name="Premium Stationery Kit"
                                    price="$45.00"
                                    unit="/ kit"
                                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ1BhCG5G7gLninBGl_TDVGtKEgVHVmC7RnULmnjJi3v18texiR2BJRgccN4XlMqzoVfT4zplngwn-_Rq99_C67whd25JOQ6j9RbO5rjwJc8apleYLFOn-vmVtoYzxx72aXFD5u2iWfgS4oFzyv4nClpx49TPal9dF1xfxSjsh2ZTvkkzteHMrJHN56UQjedl7M8l7aNJykm_N1jmUF00R4rUP5Zwxe37MuEM7yJKCsTe-iKVsSbwzxn-XzZ5EbWw9fMwh-Bae7hw"
                                    supplier="Office Pro Supplies"
                                    location="Downtown, IL"
                                    rating={4.7}
                                    reviews="430"
                                    onClick={() => handleProductClick({
                                        name: "Premium Stationery Kit",
                                        price: "$45.00",
                                        unit: "/ kit",
                                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ1BhCG5G7gLninBGl_TDVGtKEgVHVmC7RnULmnjJi3v18texiR2BJRgccN4XlMqzoVfT4zplngwn-_Rq99_C67whd25JOQ6j9RbO5rjwJc8apleYLFOn-vmVtoYzxx72aXFD5u2iWfgS4oFzyv4nClpx49TPal9dF1xfxSjsh2ZTvkkzteHMrJHN56UQjedl7M8l7aNJykm_N1jmUF00R4rUP5Zwxe37MuEM7yJKCsTe-iKVsSbwzxn-XzZ5EbWw9fMwh-Bae7hw",
                                        supplier: "Office Pro Supplies",
                                        location: "Downtown, IL",
                                        rating: 4.7
                                    })}
                                />
                                <ProductCard
                                    name="Long Grain Basmati Rice"
                                    price="$2.50"
                                    unit="/ kg"
                                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuCEvFQB1H88fuOka7yp8h49qObv55xA1cM6DKc7JIAZgAW7orn15wB_v3qPidwWKuzWeRACovWHghmMy9z_0m6eDQ6D-wCEVAYTqGLzJYDYx5Qcz80z-dZRZBVFzrnCxBLJuZVzJaLmmYmH9BMwTgl_SP4PrtIy-cT_TFFfhmuM6z3p5Odq5dslAFKgEvT6HTQIajdF_VHTmPM14TCJG5xU0LaTyOu7wezQl2N-cMr_i3YJYk8h8D6j8jbN1PHNfJInF62lsI9UQVE"
                                    supplier="Eastern Grains Ltd."
                                    location="Indus Hub"
                                    rating={4.5}
                                    reviews="2.1k"
                                    onClick={() => handleProductClick({
                                        name: "Long Grain Basmati Rice",
                                        price: "$2.50",
                                        unit: "/ kg",
                                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEvFQB1H88fuOka7yp8h49qObv55xA1cM6DKc7JIAZgAW7orn15wB_v3qPidwWKuzWeRACovWHghmMy9z_0m6eDQ6D-wCEVAYTqGLzJYDYx5Qcz80z-dZRZBVFzrnCxBLJuZVzJaLmmYmH9BMwTgl_SP4PrtIy-cT_TFFfhmuM6z3p5Odq5dslAFKgEvT6HTQIajdF_VHTmPM14TCJG5xU0LaTyOu7wezQl2N-cMr_i3YJYk8h8D6j8jbN1PHNfJInF62lsI9UQVE",
                                        supplier: "Eastern Grains Ltd.",
                                        location: "Indus Hub",
                                        rating: 4.5
                                    })}
                                />
                                <ProductCard
                                    name="Precision Tool Set"
                                    price="$299.00"
                                    unit="/ kit"
                                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuDlA3LLM6wSIQbwvMDpL14wLTwDS4FJkBNqZ5N8pG4gPhBJYZcSzcdl3J6pFzy14VvlGt11YJX7ANbX2Ua1qY1irVIQ2zVs0fdInvvYcrFUJyzJOW9BWuVw6HrtWTZ8_Sx5lEvJTvzqiX3KsbOprt1Y9wQpeT-POcbcmvH1zaMkVpAubp_bLrEOhFcTF8UTEPmMQPalVxBEwYwK2RvVTKvzZYnlrn3Dre_dQIMqa1n1ye0DvoRRZKwMxQF-K9uPzSpoYKRK16b0OCw"
                                    supplier="Tool Masters Co."
                                    location="Chicago, IL"
                                    rating={4.9}
                                    reviews="120"
                                    onClick={() => handleProductClick({
                                        name: "Precision Tool Set",
                                        price: "$299.00",
                                        unit: "/ kit",
                                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlA3LLM6wSIQbwvMDpL14wLTwDS4FJkBNqZ5N8pG4gPhBJYZcSzcdl3J6pFzy14VvlGt11YJX7ANbX2Ua1qY1irVIQ2zVs0fdInvvYcrFUJyzJOW9BWuVw6HrtWTZ8_Sx5lEvJTvzqiX3KsbOprt1Y9wQpeT-POcbcmvH1zaMkVpAubp_bLrEOhFcTF8UTEPmMQPalVxBEwYwK2RvVTKvzZYnlrn3Dre_dQIMqa1n1ye0DvoRRZKwMxQF-K9uPzSpoYKRK16b0OCw",
                                        supplier: "Tool Masters Co.",
                                        location: "Chicago, IL",
                                        rating: 4.9
                                    })}
                                />
                            </div>
                        </section>

                        {/* Professional Inquiry CTA */}
                        <section className="bg-[#0026C0] rounded-lg p-6 text-white relative overflow-hidden flex flex-col xl:flex-row items-center gap-6">
                            <div className="relative z-10 space-y-2 max-w-xl text-center xl:text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase mb-1 border border-white/20">
                                    <Rocket className="w-3.5 h-3.5" /> B2B Fast Track
                                </div>
                                <h2 className="text-3xl font-black leading-tight">Can't find what you're looking for?</h2>
                                <p className="text-blue-100 text-base">Post your buying request and get verified quotes within 24 hours.</p>
                            </div>
                            <div className="relative z-10 w-full xl:max-w-xl bg-white rounded-md p-1.5 flex flex-col sm:flex-row gap-2 shadow-2xl">
                                <input className="flex-grow bg-white text-slate-900 px-4 py-2 rounded border-none focus:ring-0 text-sm outline-none" placeholder="Tell us what you need..." type="text" />
                                <div className="flex items-center gap-2 border-l border-slate-100 pl-2">
                                    <input className="w-16 border-none bg-transparent text-slate-900 focus:ring-0 text-center font-bold outline-none" placeholder="Qty" type="number" />
                                    <select className="bg-slate-100 text-slate-600 text-[10px] font-bold border-none rounded px-2 py-1.5 outline-none">
                                        <option>Units</option>
                                        <option>KG</option>
                                        <option>Metric Tons</option>
                                    </select>
                                </div>
                                <button className="bg-[#0026C0] hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#0026C0]/20">
                                    Sourcing <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                            {/* Abstract background decorations */}
                            <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
                            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                        </section>

                        {/* Looking for something, like? - Category Navigation */}
                        <section className="py-12 border-t border-slate-100">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-10 text-center">Looking for something, like?</h2>
                            <div className="grid grid-cols-6 gap-8">
                                {[
                                    { name: "Raw Materials", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=200&h=200&auto=format&fit=crop" },
                                    { name: "Construction", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=200&h=200&auto=format&fit=crop" },
                                    { name: "Electronics", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=200&h=200&auto=format&fit=crop" },
                                    { name: "Machinery", img: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=200&h=200&auto=format&fit=crop" },
                                    { name: "Agriculture", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=200&h=200&auto=format&fit=crop" },
                                    { name: "All Categories", icon: <ChevronRight className="w-8 h-8 text-white" />, color: "bg-slate-900" }
                                ].map((cat, idx) => (
                                    <div key={idx} className="flex flex-col items-center gap-4 group cursor-pointer">
                                        <div className={`w-28 h-28 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#0026C0] transition-all duration-300 shadow-lg group-hover:shadow-[#0026C0]/20 flex items-center justify-center relative ${cat.color || 'bg-white'}`}>
                                            {cat.img ? (
                                                <Image
                                                    src={cat.img}
                                                    alt={cat.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                cat.icon
                                            )}
                                        </div>
                                        <span className="text-sm font-bold text-slate-700 group-hover:text-[#0026C0] transition-colors">{cat.name}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Category Focused Section */}
                        <section className="mt-8">
                            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
                                <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-[#0026C0] rounded-full"></span>
                                    Grains & Cooking Materials
                                </h2>
                                <a className="text-[#0026C0] font-bold hover:underline flex items-center gap-1 text-sm" href="#">
                                    Explore Full Category <ChevronRight className="w-5 h-5 text-[#0026C0]" />
                                </a>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                <ProductCard
                                    name="Premium Cassava Flour"
                                    price="$8.00"
                                    unit="/ kg"
                                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuBhGRPfW1WHo5SEPIOLtErbNLCuG1n02pRorb-DVT0MOSsTWetlsm4v1y-0_30x2RepUyOAStW93l2ubIa4t2yR1kgEAyil0e1hMYwwOUbRwjl98Tylq-to9ZOz6jZkXioUbmyegX-Mvvlxo-J-z7TzwRXO7SSSkif_1Lu8JlydxLeWOfoLDWh6xWl7_7cx-8opBZUaHIlk2OVW4W2kqVozJ4BFB7IXvNev6l-vDr8ClQbjR9lcpe-KECOqVD814h-hTjZNwGXTkQg"
                                    supplier="Afro-Grain Mills"
                                    location="Lagos, NG"
                                    rating={3.5}
                                    reviews="85"
                                    onClick={() => handleProductClick({
                                        name: "Premium Cassava Flour",
                                        price: "$8.00",
                                        unit: "/ kg",
                                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhGRPfW1WHo5SEPIOLtErbNLCuG1n02pRorb-DVT0MOSsTWetlsm4v1y-0_30x2RepUyOAStW93l2ubIa4t2yR1kgEAyil0e1hMYwwOUbRwjl98Tylq-to9ZOz6jZkXioUbmyegX-Mvvlxo-J-z7TzwRXO7SSSkif_1Lu8JlydxLeWOfoLDWh6xWl7_7cx-8opBZUaHIlk2OVW4W2kqVozJ4BFB7IXvNev6l-vDr8ClQbjR9lcpe-KECOqVD814h-hTjZNwGXTkQg",
                                        supplier: "Afro-Grain Mills",
                                        location: "Lagos, NG",
                                        rating: 3.5
                                    })}
                                />
                                <ProductCard
                                    name="Stainless Steel Pot Set"
                                    price="$120.00"
                                    unit="/ set"
                                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuDlA3LLM6wSIQbwvMDpL14wLTwDS4FJkBNqZ5N8pG4gPhBJYZcSzcdl3J6pFzy14VvlGt11YJX7ANbX2Ua1qY1irVIQ2zVs0fdInvvYcrFUJyzJOW9BWuVw6HrtWTZ8_Sx5lEvJTvzqiX3KsbOprt1Y9wQpeT-POcbcmvH1zaMkVpAubp_bLrEOhFcTF8UTEPmMQPalVxBEwYwK2RvVTKvzZYnlrn3Dre_dQIMqa1n1ye0DvoRRZKwMxQF-K9uPzSpoYKRK16b0OCw"
                                    supplier="Kitchen Pro Solutions"
                                    location="Dubai, UAE"
                                    rating={4.2}
                                    reviews="150"
                                    onClick={() => handleProductClick({
                                        name: "Stainless Steel Pot Set",
                                        price: "$120.00",
                                        unit: "/ set",
                                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlA3LLM6wSIQbwvMDpL14wLTwDS4FJkBNqZ5N8pG4gPhBJYZcSzcdl3J6pFzy14VvlGt11YJX7ANbX2Ua1qY1irVIQ2zVs0fdInvvYcrFUJyzJOW9BWuVw6HrtWTZ8_Sx5lEvJTvzqiX3KsbOprt1Y9wQpeT-POcbcmvH1zaMkVpAubp_bLrEOhFcTF8UTEPmMQPalVxBEwYwK2RvVTKvzZYnlrn3Dre_dQIMqa1n1ye0DvoRRZKwMxQF-K9uPzSpoYKRK16b0OCw",
                                        supplier: "Kitchen Pro Solutions",
                                        location: "Dubai, UAE",
                                        rating: 4.2
                                    })}
                                />
                                <ProductCard
                                    name="Pure Sunflower Oil 5L"
                                    price="$15.50"
                                    unit="/ unit"
                                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuBQbzxib2tXNIEy4cn60_sVAijS2ZwaVa6IQnCloiDgBnoIhB3ZNUHmadiKdhuUAgKYtC37rsZjlwWFXL-T9rlTZyV3oLpm7NLMeCSEdPCGx12SbLLT9qNo9RrENJIuaZwnyuqfzKC884NxWCRv4TSkBQWKD9w7x7K1dMnIDEg1z_UvTzAvkklxqAApGoGLFoUSdGpgnqkqIVva4MQrNdwPXAG2NqprShkbrguZE0qKpMb_zZ3s8KGiSy7xfGHAcFc1kG5wLgfiePw"
                                    supplier="Sunny Harvest OIl"
                                    location="Odessa, UA"
                                    rating={4.0}
                                    reviews="210"
                                    onClick={() => handleProductClick({
                                        name: "Pure Sunflower Oil 5L",
                                        price: "$15.50",
                                        unit: "/ unit",
                                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQbzxib2tXNIEy4cn60_sVAijS2ZwaVa6IQnCloiDgBnoIhB3ZNUHmadiKdhuUAgKYtC37rsZjlwWFXL-T9rlTZyV3oLpm7NLMeCSEdPCGx12SbLLT9qNo9RrENJIuaZwnyuqfzKC884NxWCRv4TSkBQWKD9w7x7K1dMnIDEg1z_UvTzAvkklxqAApGoGLFoUSdGpgnqkqIVva4MQrNdwPXAG2NqprShkbrguZE0qKpMb_zZ3s8KGiSy7xfGHAcFc1kG5wLgfiePw",
                                        supplier: "Sunny Harvest OIl",
                                        location: "Odessa, UA",
                                        rating: 4.0
                                    })}
                                />
                                <ProductCard
                                    name="Assorted Spices Pack"
                                    price="$25.00"
                                    unit="/ pack"
                                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuCdaMbzMU92R6H5bfVJ7B4SXRk959Tl1e4tTjzI7VuUQ0gsxiHr8xT6_0bYMsIavGyEgR4fsTfmnl-b2zkrAR__vZCHhdh1NCUx1q-wPZtBF59I-IgyTo49S5AGplGoecDLLa2piBGNgjSwZCBamzYABS1DYoVto8TsUmEymK2lslLRETCwdB9DXkvgnlaeZibxEoH8K53H2Gz9pJ6lxBAv4q9dv_W3kFRwef11ASTuqRxuJVlD7auYMirbNaBULgtJoqGf5mm9dvs"
                                    supplier="Spice Harbor"
                                    location="Mombasa, KE"
                                    rating={4.6}
                                    reviews="95"
                                    onClick={() => handleProductClick({
                                        name: "Assorted Spices Pack",
                                        price: "$25.00",
                                        unit: "/ pack",
                                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdaMbzMU92R6H5bfVJ7B4SXRk959Tl1e4tTjzI7VuUQ0gsxiHr8xT6_0bYMsIavGyEgR4fsTfmnl-b2zkrAR__vZCHhdh1NCUx1q-wPZtBF59I-IgyTo49S5AGplGoecDLLa2piBGNgjSwZCBamzYABS1DYoVto8TsUmEymK2lslLRETCwdB9DXkvgnlaeZibxEoH8K53H2Gz9pJ6lxBAv4q9dv_W3kFRwef11ASTuqRxuJVlD7auYMirbNaBULgtJoqGf5mm9dvs",
                                        supplier: "Spice Harbor",
                                        location: "Mombasa, KE",
                                        rating: 4.6
                                    })}
                                />
                                <ProductCard
                                    name="Organic Turmeric Powder"
                                    price="$4.20"
                                    unit="/ kg"
                                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuCdaMbzMU92R6H5bfVJ7B4SXRk959Tl1e4tTjzI7VuUQ0gsxiHr8xT6_0bYMsIavGyEgR4fsTfmnl-b2zkrAR__vZCHhdh1NCUx1q-wPZtBF59I-IgyTo49S5AGplGoecDLLa2piBGNgjSwZCBamzYABS1DYoVto8TsUmEymK2lslLRETCwdB9DXkvgnlaeZibxEoH8K53H2Gz9pJ6lxBAv4q9dv_W3kFRwef11ASTuqRxuJVlD7auYMirbNaBULgtJoqGf5mm9dvs"
                                    supplier="Nature's Best"
                                    location="Enugu, NG"
                                    rating={5.0}
                                    reviews="120"
                                    onClick={() => handleProductClick({
                                        name: "Organic Turmeric Powder",
                                        price: "$4.20",
                                        unit: "/ kg",
                                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdaMbzMU92R6H5bfVJ7B4SXRk959Tl1e4tTjzI7VuUQ0gsxiHr8xT6_0bYMsIavGyEgR4fsTfmnl-b2zkrAR__vZCHhdh1NCUx1q-wPZtBF59I-IgyTo49S5AGplGoecDLLa2piBGNgjSwZCBamzYABS1DYoVto8TsUmEymK2lslLRETCwdB9DXkvgnlaeZibxEoH8K53H2Gz9pJ6lxBAv4q9dv_W3kFRwef11ASTuqRxuJVlD7auYMirbNaBULgtJoqGf5mm9dvs",
                                        supplier: "Nature's Best",
                                        location: "Enugu, NG",
                                        rating: 5.0
                                    })}
                                />
                            </div>
                        </section>
                    </main>
                </div>
            )}
            {/* Auth Overlays */}
            <SignInOverlay
                isOpen={isSignInOpen}
                onClose={() => setIsSignInOpen(false)}
                onSwitchToSignUp={() => {
                    setIsSignInOpen(false);
                    setIsSignUpOpen(true);
                }}
            />
            <DesktopSignUpOverlay
                isOpen={isSignUpOpen}
                onClose={() => setIsSignUpOpen(false)}
                onLogin={() => {
                    setIsSignUpOpen(false);
                    setIsSignInOpen(true);
                }}
            />
        </div>
    );
}
