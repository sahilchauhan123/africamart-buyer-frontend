"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Mail, User } from 'lucide-react';
import { COUNTRY_CODES } from '@/src/constants/constanst';
import { buyerLogin, buyerSendOtp, buyerSubmitOtp } from '@/src/lib/api';
import Image from 'next/image';
import logo from '../logo.png';

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState(COUNTRY_CODES[100]); // Default to India (+91)
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const phone_no = `${country.code} ${phoneNumber}`;
      const res = await buyerSendOtp(fullName, email, phone_no, password);
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const phone_no = `${country.code} ${phoneNumber}`;
      const res = await buyerSubmitOtp(phone_no, parseInt(otp));
      const data = await res.json();
      if (res.ok) {
        // Automatically login after successful signup
        try {
          const loginRes = await buyerLogin(phone_no, password);
          const loginData = await loginRes.json();
          if (loginRes.ok) {
            localStorage.setItem('buyer', JSON.stringify(loginData.data.buyer));
            router.push('/');
          } else {
            router.push('/login');
          }
        } catch (loginErr) {
          console.error("Auto-login failed:", loginErr);
          router.push('/login');
        }
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-body">
      {/* Left side: branding */}
      <div className="hidden lg:flex w-[40%] bg-[#0026C0] p-16 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-150"></div>
        </div>
        <div className="relative z-10 flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
          <Image
            src={logo}
            alt="LASOMAA"
            width={205}
            height={40}
            className="brightness-0 invert object-contain"
          />
        </div>
        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl font-black text-white leading-tight uppercase italic">Fast-Track Your <br /><span className="text-blue-300">B2B Trade.</span></h1>
          <p className="text-blue-100 text-lg font-medium opacity-80">Join the most trusted manufacturing network in Africa in seconds.</p>
        </div>
        <div className="relative z-10 text-blue-200 text-[10px] font-black uppercase tracking-widest">© 2026 Lasomaa Corp.</div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-[60%] flex flex-col items-center justify-center p-6 lg:p-12 bg-white lg:rounded-l-[30px] shadow-2xl relative">
        <div className="lg:hidden w-full flex items-center justify-center mb-10">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
            <Image
              src={logo}
              alt="LASOMAA"
              width={164}
              height={32}
              className="object-contain"
            />
          </div>
        </div>

        <div className="w-full max-w-[450px] space-y-6">
          {!otpSent ? (
            <>
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase tracking-tighter">Create Account</h2>
                <p className="text-slate-500 font-bold text-sm">Join the B2B marketplace.</p>
              </div>

              {error && <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-md text-xs font-bold">{error}</div>}

              <form onSubmit={handleInitialSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        required
                        className="w-full h-12 bg-slate-50 border border-slate-200 rounded-md pl-11 pr-4 font-bold text-slate-800 focus:bg-white focus:border-[#0026C0] outline-none transition-all text-sm"
                        placeholder="John Doe"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        required
                        className="w-full h-12 bg-slate-50 border border-slate-200 rounded-md pl-11 pr-4 font-bold text-slate-800 focus:bg-white focus:border-[#0026C0] outline-none transition-all text-sm"
                        placeholder="john@company.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

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
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      required
                      className="w-full h-12 bg-slate-50 border border-slate-200 rounded-md pl-11 pr-12 font-bold text-slate-800 focus:bg-white focus:border-[#0026C0] outline-none transition-all text-sm"
                      placeholder="Min. 8 characters"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-[#0026C0] text-white font-black rounded-md shadow-xl shadow-[#0026C0]/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all hover:bg-[#0020A0] text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Create Account"} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase tracking-tighter">Verify Phone</h2>
                <p className="text-slate-500 font-bold text-sm">We sent a 6-digit code to <span className="text-slate-900">{country.code} {phoneNumber}</span></p>
              </div>

              {error && <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-md text-xs font-bold">{error}</div>}

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Enter OTP</label>
                  <input
                    required
                    className="w-full h-14 bg-slate-50 border border-slate-200 rounded-md px-4 font-black text-center text-2xl tracking-[0.5em] text-slate-800 focus:bg-white focus:border-[#0026C0] focus:ring-4 focus:ring-[#0026C0]/5 outline-none transition-all"
                    placeholder="······"
                    maxLength={6}
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-[#0026C0] text-white font-black rounded-md shadow-xl shadow-[#0026C0]/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all hover:bg-[#0020A0] text-xs uppercase tracking-widest disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Verify & Complete"} <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="w-full flex items-center justify-center gap-2 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-[#0026C0] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Edit Number
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="pt-8 border-t border-slate-100 text-center space-y-4">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Already have an account?</p>
            <button
              onClick={() => router.push('/login')}
              className="bg-slate-900 text-white w-full h-12 rounded-md font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-[0.98]"
            >
              Log in instead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}