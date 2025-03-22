export type UnitSystem = 'metric' | 'imperial';

export interface Measurement {
  id: string;
  date: string;
  height: number;
  weight: number;
  bust: number;
  waist: number;
  hips: number;
  inseam: number;
  shoeSize: number;
  notes?: string;
}

export interface ClothingSizes {
  eu: string;
  uk: string;
  us: string;
  international: string;
}

export interface PhysicalCharacteristics {
  eyeColor: string;
  hairColor: string;
  distinctiveFeatures: {
    tattoos: string[];
    piercings: string[];
    scars: string[];
  };
}

export interface ModelMeasurements {
  id: string;
  modelId: string;
  currentMeasurements: Measurement;
  measurementHistory: Measurement[];
  clothingSizes: ClothingSizes;
  physicalCharacteristics: PhysicalCharacteristics;
  preferredUnits: UnitSystem;
  lastUpdated: string;
}