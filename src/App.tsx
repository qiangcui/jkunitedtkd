import { useState, useEffect, FormEvent } from 'react';
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
import { assetUrl } from './assetUrl';

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
} from './education_data';

// Live timezone tracker structure
interface StudioStatus {
  isOpen: boolean;
  message: string;
  nextSession: string;
}

export interface GalleryItem {
  src: string;
  title: string;
  category: 'master' | 'classes' | 'facility';
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: assetUrl('/media/jin-side-scaled.jpg'),
    title: 'Precision Form Alignment',
    category: 'master',
    description: 'Master Jin Kim demonstrating extreme flexibility and exactness in side kick extension.'
  },
  {
    src: assetUrl('/media/capture_temp.jpg'),
    title: 'Little Tigers High-Energy Drills',
    category: 'classes',
    description: 'Coaching youths to focus, follow directions, and calibrate balance mechanics.'
  },
  {
    src: assetUrl('/media/jin-face-scaled.jpg'),
    title: 'Owner and Head Coach Pose',
    category: 'master',
    description: '5th Dan Kukkiwon Master Jin Kim displaying authentic leadership uniform.'
  },
  {
    src: assetUrl('/media/JK-United-Video-2_2.jpeg'),
    title: 'Team Synchronization Workout',
    category: 'classes',
    description: 'Developing team-wide coordination, unity, and synchronous black-belt-track form.'
  },
  {
    src: assetUrl('/media/Resized_png_20230403_110714_0000_492304801766417.jpg'),
    title: 'Official USA Team Uniform Portrait',
    category: 'master',
    description: 'US Poomsae National Team member representation.'
  },
  {
    src: assetUrl('/media/Untitled-design-6.png'),
    title: 'Championship Training Mat Arena',
    category: 'facility',
    description: 'Pristine Olympic-grade flooring mats designed for premium safety.'
  },
  {
    src: assetUrl('/media/Untitled-design-18.png'),
    title: 'Flying Side-Kick Aerial Demonstration',
    category: 'classes',
    description: 'Developing focus, timing, and dynamic athletic burst options.'
  },
  {
    src: assetUrl('/media/Untitled-design-65-1024x587.png'),
    title: 'Tiny Tigers Coordination Class',
    category: 'classes',
    description: 'Ages 4-6 training coordination and concentration in a happy, structured class.'
  },
  {
    src: assetUrl('/media/Untitled-design-66-1024x587.png'),
    title: 'School-Age Core Leadership Sequence',
    category: 'classes',
    description: 'Teaching children to speak loudly with confidence, stand tall, and build discipline.'
  },
  {
    src: assetUrl('/media/Untitled-design-67-1024x587.png'),
    title: 'Adult Conditioning and Forms Calibration',
    category: 'classes',
    description: 'Incredible joint conditioning, cardio stamina, and self-defense for adults.'
  },
  {
    src: assetUrl('/media/Untitled-design.jpg'),
    title: 'Cinematic Training Atmosphere',
    category: 'facility',
    description: 'The premium aesthetic and ambient dark atmosphere of JK United TKD Aurora.'
  }
];

export interface MasterMedal {
  title: string;
  medal: string;
  type: 'international' | 'national' | 'state';
  year: string;
  detail: string;
  badgeImg: string;
}

const MASTER_MEDALS: MasterMedal[] = [
  {
    title: "Goyang World Poomsae Championships (G8)",
    medal: "Bronze Medal 🥉",
    type: "international",
    year: "2022",
    detail: "Represented USA Taekwondo on the highest international stage against the world's premier forms competitors.",
    badgeImg: assetUrl("/media/cropped-logo-192x192.webp")
  },
  {
    title: "Pan Am Poomsae Championships (G4)",
    medal: "Bronze Medal 🥉",
    type: "international",
    year: "2018",
    detail: "Placed in the top tier across Pan-American elite national champions in high-level sparring-form geometry.",
    badgeImg: assetUrl("/media/cropped-logo-192x192.webp")
  },
  {
    title: "US Open Championships",
    medal: "Gold Medal 🥇",
    type: "national",
    year: "2017 & 2018",
    detail: "Double consecutive Gold Champion at the world's top-tier open tournament with extreme competitive pools.",
    badgeImg: assetUrl("/media/cropped-logo-192x192.webp")
  },
  {
    title: "USA National Championships",
    medal: "Gold Medal 🥇",
    type: "national",
    year: "2022",
    detail: "Undisputed National Champion in premium Poomsae categories, solidifying high rank in Kukkiwon records.",
    badgeImg: assetUrl("/media/cropped-logo-192x192.webp")
  },
  {
    title: "US Grand Prix Series",
    medal: "3 Gold Medals 🥇🥇🥇",
    type: "national",
    year: "2021",
    detail: "Swept three distinct Gold titles back-to-back, establishing supreme technical dominance in forms.",
    badgeImg: assetUrl("/media/cropped-logo-192x192.webp")
  },
  {
    title: "California State Championships",
    medal: "Gold Medal 🥇",
    type: "state",
    year: "2017",
    detail: "State gold winner showcasing outstanding flexibility and explosive traditional power metrics.",
    badgeImg: assetUrl("/media/cropped-logo-192x192.webp")
  },
  {
    title: "Colorado State Championships",
    medal: "Gold Medal (4-Years Consecutive) 🥇",
    type: "state",
    year: "2015, 2016, 2017 & 2018",
    detail: "Four consecutive state championships in Colorado, maintaining an undefeated state record.",
    badgeImg: assetUrl("/media/cropped-logo-192x192.webp")
  }
];

export default function App() {
  // Navigation & Menu Mobile State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Dynamic Page Router View
  const [currentView, setCurrentView] = useState<'home' | 'about-us' | 'gallery' | 'education' | 'schedule'>('home');

  const handleNavigation = (view: 'home' | 'about-us' | 'gallery' | 'education' | 'schedule', hash?: string) => {
    setMobileMenuOpen(false);
    
    if (view === 'about-us') {
      setCurrentView('about-us');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view === 'gallery') {
      setCurrentView('gallery');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view === 'education') {
      setCurrentView('education');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view === 'schedule') {
      setCurrentView('schedule');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setCurrentView('home');
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Program Tab Selector State
  const [activeTab, setActiveTab] = useState<'tigers' | 'children' | 'adults'>('children');

  // Medal filter state for the new About Master page
  const [medalFilter, setMedalFilter] = useState<'all' | 'international' | 'national' | 'state'>('all');

  // Video Player Modal State
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Inquiry / Trial Booking Modal Schedulers
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string>('Children (Ages 7-12)');
  const [trialFormSubmitted, setTrialFormSubmitted] = useState(false);

  // Photo Gallery interactive state
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'master' | 'classes' | 'facility'>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Education page interactive states
  const [selectedBelt, setSelectedBelt] = useState<string>('White');
  const [vocabSearch, setVocabSearch] = useState<string>('');
  const [vocabCategory, setVocabCategory] = useState<string>('all');
  const [scheduleFilter, setScheduleFilter] = useState<string>('all');
  const [educationTab, setEducationTab] = useState<'rankings' | 'taegeuk' | 'wonshim' | 'flags' | 'terminology' | 'philosophy'>('rankings');
  const [activeTaegeukId, setActiveTaegeukId] = useState<number>(1);
  const [activeWonshimLevel, setActiveWonshimLevel] = useState<number>(1);
  const [playingAudioUrl, setPlayingAudioUrl] = useState<string | null>(null);
  const [currentAudioObj, setCurrentAudioObj] = useState<HTMLAudioElement | null>(null);

  // Form input standard states
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    studentAge: '',
    phone: '',
    email: '',
    notes: '',
  });

  // Footer Quick contact form state
  const [footerContactSubmitted, setFooterContactSubmitted] = useState(false);
  const [footerContactEmail, setFooterContactEmail] = useState('');

  // Auto-sliding gallery state and interval
  const [autoSliderIndex, setAutoSliderIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoSliderIndex((prev) => (prev + 1) % 5);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Testimonials slider State
  const [activeTestimonial, setActiveTestimonial] = useState(1);

  // Interactive Live Status based on current local time (2026-05-30T22:33:04Z is a Saturday evening)
  const [studioStatus, setStudioStatus] = useState<StudioStatus>({
    isOpen: false,
    message: "Closed for the evening",
    nextSession: " reopens Monday at 3:00 PM"
  });

  // Track page scrolls for navbar sticky glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stop playing Korean audio terminology if the user navigates away
  useEffect(() => {
    if (currentView !== 'education' && currentAudioObj) {
      currentAudioObj.pause();
      setPlayingAudioUrl(null);
    }
  }, [currentView]);

  // Lightbox keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex(prev => {
          if (prev === null) return null;
          return prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1;
        });
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex(prev => {
          if (prev === null) return null;
          return prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1;
        });
      } else if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex]);

  // Update timezone simulation or general status
  useEffect(() => {
    // Current date from meta: 2026-05-30 (Saturday)
    // The working hours are Saturday: 10 AM - 1 PM. It's currently 10:33 PM (22:33).
    // Closed for the weekend, reopening Monday.
    setStudioStatus({
      isOpen: false,
      message: "Studio Closed",
      nextSession: "Class reopens Monday at 3:00 PM"
    });
  }, []);

  // Handler for Trial session signups
  const handleTrialSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate premium API pipeline validation
    setTrialFormSubmitted(true);
  };

  const resetTrialForm = () => {
    setTrialFormSubmitted(false);
    setFormData({
      parentName: '',
      studentName: '',
      studentAge: '',
      phone: '',
      email: '',
      notes: '',
    });
    setTrialModalOpen(false);
  };

  // Age groups and quick list definitions
  const ageGroups = [
    {
      id: 'tigers',
      title: 'Tiny Tigers',
      age: 'Ages 4 - 6',
      image: assetUrl('/media/Untitled-design-4.png'),
      tagline: 'Building coordination, ultimate focus, and fundamental safety metrics early.',
      bgGradient: 'from-blue-600/20 to-black',
      borderAccent: 'border-blue-500/30'
    },
    {
      id: 'children',
      title: 'School-Age Children',
      age: 'Ages 7 - 12',
      image: assetUrl('/media/Untitled-design-6.png'),
      tagline: 'Confidence, elite physical conditioning, and bully-proof character development.',
      bgGradient: 'from-amber-600/20 to-black',
      borderAccent: 'border-amber-500/30'
    },
    {
      id: 'adults',
      title: 'Teens & Adults',
      age: 'Ages 13 and above',
      image: assetUrl('/media/Untitled-design.jpg'),
      tagline: 'Stress management, dynamic cardiovascular workouts, and traditional forms of power.',
      bgGradient: 'from-red-600/20 to-black',
      borderAccent: 'border-red-500/30'
    }
  ];

  // Tab detailed segments
  const programDetails = {
    tigers: {
      title: 'Tiny Tigers Program',
      ageRange: 'Ages 4 - 6 Years Old',
      intro: 'Active young minds and growing physical limits need constructive channels rather than distraction. We build lifelong physical agility and emotional control early.',
      points: [
        'Engage in simple, structured, and joy-filled training sequences.',
        'Learn authentic martial arts fundamentals, not standard playground activities.',
        'Accelerate biological coordination, motor intelligence, and reflex flexibility.',
        'Impart active listening skills, parental respect, and classroom discipline.',
        'Cultivate key socio-emotional boundary management with peers.'
      ],
      tagline: 'What they learn here will shape their integrity for a lifetime.',
      illustrativeImg: assetUrl('/media/Untitled-design-65-1024x587.png'),
      iconImg: assetUrl('/media/02programes_01_img002.png'),
      colorTheme: 'text-blue-400 border-blue-500 bg-blue-500/10'
    },
    children: {
      title: 'Elite Children Training',
      ageRange: 'Ages 7 - 12 Years Old',
      intro: 'Designed systematically to fulfill your child\'s internal drive for active achievements, public validation, physical power, and robust protective self-defense.',
      points: [
        'Maximize athletic muscle density, core strength, fitness, and agility.',
        'Embark on advanced Kukkiwon certified Taekwondo and self-defense skills.',
        'Inoculate against modern bullying by building strong physical presence and voice.',
        'Foster active peer leadership, respectful teamwork, and competitive mastery.',
        'Introduce Olympic-style full-contact sparring matches with protective gears.'
      ],
      tagline: 'Empowering children with focus to excel in school, sports, and social realms.',
      illustrativeImg: assetUrl('/media/Untitled-design-66-1024x587.png'),
      iconImg: assetUrl('/media/02programes_01_img003.png'),
      colorTheme: 'text-amber-400 border-amber-500 bg-amber-500/10'
    },
    adults: {
      title: 'Teens & Adults Conditioning',
      ageRange: 'Ages 13 & Above',
      intro: 'A revolutionary pathway to physical power, emotional decompression, robust weight loss, and professional traditional martial arts certification in an supportive community.',
      points: [
        'Formulate physical strength, full aerobic flexibility, and profound core power.',
        'Relieve cumulative professional stresses via focused training and breathing.',
        'Incorporate CardioTKD - burning up to 800+ calories in a single high-energy class.',
        'Master world-class Olympic sparring rhythms and traditional Poomsae geometry.',
        'Enjoy unified family benefits; train in synchrony right alongside your children.'
      ],
      tagline: 'Adopt an active athletic lifestyle that places physical stress under absolute command.',
      illustrativeImg: assetUrl('/media/Untitled-design-67-1024x587.png'),
      iconImg: assetUrl('/media/Untitled-design-23.png'),
      colorTheme: 'text-red-400 border-red-500 bg-red-500/10'
    }
  };

  const testimonials = [
    {
      id: 1,
      name: 'Nahid Sabbaghkar',
      text: 'Master Jin Hyuk Kim is an exceptional teacher. He sees everyone\'s different capability and level, and directs his teachings based on each different individual. This custom precision elevates his classes beyond standard training.',
      role: 'Family Parent',
      rating: 5,
      avatar: 'NS'
    },
    {
      id: 2,
      name: 'Paul Schulte',
      text: 'Master Jin Hyuk Kim has a wonderfully positive influence on his students. I have seen him work with students ranging in age from 4 years old to senior adults and he always finds ways to motivate and bring out the best in everyone. His classes are energetic, structured, and profoundly educational.',
      role: 'Advanced Student',
      rating: 5,
      avatar: 'PS'
    },
    {
      id: 3,
      name: 'Brett Myers',
      text: 'Jin was my master. He is great. He always has a smile on his face. He was great with my daughter who studied with me as well. I loved studying Taekwondo forms (poomsae) with him. I strongly recommend him as a teacher for adults and kids alike!',
      role: 'Parent & Adult Black Belt',
      rating: 5,
      avatar: 'BM'
    }
  ];

  return (
    <div className="bg-[#0A1128] text-gray-100 font-sans min-h-screen selection:bg-[#CC2936] selection:text-white overflow-x-hidden antialiased relative">
      {/* Background Immersive Atmosphere Blurs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#CC2936] rounded-full blur-[140px] opacity-[0.12]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#1E3A8A] rounded-full blur-[140px] opacity-[0.2]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A1128_80%)]" />
      </div>
      
      {/* Top Banner Ticker with Essential Info - Optimized for instant conversion feedback */}
      <div className="bg-gradient-to-r from-[#0D1C44]/90 to-[#0A1128]/95 border-b border-[#1E3A8A]/30 text-xs py-2.5 px-4 text-gray-200 transition-all relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Working contact details */}
          <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
            <a href="tel:7209004546" className="flex items-center gap-1.5 hover:text-[#CC2936] transition-colors font-medium">
              <Phone size={13} className="text-[#CC2936]" />
              <span>(720) 900-4546</span>
            </a>
            <a href="mailto:info@jkunitedtkd.com" className="flex items-center gap-1.5 hover:text-[#CC2936] transition-colors font-medium">
              <Mail size={13} className="text-[#CC2936]" />
              <span>info@jkunitedtkd.com</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5">
              <MapPin size={13} className="text-[#CC2936]" />
              <span>22651 E Aurora Pkwy, Unit A-8, Aurora, CO 80016</span>
            </div>
          </div>

          {/* Business Hours Display with dynamic check */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-[#CC2936]" />
              <span className="text-zinc-300 font-medium">Sat: 10AM - 1PM | Mon - Thu: 3PM - 8PM</span>
            </div>
            <div className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-extrabold flex items-center gap-1 ${
              studioStatus.isOpen ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${studioStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
              {studioStatus.isOpen ? 'Open Now' : 'Closed'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation with modern glassmorphic look */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A1128]/95 backdrop-blur-md shadow-[0_10px_30px_rgba(204,41,54,0.1)] border-b border-[#1E3A8A]/30'
          : 'bg-[#0A1128]/60 backdrop-blur-sm border-b border-[#1E3A8A]/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
          {/* Logo with clean typographic redesign and brand image integration */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('home', '#home');
            }}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 bg-white rounded-lg p-1 overflow-hidden transition-all duration-500 group-hover:scale-105 shadow-md shadow-red-500/20">
              <img
                src={assetUrl("/media/cropped-logo-192x192.webp")}
                alt="JK United Taekwondo Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg md:text-xl text-white tracking-widest leading-none">
                JK UNITED
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#CC2936] font-semibold uppercase leading-tight">
                Taekwondo Center
              </span>
            </div>
          </a>

          {/* Desktop Navigation Link Block */}
          <nav className="hidden lg:flex items-center gap-7 font-medium">
            <button
              onClick={() => handleNavigation('home', '#home')}
              className={`font-semibold text-sm cursor-pointer transition-all border-b-2 py-1 ${
                currentView === 'home' ? 'text-[#CC2936] border-[#CC2936]' : 'text-zinc-300 border-transparent hover:text-[#CC2936]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation('about-us')}
              className={`font-semibold text-sm cursor-pointer transition-all border-b-2 py-1 ${
                currentView === 'about-us' ? 'text-[#CC2936] border-[#CC2936]' : 'text-zinc-300 border-transparent hover:text-[#CC2936]'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavigation('schedule')}
              className={`font-semibold text-sm cursor-pointer transition-all border-b-2 py-1 ${
                currentView === 'schedule' ? 'text-[#CC2936] border-[#CC2936]' : 'text-zinc-300 border-transparent hover:text-[#CC2936]'
              }`}
            >
              Schedule
            </button>
            <button
              onClick={() => handleNavigation('gallery')}
              className={`font-semibold text-sm cursor-pointer transition-all border-b-2 py-1 ${
                currentView === 'gallery' ? 'text-[#CC2936] border-[#CC2936]' : 'text-zinc-300 border-transparent hover:text-[#CC2936]'
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => handleNavigation('education')}
              className={`font-semibold text-sm cursor-pointer transition-all border-b-2 py-1 ${
                currentView === 'education' ? 'text-[#CC2936] border-[#CC2936]' : 'text-zinc-300 border-transparent hover:text-[#CC2936]'
              }`}
            >
              Education
            </button>
            <button
              onClick={() => handleNavigation('home', '#hours')}
              className="text-zinc-300 hover:text-[#CC2936] text-sm font-semibold cursor-pointer border-b-2 border-transparent hover:border-[#CC2936]/30 py-1 transition-all"
            >
              Contact Us
            </button>
          </nav>

          {/* CTA Action Callouts */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => {
                setSelectedProgram('Children (Ages 7-12)');
                setTrialModalOpen(true);
              }}
              className="bg-[#CC2936] text-white font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-white hover:text-black hover:scale-[1.03] transition-all duration-300 shadow-lg shadow-red-500/20 cursor-pointer active:scale-95 animate-pulse"
            >
              Book Free Trial
            </button>
          </div>

          {/* Mobile responsive toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-zinc-300 hover:text-white p-1.5 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu panel dropdown list */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-[#0A1128] border-t border-[#1E3A8A]/30 px-6 py-6 space-y-4 shadow-xl overflow-hidden relative z-50"
            >
              <div className="grid grid-cols-1 gap-2.5 font-medium">
                <button
                  onClick={() => handleNavigation('home', '#home')}
                  className="text-left text-zinc-300 hover:text-[#CC2936] py-2 block border-b border-[#1E3A8A]/20 font-semibold cursor-pointer"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigation('about-us')}
                  className="text-left text-zinc-300 hover:text-[#CC2936] py-2 block border-b border-[#1E3A8A]/20 font-semibold cursor-pointer"
                >
                  About Us
                </button>
                <button
                  onClick={() => handleNavigation('schedule')}
                  className={`text-left py-2 block border-b border-[#1E3A8A]/20 font-semibold cursor-pointer transition-colors ${
                    currentView === 'schedule' ? 'text-[#CC2936]' : 'text-zinc-300 hover:text-[#CC2936]'
                  }`}
                >
                  Schedule
                </button>
                <button
                  onClick={() => handleNavigation('gallery')}
                  className="text-left text-zinc-300 hover:text-[#CC2936] py-2 block border-b border-[#1E3A8A]/20 font-semibold cursor-pointer"
                >
                  Gallery
                </button>
                <button
                  onClick={() => handleNavigation('education')}
                  className="text-left text-zinc-300 hover:text-[#CC2936] py-2 block border-b border-[#1E3A8A]/20 font-semibold cursor-pointer"
                >
                  Education
                </button>
                <button
                  onClick={() => handleNavigation('home', '#hours')}
                  className="text-left text-zinc-300 hover:text-[#CC2936] py-2 block font-semibold cursor-pointer"
                >
                  Contact Us
                </button>
              </div>
              
              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setTrialModalOpen(true);
                  }}
                  className="bg-[#CC2936] text-white w-full py-3 rounded-full text-center font-bold shadow-md cursor-pointer active:scale-95"
                >
                  Request a Free Week Trial
                </button>
                <a
                  href="tel:7209004546"
                  className="flex items-center justify-center gap-2 border border-neutral-700 hover:bg-neutral-900 py-2.5 rounded-full text-zinc-300 text-sm font-semibold"
                >
                  <Phone size={15} />
                  Call Studio Direction
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {currentView === 'home' && (
        <>
          {/* Hero Section Redesign: Cinematic with interactive trigger buttons */}
          <section id="home" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center py-20 px-4 md:px-8 overflow-hidden bg-[#0A1128]">
        
        {/* Dark Video / Photographic Atmosphere Overlay */}
        <div className="absolute inset-0 bg-[#0A1128]/35 bg-gradient-to-b from-black/55 via-[#0A1128]/45 to-[#0A1128]/90 z-10" />
        
        {/* Dynamic Video Background playing the JK United Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={assetUrl("/media/Untitled-design.jpg")}
            className="w-full h-full object-cover filter brightness-[0.5] contrast-[1.05]"
          >
            <source src={assetUrl("/media/JK-United-Video-3.mp4")} type="video/mp4" />
          </video>
          {/* Subtle grid network to add polished modern vibe */}
          <div className="absolute inset-0 bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center md:-translate-y-8 lg:-translate-y-16">
          
          {/* Left Column Text details */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
            


            {/* Giant Bold Typographical Heading */}
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.05] uppercase">
              Learn From <br className="hidden md:block"/>
              <span className="bg-gradient-to-r from-white via-[#FFD2D2] to-[#CC2936] bg-clip-text text-transparent">
                Champions
              </span>
            </h1>

            {/* Subheading text carefully integrated to maximize customer desire */}
            <p className="text-[#CC2936] font-display font-bold tracking-[0.16em] uppercase text-sm md:text-base leading-relaxed">
              "Building Character Through Taekwondo Excellence"
            </p>

            <p className="text-white text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Led by three-time USA Taekwondo Poomsae National Team Member <strong className="text-[#CC2936] font-bold">Master Jin Hyuk Kim</strong>. Enhance physical conditioning, firm self-defense confidence, and focus state of mind.
            </p>

            {/* CTA Multi buttons in the hero section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <button
                onClick={() => {
                  handleNavigation('schedule');
                }}
                className="bg-[#CC2936] text-white font-bold text-base px-8 py-4 rounded-full hover:bg-white hover:text-black hover:scale-105 hover:shadow-red-500/20 active:scale-95 transition-all duration-300 w-full sm:w-auto shadow-xl shadow-red-500/20 cursor-pointer"
              >
                Class Schedule
              </button>
              
              <button
                onClick={() => setVideoModalOpen(true)}
                className="flex items-center justify-center gap-3 bg-neutral-900/80 border border-neutral-700 text-white font-semibold text-base px-7 py-3.5 rounded-full hover:bg-neutral-800 hover:border-neutral-500 hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white p-1">
                  <Play size={14} className="fill-current text-white translate-x-0.5" />
                </div>
                <span>Play Training Video</span>
              </button>
            </div>

            {/* Quick trust metrics banner */}
            <div className="pt-8 border-t border-[#1E3A8A]/20 flex flex-wrap justify-center lg:justify-start gap-6 md:gap-10 text-sm md:text-base text-zinc-100">
              <div className="flex items-center gap-2.5">
                <Award className="text-[#CC2936]" size={18} />
                <span className="font-medium">3x National Team Master</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="text-emerald-400" size={18} />
                <span className="font-medium">Family Oriented Facility</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Zap className="text-amber-400" size={18} />
                <span className="font-medium">Ages 4 to Adults</span>
              </div>
            </div>

          </div>

          {/* Right Column Layout: Modern Interactive Preview Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm md:max-w-md bg-gradient-to-b from-[#0D1C44] to-[#060D24] p-1.5 rounded-3xl border border-[#1E3A8A]/30 shadow-2xl">
              
              {/* Floating accents */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#CC2936]/10 rounded-full blur-xl z-0" />
              <div className="absolute -bottom-4 -left-3 w-20 h-20 bg-rose-500/5 rounded-full blur-xl z-0" />

              <div className="relative z-10 bg-[#0A1128] rounded-[22px] overflow-hidden p-6 space-y-5 text-center">
                
                <div className="flex justify-between items-center bg-[#0B1736] rounded-lg p-3.5 text-left">
                  <div>
                    <h4 className="text-zinc-200 text-sm font-semibold">Special Offer Alert!</h4>
                    <p className="text-xs text-[#CC2936] mt-0.5">Expires very soon: Limited Slots Left</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <Flame size={18} className="fill-current" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-sm uppercase tracking-widest text-[#CC2936] font-bold">1-Week Free Trial Offer</p>
                  <h3 className="text-2xl font-display font-black text-white">Select An Age-Group</h3>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    onClick={() => {
                      setSelectedProgram('Tiny Tigers (Ages 4-6)');
                      setTrialModalOpen(true);
                    }}
                    className="flex justify-between items-center p-3.5 bg-[#0D1B3E] hover:bg-[#152554] border border-[#1E3A8A]/20 hover:border-[#1E3A8A]/40 rounded-lg text-left transition-all group scale-100 hover:scale-[1.01] cursor-pointer"
                  >
                    <div>
                      <h4 className="text-base font-bold text-white">Tiny Tigers</h4>
                      <p className="text-xs text-[#CC2936] font-semibold mt-0.5">Ages 4 to 6 Years Old</p>
                    </div>
                    <ChevronRight size={18} className="text-zinc-400 group-hover:text-white transition-colors" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedProgram('Children (Ages 7-12)');
                      setTrialModalOpen(true);
                    }}
                    className="flex justify-between items-center p-3.5 bg-[#0D1B3E] hover:bg-[#152554] border border-[#1E3A8A]/20 hover:border-[#1E3A8A]/40 rounded-lg text-left transition-all group scale-100 hover:scale-[1.01] cursor-pointer"
                  >
                    <div>
                      <h4 className="text-base font-bold text-white">School Kids</h4>
                      <p className="text-xs text-amber-400 font-semibold mt-0.5">Ages 7 to 12 Years Old</p>
                    </div>
                    <ChevronRight size={18} className="text-zinc-400 group-hover:text-white transition-colors" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedProgram('Teen / Adult (Ages 13 and above)');
                      setTrialModalOpen(true);
                    }}
                    className="flex justify-between items-center p-3.5 bg-[#0D1B3E] hover:bg-[#152554] border border-[#1E3A8A]/20 hover:border-[#1E3A8A]/40 rounded-lg text-left transition-all group scale-100 hover:scale-[1.01] cursor-pointer"
                  >
                    <div>
                      <h4 className="text-base font-bold text-white">Teens & Adults</h4>
                      <p className="text-xs text-red-500 font-semibold mt-0.5">Ages 13 and Above</p>
                    </div>
                    <ChevronRight size={18} className="text-zinc-400 group-hover:text-white transition-colors" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-zinc-200 mt-1">No credit card or commitment required to book first week</p>

              </div>
            </div>
          </div>

        </div>

        {/* Diagonal styling detail */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0A1128] to-transparent z-10" />
      </section>

      {/* Massive Accent Highlight Message (Restored with clear, high-impact structure) */}
      <section className="bg-gradient-to-b from-[#0A1128] to-[#050B1B] py-20 border-t border-b border-[#1E3A8A]/25 relative z-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="h-0.5 w-16 bg-[#CC2936] mx-auto mb-4" />
            <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight leading-tight uppercase">
              "Building Character Through Taekwondo Excellence"
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm md:text-base tracking-[0.25em] font-extrabold uppercase mt-3">
              The Elite Training Way • Authenticity & Performance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Master Jin Hyuk Kim Redesigned Profile Segment */}
      <section id="master" className="py-20 md:py-28 bg-[#0A1128] relative overflow-hidden">
        
        {/* Giant Watermark Letter in the Background with stroke styling */}
        <div className="absolute -right-12 top-10 select-none opacity-[0.03] z-0 pointer-events-none hidden xl:block">
          <span className="font-display font-black text-[22rem] text-white tracking-tighter leading-none">
            USA
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Master Photo Box Content */}
            <div className="lg:col-span-5 relative group">
              
              {/* Red & Blue duality glow styling (representing South Korean Teageuk symbol) */}
              <div className="absolute -top-3 -left-3 w-full h-full bg-gradient-to-tr from-blue-600/20 to-[#CC2936]/25 rounded-2xl transform rotate-2 z-0" />
              
              <div className="relative z-10 overflow-hidden rounded-2xl border-2 border-[#1E3A8A]/40 bg-[#0D1B3E] aspect-[5/6] max-w-md mx-auto">
                <img
                  src={assetUrl("/media/Profile_JK.webp")}
                  alt="Master Jin Hyuk Kim portrait"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating champion credentials overlay box */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0A1128]/95 backdrop-blur-md border border-[#1E3A8A]/30 rounded-xl p-4 text-center">
                  <p className="text-xs uppercase tracking-widest text-[#CC2936] font-semibold">Master Instructor credential</p>
                  <p className="text-sm font-semibold text-zinc-100 font-display">Kukkiwon Certified 5th Degree Black Belt</p>
                </div>
              </div>

              {/* Dynamic decorative stamp representing Korean flag duality */}
              <div className="absolute -bottom-4 -right-2 bg-[#0A1128] border border-[#1E3A8A]/35 rounded-lg p-3 shadow-xl flex items-center gap-2 z-20">
                <div className="w-2.5 h-2.5 rounded-full bg-[#CC2936] animate-pulse" />
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-[10px] tracking-widest text-zinc-200 font-bold uppercase font-display">Team USA Member</span>
              </div>

            </div>

            {/* Master Bio Typography details */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              
              <div className="space-y-3">
                <span className="text-sm font-bold uppercase tracking-widest text-[#CC2936] flex items-center gap-2">
                  <Award size={16} /> Learn From World Class Lineage
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight uppercase leading-none">
                  MASTER JIN HYUK KIM
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-[#CC2936] to-[#1E3A8A]" />
              </div>

              {/* Simplified narrative bio */}
              <div className="text-zinc-300 font-light leading-relaxed text-sm sm:text-base">
                <p>
                  Arriving from South Korea in 2005, Master Jin Hyuk Kim holds a prestigious <strong className="text-white font-semibold">5th-Degree Kukkiwon Black Belt</strong>. He combines traditional Korean discipline with modern conditioning to forge state champions and empower outstanding community leaders.
                </p>
              </div>

              {/* Quick credential facts checklist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#1E3A8A]/20">
                <div className="flex items-start gap-2 text-sm text-zinc-200">
                  <Check className="text-[#CC2936] shrink-0 mt-1" size={16} />
                  <span>3-Times USA Taekwondo National Team Member</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-zinc-200">
                  <Check className="text-[#CC2936] shrink-0 mt-1" size={16} />
                  <span>5th Degree Kukkiwon Certified Master</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-zinc-200">
                  <Check className="text-[#CC2936] shrink-0 mt-1" size={16} />
                  <span>Hae Dong Kumdo Academy Master Instructor</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-zinc-200">
                  <Check className="text-[#CC2936] shrink-0 mt-1" size={16} />
                  <span>20+ Years Dedicated Teaching Experience</span>
                </div>
              </div>

              {/* Button linking to Contact with responsive animation */}
              <div className="pt-6 flex flex-wrap gap-4 items-center justify-center lg:justify-start">
                <button
                  onClick={() => {
                    setSelectedProgram('Adult Poomsae Coaching');
                    setTrialModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 bg-[#CC2936]/10 border border-[#CC2936]/40 text-[#CC2936] hover:bg-[#CC2936] hover:text-white hover:scale-105 active:scale-95 duration-300 font-bold px-7 py-3 rounded-full text-xs sm:text-sm cursor-pointer"
                >
                  <span>Inquire with Master Kim</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => handleNavigation('about-us')}
                  className="inline-flex items-center gap-2 bg-[#CC2936] text-white hover:bg-white hover:text-black hover:scale-105 active:scale-95 duration-300 font-bold px-7 py-3 rounded-full text-xs sm:text-sm cursor-pointer shadow-lg shadow-red-500/10"
                >
                  <Trophy size={16} className="text-amber-300" />
                  <span>View Full Championship Board</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>



      {/* Detailed Interactive Program Segment (Segmented Tab System Redesign) */}
      <section id="programs" className="py-24 bg-[#0A1128] relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs tracking-[0.25em] text-[#CC2936] font-black uppercase">Structured Pathways</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight leading-none">
              Programs We Offer
            </h2>
            <p className="text-zinc-350 font-light text-sm sm:text-base">
              Click the tabs below to explore what makes our curriculum distinctive, including active milestones and target highlights.
            </p>
          </div>

          {/* Interactive Navigation Selectors */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1.5 bg-[#0D1B3E] border border-[#1E3A8A]/35 rounded-2xl max-w-2xl w-full">
              <button
                onClick={() => setActiveTab('tigers')}
                className={`flex-1 py-3 text-xs md:text-sm font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'tigers'
                    ? 'bg-[#CC2936] text-white font-extrabold'
                    : 'text-zinc-200 hover:text-white'
                }`}
              >
                <Zap size={14} />
                <span>Tiny Tigers (4-6)</span>
              </button>

              <button
                onClick={() => setActiveTab('children')}
                className={`flex-1 py-3 text-xs md:text-sm font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'children'
                    ? 'bg-amber-500 text-black font-extrabold'
                    : 'text-zinc-200 hover:text-white'
                }`}
              >
                <Flame size={14} />
                <span>Children (7-12)</span>
              </button>

              <button
                onClick={() => setActiveTab('adults')}
                className={`flex-1 py-3 text-xs md:text-sm font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'adults'
                    ? 'bg-rose-600 text-white font-extrabold'
                    : 'text-zinc-200 hover:text-white'
                }`}
              >
                <Target size={14} />
                <span>Teens & Adults (13+)</span>
              </button>
            </div>
          </div>

          {/* Active Tab transition space */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.35 }}
              className="bg-[#0D1B3E] rounded-3xl border border-[#1E3A8A]/30 p-6 md:p-10 shadow-2xl relative overflow-hidden"
            >
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Visual left column showing real visual tags with overlay badges */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#1E3A8A]/30 bg-[#0A1128] shadow-xl">
                    <img
                      src={programDetails[activeTab].illustrativeImg}
                      alt={programDetails[activeTab].title}
                      className="w-full h-full object-cover object-center filter brightness-[0.9]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  </div>
                </div>

                {/* Narrative Right column detailing points */}
                <div className="lg:col-span-7 space-y-6">
                  
                  <div className="space-y-2">
                    <div className={`px-2.5 py-1 text-[11px] font-black uppercase tracking-widest inline-block rounded bg-[#0A1128] text-white border border-[#1E3A8A]/20`}>
                      {programDetails[activeTab].ageRange}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-black text-zinc-100">
                      {programDetails[activeTab].title}
                    </h3>
                    <p className="text-zinc-200 text-sm md:text-base leading-relaxed font-light">
                      {programDetails[activeTab].intro}
                    </p>
                  </div>

                  {/* Checklist benefits list */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-extrabold tracking-widest text-zinc-300">Target Core Benefits</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-zinc-300 font-light">
                      {programDetails[activeTab].points.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 size={16} className="text-[#CC2936] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-xs text-amber-400 italic bg-amber-500/5 p-3 rounded-lg border border-amber-500/10 inline-block font-sans">
                    {programDetails[activeTab].tagline}
                  </p>

                  <div className="pt-4 flex flex-wrap gap-4">
                    <button
                      onClick={() => {
                        setSelectedProgram(`${programDetails[activeTab].title} (${programDetails[activeTab].ageRange})`);
                        setTrialModalOpen(true);
                      }}
                      className="bg-[#CC2936] text-white font-extrabold text-sm px-6 py-3 rounded-full hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 shadow-md shadow-rose-950/40 cursor-pointer"
                    >
                      Inquire / Claim trial
                    </button>
                    
                    <button
                      onClick={() => {
                        let filterVal = 'all';
                        if (activeTab === 'tigers') filterVal = 'tigers';
                        else if (activeTab === 'children') filterVal = 'children';
                        else if (activeTab === 'adults') filterVal = 'adults_family';
                        setScheduleFilter(filterVal);
                        handleNavigation('schedule');
                      }}
                      className="inline-flex items-center gap-1.5 px-5 py-3 text-xs uppercase font-semibold text-zinc-200 hover:text-white transition-colors cursor-pointer"
                    >
                      <span>Check schedule times</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                </div>

              </div>

            </motion.div>
          </AnimatePresence>

          {/* Core Academy Membership Guarantees Section */}
          <div className="pt-20 border-t border-[#1E3A8A]/20 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs tracking-[0.25em] text-[#CC2936] font-black uppercase">JK United Promises</span>
              <h3 className="text-2xl md:text-3.5xl font-display font-black text-white uppercase tracking-tight">
                Our Three Core Guarantees
              </h3>
              <p className="text-zinc-300 font-light text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
                We believe martial arts should support your family's lifestyle—not strain it. Explore our official training parameters designed for your peace of mind.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto px-4">
              
              {/* Card 1: Flexible Schedule */}
              <div className="overflow-hidden rounded-2xl border border-amber-500/15 shadow-xl hover:border-amber-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 group bg-[#0D1B3E]/60 flex flex-col justify-between">
                <div className="aspect-square w-full overflow-hidden bg-black/40">
                  <img
                    src={assetUrl("/media/02programes_01_img002.png")}
                    alt="Flexible Schedule: Attend classes that suit your schedule for the rank. Just attend 2-3 times a week."
                    className="w-full h-full object-cover group-hover:scale-[1.02] duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Card 2: Accommodating Contract Terms */}
              <div className="overflow-hidden rounded-2xl border border-blue-500/15 shadow-xl hover:border-blue-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 group bg-[#0D1B3E]/60 flex flex-col justify-between">
                <div className="aspect-square w-full overflow-hidden bg-black/40">
                  <img
                    src={assetUrl("/media/02programes_01_img003.png")}
                    alt="Accommodating Contract Terms: Vacation? Need to cancel? No problem. Our terms are designed for you."
                    className="w-full h-full object-cover group-hover:scale-[1.02] duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Card 3: Satisfaction Guaranteed */}
              <div className="overflow-hidden rounded-2xl border border-[#CC2936]/15 shadow-xl hover:border-[#CC2936]/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 group bg-[#0D1B3E]/60 flex flex-col justify-between">
                <div className="aspect-square w-full overflow-hidden bg-black/40">
                  <img
                    src={assetUrl("/media/Untitled-design-23.png")}
                    alt="Satisfaction Guaranteed: High-quality service with a student-focused approach."
                    className="w-full h-full object-cover group-hover:scale-[1.02] duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Absolute Full Width Continuous Loop Image Slider with No Whitespace & High Contrast Colorful Actions */}
      <section className="bg-[#0A1128] relative overflow-hidden w-full py-0 px-0 mx-0 select-none">
        <div className="relative w-full overflow-hidden">
          
          <div className="flex w-max">
            <div className="animate-infinite-marquee flex gap-0">
              {[
                assetUrl('/media/Untitled-design-65-1024x587.png'),
                assetUrl('/media/Untitled-design-66-1024x587.png'),
                assetUrl('/media/Untitled-design-67-1024x587.png'),
                assetUrl('/media/Untitled-design-4.png'),
                assetUrl('/media/Untitled-design-3.png'),
                assetUrl('/media/Untitled-design-2.png'),
                assetUrl('/media/Untitled-design.jpg'),
                // Repeated set to guarantee continuous, seamless end-to-end translation loop
                assetUrl('/media/Untitled-design-65-1024x587.png'),
                assetUrl('/media/Untitled-design-66-1024x587.png'),
                assetUrl('/media/Untitled-design-67-1024x587.png'),
                assetUrl('/media/Untitled-design-4.png'),
                assetUrl('/media/Untitled-design-3.png'),
                assetUrl('/media/Untitled-design-2.png'),
                assetUrl('/media/Untitled-design.jpg')
              ].map((src, i) => (
                <div 
                  key={i} 
                  className="w-[300px] sm:w-[450px] md:w-[500px] lg:w-[600px] xl:w-[640px] shrink-0 h-[200px] sm:h-[280px] md:h-[340px] lg:h-[380px] cursor-pointer hover:brightness-110 hover:scale-[1.01] transition-all duration-300"
                >
                  <img
                    src={src}
                    alt={`JK United training dynamic activity action slide ${i}`}
                    className="w-full h-full object-cover block"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Client Testimonials Slider (Luxury Carousel Redesign) */}
      <section id="testimonials" className="py-24 bg-[#0A1128] relative overflow-hidden">
        
        {/* Decorative ambient dots */}
        <div className="absolute -left-12 bottom-12 w-28 h-28 bg-[#CC2936]/5 rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs tracking-[0.25em] text-[#CC2936] font-black uppercase">Success Stories</span>
            <h2 className="text-2xl md:text-4xl font-display font-black text-white uppercase tracking-tight">What Parents & Students Say</h2>
            <p className="text-zinc-300 font-light text-xs sm:text-sm">
              Read transparent firsthand experiences detailing Master Kim's customized training paradigm.
            </p>
          </div>

          {/* Testimonial Active Slider Box */}
          <div className="max-w-4xl mx-auto relative z-10 bg-[#0D1B3E] p-8 md:p-12 rounded-3xl border border-[#1E3A8A]/30 text-center space-y-6 shadow-xl">
            
            {/* Stars rating rendering */}
            <div className="flex justify-center gap-1 text-amber-400">
              {[...Array(testimonials[activeTestimonial - 1].rating)].map((_, i) => (
                <Star key={i} size={18} className="fill-current text-amber-400" />
              ))}
            </div>

            {/* Testimonials Quote detail */}
            <blockquote className="text-lg md:text-xl font-light italic text-zinc-100 max-w-2xl mx-auto leading-relaxed">
              "{testimonials[activeTestimonial - 1].text}"
            </blockquote>

            {/* User credentials details */}
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                {testimonials[activeTestimonial - 1].name}
              </h4>
              <p className="text-xs text-[#CC2936]">
                {testimonials[activeTestimonial - 1].role}
              </p>
            </div>

            {/* Navigation bullet triggers inside testimony segment */}
            <div className="flex justify-center items-center gap-3 pt-4">
              <button
                onClick={() => {
                  setActiveTestimonial(activeTestimonial === 1 ? testimonials.length : activeTestimonial - 1);
                }}
                className="w-10 h-10 rounded-full bg-[#0A1128] border border-[#1E3A8A]/25 text-zinc-200 hover:text-white hover:border-[#CC2936] transition-all flex items-center justify-center cursor-pointer active:scale-95"
                aria-label="Previous testimony"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-1.5">
                {testimonials.map((test) => (
                  <button
                    key={test.id}
                    onClick={() => setActiveTestimonial(test.id)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      activeTestimonial === test.id ? 'bg-[#CC2936] w-6' : 'bg-[#1E3A8A]/40'
                    }`}
                    aria-label={`Go to slide ${test.id}`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  setActiveTestimonial(activeTestimonial === testimonials.length ? 1 : activeTestimonial + 1);
                }}
                className="w-10 h-10 rounded-full bg-[#0A1128] border border-[#1E3A8A]/25 text-zinc-200 hover:text-white hover:border-[#CC2936] transition-all flex items-center justify-center cursor-pointer active:scale-95"
                aria-label="Next testimony"
              >
                <ChevronRight size={18} />
              </button>
            </div>

          </div>

        </div>
      </section>
        </>
      )}

      {currentView === 'about-us' && (
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
                <div className="absolute inset-x-3 bottom-3 bg-[#0A1128]/95 backdrop-blur-md border border-[#1E3A8A]/40 rounded-2xl p-4 text-center">
                  <p className="text-xs font-semibold text-zinc-200 tracking-widest uppercase">OFFICIAL PORTRAIT</p>
                  <p className="text-base font-extrabold text-white font-display mt-0.5">Owner & Head Instructor</p>
                  <p className="text-[11px] text-amber-400 tracking-wider font-semibold font-display uppercase mt-0.5">Kukkiwon Standard 5th Dan Master</p>
                </div>
              </div>

              {/* Decorative Korean flag dual color ring stamp */}
              <div className="absolute -bottom-4 -right-2 bg-[#091129] border border-[#1E3A8A]/40 rounded-2xl p-4 shadow-2xl flex items-center gap-3 z-20">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#CC2936] animate-pulse" />
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                </div>
                <div className="text-[10px] tracking-widest text-[#CC2936] font-black uppercase font-display select-none">
                  TEAM USA ATHLETE
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
                  "Building Leadership & Unbending Character in Aurora"
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
                    <h5 className="text-xs font-bold text-white uppercase font-display">{testimonials[0].name}</h5>
                    <p className="text-[10px] text-zinc-300 uppercase mt-0.5">Family Parent Review</p>
                  </div>
                </div>
                
                <div className="bg-[#0A1128]/80 p-5 rounded-2xl border border-[#1E3A8A]/15 space-y-3">
                  <p className="text-xs text-zinc-300 leading-relaxed font-light italic">
                    "I have seen him work with students ranging in age from 4 years to senior adults and he always finds ways to motivate and bring out the best in everyone. His classes are energetic, structured, and profoundly educational."
                  </p>
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase font-display">{testimonials[1].name}</h5>
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
      )}

      {currentView === 'gallery' && (
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
              { id: 'facility', label: 'Aurora Facility' }
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
                      {item.category === 'master' ? 'Master' : item.category === 'classes' ? 'Class' : 'Facility'}
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
      )}

      {currentView === 'education' && (
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
      )}

      {currentView === 'schedule' && (
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
      )}

      {/* Embedded High-Converting Trial Form Segment (Replacing the empty WP event block with beautiful inline scheduler) */}
      <section id="hours" className="py-24 bg-[#0A1128] relative border-t border-[#1E3A8A]/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left side column: Clear Business Times and class schedule anchors */}
            <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
              
              <div className="space-y-4">
                <span className="text-xs font-black tracking-widest text-[#CC2936] uppercase">Time and Place</span>
                <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase leading-tight">
                  Studio Schedule <br/>& Operating Hours
                </h2>
                <p className="text-zinc-350 font-light text-sm">
                  We run dynamic classes throughout the weekday and on Saturday morning. Visit our modern training space or schedule a free session slot below.
                </p>
              </div>

              {/* Working Hours Structured Grid Layout */}
              <div className="space-y-3.5 bg-[#0D1B3E] p-6 rounded-2xl border border-[#1E3A8A]/30 shadow-lg">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-zinc-200 border-b border-[#1E3A8A]/20 pb-2">Weekly Operational schedule</h4>
                
                <div className="flex justify-between text-sm py-1">
                  <span className="text-zinc-200 font-medium">Mon - Thu</span>
                  <span className="text-white font-semibold">3:00 PM - 8:00 PM</span>
                </div>
                
                <div className="flex justify-between text-sm py-1">
                  <span className="text-zinc-200 font-medium">Friday</span>
                  <span className="text-white font-semibold">4:00 PM - 6:30 PM</span>
                </div>

                <div className="flex justify-between text-sm py-1">
                  <span className="text-zinc-200 font-medium">Saturday</span>
                  <span className="text-white font-semibold">10:00 AM - 1:00 PM</span>
                </div>

                <div className="flex justify-between text-sm py-1 border-t border-[#1E3A8A]/20 pt-2 text-rose-400">
                  <span className="font-medium">Sunday</span>
                  <span className="font-semibold uppercase tracking-wider text-xs">Closed</span>
                </div>
              </div>

              {/* Physical location coordinates */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-zinc-200">Aurora Facilities Location</h4>
                
                <a
                  href="https://goo.gl/maps/w8NXvG5Hozy7Pkch7"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-start gap-3 bg-[#0A1128] hover:bg-[#0D1B3E] border border-[#1E3A8A]/35 p-4 rounded-xl transition-all group shadow-md"
                >
                  <MapPin className="text-red-500 mt-1 shrink-0 group-hover:scale-110 transition-transform" size={20} />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-white group-hover:text-[#CC2936] transition-colors">
                      22651 E Aurora Pkwy, Unit A-8
                    </p>
                    <p className="text-xs text-zinc-200 font-light">Aurora, CO 80016 • Saddle Rock area</p>
                    <p className="inline-flex items-center gap-1 text-[11px] font-bold text-[#CC2936] pt-1">
                      <span>Launch Google Map Directions</span>
                      <ExternalLink size={10} />
                    </p>
                  </div>
                </a>
              </div>

            </div>

            {/* Right side: High-converting interactive trial booking form card */}
            <div className="lg:col-span-7 bg-gradient-to-b from-[#0D1B3E] to-[#0A1128] p-6 md:p-8 rounded-2xl border border-[#1E3A8A]/30 shadow-2xl relative">
              
              <AnimatePresence mode="wait">
                {!trialFormSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleTrialSubmit}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <div className="inline-flex gap-1.5 items-center px-2.5 py-1 rounded bg-[#CC2936]/10 border border-[#CC2936]/30 text-[#CC2936] text-[10px] font-extrabold tracking-widest uppercase">
                        <Sparkles size={11} />
                        <span>Instant Class Trial Activation</span>
                      </div>
                      <h3 className="text-xl font-display font-black text-white">Book Your 1-Week Free Trial Step</h3>
                      <p className="text-xs text-zinc-200 font-light">Complete the short info below. We'll contact you within 24 hours to secure your family's uniform size and preferred initial session time.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="space-y-1.5">
                        <label className="text-xs text-zinc-300 font-semibold uppercase tracking-wider block">Parent / Student Name</label>
                        <input
                          type="text"
                          required
                          value={formData.parentName}
                          onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                          placeholder="e.g., John Doe"
                          className="w-full bg-[#0A1128] border border-[#1E3A8A]/30 focus:border-[#CC2936] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#CC2936]/30 transition-all font-light"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs text-zinc-300 font-semibold uppercase tracking-wider block">Student Age</label>
                        <input
                          type="number"
                          required
                          value={formData.studentAge}
                          onChange={(e) => setFormData({...formData, studentAge: e.target.value})}
                          placeholder="e.g., 8"
                          className="w-full bg-[#0A1128] border border-[#1E3A8A]/30 focus:border-[#CC2936] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#CC2936]/30 transition-all font-light"
                        />
                      </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="space-y-1.5">
                        <label className="text-xs text-zinc-300 font-semibold uppercase tracking-wider block">Contact Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="e.g., 720-900-4546"
                          className="w-full bg-[#0A1128] border border-[#1E3A8A]/30 focus:border-[#CC2936] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#CC2936]/30 transition-all font-light"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs text-zinc-300 font-semibold uppercase tracking-wider block">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="e.g., contact@info.com"
                          className="w-full bg-[#0A1128] border border-[#1E3A8A]/30 focus:border-[#CC2936] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#CC2936]/30 transition-all font-light"
                        />
                      </div>

                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-300 font-semibold uppercase tracking-wider block">Division Program of Interest</label>
                      <select
                        value={selectedProgram}
                        onChange={(e) => setSelectedProgram(e.target.value)}
                        className="w-full bg-[#0A1128] border border-[#1E3A8A]/30 focus:border-[#CC2936] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#CC2936]/30 transition-all cursor-pointer font-light"
                      >
                        <option>Tiny Tigers (Ages 4-6)</option>
                        <option>Children (Ages 7-12)</option>
                        <option>Teen / Adult (Ages 13 and above)</option>
                        <option>Adult Traditional Forms/Poomsae</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-300 font-semibold uppercase tracking-wider block">Optional Notes or Fitness Goals</label>
                      <textarea
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder="e.g., build focus, discipline, high stamina..."
                        className="w-full bg-[#0A1128] border border-[#1E3A8A]/30 focus:border-[#CC2936] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#CC2936]/30 transition-all font-light resize-none"
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#CC2936] to-[#1E3A8A] text-white font-extrabold text-base py-3.5 rounded-full hover:from-white hover:to-white hover:text-black transition-all duration-300 shadow-md shadow-rose-950/20 cursor-pointer text-center flex items-center justify-center gap-2 active:scale-95"
                      >
                        <span>Activate My Free Special Offer Now</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>

                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="py-12 text-center space-y-6"
                  >
                    <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                      <CheckCircle2 size={36} />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-2xl font-display font-black text-white">Application Activated!</h3>
                      <p className="text-sm text-zinc-200 max-w-md mx-auto font-light leading-relaxed">
                        Thank you <strong className="text-[#CC2936] font-semibold">{formData.parentName || 'Parent'}</strong>. We have securely saved your registration for the <strong className="text-white">{selectedProgram}</strong>.
                      </p>
                      <p className="text-xs text-zinc-350 max-w-sm mx-auto font-light">
                        Master Kim's administration staff will text or dial you at <span className="text-white font-medium">{formData.phone}</span> shortly to complete enrollment steps and schedule your student's orientation.
                      </p>
                    </div>

                    <div>
                      <button
                        onClick={resetTrialForm}
                        className="px-6 py-2 bg-neutral-900 border border-neutral-800 text-zinc-300 hover:text-white rounded-full text-xs font-semibold tracking-wider uppercase cursor-pointer"
                      >
                        Register another student
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        </div>
      </section>

      {/* Structured footer with explicit details */}
      <footer className="relative z-10 bg-black border-t border-zinc-800 text-zinc-300 text-base py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-[#1E3A8A]/20">
            
            {/* Logo details block */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 bg-white rounded p-0.5 overflow-hidden">
                  <img
                    src={assetUrl("/media/cropped-logo-192x192.webp")}
                    alt="JK United Taekwondo Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-black text-lg text-white tracking-widest leading-none">
                    JK UNITED
                  </span>
                  <span className="text-xs tracking-widest text-[#CC2936] font-semibold uppercase">
                    TAEKWONDO CENTER
                  </span>
                </div>
              </div>
 
              <p className="text-sm font-light text-zinc-200 leading-relaxed max-w-xs">
                Fostering confidence, core agility, and world-class traditional martial arts discipline under certified Team USA and South Korean guidance since 2005.
              </p>
 
              <div className="flex gap-3 pt-2">
                <a
                  href="https://www.facebook.com/jkunitedtkd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#0D1B3E] border border-[#1E3A8A]/30 text-zinc-200 hover:text-white hover:border-[#CC2936] transition-colors flex items-center justify-center cursor-pointer"
                  aria-label="Facebook page Link"
                >
                  <Facebook size={16} />
                </a>
              </div>
            </div>
 
            {/* Quick Navigation Links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-sm uppercase font-extrabold tracking-widest text-white">Quick Navigation</h4>
              <ul className="space-y-2.5 text-sm text-zinc-200 font-light">
                <li><button onClick={() => handleNavigation('home')} className="hover:text-[#CC2936] transition-colors cursor-pointer text-left">Home Base</button></li>
                <li><button onClick={() => handleNavigation('home', '#master')} className="hover:text-[#CC2936] transition-colors cursor-pointer text-left">Our Master Coach</button></li>
                <li><button onClick={() => handleNavigation('home', '#programs')} className="hover:text-[#CC2936] transition-colors cursor-pointer text-left">Active Curriculums</button></li>
                <li><button onClick={() => handleNavigation('schedule')} className="hover:text-[#CC2936] transition-colors cursor-pointer text-left font-semibold text-white">Class Schedule & Calendar</button></li>
                <li><button onClick={() => handleNavigation('home', '#hours')} className="hover:text-[#CC2936] transition-colors cursor-pointer text-left">Contact & Booking Form</button></li>
              </ul>
            </div>
 
            {/* Studio Contact details directly mapped to the source */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-sm uppercase font-extrabold tracking-widest text-white">Contacts & Location</h4>
              <ul className="space-y-2 text-sm text-zinc-200 font-light">
                <li className="flex items-center gap-1.5 font-semibold text-zinc-300">
                  <Phone size={14} className="text-[#CC2936]" />
                  <a href="tel:7209004546" className="hover:text-white transition-colors">720-900-4546</a>
                </li>
                <li className="flex items-center gap-1.5">
                  <Mail size={14} className="text-[#CC2936] shrink-0" />
                  <a href="mailto:info@jkunitedtkd.com" className="hover:text-white transition-colors break-all">info@jkunitedtkd.com</a>
                </li>
                <li className="flex items-start gap-1.5 pt-1">
                  <MapPin size={14} className="text-rose-500 shrink-0 mt-0.5" />
                  <span>22651 E Aurora Pkwy Unit A-8, Aurora, CO 80016</span>
                </li>
              </ul>
            </div>
 
            {/* Premium quick news enrollment */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-sm uppercase font-extrabold tracking-widest text-white">Quick Newsletter</h4>
              <p className="text-sm text-zinc-200 font-light">Enter email to receive local seminar notices, event calendars, or seasonal breaks announcements.</p>
              
              {!footerContactSubmitted ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (footerContactEmail) setFooterContactSubmitted(true);
                  }}
                  className="flex flex-col gap-2"
                >
                  <input
                    type="email"
                    required
                    value={footerContactEmail}
                    onChange={(e) => setFooterContactEmail(e.target.value)}
                    placeholder="Enter email..."
                    className="w-full bg-[#0A1128] border border-[#1E3A8A]/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#CC2936] transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#0D1B3E] hover:bg-[#CC2936] hover:text-white border border-[#1E3A8A]/30 rounded-lg py-2 text-sm font-bold text-zinc-300 transition-colors cursor-pointer active:scale-95"
                  >
                    Subscribe Alerts
                  </button>
                </form>
              ) : (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-sm flex items-center gap-1.5">
                  <Check size={16} />
                  <span>Subscribed successfully!</span>
                </div>
              )}
            </div>
 
          </div>
 
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-zinc-350 font-light">
            <p>Copyright © 2026 JK United TKD. All Rights Reserved.</p>
            <div className="flex gap-4">
              <span>Modern Redesign 2026</span>
              <span>•</span>
              <span>Kukkiwon Standard</span>
            </div>
          </div>
 
        </div>
      </footer>

      {/* Dynamic Popups & Modals */}

      {/* 1. Champion YouTube Video Player Modal Frame */}
      <AnimatePresence>
        {videoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVideoModalOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            />

            {/* Video container window */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              className="relative z-10 w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden aspect-video shadow-2xl"
            >
              
              {/* Close Button overlay */}
              <button
                onClick={() => setVideoModalOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/80 hover:bg-neutral-800 text-zinc-200 hover:text-white flex items-center justify-center cursor-pointer transition-colors border border-neutral-800"
                aria-label="Close video player"
              >
                <X size={20} />
              </button>

              {/* Responsive Embed Player */}
              <iframe
                title="JK United Taekwondo training preview"
                className="w-full h-full"
                src="https://www.youtube.com/embed/t2pKVwbwhMo?autoplay=1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Interactive Lead Trial Session Booking Modal */}
      <AnimatePresence>
        {trialModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTrialModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            {/* Pop-up window */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              className="relative z-10 w-full max-w-lg bg-[#0D1B3E] p-6 md:p-8 rounded-3xl border border-[#1E3A8A]/30 shadow-2xl overflow-hidden"
            >
              
              <button
                onClick={() => setTrialModalOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0A1128] hover:bg-[#0D1B3E] text-zinc-200 hover:text-white flex items-center justify-center cursor-pointer border border-[#1E3A8A]/30 transition-colors"
                aria-label="Close trial scheduler window"
              >
                <X size={16} />
              </button>

              <AnimatePresence mode="wait">
                {!trialFormSubmitted ? (
                  <form onSubmit={handleTrialSubmit} className="space-y-4">
                    
                    <div className="space-y-1.5 pb-2 border-b border-[#1E3A8A]/20">
                      <div className="text-amber-400 text-[10px] uppercase font-black tracking-widest flex items-center gap-1">
                        <Award size={12} />
                        <span>Limited Spots for Free Trials</span>
                      </div>
                      <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">Free 1-Week Trial Enrollment</h3>
                      <p className="text-[11px] text-[#CC2936] font-semibold">Currently scheduling for: {selectedProgram}</p>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-200 font-extrabold uppercase tracking-wider block">First & Last Name</label>
                      <input
                        type="text"
                        required
                        value={formData.parentName}
                        onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                        placeholder="Parent / Guardian Name"
                        className="w-full bg-[#0A1128] border border-[#1E3A8A]/30 focus:border-[#CC2936] rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#CC2936]/30 transition-all font-light"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-200 font-extrabold uppercase tracking-wider block">Student Name (if younger)</label>
                        <input
                          type="text"
                          required
                          value={formData.studentName}
                          onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                          placeholder="e.g., Billy Doe"
                          className="w-full bg-[#0A1128] border border-[#1E3A8A]/30 focus:border-[#CC2936] rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#CC2936]/30 transition-all font-light"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-200 font-extrabold uppercase tracking-wider block">Student Age</label>
                        <input
                          type="number"
                          required
                          value={formData.studentAge}
                          onChange={(e) => setFormData({...formData, studentAge: e.target.value})}
                          placeholder="Age"
                          className="w-full bg-[#0A1128] border border-[#1E3A8A]/30 focus:border-[#CC2936] rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#CC2936]/30 transition-all font-light"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-200 font-extrabold uppercase tracking-wider block">Contact Phone (Mobile required)</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="720-900-4546"
                        className="w-full bg-[#0A1128] border border-[#1E3A8A]/30 focus:border-[#CC2936] rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#CC2936]/30 transition-all font-light"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-200 font-extrabold uppercase tracking-wider block">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="yourname@domain.com"
                        className="w-full bg-[#0A1128] border border-[#1E3A8A]/30 focus:border-[#CC2936] rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#CC2936]/30 transition-all font-light"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-200 font-extrabold uppercase tracking-wider block">Program Track</label>
                      <select
                        value={selectedProgram}
                        onChange={(e) => setSelectedProgram(e.target.value)}
                        className="w-full bg-[#0A1128] border border-[#1E3A8A]/30 focus:border-[#CC2936] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#CC2936]/30 transition-all cursor-pointer font-light"
                      >
                        <option>Tiny Tigers (Ages 4-6)</option>
                        <option>Children (Ages 7-12)</option>
                        <option>Teen / Adult (Ages 13 and above)</option>
                        <option>Adult Traditional Forms/Poomsae</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-[#CC2936] text-white font-extrabold text-xs tracking-widest uppercase py-3.5 rounded-full hover:bg-white hover:text-black transition-colors cursor-pointer active:scale-95"
                      >
                        Secure Free Spot Now
                      </button>
                    </div>
                    
                    <p className="text-[10px] text-zinc-350 text-center italic font-sans">By registering and scheduling, you agree to visit with parent/guardian.</p>

                  </form>
                ) : (
                  <motion.div
                    key="modal-success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="py-8 text-center space-y-4"
                  >
                    <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                      <CheckCircle2 size={32} />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xl font-display font-black text-white">Application Received!</h4>
                      <p className="text-xs text-zinc-300 max-w-xs mx-auto leading-relaxed">
                        Master Kim's team has registered <strong className="text-[#CC2936]">{formData.studentName || 'your student'}</strong> for the 1-Week Class trial sequence.
                      </p>
                      <p className="text-[11px] text-zinc-350 max-w-xs mx-auto">
                        We have dispatched a confirmation alert to <span className="text-white font-medium">{formData.email}</span>. We will call you soon!
                      </p>
                    </div>

                    <div>
                      <button
                        onClick={resetTrialForm}
                        className="bg-[#0A1128] hover:bg-[#0D1B3E] text-zinc-300 border border-[#1E3A8A]/25 px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer"
                      >
                        Close Window
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
