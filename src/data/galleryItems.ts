import { assetUrl } from '../assetUrl';

export interface GalleryItem {
  src: string;
  title: string;
  category: 'master' | 'classes' | 'competition';
  description: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: assetUrl('/media/master-jin-competition-aerial-kick.jpg'),
    title: 'National Team Aerial Demonstration',
    category: 'competition',
    description: 'Master Jin Kim performing a high aerial kick during USA Taekwondo national competition.'
  },
  {
    src: assetUrl('/media/competition-podium-youth-medals.jpg'),
    title: 'Youth Tournament Podium Finish',
    category: 'competition',
    description: 'JK United students earning gold, silver, and bronze on the USA competition podium.'
  },
  {
    src: assetUrl('/media/tournament-team-medals.jpg'),
    title: 'Tournament Medal Winners with Master Kim',
    category: 'competition',
    description: 'Students proudly displaying tournament medals alongside Master Jin Kim at a championship event.'
  },
  {
    src: assetUrl('/media/capture_temp.jpg'),
    title: 'Poomsae Championship Performance',
    category: 'competition',
    description: 'Master Jin Kim competing in USA Taekwondo Poomsae with judges and national team athletes ringside.'
  },
  {
    src: assetUrl('/media/JK-United-Video-2_2.jpeg'),
    title: 'World Poomsae Championships 2022',
    category: 'competition',
    description: 'Team USA celebrating at the Goyang World Taekwondo Poomsae Championships.'
  },
  {
    src: assetUrl('/media/Resized_png_20230403_110714_0000_492304801766417.jpg'),
    title: 'World Championships Gold Medal',
    category: 'competition',
    description: 'Master Jin Kim with gold medal, flowers, and certificate at the Goyang 2022 World Poomsae Championships.'
  },
  {
    src: assetUrl('/media/jin-side-scaled.jpg'),
    title: 'Precision Form Alignment',
    category: 'master',
    description: 'Master Jin Kim demonstrating extreme flexibility and exactness in side kick extension.'
  },
  {
    src: assetUrl('/media/jin-face-scaled.jpg'),
    title: 'Owner and Head Coach Pose',
    category: 'master',
    description: '5th Dan Kukkiwon Master Jin Kim displaying authentic leadership uniform.'
  },
  {
    src: assetUrl('/media/Untitled-design-6.png'),
    title: 'Youth Sparring Gear Training',
    category: 'classes',
    description: 'Students preparing for sparring with protective gear during an in-studio training session.'
  },
  {
    src: assetUrl('/media/Untitled-design-18.png'),
    title: 'Group Stretching & Flexibility',
    category: 'classes',
    description: 'Students building flexibility and body control through structured warm-up drills in class.'
  },
  {
    src: assetUrl('/media/Untitled-design-65-1024x587.png'),
    title: 'Tiny Tigers Coordination Class',
    category: 'classes',
    description: 'Ages 4-6 training coordination and concentration in a happy, structured class.'
  },
  {
    src: assetUrl('/media/Untitled-design-66-1024x587.png'),
    title: 'School-Age Focus & Meditation',
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
    title: 'Black Belt Sparring Demonstration',
    category: 'classes',
    description: 'Advanced students practicing dynamic sparring techniques on the training floor.'
  },
  {
    src: assetUrl('/media/classes-youth-seated-rows.jpg'),
    title: 'Youth Class Seated Formation',
    category: 'classes',
    description: 'Students sitting in disciplined rows during a youth Taekwondo class at the JK United dojang.'
  },
  {
    src: assetUrl('/media/classes-community-group-photo.jpg'),
    title: 'JK United Community Gathering',
    category: 'classes',
    description: 'A large, diverse group of students gathered together at the JK United Taekwondo Center.'
  },
  {
    src: assetUrl('/media/classes-master-jin-youth-class.jpg'),
    title: 'Master Kim Leading Youth Class',
    category: 'classes',
    description: 'Master Jin Kim instructing a full youth class in the JK United training studio.'
  }
];
