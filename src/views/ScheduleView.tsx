export interface ScheduleViewProps {
  handleNavigation: (view: 'home' | 'about-us' | 'gallery' | 'education' | 'schedule', hash?: string) => void;
  scheduleFilter: string;
  setScheduleFilter: (filter: string) => void;
  setSelectedProgram: (program: string) => void;
  setTrialModalOpen: (open: boolean) => void;
}

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

export default function ScheduleView({ handleNavigation, scheduleFilter, setScheduleFilter, setSelectedProgram, setTrialModalOpen }: ScheduleViewProps) {
  return (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 space-y-12"
        >
          {/* Breadcrumbs return bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0D1B3E] border border-[#1E3A8A]/35 p-4 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-zinc-200">
              <button
                onClick={() => handleNavigation('home')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                HOME
              </button>
              <ChevronRight size={12} className="text-[#CC2936]" />
              <span className="text-white font-semibold flex items-center gap-1.5 uppercase">
                <Clock size={12} className="text-[#CC2936]" /> SPEED CLASS SCHEDULE
              </span>
            </div>
            
            <button
              onClick={() => handleNavigation('home')}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-200 hover:text-white transition-colors font-bold uppercase cursor-pointer"
            >
              <ChevronLeft size={14} />
              Return Main Page
            </button>
          </div>

          {/* Heading section */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black tracking-widest text-[#CC2936] uppercase px-3 py-1 bg-[#CC2936]/10 rounded-full border border-[#CC2936]/30">Class Schedule</span>
            <h1 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight">Weekly Class Schedule</h1>
            <p className="text-sm text-zinc-200 font-light leading-relaxed">
              Select your category below to filter the schedule. Click any class to book your Free 1-Week Trial instantly.
            </p>
          </div>

          {/* Interactive filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 pb-2">
            {[
              { id: 'all', label: 'All Classes', count: 18 },
              { id: 'tigers', label: 'Tiny Tigers (Ages 4-6)', count: 3 },
              { id: 'children', label: 'Children (Ages 6-12)', count: 5 },
              { id: 'adults_family', label: 'Teens, Adults & Families', count: 6 },
              { id: 'special', label: 'Black Belt & Competition', count: 4 },
            ].map((tab) => {
              const isActive = scheduleFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setScheduleFilter(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer border transition-all ${
                    isActive
                      ? 'bg-[#CC2936] border-[#CC2936] text-white shadow-lg shadow-red-500/10'
                      : 'bg-[#0D1B3E] hover:bg-[#122453] border-[#1E3A8A]/30 text-zinc-300'
                  }`}
                >
                  {tab.label} <span className="ml-1 text-[10px] opacity-60 font-light font-mono">({tab.count})</span>
                </button>
              );
            })}
          </div>

          {/* Visual Weekly Schedule Board */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                day: 'Monday',
                desc: 'Weekday Opener',
                classes: [
                  { time: '3:50 PM - 4:20 PM', name: 'Tiny Tigers', age: 'Ages 4 - 6', type: 'tigers', desc: 'Symmetrical basic coordination, listening, and basic respect.' },
                  { time: '4:30 PM - 5:10 PM', name: 'Children Intermediate/Advanced', age: 'Ages 6 - 12 (Blue Belt & Up)', type: 'children', desc: 'Focus on high-belt forms, sparring speed, and target drills.' },
                  { time: '5:20 PM - 6:10 PM', name: 'Teen & Adult Class', age: 'Ages 12 & Above (All levels)', type: 'adults_family', desc: 'Dynamic stamina, flexibility, self-defense, and traditional forms.' }
                ]
              },
              {
                day: 'Tuesday',
                desc: 'Technical Core',
                classes: [
                  { time: '3:50 PM - 4:20 PM', name: 'Tiny Tigers', age: 'Ages 4 - 6', type: 'tigers', desc: 'Confidence building, agility courses, and basic TKD patterns.' },
                  { time: '4:30 PM - 5:10 PM', name: 'Children Beginner/Intermediate', age: 'Ages 6 - 12 (White/Yellow/Purple/Green)', type: 'children', desc: 'Stance precision, primary kicks, and basic belt rules.' },
                  { time: '5:20 PM - 6:00 PM', name: 'Black Belt Class', age: 'Elite Black Belts (All ages)', type: 'special', desc: 'High-level poomsae detailing and direct lineage requirements.' },
                  { time: '6:10 PM - 7:00 PM', name: 'Family (All Levels)', age: 'Parents & Kids Welcome', type: 'adults_family', desc: 'Bond together under guided athletic lessons and mutual gains.' }
                ]
              },
              {
                day: 'Wednesday',
                desc: 'Midweek Performance',
                classes: [
                  { time: '3:50 PM - 4:20 PM', name: 'Tiny Tigers', age: 'Ages 4 - 6', type: 'tigers', desc: 'Energetic drills modeling safety, sharing, and self-control.' },
                  { time: '4:30 PM - 5:10 PM', name: 'Children Advanced', age: 'Ages 6 - 12 (Brown Belt & Up)', type: 'children', desc: 'Elite physical training, deep stance review, and precision techniques.' },
                  { time: '5:20 PM - 6:00 PM', name: 'Children Beginner/Intermediate', age: 'Ages 6 - 12 (White/Yellow/Purple/Green)', type: 'children', desc: 'Core stances, dynamic patterns defense, and physical balance.' },
                  { time: '6:05 PM - 6:45 PM', name: 'Black Belt Class', age: 'Elite Black Belts', type: 'special', desc: 'Precision kicking combinations and standard forms revision.' },
                  { time: '6:50 PM - 7:40 PM', name: 'Teen & Adult Class', age: 'Ages 12 & Above (All levels)', type: 'adults_family', desc: 'Intense metabolic burn, technical poomsae, and core training.' }
                ]
              },
              {
                day: 'Thursday',
                desc: 'Tactical & Sparring',
                classes: [
                  { time: '4:30 PM - 5:10 PM', name: 'Children Beginner', age: 'White/Yellow/Purple (Ages 6-12)', type: 'children', desc: 'Foundation elements, hand guards, and speed responses.' },
                  { time: '5:20 PM - 6:00 PM', name: 'Children Green Belt & Up Sparring', age: 'Ages 6 - 12 (Sparring Track)', type: 'special', desc: 'Controlled tactical drills, protective gear usage, and target sparring.' },
                  { time: '6:10 PM - 7:00 PM', name: 'Family (All Levels)', age: 'Parents & Kids Welcome', type: 'adults_family', desc: 'Work with your family members to build stamina and life discipline.' }
                ]
              },
              {
                day: 'Friday',
                desc: 'Review & Tournament Prep',
                classes: [
                  { time: '4:00 PM - 4:40 PM', name: 'Children All Levels', age: 'Ages 6 - 12 (Belt Review)', type: 'children', desc: 'Refine belt-testing curriculum under physical agility circuits.' },
                  { time: '4:50 PM - 5:40 PM', name: 'Family (All Levels)', age: 'Parents & Kids Welcome', type: 'adults_family', desc: 'End-of-week active group workout to keep energy positive.' },
                  { time: '5:50 PM - 7:50 PM', name: 'Poomsae Competition Team', age: 'Members Only (By Invitation)', type: 'special', desc: 'Elite tournament conditioning, advanced technical poomsae standards.' }
                ]
              },
              {
                day: 'Saturday',
                desc: 'Private Focus',
                classes: [
                  { time: 'By Appointment', name: 'Private Lessons', age: 'All Ages • All Belts', type: 'adults_family', desc: 'Custom tailored session with Master Jin Hyuk Kim to perfect specific details.' }
                ]
              }
            ].map((dayBoard) => {
              const filteredClasses = dayBoard.classes.filter(
                (c) => scheduleFilter === 'all' || c.type === scheduleFilter
              );

              if (filteredClasses.length === 0) return null;

              return (
                <motion.div
                  layout
                  key={dayBoard.day}
                  className="bg-[#0D1B3E]/85 border border-[#1E3A8A]/35 rounded-2xl p-5 space-y-4 hover:border-[#CC2936]/40 transition-colors shadow-xl"
                >
                  <div className="flex justify-between items-baseline pb-3 border-b border-[#1E3A8A]/20">
                    <h3 className="text-lg font-display font-black text-white uppercase tracking-tight">{dayBoard.day}</h3>
                    <span className="text-[10px] font-mono tracking-wider text-zinc-200 font-semibold uppercase">{dayBoard.desc}</span>
                  </div>

                  <div className="space-y-3.5">
                    {filteredClasses.map((cl, index) => {
                      let badgeBg = 'bg-[#CC2936]/10 text-[#CC2936] border-[#CC2936]/30';
                      if (cl.type === 'tigers') badgeBg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                      if (cl.type === 'children') badgeBg = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
                      if (cl.type === 'special') badgeBg = 'bg-amber-400/10 text-amber-400 border-amber-400/20';

                      return (
                        <div
                          key={index}
                          onClick={() => {
                            let mappedProg = 'Children (Ages 7-12)';
                            if (cl.type === 'tigers') {
                              mappedProg = 'Tiny Tigers (Ages 4-6)';
                            } else if (cl.type === 'adults_family') {
                              mappedProg = 'Teen / Adult (Ages 13 and above)';
                            } else if (cl.name.toLowerCase().includes('poomsae') || cl.name.toLowerCase().includes('form')) {
                              mappedProg = 'Adult Traditional Forms/Poomsae';
                            }
                            setSelectedProgram(mappedProg);
                            setTrialModalOpen(true);
                          }}
                          className="group relative bg-[#0A1128]/70 border border-[#1E3A8A]/15 hover:border-[#CC2936]/30 p-3.5 rounded-xl cursor-pointer transition-all hover:scale-[1.01] hover:bg-[#0B1533] space-y-2"
                        >
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-xs font-mono font-black text-amber-400 tracking-tight">{cl.time}</span>
                            <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded border ${badgeBg}`}>
                              {cl.type === 'tigers' && ' Tigers '}
                              {cl.type === 'children' && ' Kids '}
                              {cl.type === 'adults_family' && ' Teen/Adult '}
                              {cl.type === 'special' && ' Advanced '}
                            </span>
                          </div>

                          <div>
                            <h4 className="text-sm font-bold text-white group-hover:text-[#CC2936] transition-colors leading-snug">{cl.name}</h4>
                            <p className="text-[10px] text-zinc-200 font-medium">{cl.age}</p>
                          </div>

                          <p className="text-[11px] text-zinc-350 font-light leading-relaxed pt-0.5">{cl.desc}</p>

                          <div className="flex items-center gap-1 text-[10px] text-[#CC2936] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pt-1">
                            <span>Claim Free Week Spot</span>
                            <ArrowRight size={10} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Informational Notice segment */}
          <div className="bg-[#0A1128] border border-[#1E3A8A]/25 p-6 rounded-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white uppercase tracking-tight">Looking to customize your student's schedule?</h4>
              <p className="text-xs text-zinc-200 font-light font-sans">
                We offer flexible private sessions and customized competition drills on Saturday mornings.
              </p>
            </div>
            
            <button
              onClick={() => {
                document.getElementById('hours')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#CC2936] hover:bg-white hover:text-black text-white font-extrabold uppercase tracking-widest text-[10px] sm:text-xs px-6 py-3 rounded-full transition-all shrink-0 cursor-pointer"
            >
              Contact Master Directly
            </button>
          </div>
        </motion.div>
  );
}
