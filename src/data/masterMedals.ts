import { assetUrl } from '../assetUrl';

export interface MasterMedal {
  title: string;
  medal: string;
  type: 'international' | 'national' | 'state';
  year: string;
  detail: string;
  badgeImg: string;
}

export const MASTER_MEDALS: MasterMedal[] = [
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
];;
