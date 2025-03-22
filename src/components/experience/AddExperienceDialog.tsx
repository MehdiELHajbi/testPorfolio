import React from 'react';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Experience, ExperienceType } from '../../types/experience';
import { X, Calendar, MapPin, Briefcase, Building2, Award } from 'lucide-react';
import { clsx } from 'clsx';

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

interface AddExperienceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (experience: Omit<Experience, 'id' | 'order'>) => void;
}

export default function AddExperienceDialog({ isOpen, onClose, onAdd }: AddExperienceDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      featured: false,
    },
  });

  const onSubmit = (data: FormData) => {
    onAdd(data);
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
      
      <div className="fixed inset-0 flex items-start justify-center p-0">
        <Dialog.Panel className="relative w-full h-full bg-white md:h-auto md:max-w-2xl md:rounded-lg md:my-8 md:mx-auto md:shadow-xl overflow-y-auto">
          <div className="sticky top-0 z-10 bg-white px-4 py-4 border-b border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <Dialog.Title className="text-xl font-semibold text-gray-900">
                  Ajouter une expérience
                </Dialog.Title>
                <p className="mt-1 text-sm text-gray-500">
                  Renseignez les détails de votre nouvelle expérience professionnelle
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-4 space-y-6 sm:px-6">
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

            <div className="fixed bottom-0 left-0 right-0 md:relative bg-white border-t border-gray-200 px-4 py-4 sm:px-6">
              <div className="flex justify-end space-x-3">
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
                  Ajouter
                </button>
              </div>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}