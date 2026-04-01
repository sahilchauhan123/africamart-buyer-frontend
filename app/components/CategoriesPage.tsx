"use client";

import React from 'react';
import { Search, Settings, Cpu, Building2, Shirt, Leaf, Stethoscope, Beaker, Package, Menu, MessageSquareMore, MessageSquareDot, ArrowLeft } from 'lucide-react';
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
        { name: "Industrial Machinery", thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=200", suppliers: "12,450+" },
        { name: "Electronics & Electrical", thumbnail: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=200", suppliers: "8,120+" },
        { name: "Building & Construction", thumbnail: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=200", suppliers: "15,300+" },
        { name: "Apparel & Garments", thumbnail: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=200", suppliers: "9,700+" },
        { name: "Food & Agriculture", thumbnail: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=200", suppliers: "6,540+" },
        { name: "Medical & Healthcare", thumbnail: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200", suppliers: "4,210+" },
        { name: "Chemicals & Allied", thumbnail: "https://images.unsplash.com/photo-1532187875605-7fe3b2519bc1?auto=format&fit=crop&q=80&w=200", suppliers: "7,890+" },
        { name: "Packaging & Printing", thumbnail: "https://images.unsplash.com/photo-1530631673369-bc20fdb32ff8?auto=format&fit=crop&q=80&w=200", suppliers: "5,100+" }
    ];

    return (
        <div className="bg-[#f6f6f8] h-[100dvh] font-display antialiased flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Header (Synchronized with Notifications/Messages) */}
            <header className="bg-[#000042] sticky top-0 z-50 h-[60px]">
                <div className="flex items-center justify-between px-4 h-full relative">
                    <button
                        onClick={onBack}
                        className="p-1 rounded-full hover:bg-white/10 transition-colors text-white active:scale-95 flex-shrink-0 z-10"
                    >
                        <ArrowLeft className="h-7 w-7" />
                    </button>
                    
                    <h1 className="absolute inset-x-12 text-center text-base font-bold text-white tracking-tight truncate">Browse Categories</h1>
                    
                    <button 
                        onClick={onOpenSearch}
                        className="p-1 rounded-full hover:bg-white/10 transition-colors text-white active:scale-95 flex-shrink-0 z-10"
                    >
                        <Search className="h-6 w-6" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pt-0 pb-24 hide-scrollbar relative">


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
                                    <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden relative shrink-0 shadow-sm border border-slate-100 group-hover:scale-105 transition-transform duration-300">
                                        <Image
                                            fill
                                            className="object-cover"
                                            src={cat.thumbnail}
                                            alt={cat.name}
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-[13px] font-black text-slate-800 leading-tight tracking-wide group-hover:text-brand-blue transition-colors truncate">{cat.name}</h3>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1 tracking-[0.05em]">{cat.suppliers} Verified Groups</p>
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
