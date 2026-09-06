import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center px-4 py-12 lg:py-20 relative overflow-hidden">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-2xl w-full mx-auto text-center">
        {/* 404 Number and Page Not Found */}
        <div className="mb-6">
          <h1 className="text-8xl sm:text-9xl font-black tracking-tight text-[#042c9c] select-none leading-none">
            404
          </h1>
          <h2 className="mt-4 text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Page Not Found
          </h2>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
          The page you requested might have been moved, deleted, or the URL might be mistyped.
        </p>

        {/* Action Button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#002068] hover:bg-[#001850] text-white font-medium text-sm shadow-sm hover:shadow transition-all active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

