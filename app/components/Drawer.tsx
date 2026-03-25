import React, { useState } from 'react';
import {
    X, Globe, Users, HelpCircle, Headphones,
    Home, MessageCircle,
    Bell, ChevronDown, Settings, ShieldCheck, Info, BadgeCheck, FilePlus, LogIn,
    ShoppingBag, Heart, ClipboardList, UserCircle, LayoutGrid, MapPin
} from 'lucide-react';
import { View } from '../types';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (view: View) => void;
    currentView: View;
    isOnboarding?: boolean;
}

const Drawer: React.FC<DrawerProps> = ({
    isOpen,
    onClose,
    onNavigate,
    currentView,
    isOnboarding = false
}) => {
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);

    return (
        <>
            {/* Mobile Overlay (Backdrop) */}
            <div
                className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Mobile Drawer Container */}
            <div className={`fixed top-0 left-0 h-full w-[85%] max-w-[300px] bg-white z-[70] shadow-2xl flex flex-col transition-transform duration-300 lg:translate-x-0 lg:shadow-none lg:border-r lg:z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                {/* Header Section with Close Button */}
                <div className="bg-white px-6 h-16 flex items-center shrink-0 relative border-b border-gray-100">
                    <button className="absolute top-4 right-4 text-gray-400 z-10 p-1 hover:bg-gray-100 rounded-full transition lg:hidden" onClick={onClose}>
                        <X size={20} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center shadow-sm shadow-brand-blue/30">
                            <ShoppingBag className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight leading-none text-slate-800">AfricaMart</h1>
                            <p className="text-[10px] text-brand-blue font-bold tracking-wider uppercase mt-0.5">Buyer Center</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto hide-scrollbar">
                    {isOnboarding ? (
                        /* --- NAVIGATION FOR ONBOARDING VIEW --- */
                        <div className="flex flex-col h-full">
                            <div className="py-4 flex-1">
                                <div className="px-6 py-2 mb-2">
                                    <p className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.2em] bg-brand-blue/5 w-fit px-3 py-1 rounded-full">Explore</p>
                                </div>
                                <button
                                    onClick={() => { onNavigate(View.ABOUT_US); if (window.innerWidth < 1024) onClose(); }}
                                    className="w-full flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-gray-50 text-slate-600"
                                >
                                    <Globe className="text-slate-400" size={24} />
                                    <span className="text-sm font-bold tracking-wide">ABOUT US</span>
                                </button>
                                <button
                                    onClick={() => { onNavigate(View.OUR_TEAM); if (window.innerWidth < 1024) onClose(); }}
                                    className="w-full flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-gray-50 text-slate-600"
                                >
                                    <Users className="text-slate-400" size={24} />
                                    <span className="text-sm font-bold tracking-wide">OUR TEAM</span>
                                </button>

                                <div className="border-b border-gray-100 mx-6 my-4"></div>

                                <div className="px-6 py-2 mb-2">
                                    <p className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.2em] bg-brand-blue/5 w-fit px-3 py-1 rounded-full">Support</p>
                                </div>
                                <button
                                    onClick={() => { onNavigate(View.FAQS); if (window.innerWidth < 1024) onClose(); }}
                                    className="w-full flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-gray-50 text-slate-600"
                                >
                                    <HelpCircle className="text-slate-400" size={24} />
                                    <span className="text-sm font-bold tracking-wide">Help & Assistance</span>
                                </button>
                                <button
                                    onClick={() => { onNavigate(View.CONTACT_SUPPORT); if (window.innerWidth < 1024) onClose(); }}
                                    className="w-full flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-gray-50 text-slate-600"
                                >
                                    <Headphones className="text-slate-400" size={24} />
                                    <span className="text-sm font-bold tracking-wide">Contact Support</span>
                                </button>
                            </div>

                            <div className="p-6 border-t border-gray-100 flex flex-col gap-3 shrink-0">
                                <button
                                    onClick={() => { onNavigate(View.SIGNUP); if (window.innerWidth < 1024) onClose(); }}
                                    className="w-full bg-brand-blue text-white py-4 rounded-2xl font-bold shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                                >
                                    Join AfricaMart
                                </button>
                                <div className="text-center mt-2">
                                    <p className="text-xs text-slate-500 font-medium">Already have an account?</p>
                                    <button
                                        onClick={() => { console.log('Login clicked'); if (window.innerWidth < 1024) onClose(); }}
                                        className="text-brand-blue text-sm font-bold mt-1.5 hover:underline"
                                    >
                                        Log in here
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* --- NAVIGATION FOR AUTHENTICATED/SELLER VIEW --- */
                        <>
                            <div className="py-4">
                                <button
                                    onClick={() => { onNavigate(View.DASHBOARD); if (window.innerWidth < 1024) onClose(); }}
                                    className={`w-full flex items-center gap-4 px-6 py-3.5 transition-colors ${currentView === View.DASHBOARD ? 'bg-blue-50 text-brand-blue font-bold border-r-4 border-brand-blue' : 'hover:bg-gray-50 text-gray-600'}`}
                                >
                                    <Home className={currentView === View.DASHBOARD ? 'text-brand-blue' : 'text-gray-400'} size={24} />
                                    <span className="text-sm font-bold">HOME</span>
                                </button>

                                <button
                                    onClick={() => { onNavigate(View.CATEGORIES); if (window.innerWidth < 1024) onClose(); }}
                                    className={`w-full flex items-center gap-4 px-6 py-3.5 transition-colors ${currentView === View.CATEGORIES ? 'bg-blue-50 text-brand-blue font-bold border-r-4 border-brand-blue' : 'hover:bg-gray-50 text-gray-600'}`}
                                >
                                    <LayoutGrid className={currentView === View.CATEGORIES ? 'text-brand-blue' : 'text-gray-400'} size={24} />
                                    <span className="text-sm font-bold">Browse Categories</span>
                                </button>

                                <button
                                    onClick={() => { onNavigate(View.POST_REQUIREMENT); if (window.innerWidth < 1024) onClose(); }}
                                    className={`w-full flex items-center gap-4 px-6 py-3.5 transition-colors ${currentView === View.POST_REQUIREMENT ? 'bg-blue-50 text-brand-blue font-bold border-r-4 border-brand-blue' : 'hover:bg-gray-50 text-gray-600'}`}
                                >
                                    <FilePlus className={currentView === View.POST_REQUIREMENT ? 'text-brand-blue' : 'text-gray-400'} size={24} />
                                    <span className="text-sm font-bold">Post Requirements</span>
                                </button>

                                <button
                                    onClick={() => { onNavigate(View.MY_ORDERS); if (window.innerWidth < 1024) onClose(); }}
                                    className={`w-full flex items-center gap-4 px-6 py-3.5 transition-colors ${currentView === View.MY_ORDERS ? 'bg-blue-50 text-brand-blue font-bold border-r-4 border-brand-blue' : 'hover:bg-gray-50 text-gray-600'}`}
                                >
                                    <MapPin className={currentView === View.MY_ORDERS ? 'text-brand-blue' : 'text-gray-400'} size={24} />
                                    <span className="text-sm font-bold">Region Search</span>
                                </button>
                            </div>

                            <div className="px-6 py-2 mt-4 mb-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Personal & Communication</p>
                            </div>

                            <div className="pt-2 pb-2">
                                <button
                                    onClick={() => { onNavigate(View.MESSAGES); if (window.innerWidth < 1024) onClose(); }}
                                    className={`w-full flex items-center gap-4 px-6 py-3.5 transition-colors ${currentView === View.MESSAGES ? 'bg-blue-50 text-brand-blue font-bold border-r-4 border-brand-blue' : 'hover:bg-gray-50 text-gray-600'}`}
                                >
                                    <div className="flex-1 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <MessageCircle className={currentView === View.MESSAGES ? 'text-brand-blue' : 'text-gray-400'} size={24} />
                                            <span className="text-sm font-bold">Messages</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="bg-brand-blue text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-brand-blue/20">20+</span>
                                        </div>
                                    </div>
                                </button>
                                <button
                                    onClick={() => { onNavigate(View.NOTIFICATIONS); if (window.innerWidth < 1024) onClose(); }}
                                    className={`w-full flex items-center gap-4 px-6 py-3.5 transition-colors ${currentView === View.NOTIFICATIONS ? 'bg-blue-50 text-brand-blue font-bold border-r-4 border-brand-blue' : 'hover:bg-gray-50 text-gray-600'}`}
                                >
                                    <div className="flex-1 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <Bell className={currentView === View.NOTIFICATIONS ? 'text-brand-blue' : 'text-gray-400'} size={24} />
                                            <span className="text-sm font-bold">Notifications</span>
                                        </div>
                                        <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-accent/20">5</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => { onNavigate(View.SETTINGS); if (window.innerWidth < 1024) onClose(); }}
                                    className={`w-full flex items-center gap-4 px-6 py-3.5 transition-colors ${currentView === View.SETTINGS ? 'bg-blue-50 text-brand-blue font-bold border-r-4 border-brand-blue' : 'hover:bg-gray-50 text-gray-600'}`}
                                >
                                    <UserCircle className={currentView === View.SETTINGS ? 'text-brand-blue' : 'text-gray-400'} size={24} />
                                    <span className="font-bold text-sm">My Account</span>
                                </button>
                            </div>

                            <div className="px-6 py-2 mt-4 mb-2">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Support & Information</p>
                            </div>

                            {/* Dropdown Sections (Help & More) */}
                            <div className="mt-2 flex flex-col gap-1">
                                <button
                                    onClick={() => setIsHelpOpen(!isHelpOpen)}
                                    className="w-full flex items-center justify-between px-6 py-4 bg-[#f3f6fa] hover:brightness-95 transition-all outline-none"
                                >
                                    <span className="font-bold text-black text-xs tracking-wider uppercase">Help & Support</span>
                                    <ChevronDown className={`text-gray-400 transition-transform ${isHelpOpen ? 'rotate-180' : ''}`} size={24} />
                                </button>
                                {isHelpOpen && (
                                    <div className="flex flex-col bg-white border-b border-gray-50">
                                        <button
                                            onClick={() => { onNavigate(View.SETTINGS); if (window.innerWidth < 1024) onClose(); }}
                                            className={`w-full flex items-center gap-4 px-6 py-3.5 text-sm font-medium transition-colors ${currentView === View.SETTINGS ? 'bg-blue-50 text-brand-blue' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            <Settings className={currentView === View.SETTINGS ? 'text-brand-blue' : 'text-gray-400'} size={20} />
                                            <span>Settings</span>
                                        </button>
                                        <button
                                            onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                                            className="w-full flex items-center gap-4 px-6 py-3.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                        >
                                            <HelpCircle className="text-gray-400" size={20} />
                                            <span>Help Center (FAQs)</span>
                                        </button>
                                        <button
                                            onClick={() => { onNavigate(View.CONTACT_SUPPORT); if (window.innerWidth < 1024) onClose(); }}
                                            className={`w-full flex items-center gap-4 px-6 py-3.5 text-sm font-medium transition-colors ${currentView === View.CONTACT_SUPPORT ? 'bg-blue-50 text-brand-blue' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            <Headphones className={currentView === View.CONTACT_SUPPORT ? 'text-brand-blue' : 'text-gray-400'} size={20} />
                                            <span>Contact Support</span>
                                        </button>
                                        <button
                                            onClick={() => { onNavigate(View.POLICIES); if (window.innerWidth < 1024) onClose(); }}
                                            className={`w-full flex items-center gap-4 px-6 py-3.5 text-sm font-medium transition-colors ${currentView === View.POLICIES ? 'bg-blue-50 text-brand-blue' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            <ShieldCheck className={currentView === View.POLICIES ? 'text-brand-blue' : 'text-gray-400'} size={20} />
                                            <span>Policies</span>
                                        </button>
                                    </div>
                                )}

                                <button
                                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                                    className="w-full flex items-center justify-between px-6 py-4 bg-[#f3f6fa] hover:brightness-95 transition-all outline-none"
                                >
                                    <span className="font-bold text-black text-xs tracking-wider uppercase">More</span>
                                    <ChevronDown className={`text-gray-400 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} size={24} />
                                </button>
                                {isMoreOpen && (
                                    <div className="flex flex-col bg-white border-b border-gray-50">
                                        <button
                                            onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                                            className="w-full flex items-center gap-4 px-6 py-3.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                        >
                                            <Info className="text-gray-400" size={20} />
                                            <span>About AfricaMart</span>
                                        </button>
                                        <button
                                            onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                                            className="w-full flex items-center gap-4 px-6 py-3.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                        >
                                            <BadgeCheck className="text-gray-400" size={20} />
                                            <span>AfricaMart Services</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </nav>

                {!isOnboarding && (
                    <div className="p-6 border-t border-gray-100 shrink-0">
                        <button
                            onClick={() => { console.log('Login clicked'); if (window.innerWidth < 1024) onClose(); }}
                            className="w-full bg-brand-blue text-white py-4 rounded-2xl font-bold shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                        >
                            <LogIn size={20} />
                            Login to Account
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Drawer;
