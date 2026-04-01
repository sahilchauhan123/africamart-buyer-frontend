import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin, ChevronRight, Globe } from 'lucide-react';

interface RegionSearchProps {
    onBack: () => void;
}

const RegionSearch: React.FC<RegionSearchProps> = ({ onBack }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const [showAfricanRegions, setShowAfricanRegions] = useState(false);

    const liberianLocations = ['Monrovia', 'Gbarnga', 'Buchanan', 'Kakata', 'Ganta', 'Harper'];

    const regions = [
        { name: 'West Africa', countries: ['Nigeria', 'Ghana', 'Senegal', 'Ivory Coast'] },
        { name: 'East Africa', countries: ['Kenya', 'Tanzania', 'Uganda', 'Rwanda'] },
        { name: 'Southern Africa', countries: ['South Africa', 'Zimbabwe', 'Zambia'] },
        { name: 'North Africa', countries: ['Egypt', 'Morocco', 'Algeria'] },
        { name: 'Central Africa', countries: ['Cameroon', 'Angola', 'DR Congo'] },
    ];

    return (
        <div className="min-h-screen bg-[#f3f6fa] flex flex-col font-display">
            <header className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors active:scale-95"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-black text-gray-900 leading-none tracking-tight">Search Location</h1>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1.5">Liberia & Africa</p>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-5 mb-safe space-y-8 overflow-y-auto">
                <div className="relative group">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search city or region..."
                        className="w-full bg-white border-2 border-transparent rounded-[24px] py-4.5 pl-13 pr-4 text-[15px] font-bold text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-brand-blue/30 transition-all outline-none shadow-xl shadow-slate-200/50"
                    />
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5.5 h-5.5 text-brand-blue group-focus-within:scale-110 transition-transform" />
                </div>

                {!searchQuery && (
                    <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-4 h-4 text-brand-blue" />
                            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Liberia Locations</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {liberianLocations.map(location => (
                                <button
                                    key={location}
                                    className="bg-white border-b-4 border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border-brand-blue/20 hover:translate-y-[-2px] hover:shadow-lg transition-all active:scale-95 active:translate-y-0"
                                >
                                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <span className="font-bold text-slate-900 text-sm">{location}</span>
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                <section className="pb-10">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-brand-blue" />
                            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">African Regions</h2>
                        </div>
                        
                        <label className="flex items-center cursor-pointer group">
                            <span className="mr-3 text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-brand-blue transition-colors">Regional Search</span>
                            <div className="relative">
                                <input 
                                    type="checkbox" 
                                    className="sr-only" 
                                    checked={showAfricanRegions}
                                    onChange={() => setShowAfricanRegions(!showAfricanRegions)}
                                />
                                <div className={`w-10 h-5 rounded-full transition-colors duration-300 ${showAfricanRegions ? 'bg-brand-blue' : 'bg-slate-200'}`}></div>
                                <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-300 transform ${showAfricanRegions ? 'translate-x-5' : ''}`}></div>
                            </div>
                        </label>
                    </div>

                    {showAfricanRegions ? (
                        <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50 animate-in zoom-in-95 fade-in duration-300">
                            {regions.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.countries.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))).map((region, index, arr) => (
                                <div key={region.name} className={`${index !== arr.length - 1 ? 'border-b border-slate-50' : ''}`}>
                                    <div className="p-5 flex items-center justify-between group cursor-pointer hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-blue/10 group-hover:text-brand-blue transition-all">
                                                <Globe className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-[15px]">{region.name}</h3>
                                                <p className="text-xs text-slate-400 mt-1 font-medium">{region.countries.join(', ')}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-brand-blue/5 border border-dashed border-brand-blue/20 rounded-3xl p-8 text-center animate-in fade-in duration-300">
                            <Globe className="w-8 h-8 text-brand-blue/30 mx-auto mb-3" />
                            <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-wider">
                                Activate "Regional Search" to browse <br/> suppliers across Africa
                            </p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default RegionSearch;
