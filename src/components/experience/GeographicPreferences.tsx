import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Globe, MapPin, Plus, Trash2 } from 'lucide-react';
import type { GeographicPreference } from '../../types/experience';
import { clsx } from 'clsx';

const locationSchema = z.object({
  city: z.string().min(2, 'La ville est requise'),
  country: z.string().min(2, 'Le pays est requis'),
  radius: z.number().min(0).max(1000),
  preferred: z.boolean().default(false),
});

const travelPreferencesSchema = z.object({
  willingToTravel: z.boolean(),
  maxDistance: z.number().min(0).max(10000).optional(),
  preferredLocations: z.array(z.string()),
  excludedLocations: z.array(z.string()),
});

type LocationFormData = z.infer<typeof locationSchema>;
type TravelPreferencesFormData = z.infer<typeof travelPreferencesSchema>;

interface GeographicPreferencesProps {
  preferences: GeographicPreference[];
  onAddPreference: (preference: Omit<GeographicPreference, 'id'>) => void;
  onDeletePreference: (id: string) => void;
  onUpdateTravelPreferences: (preferences: TravelPreferencesFormData) => void;
}

export default function GeographicPreferences({
  preferences,
  onAddPreference,
  onDeletePreference,
  onUpdateTravelPreferences,
}: GeographicPreferencesProps) {
  const [isAddingLocation, setIsAddingLocation] = useState(false);

  const {
    register: registerLocation,
    handleSubmit: handleLocationSubmit,
    reset: resetLocation,
    formState: { errors: locationErrors },
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      radius: 50,
      preferred: false,
    },
  });

  const {
    register: registerTravel,
    handleSubmit: handleTravelSubmit,
    watch: watchTravel,
  } = useForm<TravelPreferencesFormData>({
    resolver: zodResolver(travelPreferencesSchema),
    defaultValues: {
      willingToTravel: false,
      maxDistance: 100,
    },
  });

  const willingToTravel = watchTravel('willingToTravel');

  const onLocationSubmit = (data: LocationFormData) => {
    onAddPreference(data);
    resetLocation();
    setIsAddingLocation(false);
  };

  const onTravelSubmit = (data: TravelPreferencesFormData) => {
    onUpdateTravelPreferences(data);
  };

  return (
    <div className="space-y-8">
      {/* Zones de travail préférées */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Zones de travail préférées
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingLocation(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une zone
            </button>
          </div>

          <div className="space-y-4">
            {preferences.map((preference) => (
              <div
                key={preference.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg group hover:bg-purple-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Globe className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {preference.city}, {preference.country}
                    </p>
                    <p className="text-sm text-gray-500">
                      Rayon : {preference.radius} km
                    </p>
                  </div>
                  {preference.preferred && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Préféré
                    </span>
                  )}
                </div>
                <button
                  onClick={() => onDeletePreference(preference.id)}
                  className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}

            {isAddingLocation && (
              <form onSubmit={handleLocationSubmit(onLocationSubmit)} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      Ville
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        {...registerLocation('city')}
                        className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                        placeholder="Paris"
                      />
                    </div>
                    {locationErrors.city && (
                      <p className="mt-1 text-sm text-red-600">{locationErrors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Pays
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        {...registerLocation('country')}
                        className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                        placeholder="France"
                      />
                    </div>
                    {locationErrors.country && (
                      <p className="mt-1 text-sm text-red-600">{locationErrors.country.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="radius" className="block text-sm font-medium text-gray-700">
                      Rayon (km)
                    </label>
                    <input
                      type="number"
                      {...registerLocation('radius')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    />
                    {locationErrors.radius && (
                      <p className="mt-1 text-sm text-red-600">{locationErrors.radius.message}</p>
                    )}
                  </div>

                  <div className="flex items-center h-full pt-6">
                    <input
                      type="checkbox"
                      {...registerLocation('preferred')}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Zone préférée
                    </label>
                  </div>
                </div>

                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddingLocation(false)}
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
              </form>
            )}

            {preferences.length === 0 && !isAddingLocation && (
              <div className="text-center py-6">
                <Globe className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune zone définie</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Commencez par ajouter une zone de travail préférée.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setIsAddingLocation(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une zone
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Préférences de déplacement */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            Préférences de déplacement
          </h3>

          <form onSubmit={handleTravelSubmit(onTravelSubmit)} className="space-y-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                {...registerTravel('willingToTravel')}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Disposé(e) à voyager
              </label>
            </div>

            {willingToTravel && (
              <div>
                <label htmlFor="maxDistance" className="block text-sm font-medium text-gray-700">
                  Distance maximale (km)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    {...registerTravel('maxDistance')}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Enregistrer les préférences
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}