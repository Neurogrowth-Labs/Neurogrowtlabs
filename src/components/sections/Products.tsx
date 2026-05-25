import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Brain, Network, Shield, Building2, Landmark, Activity, Sparkles, Layers } from 'lucide-react';

const platforms = [
  { 
    name: 'AfriTranslate Studio', 
    desc: 'AI-powered language intelligence platform enabling seamless communication across African and global markets.', 
    icon: Globe,
    capabilities: ['Real-time multilingual translation', 'AI localization tools', 'Enterprise communication systems', 'Digital knowledge translation']
  },
  { 
    name: 'AfriTrade OS', 
    desc: 'A digital trade operating system designed to power cross-border commerce and logistics intelligence.', 
    icon: Network,
    capabilities: ['Trade data intelligence', 'Customs optimization', 'Digital supply chain orchestration', 'Trade finance integration']
  },
  { 
    name: 'AfriProperty', 
    desc: 'An AI-powered real estate and land intelligence platform for governments, developers, and investors.', 
    icon: Building2,
    capabilities: ['Property data infrastructure', 'Digital land registry systems', 'Asset intelligence', 'Real estate analytics']
  },
  { 
    name: 'AgriShield AI', 
    desc: 'A smart agricultural intelligence system that protects food ecosystems and increases productivity.', 
    icon: Shield,
    capabilities: ['Crop monitoring AI', 'Predictive yield analytics', 'Agricultural risk management', 'Food security intelligence']
  },
  { 
    name: 'Lunova', 
    desc: 'An AI-powered luxury ecommerce platform redefining high fashion jewelry sales through intelligent personalization and discovery.', 
    icon: Sparkles,
    capabilities: ['AI-driven jewelry discovery', 'Luxury ecommerce engine', 'Personalized style intelligence', 'High fashion trend analytics']
  },
  { 
    name: 'RescueBot AI', 
    desc: 'An advanced AI system designed to support emergency response and disaster management.', 
    icon: Activity,
    capabilities: ['Emergency intelligence', 'Rescue coordination AI', 'Crisis monitoring systems', 'Public safety analytics']
  },
  { 
    name: 'IPO OS', 
    desc: 'An intelligent capital markets platform helping companies prepare for and navigate public offerings.', 
    icon: Landmark,
    capabilities: ['IPO readiness analytics', 'Financial intelligence systems', 'Compliance automation', 'Investor reporting tools', 'Private investment access']
  },
  { 
    name: 'Cogni Sacra', 
    desc: 'The most powerful AI education infrastructure — connecting students with private training while enabling academic institutions to scale.', 
    icon: Brain,
    capabilities: ['AI-powered student-tutor matching', 'Institutional global expansion engine', 'Zero-cost digital campus infrastructure', 'World-class online education delivery']
  }
];

const HolographicCard = ({ platform, index }: { platform: any, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.05 : 1,
        zIndex: isHovered ? 10 : 1,
      }}
      className="group relative p-8 rounded-2xl bg-glass-surface hover:bg-white/5 border border-glass-border hover:border-electric-blue/50 transition-all duration-300 overflow-hidden flex flex-col"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-electric-blue/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none z-20 transition-opacity duration-300" 
        style={{
          transform: `translateZ(1px) translate(${rotateY * 2}px, ${rotateX * 2}px)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-violet-glow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="transform-gpu transition-all duration-300 group-hover:scale-105" style={{ transform: 'translateZ(30px)' }}>
        <platform.icon className="w-10 h-10 text-electric-blue group-hover:text-violet-glow transition-colors duration-300 mb-6 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(123,97,255,0.8)]" />
        <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-electric-blue transition-colors duration-300">{platform.name}</h3>
        <p className="text-sm text-quantum-silver leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{platform.desc}</p>
      </div>
      
      <div 
        className="mt-4 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-64 transition-all duration-500 transform-gpu overflow-hidden"
        style={{ transform: 'translateZ(40px)' }}
      >
        <div className="pt-4 border-t border-glass-border">
          <span className="text-xs font-mono text-electric-blue uppercase tracking-wider">Core Capabilities</span>
          <ul className="mt-2 space-y-1 text-xs text-quantum-silver">
            {platform.capabilities.map((cap: string, idx: number) => (
              <li key={idx}>• {cap}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProductsSection() {
  return (
    <section id="products" className="py-32 px-6 bg-deep-charcoal relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex flex-col items-center">
             <Layers className="w-8 h-8 text-ai-cyan mb-4" />
             <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Platform Ecosystem</h2>
             <p className="text-quantum-silver text-lg max-w-3xl mx-auto">
               Next-generation operating systems and artificial intelligence primitives engineered for scale, reliability, and unparalleled performance.
             </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {platforms.map((platform, index) => (
            <HolographicCard key={platform.name} platform={platform} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
