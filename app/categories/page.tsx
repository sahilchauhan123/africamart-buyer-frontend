import React from 'react';
import { fetchCategories } from '@/src/lib/api';
import Header from '../components/Header';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const revalidate = 3600;

export default async function CategoriesPage() {
    const categories = await fetchCategories();

    return (
        <div className="bg-slate-50 min-h-screen font-body">
            <Header />
            <main className="max-w-[1200px] mx-auto p-4 lg:p-6 transition-all duration-500">
                <div className="mb-8 lg:mb-12 text-center lg:text-left">
                    <h1 className="text-2xl lg:text-4xl font-black text-slate-900 tracking-tight mb-2 lg:mb-4">Explore Categories</h1>
                    <p className="text-slate-500 text-sm lg:text-lg font-medium">Connect with verified manufacturers across all major sectors.</p>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-6">
                    {categories.map((category: any) => (
                        <Link
                            key={category.id}
                            href={category.is_leaf ? `/search?q=${encodeURIComponent(category.name)}` : `/categories/${category.slug}`}
                            className="group bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#0026C0]/20 transition-all duration-500 flex flex-col items-center text-center gap-2 sm:gap-4"
                        >
                            <div className="w-full aspect-square rounded-lg sm:rounded-xl bg-slate-50 overflow-hidden relative shrink-0 shadow-inner">
                                <img
                                    src={category.img_url || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80'}
                                    alt={category.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <span className="font-bold text-slate-800 group-hover:text-[#0026C0] transition-colors line-clamp-2 uppercase tracking-tight text-[8px] sm:text-xs">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>

                {categories.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
                        <p className="text-slate-400 font-bold text-lg">No categories found.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
