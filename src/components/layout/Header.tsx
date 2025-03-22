import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import {
  Menu as MenuIcon,
  Bell,
  Search,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { clsx } from 'clsx';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={onMenuClick}
            >
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="ml-4 lg:ml-0">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-gray-900">AdminPanel</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-xs">
              <label htmlFor="search" className="sr-only">Rechercher</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  placeholder="Rechercher..."
                  type="search"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="relative rounded-full bg-white p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              <span className="sr-only">Voir les notifications</span>
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-400 ring-2 ring-white" />
            </button>

            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                <span className="sr-only">Ouvrir le menu utilisateur</span>
                {user?.avatar ? (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.avatar}
                    alt={user.name}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                )}
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 text-sm text-gray-900">
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-gray-500">{user?.email}</div>
                  </div>
                  <div className="border-t border-gray-200">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={clsx(
                            active ? 'bg-gray-100' : '',
                            'flex items-center px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          <Settings className="mr-3 h-5 w-5 text-gray-400" />
                          Paramètres
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={clsx(
                            active ? 'bg-gray-100' : '',
                            'flex w-full items-center px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                          Déconnexion
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}