"use client";

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { fetchProducts } from '@/src/lib/api';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function DesktopSearchResult({
    searchQuery,
    initialProducts = [],
    initialFacets = [],
    initialQuery = ''
}: {
    searchQuery: string,
    initialProducts?: any[],
    initialFacets?: any[],
    initialQuery?: string
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Read selected attributes directly from the URL (Source of Truth)
    const selectedAttributes = searchParams.getAll('filters[attributes]');

    const [products, setProducts] = useState(initialProducts);
    const [facets, setFacets] = useState(initialFacets);
    const [isLoading, setIsLoading] = useState(false);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Function to update the URL with new filters
    const updateUrl = (newFilters: string[]) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('filters[attributes]');
        newFilters.forEach(attr => {
            params.append('filters[attributes]', attr);
        });

        const query = params.toString();
        const newUrl = `${pathname}${query ? `?${query}` : ''}`;
        router.push(newUrl, { scroll: false });
    };

    const toggleAttribute = (attr: string) => {
        const newFilters = selectedAttributes.includes(attr)
            ? selectedAttributes.filter(a => a !== attr)
            : [...selectedAttributes, attr];

        updateUrl(newFilters);
    };

    const clearAllFilters = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('filters[attributes]');
        router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false });
    };

    // Re-fetch when query or URL filters change
    useEffect(() => {
        const updateResults = async () => {
            // Skip initial fetch if it's the first render and we have initial data
            if (searchQuery === initialQuery && selectedAttributes.length === 0 && products.length > 0) return;

            setIsLoading(true);
            try {
                const result = await fetchProducts(searchQuery, { attributes: selectedAttributes });
                setProducts(result.products);
                setFacets(result.facets);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(updateResults, 100); // Faster response
        return () => clearTimeout(timer);
    }, [searchQuery, searchParams]); // Watch searchParams for changes


    // Group attributes by key AND FILTER OUT SELECTED ONES
    const attributeFacets = facets.find((f: any) => f.field_name === 'attributes')?.counts || [];
    const groupedAttributes = attributeFacets.reduce((acc: any, curr: any) => {
        // Skip if already selected
        if (selectedAttributes.includes(curr.value)) return acc;

        const [key, value] = curr.value.split('::');
        if (!acc[key]) acc[key] = [];
        acc[key].push({ value: curr.value, label: value, count: curr.count });
        return acc;
    }, {});




    // Accordion state - initialized with empty set (meaning all expanded)
    const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

    const toggleSection = (section: string) => {
        const next = new Set(collapsedSections);
        if (next.has(section)) next.delete(section);
        else next.add(section);
        setCollapsedSections(next);
    };

    return (
        <div className="w-full flex flex-col lg:flex-row items-start gap-6 px-4 lg:px-8 py-4 lg:py-6 max-w-[1600px] mx-auto min-h-screen">

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden w-full flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-4">
                <button
                    onClick={() => setShowMobileFilters(true)}
                    className="flex items-center gap-2 text-sm font-black text-slate-700 uppercase tracking-widest"
                >
                    <SlidersHorizontal className="w-4 h-4 text-[#0026C0]" />
                    Filters {selectedAttributes.length > 0 && `(${selectedAttributes.length})`}
                </button>
                <div className="h-4 w-px bg-slate-200"></div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort:</span>
                    <select className="bg-transparent text-[10px] font-black outline-none uppercase tracking-widest text-[#0026C0]">
                        <option>Relevance</option>
                        <option>Price</option>
                    </select>
                </div>
            </div>

            {/* Filters Sidebar/Modal */}
            <aside className={`
                ${showMobileFilters ? 'fixed inset-0 z-[100] bg-white p-6 overflow-y-auto' : 'hidden'}
                lg:static lg:block lg:w-64 lg:flex-shrink-0 flex flex-col gap-4 lg:bg-transparent
            `}>
                <div className="lg:hidden flex items-center justify-between mb-6 shrink-0 border-b border-slate-100 pb-4">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Filters</h2>
                        <p className="text-[12px] font-bold text-slate-600 tracking-widest mt-0.5">Find goods by your desires.</p>
                    </div>
                    <button
                        onClick={() => setShowMobileFilters(false)}
                        className="w-10 h-10 bg-slate-50 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Mobile Reset All (Top) */}
                {selectedAttributes.length > 0 && (
                    <div className="lg:hidden mb-6 flex items-center justify-between bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                        <span className="text-xs font-bold text-[#0026C0]">{selectedAttributes.length} filter{selectedAttributes.length > 1 ? 's' : ''} applied</span>
                        <button
                            onClick={clearAllFilters}
                            className="text-[10px] font-black text-[#0026C0] uppercase tracking-widest bg-white px-3 py-1.5 rounded-lg shadow-sm border border-blue-100"
                        >
                            Reset All
                        </button>
                    </div>
                )}
                {/* Active Filters */}
                {selectedAttributes.length > 0 && (
                    <div className="bg-white border border-slate-200 rounded-xl lg:rounded-sm p-4 shadow-sm mb-4 shrink-0">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-black text-slate-800 text-[10px] lg:text-xs uppercase tracking-widest">Active Filters</h3>
                            <button
                                onClick={clearAllFilters}
                                className="text-[10px] font-black text-[#0026C0] uppercase tracking-widest hover:underline"
                            >
                                Clear All
                            </button>

                        </div>
                        <div className="flex flex-wrap gap-2">
                            {selectedAttributes.map(attr => {
                                const [key, value] = attr.split('::');
                                return (
                                    <span
                                        key={attr}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleAttribute(attr);
                                        }}
                                        className="bg-blue-50 text-[#0026C0] text-[10px] font-bold px-2.5 py-1.5 rounded-full border border-blue-100 flex items-center gap-1.5 cursor-pointer hover:bg-blue-600 hover:text-white hover:border-blue-700 transition-all group"
                                    >
                                        {value}
                                        <span className="text-blue-300 group-hover:text-white font-black">✕</span>
                                    </span>
                                );
                            })}
                        </div>

                    </div>
                )}

                {/* Dynamic Attribute Filters */}
                {Object.keys(groupedAttributes).map(category => {
                    const isCollapsed = collapsedSections.has(category);
                    return (
                        <div key={category} className="bg-white border border-slate-300 lg:border-slate-200 rounded-xl lg:rounded-sm overflow-hidden shadow-sm lg:shadow-none mb-4 lg:mb-0 shrink-0">
                            <div
                                onClick={() => toggleSection(category)}
                                className="bg-slate-50 lg:bg-slate-100 px-4 py-3.5 lg:py-3 flex justify-between items-center border-b border-slate-300 lg:border-slate-200 cursor-pointer group/header"
                            >
                                <h3 className="font-black text-slate-800 text-[10px] lg:text-sm uppercase tracking-widest group-hover/header:text-[#0026C0] transition-colors">{category}</h3>
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isCollapsed ? '-rotate-90' : 'rotate-0'}`} />
                            </div>
                            {!isCollapsed && (
                                <div className="p-4 flex flex-col gap-3 lg:gap-2.5">
                                    {groupedAttributes[category].map((attr: any) => (
                                        <label key={attr.value} className="flex items-center justify-between group cursor-pointer">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    className="w-5 h-5 lg:w-4 lg:h-4 border-slate-300 text-[#0026C0] rounded-lg lg:rounded-sm focus:ring-[#0026C0]"
                                                    checked={selectedAttributes.includes(attr.value)}
                                                    onChange={() => toggleAttribute(attr.value)}
                                                />
                                                <span className="text-sm font-bold lg:font-medium text-slate-700 group-hover:text-[#0026C0] transition-colors">{attr.label}</span>
                                            </div>
                                            <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 lg:px-1.5 lg:py-0.5 rounded-lg border border-slate-100">{attr.count}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Categories Placeholder */}
                <div className="bg-white border border-slate-300 lg:border-slate-200 rounded-xl lg:rounded-sm overflow-hidden shadow-sm lg:shadow-none shrink-0">
                    <div
                        onClick={() => toggleSection('Main Categories')}
                        className="bg-slate-50 lg:bg-slate-100 px-4 py-3.5 lg:py-3 flex justify-between items-center border-b border-slate-300 lg:border-slate-200 cursor-pointer group/header"
                    >
                        <h3 className="font-black text-slate-800 text-[10px] lg:text-sm uppercase tracking-widest group-hover/header:text-[#0026C0] transition-colors">Main Categories</h3>
                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${collapsedSections.has('Main Categories') ? '-rotate-90' : 'rotate-0'}`} />
                    </div>
                    {!collapsedSections.has('Main Categories') && (
                        <div className="p-4 flex flex-col gap-4 lg:gap-3">
                            {facets.find((f: any) => f.field_name === 'category_name')?.counts.map((c: any) => (
                                <div key={c.value} className="flex items-center justify-between text-sm font-bold lg:font-medium text-slate-600 hover:text-[#0026C0] cursor-pointer group">
                                    <span className="group-hover:translate-x-1 transition-transform">{c.value}</span>
                                    <span className="text-[10px] font-black text-slate-400">{c.count}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {showMobileFilters && (
                    <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 z-[110] shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
                        <button
                            onClick={() => setShowMobileFilters(false)}
                            className="w-full py-4 bg-[#0026C0] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-[#0026C0]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            Show {products.length} Results
                        </button>
                    </div>
                )}
            </aside>

            {/* Main Content Grid */}
            <main className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-lg lg:text-xl font-black text-slate-900 tracking-tight">
                            Results for <span className="text-[#0026C0]">"{searchQuery === '*' ? 'All Products' : (searchQuery || 'All Products')}"</span>
                        </h1>
                        <p className="text-[10px] lg:text-sm text-slate-400 font-black uppercase tracking-widest mt-0.5">Found {products.length} matching products</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Sort By:</span>
                        <select className="bg-white border border-slate-200 text-xs font-black p-2.5 rounded-lg outline-none focus:border-[#0026C0] shadow-sm">
                            <option>Relevance</option>
                            <option>Newest First</option>
                            <option>Price: Low to High</option>
                        </select>
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="bg-white h-72 rounded border border-slate-100"></div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                        {products.map((product, idx) => (
                            <ProductCard
                                key={product.id || idx}
                                {...product}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <SlidersHorizontal className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No matching products found</h3>
                        <p className="text-slate-500 text-sm mt-1">Try resetting your filters or using a different search term.</p>
                        <button
                            onClick={clearAllFilters}
                            className="mt-6 text-[#0026C0] font-bold text-sm hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
