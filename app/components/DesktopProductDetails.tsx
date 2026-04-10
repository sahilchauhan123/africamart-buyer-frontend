"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, MapPin, Star, ShieldCheck, Truck, Clock, MessageSquare, Phone, Share2, Heart, ChevronRight, Info, X, Loader2, CheckCircle2, Lock, User as UserIcon, Mail, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { COUNTRY_CODES } from '@/src/constants/constanst';
import { buyerCheckNumber, buyerLogin, buyerSendOtp, buyerSubmitLead, buyerSubmitOtp } from '@/src/lib/api';

interface DesktopProductDetailsProps {
    product: {
        id: string; // Ensure id is present
        name: string;
        price: string;
        unit: string;
        image: string;
        seller_id: string; // Add seller_id
        images: string[];
        supplier?: string;
        location?: string;
        rating?: number;
        reviews?: string;
        isVerified?: boolean;
        isLocal?: boolean;
        description?: string;
        category_name?: string;
        category_slug?: string;
        parent_category_ids?: { id: string, name: string, slug: string }[];
        attributes?: string[];
        raw_attributes?: Record<string, any>;
    };
    onBack?: () => void;
}

export default function DesktopProductDetails({ product, onBack }: DesktopProductDetailsProps) {
    const router = useRouter();
    const [quantity, setQuantity] = React.useState("");
    const [showAuthModal, setShowAuthModal] = React.useState(false);
    const [authStep, setAuthStep] = React.useState<'phone' | 'login' | 'signup' | 'otp'>('phone');
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [country, setCountry] = React.useState(COUNTRY_CODES[100]); // India
    const [password, setPassword] = React.useState("");
    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [otp, setOtp] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    const [activeImage, setActiveImage] = React.useState(product.image);


    const handleLeadsUpload = async () => {
        const buyer = localStorage.getItem('buyer');
        if (!buyer) return;

        try {
            const res = await buyerSubmitLead(parseInt(product.seller_id) || 0, product.id, quantity);
            if (res.ok) {
                setSuccessMessage("Requirement submitted successfully!");
                setTimeout(() => {
                    setSuccessMessage("");
                    setShowAuthModal(false);
                }, 3000);
            } else {
                const data = await res.json();
                setError(data.message || "Failed to submit requirement.");
            }
        } catch (err) {
            setError("Something went wrong with the requirement submission.");
        }
    };

    const handleInitialRequirementSubmit = async () => {
        if (!quantity) {
            setError("Please enter quantity first.");
            return;
        }
        setError("");

        const buyer = localStorage.getItem('buyer');
        if (buyer) {
            setLoading(true);
            await handleLeadsUpload();
            setLoading(false);
        } else {
            setShowAuthModal(true);
            setAuthStep('phone');
        }
    };

    const handlePhoneCheck = async () => {
        setLoading(true);
        setError("");
        try {
            const phone_no = `${country.code} ${phoneNumber}`;
            const res = await buyerCheckNumber(phone_no);
            if (res.ok) {
                // Not exists -> Go to Signup
                setAuthStep('signup');
            } else {
                // Exists (res.status === 400) -> Go to Login
                setAuthStep('login');
            }
        } catch (err) {
            setError("Failed to check number.");
        } finally {
            setLoading(false);
        }
    };

    const handleLoginSubmit = async () => {
        setLoading(true);
        setError("");
        try {
            const phone_no = `${country.code} ${phoneNumber}`;
            const res = await buyerLogin(phone_no, password);
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('buyer', JSON.stringify(data.data.buyer));
                await handleLeadsUpload();
            } else {
                setError(data.message || "Invalid credentials.");
            }
        } catch (err) {
            setError("Login failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleSignupSubmit = async () => {
        setLoading(true);
        setError("");
        try {
            const phone_no = `${country.code} ${phoneNumber}`;
            const res = await buyerSendOtp(fullName, email, phone_no, password);
            if (res.ok) {
                setAuthStep('otp');
            } else {
                const data = await res.json();
                setError(data.message || "Failed to send OTP.");
            }
        } catch (err) {
            setError("Signup failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpVerify = async () => {
        setLoading(true);
        setError("");
        try {
            const phone_no = `${country.code} ${phoneNumber}`;
            const res = await buyerSubmitOtp(phone_no, parseInt(otp));
            if (res.ok) {
                // Auto login logic
                const loginRes = await buyerLogin(phone_no, password);
                const loginData = await loginRes.json();
                if (loginRes.ok) {
                    localStorage.setItem('buyer', JSON.stringify(loginData.data.buyer));
                    await handleLeadsUpload();
                } else {
                    router.push('/login');
                }
            } else {
                setError("Invalid OTP.");
            }
        } catch (err) {
            setError("OTP verification failed.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-slate-50 min-h-screen py-4 lg:py-6 px-3 lg:px-8 font-body">
            <div className="max-w-[1700px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch lg:items-start">

                    {/* Left Column: Image Gallery */}
                    <div className="w-full lg:w-[480px] shrink-0">
                        <button
                            onClick={onBack}
                            className="flex lg:hidden items-center gap-1 text-sm text-[#0026C0] font-bold hover:underline mb-4 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                            Back
                        </button>
                        <button
                            onClick={onBack}
                            className="hidden lg:flex items-center gap-1 text-sm text-[#0026C0] font-bold hover:underline mb-6 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                            Back to results
                        </button>

                        <div className="lg:sticky lg:top-24 flex flex-col lg:flex-row gap-4">
                            {/* Main Product Image (Top on Mobile) */}
                            <div className="flex-1 aspect-square bg-white rounded-lg p-6 lg:p-8 border border-slate-200 shadow-sm relative overflow-hidden group flex items-center justify-center order-first lg:order-last">
                                <Image
                                    src={activeImage || product.image}
                                    alt={`Main image: ${product.name}`}
                                    fill
                                    priority
                                    className="object-contain p-4 lg:p-6 scale-110 group-hover:scale-125 transition-transform duration-700"
                                />
                            </div>

                            {/* Thumbnail Strip (Horizontal on Mobile, Vertical on Desktop) */}
                            <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide order-last lg:order-first">
                                {(product.images?.length > 0 ? product.images : [product.image]).map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setActiveImage(img)}
                                        className={`w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0 rounded-lg border-2 overflow-hidden cursor-pointer transition-all ${activeImage === img ? 'border-[#0026C0]' : 'border-slate-100 hover:border-slate-300'}`}
                                    >
                                        <div className="relative w-full h-full bg-white flex items-center justify-center p-1">
                                            <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-contain opacity-80" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    <main className="flex-1 min-w-0 space-y-4 lg:space-y-6">
                        {/* Breadcrumbs */}
                        <nav className="flex flex-wrap items-center gap-y-1 gap-x-2 text-[10px] lg:text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                            <span className="hover:text-[#0026C0] cursor-pointer">AfricaMart</span>
                            {product.parent_category_ids?.map((cat) => (
                                <React.Fragment key={cat.id}>
                                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                                    <span className="hover:text-[#0026C0] cursor-pointer">{cat.name}</span>
                                </React.Fragment>
                            ))}
                            {product.category_name && (
                                <>
                                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                                    <span className="hover:text-[#0026C0] cursor-pointer">{product.category_name}</span>
                                </>
                            )}
                            <ChevronRight className="w-3 h-3 flex-shrink-0" />
                            <span className="text-slate-900 truncate max-w-[150px] lg:max-w-none">{product.name}</span>
                        </nav>

                        <h1 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex flex-wrap items-baseline gap-2 pb-4 lg:pb-6">
                            <span className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter">{product.price + " /"}</span>
                            <span className="text-base lg:text-lg font-bold text-slate-500">{product.unit[0].toUpperCase() + product.unit.slice(1)}</span>
                            <button className="text-xs lg:text-sm font-bold text-[#0026C0] hover:underline ml-2 lg:ml-4">Get Latest Price</button>
                        </div>

                        {/* Action Area (Boxed) */}
                        <div className="bg-white rounded border border-slate-200 shadow-sm p-4 lg:p-6 flex flex-col items-stretch gap-4 relative">
                            {successMessage && (
                                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center p-6 text-center animate-in fade-in duration-300">
                                    <div className="space-y-3">
                                        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                                        <p className="text-sm font-black text-slate-900 uppercase tracking-widest">{successMessage}</p>
                                    </div>
                                </div>
                            )}

                            {error && !showAuthModal && <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded text-[10px] font-black uppercase tracking-widest">{error}</div>}

                            <div className="w-full flex flex-col sm:flex-row gap-3">
                                <input
                                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded px-5 font-bold text-base outline-none focus:border-[#0026C0] transition-colors"
                                    placeholder="Enter Quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleInitialRequirementSubmit}
                                disabled={loading}
                                className="w-full h-14 bg-[#0026C0] hover:bg-[#001da2] text-white font-black rounded transition-all shadow-lg shadow-[#0026C0]/15 text-lg uppercase tracking-wider flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Requirement"}
                            </button>
                        </div>

                        {/* Specs Table */}
                        {(product.attributes?.length || product.raw_attributes) && (
                            <div className="bg-white rounded border border-slate-100 shadow-sm overflow-hidden">
                                <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100">
                                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Product Specifications</h4>
                                </div>
                                <div className="divide-y divide-slate-50">
                                    {product.attributes?.map((attr) => {
                                        const [label, ...valueParts] = attr.split(':');
                                        return (
                                            <div key={attr} className="grid grid-cols-2 px-6 py-4 hover:bg-slate-50/50 transition-colors">
                                                <span className="text-sm font-medium text-slate-400">{label}</span>
                                                <span className="text-sm font-bold text-slate-900 capitalize">{valueParts.join(':')}</span>
                                            </div>
                                        );
                                    })}
                                    {/* Fallback to raw attributes if simple attributes list is empty */}
                                    {(!product.attributes || product.attributes.length === 0) && product.raw_attributes &&
                                        Object.entries(product.raw_attributes).map(([label, value]) => (
                                            <div key={label} className="grid grid-cols-2 px-6 py-4 hover:bg-slate-50/50 transition-colors">
                                                <span className="text-sm font-medium text-slate-400">{label}</span>
                                                <span className="text-sm font-bold text-slate-900 capitalize">{String(value)}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )}

                        {product.description && (
                            <div className="max-w-none pt-4">
                                <p className="text-slate-600 leading-relaxed italic">
                                    {product.description}
                                </p>
                            </div>
                        )}
                    </main>

                    {/* Right Column: Seller/Supplier Sidebar */}
                    <aside className="w-full lg:w-[320px] shrink-0 space-y-4">
                        <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm italic">
                            <div className="flex items-center gap-1 text-[13px] text-slate-500 mb-2">
                                <MapPin className="w-4 h-4" />
                                <span>{product.location || 'Ludhiana'}</span>
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-2">{product.supplier || 'Bansal Enterprises'}</h3>

                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center gap-1.5 bg-green-500/10 text-green-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                                    <ShieldCheck className="w-3 h-3" />
                                    Verified
                                </div>
                                <span className="text-[11px] font-bold text-slate-400">2 yrs Member</span>
                            </div>

                            {/* <div className="flex items-center gap-2 mb-6">
                                <div className="flex text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3.5 h-3.5 ${i < 3 ? 'fill-current' : 'text-slate-100'}`} />
                                    ))}
                                </div>
                                <span className="text-sm font-bold text-slate-900">2.9</span>
                                <span className="text-xs text-[#0026C0] font-bold hover:underline cursor-pointer">(10)</span>
                                <div className="h-3 w-px bg-slate-200 mx-2"></div>
                                <span className="text-[10px] font-bold text-green-600 uppercase">88% Response</span>
                            </div> */}

                            <div className="space-y-3">
                                <button className="w-full h-11 rounded border border-slate-200 flex items-center justify-center gap-3 text-sm font-black text-[#0026C0] hover:bg-slate-100 transition-all">
                                    <Phone className="w-4 h-4" />
                                    Call Now
                                </button>
                                <button className="w-full h-11 rounded border border-slate-200 flex items-center justify-center gap-3 text-sm font-black text-[#0026C0] hover:bg-slate-100 transition-all">
                                    <MessageSquare className="w-5 h-5 rotate-[-5deg]" />
                                    Contact Supplier
                                </button>
                            </div>
                        </div>

                        {/* Legal/Firm Status Section */}
                        <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Legal Status</p>
                                    <p className="text-sm font-black text-slate-800">Proprietorship</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">GST Reg. Date</p>
                                    <p className="text-sm font-black text-slate-800">17-12-2020</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Annual Turnover</p>
                                    <p className="text-sm font-black text-slate-800">1.5 - 5 Cr</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Member Since</p>
                                    <p className="text-sm font-black text-slate-800">Nov 2024</p>
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>

                {/* Bottom Section: Similar Products / Recommended */}
                <div className="mt-16 pt-16 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">Recommended for You</h2>
                            <p className="text-slate-500 text-sm mt-1">Based on your recent interest in {product.name}</p>
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
                    {/* Authentication Modal Overlay */}
                    {showAuthModal && (
                        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 lg:p-12 animate-in fade-in duration-300">
                            <div className="bg-white w-full max-w-[450px] rounded-2xl shadow-2xl relative overflow-hidden flex flex-col">
                                <button
                                    onClick={() => setShowAuthModal(false)}
                                    className="absolute right-4 top-4 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
                                >
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>

                                <div className="p-8 lg:p-10 space-y-8">
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                                            {authStep === 'phone' && "Verify Your Identity"}
                                            {authStep === 'login' && `Welcome Back`}
                                            {authStep === 'signup' && "Quick Registration"}
                                            {authStep === 'otp' && "One Last Step"}
                                        </h3>
                                        <p className="text-slate-500 font-bold text-sm">
                                            {authStep === 'phone' && "To submit your requirement, please enter your mobile number."}
                                            {authStep === 'login' && "Enter your password to secure this lead."}
                                            {authStep === 'signup' && "Creating a business account for you."}
                                            {authStep === 'otp' && `Enter code sent to ${country.code} ${phoneNumber}`}
                                        </p>
                                    </div>

                                    {error && <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded text-[10px] font-black uppercase tracking-widest">{error}</div>}

                                    <div className="space-y-5">
                                        {authStep === 'phone' && (
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                                <div className="flex gap-2">
                                                    <div className="relative w-[100px] h-12">
                                                        <select
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                            value={country.code}
                                                            onChange={(e) => {
                                                                const found = COUNTRY_CODES.find(c => c.code === e.target.value);
                                                                if (found) setCountry(found);
                                                            }}
                                                        >
                                                            {COUNTRY_CODES.map((item, idx) => (
                                                                <option key={idx} value={item.code}>{item.name} ({item.code})</option>
                                                            ))}
                                                        </select>
                                                        <div className="absolute inset-0 bg-slate-50 border border-slate-200 rounded-md px-2 flex items-center justify-between pointer-events-none">
                                                            <span className="font-bold text-slate-800 text-xs">{country.flag} {country.code}</span>
                                                            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-slate-400"></div>
                                                        </div>
                                                    </div>
                                                    <input
                                                        className="flex-1 h-12 bg-slate-50 border border-slate-200 rounded-md px-4 font-black text-slate-800 focus:bg-white focus:border-[#0026C0] outline-none text-sm"
                                                        placeholder="Mobile Number"
                                                        value={phoneNumber}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {(authStep === 'login' || authStep === 'signup') && (
                                            <>
                                                {authStep === 'signup' && (
                                                    <>
                                                        <div className="space-y-1.5">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                                            <div className="relative">
                                                                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                                                <input
                                                                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-md pl-11 pr-4 font-black text-slate-800 outline-none focus:border-[#0026C0] text-sm"
                                                                    placeholder="John Doe"
                                                                    value={fullName}
                                                                    onChange={(e) => setFullName(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                                                            <div className="relative">
                                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                                                <input
                                                                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-md pl-11 pr-4 font-black text-slate-800 outline-none focus:border-[#0026C0] text-sm"
                                                                    placeholder="john@example.com"
                                                                    value={email}
                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                                <div className="space-y-1.5">
                                                    <div className="flex justify-between items-center">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                                                        {authStep === 'login' && <button className="text-[9px] font-black text-[#0026C0] uppercase tracking-widest">Forgot?</button>}
                                                    </div>
                                                    <div className="relative">
                                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                                        <input
                                                            type="password"
                                                            className="w-full h-12 bg-slate-50 border border-slate-200 rounded-md pl-11 pr-4 font-black text-slate-800 outline-none focus:border-[#0026C0] text-sm"
                                                            placeholder="········"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {authStep === 'otp' && (
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Enter OTP</label>
                                                <input
                                                    className="w-full h-14 bg-slate-50 border border-slate-200 rounded-md px-4 font-black text-center text-3xl tracking-[0.4em] text-slate-900 outline-none focus:border-[#0026C0]"
                                                    placeholder="······"
                                                    maxLength={6}
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                />
                                            </div>
                                        )}

                                        <div className="pt-4">
                                            <button
                                                onClick={() => {
                                                    if (authStep === 'phone') handlePhoneCheck();
                                                    else if (authStep === 'login') handleLoginSubmit();
                                                    else if (authStep === 'signup') handleSignupSubmit();
                                                    else if (authStep === 'otp') handleOtpVerify();
                                                }}
                                                disabled={loading}
                                                className="w-full h-14 bg-[#0026C0] text-white font-black rounded-lg shadow-xl shadow-[#0026C0]/20 flex items-center justify-center gap-3 uppercase tracking-widest text-xs disabled:opacity-50"
                                            >
                                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                                    <>
                                                        {authStep === 'phone' && "Continue"}
                                                        {authStep === 'login' && "Verify & Submit"}
                                                        {authStep === 'signup' && "Create Account"}
                                                        {authStep === 'otp' && "Complete Requirement"}
                                                        <ArrowRight className="w-4 h-4" />
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        {authStep !== 'phone' && (
                                            <button
                                                onClick={() => setAuthStep('phone')}
                                                className="w-full text-center text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
                                            >
                                                Edit Phone Number
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-6 text-center border-t border-slate-100 flex items-center justify-center gap-2">
                                    <div className="w-6 h-6 bg-[#0026C0] rounded-lg p-1">
                                        <ShieldCheck className="w-full h-full text-white" />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secure AfricaMart Verification</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
