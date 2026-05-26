import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/sections/Navbar';
import Footer from '../components/sections/Footer';
import { Network, HeartPulse, LineChart, Store, CreditCard, Activity, ArrowRight, X, Globe, Cpu, Database, Zap, Recycle, Bot, Building2 } from 'lucide-react';
import { MagneticButton } from '../components/ui/MagneticButton';

const platforms = [
  { 
    id: "neurosmart",
    name: 'CG Waste Data', 
    desc: 'Intelligent Construction & Demolition Waste Management for a Circular Built Environment, transforming how the construction, demolition, and waste recovery sectors manage material flows, compliance, and circular economy outcomes.', 
    icon: Recycle,
    color: "from-blue-500 to-cyan-400",
    stats: { users: "4.2M+", volume: "1.8M Tons", latency: "12ms" }
  },
  { 
    id: "afritrade",
    name: 'AfriTrade OS', 
    desc: 'A digital trade operating system powering cross-border commerce and logistics intelligence.', 
    icon: Network,
    color: "from-emerald-400 to-teal-500",
    stats: { routes: "850+", nodes: "12k", efficiency: "+40%" }
  },
  { 
    id: "health",
    name: 'Health AI', 
    desc: 'Connecting patients with expert doctors instantly via virtual consultations and AI health assistants.', 
    icon: HeartPulse,
    color: "from-rose-400 to-red-500",
    stats: { doctors: "5,000+", sessions: "2.1M", accuracy: "99.2%" }
  },
  { 
    id: "ngx",
    name: 'NGX AfriQuant', 
    desc: 'Intelligent financial markets platform for predictive algorithmic trading and asset modeling.', 
    icon: LineChart,
    color: "from-violet-500 to-purple-600",
    stats: { models: "140+", latency: "1.2ms", aum: "$420M" }
  },
  { 
    id: "translate",
    name: 'AfriTranslate AI', 
    desc: 'Real-time multilingual translation bridging 2,000+ African dialects to global languages.', 
    icon: Globe,
    color: "from-amber-400 to-orange-500",
    stats: { dialects: "2.1k", queries: "18B/mo", speed: "<200ms" }
  },
  { 
    id: "ipos",
    name: 'RescueBot AI', 
    desc: 'An advanced AI system designed to support emergency response and disaster management.', 
    icon: Bot,
    color: "from-cyan-400 to-blue-600",
    stats: { enterprises: "420", automation: "85%", uptime: "99.99%" }
  },
  { 
    id: "ibos",
    name: 'IBOS Apps', 
    desc: 'Informal Business Operating System providing POS and analytics for the informal sector.', 
    icon: Store,
    color: "from-fuchsia-500 to-pink-500",
    stats: { merchants: "85k", transactions: "12M/day", growth: "320% YoY" }
  },
  { 
    id: "tracker",
    name: 'AfriEstate', 
    desc: 'An AI-powered real estate and land intelligence platform for governments, developers, and investors.', 
    icon: Building2,
    color: "from-indigo-400 to-blue-500",
    stats: { datapoints: "8.4PB", updates: "Live", precision: "0.01%" }
  }
];

const PlatformCard = React.memo(({ platform, idx, onClick }: { platform: any, idx: number, onClick: () => void }) => (
  <motion.div 
    layoutId={`card-container-${platform.id}`}
    onClick={onClick}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: idx * 0.1 }}
    className="group relative h-72 rounded-3xl p-6 cursor-pointer bg-glass-surface backdrop-blur-md border border-glass-border hover:border-electric-blue/50 overflow-hidden flex flex-col justify-between"
  >
    {/* Glow ring on hover */}
    <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-40 transition-opacity duration-700`} />
    
    <motion.div layoutId={`icon-${platform.id}`} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
        <platform.icon className="w-6 h-6 text-white" />
    </motion.div>
    
    <div>
        <motion.h3 layoutId={`title-${platform.id}`} className="text-xl font-bold text-white mb-2">{platform.name}</motion.h3>
        <motion.p layoutId={`desc-${platform.id}`} className="text-sm text-quantum-silver leading-relaxed line-clamp-2">{platform.desc}</motion.p>
    </div>

    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
        <ArrowRight className="w-5 h-5 text-ai-cyan" />
    </div>
  </motion.div>
));

export default function Platforms() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const selectedPlatform = platforms.find(p => p.id === selectedId);

  return (
    <div className="bg-midnight-black min-h-screen text-slate-300 font-sans selection:bg-electric-blue/30 selection:text-white pb-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden min-h-[90vh]">
        {/* Ethereal background grid & glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.15),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 w-full max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ai-cyan/20 bg-ai-cyan/5 text-ai-cyan font-mono text-xs tracking-wider uppercase mb-8 backdrop-blur-md">
             <Zap className="w-4 h-4" /> Multi-Layer Architecture Live
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-white">
            Africa’s Intelligent <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ai-cyan via-electric-blue to-violet-glow glow-text">Digital Ecosystem</span>
          </h1>
          <p className="text-xl md:text-2xl text-quantum-silver mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Discover AI-powered platforms engineered to transform industries, enterprises, governments, and digital economies.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <MagneticButton onClick={() => navigate('/contact#ai-form')} className="px-8 py-4 rounded-full bg-white text-midnight-black font-semibold hover:bg-ai-cyan transition-colors flex items-center justify-center gap-2 text-sm">
                Launch Platform <ArrowRight className="w-4 h-4" />
             </MagneticButton>
             <button onClick={() => navigate('/contact#contact-options')} className="px-8 py-4 rounded-full bg-glass-surface border border-glass-border font-medium text-white hover:bg-white/5 transition-all text-sm">
                Request Demo
             </button>
          </div>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="relative px-6 z-10 max-w-7xl mx-auto -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {platforms.map((platform, idx) => (
             <PlatformCard key={platform.id} platform={platform} idx={idx} onClick={() => setSelectedId(platform.id)} />
           ))}
        </div>
      </section>

      {/* Modal / Detail View */}
      <AnimatePresence>
         {selectedId && selectedPlatform && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-midnight-black/80 backdrop-blur-2xl"
               onClick={() => setSelectedId(null)}
            >
               <motion.div 
                 layoutId={`card-container-${selectedPlatform.id}`}
                 className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-graphite-grey border border-glass-border shadow-2xl"
                 onClick={e => e.stopPropagation()}
               >
                  <button 
                    onClick={() => setSelectedId(null)} 
                    className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                     <X className="w-5 h-5 text-white" />
                  </button>

                  <div className={`w-full h-48 md:h-64 bg-gradient-to-br ${selectedPlatform.color} relative overflow-hidden`} />

                  <div className="p-8 md:p-12 -mt-16 md:-mt-20 relative z-10">
                     <motion.div layoutId={`icon-${selectedPlatform.id}`} className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-midnight-black border border-glass-border flex items-center justify-center mb-8 shadow-2xl">
                        <selectedPlatform.icon className="w-10 h-10 text-white" />
                     </motion.div>
                     
                     <div className="flex flex-col md:flex-row gap-12">
                        <div className="flex-1">
                           <motion.h3 layoutId={`title-${selectedPlatform.id}`} className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">{selectedPlatform.name}</motion.h3>
                           <motion.p layoutId={`desc-${selectedPlatform.id}`} className="text-xl text-quantum-silver leading-relaxed mb-8">{selectedPlatform.desc}</motion.p>
                           
                           <div className="grid grid-cols-2 gap-4 mb-8">
                             {Object.entries(selectedPlatform.stats).map(([key, value]) => (
                               <div key={key} className="p-4 rounded-xl bg-white/5 border border-white/5">
                                 <div className="text-xs font-mono text-quantum-silver uppercase tracking-wider mb-2">{key}</div>
                                 <div className="text-2xl font-bold text-white">{value as string}</div>
                               </div>
                             ))}
                           </div>

                           <MagneticButton className="px-8 py-4 rounded-xl bg-white text-midnight-black font-semibold hover:bg-electric-blue hover:text-white transition-all text-sm w-full md:w-auto text-center">
                              Deploy {selectedPlatform.name} Ecosystem
                           </MagneticButton>
                        </div>

                        <div className="flex-1">
                           {/* Pseudo-Dashboard View */}
                           <div className="w-full aspect-[4/3] rounded-2xl bg-midnight-black border border-glass-border overflow-hidden relative flex flex-col shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                              <div className="h-10 border-b border-glass-border flex items-center px-4 gap-2 bg-white/5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                              </div>
                              <div className="flex-1 p-6 relative">
                                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
                                 <div className="flex items-center gap-4 mb-6 relative z-10">
                                   <div className="w-12 h-12 rounded-lg border border-glass-border bg-white/5 flex items-center justify-center">
                                      <Activity className="w-6 h-6 text-ai-cyan" />
                                   </div>
                                   <div>
                                      <div className="text-xs text-quantum-silver uppercase block">System Status</div>
                                      <div className="text-white font-mono">ONLINE / SYNCED</div>
                                   </div>
                                 </div>

                                 <div className="space-y-3 relative z-10">
                                   {[1, 2, 3].map(i => (
                                     <div key={i} className="w-full h-12 rounded-lg border border-glass-border bg-white/5 flex items-center px-4 justify-between">
                                       <div className="flex items-center gap-3">
                                          <div className={`w-2 h-2 rounded-full ${i===1?'bg-green-400':i===2?'bg-ai-cyan':'bg-violet-glow'}`} />
                                          <div className="h-2 w-24 bg-white/10 rounded-full" />
                                       </div>
                                       <div className="h-2 w-12 bg-white/20 rounded-full" />
                                     </div>
                                   ))}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}
