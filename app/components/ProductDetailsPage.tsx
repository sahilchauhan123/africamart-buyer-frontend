import React from 'react';
import Image from 'next/image';
import { Search, SlidersHorizontal, ArrowLeft, MapPin, XCircle, ArrowUpLeft, History, Star, ShieldCheck, Phone, MessageSquare, ChevronRight, Info, Clock, Truck, Share2, Heart } from 'lucide-react';

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
        <div className="bg-[#f6f6f8] min-h-[100dvh] text-slate-900 antialiased pb-24 md:pb-0 font-display animate-in slide-in-from-right duration-300 flex flex-col">
            {/* Search Header - Exact copy from SearchPage as requested */}
            <header
                className="sticky top-0 left-0 w-full z-50 py-3 pb-4 border-none transition-all flex flex-col"
                style={{ background: 'linear-gradient(180deg, hsla(224, 39%, 58%, 1) 0%, hsla(224, 39%, 81%, 1) 100%)' }}
            >
                <div className="max-w-screen-xl mx-auto w-full px-4 flex items-center gap-3">
                    <button
                        onClick={onBack}
                        className="flex items-center justify-center size-10 rounded-full hover:bg-white/10 transition-colors active:scale-95 shrink-0"
                    >
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </button>
                    <div className="flex-1 relative max-w-2xl">
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

                {/* Search Dropdown Overlay */}
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
                                <div className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Suggestions for "{searchQuery}"</div>
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

            <main className="max-w-screen-xl mx-auto w-full flex-1 flex flex-col">
                {/* Image Gallery */}
                <section className="bg-white relative border-b border-slate-100">
                    <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar h-[350px]">
                        <div className="flex-none w-full snap-center flex items-center justify-center p-6">
                            <div className="w-full h-full relative">
                                <Image
                                    className="object-contain"
                                    alt="Product Main View"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfE1vWrW9fM1qDnsVTCzFqc2Jy15k7VP7jDw0XiI7xBOfxl7CWNKpfKdjt6a1Cn33Jpdq5MfcO_of6I22NUlUj36lgqyMCeOvmJR8GitEkCqQZiUjbEuJkeyFlPZbJJZNRjRGdjiPQ3BDTz41vT-C9Kf0fujSyKMpFqKKUoHHDvx3dsV1nvNg0cHQstk1BrURc7ItmCIAj3X9NCmR-lsetujm_o2q8jh4cOHCBQdIkTc-ghPhMwHQbQxnkO0k_crtHgpSqnHaeyeE"
                                    fill
                                    priority
                                />
                            </div>
                        </div>
                        <div className="flex-none w-full snap-center flex items-center justify-center p-6 bg-slate-50">
                            <div className="w-full h-full relative">
                                <Image
                                    className="object-contain p-4 opacity-80"
                                    alt="Technical View"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtEhgM5RszclO5KEqOSC4enXKQhEUX39tEHVoBrlAQFrpbLhZ-h-E-wlMnK7CE0aqxKKXJKzkUV9hFpA5SkqP952Os_pohblYz_voalibq9oof3ivqwSzK_GRBlwtqv2FaAFCSbDEYyaDe-07lwbYqHDsQCJiPE9ZEkVz6OBxtydlgjAvrNnDT2VJUP0pJyc5274rycgsEQpHDXkHc747G2HQkT94k3szOpw3eJcuE6XVo3ln6MAsHVmoDQz8pFS7dz7LMrkQuEic"
                                    fill
                                />
                            </div>
                        </div>
                    </div>
                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-1.5 pb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0026C0]"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                    </div>
                    {/* Utility Buttons */}
                    <button className="absolute top-4 right-4 size-10 bg-white/80 backdrop-blur shadow-sm rounded-full flex items-center justify-center border border-slate-100 z-10">
                        <Share2 className="w-5 h-5 text-slate-400" />
                    </button>
                </section>

                {/* Breadcrumbs (Consistent with Desktop) */}
                <nav className="px-4 py-3 bg-white border-b border-slate-50 flex items-center gap-2 text-[10px] font-bold text-slate-400 overflow-hidden whitespace-nowrap">
                    <span>AfricaMart</span>
                    <ChevronRight className="w-3 h-3" />
                    <span>Cereals & Grains</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-slate-900 truncate">Heavy Duty Industrial Pump</span>
                </nav>

                {/* Product Core Info */}
                <section className="bg-white px-4 py-6 space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-xl font-black text-slate-900 leading-tight">
                            Heavy Duty Industrial Pump Model X-200
                        </h1>
                    </div>

                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">₹ 45,000</span>
                        <span className="text-lg font-bold text-slate-500">/ Unit</span>
                        <button className="text-sm font-bold text-[#0026C0] hover:underline ml-2">Get Latest Price</button>
                    </div>
                </section>

                {/* Action Area (Submit Requirement - Same as Desktop) */}
                <section className="bg-white px-4 py-6 border-y border-slate-100 group">
                    <div className="bg-slate-50 rounded border border-slate-200 p-4 space-y-4">
                        <div className="flex gap-3">
                            <input
                                className="flex-grow h-12 bg-white border border-slate-200 rounded px-4 font-bold text-base outline-none focus:border-[#0026C0] transition-colors"
                                placeholder="Enter Quantity"
                                type="number"
                            />
                            <div className="relative w-32">
                                <select className="appearance-none w-full h-12 bg-white border border-slate-200 rounded px-4 font-black text-slate-700 outline-none cursor-pointer pr-10 focus:border-[#0026C0] transition-colors text-sm">
                                    <option>Units</option>
                                    <option>Metric Ton</option>
                                </select>
                                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90" />
                            </div>
                        </div>
                        <button className="w-full h-14 bg-[#2B3595] text-white font-black rounded text-sm shadow-lg shadow-[#2B3595]/15 active:scale-[0.98] transition-all">
                            Submit Requirement
                        </button>
                    </div>
                </section>

                {/* Specs Table (Consistent with Desktop) */}
                <section className="mt-2 bg-white border-y border-slate-100">
                    <div className="px-4 py-4 border-b border-slate-100">
                        <h4 className="text-xs font-black text-slate-500">Product Details</h4>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {[
                            ["Grade", "Mogra"],
                            ["Processing Type", "Steam"],
                            ["Packaging Size", "30 kg"],
                            ["Type", "Industrial X-200"],
                            ["Power Source", "Electric (3-Phase)"],
                            ["Brand", "Taujee"],
                            ["Packaging Type", "Standard"],
                            ["Country of Origin", "Made in Africa"],
                            ["Availability", "In Stock"]
                        ].map(([label, value]) => (
                            <div key={label} className="grid grid-cols-2 px-4 py-4">
                                <span className="text-sm font-medium text-slate-400">{label}</span>
                                <span className="text-sm font-bold text-slate-900">{value}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Description (Italicized as seen in Desktop) */}
                <section className="bg-white px-4 py-6 border-b border-slate-100">
                    <p className="text-slate-600 text-sm leading-relaxed italic">
                        The Model X-200 is a premium quality industrial pump, meticulously processed to maintain its natural aroma and elongated grain structure. Ideal for industrial catering and large-scale distribution.
                    </p>
                </section>

                {/* Seller/Supplier Section (Consistent with Desktop aside-bar) */}
                <section className="mt-2 bg-white px-4 py-6 border-y border-slate-100 space-y-4">
                    <div className="flex items-center gap-1 text-[13px] text-slate-500">
                        <MapPin className="w-4 h-4" />
                        <span>Ludhiana, Punjab</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight">Bansal Enterprises Ltd.</h3>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 bg-green-500/10 text-green-600 px-2 py-0.5 rounded text-[10px] font-black">
                            <ShieldCheck className="w-3 h-3" />
                            Verified
                        </div>
                        <span className="text-[11px] font-bold text-slate-400">2 yrs Member</span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? 'fill-current' : 'text-slate-100'}`} />
                            ))}
                        </div>
                        <span className="text-sm font-bold text-slate-900">4.8</span>
                        <span className="text-xs text-[#0026C0] font-bold hover:underline cursor-pointer">(124)</span>
                        <div className="h-3 w-px bg-slate-200 mx-2"></div>
                        <span className="text-[10px] font-bold text-green-600">88% Response</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4 pt-2">
                        <button className="h-11 rounded border border-slate-200 flex items-center justify-center gap-2 text-xs font-black text-[#0026C0] hover:bg-slate-50 active:scale-95 transition-all">
                            <Phone className="w-3.5 h-3.5" />
                            Call Now
                        </button>
                        <button className="h-11 bg-[#0026C0] rounded flex items-center justify-center gap-2 text-xs font-black text-white hover:bg-[#0020A0] active:scale-95 transition-all shadow-sm">
                            <MessageSquare className="w-4 h-4" />
                            Contact Supplier
                        </button>
                    </div>

                    {/* Legal/Firm Status Section (from Desktop DesktopProductDetails.tsx) */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-50 mt-4">
                        <div>
                            <p className="text-[9px] font-bold text-slate-400 mb-0.5">Legal Status</p>
                            <p className="text-xs font-black text-slate-800">Proprietorship</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-slate-400 mb-0.5">GST Reg. Date</p>
                            <p className="text-xs font-black text-slate-800">17-12-2020</p>
                        </div>
                        <div className="pt-2">
                            <p className="text-[9px] font-bold text-slate-400 mb-0.5">Annual Turnover</p>
                            <p className="text-xs font-black text-slate-800">1.5 - 5 Cr</p>
                        </div>
                        <div className="pt-2">
                            <p className="text-[9px] font-bold text-slate-400 mb-0.5">Member Since</p>
                            <p className="text-xs font-black text-slate-800">Nov 2024</p>
                        </div>
                    </div>
                </section>

                {/* Recommended (Suggested products) */}
                <section className="mt-2 bg-white px-4 py-6 border-y border-slate-100 pb-32">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-black text-slate-900">Recommended for You</h2>
                        <button className="text-[#0026C0] font-black text-xs">See All</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { name: "Long Grain Parboiled Rice", price: "₹ 2,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEvFQB1H88fuOka7yp8h49qObv55xA1cM6DKc7JIAZgAW7orn15wB_v3qPidwWKuzWeRACovWHghmMy9z_0m6eDQ6D-wCEVAYTqGLzJYDYx5Qcz80z-dZRZBVFzrnCxBLJuZVzJaLmmYmH9BMwTgl_SP4PrtIy-cT_TFFfhmuM6z3p5Odq5dslAFKgEvT6HTQIajdF_VHTmPM14TCJG5xU0LaTyOu7wezQl2N-cMr_i3YJYk8h8D6j8jbN1PHNfJInF62lsI9UQVE" },
                            { name: "Golden Sella Basmati", price: "₹ 4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfE1vWrW9fM1qDnsVTCzFqc2Jy15k7VP7jDw0XiI7xBOfxl7CWNKpfKdjt6a1Cn33Jpdq5MfcO_of6I22NUlUj36lgqyMCeOvmJR8GitEkCqQZiUjbEuJkeyFlPZbJJZNRjRGdjiPQ3BDTz41vT-C9Kf0fujSyKMpFqKKUoHHDvx3dsV1nvNg0cHQstk1BrURc7ItmCIAj3X9NCmR-lsetujm_o2q8jh4cOHCBQdIkTc-ghPhMwHQbQxnkO0k_crtHgpSqnHaeyeE" },
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col gap-2">
                                <div className="aspect-square bg-slate-50 border border-slate-100 rounded overflow-hidden relative">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="text-[11px] font-bold text-slate-800 line-clamp-2 leading-tight">{item.name}</h4>
                                    <p className="text-[12px] font-black text-[#0026C0]">{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Fixed Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-3 h-[76px] flex items-center gap-3 z-[60] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe">
                <button
                    onClick={onGetQuote}
                    className="flex-3 h-14 border border-slate-200 rounded-lg flex items-center justify-center gap-2 text-sm font-black text-[#0026C0] active:scale-95 transition-all"
                >
                    <Phone className="w-4 h-4" />
                    Call Now
                </button>
                <button
                    onClick={onMessage}
                    className="flex-4 h-14 bg-[#0026C0] text-white font-black text-sm rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-[#0026C0]/15"
                >
                    <MessageSquare className="w-5 h-5 flex-shrink-0" />
                    Contact Supplier
                </button>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
