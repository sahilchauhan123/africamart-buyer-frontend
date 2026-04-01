"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, HelpCircle, Eye, EyeOff, ArrowRight, X, Check, Search, MapPin, Building2, User, Loader2 } from 'lucide-react';

interface DesktopSignUpOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: () => void;
}

const DesktopSignUpOverlay: React.FC<DesktopSignUpOverlayProps> = ({ isOpen, onClose, onLogin }) => {
    const [step, setStep] = useState(1);
    const [isCompleting, setIsCompleting] = useState(false);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setStep(1); 
            setIsCompleting(false);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            onClose();
        }
    };

    const nextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        }
    };

    const handleComplete = () => {
        setIsCompleting(true);
        // Premium transition delay before closing
        setTimeout(() => {
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 font-body">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={!isCompleting ? onClose : undefined}
            ></div>

            {/* Modal Card */}
            <div className={`relative w-full ${step === 3 ? 'max-w-[500px]' : 'max-w-[360px]'} bg-white rounded-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200 transition-all duration-300`}>
                
                {/* Progress Bar (Hidden during completion) */}
                {!isCompleting && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 pointer-events-none">
                        <div
                            className="h-full bg-[#0026C0] transition-all duration-500"
                            style={{ width: `${(step / 3) * 100}%` }}
                        ></div>
                    </div>
                )}

                {/* Loading / Completion Animation Overlay */}
                {isCompleting && (
                    <div className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
                        <div className="relative">
                            {/* Outer Pulse */}
                            <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping duration-1000"></div>
                            {/* Inner Circle */}
                            <div className="relative w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 scale-110">
                                <Check className="text-white w-10 h-10 animate-in zoom-in-50 duration-300" strokeWidth={4} />
                            </div>
                        </div>
                        <p className="mt-6 text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] animate-pulse">Account Ready</p>
                    </div>
                )}

                <div className={`p-10 transition-opacity duration-300 ${isCompleting ? 'opacity-0 scale-95' : 'opacity-100'}`}>
                    <div className="flex justify-between items-center mb-10">
                         <div className="flex items-center gap-4">
                            {step > 1 && (
                                <button 
                                    onClick={handleBack}
                                    className="p-1 rounded text-slate-400 hover:text-[#0026C0] transition-colors"
                                >
                                    <ArrowLeft size={16} />
                                </button>
                            )}
                            <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Create Account</h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-slate-400 font-bold uppercase text-[9px] tracking-widest hidden sm:inline">Step {step}/3</span>
                            <button 
                                onClick={onClose}
                                className="p-1 rounded text-slate-400 hover:text-slate-900 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    {step === 1 && (
                        <div className="animate-in slide-in-from-right-4 duration-300">
                            <div className="mb-6">
                                <h3 className="text-[10px] font-black text-[#0026C0] uppercase tracking-widest mb-1">Personal Details</h3>
                                <p className="text-slate-500 text-xs font-medium">Join AfricaMart B2B.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none ml-1">First Name</label>
                                        <input className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#0026C0] rounded-sm transition-all text-slate-900 font-bold outline-none text-xs shadow-sm" placeholder="John" type="text" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none ml-1">Last Name</label>
                                        <input className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#0026C0] rounded-sm transition-all text-slate-900 font-bold outline-none text-xs shadow-sm" placeholder="Doe" type="text" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none ml-1">Company Email</label>
                                    <input className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#0026C0] rounded-sm transition-all text-slate-900 font-bold outline-none text-xs shadow-sm" placeholder="name@company.com" type="text" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none ml-1">Password</label>
                                    <div className="relative flex items-center">
                                        <input className="w-full h-10 pl-3 pr-10 bg-white border border-slate-200 focus:border-[#0026C0] rounded-sm transition-all text-slate-900 font-bold outline-none text-xs shadow-sm" placeholder="Min. 8 chars" type={showPassword ? "text" : "password"} />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 p-2 text-slate-300 hover:text-slate-600 transition-colors"><Eye size={12} /></button>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <button onClick={nextStep} className="w-full h-10 bg-[#0026C0] text-white font-black rounded-sm shadow-md shadow-[#0026C0]/10 active:scale-[0.98] transition-all flex items-center justify-center gap-3 tracking-[0.2em] uppercase text-[10px]">
                                        Continue
                                        <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>

                             <footer className="mt-8 text-center pt-6 border-t border-slate-100">
                                <button 
                                    onClick={onLogin}
                                    className="text-[#0026C0] font-black hover:underline uppercase tracking-widest text-[9px]"
                                >
                                    Login to Business Account
                                </button>
                            </footer>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in slide-in-from-right-4 duration-300">
                            <div className="mb-6">
                                <h3 className="text-[10px] font-black text-[#0026C0] uppercase tracking-widest mb-1">Company Detail</h3>
                                <p className="text-slate-500 text-xs font-medium">Verify your business profile.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none ml-1">Company Name</label>
                                    <input className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#0026C0] rounded-sm transition-all text-slate-900 font-bold outline-none text-xs shadow-sm" placeholder="Global Trade Ltd." type="text" />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none ml-1">Type</label>
                                        <select className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#0026C0] rounded-sm transition-all text-slate-900 font-bold outline-none appearance-none text-xs shadow-sm">
                                            <option>Wholesaler</option>
                                            <option>Retailer</option>
                                            <option>Manufacturer</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none ml-1">Region</label>
                                        <select className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#0026C0] rounded-sm transition-all text-slate-900 font-bold outline-none appearance-none text-xs shadow-sm">
                                            <option>West Africa</option>
                                            <option>East Africa</option>
                                            <option>Global</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none ml-1">HQ Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                        <input className="w-full h-10 pl-9 pr-3 bg-white border border-slate-200 focus:border-[#0026C0] rounded-sm transition-all text-slate-900 font-bold outline-none text-xs shadow-sm" placeholder="Main St, Lagos" type="text" />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button onClick={nextStep} className="w-full h-10 bg-[#0026C0] text-white font-black rounded-sm shadow-md shadow-[#0026C0]/10 active:scale-[0.98] transition-all flex items-center justify-center gap-3 tracking-[0.2em] uppercase text-[10px]">
                                        Continue
                                        <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-in slide-in-from-right-4 duration-300">
                             <div className="mb-6">
                                <h3 className="text-[10px] font-black text-[#0026C0] uppercase tracking-widest mb-1">Trade Interests</h3>
                                <p className="text-slate-500 text-xs font-medium">Select sourcing categories.</p>
                            </div>

                            <div className="grid grid-cols-4 gap-2.5">
                                {[
                                    { id: 'machinery', label: 'Machinery', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=200' },
                                    { id: 'grains', label: 'Food', img: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&q=80&w=200' },
                                    { id: 'construction', label: 'Bldg', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=200' },
                                    { id: 'apparel', label: 'Apparel', img: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=200' },
                                    { id: 'electronics', label: 'Electro', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=200' },
                                    { id: 'medical', label: 'Medical', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200' },
                                    { id: 'energy', label: 'Solar', img: 'https://images.unsplash.com/photo-1509391366360-1e97d5259d81?auto=format&fit=crop&q=80&w=200' },
                                    { id: 'hardware', label: 'Hrdware', img: 'https://images.unsplash.com/photo-1581147036324-c1784ca13bb7?auto=format&fit=crop&q=80&w=200' },
                                ].map((topic) => (
                                    <button
                                        key={topic.id}
                                        onClick={() => {
                                            if (selectedInterests.includes(topic.id)) {
                                                setSelectedInterests(selectedInterests.filter(id => id !== topic.id));
                                            } else {
                                                setSelectedInterests([...selectedInterests, topic.id]);
                                            }
                                        }}
                                        className={`flex flex-col items-center justify-center p-2 rounded-sm border-2 transition-all duration-300 relative group ${
                                            selectedInterests.includes(topic.id)
                                            ? 'bg-slate-900 border-slate-900 text-white'
                                            : 'bg-white border-slate-100 text-slate-900 hover:border-[#0026C0]/40'
                                        }`}
                                    >
                                        <div className="w-8 h-8 rounded-full overflow-hidden mb-1.5 border border-slate-50 relative">
                                            <img src={topic.img} alt={topic.label} className="w-full h-full object-cover" />
                                            {selectedInterests.includes(topic.id) && (
                                                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[0.5px] flex items-center justify-center">
                                                    <Check className="text-white w-4 h-4" strokeWidth={4} />
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-[8px] font-black text-center leading-none uppercase tracking-tighter h-3 flex items-center">{topic.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8">
                                <button
                                    onClick={handleComplete}
                                    className="w-full h-10 bg-[#0026C0] text-white font-black rounded-sm shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-3 tracking-[0.2em] uppercase text-[10px]"
                                >
                                    Complete Setup
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DesktopSignUpOverlay;
