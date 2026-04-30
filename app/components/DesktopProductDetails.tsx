"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, MapPin, Star, ShieldCheck, Truck, Clock, MessageSquare, Phone, Share2, Heart, ChevronRight, Info, X, Loader2, CheckCircle2, Lock, User as UserIcon, Mail, ArrowRight, Store } from 'lucide-react';
import ProductCard from './ProductCard';
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
    const [recommendations, setRecommendations] = React.useState<any[]>([]);
    const [recLoading, setRecLoading] = React.useState(false);

    React.useEffect(() => {
        if (product.id) {
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
    return (
        <div className="bg-slate-50 min-h-screen py-4 lg:py-6 px-3 lg:px-8 font-body">
            <div className="max-w-[1700px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch lg:items-start">

                    {/* Left Column: Image Gallery */}
                    <div className="w-full lg:w-[480px] shrink-0">
                        <button
                            onClick={onBack || (() => router.back())}
                            className="flex lg:hidden items-center gap-1 text-sm text-[#0026C0] font-bold hover:underline mb-4 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                            Back
                        </button>
                        <button
                            onClick={onBack || (() => router.back())}
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


                    <main className="flex-1 min-w-0 space-y-4 lg:space-y-6">
                        {/* Breadcrumbs */}
                        <nav className="flex flex-wrap items-center gap-y-1 gap-x-2 text-[10px] lg:text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                            {/* <span className="hover:text-[#0026C0] cursor-pointer" onClick={() => router.push('/')}>Lasomaa</span> */}
                            {[...(product.parent_category_ids || [])].sort((a, b) => a.position - b.position).map((cat) => (
                                <React.Fragment key={cat.id}>
                                    <span
                                        className="hover:text-[#0026C0] cursor-pointer"
                                        onClick={() => router.push(`/categories/${cat.slug}`)}
                                    >
                                        {cat.name}
                                    </span>
                                    <ChevronRight className="w-3 h-3 flex-shrink-0" />

                                </React.Fragment>
                            ))}
                            {product.category_name && (
                                <>
                                    {/* <ChevronRight className="w-3 h-3 flex-shrink-0" /> */}
                                    <span
                                        className="hover:text-[#0026C0] cursor-pointer"
                                        onClick={() => router.push(`/categories/${product.category_slug}`)}
                                    >
                                        {product.category_name}
                                    </span>
                                </>
                            )}
                            <ChevronRight className="w-3 h-3 flex-shrink-0" />
                            <span className="text-slate-900 truncate max-w-[150px] lg:max-w-none">{product.name}</span>
                        </nav>

                        <h1 className="text-xl lg:text-3xl font-black text-slate-900 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex flex-wrap items-baseline gap-2 pb-4 lg:pb-6">
                            <span className="text-2xl lg:text-4xl font-black text-slate-900 tracking-tighter">{product.price + " /"}</span>
                            <span className="text-sm lg:text-lg font-bold text-slate-500">{product.unit[0].toUpperCase() + product.unit.slice(1)}</span>
                            <button className="text-[10px] lg:text-sm font-bold text-[#0026C0] hover:underline ml-1 lg:ml-4">Get Latest Price</button>
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
                                    className="w-full h-11 lg:h-12 bg-slate-50 border border-slate-200 rounded px-4 lg:px-5 font-bold text-sm lg:text-base outline-none focus:border-[#0026C0] transition-colors"
                                    placeholder="Enter Quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleInitialRequirementSubmit}
                                disabled={loading}
                                className="w-full h-12 lg:h-14 bg-[#0026C0] hover:bg-[#001da2] text-white font-black rounded transition-all shadow-lg shadow-[#0026C0]/15 text-base lg:text-lg uppercase tracking-wider flex items-center justify-center gap-2 lg:gap-3 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-5 h-5 lg:w-6 lg:h-6 animate-spin" /> : "Submit Requirement"}
                            </button>
                        </div>

                        {/* Specs Table */}
                        {(product.attributes?.length || product.raw_attributes) && (
                            <div className="bg-white rounded border border-slate-100 shadow-sm overflow-hidden">
                                <div className="bg-slate-50/50 px-4 lg:px-6 py-3 lg:py-4 border-b border-slate-100">
                                    <h4 className="text-[10px] lg:text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Specifications</h4>
                                </div>
                                <div className="divide-y divide-slate-50">
                                    {product.attributes?.map((attr) => {
                                        const [label, ...valueParts] = attr.split(':');
                                        return (
                                            <div key={attr} className="grid grid-cols-2 px-4 lg:px-6 py-3 lg:py-4 hover:bg-slate-50/50 transition-colors">
                                                <span className="text-xs lg:text-sm font-medium text-slate-400">{label}</span>
                                                <span className="text-xs lg:text-sm font-bold text-slate-900 capitalize">{valueParts.join(':')}</span>
                                            </div>
                                        );
                                    })}
                                    {/* Fallback to raw attributes if simple attributes list is empty */}
                                    {(!product.attributes || product.attributes.length === 0) && product.raw_attributes &&
                                        Object.entries(product.raw_attributes).map(([label, value]) => (
                                            <div key={label} className="grid grid-cols-2 px-4 lg:px-6 py-3 lg:py-4 hover:bg-slate-50/50 transition-colors">
                                                <span className="text-xs lg:text-sm font-medium text-slate-400">{label}</span>
                                                <span className="text-xs lg:text-sm font-bold text-slate-900 capitalize">{String(value)}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )}

                        {product.description && (
                            <div className="bg-white rounded border border-slate-100 shadow-sm overflow-hidden">
                                <div className="bg-slate-50/50 px-4 lg:px-6 py-3 lg:py-4 border-b border-slate-100">
                                    <h4 className="text-[10px] lg:text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Description</h4>
                                </div>
                                <div className="px-4 lg:px-6 py-4 lg:py-6">
                                    <p className="text-slate-600 leading-relaxed text-sm lg:text-base">
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </main>

                    {/* Right Column: Seller/Supplier Sidebar */}
                    <aside className="w-full lg:w-[340px] shrink-0 space-y-5">
                        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm transition-all hover:shadow-md">
                            <div className="flex items-start justify-between mb-4">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black text-slate-900 leading-tight">
                                        {product.supplier || 'Supplier Name Not Available'}
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-slate-500">
                                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                        <span className="text-xs font-medium truncate max-w-[180px]">{product.seller_address || 'Address Not Found'}</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                                    <Store className="w-6 h-6 text-[#0026C0]" />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                <div className="flex items-center gap-1.5 bg-blue-50 text-[#0026C0] px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border border-blue-100">
                                    <ShieldCheck className="w-3 h-3 fill-[#0026C0] text-white" />
                                    Verified
                                </div>
                            </div>

                            {/* <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 mb-6">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-3 h-3 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                                        ))}
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">4.8 Rating</p>
                                </div>
                                <div className="space-y-1 border-l border-slate-50 pl-4">
                                    <div className="text-sm font-black text-green-600">88%</div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Response Rate</p>
                                </div>
                            </div> */}

                            <div className="space-y-3">
                                <button
                                    onClick={handleContactSupplierClick}
                                    className="w-full h-12 bg-[#0026C0] text-white rounded-lg flex items-center justify-center gap-3 text-sm font-black hover:bg-[#001da2] transition-all shadow-lg shadow-blue-600/10 active:scale-[0.98]"
                                >
                                    <MessageSquare className="w-5 h-5" />
                                    Message Supplier
                                </button>
                                <button
                                    className={`w-full h-12 rounded-lg flex items-center justify-center gap-3 text-sm font-black transition-all active:scale-[0.98] ${showPhone ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                                    onClick={handleViewPhoneClick}
                                >
                                    <Phone className={`w-4 h-4 ${showPhone ? 'fill-green-600' : ''}`} />
                                    {showPhone ? (product.seller_phone || "+234 XXX XXX XXXX") : "View Phone Number"}
                                </button>
                            </div>
                        </div>

                    </aside>

                </div>

                {/* Bottom Section: Similar Products / Recommended */}
                <div className="mt-10 lg:mt-16 pt-10 lg:pt-16 border-t border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
                        <div>
                            <h2 className="text-lg lg:text-2xl font-black text-slate-900">Recommended for You</h2>
                            <p className="text-xs lg:text-sm text-slate-500 mt-0.5 lg:mt-1">Based on your recent interest in {product.name}</p>
                        </div>
                        <button className="text-[#0026C0] font-black flex items-center gap-1 hover:underline text-[10px] lg:text-sm uppercase tracking-widest self-start sm:self-auto">
                            See More Results
                            <ChevronRight className="w-3 h-3 lg:w-4 h-4" />
                        </button>
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
                                    name={item.name}
                                    price={item.price}
                                    unit={item.unit}
                                    image={item.image}
                                    supplier={item.seller_name || "Verified Supplier"}
                                    location={item.location}
                                    rating={4.5}
                                    reviews={20}
                                    onClick={() => {
                                        const slug = item.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
                                        router.push(`/product/${item.id}/${slug}`);
                                    }}
                                />
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed border-slate-200">
                                <p className="text-slate-400 font-bold">No similar products found in this category.</p>
                            </div>
                        )}
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
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secure Lasomaa Verification</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
