"use client";

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, Paperclip, ShieldCheck } from 'lucide-react';
import { View } from '../types';

interface PostRequirementProps {
    onBack: () => void;
    onNavigate: (view: View) => void;
}

const PostRequirement: React.FC<PostRequirementProps> = ({ onBack, onNavigate }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [productQuery, setProductQuery] = useState('');
    const [showProductDropdown, setShowProductDropdown] = useState(false);

    // Mock data for autocomplete
    const mockProducts = [
        "Industrial Pumps",
        "Cotton Yarn",
        "Solar Panels",
        "Agricultural Machinery",
        "Construction Materials",
        "Automotive Parts",
        "Electronic Components",
        "Packaging Materials",
        "Textile Machinery",
        "Chemical Fertilizers"
    ];

    const filteredProducts = productQuery === '' 
        ? mockProducts 
        : mockProducts.filter((product) => 
            product.toLowerCase().includes(productQuery.toLowerCase())
        );

    return (
        <div className="bg-[#f6f6f8] h-[100dvh] font-display antialiased flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
            <div className="max-w-md w-full mx-auto bg-white h-full flex flex-col shadow-xl relative">
                {/* Header / Top App Bar */}
                <header className="shrink-0 z-10 bg-brand-blue text-white shadow-md">
                    <div className="flex items-center px-4 py-3">
                        <button
                            onClick={onBack}
                            className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors shrink-0"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <h1 className="flex-1 text-center text-lg font-bold ml-2">Post Your Requirement</h1>
                        <div className="w-10 shrink-0"></div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 space-y-8 hide-scrollbar">
                    {/* Welcome Headline */}
                    <div className="pt-2 pb-4">
                        <h2 className="text-xl lg:text-2xl font-bold leading-tight text-slate-900">Tell us what you are looking for</h2>
                        <p className="text-slate-500 mt-1 text-sm">Fill in the details below to get quotes from verified suppliers.</p>
                    </div>

                    <form className="space-y-6 pb-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700">
                                    Product Name or Service <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full px-4 py-4 rounded-lg border-2 border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-blue transition-all text-base placeholder:text-slate-400"
                                        placeholder="e.g. Industrial Pumps, Cotton Yarn"
                                        required
                                        type="text"
                                        value={productQuery}
                                        onChange={(e) => {
                                            setProductQuery(e.target.value);
                                            setShowProductDropdown(true);
                                        }}
                                        onFocus={() => setShowProductDropdown(true)}
                                        onBlur={() => setTimeout(() => setShowProductDropdown(false), 200)}
                                    />
                                    {/* Autocomplete Dropdown */}
                                    {showProductDropdown && filteredProducts.length > 0 && (
                                        <div className="absolute z-20 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-96 overflow-y-auto ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-300">
                                            {filteredProducts.map((product, idx) => (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    className="w-full text-left px-5 py-3.5 text-slate-700 hover:bg-slate-50 hover:text-brand-blue transition-colors focus:bg-slate-50 focus:outline-none border-b border-slate-50 last:border-0 font-medium"
                                                    onClick={() => {
                                                        setProductQuery(product);
                                                        setShowProductDropdown(false);
                                                    }}
                                                >
                                                    {product}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-slate-700">
                                        Quantity <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="w-full px-4 py-4 rounded-lg border-2 border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-blue transition-all text-base placeholder:text-slate-400"
                                        inputMode="numeric"
                                        placeholder="e.g. 500"
                                        required
                                        type="number"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-slate-700">
                                        Unit
                                    </label>
                                    <div className="relative">
                                        <select className="w-full appearance-none px-4 py-4 rounded-lg border-2 border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-blue transition-all text-base pr-10">
                                            <option value="pcs">Pcs</option>
                                            <option value="kg">Kg</option>
                                            <option value="ton">Tons</option>
                                            <option value="mtr">Meters</option>
                                            <option value="unit">Units</option>
                                            <option value="box">Boxes</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                                            <ChevronDown className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700">
                                    Requirement Details (Optional)
                                </label>
                                <textarea
                                    className="w-full px-4 py-4 rounded-lg border-2 border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-blue transition-all text-base placeholder:text-slate-400 resize-none"
                                    placeholder="e.g. Looking for high-grade industrial pumps for chemical processing. Must have ISO 9001 certification and 2-year warranty."
                                    rows={4}
                                ></textarea>
                            </div>

                        <div className="pt-4">
                            <button
                                type="button"
                                onClick={() => setShowSuccess(true)}
                                className="w-full bg-brand-blue hover:brightness-110 text-white font-bold text-lg h-14 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-blue/20 active:scale-[0.98]"
                            >
                                <span>Submit Requirement</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </main>
            </div>

            {/* Success Popup */}
            {showSuccess && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"></div>
                    <div className="relative bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in slide-in-from-bottom-8 duration-500">
                        <div className="p-8 text-center">
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-emerald-50">
                                <ShieldCheck className="w-10 h-10" />
                            </div>
                            
                            <h3 className="text-2xl font-black text-slate-900 mb-2">Requirement Posted!</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8 px-4">
                                Your requirement has been sent to verified sellers. You'll start receiving quotes shortly.
                            </p>

                            <button
                                onClick={() => onNavigate(View.DASHBOARD)}
                                className="w-full bg-brand-blue text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-blue/20 active:scale-[0.98] transition-all"
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostRequirement;
