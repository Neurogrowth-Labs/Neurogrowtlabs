import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Linkedin, Twitter, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

const leadershipData = [
  {
    name: "Mr. Lusimanadio Soki Simao, MBA",
    role: "Founder & Chief Executive Officer",
    desc: "Visionary entrepreneur building AI platforms designed to accelerate global economic transformation.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256&h=256",
    linkedin: "#",
    twitter: "#",
    longBio: [
      "Mr. Lusimanadio Soki Simao, MBA is widely recognized for founding and scaling impact-driven institutions that align innovation, policy, and inclusive economic growth across Africa.",
      "As an executive at the intersection of tech, environmental policy, and trade, his career is defined by strategic leadership, AI-driven innovation, and continental trade development to shape future-ready African institutions and globally competitive enterprises."
    ],
    honors: "Africa Business Professionals and Entrepreneurs Award",
    credentials: [
      { title: "Associate Member", issuer: "CIM Chartered Managers Canada" },
      { title: "Oil and Gas Safety Management", issuer: "OSHAcademy Occupational Safety & Health Training" },
      { title: "Introduction to OSHAcademy", issuer: "OSHAcademy Occupational Safety & Health Training" },
      { title: "ISO 14001:2015 Environmental Management System Awareness", issuer: "The Knights of Safety" },
      { title: "ISO 9001:2015 Quality Management System Foundations", issuer: "The Knights of Safety" },
      { title: "Data Analytics Essentials", issuer: "Cisco Networking Academy" },
      { title: "Designing for Greater Efficiency", issuer: "IFC (World Bank)" },
      { title: "Introduction to Critical Infrastructure Protection", issuer: "OPSWAT Academy" },
      { title: "Certified Lean Six Sigma Black Belt", issuer: "Six Sigma Academy Amsterdam" },
      { title: "Certified John Maxwell Leadership Team Member", issuer: "John Maxwell Leadership Academy" }
    ]
  },
  {
    name: "Nguyen Van Hoang",
    role: "Chief AI & ML Engineer",
    desc: "Specialist in scalable infrastructure engineering and advanced software systems.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=256&h=256",
    linkedin: "#",
    twitter: "#",
    longBio: [
      "Nguyễn Văn Hoàng is a highly accomplished Software Engineer with over 5 years of professional experience specializing in Artificial Intelligence, IoT, cloud computing systems, and scalable full-stack software development. He is deeply passionate about researching and implementing state-of-the-art Large Language Models (LLMs), Computer Vision systems, and complex distributed system architectures.",
      "Throughout his career, Hoàng has focused on bridging advanced machine learning algorithms with high-performance production engineering. He excels at designing and delivering purpose-built AI-powered products that solve complex enterprise bottlenecks and generate measurable, high-impact business value, making him an outstanding technical leader in the modern digital transformation landscape."
    ],
    expertise: [
      { field: "Artificial Intelligence & ML", tech: "LLMs, Computer Vision, Deep Learning, PyTorch, TensorFlow" },
      { field: "Software Engineering & Architecture", tech: "Scalable Microservices, Event-Driven Systems, API Gateway, Design Patterns" },
      { field: "Full-Stack Development", tech: "TypeScript, React, Node.js, Python, Java, Go, Next.js" },
      { field: "Cloud & Infrastructure", tech: "Docker, Kubernetes, AWS, Google Cloud Platform (GCP), CI/CD Pipelines" },
      { field: "Internet of Things (IoT)", tech: "Hardware Integration, Edge AI, MQTT, Sensor Networks, Microcontrollers" },
      { field: "Data Systems & Databases", tech: "PostgreSQL, MongoDB, Redis, Vector Databases (Pinecone, Chroma), Data Pipeline Orchestration" }
    ]
  },
  {
    name: "Linford Musiyambodza",
    role: "Head of AI Product Development & Architecture",
    desc: "Architect of large-scale distributed systems and enterprise AI platforms.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Muhammad Nur Ismanto",
    role: "Chief Technology Officer",
    desc: "Technology leader focused on deep AI innovation and intelligent enterprise platforms.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
    linkedin: "#",
    twitter: "#",
    longBio: [
      "Muhamad Ismanto is a seasoned tech innovator and educator with over a decade of experience in web and application development, system architecture, and digital transformation. With a deep technical foundation in languages such as Java, JavaScript, Python, PHP, SQL, HTML, and CSS, he has led and contributed to numerous enterprise and startup projects across Southeast Asia.",
      "As a passionate system architect, he has built scalable SaaS, PaaS, and IaaS platforms, and continues to drive innovation in automation, IoT, and microcontroller systems. His projects include an award-winning childcare service app recognized by UNICEF, clinical monitoring apps for maternal health in Malaysia, and enterprise systems for Korean companies. These experiences showcase his ability to deliver purpose-driven digital solutions that address real-world needs.",
      "Muhamad's journey began in vocational high school with a focus on multimedia and web technologies. Upon graduating in 2010, he advanced his technical skills with a degree in Electrical and Electronics Engineering at a private Malaysian university, diving deeper into automation, IoT, and microcontroller systems. He actively participated in training and workshops, expanding his hands-on capabilities in both hardware and software development.",
      "He has also served as the former Chief Technology Officer (CTO) in a joint venture between FixApa (Malaysia) and Fellas (Indonesia)—a cross-border initiative aimed at building scalable system architecture to support a brighter digital future for the region. In this role, he led strategic development of technology platforms tailored to the needs of diverse markets across Southeast Asia.",
      "His commitment to technology goes beyond engineering. As an AI trainer in collaboration with a leading Malaysian education provider, he empowers both students and professionals to embrace AI and future technologies. He has also conducted training programs on IoT, automation, and software development for internal teams, corporate staff, and the public.",
      "Now, he is focused on leveraging his skills to develop impactful tech solutions that support community growth and sustainable development across the region, motivated by a strong vision of inclusive tech empowerment."
    ],
    expertise: [
      { field: "Electronics Engineering Developer", tech: "PLC, Arduino, ATmega, Microcontroller, ESP, Raspberry, etc." },
      { field: "Website Developer", tech: "JS, PHP, Bootstrap, .Net, Java, React, Node.js, etc." },
      { field: "System Analyst & Architect", tech: "Enterprise Apps, QMS, SAP, PaaS, IaaS, SaaS, etc." },
      { field: "Product Owner", tech: "Product Study, Market Strategy, Roadmapping, Problem Solving" },
      { field: "Software Developer", tech: "Java, Python, C++, SpringBoot, C#, etc." },
      { field: "Mobile Apps Developer", tech: "Android Studio, iOS, Huawei Mobile Services, WebView" },
      { field: "Python & AI Trainer", tech: "Machine Learning, Deep Learning, OpenCV, Data Pipelines" },
      { field: "UI/UX Designer", tech: "Figma, Layout Architecture, Interactive Prototyping" },
      { field: "Data Analyst", tech: "Tableau, Python, Pandas, Power BI, Excel Charts" },
      { field: "Cloud Engineer", tech: "AWS Cloud, Oracle Cloud, Alibaba, Microsoft Azure" },
      { field: "AI/ML Engineer", tech: "Deep Learning, LLM Integration, Planning & Evaluation" }
    ]
  },
  {
    name: "Francis Matsoso",
    role: "Chief Security & Compliance Officer (CSCO)",
    desc: "Leading the design, development, and governance, AI research initiatives and cybersecurity architecture.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256",
    linkedin: "#",
    twitter: "#",
    longBio: [
      "Francis Matsoso is a premier cybersecurity researcher and developer specializing in advanced penetration testing, threat intelligence, and AI-powered security automation systems. He leads security architecture across an 18+ application AI infrastructure portfolio.",
      "Recognized as a hackathon champion and former cybersecurity lead, Francis bridges offensive security research with full-stack development to build systems that are secure by design. By integrating advanced threat mitigation directly into software pipelines, he ensures that all NeuroGrowth Labs systems and autonomous computing environments remain highly secure and resilient against sophisticated cyber threats."
    ],
    expertise: [
      { field: "Security Architecture & DevSecOps", tech: "Security automation, secure container deployments, CI/CD security integration, IAM" },
      { field: "Offensive Security & Pen-Testing", tech: "Penetration testing, vulnerability assessments, exploit development, reverse engineering" },
      { field: "Threat Intelligence & Automation", tech: "AI-powered threat detection, automated log analysis, SIEM, intrusion detection" },
      { field: "Full-Stack Security Engineering", tech: "Secure coding practices (OWASP Top 10), crypto-implementation, secure authentication protocols" },
      { field: "Regulatory Compliance & Audit", tech: "ISO 27001, GDPR, DPA compliance, SOC 2 alignment, security governance frameworks" },
      { field: "Infrastructure Protection & Defense", tech: "Zero-trust network architectures, Web Application Firewalls (WAF), secure multi-tenant isolation" }
    ]
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
      onClick={!isExpanded ? onExpand : undefined}
      className={`relative p-8 rounded-2xl bg-midnight-black/60 border border-glass-border overflow-hidden group transition-all duration-500 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] ${isExpanded ? 'h-auto max-h-[85vh] overflow-y-auto w-full md:w-[46rem] max-w-2xl scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent' : 'h-[340px] max-w-[340px] shrink-0 cursor-pointer'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent transition-opacity pointer-events-none" />

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
      <motion.div layout className="relative z-10 h-full flex flex-col justify-between" style={{ minHeight: isExpanded ? 'auto' : '100%' }}>
        <div>
          <div className="flex justify-between items-start mb-6">
            <motion.div layout className="w-20 h-20 rounded-2xl bg-glass-surface border border-glass-border flex items-center justify-center backdrop-blur-sm shadow-lg overflow-hidden relative group-hover:border-electric-blue/40 transition-colors duration-300">
              {member.image ? (
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-3xl font-bold text-white">{member.name.charAt(0)}</span>
              )}
            </motion.div>
            {!isExpanded ? (
              <button
                onClick={(e) => { e.stopPropagation(); onExpand(); }}
                className="w-10 h-10 rounded-full bg-white/5 border border-glass-border flex items-center justify-center text-quantum-silver hover:text-white hover:border-ai-cyan hover:bg-ai-cyan/10 transition-all opacity-0 group-hover:opacity-100"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
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
                {!isExpanded && (
                  <p className="text-quantum-silver text-sm leading-relaxed mb-6">{member.desc}</p>
                )}
                {isExpanded && (
                  <div className="text-sm text-quantum-silver leading-relaxed mb-6 space-y-4">
                    {member.longBio ? (
                      <>
                        <div className="space-y-4 pr-1">
                          {member.longBio.map((para: string, idx: number) => (
                            <p key={idx} className="text-quantum-silver leading-relaxed">{para}</p>
                          ))}
                        </div>
                        {member.expertise && (
                          <div className="mt-8 pt-6 border-t border-glass-border">
                            <h4 className="text-sm font-bold text-white mb-4 tracking-wider uppercase font-mono text-ai-cyan">Strategic Expertise Fields</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {member.expertise.map((exp: any, idx: number) => (
                                <div key={idx} className="p-3 rounded-xl bg-midnight-black/40 border border-glass-border hover:border-electric-blue/40 hover:bg-electric-blue/5 transition-all duration-300 group/item">
                                  <div className="font-semibold text-white text-xs uppercase tracking-wide mb-1 group-hover/item:text-electric-blue transition-colors">{exp.field}</div>
                                  <div className="text-quantum-silver text-xs font-light leading-relaxed">{exp.tech}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {member.honors && (
                          <div className="mt-8 pt-6 border-t border-glass-border">
                            <h4 className="text-sm font-bold text-white mb-3 tracking-wider uppercase font-mono text-ai-cyan">Distinguished Honors</h4>
                            <div className="p-4 rounded-xl bg-ai-cyan/5 border border-ai-cyan/20">
                              <p className="text-white text-sm font-semibold">{member.honors}</p>
                            </div>
                          </div>
                        )}
                        {member.credentials && (
                          <div className="mt-8 pt-6 border-t border-glass-border">
                            <h4 className="text-sm font-bold text-white mb-4 tracking-wider uppercase font-mono text-ai-cyan font-semibold">Credentials & Compliance</h4>
                            <div className="text-xs text-quantum-silver mb-3 uppercase tracking-wider font-mono">Verified Executive Frameworks</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {member.credentials.map((cred: any, idx: number) => (
                                <div key={idx} className="p-3 rounded-xl bg-midnight-black/40 border border-glass-border hover:border-electric-blue/40 hover:bg-electric-blue/5 transition-all duration-300 group/item">
                                  <div className="font-semibold text-white text-xs uppercase tracking-wide mb-1 group-hover/item:text-electric-blue transition-colors">{cred.title}</div>
                                  <div className="text-quantum-silver text-xs font-light leading-relaxed">{cred.issuer}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <p>{member.desc}</p>
                        <p className="mt-4 pt-4 border-t border-glass-border">Background: An established leader shaping the next generation of AI ecosystems and African digital transformation. Focuses on scalable engineering, enterprise design, and deep technology integration.</p>
                      </>
                    )}
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
     <div className="w-20 h-20 mb-6 rounded-2xl bg-white/5" />
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">The Executives and Their Track Record</h2>
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
