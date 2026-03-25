"use client";

import React from 'react';
import { Search, Settings, Cpu, Building2, Shirt, Leaf, Stethoscope, Beaker, Package, Menu, MessageSquareMore } from 'lucide-react';
import Image from 'next/image';
import { View } from '../types';

interface CategoriesPageProps {
    onBack: () => void;
    onNavigate: (view: View) => void;
    onOpenMenu: () => void;
    onOpenSearch: () => void;
    onCategoryClick: (categoryName: string) => void;
    currentView?: View;
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({ onBack, onNavigate, onOpenMenu, onOpenSearch, onCategoryClick, currentView }) => {


    const allCategories = [
        { name: "Industrial Machinery", icon: Settings, suppliers: "12,450+", color: "text-blue-600", bg: "bg-blue-50" },
        { name: "Electronics & Electrical", icon: Cpu, suppliers: "8,120+", color: "text-indigo-600", bg: "bg-indigo-50" },
        { name: "Building & Construction", icon: Building2, suppliers: "15,300+", color: "text-amber-600", bg: "bg-amber-50" },
        { name: "Apparel & Garments", icon: Shirt, suppliers: "9,700+", color: "text-rose-600", bg: "bg-rose-50" },
        { name: "Food & Agriculture", icon: Leaf, suppliers: "6,540+", color: "text-emerald-600", bg: "bg-emerald-50" },
        { name: "Medical & Healthcare", icon: Stethoscope, suppliers: "4,210+", color: "text-cyan-600", bg: "bg-cyan-50" },
        { name: "Chemicals & Allied", icon: Beaker, suppliers: "7,890+", color: "text-purple-600", bg: "bg-purple-50" },
        { name: "Packaging & Printing", icon: Package, suppliers: "5,100+", color: "text-slate-600", bg: "bg-slate-50" }
    ];

    return (
        <div className="bg-[#f6f6f8] h-[100dvh] font-display antialiased flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Header (from MobileHome) */}
            <header className="bg-brand-blue text-white sticky top-0 z-50">
                <div className="px-4 py-4.5 flex items-center justify-between gap-3">
                    {/* Menu Icon */}
                    <button
                        aria-label="Menu"
                        className="p-1 hover:bg-white/10 rounded-full transition-colors active:scale-95"
                        onClick={onOpenMenu}
                    >
                        <Menu className="h-8 w-8" />
                    </button>

                    {/* Profile/User Icon Placeholder */}
                    <div className="w-9 h-9 bg-white/30 rounded-full flex-shrink-0"></div>

                    <div className="flex-grow relative group" onClick={onOpenSearch}>
                        <input
                            className="w-full py-3.5 pl-4 pr-10 rounded-xl text-gray-900 placeholder:text-gray-400 text-sm bg-white border-none focus:outline-none focus:ring-0 transition-all duration-300 shadow-sm"
                            placeholder="Search products or sellers..."
                            type="text"
                            readOnly
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
                        </div>
                    </div>

                    {/* Message Icon */}
                    <button
                        aria-label="Messages"
                        className="relative p-1 hover:bg-white/10 rounded-full transition-colors active:scale-95"
                        onClick={() => onNavigate(View.MESSAGES)}
                    >
                        <MessageSquareMore className="h-8 w-8" />
                        <span className="absolute top-1 right-1 bg-red-500 w-3 h-3 rounded-full border-2 border-brand-blue animate-pulse"></span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pb-24 hide-scrollbar">


                {/* All Categories List */}
                <section className="bg-white mb-10 border-t border-slate-100">
                    <div className="flex flex-col">
                        {allCategories.map((cat, idx) => (
                            <div
                                key={idx}
                                onClick={() => onCategoryClick(cat.name)}
                                className="px-5 py-5 border-b border-slate-50 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between active:bg-slate-100 group relative last:border-b-0"
                            >
                                <div className="flex items-center gap-5 flex-1">
                                    <div className={`p-2.5 rounded-xl ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform shrink-0`}>
                                        <cat.icon className="w-6 h-6 stroke-[2.2]" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-[13px] font-black text-slate-800 leading-tight uppercase tracking-wide group-hover:text-brand-blue transition-colors truncate">{cat.name}</h3>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-[0.05em]">{cat.suppliers} Verified Groups</p>
                                    </div>
                                </div>
                                <div className="ml-4 text-slate-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skeleton Screens Placeholder (Styled as coming soon) */}
                <section className="px-4 py-8 opacity-40 mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="h-5 w-32 bg-slate-200 rounded-full animate-pulse"></div>
                        <div className="h-3 w-12 bg-slate-200 rounded-full animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-44 bg-white border border-slate-100 rounded-2xl animate-pulse"></div>
                        <div className="h-44 bg-white border border-slate-100 rounded-2xl animate-pulse"></div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default CategoriesPage;
