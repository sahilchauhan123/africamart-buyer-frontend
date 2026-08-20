"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2 } from 'lucide-react';
import { COUNTRY_CODES } from '@/src/constants/constanst';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../logo.png';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { buyerGoogleLogin, buyerGoogleRegister } from '@/src/lib/api';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";

export default function LoginPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState(COUNTRY_CODES[121]); // Default Liberia
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [needsPhone, setNeedsPhone] = useState(false);
  const [googleToken, setGoogleToken] = useState("");

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    setError("");
    const token = credentialResponse.credential;

    try {
      const res = await buyerGoogleLogin(token);
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('buyer', JSON.stringify(data.data.buyer));
        console.log("data", data)
        window.location.href = '/';
      } else if (res.status === 404) {
        setGoogleToken(token);
        setNeedsPhone(true);
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const phone_no = `${country.code} ${phoneNumber}`;
      const res = await buyerGoogleRegister(googleToken, phone_no, fullName);
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('buyer', JSON.stringify(data.data.buyer));
        window.location.href = '/';
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
            © 2026 Lasomaa. We connect Indian Businesses to the Buyers.
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 bg-slate-50 lg:bg-white relative">
          <div className="sm:mx-auto sm:w-full sm:max-w-md lg:max-w-[320px] lg:pt-8">
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
              {needsPhone ? "Complete Profile" : "Welcome"}
            </h2>
            <p className="mt-1 text-xs lg:text-sm font-medium text-slate-500">
              {needsPhone ? "Please enter your phone number to continue." : "Login or create an account to continue."}
            </p>
          </div>

          <div className="mt-6 lg:mt-0 sm:mx-auto sm:w-full sm:max-w-md lg:max-w-[320px]">
            <div className="lg:bg-transparent py-2 lg:py-8 lg:px-0 shadow-none lg:shadow-none sm:rounded-none lg:rounded-none border-none lg:border-none">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-bold animate-in slide-in-from-top-2">
                  {error}
                </div>
              )}

              {!needsPhone ? (
                <div className="flex flex-col items-center pt-4">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError("Google Sign-In failed")}
                    useOneTap
                    shape="pill"
                    size="large"
                  />
                  <p className="mt-6 text-center text-sm font-medium text-slate-500">
                    New here? Don't worry, we'll create an account for you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePhoneSubmit} className="space-y-4 lg:space-y-4">
                  <div className="relative group">
                    <input
                      required
                      className="w-full h-[52px] lg:h-12 bg-slate-50 border border-slate-300 rounded-2xl px-5 pt-5 pb-1 font-bold text-slate-900 placeholder-transparent focus:bg-white focus:border-[#0026C0] focus:ring-4 focus:ring-[#0026C0]/10 outline-none transition-all sm:text-sm peer"
                      placeholder="Full Name"
                      type="text"
                      value={fullName}
                      id="name-input"
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <label
                      htmlFor="name-input"
                      className="absolute left-5 top-2.5 text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] transition-all peer-placeholder-shown:text-[10px] peer-placeholder-shown:top-4 peer-focus:top-2.5 peer-focus:text-[8px]"
                    >
                      Full Name
                    </label>
                  </div>
                  <div className="relative group">
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
                          <div className="flex flex-col">
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Code</span>
                            <span className="font-bold text-slate-800 text-xs">{country.flag} {country.code}</span>
                          </div>
                          <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[3px] border-t-slate-400"></div>
                        </div>
                      </div>
                      <div className="relative flex-1 group">
                        <input
                          required
                          className="w-full h-[52px] lg:h-12 bg-slate-50 border border-slate-300 rounded-2xl px-5 pt-5 pb-1 font-bold text-slate-900 placeholder-transparent focus:bg-white focus:border-[#0026C0] focus:ring-4 focus:ring-[#0026C0]/10 outline-none transition-all sm:text-sm peer"
                          placeholder="Mobile Number"
                          type="tel"
                          value={phoneNumber}
                          id="phone-input"
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
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex justify-center items-center h-11 lg:h-9 border border-transparent rounded-xl shadow-md shadow-[#0026C0]/10 text-sm font-black uppercase tracking-widest text-white bg-[#0026C0] hover:bg-[#001da2] focus:outline-none transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        "Complete Registration"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}