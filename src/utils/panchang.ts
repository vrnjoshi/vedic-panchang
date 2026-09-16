import { CelestialAngles, FestivalInfo, PanchangData } from '../types';

export const TITHI_NAMES = [
  { hi: "प्रतिपदा", en: "Pratipada" },
  { hi: "द्वितीया", en: "Dwitiya" },
  { hi: "तृतीया", en: "Tritiya" },
  { hi: "चतुर्थी", en: "Chaturthi" },
  { hi: "पंचमी", en: "Panchami" },
  { hi: "षष्ठी", en: "Shashthi" },
  { hi: "सप्तमी", en: "Saptami" },
  { hi: "अष्टमी", en: "Ashtami" },
  { hi: "नवमी", en: "Navami" },
  { hi: "दशमी", en: "Dashami" },
  { hi: "एकादशी", en: "Ekadashi" },
  { hi: "द्वादशी", en: "Dwadashi" },
  { hi: "त्रयोदशी", en: "Trayodashi" },
  { hi: "चतुर्दशी", en: "Chaturdashi" },
  { hi: "पूर्णिमा", en: "Purnima" },
  { hi: "प्रतिपदा", en: "Pratipada" },
  { hi: "द्वितीया", en: "Dwitiya" },
  { hi: "तृतीया", en: "Tritiya" },
  { hi: "चतुर्थी", en: "Chaturthi" },
  { hi: "पंचमी", en: "Panchami" },
  { hi: "षष्ठी", en: "Shashthi" },
  { hi: "सप्तमी", en: "Saptami" },
  { hi: "अष्टमी", en: "Ashtami" },
  { hi: "नवमी", en: "Navami" },
  { hi: "दशमी", en: "Dashami" },
  { hi: "एकादशी", en: "Ekadashi" },
  { hi: "द्वादशी", en: "Dwadashi" },
  { hi: "त्रयोदशी", en: "Trayodashi" },
  { hi: "चतुर्दशी", en: "Chaturdashi" },
  { hi: "अमावस्या", en: "Amavasya" }
];

export const NAKSHATRA_NAMES = [
  { name: "अश्विनी", nameEn: "Ashwini", lord: "केतु", lordEn: "Ketu" },
  { name: "भरणी", nameEn: "Bharani", lord: "शुक्र", lordEn: "Venus" },
  { name: "कृत्तिका", nameEn: "Krittika", lord: "सूर्य", lordEn: "Sun" },
  { name: "रोहिणी", nameEn: "Rohini", lord: "चन्द्र", lordEn: "Moon" },
  { name: "मृगशीर्ष", nameEn: "Mrigashira", lord: "मंगल", lordEn: "Mars" },
  { name: "आर्द्रा", nameEn: "Ardra", lord: "राहु", lordEn: "Rahu" },
  { name: "पुनर्वसु", nameEn: "Punarvasu", lord: "गुरु", lordEn: "Jupiter" },
  { name: "पुष्य", nameEn: "Pushya", lord: "शनि", lordEn: "Saturn" },
  { name: "आश्लेषा", nameEn: "Ashlesha", lord: "बुध", lordEn: "Mercury" },
  { name: "मघा", nameEn: "Magha", lord: "केतु", lordEn: "Ketu" },
  { name: "पूर्व फाल्गुनी", nameEn: "Purva Phalguni", lord: "शुक्र", lordEn: "Venus" },
  { name: "उत्तर फाल्गुनी", nameEn: "Uttara Phalguni", lord: "सूर्य", lordEn: "Sun" },
  { name: "हस्त", nameEn: "Hasta", lord: "चन्द्र", lordEn: "Moon" },
  { name: "चित्रा", nameEn: "Chitra", lord: "मंगल", lordEn: "Mars" },
  { name: "स्वाति", nameEn: "Swati", lord: "राहु", lordEn: "Rahu" },
  { name: "विशाखा", nameEn: "Vishakha", lord: "गुरु", lordEn: "Jupiter" },
  { name: "अनुराधा", nameEn: "Anuradha", lord: "शनि", lordEn: "Saturn" },
  { name: "ज्येष्ठा", nameEn: "Jyeshtha", lord: "बुध", lordEn: "Mercury" },
  { name: "मूल", nameEn: "Mula", lord: "केतु", lordEn: "Ketu" },
  { name: "पूर्वाषाढ़ा", nameEn: "Purva Ashadha", lord: "शुक्र", lordEn: "Venus" },
  { name: "उत्तराषाढ़ा", nameEn: "Uttara Ashadha", lord: "सूर्य", lordEn: "Sun" },
  { name: "श्रवण", nameEn: "Shravana", lord: "चन्द्र", lordEn: "Moon" },
  { name: "धनिष्ठा", nameEn: "Dhanishta", lord: "मंगल", lordEn: "Mars" },
  { name: "शतभिषा", nameEn: "Shatabhisha", lord: "राहु", lordEn: "Rahu" },
  { name: "पूर्व भाद्रपद", nameEn: "Purva Bhadrapada", lord: "गुरु", lordEn: "Jupiter" },
  { name: "उत्तर भाद्रपद", nameEn: "Uttara Bhadrapada", lord: "शनि", lordEn: "Saturn" },
  { name: "रेवती", nameEn: "Revati", lord: "बुध", lordEn: "Mercury" }
];

export const VAAR_NAMES = [
  { hi: "रविवार", en: "Sunday" },
  { hi: "सोमवार", en: "Monday" },
  { hi: "मंगलवार", en: "Tuesday" },
  { hi: "बुधवार", en: "Wednesday" },
  { hi: "गुरुवार", en: "Thursday" },
  { hi: "शुक्रवार", en: "Friday" },
  { hi: "शनिवार", en: "Saturday" }
];

export const MAAS_NAMES = [
  { hi: "चैत्र", en: "Chaitra" },
  { hi: "वैशाख", en: "Vaisakha" },
  { hi: "ज्येष्ठ", en: "Jyeshtha" },
  { hi: "आषाढ़", en: "Ashadha" },
  { hi: "श्रावण", en: "Shravana" },
  { hi: "भाद्रपद", en: "Bhadrapada" },
  { hi: "आश्विन", en: "Ashwin" },
  { hi: "कार्तिक", en: "Kartika" },
  { hi: "मार्गशीर्ष", en: "Margashirsha" },
  { hi: "पौष", en: "Pausha" },
  { hi: "माघ", en: "Magha" },
  { hi: "फाल्गुन", en: "Phalguna" }
];

export const RASHI_NAMES = [
  { hi: "मेष", en: "Aries" },
  { hi: "वृषभ", en: "Taurus" },
  { hi: "मिथुन", en: "Gemini" },
  { hi: "कर्क", en: "Cancer" },
  { hi: "सिंह", en: "Leo" },
  { hi: "कन्या", en: "Virgo" },
  { hi: "तुला", en: "Libra" },
  { hi: "वृश्चिक", en: "Scorpio" },
  { hi: "धनु", en: "Sagittarius" },
  { hi: "मकर", en: "Capricorn" },
  { hi: "कुम्भ", en: "Aquarius" },
  { hi: "मीन", en: "Pisces" }
];

export const YOGA_NAMES = [
  { hi: "विष्कुम्भ", en: "Vishkumbha" },
  { hi: "प्रीति", en: "Priti" },
  { hi: "आयुष्मान", en: "Ayushman" },
  { hi: "सौभाग्य", en: "Saubhagya" },
  { hi: "शोभन", en: "Shobhana" },
  { hi: "अतिगण्ड", en: "Atiganda" },
  { hi: "सुकर्मा", en: "Sukarma" },
  { hi: "धृति", en: "Dhriti" },
  { hi: "शूल", en: "Shula" },
  { hi: "गण्ड", en: "Ganda" },
  { hi: "वृद्धि", en: "Vriddhi" },
  { hi: "ध्रुव", en: "Dhruva" },
  { hi: "व्याघात", en: "Vyaghata" },
  { hi: "हर्षण", en: "Harshana" },
  { hi: "वज्र", en: "Vajra" },
  { hi: "सिद्धि", en: "Siddhi" },
  { hi: "व्यतीपात", en: "Vyatipata" },
  { hi: "वरीयान्", en: "Variyan" },
  { hi: "परिघ", en: "Parigha" },
  { hi: "शिव", en: "Shiva" },
  { hi: "सिद्ध", en: "Siddha" },
  { hi: "साध्य", en: "Sadhya" },
  { hi: "शुभ", en: "Shubha" },
  { hi: "शुक्ल", en: "Shukla" },
  { hi: "ब्रह्म", en: "Brahma" },
  { hi: "इन्द्र", en: "Indra" },
  { hi: "वैधृति", en: "Vaidhriti" }
];

export const KARANA_NAMES = [
  { hi: "बव", en: "Bava" },
  { hi: "बालव", en: "Balava" },
  { hi: "कौलव", en: "Kaulava" },
  { hi: "तैतिल", en: "Taitila" },
  { hi: "गर", en: "Gara" },
  { hi: "वणिज", en: "Vanija" },
  { hi: "विष्टि/भद्रा", en: "Vishti / Bhadra" },
  { hi: "शकुनि", en: "Shakuni" },
  { hi: "चतुष्पाद", en: "Chatushpada" },
  { hi: "नाग", en: "Naga" },
  { hi: "किंस्तुघ्न", en: "Kinstughna" }
];

export const MAJOR_FESTIVALS: FestivalInfo[] = [
  { maas: "चैत्र", isShukla: true, tithiNumber: 1, name: "Chaitra Navratri / Ugadi", hindiName: "चैत्र नवरात्रि / नव संवत्सर", icon: "🌸", description: "Vedic New Year & First day of Chaitra Navratri", colors: "from-amber-500 to-rose-600" },
  { maas: "चैत्र", isShukla: true, tithiNumber: 9, name: "Ram Navami", hindiName: "श्री राम नवमी", icon: "🏹", description: "Appearance day of Bhagwan Shri Rama", colors: "from-orange-500 to-amber-600" },
  { maas: "चैत्र", isShukla: true, tithiNumber: 15, name: "Hanuman Jayanti", hindiName: "हनुमान जन्मोत्सव", icon: "🚩", description: "Appearance day of Lord Hanuman", colors: "from-red-500 to-orange-600" },
  { maas: "वैशाख", isShukla: true, tithiNumber: 3, name: "Akshaya Tritiya", hindiName: "अक्षय तृतीया", icon: "✨", description: "Day of eternal prosperity and auspicious beginnings", colors: "from-yellow-400 to-amber-600" },
  { maas: "श्रावण", isShukla: true, tithiNumber: 15, name: "Raksha Bandhan", hindiName: "रक्षाबंधन / श्रावणी पूर्णिमा", icon: "🎀", description: "Sacred bond of protection and sibling love", colors: "from-pink-500 to-rose-600" },
  { maas: "भाद्रपद", isShukla: false, tithiNumber: 8, name: "Krishna Janmashtami", hindiName: "श्री कृष्ण जन्माष्टमी", icon: "🦚", description: "Appearance day of Bhagwan Shri Krishna at midnight", colors: "from-blue-600 to-indigo-800" },
  { maas: "भाद्रपद", isShukla: true, tithiNumber: 4, name: "Ganesh Chaturthi", hindiName: "श्री गणेश चतुर्थी", icon: "🐘", description: "Welcoming of Lord Ganesha, remover of obstacles", colors: "from-orange-500 to-red-600" },
  { maas: "आश्विन", isShukla: true, tithiNumber: 1, name: "Shardiya Navratri Ghatasthapana", hindiName: "शारदीय नवरात्रि आरम्भ", icon: "🔱", description: "Commencement of nine nights of Devi Durga worship", colors: "from-rose-500 to-purple-600" },
  { maas: "आश्विन", isShukla: true, tithiNumber: 10, name: "Vijayadashami (Dussehra)", hindiName: "विजयादशमी (दशहरा)", icon: "🏹", description: "Victory of good over evil", colors: "from-amber-500 to-orange-600" },
  { maas: "कार्तिक", isShukla: false, tithiNumber: 13, name: "Dhanteras", hindiName: "धनतेरस / धन्वन्तरि जयन्ती", icon: "🏺", description: "Worship of Dhanvantari and Goddess Lakshmi", colors: "from-amber-400 to-yellow-600" },
  { maas: "कार्तिक", isShukla: false, tithiNumber: 15, name: "Diwali (Deepavali)", hindiName: "दीपावली (लक्ष्मी पूजन)", icon: "🪔", description: "Grand Festival of Lights on Kartik Amavasya", colors: "from-yellow-500 to-orange-600" },
  { maas: "कार्तिक", isShukla: true, tithiNumber: 11, name: "Devutthana Ekadashi", hindiName: "देवउठनी एकादशी / तुलसी विवाह", icon: "🌿", description: "Lord Vishnu awakens from cosmic slumber", colors: "from-emerald-500 to-teal-700" },
  { maas: "पौष", isShukla: true, tithiNumber: 1, name: "Makar Sankranti", hindiName: "मकर संक्रान्ति (सूर्य उत्तरायण)", icon: "☀️", description: "Sun enters Makara (Capricorn), beginning Uttarayana", colors: "from-orange-400 to-amber-500" },
  { maas: "माघ", isShukla: true, tithiNumber: 5, name: "Vasant Panchami", hindiName: "वसन्त पंचमी (सरस्वती पूजा)", icon: "📚", description: "Advent of Spring and worship of Goddess Saraswati", colors: "from-yellow-300 to-amber-500" },
  { maas: "फाल्गुन", isShukla: false, tithiNumber: 14, name: "Maha Shivaratri", hindiName: "महाशिवरात्रि", icon: "🕉️", description: "The auspicious night of Lord Shiva and Shakti", colors: "from-indigo-600 to-purple-900" },
  { maas: "फाल्गुन", isShukla: true, tithiNumber: 15, name: "Holi / Holika Dahan", hindiName: "होली (होलिका दहन)", icon: "🎨", description: "Vibrant festival of colours and divine love", colors: "from-pink-500 to-violet-600" }
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

  // Moon's Ecliptic Latitude (inclination of lunar orbit to ecliptic is ~5.145°, creating up to ~5.2° latitude)
  const moonLatitude = 5.128 * Math.sin(F_rad) + 0.281 * Math.sin(Mp_rad + F_rad);

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
  const pakshaHi = isShukla ? "शुक्ल पक्ष" : "कृष्ण पक्ष";
  const pakshaEn = isShukla ? "Waxing (Shukla)" : "Waning (Krishna)";
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
  let karanaObj = KARANA_NAMES[0];
  if (karanaIndex === 0) karanaObj = KARANA_NAMES[10]; // Kimstughna
  else if (karanaIndex >= 57) karanaObj = KARANA_NAMES[7 + (karanaIndex - 57)]; // Shakuni, Chatushpada, Naga
  else karanaObj = KARANA_NAMES[(karanaIndex - 1) % 7];

  const vikramSamvatYear = date.getFullYear() + 57;

  const currentMaas = MAAS_NAMES[maasIndex];

  // Detect active festival
  let matchedFestival: FestivalInfo | null = null;
  for (const fest of MAJOR_FESTIVALS) {
    if (fest.maas === currentMaas.hi && fest.isShukla === isShukla && fest.tithiNumber === tithiNumber) {
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
    ayanamsa: ayanamsa,
    moonLatitude: parseFloat(moonLatitude.toFixed(2))
  };

  const tithiData = TITHI_NAMES[tithiIndexRaw] || { hi: "प्रतिपदा", en: "Pratipada" };
  const nakshatraData = NAKSHATRA_NAMES[nakshatraIndexRaw] || { name: "अश्विनी", nameEn: "Ashwini", lord: "केतु", lordEn: "Ketu" };
  const vaarData = VAAR_NAMES[vaarIndexRaw] || { hi: "रविवार", en: "Sunday" };
  const moonRashiData = RASHI_NAMES[moonRashiIndex] || { hi: "मेष", en: "Aries" };
  const sunRashiData = RASHI_NAMES[sunRashiIndex] || { hi: "मेष", en: "Aries" };
  const yogaData = YOGA_NAMES[yogaIndex] || { hi: "विष्कुम्भ", en: "Vishkumbha" };

  return {
    date,
    angles,
    tithi: {
      index: tithiIndexRaw,
      name: tithiData.hi,
      nameEn: tithiData.en,
      number: tithiNumber,
      paksha: pakshaHi,
      pakshaEn: pakshaEn,
      progressPercent: tithiProgressPercent
    },
    paksha: pakshaHi,
    pakshaEn: pakshaEn,
    nakshatra: {
      index: nakshatraIndexRaw,
      name: nakshatraData.name,
      nameEn: nakshatraData.nameEn,
      lord: nakshatraData.lord,
      lordEn: nakshatraData.lordEn,
      pada,
      degrees: siderealMoon
    },
    maas: currentMaas.hi,
    maasEn: currentMaas.en,
    vaar: vaarData.hi,
    vaarEn: vaarData.en,
    samvatsar: `${vikramSamvatYear}`,
    samvatsarEn: `${vikramSamvatYear}`,
    moonRashi: moonRashiData.hi,
    moonRashiEn: moonRashiData.en,
    sunRashi: sunRashiData.hi,
    sunRashiEn: sunRashiData.en,
    yoga: yogaData.hi,
    yogaEn: yogaData.en,
    karana: karanaObj.hi,
    karanaEn: karanaObj.en,
    activeFestival: matchedFestival
  };
}

/**
 * Accurately finds the orbital day offset to align the 3D celestial canvas
 * and panchang directly with any festival occurrence (past or future).
 */
export function findExactFestivalOffset(festHindiName: string, baseDate: Date): number {
  const fest = MAJOR_FESTIVALS.find(
    (f) => f.hindiName.includes(festHindiName) || f.name.toLowerCase().includes(festHindiName.toLowerCase())
  );
  if (!fest) return 0;

  let bestOffset = 0;
  let minDiff = Infinity;

  // Search dynamically within +/- 380 days in fine fractional steps
  for (let d = -380; d <= 380; d = parseFloat((d + 0.1).toFixed(2))) {
    const testDate = new Date(baseDate.getTime() + d * 86400000);
    const p = calculatePanchang(testDate);
    if (p.activeFestival && p.activeFestival.name === fest.name) {
      const dist = Math.abs(d);
      if (dist < minDiff) {
        minDiff = dist;
        bestOffset = d;
      }
    }
  }

  return bestOffset;
}
