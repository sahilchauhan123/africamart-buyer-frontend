"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, User, Menu, X, Rocket, ArrowRight } from 'lucide-react';

export default function MobileHeader() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header className="lg:hidden bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm font-body">
            {/* Top Bar: Logo & Actions */}
            <div className="px-4 py-3 pb-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
                    <div className="w-8 h-8 bg-[#0026C0] rounded-lg flex items-center justify-center shadow-lg shadow-[#0026C0]/15">
                        <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.push('/signup')}
                        className="bg-[#0026C0] text-white px-5 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-[#001da2] transition-all shadow-md flex items-center gap-2"
                    >
                        <User className="w-3.5 h-3.5" />
                        Sign Up
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Float-in Search Bar (Overlayed or Integrated) */}
            <div className="px-4 pb-4">
                <form onSubmit={handleSearchSubmit} className="relative group">
                    <input
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0026C0]/10 focus:border-[#0026C0] transition-all text-sm font-medium outline-none"
                        placeholder="Search products & suppliers..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0026C0] w-4.5 h-4.5 transition-colors" />
                </form>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 top-[120px] bg-white z-[100] animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto p-6 flex flex-col gap-8">
                    <div className="space-y-4">
                        <button className="w-full text-left font-black text-slate-900 flex items-center justify-between group p-3 hover:bg-slate-50 rounded-xl transition-all">
                            <span>Trending Categories</span>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="w-full text-left font-black text-slate-900 flex items-center justify-between group p-3 hover:bg-slate-50 rounded-xl transition-all">
                            <span>Sourcing Solutions</span>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="w-full text-left font-black text-slate-900 flex items-center justify-between group p-3 hover:bg-slate-50 rounded-xl transition-all">
                            <span>Help Center</span>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="mt-auto border-t border-slate-100 pt-8 flex flex-col gap-4 text-center">
                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Are you a manufacturer?</p>
                        <button className="bg-slate-900 text-white font-black py-4 rounded-xl shadow-xl hover:bg-black transition-all">
                            Register as Seller
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
