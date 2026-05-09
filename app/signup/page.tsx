"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Eye, EyeOff, Check, Loader2 } from 'lucide-react';
import { COUNTRY_CODES } from '@/src/constants/constanst';
import { buyerLogin, buyerSendOtp, buyerSubmitOtp } from '@/src/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../logo.png';

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState(COUNTRY_CODES[121]); // Default to Liberia (+231)
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

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
    <div className="fixed inset-0 h-screen bg-white flex flex-col lg:flex-row font-body overflow-hidden">
      {/* Left Column: Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-white p-16 flex-col justify-center items-center relative border-r border-slate-100">
        <div className="relative z-10 w-full max-w-md flex justify-center">
          <div className="cursor-pointer" onClick={() => router.push('/')}>
            <Image
              src={logo}
              alt="LASOMAA"
              width={400}
              height={120}
              className="object-contain"
            />
          </div>
        </div>
        <div className="absolute bottom-12 text-slate-400 text-[10px] font-black tracking-widest">
          © 2026 Lasomaa. We connect African Businesses to the Buyers
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="flex-1 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-20 bg-slate-50 lg:bg-white relative">
        <div className="sm:mx-auto sm:w-full sm:max-w-md lg:max-w-[340px] lg:pt-8">
          {/* Mobile Logo Only */}
          <div className="lg:hidden flex justify-center mb-6">
            <Image
              src={logo}
              alt="LASOMAA"
              width={120}
              height={24}
              className="object-contain"
            />
          </div>

          <h2 className="text-2xl lg:text-2xl font-black text-slate-900 tracking-tight">
            {otpSent ? "Verify Phone" : "Create Account"}
          </h2>
          <p className="mt-1 text-xs lg:text-sm font-medium text-slate-500">
            {otpSent ? `We sent a code to ${country.code} ${phoneNumber}` : "Become a buyer on Lasomaa. Find goods near you."}
          </p>
        </div>

        <div className="mt-6 lg:mt-0 sm:mx-auto sm:w-full sm:max-w-md lg:max-w-[340px]">
          <div className="lg:bg-transparent py-2 lg:py-8 lg:px-0 shadow-none lg:shadow-none sm:rounded-none lg:rounded-none border-none lg:border-none">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-bold animate-in slide-in-from-top-2">
                {error}
              </div>
            )}

            {!otpSent ? (
              <form onSubmit={handleInitialSubmit} className="space-y-4 lg:space-y-2">
                <div className="relative group">
                  <input
                    type="text"
                    required
                    id="fullname-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="appearance-none block w-full px-4 pr-10 h-[52px] lg:h-12 bg-slate-50 border border-slate-300 rounded-2xl placeholder-transparent text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-[#0026C0]/10 focus:border-[#0026C0] transition-all text-sm peer pt-5 pb-1"
                  />
                  <label 
                    htmlFor="fullname-input"
                    className="absolute left-4 top-2.5 text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] transition-all peer-placeholder-shown:text-[10px] peer-placeholder-shown:top-4 peer-focus:top-2.5 peer-focus:text-[8px]"
                  >
                    Full Name
                  </label>
                  {fullName && (
                    <Check className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 animate-in zoom-in duration-300" />
                  )}
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    required
                    id="email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="appearance-none block w-full px-4 pr-10 h-[52px] lg:h-12 bg-slate-50 border border-slate-300 rounded-2xl placeholder-transparent text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-[#0026C0]/10 focus:border-[#0026C0] transition-all text-sm peer pt-5 pb-1"
                  />
                  <label 
                    htmlFor="email-input"
                    className="absolute left-4 top-2.5 text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] transition-all peer-placeholder-shown:text-[10px] peer-placeholder-shown:top-4 peer-focus:top-2.5 peer-focus:text-[8px]"
                  >
                    Email Address
                  </label>
                  {email && email.includes('@') && (
                    <Check className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 animate-in zoom-in duration-300" />
                  )}
                </div>

                <div className="flex gap-2">
                  <div className="relative w-28 h-[52px] lg:h-12">
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
                    <div className="absolute inset-0 bg-slate-50 border border-slate-300 rounded-2xl px-3 flex items-center justify-between pointer-events-none transition-all group-focus-within:border-[#0026C0]">
                      <div className="flex flex-col leading-tight">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Code</span>
                        <span className="font-bold text-slate-800 text-xs">{country.flag} {country.code}</span>
                      </div>
                      <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[3px] border-t-slate-400"></div>
                    </div>
                  </div>
                  <div className="relative flex-1 group">
                    <input
                      required
                      id="phone-input"
                      className="w-full h-[52px] lg:h-12 bg-slate-50 border border-slate-300 rounded-2xl px-5 pt-5 pb-1 font-bold text-slate-800 focus:bg-white focus:border-[#0026C0] focus:ring-4 focus:ring-[#0026C0]/10 outline-none transition-all text-sm placeholder-transparent peer"
                      placeholder="Mobile Number"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <label 
                      htmlFor="phone-input"
                      className="absolute left-5 top-2.5 text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] transition-all peer-placeholder-shown:text-[10px] peer-placeholder-shown:top-4 peer-focus:top-2.5 peer-focus:text-[8px]"
                    >
                      Phone Number
                    </label>
                    {phoneNumber.length >= 8 && (
                      <Check className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 animate-in zoom-in duration-300" />
                    )}
                  </div>
                </div>
                <p className="mt-2 text-[10px] font-medium text-slate-400 flex items-center gap-1.5 ml-1">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Use your active Whatsapp. OTP will be sent for verification.
                </p>

                <div className="relative group">
                  <input
                    type="password"
                    required
                    id="password-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="appearance-none block w-full px-4 pr-10 h-[52px] lg:h-12 bg-slate-50 border border-slate-300 rounded-2xl placeholder-transparent text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-[#0026C0]/10 focus:border-[#0026C0] transition-all text-sm peer pt-5 pb-1"
                  />
                  <label 
                    htmlFor="password-input"
                    className="absolute left-4 top-2.5 text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] transition-all peer-placeholder-shown:text-[10px] peer-placeholder-shown:top-4 peer-focus:top-2.5 peer-focus:text-[8px]"
                  >
                    Password
                  </label>
                  {password.length >= 8 && (
                    <Check className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 animate-in zoom-in duration-300" />
                  )}
                </div>
                <p className="mt-2 text-[10px] font-medium text-slate-400 ml-1">
                  Must be at least 8 characters long.
                </p>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center h-11 lg:h-9 border border-transparent rounded-xl shadow-md shadow-[#0026C0]/10 text-sm font-black uppercase tracking-widest text-white bg-[#0026C0] hover:bg-[#001da2] focus:outline-none transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                  <p className="mt-6 text-center text-sm font-medium text-slate-500">
                    Already have an account?{' '}
                    <Link href="/login" className="font-black text-[#0026C0] hover:underline">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-6 lg:space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">
                    Enter 6-Digit OTP
                  </label>
                  <input
                    required
                    className="w-full h-16 bg-slate-50 border border-slate-400 rounded-2xl px-4 font-black text-center text-3xl tracking-[0.5em] text-slate-800 focus:bg-white focus:border-[#0026C0] focus:ring-4 focus:ring-[#0026C0]/10 outline-none transition-all"
                    placeholder="······"
                    maxLength={6}
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <div className="space-y-4 lg:space-y-3 pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center h-11 lg:h-10 border border-transparent rounded-xl shadow-md shadow-[#0026C0]/10 text-sm font-black uppercase tracking-widest text-white bg-[#0026C0] hover:bg-[#001da2] focus:outline-none transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Verify & Complete"
                    )}
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
            )}

          </div>
        </div>
      </div>
    </div>
  );
}