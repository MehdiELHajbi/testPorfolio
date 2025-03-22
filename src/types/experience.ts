export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: SkillLevel;
  verified?: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
}

export type ExperienceType = 'runway' | 'photoshoot' | 'campaign' | 'event' | 'other';

export interface Experience {
  id: string;
  type: ExperienceType;
  client: string;
  brand?: string;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
  role: string;
  media?: string[];
  featured: boolean;
  order?: number;
}

export interface GeographicPreference {
  city: string;
  country: string;
  radius: number; // in km
  preferred: boolean;
}

export interface ModelExperience {
  id: string;
  modelId: string;
  skills: Skill[];
  experiences: Experience[];
  geographicPreferences: GeographicPreference[];
  travelPreferences: {
    willing: boolean;
    maxDistance?: number;
    preferredLocations: string[];
    excludedLocations: string[];
  };
}