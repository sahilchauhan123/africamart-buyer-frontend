"use client";

import React from 'react';
import { ArrowLeft, Search, SlidersHorizontal, ChevronDown, BadgeCheck, Plus } from 'lucide-react';
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
                <div className="flex items-center p-4 gap-3">
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
                                className="block w-full bg-slate-100 border-none rounded-xl py-2.5 pl-10 pr-3 placeholder:text-slate-500 focus:ring-2 focus:ring-brand-blue/20 text-sm font-medium"
                                placeholder={`Search in ${subCategoryName}...`}
                                type="text"
                            />
                        </div>
                    </div>
                    <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 border border-slate-100 shadow-sm shrink-0">
                        <SlidersHorizontal className="w-5 h-5 text-slate-700" />
                    </button>
                </div>

                {/* Filter Chips */}
                <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar">
                    {['Location', 'Price', 'Supplier', 'Brand'].map((filter, idx) => (
                        <button
                            key={idx}
                            className={`flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border px-4 text-sm font-bold tracking-tight uppercase whitespace-nowrap transition-all ${idx === 0
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

                    <h1 className="text-2xl font-black text-slate-900 leading-tight uppercase tracking-tight">{subCategoryName}</h1>
                    <p className="text-xs font-bold text-slate-400 mt-1.5 uppercase tracking-wide">Showing 1,240 verified products</p>
                </div>

                {/* Product Listings */}
                <div className="space-y-2 mt-2">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white p-4 border-b border-slate-50">
                            <div className="flex gap-4 mb-5">
                                <div className="w-28 h-28 shrink-0 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 relative shadow-sm">
                                    <Image
                                        fill
                                        className="object-cover"
                                        alt={product.name}
                                        src={product.img}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-[15px] font-black text-slate-800 line-clamp-2 leading-[1.3] uppercase tracking-tight">{product.name}</h2>
                                    <div className="mt-2.5">
                                        <span className="text-lg font-black text-brand-blue">{product.price}</span>
                                        <span className="text-[10px] font-bold text-slate-400 ml-1 uppercase">/ {product.unit}</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-500 mt-1.5 bg-slate-50 inline-block px-2 py-0.5 rounded-full uppercase tracking-wider">Min. Order: {product.minOrder}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5 mb-5 p-3 rounded-2xl bg-brand-blue/5 border border-brand-blue/10">
                                <div className="size-9 rounded-xl bg-white border border-brand-blue/20 flex items-center justify-center shadow-inner">
                                    <BadgeCheck className="w-6 h-6 text-brand-blue" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[11px] font-black text-slate-800 truncate uppercase tracking-wide">{product.supplier.name}</p>
                                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.05em]">{product.supplier.location} • {product.supplier.years} on Platform</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center h-12 border-2 border-brand-blue text-brand-blue font-black rounded-xl hover:bg-brand-blue hover:text-white transition-all text-xs uppercase tracking-[0.1em] active:scale-[0.98]">
                                    Get Quote
                                </button>
                                <button className="flex items-center justify-center h-12 bg-brand-blue text-white font-black rounded-xl hover:brightness-110 transition-all text-xs uppercase tracking-[0.1em] shadow-lg shadow-brand-blue/20 active:scale-[0.98]">
                                    Contact Supplier
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Requirement Prompt */}
                    <div className="bg-white p-10 text-center border-t border-slate-50">
                        <div className="size-16 bg-brand-blue/5 rounded-[2rem] flex items-center justify-center mx-auto mb-5 shadow-inner">
                            <Plus className="w-8 h-8 text-brand-blue" />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Didn't find what you need?</h3>
                        <p className="text-xs font-bold text-slate-400 mt-2 mb-8 max-w-[240px] mx-auto uppercase leading-relaxed tracking-wide">Try adjusting your filters or post a requirement to get quotes from multiple sellers.</p>
                        <button className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-[0.15em] text-xs shadow-xl active:scale-[0.98] transition-transform">
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
