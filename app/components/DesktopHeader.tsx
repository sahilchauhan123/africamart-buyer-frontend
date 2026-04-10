"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, HelpCircle, User, ChevronDown, Rocket } from 'lucide-react';
import { fetchSuggestions } from '@/src/lib/api';

export default function DesktopHeader() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [apiSuggestions, setApiSuggestions] = useState<{ name: string, img: string }[]>([]);

    const handleSearchSubmit = () => {
        setIsDropdownOpen(false);
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    };

    useEffect(() => {
        const fetchSugg = async () => {
            if (searchQuery.trim().length === 0) {
                setApiSuggestions([]);
                return;
            }
            try {
                const suggs = await fetchSuggestions(searchQuery);
                setApiSuggestions(suggs.map((s: any) => ({
                    name: s.name,
                    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop'
                })));
            } catch (err) {
                console.error(err);
            }
        };

        const timer = setTimeout(() => {
            fetchSugg();
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    return (
        <header className="hidden lg:block bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
            <div className="px-8 py-3">
                <div className="max-w-[1600px] mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-10">
                    {/* Brand Logo */}
                    <div className="flex items-center gap-3 flex-shrink-0 cursor-pointer" onClick={() => router.push('/')}>
                        <div className="w-10 h-10 bg-[#0026C0] rounded-xl flex items-center justify-center shadow-lg shadow-[#0026C0]/20">
                            <div className="w-6 h-6 bg-white rounded-sm rotate-45"></div>
                        </div>
                        <span className="text-2xl font-black tracking-tight text-slate-900">AFRICA<span className="text-[#0026C0]">MART</span></span>
                    </div>

                    {/* Centered Search Bar */}
                    <div className="flex justify-center flex-1">
                        <div className="w-full max-w-2xl relative">
                            <form onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(); }} className="relative group">
                                <input
                                    className="w-full h-12 pl-12 pr-28 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0026C0]/10 focus:border-[#0026C0] transition-all text-sm font-medium outline-none"
                                    placeholder="Search for products, brands or suppliers..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setIsDropdownOpen(true);
                                    }}
                                    onFocus={() => setIsDropdownOpen(true)}
                                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0026C0] w-5 h-5 transition-colors" />
                                <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 bg-[#0026C0] text-white text-xs font-black rounded-lg hover:bg-[#001da2] transition-all shadow-md active:scale-95 uppercase tracking-wider"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>

                            {isDropdownOpen && apiSuggestions.length > 0 && (
                                <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-2xl shadow-2xl border border-slate-100 z-[100] py-3 animate-in fade-in slide-in-from-top-2 duration-200">
                                    {apiSuggestions.map((item, idx) => (
                                        <button
                                            key={idx}
                                            className="w-full flex items-center gap-4 px-5 py-3 hover:bg-slate-50 transition-colors text-left group"
                                            onClick={() => {
                                                setSearchQuery(item.name);
                                                setIsDropdownOpen(false);
                                                router.push(`/search?q=${encodeURIComponent(item.name)}`);
                                            }}
                                        >
                                            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100 bg-slate-50">
                                                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-800 group-hover:text-[#0026C0] transition-colors line-clamp-1">{item.name}</span>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">In Machinery</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <nav className="flex items-center gap-8">
                        <div className="flex items-center gap-2 text-slate-600 text-sm font-bold cursor-pointer hover:text-[#0026C0] transition-colors h-12">
                            <HelpCircle className="w-5 h-5" />
                            <span>Help</span>
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </div>

                        <div className="h-8 w-px bg-slate-100"></div>

                        <button
                            onClick={() => router.push('/signup')}
                            className="bg-[#0026C0] text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#001da2] transition-all shadow-lg shadow-[#0026C0]/20 active:scale-95 flex items-center gap-2"
                        >
                            <User className="w-4 h-4" />
                            Sign Up
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
}
