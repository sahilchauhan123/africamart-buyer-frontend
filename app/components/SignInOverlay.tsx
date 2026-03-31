"use client";

import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

interface SignInOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToSignUp?: () => void;
}

const SignInOverlay: React.FC<SignInOverlayProps> = ({ isOpen, onClose, onSwitchToSignUp }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 font-body">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            ></div>

            {/* Modal Card */}
            <div className="relative w-full max-w-[340px] bg-white dark:bg-slate-900 rounded-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-800">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">Sign In</h2>
                        <button 
                            onClick={onClose}
                            className="p-1 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 ml-0.5 uppercase tracking-widest leading-none">Email or Phone</label>
                            <input 
                                type="text" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-sm px-3 text-xs font-bold focus:border-[#0026C0] outline-none transition-colors"
                            />
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 ml-0.5 uppercase tracking-widest leading-none">Password</label>
                                <button type="button" className="text-[9px] font-bold text-[#0026C0] hover:underline">Forgot?</button>
                            </div>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-sm px-3 pr-10 text-xs font-bold focus:border-[#0026C0] outline-none transition-colors"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                >
                                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full h-10 bg-[#0026C0] text-white uppercase font-black tracking-[0.2em] text-[10px] shadow-lg shadow-[#0026C0]/20 hover:bg-[#0020A0] transition-colors rounded-sm active:scale-[0.98] mt-2"
                        >
                            Log In
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                        <p className="text-slate-400 dark:text-slate-500 text-[10px] font-medium mb-2">New Here?</p>
                        <button 
                            onClick={onSwitchToSignUp}
                            className="text-[#0026C0] font-black uppercase tracking-[0.15em] hover:underline text-[10px]"
                        >
                            Create Business Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInOverlay;
