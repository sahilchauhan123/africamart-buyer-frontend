import React from 'react';
import Image from 'next/image';
import { Search, SlidersHorizontal, ArrowLeft, MapPin, XCircle, ArrowUpLeft, History, Star } from 'lucide-react';

interface ProductDetailsPageProps {
    onBack: () => void;
    onNavigate?: (view: any) => void;
    onOpenSearch?: () => void;
    onGetQuote?: () => void;
    onMessage?: () => void;
    hasPricing?: boolean;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
    onBack,
    onNavigate,
    onOpenSearch,
    onGetQuote,
    onMessage,
    hasPricing = true
}) => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isSearching, setIsSearching] = React.useState(false);
    return (
        <div className="bg-[#f6f6f8] min-h-[100dvh] text-slate-900 antialiased pb-20 md:pb-0 font-display animate-in slide-in-from-right duration-300 flex flex-col">
            {/* Search Header - Exact copy from SearchPage */}
            <header 
                className="sticky top-0 left-0 w-full z-50 px-4 py-3 pb-4 border-none transition-all flex flex-col"
                style={{ background: 'linear-gradient(180deg, hsla(224, 39%, 58%, 1) 0%, hsla(224, 39%, 81%, 1) 100%)' }}
            >
                <div className="flex items-center gap-3">
                    <button
                        onClick={onBack}
                        className="flex items-center justify-center size-10 rounded-full hover:bg-white/10 transition-colors active:scale-95 shrink-0"
                    >
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </button>
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            className="w-full bg-white border-0 outline outline-1 outline-slate-200/50 rounded-lg pl-10 pr-3 py-2.5 text-sm font-semibold focus:outline-2 focus:outline-brand-blue/30 transition-all placeholder:text-slate-400"
                            placeholder="Search for goods and services..."
                            type="text"
                            value={searchQuery}
                            onFocus={() => setIsSearching(true)}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setIsSearching(true);
                            }}
                        />
                    </div>
                    <button className="flex items-center justify-center size-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors active:scale-95 shrink-0">
                        <SlidersHorizontal className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Typesense-style Dropdown Search Overlay */}
                {isSearching && (
                    <div className="absolute top-[100%] left-0 right-0 bg-white shadow-2xl border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200 z-[100] max-h-[70vh] overflow-y-auto hide-scrollbar">
                        <div className="flex flex-col">
                            {!searchQuery ? (
                                <>
                                    <div className="px-4 py-3 bg-slate-50/50 border-b border-slate-100">
                                        <span className="text-[10px] font-black text-slate-400 tracking-[0.15em]">Recent Searches</span>
                                    </div>
                                    {[
                                        "Hydraulic Valves",
                                        "Industrial Bearings",
                                        "Power Generators 50kVA"
                                    ].map((item, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setSearchQuery(item);
                                                setIsSearching(false);
                                                onOpenSearch?.();
                                            }}
                                            className="w-full flex items-center justify-between px-4 py-3.5 border-b border-slate-50 hover:bg-slate-50 active:bg-slate-100 transition-colors text-left group"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <History className="w-4 h-4 text-slate-400 group-hover:text-brand-blue transition-colors shrink-0" />
                                                <span className="text-[15px] font-medium text-slate-700 truncate">{item}</span>
                                            </div>
                                            <ArrowUpLeft className="w-4 h-4 text-slate-300 group-hover:text-brand-blue transition-colors shrink-0 ml-2" />
                                        </button>
                                    ))}
                                </>
                            ) : (
                                (() => {
                                    const matchedSuggestions = [
                                        { name: "Centrifugal Water Pump for Industrial Irrigation", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfE1vWrW9fM1qDnsVTCzFqc2Jy15k7VP7jDw0XiI7xBOfxl7CWNKpfKdjt6a1Cn33Jpdq5MfcO_of6I22NUlUj36lgqyMCeOvmJR8GitEkCqQZiUjbEuJkeyFlPZbJJZNRjRGdjiPQ3BDTz41vT-C9Kf0fujSyKMpFqKKUoHHDvx3dsV1nvNg0cHQstk1BrURc7ItmCIAj3X9NCmR-lsetujm_o2q8jh4cOHCBQdIkTc-ghPhMwHQbQxnkO0k_crtHgpSqnHaeyeE" },
                                        { name: "High Pressure Multistage Industrial Pump", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfE1vWrW9fM1qDnsVTCzFqc2Jy15k7VP7jDw0XiI7xBOfxl7CWNKpfKdjt6a1Cn33Jpdq5MfcO_of6I22NUlUj36lgqyMCeOvmJR8GitEkCqQZiUjbEuJkeyFlPZbJJZNRjRGdjiPQ3BDTz41vT-C9Kf0fujSyKMpFqKKUoHHDvx3dsV1nvNg0cHQstk1BrURc7ItmCIAj3X9NCmR-lsetujm_o2q8jh4cOHCBQdIkTc-ghPhMwHQbQxnkO0k_crtHgpSqnHaeyeE" },
                                        { name: "Submersible Deep Well Boring Pump", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBILnvcu5s-Xbr0TNxlp7XRXG7rN0_jj2EnJ1u8Q-528ofDmhIcokhHyEPLVm_oI6J4PeYomB63uykCvvejheTfbQgTRlc45jP6f6S7oMRYBnHsewJphReFev55IjHAYRAe_T671DvHBOt0wADYqEcVR-7C5Ci6Ky-pJsZwab1aQdfPFy8I-EZIrE5GUvz46hBaE0jh5D_k_ytSHQRs19E7eLcOG0ah3B2EqnFak8Dg3XgsynBpm5H0k2qIAiqQfGPYz0zV3l6xD-E" },
                                        { name: "Vertical Turbine Pumps", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBILnvcu5s-Xbr0TNxlp7XRXG7rN0_jj2EnJ1u8Q-528ofDmhIcokhHyEPLVm_oI6J4PeYomB63uykCvvejheTfbQgTRlc45jP6f6S7oMRYBnHsewJphReFev55IjHAYRAe_T671DvHBOt0wADYqEcVR-7C5Ci6Ky-pJsZwab1aQdfPFy8I-EZIrE5GUvz46hBaE0jh5D_k_ytSHQRs19E7eLcOG0ah3B2EqnFak8Dg3XgsynBpm5H0k2qIAiqQfGPYz0zV3l6xD-E" },
                                        { name: "Chemical Pumps", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBILnvcu5s-Xbr0TNxlp7XRXG7rN0_jj2EnJ1u8Q-528ofDmhIcokhHyEPLVm_oI6J4PeYomB63uykCvvejheTfbQgTRlc45jP6f6S7oMRYBnHsewJphReFev55IjHAYRAe_T671DvHBOt0wADYqEcVR-7C5Ci6Ky-pJsZwab1aQdfPFy8I-EZIrE5GUvz46hBaE0jh5D_k_ytSHQRs19E7eLcOG0ah3B2EqnFak8Dg3XgsynBpm5H0k2qIAiqQfGPYz0zV3l6xD-E" },
                                        { name: "Electric Water Pump", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBILnvcu5s-Xbr0TNxlp7XRXG7rN0_jj2EnJ1u8Q-528ofDmhIcokhHyEPLVm_oI6J4PeYomB63uykCvvejheTfbQgTRlc45jP6f6S7oMRYBnHsewJphReFev55IjHAYRAe_T671DvHBOt0wADYqEcVR-7C5Ci6Ky-pJsZwab1aQdfPFy8I-EZIrE5GUvz46hBaE0jh5D_k_ytSHQRs19E7eLcOG0ah3B2EqnFak8Dg3XgsynBpm5H0k2qIAiqQfGPYz0zV3l6xD-E" },
                                        { name: "Monoblock Pumps", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBILnvcu5s-Xbr0TNxlp7XRXG7rN0_jj2EnJ1u8Q-528ofDmhIcokhHyEPLVm_oI6J4PeYomB63uykCvvejheTfbQgTRlc45jP6f6S7oMRYBnHsewJphReFev55IjHAYRAe_T671DvHBOt0wADYqEcVR-7C5Ci6Ky-pJsZwab1aQdfPFy8I-EZIrE5GUvz46hBaE0jh5D_k_ytSHQRs19E7eLcOG0ah3B2EqnFak8Dg3XgsynBpm5H0k2qIAiqQfGPYz0zV3l6xD-E" },
                                        { name: "Pressure Booster System", img: "https://images.unsplash.com/photo-1509391366360-1e97d5259d81?auto=format&fit=crop&q=80&w=400" }
                                    ].filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

                                    if (matchedSuggestions.length === 0) {
                                        return (
                                            <div className="px-4 py-8 text-center text-slate-500 text-sm font-medium">
                                                No suggestions found for "{searchQuery}"
                                            </div>
                                        );
                                    }

                                    return matchedSuggestions.map((item, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setSearchQuery(item.name);
                                                setIsSearching(false);
                                                onOpenSearch?.();
                                            }}
                                            className="w-full flex items-center justify-between px-4 py-3 border-b border-slate-50 hover:bg-slate-50 active:bg-slate-100 transition-colors text-left group"
                                        >
                                            <div className="flex items-center gap-4 min-w-0">
                                                <div className="size-10 rounded-lg bg-slate-50 overflow-hidden flex-shrink-0 border border-slate-100 group-hover:border-slate-200 transition-colors shadow-sm">
                                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-[14px] font-bold text-slate-800 truncate leading-tight">{item.name}</span>
                                                </div>
                                            </div>
                                            <ArrowUpLeft className="w-4 h-4 text-slate-300 group-hover:text-brand-blue transition-colors shrink-0 ml-2" />
                                        </button>
                                    ));
                                })()
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Backdrop for searching */}
            {isSearching && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[40]"
                    onClick={() => setIsSearching(false)}
                ></div>
            )}

            <main className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
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
                    {hasPricing && (
                        <div className="flex flex-col gap-1">
                            <div className="text-[18px] font-extrabold text-brand-blue">₹ 45,000 - ₹ 55,000 / Unit</div>
                            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Min Order: 2 Units</div>
                        </div>
                    )}

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
                {!isSearching && (
                    <section className="px-4 py-4 bg-white border-b border-slate-50">
                        <div className="flex gap-3">
                            {hasPricing ? (
                                <button
                                    onClick={onMessage}
                                    className="flex-1 h-11 bg-brand-blue text-white font-bold rounded-lg shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-95"
                                >
                                    <span className="material-symbols-outlined text-white">message</span>
                                    Message
                                </button>
                            ) : (
                                <button
                                    onClick={onGetQuote}
                                    className="flex-1 h-11 bg-brand-blue text-white font-bold rounded-lg shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-95"
                                >
                                    <span className="material-symbols-outlined text-white">mail</span>
                                    Get Quote
                                </button>
                            )}
                            <button className="flex-1 h-11 border border-brand-blue text-brand-blue font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                                <span className="material-symbols-outlined">call</span>
                                Contact Supplier
                            </button>
                        </div>
                    </section>
                )}

                {/* Product Details */}
                <div className="bg-[#f8f9fc] mt-2 space-y-2 flex-1 flex flex-col">
                    {/* Specifications */}
                    <section className="bg-white p-4">
                        <h3 className="text-sm font-extrabold text-slate-900 tracking-widest mb-4">Core Specifications</h3>
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
                        <h3 className="text-sm font-extrabold text-slate-900 tracking-widest mb-3">Product Overview</h3>
                        <div className="text-sm text-slate-600 leading-relaxed">
                            <p>The Model X-200 is a high-performance industrial pump engineered for maximum durability and efficient fluid transport in demanding manufacturing environments. This unit provides a reliable, high-pressure output with an integrated vibration-dampening system for quiet operation.</p>
                        </div>
                    </section>

                    {/* Suggested for You */}
                    <section className="bg-white p-4">
                        <h3 className="text-sm font-extrabold text-slate-900 tracking-widest mb-4">Suggested for You</h3>
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

                    {/* Reviews Section */}
                    <section className="mt-6 px-4 pb-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex flex-col">
                                <h3 className="text-sm font-extrabold text-slate-900 tracking-widest">Customer Reviews</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 font-display">Voices from the field</p>
                            </div>
                            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span className="text-sm font-black text-slate-800 tracking-tighter">4.9</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">(124)</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { name: "Samuel T.", rating: 5, date: "2 days ago", comment: "Excellent build quality. The pressure tolerance is exactly as specified in the technical sheet. Highly recommended for industrial use." },
                                { name: "Martha J.", rating: 4, date: "1 week ago", comment: "Good product, arrived on time. The packaging was very secure." },
                                { name: "David K.", rating: 5, date: "2 weeks ago", comment: "Fast delivery to Gbarnga. The supplier was very responsive to my quotes." }
                            ].map((review, idx) => (
                                <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue font-black text-sm">
                                                {review.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900 leading-none">{review.name}</p>
                                                <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest">{review.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-100'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed font-medium italic">"{review.comment}"</p>
                                </div>
                            ))}

                            <button className="w-full py-4.5 text-[11px] font-black text-brand-blue uppercase tracking-[0.2em] border-2 border-brand-blue/5 bg-brand-blue/5 rounded-2xl active:scale-95 transition-all">
                                See All 124 Reviews
                            </button>
                        </div>
                    </section>

                    {/* Recent Search Products (Horizontal Scroll) */}
                    <section className="bg-white p-4 pb-20 flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-extrabold text-slate-900 tracking-widest">Recent Search Products</h3>
                        </div>
                        <div className="grid grid-rows-2 grid-flow-col gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 mt-2">
                            {[
                                { 
                                    name: "High Pressure Industrial Valve", 
                                    price: "₹ 15,000",
                                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtEhgM5RszclO5KEqOSC4enXKQhEUX39tEHVoBrlAQFrpbLhZ-h-E-wlMnK7CE0aqxKKXJKzkUV9hFpA5SkqP952Os_pohblYz_voalibq9oof3ivqwSzK_GRBlwtqv2FaAFCSbDEYyaDe-07lwbYqHDsQCJiPE9ZEkVz6OBxtydlgjAvrNnDT2VJUP0pJyc5274rycgsEQpHDXkHc747G2HQkT94k3szOpw3eJcuE6XVo3ln6MAsHVmoDQz8pFS7dz7LMrkQuEic"
                                },
                                { 
                                    name: "Heavy Duty Gearbox", 
                                    price: "₹ 45,000",
                                    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=200"
                                },
                                { 
                                    name: "Precision Calibration Gauge", 
                                    price: "₹ 8,500",
                                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhReHxSnM7k3ulnaWc0yeIbxi4_CUGJiJaaXShq46Z6VFQzIpYuMi9wPpWgmoa0Fov1G-RzXa38RPSI-LTlexAsvjOQ_mZJyDinmB5rTTl2HcV6tJlFeLrMB_-4fjGxx0qlwXKxcJwR5S56wopk-34Z79COMNhQdeOCnl1-qzsAtQWqoUN4h602PZune8aueFh4wEOzcq2OiJKaxZfl-pJElDnDDkETCh1_zU4aqWMeiub7tXsrfaHWs9Kt9oEXIAdTl05NflmYSQ"
                                },
                                { 
                                    name: "Steel Bearings Set", 
                                    price: "₹ 2,400",
                                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAc6349knFoY_hjk7yViNCIdXv7BwVamwDU0kPB860OHR1QGVFaJPSJ6fTmBwPMGzsuXqAcXzkzRWWg1ofyiceqwMN0diY0C_Zg652tVXAQ34gFOeDH2BfbBqrWPOFYOwjJSRcTqgum8pHuDTZvXf-OZWyd8AkMu012FmC6wAwklGHdZFboDN25COaXxJeLzuVJgdfkj_8M1jpqCEKp_X9cjt4vHQpYVu1fdX6hEMqPA5prF2J_RNnJIacwMMucoepnFsGYMWVoro"
                                },
                                { 
                                    name: "Industrial Turbine Blade", 
                                    price: "₹ 1,20,000",
                                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfE1vWrW9fM1qDnsVTCzFqc2Jy15k7VP7jDw0XiI7xBOfxl7CWNKpfKdjt6a1Cn33Jpdq5MfcO_of6I22NUlUj36lgqyMCeOvmJR8GitEkCqQZiUjbEuJkeyFlPZbJJZNRjRGdjiPQ3BDTz41vT-C9Kf0fujSyKMpFqKKUoHHDvx3dsV1nvNg0cHQstk1BrURc7ItmCIAj3X9NCmR-lsetujm_o2q8jh4cOHCBQdIkTc-ghPhMwHQbQxnkO0k_crtHgpSqnHaeyeE"
                                },
                                { 
                                    name: "Industrial Drill Bit", 
                                    price: "₹ 1,800",
                                    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=200"
                                },
                                { 
                                    name: "Hydraulic Pump Connector", 
                                    price: "₹ 4,200",
                                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSjf80DhylwWljUQoEOpcfZOPRM01cwfBfhKzmP_JbbjshsFDIK_hganN9DSsgYNeJGK1KmX29e3lPv-iOjGssSLdnklZ95ggANiP7xLo3Uc-JbHFiTTWtUtRwWPgVJagrwdSDh_rgJXOA5YnHaDlCJXLJzMMEfEa2x79Kw0TdUbafJiRbhcOiUewUA5jZuRdeYdsySt9ILbp-XdVJCqLJqR2jBrlymEuVzck0RbaNHgSxDgmTudLFqG0ZikvN5voMBSUzeKAOn1E"
                                },
                                { 
                                    name: "Commercial Grade Pipe", 
                                    price: "₹ 3,500",
                                    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=200"
                                }
                            ].map((product, idx) => (
                                <div key={idx} className="flex-none w-[140px] snap-start space-y-2">
                                    <div className="w-full aspect-square bg-slate-50 rounded-xl border border-slate-100 overflow-hidden relative shadow-sm">
                                        <Image
                                            className="object-cover"
                                            alt={product.name}
                                            src={product.img}
                                            fill
                                        />
                                    </div>
                                    <div className="space-y-0.5">
                                        <h5 className="text-[11px] font-bold text-slate-900 line-clamp-2 leading-tight h-8">{product.name}</h5>
                                        <p className="text-[12px] font-extrabold text-brand-blue">{product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

            </main>
        </div>
    );
};

export default ProductDetailsPage;
