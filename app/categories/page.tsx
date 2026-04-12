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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {categories.map((category: any) => (
                        <Link
                            key={category.id}
                            href={category.is_leaf ? `/search?q=${encodeURIComponent(category.name)}` : `/categories/${category.slug}`}
                            className="group bg-white rounded-2xl p-4 lg:p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                        >
                            <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 lg:mb-6 relative">
                                <img
                                    src={category.img_url}
                                    alt={category.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <h2 className="text-lg lg:text-xl font-black text-slate-800 group-hover:text-[#0026C0] transition-colors mb-2 uppercase tracking-wide">
                                {category.name}
                            </h2>
                            <div className="flex items-center gap-2 text-slate-400 group-hover:text-[#0026C0] transition-colors font-bold text-[10px] lg:text-xs uppercase tracking-widest mt-auto">
                                {category.is_leaf ? 'Shop Now' : 'View Subcategories'} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
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
