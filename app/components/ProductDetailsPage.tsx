import React from 'react';
import Image from 'next/image';
import { Search, SlidersHorizontal, ArrowLeft, MapPin } from 'lucide-react';

interface ProductDetailsPageProps {
    onBack: () => void;
    onNavigate?: (view: any) => void;
    onOpenSearch?: () => void;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ onBack, onNavigate, onOpenSearch }) => {
    return (
        <div className="bg-[#f6f6f8] min-h-[100dvh] text-slate-900 antialiased pb-20 md:pb-0 font-display animate-in slide-in-from-right duration-300">
            {/* Home Page Header Instead */}
            <header className="bg-[#f6f6f6] text-slate-800 sticky top-0 z-50">
                <div className="px-4 py-3 flex items-center justify-between gap-3">
                    {/* Back Icon instead of Menu for navigation */}
                    <button
                        aria-label="Back"
                        className="p-1 hover:bg-black/5 rounded-full transition-colors active:scale-95"
                        onClick={onBack}
                    >
                        <ArrowLeft className="h-8 w-8" />
                    </button>

                    <div className="flex-grow relative group" onClick={onOpenSearch}>
                        <input
                            className="w-full py-2.5 pl-4 pr-10 rounded-xl text-gray-900 placeholder:text-gray-400 text-sm bg-white border border-slate-200 focus:outline-none focus:ring-0 transition-all duration-300 shadow-sm"
                            placeholder="Search products or sellers..."
                            type="text"
                            readOnly
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
                        </div>
                    </div>

                    <div className="flex gap-2 isolate">
                        {/* Filter Icon */}
                        <button
                            aria-label="Filter"
                            className="relative p-1 hover:bg-black/5 rounded-full transition-colors active:scale-95"
                        >
                            <SlidersHorizontal className="h-7 w-7" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto">
                {/* Product Image Gallery (Mobile Optimized Swipeable) */}
                <section className="bg-white relative group">
                    <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar h-[320px] md:h-[450px]">
                        <div className="flex-none w-full snap-center flex items-center justify-center p-4">
                            <div className="w-full h-full relative">
                                <Image
                                    className="object-contain rounded-lg"
                                    alt="Heavy duty industrial blue water pump model x200"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfE1vWrW9fM1qDnsVTCzFqc2Jy15k7VP7jDw0XiI7xBOfxl7CWNKpfKdjt6a1Cn33Jpdq5MfcO_of6I22NUlUj36lgqyMCeOvmJR8GitEkCqQZiUjbEuJkeyFlPZbJJZNRjRGdjiPQ3BDTz41vT-C9Kf0fujSyKMpFqKKUoHHDvx3dsV1nvNg0cHQstk1BrURc7ItmCIAj3X9NCmR-lsetujm_o2q8jh4cOHCBQdIkTc-ghPhMwHQbQxnkO0k_crtHgpSqnHaeyeE"
                                    fill
                                />
                            </div>
                        </div>
                        <div className="flex-none w-full snap-center flex items-center justify-center p-4">
                            <div className="w-full h-full relative">
                                <Image
                                    className="object-contain rounded-lg"
                                    alt="Technical schematic side view of industrial pump"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtEhgM5RszclO5KEqOSC4enXKQhEUX39tEHVoBrlAQFrpbLhZ-h-E-wlMnK7CE0aqxKKXJKzkUV9hFpA5SkqP952Os_pohblYz_voalibq9oof3ivqwSzK_GRBlwtqv2FaAFCSbDEYyaDe-07lwbYqHDsQCJiPE9ZEkVz6OBxtydlgjAvrNnDT2VJUP0pJyc5274rycgsEQpHDXkHc747G2HQkT94k3szOpw3eJcuE6XVo3ln6MAsHVmoDQz8pFS7dz7LMrkQuEic"
                                    fill
                                />
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-brand-blue"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                    </div>
                </section>

                {/* Product Hero Info */}
                <section className="p-4 bg-white space-y-3">
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-tight">
                        Heavy Duty Industrial Pump Model X-200
                    </h1>
                    <div className="flex flex-col gap-1">
                        <div className="text-[18px] font-extrabold text-brand-blue">₹ 45,000 - ₹ 55,000 / Unit</div>
                        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Min Order: 2 Units</div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex flex-col gap-1.5 mt-2">
                        <p className="text-sm font-bold text-slate-800">Business's Seller Name</p>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center text-xs text-slate-500">
                                <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                                <span>Location/Address</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[11px] text-slate-500 font-medium">Product rating</span>
                                <div className="flex text-orange-400 text-xs tracking-widest">
                                    <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-slate-200">★</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Action Buttons (Middle Section) */}
                <section className="px-4 py-4 bg-white sticky top-16 z-40 border-b border-slate-50">
                    <div className="flex gap-3">
                        <button className="flex-1 h-11 bg-brand-blue text-white font-bold rounded-lg shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                            <span className="material-symbols-outlined text-white">mail</span>
                            Get Quote
                        </button>
                        <button className="flex-1 h-11 border border-brand-blue text-brand-blue font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                            <span className="material-symbols-outlined">call</span>
                            Contact Supplier
                        </button>
                    </div>
                </section>

                {/* Product Details */}
                <div className="bg-[#f8f9fc] mt-2 space-y-2">
                    {/* Specifications */}
                    <section className="bg-white p-4">
                        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest mb-4">Core Specifications</h3>
                        <div className="space-y-0">
                            <div className="flex justify-between py-2.5 border-b border-slate-50">
                                <span className="text-sm text-slate-500">Brand</span>
                                <span className="text-sm font-bold text-slate-900">Industrial Cobalt Tech</span>
                            </div>
                            <div className="flex justify-between py-2.5 border-b border-slate-50">
                                <span className="text-sm text-slate-500">Power Source</span>
                                <span className="text-sm font-bold text-slate-900">Electric (3-Phase)</span>
                            </div>
                            <div className="flex justify-between py-2.5">
                                <span className="text-sm text-slate-500">Capacity</span>
                                <span className="text-sm font-bold text-slate-900">500 Liters/Min</span>
                            </div>
                        </div>
                        <div className="mt-2 pt-3 border-t border-slate-50 text-right">
                            <button className="text-[11px] font-extrabold text-brand-blue uppercase tracking-widest active:opacity-70 transition-opacity">View More</button>
                        </div>
                    </section>

                    {/* Description */}
                    <section className="bg-white p-4">
                        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest mb-3">Product Overview</h3>
                        <div className="text-sm text-slate-600 leading-relaxed">
                            <p>The Model X-200 is a high-performance industrial pump engineered for maximum durability and efficient fluid transport in demanding manufacturing environments. This unit provides a reliable, high-pressure output with an integrated vibration-dampening system for quiet operation.</p>
                        </div>
                    </section>

                    {/* Suggested for You */}
                    <section className="bg-white p-4">
                        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest mb-4">Suggested for You</h3>
                        <div className="grid grid-cols-3 gap-2 pb-2">
                            {/* Card 1 */}
                            <div className="flex flex-col space-y-1.5 overflow-hidden">
                                <div className="w-full aspect-square bg-slate-50 rounded-lg border border-slate-100 overflow-hidden relative">
                                    <Image
                                        className="object-cover"
                                        alt="Commercial rotary engine part"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSjf80DhylwWljUQoEOpcfZOPRM01cwfBfhKzmP_JbbjshsFDIK_hganN9DSsgYNeJGK1KmX29e3lPv-iOjGssSLdnklZ95ggANiP7xLo3Uc-JbHFiTTWtUtRwWPgVJagrwdSDh_rgJXOA5YnHaDlCJXLJzMMEfEa2x79Kw0TdUbafJiRbhcOiUewUA5jZuRdeYdsySt9ILbp-XdVJCqLJqR2jBrlymEuVzck0RbaNHgSxDgmTudLFqG0ZikvN5voMBSUzeKAOn1E"
                                        fill
                                    />
                                </div>
                                <div className="space-y-0.5">
                                    <h5 className="text-[10px] md:text-[12px] font-bold line-clamp-2 leading-tight">Rotary Industrial Motor RS-40</h5>
                                    <div className="text-[10px] md:text-[12px] font-extrabold text-brand-blue truncate">₹ 28,000</div>
                                </div>
                            </div>
                            {/* Card 2 */}
                            <div className="flex flex-col space-y-1.5 overflow-hidden">
                                <div className="w-full aspect-square bg-slate-50 rounded-lg border border-slate-100 overflow-hidden relative">
                                    <Image
                                        className="object-cover"
                                        alt="Heavy duty steel piping connectors"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAc6349knFoY_hjk7yViNCIdXv7BwVamwDU0kPB860OHR1QGVFaJPSJ6fTmBwPMGzsuXqAcXzkzRWWg1ofyiceqwMN0diY0C_Zg652tVXAQ34gFOeDH2BfbBqrWPOFYOwjJSRcTqgum8pHuDTZvXf-OZWyd8AkMu012FmC6wAwklGHdZFboDN25COaXxJeLzuVJgdfkj_8M1jpqCEKp_X9cjt4vHQpYVu1fdX6hEMqPA5prF2J_RNnJIacwMMucoepnFsGYMWVoro"
                                        fill
                                    />
                                </div>
                                <div className="space-y-0.5">
                                    <h5 className="text-[10px] md:text-[12px] font-bold line-clamp-2 leading-tight">Stainless Steel Pipe Fittings (Set)</h5>
                                    <div className="text-[10px] md:text-[12px] font-extrabold text-brand-blue truncate">₹ 1,200</div>
                                </div>
                            </div>
                            {/* Card 3 */}
                            <div className="flex flex-col space-y-1.5 overflow-hidden">
                                <div className="w-full aspect-square bg-slate-50 rounded-lg border border-slate-100 overflow-hidden relative">
                                    <Image
                                        className="object-cover"
                                        alt="Digital pressure monitoring gauge"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhReHxSnM7k3ulnaWc0yeIbxi4_CUGJiJaaXShq46Z6VFQzIpYuMi9wPpWgMOa0Fov1G-RzXa38RPSI-LTlexAsvjOQ_mZJyDinmB5rTTl2HcV6tJlFeLrMB_-4fjGxx0qlwXKxcJwR5S56wopk-34Z79COMNhQdeOCnl1-qzsAtQWqoUN4h602PZune8aueFh4wEOzcq2OiJKaxZfl-pJElDnDDkETCh1_zU4aqWMeiub7tXsrfaHWs9Kt9oEXIAdTl05NflmYSQ"
                                        fill
                                    />
                                </div>
                                <div className="space-y-0.5">
                                    <h5 className="text-[10px] md:text-[12px] font-bold line-clamp-2 leading-tight">Digital Pressure Gauge Pro</h5>
                                    <div className="text-[10px] md:text-[12px] font-extrabold text-brand-blue truncate">₹ 5,400</div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default ProductDetailsPage;
