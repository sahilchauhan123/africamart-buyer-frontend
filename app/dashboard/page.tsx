"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  ChevronRight,
  User,
  LogOut,
  Search,
  LayoutDashboard,
  Box,
  TrendingUp,
  MapPin,
  Bell,
  Settings,
  Mail,
  Loader2,
  Calendar
} from 'lucide-react';
import Header from '../components/Header';
import { fetchBuyerLeads, buyerLogout } from '@/src/lib/api';

interface Lead {
  id: string;
  product_id: string;
  quantity: string;
  status: string;
  source: string;
  created_at: string;
  seller_id: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [buyer, setBuyer] = useState<any>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedBuyer = localStorage.getItem('buyer');
    if (!storedBuyer) {
      router.push('/login');
      return;
    }
    setBuyer(JSON.parse(storedBuyer));
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const res = await fetchBuyerLeads();
      if (res.ok) {
        const data = await res.json();
        setLeads(data.data || []);
      } else {
        setError("Failed to load your inquiries.");
      }
    } catch (err) {
      setError("Something went wrong. Please check your connection.");
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
    <div className="min-h-screen bg-[#F8FAFC] font-body text-slate-900">
      <Header />

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="w-full lg:w-72 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0026C0] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-[#0026C0]/20">
                {buyer.full_name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Buyer Account</span>
                <span className="text-sm font-black text-slate-900 truncate">{buyer.full_name}</span>
              </div>
            </div>

            <nav className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 space-y-1">
              <NavItem icon={<LayoutDashboard className="w-4 h-4" />} label="Overview" active />
              <NavItem icon={< शॉपिंग-बैग className="w-4 h-4" />} label="My Inquiries" />
              <NavItem icon={<Mail className="w-4 h-4" />} label="Quick Messages" />
              <div className="h-px bg-slate-50 my-2 mx-3"></div>
              <NavItem icon={<Settings className="w-4 h-4" />} label="Settings" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all text-sm font-bold uppercase tracking-wider"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </nav>

            <div className="bg-[#0026C0] rounded-2xl p-6 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500"></div>
              <Rocket className="w-8 h-8 text-blue-200 mb-4" />
              <h4 className="text-lg font-black uppercase tracking-tight leading-tight mb-2">Grow Your <br />Business</h4>
              <p className="text-blue-100 text-[11px] font-medium leading-relaxed opacity-80 mb-4 uppercase">Upgrade to Premium for direct access to top manufacturers.</p>
              <button className="w-full py-2.5 bg-white text-[#0026C0] rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all">Upgrade Now</button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">

            {/* Header / Stats */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Your Dashboard</h1>
                <p className="text-slate-500 font-bold text-sm">Managing {leads.length} active business requirements.</p>
              </div>
              <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
                <div className="px-4 py-2 bg-slate-50 rounded-lg flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-black text-slate-700 uppercase tracking-wider">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard count={leads.length} label="Total Leads" icon={<TrendingUp className="w-5 h-5 text-blue-500" />} color="bg-blue-500" />
              <StatCard count={leads.filter(l => l.status === 'NEW').length} label="Pending Review" icon={<Clock className="w-5 h-5 text-amber-500" />} color="bg-amber-500" />
              <StatCard count={leads.filter(l => l.status === 'CONTACTED').length} label="Successful" icon={<CheckCircle2 className="w-5 h-5 text-green-500" />} color="bg-green-500" />
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Active Requirements</h3>
                <button className="text-[10px] font-black text-[#0026C0] uppercase tracking-widest hover:underline">View All</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Inquiry</th>
                      <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity</th>
                      <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                      <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-20 text-center">
                          <Loader2 className="w-8 h-8 text-[#0026C0] animate-spin mx-auto mb-4" />
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Loading your requirements...</p>
                        </td>
                      </tr>
                    ) : leads.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-20 text-center">
                          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Box className="w-8 h-8 text-slate-200" />
                          </div>
                          <h4 className="text-sm font-black text-slate-900 uppercase">No leads found</h4>
                          <p className="text-slate-400 text-xs mt-1 font-bold">Start exploring products to submit inquiries.</p>
                          <button
                            onClick={() => router.push('/')}
                            className="mt-6 px-6 py-2 bg-[#0026C0] text-white rounded-lg text-[10px] font-black uppercase tracking-widest"
                          >
                            Explore Products
                          </button>
                        </td>
                      </tr>
                    ) : (
                      leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-100">
                                <ShoppingBag className="w-5 h-5 text-slate-400" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-black text-slate-900 uppercase tracking-tight">{lead.product_id}</span>
                                <span className="text-[10px] font-bold text-slate-400">Seller ID: #{lead.seller_id}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-sm font-black text-slate-700">{lead.quantity}</span>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-xs font-bold text-slate-500">{new Date(lead.created_at).toLocaleDateString()}</span>
                          </td>
                          <td className="px-6 py-5">
                            <StatusBadge status={lead.status} />
                          </td>
                          <td className="px-6 py-5 text-right">
                            <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all">
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`
      w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-black uppercase tracking-wider
      ${active ? 'bg-[#0026C0] text-white shadow-lg shadow-[#0026C0]/20' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
    `}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

function StatCard({ count, label, icon, color }: { count: number, label: string, icon: React.ReactNode, color: string }) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center justify-between group hover:border-[#0026C0]/20 transition-all">
      <div className="space-y-1">
        <h4 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{count}</h4>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</p>
      </div>
      <div className={`w-12 h-12 rounded-2xl ${color}/10 flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    NEW: "bg-blue-50 text-blue-600 border-blue-100",
    CONTACTED: "bg-green-50 text-green-600 border-green-100",
    CLOSED: "bg-slate-50 text-slate-500 border-slate-100"
  };

  const currentStyle = styles[status as keyof typeof styles] || styles.NEW;

  return (
    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${currentStyle}`}>
      {status}
    </span>
  );
}

function Rocket(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" />
      <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" />
    </svg>
  );
}