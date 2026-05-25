import React from 'react';
import { Link } from 'react-router-dom';
import { Hexagon, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-midnight-black pt-20 pb-10 px-6 border-t border-glass-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <Hexagon className="w-8 h-8 text-electric-blue group-hover:text-violet-glow transition-colors" />
              <span className="text-xl font-bold tracking-tight text-white">Neurogrowth Labs</span>
            </Link>
            <p className="text-quantum-silver text-sm leading-relaxed mb-6">
              Building the intelligence layer for the modern economy. Headquartered in Cape Town, shaping the future globally.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-graphite-grey border border-glass-border flex items-center justify-center text-quantum-silver hover:text-white hover:border-electric-blue transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-graphite-grey border border-glass-border flex items-center justify-center text-quantum-silver hover:text-white hover:border-electric-blue transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-graphite-grey border border-glass-border flex items-center justify-center text-quantum-silver hover:text-white hover:border-electric-blue transition-all">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Ecosystem</h4>
            <ul className="space-y-4">
              <li><a href="https://studio.afritranslate.co.za" target="_blank" rel="noopener noreferrer" className="text-quantum-silver hover:text-ai-cyan text-sm transition-colors">AfriTranslate Studio</a></li>
              <li><a href="https://afritradeos.co.za" target="_blank" rel="noopener noreferrer" className="text-quantum-silver hover:text-ai-cyan text-sm transition-colors">AfriTrade OS</a></li>
              <li><a href="https://afriestate.co.za" target="_blank" rel="noopener noreferrer" className="text-quantum-silver hover:text-ai-cyan text-sm transition-colors">AfriEstate</a></li>
              <li><a href="https://cgwastedata.co.za" target="_blank" rel="noopener noreferrer" className="text-quantum-silver hover:text-ai-cyan text-sm transition-colors">CG Waste Data</a></li>
              <li><a href="#" className="text-quantum-silver hover:text-ai-cyan text-sm transition-colors">RescueBot AI</a></li>
              <li><a href="#" className="text-quantum-silver hover:text-ai-cyan text-sm transition-colors">IBOS</a></li>
              <li><a href="#" className="text-quantum-silver hover:text-ai-cyan text-sm transition-colors">NGX AfriQuant</a></li>
              <li><a href="#" className="text-quantum-silver hover:text-ai-cyan text-sm transition-colors">Health AI</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-quantum-silver hover:text-ai-cyan text-sm transition-colors" onClick={() => window.scrollTo(0,0)}>About</Link></li>
              <li><a href="#services" className="text-quantum-silver hover:text-ai-cyan text-sm transition-colors">Services</a></li>
              <li><a href="#infrastructure" className="text-quantum-silver hover:text-ai-cyan text-sm transition-colors">Infrastructure</a></li>
              <li><Link to="/careers" className="text-quantum-silver hover:text-ai-cyan text-sm transition-colors" onClick={() => window.scrollTo(0,0)}>Careers</Link></li>
              <li><Link to="/contact" className="text-quantum-silver hover:text-ai-cyan text-sm transition-colors" onClick={() => window.scrollTo(0,0)}>Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Legal</h4>
            <ul className="space-y-4">
              <li><Link to="/privacy-policy" className="text-quantum-silver hover:text-ai-cyan text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-quantum-silver hover:text-ai-cyan text-sm transition-colors">Terms of Service</Link></li>
              <li><Link to="/ai-ethics" className="text-quantum-silver hover:text-ai-cyan text-sm transition-colors">AI Ethics</Link></li>
              <li><Link to="/cookie-policy" className="text-quantum-silver hover:text-ai-cyan text-sm transition-colors">Cookie Policy</Link></li>
              <li><Link to="/dpa" className="text-quantum-silver hover:text-ai-cyan text-sm transition-colors">DPA</Link></li>
              <li><Link to="/security-policy" className="text-quantum-silver hover:text-ai-cyan text-sm transition-colors">Security Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-glass-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-quantum-silver text-xs">
            © {new Date().getFullYear()} NeuroGrowth Labs. All rights reserved. Cape Town, ZA.
          </p>
          <div className="flex gap-4">
            <span className="text-quantum-silver text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ai-cyan animate-pulse" /> 
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
