"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShoppingBag,
  CheckCircle2,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  Box,
  TrendingUp,
  Settings,
  Mail,
  Loader2,
  Calendar,
  Search,
  User,
  Send,
  MoreVertical,
  Paperclip,
  Smile,
  PlusCircle,
  MessageSquare,
  ArrowLeft,
  Lock as LockIcon
} from 'lucide-react';
import Header from '../components/Header';
import { fetchBuyerLeads, buyerLogout } from '@/src/lib/api';
import BusinessMessagesView from '../../src/components/BusinessMessagesView';
import ChatSessionView from '../../src/components/ChatSessionView';
import { useMessagingController } from '../../src/hooks/useMessagingController';

interface Lead {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  seller_name: string;
  seller_address: string;
  buyer_name: string;
  buyer_phone: string;
  quantity: string;
  status: string;
  created_at: string;
  seller_id: number;
}

type DashboardTab = 'leads' | 'messages' | 'profile';

export default function DashboardPage() {
  const router = useRouter();
  const [buyer, setBuyer] = useState<any>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<DashboardTab>('leads');

  useEffect(() => {
    const storedBuyer = localStorage.getItem('buyer');
    if (!storedBuyer) {
      router.push('/login');
      return;
    }
    setBuyer(JSON.parse(storedBuyer));
    loadLeads();

    // Check for tab query param
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab') as DashboardTab;
    if (tab && ['leads', 'messages', 'profile'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [router]);

  const loadLeads = async () => {
    try {
      const res = await fetchBuyerLeads();
      if (res.ok) {
        const data = await res.json();
        setLeads(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load leads", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await buyerLogout();
    localStorage.removeItem('buyer');
    router.push('/');
  };

  if (!buyer) return null;

  return (
    <div className="h-screen h-[100dvh] bg-[#F8FAFC] font-body text-slate-900 flex flex-col overflow-hidden">
      <style jsx global>{`
        body, html {
          overflow: hidden !important;
          height: 100% !important;
        }
      `}</style>
      
      <div className="flex-none z-50">
        <Header />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row w-full overflow-hidden">

        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col flex-none">
          <div className="p-8 border-b border-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-[#0026C0] rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-[#0026C0]/20">
                {buyer.full_name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Buyer</span>
                <span className="text-sm font-black text-slate-900 truncate">{buyer.full_name}</span>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-xs font-black uppercase tracking-widest ${activeTab === 'leads' ? 'bg-[#0026C0] text-white shadow-xl shadow-[#0026C0]/20' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Inquiries</span>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-xs font-black uppercase tracking-widest ${activeTab === 'messages' ? 'bg-[#0026C0] text-white shadow-xl shadow-[#0026C0]/20' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Mail className="w-4 h-4" />
              <span>Messages</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-xs font-black uppercase tracking-widest ${activeTab === 'profile' ? 'bg-[#0026C0] text-white shadow-xl shadow-[#0026C0]/20' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Settings className="w-4 h-4" />
              <span>Profile Settings</span>
            </button>
          </nav>

          <div className="p-4 border-t border-slate-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden relative flex flex-col">
          {activeTab === 'leads' && <LeadsView leads={leads} loading={loading} />}
          {activeTab === 'messages' && <MessagesView onOpenDrawer={() => { }} />}
          {activeTab === 'profile' && <ProfileSettingsView buyer={buyer} />}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden bg-white border-t border-slate-100 flex items-center justify-around py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] flex-none z-50">
        <button
          onClick={() => setActiveTab('leads')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'leads' ? 'text-[#0026C0]' : 'text-slate-400'}`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[9px] font-black uppercase tracking-widest leading-none">Inquiries</span>
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'messages' ? 'text-[#0026C0]' : 'text-slate-400'}`}
        >
          <Mail className="w-5 h-5" />
          <span className="text-[9px] font-black uppercase tracking-widest leading-none">Messages</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-[#0026C0]' : 'text-slate-400'}`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-[9px] font-black uppercase tracking-widest leading-none">Profile</span>
        </button>
      </div>
    </div >
  );
}

/* --- MESSAGES VIEW --- */
function MessagesView({ onOpenDrawer }: { onOpenDrawer: () => void }) {
  const [showMobileChat, setShowMobileChat] = useState(false);

  return (
    <div className="h-full">
      <BusinessMessagesView
        onOpenDrawer={onOpenDrawer}
        showChat={showMobileChat}
        setShowChat={setShowMobileChat}
      />
    </div>
  );
}

/* --- LEADS VIEW --- */
function LeadsView({ leads, loading }: { leads: Lead[], loading: boolean }) {
  return (
    <div className="p-4 lg:p-10 space-y-8 animate-in fade-in duration-500 overflow-y-auto h-full">
      <div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-4">
        <div className="flex gap-4">
          <StatMini count={leads.length} label="Total" color="blue" />
          <StatMini count={leads.filter(l => l.status === 'NEW').length} label="New" color="amber" />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Requirement Reference</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Seller Details</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <Loader2 className="w-8 h-8 text-[#0026C0] animate-spin mx-auto" />
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="space-y-3">
                      <Box className="w-12 h-12 text-slate-100 mx-auto" />
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">No inquiries found yet</p>
                    </div>
                  </td>
                </tr>
              ) : leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <Link href={`/product/${lead.product_id}/${(lead.product_name || 'product').toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()}`} className="flex items-center gap-4 group cursor-pointer w-fit">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden border border-slate-100 flex-none shadow-sm transition-transform group-hover:scale-105">
                        {lead.product_image ? (
                          <img src={lead.product_image} alt={lead.product_name} className="w-full h-full object-cover" />
                        ) : (
                          <Box className="w-6 h-6 text-slate-200" />
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-black text-slate-900 uppercase tracking-tight truncate max-w-[250px] group-hover:text-[#0026C0] transition-colors">{lead.product_name || `Product #${lead.product_id.slice(0, 8)}`}</span>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-5 text-xs font-black text-slate-700">{lead.quantity}</td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-700 uppercase tracking-tight">{lead.seller_name || 'Anonymous Seller'}</span>
                      <span className="text-[9px] font-bold text-slate-400 tracking-widest truncate max-w-[150px]">{lead.seller_address || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5"><StatusBadge status={lead.status} /></td>
                  <td className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase">{new Date(lead.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                  <td className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase">{lead.created_at}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* --- PROFILE SETTINGS VIEW --- */
function ProfileSettingsView({ buyer }: { buyer: any }) {
  return (
    <div className="p-4 lg:p-10 max-w-3xl space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500 overflow-y-auto h-full">

      <div className="space-y-8">
        {/* Profile Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-6 pb-6 border-b border-slate-50">
            <div className="w-20 h-20 bg-[#0026C0] rounded-3xl flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-[#0026C0]/20">
              {buyer.full_name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 uppercase">{buyer.full_name}</h3>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{buyer.email}</p>
              <button className="mt-3 text-[10px] font-black text-[#0026C0] uppercase tracking-widest hover:underline">Change Photo</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SettingsInput label="Full Name" value={buyer.full_name} disabled />
            <SettingsInput label="Email Address" value={buyer.email} disabled />
            <SettingsInput label="Phone Number" value={buyer.phone_no || "Not provided"} disabled />
            <SettingsInput label="Member Since" value="January 2026" disabled />
          </div>

          <div className="pt-6">
            <button className="px-8 py-3.5 bg-slate-900 text-white font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95">
              Save Profile Changes
            </button>
          </div>
        </div>

        {/* Account Safety */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-4">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Account Security</h4>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group cursor-pointer hover:border-[#0026C0]/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#0026C0] shadow-sm">
                <LockIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 uppercase">Change Password</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Last updated 3 months ago</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#0026C0] transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- HELPER COMPONENTS --- */

function StatMini({ count, label, color }: { count: number, label: string, color: 'blue' | 'amber' }) {
  const colorClass = color === 'blue' ? 'bg-[#0026C0] text-white shadow-[#0026C0]/20' : 'bg-amber-100 text-amber-600 border border-amber-200';
  return (
    <div className={`px-4 py-2 rounded-xl flex items-center gap-3 shadow-lg ${colorClass}`}>
      <span className="text-sm font-black tracking-tighter">{count}</span>
      <span className="text-[9px] font-black uppercase tracking-widest opacity-80">{label}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    NEW: "bg-blue-50 text-blue-600 border-blue-100",
    CONTACTED: "bg-green-50 text-green-600 border-green-100",
    CLOSED: "bg-slate-50 text-slate-500 border-slate-100"
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${styles[status] || styles.NEW}`}>
      {status}
    </span>
  );
}

function MessageBubble({ text, time, isMe }: { text: string, time: string, isMe: boolean }) {
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] space-y-1`}>
        <div className={`px-5 py-3.5 rounded-2xl shadow-sm text-sm font-bold leading-relaxed ${isMe ? 'bg-[#0026C0] text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'}`}>
          {text}
        </div>
        <p className={`text-[9px] font-black uppercase tracking-widest text-slate-400 ${isMe ? 'text-right' : 'text-left'}`}>{time}</p>
      </div>
    </div>
  );
}

function SettingsInput({ label, value, disabled = false }: { label: string, value: string, disabled?: boolean }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <input
        disabled={disabled}
        value={value}
        className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none focus:border-[#0026C0] transition-colors disabled:opacity-60"
      />
    </div>
  );
}

function IconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="p-2 text-slate-400 hover:text-[#0026C0] hover:bg-[#0026C0]/5 rounded-lg transition-all">
      {icon}
    </button>
  );
}