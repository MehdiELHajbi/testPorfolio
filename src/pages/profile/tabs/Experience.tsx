import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  Award,
  Calendar,
  MapPin,
  Plus,
  Star,
  Briefcase,
  Languages,
  Music,
  Dumbbell,
  Camera,
  Palette,
  Globe,
  Trash2,
  Edit,
} from 'lucide-react';
import type {
  Skill,
  SkillLevel,
  Experience,
  ExperienceType,
  GeographicPreference,
} from '../../../types/experience';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { clsx } from 'clsx';
import AddSkillDialog from '../../../components/experience/AddSkillDialog';
import EditSkillDialog from '../../../components/experience/EditSkillDialog';
import AddExperienceDialog from '../../../components/experience/AddExperienceDialog';
import EditExperienceDialog from '../../../components/experience/EditExperienceDialog';
import GeographicPreferences from '../../../components/experience/GeographicPreferences';
import * as experienceService from '../../../services/experienceData';

const skillCategories = [
  { id: 'languages', name: 'Langues', icon: Languages },
  { id: 'artistic', name: 'Talents artistiques', icon: Palette },
  { id: 'sports', name: 'Sports', icon: Dumbbell },
  { id: 'modeling', name: 'Techniques de mannequinat', icon: Camera },
  { id: 'other', name: 'Autres compétences', icon: Star },
];

const skillLevels: { value: SkillLevel; label: string }[] = [
  { value: 'beginner', label: 'Débutant' },
  { value: 'intermediate', label: 'Intermédiaire' },
  { value: 'advanced', label: 'Avancé' },
  { value: 'expert', label: 'Expert' },
];

export default function Experience() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [geographicPreferences, setGeographicPreferences] = useState<GeographicPreference[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(skillCategories[0].id);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);

  useEffect(() => {
    // Load initial data
    setSkills(experienceService.getSkills());
    setExperiences(experienceService.getExperiences());
    setGeographicPreferences(experienceService.getGeographicPreferences());
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setExperiences((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        experienceService.reorderExperiences(newItems);
        return newItems;
      });
    }
  };

  const handleAddSkill = (skillData: Omit<Skill, 'id'>) => {
    const newSkill = experienceService.createSkill(skillData);
    setSkills([...skills, newSkill]);
  };

  const handleEditSkill = (id: string, updates: Partial<Skill>) => {
    const updated = experienceService.updateSkill(id, updates);
    if (updated) {
      setSkills(skills.map(skill => 
        skill.id === id ? { ...skill, ...updates } : skill
      ));
    }
    setEditingSkill(null);
  };

  const handleDeleteSkill = (id: string) => {
    if (experienceService.deleteSkill(id)) {
      setSkills(skills.filter(skill => skill.id !== id));
    }
  };

  const handleAddExperience = (experienceData: Omit<Experience, 'id' | 'order'>) => {
    const newExperience = experienceService.createExperience(experienceData);
    setExperiences([...experiences, newExperience]);
  };

  const handleEditExperience = (id: string, updates: Partial<Experience>) => {
    const updated = experienceService.updateExperience(id, updates);
    if (updated) {
      setExperiences(experiences.map(exp => 
        exp.id === id ? { ...exp, ...updates } : exp
      ));
    }
    setEditingExperience(null);
  };

  const handleDeleteExperience = (id: string) => {
    if (experienceService.deleteExperience(id)) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  const handleToggleExperienceFeatured = (id: string) => {
    const experience = experiences.find(exp => exp.id === id);
    if (experience) {
      const updated = experienceService.updateExperience(id, {
        featured: !experience.featured
      });
      if (updated) {
        setExperiences(experiences.map(exp => 
          exp.id === id ? { ...exp, featured: !exp.featured } : exp
        ));
      }
    }
  };

  const handleAddGeographicPreference = (preference: Omit<GeographicPreference, 'id'>) => {
    const newPreference = experienceService.createGeographicPreference(preference);
    setGeographicPreferences([...geographicPreferences, newPreference]);
  };

  const handleDeleteGeographicPreference = (id: string) => {
    if (experienceService.deleteGeographicPreference(id)) {
      setGeographicPreferences(geographicPreferences.filter(pref => pref.id !== id));
    }
  };

  const handleUpdateTravelPreferences = (preferences: any) => {
    // Implement travel preferences update logic here
    console.log('Travel preferences updated:', preferences);
  };

  const filteredSkills = skills.filter((skill) => skill.category === selectedCategory);
  const selectedCategoryName = skillCategories.find(cat => cat.id === selectedCategory)?.name || '';

  return (
    <div className="space-y-8">
      {/* Skills Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Compétences</h3>
            <button
              type="button"
              onClick={() => setIsAddingSkill(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </button>
          </div>

          <div className="flex space-x-1 mb-6">
            {skillCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={clsx(
                  'flex items-center px-4 py-2 text-sm font-medium rounded-md',
                  selectedCategory === category.id
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                )}
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.name}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg group hover:bg-purple-50 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                  {skill.verified && (
                    <Award className="h-4 w-4 text-green-500 ml-2" />
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={clsx(
                      'px-2 py-1 text-xs font-medium rounded-full',
                      skill.level === 'expert' && 'bg-purple-100 text-purple-700',
                      skill.level === 'advanced' && 'bg-blue-100 text-blue-700',
                      skill.level === 'intermediate' && 'bg-green-100 text-green-700',
                      skill.level === 'beginner' && 'bg-gray-100 text-gray-700'
                    )}
                  >
                    {skillLevels.find((l) => l.value === skill.level)?.label}
                  </span>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditingSkill(skill)}
                      className="text-gray-400 hover:text-purple-500"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredSkills.length === 0 && (
              <div className="text-center py-6">
                <p className="text-sm text-gray-500">
                  Aucune compétence dans cette catégorie.
                </p>
                <button
                  onClick={() => setIsAddingSkill(true)}
                  className="mt-2 text-sm text-purple-600 hover:text-purple-700"
                >
                  Ajouter une compétence
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Expérience professionnelle</h3>
            <button
              type="button"
              onClick={() => setIsAddingExperience(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </button>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={experiences.map((exp) => exp.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {experiences.map((experience) => (
                  <div
                    key={experience.id}
                    className="relative flex items-start p-4 bg-gray-50 rounded-lg cursor-move group"
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={clsx(
                          'h-8 w-8 rounded-full flex items-center justify-center',
                          experience.type === 'runway' && 'bg-purple-100 text-purple-600',
                          experience.type === 'photoshoot' && 'bg-blue-100 text-blue-600',
                          experience.type === 'campaign' && 'bg-green-100 text-green-600',
                          experience.type === 'event' && 'bg-yellow-100 text-yellow-600'
                        )}
                      >
                        <Briefcase className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">
                          {experience.client}
                          {experience.brand && ` - ${experience.brand}`}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleToggleExperienceFeatured(experience.id)}
                            className={clsx(
                              'text-gray-400 hover:text-yellow-500',
                              experience.featured && 'text-yellow-400'
                            )}
                          >
                            <Star className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setEditingExperience(experience)}
                            className="text-gray-400 hover:text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteExperience(experience.id)}
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {format(new Date(experience.startDate), 'dd MMM yyyy', {
                            locale: fr,
                          })}
                          {experience.endDate &&
                            ` - ${format(new Date(experience.endDate), 'dd MMM yyyy', {
                              locale: fr,
                            })}`}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {experience.location}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {experience.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* Geographic Preferences */}
      <GeographicPreferences
        preferences={geographicPreferences}
        onAddPreference={handleAddGeographicPreference}
        onDeletePreference={handleDeleteGeographicPreference}
        onUpdateTravelPreferences={handleUpdateTravelPreferences}
      />

      <AddSkillDialog
        isOpen={isAddingSkill}
        onClose={() => setIsAddingSkill(false)}
        onAdd={handleAddSkill}
        selectedCategory={selectedCategory}
      />

      {editingSkill && (
        <EditSkillDialog
          isOpen={true}
          onClose={() => setEditingSkill(null)}
          onUpdate={handleEditSkill}
          skill={editingSkill}
          categoryName={selectedCategoryName}
        />
      )}

      <AddExperienceDialog
        isOpen={isAddingExperience}
        onClose={() => setIsAddingExperience(false)}
        onAdd={handleAddExperience}
      />

      {editingExperience && (
        <EditExperienceDialog
          isOpen={true}
          onClose={() => setEditingExperience(null)}
          onUpdate={handleEditExperience}
          experience={editingExperience}
        />
      )}
    </div>
  );
}