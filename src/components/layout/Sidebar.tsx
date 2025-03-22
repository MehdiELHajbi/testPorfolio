import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { X, Home, Users, FileText, BarChart2, Settings, UserCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { clsx } from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
  roles: string[];
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/', icon: Home, roles: ['admin', 'manager', 'editor', 'user'] },
  { name: 'Mon Profil', href: '/profile', icon: UserCircle, roles: ['admin', 'manager', 'editor', 'user'] },
  { name: 'Utilisateurs', href: '/users', icon: Users, roles: ['admin'] },
  { name: 'Documents', href: '/documents', icon: FileText, roles: ['admin', 'manager', 'editor'] },
  { name: 'Rapports', href: '/reports', icon: BarChart2, roles: ['admin', 'manager'] },
  { name: 'Paramètres', href: '/settings', icon: Settings, roles: ['admin'] },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();

  const filteredNavigation = navigation.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <span className="text-2xl font-bold">AdminPanel</span>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {filteredNavigation.map((item) => (
                            <li key={item.name}>
                              <NavLink
                                to={item.href}
                                className={({ isActive }) =>
                                  clsx(
                                    isActive
                                      ? 'bg-purple-600 text-white'
                                      : 'text-gray-700 hover:bg-purple-100',
                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                  )
                                }
                                onClick={onClose}
                              >
                                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                {item.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <span className="text-2xl font-bold">AdminPanel</span>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {filteredNavigation.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          clsx(
                            isActive
                              ? 'bg-purple-600 text-white'
                              : 'text-gray-700 hover:bg-purple-100',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                          )
                        }
                      >
                        <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}