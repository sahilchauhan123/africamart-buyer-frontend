"use client";

import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { ChevronDown } from 'lucide-react';

export default function DesktopSearchResult({ searchQuery, onProductClick }: { searchQuery: string, onProductClick: (product: any) => void }) {
    const [priceRange, setPriceRange] = useState("");

    return (
        <div className="w-full flex gap-6 px-6 lg:px-8 py-6 max-w-[1600px] mx-auto">
            {/* Left Sidebar Filters */}
            <aside className="w-64 flex-shrink-0 flex flex-col gap-4">
                {/* Price Filter */}
                <div className="bg-white border border-slate-200 rounded sm:rounded-sm overflow-hidden">
                    <div className="bg-slate-100 px-4 py-3 flex justify-between items-center border-b border-slate-200">
                        <h3 className="font-bold text-slate-800 text-sm">Price</h3>
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                        {['Below $40', '$41 - $50', '$51 - $70', 'Above $71'].map(range => (
                            <label key={range} className="flex items-center gap-2 cursor-pointer group">
                                <input 
                                    type="radio" 
                                    name="price" 
                                    className="w-4 h-4 border-slate-300 text-[#0026C0] focus:ring-[#0026C0]" 
                                    checked={priceRange === range}
                                    onChange={() => setPriceRange(range)}
                                />
                                <span className="text-sm text-slate-700 group-hover:text-[#0026C0] transition-colors">{range}</span>
                            </label>
                        ))}
                        <div className="flex items-center gap-2 mt-2">
                            <input type="number" placeholder="$ Min" className="w-full bg-slate-50 border-slate-200 rounded p-1.5 text-xs outline-none focus:border-[#0026C0]" />
                            <span className="text-slate-400">-</span>
                            <input type="number" placeholder="$ Max" className="w-full bg-slate-50 border-slate-200 rounded p-1.5 text-xs outline-none focus:border-[#0026C0]" />
                            <button className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold px-3 py-1.5 rounded transition-colors">Go</button>
                        </div>
                    </div>
                </div>

                {/* Business Credentials Filter */}
                <div className="bg-white border border-slate-200 rounded sm:rounded-sm overflow-hidden">
                    <div className="bg-slate-100 px-4 py-3 flex justify-between items-center border-b border-slate-200">
                        <h3 className="font-bold text-slate-800 text-sm">Business Credentials</h3>
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 border-slate-300 text-[#0026C0] rounded-sm focus:ring-[#0026C0]" />
                            <span className="text-sm text-slate-700 group-hover:text-[#0026C0] transition-colors">Annual turnover $5M+</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 border-slate-300 text-[#0026C0] rounded-sm focus:ring-[#0026C0]" />
                            <span className="text-sm text-slate-700 group-hover:text-[#0026C0] transition-colors">Registered 3+ years</span>
                        </label>
                    </div>
                </div>

                {/* Location Filter */}
                <div className="bg-white border border-slate-200 rounded sm:rounded-sm overflow-hidden">
                    <div className="bg-slate-100 px-4 py-3 flex justify-between items-center border-b border-slate-200">
                        <h3 className="font-bold text-slate-800 text-sm">Filters</h3>
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="p-4">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 border-slate-300 text-[#0026C0] rounded-sm focus:ring-[#0026C0]" />
                            <span className="text-sm text-slate-700 group-hover:text-[#0026C0] transition-colors">Chicago-based Suppliers</span>
                        </label>
                    </div>
                </div>
            </aside>

            {/* Main Content Grid */}
            <main className="flex-1">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-900">
                        Showing results for <span className="text-[#0026C0]">"{searchQuery || 'All Products'}"</span>
                    </h2>
                    <span className="text-sm font-medium text-slate-500">1-24 of 1,240 results</span>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                    <ProductCard
                        name="Taujee Steam Mogra Basmati Rice 1121 (30 kg)"
                        price="$33"
                        unit="/ Kg"
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuCEvFQB1H88fuOka7yp8h49qObv55xA1cM6DKc7JIAZgAW7orn15wB_v3qPidwWKuzWeRACovWHghmMy9z_0m6eDQ6D-wCEVAYTqGLzJYDYx5Qcz80z-dZRZBVFzrnCxBLJuZVzJaLmmYmH9BMwTgl_SP4PrtIy-cT_TFFfhmuM6z3p5Odq5dslAFKgEvT6HTQIajdF_VHTmPM14TCJG5xU0LaTyOu7wezQl2N-cMr_i3YJYk8h8D6j8jbN1PHNfJInF62lsI9UQVE"
                        supplier="Bansal Enterprises"
                        location="Chicago, IL"
                        rating={4.8}
                        reviews="1.2k"
                        isVerified={true}
                        onClick={() => onProductClick({
                            name: "Taujee Steam Mogra Basmati Rice 1121 (30 kg)",
                            price: "$33",
                            unit: "/ Kg",
                            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEvFQB1H88fuOka7yp8h49qObv55xA1cM6DKc7JIAZgAW7orn15wB_v3qPidwWKuzWeRACovWHghmMy9z_0m6eDQ6D-wCEVAYTqGLzJYDYx5Qcz80z-dZRZBVFzrnCxBLJuZVzJaLmmYmH9BMwTgl_SP4PrtIy-cT_TFFfhmuM6z3p5Odq5dslAFKgEvT6HTQIajdF_VHTmPM14TCJG5xU0LaTyOu7wezQl2N-cMr_i3YJYk8h8D6j8jbN1PHNfJInF62lsI9UQVE",
                            supplier: "Bansal Enterprises",
                            location: "Chicago, IL",
                            rating: 4.8,
                            isVerified: true
                        })}
                    />
                    <ProductCard
                        name="Pristine Red Rice Pack (5 kg)"
                        price="$18"
                        unit="/ Pack"
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuBH550H-P9P5K5b6eG8q_0K4_lR5S8Q_yK7B3-H9B0G7-M8P0-b6B1E9Y1a5I7G8aX3X5B0Q8R6V5w8k5C7G6h7l3K3M2h6_w5D0U8p5J9s1U1l9K8n3P8p1u9h2S6T7Y6N5Q1P4I9l6k7n9T1U8h8k5L0s0Z91H2Q3N91l_l4G_l1L_2A2f9C6g5e9Q1O4-B6G-_0M0G_4L_7T8W2c7B90f_A8h_i6D7b3Z2N_2e_H1x_P2D-_A9I8t3-F9L-_F7T-_x-_H_A_9W-_"
                        supplier="Bhavina Food And Beverages"
                        location="Chicago, IL"
                        rating={4.9}
                        reviews="850"
                        isLocal={true}
                        onClick={() => onProductClick({
                            name: "Pristine Red Rice Pack (5 kg)",
                            price: "$18",
                            unit: "/ Pack",
                            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBH550H-P9P5K5b6eG8q_0K4_lR5S8Q_yK7B3-H9B0G7-M8P0-b6B1E9Y1a5I7G8aX3X5B0Q8R6V5w8k5C7G6h7l3K3M2h6_w5D0U8p5J9s1U1l9K8n3P8p1u9h2S6T7Y6N5Q1P4I9l6k7n9T1U8h8k5L0s0Z91H2Q3N91l_l4G_l1L_2A2f9C6g5e9Q1O4-B6G-_0M0G_4L_7T8W2c7B90f_A8h_i6D7b3Z2N_2e_H1x_P2D-_A9I8t3-F9L-_F7T-_x-_H_A_9W-_",
                            supplier: "Bhavina Food And Beverages",
                            location: "Chicago, IL",
                            rating: 4.9,
                            isLocal: true
                        })}
                    />
                    <ProductCard
                        name="Rice O India 1121 Basmati Rice, 30 kg"
                        price="$42"
                        unit="/ Bag"
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuCEvFQB1H88fuOka7yp8h49qObv55xA1cM6DKc7JIAZgAW7orn15wB_v3qPidwWKuzWeRACovWHghmMy9z_0m6eDQ6D-wCEVAYTqGLzJYDYx5Qcz80z-dZRZBVFzrnCxBLJuZVzJaLmmYmH9BMwTgl_SP4PrtIy-cT_TFFfhmuM6z3p5Odq5dslAFKgEvT6HTQIajdF_VHTmPM14TCJG5xU0LaTyOu7wezQl2N-cMr_i3YJYk8h8D6j8jbN1PHNfJInF62lsI9UQVE"
                        supplier="A.S Guglani Traders"
                        location="Springfield, IL"
                        rating={4.7}
                        reviews="430"
                        onClick={() => onProductClick({
                            name: "Rice O India 1121 Basmati Rice, 30 kg",
                            price: "$42",
                            unit: "/ Bag",
                            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEvFQB1H88fuOka7yp8h49qObv55xA1cM6DKc7JIAZgAW7orn15wB_v3qPidwWKuzWeRACovWHghmMy9z_0m6eDQ6D-wCEVAYTqGLzJYDYx5Qcz80z-dZRZBVFzrnCxBLJuZVzJaLmmYmH9BMwTgl_SP4PrtIy-cT_TFFfhmuM6z3p5Odq5dslAFKgEvT6HTQIajdF_VHTmPM14TCJG5xU0LaTyOu7wezQl2N-cMr_i3YJYk8h8D6j8jbN1PHNfJInF62lsI9UQVE",
                            supplier: "A.S Guglani Traders",
                            location: "Springfield, IL",
                            rating: 4.7
                        })}
                    />
                    <ProductCard
                        name="White Basmati Rice, Loose (Premium)"
                        price="$100"
                        unit="/ Kg"
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuCEvFQB1H88fuOka7yp8h49qObv55xA1cM6DKc7JIAZgAW7orn15wB_v3qPidwWKuzWeRACovWHghmMy9z_0m6eDQ6D-wCEVAYTqGLzJYDYx5Qcz80z-dZRZBVFzrnCxBLJuZVzJaLmmYmH9BMwTgl_SP4PrtIy-cT_TFFfhmuM6z3p5Odq5dslAFKgEvT6HTQIajdF_VHTmPM14TCJG5xU0LaTyOu7wezQl2N-cMr_i3YJYk8h8D6j8jbN1PHNfJInF62lsI9UQVE"
                        supplier="Nihal Chand Anil Kumar"
                        location="Peoria, IL"
                        rating={4.5}
                        reviews="2.1k"
                        isVerified={true}
                        onClick={() => onProductClick({
                            name: "White Basmati Rice, Loose (Premium)",
                            price: "$100",
                            unit: "/ Kg",
                            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEvFQB1H88fuOka7yp8h49qObv55xA1cM6DKc7JIAZgAW7orn15wB_v3qPidwWKuzWeRACovWHghmMy9z_0m6eDQ6D-wCEVAYTqGLzJYDYx5Qcz80z-dZRZBVFzrnCxBLJuZVzJaLmmYmH9BMwTgl_SP4PrtIy-cT_TFFfhmuM6z3p5Odq5dslAFKgEvT6HTQIajdF_VHTmPM14TCJG5xU0LaTyOu7wezQl2N-cMr_i3YJYk8h8D6j8jbN1PHNfJInF62lsI9UQVE",
                            supplier: "Nihal Chand Anil Kumar",
                            location: "Peoria, IL",
                            rating: 4.5,
                            isVerified: true
                        })}
                    />
                    
                     <ProductCard
                        name="Premium Fresh Farm Eggs"
                        price="$12.50"
                        unit="/ crate"
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuAgANGbe0k8YhJtNZGtOOmnyb83ndLzoL_y9ZzQBTtWd_Vk9v0DYCAvbYLN29EsJ2roxxttjp3WhFwBI1AEQkW6vXR7T54Ii8EzbY2xe9Sc1LUEhj8cQFjzYuKEcBT_dZxHWmovlsAtZbmpFKfF6hasJJ8sJhOyxFtEfAApViUkukc_L9MMFKO3wE5-RIcWo5w3aIUbgbjwKDyW4-5JNWmr7Fsc0RvPrWDPshXae61c_0AUxM54HjdFGmSqPoTXKcc0S8iUMI5XArQ"
                        supplier="Green Harvest Farms"
                        location="Springfield, IL"
                        rating={4.8}
                        reviews="1.2k"
                        isLocal={true}
                        onClick={() => onProductClick({
                            name: "Premium Fresh Farm Eggs",
                            price: "$12.50",
                            unit: "/ crate",
                            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgANGbe0k8YhJtNZGtOOmnyb83ndLzoL_y9ZzQBTtWd_Vk9v0DYCAvbYLN29EsJ2roxxttjp3WhFwBI1AEQkW6vXR7T54Ii8EzbY2xe9Sc1LUEhj8cQFjzYuKEcBT_dZxHWmovlsAtZbmpFKfF6hasJJ8sJhOyxFtEfAApViUkukc_L9MMFKO3wE5-RIcWo5w3aIUbgbjwKDyW4-5JNWmr7Fsc0RvPrWDPshXae61c_0AUxM54HjdFGmSqPoTXKcc0S8iUMI5XArQ",
                            supplier: "Green Harvest Farms",
                            location: "Springfield, IL",
                            rating: 4.8,
                            isLocal: true
                        })}
                    />
                    <ProductCard
                        name="Long Grain Basmati Rice"
                        price="$2.50"
                        unit="/ kg"
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuCEvFQB1H88fuOka7yp8h49qObv55xA1cM6DKc7JIAZgAW7orn15wB_v3qPidwWKuzWeRACovWHghmMy9z_0m6eDQ6D-wCEVAYTqGLzJYDYx5Qcz80z-dZRZBVFzrnCxBLJuZVzJaLmmYmH9BMwTgl_SP4PrtIy-cT_TFFfhmuM6z3p5Odq5dslAFKgEvT6HTQIajdF_VHTmPM14TCJG5xU0LaTyOu7wezQl2N-cMr_i3YJYk8h8D6j8jbN1PHNfJInF62lsI9UQVE"
                        supplier="Eastern Grains Ltd."
                        location="Indus Hub"
                        rating={4.5}
                        reviews="2.1k"
                        onClick={() => onProductClick({
                            name: "Long Grain Basmati Rice",
                            price: "$2.50",
                            unit: "/ kg",
                            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEvFQB1H88fuOka7yp8h49qObv55xA1cM6DKc7JIAZgAW7orn15wB_v3qPidwWKuzWeRACovWHghmMy9z_0m6eDQ6D-wCEVAYTqGLzJYDYx5Qcz80z-dZRZBVFzrnCxBLJuZVzJaLmmYmH9BMwTgl_SP4PrtIy-cT_TFFfhmuM6z3p5Odq5dslAFKgEvT6HTQIajdF_VHTmPM14TCJG5xU0LaTyOu7wezQl2N-cMr_i3YJYk8h8D6j8jbN1PHNfJInF62lsI9UQVE",
                            supplier: "Eastern Grains Ltd.",
                            location: "Indus Hub",
                            rating: 4.5
                        })}
                    />
                </div>
            </main>
        </div>
    );
}
