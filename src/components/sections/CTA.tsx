import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-32 px-6 bg-deep-charcoal relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-midnight-black pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="p-12 md:p-20 rounded-3xl bg-glass-surface border border-glass-border relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 via-transparent to-violet-glow/10" />
          
          <Sparkles className="w-10 h-10 text-ai-cyan mx-auto mb-8" />
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to Build the Future?
          </h2>
          <p className="text-lg text-quantum-silver mb-10 max-w-2xl mx-auto">
            Join the organizations accelerating their digital transformation with NeuroGrowth Labs. 
            Deploy sovereign AI, intelligent infrastructure, and world-class enterprise systems today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-midnight-black font-semibold rounded-full hover:bg-electric-blue hover:text-white hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore Our Platforms <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate('/portal')}
              className="px-8 py-4 bg-transparent border border-glass-border text-white font-medium rounded-full hover:bg-white/5 transition-all duration-300 flex items-center justify-center"
            >
              Partner With Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
