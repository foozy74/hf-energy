'use client';

import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { EcosystemDiagram } from '../components/EcosystemDiagram';
import { CorePillars } from '../components/CorePillars';
import { SavingsCalculator } from '../components/SavingsCalculator';
import { CommunityBenefits } from '../components/CommunityBenefits';
import { LocationStory } from '../components/LocationStory';
import { FAQSection } from '../components/FAQSection';
import { JoinForm } from '../components/JoinForm';
import { Footer } from '../components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-forest-950 text-offwhite font-sans selection:bg-lime selection:text-forest-950">
      {/* Sticky CleanTech Header */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Core Ecosystem Diagram (Interactive 4-node simulation) */}
      <EcosystemDiagram />

      {/* 3 Core Pillars (From Buildings to Energy Cells) */}
      <CorePillars />

      {/* Interactive Resilience & Savings Calculator */}
      <SavingsCalculator />

      {/* Multi-Stakeholder Value Proposition */}
      <CommunityBenefits />

      {/* Project & Quarter Location Story (Hertha-Firnberg-Straße / Wienerbergcity) */}
      <LocationStory />

      {/* FAQ Section */}
      <FAQSection />

      {/* Pre-Registration & Inquiry Form */}
      <JoinForm />

      {/* Footer */}
      <Footer />
    </main>
  );
}
