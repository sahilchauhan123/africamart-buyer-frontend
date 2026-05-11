import React from 'react';
import { fetchSubCategoriesBySlug, fetchCategoryBySlug, fetchProductsByCategorySlug, createSlug } from '@/src/lib/api';
import Breadcrumbs from '../../components/Breadcrumbs';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import { Metadata } from 'next';

export async function generateMetadata({ params }: SubCategoryPageProps): Promise<Metadata> {
    const { path: rawPath } = await params;
    const path = rawPath.map(segment => decodeURIComponent(segment));
    const currentSlug = path[path.length - 1];
    const category = await fetchCategoryBySlug(currentSlug);
    
    const name = category?.name || currentSlug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    
    return {
        title: `${name} | Category`,
        description: `Browse all products and sub-categories in ${name} on Lasomaa Marketplace.`,
        alternates: {
            canonical: `https://www.lasomaa.com/categories/${path.join('/')}`,
        },
    };
}

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

    let products: any[] = [];
    if (subCategories.length === 0) {
        products = await fetchProductsByCategorySlug(currentSlug);
    }

    const basePath = `/categories/${path.join('/')}`;
    const categoryName = currentCategory?.name || currentSlug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

    // Build breadcrumb items
    const breadcrumbItems = [
        { label: 'All Categories', href: '/categories' },
        ...path.map((segment, index) => {
            const url = `/categories/${path.slice(0, index + 1).join('/')}`;
            const isLast = index === path.length - 1;
            const name = (isLast && currentCategory?.name) ? currentCategory.name : segment.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
            return {
                label: name,
                href: isLast ? undefined : url
            };
        })
    ];

    return (
        <div className="bg-slate-50 min-h-screen font-body">
            <main className="max-w-[1600px] mx-auto px-4 lg:px-8 py-6 lg:py-8 transition-all duration-500">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="mb-6 lg:mb-8 text-left">
                    <h1 className="text-xl lg:text-3xl font-extrabold text-slate-900 mb-2 lg:mb-4 tracking-tight">
                        {subCategories.length === 0 ? `Businesses Selling ${categoryName}` : categoryName}
                    </h1>
                    <p className={`text-slate-500 text-sm font-medium ${subCategories.length === 0 ? 'hidden lg:block' : ''}`}>
                        {subCategories.length === 0 
                            ? "Click on goods to see more details about it before contacting the business owner."
                            : `You are viewing ${categoryName.toLowerCase()} goods categories.`}
                    </p>
                </div>
                {subCategories.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {subCategories.map((sub: any) => (
                            <Link
                                key={sub.id}
                                href={`${basePath}/${sub.slug}`}
                                className="group bg-white rounded-md p-2.5 border border-slate-200 transition-all duration-300 flex flex-col gap-3 hover:border-[#0026C0]"
                            >
                                <div className="w-full aspect-square rounded-sm bg-slate-50 overflow-hidden relative shrink-0">
                                    <img
                                        src={sub.img_url || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80'}
                                        alt={sub.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <span className="font-bold text-slate-900 group-hover:text-[#0026C0] transition-colors line-clamp-1 tracking-tight text-xs lg:text-sm px-0.5">
                                    {sub.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="pt-2">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                            {products.map((product: any) => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </div>
                    </div>
                ) : (
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
