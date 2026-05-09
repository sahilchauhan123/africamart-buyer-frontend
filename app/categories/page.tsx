import React from 'react';
import { fetchCategories } from '@/src/lib/api';
import Header from '../components/Header';
import Breadcrumbs from '../components/Breadcrumbs';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'All Product Categories',
    description: 'Browse all categories of goods available on Lasomaa. Find everything from raw materials to finished products.',
    alternates: {
        canonical: 'https://www.lasomaa.com/categories',
    },
};

export const revalidate = 3600;

export default async function CategoriesPage() {
    const categories = await fetchCategories();

    const breadcrumbItems = [
        { label: 'All Categories' }
    ];

    return (
        <div className="bg-slate-50 min-h-screen font-body">
            <Header />
            <main className="max-w-[1600px] mx-auto px-4 lg:px-8 py-6 lg:py-8 transition-all duration-500">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="mb-6 lg:mb-8 lg:text-left">
                    <h1 className="text-xl lg:text-3xl font-extrabold text-slate-900 mb-2 lg:mb-4 tracking-tight">All Category of Goods</h1>
                    <p className="text-slate-500 text-sm lg:text-lg font-medium">Browse through all categories of goods available. Sure to find what you need.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {categories.map((category: any) => (
                        <Link
                            key={category.id}
                            href={category.is_leaf ? `/search?q=${encodeURIComponent(category.name)}` : `/categories/${category.slug}`}
                            className="group bg-white rounded-md p-2.5 border border-slate-200 transition-all duration-300 flex flex-col gap-3 hover:border-[#0026C0]"
                        >
                            <div className="w-full aspect-square rounded-sm bg-slate-50 overflow-hidden relative shrink-0">
                                <img
                                    src={category.img_url || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80'}
                                    alt={category.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <span className="font-bold text-slate-900 group-hover:text-[#0026C0] transition-colors line-clamp-1 tracking-tight text-xs lg:text-sm px-0.5">
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
