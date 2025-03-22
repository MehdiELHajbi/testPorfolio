import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Ruler, Scale, Eye, Scissors } from 'lucide-react';
import type { UnitSystem, ModelMeasurements, Measurement } from '../../../types/measurements';

const schema = z.object({
  height: z.number().min(100).max(250),
  weight: z.number().min(30).max(150),
  bust: z.number().min(60).max(150),
  waist: z.number().min(40).max(130),
  hips: z.number().min(60).max(150),
  inseam: z.number().min(50).max(120),
  shoeSize: z.number().min(34).max(50),
  eyeColor: z.string().min(1),
  hairColor: z.string().min(1),
  clothingSizes: z.object({
    eu: z.string(),
    uk: z.string(),
    us: z.string(),
    international: z.string(),
  }),
});

const mockMeasurementHistory: Measurement[] = [
  {
    id: '1',
    date: '2024-01-01',
    height: 175,
    weight: 58,
    bust: 86,
    waist: 61,
    hips: 89,
    inseam: 82,
    shoeSize: 39,
  },
  {
    id: '2',
    date: '2024-02-01',
    height: 175,
    weight: 57.5,
    bust: 85,
    waist: 60,
    hips: 88,
    inseam: 82,
    shoeSize: 39,
  },
  {
    id: '3',
    date: '2024-03-01',
    height: 175,
    weight: 57,
    bust: 85,
    waist: 60,
    hips: 88,
    inseam: 82,
    shoeSize: 39,
  },
];

const eyeColors = [
  'Brun',
  'Vert',
  'Bleu',
  'Noisette',
  'Gris',
  'Ambre',
];

const hairColors = [
  'Brun foncé',
  'Brun clair',
  'Blond',
  'Roux',
  'Noir',
  'Gris',
  'Blanc',
];

export default function Measurements() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [measurementHistory] = useState<Measurement[]>(mockMeasurementHistory);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      height: 175,
      weight: 58,
      bust: 86,
      waist: 61,
      hips: 89,
      inseam: 82,
      shoeSize: 39,
      eyeColor: 'Brun',
      hairColor: 'Brun foncé',
      clothingSizes: {
        eu: '36',
        uk: '8',
        us: '4',
        international: 'S',
      },
    },
  });

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };

  const convertMeasurement = (value: number, from: UnitSystem, to: UnitSystem) => {
    if (from === to) return value;
    return from === 'metric'
      ? value * 0.393701 // cm to inches
      : value * 2.54; // inches to cm
  };

  return (
    <div className="space-y-8">
      {/* Unit System Toggle */}
      <div className="flex justify-end">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setUnitSystem('metric')}
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              unitSystem === 'metric'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300`}
          >
            Métrique
          </button>
          <button
            type="button"
            onClick={() => setUnitSystem('imperial')}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              unitSystem === 'imperial'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-l-0 border-gray-300`}
          >
            Impérial
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Mesures principales */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            Mesures principales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Taille
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  {...register('height')}
                  className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">
                    {unitSystem === 'metric' ? 'cm' : 'in'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Poids
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Scale className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  {...register('weight')}
                  className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">
                    {unitSystem === 'metric' ? 'kg' : 'lbs'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tour de poitrine
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  {...register('bust')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">
                    {unitSystem === 'metric' ? 'cm' : 'in'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tour de taille
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  {...register('waist')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">
                    {unitSystem === 'metric' ? 'cm' : 'in'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tour de hanches
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  {...register('hips')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">
                    {unitSystem === 'metric' ? 'cm' : 'in'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Entrejambe
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  {...register('inseam')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">
                    {unitSystem === 'metric' ? 'cm' : 'in'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tailles de vêtements */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            Tailles de vêtements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Taille EU
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  {...register('clothingSizes.eu')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Taille UK
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  {...register('clothingSizes.uk')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Taille US
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  {...register('clothingSizes.us')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Taille International
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  {...register('clothingSizes.international')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Caractéristiques physiques */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            Caractéristiques physiques
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Couleur des yeux
              </label>
              <div className="mt-1">
                <select
                  {...register('eyeColor')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                >
                  {eyeColors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Couleur des cheveux
              </label>
              <div className="mt-1">
                <select
                  {...register('hairColor')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                >
                  {hairColors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Graphique d'évolution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            Évolution des mesures
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={measurementHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#9333EA"
                  name="Poids"
                />
                <Line
                  type="monotone"
                  dataKey="bust"
                  stroke="#2563EB"
                  name="Poitrine"
                />
                <Line
                  type="monotone"
                  dataKey="waist"
                  stroke="#DC2626"
                  name="Taille"
                />
                <Line
                  type="monotone"
                  dataKey="hips"
                  stroke="#059669"
                  name="Hanches"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
}