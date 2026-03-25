"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, MapPin, Star, BadgeCheck, Phone, MoreVertical, Flag, Ban, CheckCheck, Paperclip, Camera, Send } from 'lucide-react';

interface ChatSessionProps {
    onBack: () => void;
    chatName?: string;
}

const ChatSession: React.FC<ChatSessionProps> = ({ onBack, chatName = "Individual/Company Name" }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [message, setMessage] = useState("");
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Auto scroll to bottom
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, []);

    return (
        <div className="bg-[#f3f4f6] font-display antialiased h-[100dvh] flex flex-col overflow-hidden text-gray-900">
            {/* Header */}
            <header className="bg-white shadow-sm z-30 flex-none sticky top-0">
                <div className="flex items-center justify-between px-3 py-3 border-b border-gray-200">
                    <div className="flex items-center flex-1 min-w-0 mr-2">
                        <button
                            onClick={onBack}
                            className="mr-2 p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-600 active:scale-95"
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </button>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-base font-bold text-gray-900 truncate leading-tight">
                                {chatName}
                            </h1>
                            <div className="flex items-center text-xs text-gray-500 mt-0.5 space-x-2">
                                <span className="flex items-center">
                                    <MapPin className="w-3 h-3 mr-0.5" />
                                    New Delhi
                                </span>
                                <span className="flex items-center">
                                    <div className="flex mr-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                        ))}
                                    </div>
                                    <span className="font-medium text-gray-700">4.8</span>
                                </span>
                            </div>
                            <div className="flex items-center text-[10px] mt-0.5">
                                <BadgeCheck className="text-brand-blue w-3.5 h-3.5 mr-1" />
                                <span className="text-gray-600 font-bold uppercase tracking-wider">GST Verified</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-1">
                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-brand-blue active:scale-95">
                            <Phone className="h-6 w-6" />
                        </button>
                        <div className="relative">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 active:scale-95"
                            >
                                <MoreVertical className="h-6 w-6" />
                            </button>

                            {isMenuOpen && (
                                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                    <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors">
                                        <Flag className="text-gray-500 mr-3 w-5 h-5" />
                                        Report
                                    </button>
                                    <button className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors">
                                        <Ban className="mr-3 w-5 h-5" />
                                        Block user
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 px-4 py-2 flex items-center justify-between text-[11px] border-b border-blue-100">
                    <span className="text-gray-600 truncate mr-2 font-medium">Regarding: <span className="text-gray-900">Heavy Duty Industrial Lathe Machine</span></span>
                    <span className="text-brand-blue font-black uppercase tracking-wider cursor-pointer whitespace-nowrap">View Details</span>
                </div>
            </header>

            {/* Chat Content */}
            <main
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto bg-[#f3f4f6] p-4 space-y-4 hide-scrollbar relative"
            >
                <div className="flex justify-center my-4">
                    <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        Yesterday
                    </span>
                </div>

                {/* Receiver Bubble */}
                <div className="flex flex-col space-y-1 items-start">
                    <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] border border-gray-100">
                        <p className="text-sm leading-relaxed">Hello, is this item still available?</p>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 pl-1 uppercase">10:30 AM</span>
                </div>

                {/* Sender Bubble */}
                <div className="flex flex-col space-y-1 items-end">
                    <div className="bg-blue-100 text-slate-800 px-4 py-3 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] border border-blue-200">
                        <p className="text-sm leading-relaxed">Yes sir, we have 5 units in stock ready for dispatch.</p>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 pr-1 uppercase">10:32 AM</span>
                </div>

                {/* Receiver Bubble */}
                <div className="flex flex-col space-y-1 items-start">
                    <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] border border-gray-100">
                        <p className="text-sm leading-relaxed">What is the best price for bulk order?</p>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 pl-1 uppercase">10:33 AM</span>
                </div>

                {/* Sender Bubble with Image */}
                <div className="flex flex-col space-y-1 items-end">
                    <div className="bg-blue-100 text-slate-800 p-1.5 rounded-2xl rounded-tr-none shadow-sm max-w-[80%] border border-blue-200">
                        <div className="rounded-xl overflow-hidden mb-1 relative bg-white">
                            <img
                                alt="Lathe Machine"
                                className="w-full h-auto object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8ZGTUsotr90E6hq19crvMskGgKvV_hI4nI5Ft10RTMJtkZDFUbf4Hk6J-vvuYX6sS0QAZ9toj9yGqxFQdC9aXFwEFBUSu7tpjPgVnQxPYyFTT85oBH5SJVg6hBT5EHsjQfqT1SzByxTCTa3T5PI1MfHspta5xFPMmA9jR3WV8vtAE37cekyX30D4A0cHkVqhdzQmtK9AGvI9tFJsQ_JpVS5jxEANLv_ZyvEI8sgTppNq6yrN-PjwgsYq2dsSZWDS7KFkRxfJjobk"
                            />
                        </div>
                        <p className="text-sm px-2 pb-1.5 pt-1 font-medium">Here is the catalogue image.</p>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 pr-1 uppercase">10:35 AM</span>
                </div>

                <div className="flex justify-center my-4">
                    <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        Today
                    </span>
                </div>

                {/* Sender Bubble with Status */}
                <div className="flex flex-col space-y-1 items-end pb-4">
                    <div className="bg-blue-100 text-slate-800 px-4 py-3 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] border border-blue-200">
                        <p className="text-sm leading-relaxed">Please send your GST details for the proforma invoice.</p>
                    </div>
                    <div className="flex items-center space-x-1 pr-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">09:15 AM</span>
                        <CheckCheck size={12} className="text-brand-blue" />
                    </div>
                </div>
            </main>

            {/* Footer - Fixed at bottom */}
            <footer className="bg-white border-t border-gray-200 flex-none sticky bottom-0 z-30">
                <div className="flex overflow-x-auto space-x-3 px-4 py-2 border-b border-gray-50 hide-scrollbar">
                    {['Send Catalog', 'Request Quote', 'Attach File'].map((btn) => (
                        <button
                            key={btn}
                            className="flex-shrink-0 text-[11px] font-bold uppercase tracking-wider bg-gray-50 text-gray-600 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-100 transition active:scale-95"
                        >
                            {btn}
                        </button>
                    ))}
                </div>

                <div className="p-3 pb-safe flex items-end space-x-2">
                    <button className="p-2.5 text-slate-400 hover:text-brand-blue transition-colors active:scale-90">
                        <Paperclip className="h-6 w-6 rotate-45" />
                    </button>
                    <div className="flex-1 bg-gray-50 rounded-[24px] flex items-center border border-gray-200 focus-within:border-brand-blue/50 transition-colors">
                        <textarea
                            className="w-full bg-transparent border-none focus:ring-0 text-slate-800 px-4 py-3 text-sm max-h-32 resize-none rounded-[24px] placeholder-slate-400"
                            placeholder="Type a message..."
                            rows={1}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto';
                                target.style.height = `${target.scrollHeight}px`;
                            }}
                        />
                        <button className="p-2.5 mr-1 text-slate-400 hover:text-brand-blue active:scale-90">
                            <Camera className="h-5 w-5" />
                        </button>
                    </div>
                    <button className="p-3.5 bg-brand-blue text-white rounded-full shadow-lg hover:brightness-110 active:scale-90 transition-all flex items-center justify-center">
                        <Send className="h-5 w-5 translate-x-0.5 -translate-y-0.5 rotate-[-10deg]" />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ChatSession;
