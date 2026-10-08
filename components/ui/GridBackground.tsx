"use client";

import React from "react";
import ParticleStarfield from "./ParticleStarfield";

export default function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Particle Starfield (Crisp White Ambient Stars) */}
      <ParticleStarfield />

      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-white/[0.035] to-transparent rounded-full blur-3xl" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/[0.015] to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-gradient-to-tr from-sky-500/[0.015] to-transparent rounded-full blur-3xl" />

      {/* 1px Editorial Vertical Guide Lines */}
      <div className="max-w-7xl mx-auto h-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 px-6 sm:px-10 lg:px-16 border-x border-white/[0.03]">
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={i}
            className="h-full border-r border-white/[0.025] hidden lg:block"
          />
        ))}
      </div>

      {/* Fine Horizontal Grid Lines Pattern */}
      <div className="absolute inset-0 grid-lines-pattern opacity-40" />

      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-30" />

    </div>
  );
}
