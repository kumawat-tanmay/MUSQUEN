"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight,
  Target,
  Megaphone,
  Laptop,
  Mail,
  PhoneCall,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import ProjectConveyor from "@/components/about/ProjectConveyor";

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function AboutAndServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const conveyorWrapperRef = useRef<HTMLDivElement>(null);
  const servicesHeaderRef = useRef<HTMLDivElement>(null);
  const servicesCardsRef = useRef<HTMLDivElement>(null);
  const aboutLeftRef = useRef<HTMLDivElement>(null);

  const [presentProgress, setPresentProgress] = useState<number>(0);
  const [isWidescreen, setIsWidescreen] = useState<boolean>(false);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // ScrollTrigger: Transition from 50/50 About into Colossal Widescreen Services Showcase
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 20%",
        end: "bottom 80%",
        onUpdate: (self) => {
          const p = self.progress;
          // Interpolate present progress from 0 (About 3D angle) to 1 (Services straight widescreen)
          // Threshold around 35% scroll depth
          const morph = Math.max(0, Math.min(1, (p - 0.2) / 0.5));
          setPresentProgress(morph);
          setIsWidescreen(p > 0.35);
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* ------------------------------------------------------------- */}
      {/* 1. ABOUT SECTION ANCHOR & 50/50 EXPERIENCE                    */}
      {/* ------------------------------------------------------------- */}
      <section
        id="about"
        className="pt-28 sm:pt-36 pb-16 px-6 max-w-7xl mx-auto border-t border-white/[0.08] w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column (50%): Real Musquen Media Manifesto & Animated Contact Hubs */}
          <div
            ref={aboutLeftRef}
            className="flex flex-col justify-center transition-all duration-500"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--emerald-light)]">
              About Musquen Media
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mt-3 text-[#f2ede6] tracking-tight leading-[1.08]">
              Engineering Exponential Brand Velocity
            </h2>
            <p className="mt-6 text-zinc-400 leading-relaxed text-base font-light">
              We combine precision performance media buying, viral social loops, and bespoke 60 FPS
              immersive web architectures to position your brand at the center of industry gravity.
            </p>

            {/* Real Interactive Contact Hub: Exactly 2 Lines (2x2 Grid) with Official Brand Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-8 pt-8 border-t border-white/[0.08]">
              {/* Line 1 - Card 1: Official Instagram Brand Gradient */}
              <a
                href="https://www.instagram.com/musqenmedia/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#dc2743]/60 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#dc2743]/25 group-hover:scale-105 group-hover:rotate-6 transition-transform duration-300">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] sm:text-[11px] text-zinc-400 font-mono uppercase tracking-wider">
                      Instagram
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#f2ede6] group-hover:text-white transition-colors truncate">
                      @musqenmedia
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
              </a>

              {/* Line 1 - Card 2: Official Direct Email (Gmail Red) */}
              <a
                href="mailto:musqenmedia@gmail.com"
                className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#EA4335]/60 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#EA4335]/15 text-[#EA4335] border border-[#EA4335]/30 flex items-center justify-center shrink-0 shadow-md shadow-[#EA4335]/20 group-hover:scale-105 group-hover:-rotate-6 transition-transform duration-300">
                    <Mail className="w-5 h-5 animate-bounce" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] sm:text-[11px] text-zinc-400 font-mono uppercase tracking-wider">
                      Direct Email
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#f2ede6] group-hover:text-white transition-colors truncate">
                      musqenmedia@gmail.com
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
              </a>

              {/* Line 2 - Card 3: Official Direct Call */}
              <a
                href="tel:+919079454032"
                className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#22C55E]/60 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 flex items-center justify-center shrink-0 shadow-md shadow-[#22C55E]/20 group-hover:scale-105 transition-transform duration-300">
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22C55E]" />
                    </span>
                    <PhoneCall className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] sm:text-[11px] text-zinc-400 font-mono uppercase tracking-wider">
                      Direct Call
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#f2ede6] group-hover:text-white transition-colors truncate">
                      +91 90794 54032
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
              </a>

              {/* Line 2 - Card 4: Official WhatsApp Green */}
              <a
                href="https://wa.me/919079454032"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#25D366]/60 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/35 flex items-center justify-center shrink-0 shadow-md shadow-[#25D366]/25 group-hover:scale-105 transition-transform duration-300">
                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] sm:text-[11px] text-zinc-400 font-mono uppercase tracking-wider">
                      WhatsApp
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#f2ede6] group-hover:text-white transition-colors truncate">
                      Chat on WhatsApp
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
              </a>
            </div>
          </div>

          {/* Right Column (50%): Angled 3D Conveyor (Initial State) */}
          <div className="w-full flex items-center justify-center">
            {!isWidescreen && (
              <ProjectConveyor
                presentProgress={presentProgress}
                heightClass="h-[520px] sm:h-[600px] lg:h-[660px]"
              />
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. SERVICES SHOWCASE: WIDESCREEN CONVEYOR EXPANSION           */}
      {/* ------------------------------------------------------------- */}
      <section
        id="services"
        className="pt-16 pb-32 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/[0.08] w-full"
      >
        {/* Services Showcase Header */}
        <div ref={servicesHeaderRef} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--emerald-subtle)] text-[var(--emerald-light)] text-xs font-bold uppercase tracking-[0.2em] mb-3 border border-[var(--emerald-brand)]/20">
            <Sparkles className="w-3.5 h-3.5" />
            Core Verticals & Live Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl font-black mt-2 text-[#f2ede6] tracking-tight">
            Integrated Solutions Built for Scale
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-light max-w-2xl mx-auto">
            Drag, swipe, or scroll through our live WebGL reel to explore our high-ROAS Meta
            ad architectures, viral short-form loops, and bespoke 60 FPS web systems.
          </p>
        </div>

        {/* The Widescreen 3D Conveyor Showcase (Screen-Wider Presentation View) */}
        <div
          ref={conveyorWrapperRef}
          className="relative w-full max-w-6xl mx-auto my-4 transition-all duration-700 ease-out"
        >
          <ProjectConveyor
            presentProgress={Math.max(0.65, presentProgress || 1)}
            heightClass="h-[580px] sm:h-[700px] lg:h-[800px]"
          />
        </div>

        {/* Core Vertical Feature Cards Directly Beneath Showcase */}
        <div
          ref={servicesCardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto"
        >
          {/* Meta Ads Card */}
          <div
            id="services-meta-ads"
            className="group relative p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-[var(--emerald-brand)]/50 hover:bg-white/[0.05] shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[var(--emerald-brand)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-[var(--emerald-subtle)] text-[var(--emerald-light)] flex items-center justify-center mb-6 border border-[var(--emerald-brand)]/30">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="relative z-10 text-xl font-bold text-[#f2ede6]">Meta Ads</h3>
            <p className="relative z-10 mt-3 text-sm text-zinc-400 leading-relaxed font-light">
              Laser-focused audience targeting, creative testing engines, and attribution
              modeling to maximize ROAS.
            </p>
          </div>

          {/* SMM Card */}
          <div
            id="services-smm"
            className="group relative p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-[var(--emerald-brand)]/50 hover:bg-white/[0.05] shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[var(--emerald-brand)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-[var(--emerald-subtle)] text-[var(--emerald-light)] flex items-center justify-center mb-6 border border-[var(--emerald-brand)]/30">
              <Megaphone className="w-7 h-7" />
            </div>
            <h3 className="relative z-10 text-xl font-bold text-[#f2ede6]">
              Social Media Marketing
            </h3>
            <p className="relative z-10 mt-3 text-sm text-zinc-400 leading-relaxed font-light">
              Viral short-form content, consistent community cultivation, and
              high-engagement social branding.
            </p>
          </div>

          {/* Web Dev Card */}
          <div
            id="services-webdev"
            className="group relative p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-[var(--emerald-brand)]/50 hover:bg-white/[0.05] shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[var(--emerald-brand)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-[var(--emerald-subtle)] text-[var(--emerald-light)] flex items-center justify-center mb-6 border border-[var(--emerald-brand)]/30">
              <Laptop className="w-7 h-7" />
            </div>
            <h3 className="relative z-10 text-xl font-bold text-[#f2ede6]">
              Website Development
            </h3>
            <p className="relative z-10 mt-3 text-sm text-zinc-400 leading-relaxed font-light">
              Ultra-fast Next.js architecture, Lenis smooth scrolling, WebGL interactive
              micro-interactions, and conversion-optimized flow.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
