import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, ChevronDown, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchForm() {
    const [isFocused, setIsFocused] = useState(false);
    const [locationQuery, setLocationQuery] = useState('');
    const [locations, setLocations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Debounce logic for search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (locationQuery.length > 2) {
                fetchLocations(locationQuery);
            } else {
                setLocations([]);
                setShowDropdown(false);
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [locationQuery]);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchLocations = async (query: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=in&limit=5`
            );
            const data = await response.json();
            setLocations(data);
            setShowDropdown(true);
        } catch (error) {
            console.error('Error fetching locations:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLocationSelect = (displayName: string) => {
        setLocationQuery(displayName);
        setShowDropdown(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className={`bg-white p-4 rounded-xl shadow-2xl max-w-3xl mx-auto transform transition-all duration-300 ${isFocused ? '-translate-y-2 shadow-marigold-500/20' : 'hover:-translate-y-1'}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        >
            <form className="flex flex-col md:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                {/* Service Input */}
                <div className="relative flex-grow group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="text-gray-400 group-focus-within:text-marigold-500 transition-colors" size={20} />
                    </div>
                    <select
                        className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-marigold-500 focus:border-marigold-500 sm:text-sm appearance-none text-gray-700 font-medium cursor-pointer transition-shadow"
                        defaultValue=""
                    >
                        <option value="" disabled>I'm looking for...</option>
                        <option value="venue">Wedding Venues / Lawns</option>
                        <option value="catering">Catering & Food Stalls</option>
                        <option value="tent">Tent & Decor</option>
                        <option value="makeup">Bridal Makeup</option>
                        <option value="photo">Photography & Video</option>
                        <option value="ghodi">Ghodi & Band Baaja</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDown className="text-gray-400" size={16} />
                    </div>
                </div>

                {/* Location Input */}
                <div className="relative flex-grow group" ref={dropdownRef}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="text-gray-400 group-focus-within:text-marigold-500 transition-colors" size={20} />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-marigold-500 focus:border-marigold-500 sm:text-sm transition-shadow"
                        placeholder="City or Pin Code (e.g. Delhi, 110001)"
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                        onFocus={() => {
                            if (locations.length > 0) setShowDropdown(true);
                        }}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {isLoading ? (
                            <Loader2 className="text-marigold-500 animate-spin" size={20} />
                        ) : null}
                    </div>

                    {/* Autocomplete Dropdown */}
                    <AnimatePresence>
                        {showDropdown && locations.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 max-h-60 overflow-y-auto"
                            >
                                {locations.map((location, index) => (
                                    <button
                                        key={index}
                                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-marigold-50 transition-colors border-b border-gray-50 last:border-b-0 flex items-start gap-2"
                                        onClick={() => handleLocationSelect(location.display_name)}
                                    >
                                        <MapPin size={16} className="mt-0.5 text-gray-400 flex-shrink-0" />
                                        <span className="line-clamp-2">{location.display_name}</span>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="bg-marigold-500 hover:bg-marigold-600 text-white font-bold py-3 px-8 rounded-lg transition duration-200 shadow-lg flex items-center justify-center gap-2 active:scale-95"
                >
                    <span>Search</span>
                    <ArrowRight size={18} />
                </button>
            </form>
        </motion.div>
    );
}
