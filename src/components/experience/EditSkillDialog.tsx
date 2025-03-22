import React from 'react';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Skill, SkillLevel } from '../../types/experience';
import { X, Award } from 'lucide-react';
import skillSuggestions from '../../data/skillSuggestions.json';

const schema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert'] as const),
});

type FormData = z.infer<typeof schema>;

interface EditSkillDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, skill: Partial<Skill>) => void;
  skill: Skill;
  categoryName: string;
}

const skillLevels = [
  { value: 'beginner', label: 'Débutant' },
  { value: 'intermediate', label: 'Intermédiaire' },
  { value: 'advanced', label: 'Avancé' },
  { value: 'expert', label: 'Expert' },
];

export default function EditSkillDialog({ isOpen, onClose, onUpdate, skill, categoryName }: EditSkillDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: skill.name,
      level: skill.level,
    },
  });

  const suggestions = skillSuggestions[skill.category as keyof typeof skillSuggestions] || [];

  const onSubmit = (data: FormData) => {
    onUpdate(skill.id, data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Dialog.Title className="text-xl font-semibold text-gray-900">
                Modifier une compétence
              </Dialog.Title>
              <p className="mt-1 text-sm text-gray-500">
                Catégorie : {categoryName}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom de la compétence
              </label>
              <div className="mt-1">
                <select
                  {...register('name')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                >
                  {suggestions.map((suggestion) => (
                    <option key={suggestion} value={suggestion}>
                      {suggestion}
                    </option>
                  ))}
                </select>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Niveau de compétence
              </label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {skillLevels.map((level) => (
                  <div key={level.value} className="relative">
                    <input
                      type="radio"
                      {...register('level')}
                      id={`level-${level.value}`}
                      value={level.value}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor={`level-${level.value}`}
                      className="flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md border cursor-pointer peer-checked:bg-purple-50 peer-checked:border-purple-500 peer-checked:text-purple-700 hover:bg-gray-50"
                    >
                      {level.label}
                    </label>
                  </div>
                ))}
              </div>
              {errors.level && (
                <p className="mt-1 text-sm text-red-600">{errors.level.message}</p>
              )}
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Award className="h-5 w-5 text-purple-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-purple-800">
                    Conseil pour le niveau
                  </h3>
                  <div className="mt-2 text-sm text-purple-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Débutant : Connaissance basique, peu d'expérience pratique</li>
                      <li>Intermédiaire : Bonne maîtrise, expérience régulière</li>
                      <li>Avancé : Excellente maîtrise, expérience professionnelle</li>
                      <li>Expert : Maîtrise exceptionnelle, référence dans le domaine</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Mettre à jour
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}