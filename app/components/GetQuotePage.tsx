"use client";

import React, { useState } from 'react';
import { ArrowLeft, Send, Package, Info, CheckCircle2, Phone, MessageSquare } from 'lucide-react';

interface GetQuotePageProps {
    onBack: () => void;
    productName: string;
    businessName: string;
    productPrice: string;
    productImage: string;
}

const GetQuotePage: React.FC<GetQuotePageProps> = ({ 
    onBack, 
    productName = "Heavy Duty Industrial Pump Model X-200",
    businessName = "Six", 
    productPrice = "₹ 45,000 - ₹ 55,000 / Unit",
    productImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuCfE1vWrW9fM1qDnsVTCzFqc2Jy15k7VP7jDw0XiI7xBOfxl7CWNKpfKdjt6a1Cn33Jpdq5MfcO_of6I22NUlUj36lgqyMCeOvmJR8GitEkCqQZiUjbEuJkeyFlPZbJJZNRjRGdjiPQ3BDTz41vT-C9Kf0fujSyKMpFqKKUoHHDvx3dsV1nvNg0cHQstk1BrURc7ItmCIAj3X9NCmR-lsetujm_o2q8jh4cOHCBQdIkTc-ghPhMwHQbQxnkO0k_crtHgpSqnHaeyeE"
}) => {
    const [quantity, setQuantity] = useState("1");
    const [message, setMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        // Simulate API call
        setTimeout(() => {
            // Potential auto-close after submission
        }, 2000);
    };

    if (isSubmitted) {
        return (
            <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300">
                <div className="size-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Quote Sent Successfully!</h2>
                <p className="text-slate-500 mb-8 max-w-[280px]">
                    Your request has been sent to <span className="font-bold text-slate-800">{businessName}</span>. They will contact you shortly.
                </p>
                <button 
                    onClick={onBack}
                    className="w-full max-w-xs py-4 bg-brand-blue text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all"
                >
                    Continue 
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-[#f8f9fc] z-[100] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <header className="bg-white border-b border-slate-100 px-4 py-4 sticky top-0 z-10 flex items-center justify-center relative">
                <button 
                    onClick={onBack}
                    className="absolute left-4 p-1 hover:bg-slate-100 rounded-full transition-colors active:scale-90"
                >
                    <ArrowLeft className="w-6 h-6 text-slate-700" />
                </button>
                <h1 className="text-lg font-bold text-slate-900 tracking-tight text-center">Request a Quote</h1>
            </header>

            <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                {/* Product Summary Card */}
                <section className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex gap-4">
                    <div className="w-20 h-20 bg-slate-50 rounded-xl overflow-hidden border border-slate-50 flex-shrink-0 relative">
                        <img 
                            src={productImage} 
                            alt={productName} 
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                        <p className="text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-1">{businessName}</p>
                        <h2 className="text-sm font-bold text-slate-900 leading-tight line-clamp-2 mb-1">{productName}</h2>
                        <p className="text-[11px] font-bold text-slate-600">{productPrice}</p>
                    </div>
                </section>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6 pb-10">
                    {/* Quantity Section */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                            <Package className="w-4 h-4" />
                            Requirement Quantity
                        </label>
                        <div className="flex items-center gap-3">
                            <input 
                                type="number" 
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-base font-bold focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all shadow-sm"
                                placeholder="Enter quantity"
                                required
                            />
                            <div className="bg-slate-200 text-slate-700 font-bold px-4 py-3.5 rounded-xl border border-slate-200 shadow-sm">
                                Units
                            </div>
                        </div>
                    </div>

                    {/* Requirement Details Section */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                            <Info className="w-4 h-4" />
                            Describe Your Requirement
                        </label>
                        <textarea 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-4 text-base font-medium focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all shadow-sm placeholder:text-slate-400"
                            placeholder="Example: Need delivery by next week, looking for bulk discount for 10+ units..."
                            required
                        ></textarea>
                        <p className="text-[10px] text-slate-400 font-medium px-1">
                            Pro Tip: Specific requirements get faster responses from sellers.
                        </p>
                    </div>

                    {/* Trust Banner */}
                    <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-2xl p-4 flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue mt-0.5" />
                        <div>
                            <p className="text-xs font-bold text-slate-900">AfricaMart Verified Protection</p>
                            <p className="text-[10px] text-slate-600 mt-1 leading-relaxed">
                                Your information is shared only with <span className="font-bold">{businessName}</span> and protected by our secure procurement policy.
                            </p>
                        </div>
                    </div>
                </form>
            </main>

            {/* Sticky Bottom Actions */}
            <div className="bg-white border-t border-slate-100 p-4 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
                <button 
                    onClick={handleSubmit}
                    className="w-full h-14 bg-brand-blue text-white font-bold rounded-xl shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-2 active:scale-95 transition-all text-lg"
                >
                    <Send className="w-5 h-5" />
                    Send Quote Request
                </button>
            </div>
        </div>
    );
};

export default GetQuotePage;
