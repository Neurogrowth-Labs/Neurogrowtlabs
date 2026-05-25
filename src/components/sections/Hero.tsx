import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WorldMap3D from '../three/WorldMap3D';
import RobotScene from '../three/RobotScene';

export default function HeroSection() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 800], [0.6, 0]);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* 3D Environment */}
      <motion.div 
        style={{ y: heroY, opacity: heroOpacity }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <WorldMap3D />
        <RobotScene />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center text-center gap-8 w-full"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-ai-cyan text-sm tracking-wide font-medium backdrop-blur-md">
            <Zap className="w-4 h-4" />
            <span>The Intelligence Layer for the Modern Economy</span>
          </div>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter mb-6 leading-[1.05] drop-shadow-2xl text-white">
              Building Africa’s <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ai-cyan via-electric-blue to-violet-glow glow-text">Intelligent Digital Future</span>
            </h1>
            <p className="text-lg md:text-xl text-quantum-silver mb-10 leading-relaxed max-w-2xl mx-auto font-light">
              AI infrastructure, enterprise systems, fintech innovation, and next-generation digital ecosystems engineered for the future.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 shrink-0 w-full">
            <button 
              onClick={() => document.getElementById('platforms')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-3.5 text-sm bg-white text-midnight-black font-semibold rounded-full hover:bg-electric-blue hover:text-white hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300 flex items-center justify-center gap-2 flex-nowrap shrink-0"
            >
              Explore Ecosystem <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate('/portal')}
              className="w-full sm:w-auto px-8 py-3.5 text-sm bg-glass-surface border border-glass-border text-white font-medium rounded-full hover:bg-white/10 hover:border-electric-blue/50 transition-all duration-300 flex items-center justify-center gap-2 flex-nowrap shrink-0"
            >
              Book Consultation <ChevronRight className="w-4 h-4" />
            </button>
            <button 
               onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
               className="w-full sm:w-auto px-8 py-3.5 text-sm bg-transparent text-quantum-silver font-medium rounded-full hover:text-white transition-all duration-300 flex items-center justify-center flex-nowrap shrink-0"
            >
              Launch Products
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative gradient floor */}
      <div className="absolute bottom-0 w-full h-[30vh] bg-gradient-to-t from-midnight-black via-midnight-black/80 to-transparent pointer-events-none z-0" />
    </section>
  );
}
