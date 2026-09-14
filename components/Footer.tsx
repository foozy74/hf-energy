'use client';

import React from 'react';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-forest-950 border-t border-forest-800/80 pt-16 pb-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-forest-800/80">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm pt-2">
              {t.footer.desc}
            </p>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-offwhite mb-4">
              Energiezelle
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#system" className="hover:text-lime transition-colors">
                  {t.nav.system}
                </a>
              </li>
              <li>
                <a href="#pillars" className="hover:text-lime transition-colors">
                  {t.nav.pillars}
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-lime transition-colors">
                  {t.nav.calculator}
                </a>
              </li>
              <li>
                <a href="#benefits" className="hover:text-lime transition-colors">
                  {t.nav.benefits}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quartier & Recht */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-offwhite mb-4">
              Recht & Standort
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#location" className="hover:text-lime transition-colors">
                  Hertha-Firnberg-Straße (1100 Wien)
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-lime transition-colors">
                  Erneuerbaren-Ausbau-Gesetz (EAG)
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-lime transition-colors">
                  § 16a ElWOG Gemeinschaftsanlagen
                </a>
              </li>
              <li>
                <a href="#join" className="hover:text-lime transition-colors">
                  Voranmeldung Liegenschaften
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} {t.footer.rights}
          </div>

          <div className="flex items-center gap-4">
            <span>Datenschutz</span>
            <span>•</span>
            <span>Impressum</span>
            <span>•</span>
            <span>EAG-Konformität</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-forest-900 border border-forest-700 hover:border-lime text-lime hover:bg-forest-800 transition-all flex items-center gap-1.5"
          >
            <span>Nach oben</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
