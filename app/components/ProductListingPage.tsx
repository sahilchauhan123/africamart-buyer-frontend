"use client";

import React from 'react';
import { ArrowLeft, Search, SlidersHorizontal, ChevronDown, BadgeCheck, Plus, Star, MapPin } from 'lucide-react';
import Image from 'next/image';

interface Product {
    id: string;
    name: string;
    price: string;
    unit: string;
    minOrder: string;
    img: string;
    supplier: {
        name: string;
        location: string;
        years: string;
    };
}

interface ProductListingPageProps {
    subCategoryName: string;
    onBack: () => void;
}

const ProductListingPage: React.FC<ProductListingPageProps> = ({ subCategoryName, onBack }) => {
    const products: Product[] = [
        {
            id: '1',
            name: "Heavy Duty CNC Milling Machine - Model X500 High Precision",
            price: "$12,500 - $15,000",
            unit: "Piece",
            minOrder: "1 Unit",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbCbBr8h7yG7TFp0SIg10_5rLIqrOwvsNQlB49AaAJtO9WVnM3gTN84sDv8FsbSw8YBWmtymIb2-au7cywVIYeFTdbF8oe5PyY8MhtdsOKzYUd3mnTgE4qMb8QVKB-LeN95IiFBxEfet_rFcAAeh80nKp6CFkJtpTTSozQzI9GpWRVG0xS-ZL_HGBxSQKr-4zLLN939e9gJnCQzRwpYLQYqbB1Epmx95MSjYhdyGUbri7UuyLWadW66gJ3cXmiP6dNjr8kuUStHuY",
            supplier: {
                name: "Apex Industrial Tools Ltd.",
                location: "Gujarat, India",
                years: "8 Years"
            }
        },
        {
            id: '2',
            name: "Automatic Vertical Packing Machine for Granules & Powders",
            price: "$4,200 - $6,800",
            unit: "Unit",
            minOrder: "2 Units",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuArmPrJjDv0LX6PEtp6H_EZPUzrvTWIc7MhxzIwhWQTOiPh9P-9UdQYJEjYOWksO1L4GvyZW-7T0iEm1w7kXH6G2w3-oGbeZXBj3XepJLS1YDo8VqNM6Y_Fx0uwhK8KO0p_-BmiQ-6mZ8Dp6g3uRixn2Y3EK4BNeap9iLRPiGbbvBJ354zZh0ay3nlZ3gIOhuct3Q3f2pPAy0NrwZBiATx2wWf7eDOQCc0yuYUb-DY24ASv5MeBqph6SoEO0FAgvHv29hAVugd4xuI",
            supplier: {
                name: "Global Pack Systems Inc.",
                location: "Maharashtra, India",
                years: "12 Years"
            }
        },
        {
            id: '3',
            name: "Industrial Hydraulic Press Machine 200 Ton for Metal Forming",
            price: "$8,500",
            unit: "Piece",
            minOrder: "1 Piece",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCY6b7KdpuPGTFg9fgXzY7dayoydhEOdFXFqTSnLoLYmdAhHJnbKYPJZuMBdP8XMC0o34al5RWEQECvRAQuL7jkkBcfHmv0OKCtGcDM7-nQsyxN8IJw5ZlcdvG2uQFHLskIZJdontiKSsimFtOypA7ZeCk0b0cnXXpv6PqxrJCmra-R8zjPUa8N_EEAJIq_aawFMP9vtUGvGCodROAt9qK1rsahvhdKW53LMuW_hRNP3qYeYVEKNVm38N5Mgwl6eO-GXWG0HG4F5rc",
            supplier: {
                name: "Bharat Hydraulics Pvt Ltd.",
                location: "Tamil Nadu, India",
                years: "5 Years"
            }
        }
    ];

    return (
        <div className="bg-[#f6f6f8] min-h-screen font-display antialiased flex flex-col animate-in slide-in-from-right duration-300">
            {/* Search Header - Exact copy from SearchPage */}
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
                            placeholder={`Search in ${subCategoryName}...`}
                            type="text"
                        />
                    </div>
                    <button className="flex items-center justify-center size-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors active:scale-95 shrink-0">
                        <SlidersHorizontal className="w-5 h-5 text-white" />
                    </button>
                </div>
            </header>

            <main className="flex-1 pb-24 max-w-screen-xl mx-auto w-full px-4 pt-6 lg:pt-10">
                {/* Title Section */}
                <div className="py-3 bg-transparent mb-6">
                    <h1 className="text-xl lg:text-3xl font-black text-slate-900 leading-tight tracking-tight">{subCategoryName}</h1>
                    <p className="text-[10px] lg:text-xs font-bold text-slate-400 mt-0.5 tracking-wider uppercase">Showing 1,240 verified products</p>
                </div>

                {/* Product Listings */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-100 flex flex-col sm:flex-row gap-4 sm:gap-6 cursor-pointer hover:shadow-xl hover:shadow-brand-blue/5 hover:border-brand-blue/10 transition-all group" onClick={() => { }}>
                            <div className="w-full sm:w-32 lg:w-40 sm:h-32 lg:h-40 aspect-square flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden relative border border-slate-100 group-hover:scale-[1.02] transition-transform">
                                <img className="w-full h-full object-cover" alt={product.name} src={product.img} />
                                <div className="absolute top-2 left-2 bg-brand-blue/10 text-brand-blue text-[9px] px-2 py-0.5 rounded-full font-bold uppercase">Verified</div>
                            </div>
                            <div className="flex-1 flex flex-col justify-between min-w-0">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h2 className="font-bold text-slate-900 text-[15px] lg:text-lg leading-tight line-clamp-2">{product.name}</h2>
                                    </div>
                                    <p className="text-brand-blue font-extrabold text-lg lg:text-2xl mt-1 lg:mt-2">{product.price} <span className="text-slate-400 text-[10px] lg:text-xs font-medium tracking-tighter">/ {product.unit}</span></p>

                                    <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                                        <div className="flex items-center">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star key={s} className="w-2.5 h-2.5 lg:w-3.5 lg:h-3.5 text-amber-500 fill-amber-500" />
                                            ))}
                                        </div>
                                        <span className="text-slate-900 text-xs font-bold leading-none">4.8</span>
                                        <span className="text-slate-400 text-xs leading-none">(124)</span>
                                    </div>

                                    <div className="flex items-center gap-1.5 mt-3 text-slate-500">
                                        <div className="flex items-center justify-center size-5 rounded-full bg-slate-100">
                                            <BadgeCheck className="w-3 h-3 text-brand-blue" />
                                        </div>
                                        <span className="text-[11px] lg:text-sm font-bold text-slate-700 truncate">{product.supplier.name}</span>
                                    </div>

                                    <div className="flex items-center gap-1.5 mt-1.5 text-slate-500">
                                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                        <span className="text-[10px] lg:text-xs font-medium truncate">{product.supplier.location}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-6 lg:mt-8">
                                    <button className="flex-1 bg-brand-blue text-white text-[11px] lg:text-sm font-extrabold py-3 lg:py-4 rounded-xl active:scale-95 transition-transform shadow-md shadow-brand-blue/10">Contact Supplier</button>
                                    <button className="flex-1 border-2 border-brand-blue text-brand-blue text-[11px] lg:text-sm font-extrabold py-3 lg:py-4 rounded-xl active:bg-brand-blue/5">Get Quote</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Requirement Prompt */}
                <div className="mt-12 bg-slate-900 p-8 lg:p-16 rounded-[2.5rem] text-center border-t border-slate-50 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="size-16 bg-white/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <Plus className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl lg:text-4xl font-black tracking-tight">Didn't find what you need?</h3>
                        <p className="text-sm lg:text-lg text-slate-400 mt-4 mb-10 leading-relaxed tracking-wide">Tell us what you're looking for and we'll help you get multiple quotes from the most reliable suppliers across the continent.</p>
                        <button className="px-10 py-5 bg-brand-blue text-white font-black rounded-2xl tracking-[0.15em] text-sm lg:text-base shadow-xl active:scale-[0.98] transition-transform hover:brightness-110">
                            Post Your Requirement Now
                        </button>
                    </div>
                </div>
            </main>

            {/* Float Button */}
            <div className="fixed bottom-6 right-4 z-40">
                <button className="flex items-center justify-center size-14 bg-brand-blue text-white rounded-full shadow-2xl shadow-brand-blue/40 active:scale-95 transition-transform ring-4 ring-white">
                    <Plus className="w-8 h-8" />
                </button>
            </div>
        </div>
    );
};

export default ProductListingPage;
