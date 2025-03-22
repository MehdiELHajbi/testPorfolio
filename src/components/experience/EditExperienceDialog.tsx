import React from 'react';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Experience, ExperienceType } from '../../types/experience';
import { X, Calendar, MapPin, Briefcase, Building2, Award } from 'lucide-react';

const schema = z.object({
  type: z.enum(['runway', 'photoshoot', 'campaign', 'event', 'other'] as const),
  client: z.string().min(2, 'Le nom du client est requis'),
  brand: z.string().optional(),
  startDate: z.string().min(1, 'La date de début est requise'),
  endDate: z.string().optional(),
  location: z.string().min(2, 'Le lieu est requis'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  role: z.string().min(2, 'Le rôle est requis'),
  featured: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

interface EditExperienceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, experience: Partial<Experience>) => void;
  experience: Experience;
}

export default function EditExperienceDialog({ isOpen, onClose, onUpdate, experience }: EditExperienceDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: experience.type,
      client: experience.client,
      brand: experience.brand,
      startDate: experience.startDate,
      endDate: experience.endDate,
      location: experience.location,
      description: experience.description,
      role: experience.role,
      featured: experience.featured,
    },
  });

  const onSubmit = (data: FormData) => {
    onUpdate(experience.id, data);
    reset();
    onClose();
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      className="relative z-[100]"
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative w-full max-w-6xl bg-white rounded-lg shadow-xl flex flex-col md:flex-row">
          {/* Left Panel - Preview */}
          <div className="w-full md:w-1/3 bg-purple-50 p-6 rounded-l-lg">
            <div className="sticky top-6">
              <h3 className="text-lg font-medium text-purple-900 mb-4">
                Aperçu de l'expérience
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {experience.type === 'runway' && 'Défilé'}
                      {experience.type === 'photoshoot' && 'Shooting photo'}
                      {experience.type === 'campaign' && 'Campagne'}
                      {experience.type === 'event' && 'Événement'}
                      {experience.type === 'other' && 'Autre'}
                    </span>
                    {experience.featured && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Mis en avant
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-medium text-gray-900">{experience.client}</h4>
                  {experience.brand && (
                    <p className="text-sm text-gray-500">{experience.brand}</p>
                  )}
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {new Date(experience.startDate).toLocaleDateString('fr-FR')}
                      {experience.endDate && ` - ${new Date(experience.endDate).toLocaleDateString('fr-FR')}`}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{experience.location}</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-sm text-gray-500">{experience.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="w-full md:w-2/3 border-t md:border-t-0 md:border-l border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <Dialog.Title className="text-xl font-semibold text-gray-900">
                  Modifier l'expérience
                </Dialog.Title>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Type d'expérience
                    </label>
                    <select
                      {...register('type')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    >
                      <option value="runway">Défilé</option>
                      <option value="photoshoot">Shooting photo</option>
                      <option value="campaign">Campagne</option>
                      <option value="event">Événement</option>
                      <option value="other">Autre</option>
                    </select>
                    {errors.type && (
                      <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="client" className="block text-sm font-medium text-gray-700">
                      Client
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        {...register('client')}
                        className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      />
                    </div>
                    {errors.client && (
                      <p className="mt-1 text-sm text-red-600">{errors.client.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                      Marque (optionnel)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        {...register('brand')}
                        className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Lieu
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        {...register('location')}
                        className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      />
                    </div>
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                      Date de début
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        {...register('startDate')}
                        className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      />
                    </div>
                    {errors.startDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                      Date de fin (optionnel)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        {...register('endDate')}
                        className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Rôle
                  </label>
                  <input
                    type="text"
                    {...register('role')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    {...register('description')}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('featured')}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                    Mettre en avant cette expérience
                  </label>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Award className="h-5 w-5 text-purple-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-purple-800">
                        Conseils pour une description efficace
                      </h3>
                      <div className="mt-2 text-sm text-purple-700">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Soyez précis sur vos responsabilités</li>
                          <li>Mentionnez les techniques ou styles utilisés</li>
                          <li>Incluez les résultats ou retours obtenus</li>
                          <li>Citez les professionnels avec qui vous avez travaillé</li>
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
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}