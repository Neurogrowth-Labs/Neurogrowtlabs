import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Hexagon, Moon, Sun } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-6 transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div 
        className={`flex items-center justify-between w-full max-w-6xl rounded-2xl border px-6 transition-all duration-500 backdrop-blur-xl ${
          scrolled 
            ? 'bg-midnight-black/80 border-glass-border shadow-2xl py-3' 
            : 'bg-transparent border-transparent py-4'
        }`}
      >
        <Link to="/" className="flex items-center gap-2 group">
          <Hexagon className="w-8 h-8 text-electric-blue group-hover:text-violet-glow transition-all duration-300" />
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">Neurogrowth Labs</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => { navigate('/about'); window.scrollTo(0,0); }} className="text-sm font-medium text-quantum-silver hover:text-white transition-colors">About</button>
          <button onClick={() => { navigate('/platforms'); window.scrollTo(0,0); }} className="text-sm font-medium text-quantum-silver hover:text-white transition-colors">Ecosystem</button>
          <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('infrastructure')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-sm font-medium text-quantum-silver hover:text-white transition-colors">Infrastructure</button>
          <button onClick={() => { navigate('/partner'); window.scrollTo(0,0); }} className="text-sm font-medium text-quantum-silver hover:text-white transition-colors">Partner</button>
          <button onClick={() => { navigate('/contact'); window.scrollTo(0,0); }} className="text-sm font-medium text-quantum-silver hover:text-white transition-colors">Contact</button>
          
          <button onClick={toggleTheme} className="w-8 h-8 rounded-full border border-glass-border flex items-center justify-center text-quantum-silver hover:text-white hover:bg-white/5 transition-colors">
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
