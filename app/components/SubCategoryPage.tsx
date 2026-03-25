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
    const subCategories: SubCategory[] = [
        { name: "Pumps & Filtration", icon: Settings2 },
        { name: "Lathes & CNC", icon: Factory },
        { name: "Hydraulic Tools", icon: Wrench },
        { name: "Electric Motors", icon: Zap },
        { name: "Boilers", icon: Droplets },
        { name: "Welding Equipment", icon: Hammer },
        { name: "Packaging Machines", icon: Package },
    ];

    return (
        <div className="bg-[#f6f6f8] h-[100dvh] font-display antialiased flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Sticky Header */}
            <header className="sticky top-0 z-50 bg-brand-blue text-white shadow-md">
                <div className="flex items-center justify-between px-4 py-4 relative">
                    <button
                        onClick={onBack}
                        className="flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>

                    <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold tracking-tight whitespace-nowrap">
                        {categoryName}
                    </h1>

                    <button className="flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors z-10">
                        <Search className="w-6 h-6" />
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-6">
                {/* Search Bar Section */}
                <div className="px-4 py-4 bg-white">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-brand-blue transition-colors" />
                        </div>
                        <input
                            className="w-full h-12 pl-12 pr-4 bg-slate-100 border-none rounded-xl text-base focus:ring-2 focus:ring-brand-blue/20 focus:bg-white transition-all placeholder:text-slate-500 font-medium"
                            placeholder="Search for sub-categories..."
                            type="text"
                        />
                    </div>
                </div>

                {/* Sub-categories List */}
                <div className="bg-white mt-2 border-t border-slate-50">
                    {subCategories.map((sub, idx) => (
                        <button
                            key={idx}
                            onClick={() => onSubCategoryClick(sub.name)}
                            className="w-full flex items-center gap-4 px-4 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0 active:bg-slate-100 group"
                        >
                            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-brand-blue/10 text-brand-blue group-hover:scale-105 transition-transform shrink-0">
                                <sub.icon className="w-6 h-6 stroke-[2]" />
                            </div>
                            <div className="flex-1 text-left">
                                <p className="text-base font-semibold leading-tight text-slate-800">{sub.name}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </button>
                    ))}
                </div>

                {/* Featured Banner */}
                <div className="p-4">
                    <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-brand-blue/10 flex items-center justify-between px-6 border border-brand-blue/20 group cursor-pointer active:scale-[0.98] transition-all">
                        <div className="z-10 relative">
                            <p className="text-brand-blue font-black text-xl leading-tight">Looking for Bulk Quotes?</p>
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
