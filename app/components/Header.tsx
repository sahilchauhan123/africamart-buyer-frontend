"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, HelpCircle, User, ChevronDown, Rocket, Menu, X, ArrowRight, MessageSquareMore, MessageSquare, MessageSquareDot, MessagesSquare } from 'lucide-react';
import { fetchSuggestions, buyerLogout } from '@/src/lib/api';
import Image from 'next/image';
import logo from '../logo.png';

export default function Header() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [apiSuggestions, setApiSuggestions] = useState<{ name: string, img: string, category: string }[]>([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [buyer, setBuyer] = useState<any>(null);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const storedBuyer = localStorage.getItem('buyer');
        if (storedBuyer) {
            if (storedBuyer === 'undefined') {
                localStorage.removeItem('buyer');
                return;
            }
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

    const changeImageSize = (img: string) => {
        const newImageUrl = img.replace("_800", "_200");
        return newImageUrl
    }

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
                    img: s.document.picture_url?.[0]?.img_url ? changeImageSize(s.document.picture_url?.[0]?.img_url) : 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop',
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
                    <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                        <Image
                            src={logo}
                            alt="Lasomaa | India's B2B Marketplace"
                            width={164}
                            height={32}
                            className="object-contain"
                        />
                    </Link>

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
                                            type="button"
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

                        <Link
                            href="/categories"
                            className="flex items-center gap-2 text-slate-600 text-sm font-bold hover:text-[#0026C0] transition-colors h-12"
                        >
                            <span>Categories</span>
                        </Link>

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
                                        onClick={() => router.push('/dashboard?tab=leads')}
                                        className="w-full text-left px-4 py-2 text-xs font-black text-slate-600 hover:bg-slate-50 transition-colors uppercase tracking-widest"
                                    >
                                        Inquiries
                                    </button>
                                    <button
                                        onClick={() => router.push('/dashboard?tab=messages')}
                                        className="w-full text-left px-4 py-2 text-xs font-black text-slate-600 hover:bg-slate-50 transition-colors uppercase tracking-widest"
                                    >
                                        Messages
                                    </button>
                                    <button
                                        onClick={() => router.push('/dashboard?tab=profile')}
                                        className="w-full text-left px-4 py-2 text-xs font-black text-slate-600 hover:bg-slate-50 transition-colors uppercase tracking-widest"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-xs font-black text-red-600 hover:bg-red-50 transition-colors uppercase tracking-widest border-t border-slate-50"
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
                                Signup
                            </button>
                        )}
                    </nav>
                </div>

                {/* --- MOBILE HEADER (max lg) --- */}
                <div className="lg:hidden flex flex-col px-4 py-2 pb-3">
                    <div className="flex items-center justify-between gap-4 mb-2.5">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-1 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                            <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                                <Image
                                    src={logo}
                                    alt="Lasomaa | India's B2B Marketplace"
                                    width={110}
                                    height={22}
                                    className="object-contain"
                                />
                            </Link>
                        </div>

                        <div className="flex items-center gap-2">
                            {buyer ? (
                                <div
                                    onClick={() => router.push('/dashboard?tab=messages')}
                                    className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#0026C0] cursor-pointer active:scale-90 transition-transform relative"
                                >
                                    <MessagesSquare className="w-5 h-5" />
                                </div>
                            ) : (
                                <button
                                    onClick={() => router.push('/signup')}
                                    className="bg-[#0026C0] text-white px-4 py-2 rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-[#001da2] transition-all shadow-md flex items-center gap-1.5"
                                >
                                    <User className="w-3.5 h-3.5" />
                                    Signup
                                </button>
                            )}
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
                        <button type="submit" className="hidden">Search</button>

                        {isDropdownOpen && apiSuggestions.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-white mt-1.5 rounded-xl shadow-2xl border-2 border-slate-200 z-[110] overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200 divide-y divide-slate-100">
                                {apiSuggestions.map((item, idx) => (
                                    <button
                                        type="button"
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
                    <div className="lg:hidden fixed inset-0 z-[100] flex">
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
                            onClick={() => setIsMobileMenuOpen(false)}
                        ></div>

                        {/* Drawer */}
                        <div className="relative w-[280px] h-full bg-white shadow-2xl animate-in slide-in-from-left duration-300 p-6 flex flex-col overflow-hidden">
                            {/* Logo at Top */}
                            <div className="mb-8 flex items-center justify-between">
                                <Image
                                    src={logo}
                                    alt="LASOMAA"
                                    width={100}
                                    height={20}
                                    className="object-contain"
                                />
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 hover:bg-slate-50 rounded-lg">
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>

                            <div className="flex-1 flex flex-col">
                                {buyer && (
                                    <div className="mb-3 pb-3 border-b border-slate-100 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#0026C0] rounded-xl flex items-center justify-center text-white font-black text-sm">
                                            {buyer.full_name?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <p className="text-[10px] font-black text-slate-400 tracking-widest leading-none mb-1">Signed in as</p>
                                            <p className="text-sm font-black text-slate-900 truncate">{buyer.full_name}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col gap-1">
                                    <Link
                                        href="/"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full text-left font-medium text-slate-700 py-3 border-b border-slate-50 hover:text-[#0026C0] transition-colors"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href="/categories"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full text-left font-medium text-slate-700 py-4 border-b border-slate-50 hover:text-[#0026C0] transition-colors"
                                    >
                                        Goods By Category
                                    </Link>

                                    {buyer && (
                                        <>
                                            <button
                                                onClick={() => {
                                                    setIsMobileMenuOpen(false);
                                                    router.push('/dashboard?tab=messages');
                                                }}
                                                className="w-full flex items-center justify-between font-medium text-slate-700 py-3 border-b border-slate-50 hover:text-[#0026C0] transition-colors"
                                            >
                                                <span>Messages</span>
                                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsMobileMenuOpen(false);
                                                    router.push('/dashboard?tab=leads');
                                                }}
                                                className="w-full text-left font-medium text-slate-700 py-4 border-b border-slate-50 hover:text-[#0026C0] transition-colors"
                                            >
                                                Inquiries
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsMobileMenuOpen(false);
                                                    router.push('/dashboard?tab=profile');
                                                }}
                                                className="w-full text-left font-medium text-slate-700 py-4 border-b border-slate-50 hover:text-[#0026C0] transition-colors"
                                            >
                                                Profile Settings
                                            </button>
                                        </>
                                    )}
                                    <button className="w-full text-left font-medium text-slate-700 py-4 border-b border-slate-50 hover:text-[#0026C0] transition-colors">
                                        Help Center
                                    </button>
                                    <button className="w-full text-left font-medium text-slate-700 py-4 hover:text-[#0026C0] transition-colors">
                                        Contact Us
                                    </button>
                                </div>
                            </div>

                            {/* Bottom Actions */}
                            <div className="mt-auto pt-6 border-t border-slate-100">
                                {buyer ? (
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-center font-medium text-red-600 py-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            router.push('/signup');
                                        }}
                                        className="w-full bg-[#0026C0] text-white font-medium py-4 rounded-xl shadow-lg shadow-[#0026C0]/20 hover:bg-[#001da2] transition-all flex items-center justify-center gap-2 text-xs tracking-widest"
                                    >
                                        <User className="w-4 h-4" />
                                        Signup / Login
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
