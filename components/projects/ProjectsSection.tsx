"use client";

import React, { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects, Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="relative py-28 md:py-36 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading
          number="02"
          category="FEATURED ARCHITECTURES"
          title="SELECTED WORK"
          subtitle="Systems, products, and experiments built across full-stack engineering and artificial intelligence."
        />

        {/* 12-Column Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {projects.map((proj, idx) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onSelect={setSelectedProject}
              index={idx}
            />
          ))}
        </div>

        {/* Project Case Study Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
