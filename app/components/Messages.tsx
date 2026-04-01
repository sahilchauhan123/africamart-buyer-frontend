"use client";

import React, { useState } from 'react';
import { Menu, Search, MoreVertical, FilePlus, User, BadgeCheck, ArrowLeft, X, History, Filter } from 'lucide-react';

import { View } from '../types';

interface MessagesProps {
    onOpenMenu: () => void;
    onNavigate: (view: View) => void;
}

const Messages: React.FC<MessagesProps> = ({ onOpenMenu, onNavigate }) => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    if (isSearchActive) {
        return (
            <div className="flex flex-col h-screen bg-[#F8FAFC] overflow-hidden animate-in fade-in duration-300">
                <header className="bg-[#000042] z-50 sticky top-0 h-[60px]">
                    <div className="flex items-center gap-2 px-3 h-full sm:px-4">
                        <button
                            onClick={() => setIsSearchActive(false)}
                            className="p-1 rounded-full hover:bg-white/10 transition-colors text-white active:scale-95"
                        >
                            <ArrowLeft className="h-7 w-7" />
                        </button>
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="text-white/60" size={18} />
                            </div>
                            <input
                                autoFocus
                                className="block w-full pl-10 pr-10 py-2 border-none rounded-xl leading-5 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 sm:text-sm transition-all shadow-inner"
                                placeholder="Search chats..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute inset-y-0 right-0 pr-2 flex items-center text-white/60 hover:text-white focus:outline-none"
                                >
                                    <X className="p-0.5 bg-white/20 rounded-full" size={18} />
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => setIsSearchActive(false)}
                            className="text-white hover:text-white/80 font-bold text-sm sm:text-base whitespace-nowrap px-2"
                        >
                            Cancel
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto hide-scrollbar relative bg-[#F8FAFC]">
                    {!searchQuery ? (
                        <div className="px-4 py-5">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-[10px] font-black text-slate-400 tracking-[0.2em]">Recent Searches</h3>
                                <button className="text-[10px] text-brand-blue font-black tracking-wider hover:underline">Clear all</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['Invoice #4022', 'Project details', 'Sarah Williams'].map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSearchQuery(item)}
                                        className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 flex items-center gap-2 transition-all shadow-sm"
                                    >
                                        {idx === 2 ? <User size={14} className="text-slate-400" /> : <History size={14} className="text-slate-400" />}
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
                            <div className="px-4 py-4 mb-2 flex items-center gap-2 border-b border-slate-100">
                                <Filter size={14} className="text-brand-blue" />
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Results for "{searchQuery}"</h3>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {/* Sample Result 1 */}
                                <div
                                    onClick={() => onNavigate(View.CHAT_SESSION)}
                                    className="group bg-white hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100"
                                >
                                    <div className="flex items-center px-4 py-4 sm:px-6">
                                        <div className="relative flex-shrink-0">
                                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-200 text-brand-blue font-bold text-lg">
                                                IN
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h2 className="text-sm font-semibold text-slate-800 truncate">Individual Name</h2>
                                                <span className="text-[10px] text-slate-400 font-bold">22:30 AM</span>
                                            </div>
                                            <p className="text-sm text-slate-500 line-clamp-2">
                                                Can we reschedule our <span className="bg-yellow-100 text-brand-blue font-bold px-0.5 rounded">meet</span>ing for tomorrow? I have a conflict.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Sample Result 2 */}
                                <div className="group bg-white hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100">
                                    <div className="flex items-center px-4 py-4 sm:px-6">
                                        <div className="relative flex-shrink-0">
                                            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-indigo-200 text-indigo-700 font-bold text-lg">
                                                AJ
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h2 className="text-sm font-semibold text-slate-800 truncate">Alex Jones</h2>
                                                <span className="text-[10px] text-slate-400 font-bold">Sun</span>
                                            </div>
                                            <p className="text-sm text-slate-500 line-clamp-2">
                                                Looking forward to the <span className="bg-yellow-100 text-brand-blue font-bold px-0.5 rounded">meet</span>ing next week. Don't forget the slides.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-[#F8FAFC] overflow-hidden">
            {/* Header (Synchronized with SubCategoryPage height) */}
            <header className="bg-[#000042] sticky top-0 z-50 h-[60px]">
                <div className="flex items-center justify-between px-4 h-full relative">
                    <button
                        onClick={onOpenMenu}
                        className="p-1 rounded-full hover:bg-white/10 transition-colors text-white active:scale-95 flex-shrink-0 z-10"
                    >
                        <Menu className="h-7 w-7" />
                    </button>
                    
                    <h1 className="absolute inset-x-12 text-center text-base font-bold text-white tracking-tight truncate">Business Messages</h1>
                    
                    <button
                        onClick={() => setIsSearchActive(true)}
                        className="p-1 rounded-full hover:bg-white/10 transition-colors text-white active:scale-95 flex-shrink-0 z-10"
                    >
                        <Search className="h-6 w-6" />
                    </button>
                </div>
            </header>


            {/* Chat List */}
            <main className="flex-1 overflow-y-auto hide-scrollbar relative bg-[#F8FAFC]">
                <div className="divide-y divide-slate-200">
                    {/* Item 1 */}
                    <div
                        onClick={() => onNavigate(View.CHAT_SESSION)}
                        className="group bg-white hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100"
                    >
                        <div className="flex items-center px-4 py-4 sm:px-6">
                            <div className="relative flex-shrink-0">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-200 text-brand-blue font-bold text-lg">
                                    IN
                                </div>
                                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></span>
                            </div>
                            <div className="ml-4 flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h2 className="text-sm font-semibold text-slate-800 truncate pr-2">Individual Name</h2>
                                    <span className="text-[10px] text-brand-blue font-black whitespace-nowrap">22:30 AM</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-slate-600 truncate pr-4 font-medium">Can we reschedule our meeting for tomorrow?</p>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800">3</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div
                        onClick={() => onNavigate(View.CHAT_SESSION)}
                        className="group bg-white hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100"
                    >
                        <div className="flex items-center px-4 py-4 sm:px-6">
                            <div className="relative flex-shrink-0">
                                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center border-2 border-purple-200 text-purple-700 font-bold text-lg">
                                    MJ
                                </div>
                            </div>
                            <div className="ml-4 flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h2 className="text-sm font-semibold text-slate-800 truncate pr-2">Michael Johnson</h2>
                                    <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">21:15 PM</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-slate-500 truncate pr-4">The project files have been updated. Please check.</p>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800">1</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div
                        onClick={() => onNavigate(View.CHAT_SESSION)}
                        className="group bg-white hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100"
                    >
                        <div className="flex items-center px-4 py-4 sm:px-6">
                            <div className="relative flex-shrink-0">
                                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-emerald-200 text-emerald-700 font-bold text-lg">
                                    SW
                                </div>
                            </div>
                            <div className="ml-4 flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h2 className="text-sm font-semibold text-slate-800 truncate pr-2">Sarah Williams</h2>
                                    <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">Yesterday</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-slate-500 truncate pr-4">Thanks for the update!</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Item 4 */}
                    <div
                        onClick={() => onNavigate(View.CHAT_SESSION)}
                        className="group bg-white hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100"
                    >
                        <div className="flex items-center px-4 py-4 sm:px-6">
                            <div className="relative flex-shrink-0">
                                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center border-2 border-orange-200 text-orange-700 font-bold text-lg">
                                    RB
                                </div>
                                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-gray-300 ring-2 ring-white"></span>
                            </div>
                            <div className="ml-4 flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h2 className="text-sm font-semibold text-slate-800 truncate pr-2">Robert Brown</h2>
                                    <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">Yesterday</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-slate-500 truncate pr-4">See you at the conference next week.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Item 5 */}
                    <div className="group bg-white hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100">
                        <div className="flex items-center px-4 py-4 sm:px-6">
                            <div className="relative flex-shrink-0">
                                <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center border-2 border-pink-200 text-pink-700 font-bold text-lg">
                                    LK
                                </div>
                            </div>
                            <div className="ml-4 flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h2 className="text-sm font-semibold text-slate-800 truncate pr-2">Lisa King</h2>
                                    <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">Mon</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-slate-500 truncate pr-4">Invoice #4022 has been paid.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Item 6 */}
                    <div className="group bg-white hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100">
                        <div className="flex items-center px-4 py-4 sm:px-6">
                            <div className="relative flex-shrink-0">
                                <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center border-2 border-teal-200 text-teal-700 font-bold text-lg">
                                    DM
                                </div>
                            </div>
                            <div className="ml-4 flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h2 className="text-sm font-semibold text-slate-800 truncate pr-2">David Miller</h2>
                                    <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">Mon</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-slate-500 truncate pr-4">Can you send me the contract details?</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Item 7 */}
                    <div className="group bg-white hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100">
                        <div className="flex items-center px-4 py-4 sm:px-6">
                            <div className="relative flex-shrink-0">
                                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-indigo-200 text-indigo-700 font-bold text-lg">
                                    AJ
                                </div>
                            </div>
                            <div className="ml-4 flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h2 className="text-sm font-semibold text-slate-800 truncate pr-2">Alex Jones</h2>
                                    <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">Sun</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-slate-800 truncate pr-4 font-medium">Looking forward to the demo.</p>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800">2</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Item 8 */}
                    <div className="group bg-white hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100 pb-24">
                        <div className="flex items-center px-4 py-4 sm:px-6">
                            <div className="relative flex-shrink-0">
                                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200 text-gray-600 font-bold text-lg">
                                    <User size={20} />
                                </div>
                            </div>
                            <div className="ml-4 flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h2 className="text-sm font-semibold text-slate-800 truncate pr-2">Unknown User</h2>
                                    <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">Sun</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-slate-500 truncate pr-4">New inquiry from website form.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Messages;
