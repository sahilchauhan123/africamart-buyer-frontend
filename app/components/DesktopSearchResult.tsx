"use client";

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

export default function DesktopSearchResult({
    searchQuery,
    onProductClick,
    initialProducts = [],
    initialFacets = [],
    initialQuery = ''
}: {
    searchQuery: string,
    onProductClick: (product: any) => void,
    initialProducts?: any[],
    initialFacets?: any[],
    initialQuery?: string
}) {
    const [products, setProducts] = useState(initialProducts);
    const [facets, setFacets] = useState(initialFacets);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Re-fetch when query or filters change
    useEffect(() => {
        const updateResults = async () => {
            // Skip initial fetch if it's the first render and we have initial data
            if (searchQuery === initialQuery && selectedAttributes.length === 0 && products.length > 0) return;

            setIsLoading(true);
            try {
                let url = `http://localhost:4000/api/v1/search/unprotected/products?query=${encodeURIComponent(searchQuery)}`;

                // Add attribute filters
                selectedAttributes.forEach(attr => {
                    url += `&filters[attributes]=${encodeURIComponent(attr)}`;
                });

                const res = await fetch(url);
                const data = await res.json();

                const fetchedProducts = data.data?.hits?.map((hit: any) => {
                    const doc = hit.document;
                    const images = doc.picture_url?.map((p: any) => p.img_url) || [];
                    return {
                        ...doc,
                        image: images.length > 0 ? images[0] : null,
                        price: doc.min_price ? `₹${doc.min_price}` : 'Price on request',
                        unit: doc.unit || 'Piece',
                        name: doc.title,
                        supplier: doc.seller_name || 'Verified Supplier',
                        location: doc.city && doc.country ? `${doc.city}, ${doc.country}` : doc.seller_location || 'India',
                    };
                }) || [];

                setProducts(fetchedProducts);
                if (data.data?.facet_counts) setFacets(data.data.facet_counts);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(updateResults, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, selectedAttributes]);

    // Group attributes by key (e.g. "Color:Red" -> "Color" category)
    const attributeFacets = facets.find((f: any) => f.field_name === 'attributes')?.counts || [];
    const groupedAttributes = attributeFacets.reduce((acc: any, curr: any) => {
        const [key, value] = curr.value.split(':');
        if (!acc[key]) acc[key] = [];
        acc[key].push({ value: curr.value, label: value, count: curr.count });
        return acc;
    }, {});

    const toggleAttribute = (attr: string) => {
        setSelectedAttributes(prev =>
            prev.includes(attr) ? prev.filter(a => a !== attr) : [...prev, attr]
        );
    };

    return (
        <div className="w-full flex flex-col lg:flex-row gap-6 px-4 lg:px-8 py-4 lg:py-6 max-w-[1600px] mx-auto min-h-screen">

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm sticky top-20 z-40">
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
                <div className="lg:hidden flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Filters</h2>
                    <button
                        onClick={() => setShowMobileFilters(false)}
                        className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-black"
                    >
                        ✕
                    </button>
                </div>

                {/* Dynamic Attribute Filters */}
                {Object.keys(groupedAttributes).map(category => (
                    <div key={category} className="bg-white border border-slate-200 rounded-xl lg:rounded-sm overflow-hidden shadow-sm lg:shadow-none mb-4 lg:mb-0">
                        <div className="bg-slate-50 lg:bg-slate-100 px-4 py-3.5 lg:py-3 flex justify-between items-center border-b border-slate-200">
                            <h3 className="font-black text-slate-800 text-[10px] lg:text-sm uppercase tracking-widest">{category}</h3>
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </div>
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
                    </div>
                ))}

                {/* Categories Placeholder */}
                <div className="bg-white border border-slate-200 rounded-xl lg:rounded-sm overflow-hidden shadow-sm lg:shadow-none">
                    <div className="bg-slate-50 lg:bg-slate-100 px-4 py-3.5 lg:py-3 flex justify-between items-center border-b border-slate-200">
                        <h3 className="font-black text-slate-800 text-[10px] lg:text-sm uppercase tracking-widest">Main Categories</h3>
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="p-4 flex flex-col gap-4 lg:gap-3">
                        {facets.find((f: any) => f.field_name === 'category_name')?.counts.map((c: any) => (
                            <div key={c.value} className="flex items-center justify-between text-sm font-bold lg:font-medium text-slate-600 hover:text-[#0026C0] cursor-pointer group">
                                <span className="group-hover:translate-x-1 transition-transform">{c.value}</span>
                                <span className="text-[10px] font-black text-slate-400">{c.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {showMobileFilters && (
                    <div className="mt-8 flex gap-4">
                        <button
                            onClick={() => { setSelectedAttributes([]); setShowMobileFilters(false); }}
                            className="flex-1 py-4 border border-slate-200 rounded-xl font-black text-xs uppercase tracking-widest text-slate-600"
                        >
                            Reset
                        </button>
                        <button
                            onClick={() => setShowMobileFilters(false)}
                            className="flex-1 py-4 bg-[#0026C0] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl"
                        >
                            Apply Filters
                        </button>
                    </div>
                )}
            </aside>

            {/* Main Content Grid */}
            <main className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                    <div>
                        <h2 className="text-lg lg:text-xl font-black text-slate-900 tracking-tight">
                            Results for <span className="text-[#0026C0]">"{searchQuery || 'All Products'}"</span>
                        </h2>
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
                                onClick={() => onProductClick(product)}
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
                            onClick={() => setSelectedAttributes([])}
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
