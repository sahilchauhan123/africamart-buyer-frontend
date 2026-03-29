"use client";

import React from 'react';
import { ArrowLeft, Search, Settings2, Factory, Wrench, Zap, Droplets, Hammer, Package, ArrowRight, LucideIcon } from 'lucide-react';
import Image from 'next/image';

interface SubCategory {
    name: string;
    icon: LucideIcon;
}

interface SubCategoryPageProps {
    categoryName: string;
    onBack: () => void;
    onSubCategoryClick: (subCategoryName: string) => void;
}

const SubCategoryPage: React.FC<SubCategoryPageProps> = ({ categoryName, onBack, onSubCategoryClick }) => {
    const subCategories = [
        { name: "Pumps & Filtration", thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=200" },
        { name: "Lathes & CNC", thumbnail: "https://images.unsplash.com/photo-1504917595217-d4dc5f649774?auto=format&fit=crop&q=80&w=200" },
        { name: "Hydraulic Tools", thumbnail: "https://images.unsplash.com/photo-1540103390171-18476133f927?auto=format&fit=crop&q=80&w=200" },
        { name: "Electric Motors", thumbnail: "https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?auto=format&fit=crop&q=80&w=200" },
        { name: "Boilers", thumbnail: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=200" },
        { name: "Welding Equipment", thumbnail: "https://images.unsplash.com/photo-1504328331606-27ec79425ca2?auto=format&fit=crop&q=80&w=200" },
        { name: "Packaging Machines", thumbnail: "https://images.unsplash.com/photo-1516641396056-0ce60a85d43f?auto=format&fit=crop&q=80&w=200" },
    ];

    return (
        <div className="bg-[#f6f6f8] h-[100dvh] font-display antialiased flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Sticky Header (Synchronized with Categories/Messages) */}
            <header className="sticky top-0 z-50 bg-[#000042] h-[60px]">
                <div className="flex items-center justify-between px-4 h-full relative">
                    <button
                        onClick={onBack}
                        className="flex items-center justify-center size-10 rounded-full hover:bg-white/10 transition-colors active:scale-95 text-white flex-shrink-0 z-10"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>

                    <h1 className="absolute inset-x-12 text-center text-base font-bold text-white tracking-tight truncate">
                        {categoryName}
                    </h1>

                    <div className="size-10 flex-shrink-0 z-10" />
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pt-0 pb-24 hide-scrollbar relative">
                {/* All Sub-Categories List */}
                <section className="bg-white mb-10 border-t border-slate-100">
                    <div className="flex flex-col">
                        {subCategories.map((sub, idx) => (
                            <div
                                key={idx}
                                onClick={() => onSubCategoryClick(sub.name)}
                                className="px-5 py-5 border-b border-slate-50 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between active:bg-slate-100 group relative last:border-b-0"
                            >
                                <div className="flex items-center gap-5 flex-1">
                                    <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden relative shrink-0 shadow-sm border border-slate-100 group-hover:scale-105 transition-transform duration-300">
                                        <Image
                                            fill
                                            className="object-cover"
                                            src={sub.thumbnail}
                                            alt={sub.name}
                                        />
                                    </div>
                                    <div className="flex-1 text-left min-w-0">
                                        <h3 className="text-[13px] font-black leading-tight text-slate-800 tracking-wide group-hover:text-brand-blue transition-colors truncate">{sub.name}</h3>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1 tracking-[0.05em]">Verified Manufacturers</p>
                                    </div>
                                </div>
                                <div className="ml-4 text-slate-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Featured Banner */}
                <div className="p-4">
                    <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-brand-blue/10 flex items-center justify-between px-6 border border-brand-blue/20 group cursor-pointer active:scale-[0.98] transition-all">
                        <div className="z-10 relative">
                            <p className="text-brand-blue font-black text-x leading-tight">Looking for Bulk Quotes?</p>
                            <p className="text-slate-600 text-sm mt-1 font-medium">Get custom quotes from verified manufacturers</p>
                            <button className="mt-3 text-brand-blue font-black text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                Send Inquiry <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 group-hover:opacity-30 transition-opacity">
                            <Image
                                fill
                                className="object-cover"
                                alt="Mechanical engineering parts"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOWxrGYk3p0K1crN8czihxRDomvyx_qgmehZQQgPBipT-OrzJYnDGXvfoAsHDt_lAsjLtX8R-leQrxyr9DvPvx5ToKB8REUdcEgJYe4H5KmyBtugeCLlDKAOCqVGqZ5-r0t4SgoKMaXAThhLTUIJ0Cwu0QJTTtz7ZNnK6fZJQY6PQq-Wo8Jh0j507u3JvNkqRk9UFaCTo64l4nR1YlbqXBcMymbJITXiE-4DVvCRrEu0BaV0IfMkwgzohjLz6zmvYThdF2q9u0IrM"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SubCategoryPage;
