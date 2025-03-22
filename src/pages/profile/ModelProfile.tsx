import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { clsx } from 'clsx';
import PersonalInfo from './tabs/PersonalInfo';
import Biography from './tabs/Biography';
import Measurements from './tabs/Measurements';
import Experience from './tabs/Experience';
import { ModelProfile } from '../../types/profile';

const tabs = [
  { name: 'Infos', component: PersonalInfo },
  { name: 'Bio', component: Biography },
  { name: 'Mensurations', component: Measurements },
  { name: 'Expérience', component: Experience },
];

const initialProfile: ModelProfile = {
  id: '1',
  firstName: '',
  lastName: '',
  artistName: '',
  birthDate: '',
  nationality: '',
  gender: '',
  pronouns: '',
  email: '',
  phone: '',
  socialLinks: {},
  biography: {
    fr: '',
    en: '',
  },
};

export default function ModelProfilePage() {
  const [profile, setProfile] = useState<ModelProfile>(initialProfile);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleProfileUpdate = (updates: Partial<ModelProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
    console.log('Profile updated:', { ...profile, ...updates });
  };

  return (
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate">
            Profil
          </h2>
        </div>
      </div>

      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-lg bg-purple-900/20 p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                clsx(
                  'w-full rounded-md py-2 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-purple-700 shadow'
                    : 'text-gray-600 hover:bg-white/[0.12] hover:text-purple-600'
                )
              }
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-4">
          {tabs.map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className={clsx(
                'rounded-lg bg-white p-4',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2'
              )}
            >
              <tab.component profile={profile} onUpdate={handleProfileUpdate} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}