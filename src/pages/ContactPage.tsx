import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Footer } from '../components/Footer';
import { PageRoute } from '../types';

interface ContactPageProps {
  onNavigate?: (route: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [selectedShowroom, setSelectedShowroom] = useState<'tokyo' | 'paris' | 'ny' | 'milan'>('tokyo');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Private Client Inquiry',
    message: ''
  });

  const showrooms = {
    tokyo: {
      city: "TOKYO",
      district: "GINZA VAULT",
      address: "6-10-1 Ginza, Chuo-ku, Tokyo 104-0061",
      hours: "TUE — SUN: 12:00 — 19:00 (BY APPOINTMENT ONLY)",
      phone: "+81 3 5537 8000",
      email: "tokyo@valence-archive.com",
      mapSrc: "https://maps.google.com/maps?q=Ginza+Tokyo+6-10-1&t=&z=14&ie=UTF8&iwloc=&output=embed"
    },
    paris: {
      city: "PARIS",
      district: "LE MARAIS ATELIER",
      address: "14 Rue Vieille du Temple, 75004 Paris",
      hours: "MON — SAT: 11:00 — 19:30",
      phone: "+33 1 42 68 90 10",
      email: "paris@valence-archive.com",
      mapSrc: "https://maps.google.com/maps?q=14+Rue+Vieille+du+Temple+75004+Paris&t=&z=14&ie=UTF8&iwloc=&output=embed"
    },
    ny: {
      city: "NEW YORK",
      district: "SOHO SANCTUARY",
      address: "420 Broome Street, New York, NY 10013",
      hours: "MON — SUN: 11:00 — 19:00",
      phone: "+1 212 966 4080",
      email: "ny@valence-archive.com",
      mapSrc: "https://maps.google.com/maps?q=420+Broome+Street+New+York+NY&t=&z=14&ie=UTF8&iwloc=&output=embed"
    },
    milan: {
      city: "MILAN",
      district: "QUADRILATERO STUDIO",
      address: "Via Montenapoleone 18, 20121 Milano",
      hours: "TUE — SAT: 10:30 — 19:00",
      phone: "+39 02 7600 3210",
      email: "milan@valence-archive.com",
      mapSrc: "https://maps.google.com/maps?q=Via+Montenapoleone+18+Milano&t=&z=14&ie=UTF8&iwloc=&output=embed"
    }
  };

  const faqs = [
    {
      q: "HOW ARE ARCHIVAL PIECES AUTHENTICATED?",
      a: "Every garment includes a Grade 5 titanium tag laser-engraved with its unique serial code and an embedded encrypted NFC chip linked to our private ledger."
    },
    {
      q: "WHAT IS THE FITTING PROTOCOL FOR PRIVATE CLIENTS?",
      a: "Private client appointments include personalized silhouette fitting with our senior tailors at our Tokyo, Paris, New York, or Milan sanctuaries."
    },
    {
      q: "WHAT ARE THE SHIPPING & CUSTOMS PROTOCOLS?",
      a: "All archive orders are shipped worldwide via express insured climate-controlled courier with pre-paid import duties and duties clearance."
    },
    {
      q: "CAN GARMENTS BE CUSTOMIZED OR ALTERED?",
      a: "Bespoke alterability is engineered directly into sleeve hems, trouser waists, and collar stays with hidden titanium adjustment tracks."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', category: 'Private Client Inquiry', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 selection:bg-white selection:text-black">
      <div className="px-4 sm:px-8 lg:px-16 pb-32">
        {/* HOME-FORMATTED HERO SECTION FOR CONTACT PAGE */}
        <section className="relative w-full min-h-[75vh] lg:min-h-[82vh] rounded-3xl overflow-hidden mb-16 border border-neutral-800 bg-neutral-950 flex flex-col justify-between p-8 sm:p-14 lg:p-20">
          {/* Background Photography with Hero Vignette Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=85&w=2000"
              alt="Valence Tokyo Atelier Sanctuary"
              className="w-full h-full object-cover object-center opacity-35 mix-blend-luminosity scale-105 transition-transform duration-1000 hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black" />
          </div>

          {/* TOP META ROW */}
          <div className="relative z-10 flex flex-wrap justify-center lg:justify-between items-center gap-4 border-b border-white/10 pb-6 text-center lg:text-left">
            <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 flex items-center justify-center lg:justify-start gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              VALENCE ® PRIVATE CONCIERGE & SANCTUARIES
            </div>
            <div className="text-xs font-mono tracking-widest text-neutral-400">
              GLOBAL ATELIERS — TOKYO • PARIS • NEW YORK • MILAN
            </div>
          </div>

          {/* MAIN HERO CONTENT ROW */}
          <div className="relative z-10 my-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-center lg:text-left">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="text-xs uppercase tracking-[0.35em] text-neutral-300 mb-3 font-mono">
                  [ DIRECT PRIVATE APPOINTMENTS ]
                </div>
                <h1 className="text-5xl sm:text-7xl lg:text-9xl font-semibold tracking-tight uppercase leading-[0.9] text-white">
                  SANCTUARY <span className="font-light italic text-neutral-400">CONCIERGE</span>
                </h1>
                <p className="mt-6 text-sm sm:text-base text-neutral-300 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Book a private 1-on-1 fitting session with our senior master tailors, request bespoke garment alterations, or inquire regarding custom private archive commissions.
                </p>
              </motion.div>
            </div>

            {/* RIGHT SIDE: SIGNATURE ANIMATED HERO CIRCLE BADGE */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end items-center">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                    fill="none"
                    opacity="0.8"
                  />
                </svg>
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/30 backdrop-blur-md flex flex-col items-center justify-center bg-black/40">
                  <span className="text-2xl text-white font-mono">⚙</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-300 mt-1 font-mono">
                    ONLINE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM HERO STATS BAR */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap justify-center lg:justify-between items-center gap-6 text-center lg:text-left">
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 font-mono text-xs text-neutral-400">
              <div>
                <span className="text-neutral-500 block text-[10px]">ATELIER STATUS</span>
                <span className="text-emerald-400 font-semibold flex items-center justify-center lg:justify-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> OPEN FOR APPOINTMENTS
                </span>
              </div>
              <div className="hidden sm:block border-l border-neutral-800 h-8" />
              <div>
                <span className="text-neutral-500 block text-[10px]">RESPONSE PROTOCOL</span>
                <span className="text-white font-semibold">WITHIN 4 HOURS</span>
              </div>
            </div>

            <a
              href="#contact-form-section"
              className="px-8 py-3.5 bg-white text-black text-xs uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-black hover:text-white border border-white transition-all shadow-md"
            >
              INQUIRE NOW ↓
            </a>
          </div>
        </section>

        {/* SECTION 1: INQUIRY CONCIERGE */}
        <section id="contact-form-section" className="max-w-[1400px] mx-auto mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
          >
            <div className="text-center lg:text-left flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4 flex items-center justify-center lg:justify-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  SECTION 01 / DIRECT CONCIERGE
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight uppercase leading-[0.95] mb-6">
                  ATELIER <span className="text-neutral-500 font-light">INQUIRY</span>
                </h1>
                <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                  For archive reservations, bespoke consultations, private fitting bookings, or press inquiries, transmit a message directly to our Tokyo headquarters concierge.
                </p>
                <div className="space-y-4 text-sm font-mono text-neutral-400 border-t border-neutral-800 pt-8 max-w-xl mx-auto lg:mx-0">
                  <div className="flex flex-col sm:flex-row justify-between border-b border-neutral-900 pb-2 gap-1">
                    <span className="text-neutral-500">GENERAL INQUIRIES:</span>
                    <span className="text-white">CONCIERGE@VALENCE-ARCHIVE.COM</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between border-b border-neutral-900 pb-2 gap-1">
                    <span className="text-neutral-500">PRESS & EDITORIAL:</span>
                    <span className="text-white">PRESS@VALENCE-ARCHIVE.COM</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between gap-1">
                    <span className="text-neutral-500">PRIVATE VAULT DIRECT:</span>
                    <span className="text-white">+81 3 5537 8000</span>
                  </div>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="pt-8 mt-8 border-t border-neutral-800 text-center lg:text-left">
                <div className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-4 font-mono">
                  ARCHIVAL SOCIALS & CHANNELS
                </div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-500 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>INSTAGRAM</span>
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-500 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>X / TWITTER</span>
                  </a>
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-500 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    <span>DISCORD</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-neutral-950 p-6 sm:p-10 lg:p-12 rounded-2xl border border-neutral-800">
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-4"
                >
                  <div className="text-4xl text-white">✓</div>
                  <h3 className="text-2xl font-medium uppercase tracking-tight">INQUIRY TRANSMITTED</h3>
                  <p className="text-neutral-400 text-sm font-light max-w-md mx-auto">
                    Our private client team in Tokyo has received your message. You will receive a direct reply within 12 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2.5 font-medium">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Kenji Sato"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-5 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2.5 font-medium">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-5 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2.5 font-medium">
                      INQUIRY TYPE
                    </label>
                    <div className="relative">
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-5 py-4 pr-12 text-sm text-white focus:outline-none focus:border-white transition-colors cursor-pointer appearance-none"
                      >
                        <option value="Private Client Inquiry" className="bg-neutral-950 text-white py-2">Private Client Inquiry</option>
                        <option value="Archive Drop Reservation" className="bg-neutral-950 text-white py-2">Archive Drop Reservation</option>
                        <option value="Sanctuary Fitting Appointment" className="bg-neutral-950 text-white py-2">Sanctuary Fitting Appointment</option>
                        <option value="Press & Media Accreditation" className="bg-neutral-950 text-white py-2">Press & Media Accreditation</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2.5 font-medium">
                      MESSAGE *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="State your archival requirements or appointment window..."
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-5 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-semibold rounded-xl hover:bg-black hover:text-white border border-white transition-all cursor-pointer shadow-lg"
                  >
                    TRANSMIT INQUIRY →
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: GLOBAL SHOWROOMS & INTERACTIVE MAP */}
        <section className="max-w-[1400px] mx-auto mb-28">
          <div className="text-center lg:text-left mb-8">
            <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-3 flex items-center justify-center lg:justify-start gap-2 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SECTION 02 / GLOBAL SHOWROOMS
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium uppercase tracking-tight">
              SANCTUARY LOCATIONS
            </h2>
          </div>

          {/* City Switcher Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
            {(Object.keys(showrooms) as Array<keyof typeof showrooms>).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedShowroom(key)}
                className={`px-6 py-3 rounded-full text-xs uppercase tracking-widest transition-all cursor-pointer font-mono ${
                  selectedShowroom === key
                    ? 'bg-white text-black font-semibold shadow-md hover:bg-black hover:text-white border border-white'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {showrooms[key].city}
              </button>
            ))}
          </div>

          {/* Selected City Spec Card & Map Container */}
          <div className="p-6 sm:p-10 lg:p-12 rounded-2xl bg-neutral-950 border border-neutral-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">LOCATION</span>
                <h3 className="text-2xl sm:text-3xl font-medium uppercase tracking-tight text-white mt-1">
                  {showrooms[selectedShowroom].city} — {showrooms[selectedShowroom].district}
                </h3>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">ADDRESS</span>
                <p className="text-neutral-300 text-sm sm:text-base mt-1 font-light">
                  {showrooms[selectedShowroom].address}
                </p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">HOURS</span>
                <p className="text-neutral-300 text-sm sm:text-base mt-1 font-light">
                  {showrooms[selectedShowroom].hours}
                </p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">DIRECT LINES</span>
                <p className="text-white text-base font-mono mt-1">
                  {showrooms[selectedShowroom].phone}
                </p>
                <p className="text-neutral-400 text-sm font-mono mt-0.5">
                  {showrooms[selectedShowroom].email}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => alert(`Redirecting to private booking for ${showrooms[selectedShowroom].city}...`)}
                  className="w-full sm:w-auto px-8 py-3.5 bg-neutral-900 border border-neutral-700 text-white text-xs uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all cursor-pointer font-medium"
                >
                  REQUEST FITTING AT {showrooms[selectedShowroom].city} →
                </button>
              </div>
            </div>

            {/* Interactive Dark Map Embed */}
            <div className="lg:col-span-6 h-[260px] sm:h-[320px] lg:h-[360px] rounded-xl overflow-hidden border border-neutral-800 relative bg-neutral-900 shadow-inner">
              <iframe
                title={`${showrooms[selectedShowroom].city} Sanctuary Location`}
                src={showrooms[selectedShowroom].mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(85%) hue-rotate(180deg)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-800 text-[10px] uppercase font-mono tracking-widest text-neutral-300 flex items-center gap-2 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{showrooms[selectedShowroom].city} SATELLITE MAP</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: PRIVATE APPOINTMENT PROTOCOL */}
        <section className="max-w-[1400px] mx-auto mb-28">
          <div className="text-center lg:text-left mb-12">
            <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-3 font-mono">
              SECTION 03 / PRIVATE PROTOCOL
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium uppercase tracking-tight">
              WHITE-GLOVE CONCIERGE PERKS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-neutral-900/50 border border-neutral-800 text-center lg:text-left">
              <div className="text-2xl text-neutral-400 mb-4 font-mono">✦ 01</div>
              <h3 className="text-xl font-medium uppercase tracking-tight mb-2 text-white">PRIVATE VAULT LOCKOUT</h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">
                Full sanctuary closure during your 90-minute fitting window with private access to unreleased prototype samples.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-neutral-900/50 border border-neutral-800 text-center lg:text-left">
              <div className="text-2xl text-neutral-400 mb-4 font-mono">✦ 02</div>
              <h3 className="text-xl font-medium uppercase tracking-tight mb-2 text-white">MASTER TAILOR ON SITE</h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">
                In-person consultation with senior atelier tailors for immediate pin-fitting and custom hardware customization.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-neutral-900/50 border border-neutral-800 text-center lg:text-left">
              <div className="text-2xl text-neutral-400 mb-4 font-mono">✦ 03</div>
              <h3 className="text-xl font-medium uppercase tracking-tight mb-2 text-white">ARMOURED GLOBAL SHIPPING</h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">
                Direct-to-residence or hotel door delivery via dedicated courier with climate-controlled protective casing.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: PROTOCOL FAQ ACCORDION */}
        <section className="max-w-[1400px] mx-auto">
          <div className="text-center lg:text-left mb-12">
            <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-3 font-mono">
              SECTION 04 / FREQUENTLY ASKED PROTOCOLS
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium uppercase tracking-tight">
              ORDER & FITTING FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center cursor-pointer hover:bg-neutral-900/60 transition-colors"
                >
                  <span className="text-lg sm:text-xl font-medium uppercase tracking-tight text-white">
                    {faq.q}
                  </span>
                  <span className="text-xl font-light text-neutral-400">
                    {expandedFaq === idx ? '−' : '+'}
                  </span>
                </button>

                {expandedFaq === idx && (
                  <div className="px-6 pb-6 text-sm text-neutral-400 font-light leading-relaxed border-t border-neutral-900 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Global Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
