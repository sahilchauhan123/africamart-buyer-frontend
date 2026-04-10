"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { COUNTRY_CODES } from '@/src/constants/constanst';

const API_BASE_URL = 'http://localhost:4000/api/v1';

export default function LoginPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState(COUNTRY_CODES[100]); // Default India
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const phone_no = `${country.code} ${phoneNumber}`;
      const res = await fetch(`${API_BASE_URL}/auth/buyer/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_no: phone_no,
          password: password
        })
      });
      const data = await res.json();
      if (res.ok) {
        // Store buyer profile only, tokens are in cookies
        localStorage.setItem('buyer', JSON.stringify(data.data.buyer));
        router.push('/');
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-body">
      {/* Left side */}
      <div className="hidden lg:flex w-1/2 bg-[#0026C0] p-16 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-150"></div>
        </div>
        <div className="relative z-10 flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-2xl">
            <div className="w-6 h-6 bg-[#0026C0] rounded-sm rotate-45"></div>
          </div>
          <span className="text-2xl font-black tracking-tight text-white uppercase italic">AFRICA<span className="text-blue-200">MART</span></span>
        </div>
        <div className="relative z-10 space-y-6">
          <h1 className="text-6xl font-black text-white leading-tight uppercase italic">
            Powering <br />
            <span className="text-blue-300">Africa's B2B.</span>
          </h1>
          <p className="text-blue-100 text-xl font-medium opacity-80 leading-relaxed font-black uppercase">Your gateway to global manufacturing network.</p>
        </div>
        <div className="relative z-10 font-black uppercase tracking-widest text-blue-200 text-[10px]">© 2026 AfricaMart Corp.</div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-24 bg-white lg:rounded-l-[30px] shadow-2xl z-20">
        <div className="lg:hidden w-full flex items-center justify-center mb-10">
          <div className="flex items-center gap-2" onClick={() => router.push('/')}>
            <div className="w-8 h-8 bg-[#0026C0] rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900 italic uppercase">AFRICA<span className="text-[#0026C0]">MART</span></span>
          </div>
        </div>

        <div className="w-full max-w-[380px] space-y-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase tracking-tighter">Sign In</h2>
            <p className="text-slate-500 font-bold text-sm">Welcome back to your business hub.</p>
          </div>

          {error && <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-md text-xs font-bold">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
              <div className="flex gap-2">
                <div className="relative w-[110px] h-12">
                  <select
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    value={country.code}
                    onChange={(e) => {
                      const found = COUNTRY_CODES.find(c => c.code === e.target.value);
                      if (found) setCountry(found);
                    }}
                  >
                    {COUNTRY_CODES.map((item, idx) => (
                      <option key={idx} value={item.code}>{item.name} ({item.code})</option>
                    ))}
                  </select>
                  <div className="absolute inset-0 bg-slate-50 border border-slate-200 rounded-md px-2 flex items-center justify-between pointer-events-none">
                    <span className="font-bold text-slate-800 text-xs">{country.flag} {country.code}</span>
                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-slate-400"></div>
                  </div>
                </div>
                <input
                  required
                  className="flex-1 h-12 bg-slate-50 border border-slate-200 rounded-md px-4 font-bold text-slate-800 focus:bg-white focus:border-[#0026C0] outline-none transition-all text-sm"
                  placeholder="Mobile Number"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                <button type="button" className="text-[9px] font-black text-[#0026C0] hover:underline uppercase tracking-wider">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#0026C0] transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 bg-slate-50 border border-slate-200 rounded-md pl-11 pr-12 font-bold text-slate-800 focus:bg-white focus:border-[#0026C0] outline-none transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#0026C0] text-white font-black rounded-md shadow-xl shadow-[#0026C0]/20 flex items-center justify-center gap-3 group active:scale-[0.98] transition-all hover:bg-[#0020A0] text-xs uppercase tracking-widest disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="pt-10 border-t border-slate-100 text-center space-y-4">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Are you new here?</p>
            <button
              onClick={() => router.push('/signup')}
              className="bg-slate-900 text-white w-full h-12 rounded-md font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-[0.98]"
            >
              Create business account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}