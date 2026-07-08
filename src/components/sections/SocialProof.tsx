import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Network, Globe, Lock, Shield } from 'lucide-react';

const partners = [
  { icon: Wallet, name: "Fintech Infrastructure" },
  { icon: Network, name: "Pan-African Infrastructure" },
  { icon: Globe, name: "Intra Trade & Global Trade" },
  { icon: Lock, name: "Cybersecurity" },
  { icon: Shield, name: "Defense and Disaster Response" },
];

export default function SocialProofSection() {
  return (
    <section className="py-24 px-6 bg-midnight-black border-t border-glass-border overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        
        <div className="lg:w-1/3">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
             <div className="inline-block px-3 py-1 rounded-full bg-violet-glow/10 border border-violet-glow/20 text-violet-glow text-xs font-mono uppercase tracking-widest mb-4">
               Trust & Scale
             </div>
             <h2 className="text-3xl font-bold text-white mb-4">
               The Africa AI Infrastructure Ecosystem
             </h2>
             <p className="text-quantum-silver text-sm leading-relaxed">
               Our highly qualified executives are open to provide high value technological capacity programs, advisory and AI infrastructure projects development for governments, national-scale institutions, and elite enterprises with AI powered intelligent decision making and automation ecosystem.
             </p>
           </motion.div>
        </div>

        <div className="lg:w-2/3 w-full relative">
           <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-midnight-black to-transparent z-10 pointer-events-none" />
           <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-midnight-black to-transparent z-10 pointer-events-none" />
           
           {/* Auto-scrolling logo track */}
           <div className="flex overflow-hidden">
              <motion.div 
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                className="flex gap-12 pr-12 whitespace-nowrap min-w-max items-center"
              >
                {/* Duplicate the array to create a seamless loop */}
                {[...partners, ...partners].map((partner, idx) => (
                  <div key={idx} className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                     <partner.icon className="w-8 h-8 text-quantum-silver" />
                     <span className="text-lg font-bold text-quantum-silver tracking-tight">{partner.name}</span>
                  </div>
                ))}
              </motion.div>
           </div>
        </div>

      </div>
    </section>
  );
}
