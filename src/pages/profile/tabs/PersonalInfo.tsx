import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Cropper from 'react-easy-crop';
import { Instagram, Facebook, Globe, Phone, Mail } from 'lucide-react';
import type { ModelProfile } from '../../../types/profile';

const schema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  artistName: z.string().optional(),
  birthDate: z.string(),
  nationality: z.string().min(2, 'La nationalité est requise'),
  gender: z.string().min(1, 'Le genre est requis'),
  pronouns: z.string(),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  socialLinks: z.object({
    instagram: z.string().url('URL Instagram invalide').optional(),
    facebook: z.string().url('URL Facebook invalide').optional(),
    website: z.string().url('URL du site web invalide').optional(),
  }),
});

interface PersonalInfoProps {
  profile: ModelProfile;
  onUpdate: (updates: Partial<ModelProfile>) => void;
}

export default function PersonalInfo({ profile, onUpdate }: PersonalInfoProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: profile,
  });

  const onSubmit = (data: any) => {
    onUpdate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Photo de profil */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Photo de profil
        </label>
        <div className="mt-1 flex items-center space-x-5">
          <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100">
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-400">Photo</span>
              </div>
            )}
          </div>
          <button
            type="button"
            className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Changer
          </button>
        </div>
      </div>

      {/* Informations de base */}
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            Prénom
          </label>
          <div className="mt-1">
            <input
              type="text"
              {...register('firstName')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <div className="mt-1">
            <input
              type="text"
              {...register('lastName')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="artistName" className="block text-sm font-medium text-gray-700">
            Nom d'artiste (optionnel)
          </label>
          <div className="mt-1">
            <input
              type="text"
              {...register('artistName')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
            Date de naissance
          </label>
          <div className="mt-1">
            <input
              type="date"
              {...register('birthDate')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
            {errors.birthDate && (
              <p className="mt-1 text-sm text-red-600">{errors.birthDate.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
            Nationalité
          </label>
          <div className="mt-1">
            <input
              type="text"
              {...register('nationality')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
            {errors.nationality && (
              <p className="mt-1 text-sm text-red-600">{errors.nationality.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Genre
          </label>
          <div className="mt-1">
            <select
              {...register('gender')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            >
              <option value="">Sélectionner...</option>
              <option value="female">Femme</option>
              <option value="male">Homme</option>
              <option value="non-binary">Non-binaire</option>
              <option value="other">Autre</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="pronouns" className="block text-sm font-medium text-gray-700">
            Pronoms
          </label>
          <div className="mt-1">
            <select
              {...register('pronouns')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            >
              <option value="">Sélectionner...</option>
              <option value="elle">Elle</option>
              <option value="il">Il</option>
              <option value="iel">Iel</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Contact professionnel</h3>
        
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email professionnel
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                {...register('email')}
                className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Téléphone
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                {...register('phone')}
                className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Réseaux sociaux */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Réseaux sociaux</h3>
        
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div>
            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
              Instagram
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Instagram className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                {...register('socialLinks.instagram')}
                placeholder="https://instagram.com/username"
                className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>
            {errors.socialLinks?.instagram && (
              <p className="mt-1 text-sm text-red-600">{errors.socialLinks.instagram.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
              Facebook
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Facebook className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                {...register('socialLinks.facebook')}
                placeholder="https://facebook.com/username"
                className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>
            {errors.socialLinks?.facebook && (
              <p className="mt-1 text-sm text-red-600">{errors.socialLinks.facebook.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Site web personnel
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                {...register('socialLinks.website')}
                placeholder="https://www.example.com"
                className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>
            {errors.socialLinks?.website && (
              <p className="mt-1 text-sm text-red-600">{errors.socialLinks.website.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </form>
  );
}