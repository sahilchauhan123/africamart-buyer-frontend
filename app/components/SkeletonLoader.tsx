"use client";

import React from 'react';

export const ProductCardSkeleton = () => {
    return (
        <div className="bg-white rounded-lg sm:rounded-sm overflow-hidden border border-slate-200 shadow-sm flex flex-col h-full animate-pulse">
            <div className="aspect-square bg-slate-100 relative"></div>
            <div className="p-3 flex-1 flex flex-col gap-2.5">
                <div className="h-4 bg-slate-100 rounded w-11/12"></div>
                <div className="h-3 bg-slate-100 rounded w-2/3 mb-1"></div>
                
                <div className="flex items-center gap-1 mb-2">
                    <div className="h-4 bg-[#0026C0]/5 rounded w-24"></div>
                </div>
                
                <div className="mt-auto pt-3 border-t border-slate-50 space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-slate-100"></div>
                        <div className="h-2 bg-slate-100 rounded w-1/2"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-3 rounded-sm bg-slate-100"></div>
                        <div className="h-2 bg-slate-100 rounded w-1/3"></div>
                    </div>
                </div>
                
                <div className="mt-3 h-9 bg-[#0026C0]/5 rounded-sm w-full"></div>
            </div>
        </div>
    );
};

export const CategorySkeleton = () => {
    return (
        <div className="flex flex-col items-center gap-3 lg:gap-5 animate-pulse">
            <div className="w-20 h-20 lg:w-32 lg:h-32 rounded-xl lg:rounded-[24px] bg-slate-100"></div>
            <div className="h-3 bg-slate-100 rounded w-16"></div>
        </div>
    );
};
