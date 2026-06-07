import { assetUrl } from '../assetUrl';

export interface GalleryItem {
  src: string;
  title: string;
  category: 'master' | 'classes' | 'facility';
  description: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
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
];;
