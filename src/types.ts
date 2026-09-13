export interface CelestialAngles {
  sunTropical: number;
  moonTropical: number;
  sunSidereal: number;
  moonSidereal: number;
  relative: number;
  ayanamsa: number;
}

export interface TithiInfo {
  index: number;
  name: string;
  number: number;
  paksha: 'शुक्ल पक्ष' | 'कृष्ण पक्ष';
  progressPercent: number;
}

export interface NakshatraInfo {
  index: number;
  name: string;
  lord: string;
  pada: number;
  degrees: number;
}

export interface FestivalInfo {
  name: string;
  hindiName: string;
  maas: string;
  isShukla: boolean;
  tithiNumber: number;
  icon: string;
  description: string;
  colors: string;
}

export interface PanchangData {
  date: Date;
  angles: CelestialAngles;
  tithi: TithiInfo;
  paksha: string;
  nakshatra: NakshatraInfo;
  maas: string;
  vaar: string;
  samvatsar: string;
  moonRashi: string;
  sunRashi: string;
  yoga: string;
  karana: string;
  activeFestival: FestivalInfo | null;
}

export type CameraViewPreset = 'free' | 'top' | 'earth' | 'sun';
