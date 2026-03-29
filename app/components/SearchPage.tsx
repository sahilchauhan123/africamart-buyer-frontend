"use client";

import React, { useState } from 'react';
import { ArrowLeft, Search, XCircle, History, ArrowUpLeft, LayoutGrid, SlidersHorizontal, Star, MapPin, ChevronDown, X, Globe, Check } from 'lucide-react';

interface SearchPageProps {
    onBack: () => void;
}

const FilterOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [selectedLocations, setSelectedLocations] = useState<string[]>(["Monrovia"]);
    const [showAfricanRegions, setShowAfricanRegions] = useState(false);

    const liberianLocations = [
        "Monrovia", "Gbarnga", "Buchanan", "Kakata", "Ganta", "Harper"
    ];

    const regions = [
        "West Africa", "East Africa", "North Africa", "Southern Africa", "Central Africa"
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end animate-in fade-in duration-300">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Bottom Sheet Content */}
            <div className="relative bg-[#f8f9fc] rounded-t-[32px] max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-500">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white sticky top-0 z-10">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Filter Search</h2>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Customize your results</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors active:scale-90"
                    >
                        <X className="w-5 h-5 text-slate-600" />
                    </button>
                </div>

                {/* Filter Options Scrollable Area */}
                <div className="flex-1 overflow-y-auto p-6 pt-4 space-y-8 hide-scrollbar">
                    {/* Liberia Locations */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-4 h-4 text-brand-blue" />
                            <h3 className="text-[11px] font-black text-slate-900 tracking-[0.15em]">Liberia Locations</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2.5">
                            {liberianLocations.map((location) => (
                                <button
                                    key={location}
                                    onClick={() => {
                                        if (selectedLocations.includes(location)) {
                                            setSelectedLocations(selectedLocations.filter(l => l !== location));
                                        } else {
                                            setSelectedLocations([...selectedLocations, location]);
                                        }
                                    }}
                                    className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all active:scale-[0.98] ${selectedLocations.includes(location)
                                        ? 'border-brand-blue bg-brand-blue/5 text-brand-blue ring-1 ring-brand-blue/20 shadow-none'
                                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 shadow-none'
                                        }`}
                                >
                                    <span className="text-xs font-bold">{location}</span>
                                    {selectedLocations.includes(location) && <Check size={14} className="stroke-[3]" />}
                                </button>
                            ))}
                        </div>
                    </section>

                   
                   
                    {/* Price Range */}
                    <section>
                        <h3 className="text-[11px] font-black text-slate-900 tracking-[0.15em] mb-4">Budget Range (USD)</h3>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">$</span>
                                <input
                                    className="w-full bg-white border-2 border-slate-200 rounded-xl py-4 pl-7 pr-4 text-sm font-bold focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue/40 shadow-none transition-all placeholder:text-slate-300"
                                    placeholder="Min"
                                    type="number"
                                />
                            </div>
                            <div className="h-[2px] w-4 bg-slate-200"></div>
                            <div className="flex-1 relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">$</span>
                                <input
                                    className="w-full bg-white border-2 border-slate-200 rounded-xl py-4 pl-7 pr-4 text-sm font-bold focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue/40 shadow-none transition-all placeholder:text-slate-300"
                                    placeholder="Max"
                                    type="number"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Ratings */}
                    <section className="pb-8">
                        <h3 className="text-[11px] font-black text-slate-900 tracking-[0.15em] mb-4">Minimum Rating</h3>
                        <div className="flex flex-col gap-3">
                            {[4.5, 4.0, 3.5].map((stars) => (
                                <label key={stars} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl cursor-pointer border border-transparent hover:border-slate-200 active:bg-slate-100 transition-all">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center text-amber-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} className={`${i < Math.floor(stars) ? 'fill-amber-500' : 'text-slate-200'}`} />
                                            ))}
                                        </div>
                                        <span className="text-xs font-bold text-slate-700">{stars} & Above</span>
                                    </div>
                                    <input
                                        type="radio"
                                        name="rating"
                                        className="w-5 h-5 border-slate-300 text-brand-blue focus:ring-brand-blue/20"
                                    />
                                </label>
                            ))}
                        </div>
                    </section>
                    
                    {/* African Regions with Toggle */}
                    <section className="pb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-brand-blue" />
                                <h3 className="text-[11px] font-black text-slate-900 tracking-[0.15em]">African Regions</h3>
                            </div>
                            
                            <label className="flex items-center cursor-pointer group">
                                <span className="mr-2 text-[8px] font-black text-slate-400 tracking-wider group-hover:text-brand-blue transition-colors">Regional Search</span>
                                <div className="relative">
                                    <input 
                                        type="checkbox" 
                                        className="sr-only" 
                                        checked={showAfricanRegions}
                                        onChange={() => setShowAfricanRegions(!showAfricanRegions)}
                                    />
                                    <div className={`w-8 h-4 rounded-full transition-colors duration-300 ${showAfricanRegions ? 'bg-brand-blue' : 'bg-slate-200'}`}></div>
                                    <div className={`absolute left-0.5 top-0.5 bg-white w-3 h-3 rounded-full transition-transform duration-300 transform ${showAfricanRegions ? 'translate-x-4' : ''}`}></div>
                                </div>
                            </label>
                        </div>
                        
                        {showAfricanRegions ? (
                            <div className="flex flex-wrap gap-2 animate-in zoom-in-95 fade-in duration-300">
                                {regions.map((region) => (
                                    <button
                                        key={region}
                                        onClick={() => setSelectedRegion(selectedRegion === region ? null : region)}
                                        className={`px-5 py-2.5 rounded-full border text-xs font-bold transition-all active:scale-95 ${selectedRegion === region
                                            ? 'border-brand-blue bg-brand-blue text-white shadow-md shadow-brand-blue/20'
                                            : 'border-slate-100 bg-white text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        {region}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-brand-blue/5 border border-dashed border-brand-blue/10 rounded-2xl p-4 text-center">
                                <p className="text-[10px] font-bold text-slate-400 tracking-widest leading-relaxed">
                                    Toggle "Regional Search" to browse <br/> suppliers across Africa
                                </p>
                            </div>
                        )}
                    </section>

                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-slate-100 flex gap-4 bg-white sticky bottom-0 z-10 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                    <button
                        onClick={onClose}
                        className="flex-1 py-4 px-4 bg-slate-100 text-slate-900 rounded-2xl font-black text-xs tracking-widest transition-colors hover:bg-slate-200 active:scale-95"
                    >
                        Reset
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-[2.5] py-4 px-4 bg-brand-blue text-white rounded-2xl font-black text-xs tracking-widest shadow-xl shadow-brand-blue/30 transition-all hover:brightness-110 active:scale-95 flex items-center justify-center gap-2"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

const SearchPage: React.FC<SearchPageProps> = ({ onBack }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const recentSearches = [
        "Hydraulic Valves",
        "Industrial Bearings",
        "Power Generators 50kVA"
    ];

    const trendingCategories = [
        { name: "SAFETY GEAR", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1g2xINqNDKemD6nh_g-0Pq8IThRFHfawD-fGcZCmlpoLl2tg2EpZPbZENTFrtmbbcv1cbhYKBlnAKtTDGOVNy3kra5BeT-d_MPI8Q7_hr1H75cGBB1CLJidLNmxeJN9yGUzIEvBCku-QCgwWTieTAURCTedEpS3x-3SYDGztPFUEBVAXgnrGBb4_Ti6o7u7wLxSau0l_9wCkMkT8leifR59nlXTAFPQrP-4gG82SuyVbL6KWM1WntS5_L7BiWanqY61eyJjwtnmc" },
        { name: "ELECTRICAL", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJJmABePJxVte4DZF0jlhVQjBsabLc7RQjTxm1UktJSAOFPsl0jFjdvudLcC3PvsFwCUNRLc0r-pd5iXCoh3pwZstzrtPEI9pQ9WUaCwITg_bTlPAvyXNAPB05VCxNQS_dIv8WamgLzn9qslHoBu6sjfbFVR9zMKEZuiGkNIS_N9HqpfspMM7ubt-GWJuzbtMdLi8bweTANh8Pd429NcpAWCKt5Yqj_Hu2FdxMUPgbWsIgI6O0smpqaXHtd_coUKJ-bSw3Zivu_2I" },
        { name: "MACHINERY", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCble0FZiVuNDud-0bOcLPj95uZCGvQHcqzyzkZs4UoVtEEG7sLJJBuD41y8Sn2cn8TXDhwFQSlBODyEG6bhppmTlAXXhnOj4Cn3yrM2j5-6tsG_OGlqwYoRT-8aHvFX0OZgPoVjwKMZoOxBN4gfb48Mgi8RlxQM11ZTTHU32PkFBc5Fj4Ctx1G3YwUBg0VtfQ_k51SM4-OE5V2SQnYIQQSGt3CQ1eMyWNf2GCuRyHfgflbUbc3SgmvRyj_FGBDbjdYI3-OC8_C9uk" },
        { name: "OFFICE", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7SoWhxWRCXDKaoHqRnldk3VCffZEQPn16ekfsCyaGtbI400RqaZSvPiMz_LwabVNc8kSEKBf2mmi_4yKbGpNcpaSzU14AgyxlmWmDd8H8Eb728Fw4cR0tlWunrb0zmDXDwljxXBD9modFlhRqGi0Q77OgKRRSC3Q2PXWFsOI2fCdGfx-3jSrH8SLIhLsOYONTDBBWryJhE9j6wWX7EFcIzZVTVKsKkjhPZLUDPYM6JqdbtKQ59bu5wKzJiKXqTNLPmW0ouWnHYrg" },
        { name: "LAB SUPPLIES", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9gGzZgxOfnjeQj6St-avDakcRHlyJkDNdl7z-oiu99CcCffPBmGNkDIr2m1oF40U0lVp3Q9_plijciRWp0KXaFb-Am2YutCRnB93LvL7fr5aFnfogRfl3G2W-4qDrFtBUxlIx4JZCxvxqeVLpBuYjk-sMBUY6Qse2iZIrw51BZnI0Bw9-yNlPYKd5S1koYjOy8E91A7T-pEVY4smDFNqN6zxfQ-MrEGH78Wuu20M6zD--TeUR-j3KB1Ariib5KsBa3Csty79ra2E" },
        { name: "CONSTRUCTION", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVokc1LJVkyHYI1WXQvoq-xyX_UPOsZyfmD3KFKwXA0VEEo7bRhaSOPr9dRrEvbBrW6iPgxJB0VtpjznGYubtNuXjtVbrX-0gAlRag5_kcA3jntILuCR9W_74AC3-jP18Qt2fY0QAHrlBOXovgxVwbHUyomgjshiSomYmbwpQflGu1IH9byZg5LOdaQYkxYTwV3Z8zfIljxQNvetroLL9LgXXpAWvZVCWopCvPz8LTK6IoGtBHD0cw0IPj-UDAHx7l9hA9N2PYDp0" },
        { name: "PACKAGING", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRxleHOa8L5RuoFeDxSFHDpm7BZs0BI9ndw7CbvgiOL6unmnlLdNYIz1pWtG7YRPWY4Vs47tqKO76ZKR0B8lAkyaI0MOXYKgIklOTnO4pgq2pblayfL_Gr7SoWjqmtAtpliqrV2-FXaN98iR2IEjcv0O21NtSTKSA2JTP3LGy2S6yhxtexbBUu8KZpD4-LMMeoGJ1bsMuzVDxePS0hsYYHkMcVNUn_T0nvYEvnDQ0zhbXgK_J-1A9qCLOAJo0UYcsbALrrNNbmbI0" }
    ];



    return (
        <div className="bg-[#f6f6f8] min-h-screen font-display antialiased flex flex-col overflow-hidden">
            <FilterOverlay isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

            {/* Search Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3 pb-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onBack}
                        className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 transition-colors active:scale-95"
                    >
                        <ArrowLeft className="w-6 h-6 text-slate-700" />
                    </button>
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-blue w-5 h-5" />
                        <input
                            autoFocus
                            className="w-full bg-slate-100 border-none rounded-lg pl-10 pr-10 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-brand-blue/20 transition-all placeholder:text-slate-400"
                            placeholder="Search for goods and services..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <XCircle className="w-5 h-5 text-slate-400 fill-slate-200" />
                            </button>
                        )}
                    </div>
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="flex items-center justify-center size-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors active:scale-95"
                    >
                        <SlidersHorizontal className="w-5 h-5 text-slate-700" />
                    </button>
                </div>

                {/* Filter Chips - Only visible when searching */}
                {searchQuery && (
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-1 hide-scrollbar">
                        {['Location', 'Brand', 'Price Range', 'Ratings'].map((filter, idx) => (
                            <button
                                key={filter}
                                onClick={() => setIsFilterOpen(true)}
                                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all active:scale-95 ${idx === 0
                                    ? 'bg-brand-blue/10 text-brand-blue border-brand-blue/20'
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                {filter} <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                        ))}
                    </div>
                )}
            </header>

            <main className="flex-1 overflow-y-auto hide-scrollbar">
                {!searchQuery ? (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* Recent Searches Section */}
                        <section className="mt-4">
                            <div className="flex items-center justify-between px-4 mb-2">
                                <h2 className="text-[10px] font-black text-slate-400 tracking-[0.2em]">Recent Searches</h2>
                                <button className="text-[10px] font-black text-brand-blue tracking-wider hover:underline">Clear All</button>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {recentSearches.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSearchQuery(item)}
                                        className="w-full flex items-center justify-between px-4 py-4 active:bg-slate-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <History className="w-5 h-5 text-slate-400" />
                                            <span className="text-sm font-semibold text-slate-700">{item}</span>
                                        </div>
                                        <ArrowUpLeft className="w-4 h-4 text-slate-400" />
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Trending Categories */}
                        <section className="mt-8 px-4">
                            <h2 className="text-[10px] font-black text-slate-400 tracking-[0.2em] mb-4">Trending Categories</h2>
                            <div className="grid grid-cols-4 gap-x-4 gap-y-6">
                                {trendingCategories.map((cat, idx) => (
                                    <div key={idx} className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-transform">
                                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 group-hover:border-brand-blue transition-colors shadow-sm">
                                            <img className="w-full h-full object-cover" alt={cat.name} src={cat.img} />
                                        </div>
                                        <span className="text-[10px] font-black text-center leading-tight text-slate-600 uppercase tracking-wider">{cat.name}</span>
                                    </div>
                                ))}
                                <div className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-transform">
                                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 group-hover:border-brand-blue transition-colors shadow-sm">
                                        <LayoutGrid className="w-6 h-6 text-brand-blue" />
                                    </div>
                                    <span className="text-[10px] font-black text-center leading-tight text-slate-600 uppercase tracking-wider">ALL</span>
                                </div>
                            </div>
                        </section>

                        {/* Promotional Banner */}
                        <section className="mt-10 px-4 pb-10">
                            <div className="relative w-full h-32 rounded-xl overflow-hidden bg-brand-blue/5 border border-brand-blue/10 flex items-center">
                                <div className="px-6 relative z-10 max-w-[65%]">
                                    <h3 className="text-sm font-black text-slate-900 leading-tight tracking-tight">Need Custom Quotes?</h3>
                                    <p className="text-[10px] font-medium text-slate-600 mt-1">Post your requirement and get competitive prices from top suppliers.</p>
                                    <button className="mt-3 px-4 py-2 bg-brand-blue text-white text-[10px] font-black rounded-lg uppercase tracking-wider shadow-lg shadow-brand-blue/20 active:scale-95 transition-all">Post Requirement</button>
                                </div>
                                <div className="absolute right-0 top-0 h-full w-2/5">
                                    <img className="w-full h-full object-cover opacity-60 mix-blend-multiply grayscale" alt="Business Professionals" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEjlyn3yxQE34U2rsk-cHtig3RSFzsNNAaRXizgBb2iTH6IoAeAFqPw7zwivXX3NQ2AdaqIGCAd0_Za96vHZ6Zqr0sdpf-wvQ05iLp9lAckkT27UGfhsSTKHGSnF9wG3cpDL75_dWWf_-hVi74tGqeaxZFddSsvcLd-tkmFD40dLReSOv7HrhKmFOZUG3iTpaiIjw0l1RTTFvFnFcBZQ_m-3gC6xWygoPkaBaucBEcHvuM8j9NWpdSIE2JdLTeW1JvLr_GAPtKEQk" />
                                </div>
                            </div>
                        </section>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-200 bg-white shadow-sm border-t border-slate-100">
                        {/* Autosuggest Overlay - Type suggestion lists matching typesense */}
                        <div className="flex flex-col">
                            {(() => {
                                const matchedSuggestions = [
                                    "Centrifugal Water Pump for Industrial Irrigation",
                                    "High Pressure Multistage Industrial Pump",
                                    "Submersible Deep Well Boring Pump",
                                    "Vertical Turbine Pumps",
                                    "Chemical Pumps",
                                    "Electric Water Pump",
                                    "Monoblock Pumps",
                                    "Pressure Booster System"
                                ].filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));

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
                                        onClick={() => setSearchQuery(item)}
                                        className="w-full flex items-center justify-between px-4 py-3.5 border-b border-slate-50 hover:bg-slate-50 active:bg-slate-100 transition-colors text-left group"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <Search className="w-4 h-4 text-slate-400 group-hover:text-brand-blue transition-colors shrink-0" />
                                            <span className="text-[15px] font-medium text-slate-700 truncate">{item}</span>
                                        </div>
                                        <ArrowUpLeft className="w-4 h-4 text-slate-300 group-hover:text-brand-blue transition-colors shrink-0 ml-2" />
                                    </button>
                                ));
                            })()}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default SearchPage;
