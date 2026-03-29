"use client";

import React, { useState, useEffect } from 'react';
import { X, Send, Package, MapPin, Clock, Info, CheckCircle2 } from 'lucide-react';

interface ReachSellerOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
    productImage: string;
}

const ReachSellerOverlay: React.FC<ReachSellerOverlayProps> = ({ isOpen, onClose, productName, productImage }) => {
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [quantity, setQuantity] = useState("");
    const [details, setDetails] = useState("");
    const [location, setLocation] = useState("Monrovia, Liberia");

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
        setStep('success');
        setTimeout(() => {
            // Auto close after success?
        }, 3000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            ></div>

            {/* Content Card */}
            <div className="relative w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-full duration-1000 ease-out">
                {/* Header Highlight */}
                <div className="h-1.5 w-12 bg-slate-200 rounded-full mx-auto mt-3 mb-1 sm:hidden"></div>

                {step === 'form' ? (
                    <div className="p-6 pt-2 sm:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-black text-slate-900 tracking-tight">Reach Supplier</h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Direct Requirement Request</p>
                            </div>
                            <button 
                                onClick={onClose}
                                className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="mb-8 p-4 bg-brand-blue/5 rounded-2xl border border-brand-blue/10 flex items-start gap-3">
                            <div className="w-14 h-14 bg-white rounded-xl shadow-sm overflow-hidden flex-shrink-0 border border-brand-blue/10">
                                <img src={productImage} alt={productName} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest leading-none mb-1.5 mt-1">Requesting For</p>
                                <p className="text-sm font-bold text-slate-800 line-clamp-2 leading-tight">{productName}</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Quantity */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-900 tracking-wider ml-1">Expected Quantity</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        required
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        placeholder="e.g. 500 kg or 20 units"
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-5 text-sm font-bold focus:bg-white focus:border-brand-blue/30 focus:ring-4 focus:ring-brand-blue/5 transition-all outline-none placeholder:text-slate-300"
                                    />
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-900 tracking-wider ml-1">Requirement Details</label>
                                <textarea 
                                    required
                                    rows={3}
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                    placeholder="Describe your specific needs, quality standards, or questions..."
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-5 text-sm font-bold focus:bg-white focus:border-brand-blue/30 focus:ring-4 focus:ring-brand-blue/5 transition-all outline-none placeholder:text-slate-300 resize-none"
                                ></textarea>
                            </div>

                            {/* Location & Urgency */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-slate-900 tracking-wider ml-1">Delivery To</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input 
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold focus:bg-white focus:border-brand-blue/30 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-slate-900 tracking-wider ml-1">Urgency</label>
                                    <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3.5 px-4 text-xs font-bold focus:bg-white focus:border-brand-blue/30 transition-all outline-none appearance-none">
                                        <option>Standard (3-7 days)</option>
                                        <option>Urgent (ASAP)</option>
                                        <option>Planning phase</option>
                                    </select>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className="w-full mt-4 bg-brand-blue text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-brand-blue/20 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                            >
                                <Send size={16} className="translate-x-0.5 -translate-y-0.5" />
                                Submit Requirement
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="p-10 text-center animate-in zoom-in-95 duration-500">
                        <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Requirement Sent!</h2>
                        <p className="text-sm font-medium text-slate-400 mb-8 max-w-[240px] mx-auto leading-relaxed">The supplier will review your details and contact you via your registered email/phone.</p>
                        <button 
                            onClick={onClose}
                            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.15em] text-xs active:scale-[0.98] transition-all"
                        >
                            Return to Shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReachSellerOverlay;
