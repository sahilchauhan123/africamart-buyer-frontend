"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex flex-wrap items-center gap-y-1.5 gap-x-2 text-[11px] lg:text-[13px] font-bold text-slate-500 mb-4 lg:mb-6" aria-label="Breadcrumb">
      <Link 
        href="/" 
        className="flex items-center gap-1.5 hover:text-[#0026C0] transition-colors"
      >
        <Home className="w-3 h-3" />
        Home
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
          {item.href ? (
            <Link 
              href={item.href} 
              className="hover:text-[#0026C0] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900" aria-current="page">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
