'use client';

import React, { useState, useId } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Send, CheckCircle, ShieldCheck, Sparkles, Building, User, Mail } from 'lucide-react';

export const JoinForm: React.FC = () => {
  const { t } = useLanguage();

  const nameInputId = useId();
  const emailInputId = useId();
  const roleInputId = useId();
  const messageInputId = useId();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('resident');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  return (
    <section id="join" className="py-24 bg-forest-900 relative overflow-hidden border-t border-forest-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-forest-950 border border-lime/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-lime/10 rounded-full blur-3xl pointer-events-none" />

          {/* Form Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-forest-800 border border-lime/30 text-lime text-xs font-bold tracking-widest uppercase mb-4">
              {t.join.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-offwhite font-sans tracking-tight mb-4">
              {t.join.title}
            </h2>
            <p className="text-sm sm:text-base text-offwhite/80 leading-relaxed font-normal">
              {t.join.desc}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-forest-900/90 border border-lime text-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-lime/20 text-lime flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-offwhite font-sans mb-2">
                Anfrage erfolgreich übermittelt!
              </h3>
              <p className="text-sm text-gray-300 max-w-md mx-auto mb-6">
                {t.join.successMsg}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-forest-800 hover:bg-forest-700 text-sm font-semibold text-lime border border-lime/30 transition-all"
              >
                Weitere Anfrage stellen
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor={nameInputId} className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    {t.join.nameLabel} *
                  </label>
                  <div className="relative">
                    <input
                      id={nameInputId}
                      type="text"
                      required
                      placeholder="z.B. Dr. Maria Muster"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-forest-900/90 border border-forest-700 rounded-xl px-4 py-3.5 text-sm text-offwhite placeholder-gray-500 focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor={emailInputId} className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    {t.join.emailLabel} *
                  </label>
                  <div className="relative">
                    <input
                      id={emailInputId}
                      type="email"
                      required
                      placeholder="name@domain.at"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-forest-900/90 border border-forest-700 rounded-xl px-4 py-3.5 text-sm text-offwhite placeholder-gray-500 focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Role Select */}
              <div>
                <label htmlFor={roleInputId} className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  {t.join.roleLabel}
                </label>
                <select
                  id={roleInputId}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-forest-900/90 border border-forest-700 rounded-xl px-4 py-3.5 text-sm text-offwhite focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime transition-all"
                >
                  <option value="resident">{t.join.roleResident}</option>
                  <option value="owner">{t.join.roleOwner}</option>
                  <option value="manager">{t.join.roleManager}</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor={messageInputId} className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  {t.join.messageLabel}
                </label>
                <textarea
                  id={messageInputId}
                  rows={3}
                  placeholder="Ihre Stiege / Türnummer oder spezifische Fragen..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-forest-900/90 border border-forest-700 rounded-xl px-4 py-3 text-sm text-offwhite placeholder-gray-500 focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-lime hover:bg-lime-hover active:bg-lime-active text-forest-950 font-extrabold text-base py-4 rounded-full transition-all duration-200 shadow-lime-glow hover:shadow-lime-glow-lg cursor-pointer"
              >
                <span>{t.join.submitButton}</span>
                <Send className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-lime" />
                <span>DSGVO-konform • Unverbindliche Teilnahme-Prüfung nach EAG</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
