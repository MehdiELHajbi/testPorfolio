export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  website?: string;
}

export interface ModelProfile {
  id: string;
  firstName: string;
  lastName: string;
  artistName?: string;
  birthDate: string;
  nationality: string;
  gender: string;
  pronouns: string;
  email: string;
  phone: string;
  socialLinks: SocialLinks;
  biography: {
    fr: string;
    en: string;
  };
  profileImage?: string;
}

export type Language = 'fr' | 'en';