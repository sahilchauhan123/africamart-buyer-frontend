"use client";

import React from 'react';
import { Send } from 'lucide-react';

interface ProductCardActionsProps {
    productId: string | number;
    variant?: 'vertical' | 'horizontal' | 'minimal';
    onContact?: (e: React.MouseEvent) => void;
    onMessage?: (e: React.MouseEvent) => void;
}

export default function ProductCardActions({
    productId,
    variant = 'vertical',
    onContact,
    onMessage
}: ProductCardActionsProps) {
    if (variant === 'minimal') return null;

    const handleContact = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onContact) {
            onContact(e);
        } else {
            // Default behavior if no handler provided
            console.log("Contacting business for product:", productId);
        }
    };

    const handleMessage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onMessage) {
            onMessage(e);
        } else {
            console.log("Getting quote for product:", productId);
        }
    };

    if (variant === 'horizontal') {
        return (
            <div className="flex gap-2 mt-5 lg:mt-6">
                <button 
                    className="flex-1 bg-[#0026C0] text-white text-[11px] lg:text-sm font-extrabold py-3 rounded-xl active:scale-95 transition-transform shadow-md shadow-[#0026C0]/10 hover:bg-[#001da2]"
                    onClick={handleContact}
                >
                    Contact Business
                </button>
                <button 
                    className="flex-1 border-2 border-[#0026C0]/20 text-[#0026C0] text-[11px] lg:text-sm font-extrabold py-3 rounded-xl active:bg-[#0026C0]/5 hover:border-[#0026C0] transition-colors"
                    onClick={handleMessage}
                >
                    Get Quote
                </button>
            </div>
        );
    }

    return (
        <button
            className="w-full bg-[#0026C0] text-white text-xs font-bold py-2 rounded sm:rounded-sm transition-all flex items-center justify-center gap-2 mb-2 hover:bg-[#001da2] active:scale-95 shadow-sm"
            onClick={handleContact}
        >
            <Send className="w-3.5 h-3.5" />
            Contact Business
        </button>
    );
}
