import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            <div className="px-5 py-2">
              <Link to="/about" className="text-sm text-gray-500 hover:text-gray-900">
                À propos
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link to="/contact" className="text-sm text-gray-500 hover:text-gray-900">
                Contact
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-900">
                Confidentialité
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-900">
                Conditions d'utilisation
              </Link>
            </div>
          </nav>
          <p className="mt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} AdminPanel. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}