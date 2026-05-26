import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Store } from 'lucide-react';
import { createSlug } from '@/src/lib/utils';
import ProductCardActions from './ProductCardActions';

interface ProductCardProps {
    id: string | number;
    name: string;
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
    onContact?: (e: React.MouseEvent) => void;
    onMessage?: (e: React.MouseEvent) => void;
}

export default function ProductCard({
    id,
    name,
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
    onContact,
    onMessage
}: ProductCardProps) {
    const slug = createSlug(name);
    const productUrl = `/product/${id}/${slug}`;

    if (variant === 'horizontal') {
        return (
            <div className="bg-white p-4 lg:p-5 rounded-2xl border border-slate-100 flex flex-col sm:flex-row gap-4 sm:gap-6 hover:border-[#0026C0]/10 transition-all group active:scale-[0.99]">
                <Link href={productUrl} className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-1 min-w-0">
                    {/* Image Section */}
                    <div className="w-full sm:w-32 lg:w-40 h-40 sm:h-32 lg:h-40 flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden relative border border-slate-100 group-hover:scale-[1.02] transition-transform">
                        <img className="w-full h-full object-cover" alt={name} src={image} />
                        {isVerified && (
                            <div className="absolute top-2 left-2 bg-[#0026C0]/10 text-[#0026C0] text-[9px] px-2 py-0.5 rounded-full font-bold uppercase backdrop-blur-sm">Verified</div>
                        )}
                        {isLocal && (
                            <div className="absolute top-2 left-2 bg-green-100 text-green-700 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase backdrop-blur-sm">Local</div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                            <div className="flex justify-between items-start">
                                <h2 className="font-bold text-slate-900 text-base lg:text-lg leading-tight line-clamp-2 group-hover:text-[#0026C0] transition-colors">{name}</h2>
                            </div>
                            {price === "Price on request" ? (
                                <p className="text-[#0026C0] font-black text-xl lg:text-2xl mt-1 lg:mt-2">
                                    {price}
                                </p>
                            ) : (
                                <p className="text-[#0026C0] font-black text-xl lg:text-2xl mt-1 lg:mt-2">
                                    {price}
                                    <span className="text-slate-400 text-[10px] lg:text-xs font-medium tracking-tighter ml-1">/ {unit}</span>
                                </p>
                            )}

                            <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className={`w-3 h-3 lg:w-3.5 lg:h-3.5 ${s <= Math.floor(rating) ? 'text-amber-500 fill-amber-500' : 'text-slate-200 fill-slate-200'}`} />
                                    ))}
                                </div>
                                <span className="text-slate-900 text-xs font-bold ml-1">{rating}</span>
                                <span className="text-slate-400 text-xs font-medium">({reviews})</span>
                            </div>

                            <div className="flex flex-col gap-1.5 mt-3">
                                {supplier && (
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center justify-center size-5 rounded-full bg-slate-50 border border-slate-100">
                                            <Store className="w-3 h-3 text-[#0026C0]" />
                                        </div>
                                        <span className="text-[11px] lg:text-sm font-bold text-slate-700 truncate">{supplier}</span>
                                    </div>
                                )}
                                {location && (
                                    <div className="flex items-center gap-1.5 ml-0.5">
                                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                                        <span className="text-[10px] lg:text-xs font-medium text-slate-500 truncate">{location}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="sm:w-48 lg:w-56">
                    <ProductCardActions
                        productId={id}
                        variant="horizontal"
                        onContact={onContact}
                        onMessage={onMessage}
                    />
                </div>
            </div>
        );
    }

    if (variant === 'minimal') {
        return (
            <Link
                href={productUrl}
                className="flex flex-col gap-2 active:scale-95 transition-all group"
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
            </Link>
        );
    }

    return (
        <div className="bg-white rounded-lg sm:rounded-sm overflow-hidden border border-slate-200 shadow-sm flex flex-col h-full group transition-all">
            <Link href={productUrl} className="flex-1 flex flex-col">
                <div className="aspect-square bg-slate-50 relative overflow-hidden">
                    <img
                        alt={`Buy ${name} at the best price on Lasomaa Marketplace`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={image}
                    />
                    {isVerified && (
                        <span className="absolute top-2 left-2 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">Verified</span>
                    )}
                    {isLocal && (
                        <span className="absolute top-2 left-2 bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">LOCAL</span>
                    )}
                </div>
                <div className="p-2.5 flex-1 flex flex-col">
                    <h3 className="font-headline font-bold text-slate-800 text-sm leading-tight line-clamp-2 mb-1 group-hover:text-[#0026C0] transition-colors">{name}</h3>
                    <div className="flex items-baseline gap-1 mb-2">
                        {price === "Price on request" ? (
                            <span className="text-[13px] font-black text-[#0026C0]">{price}</span>
                        ) : (
                            <>
                                <span className="text-base font-black text-[#0026C0]">{price}</span>
                                <span className="text-[10px] text-slate-500 font-medium">/ {unit}</span>
                            </>
                        )}
                    </div>

                    <div className="mt-auto space-y-0.5 border-t border-slate-50 pt-1.5 pb-2">
                        {supplier && (
                            <p className="text-[10px] font-medium text-slate-500 truncate">{supplier}</p>
                        )}
                        {location && (
                            <div className="flex items-center gap-1 text-[10px]">
                                <MapPin className="w-3 h-3 text-orange-500" />
                                <span className="truncate text-slate-500 font-medium">{location}</span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
            <div className="px-2.5 pb-2.5">
                <ProductCardActions
                    productId={id}
                    onContact={onContact}
                />
            </div>
        </div>
    );
}

