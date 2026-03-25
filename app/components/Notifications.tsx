"use client";

import React, { useState } from 'react';
import { ArrowLeft, Bell, Settings2, Package, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { View } from '../types';

interface NotificationsProps {
    onBack: () => void;
    onNavigate: (view: View) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ onBack, onNavigate }) => {
    const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

    const notifications = [
        {
            id: 1,
            type: 'order',
            title: 'Order Delivered',
            message: 'Your order #ORD-2938 from AgroTech Supplies has been delivered.',
            time: '2 hours ago',
            unread: true,
            icon: <Package className="w-5 h-5 text-emerald-500" />
        },
        {
            id: 2,
            type: 'message',
            title: 'New Quote Received',
            message: 'Global Textiles has sent a quote for your "Cotton Yarn" requirement.',
            time: '5 hours ago',
            unread: true,
            icon: <MessageSquare className="w-5 h-5 text-brand-blue" />
        },
        {
            id: 3,
            type: 'system',
            title: 'Account Verification',
            message: 'Your business profile verification is complete. You can now access all features.',
            time: '1 day ago',
            unread: false,
            icon: <CheckCircle2 className="w-5 h-5 text-indigo-500" />
        },
        {
            id: 4,
            type: 'alert',
            title: 'Payment Failed',
            message: 'We could not process your recent payment for Invoice #INV-992.',
            time: '2 days ago',
            unread: false,
            icon: <AlertCircle className="w-5 h-5 text-red-500" />
        }
    ];

    const displayNotifications = activeTab === 'all' 
        ? notifications 
        : notifications.filter(n => n.unread);

    return (
        <div className="flex flex-col h-screen bg-[#F8FAFC] overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Header */}
            <header className="bg-brand-blue sticky top-0 z-50 shadow-md">
                <div className="flex items-center justify-between px-4 py-4.5 gap-3">
                        <button
                            onClick={onBack}
                            className="p-1 rounded-full hover:bg-white/10 transition-colors text-white active:scale-95 shrink-0"
                        >
                            <ArrowLeft className="h-8 w-8" />
                        </button>
                        <h1 className="text-white text-lg font-bold tracking-tight">Notifications</h1>
                        <button className="p-1 rounded-full hover:bg-white/10 transition-colors text-white active:scale-95">
                            <Settings2 className="h-8 w-8" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex px-4 pb-0 space-x-6 text-sm font-medium text-blue-100 overflow-x-auto hide-scrollbar">
                        <button 
                            onClick={() => setActiveTab('all')}
                            className={`pb-3 border-b-2 whitespace-nowrap uppercase tracking-wider text-[11px] font-black transition-colors ${activeTab === 'all' ? 'border-white text-white' : 'border-transparent hover:text-white opacity-60'}`}
                        >
                            All Activity
                        </button>
                        <button 
                            onClick={() => setActiveTab('unread')}
                            className={`pb-3 border-b-2 whitespace-nowrap uppercase tracking-wider text-[11px] font-black transition-colors flex items-center gap-1.5 ${activeTab === 'unread' ? 'border-white text-white' : 'border-transparent hover:text-white opacity-60'}`}
                        >
                            Unread
                            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-black leading-none flex items-center justify-center">2</span>
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-slate-50 hide-scrollbar pt-2">
                    {displayNotifications.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center p-8 text-center opacity-70">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <Bell className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">All caught up!</h3>
                            <p className="text-slate-500 text-sm mt-1">You have no new notifications right now.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {displayNotifications.map((notif) => (
                                <div 
                                    key={notif.id}
                                    className={`p-5 flex gap-4 transition-colors hover:bg-white active:bg-slate-100 cursor-pointer ${notif.unread ? 'bg-brand-blue/[0.03]' : 'bg-transparent'}`}
                                >
                                    <div className={`mt-0.5 w-10 h-10 rounded-full flex justify-center items-center shrink-0 ${notif.unread ? 'bg-white shadow-sm ring-1 ring-slate-100' : 'bg-slate-100'}`}>
                                        {notif.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start gap-2">
                                            <h4 className={`text-sm truncate pr-2 ${notif.unread ? 'font-black text-slate-900' : 'font-bold text-slate-700'}`}>
                                                {notif.title}
                                            </h4>
                                            <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap mt-0.5">
                                                {notif.time}
                                            </span>
                                        </div>
                                        <p className={`text-xs mt-1 leading-relaxed ${notif.unread ? 'text-slate-600 font-medium' : 'text-slate-500'}`}>
                                            {notif.message}
                                        </p>
                                    </div>
                                    {notif.unread && (
                                        <div className="w-2 h-2 rounded-full bg-brand-blue shrink-0 mt-2"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </main>
        </div>
    );
};

export default Notifications;
