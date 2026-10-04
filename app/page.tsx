"use client";

import React from "react";
import { CursorProvider } from "@/components/ui/CustomCursorContext";
import CursorFollower from "@/components/ui/CursorFollower";
import PageLoader from "@/components/ui/PageLoader";
import GridBackground from "@/components/ui/GridBackground";
import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import MetricsSection from "@/components/metrics/MetricsSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import SkillsSection from "@/components/skills/SkillsSection";
import PhilosophySection from "@/components/about/PhilosophySection";
import CurrentlySection from "@/components/currently/CurrentlySection";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <CursorProvider>
      <div className="relative min-h-screen bg-background text-text-primary selection:bg-white/20 selection:text-white overflow-x-hidden">
        {/* Editorial Page Loader */}
        <PageLoader />

        {/* Custom Magnetic Cursor Follower */}
        <CursorFollower />

        {/* Fine 1px Grid Guidelines & Atmosphere */}
        <GridBackground />

        {/* Navigation Header */}
        <Navbar />

        {/* Main Content Layout */}
        <main className="relative z-10 flex flex-col">
          <Hero />
          <MetricsSection />
          <ProjectsSection />
          <ExperienceSection />
          <SkillsSection />
          <PhilosophySection />
          <CurrentlySection />
          <ContactSection />
        </main>

        {/* Minimal Footer */}
        <Footer />
      </div>
    </CursorProvider>
  );
}
