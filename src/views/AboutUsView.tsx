export interface AboutUsViewProps {
  handleNavigation: (view: 'home' | 'about-us' | 'gallery' | 'education' | 'schedule', hash?: string) => void;
  medalFilter: 'all' | 'international' | 'national' | 'state';
  setMedalFilter: (filter: 'all' | 'international' | 'national' | 'state') => void;
  setSelectedProgram: (program: string) => void;
  setTrialModalOpen: (open: boolean) => void;
}

import { MASTER_MEDALS } from '../data/masterMedals';

import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Play,
  Award,
  ShieldCheck,
  Zap,
  Target,
  Facebook,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star,
  Flame,
  Check,
  Users,
  Compass,
  Trophy,
  Image,
  BookOpen,
  Volume2,
  Search,
  Flag,
  Info
} from 'lucide-react';
import { assetUrl } from '../assetUrl';

export default function AboutUsView({ handleNavigation, medalFilter, setMedalFilter, setSelectedProgram, setTrialModalOpen }: AboutUsViewProps) {
  return (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 space-y-16"
        >
          {/* Breadcrumbs return bar */}
          <div className="flex items-center justify-between border-b border-[#1E3A8A]/25 pb-6">
            <button
              onClick={() => handleNavigation('home')}
              className="inline-flex items-center gap-2 text-zinc-200 hover:text-[#CC2936] font-semibold text-sm transition-colors cursor-pointer group"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </button>
            <div className="text-xs text-zinc-300 font-mono">
              Home <span className="mx-1">•</span> <span className="text-[#CC2936]">About Master Jin Kim</span>
            </div>
          </div>

          {/* Master Detail Presentation Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Premium Master Portrait Frame */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-tr from-blue-600/35 to-[#CC2936]/40 rounded-3xl transform rotate-1.5 z-0 blur-[1px]" />
              
              <div className="relative z-10 overflow-hidden rounded-3xl border-2 border-[#1E3A8A]/50 bg-[#0D1B3E] shadow-2xl p-1.5">
                <img
                  src={assetUrl("/media/Resized_png_20230403_110714_0000_492304801766417.jpg")}
                  alt="Master Jin Kim official team USA black belt portrait"
                  className="w-full h-auto rounded-2xl object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual credentials strip */}
                <div className="absolute inset-x-3 bottom-3 bg-[#0A1128]/95 backdrop-blur-md border border-[#1E3A8A]/40 rounded-2xl px-3 py-3.5 text-center">
                  <p className="text-xs font-semibold text-zinc-200 tracking-widest uppercase">OFFICIAL PORTRAIT</p>
                  <p className="text-base font-extrabold text-white font-display mt-0.5">Owner & Head Instructor</p>
                  <p className="text-[10px] text-amber-400 tracking-wide font-semibold font-display uppercase mt-1 leading-snug">Instruction by a Kukkiwon Certified International Taekwondo Instructor</p>
                </div>
              </div>

              {/* Decorative Korean flag dual color ring stamp */}
              <div className="relative z-20 mt-4 flex justify-end">
                <div className="bg-[#091129] border border-[#1E3A8A]/40 rounded-2xl p-4 shadow-2xl flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#CC2936] animate-pulse" />
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                </div>
                <div className="text-[10px] tracking-widest text-[#CC2936] font-black uppercase font-display select-none">
                  TEAM USA ATHLETE
                </div>
                </div>
              </div>
            </div>

            {/* Right Column: In-depth Biography & Pedigree */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#CC2936]/10 border border-[#CC2936]/30 text-[#CC2936] font-bold text-xs tracking-widest uppercase rounded-full">
                  <Award size={14} />
                  <span>30+ Years Experience</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-widest uppercase leading-none">
                  MASTER JIN HYUK KIM
                </h1>
                <p className="text-[#CC2936] font-display font-bold tracking-[0.18em] uppercase text-sm leading-relaxed">
                  DEVELOPING CHARACTER, CONFIDENCE & LEADERSHIP FOR LIFE
                </p>
              </div>

              <div className="space-y-4 text-zinc-300 font-light leading-relaxed text-sm sm:text-base">
                <p>
                  Master Jin Hyuk Kim is the founder and active Head Instructor of <strong className="text-white font-medium">JK United Taekwondo Center</strong>. Combining a prestigious <strong className="text-white font-medium">5th-Degree Kukkiwon Black Belt</strong> with over three decades of traditional training, he has dedicated his life to teaching authentic martial arts, cultivating physical agility, and building lifetime confidence in students since 2005.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#0B1536]/80 p-5 rounded-2xl border border-[#1E3A8A]/25 text-sm">
                  <div className="space-y-2">
                    <p className="text-xs uppercase text-amber-500 font-extrabold tracking-wider">Lineage & Credentials</p>
                    <ul className="space-y-1.5 font-light text-zinc-300">
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-[#CC2936]" />
                        <span>Kukkiwon-Certified Master Coach</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-[#CC2936]" />
                        <span>Hae Dong Kumdo Academy Master</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-[#CC2936]" />
                        <span>Traditional Sword Refined Practitioner</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase text-amber-500 font-extrabold tracking-wider">Leadership Roles</p>
                    <ul className="space-y-1.5 font-light text-zinc-300">
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-blue-400" />
                        <span>3-Time Team USA Athlete</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-blue-400" />
                        <span>Former School of Mines Club Coach</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-blue-400" />
                        <span>Aurora Youth Athletics Partner</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Master Quote Bubble */}
              <div className="border-l-4 border-[#CC2936] bg-[#0E1B3E]/60 rounded-r-2xl p-5 italic text-zinc-350 text-sm leading-relaxed relative">
                <span className="absolute right-4 bottom-1 text-8xl text-[#1E3A8A]/10 font-bold font-serif leading-none select-none">"</span>
                <p className="relative z-10">
                  "Every child deserves high physical self-confidence and an unbending state of focus. At JK United, we don't just teach high kicks—we build high-integrity citizens who lead with respect and stand strong against negativity."
                </p>
                <p className="not-italic text-xs text-zinc-200 mt-2 font-mono">— Master Jin Kim</p>
              </div>
            </div>
          </div>

          {/* Competition action & student achievement photos */}
          <div className="pt-16 border-t border-[#1E3A8A]/30 space-y-8">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="text-xs tracking-[0.25em] text-[#CC2936] font-black uppercase">Competition Excellence</span>
              <h2 className="text-2xl md:text-4xl font-display font-black text-white uppercase tracking-tight">
                On the National Stage
              </h2>
              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                From Master Jin Kim&apos;s elite national team performances to our students earning medals at championship tournaments.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 overflow-hidden rounded-2xl border border-[#1E3A8A]/30 bg-[#0D1B3E] shadow-xl">
                <img
                  src={assetUrl('/media/master-jin-competition-aerial-kick.jpg')}
                  alt="Master Jin Kim performing a high aerial kick at national Taekwondo competition"
                  className="w-full h-full min-h-[240px] object-cover hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-[#1E3A8A]/30 bg-[#0D1B3E] shadow-xl">
                <img
                  src={assetUrl('/media/competition-podium-youth-medals.jpg')}
                  alt="JK United youth students on USA competition podium with gold, silver, and bronze medals"
                  className="w-full h-full min-h-[240px] object-cover hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:col-span-3 overflow-hidden rounded-2xl border border-[#1E3A8A]/30 bg-[#0D1B3E] shadow-xl">
                <img
                  src={assetUrl('/media/tournament-team-medals.jpg')}
                  alt="Master Jin Kim and JK United students displaying tournament medals at a championship event"
                  className="w-full h-full max-h-[420px] object-cover object-center hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Championship Medal Dashboard with Live Filtering */}
          <div className="pt-16 border-t border-[#1E3A8A]/30 space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 font-black tracking-widest uppercase text-xs">
                <Trophy size={16} className="text-amber-500 animate-pulse" />
                <span>The Hall of Champions</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight uppercase leading-none">
                Athletic Victories & Honors
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-amber-500 via-[#CC2936] to-blue-500 mx-auto rounded-full" />
              <p className="text-sm text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
                Review the pristine national and continental tournament achievements earned by Master Jin Kim through decades of competitive focus on the global stage.
              </p>
            </div>

            {/* Filter Tabs Controller */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { id: 'all', label: 'All Medals & Titles' },
                { id: 'international', label: 'International Events' },
                { id: 'national', label: 'National Championships' },
                { id: 'state', label: 'State Gold Titles' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setMedalFilter(tab.id as any)}
                  className={`px-6 py-3 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    medalFilter === tab.id
                      ? 'bg-gradient-to-r from-[#CC2936] to-red-700 text-white shadow-xl shadow-red-950/50 scale-105 ring-1 ring-white/10'
                      : 'bg-[#0B1536] border border-[#1E3A8A]/30 text-zinc-300 hover:text-white hover:border-[#CC2936]/50 hover:bg-[#0E1E4C]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Staggered Grid of filtered Medals */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {MASTER_MEDALS.filter(
                (m) => medalFilter === 'all' || m.type === medalFilter
              ).map((med, idx) => {
                const isGold = med.medal.toLowerCase().includes('gold') || med.medal.includes('🥇');
                const isSilver = med.medal.toLowerCase().includes('silver') || med.medal.includes('🥈');
                
                let cardBorderClass = 'border-[#1E3A8A]/30 hover:border-amber-500/40 shadow-black';
                let medalGlowClass = 'text-amber-400';
                
                if (isGold) {
                  cardBorderClass = 'border-amber-500/30 hover:border-amber-500/60 shadow-amber-950/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/10 via-[#0D1B3E] to-[#0D1B3E]';
                  medalGlowClass = 'text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]';
                } else if (isSilver) {
                  cardBorderClass = 'border-slate-400/30 hover:border-slate-400/60 shadow-slate-950/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/20 via-[#0D1B3E] to-[#0D1B3E]';
                  medalGlowClass = 'text-slate-300 drop-shadow-[0_0_8px_rgba(203,213,225,0.4)]';
                } else {
                  cardBorderClass = 'border-amber-700/20 hover:border-amber-700/40 shadow-zinc-950/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-[#0D1B3E] to-[#0D1B3E]';
                  medalGlowClass = 'text-amber-600';
                }

                return (
                  <motion.div
                    key={`${med.title}-${idx}`}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.3) }}
                    className={`rounded-2xl border p-6 md:p-8 flex flex-col justify-between space-y-6 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-2xl overflow-hidden relative group ${cardBorderClass}`}
                  >
                    {/* Corner subtle colored visual decor */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-white/5 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                    
                    <div className="space-y-4 relative z-10">
                      {/* Medal details header */}
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between gap-3">
                          <span className="px-3 py-0.5 rounded-full bg-[#0A1128] text-[#CC2936] font-mono text-xs font-black tracking-widest border border-[#CC2936]/20 shrink-0">
                            {med.year}
                          </span>
                          <span className="text-2xl leading-none">{med.medal.includes('🥇') ? '🥇' : med.medal.includes('🥈') ? '🥈' : '🥉'}</span>
                        </div>
                        <div className={`text-xs font-extrabold uppercase tracking-widest ${medalGlowClass} pb-2 border-b border-zinc-800/40`}>
                          {med.medal.replace(/🥇|🥈|🥉/g, '').trim()}
                        </div>
                      </div>

                      {/* Main Title */}
                      <h4 className="text-lg md:text-xl font-display font-black text-white group-hover:text-[#CC2936] transition-colors uppercase leading-tight tracking-wide pt-1">
                        {med.title}
                      </h4>

                      {/* Explanation */}
                      <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                        {med.detail}
                      </p>
                    </div>

                    {/* Footer badge details representing authentic Kukkiwon lineage */}
                    <div className="pt-4 border-t border-[#1E3A8A]/20 flex justify-between items-center text-xs font-mono text-zinc-400 uppercase relative z-10">
                      <span className="tracking-wider">JK UNITED OFFICIAL</span>
                      <span className="text-[#CC2936] font-black tracking-widest">{med.type} record</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Peer recommendations excerpt block */}
          <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#0D1B3E] via-[#0A1128] to-[#0D1C44] border border-[#1E3A8A]/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 space-y-3 mb-4 lg:mb-0">
                <span className="text-xs font-black uppercase tracking-widest text-[#CC2936]">Testimonials Highlight</span>
                <h3 className="text-2xl font-display font-black text-white uppercase leading-tight">Approved by Community Families</h3>
                <p className="text-xs text-zinc-200 font-light leading-relaxed">
                  Read genuine praise written by advanced parents and adult students regarding Master Jin Kim's custom precision teaching.
                </p>
                <button
                  onClick={() => handleNavigation('home', '#testimonials')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-white transition-colors cursor-pointer mt-2"
                >
                  <span>See more parents reviews</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0A1128]/80 p-5 rounded-2xl border border-[#1E3A8A]/15 space-y-3">
                  <p className="text-xs text-zinc-300 leading-relaxed font-light italic">
                    "He sees everyone's different capability and level, and directs his teachings based on each different individual. This custom precision elevates his classes beyond standard training."
                  </p>
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase font-display">Nahid Sabbaghkar</h5>
                    <p className="text-[10px] text-zinc-300 uppercase mt-0.5">Family Parent Review</p>
                  </div>
                </div>
                
                <div className="bg-[#0A1128]/80 p-5 rounded-2xl border border-[#1E3A8A]/15 space-y-3">
                  <p className="text-xs text-zinc-300 leading-relaxed font-light italic">
                    "I have seen him work with students ranging in age from 4 years to senior adults and he always finds ways to motivate and bring out the best in everyone. His classes are energetic, structured, and profoundly educational."
                  </p>
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase font-display">Paul Schulte</h5>
                    <p className="text-[10px] text-zinc-300 uppercase mt-0.5">Advanced Adult Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to action spot */}
          <div className="py-10 bg-gradient-to-r from-[#CC2936]/15 to-[#1E3A8A]/15 border border-[#CC2936]/35 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="space-y-2">
              <h4 className="text-lg font-display font-black text-white uppercase tracking-tight">Train Directly with Master Kim</h4>
              <p className="text-xs text-zinc-200 max-w-xl font-light">
                Secure your student's spot on the mat. We offer an orientation sequence for Tiny Tigers, School-Age Kids, and Adult Conditioning categories.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
              <button
                onClick={() => {
                  setSelectedProgram('Adult Traditional Forms/Poomsae');
                  setTrialModalOpen(true);
                }}
                className="bg-[#CC2936] text-white hover:bg-white hover:text-black font-extrabold text-xs tracking-wider uppercase px-6 py-3.5 rounded-full transition-all duration-300 cursor-pointer active:scale-95 shadow-lg shadow-red-500/20 w-full sm:w-auto text-center"
              >
                Inquire orientation spot
              </button>
              <a
                href="tel:7209004546"
                className="bg-neutral-900 text-zinc-300 hover:text-white font-extrabold text-xs tracking-wider uppercase px-6 py-3.5 rounded-full transition-all duration-300 border border-neutral-800 text-center flex items-center justify-center gap-1.5 w-full sm:w-auto cursor-pointer"
              >
                <Phone size={13} className="text-[#CC2936]" />
                <span>Call (720) 900-4546</span>
              </a>
            </div>
          </div>
        </motion.div>
  );
}
