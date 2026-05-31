import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/sections/Navbar';
import Footer from '../components/sections/Footer';
import { ChevronRight, Target, Shield, Zap, Globe, Rocket, Building, Cpu, LineChart, MessageSquare, Briefcase, Mail } from 'lucide-react';

const partnershipModels = [
  { icon: Shield, title: "Strategic Partnerships", desc: "Long-term alliances to co-develop exclusive industry intelligence systems and AI pipelines." },
  { icon: Building, title: "Government Collaborations", desc: "Developing sovereign AI models and data infrastructure for national public sector scale." },
  { icon: Device, title: "Enterprise Integration", desc: "Direct integration of our core AI capabilities into your existing corporate tech stack." },
  { icon: Cpu, title: "AI Research Partnerships", desc: "Joint R&D ventures pushing the boundaries of LLMs and predictive networks." },
  { icon: Rocket, title: "Startup Ecosystem Alliances", desc: "Providing raw AI compute and foundational layers to accelerate early-stage teams." },
  { icon: LineChart, title: "Investment Partnerships", desc: "Capital and strategic alliances for large-scale digital infrastructure deployments." },
  { icon: Zap, title: "Technology Distribution", desc: "Global distribution agreements bringing NeuroGrowth AI products to new regions." },
  { icon: Target, title: "Innovation Labs", desc: "Co-hosted laboratories designed to incubate next-generation AI-first companies." },
];

function Device(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>;
}

export default function Partner() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ company: '', type: '', country: '', interest: '' });

  return (
    <div className="bg-midnight-black text-slate-300 min-h-screen font-sans selection:bg-electric-blue/30 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Neural Effects */}
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-electric-blue/10 blur-[150px] rounded-full pointer-events-none" />
           <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-violet-glow/10 blur-[120px] rounded-full pointer-events-none" />
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}>
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-quantum-silver text-sm tracking-widest font-mono uppercase mb-6">
                <Globe className="w-4 h-4 text-ai-cyan" /> Partnership Portal
             </div>
             <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-white leading-tight">
               Build the Future With <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-ai-cyan to-violet-glow">NeuroGrowth Labs</span>
             </h1>
             <p className="text-xl text-quantum-silver max-w-3xl mx-auto leading-relaxed font-light">
               Partner with a next-generation AI and digital infrastructure company shaping Africa’s intelligent economy.
             </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="py-24 px-6 bg-deep-charcoal relative border-t border-glass-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Partnership Models</h2>
            <p className="text-quantum-silver max-w-2xl mx-auto text-lg">A spectrum of strategic collaborative frameworks designed to align global resources, advanced compute, and enterprise scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {partnershipModels.map((model, idx) => (
                <motion.div 
                   key={idx}
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: idx * 0.05 }}
                   className="group p-6 rounded-2xl bg-glass-surface border border-glass-border hover:bg-white/5 hover:border-electric-blue/30 transition-all duration-500 cursor-pointer relative overflow-hidden"
                >
                   <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <model.icon className="w-8 h-8 text-ai-cyan mb-6 group-hover:scale-110 transition-transform duration-500" />
                   <h3 className="text-lg font-bold text-white mb-2">{model.title}</h3>
                   <p className="text-sm text-quantum-silver leading-relaxed">{model.desc}</p>
                </motion.div>
             ))}
          </div>
        </div>
      </section>



      {/* Onboarding Experience */}
      <section className="py-32 px-6 relative overflow-hidden bg-midnight-black">
        <div className="absolute inset-0 z-0">
           {/* Cinematic mapping */}
           <motion.div animate={{ rotate: 360 }} transition={{ duration: 150, repeat: Infinity, ease: 'linear' }} className="absolute -right-[20%] top-0 w-[80vw] h-[80vw] rounded-full border border-glass-border opacity-20 pointer-events-none" />
           <motion.div animate={{ rotate: -360 }} transition={{ duration: 200, repeat: Infinity, ease: 'linear' }} className="absolute -left-[20%] bottom-0 w-[60vw] h-[60vw] rounded-full border border-glass-border opacity-20 pointer-events-none" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Initialize Partnership</h2>
            <p className="text-quantum-silver">Engage our intelligent onboarding system to align strategic objectives.</p>
          </div>

          <div className="bg-graphite-grey/50 backdrop-blur-3xl border border-glass-border rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
             
             {/* Progress indicator */}
             <div className="flex justify-between items-center mb-12 relative">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-white/5 z-0" />
                <motion.div 
                   animate={{ width: `${((step - 1) / 3) * 100}%` }} 
                   className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-ai-cyan to-electric-blue z-0 transition-all duration-500" 
                />
                
                {[1, 2, 3, 4].map(s => (
                   <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm relative z-10 transition-all duration-500 ${step >= s ? 'bg-electric-blue text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-midnight-black border border-glass-border text-quantum-silver'}`}>
                      {s}
                   </div>
                ))}
             </div>

             {/* Form Steps */}
             <div className="min-h-[300px]">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                     <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                        <div>
                           <label className="text-xs font-mono text-electric-blue uppercase tracking-wider mb-2 block">Company Identity</label>
                           <div className="flex items-center bg-midnight-black/40 border border-glass-border rounded-xl px-4 py-3 focus-within:border-ai-cyan/50 transition-colors">
                              <Briefcase className="w-5 h-5 text-quantum-silver mr-3" />
                              <input type="text" placeholder="Organization Name" className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-600" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                           </div>
                        </div>
                        <div>
                           <label className="text-xs font-mono text-electric-blue uppercase tracking-wider mb-2 block">Organization Type</label>
                           <select className="w-full bg-midnight-black/40 border border-glass-border rounded-xl px-4 py-3.5 text-white outline-none focus:border-ai-cyan/50 transition-colors appearance-none" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                              <option value="" disabled>Select Classification...</option>
                              <option value="enterprise">Enterprise / Corporate</option>
                              <option value="government">Government / Public Sector</option>
                              <option value="academic">Academic Institution</option>
                              <option value="startup">Growth-stage Startup</option>
                              <option value="investor">Investment Firm / VC</option>
                           </select>
                        </div>
                     </motion.div>
                  )}

                  {step === 2 && (
                     <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                        <div>
                           <label className="text-xs font-mono text-electric-blue uppercase tracking-wider mb-2 block">Geographic HQ</label>
                           <div className="flex items-center bg-midnight-black/40 border border-glass-border rounded-xl px-4 py-3 focus-within:border-ai-cyan/50 transition-colors">
                              <Globe className="w-5 h-5 text-quantum-silver mr-3" />
                              <input type="text" placeholder="Country / Region" className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-600" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} />
                           </div>
                        </div>
                        <div>
                           <label className="text-xs font-mono text-electric-blue uppercase tracking-wider mb-2 block">Primary Interest Vector</label>
                           <select className="w-full bg-midnight-black/40 border border-glass-border rounded-xl px-4 py-3.5 text-white outline-none focus:border-ai-cyan/50 transition-colors appearance-none" value={formData.interest} onChange={e => setFormData({...formData, interest: e.target.value})}>
                              <option value="" disabled>Select Vector...</option>
                              <option value="infrastructure">Compute Infrastructure</option>
                              <option value="platforms">Application Platforms Integrations</option>
                              <option value="research">R&D / Co-development</option>
                              <option value="distribution">Global Distribution</option>
                           </select>
                        </div>
                     </motion.div>
                  )}

                  {step === 3 && (
                     <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                        <div>
                           <label className="text-xs font-mono text-electric-blue uppercase tracking-wider mb-2 block">Collaboration Objectives</label>
                           <div className="bg-midnight-black/40 border border-glass-border rounded-xl px-4 py-3 focus-within:border-ai-cyan/50 transition-colors">
                              <textarea placeholder="Describe the desired outcome of this partnership..." className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-600 h-32 resize-none" />
                           </div>
                           <p className="text-xs text-quantum-silver mt-2 flex items-center gap-1"><Zap className="w-3 h-3 text-ai-cyan" /> AI auto-summarization active</p>
                        </div>
                     </motion.div>
                  )}

                  {step === 4 && (
                     <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                        <div>
                           <label className="text-xs font-mono text-electric-blue uppercase tracking-wider mb-2 block">Point of Contact</label>
                           <div className="flex items-center bg-midnight-black/40 border border-glass-border rounded-xl px-4 py-3 focus-within:border-ai-cyan/50 transition-colors mb-4">
                              <Mail className="w-5 h-5 text-quantum-silver mr-3" />
                              <input type="email" placeholder="Executive Email Address" className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-600" />
                           </div>
                        </div>
                        <div className="p-6 rounded-xl bg-electric-blue/5 border border-electric-blue/20 text-center">
                           <MessageSquare className="w-8 h-8 text-electric-blue mx-auto mb-4" />
                           <h4 className="text-white font-bold mb-2">Systems Aligned</h4>
                           <p className="text-sm text-quantum-silver">Our neural orchestration layer will process this request and a human executive will be routed to your inbox shortly.</p>
                        </div>
                     </motion.div>
                  )}
                </AnimatePresence>
             </div>

             <div className="flex justify-between items-center mt-8 pt-8 border-t border-glass-border">
                <button 
                  onClick={() => setStep(Math.max(1, step - 1))} 
                  className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-quantum-silver hover:text-white hover:bg-white/5'}`}
                >
                  Previous Sequence
                </button>
                <button 
                  onClick={() => setStep(Math.min(4, step + 1))} 
                  className="px-6 py-2.5 rounded-lg bg-white text-midnight-black font-semibold text-sm hover:bg-ai-cyan transition-colors flex items-center gap-2"
                >
                  {step === 4 ? 'Transmit Request' : 'Proceed'} <ChevronRight className="w-4 h-4" />
                </button>
             </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
