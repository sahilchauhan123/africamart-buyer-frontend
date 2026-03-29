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
            {/* Header & Search Section */}
            <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
                <div className="flex items-center px-4 h-[60px] gap-3">
                    <button
                        onClick={onBack}
                        className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 transition-colors shrink-0"
                    >
                        <ArrowLeft className="w-6 h-6 text-slate-700" />
                    </button>
                    <div className="flex-1">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="w-5 h-5 text-slate-400" />
                            </span>
                            <input
                                className="block w-full bg-slate-100 border-none rounded-xl py-2.5 pl-10 pr-3 placeholder:text-slate-500 focus:ring-1 focus:ring-brand-blue/20 text-sm font-medium"
                                placeholder={`Search in ${subCategoryName}...`}
                                type="text"
                            />
                        </div>
                    </div>
                    <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 shrink-0">
                        <SlidersHorizontal className="w-5 h-5 text-slate-700" />
                    </button>
                </div>

                {/* Filter Chips - Maintain swipe, hide scrollbar */}
                <div className="flex gap-2 px-4 pb-4 overflow-x-auto hide-scrollbar">
                    {['Location', 'Price', 'Supplier', 'Brand'].map((filter, idx) => (
                        <button
                            key={idx}
                            className={`flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border px-4 text-sm font-bold tracking-tight whitespace-nowrap transition-all ${idx === 0
                                ? 'bg-brand-blue/10 border-brand-blue/20 text-brand-blue'
                                : 'bg-white border-slate-200 text-slate-600'
                                }`}
                        >
                            {filter} <ChevronDown className="w-4 h-4" />
                        </button>
                    ))}
                </div>
            </header>

            <main className="flex-1 pb-24">
                {/* Title Section */}
                <div className="px-4 py-6 bg-white border-b border-slate-50">

                    <h1 className="text-2xm font-black text-slate-900 leading-tight tracking-tight">{subCategoryName}</h1>
                    <p className="text-sm font- text-slate-400 mt-1.5 tracking-wide">Showing 1,240 verified products</p>
                </div>

                {/* Product Listings */}
                <div className="space-y-2 mt-2">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white px-4 py-8 border-b border-slate-100 flex gap-4 cursor-pointer active:bg-slate-50 transition-colors" onClick={() => {}}>
                            <div className="w-28 h-28 flex-shrink-0 bg-slate-50 rounded-lg overflow-hidden relative border border-slate-100 shadow-sm">
                                <img className="w-full h-full object-cover" alt={product.name} src={product.img} />
                                <div className="absolute top-2 left-2 bg-brand-blue/10 text-brand-blue text-[9px] px-2 py-0.5 rounded-full font-bold uppercase">Verified</div>
                            </div>
                            <div className="flex-1 flex flex-col justify-between min-w-0">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h2 className="font-bold text-slate-900 text-[15px] leading-tight line-clamp-2">{product.name}</h2>
                                    </div>
                                    <p className="text-brand-blue font-extrabold text-lg mt-1">{product.price} <span className="text-slate-400 text-[10px] font-medium tracking-tighter">/ {product.unit}</span></p>
                                    
                                    <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                                        <div className="flex items-center">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star key={s} className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                                            ))}
                                        </div>
                                        <span className="text-slate-900 text-xs font-bold leading-none">4.8</span>
                                        <span className="text-slate-400 text-xs leading-none">(124)</span>
                                    </div>

                                    <div className="flex items-center gap-1.5 mt-2 text-slate-500">
                                        <div className="flex items-center justify-center size-4 rounded-full bg-slate-100">
                                            <BadgeCheck className="w-2.5 h-2.5 text-brand-blue" />
                                        </div>
                                        <span className="text-[11px] font-bold text-slate-700 truncate">{product.supplier.name}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-1.5 mt-1.5 text-slate-500">
                                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                        <span className="text-[10px] font-medium truncate">{product.supplier.location}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-1.5 mt-1 text-slate-500">
                                        <div className="size-3.5 flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                                        </div>
                                        <span className="text-[10px] font-medium">Min. Order: {product.minOrder}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button className="flex-1 bg-brand-blue text-white text-[11px] font-extrabold py-3 rounded-xl active:scale-95 transition-transform shadow-md shadow-brand-blue/10">Contact Supplier</button>
                                    <button className="flex-1 border-2 border-brand-blue text-brand-blue text-[11px] font-extrabold py-3 rounded-xl active:bg-brand-blue/5">Get Quote</button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Requirement Prompt */}
                    <div className="bg-white p-10 text-center border-t border-slate-50">
                        <div className="size-16 bg-brand-blue/5 rounded-[2rem] flex items-center justify-center mx-auto mb-5 shadow-inner">
                            <Plus className="w-8 h-8 text-brand-blue" />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 tracking-tight">Didn't find what you need?</h3>
                        <p className="text-xs font text-slate-400 mt-2 mb-8 max-w-[240px] mx-auto leading-relaxed tracking-wide">Try adjusting your filters or post a requirement to get quotes from multiple sellers.</p>
                        <button className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl tracking-[0.15em] text-xs shadow-xl active:scale-[0.98] transition-transform">
                            Post Your Requirement
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
