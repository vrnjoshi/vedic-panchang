import { CelestialAngles, FestivalInfo, PanchangData } from '../types';

export const TITHI_NAMES = [
  "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", 
  "पंचमी", "षष्ठी", "सप्तमी", "अष्टमी", 
  "नवमी", "दशमी", "एकादशी", "द्वादशी", 
  "त्रयोदशी", "चतुर्दशी", "पूर्णिमा", 
  "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", 
  "पंचमी", "षष्ठी", "सप्तमी", "अष्टमी", 
  "नवमी", "दशमी", "एकादशी", "द्वादशी", 
  "त्रयोदशी", "चतुर्दशी", "अमावस्या"
];

export const NAKSHATRA_NAMES = [
  { name: "अश्विनी (Ashwini)", lord: "केतु" },
  { name: "भरणी (Bharani)", lord: "शुक्र" },
  { name: "कृत्तिका (Krittika)", lord: "सूर्य" },
  { name: "रोहिणी (Rohini)", lord: "चन्द्र" },
  { name: "मृगशीर्ष (Mrigashira)", lord: "मंगल" },
  { name: "आर्द्रा (Ardra)", lord: "राहु" },
  { name: "पुनर्वसु (Punarvasu)", lord: "गुरु" },
  { name: "पुष्य (Pushya)", lord: "शनि" },
  { name: "आश्लेषा (Ashlesha)", lord: "बुध" },
  { name: "मघा (Magha)", lord: "केतु" },
  { name: "पूर्व फाल्गुनी (Purva Phalguni)", lord: "शुक्र" },
  { name: "उत्तर फाल्गुनी (Uttara Phalguni)", lord: "सूर्य" },
  { name: "हस्त (Hasta)", lord: "चन्द्र" },
  { name: "चित्रा (Chitra)", lord: "मंगल" },
  { name: "स्वाति (Swati)", lord: "राहु" },
  { name: "विशाखा (Vishakha)", lord: "गुरु" },
  { name: "अनुराधा (Anuradha)", lord: "शनि" },
  { name: "ज्येष्ठा (Jyeshtha)", lord: "बुध" },
  { name: "मूल (Mula)", lord: "केतु" },
  { name: "पूर्वाषाढ़ा (Purva Ashadha)", lord: "शुक्र" },
  { name: "उत्तराषाढ़ा (Uttara Ashadha)", lord: "सूर्य" },
  { name: "श्रवण (Shravana)", lord: "चन्द्र" },
  { name: "धनिष्ठा (Dhanishta)", lord: "मंगल" },
  { name: "शतभिषा (Shatabhisha)", lord: "राहु" },
  { name: "पूर्व भाद्रपद (Purva Bhadrapada)", lord: "गुरु" },
  { name: "उत्तर भाद्रपद (Uttara Bhadrapada)", lord: "शनि" },
  { name: "रेवती (Revati)", lord: "बुध" }
];

export const VAAR_NAMES = [
  "रविवार (Sunday)", "सोमवार (Monday)", "मंगलवार (Tuesday)", 
  "बुधवार (Wednesday)", "गुरुवार (Thursday)", "शुक्रवार (Friday)", 
  "शनिवार (Saturday)"
];

export const MAAS_NAMES = [
  "चैत्र (Chaitra)", "वैशाख (Vaisakha)", "ज्येष्ठ (Jyeshtha)", "आषाढ़ (Ashadha)", 
  "श्रावण (Shravana)", "भाद्रपद (Bhadrapada)", "आश्विन (Ashwin)", "कार्तिक (Kartika)", 
  "मार्गशीर्ष (Margashirsha)", "पौष (Pausha)", "माघ (Magha)", "फाल्गुन (Phalguna)"
];

export const RASHI_NAMES = [
  "मेष (Aries)", "वृषभ (Taurus)", "मिथुन (Gemini)", "कर्क (Cancer)",
  "सिंह (Leo)", "कन्या (Virgo)", "तुला (Libra)", "वृश्चिक (Scorpio)",
  "धनु (Sagittarius)", "मकर (Capricorn)", "कुम्भ (Aquarius)", "मीन (Pisces)"
];

export const YOGA_NAMES = [
  "विष्कुम्भ", "प्रीति", "आयुष्मान", "सौभाग्य", "शोभन", "अतिगण्ड", "सुकर्मा", "धृति",
  "शूल", "गण्ड", "वृद्धि", "ध्रुव", "व्याघात", "हर्षण", "वज्र", "सिद्धि",
  "व्यतीपात", "वरीयान्", "परिघ", "शिव", "सिद्ध", "साध्य", "शुभ", "शुक्ल",
  "ब्रह्म", "इन्द्र", "वैधृति"
];

export const KARANA_NAMES = [
  "बव", "बालव", "कौलव", "तैतिल", "गर", "वणिज", "विष्टि (भद्रा)",
  "शकुनि", "चतुष्पाद", "नाग", "किंस्तुघ्न"
];

export const MAJOR_FESTIVALS: FestivalInfo[] = [
  { maas: "चैत्र (Chaitra)", isShukla: true, tithiNumber: 1, name: "Chaitra Navratri / Ugadi", hindiName: "चैत्र नवरात्रि / नव संवत्सर", icon: "🌸", description: "Vedic New Year & First day of Chaitra Navratri", colors: "from-amber-500 to-rose-600" },
  { maas: "चैत्र (Chaitra)", isShukla: true, tithiNumber: 9, name: "Ram Navami", hindiName: "श्री राम नवमी", icon: "🏹", description: "Appearance day of Bhagwan Shri Rama", colors: "from-orange-500 to-amber-600" },
  { maas: "चैत्र (Chaitra)", isShukla: true, tithiNumber: 15, name: "Hanuman Jayanti", hindiName: "हनुमान जन्मोत्सव", icon: "🚩", description: "Appearance day of Lord Hanuman", colors: "from-red-500 to-orange-600" },
  { maas: "वैशाख (Vaisakha)", isShukla: true, tithiNumber: 3, name: "Akshaya Tritiya", hindiName: "अक्षय तृतीया", icon: "✨", description: "Day of eternal prosperity and auspicious beginnings", colors: "from-yellow-400 to-amber-600" },
  { maas: "श्रावण (Shravana)", isShukla: true, tithiNumber: 15, name: "Raksha Bandhan", hindiName: "रक्षाबंधन / श्रावणी पूर्णिमा", icon: "🎀", description: "Sacred bond of protection and sibling love", colors: "from-pink-500 to-rose-600" },
  { maas: "भाद्रपद (Bhadrapada)", isShukla: false, tithiNumber: 8, name: "Krishna Janmashtami", hindiName: "श्री कृष्ण जन्माष्टमी", icon: "🦚", description: "Appearance day of Bhagwan Shri Krishna at midnight", colors: "from-blue-600 to-indigo-800" },
  { maas: "भाद्रपद (Bhadrapada)", isShukla: true, tithiNumber: 4, name: "Ganesh Chaturthi", hindiName: "श्री गणेश चतुर्थी", icon: "🐘", description: "Welcoming of Lord Ganesha, remover of obstacles", colors: "from-orange-500 to-red-600" },
  { maas: "आश्विन (Ashwin)", isShukla: true, tithiNumber: 1, name: "Shardiya Navratri Ghatasthapana", hindiName: "शारदीय नवरात्रि आरम्भ", icon: "🔱", description: "Commencement of nine nights of Devi Durga worship", colors: "from-rose-500 to-purple-600" },
  { maas: "आश्विन (Ashwin)", isShukla: true, tithiNumber: 10, name: "Vijayadashami (Dussehra)", hindiName: "विजयादशमी (दशहरा)", icon: "🏹", description: "Victory of good over evil", colors: "from-amber-500 to-orange-600" },
  { maas: "कार्तिक (Kartika)", isShukla: false, tithiNumber: 13, name: "Dhanteras", hindiName: "धनतेरस / धन्वन्तरि जयन्ती", icon: "🏺", description: "Worship of Dhanvantari and Goddess Lakshmi", colors: "from-amber-400 to-yellow-600" },
  { maas: "कार्तिक (Kartika)", isShukla: false, tithiNumber: 15, name: "Diwali (Deepavali)", hindiName: "दीपावली (लक्ष्मी पूजन)", icon: "🪔", description: "Grand Festival of Lights on Kartik Amavasya", colors: "from-yellow-500 to-orange-600" },
  { maas: "कार्तिक (Kartika)", isShukla: true, tithiNumber: 11, name: "Devutthana Ekadashi", hindiName: "देवउठनी एकादशी / तुलसी विवाह", icon: "🌿", description: "Lord Vishnu awakens from cosmic slumber", colors: "from-emerald-500 to-teal-700" },
  { maas: "पौष (Pausha)", isShukla: true, tithiNumber: 1, name: "Makar Sankranti", hindiName: "मकर संक्रान्ति (सूर्य उत्तरायण)", icon: "☀️", description: "Sun enters Makara (Capricorn), beginning Uttarayana", colors: "from-orange-400 to-amber-500" },
  { maas: "माघ (Magha)", isShukla: true, tithiNumber: 5, name: "Vasant Panchami", hindiName: "वसन्त पंचमी (सरस्वती पूजा)", icon: "📚", description: "Advent of Spring and worship of Goddess Saraswati", colors: "from-yellow-300 to-amber-500" },
  { maas: "फाल्गुन (Phalguna)", isShukla: false, tithiNumber: 14, name: "Maha Shivaratri", hindiName: "महाशिवरात्रि", icon: "🕉️", description: "The auspicious night of Lord Shiva and Shakti", colors: "from-indigo-600 to-purple-900" },
  { maas: "फाल्गुन (Phalguna)", isShukla: true, tithiNumber: 15, name: "Holi / Holika Dahan", hindiName: "होली (होलिका दहन)", icon: "🎨", description: "Vibrant festival of colours and divine love", colors: "from-pink-500 to-violet-600" }
];

export function normalizeAngle(angle: number): number {
  let a = angle % 360;
  if (a < 0) a += 360;
  return a;
}

export function calculatePanchang(date: Date): PanchangData {
  let year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  const day = date.getUTCDate() + (date.getUTCHours() / 24) + (date.getUTCMinutes() / 1440) + (date.getUTCSeconds() / 86400);

  if (month <= 2) {
    year -= 1;
    month += 12;
  }

  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  const JD = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
  const T = (JD - 2451545.0) / 36525;

  // Mean longitude of Sun
  const L0 = normalizeAngle(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  // Mean anomaly of Sun
  const M_sun = normalizeAngle(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const M_sun_rad = (M_sun * Math.PI) / 180;

  // Sun's Equation of Center
  const C_sun = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M_sun_rad) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M_sun_rad) +
    0.000289 * Math.sin(3 * M_sun_rad);

  const tropicalSun = normalizeAngle(L0 + C_sun);

  // Moon's parameters
  const Lp = normalizeAngle(218.3164477 + 481267.88123421 * T);
  const D = normalizeAngle(297.8501921 + 445267.1114034 * T);
  const D_rad = (D * Math.PI) / 180;
  const Mp = normalizeAngle(134.9633964 + 477198.8675055 * T);
  const Mp_rad = (Mp * Math.PI) / 180;
  const F = normalizeAngle(93.2720950 + 483202.0175233 * T);
  const F_rad = (F * Math.PI) / 180;

  // Perturbations for Moon's longitude
  const tropicalMoon = normalizeAngle(
    Lp + 6.289 * Math.sin(Mp_rad) +
    1.274 * Math.sin(2 * D_rad - Mp_rad) +
    0.658 * Math.sin(2 * D_rad) +
    0.214 * Math.sin(2 * Mp_rad) -
    0.186 * Math.sin(M_sun_rad) -
    0.114 * Math.sin(2 * F_rad)
  );

  // Lahiri Ayanamsa computation
  const ayanamsa = 23.85 + (1.396 / 100) * ((date.getFullYear() - 2000) + (month / 12));
  const siderealSun = normalizeAngle(tropicalSun - ayanamsa);
  const siderealMoon = normalizeAngle(tropicalMoon - ayanamsa);

  // Relative elongation between Moon and Sun (0 to 360 deg)
  const relativeAngle = normalizeAngle(tropicalMoon - tropicalSun);
  const tithiIndexRaw = Math.floor(relativeAngle / 12);
  const tithiAngleRem = relativeAngle % 12;
  const tithiProgressPercent = Math.round((tithiAngleRem / 12) * 100);

  const isShukla = tithiIndexRaw < 15;
  const pakshaName = isShukla ? "शुक्ल पक्ष" : "कृष्ण पक्ष";
  const tithiNumber = (tithiIndexRaw % 15) + 1;

  // Nakshatra: 360 / 27 = 13.333333 degrees each
  const nakshatraDegrees = 360 / 27;
  const nakshatraIndexRaw = Math.floor(siderealMoon / nakshatraDegrees);
  const nakshatraRem = siderealMoon % nakshatraDegrees;
  const pada = Math.min(4, Math.floor((nakshatraRem / (nakshatraDegrees / 4)) + 1));

  // Vaar (Day of week)
  const vaarIndexRaw = date.getDay();

  // Maas (Solar/Lunar representation)
  let maasIndex = Math.floor(siderealSun / 30);
  maasIndex = (maasIndex + 1) % 12;

  // Rashis
  const moonRashiIndex = Math.floor(siderealMoon / 30);
  const sunRashiIndex = Math.floor(siderealSun / 30);

  // Yoga: (siderealSun + siderealMoon) / (360 / 27)
  const totalSum = normalizeAngle(siderealSun + siderealMoon);
  const yogaIndex = Math.floor(totalSum / (360 / 27)) % 27;

  // Karana: half of a tithi (6 degrees each)
  const karanaIndex = Math.floor(relativeAngle / 6) % 60;
  let karanaName = "";
  if (karanaIndex === 0) karanaName = KARANA_NAMES[10]; // Kimstughna
  else if (karanaIndex >= 57) karanaName = KARANA_NAMES[7 + (karanaIndex - 57)]; // Shakuni, Chatushpada, Naga
  else karanaName = KARANA_NAMES[(karanaIndex - 1) % 7];

  const vikramSamvat = date.getFullYear() + 57;

  const currentMaasName = MAAS_NAMES[maasIndex];

  // Detect active festival
  let matchedFestival: FestivalInfo | null = null;
  for (const fest of MAJOR_FESTIVALS) {
    if (fest.maas === currentMaasName && fest.isShukla === isShukla && fest.tithiNumber === tithiNumber) {
      matchedFestival = fest;
      break;
    }
  }

  const angles: CelestialAngles = {
    sunTropical: tropicalSun,
    moonTropical: tropicalMoon,
    sunSidereal: siderealSun,
    moonSidereal: siderealMoon,
    relative: relativeAngle,
    ayanamsa: ayanamsa
  };

  return {
    date,
    angles,
    tithi: {
      index: tithiIndexRaw,
      name: TITHI_NAMES[tithiIndexRaw],
      number: tithiNumber,
      paksha: isShukla ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष',
      progressPercent: tithiProgressPercent
    },
    paksha: pakshaName,
    nakshatra: {
      index: nakshatraIndexRaw,
      name: NAKSHATRA_NAMES[nakshatraIndexRaw]?.name || "अश्विनी",
      lord: NAKSHATRA_NAMES[nakshatraIndexRaw]?.lord || "केतु",
      pada,
      degrees: siderealMoon
    },
    maas: currentMaasName,
    vaar: VAAR_NAMES[vaarIndexRaw],
    samvatsar: `विक्रम संवत् ${vikramSamvat}`,
    moonRashi: RASHI_NAMES[moonRashiIndex],
    sunRashi: RASHI_NAMES[sunRashiIndex],
    yoga: YOGA_NAMES[yogaIndex] || "विष्कुम्भ",
    karana: karanaName,
    activeFestival: matchedFestival
  };
}
