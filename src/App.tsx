import { useState, useEffect, FormEvent, lazy, Suspense } from 'react';
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
  Zap,
  Target,
  Instagram,
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
import { submitTrialForm } from './submitForm';
import HeroBackground from './components/HeroBackground';
import ScrollToTop from './components/ScrollToTop';
import { GALLERY_ITEMS } from './data/galleryItems';
import ViewLoadingFallback from './components/ViewLoadingFallback';
import {
  type AppView,
  type EducationTab,
  type RouteState,
  buildPath,
  resolveRoute,
} from './routing';

const AboutUsView = lazy(() => import('./views/AboutUsView'));
const GalleryView = lazy(() => import('./views/GalleryView'));
const EducationView = lazy(() => import('./views/EducationView'));
const ScheduleView = lazy(() => import('./views/ScheduleView'));

function isMobileViewport() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
}

// Live timezone tracker structure
interface StudioStatus {
  isOpen: boolean;
  message: string;
  nextSession: string;
}

export default function App() {
  // Navigation & Menu Mobile State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Dynamic Page Router View
  const [currentView, setCurrentView] = useState<AppView>('home');

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
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Photo Gallery interactive state
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'master' | 'classes' | 'competition'>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Education page interactive states
  const [selectedBelt, setSelectedBelt] = useState<string>('White');
  const [vocabSearch, setVocabSearch] = useState<string>('');
  const [vocabCategory, setVocabCategory] = useState<string>('all');
  const [scheduleFilter, setScheduleFilter] = useState<string>('all');
  const [educationTab, setEducationTab] = useState<EducationTab>('rankings');
  const [activeTaegeukId, setActiveTaegeukId] = useState<number>(1);
  const [activeWonshimLevel, setActiveWonshimLevel] = useState<number>(1);
  const [playingAudioUrl, setPlayingAudioUrl] = useState<string | null>(null);
  const [currentAudioObj, setCurrentAudioObj] = useState<HTMLAudioElement | null>(null);

  const scrollToHash = (hash?: string) => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const applyRoute = (route: RouteState, options?: { scroll?: boolean; urlMode?: 'push' | 'replace' | 'none' }) => {
    const { scroll = true, urlMode = 'none' } = options ?? {};
    setMobileMenuOpen(false);
    setCurrentView(route.view);
    if (route.educationTab) {
      setEducationTab(route.educationTab);
    }

    if (scroll) {
      if (route.view === 'home' && route.hash) {
        window.setTimeout(() => scrollToHash(route.hash), 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    if (urlMode !== 'none') {
      const path = buildPath(route);
      if (urlMode === 'replace') {
        window.history.replaceState(null, '', path);
      } else {
        window.history.pushState(null, '', path);
      }
    }
  };

  const handleNavigation = (view: AppView, hash?: string, tab?: EducationTab) => {
    applyRoute(
      {
        view,
        hash,
        educationTab: view === 'education' ? tab : undefined,
      },
      { urlMode: 'push' },
    );
  };

  const handleEducationTabChange = (tab: EducationTab) => {
    setEducationTab(tab);
    window.history.pushState(null, '', buildPath({ view: 'education', educationTab: tab }));
  };

  useEffect(() => {
    applyRoute(resolveRoute(window.location.pathname), { urlMode: 'replace' });

    const onPopState = () => {
      applyRoute(resolveRoute(window.location.pathname), { urlMode: 'none' });
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Form input standard states
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    studentAge: '',
    phone: '',
    email: '',
    notes: '',
  });

  // Auto-sliding gallery state and interval
  const [autoSliderIndex, setAutoSliderIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(isMobileViewport);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const checkMobile = () => setIsMobile(mediaQuery.matches);
    checkMobile();
    mediaQuery.addEventListener('change', checkMobile);
    return () => mediaQuery.removeEventListener('change', checkMobile);
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
  const handleTrialSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');

    try {
      await submitTrialForm({
        formType: trialModalOpen ? 'trial-booking-modal' : 'trial-booking-contact',
        program: selectedProgram,
        parentName: formData.parentName,
        studentName: formData.studentName,
        studentAge: formData.studentAge,
        phone: formData.phone,
        email: formData.email,
        notes: formData.notes,
      });
      setTrialFormSubmitted(true);
    } catch {
      setFormError('Unable to submit right now. Please call us at 720-900-4546 or try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const resetTrialForm = () => {
    setTrialFormSubmitted(false);
    setFormError('');
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
      image: assetUrl('/media/competition-podium-youth-medals.jpg'),
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
      illustrativeImg: assetUrl('/media/tournament-team-medals.jpg'),
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
            <a href="mailto:jkunitedtkd@gmail.com" className="flex items-center gap-1.5 hover:text-[#CC2936] transition-colors font-medium">
              <Mail size={13} className="text-[#CC2936]" />
              <span>jkunitedtkd@gmail.com</span>
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
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 md:py-3 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('home', '#home');
            }}
            className="flex items-center group shrink-0"
          >
            <img
              src={assetUrl("/media/logo-jkunited.png")}
              alt="JK United Taekwondo Center"
              className="h-14 sm:h-16 md:h-[4.5rem] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] shadow-md shadow-black/20"
              referrerPolicy="no-referrer"
            />
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
              Book 2-Week Trial
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
                  2-Week Trial – $59
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
        <HeroBackground />

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
              Led by three-time USA Taekwondo Poomsae National Team Member <strong className="text-[#CC2936] font-bold">Master Jin Hyuk Kim</strong>. Empowering students to build confidence, discipline, and character through Taekwondo excellence.
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
                <span className="font-medium">3-Time USA National Team Member Master Jin Kim</span>
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
                  <p className="text-sm uppercase tracking-widest text-[#CC2936] font-bold">2-Week Trial Program – $59</p>
                  <p className="text-xs text-zinc-200 font-medium">Includes 4 Classes &amp; FREE Uniform ($50 Value)</p>
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

                <p className="text-xs sm:text-sm text-zinc-200 mt-1">4 classes + FREE uniform included with your $59 trial</p>

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
                  <p className="text-sm font-semibold text-zinc-100 font-display">Holder of a Kukkiwon Certified Instructor License</p>
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
                      Book 2-Week Trial
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
                assetUrl('/media/master-jin-competition-aerial-kick.jpg'),
                assetUrl('/media/competition-podium-youth-medals.jpg'),
                assetUrl('/media/tournament-team-medals.jpg'),
                assetUrl('/media/Untitled-design-65-1024x587.png'),
                assetUrl('/media/Untitled-design-66-1024x587.png'),
                assetUrl('/media/Untitled-design-67-1024x587.png'),
                assetUrl('/media/Untitled-design-4.png'),
                assetUrl('/media/Untitled-design-3.png'),
                assetUrl('/media/Untitled-design-2.png'),
                assetUrl('/media/Untitled-design.jpg'),
                // Repeated set to guarantee continuous, seamless end-to-end translation loop
                assetUrl('/media/master-jin-competition-aerial-kick.jpg'),
                assetUrl('/media/competition-podium-youth-medals.jpg'),
                assetUrl('/media/tournament-team-medals.jpg'),
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

      <Suspense fallback={<ViewLoadingFallback />}>
        {currentView === 'about-us' && (
          <AboutUsView
            handleNavigation={handleNavigation}
            medalFilter={medalFilter}
            setMedalFilter={setMedalFilter}
            setSelectedProgram={setSelectedProgram}
            setTrialModalOpen={setTrialModalOpen}
          />
        )}
        {currentView === 'gallery' && (
          <GalleryView
            handleNavigation={handleNavigation}
            galleryFilter={galleryFilter}
            setGalleryFilter={setGalleryFilter}
            activeLightboxIndex={activeLightboxIndex}
            setActiveLightboxIndex={setActiveLightboxIndex}
            isMobile={isMobile}
          />
        )}
        {currentView === 'education' && (
          <EducationView
            handleNavigation={handleNavigation}
            selectedBelt={selectedBelt}
            setSelectedBelt={setSelectedBelt}
            vocabSearch={vocabSearch}
            setVocabSearch={setVocabSearch}
            vocabCategory={vocabCategory}
            setVocabCategory={setVocabCategory}
            educationTab={educationTab}
            setEducationTab={handleEducationTabChange}
            activeTaegeukId={activeTaegeukId}
            setActiveTaegeukId={setActiveTaegeukId}
            activeWonshimLevel={activeWonshimLevel}
            setActiveWonshimLevel={setActiveWonshimLevel}
            playingAudioUrl={playingAudioUrl}
            setPlayingAudioUrl={setPlayingAudioUrl}
            currentAudioObj={currentAudioObj}
            setCurrentAudioObj={setCurrentAudioObj}
          />
        )}
        {currentView === 'schedule' && (
          <ScheduleView
            handleNavigation={handleNavigation}
            scheduleFilter={scheduleFilter}
            setScheduleFilter={setScheduleFilter}
            setSelectedProgram={setSelectedProgram}
            setTrialModalOpen={setTrialModalOpen}
          />
        )}
      </Suspense>

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
                  We run dynamic classes throughout the weekday and on Saturday morning. Visit our modern training space or book your 2-week trial below.
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
                    <div className="space-y-1.5">
                      <h3 className="text-xl font-display font-black text-white">2-Week Trial Program – $59</h3>
                      <p className="text-sm text-zinc-200 font-medium">Includes 4 Classes &amp; FREE Uniform ($50 Value)</p>
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

                    {formError && (
                      <p className="text-sm text-red-400 text-center">{formError}</p>
                    )}

                    <div>
                      <button
                        type="submit"
                        disabled={formSubmitting}
                        className="w-full bg-gradient-to-r from-[#CC2936] to-[#1E3A8A] text-white font-extrabold text-sm sm:text-base px-5 py-3.5 rounded-full hover:from-white hover:to-white hover:text-black transition-all duration-300 shadow-md shadow-rose-950/20 cursor-pointer text-center flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <span className="leading-snug">
                          {formSubmitting ? (
                            'Sending...'
                          ) : (
                            <>
                              <span className="sm:hidden">Book My 2-Week Trial</span>
                              <span className="hidden sm:inline">Book My 2-Week Trial – $59</span>
                            </>
                          )}
                        </span>
                        {!formSubmitting && <ArrowRight size={18} className="shrink-0" />}
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

      {/* Footer */}
      <footer className="relative z-10 bg-black border-t border-zinc-800 text-zinc-300 py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 pb-12 border-b border-[#1E3A8A]/20 items-start">

            {/* Brand */}
            <div className="space-y-5 sm:col-span-2 lg:col-span-1">
              <img
                src={assetUrl("/media/logo-jkunited.png")}
                alt="JK United Taekwondo Center"
                className="h-12 w-auto object-contain"
              />
              <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
                Building confidence, character, and focus through traditional Taekwondo excellence under the leadership of three-time USA National Poomsae Team Member Master Jin Hyuk Kim.
              </p>
              <a
                href="https://www.instagram.com/jkunitedtaekwondo/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-[#CC2936] transition-colors"
                aria-label="Instagram page"
              >
                <span className="w-8 h-8 rounded-full bg-[#0D1B3E] border border-[#1E3A8A]/30 flex items-center justify-center">
                  <Instagram size={14} />
                </span>
                @jkunitedtaekwondo
              </a>
            </div>

            {/* Quick Navigation */}
            <div className="space-y-5">
              <h4 className="text-xs uppercase font-extrabold tracking-[0.2em] text-white">Quick Navigation</h4>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm font-semibold">
                {[
                  { label: 'Home', view: 'home' as const, hash: '#home', href: '/' },
                  { label: 'About Us', view: 'about-us' as const, href: '/about-us/' },
                  { label: 'Schedule', view: 'schedule' as const, href: '/class-schedule-old/' },
                  { label: 'Gallery', view: 'gallery' as const, href: '/gallery/' },
                  { label: 'Education', view: 'education' as const, href: '/education/' },
                  { label: 'Contact Us', view: 'home' as const, hash: '#hours', href: '/contact-us/', noActive: true },
                ].map(({ label, view, hash, href, noActive }) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(view, hash);
                      }}
                      className={`transition-colors cursor-pointer text-left block ${
                        !noActive && currentView === view
                          ? 'text-[#CC2936]'
                          : 'text-zinc-400 hover:text-[#CC2936]'
                      }`}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Location */}
            <div className="space-y-5">
              <h4 className="text-xs uppercase font-extrabold tracking-[0.2em] text-white">Contact & Location</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#0D1B3E] border border-[#1E3A8A]/30 flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-[#CC2936]" />
                  </span>
                  <a href="tel:7209004546" className="text-zinc-300 hover:text-white transition-colors font-medium">
                    720-900-4546
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#0D1B3E] border border-[#1E3A8A]/30 flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-[#CC2936]" />
                  </span>
                  <a href="mailto:jkunitedtkd@gmail.com" className="text-zinc-300 hover:text-white transition-colors font-medium">
                    jkunitedtkd@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#0D1B3E] border border-[#1E3A8A]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={14} className="text-[#CC2936]" />
                  </span>
                  <span className="text-zinc-400 leading-relaxed">
                    22651 E Aurora Pkwy Unit A-8<br />
                    Aurora, CO 80016
                  </span>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-10 pt-8 border-t border-[#1E3A8A]/25">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-8 text-sm text-zinc-400">
              <p className="text-center lg:text-left order-2 lg:order-1">
                © 2026 JK United TKD. All Rights Reserved.
              </p>

              <p className="text-center order-1 lg:order-2">
                Designed by{' '}
                <a
                  href="https://gloriacloud.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-zinc-200 hover:text-[#CC2936] transition-colors underline decoration-[#CC2936]/40 underline-offset-4 hover:decoration-[#CC2936]"
                >
                  Gloria Cloud
                </a>
              </p>

              <p className="text-center lg:text-right order-3 text-zinc-500">
                Modern Redesign 2026 <span className="text-[#1E3A8A] mx-1.5">·</span> Kukkiwon Standard
              </p>
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
                        <span>Limited Spots Available</span>
                      </div>
                      <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">2-Week Trial Program – $59</h3>
                      <p className="text-[11px] text-zinc-200 font-medium">Includes 4 Classes &amp; FREE Uniform ($50 Value)</p>
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

                    {formError && (
                      <p className="text-xs text-red-400 text-center">{formError}</p>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={formSubmitting}
                        className="w-full bg-[#CC2936] text-white font-extrabold text-xs tracking-widest uppercase py-3.5 rounded-full hover:bg-white hover:text-black transition-colors cursor-pointer active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {formSubmitting ? 'Sending...' : 'Book My 2-Week Trial – $59'}
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
                        Master Kim's team has registered <strong className="text-[#CC2936]">{formData.studentName || 'your student'}</strong> for the 2-Week Trial Program (4 classes + FREE uniform).
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

      <ScrollToTop />
    </div>
  );
}
