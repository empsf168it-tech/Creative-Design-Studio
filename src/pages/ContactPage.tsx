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
      email: "tokyo@valence-archive.com"
    },
    paris: {
      city: "PARIS",
      district: "LE MARAIS ATELIER",
      address: "14 Rue Vieille du Temple, 75004 Paris",
      hours: "MON — SAT: 11:00 — 19:30",
      phone: "+33 1 42 68 90 10",
      email: "paris@valence-archive.com"
    },
    ny: {
      city: "NEW YORK",
      district: "SOHO SANCTUARY",
      address: "420 Broome Street, New York, NY 10013",
      hours: "MON — SUN: 11:00 — 19:00",
      phone: "+1 212 966 4080",
      email: "ny@valence-archive.com"
    },
    milan: {
      city: "MILAN",
      district: "QUADRILATERO STUDIO",
      address: "Via Montenapoleone 18, 20121 Milano",
      hours: "TUE — SAT: 10:30 — 19:00",
      phone: "+39 02 7600 3210",
      email: "milan@valence-archive.com"
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
          <div className="relative z-10 flex flex-wrap justify-between items-center gap-4 border-b border-white/10 pb-6">
            <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              VALENCE ® PRIVATE CONCIERGE & SANCTUARIES
            </div>
            <div className="text-xs font-mono tracking-widest text-neutral-400">
              GLOBAL ATELIERS — TOKYO • PARIS • NEW YORK • MILAN
            </div>
          </div>

          {/* MAIN HERO CONTENT ROW */}
          <div className="relative z-10 my-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
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
                <p className="mt-6 text-sm sm:text-base text-neutral-300 font-light max-w-2xl leading-relaxed">
                  Book a private 1-on-1 fitting session with our senior master tailors, request bespoke garment alterations, or inquire regarding custom private archive commissions.
                </p>
              </motion.div>
            </div>

            {/* RIGHT SIDE: SIGNATURE ANIMATED HERO CIRCLE BADGE (Home Page Hero Style) */}
            <div className="lg:col-span-4 flex lg:justify-end items-center">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
                {/* Outer Rotating Dashed Ring */}
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
                {/* Inner Ring & Glyph */}
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
          <div className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap justify-between items-center gap-6">
            <div className="flex items-center gap-8 font-mono text-xs text-neutral-400">
              <div>
                <span className="text-neutral-500 block text-[10px]">ATELIER STATUS</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> OPEN FOR APPOINTMENTS
                </span>
              </div>
              <div className="hidden sm:block border-l border-neutral-800 h-8" />
              <div className="hidden sm:block">
                <span className="text-neutral-500 block text-[10px]">RESPONSE PROTOCOL</span>
                <span className="text-white font-semibold">WITHIN 4 HOURS</span>
              </div>
            </div>

            <a
              href="#contact-form-section"
              className="px-8 py-3.5 bg-white text-black text-xs uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-neutral-200 transition-colors"
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
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                SECTION 01 / DIRECT CONCIERGE
              </div>
              <h1 className="text-5xl sm:text-7xl font-medium tracking-tight uppercase leading-[0.95] mb-6">
                ATELIER <span className="text-neutral-500 font-light">INQUIRY</span>
              </h1>
              <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed mb-8">
                For archive reservations, bespoke consultations, private fitting bookings, or press inquiries, transmit a message directly to our Tokyo headquarters concierge.
              </p>
              <div className="space-y-4 text-sm font-mono text-neutral-400 border-t border-neutral-800 pt-8">
                <div className="flex justify-between border-b border-neutral-900 pb-2">
                  <span className="text-neutral-500">GENERAL INQUIRIES:</span>
                  <span className="text-white">CONCIERGE@VALENCE-ARCHIVE.COM</span>
                </div>
                <div className="flex justify-between border-b border-neutral-900 pb-2">
                  <span className="text-neutral-500">PRESS & EDITORIAL:</span>
                  <span className="text-white">PRESS@VALENCE-ARCHIVE.COM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">PRIVATE VAULT DIRECT:</span>
                  <span className="text-white">+81 3 5537 8000</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-neutral-950 p-8 sm:p-12 rounded-2xl border border-neutral-800">
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2 font-medium">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Kenji Sato"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2 font-medium">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2 font-medium">
                      INQUIRY TYPE
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white transition-colors"
                    >
                      <option value="Private Client Inquiry">Private Client Inquiry</option>
                      <option value="Archive Drop Reservation">Archive Drop Reservation</option>
                      <option value="Sanctuary Fitting Appointment">Sanctuary Fitting Appointment</option>
                      <option value="Press & Media Accreditation">Press & Media Accreditation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2 font-medium">
                      MESSAGE *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="State your archival requirements or appointment window..."
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-medium rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    TRANSMIT INQUIRY →
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: GLOBAL SHOWROOMS */}
        <section className="max-w-[1400px] mx-auto mb-28">
          <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
            SECTION 02 / GLOBAL SHOWROOMS
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium uppercase tracking-tight mb-8">
            SANCTUARY LOCATIONS
          </h2>

          {/* City Switcher Buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            {(Object.keys(showrooms) as Array<keyof typeof showrooms>).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedShowroom(key)}
                className={`px-6 py-3 rounded-full text-xs uppercase tracking-widest transition-all cursor-pointer ${
                  selectedShowroom === key
                    ? 'bg-white text-black font-semibold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {showrooms[key].city}
              </button>
            ))}
          </div>

          {/* Selected City Spec Card */}
          <div className="p-8 sm:p-12 rounded-2xl bg-neutral-950 border border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-500">LOCATION</span>
                <h3 className="text-3xl font-medium uppercase tracking-tight text-white mt-1">
                  {showrooms[selectedShowroom].city} — {showrooms[selectedShowroom].district}
                </h3>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-500">ADDRESS</span>
                <p className="text-neutral-300 text-base mt-1 font-light">
                  {showrooms[selectedShowroom].address}
                </p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-500">HOURS</span>
                <p className="text-neutral-300 text-base mt-1 font-light">
                  {showrooms[selectedShowroom].hours}
                </p>
              </div>
            </div>

            <div className="space-y-6 md:border-l md:border-neutral-800 md:pl-8 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-500">DIRECT LINES</span>
                <p className="text-white text-lg font-mono mt-1">
                  {showrooms[selectedShowroom].phone}
                </p>
                <p className="text-neutral-400 text-sm font-mono mt-1">
                  {showrooms[selectedShowroom].email}
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => alert(`Redirecting to private booking for ${showrooms[selectedShowroom].city}...`)}
                  className="w-full py-4 bg-neutral-900 border border-neutral-700 text-white text-xs uppercase tracking-widest rounded-lg hover:bg-white hover:text-black transition-all cursor-pointer"
                >
                  REQUEST FITTING AT {showrooms[selectedShowroom].city} →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: PRIVATE APPOINTMENT PROTOCOL */}
        <section className="max-w-[1400px] mx-auto mb-28">
          <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
            SECTION 03 / PRIVATE PROTOCOL
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium uppercase tracking-tight mb-12">
            WHITE-GLOVE CONCIERGE PERKS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-neutral-900/50 border border-neutral-800">
              <div className="text-2xl text-neutral-400 mb-4">✦ 01</div>
              <h3 className="text-xl font-medium uppercase tracking-tight mb-2">PRIVATE VAULT LOCKOUT</h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">
                Full sanctuary closure during your 90-minute fitting window with private access to unreleased prototype samples.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-neutral-900/50 border border-neutral-800">
              <div className="text-2xl text-neutral-400 mb-4">✦ 02</div>
              <h3 className="text-xl font-medium uppercase tracking-tight mb-2">MASTER TAILOR ON SITE</h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">
                In-person consultation with senior atelier tailors for immediate pin-fitting and custom hardware customization.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-neutral-900/50 border border-neutral-800">
              <div className="text-2xl text-neutral-400 mb-4">✦ 03</div>
              <h3 className="text-xl font-medium uppercase tracking-tight mb-2">ARMOURED GLOBAL SHIPPING</h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">
                Direct-to-residence or hotel door delivery via dedicated courier with climate-controlled protective casing.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: PROTOCOL FAQ ACCORDION */}
        <section className="max-w-[1400px] mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
            SECTION 04 / FREQUENTLY ASKED PROTOCOLS
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium uppercase tracking-tight mb-12">
            ORDER & FITTING FAQ
          </h2>

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
