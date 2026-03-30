import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin, ChevronRight, Globe } from 'lucide-react';

interface RegionSearchProps {
    onBack: () => void;
}

const RegionSearch: React.FC<RegionSearchProps> = ({ onBack }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const regions = [
        { name: 'West Africa', countries: ['Nigeria', 'Ghana', 'Senegal', 'Ivory Coast'] },
        { name: 'East Africa', countries: ['Kenya', 'Tanzania', 'Uganda', 'Rwanda'] },
        { name: 'Southern Africa', countries: ['South Africa', 'Zimbabwe', 'Zambia'] },
        { name: 'North Africa', countries: ['Egypt', 'Morocco', 'Algeria'] },
        { name: 'Central Africa', countries: ['Cameroon', 'Angola', 'DR Congo'] },
    ];

    const popularCountries = ['Nigeria', 'Kenya', 'South Africa', 'Ghana'];

    return (
        <div className="min-h-screen bg-[#f3f6fa] flex flex-col">
            <header className="bg-white px-4 py-4 flex items-center gap-4 sticky top-0 z-50 border-b border-gray-100">
                <button
                    onClick={onBack}
                    className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors active:scale-95"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <div className="flex-1">
                    <h1 className="text-xl font-black text-gray-900 leading-none">Region Search</h1>
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-1">Find suppliers by location</p>
                </div>
            </header>

            <main className="flex-1 p-4 mb-safe space-y-6">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for a country or region..."
                        className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue/30 transition-all outline-none shadow-sm"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                {!searchQuery && (
                    <section>
                        <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Popular Destinations</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {popularCountries.map(country => (
                                <button
                                    key={country}
                                    className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:border-brand-blue/30 hover:shadow-md transition-all group active:scale-95"
                                >
                                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-gray-900 text-sm group-hover:text-brand-blue transition-colors">{country}</span>
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                <section>
                    <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Browse Regions</h2>
                    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                        {regions.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.countries.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))).map((region, index, arr) => (
                            <div key={region.name} className={`${index !== arr.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                <div className="p-4 flex items-center justify-between group cursor-pointer hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-brand-blue/10 group-hover:text-brand-blue transition-colors">
                                            <Globe className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-sm">{region.name}</h3>
                                            <p className="text-xs text-gray-400 mt-0.5 font-medium">{region.countries.join(', ')}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        ))}
                        {regions.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.countries.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))).length === 0 && (
                            <div className="p-8 text-center text-gray-500 text-sm font-medium">
                                No regions or countries found matching "{searchQuery}"
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default RegionSearch;
