"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, HelpCircle, User, ChevronDown, Rocket, Menu, X, ArrowRight } from 'lucide-react';
import { fetchSuggestions, buyerLogout } from '@/src/lib/api';

export default function Header() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [apiSuggestions, setApiSuggestions] = useState<{ name: string, img: string, category: string }[]>([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [buyer, setBuyer] = useState<any>(null);

    useEffect(() => {
        const storedBuyer = localStorage.getItem('buyer');
        if (storedBuyer) {
            try {
                setBuyer(JSON.parse(storedBuyer));
            } catch (e) {
                console.error("Failed to parse buyer data", e);
            }
        }
    }, []);

    const handleLogout = async () => {
        const storedBuyer = localStorage.getItem('buyer');
        if (storedBuyer) {
            try {
                await buyerLogout();
            } catch (err) {
                console.error("Logout API failed", err);
            }
        }
        localStorage.removeItem('buyer');
        setBuyer(null);
        router.push('/');
    };

    const handleSearchSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (searchQuery.trim()) {
            setIsDropdownOpen(false);
            setIsMobileMenuOpen(false);
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
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
                    name: s.document.title,
                    img: s.document.picture_url?.[0]?.img_url || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop',
                    category: s.document.category_name || 'General'
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
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm font-body">
            <div className="max-w-[1600px] mx-auto">

                {/* --- DESKTOP HEADER (lg+) --- */}
                <div className="hidden lg:grid grid-cols-[auto_1fr_auto] items-center gap-10 px-8 py-3">
                    {/* Brand Logo */}
                    <div className="flex items-center gap-3 flex-shrink-0 cursor-pointer" onClick={() => router.push('/')}>
                        <div className="w-10 h-10 bg-[#0026C0] rounded-xl flex items-center justify-center shadow-lg shadow-[#0026C0]/20">
                            <div className="w-6 h-6 bg-white rounded-sm rotate-45"></div>
                        </div>
                        <span className="text-2xl font-black tracking-tight text-slate-900">LASOMA<span className="text-[#0026C0]">A</span></span>
                    </div>

                    {/* Centered Search Bar */}
                    <div className="flex justify-center flex-1">
                        <div className="w-full max-w-2xl relative">
                            <form onSubmit={handleSearchSubmit} className="relative group">
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
                                    // onBlur delayed to allow clicking suggestions
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
                                <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-2xl shadow-2xl border-2 border-slate-200 z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 divide-y divide-slate-100">
                                    {apiSuggestions.map((item, idx) => (
                                        <button
                                            key={idx}
                                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors text-left group"
                                            onClick={() => {
                                                setSearchQuery(item.name);
                                                setIsDropdownOpen(false);
                                                router.push(`/search?q=${encodeURIComponent(item.name)}`);
                                            }}
                                        >
                                            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100 bg-slate-50 shadow-sm">
                                                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-800 group-hover:text-[#0026C0] transition-colors line-clamp-1">{item.name}</span>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">In {item.category}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <nav className="flex items-center gap-8">
                        <div
                            onClick={() => router.push('/categories')}
                            className="flex items-center gap-2 text-slate-600 text-sm font-bold cursor-pointer hover:text-[#0026C0] transition-colors h-12"
                        >
                            <span>Categories</span>
                        </div>

                        <div className="flex items-center gap-2 text-slate-600 text-sm font-bold cursor-pointer hover:text-[#0026C0] transition-colors h-12">
                            <HelpCircle className="w-5 h-5" />
                            <span>Help</span>
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </div>

                        <div className="h-8 w-px bg-slate-100"></div>

                        {buyer ? (
                            <div className="relative group/profile">
                                <button className="flex items-center gap-3 pl-3 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg hover:border-[#0026C0] transition-all cursor-pointer">
                                    <div className="w-8 h-8 bg-[#0026C0] rounded-lg flex items-center justify-center text-white font-black text-xs">
                                        {buyer.full_name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <div className="flex flex-col items-start leading-tight">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Welcome</span>
                                        <span className="text-xs font-black text-slate-900 truncate max-w-[100px]">Hi, {buyer.full_name?.split(' ')[0]}</span>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
                                </button>

                                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-2xl opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all z-[110] overflow-hidden">
                                    <div className="p-4 border-b border-slate-50">
                                        <p className="text-xs font-black text-slate-900 line-clamp-1">{buyer.full_name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 line-clamp-1">{buyer.email}</p>
                                    </div>
                                    <button
                                        onClick={() => router.push('/dashboard')}
                                        className="w-full text-left px-4 py-3 text-xs font-black text-slate-600 hover:bg-slate-50 transition-colors uppercase tracking-widest"
                                    >
                                        Dashboard
                                    </button>
                                    <button className="w-full text-left px-4 py-3 text-xs font-black text-slate-600 hover:bg-slate-50 transition-colors uppercase tracking-widest">My Profile</button>
                                    <button className="w-full text-left px-4 py-3 text-xs font-black text-slate-600 hover:bg-slate-50 transition-colors uppercase tracking-widest">Settings</button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-3 text-xs font-black text-red-600 hover:bg-red-50 transition-colors uppercase tracking-widest border-t border-slate-50"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => router.push('/signup')}
                                className="bg-[#0026C0] text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#001da2] transition-all shadow-lg shadow-[#0026C0]/20 active:scale-95 flex items-center gap-2"
                            >
                                <User className="w-4 h-4" />
                                Sign Up
                            </button>
                        )}
                    </nav>
                </div>

                {/* --- MOBILE HEADER (max lg) --- */}
                <div className="lg:hidden flex flex-col px-4 py-2 pb-3">
                    <div className="flex items-center justify-between gap-4 mb-2.5">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
                            <div className="w-8 h-8 bg-[#0026C0] rounded-lg flex items-center justify-center shadow-lg shadow-[#0026C0]/15">
                                <div className="w-4.5 h-4.5 bg-white rounded-sm rotate-45"></div>
                            </div>
                            <span className="text-lg font-black tracking-tighter text-slate-900">LASOMA<span className="text-[#0026C0]">A</span></span>
                        </div>

                        <div className="flex items-center gap-2">
                            {buyer ? (
                                <div
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="w-8 h-8 bg-[#0026C0] rounded-lg flex items-center justify-center text-white font-black text-xs shadow-lg shadow-[#0026C0]/20"
                                >
                                    {buyer.full_name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                            ) : (
                                <button
                                    onClick={() => router.push('/signup')}
                                    className="bg-[#0026C0] text-white px-4 py-2 rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-[#001da2] transition-all shadow-md flex items-center gap-1.5"
                                >
                                    <User className="w-3.5 h-3.5" />
                                    Sign Up
                                </button>
                            )}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-1.5 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                {isMobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSearchSubmit} className="relative group">
                        <input
                            className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0026C0]/10 focus:border-[#0026C0] transition-all text-sm font-medium outline-none"
                            placeholder="Search products & suppliers..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setIsDropdownOpen(true);
                            }}
                            onFocus={() => setIsDropdownOpen(true)}
                            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0026C0] w-4.5 h-4.5 transition-colors" />

                        {isDropdownOpen && apiSuggestions.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-white mt-1.5 rounded-xl shadow-2xl border-2 border-slate-200 z-[110] overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200 divide-y divide-slate-100">
                                {apiSuggestions.map((item, idx) => (
                                    <button
                                        key={idx}
                                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors text-left group"
                                        onClick={() => {
                                            setSearchQuery(item.name);
                                            setIsDropdownOpen(false);
                                            router.push(`/search?q=${encodeURIComponent(item.name)}`);
                                        }}
                                    >
                                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100 bg-slate-50 shadow-sm">
                                            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm font-bold text-slate-800 line-clamp-1">{item.name}</span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">In {item.category}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </form>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 top-[125px] bg-white z-[100] animate-in fade-in slide-in-from-bottom-5 duration-300 p-6 flex flex-col gap-8">
                        {buyer && (
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#0026C0] rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">
                                        {buyer.full_name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Welcome</span>
                                        <span className="text-sm font-black text-slate-900">Hi, {buyer.full_name?.split(' ')[0]}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    router.push('/categories');
                                }}
                                className="w-full text-left font-black text-slate-900 flex items-center justify-between group p-4 hover:bg-slate-50 rounded-xl transition-all"
                            >
                                <span>Categories</span>
                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                            </button>

                            {buyer && (
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        router.push('/dashboard');
                                    }}
                                    className="w-full text-left font-black text-slate-900 flex items-center justify-between group p-4 hover:bg-slate-50 rounded-xl transition-all"
                                >
                                    <span>Dashboard</span>
                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                                </button>
                            )}

                            <button className="w-full text-left font-black text-slate-900 flex items-center justify-between group p-4 hover:bg-slate-50 rounded-xl transition-all">
                                <span>Help</span>
                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                            </button>

                            {buyer && (
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left font-black text-red-600 flex items-center justify-between group p-4 hover:bg-red-50 rounded-xl transition-all mt-4 border-t border-slate-50"
                                >
                                    <span>Sign Out</span>
                                    <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
                                </button>
                            )}
                        </div>

                        {!buyer && (
                            <div className="mt-auto pt-8">
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        router.push('/signup');
                                    }}
                                    className="w-full bg-[#0026C0] text-white font-black py-4 rounded-xl shadow-[0_10px_20px_-5px_rgba(0,38,192,0.3)] hover:bg-[#001da2] transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                                >
                                    <User className="w-4 h-4" />
                                    Sign Up / Sign In
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}
