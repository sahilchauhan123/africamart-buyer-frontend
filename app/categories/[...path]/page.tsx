import React from 'react';
import { fetchSubCategoriesBySlug, fetchCategoryBySlug } from '@/src/lib/api';
import Header from '../../components/Header';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ShoppingBag } from 'lucide-react';

export const revalidate = 3600;

interface SubCategoryPageProps {
    params: Promise<{ path: string[] }>;
}

export default async function SubCategoryPage({ params }: SubCategoryPageProps) {
    const { path: rawPath } = await params;
    const path = rawPath.map(segment => decodeURIComponent(segment));
    const currentSlug = path[path.length - 1];

    // Fetch current category info and its subcategories in parallel
    const [currentCategory, subCategories] = await Promise.all([
        fetchCategoryBySlug(currentSlug),
        fetchSubCategoriesBySlug(currentSlug)
    ]);

    const basePath = `/categories/${path.join('/')}`;
    const categoryName = currentCategory?.name || currentSlug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

    return (
        <div className="bg-slate-50 min-h-screen font-body">
            <Header />
            <main className="max-w-[1200px] mx-auto p-4 sm:p-6 transition-all duration-500">
                <Link
                    href={path.length > 1 ? `/categories/${path.slice(0, -1).join('/')}` : "/categories"}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-[#0026C0] font-bold text-[10px] uppercase tracking-widest mb-4 sm:mb-8 group transition-colors"
                >
                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" /> Back
                </Link>

                <div className="mb-8 sm:mb-12">
                    <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2 sm:mb-4">{categoryName}</h1>
                    <p className="text-slate-500 text-sm sm:text-lg font-medium">Narrow down your search by selecting a specific sector.</p>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-6">
                    {subCategories.map((sub: any) => (
                        <Link
                            key={sub.id}
                            href={sub.is_leaf ? `/search?q=${encodeURIComponent(sub.name)}` : `${basePath}/${sub.slug}`}
                            className="group bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#0026C0]/20 transition-all duration-500 flex flex-col items-center text-center gap-2 sm:gap-4"
                        >
                            <div className="w-full aspect-square rounded-lg sm:rounded-xl bg-slate-50 overflow-hidden relative shrink-0 shadow-inner">
                                <img
                                    src={sub.img_url || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80'}
                                    alt={sub.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <span className="font-bold text-slate-800 group-hover:text-[#0026C0] transition-colors line-clamp-2 uppercase tracking-tight text-[8px] sm:text-xs">
                                {sub.name}
                            </span>
                        </Link>
                    ))}
                </div>

                {subCategories.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
                        <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 font-bold text-lg">Looking for something specific in {categoryName}?</p>
                        <Link href={`/search?q=${encodeURIComponent(categoryName)}`} className="bg-[#0026C0] text-white font-black mt-6 px-8 py-3 rounded-xl inline-flex items-center gap-2 hover:bg-[#001da2] transition-all shadow-lg active:scale-95">
                            Search All Products
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
