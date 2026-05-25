import React from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart3, LineChart, Globe } from 'lucide-react';

export default function DashboardPreviewSection() {
  return (
    <section className="py-32 px-6 bg-midnight-black relative overflow-hidden border-t border-glass-border">
      
      {/* Decorative Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-electric-blue/10 blur-[150px] rounded-[100%] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Command Center Visualization
          </h2>
          <p className="text-quantum-silver text-lg max-w-2xl mx-auto">
            Experience our unified command interface, engineered to distill billions of data points into actionable institutional intelligence.
          </p>
        </div>

        {/* Dashboard Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl mx-auto rounded-xl sm:rounded-3xl border border-glass-border bg-graphite-grey/40 backdrop-blur-2xl shadow-2xl overflow-hidden"
        >
          {/* Mac-style Window Header */}
          <div className="h-12 border-b border-glass-border flex items-center px-6 gap-2 bg-white/5">
             <div className="w-3 h-3 rounded-full bg-red-500/80" />
             <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
             <div className="w-3 h-3 rounded-full bg-green-500/80" />
             <div className="mx-auto flex items-center gap-2 text-xs font-mono text-quantum-silver bg-black/20 px-4 py-1 rounded-full">
                <Globe className="w-3 h-3 text-electric-blue" />
                neurogrowth.os / global-metrics
             </div>
          </div>

          <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Sidebar / Left Col */}
            <div className="flex flex-col gap-6">
               <div className="p-6 rounded-2xl bg-midnight-black/40 border border-glass-border">
                  <div className="flex justify-between items-center mb-4">
                     <span className="text-sm font-medium text-quantum-silver">System Load</span>
                     <BarChart3 className="w-4 h-4 text-ai-cyan" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">42%</div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }} 
                       whileInView={{ width: '42%' }} 
                       transition={{ duration: 1, delay: 0.5 }}
                       className="h-full bg-gradient-to-r from-ai-cyan to-electric-blue"
                     />
                  </div>
               </div>

               <div className="p-6 rounded-2xl bg-midnight-black/40 border border-glass-border flex-1">
                  <div className="flex justify-between items-center mb-4">
                     <span className="text-sm font-medium text-quantum-silver">Active Nodes</span>
                     <Activity className="w-4 h-4 text-violet-glow" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">1,024</div>
                  <div className="flex gap-1 h-12 items-end">
                     {[40, 60, 45, 80, 50, 90, 70, 85].map((height, i) => (
                       <motion.div 
                         key={i}
                         initial={{ height: 0 }}
                         whileInView={{ height: `${height}%` }}
                         transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                         className="flex-1 bg-violet-glow/50 rounded-t-sm"
                       />
                     ))}
                  </div>
               </div>
            </div>

            {/* Main Graph Area */}
            <div className="md:col-span-2 p-6 rounded-2xl bg-midnight-black/40 border border-glass-border">
               <div className="flex justify-between items-center mb-8">
                  <div>
                     <span className="text-sm font-medium text-quantum-silver block mb-1">Global Throughput</span>
                     <span className="text-2xl font-bold text-white">845.2 TB/s</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-ai-cyan/10 text-ai-cyan text-xs font-mono">
                     +12.5% UP
                  </div>
               </div>
               
               {/* Abstract graph rendering */}
               <div className="relative h-64 w-full flex items-center justify-center border-b border-l border-glass-border">
                 <div className="absolute inset-0 bg-gradient-to-t from-electric-blue/5 to-transparent pointer-events-none" />
                  {/* Decorative curved SVG line simulating a chart */}
                 <svg className="w-full h-full overflow-visible p-4" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <motion.path 
                       initial={{ pathLength: 0, opacity: 0 }}
                       whileInView={{ pathLength: 1, opacity: 1 }}
                       transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                       d="M0,40 Q10,35 20,40 T40,20 T60,30 T80,10 T100,5"
                       fill="none" 
                       stroke="var(--color-electric-blue)" 
                       strokeWidth="1.5"
                       className="drop-shadow-[0_0_8px_rgba(37,99,235,0.6)]"
                    />
                    <motion.path 
                       initial={{ opacity: 0 }}
                       whileInView={{ opacity: 1 }}
                       transition={{ duration: 1.5, delay: 0.5 }}
                       d="M0,40 Q10,35 20,40 T40,20 T60,30 T80,10 T100,5 L100,50 L0,50 Z"
                       fill="url(#gradient)" 
                       className="opacity-20"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-electric-blue)" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="var(--color-electric-blue)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                 </svg>
               </div>
               <div className="flex justify-between w-full mt-4 text-xs text-quantum-silver font-mono">
                 <span>00:00</span>
                 <span>06:00</span>
                 <span>12:00</span>
                 <span>18:00</span>
                 <span>24:00</span>
               </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
