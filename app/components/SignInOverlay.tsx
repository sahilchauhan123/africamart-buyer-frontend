"use client";

import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';

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
        // Handle login logic
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
            ></div>

            {/* Modal Card */}
            <div className="relative w-full max-w-sm bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
                <div className="p-6">
                    <div className="flex justify-end">
                        <button 
                            onClick={onClose}
                            className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="text-center mb-5">
                        <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                            <User className="w-7 h-7 text-brand-blue" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
                        <p className="text-slate-400 text-xs font-medium mt-1">Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                        {/* Email/Phone */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1">Email or Phone</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input 
                                    type="text" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-sm font-bold focus:bg-white focus:border-brand-blue/30 transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-slate-400 tracking-widest">Password</label>
                                <button type="button" className="text-[10px] font-black text-brand-blue tracking-widest hover:underline">Forgot?</button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3 pl-11 pr-12 text-sm font-bold focus:bg-white focus:border-brand-blue/30 transition-all outline-none"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 px-1"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full mt-4 bg-brand-blue text-white uppercase py-3.5 rounded-2xl font-black tracking-[0.2em] text-[11px] shadow-xl shadow-brand-blue/20 hover:brightness-110 active:scale-[0.98] transition-all"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-6 pt-5 border-t border-slate-50 text-center">
                        <button 
                            onClick={() => {
                                onClose();
                                onSwitchToSignUp?.();
                            }}
                            className="text-brand-blue font-black uppercase tracking-[0.15em] hover:underline text-[12px]"
                        >
                            Create an Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInOverlay;
