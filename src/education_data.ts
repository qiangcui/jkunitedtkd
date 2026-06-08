import { assetUrl } from './assetUrl';

export interface TaegeukForm {
  id: number;
  name: string;
  meaning: string;
  symbolism: string;
  videoUrl: string;
  steps: string[];
}

export interface FlagHonor {
  title: string;
  image: string;
  text: string;
  details?: string[];
}

export interface CalligraphyItem {
  term: string;
  meaning: string;
}

export interface BeltRank {
  gup: string;
  color: string;
  starText?: string;
  description: string;
  accentClass: string;
  dotColor: string;
}

export interface AudioTerm {
  korean: string;
  pronunciation: string;
  english: string;
  audioUrl?: string;
}

export interface PhilosophyCreed {
  title: string;
  content: string;
}

export interface PhilosophyWord {
  term: string;
  english: string;
  meaning: string;
}

export interface ClassProcedure {
  no: number;
  step: string;
}

export interface WonshimDrill {
  no: string;
  attack: string;
  startingPosition: string;
  defense: string[];
}

export const TAEGEUK_FORMS: TaegeukForm[] = [
  {
    id: 1,
    name: "Taegeuk IL Jang",
    meaning: "Heaven (Keon)",
    symbolism: "Signifies heaven and light, representing the beginning of the universe and the student's entry level (beginner mind).",
    videoUrl: "https://www.youtube.com/embed/4E5nKA86M1Y",
    steps: [
      "Junbi stance facing forward",
      "Turn 90 degrees left into left walking stance (Ap Seogi): Execute left low block (Arae Makki).",
      "Step forward into right walking stance (Ap Seogi): Execute right middle punch (Momtong Jireugi).",
      "Turn 180 degrees right into right walking stance (Ap Seogi): Execute right low block (Arae Makki).",
      "Step forward into left walking stance (Ap Seogi): Execute left middle punch (Momtong Jireugi).",
      "Turn 90 degrees left into left front stance (Ap Kubi): Execute left low block (Arae Makki), then right middle punch (Momtong Baro Jireugi).",
      "Turn 90 degrees right into right walking stance (Ap Seogi): Left middle inside block (Momtong Anmakki).",
      "Step forward into left walking stance (Ap Seogi): Execute right middle punch (Momtong Baro Jireugi).",
      "Turn 180 degrees left into left walking stance (Ap Seogi): Right middle inside block (Momtong Anmakki).",
      "Step forward into right walking stance (Ap Seogi): Execute left middle punch (Momtong Baro Jireugi).",
      "Turn 90 degrees right into right front stance (Ap Kubi): Execute right low block (Arae Makki), then left middle punch (Momtong Baro Jireugi).",
      "Turn 90 degrees left into left walking stance (Ap Seogi): Execute left high block (Olgul Makki).",
      "Right front kick (Ap Chagi), land in right walking stance (Ap Seogi): Execute right middle punch (Momtong Bandae Jireugi).",
      "Turn 180 degrees right into right walking stance (Ap Seogi): Execute right high block (Olgul Makki).",
      "Left front kick (Ap Chagi), land in left walking stance (Ap Seogi): Execute left middle punch (Momtong Bandae Jireugi).",
      "Turn 90 degrees left into left front stance (Ap Kubi): Execute left low block (Arae Makki).",
      "Step forward into right front stance (Ap Kubi): Execute right middle punch (Momtong Bandae Jireugi) with a loud yell [KIHAP].",
      "Pivot on right foot, return to Junbi."
    ]
  },
  {
    id: 2,
    name: "Taegeuk EE Jang",
    meaning: "Still Lake (Tae)",
    symbolism: "Signifies a quiet, deep lake which is strong and stable inside, yet gentle and reflective on the outside.",
    videoUrl: "https://www.youtube.com/embed/4E5nKA86M1Y",
    steps: [
      "Junbi stance facing forward",
      "Turn 90 degrees left into left walking stance (Ap Seogi): Left low block (Arae Makki).",
      "Step forward into right front stance (Ap Kubi): Right middle punch (Momtong Bandae Jireugi).",
      "Turn 180 degrees right into right walking stance (Ap Seogi): Right low block (Arae Makki).",
      "Step forward into left front stance (Ap Kubi): Left middle punch (Momtong Bandae Jireugi).",
      "Turn 90 degrees left into left walking stance (Ap Seogi): Right middle inside block (Momtong Anmakki).",
      "Step forward into right walking stance (Ap Seogi): Left middle inside block (Momtong Anmakki).",
      "Turn 90 degrees left into left walking stance (Ap Seogi): Left low block (Arae Makki).",
      "Right front kick (Ap Chagi), land in right front stance (Ap Kubi): Right high punch (Olgul Bandae Jireugi).",
      "Turn 180 degrees right into right walking stance (Ap Seogi): Right low block (Arae Makki).",
      "Left front kick (Ap Chagi), land in left front stance (Ap Kubi): Left high punch (Olgul Bandae Jireugi).",
      "Turn 90 degrees left into left walking stance (Ap Seogi): Left high block (Olgul Makki).",
      "Step forward into right walking stance (Ap Seogi): Right high block (Olgul Makki).",
      "Turn 270 degrees left into left walking stance (Ap Seogi): Right middle inside block (Momtong Anmakki).",
      "Turn 180 degrees right into right walking stance (Ap Seogi): Left middle inside block (Momtong Anmakki).",
      "Turn 90 degrees left into left front stance (Ap Kubi): Left low block (Arae Makki).",
      "Right front kick (Ap Chagi), land in right walking stance (Ap Seogi): Right middle punch.",
      "Left front kick (Ap Chagi), land in left walking stance (Ap Seogi): Left middle punch.",
      "Right front kick (Ap Chagi), land in right front stance (Ap Kubi): Right middle punch [KIHAP].",
      "Return to Junbi stance."
    ]
  },
  {
    id: 3,
    name: "Taegeuk SAM Jang",
    meaning: "Fire (Ri)",
    symbolism: "Signifies hot fire and glowing sun, representing heat, light, passion, and rapid explosive energy.",
    videoUrl: "https://www.youtube.com/embed/4E5nKA86M1Y",
    steps: [
      "Junbi stance facing forward",
      "Turn 90 degrees left into left walking stance (Ap Seogi): Left low block (Arae Makki).",
      "Right front kick (Ap Chagi), land in right front stance (Ap Kubi): Double middle punch (Momtong Dubeon Jireugi).",
      "Turn 180 degrees right into right walking stance (Ap Seogi): Right low block (Arae Makki).",
      "Left front kick (Ap Chagi), land in left front stance (Ap Kubi): Double middle punch (Momtong Dubeon Jireugi).",
      "Turn 90 degrees left into left walking stance (Ap Seogi): Left knifehand neck strike (Hansonnal Mok-chigi).",
      "Step forward into right walking stance (Ap Seogi): Right knifehand neck strike (Hansonnal Mok-chigi).",
      "Turn 90 degrees left into right back stance (Dwit Kubi): Left knifehand middle block (Hansonnal Momtong Bakkat Makki), transition to left front stance (Ap Kubi): Right middle punch.",
      "Turn 180 degrees right into left back stance (Dwit Kubi): Right knifehand middle block (Hansonnal Momtong Bakkat Makki), transition to right front stance (Ap Kubi): Left middle punch.",
      "Turn 90 degrees left into left walking stance (Ap Seogi): Right middle inside block (Momtong Anmakki).",
      "Step forward into right walking stance (Ap Seogi): Left middle inside block (Momtong Anmakki).",
      "Turn 270 degrees left into left walking stance (Ap Seogi): Left low block.",
      "Right front kick (Ap Chagi), land in right front stance (Ap Kubi): Double middle punch.",
      "Turn 180 degrees right into right walking stance (Ap Seogi): Right low block.",
      "Left front kick (Ap Chagi), land in left front stance (Ap Kubi): Double middle punch.",
      "Turn 90 degrees left into left walking stance (Ap Seogi): Left low block, then right middle punch.",
      "Step forward into right walking stance (Ap Seogi): Right low block, then left middle punch.",
      "Left front kick (Ap Chagi), land in left walking stance (Ap Seogi): Left low block, then right middle punch.",
      "Right front kick (Ap Chagi), land in right front stance (Ap Kubi): Right low block, then left middle punch [KIHAP].",
      "Return to Junbi stance."
    ]
  },
  {
    id: 4,
    name: "Taegeuk SA Jang",
    meaning: "Thunder (Jin)",
    symbolism: "Signifies thunder, representing great power and sudden dynamic action, reminding students of calm power.",
    videoUrl: "https://www.youtube.com/embed/4E5nKA86M1Y",
    steps: [
      "Junbi stance facing forward",
      "Turn 90 degrees left into right back stance (Dwit Kubi): Double knifehand middle block (Sonnal Makki).",
      "Step forward into right front stance (Ap Kubi): Right spearhand strike (Pyonsonkkeut Sewotzireugi).",
      "Turn 180 degrees right into left back stance (Dwit Kubi): Double knifehand middle block (Sonnal Makki).",
      "Step forward into left front stance (Ap Kubi): Left spearhand strike (Pyonsonkkeut Sewotzireugi).",
      "Turn 90 degrees left into left front stance (Ap Kubi): Swallow form neck strike (Jebi Poom Mokchigi).",
      "Right front kick (Ap Chagi), land in right front stance (Ap Kubi): Right middle punch.",
      "Double side kick (Yop Chagi) to right, land in left back stance (Dwit Kubi): Double knifehand middle block.",
      "Turn 270 degrees left into right back stance (Dwit Kubi): Right middle outside block (Momtong Bakkat Makki).",
      "Left front kick (Ap Chagi), land in right back stance (Dwit Kubi): Left middle inside block.",
      "Turn 180 degrees right into left back stance (Dwit Kubi): Left middle outside block.",
      "Right front kick (Ap Chagi), land in left back stance (Dwit Kubi): Right middle inside block.",
      "Turn 90 degrees left into left front stance (Ap Kubi): Swallow form neck strike (Jebi Poom Mokchigi).",
      "Right front kick (Ap Chagi), land in right front stance (Ap Kubi): Right backfist strike (Deungjumeok Apchigi).",
      "Turn 270 degrees left into left walking stance (Ap Seogi): Left middle inside block, right middle punch.",
      "Turn 180 degrees right into right walking stance (Ap Seogi): Right middle inside block, left middle punch.",
      "Turn 90 degrees left into left front stance (Ap Kubi): Left middle inside block, double middle punch.",
      "Step forward into right front stance (Ap Kubi): Right middle inside block, double middle punch [KIHAP].",
      "Return to Junbi stance."
    ]
  },
  {
    id: 5,
    name: "Taegeuk OH Jang",
    meaning: "Wind (Son)",
    symbolism: "Signifies wind, representing both a gentle breeze and a powerful typhoon. It represents unbending flexible force.",
    videoUrl: "https://www.youtube.com/embed/4E5nKA86M1Y",
    steps: [
      "Junbi stance facing forward",
      "Turn 90 degrees left into left front stance (Ap Kubi): Left low block (Arae Makki).",
      "Bring right foot back into left cross stance (Wen Seogi): Execute right hammerfist down Strike (Mejueok Naeryochigi).",
      "Turn 180 degrees right into right front stance (Ap Kubi): Right low block.",
      "Bring left foot back into right cross stance (Oreun Seogi): Left hammerfist down Strike.",
      "Turn 90 degrees left into left front stance (Ap Kubi): Left middle inside block, then right middle inside block.",
      "Right front kick (Ap Chagi), land in right front stance (Ap Kubi): Right backfist strike, then left middle inside block.",
      "Left front kick (Ap Chagi), land in left front stance (Ap Kubi): Left backfist strike, then right middle inside block.",
      "Step forward into right front stance (Ap Kubi): Right backfist strike.",
      "Turn 270 degrees left into left back stance (Dwit Kubi): Right single knifehand middle block (Hansonnal Bakkatmakki).",
      "Step forward into right front stance (Ap Kubi): Right elbow strike (Palkup Dollyochigi).",
      "Turn 180 degrees right into right back stance (Dwit Kubi): Left single knifehand middle block.",
      "Step forward into left front stance (Ap Kubi): Left elbow strike.",
      "Turn 90 degrees left into left front stance (Ap Kubi): Left low block, then right middle inside block.",
      "Right front kick (Ap Chagi), land in right front stance (Ap Kubi): Right low block, then left middle inside block.",
      "Turn 90 degrees left into left front stance (Ap Kubi): Left high block.",
      "Right side kick (Yop Chagi), land in right front stance (Ap Kubi): Left target elbow strike (Palkup Pyojeokchigi).",
      "Turn 180 degrees right into right front stance (Ap Kubi): Right high block.",
      "Left side kick (Yop Chagi), land in left front stance (Ap Kubi): Right target elbow strike.",
      "Turn 90 degrees left into left front stance (Ap Kubi): Left low block, then right middle inside block.",
      "Right front kick (Ap Chagi), jump forward into right back-cross stance (Dwi-koaseogi): Right backfist strike [KIHAP].",
      "Return to Junbi stance."
    ]
  },
  {
    id: 6,
    name: "Taegeuk YOOK Jang",
    meaning: "Water (Gam)",
    symbolism: "Signifies water, representing liquid flow, adaptability, and ultimate persistence. Water overcomes obstacle by flowing around it.",
    videoUrl: "https://www.youtube.com/embed/4E5nKA86M1Y",
    steps: [
      "Junbi stance facing forward",
      "Turn 90 degrees left into left front stance (Ap Kubi): Left low block (Arae Makki).",
      "Right front kick (Ap Chagi), land in right back stance (Dwit Kubi): Right middle outside block.",
      "Turn 180 degrees right into right front stance (Ap Kubi): Right low block.",
      "Left front kick (Ap Chagi), land in left back stance (Dwit Kubi): Left middle outside block.",
      "Turn 90 degrees left into left front stance (Ap Kubi): Left single knifehand high twist block (Hansonnal Olgul Bitureomakki).",
      "Right roundhouse kick (Dollyo Chagi), land in left front stance (Ap Kubi): Left high outside block, then right middle reverse punch.",
      "Right front kick (Ap Chagi), land in right front stance (Ap Kubi): Right middle reverse punch.",
      "Turn 180 degrees right into right front stance (Ap Kubi): Right high outside block, then left middle reverse punch.",
      "Left front kick (Ap Chagi), land in left front stance (Ap Kubi): Left middle reverse punch.",
      "Turn 90 degrees left into parallel stance (Naranhiseogi): Double low spreading block (Arae Hechomakki).",
      "Step forward into right front stance (Ap Kubi): Right single knifehand high twist block, then execute left roundhouse kick [KIHAP].",
      "Land in right front stance (Ap Kubi): Right low block.",
      "Left front kick (Ap Chagi), land in right back stance (Dwit Kubi): Left middle outside block.",
      "Turn 180 degrees left into left front stance (Ap Kubi): Left low block.",
      "Right front kick (Ap Chagi), land in left back stance (Dwit Kubi): Right middle outside block.",
      "Turn 90 degrees right into right back stance (Dwit Kubi): Right double knifehand middle block.",
      "Turn 180 degrees left into left back stance (Dwit Kubi): Left double knifehand middle block.",
      "Transition to left front stance (Ap Kubi): Left palm heel middle block (Batangson Momtongmakki), then right middle punch.",
      "Step forward into right front stance (Ap Kubi): Right palm heel middle block, then left middle punch.",
      "Return to Junbi stance."
    ]
  },
  {
    id: 7,
    name: "Taegeuk CHIL Jang",
    meaning: "Mountain (Gan)",
    symbolism: "Signifies a stable, majestic mountain, representing unbending firmness and never giving up in the face of struggle.",
    videoUrl: "https://www.youtube.com/embed/4E5nKA86M1Y",
    steps: [
      "Junbi stance facing forward",
      "Turn 90 degrees left into left tiger stance (Beom Seogi): Left palm heel middle inside block (Batangson Momtong Anmakki).",
      "Right front kick (Ap Chagi), land in left tiger stance (Beom Seogi): Left middle inside block.",
      "Turn 180 degrees right into right tiger stance (Beom Seogi): Right palm heel middle inside block.",
      "Left front kick (Ap Chagi), land in right tiger stance (Beom Seogi): Right middle inside block.",
      "Turn 90 degrees left into right back stance (Dwit Kubi): Left double knifehand low block.",
      "Step forward into left back stance (Dwit Kubi): Right double knifehand low block.",
      "Turn 90 degrees left into left tiger stance (Beom Seogi): Left palm heel assisted middle block (Batangson Momtong Kodureo Anmakki), then right backfist high strike.",
      "Turn 180 degrees right into right tiger stance (Beom Seogi): Right palm heel assisted middle block, then left backfist high strike.",
      "Close feet into closed stance (Moaseogi): Left hand wraps right fist (Bojumeok stance, hold for 5 counts).",
      "Step left foot forward into left front stance (Ap Kubi): Execute scissor block (Kawi Makki).",
      "Step right foot forward into right front stance (Ap Kubi): Execute scissor block (Kawi Makki).",
      "Turn 180 degrees left into left front stance (Ap Kubi): Double middle chest block (Momtong Hechomakki).",
      "Right knee kick (Mureup Chagi), land feet together in right back-cross stance (Dwi-koaseogi): Double upper punch (Jeocho Jireugi).",
      "Step down in front stance: Execute cross-hand low block (Arae Otgoreo Makki).",
      "Turn 180 degrees right into right front stance (Ap Kubi): Double middle chest block (Momtong Hechomakki).",
      "Left knee kick (Mureup Chagi), land in left back-cross stance: Double upper punch.",
      "Step down: Execute cross-hand low block.",
      "Turn 90 degrees left into left walking stance (Ap Seogi): Left backfist outside strike.",
      "Right target crescent kick (Pyojeok Chagi), land in left horse-riding stance (Juchum Seogi): Right target elbow strike (Palkup Pyojeokchigi).",
      "Step right foot forward into right walking stance (Ap Seogi): Right backfist outside strike.",
      "Left target crescent kick (Pyojeok Chagi), land in right horse-riding stance: Left target elbow strike.",
      "Execute left single knifehand sideways block (Hansonnal Yopmakki).",
      "Execute right middle sideways punch (Momtong Yopjireugi) [KIHAP].",
      "Return to Junbi stance."
    ]
  },
  {
    id: 8,
    name: "Taegeuk PAL Jang",
    meaning: "Earth (Gon)",
    symbolism: "Signifies the earth, from which all life springs and returns (circle of life). It marks the transition to Black Belt.",
    videoUrl: "https://www.youtube.com/embed/4E5nKA86M1Y",
    steps: [
      "Junbi stance facing forward",
      "Turn 90 degrees left into right back stance (Dwit Kubi): Double middle outside block (Kodureo Bakkatmakki).",
      "Transition into left front stance (Ap Kubi): Right reverse punch.",
      "Double jumping front kick (Tweo Apchagi) [KIHAP on second kick].",
      "Land in left front stance (Ap Kubi): Left middle block, then double middle punch.",
      "Step forward into right front stance (Ap Kubi): Right middle punch.",
      "Turn 270 degrees left into right front stance (Ap Kubi): Right half-mountain block (Wesanteulmakki).",
      "Pull left arm, execute left upper cut (Dangkyo Teokjireugi) while sliding right foot forward.",
      "Cross feet, turn 180 degrees left into left front stance (Ap Kubi): Left half-mountain block.",
      "Pull right arm, execute right upper cut while sliding left foot forward.",
      "Turn 90 degrees left into right back stance (Dwit Kubi): Left double knifehand block.",
      "Transition to left front stance (Ap Kubi): Right reverse punch.",
      "Right front kick (Ap Chagi), land in right tiger stance (Beom Seogi): Right palm heel middle block. Then left tiger stance: Left knifehand middle block.",
      "Left front kick (Ap Chagi), land in left front stance (Ap Kubi): Left reverse punch.",
      "Transition to left tiger stance (Beom Seogi): Left palm heel middle block. Then right tiger stance: Right knifehand middle block.",
      "Right front kick (Ap Chagi), land in right front stance (Ap Kubi): Right reverse punch.",
      "Transition to right tiger stance (Beom Seogi): Right palm heel middle block.",
      "Turn 270 degrees left into right back stance (Dwit Kubi): Double low block (Kodureo Araemakki).",
      "Execute jumping front kick (Tweo Apchagi) with a loud tell [KIHAP].",
      "Land in right front stance (Ap Kubi): Right middle block, then double middle punch.",
      "Turn 270 degrees right into right back stance (Dwit Kubi): Left single knifehand outside block.",
      "Transition to left front stance (Ap Kubi): Right target elbow strike (Palkup Dollyochigi).",
      "Right backfist high strike, left reverse punch.",
      "Turn 180 degrees left into left back stance (Dwit Kubi): Right single knifehand outside block.",
      "Transition to right front stance (Ap Kubi): Left target elbow strike.",
      "Left backfist high strike, right reverse middle punch.",
      "Pivot left, return to Junbi."
    ]
  }
];

export const FLAGS_HONOR: FlagHonor[] = [
  {
    title: "South Korean Flag (Taegeukgi)",
    image: assetUrl("/media/korea-flag.jpg"),
    text: "The circle in the center, red upper half (Yang, positive) and blue lower half (Yin, negative), represents absolute, or the essential unity of all being, portraying cosmic duality. Opposite balances of Heaven and Hell, Fire and Water, Life and Death, Good and Evil, or Night and Day. The four trigrams represent the essentials of the nation: Government, Land, People, and Laws, mirroring universal forces.",
    details: [
      "Upper Left (Geon): Three unbroken lines symbolize Heaven and Spring.",
      "Lower Right (Gon): Three broken lines represent Earth and Summer.",
      "Upper Right (Gam): Two broken lines separated by an unbroken line represent Water and Winter.",
      "Lower Left (Ri): Two unbroken lines separated by a broken line represent Fire and Autumn."
    ]
  },
  {
    title: "American Flag (Old Glory)",
    image: assetUrl("/media/usa-flag.jpg"),
    text: "The flags of our host nation represents the home of our center in Colorado. The colors on the flag contain rich meaning of characters we teach: Red represents valor and hardiness; White represents innocence and purity; Blue stands for vigilance, perseverance, and justice.",
    details: [
      "Stars: The 50 individual stars represent the 50 states in the union.",
      "Stripes: The 13 alternating red and white stripes represent the 13 original colonies that declared independence."
    ]
  },
  {
    title: "Moo Duk Kwan Emblem",
    image: assetUrl("/media/moo-duk-kwan-emblem.jpg"),
    text: "The ultimate traditional emblem of Tae Kwon Do brotherhood, conveying advanced growth across oceans and continents under the light of peace.",
    details: [
      "Laurel Leaves: 14 leaves on each side represent the 14 states of Korea and the advancement of peace.",
      "Seeds: Three seeds joined to the leaves on each side (6 total) represent the 'three thousand li' of Korea (North to South) and the six continents of the world.",
      "Central Fist: Represents Tae Kwon Do practice and absolute justice.",
      "Deep Blue: Represents the three oceans, wisdom, and Black Belt maturity."
    ]
  }
];

export const CALLIGRAPHY_ITEMS: CalligraphyItem[] = [
  {
    term: "Chong Shin Tong Il",
    meaning: "Mind and Body together as unified one."
  },
  {
    term: "Won Shim",
    meaning: "Circle of inner strength and focus."
  },
  {
    term: "Cho Shim",
    meaning: "A beginner's mind - empty, open, and ready to learn."
  },
  {
    term: "Mu Shim",
    meaning: "No mind or empty mind, allowing explosive action without fear or hesitation."
  }
];

export const BELT_RANKINGS: BeltRank[] = [
  {
    gup: "9th Gup",
    color: "White",
    description: "A student who has no prior knowledge of the art but has begun the journey. White, being a non-color, expresses a VOID, representing a seedling in deep winter soil awaiting spring.",
    accentClass: "border-white bg-white/5 text-white",
    dotColor: "bg-white"
  },
  {
    gup: "8th Gup",
    color: "Yellow",
    description: "Development has slowly begun. Yellow represents the fertile soil and CAUTION, reminding the student of careful, deliberate, and slow physical movements.",
    accentClass: "border-yellow-400 bg-yellow-400/5 text-yellow-400",
    dotColor: "bg-yellow-400"
  },
  {
    gup: "7th Gup",
    color: "Purple",
    description: "The student receives their first dark color, representing the deep DESIRE TO LEARN, focus, and physical CONCENTRATION on forms.",
    accentClass: "border-purple-500 bg-purple-500/5 text-purple-400",
    dotColor: "bg-purple-500"
  },
  {
    gup: "6th Gup",
    color: "Green",
    description: "The plant is now sprouting leaves of skills. The student has begun to achieve a higher level of concentration, FOCUS, and coordination of techniques.",
    accentClass: "border-emerald-500 bg-emerald-500/5 text-emerald-400",
    dotColor: "bg-emerald-500"
  },
  {
    gup: "5th Gup",
    color: "Blue",
    description: "Reaching toward the blue heavens. The student has begun to acquire real SKILL, agility, and is developing powerful CONFIDENCE.",
    accentClass: "border-blue-500 bg-blue-500/5 text-blue-400",
    dotColor: "bg-blue-500"
  },
  {
    gup: "4th Gup",
    color: "Brown",
    description: "Solidifying the trunk. The student has begun to fully coordinate physical SKILL and stamina with absolute mental CONFIDENCE and self-belief.",
    accentClass: "border-amber-700 bg-amber-700/5 text-amber-500",
    dotColor: "bg-amber-700"
  },
  {
    gup: "3rd Gup",
    color: "Red",
    description: "The hot fire of danger. The student is now developing rapid SPEED and advanced block/strike techniques with continuous FLOWING MOTION.",
    accentClass: "border-red-500 bg-red-500/5 text-red-500",
    dotColor: "bg-red-500"
  },
  {
    gup: "2nd Gup",
    color: "Red w/ Black Stripes",
    description: "Signifies danger and high level focus. The student is combining explosive SPEED with physical STRENGTH. Working closely on pinpoint ACCURACY of targeting.",
    accentClass: "border-red-600 bg-red-600/5 text-red-400",
    dotColor: "bg-red-600 border-l border-r border-black"
  },
  {
    gup: "1st Gup",
    color: "Deputy Black",
    description: "The black belt candidate. Student has successfully combined POWER with ACCURACY. Signifies MATURITY, self-discipline, and NO FEAR in training. Ready for Dan promotion.",
    accentClass: "border-zinc-500 bg-zinc-900 text-zinc-300",
    dotColor: "bg-zinc-700 border border-black"
  },
  {
    gup: "Dan",
    color: "Black",
    description: "The complete circle. Outer and inner systems have come together in perfect HARMONY. The student has obtained wisdom, self-confidence, and maturity. The true journey of Taekwondo now begins.",
    accentClass: "border-neutral-500 bg-black text-zinc-200 shadow-neon-red",
    dotColor: "bg-neutral-950 border border-neutral-600"
  }
];

export const PHILOSOPHY_CREEDS: PhilosophyCreed[] = [
  {
    title: "Personal Creed",
    content: "My work is a reflection of myself. My execution of martial arts technique is also a reflection of myself. In whatever productive work I do, I will create a masterpiece. It will reflect my genius and virtuosity. In all things, I will work most seriously, intelligently, and wholeheartedly. To it, I commit my soul, my body, and spirit, and even my whole life fortune. I am a doer, a venturer, a winner."
  },
  {
    title: "Student Creed",
    content: "To build true confidence through KNOWLEDGE in the mind, HONESTY in the heart, and STRENGTH in the body. To keep friendship with one another and to build a strong and happy community. Never to fight to achieve selfish ends, but to develop MIGHT FOR RIGHT."
  },
  {
    title: "A Leader Is Best",
    content: "A leader is best when people barely know he exists. Not so good when people obey and acclaim him. Worse when they despise him. But of a good leader, who talks little, when his work is done, his aim fulfilled, they will say: 'We did it ourselves.'"
  }
];

export const ASSOCIATION_PHILOSOPHIES: PhilosophyWord[] = [
  { term: "Myong Yea", english: "Honor", meaning: "Courtesy and self-respect, founded in truth." },
  { term: "Dan Kyul", english: "Unity", meaning: "Mutual trust, understanding, and respect, founded in love." },
  { term: "Bong Sa", english: "Service", meaning: "Helping without any personal expectation; service to community and friends, founded in selflessness." }
];

export const SCHOOL_PHILOSOPHIES: PhilosophyWord[] = [
  { term: "In Nae", english: "Patience", meaning: "Be patient with others; with patience comes true understanding." },
  { term: "Sa Rang", english: "Love", meaning: "With the patience that brings understanding, one learns to love others. Love of friends, family, and even adversaries is a fundamental part of the martial arts way." },
  { term: "Jon Kyung", english: "Respect", meaning: "Respect for all living things, both great and small, strong and weak, allows one to have respect for themselves and others." },
  { term: "Kyum Son", english: "Humility", meaning: "In all areas of life, one must remain humble; letting their deeds, not their words, speak for them." }
];

export const TIME_MANAGEMENT_KEYS = [
  "Set a goal and be positive.",
  "Plan and organize your work.",
  "Do one thing at a time.",
  "Do it now and never postpone."
];

export const START_CLASS_PROCEDURES: ClassProcedure[] = [
  { no: 1, step: "Line up (Chul sa)" },
  { no: 2, step: "Attention (Cha ryuht)" },
  { no: 3, step: "At ease (Ul shin cho)" },
  { no: 4, step: "Recite the Personal Creed" },
  { no: 5, step: "Attention (Cha ryuht)" },
  { no: 6, step: "Turn right to face flags (Oo yrang oo)" },
  { no: 7, step: "Attention (Cha ryuht)" },
  { no: 8, step: "Salute the flags (Kukki ye ke han kyung yet)" },
  { no: 9, step: "Turn left to face mirror (Cha young jah)" },
  { no: 10, step: "Attention (Cha ryuht)" },
  { no: 11, step: "Kneel or sit (Ahn jo)" },
  { no: 12, step: "Silent Meditation (Mukyum)" },
  { no: 13, step: "Return (Bah ro)" },
  { no: 14, step: "Stand up (Ay oh set)" },
  { no: 15, step: "Attention (Cha ryuht)" },
  { no: 16, step: "Face the Master (Kwanjang nim) or Instructor (Kyo bo nim)" },
  { no: 17, step: "Bow to the Master Kim (Kwang jang nim ke kyung yet)" },
  { no: 18, step: "Or bow to the instructor (Kyo bum nim ke kyung yet)" },
  { no: 19, step: "Say formal greeting, 'How are you, sir?' (Ahnyong hasimnika)" }
];

export const END_CLASS_PROCEDURES: ClassProcedure[] = [
  { no: 1, step: "Attention (Cha ryuht)" },
  { no: 2, step: "At ease (Ul shin cho)" },
  { no: 3, step: "Recite the Students' Creed" },
  { no: 4, step: "Attention (Cha ryuht)" },
  { no: 5, step: "Turn right to face flags (Oo yrang oo)" },
  { no: 6, step: "Attention (Cha ryuht)" },
  { no: 7, step: "Salute the flags (Kukki ye ke han kyung yet)" },
  { no: 8, step: "Turn left to face mirror (Cha young jah)" },
  { no: 9, step: "Attention (Cha ryuht)" },
  { no: 10, step: "Kneel or sit (Ahn jo)" },
  { no: 11, step: "Silent Meditation (Mukyum)" },
  { no: 12, step: "Return (Bah ro)" },
  { no: 13, step: "Stand up (Ay oh set)" },
  { no: 14, step: "Attention (Cha ryuht)" },
  { no: 15, step: "At ease (Ul shin cho)" },
  { no: 16, step: "Recite leadership wisdom, 'A leader is best'" },
  { no: 17, step: "Attention (Cha ryuht)" },
  { no: 18, step: "Face the Master or Instructor" },
  { no: 19, step: "Bow to the Master Kim (Kwang jang nim ke kyung yet)" },
  { no: 20, step: "Say, 'Thank you' (Kahm sa hamnida)" },
  { no: 21, step: "Say, 'I appreciate your effort' (Sugo ha shasim nida)" },
  { no: 22, step: "Turn to face Black Belts in sequence" },
  { no: 23, step: "High color belt says, 'Bow to Black Belts' (Kyo bum nim ke kyung yet)" },
  { no: 24, step: "Say, 'Thank you' (Kahm sa hamnida)" },
  { no: 25, step: "Class dismissed (Ee sahn)" }
];

export const TERMINOLOGY_STANCES: AudioTerm[] = [
  { korean: "왼앞굽이, 오른앞굽이", pronunciation: "wen apkubi, oreun apkubi", english: "Left, Right, deep front stance", audioUrl: assetUrl("/audio/왼앞굽이오른앞굽이.mp3") },
  { korean: "왼앞서기, 오른앞서기", pronunciation: "wen apseogi, oreun apseogi", english: "Left, Right, walking stance", audioUrl: assetUrl("/audio/왼앞서기오른앞서기.mp3") },
  { korean: "왼뒷굽비, 오른뒷굽비", pronunciation: "wen gwitkubi, oreun dwitkubi", english: "Left, Right, back stance", audioUrl: assetUrl("/audio/왼뒷굽비오른뒷굽비.mp3") },
  { korean: "왼옆서기, 오른옆서기", pronunciation: "wen yupseogi, oreun yupseogi", english: "Left, Right, side stance", audioUrl: assetUrl("/audio/왼옆서기오른옆서기.mp3") },
  { korean: "준비, 기본준비서기", pronunciation: "jun-bi, kibon junbiseogi", english: "Ready stance / Basic ready stance", audioUrl: assetUrl("/audio/준비기본준비서기.mp3") },
  { korean: "주춤서기", pronunciation: "joo-chum-suh-gi", english: "Horseback riding stance", audioUrl: assetUrl("/audio/주춤서기.mp3") },
  { korean: "범서기", pronunciation: "bum-suh-gi", english: "Tiger stance", audioUrl: assetUrl("/audio/범서기.mp3") },
  { korean: "앞꼬아서기", pronunciation: "ap-qko-ah-suh-gi", english: "Front cross stance", audioUrl: assetUrl("/audio/앞꼬아서기.mp3") },
  { korean: "뒷꼬아서기", pronunciation: "gwit-qko-ah-suh-gi", english: "Back cross stance", audioUrl: assetUrl("/audio/뒷꼬아서기.mp3") }
];

export const TERMINOLOGY_BLOCKS: AudioTerm[] = [
  { korean: "얼굴 막기", pronunciation: "ul-gool-mak-gi", english: "High (face) block", audioUrl: assetUrl("/audio/얼굴막기.mp3") },
  { korean: "몸통안막기", pronunciation: "mom-tong-ahn-mak-gi", english: "Body inside block", audioUrl: assetUrl("/audio/몸통안막기.mp3") },
  { korean: "몸통밖았막기", pronunciation: "mom-tong-bak-ak-mak-gi", english: "Body outside block", audioUrl: assetUrl("/audio/몸통밖았막기.mp3") },
  { korean: "아래 막기", pronunciation: "ah-reh-mak-gi", english: "Low sections block", audioUrl: assetUrl("/audio/아래막기.mp3") },
  { korean: "제비폼목치기", pronunciation: "jae-bi-poom-mok-chi-gi", english: "Swallow posture high block knifehand collarbone strike", audioUrl: assetUrl("/audio/제비폼목치기.mp3") },
  { korean: "양손날아래막기", pronunciation: "yang-son-nal-arae-mak-gi", english: "Double knifehand low block", audioUrl: assetUrl("/audio/양손날아래막기.mp3") },
  { korean: "산틀 막기", pronunciation: "san-til-mak-gi", english: "Mountain-shape block", audioUrl: assetUrl("/audio/산틀막기.mp3") },
  { korean: "금강 막기", pronunciation: "gum kang mak gi", english: "Diamond block (highly defensive template)", audioUrl: assetUrl("/audio/금강막기.mp3") },
  { korean: "한손날밖았막기", pronunciation: "han son nal bak ak mak gi", english: "Single knifehand middle outside block", audioUrl: assetUrl("/audio/한손날밖았막기.mp3") },
  { korean: "양손날밖았막기", pronunciation: "yang-son-nal-bak-ak-mak-gi", english: "Double knifehand middle outside block", audioUrl: assetUrl("/audio/양손날박았막기.mp3") },
  { korean: "바탕손안막기", pronunciation: "bah-tang-sun-ahn-mak-gi", english: "Palm heel block", audioUrl: assetUrl("/audio/바탕손안막기.mp3") }
];

export const TERMINOLOGY_KICKS: AudioTerm[] = [
  { korean: "앞차기", pronunciation: "ap-chagi", english: "Front snap kick", audioUrl: assetUrl("/audio/앞차기.mp3") },
  { korean: "돌려차기", pronunciation: "dollyo-chagi", english: "Roundhouse kick", audioUrl: assetUrl("/audio/돌려차기.mp3") },
  { korean: "옆차기", pronunciation: "yeop-chagi", english: "Side thrust kick", audioUrl: assetUrl("/audio/옆차기.mp3") },
  { korean: "뒷차기", pronunciation: "dwi-chagi", english: "Back thrust kick", audioUrl: assetUrl("/audio/뒷차기.mp3") },
  { korean: "후리기 / 낚시걸이", pronunciation: "hook-chagi / huryeo-chagi", english: "Hook kick", audioUrl: assetUrl("/audio/후리기.mp3") },
  { korean: "내려차기", pronunciation: "naeryeo-chagi", english: "Axe kick", audioUrl: assetUrl("/audio/내려차기.mp3") },
  { korean: "뒤후리기", pronunciation: "dwi-huryeochagi", english: "Spinning hook kick", audioUrl: assetUrl("/audio/뒤후리기.mp3") },
  { korean: "날루방", pronunciation: "nal-roo-bang", english: "Advance tornado round kick", audioUrl: assetUrl("/audio/날루방.mp3") },
  { korean: "돌개차기", pronunciation: "dolgae-chagi", english: "360 Tornado kick", audioUrl: assetUrl("/audio/돌개차기.mp3") },
  { korean: "나래차기", pronunciation: "narae-chagi", english: "Double roundhouse kick in succession", audioUrl: assetUrl("/audio/나래차기.mp3") },
  { korean: "양발돌려차기", pronunciation: "yang-bal-dollyo-chagi", english: "Double alternate roundhouse kick", audioUrl: assetUrl("/audio/양발돌려차기.mp3") },
  { korean: "양발앞차기", pronunciation: "yang-bal-ap-chagi", english: "Twin front kick", audioUrl: assetUrl("/audio/양발앞차기.mp3") },
  { korean: "날라앞차기", pronunciation: "nalla-apchagi", english: "Jumping front kick", audioUrl: assetUrl("/audio/날라앞차기.mp3") },
  { korean: "뛰어뒷차기", pronunciation: "tweo-dwi-chagi", english: "Jumping back kick", audioUrl: assetUrl("/audio/뛰어뒷차기.mp3") },
  { korean: "뛰어후리기", pronunciation: "tweo-huryeo", english: "Jumping hook kick", audioUrl: assetUrl("/audio/tweo-huryeo.mp3") },
  { korean: "두발앞차기", pronunciation: "du-bal-apchagi", english: "Twin jumping front kick", audioUrl: assetUrl("/audio/du-bal-apchagi.mp3") }
];

export const TERMINOLOGY_COUNTING: AudioTerm[] = [
  { korean: "하나", pronunciation: "hanah", english: "1", audioUrl: assetUrl("/audio/하나.mp3") },
  { korean: "둘", pronunciation: "dool", english: "2", audioUrl: assetUrl("/audio/둘.mp3") },
  { korean: "셋", pronunciation: "set", english: "3", audioUrl: assetUrl("/audio/셋.mp3") },
  { korean: "넷", pronunciation: "net", english: "4", audioUrl: assetUrl("/audio/넷.mp3") },
  { korean: "다섯", pronunciation: "dasot", english: "5", audioUrl: assetUrl("/audio/다섯.mp3") },
  { korean: "여섯", pronunciation: "yasot", english: "6", audioUrl: assetUrl("/audio/여섯.mp3") },
  { korean: "일곱", pronunciation: "ilgop", english: "7", audioUrl: assetUrl("/audio/일곱.mp3") },
  { korean: "여덟", pronunciation: "yadol", english: "8", audioUrl: assetUrl("/audio/여덟.mp3") },
  { korean: "아홉", pronunciation: "ahop", english: "9", audioUrl: assetUrl("/audio/아홉.mp3") },
  { korean: "열", pronunciation: "yool", english: "10", audioUrl: assetUrl("/audio/열.mp3") }
];

export const TERMINOLOGY_NUMBERINGS: AudioTerm[] = [
  { korean: "일", pronunciation: "il", english: "First / 1st", audioUrl: assetUrl("/audio/일.mp3") },
  { korean: "이", pronunciation: "ee", english: "Second / 2nd", audioUrl: assetUrl("/audio/이.mp3") },
  { korean: "삼", pronunciation: "sahm", english: "Third / 3rd", audioUrl: assetUrl("/audio/삼.mp3") },
  { korean: "사", pronunciation: "sah", english: "Fourth / 4th", audioUrl: assetUrl("/audio/사-.mp3") },
  { korean: "오", pronunciation: "oh", english: "Fifth / 5th", audioUrl: assetUrl("/audio/오.mp3") },
  { korean: "육", pronunciation: "ryook", english: "Sixth / 6th", audioUrl: assetUrl("/audio/육.mp3") },
  { korean: "칠", pronunciation: "chil", english: "Seventh / 7th", audioUrl: assetUrl("/audio/칠.mp3") },
  { korean: "팔", pronunciation: "pal", english: "Eighth / 8th", audioUrl: assetUrl("/audio/팔.mp3") },
  { korean: "구", pronunciation: "koo", english: "Ninth / 9th", audioUrl: assetUrl("/audio/구.mp3") },
  { korean: "십", pronunciation: "ship", english: "Tenth / 10th", audioUrl: assetUrl("/audio/십.mp3") }
];

export const TERMINOLOGY_ANATOMY: AudioTerm[] = [
  { korean: "몸", pronunciation: "mom", english: "Body", audioUrl: assetUrl("/audio/몸.mp3") },
  { korean: "얼굴", pronunciation: "ulgool", english: "Face & Head", audioUrl: assetUrl("/audio/얼굴.mp3") },
  { korean: "머리", pronunciation: "muh ree", english: "Head", audioUrl: assetUrl("/audio/머리.mp3") },
  { korean: "인중", pronunciation: "in joong", english: "Philtrum (vital target)", audioUrl: assetUrl("/audio/인종.mp3") },
  { korean: "턱", pronunciation: "tuhk", english: "Jaw / Chin", audioUrl: assetUrl("/audio/턱.mp3") },
  { korean: "목구멍", pronunciation: "mokoomeong", english: "Throat", audioUrl: assetUrl("/audio/목구멍.mp3") },
  { korean: "목", pronunciation: "mok", english: "Neck", audioUrl: assetUrl("/audio/목.mp3") },
  { korean: "어깨", pronunciation: "ouka", english: "Shoulder", audioUrl: assetUrl("/audio/어깨.mp3") },
  { korean: "명치", pronunciation: "myung chi", english: "Solar Plexus (critical focus)", audioUrl: assetUrl("/audio/명치.mp3") },
  { korean: "팔", pronunciation: "pahl", english: "Arm", audioUrl: assetUrl("/audio/팔.mp3") },
  { korean: "팔꿈", pronunciation: "pahlkup", english: "Elbow", audioUrl: assetUrl("/audio/팔꿈.mp3") },
  { korean: "팔목", pronunciation: "pahlmahk", english: "Forearm", audioUrl: assetUrl("/audio/팔목.mp3") },
  { korean: "안 팔목", pronunciation: "ahn pahlmahk", english: "Inner forearm section", audioUrl: assetUrl("/audio/안팔목.mp3") },
  { korean: "바깥 팔목", pronunciation: "bahkat pahlmahk", english: "Outer forearm section", audioUrl: assetUrl("/audio/바깥-팔목.mp3") },
  { korean: "손목", pronunciation: "sahnmahk", english: "Wrist", audioUrl: assetUrl("/audio/손목.mp3") },
  { korean: "손", pronunciation: "sahn", english: "Hand", audioUrl: assetUrl("/audio/손.mp3") },
  { korean: "싼칼 (손날)", pronunciation: "sahnkal / sonnal", english: "Knife hand edge", audioUrl: assetUrl("/audio/싼칼.mp3") },
  { korean: "싼칼등 (손날등)", pronunciation: "sahnkal deung", english: "Ridge hand inside edge", audioUrl: assetUrl("/audio/싼칼등.mp3") },
  { korean: "주목", pronunciation: "joomok", english: "Fist", audioUrl: assetUrl("/audio/주목.mp3") },
  { korean: "몸통", pronunciation: "momtong", english: "Chest / Torso", audioUrl: assetUrl("/audio/몸통.mp3") },
  { korean: "아래", pronunciation: "ahrae", english: "Low Section / Abdomen", audioUrl: assetUrl("/audio/아래.mp3") },
  { korean: "무릎", pronunciation: "mooreup", english: "Knee", audioUrl: assetUrl("/audio/무릎.mp3") },
  { korean: "앞 정강이", pronunciation: "ahp jung kang yi", english: "Shin", audioUrl: assetUrl("/audio/앞정강이.mp3") },
  { korean: "발과 발가락", pronunciation: "bahl & bahlkeut", english: "Foot, feet and toes", audioUrl: assetUrl("/audio/발.mp3") },
  { korean: "앞촉 (발끝)", pronunciation: "ahp chook", english: "Ball of foot", audioUrl: assetUrl("/audio/앞촉.mp3") },
  { korean: "뒷꿈치", pronunciation: "dwi koomchi", english: "Heel", audioUrl: assetUrl("/audio/뒷꿈치.mp3") }
];

export const TERMINOLOGY_GENERAL: AudioTerm[] = [
  { korean: "관장님", pronunciation: "Kwan jang nim", english: "President / Grand Master" },
  { korean: "사범님", pronunciation: "Sa Bum nim", english: "Master Instructor (4th Dan+)" },
  { korean: "교수님", pronunciation: "Kyo Soo nim", english: "3rd Dan Instructor" },
  { korean: "교범님", pronunciation: "Kyo Bum nim", english: "2nd Dan Instructor" },
  { korean: "국기에 대하여 경례", pronunciation: "Koo ki yeh, kyung nyeh", english: "Salute the National Flag" },
  { korean: "도장", pronunciation: "Do jang", english: "Taekwondo Studio / Training Gym" },
  { korean: "도복", pronunciation: "Do bok", english: "Traditional Uniform" },
  { korean: "띠", pronunciation: "Dhee", english: "Belt (symbol of rank)" },
  { korean: "품새", pronunciation: "Poom-seh", english: "Traditional Forms / Geometric Choreography" },
  { korean: "차렷", pronunciation: "Char-yut", english: "Attention Stance" },
  { korean: "경례", pronunciation: "Kyung nyeh", english: "Bow of respect" },
  { korean: "준비", pronunciation: "Jhoon-bi", english: "Ready Stance" },
  { korean: "시작", pronunciation: "Shee-jak", english: "Begin / Commencement" },
  { korean: "그만", pronunciation: "Kuman", english: "Stop / Pause" },
  { korean: "바로", pronunciation: "Bah-rote", english: "Return to ready posture" },
  { korean: "쉬어", pronunciation: "Sho / Swieur", english: "Relax / Rest at ease" },
  { korean: "기합", pronunciation: "Ki-hap", english: "Spirited battle cry (yell of focused energy)" }
];

export const WONSHIM_DRILLS: Record<number, WonshimDrill[]> = {
  1: [
    { no: "#1", attack: "Reverse Punch Right Hand", startingPosition: "Right foot back fighting stance", defense: ["Step left", "Left arm inside block covering face", "Right hand reverse punch to face"] },
    { no: "#2", attack: "Reverse Punch Right Hand", startingPosition: "Right foot back fighting stance", defense: ["Step left", "Left arm inside block covering face", "Right hand reverse punch to face", "Right foot roundhouse kick"] },
    { no: "#3", attack: "Jab punch left hand", startingPosition: "Right foot back fighting stance", defense: ["Step right", "Left arm outside block covering face", "Right hand reverse punch to face", "Switch feet, left foot roundhouse kick"] },
    { no: "#4", attack: "Jab punch left hand", startingPosition: "Right foot back fighting stance", defense: ["Step right", "Left arm outside block covering face", "Right hand reverse punch to face", "Switch feet, left foot roundhouse kick to rib section"] },
    { no: "#5", attack: "Right foot back roundhouse kick", startingPosition: "Right foot back fighting stance", defense: ["Slide back swiftly", "Right arm sweeping down block to circular swipe the kick past (bringing arm back to guard)", "Right foot roundhouse kick stepping forward on placement"] },
    { no: "#6", attack: "Left foot skip roundhouse kick", startingPosition: "Right foot back fighting stance", defense: ["Step 45 degrees outward to right", "Left arm down block to sweep the kick past", "Right foot roundhouse kick stepping forward when done"] },
    { no: "#7", attack: "Left foot skip roundhouse kick", startingPosition: "Right foot back fighting stance", defense: ["Step 45 degrees to the right", "Left arm down block to sweep the kick past", "Switch legs, grab around the back of attacker's neck, pull head down", "Lead knee kick to the face", "Step forward, execute dry downward elbow strike to collarbone"] },
    { no: "#8", attack: "Low right leg roundhouse kick", startingPosition: "Right foot back fighting stance", defense: ["Raise left knee high up and left to block kick, at same time left hand high block outward and right hand protects chin", "Left leg steps down", "Grab behind attacker's head and pull down.", "Right knee strike to face", "Without putting foot down, rotate attacker 180 degrees to right", "Right hand reverse punch to face", "Right foot front snap kick to chin", "Place right foot backward, execute right leg 360 hook kick"] }
  ],
  2: [
    { no: "#1", attack: "Reverse Punch Right Hand", startingPosition: "Right foot back fighting stance", defense: ["Step left", "Left inside block covering face", "Punch with right hand to face", "Punch with left hand to face", "Elbow strike with right elbow to chin"] },
    { no: "#2", attack: "Reverse Punch Right Hand", startingPosition: "Right foot back fighting stance", defense: ["Step left", "Left inside block covering face", "Grab behind attacker's head, pulling down", "Right knee strike to face", "Step down with right leg back", "Right roundhouse kick high to neck"] },
    { no: "#3", attack: "Jab punch left hand", startingPosition: "Right foot back fighting stance", defense: ["Step right", "Left outside block covering face", "Punch right hand to face", "Punch left hand to face", "Elbow strike with right elbow to jaw"] },
    { no: "#4", attack: "Jab punch left hand", startingPosition: "Right foot back fighting stance", defense: ["Step right", "Left outside block covering face", "Switch feet", "Grab behind attacker's head, pulling down", "Left knee strike to face", "Step down with left leg back", "Left roundhouse kick high"] },
    { no: "#5", attack: "Right foot back roundhouse kick", startingPosition: "Right foot back fighting stance", defense: ["Slide back", "Right arm down block to sweep the kick past", "Right middle roundhouse kick", "Step down", "Right high roundhouse kick"] },
    { no: "#6", attack: "Left foot skip roundhouse kick", startingPosition: "Right foot back fighting stance", defense: ["Step 45 degrees to right", "Switch feet", "Left middle roundhouse kick", "Step back", "Left high roundhouse kick"] },
    { no: "#7", attack: "Left foot skip roundhouse kick", startingPosition: "Right foot back fighting stance", defense: ["Step 45 degrees to right.", "Right low roundhouse kick to knee", "Grab behind attacker's head and pull down", "Left knee strike to face", "Step down", "Right downward elbow strike to head"] },
    { no: "#8", attack: "Low right leg roundhouse kick", startingPosition: "Right foot back fighting stance", defense: ["Raise left knee up and left, left hand high block outward and right hand protects face", "Left leg steps down", "Grab behind attacker's head, pull down", "Right knee strike to face", "Pull attacker almost 180 degrees to right", "Right hand reverse punch to head", "Right elbow down to neck", "Right knee strike to face", "Step back with right leg, executing right roundhouse kick to head"] }
  ],
  3: [
    { no: "#1", attack: "Reverse Punch Right Hand", startingPosition: "Right foot back fighting stance", defense: ["Step left", "Left arm inside block covering face", "Punch right, punch left, punch right", "Right roundhouse kick low, then right roundhouse kick high", "Step back with right leg", "Right spinning hook kick"] },
    { no: "#2", attack: "Reverse Punch Right Hand", startingPosition: "Right foot back fighting stance", defense: ["Step left", "Grab attacker's fist with both hands to trap the joint", "Step right leg forward, step left leg back (forces attacker face down onto floor)", "Left knee strike to face", "Left leg roundhouse kick to head"] },
    { no: "#3", attack: "Jab punch left hand", startingPosition: "Right foot back fighting stance", defense: ["Step right", "Left arm outside block covering face", "Punch right, punch left, punch right", "Switch feet", "Left low roundhouse kick, land forward", "Left high roundhouse kick, step back with left foot", "Left foot 360 spinning hook kick and step back", "Left roundhouse kick step forward", "Right foot 180 hook kick"] },
    { no: "#4", attack: "Jab punch left hand", startingPosition: "Right foot back fighting stance", defense: ["Step right", "Left arm outside block, grab attacker's wrist with left hand, pin down arm with right knifehand at elbow joint", "Step forward with right foot, then step back left foot 180 degrees to sweep them", "Left leg knee strike to face", "Left leg roundhouse kick to rib cage"] },
    { no: "#5", attack: "Right foot back roundhouse kick", startingPosition: "Right foot back fighting stance", defense: ["Step back with left foot to evade", "Left leg low roundhouse kick behind attacker's knee", "Right roundhouse kick, step backward", "Right 360 hook kick to head"] },
    { no: "#6", attack: "Left foot skip roundhouse kick", startingPosition: "Right foot back fighting stance", defense: ["Step 45 degrees to right", "Right roundhouse kick, step down in front", "Left leg roundhouse kick, step down in front", "Right leg hook kick to face"] },
    { no: "#7", attack: "Left foot skip roundhouse kick", startingPosition: "Right foot back fighting stance", defense: ["Step 45 degrees to right", "Right low roundhouse kick, step down in front", "Left leg roundhouse kick, step backward", "Left leg 180 hook kick to chin"] },
    { no: "#8", attack: "Low right leg roundhouse kick", startingPosition: "Right foot back fighting stance", defense: ["Step back with left foot", "Left leg low roundhouse kick to hamstring", "Grab attacker behind head", "Right knee strike to face, pull attacker 180 degrees sideways", "Right knee strike to face, step backward", "Right leg front kick to jaw, step backward", "Right leg 360 hook kick"] }
  ],
  4: [
    { no: "#1", attack: "Left Leg Skip Round Kick", startingPosition: "Right foot back fighting stance", defense: ["Step right 45 degrees", "Right roundhouse kick low behind knee to drop posture", "Step down forward", "Left roundhouse kick high to jaw", "Step down forward", "Right reverse punch to head"] },
    { no: "#2", attack: "Step Behind Side Kick Left Leg", startingPosition: "Right foot back fighting stance", defense: ["Step right 45 degrees", "Right roundhouse kick low behind knee", "Step behind attacker (right foot, then left foot)", "Grab shoulders, pull back with left knee driven to spine", "Right elbow strike to head"] },
    { no: "#3", attack: "Back kick right leg", startingPosition: "Right foot back fighting stance", defense: ["Step right 45 degrees to evade", "Right low roundhouse kick behind knee", "Step down in front", "Right high roundhouse kick to head", "Right downward axe kick"] },
    { no: "#4", attack: "180 Hook Kick", startingPosition: "Right foot back fighting stance", defense: ["Slide to the left to go past opponent", "Protect face with right arm at same time", "Reverse punch to head", "Right high roundhouse kick to neck"] },
    { no: "#5", attack: "Round kick Low", startingPosition: "Right foot back fighting stance", defense: ["Left leg side kick to jam attacker's incoming path", "Right low front kick to groin", "Step down front", "Right high roundhouse kick", "Step back", "Right downward axe strike"] },
    { no: "#6", attack: "Lead Leg Skip Round Kick", startingPosition: "Right foot back fighting stance", defense: ["Right leg back kick (spinning back kick)", "Right leg hook kick to face", "Right leg 360 hook kick"] },
    { no: "#7", attack: "Lead Leg Skip Round Kick High", startingPosition: "Right foot back fighting stance", defense: ["Step in left foot deep stance", "Right punch to mid-body with left arm protecting face", "Quick right low roundhouse kick to rear leg", "Grab behind left shoulder with both hands", "Left knee strike to face", "Right elbow strike to head"] },
    { no: "#8", attack: "Round kick", startingPosition: "Right foot back fighting stance", defense: ["Step right 45 degrees", "Right roundhouse kick to kidney", "Step down front, execute right roundhouse kick high", "Step down front, left spinning hook kick"] }
  ],
  5: [
    { no: "#1", attack: "Lead Leg Skip Round Kick", startingPosition: "Right foot back fighting stance", defense: ["Step right 45 degrees", "Right roundhouse kick low behind knee", "Step down forward", "Grab behind shoulder and pull down", "Left knee strike twice in succession", "Step back", "Right elbow strike to head"] },
    { no: "#2", attack: "Step behind side kick left leg", startingPosition: "Right foot back fighting stance", defense: ["Step right 45 degrees", "Right roundhouse kick low behind left knee", "Left low kick to back of right knee", "Right hook kick to head"] },
    { no: "#3", attack: "Back Kick Right Leg", startingPosition: "Right foot back fighting stance", defense: ["Step right 45 degrees to slip the kick", "Right roundhouse kick to body", "Step back", "Right 360 spinning hook kick"] },
    { no: "#4", attack: "180 Hook Kick", startingPosition: "Right foot back fighting stance", defense: ["Slide in tight behind opponent to left, left arm protecting face", "Reverse punch to head", "Right high roundhouse kick", "Grab right shoulder, sweep right foot with your left foot to throw"] },
    { no: "#5", attack: "Round Kick Low", startingPosition: "Right foot back fighting stance", defense: ["Left leg side kick to jam the kick, do not set leg down", "Deliver left leg hook kick high to head in one fluid movement"] },
    { no: "#6", attack: "Lead Leg Skip Round Kick", startingPosition: "Right foot back fighting stance", defense: ["Right leg 360 hook kick"] },
    { no: "#7", attack: "Lead Leg Skip Round Kick High", startingPosition: "Right foot back fighting stance", defense: ["Slide in fast with right arm blocking face", "Grab behind shoulder, switch feet quickly", "Left knee strike, right knee strike, left knee strike", "Right elbow strike to chin"] },
    { no: "#8", attack: "Round kick high", startingPosition: "Right foot back fighting stance", defense: ["Slide in with left hand guarding head", "Grab behind shoulders, deliver right knee strike", "Flip opponent onto back over your right hip", "Reverse punch as finisher", "Slide back, right roundhouse kick to head"] }
  ]
};
