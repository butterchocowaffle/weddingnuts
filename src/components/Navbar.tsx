import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  logo?: React.ReactNode;
}

export default function Navbar({ logo }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="absolute w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="shrink-0 flex items-center group cursor-pointer">
            <a href="#" aria-label="WeddingNuts Home" className="flex items-center gap-2 transform transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-105">
              {/* Programmable Logo */}
              {logo}
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold text-white tracking-wide leading-none">
                  Wedding<span className="text-marigold-400">Nuts</span>
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-white hover:text-marigold-400 transition font-medium">Venues</a>
            <a href="#" className="text-white hover:text-marigold-400 transition font-medium">Vendors</a>
            <a href="#" className="text-white hover:text-marigold-400 transition font-medium">Real Weddings</a>
            <a href="#" className="text-white hover:text-marigold-400 transition font-medium">Blog</a>
            <a
              href="#"
              className="bg-white/10 border border-white/30 hover:bg-white hover:text-royalPink-600 text-white px-4 py-2 rounded-full transition text-sm font-semibold backdrop-blur-sm"
            >
              Are you a Vendor?
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-marigold-400 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white shadow-xl absolute w-full top-20 left-0 z-50 border-t border-gray-100"
          >
            <div className="px-4 pt-2 pb-4 space-y-1 flex flex-col">
              <a href="#" className="block px-3 py-3 text-gray-800 font-medium hover:bg-royalPink-50 hover:text-royalPink-600 rounded-lg transition-colors">
                Venues
              </a>
              <a href="#" className="block px-3 py-3 text-gray-800 font-medium hover:bg-royalPink-50 hover:text-royalPink-600 rounded-lg transition-colors">
                Vendors
              </a>
              <a href="#" className="block px-3 py-3 text-gray-800 font-medium hover:bg-royalPink-50 hover:text-royalPink-600 rounded-lg transition-colors">
                Real Weddings
              </a>
              <a href="#" className="block px-3 py-3 text-royalPink-600 font-bold border-t border-gray-100 mt-2 pt-4">
                Vendor Login
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
