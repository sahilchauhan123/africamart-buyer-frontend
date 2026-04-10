"use client";

import React from 'react';
import Image from 'next/image';
import { Star, MapPin, MessageSquareMore, Store, Send } from 'lucide-react';

interface ProductCardProps {
    name?: string;
    title?: string;
    price: string;
    unit: string;
    image: string;
    supplier?: string;
    location?: string;
    rating?: number;
    reviews?: string | number;
    isVerified?: boolean;
    isLocal?: boolean;
    variant?: 'vertical' | 'horizontal' | 'minimal';
    onClick?: () => void;
    onContact?: (e: React.MouseEvent) => void;
    onMessage?: (e: React.MouseEvent) => void;
}

export default function ProductCard({
    name,
    title,
    price,
    unit,
    image,
    supplier,
    location,
    rating = 4.5,
    reviews = 0,
    isVerified = false,
    isLocal = false,
    variant = 'vertical',
    onClick,
    onContact,
    onMessage
}: ProductCardProps) {
    const displayName = name || title;
    if (variant === 'horizontal') {
        return (
            <div
                className="py-3 sm:py-4 first:pt-0 flex gap-4 border-b border-slate-100 last:border-0 cursor-pointer active:scale-[0.98] transition-transform"
                onClick={onClick}
            >
                <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden relative shadow-sm border border-slate-200/40 group-hover:shadow-md transition-all">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={displayName} src={image} />
                    {isVerified && (
                        <div className="absolute top-2 left-2 bg-blue-100 text-blue-700 text-[9px] px-2 py-0.5 rounded-md font-bold uppercase backdrop-blur-sm">Verified</div>
                    )}
                    {isLocal && (
                        <div className="absolute top-2 left-2 bg-green-100 text-green-700 text-[9px] px-2 py-0.5 rounded-md font-bold uppercase backdrop-blur-sm">Local</div>
                    )}
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                        <div className="flex justify-between items-start">
                            <h3 className="font-headline font-bold text-slate-950  text-base sm:text-base leading-snug line-clamp-2 mb-1">{displayName}</h3>
                        </div>
                        <p className="text-[#0026C0] font-black text-lg flex items-baseline gap-1 mt-0.5">{price} <span className="text-slate-500 text-[10px] font-bold uppercase tracking-tighter">{unit}</span></p>
                        {location && (
                            <div className="flex items-center gap-1 mt-1 text-slate-500">
                                <MapPin className="w-3 h-3" />
                                <span className="text-[11px] font-medium">{location}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span className="text-slate-700 text-xs font-bold">{rating}</span>
                            <span className="text-slate-400 text-xs">({reviews})</span>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-3 sm:mt-5">
                        {onContact && (
                            <button
                                className="flex-1 sm:flex-none bg-[#0026C0] text-white text-[11px] font-bold px-4 py-2.5 rounded-md transition-all hover:bg-[#0020A0] active:scale-95 shadow-sm whitespace-nowrap"
                                onClick={(e) => onContact?.(e)}
                            >
                                Contact Supplier
                            </button>
                        )}
                        {onMessage && (
                            <button
                                className="flex-1 sm:flex-none border border-slate-200 text-slate-600 text-xs font-bold px-4 rounded-md transition-all hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center gap-2"
                                onClick={(e) => onMessage?.(e)}
                            >
                                <MessageSquareMore className="w-3.5 h-3.5" />
                                Message
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'minimal') {
        return (
            <div
                className="flex flex-col gap-2 active:scale-95 transition-all cursor-pointer group"
                onClick={onClick}
            >
                <div className="w-full aspect-square bg-slate-50 rounded-lg overflow-hidden relative border border-transparent group-hover:border-[#0026C0]/20">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col px-0.5 mt-1">
                    <h4 className="font-bold text-[10px] text-slate-800 leading-[1.2] line-clamp-1 tracking-tight">{name}</h4>
                    {location && <p className="text-[9px] text-slate-400">{location}</p>}
                </div>
            </div>
        );
    }

    return (
        <div 
            className="bg-white rounded-lg sm:rounded-sm overflow-hidden border border-slate-100 flex flex-col h-full cursor-pointer group transition-all hover:shadow-lg hover:-translate-y-0.5"
            onClick={onClick}
        >
            <div className="aspect-square bg-slate-50 relative overflow-hidden">
                <img
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={image}
                />
                {isVerified && (
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">VERIFIED</span>
                )}
                {isLocal && (
                    <span className="absolute top-2 left-2 bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">LOCAL</span>
                )}
            </div>
            <div className="p-2.5 flex-1 flex flex-col">
                <h3 className="font-headline font-bold text-slate-800 text-sm leading-tight line-clamp-2 mb-1 group-hover:text-[#0026C0] transition-colors">{name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-base font-black text-[#0026C0]">{price}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{unit}</span>
                </div>
                
                <button 
                    className="w-full bg-[#0026C0] text-white text-xs font-bold py-2 rounded sm:rounded-sm transition-all flex items-center justify-center gap-2 mb-2 hover:bg-[#001da2] active:scale-95 shadow-sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        onContact?.(e);
                    }}
                >
                    <Send className="w-3.5 h-3.5" />
                    Contact Supplier
                </button>

                <div className="mt-auto space-y-0.5 border-t border-slate-50 pt-1.5">
                    {supplier && (
                        <p className="text-[10px] font-medium text-slate-500 truncate">{supplier}</p>
                    )}
                    {location && (
                        <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{location}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
