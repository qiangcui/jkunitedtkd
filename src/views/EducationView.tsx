export interface EducationViewProps {
  handleNavigation: (view: 'home' | 'about-us' | 'gallery' | 'education' | 'schedule', hash?: string) => void;
  selectedBelt: string;
  setSelectedBelt: (belt: string) => void;
  vocabSearch: string;
  setVocabSearch: (value: string) => void;
  vocabCategory: string;
  setVocabCategory: (value: string) => void;
  educationTab: 'rankings' | 'taegeuk' | 'wonshim' | 'flags' | 'terminology' | 'philosophy';
  setEducationTab: (tab: 'rankings' | 'taegeuk' | 'wonshim' | 'flags' | 'terminology' | 'philosophy') => void;
  activeTaegeukId: number;
  setActiveTaegeukId: (id: number) => void;
  activeWonshimLevel: number;
  setActiveWonshimLevel: (level: number) => void;
  playingAudioUrl: string | null;
  setPlayingAudioUrl: (url: string | null) => void;
  currentAudioObj: HTMLAudioElement | null;
  setCurrentAudioObj: (audio: HTMLAudioElement | null) => void;
}

import {
  TAEGEUK_FORMS,
  FLAGS_HONOR,
  CALLIGRAPHY_ITEMS,
  BELT_RANKINGS,
  PHILOSOPHY_CREEDS,
  ASSOCIATION_PHILOSOPHIES,
  SCHOOL_PHILOSOPHIES,
  TIME_MANAGEMENT_KEYS,
  START_CLASS_PROCEDURES,
  END_CLASS_PROCEDURES,
  TERMINOLOGY_STANCES,
  TERMINOLOGY_BLOCKS,
  TERMINOLOGY_KICKS,
  TERMINOLOGY_COUNTING,
  TERMINOLOGY_NUMBERINGS,
  TERMINOLOGY_ANATOMY,
  TERMINOLOGY_GENERAL,
  WONSHIM_DRILLS
} from '../education_data';

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

export default function EducationView({ handleNavigation, selectedBelt, setSelectedBelt, vocabSearch, setVocabSearch, vocabCategory, setVocabCategory, educationTab, setEducationTab, activeTaegeukId, setActiveTaegeukId, activeWonshimLevel, setActiveWonshimLevel, playingAudioUrl, setPlayingAudioUrl, currentAudioObj, setCurrentAudioObj }: EducationViewProps) {
  return (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 space-y-10"
          id="education-academic-panel"
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
              Home <span className="mx-1">•</span> <span className="text-[#CC2936]">Education & Curriculum</span>
            </div>
          </div>

          {/* Title Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1 bg-[#1E3A8A]/20 border border-[#1E3A8A]/40 text-[#CC2936] font-bold text-xs tracking-widest uppercase rounded-full">
              <BookOpen size={13} />
              <span>JK United Academy</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
              Taekwondo Academic Center
            </h1>
            <div className="h-0.5 w-16 bg-[#CC2936] mx-auto" />
            <p className="text-sm text-zinc-200 max-w-2xl mx-auto font-light leading-relaxed">
              Welcome to the digital student handbook of JK United. Explore the core philosophies, master forms, vocabulary pronunciation audio, and tactical sparring combinations.
            </p>
          </div>

          {/* Premium Subsection Navigation Tab Pills */}
          <div className="flex flex-wrap gap-2.5 justify-center border-b border-[#1E3A8A]/10 pb-6">
            {[
              { id: 'rankings', label: 'Belts & Rankings', icon: Award, desc: 'Gup/Dan syllabus requirements' },
              { id: 'taegeuk', label: 'Taegeuk Forms', icon: BookOpen, desc: 'Step-by-step master choreography' },
              { id: 'wonshim', label: 'Won Shim Combats', icon: Target, desc: 'Tactical defense combinations' },
              { id: 'terminology', label: 'Terminology Audio', icon: Volume2, desc: 'Interactive pronunciation dictionary' },
              { id: 'flags', label: 'Flags & Calligraphy', icon: Flag, desc: 'Traditional symbols & insignia' },
              { id: 'philosophy', label: 'Creeds & Procedures', icon: ShieldCheck, desc: 'Student ethics & protocols' },
            ].map((tab) => {
              const IconComp = tab.icon;
              const isActive = educationTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setEducationTab(tab.id as any);
                    if (currentAudioObj) currentAudioObj.pause();
                    setPlayingAudioUrl(null);
                  }}
                  className={`flex items-center gap-3 py-3 px-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer w-full sm:w-auto ${
                    isActive
                      ? 'border-[#CC2936] bg-[#CC2936]/10 text-white shadow-lg shadow-[#CC2936]/5'
                      : 'border-[#1E3A8A]/20 bg-[#0D1B3E] text-zinc-200 hover:text-white hover:border-[#1E3A8A]/40'
                  }`}
                >
                  <IconComp size={18} className={isActive ? 'text-[#CC2936]' : 'text-zinc-300'} />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider">{tab.label}</div>
                    <div className="text-[9px] font-mono text-zinc-300 font-light hidden md:block">{tab.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tab Item 1: BELT RANKINGS */}
          {educationTab === 'rankings' && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Belt Selection Left List */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-[#0D1B3E] rounded-2xl border border-[#1E3A8A]/20 p-5 space-y-2">
                    <span className="text-xs font-mono font-bold uppercase text-amber-500 tracking-widest block font-light">Level Selector</span>
                    <h3 className="text-lg font-display font-black text-white uppercase">Grade & Rank Steps</h3>
                    <p className="text-xs text-zinc-200 leading-relaxed font-light">
                      Select a belt rank below to load its strict JK United curriculum milestones and traditional symbolism.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 max-h-[460px] overflow-y-auto pr-1">
                    {BELT_RANKINGS.map((b) => (
                      <button
                        key={b.color}
                        onClick={() => setSelectedBelt(b.color)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-extrabold uppercase transition-all duration-200 cursor-pointer ${
                          selectedBelt === b.color
                            ? 'border-white bg-white/10 text-white scale-[1.01]'
                            : 'border-[#1E3A8A]/10 bg-[#0D1B3E] text-zinc-200 hover:text-white hover:border-[#1E3A8A]/35'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-3 h-3 rounded-full ${b.dotColor} shadow-sm border border-white/10`} />
                          <span>{b.color}</span>
                        </div>
                        <span className="text-[10px] font-mono font-light text-zinc-350 hidden sm:inline">{b.gup}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Belt Details Presentation Right Card */}
                <div className="lg:col-span-8">
                  {(() => {
                    const activeB = BELT_RANKINGS.find(b => b.color === selectedBelt) || BELT_RANKINGS[0];
                    return (
                      <div className="bg-[#0E1B3E] rounded-3xl border border-[#1E3A8A]/30 p-6 md:p-8 h-full flex flex-col justify-between space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#CC2936]/5 rounded-bl-full pointer-events-none" />
                        
                        <div className="space-y-6 flex-1">
                          <div className="flex items-center gap-4 border-b border-[#1E3A8A]/15 pb-4">
                            <span className="w-10 h-10 rounded-full bg-[#0A1128] border border-white/10 flex items-center justify-center text-[#CC2936]">
                              <Award size={20} />
                            </span>
                            <div>
                              <div className="flex items-baseline gap-2">
                                <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                                  {activeB.color} Belt
                                </h3>
                                <span className="text-xs font-mono text-zinc-200 font-bold">({activeB.gup})</span>
                              </div>
                              <span className="text-[10px] font-mono text-zinc-200 uppercase tracking-widest block">Syllabus Requirements & Milestones</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-xs uppercase text-amber-500 font-extrabold tracking-wider flex items-center gap-1.5">
                              <Info size={13} />
                              <span>Traditional Symbolism</span>
                            </h4>
                            <p className="text-sm text-zinc-300 font-light leading-relaxed font-sans">
                              {activeB.description}
                            </p>
                          </div>

                          {activeB.starText && (
                            <div className="p-3.5 bg-amber-500/5 rounded-xl border border-amber-500/20 space-y-1">
                              <div className="text-xs font-bold uppercase text-amber-400 tracking-wider flex items-center gap-1">
                                <Star size={14} className="fill-amber-400 text-amber-400" />
                                <span>Leader Stars Program</span>
                              </div>
                              <p className="text-xs text-zinc-300 font-light font-sans">
                                Features 3 prominent colored leadership stars awarded for: <span className="text-white font-semibold">{activeB.starText}</span>.
                              </p>
                            </div>
                          )}

                          <div className="space-y-3">
                            <h4 className="text-xs uppercase text-amber-500 font-extrabold tracking-wider">Required Calibration Milestones</h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {[
                                "Mastering stance symmetry & core coordination",
                                "Executing direct speed block transitions",
                                "Continuous fluid form repetition with loud Kihap",
                                "Respectful class alignment etiquette"
                              ].map((task, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 p-2 bg-[#0A1128]/50 rounded-lg border border-[#1E3A8A]/10 text-xs text-zinc-300 leading-relaxed font-light">
                                  <span className="w-5 h-5 rounded-md bg-[#0D1B3E] border border-white/5 flex items-center justify-center shrink-0 mt-0.5 text-[#CC2936] font-mono text-[9px] font-bold">
                                    {idx + 1}
                                  </span>
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="border-t border-[#1E3A8A]/15 pt-4 flex gap-3 items-center text-xs italic text-[#CC2936]">
                          <span className="text-lg font-serif">"</span>
                          <p className="font-light">A student who persists moves mountains. The path to Black Belt begins with a single respectful bow.</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Complete rankings Gup progression table */}
              <div className="space-y-4">
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-display font-black text-white uppercase tracking-tight">Syllabus Grade Overview Reference TABLE</h3>
                  <div className="h-0.5 w-12 bg-[#CC2936] mt-1.5 mx-auto md:mx-0" />
                </div>
                <div className="overflow-x-auto rounded-xl border border-[#1E3A8A]/20 bg-[#0A1128]">
                  <table className="min-w-full divide-y divide-[#1E3A8A]/20 text-left text-xs">
                    <thead className="bg-[#0E1B3E] text-zinc-200 uppercase font-mono font-bold tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-4 sm:px-6">Grade / Rank</th>
                        <th className="py-3 px-4 sm:px-6">Belt Color</th>
                        <th className="py-3 px-4 sm:px-6">Philosophical Meaning & Phase Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E3A8A]/10 text-zinc-300 font-light">
                      {BELT_RANKINGS.map((b) => (
                        <tr key={b.gup} className="hover:bg-[#0D1B3E]/40 transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-mono font-semibold text-[#CC2936]">
                            {b.gup}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 font-bold uppercase text-white flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full ${b.dotColor} border border-white/10`} />
                            <span>{b.color}</span>
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-zinc-200 font-light text-xs whitespace-normal leading-relaxed">
                            {b.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab Item 2: TAEGEUK FORMS */}
          {educationTab === 'taegeuk' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form selection and meaning card */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-[#0E1B3E] rounded-2xl border border-[#1E3A8A]/25 p-5 space-y-4">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase text-[#CC2936] tracking-widest block">Traditional Forms</span>
                    <h3 className="text-lg font-display font-black text-white uppercase">TaeGuk Patterns</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {TAEGEUK_FORMS.map((form) => (
                      <button
                        key={form.id}
                        onClick={() => setActiveTaegeukId(form.id)}
                        className={`flex flex-col text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                          activeTaegeukId === form.id
                            ? 'border-[#CC2936] bg-[#CC2936]/5 scale-[1.02]'
                            : 'border-[#1E3A8A]/15 bg-[#0A1128] hover:border-[#1E3A8A]/30'
                        }`}
                      >
                        <span className="text-[10px] font-mono text-zinc-350">Form 0{form.id}</span>
                        <span className="text-xs font-black uppercase text-white tracking-wide">{form.name.split(' ')[1] + ' ' + (form.name.split(' ')[2] || '')}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {(() => {
                  const form = TAEGEUK_FORMS.find(f => f.id === activeTaegeukId) || TAEGEUK_FORMS[0];
                  return (
                    <div className="bg-[#0D1B3E] rounded-2xl border border-[#1E3A8A]/20 p-5 space-y-3">
                      <div className="border-b border-zinc-700/30 pb-2">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">Philosophical Concept</span>
                        <h4 className="text-base font-display font-black text-[#CC2936] uppercase">{form.meaning}</h4>
                      </div>
                      <p className="text-xs text-zinc-300 font-light leading-relaxed">
                        {form.symbolism}
                      </p>
                    </div>
                  );
                })()}
              </div>

              {/* Step checklist and youtube video embed */}
              <div className="lg:col-span-8 space-y-6">
                {(() => {
                  const form = TAEGEUK_FORMS.find(f => f.id === activeTaegeukId) || TAEGEUK_FORMS[0];
                  return (
                    <div className="space-y-6">
                      {/* Interactive step list */}
                      <div className="bg-[#0E1B3E] rounded-2xl border border-[#1E3A8A]/20 p-6 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1E3A8A]/15 pb-4 gap-2">
                          <div>
                            <h3 className="text-lg font-display font-black text-white uppercase">{form.name} Walkthrough</h3>
                            <p className="text-xs text-zinc-200 font-light">Choreographed pattern of defensive and offensive moves representing universe forces.</p>
                          </div>
                          <span className="px-3 py-1 bg-[#CC2936]/15 border border-[#CC2936]/30 rounded-full text-[10px] font-mono text-[#CC2936] font-semibold uppercase tracking-wider self-start sm:self-auto">
                            {form.steps.length} total steps
                          </span>
                        </div>

                        <div className="max-h-[350px] overflow-y-auto space-y-2 pr-1.5 scrollbar-thin">
                          {form.steps.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 bg-[#0A1128]/50 border border-white/5 rounded-xl hover:border-[#1E3A8A]/20 transition-all">
                              <span className="w-6 h-6 rounded-lg bg-[#0D1B3E] border border-white/5 flex items-center justify-center shrink-0 text-white font-mono text-xs font-black">
                                {idx + 1}
                              </span>
                              <div className="text-xs text-zinc-300 font-light leading-relaxed pt-0.5">
                                <span className="text-white font-semibold">
                                  {step.includes(':') ? step.split(':')[0] + ':' : ''}
                                </span>
                                {step.includes(':') ? step.split(':')[1] : step}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* YouTube video panel */}
                      <div className="bg-[#0E1B3E] rounded-2xl border border-[#1E3A8A]/20 p-5 space-y-3.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                          <h4 className="text-xs font-mono font-bold uppercase text-white tracking-widest">Master Kim Official Demonstration Video</h4>
                        </div>
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 shadow-2xl">
                          <iframe
                            title={`${form.name} Youtube Video Video Player`}
                            src={form.videoUrl}
                            className="absolute inset-0 w-full h-full animate-fade-in"
                            frameBorder="0"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Tab Item 3: WON SHIM COMBAT DRILLS */}
          {educationTab === 'wonshim' && (
            <div className="space-y-6">
              {/* Selector Bar */}
              <div className="p-6 bg-[#0E1B3E] rounded-2xl border border-[#1E3A8A]/20 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center md:text-left">
                  <span className="text-xs font-mono font-bold uppercase text-[#CC2936] tracking-widest block text-red-500">Combat Defense Drill</span>
                  <h3 className="text-xl font-display font-black text-white uppercase">Won Shim Self-Defense Drills</h3>
                  <p className="text-xs text-zinc-400 font-light max-w-lg leading-relaxed">
                    Dynamic partner-defense drills incorporating rapid sweeping blocks, evasion angles, wrist traps, and finishing counterattacks.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 justify-center">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setActiveWonshimLevel(lvl)}
                      className={`w-12 h-12 rounded-xl border font-display font-black text-sm uppercase transition-all duration-200 cursor-pointer flex flex-col items-center justify-center ${
                        activeWonshimLevel === lvl
                          ? 'border-[#CC2936] bg-[#CC2936]/15 text-[#CC2936] scale-[1.05]'
                          : 'border-[#1E3A8A]/15 bg-[#0D1B3E] text-zinc-400 hover:text-white hover:border-[#1E3A8A]/35'
                      }`}
                    >
                      <span className="text-[7px] font-mono text-zinc-500 block uppercase font-light">Lvl</span>
                      <span>0{lvl}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Table */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold uppercase text-amber-500 tracking-widest">
                    Tactical Matrix: Won Shim Level {activeWonshimLevel}
                  </h4>
                  <span className="text-zinc-350 font-mono text-[10px]">8 sequential movements</span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-[#1E3A8A]/20 bg-[#0A1128]">
                  <table className="min-w-full divide-y divide-[#1E3A8A]/20 text-left text-xs whitespace-normal sm:whitespace-nowrap">
                    <thead className="bg-[#0E1B3E] text-zinc-400 uppercase font-mono font-bold tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-4 text-center w-12 text-[#CC2936]">#</th>
                        <th className="py-3 px-4 w-44">Incoming Attack</th>
                        <th className="py-3 px-4 w-48">Starting Posture</th>
                        <th className="py-3 px-4">Defensive Choreography Matrix</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E3A8A]/10 text-zinc-300 font-light">
                      {(WONSHIM_DRILLS[activeWonshimLevel] || WONSHIM_DRILLS[1]).map((drill, idx) => (
                        <tr key={drill.no} className="hover:bg-[#0D1B3E]/40 transition-colors">
                          <td className="py-4 px-4 text-center font-mono font-black text-white text-xs bg-[#0D1B3E]/20">
                            {drill.no}
                          </td>
                          <td className="py-4 px-4 font-mono font-bold text-[#CC2936] text-[11px]">
                            {drill.attack}
                          </td>
                          <td className="py-4 px-4 text-zinc-250 text-xs italic font-light">
                            {drill.startingPosition}
                          </td>
                          <td className="py-4 px-4">
                            <div className="space-y-1">
                              {drill.defense.map((defenseStep, dsIdx) => (
                                <div key={dsIdx} className="flex items-start gap-1 text-[11px] leading-relaxed text-zinc-300">
                                  <span className="text-amber-500 font-mono shrink-0 mr-1 font-semibold">{dsIdx + 1}.</span>
                                  <span className="font-light">{defenseStep}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab Item 4: TERMINOLOGY & AUDIO PRONUNCIATION */}
          {educationTab === 'terminology' && (
            <div className="space-y-6">
              {/* Headline with Search and Filter bar */}
              <div className="p-6 bg-[#0E1B3E] rounded-2xl border border-[#1E3A8A]/25 space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold uppercase text-[#CC2936] tracking-widest block text-red-500">Pronunciation Guide</span>
                    <h3 className="text-xl font-display font-black text-white uppercase">Traditional Pronunciation Audio Directory</h3>
                    <p className="text-xs text-zinc-200 font-light font-sans">
                      Type to filter vocabulary and click any card's play button to hear actual Korean pronunciations.
                    </p>
                  </div>

                  <div className="relative w-full lg:w-96 select-none shrink-0 border border-white/5 rounded-full overflow-hidden">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500 pointer-events-none">
                      <Search size={14} />
                    </span>
                    <input
                      type="text"
                      placeholder="Search Korean or English terminology..."
                      value={vocabSearch}
                      onChange={(e) => setVocabSearch(e.target.value)}
                      className="w-full bg-[#0A1128] border-none py-2.5 pl-10 pr-5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#CC2936] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Category tabs */}
              <div className="flex flex-wrap gap-2 pb-1">
                {[
                  { id: 'all', label: 'All Categories' },
                  { id: 'stances', label: 'Stances (Suh-gi)' },
                  { id: 'blocks', label: 'Blocks (Mak-gi)' },
                  { id: 'kicks', label: 'Kicks (Cha-gi)' },
                  { id: 'counting', label: 'Counting / Numbers' },
                  { id: 'anatomy', label: 'Anatomy / Etiquette' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setVocabCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                      vocabCategory === cat.id
                        ? 'border-[#CC2936] bg-[#CC2936]/15 text-white shadow-sm'
                        : 'border-[#1E3A8A]/15 bg-[#0D1B3E] text-zinc-200 hover:text-white hover:border-[#1E3A8A]/35'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Terminology Category Panels */}
              {[
                { id: 'stances', title: "Suh-gi / 서기 (Stances / Posture)", list: TERMINOLOGY_STANCES },
                { id: 'blocks', title: "Mak-gi / 막기 (Blocks / Shielding)", list: TERMINOLOGY_BLOCKS },
                { id: 'kicks', title: "Cha-gi / 차기 (Kicks / Offense)", list: TERMINOLOGY_KICKS },
                { id: 'counting', title: "Hana to Yool / 하나~열 (Counting / Set Sets)", list: TERMINOLOGY_COUNTING },
                { id: 'counting', title: "Il to Ship / 일~십 (Numbering / Sequence)", list: TERMINOLOGY_NUMBERINGS },
                { id: 'anatomy', title: "Basic Anatomy (Body Targets)", list: TERMINOLOGY_ANATOMY },
                { id: 'anatomy', title: "General Etiquette & Titles", list: TERMINOLOGY_GENERAL }
              ].filter(cat => vocabCategory === 'all' || cat.id === vocabCategory)
               .map((category) => {
                // Filter the list based on search term
                const filtered = category.list.filter(item => 
                  item.korean.toLowerCase().includes(vocabSearch.toLowerCase()) ||
                  item.pronunciation.toLowerCase().includes(vocabSearch.toLowerCase()) ||
                  item.english.toLowerCase().includes(vocabSearch.toLowerCase())
                );

                if (filtered.length === 0) return null;

                return (
                  <div key={category.title} className="space-y-4">
                    <div className="flex items-center gap-2 pb-1 border-b border-zinc-850">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#CC2936]" />
                      <h4 className="text-xs uppercase font-mono font-extrabold tracking-wider text-zinc-200">
                        {category.title}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {filtered.map((item) => {
                        const isPlaying = playingAudioUrl === item.audioUrl;
                        return (
                          <div
                            key={item.korean + item.english}
                            className={`p-4 rounded-xl border transition-all duration-300 ${
                              isPlaying 
                                ? 'border-[#CC2936] bg-[#CC2936]/5 shadow-md shadow-[#CC2936]/10' 
                                : 'border-[#1E3A8A]/15 bg-[#0B1536]/80 hover:border-zinc-700'
                            }`}
                          >
                            <div className="flex justify-between items-start gap-4">
                              <div className="space-y-1 flex-1">
                                <h5 className="text-sm font-display font-black text-white tracking-wide uppercase line-clamp-1">{item.korean}</h5>
                                <p className="text-[10px] font-mono text-[#CC2936] italic line-clamp-1">({item.pronunciation})</p>
                                <p className="text-[11px] text-zinc-400 font-light leading-snug pt-1 line-clamp-2">{item.english}</p>
                              </div>
                              
                              {item.audioUrl && (
                                <button
                                  onClick={() => {
                                    if (playingAudioUrl === item.audioUrl) {
                                      if (currentAudioObj) currentAudioObj.pause();
                                      setPlayingAudioUrl(null);
                                    } else {
                                      if (currentAudioObj) currentAudioObj.pause();
                                      const audio = new Audio(item.audioUrl);
                                      setCurrentAudioObj(audio);
                                      setPlayingAudioUrl(item.audioUrl);
                                      audio.play().catch(e => {
                                        console.log("Play blocked", e);
                                        setPlayingAudioUrl(null);
                                      });
                                      audio.onended = () => {
                                        setPlayingAudioUrl(null);
                                      };
                                    }
                                  }}
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                                    isPlaying
                                      ? 'bg-[#CC2936] text-white animate-pulse'
                                      : 'bg-[#0D1B3E] text-zinc-200 border border-white/5 hover:text-white hover:bg-[#CC2936]/20'
                                  }`}
                                  title="Listen pronunciation"
                                >
                                  {isPlaying ? (
                                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping shrink-0" />
                                  ) : (
                                    <Volume2 size={13} className="shrink-0" />
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab Item 5: FLAGS & CALLIGRAPHY */}
          {educationTab === 'flags' && (
            <div className="space-y-12 animate-fade-in">
              {/* Flags cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {FLAGS_HONOR.map((flag) => (
                  <div key={flag.title} className="bg-[#0E1B3E] rounded-2xl border border-[#1E3A8A]/20 p-5 space-y-4 hover:border-white/10 transition-all flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Flag Image box */}
                      <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/5 bg-[#0A1128] flex items-center justify-center p-2 relative group select-none">
                        <img
                          src={flag.image}
                          alt={flag.title}
                          className="max-h-full max-w-full object-contain filter brightness-95 group-hover:scale-[1.03] transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-base font-display font-black text-white uppercase tracking-tight">{flag.title}</h4>
                        <p className="text-xs text-zinc-200 font-light leading-relaxed font-sans">{flag.text}</p>
                      </div>
                    </div>

                    {flag.details && (
                      <div className="pt-3 border-t border-[#1E3A8A]/10 space-y-1.5">
                        <span className="text-[9px] font-mono font-bold uppercase text-[#CC2936] tracking-wider block">Key Symbols Explained</span>
                        <ul className="space-y-1 text-[10px] text-zinc-200 leading-normal font-sans">
                          {flag.details.map((dt, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-1">
                              <span className="text-amber-500 font-mono shrink-0 mr-0.5">•</span>
                              <span>{dt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Calligraphy boards */}
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">Ancient Calligraphy Virtues</h3>
                  <div className="h-0.5 w-16 bg-[#CC2936] mx-auto mt-2" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {CALLIGRAPHY_ITEMS.map((c, idx) => (
                    <div key={c.term} className="bg-[#0B1536]/80 p-5 rounded-2xl border border-[#1E3A8A]/15 text-center relative overflow-hidden group hover:border-[#CC2936]/30 transition-all">
                      <div className="absolute top-0 left-0 w-8 h-8 rounded-br-2xl bg-[#0E1B3E] font-mono text-[9px] text-zinc-350 flex items-center justify-center">
                        0{idx + 1}
                      </div>

                      <div className="space-y-2 pt-4">
                        <span className="text-zinc-650 block text-[9.5px] font-semibold uppercase tracking-widest font-mono">Traditional Virtue</span>
                        <h5 className="text-base font-display font-black text-[#CC2936] uppercase tracking-wide">{c.term}</h5>
                        <div className="w-12 h-px bg-zinc-800 mx-auto" />
                        <p className="text-xs text-zinc-300 font-normal leading-relaxed font-sans">{c.meaning}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab Item 6: PHILOSOPHIES & PROTOCOLS (Creeds, Start/End procedures) */}
          {educationTab === 'philosophy' && (
            <div className="space-y-10 animate-fade-in">
              {/* Creeds grids */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PHILOSOPHY_CREEDS.map((cr) => (
                  <div key={cr.title} className="bg-[#0E1B3E] rounded-2xl border border-[#1E3A8A]/20 p-5 space-y-3.5 relative hover:border-[#1E3A8A]/35 transition-all">
                    <span className="w-7 h-7 rounded bg-[#CC2936]/10 text-[#CC2936] flex items-center justify-center font-bold text-xs uppercase font-mono">
                      Q
                    </span>
                    <h4 className="text-base font-display font-black text-white uppercase tracking-tight">{cr.title}</h4>
                    <p className="text-xs text-zinc-300 leading-relaxed font-light italic font-serif">
                      "{cr.content}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Multi-tier values block */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-[#1E3A8A]/10">
                {/* Association & school values */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="bg-[#0E1B3E] rounded-2xl p-5 border border-[#1E3A8A]/15 space-y-4">
                    <h4 className="text-xs font-mono font-bold uppercase text-amber-500 tracking-widest">Association Pillars</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {ASSOCIATION_PHILOSOPHIES.map((v) => (
                        <div key={v.term} className="space-y-1.5 p-3 rounded-lg bg-[#0A1128]/50 border border-white/5">
                          <div className="text-xs font-black uppercase text-white font-mono">{v.term}</div>
                          <span className="text-[10px] font-mono text-[#CC2936] font-bold uppercase tracking-wider">{v.english}</span>
                          <p className="text-[11px] text-zinc-200 font-light leading-relaxed font-sans">{v.meaning}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#0E1B3E] rounded-2xl p-5 border border-[#1E3A8A]/15 space-y-4">
                    <h4 className="text-xs font-mono font-bold uppercase text-amber-500 tracking-widest">School Core Virtues</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {SCHOOL_PHILOSOPHIES.map((v) => (
                        <div key={v.term} className="space-y-1.5 p-3 rounded-lg bg-[#0A1128]/50 border border-white/5">
                          <div className="text-xs font-black uppercase text-white font-mono">{v.term}</div>
                          <span className="text-[10px] font-mono text-[#CC2936] font-bold uppercase tracking-wider">{v.english}</span>
                          <p className="text-[11px] text-zinc-200 font-light leading-relaxed font-sans">{v.meaning}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Time management and inspirational quotes */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-[#0D1B3E] rounded-2xl border border-amber-500/20 p-5 space-y-3.5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full pointer-events-none" />
                    <div>
                      <span className="text-[9px] font-mono font-black text-amber-500 uppercase tracking-widest block font-light">Class Efficiency</span>
                      <h4 className="text-sm font-display font-black text-white uppercase">4 Keys to Time Management</h4>
                    </div>
                    
                    <ul className="space-y-2 text-xs">
                      {TIME_MANAGEMENT_KEYS.map((key, kIdx) => (
                        <li key={kIdx} className="flex items-start gap-2 text-zinc-300 font-light leading-relaxed font-sans">
                          <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 font-mono text-[9px] font-bold mt-0.5">
                            0{kIdx + 1}
                          </span>
                          <span>{key}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#0E1B3E] rounded-2xl border border-[#1E3A8A]/15 p-5 space-y-3">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">School Storyteller</span>
                    <p className="text-xs leading-relaxed text-zinc-300 italic font-serif">
                      "Nothing in the world can take the place of persistence. Persistence and determination alone are omnipotent."
                    </p>
                    <span className="text-[10px] font-mono text-[#CC2936] block font-bold">- Calvin Coolidge</span>
                  </div>
                </div>
              </div>

              {/* Class Procedures Sequential Lists Comparison */}
              <div className="space-y-4 pt-6 border-t border-[#1E3A8A]/10 animate-fade-in">
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-display font-black text-white uppercase tracking-tight">Standard Class Procedures Checklist</h3>
                  <p className="text-xs text-zinc-400 font-light mt-1">Compare traditional protocols practiced during the commencement and dismissal of each session.</p>
                            {/* Start Class Routine */}
                  <div className="bg-[#0E1B3E] p-5 rounded-2xl border border-[#1E3A8A]/15 space-y-4">
                    <span className="text-xs font-mono font-bold uppercase text-emerald-500 tracking-widest block">01. Start Class Routine</span>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                      {START_CLASS_PROCEDURES.map((item) => (
                        <div key={item.no} className="flex items-start gap-3 p-2 bg-[#0A1128]/50 border border-white/5 rounded-lg text-xs hover:border-[#1E3A8A]/10 transition-colors">
                          <span className="font-mono text-zinc-350 text-[10px] w-5 text-right font-black shrink-0 mt-0.5">{item.no}.</span>
                          <span className="text-zinc-300 font-light leading-relaxed font-sans">{item.step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* End Class Routine */}
                  <div className="bg-[#0E1B3E] p-5 rounded-2xl border border-[#1E3A8A]/15 space-y-4">
                    <span className="text-xs font-mono font-bold uppercase text-[#CC2936] tracking-widest block">02. End Class Routine</span>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                      {END_CLASS_PROCEDURES.map((item) => (
                        <div key={item.no} className="flex items-start gap-3 p-2 bg-[#0A1128]/50 border border-white/5 rounded-lg text-xs hover:border-[#CC2936]/10 transition-colors">
                          <span className="font-mono text-zinc-350 text-[10px] w-5 text-right font-black shrink-0 mt-0.5">{item.no}.</span>
                          <span className="text-zinc-300 font-light leading-relaxed font-sans">{item.step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
  );
}
