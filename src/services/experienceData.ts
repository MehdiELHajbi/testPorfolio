import { v4 as uuidv4 } from 'uuid';
import type { Skill, Experience, GeographicPreference, ModelExperience } from '../types/experience';

// Local storage keys
const STORAGE_KEYS = {
  SKILLS: 'model_skills',
  EXPERIENCES: 'model_experiences',
  GEOGRAPHIC_PREFERENCES: 'model_geographic_preferences',
};

// Helper functions
const getStorageData = <T>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const setStorageData = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Skills CRUD
export const getSkills = (): Skill[] => {
  return getStorageData<Skill[]>(STORAGE_KEYS.SKILLS, []);
};

export const createSkill = (skill: Omit<Skill, 'id'>): Skill => {
  const skills = getSkills();
  const newSkill = { ...skill, id: uuidv4() };
  skills.push(newSkill);
  setStorageData(STORAGE_KEYS.SKILLS, skills);
  return newSkill;
};

export const updateSkill = (id: string, updates: Partial<Skill>): Skill | null => {
  const skills = getSkills();
  const index = skills.findIndex(skill => skill.id === id);
  if (index === -1) return null;

  const updatedSkill = { ...skills[index], ...updates };
  skills[index] = updatedSkill;
  setStorageData(STORAGE_KEYS.SKILLS, skills);
  return updatedSkill;
};

export const deleteSkill = (id: string): boolean => {
  const skills = getSkills();
  const filteredSkills = skills.filter(skill => skill.id !== id);
  if (filteredSkills.length === skills.length) return false;
  setStorageData(STORAGE_KEYS.SKILLS, filteredSkills);
  return true;
};

// Experiences CRUD
export const getExperiences = (): Experience[] => {
  return getStorageData<Experience[]>(STORAGE_KEYS.EXPERIENCES, []);
};

export const createExperience = (experience: Omit<Experience, 'id'>): Experience => {
  const experiences = getExperiences();
  const newExperience = { 
    ...experience, 
    id: uuidv4(),
    order: experiences.length + 1 
  };
  experiences.push(newExperience);
  setStorageData(STORAGE_KEYS.EXPERIENCES, experiences);
  return newExperience;
};

export const updateExperience = (id: string, updates: Partial<Experience>): Experience | null => {
  const experiences = getExperiences();
  const index = experiences.findIndex(exp => exp.id === id);
  if (index === -1) return null;

  const updatedExperience = { ...experiences[index], ...updates };
  experiences[index] = updatedExperience;
  setStorageData(STORAGE_KEYS.EXPERIENCES, experiences);
  return updatedExperience;
};

export const deleteExperience = (id: string): boolean => {
  const experiences = getExperiences();
  const filteredExperiences = experiences.filter(exp => exp.id !== id);
  if (filteredExperiences.length === experiences.length) return false;
  
  // Update order for remaining experiences
  const reorderedExperiences = filteredExperiences.map((exp, index) => ({
    ...exp,
    order: index + 1
  }));
  
  setStorageData(STORAGE_KEYS.EXPERIENCES, reorderedExperiences);
  return true;
};

export const reorderExperiences = (experiences: Experience[]): Experience[] => {
  const reorderedExperiences = experiences.map((exp, index) => ({
    ...exp,
    order: index + 1
  }));
  setStorageData(STORAGE_KEYS.EXPERIENCES, reorderedExperiences);
  return reorderedExperiences;
};

// Geographic Preferences CRUD
export const getGeographicPreferences = (): GeographicPreference[] => {
  return getStorageData<GeographicPreference[]>(STORAGE_KEYS.GEOGRAPHIC_PREFERENCES, []);
};

export const createGeographicPreference = (preference: Omit<GeographicPreference, 'id'>): GeographicPreference => {
  const preferences = getGeographicPreferences();
  const newPreference = { ...preference, id: uuidv4() };
  preferences.push(newPreference);
  setStorageData(STORAGE_KEYS.GEOGRAPHIC_PREFERENCES, preferences);
  return newPreference;
};

export const updateGeographicPreference = (id: string, updates: Partial<GeographicPreference>): GeographicPreference | null => {
  const preferences = getGeographicPreferences();
  const index = preferences.findIndex(pref => pref.id === id);
  if (index === -1) return null;

  const updatedPreference = { ...preferences[index], ...updates };
  preferences[index] = updatedPreference;
  setStorageData(STORAGE_KEYS.GEOGRAPHIC_PREFERENCES, preferences);
  return updatedPreference;
};

export const deleteGeographicPreference = (id: string): boolean => {
  const preferences = getGeographicPreferences();
  const filteredPreferences = preferences.filter(pref => pref.id !== id);
  if (filteredPreferences.length === preferences.length) return false;
  setStorageData(STORAGE_KEYS.GEOGRAPHIC_PREFERENCES, filteredPreferences);
  return true;
};