import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Linkedin, Twitter, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

const leadershipData = [
  {
    name: "Lusimadio S Simao, MBA",
    role: "Founder & Chief Executive Officer",
    desc: "Visionary entrepreneur building AI platforms designed to accelerate global economic transformation.",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Nguyen Van Hoang",
    role: "Chief AI & ML Engineer",
    desc: "Specialist in scalable infrastructure engineering and advanced software systems.",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Linford Musiyambodza",
    role: "Head of AI Product Development & Architecture",
    desc: "Architect of large-scale distributed systems and enterprise AI platforms.",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Muhammad Nur Ismanto",
    role: "Chief Technology Officer",
    desc: "Technology leader focused on deep AI innovation and intelligent enterprise platforms.",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Francis Matsoso",
    role: "Head of AI Research and Security Architect",
    desc: "Leading the design, development, and governance, AI research initiatives and cybersecurity architecture.",
    linkedin: "#",
    twitter: "#"
  }
];

const LeadershipCard = ({ member, isExpanded, onExpand, onClose }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      layout
      whileHover={{ scale: isExpanded ? 1 : 1.02 }}
      className={`relative p-8 rounded-2xl bg-midnight-black/60 border border-glass-border overflow-hidden group transition-all duration-500 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] ${isExpanded ? 'h-auto w-full md:w-[24rem]' : 'h-[340px] max-w-[340px] shrink-0'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent transition-opacity" />

      {/* Dynamic Background Hover */}
      {!isExpanded && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, rgba(0, 229, 255, 0.15) 0%, transparent 60%)`
            ),
          }}
        />
      )}

      {/* Content */}
      <motion.div layout className="relative z-10 h-full flex flex-col justify-between" style={{ minHeight: isExpanded ? '340px' : 'auto' }}>
        <div>
          <div className="flex justify-between items-start mb-6">
            <motion.div layout className="w-16 h-16 rounded-xl bg-glass-surface border border-glass-border flex items-center justify-center backdrop-blur-sm shadow-lg">
              <span className="text-2xl font-bold text-white">{member.name.charAt(0)}</span>
            </motion.div>
            {!isExpanded ? (
              <button
                onClick={onExpand}
                className="w-10 h-10 rounded-full bg-white/5 border border-glass-border flex items-center justify-center text-quantum-silver hover:text-white hover:border-ai-cyan hover:bg-ai-cyan/10 transition-all opacity-0 group-hover:opacity-100"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 border border-glass-border flex items-center justify-center text-quantum-silver hover:text-red-400 hover:border-red-400 hover:bg-red-400/10 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <motion.h3 layout className={`${isExpanded ? 'text-2xl' : 'text-xl'} font-bold text-white mb-2`}>{member.name}</motion.h3>
          <motion.p layout className="text-ai-cyan font-mono text-sm uppercase tracking-wider mb-4">{member.role}</motion.p>
          
          {(isExpanded || true) && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={isExpanded ? "block" : "hidden group-hover:block transition-all duration-300"}
              >
                <p className="text-quantum-silver text-sm leading-relaxed mb-6">{member.desc}</p>
                {isExpanded && (
                  <div className="text-sm text-quantum-silver leading-relaxed mb-6 space-y-3">
                    <p>Background: An established leader shaping the next generation of AI ecosystems and African digital transformation. Focuses on scalable engineering, enterprise design, and deep technology integration.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <motion.div layout className={`flex gap-4 mt-auto pt-6 border-t border-glass-border ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`}>
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-glass-border flex items-center justify-center text-quantum-silver hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all">
             <Linkedin className="w-4 h-4" />
          </a>
          <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-glass-border flex items-center justify-center text-quantum-silver hover:text-white hover:border-gray-300 hover:bg-white/10 transition-all">
             <Twitter className="w-4 h-4" />
          </a>
        </motion.div>
      </motion.div>

    </motion.div>
  );
};

const SkeletonCard = () => (
  <div className="h-[340px] max-w-[340px] shrink-0 p-8 rounded-2xl bg-midnight-black/40 border border-glass-border animate-pulse flex flex-col justify-end">
     <div className="w-16 h-16 mb-6 rounded-xl bg-white/5" />
     <div className="h-6 w-3/4 bg-white/5 rounded mb-3" />
     <div className="h-4 w-1/2 bg-white/5 rounded" />
  </div>
);

export default function LeadershipSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate network request for perceived performance enhancement
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 350;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="leadership-section py-32 px-6 relative z-10 bg-deep-charcoal border-t border-glass-border">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_bottom,rgba(0,229,255,0.1),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Executive Leadership</h2>
            <p className="text-xl text-quantum-silver font-light">
              The visionaries and innovators architecting the future of enterprise intelligence.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-glass-border flex items-center justify-center text-white hover:bg-white/5 transition-colors">
               <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-glass-border flex items-center justify-center text-white hover:bg-white/5 transition-colors bg-white/5">
               <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full">
           <AnimatePresence>
             {expandedIndex !== null && (
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   onClick={() => setExpandedIndex(null)}
                   className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
                >
                   <div onClick={e => e.stopPropagation()}>
                     <LeadershipCard 
                        member={leadershipData[expandedIndex]} 
                        isExpanded={true} 
                        onClose={() => setExpandedIndex(null)} 
                     />
                   </div>
                </motion.div>
             )}
           </AnimatePresence>

           <div 
             ref={carouselRef}
             className="flex gap-6 overflow-x-auto pb-8 snap-x hide-scrollbar"
             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
           >
             {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                   <div key={`skeleton-${i}`} className="snap-start"><SkeletonCard /></div>
                ))
             ) : (
                leadershipData.map((member, idx) => (
                   <div key={idx} className="snap-start shadow-xl">
                     <LeadershipCard 
                        member={member} 
                        isExpanded={false}
                        onExpand={() => setExpandedIndex(idx)} 
                     />
                   </div>
                ))
             )}
           </div>
        </div>
      </div>
    </section>
  );
}
