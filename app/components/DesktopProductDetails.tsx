"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowLeft, MapPin, Star, ShieldCheck, Truck, Clock, MessageSquare, Phone, Share2, Heart, ChevronRight, Info } from 'lucide-react';
import ProductCard from './ProductCard';

interface DesktopProductDetailsProps {
    product: {
        name: string;
        price: string;
        unit: string;
        image: string;
        supplier?: string;
        location?: string;
        rating?: number;
        reviews?: string;
        isVerified?: boolean;
        isLocal?: boolean;
    };
    onBack: () => void;
}

export default function DesktopProductDetails({ product, onBack }: DesktopProductDetailsProps) {
    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-6 px-4 lg:px-8 font-body">
            <div className="max-w-[1700px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Left Column: Image Gallery */}
                    <div className="w-full lg:w-[480px] shrink-0">
                        <button
                            onClick={onBack}
                            className="flex items-center gap-1 text-sm text-[#0026C0] font-bold hover:underline mb-6 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                            Back to results
                        </button>
                        <div className="sticky top-24 flex gap-4">
                            {/* Vertical Thumbnail Strip */}
                            <div className="flex flex-col gap-3 order-last lg:order-first">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className={`w-20 h-20 rounded-lg border-2 overflow-hidden cursor-pointer transition-all ${i === 1 ? 'border-[#0026C0]' : 'border-slate-100 dark:border-slate-800 hover:border-slate-300'}`}>
                                        <div className="relative w-full h-full bg-white flex items-center justify-center p-1">
                                            <Image src={product.image} alt="Thumbnail view" fill className="object-cover opacity-80" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Main Product Image */}
                            <div className="flex-1 aspect-square bg-white dark:bg-slate-900 rounded-lg p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group flex items-center justify-center">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-6 scale-110 group-hover:scale-125 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Middle Column: Product Info & Details */}
                    <main className="flex-1 min-w-0 space-y-6">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest overflow-hidden whitespace-nowrap">
                            <span className="hover:text-[#0026C0] cursor-pointer">AfricaMart</span>
                            <ChevronRight className="w-3 h-3 flex-shrink-0" />
                            <span className="hover:text-[#0026C0] cursor-pointer">Cereals & Food Grains</span>
                            <ChevronRight className="w-3 h-3 flex-shrink-0" />
                            <span className="hover:text-[#0026C0] cursor-pointer">Basmati Rice</span>
                            <ChevronRight className="w-3 h-3 flex-shrink-0" />
                            <span className="text-slate-900 dark:text-white truncate">Mogra Rice</span>
                        </nav>

                        <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-baseline gap-2 pb-6">
                            <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{product.price}</span>
                            <span className="text-lg font-bold text-slate-500">{product.unit}</span>
                            <button className="text-sm font-bold text-[#0026C0] hover:underline ml-4">Get Latest Price</button>
                        </div>

                        {/* Action Area (Boxed) */}
                        <div className="bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col gap-4">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    className="flex-grow h-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-5 font-bold text-base outline-none focus:border-[#0026C0] transition-colors"
                                    placeholder="Enter Quantity"
                                    type="number"
                                />
                                <div className="relative w-full sm:w-40 group">
                                    <select className="appearance-none w-full h-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-5 font-black text-slate-700 dark:text-slate-200 outline-none cursor-pointer pr-10 focus:border-[#0026C0] transition-colors text-sm">
                                        <option>Bag</option>
                                        <option>Kg</option>
                                        <option>Metric Ton</option>
                                    </select>
                                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90" />
                                </div>
                            </div>
                            <button className="w-full h-14 bg-[#2B3595] hover:bg-[#1f266b] text-white font-black rounded transition-all shadow-lg shadow-[#2B3595]/15 text-lg uppercase tracking-widest">
                                Submit Requirement
                            </button>
                        </div>

                        {/* Specs Table */}
                        <div className="bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="bg-slate-50/50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                                <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Product Details</h4>
                            </div>
                            <div className="divide-y divide-slate-50 dark:divide-slate-800">
                                {[
                                    ["Grade", "Mogra"],
                                    ["Processing Type", "Steam"],
                                    ["Packaging Size", "30 kg"],
                                    ["Type", "Mogra Rice"],
                                    ["Basmati Variety", "1121"],
                                    ["Brand", "Taujee"],
                                    ["Packaging Type", "BOPP Bag"],
                                    ["Country of Origin", "Made in Africa"],
                                    ["Availability", "In Stock"]
                                ].map(([label, value]) => (
                                    <div key={label} className="grid grid-cols-2 px-6 py-4 hover:bg-slate-50/50 transition-colors">
                                        <span className="text-sm font-medium text-slate-400">{label}</span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white capitalize">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="prose dark:prose-invert max-w-none pt-4">
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                {product.name} is a premium quality {product.unit} of rice, meticulously processed to maintain its natural aroma and elongated grain structure. Ideal for industrial catering and large-scale distribution.
                            </p>
                        </div>
                    </main>

                    {/* Right Column: Seller/Supplier Sidebar */}
                    <aside className="w-full lg:w-[320px] shrink-0 space-y-4">
                        <div className="bg-white dark:bg-slate-900 rounded-lg p-5 border border-slate-200 dark:border-slate-800 shadow-sm italic">
                            <div className="flex items-center gap-1 text-[13px] text-slate-500 mb-2">
                                <MapPin className="w-4 h-4" />
                                <span>{product.location || 'Ludhiana'}</span>
                            </div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{product.supplier || 'Bansal Enterprises'}</h3>

                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center gap-1.5 bg-green-500/10 text-green-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                                    <ShieldCheck className="w-3 h-3" />
                                    Verified
                                </div>
                                <span className="text-[11px] font-bold text-slate-400">2 yrs Member</span>
                            </div>

                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3.5 h-3.5 ${i < 3 ? 'fill-current' : 'text-slate-100'}`} />
                                    ))}
                                </div>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">2.9</span>
                                <span className="text-xs text-[#0026C0] font-bold hover:underline cursor-pointer">(10)</span>
                                <div className="h-3 w-px bg-slate-200 mx-2"></div>
                                <span className="text-[10px] font-bold text-green-600 uppercase">88% Response</span>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full h-11 rounded border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-3 text-sm font-black text-[#0026C0] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                    <Phone className="w-4 h-4" />
                                    Call Now
                                </button>
                                <button className="w-full h-14 bg-[#0026C0] rounded flex items-center justify-center gap-3 text-base font-black text-white hover:bg-[#0020A0] transition-all shadow-md shadow-[#0026C0]/10">
                                    <MessageSquare className="w-5 h-5 rotate-[-5deg]" />
                                    Contact Supplier
                                </button>
                            </div>
                        </div>

                        {/* Legal/Firm Status Section */}
                        <div className="bg-white dark:bg-slate-900 rounded-lg p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Legal Status</p>
                                    <p className="text-sm font-black text-slate-800 dark:text-slate-200">Proprietorship</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">GST Reg. Date</p>
                                    <p className="text-sm font-black text-slate-800 dark:text-slate-200">17-12-2020</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Annual Turnover</p>
                                    <p className="text-sm font-black text-slate-800 dark:text-slate-200">1.5 - 5 Cr</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Member Since</p>
                                    <p className="text-sm font-black text-slate-800 dark:text-slate-200">Nov 2024</p>
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>

                {/* Bottom Section: Similar Products / Recommended */}
                <div className="mt-16 pt-16 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Recommended for You</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Based on your recent interest in {product.name}</p>
                        </div>
                        <button className="text-[#0026C0] font-black flex items-center gap-1 hover:underline text-sm uppercase tracking-wider">
                            See More Results
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                        {[
                            { name: "Long Grain Parboiled Rice", price: "$2.80", unit: "kg", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEvFQB1H88fuOka7yp8h49qObv55xA1cM6DKc7JIAZgAW7orn15wB_v3qPidwWKuzWeRACovWHghmMy9z_0m6eDQ6D-wCEVAYTqGLzJYDYx5Qcz80z-dZRZBVFzrnCxBLJuZVzJaLmmYmH9BMwTgl_SP4PrtIy-cT_TFFfhmuM6z3p5Odq5dslAFKgEvT6HTQIajdF_VHTmPM14TCJG5xU0LaTyOu7wezQl2N-cMr_i3YJYk8h8D6j8jbN1PHNfJInF62lsI9UQVE" },
                            { name: "Golden Sella Basmati", price: "$4.50", unit: "kg", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEvFQB1H88fuOka7yp8h49qObv55xA1cM6DKc7JIAZgAW7orn15wB_v3qPidwWKuzWeRACovWHghmMy9z_0m6eDQ6D-wCEVAYTqGLzJYDYx5Qcz80z-dZRZBVFzrnCxBLJuZVzJaLmmYmH9BMwTgl_SP4PrtIy-cT_TFFfhmuM6z3p5Odq5dslAFKgEvT6HTQIajdF_VHTmPM14TCJG5xU0LaTyOu7wezQl2N-cMr_i3YJYk8h8D6j8jbN1PHNfJInF62lsI9UQVE" },
                            { name: "Premium Jasmine Rice 5kg", price: "$12.00", unit: "bag", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBH550H-P9P5K5b6eG8q_0K4_lR5S8Q_yK7B3-H9B0G7-M8P0-b6B1E9Y1a5I7G8aX3X5B0Q8R6V5w8k5C7G6h7l3K3M2h6_w5D0U8p5J9s1U1l9K8n3P8p1u9h2S6T7Y6N5Q1P4I9l6k7n9T1U8h8k5L0s0Z91H2Q3N91l_l4G_l1L_2A2f9C6g5e9Q1O4-B6G-_0M0G_4L_7T8W2c7B90f_A8h_i6D7b3Z2N_2e_H1x_P2D-_A9I8t3-F9L-_F7T-_x-_H_A_9W-_" },
                            { name: "Indrayani Scented Rice", price: "$3.10", unit: "kg", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEvFQB1H88fuOka7yp8h49qObv55xA1cM6DKc7JIAZgAW7orn15wB_v3qPidwWKuzWeRACovWHghmMy9z_0m6eDQ6D-wCEVAYTqGLzJYDYx5Qcz80z-dZRZBVFzrnCxBLJuZVzJaLmmYmH9BMwTgl_SP4PrtIy-cT_TFFfhmuM6z3p5Odq5dslAFKgEvT6HTQIajdF_VHTmPM14TCJG5xU0LaTyOu7wezQl2N-cMr_i3YJYk8h8D6j8jbN1PHNfJInF62lsI9UQVE" },
                            { name: "Bulk Brown Rice - Tonne", price: "$980.00", unit: "tonne", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEvFQB1H88fuOka7yp8h49qObv55xA1cM6DKc7JIAZgAW7orn15wB_v3qPidwWKuzWeRACovWHghmMy9z_0m6eDQ6D-wCEVAYTqGLzJYDYx5Qcz80z-dZRZBVFzrnCxBLJuZVzJaLmmYmH9BMwTgl_SP4PrtIy-cT_TFFfhmuM6z3p5Odq5dslAFKgEvT6HTQIajdF_VHTmPM14TCJG5xU0LaTyOu7wezQl2N-cMr_i3YJYk8h8D6j8jbN1PHNfJInF62lsI9UQVE" },
                            { name: "Organic Black Rice", price: "$8.50", unit: "kg", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEvFQB1H88fuOka7yp8h49qObv55xA1cM6DKc7JIAZgAW7orn15wB_v3qPidwWKuzWeRACovWHghmMy9z_0m6eDQ6D-wCEVAYTqGLzJYDYx5Qcz80z-dZRZBVFzrnCxBLJuZVzJaLmmYmH9BMwTgl_SP4PrtIy-cT_TFFfhmuM6z3p5Odq5dslAFKgEvT6HTQIajdF_VHTmPM14TCJG5xU0LaTyOu7wezQl2N-cMr_i3YJYk8h8D6j8jbN1PHNfJInF62lsI9UQVE" }
                        ].map((item, idx) => (
                            <ProductCard
                                key={idx}
                                name={item.name}
                                price={item.price}
                                unit={item.unit}
                                image={item.img}
                                supplier="Verified Supplier"
                                location="AfricaMart Hub"
                                rating={4.5 + (idx % 0.5)}
                                reviews={50 + idx * 20}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
