export interface GalleryViewProps {
  handleNavigation: (view: 'home' | 'about-us' | 'gallery' | 'education' | 'schedule', hash?: string) => void;
  galleryFilter: 'all' | 'master' | 'classes' | 'competition';
  setGalleryFilter: (filter: 'all' | 'master' | 'classes' | 'competition') => void;
  activeLightboxIndex: number | null;
  setActiveLightboxIndex: React.Dispatch<React.SetStateAction<number | null>>;
  isMobile: boolean;
}

import type React from 'react';
import { GALLERY_ITEMS } from '../data/galleryItems';

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

export default function GalleryView({ handleNavigation, galleryFilter, setGalleryFilter, activeLightboxIndex, setActiveLightboxIndex, isMobile }: GalleryViewProps) {
  return (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 space-y-12"
        >
          {/* Breadcrumbs return bar */}
          <div className="flex items-center justify-between border-b border-[#1E3A8A]/25 pb-6">
            <button
              onClick={() => handleNavigation('home')}
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#CC2936] font-semibold text-sm transition-colors cursor-pointer group"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </button>
            <div className="text-xs text-zinc-500 font-mono">
              Home <span className="mx-1">•</span> <span className="text-[#CC2936]">Gallery</span>
            </div>
          </div>

          {/* Title Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1 bg-red-500/10 border border-red-500/30 text-[#CC2936] font-bold text-xs tracking-widest uppercase rounded-full">
              <Image size={13} />
              <span>Visual Showcase</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
              STUDIO PORTFOLIO & MEDIA
            </h1>
            <div className="h-0.5 w-16 bg-[#CC2936] mx-auto" />
            <p className="text-sm text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
              Explore dynamic class routines, children actions, training spaces, and elite tournament competition moments at JK United Taekwondo.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
            {[
              { id: 'all', label: 'All Media' },
              { id: 'master', label: 'Master Jin Kim' },
              { id: 'classes', label: 'Active Classes' },
              { id: 'competition', label: 'Competition' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setGalleryFilter(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  galleryFilter === tab.id
                    ? 'bg-[#CC2936] text-white shadow-lg shadow-red-500/20'
                    : 'bg-[#0D1C44] border border-[#1E3A8A]/20 text-zinc-400 hover:text-white hover:border-[#1E3A8A]/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Image Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.filter(item => galleryFilter === 'all' || item.category === galleryFilter).map((item) => {
              // Find the absolute index in the original GALLERY_ITEMS array to support accurate lightbox prev/next transitions
              const originalIndex = GALLERY_ITEMS.findIndex(g => g.src === item.src);
              return (
                <motion.div
                  key={item.src}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setActiveLightboxIndex(originalIndex)}
                  className="bg-[#0D1B3E] rounded-2xl overflow-hidden border border-[#1E3A8A]/20 group cursor-zoom-in shadow-xl hover:shadow-2xl hover:border-[#CC2936]/40 transition-all flex flex-col h-full"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black shrink-0">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-xs font-bold inline-flex items-center gap-1.5 bg-[#CC2936] px-3 py-1.5 rounded-full shadow-lg">
                        <span>Zoom Photo</span>
                      </span>
                    </div>
                    <span className="absolute top-3 right-3 bg-[#0A1128]/95 backdrop-blur-md text-[10px] text-amber-400 font-extrabold font-mono tracking-widest px-2.5 py-1 rounded-md uppercase border border-[#1E3A8A]/30">
                      {item.category === 'master' ? 'Master' : item.category === 'classes' ? 'Class' : 'Competition'}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col justify-between flex-grow bg-gradient-to-b from-[#0D1B3E] to-[#0A1128]">
                    <div className="space-y-2">
                      <h3 className="font-display font-black text-white text-base group-hover:text-[#CC2936] transition-colors leading-tight uppercase relative">
                        {item.title}
                      </h3>
                      <p className="text-zinc-400 text-xs font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="pt-4 mt-auto border-t border-[#1E3A8A]/10 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      <span>JK United Brand Media</span>
                      <span className="text-amber-400 font-bold">
                        <span>Tap to zoom</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Lightbox Overlay Modal */}
          <AnimatePresence>
            {activeLightboxIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-between p-4 md:p-8 select-none border border-black"
                id="lightbox-panel"
              >
                {/* Header Controls */}
                <div className="w-full max-w-7xl flex items-center justify-between text-zinc-400 text-xs font-mono py-2">
                  <span>IMAGE {activeLightboxIndex + 1} OF {GALLERY_ITEMS.length}</span>
                  <div className="flex items-center gap-6">
                    <span className="hidden md:inline text-zinc-500">Use Arrow Keys on Keyboard</span>
                    <button
                      onClick={() => setActiveLightboxIndex(null)}
                      className="bg-white/10 hover:bg-[#CC2936] text-white p-2 md:p-3 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      aria-label="Close Lightbox"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Main Media Space */}
                <div className="w-full max-w-5xl flex-grow flex items-center justify-between gap-4 py-4 relative">
                  {/* Prev Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveLightboxIndex(activeLightboxIndex === 0 ? GALLERY_ITEMS.length - 1 : activeLightboxIndex - 1);
                    }}
                    className="absolute left-2 md:relative md:left-0 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-[#CC2936] text-white hover:scale-110 active:scale-90 transition-all flex items-center justify-center cursor-pointer shadow-lg"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  {/* Active Image Container */}
                  <div className="w-full flex justify-center items-center h-[55vh] md:h-[65vh] max-h-[700px] overflow-hidden rounded-2xl">
                    <motion.img
                      key={GALLERY_ITEMS[activeLightboxIndex].src}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      src={GALLERY_ITEMS[activeLightboxIndex].src}
                      alt={GALLERY_ITEMS[activeLightboxIndex].title}
                      className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveLightboxIndex(activeLightboxIndex === GALLERY_ITEMS.length - 1 ? 0 : activeLightboxIndex + 1);
                    }}
                    className="absolute right-2 md:relative md:right-0 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-[#CC2936] text-white hover:scale-110 active:scale-90 transition-all flex items-center justify-center cursor-pointer shadow-lg"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* Info Cap caption footer */}
                <div className="w-full max-w-3xl text-center space-y-2 py-4">
                  <span className="px-3 py-1 rounded bg-[#CC2936]/20 text-[#CC2936] font-mono text-[9px] font-extrabold tracking-widest uppercase mb-1 inline-block">
                    {GALLERY_ITEMS[activeLightboxIndex].category.toUpperCase()} CATEGORY
                  </span>
                  <h2 className="text-xl md:text-2xl font-display font-black text-white uppercase tracking-tight">
                    {GALLERY_ITEMS[activeLightboxIndex].title}
                  </h2>
                  <p className="text-zinc-200 text-xs max-w-lg mx-auto font-light">
                    {GALLERY_ITEMS[activeLightboxIndex].description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
  );
}
