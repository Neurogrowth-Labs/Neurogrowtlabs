import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { Globe, Brain, Network, Shield, Building2, Landmark, Activity, Fingerprint, ChevronRight, ArrowRight, Cpu, Zap, Factory, User, Sparkles, Database, Server, Code, Layers } from 'lucide-react';
import NeuralNetwork from '../components/three/NeuralNetwork';
import WorldMap3D from '../components/three/WorldMap3D';
import RobotScene from '../components/three/RobotScene';
import DataCenter from '../components/three/DataCenter';

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
    capabilities: ['IPO readiness analytics', 'Financial intelligence systems', 'Compliance automation', 'Investor reporting tools', 'Private investment access for SMEs']
  },
  { 
    name: 'Cogni Sacra', 
    desc: 'The most powerful AI education infrastructure — connecting students with private training while enabling academic institutions to scale globally with zero operational overhead.', 
    icon: Brain,
    capabilities: ['AI-powered student-tutor matching', 'Institutional global expansion engine', 'Zero-cost digital campus infrastructure', 'World-class online education delivery']
  }
];

const industries = [
  { name: 'Governments', desc: 'Digital infrastructure and national intelligence systems.' },
  { name: 'Financial Institutions', desc: 'AI-powered capital markets and economic intelligence.' },
  { name: 'Agriculture', desc: 'Technology for resilient and intelligent food systems.' },
  { name: 'Trade and Logistics', desc: 'Advanced systems for global commerce.' },
  { name: 'Real Estate', desc: 'AI platforms transforming property markets.' },
  { name: 'Emergency Services', desc: 'Public safety and disaster response technologies.' }
];

const leaders = [
  { name: 'Lusimadio S Simao, MBA', role: 'Founder & Chief Executive Officer', desc: 'Visionary entrepreneur building AI platforms designed to accelerate global economic transformation.' },
  { name: 'Linford Musiyambodza', role: 'Co-Founder & Chief Technology Officer', desc: 'Architect of large-scale distributed systems and enterprise AI platforms.' },
  { name: 'Nguyen Van Hoang', role: 'Co-Founder & Chief Technology Officer', desc: 'Specialist in scalable infrastructure engineering and advanced software systems.' },
  { name: 'Muhammad Nur Ismanto', role: 'Co-Founder & Chief Technology Officer', desc: 'Technology leader focused on deep AI innovation and intelligent enterprise platforms.' }
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

  const handleMouseEnter = () => {
    setIsHovered(true);
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
      onMouseEnter={handleMouseEnter}
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
        className="mt-4 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-64 transition-all duration-500 transform-gpu"
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

export default function Landing() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 800], [0.6, 0]);
  const platformsY = useTransform(scrollY, [0, 2000], [0, 200]);
  const globalVisionY = useTransform(scrollY, [0, 5000], [0, 400]);
  const neuralY = useTransform(scrollY, [0, 5000], [0, 800]);

  return (
    <div className="bg-midnight-black min-h-screen text-white overflow-hidden selection:bg-electric-blue selection:text-black">
      <motion.div style={{ y: neuralY }} className="fixed inset-0 z-0 pointer-events-none">
        <NeuralNetwork />
      </motion.div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-glass-border bg-midnight-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-electric-blue to-violet-glow animate-pulse-slow shadow-[0_0_15px_rgba(0,229,255,0.5)]" />
            <span className="font-sans font-bold text-xl tracking-tight">NeuroGrowth Labs</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-quantum-silver">
            <a href="#platforms" className="hover:text-electric-blue transition-colors">Platforms</a>
            <a href="#industries" className="hover:text-electric-blue transition-colors">Industries</a>
            <a href="#technology" className="hover:text-electric-blue transition-colors">Technology</a>
            <button 
              onClick={() => navigate('/portal')}
              className="px-4 py-1.5 text-xs rounded-full bg-glass-surface border border-electric-blue/50 text-electric-blue hover:bg-electric-blue hover:text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300"
            >
              Access Portal
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Futuristic 3D Globe & Humanoid Background */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        >
          <WorldMap3D />
          <RobotScene />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-row items-center justify-between gap-8 w-full"
          >
            <div className="text-left max-w-3xl flex-1">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 leading-[1.1] drop-shadow-2xl">
                AI Infrastructure for <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-violet-glow">Nations and Enterprises</span>
              </h1>
              <p className="text-base md:text-lg text-quantum-silver mb-0 leading-relaxed">
                Advanced operating systems that power intelligent economies. NeuroGrowth Labs develops AI-powered enterprise operating systems that transform how governments and organizations operate, scale, and compete in a digital world.
              </p>
            </div>
            <div className="flex flex-row items-center justify-end gap-3 shrink-0">
              <button 
                onClick={() => navigate('/portal')}
                className="px-4 py-2 text-xs bg-electric-blue text-black font-semibold rounded-full hover:bg-white hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Explore Platforms <ArrowRight className="w-3 h-3" />
              </button>
              <button className="px-4 py-2 text-xs bg-glass-surface border border-violet-glow text-white font-semibold rounded-full hover:bg-violet-glow/20 hover:shadow-[0_0_30px_rgba(138,43,226,0.4)] transition-all duration-300 whitespace-nowrap">
                Request Partnership
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST SECTION / POWERING THE FUTURE */}
      <section className="py-20 relative z-10 bg-midnight-black/80 backdrop-blur-md border-y border-glass-border">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-electric-blue mb-6">A $4B AI Infrastructure Company</h2>
          <p className="text-lg text-quantum-silver max-w-4xl mx-auto mb-12 leading-relaxed">
            NeuroGrowth Labs is a global technology company designing next-generation AI platforms and enterprise operating systems for governments, corporations, and national-scale institutions. Our systems power intelligent decision-making, automation, and digital transformation across industries.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-glass-border bg-glass-surface rounded-2xl shadow-[0_0_20px_rgba(0,229,255,0.1)]">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">$4B</div>
              <div className="text-electric-blue font-mono text-sm uppercase tracking-widest">Valuation</div>
            </div>
            <div className="p-6 border border-glass-border bg-glass-surface rounded-2xl shadow-[0_0_20px_rgba(123,97,255,0.1)]">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">8</div>
              <div className="text-violet-glow font-mono text-sm uppercase tracking-widest">AI Platforms</div>
            </div>
            <div className="p-6 border border-glass-border bg-glass-surface rounded-2xl shadow-[0_0_20px_rgba(0,255,102,0.1)]">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">Global</div>
              <div className="text-ai-green font-mono text-sm uppercase tracking-widest">Multi-industry Impact</div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR MISSION */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Empowering Nations and Enterprises with Artificial Intelligence</h2>
            <p className="text-xl text-quantum-silver leading-relaxed">
              Our mission is to build the intelligence layer for the modern economy. Through advanced AI systems, enterprise automation, and scalable digital infrastructure, we help organizations unlock new levels of performance, efficiency, and growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PLATFORM ECOSYSTEM */}
      <section id="platforms" className="py-32 relative bg-deep-space-blue border-y border-glass-border overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          style={{ y: platformsY }}
          className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center"
        >
          <Network className="w-[800px] h-[800px] text-electric-blue" />
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Platform Ecosystem</h2>
            <p className="text-quantum-silver max-w-2xl mx-auto text-lg">8 AI platforms. Multi-industry impact. The digital nervous system for modern organizations.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform, i) => (
              <HolographicCard key={platform.name} platform={platform} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Industry Impact</h2>
            <p className="text-quantum-silver max-w-2xl mx-auto text-lg">NeuroGrowth Labs technologies serve multiple industries.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 border-l-2 border-glass-border hover:border-electric-blue bg-glass-surface rounded-r-2xl transition-colors duration-300 group"
              >
                <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-electric-blue transition-colors">{ind.name}</h3>
                <p className="text-quantum-silver">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section id="technology" className="py-32 relative bg-graphite-grey/30 border-y border-glass-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Technology Infrastructure</h2>
            <p className="text-quantum-silver text-lg mb-8">
              Our platforms are built on a powerful AI infrastructure stack. Core layers include:
            </p>
            <ul className="space-y-4">
              {['Machine learning systems', 'Predictive analytics engines', 'Distributed data architecture', 'Enterprise security frameworks', 'Cloud-native scalability'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-electric-blue font-mono text-sm">
                  <Server className="w-5 h-5" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2 w-full h-[400px] relative flex items-end justify-center gap-4">
            <DataCenter />
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Product Ecosystem Architecture</h2>
          <p className="text-quantum-silver max-w-2xl mx-auto text-lg mb-16">We are building the digital infrastructure layer of modern economies.</p>
          
          <div className="flex flex-col items-center justify-center space-y-8 font-mono text-sm relative group">
            {/* Interactive Flow Lines */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <motion.path d="M50%,10% L50%,90%" stroke="var(--color-electric-blue)" strokeWidth="2" strokeDasharray="5 5" fill="none"
                  animate={{ strokeDashoffset: [0, -50] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                <motion.path d="M20%,40% L80%,40%" stroke="var(--color-violet-glow)" strokeWidth="2" strokeDasharray="5 5" fill="none"
                  animate={{ strokeDashoffset: [0, 50] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
              </svg>
            </div>

            <motion.div 
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 229, 255, 0.4)", y: -5 }}
              className="relative z-10 px-12 py-6 border border-electric-blue bg-electric-blue/10 rounded-xl text-electric-blue font-bold tracking-widest uppercase cursor-pointer transition-all duration-300"
            >
              NeuroGrowth AI Core
            </motion.div>
            
            <div className="w-px h-12 bg-glass-border relative z-10" />
            
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-between relative z-10">
              {[
                { id: 'engines', name: 'Intelligence Engines' },
                { id: 'data', name: 'Data Layer Infrastructure' },
                { id: 'automation', name: 'Automation Systems' }
              ].map((layer) => (
                <motion.div 
                  key={layer.id}
                  whileHover={{ y: -10, boxShadow: "0 0 30px rgba(138, 43, 226, 0.3)" }}
                  className="flex-1 p-6 border border-glass-border bg-glass-surface text-gray-300 rounded-xl cursor-pointer transition-all duration-300 text-center hover:border-violet-glow hover:text-white"
                >
                  {layer.name}
                </motion.div>
              ))}
            </div>
            
            <div className="w-px h-12 bg-glass-border relative z-10" />
            
            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 0 40px rgba(255, 255, 255, 0.1)" }}
              className="w-full max-w-4xl p-8 border border-glass-border bg-glass-surface rounded-2xl relative z-10 transition-all duration-300 cursor-pointer text-center hover:border-white/30"
            >
              <h3 className="mb-6 uppercase tracking-widest text-white">Platform Ecosystem</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {platforms.map(p => (
                  <span 
                    key={p.name} 
                    className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-400 text-xs transition-colors duration-300 hover:bg-white/20 hover:text-white hover:border-white/30"
                  >
                    {p.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="py-32 relative bg-deep-space-blue border-y border-glass-border">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight text-center">Leadership</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {leaders.map((leader, i) => (
              <motion.div
                key={leader.name}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl bg-glass-surface border border-glass-border backdrop-blur-xl relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-electric-blue to-violet-glow opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-2xl font-bold mb-2 text-white">{leader.name}</h3>
                <p className="text-electric-blue font-mono text-sm mb-4">{leader.role}</p>
                <p className="text-quantum-silver">{leader.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL VISION & CALL TO ACTION */}
      <section className="py-40 relative overflow-hidden">
        {/* Massive Glowing Neural Brain Background */}
        <motion.div 
          style={{ y: globalVisionY }}
          className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none"
        >
          <Brain className="w-[800px] h-[800px] text-electric-blue animate-pulse-slow" />
        </motion.div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl text-electric-blue font-mono mb-6 uppercase tracking-widest">Global Vision</h3>
            <p className="text-xl text-quantum-silver mb-12 leading-relaxed">
              The next generation of economic growth will be powered by intelligent digital systems. NeuroGrowth Labs is building the technology platforms that will power that future.
            </p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 drop-shadow-2xl">
              Build the Future with <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-violet-glow">NeuroGrowth Labs</span>
            </h2>
            <p className="text-lg text-quantum-silver mb-12">
              Partner with us to create intelligent systems that transform industries, governments, and economies.
            </p>
            <div className="flex flex-row items-center justify-center gap-3 mt-12">
              <button 
                onClick={() => navigate('/portal')}
                className="px-4 py-2 text-xs bg-electric-blue text-black font-semibold rounded-full hover:bg-white hover:shadow-[0_0_30px_rgba(0,229,255,0.8)] transition-all duration-300 whitespace-nowrap"
              >
                Request Partnership
              </button>
              <button className="px-4 py-2 text-xs bg-glass-surface border border-violet-glow text-white font-semibold rounded-full hover:bg-violet-glow/20 hover:shadow-[0_0_30px_rgba(138,43,226,0.6)] transition-all duration-300 whitespace-nowrap">
                Explore Platforms
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-glass-border pt-20 pb-10 bg-midnight-black overflow-hidden">
        {/* Glowing Neural Network Animation in Footer */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <path d="M0,100 Q250,50 500,100 T1000,100" fill="none" stroke="var(--color-electric-blue)" strokeWidth="2">
              <animate attributeName="d" values="M0,100 Q250,50 500,100 T1000,100; M0,100 Q250,150 500,100 T1000,100; M0,100 Q250,50 500,100 T1000,100" dur="5s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-electric-blue to-violet-glow shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
                <span className="font-sans font-bold text-lg tracking-tight text-white">NeuroGrowth Labs</span>
              </div>
              <p className="text-quantum-silver text-sm mb-6">AI Infrastructure for the Next Global Economy</p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Platforms</h4>
              <ul className="space-y-2 text-sm text-quantum-silver">
                <li><a href="#" className="hover:text-electric-blue transition-colors">AfriTranslate Studio</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">AfriTrade OS</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">AfriProperty</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">AgriShield AI</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-quantum-silver">
                <li><a href="#" className="hover:text-electric-blue transition-colors">About</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">Leadership</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">Press</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Industries</h4>
              <ul className="space-y-2 text-sm text-quantum-silver">
                <li><a href="#" className="hover:text-electric-blue transition-colors">Governments</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">Finance</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">Agriculture</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">Trade</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-quantum-silver">
                <li><a href="#" className="hover:text-electric-blue transition-colors">Partnership</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">Enterprise Sales</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">Media Inquiries</a></li>
                <li><a href="#" className="hover:text-electric-blue transition-colors">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-quantum-silver">
            <div>
              © 2045 NeuroGrowth Labs. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-ai-green animate-pulse shadow-[0_0_10px_rgba(0,255,102,0.8)]" />
                <span className="text-ai-green font-mono">ALL SYSTEMS OPERATIONAL</span>
              </div>
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/ai-ethics" className="hover:text-white transition-colors">AI Ethics</Link>
              <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
              <Link to="/dpa" className="hover:text-white transition-colors">DPA</Link>
              <Link to="/security-policy" className="hover:text-white transition-colors">Security Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
