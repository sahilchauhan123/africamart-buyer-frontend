"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, MapPin, Star, ShieldCheck, Truck, Clock, MessageSquare, Phone, Share2, Heart, ChevronRight, ChevronDown, Info, X, Loader2, CheckCircle2, Lock, User as UserIcon, Mail, ArrowRight, Store } from 'lucide-react';
import ProductCard from './ProductCard';
import Breadcrumbs from './Breadcrumbs';
import { COUNTRY_CODES } from '@/src/constants/constanst';
import { buyerCheckNumber, buyerLogin, buyerSendOtp, buyerSubmitLead, buyerSubmitOtp, sendChatMessage, fetchRecommendations } from '@/src/lib/api';

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
        parent_category_ids?: { id: string, name: string, slug: string, position: number }[];
        attributes?: string[];
        raw_attributes?: Record<string, any>;
        seller_address?: string;
        seller_phone?: string;
        category_id?: string;
    };
    onBack?: () => void;
    initialRecommendations?: any[];
}

export default function DesktopProductDetails({ product, onBack, initialRecommendations = [] }: DesktopProductDetailsProps) {
    const router = useRouter();
    const [quantity, setQuantity] = React.useState("");
    const [showAuthModal, setShowAuthModal] = React.useState(false);
    const [authStep, setAuthStep] = React.useState<'phone' | 'login' | 'signup' | 'otp'>('phone');
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [country, setCountry] = React.useState(COUNTRY_CODES[121]); // Liberia
    const [password, setPassword] = React.useState("");
    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [otp, setOtp] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    const [activeImage, setActiveImage] = React.useState(product.image);
    const [recommendations, setRecommendations] = React.useState<any[]>(initialRecommendations);
    const [recLoading, setRecLoading] = React.useState(false);

    React.useEffect(() => {
        // Only fetch if recommendations are empty and we have a product
        if (product.id && recommendations.length === 0) {
            setRecLoading(true);
            fetchRecommendations(product.name, product.id).then(data => {
                setRecommendations(data);
                setRecLoading(false);
            }).catch(err => {
                console.error("Error fetching recommendations:", err);
                setRecLoading(false);
            });
        }
    }, [product.id, product.name]);


    const [showPhone, setShowPhone] = React.useState(false);
    const [afterAuthAction, setAfterAuthAction] = React.useState<'lead' | 'chat' | 'phone' | null>(null);
    const [isSpecsOpen, setIsSpecsOpen] = React.useState(false);
    const [isDescriptionOpen, setIsDescriptionOpen] = React.useState(true);

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

    const handleChatInitiate = async () => {
        try {
            setLoading(true);
            const content = `Hi, I am interested in ${product.name}. Could you provide more details?`;
            const res = await sendChatMessage(parseInt(product.seller_id) || 0, content);
            if (res.ok) {
                router.push('/dashboard?tab=messages');
            } else {
                const data = await res.json();
                setError(data.message || "Failed to start chat.");
            }
        } catch (err) {
            setError("Something went wrong while starting the chat.");
        } finally {
            setLoading(false);
        }
    };

    const onAuthSuccess = async () => {
        if (afterAuthAction === 'lead') {
            await handleLeadsUpload();
        } else if (afterAuthAction === 'chat') {
            await handleChatInitiate();
        } else if (afterAuthAction === 'phone') {
            setShowPhone(true);
        }
        setShowAuthModal(false);
    }

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
            setAfterAuthAction('lead');
            setShowAuthModal(true);
            setAuthStep('phone');
        }
    };

    const handleContactSupplierClick = async () => {
        const buyer = localStorage.getItem('buyer');
        if (buyer) {
            await handleChatInitiate();
        } else {
            setAfterAuthAction('chat');
            setShowAuthModal(true);
            setAuthStep('phone');
        }
    };

    const handleViewPhoneClick = () => {
        const buyer = localStorage.getItem('buyer');
        if (buyer) {
            setShowPhone(true);
        } else {
            setAfterAuthAction('phone');
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
                await onAuthSuccess();
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
                    await onAuthSuccess();
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

    // Build breadcrumb items
    const breadcrumbItems = [];
    
    // Add "All Categories" for consistency
    breadcrumbItems.push({
        label: "All Categories",
        href: "/categories"
    });

    // Add parent categories
    if (product.parent_category_ids && product.parent_category_ids.length > 0) {
        [...product.parent_category_ids]
            .sort((a, b) => a.position - b.position)
            .forEach(cat => {
                breadcrumbItems.push({
                    label: cat.name,
                    href: `/categories/${cat.slug}`
                });
            });
    }

    // Add current category if not already in parents
    if (product.category_name && product.category_slug) {
        const isAlreadyAdded = breadcrumbItems.some(item => item.label === product.category_name);
        if (!isAlreadyAdded) {
            breadcrumbItems.push({
                label: product.category_name,
                href: `/categories/${product.category_slug}`
            });
        }
    }

    // Add current product
    breadcrumbItems.push({
        label: product.name
    });

    return (
        <div className="bg-slate-50 min-h-screen py-6 lg:py-8 px-4 lg:px-8 font-body">
            <div className="max-w-[1700px] mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-2 lg:mb-4 gap-4">
                    <Breadcrumbs items={breadcrumbItems} />
                    
                    <button
                        onClick={onBack || (() => router.back())}
                        className="hidden lg:flex items-center gap-1.5 text-[10px] text-slate-400 font-black hover:text-[#0026C0] transition-colors uppercase tracking-widest group border border-slate-200 px-3 py-1.5 rounded-full hover:border-[#0026C0]/20 hover:bg-white"
                    >
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                        Back to results
                    </button>
                </div>

                <button
                    onClick={onBack || (() => router.back())}
                    className="flex lg:hidden items-center gap-1 text-[10px] text-[#0026C0] font-black uppercase tracking-widest hover:underline mb-4 group"
                >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    Back
                </button>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch lg:items-start">
                    {/* Left Column: Image Gallery */}
                    <div className="w-full lg:w-[480px] shrink-0">
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
                            {product.images && product.images.length > 1 && (
                                <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide order-last lg:order-first">
                                    {product.images.map((img, idx) => (
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
                            )}
                        </div>
                    </div>


                    <div className="flex-1 min-w-0 space-y-6">
                        <main className="space-y-2">

                            <h1 className="text-xl lg:text-4xl font-black text-slate-900 leading-tight">
                                {product.name}
                            </h1>

                            <div className="flex flex-wrap items-baseline gap-2 pb-1">
                                <span className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter">{product.price + " /"}</span>
                                <span className="text-sm lg:text-lg font-bold text-slate-500">{product.unit[0].toUpperCase() + product.unit.slice(1)}</span>
                                <button className="text-[10px] lg:text-sm font-bold text-[#0026C0] hover:underline ml-1 lg:ml-4">Get Latest Price</button>
                            </div>
                        </main>

                        {/* Seller/Supplier Information */}
                        <div className="bg-white rounded-xl p-4 lg:p-6 border border-slate-200 shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black text-slate-900 leading-tight">
                                        {product.supplier || 'Supplier Name Not Available'}
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-slate-500">
                                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                                        <span className="text-xs font-medium truncate text-slate-500">{product.seller_address || 'Address Not Found'}</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                                    <Store className="w-6 h-6 text-[#0026C0]" />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                <div className="flex items-center gap-1.5 bg-blue-50 text-[#0026C0] px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border border-blue-100">
                                    <ShieldCheck className="w-3 h-3 fill-[#0026C0] text-white" />
                                    Verified Business
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 lg:gap-3">
                                <button
                                    onClick={handleContactSupplierClick}
                                    className="flex-1 h-11 lg:h-14 bg-[#0026C0]/90 text-white rounded-lg flex items-center justify-center gap-2 lg:gap-3 px-2 lg:px-4 text-[10px] lg:text-sm font-black hover:bg-[#0026C0] transition-all active:scale-[0.98] uppercase tracking-wider"
                                >
                                    <MessageSquare className="w-4 h-4 lg:w-5 h-5" />
                                    <span className="hidden sm:inline">Message Business</span>
                                    <span className="sm:hidden">Message</span>
                                </button>
                                <button
                                    className={`flex-1 h-11 lg:h-14 rounded-lg flex items-center justify-center gap-2 lg:gap-3 px-2 lg:px-4 text-[10px] lg:text-sm font-black transition-all active:scale-[0.98] uppercase tracking-wider ${showPhone ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                                    onClick={handleViewPhoneClick}
                                >
                                    <Phone className={`w-3.5 h-3.5 lg:w-4 h-4 ${showPhone ? 'fill-green-600' : ''}`} />
                                    <span className="hidden sm:inline">{showPhone ? (product.seller_phone || "+234 XXX XXX XXXX") : "View Phone Number"}</span>
                                    <span className="sm:hidden">{showPhone ? (product.seller_phone || "Call") : "Call Now"}</span>
                                </button>
                            </div>
                        </div>

                        {/* Action Area (Boxed) */}
                        <div className="bg-white rounded border border-slate-200 shadow-sm p-4 lg:p-6 flex flex-col items-stretch gap-4 relative">
                            {successMessage && (
                                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center p-6 text-center animate-in fade-in duration-300">
                                    <div className="space-y-3">
                                        <CheckCircle2 className="w-10 h-10 lg:w-12 lg:h-12 text-green-500 mx-auto" />
                                        <p className="text-xs lg:text-sm font-black text-slate-900 uppercase tracking-widest">{successMessage}</p>
                                    </div>
                                </div>
                            )}

                            {error && !showAuthModal && <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded text-[9px] lg:text-[10px] font-black uppercase tracking-widest">{error}</div>}

                            <div className="w-full flex flex-col sm:flex-row gap-3">
                                <input
                                    className="w-full h-11 lg:h-14 bg-slate-50 border border-slate-200 rounded px-4 lg:px-5 font-bold text-sm lg:text-lg outline-none focus:border-[#0026C0] transition-colors"
                                    placeholder="Enter Quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleInitialRequirementSubmit}
                                disabled={loading}
                                className="w-full h-12 lg:h-14 bg-[#0026C0]/90 hover:bg-[#0026C0] text-white font-black rounded transition-all text-base lg:text-lg tracking-wider flex items-center justify-center gap-2 lg:gap-3 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-5 h-5 lg:w-6 lg:h-6 animate-spin" /> : "Submit Requirement"}
                            </button>
                        </div>

                        {/* Specs Table */}
                        {(Array.isArray(product.attributes) && product.attributes.length > 0 || (product.raw_attributes && Object.keys(product.raw_attributes).length > 0)) && (
                            <div className="bg-white rounded border border-slate-100 shadow-sm overflow-hidden transition-all duration-300">
                                <button 
                                    onClick={() => setIsSpecsOpen(!isSpecsOpen)}
                                    className="w-full bg-slate-50/50 px-4 lg:px-6 py-3 lg:py-4 border-b border-slate-100 flex items-center justify-between hover:bg-slate-100/50 transition-colors"
                                >
                                    <h4 className="text-[10px] lg:text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Specifications</h4>
                                    <ChevronDown className={`w-5 h-5 text-slate-900 transition-transform duration-300 ${isSpecsOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`divide-y divide-slate-50 transition-all duration-300 ${isSpecsOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                                    {Array.isArray(product.attributes) && product.attributes.map((attr) => {
                                        const [label, ...valueParts] = attr.split(':');
                                        return (
                                            <div key={attr} className="grid grid-cols-2 px-4 lg:px-6 py-3 lg:py-4 hover:bg-slate-50/50 transition-colors">
                                                <span className="text-xs lg:text-sm font-medium text-slate-400">{label}</span>
                                                <span className="text-xs lg:text-sm font-bold text-slate-900 capitalize">{valueParts.join(':')}</span>
                                            </div>
                                        );
                                    })}
                                    {product.raw_attributes && Object.entries(product.raw_attributes).map(([label, value]) => (
                                        <div key={label} className="grid grid-cols-2 px-4 lg:px-6 py-3 lg:py-4 hover:bg-slate-50/50 transition-colors">
                                            <span className="text-xs lg:text-sm font-medium text-slate-400">{label}</span>
                                            <span className="text-xs lg:text-sm font-bold text-slate-900 capitalize">
                                                {Array.isArray(value) ? value.join(', ') : String(value)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {product.description && (
                            <div className="bg-white rounded border border-slate-100 shadow-sm overflow-hidden transition-all duration-300">
                                <button 
                                    onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                                    className="w-full bg-slate-50/50 px-4 lg:px-6 py-3 lg:py-4 border-b border-slate-100 flex items-center justify-between hover:bg-slate-100/50 transition-colors"
                                >
                                    <h4 className="text-[10px] lg:text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Description</h4>
                                    <ChevronDown className={`w-5 h-5 text-slate-900 transition-transform duration-300 ${isDescriptionOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`px-4 lg:px-6 transition-all duration-300 ${isDescriptionOpen ? 'py-4 lg:py-6 max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 py-0 pointer-events-none'}`}>
                                    <p className="text-slate-600 leading-relaxed text-sm lg:text-base">
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* Bottom Section: Similar Products / Recommended */}
                <div className="mt-10 lg:mt-16 pt-10 lg:pt-16 border-t border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
                        <div>
                            <h2 className="text-lg lg:text-2xl font-black text-slate-900">Other Goods You May Like</h2>
                            <p className="text-xs lg:text-sm text-slate-500 mt-0.5 lg:mt-1">Based on your recent interest in {product.name}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                        {recLoading ? (
                            Array(6).fill(0).map((_, i) => (
                                <div key={i} className="aspect-[4/5] bg-white rounded-lg border border-slate-100 animate-pulse flex flex-col p-4 gap-4">
                                    <div className="aspect-square bg-slate-50 rounded" />
                                    <div className="h-4 bg-slate-50 w-3/4 rounded" />
                                    <div className="h-4 bg-slate-50 w-1/2 rounded" />
                                </div>
                            ))
                        ) : recommendations.length > 0 ? (
                            recommendations.map((item, idx) => (
                                <ProductCard
                                    key={item.id || idx}
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                    unit={item.unit}
                                    image={item.image}
                                    supplier={item.seller_name || "Verified Supplier"}
                                    location={item.location}
                                    rating={4.5}
                                    reviews={20}
                                />
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed border-slate-200">
                                <p className="text-slate-400 font-bold">No similar products found in this category.</p>
                            </div>
                        )}
                    </div>
                </div>
                {/* Authentication Modal Overlay */}
                {showAuthModal && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
                        {/* Backdrop */}
                        <div className="absolute inset-0" onClick={() => setShowAuthModal(false)}></div>

                        {/* Modal Card */}
                        <div className="bg-white w-full max-w-[400px] rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                            <button
                                onClick={() => setShowAuthModal(false)}
                                className="absolute right-6 top-5 p-2 text-slate-300 hover:text-slate-900 transition-colors z-20"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-6 lg:p-8 pt-8">
                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight">
                                            {authStep === 'phone' && "Lasomaa Verification"}
                                            {authStep === 'login' && `Welcome Back`}
                                            {authStep === 'signup' && "Create Account"}
                                            {authStep === 'otp' && "Verify OTP"}
                                        </h3>
                                        <p className="text-slate-500 font-bold text-[11px] leading-relaxed">
                                            {authStep === 'phone' && "To reach business, please enter your mobile number."}
                                            {authStep === 'login' && "Enter your password to secure this lead."}
                                            {authStep === 'signup' && "Please create your buyer account."}
                                            {authStep === 'otp' && `Enter code sent to ${country.code} ${phoneNumber}`}
                                        </p>
                                    </div>

                                    {error && <div className="p-2.5 bg-red-50 border border-red-100 text-red-600 rounded-xl text-[9px] font-black uppercase tracking-widest">{error}</div>}

                                    <div className="space-y-3.5">
                                        {authStep === 'phone' && (
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                                <div className="flex gap-2">
                                                    <div className="relative w-[85px] h-11">
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
                                                        <div className="absolute inset-0 bg-slate-50 border border-slate-200 rounded-xl px-2.5 flex items-center justify-between pointer-events-none">
                                                            <span className="font-bold text-slate-800 text-[11px]">{country.flag} {country.code}</span>
                                                            <ChevronDown className="w-3 h-3 text-slate-400" />
                                                        </div>
                                                    </div>
                                                    <input
                                                        className="flex-1 h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 font-black text-slate-800 focus:bg-white focus:border-[#0026C0] outline-none text-xs"
                                                        placeholder="Mobile Number"
                                                        value={phoneNumber}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                    />
                                                </div>
                                                <p className="mt-2 text-[9px] font-bold text-slate-400 flex items-center gap-1.5 ml-1">
                                                    <span className="w-3.5 h-3.5 bg-green-50 rounded-full flex items-center justify-center">
                                                        <svg className="w-2 h-2 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                                        </svg>
                                                    </span>
                                                    Use your active Whatsapp. OTP will be sent for verification.
                                                </p>
                                            </div>
                                        )}

                                        {(authStep === 'login' || authStep === 'signup') && (
                                            <>
                                                {authStep === 'signup' && (
                                                    <>
                                                        <div className="space-y-1">
                                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                                            <div className="relative">
                                                                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                                                                <input
                                                                    className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 font-black text-slate-800 outline-none focus:border-[#0026C0] text-xs"
                                                                    placeholder="John Doe"
                                                                    value={fullName}
                                                                    onChange={(e) => setFullName(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                                                            <div className="relative">
                                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                                                                <input
                                                                    className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 font-black text-slate-800 outline-none focus:border-[#0026C0] text-xs"
                                                                    placeholder="john@example.com"
                                                                    value={email}
                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                                <div className="space-y-1">
                                                    <div className="flex justify-between items-center">
                                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                                                        {authStep === 'login' && <button className="text-[8px] font-black text-[#0026C0] uppercase tracking-widest">Forgot?</button>}
                                                    </div>
                                                    <div className="relative">
                                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                                                        <input
                                                            type="password"
                                                            className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 font-black text-slate-800 outline-none focus:border-[#0026C0] text-xs"
                                                            placeholder="········"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {authStep === 'otp' && (
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Enter OTP</label>
                                                <input
                                                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 font-black text-center text-2xl tracking-[0.4em] text-slate-900 outline-none focus:border-[#0026C0]"
                                                    placeholder="······"
                                                    maxLength={6}
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                />
                                            </div>
                                        )}

                                        <div className="pt-1.5">
                                            <button
                                                onClick={() => {
                                                    if (authStep === 'phone') handlePhoneCheck();
                                                    else if (authStep === 'login') handleLoginSubmit();
                                                    else if (authStep === 'signup') handleSignupSubmit();
                                                    else if (authStep === 'otp') handleOtpVerify();
                                                }}
                                                disabled={loading}
                                                className="w-full h-11 bg-[#0026C0] text-white font-black rounded-xl shadow-md shadow-[#0026C0]/10 flex items-center justify-center gap-2.5 uppercase tracking-widest text-[10px] disabled:opacity-50 active:scale-[0.98] transition-all"
                                            >
                                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                                    <>
                                                        {authStep === 'phone' && "Continue"}
                                                        {authStep === 'login' && "Login"}
                                                        {authStep === 'signup' && "Create Account"}
                                                        {authStep === 'otp' && "Verify & Submit"}
                                                        <ArrowRight className="w-3.5 h-3.5" />
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        {authStep !== 'phone' && (
                                            <button
                                                onClick={() => setAuthStep('phone')}
                                                className="w-full text-center text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-[#0026C0] transition-colors"
                                            >
                                                Change Number
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50 px-6 py-4 text-center border-t border-slate-100 flex items-center justify-center gap-2.5">
                                <div className="w-5 h-5 bg-[#0026C0] rounded-md p-1 flex items-center justify-center">
                                    <ShieldCheck className="w-full h-full text-white" />
                                </div>
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Lasomaa Quick Check</span>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    </div>
    );
}

