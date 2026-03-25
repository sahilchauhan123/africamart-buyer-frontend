"use client";

import Image from 'next/image';
import { useState } from 'react';

export default function DesktopHome() {
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    const triggerAuth = (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        setShowAuthPopup(true);
    };

    return (
        <div className="min-h-screen bg-white">
            <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
                <div className="max-w-page mx-auto px-8 lg:px-12 h-20 flex items-center justify-between gap-12">
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-black text-xl italic">A</span>
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-primary">AfricaMart</span>
                    </div>
                    <div className="flex-1 max-w-2xl flex items-center gap-4">
                        <div className="relative flex-1 p-1 rounded-xl border border-slate-50 bg-slate-50/50">
                            <div className="relative">
                                <input
                                    className="w-full h-11 pl-10 pr-4 rounded-lg border-slate-200 focus:ring-primary focus:border-primary text-sm bg-white"
                                    placeholder="Search for products, suppliers, categories..."
                                    type="text"
                                    onFocus={() => triggerAuth()}
                                />
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            </div>
                        </div>
                        <div className="relative shrink-0">
                            <button className="flex items-center gap-2 px-4 h-11 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                                <span className="material-symbols-outlined text-[20px]">location_on</span>
                                Select Location
                                <span className="material-symbols-outlined text-[18px]">expand_more</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4 text-sm font-semibold">
                            <a className="text-slate-600 hover:text-primary" href="#">Login</a>
                            <span className="w-px h-4 bg-slate-200"></span>
                            <a className="text-slate-600 hover:text-primary" href="#">Sign up</a>
                        </div>
                        <button
                            onClick={triggerAuth}
                            className="bg-accent hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-orange-500/20"
                        >
                            Post Requirement
                        </button>
                    </div>
                </div>
            </header>

            <section className="relative overflow-hidden py-16 lg:py-24 flex items-center justify-center" style={{ background: 'radial-gradient(circle at center, #0026C0 0%, #00125a 100%)' }}>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
                </div>
                <div className="max-w-page mx-auto px-8 lg:px-12 relative z-10 text-center">
                    <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                        Africa's First <span className="text-orange-400">B2B Marketplace.</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-blue-100/90 mb-8 max-w-3xl mx-auto font-medium leading-relaxed">
                        Connecting you with thousands of verified manufacturers and wholesalers to scale your business across the continent with absolute clarity and trust.
                    </p>
                    <div className="max-w-4xl mx-auto bg-white p-2 lg:p-3 rounded-2xl shadow-2xl flex flex-col lg:flex-row items-stretch gap-2">
                        <div className="flex-1 flex items-center border-b lg:border-b-0 lg:border-r border-slate-100 px-4 py-2">
                            <span className="material-symbols-outlined text-slate-400 mr-3">search</span>
                            <input
                                className="w-full border-none focus:ring-0 text-slate-700 placeholder:text-slate-400 text-lg"
                                placeholder="What are you looking for?"
                                type="text"
                                onFocus={() => triggerAuth()}
                            />
                        </div>
                        <div className="shrink-0 flex items-center border-b lg:border-b-0 lg:border-r border-slate-100 px-4 py-2">
                            <span className="material-symbols-outlined text-slate-400 mr-2">category</span>
                            <select className="border-none focus:ring-0 text-slate-600 font-medium cursor-pointer bg-transparent shadow-none outline-none">
                                <option>All Categories</option>
                                <option>Industrial</option>
                                <option>Agriculture</option>
                                <option>Electronics</option>
                            </select>
                        </div>
                        <div className="shrink-0 flex items-center px-4 py-2">
                            <span className="material-symbols-outlined text-slate-400 mr-2">location_on</span>
                            <select className="border-none focus:ring-0 text-slate-600 font-medium cursor-pointer bg-transparent shadow-none outline-none">
                                <option>All Africa</option>
                                <option>Nigeria</option>
                                <option>Kenya</option>
                                <option>Ghana</option>
                                <option>South Africa</option>
                            </select>
                        </div>
                        <button
                            onClick={triggerAuth}
                            className="bg-accent hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-orange-500/20 shrink-0 flex items-center justify-center gap-2"
                        >
                            <span>Search</span>
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm font-semibold">
                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-green-400 text-lg">check_circle</span> 100% Verified Suppliers</span>
                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-green-400 text-lg">check_circle</span> Secure Trade Assurance</span>
                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-green-400 text-lg">check_circle</span> Global Logistics Support</span>
                    </div>
                </div>
            </section>

            <section className="py-8 bg-white">
                <div className="max-w-page mx-auto px-8 lg:px-12">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900">Explore by Category</h2>
                            <p className="text-slate-500 mt-2 text-lg">Find exactly what your business needs from specialized sectors</p>
                        </div>
                        <a
                            onClick={triggerAuth}
                            className="text-primary font-bold hover:underline flex items-center gap-2 text-lg cursor-pointer"
                            href="#"
                        >
                            View All Categories <span className="material-symbols-outlined">arrow_right_alt</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        <div
                            onClick={() => triggerAuth()}
                            className="group border border-slate-100 bg-slate-50 p-5 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[28px]">precision_manufacturing</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Industrial Machinery</h3>
                            <p className="text-slate-500 text-sm">Pumps, generators, heavy tools</p>
                        </div>
                        <div
                            onClick={() => triggerAuth()}
                            className="group border border-slate-100 bg-slate-50 p-5 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[28px]">devices</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Electronics</h3>
                            <p className="text-slate-500 text-sm">Computers, phones, specialized parts</p>
                        </div>
                        <div
                            onClick={() => triggerAuth()}
                            className="group border border-slate-100 bg-slate-50 p-5 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[28px]">foundation</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Building & Construction</h3>
                            <p className="text-slate-500 text-sm">Steel, cement, architectural finishing</p>
                        </div>
                        <div
                            onClick={() => triggerAuth()}
                            className="group border border-slate-100 bg-slate-50 p-5 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[28px]">checkroom</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Apparel</h3>
                            <p className="text-slate-500 text-sm">Fabrics, uniforms, protective footwear</p>
                        </div>
                        <div
                            onClick={() => triggerAuth()}
                            className="group border border-slate-100 bg-slate-50 p-5 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[28px]">restaurant</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Food & Agriculture</h3>
                            <p className="text-slate-500 text-sm">Grains, bulk produce, processed oils</p>
                        </div>
                        <div
                            onClick={() => triggerAuth()}
                            className="group border border-slate-100 bg-slate-50 p-5 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[28px]">science</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Chemicals</h3>
                            <p className="text-slate-500 text-sm">Fertilizers, industrial raw materials</p>
                        </div>
                        <div
                            onClick={() => triggerAuth()}
                            className="group border border-slate-100 bg-slate-50 p-5 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[28px]">package_2</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Packaging</h3>
                            <p className="text-slate-500 text-sm">Boxes, bottles, wholesale plastics</p>
                        </div>
                        <div
                            onClick={() => triggerAuth()}
                            className="group border border-slate-100 bg-slate-50 p-5 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[28px]">directions_car</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Automobile Parts</h3>
                            <p className="text-slate-500 text-sm">Tyres, engines, precision components</p>
                        </div>
                        <div
                            onClick={() => triggerAuth()}
                            className="group border border-slate-100 bg-slate-50 p-5 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[28px]">health_and_safety</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Health & Beauty</h3>
                            <p className="text-slate-500 text-sm">Cosmetics, medical equipment, skincare</p>
                        </div>
                        <div
                            onClick={() => triggerAuth()}
                            className="group border border-slate-100 bg-slate-50 p-5 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[28px]">chair</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">Home & Furniture</h3>
                            <p className="text-slate-500 text-sm">Office furniture, decor, wholesale timber</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8 bg-slate-50">
                <div className="max-w-page mx-auto px-8 lg:px-12">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-900 mb-6">Sourcing Made Simple</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg">Three easy steps to find the most competitive quotes and reliable suppliers for your business requirements.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                        <div className="text-center group">
                            <div className="w-24 h-24 bg-blue-50 text-primary rounded-3xl flex items-center justify-center mx-auto mb-10 relative z-10 transition-transform group-hover:-translate-y-2">
                                <span className="material-symbols-outlined text-[48px]">post_add</span>
                                <div className="absolute -top-3 -right-3 w-10 h-10 bg-white border-2 border-primary rounded-full flex items-center justify-center font-bold text-lg">1</div>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Post Requirement</h3>
                            <p className="text-slate-500 leading-relaxed px-6 text-lg">Tell us what you need. Provide specifications, quantities, and delivery timelines for a tailored response.</p>
                        </div>
                        <div className="text-center group">
                            <div className="w-24 h-24 bg-blue-50 text-primary rounded-3xl flex items-center justify-center mx-auto mb-10 relative z-10 transition-transform group-hover:-translate-y-2">
                                <span className="material-symbols-outlined text-[48px]">request_quote</span>
                                <div className="absolute -top-3 -right-3 w-10 h-10 bg-white border-2 border-primary rounded-full flex items-center justify-center font-bold text-lg">2</div>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Get Quotes</h3>
                            <p className="text-slate-500 leading-relaxed px-6 text-lg">Receive multiple competitive quotes from verified suppliers. Compare pricing, quality, and shipping options.</p>
                        </div>
                        <div className="text-center group">
                            <div className="w-24 h-24 bg-blue-50 text-primary rounded-3xl flex items-center justify-center mx-auto mb-10 relative z-10 transition-transform group-hover:-translate-y-2">
                                <span className="material-symbols-outlined text-[48px]">handshake</span>
                                <div className="absolute -top-3 -right-3 w-10 h-10 bg-white border-2 border-primary rounded-full flex items-center justify-center font-bold text-lg">3</div>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Connect & Buy</h3>
                            <p className="text-slate-500 leading-relaxed px-6 text-lg">Directly negotiate with suppliers, verify their credentials, and finalize your purchase order with confidence.</p>
                        </div>
                        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-100 -z-0"></div>
                    </div>

                    <div className="mt-28 bg-primary rounded-[2.5rem] p-12 lg:p-20 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                            <div className="text-center lg:text-left">
                                <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">Ready to grow your business?</h2>
                                <p className="text-blue-100 text-xl max-w-xl">Start sourcing from the most reliable, verified suppliers across the African continent today.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-6 shrink-0">
                                <button
                                    onClick={triggerAuth}
                                    className="bg-white text-primary px-10 py-5 rounded-2xl font-bold text-xl hover:bg-blue-50 transition-colors shadow-xl"
                                >
                                    Post Requirement Now
                                </button>
                                <button
                                    onClick={triggerAuth}
                                    className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-colors"
                                >
                                    Register as Buyer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-page mx-auto px-8 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative h-64 rounded-[2rem] overflow-hidden group cursor-pointer shadow-xl transition-all hover:scale-[1.01]">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/40 z-10"></div>
                            <div className="absolute inset-0">
                                <Image
                                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000"
                                    alt="Logistics"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute inset-0 z-20 p-10 flex flex-col justify-center">
                                <span className="bg-accent text-white px-4 py-1 rounded-full text-xs font-bold w-fit mb-4 uppercase tracking-wider">New Service</span>
                                <h3 className="text-3xl font-extrabold text-white mb-2 italic">Global Logistics</h3>
                                <p className="text-blue-100 max-w-xs font-medium">Ship your goods across Africa with our verified logistics partners.</p>
                                <div className="mt-6 flex items-center gap-2 text-white font-bold group/btn">
                                    Learn More <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-64 rounded-[2rem] overflow-hidden group cursor-pointer shadow-xl transition-all hover:scale-[1.01]">
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-800/40 z-10"></div>
                            <div className="absolute inset-0">
                                <Image
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000"
                                    alt="Trade Finance"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute inset-0 z-20 p-10 flex flex-col justify-center">
                                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold w-fit mb-4 uppercase tracking-wider">Featured</span>
                                <h3 className="text-3xl font-extrabold text-white mb-2 italic">Trade Finance</h3>
                                <p className="text-slate-100 max-w-xs font-medium">Access flexible credit solutions and secure digital payment terms.</p>
                                <div className="mt-6 flex items-center gap-2 text-white font-bold group/btn">
                                    Get Started <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-slate-900 py-20 text-slate-400">
                <div className="max-w-page mx-auto px-8 lg:px-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                        <div>
                            <h4 className="text-white font-bold mb-8 text-lg">About AfricaMart</h4>
                            <ul className="space-y-5 text-base">
                                <li><a className="hover:text-white transition-colors" href="#">Our Story</a></li>
                                <li><a className="hover:text-white transition-colors" href="#">How it works</a></li>
                                <li><a className="hover:text-white transition-colors" href="#">Verified Suppliers</a></li>
                                <li><a className="hover:text-white transition-colors" href="#">Press & Media</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-8 text-lg">Support</h4>
                            <ul className="space-y-5 text-base">
                                <li><a className="hover:text-white transition-colors" href="#">Help Center</a></li>
                                <li><a className="hover:text-white transition-colors" href="#">Trade Assurance</a></li>
                                <li><a className="hover:text-white transition-colors" href="#">Contact Us</a></li>
                                <li><a className="hover:text-white transition-colors" href="#">Report Abuse</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-8 text-lg">Trade Services</h4>
                            <ul className="space-y-5 text-base">
                                <li><a className="hover:text-white transition-colors" href="#">Logistics Services</a></li>
                                <li><a className="hover:text-white transition-colors" href="#">Inspection Services</a></li>
                                <li><a className="hover:text-white transition-colors" href="#">Sourcing Agent</a></li>
                                <li><a className="hover:text-white transition-colors" href="#">Credit Solutions</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-8 text-lg">Newsletter</h4>
                            <p className="text-base mb-6">Get the latest insights on African trade and market trends.</p>
                            <div className="flex gap-3">
                                <input className="bg-white/5 border-slate-700 rounded-lg text-sm flex-1 focus:ring-primary focus:border-primary px-4" placeholder="Your business email" type="email" />
                                <button className="bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors">Join</button>
                            </div>
                        </div>
                    </div>
                    <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 text-sm">
                        <p>© 2024 AfricaMart Marketplace. Empowering African Trade. All rights reserved.</p>
                        <div className="flex items-center gap-8">
                            <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
                            <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
                            <div className="flex items-center gap-4 ml-6">
                                <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors" href="#">
                                    <span className="material-symbols-outlined text-[20px]">share</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {showAuthPopup && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => setShowAuthPopup(false)}
                    ></div>
                    <div className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-8 lg:p-12">
                            <div className="text-center mb-10">
                                <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <span className="material-symbols-outlined text-[32px]">lock</span>
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-2">Join AfricaMart</h3>
                                <p className="text-slate-500">Log in or create an account to access verified suppliers and trade services.</p>
                            </div>

                            <div className="space-y-4">
                                <button className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                                    Continue
                                </button>
                                <button className="w-full py-4 bg-white text-slate-700 border-2 border-slate-100 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
                                    Create Free Account
                                </button>
                            </div>

                            <div className="mt-10 text-center">
                                <p className="text-sm text-slate-400">
                                    By continuing, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowAuthPopup(false)}
                            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
