"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, HelpCircle, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface SignUpPageProps {
    onBack: () => void;
    onLogin: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onBack, onLogin }) => {
    const [step, setStep] = useState(1);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            onBack();
        }
    };

    const nextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        }
    };

    return (
        <div className="bg-white min-h-screen flex flex-col font-body antialiased">
            {/* TopAppBar */}
            <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md">
                <div className="flex items-center justify-between px-6 h-16 w-full max-w-xl mx-auto">
                    <button onClick={handleBack} className="text-brand-blue p-2 -ml-2 active:scale-90 transition-all">
                        <ArrowLeft size={24} />
                    </button>
                    <div className="flex flex-col items-center">
                        <span className="text-brand-blue font-black tracking-tight uppercase text-xs">AfricaMart</span>
                        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">Step {step} of 3</span>
                    </div>
                    <button className="text-brand-blue p-2 -mr-2 active:scale-90 transition-all">
                        <HelpCircle size={22} />
                    </button>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-1 bg-slate-100">
                    <div
                        className="h-full bg-brand-blue transition-all duration-500"
                        style={{ width: `${(step / 3) * 100}%` }}
                    ></div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow pt-20 pb-8 px-6 w-full max-w-xl mx-auto">
                {step === 1 && (
                    <div className="animate-in slide-in-from-right duration-500">
                        <section className="mb-6">
                            <h1 className="text-brand-blue font-black text-xl sm:text-2xl tracking-tight mb-1">
                                Create your account
                            </h1>
                            <p className="text-slate-500 text-sm sm:text-base font-medium">
                                Join our business sourcing network.
                            </p>
                        </section>

                        <div className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-xs sm:text-sm font-black text-brand-blue tracking-wide ml-1">Full Name</label>
                                <input className="w-full h-12 sm:h-14 px-5 bg-slate-50 border-2 border-slate-200 focus:border-brand-blue/40 focus:bg-white rounded-2xl transition-all placeholder:text-slate-400 text-slate-900 font-bold outline-none text-sm" placeholder="Enter your name" type="text" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs sm:text-sm font-black text-brand-blue tracking-wide ml-1">Email or WhatsApp Number</label>
                                <input className="w-full h-12 sm:h-14 px-5 bg-slate-50 border-2 border-slate-200 focus:border-brand-blue/40 focus:bg-white rounded-2xl transition-all placeholder:text-slate-400 text-slate-900 font-bold outline-none text-sm" placeholder="name@company.com or +231..." type="text" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs sm:text-sm font-black text-brand-blue tracking-wide ml-1">Password</label>
                                <div className="relative flex items-center">
                                    <input className="w-full h-12 sm:h-14 pl-5 pr-14 bg-slate-50 border-2 border-slate-200 focus:border-brand-blue/40 focus:bg-white rounded-2xl transition-all placeholder:text-slate-400 text-slate-900 font-bold outline-none text-sm" placeholder="Min. 8 characters" type={showPassword ? "text" : "password"} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 p-2 text-slate-400"><Eye size={20} /></button>
                                </div>
                            </div>
                            <div className="pt-2 sm:pt-4">
                                <button onClick={nextStep} className="w-full h-12 sm:h-14 bg-brand-blue text-white font-black rounded-2xl shadow-xl shadow-brand-blue/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 tracking-widest uppercase text-xs">
                                    Continue
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in slide-in-from-right duration-500">
                        <section className="mb-6">
                            <h1 className="text-brand-blue font-black text-xl sm:text-2xl tracking-tight mb-1">
                                Business Location
                            </h1>
                            <p className="text-slate-500 text-sm sm:text-base font-medium">
                                Where should suppliers contact you?
                            </p>
                        </section>

                        <div className="space-y-5">
                            {/* City */}
                            <div className="space-y-1.5">
                                <label className="text-xs sm:text-sm font-black text-brand-blue tracking-wide ml-1">City / Township</label>
                                <input className="w-full h-12 sm:h-14 px-5 bg-slate-50 border-2 border-slate-200 focus:border-brand-blue/40 focus:bg-white rounded-2xl transition-all placeholder:text-slate-400 text-slate-900 font-bold outline-none text-sm" placeholder="e.g. Monrovia" type="text" />
                            </div>

                            {/* County */}
                            <div className="space-y-1.5">
                                <label className="text-xs sm:text-sm font-black text-brand-blue tracking-wide ml-1">County</label>
                                <select className="w-full h-12 sm:h-14 px-5 bg-slate-50 border-2 border-slate-200 focus:border-brand-blue/40 focus:bg-white rounded-2xl transition-all text-slate-900 font-bold outline-none appearance-none text-sm">
                                    <option>Montserrado</option>
                                    <option>Nimba</option>
                                    <option>Lofa</option>
                                    <option>Bong</option>
                                    <option>Grand Bassa</option>
                                    <option>Margibi</option>
                                    <option>Maryland</option>
                                </select>
                            </div>

                            {/* Business Address */}
                            <div className="space-y-1.5">
                                <label className="text-xs sm:text-sm font-black text-brand-blue tracking-wide ml-1">Business Address</label>
                                <input className="w-full h-12 sm:h-14 px-5 bg-slate-50 border-2 border-slate-200 focus:border-brand-blue/40 focus:bg-white rounded-2xl transition-all placeholder:text-slate-400 text-slate-900 font-bold outline-none text-sm" placeholder="e.g. Broad Street, Monrovia" type="text" />
                            </div>

                            <div className="pt-2 sm:pt-4">
                                <button onClick={nextStep} className="w-full h-12 sm:h-14 bg-brand-blue text-white font-black rounded-2xl shadow-xl shadow-brand-blue/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 tracking-widest uppercase text-xs">
                                    Continue
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-in slide-in-from-right duration-500 pb-8">
                        <section className="mb-6">
                            <h1 className="text-brand-blue font-black text-xl sm:text-2xl tracking-tight mb-1">
                                Your Interests
                            </h1>
                            <p className="text-slate-500 text-sm sm:text-base font-medium">
                                Select categories of goods you are interested in.
                            </p>
                        </section>

                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-2">
                            {[
                                { id: 'machinery', label: 'Machinery', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=200' },
                                { id: 'grains', label: 'Food', img: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&q=80&w=200' },
                                { id: 'construction', label: 'Building', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=200' },
                                { id: 'apparel', label: 'Apparel', img: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=200' },
                                { id: 'electronics', label: 'Electronics', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=200' },
                                { id: 'medical', label: 'Medical', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200' },
                                { id: 'energy', label: 'Energy', img: 'https://images.unsplash.com/photo-1509391366360-1e97d5259d81?auto=format&fit=crop&q=80&w=200' },
                                { id: 'chemicals', label: 'Chemicals', img: 'https://images.unsplash.com/photo-1532187875605-1ef6ca2380de?auto=format&fit=crop&q=80&w=200' },
                                { id: 'agriculture', label: 'Agri', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=200' },
                                { id: 'hardware', label: 'Hardware', img: 'https://images.unsplash.com/photo-1581147036324-c1784ca13bb7?auto=format&fit=crop&q=80&w=200' },
                                { id: 'textiles', label: 'Textiles', img: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?auto=format&fit=crop&q=80&w=200' },
                                { id: 'logistics', label: 'Logistics', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=200' },
                            ].map((topic) => (
                                <button
                                    key={topic.id}
                                    onClick={() => {
                                        if (selectedInterests.includes(topic.id)) {
                                            setSelectedInterests(selectedInterests.filter(id => id !== topic.id));
                                        } else {
                                            setSelectedInterests([...selectedInterests, topic.id]);
                                        }
                                    }}
                                    className={`flex flex-col items-center justify-center py-2 sm:py-4 px-1 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${selectedInterests.includes(topic.id)
                                        ? 'bg-slate-900 border-slate-900 text-white scale-[1.02]'
                                        : 'bg-slate-100/50 border-slate-200 text-slate-900'
                                        }`}
                                >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mb-1.5 sm:mb-2 border border-white/50 shadow-sm relative">
                                        <img
                                            src={topic.img}
                                            alt={topic.label}
                                            className="w-full h-full object-cover"
                                        />
                                        {selectedInterests.includes(topic.id) && (
                                            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]"></div>
                                        )}
                                    </div>
                                    <span className="text-[9px] sm:text-[10px] font-black text-center leading-tight h-5 flex items-center">{topic.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 sm:mt-16">
                            <button
                                onClick={() => {
                                    setIsSuccessOpen(true);
                                }}
                                className="w-full h-12 sm:h-14 bg-brand-blue text-white font-black rounded-2xl shadow-xl shadow-brand-blue/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 tracking-widest uppercase text-xs"
                            >
                                Complete Sign Up
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Minimal Footer */}
                {step === 1 && (
                    <footer className="mt-6 text-center pb-4 border-t border-slate-50 pt-4">
                        <p className="text-slate-400 font-medium text-sm">
                            Already have an account?
                            <button
                                onClick={onLogin}
                                className="text-brand-blue font-black hover:underline ml-1 uppercase tracking-widest text-xs"
                            >
                                Log In
                            </button>
                        </p>
                    </footer>
                )}
            </main>

            {/* Success Overlay */}
            {isSuccessOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500"></div>

                    {/* Modal */}
                    <div className="relative w-full max-w-sm bg-white rounded-[32px] p-8 text-center shadow-2xl animate-in zoom-in-95 duration-500 border border-slate-100">
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200">
                                <span className="material-symbols-outlined text-white text-3xl font-bold">check</span>
                            </div>
                        </div>

                        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">Congratulations!</h2>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 px-2">
                            Your buyer account is ready. We've notified our top suppliers of your interests to help you find the best trade opportunities.
                        </p>

                        <button
                            onClick={onBack} // Returns to Dashboard
                            className="w-full py-4 bg-brand-blue text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-brand-blue/20 active:scale-[0.98] transition-all"
                        >
                            Start Exploring
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUpPage;
