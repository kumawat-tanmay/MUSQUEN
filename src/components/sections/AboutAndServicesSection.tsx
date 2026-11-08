"use client";

import React, { useRef } from "react";
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
import ProjectConveyor, {
  ProjectConveyorHandle,
} from "@/components/about/ProjectConveyor";

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
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const conveyorHolderRef = useRef<HTMLDivElement>(null);
  const servicesHeaderRef = useRef<HTMLDivElement>(null);
  const servicesCardsRef = useRef<HTMLDivElement>(null);
  const conveyorRef = useRef<ProjectConveyorHandle>(null);

  useGSAP(
    () => {
      const pinStage = pinnedStageRef.current;
      const aboutText = aboutTextRef.current;
      const conveyorHolder = conveyorHolderRef.current;
      const servicesHeader = servicesHeaderRef.current;
      const servicesCards = servicesCardsRef.current;
      const conveyor = conveyorRef.current;

      if (!pinStage || !aboutText || !conveyorHolder) return;

      const mm = gsap.matchMedia();

      // Desktop & Tablet (min-width: 1024px): Seamless Pinned Morph from About 50/50 to Full-Width Services
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinSectionRef.current,
            start: "top top",
            end: "+=160%",
            pin: pinStage,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
              // Interpolate camera straight-on presentation directly inside WebGL from 0 to 1
              conveyor?.setPresent(self.progress);
            },
          },
        });

        // 1. Fade out About text to the left
        tl.to(
          aboutText,
          {
            opacity: 0,
            x: -80,
            scale: 0.96,
            pointerEvents: "none",
            duration: 0.45,
            ease: "power2.inOut",
          },
          0
        );

        // 2. Expand the 3D conveyor holder from 50% width to 100% full width
        tl.to(
          conveyorHolder,
          {
            width: "100%",
            maxWidth: "100%",
            duration: 0.55,
            ease: "power2.inOut",
            onUpdate: () => {
              conveyor?.resize();
            },
          },
          0.05
        );

        // 3. Fade in Services Header above the expanded conveyor
        tl.to(
          servicesHeader,
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 0.35,
            ease: "power2.out",
          },
          0.35
        );

        // 4. Fade in Services Feature Cards below the expanded conveyor
        tl.to(
          servicesCards,
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 0.35,
            ease: "power2.out",
          },
          0.45
        );
      });

      // Mobile / Stacked Screens (< 1024px): Clean natural flow with scroll-linked un-tilt
      mm.add("(max-width: 1023px)", () => {
        ScrollTrigger.create({
          trigger: conveyorHolder,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 1,
          onUpdate: (self) => {
            conveyor?.setPresent(self.progress);
          },
        });

        if (servicesHeader && servicesCards) {
          gsap.set([servicesHeader, servicesCards], {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
          });
        }
      });
    },
    { scope: pinSectionRef }
  );

  return (
    <div ref={pinSectionRef} className="relative w-full overflow-hidden bg-black">
      {/* Anchor targets so navbar navigation works seamlessly */}
      <div id="about" className="absolute top-0 -mt-20 pointer-events-none" />
      <div id="services" className="absolute top-[45%] -mt-20 pointer-events-none" />

      {/* Pinned Stage Container */}
      <div
        ref={pinnedStageRef}
        className="w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 py-12 relative overflow-hidden"
      >
        {/* Services Showcase Header (Overlaid, fades in as conveyor widens) */}
        <div
          ref={servicesHeaderRef}
          className="text-center max-w-3xl mx-auto mb-6 opacity-0 pointer-events-none translate-y-[-20px] transition-transform duration-300"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--emerald-subtle)] text-[var(--emerald-light)] text-xs font-bold uppercase tracking-[0.2em] mb-2 border border-[var(--emerald-brand)]/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Core Verticals & Live Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#f2ede6] tracking-tight">
            Integrated Solutions Built for Scale
          </h2>
          <p className="mt-2 text-zinc-400 text-xs sm:text-sm font-light max-w-xl mx-auto">
            Drag or swipe through our live 3D showcase to explore our Meta Ads architectures,
            viral short-form loops, and bespoke 60 FPS web systems.
          </p>
        </div>

        {/* The Interactive Centerpiece: Flex Container with About Text on Left and Conveyor on Right */}
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative">
          {/* Left Column (About Narrative & 2x2 Official Contact Cards) */}
          <div
            ref={aboutTextRef}
            className="w-full lg:w-1/2 flex flex-col justify-center shrink-0 transition-transform"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--emerald-light)]">
              About Musquen Media
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mt-3 text-[#f2ede6] tracking-tight leading-[1.08]">
              Engineering Exponential Brand Velocity
            </h2>
            <p className="mt-4 text-zinc-400 leading-relaxed text-sm sm:text-base font-light">
              We combine precision performance media buying, viral social loops, and bespoke 60 FPS
              immersive web architectures to position your brand at the center of industry gravity.
            </p>

            {/* Real Interactive Contact Hub: Exactly 2 Lines (2x2 Grid) with Official Brand Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/[0.08]">
              {/* Line 1 - Card 1: Official Instagram Brand Gradient */}
              <a
                href="https://www.instagram.com/musqenmedia/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#dc2743]/60 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#dc2743]/25 group-hover:scale-105 group-hover:rotate-6 transition-transform duration-300">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                      Instagram
                    </span>
                    <span className="text-xs font-bold text-[#f2ede6] group-hover:text-white transition-colors truncate">
                      @musqenmedia
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
              </a>

              {/* Line 1 - Card 2: Official Direct Email (Gmail Red) */}
              <a
                href="mailto:musqenmedia@gmail.com"
                className="group flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#EA4335]/60 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#EA4335]/15 text-[#EA4335] border border-[#EA4335]/30 flex items-center justify-center shrink-0 shadow-md shadow-[#EA4335]/20 group-hover:scale-105 group-hover:-rotate-6 transition-transform duration-300">
                    <Mail className="w-4 h-4 animate-bounce" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                      Direct Email
                    </span>
                    <span className="text-xs font-bold text-[#f2ede6] group-hover:text-white transition-colors truncate">
                      musqenmedia@gmail.com
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
              </a>

              {/* Line 2 - Card 3: Official Direct Call */}
              <a
                href="tel:+919079454032"
                className="group flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#22C55E]/60 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-9 h-9 rounded-xl bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 flex items-center justify-center shrink-0 shadow-md shadow-[#22C55E]/20 group-hover:scale-105 transition-transform duration-300">
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
                    </span>
                    <PhoneCall className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                      Direct Call
                    </span>
                    <span className="text-xs font-bold text-[#f2ede6] group-hover:text-white transition-colors truncate">
                      +91 90794 54032
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
              </a>

              {/* Line 2 - Card 4: Official WhatsApp Green */}
              <a
                href="https://wa.me/919079454032"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#25D366]/60 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/35 flex items-center justify-center shrink-0 shadow-md shadow-[#25D366]/25 group-hover:scale-105 transition-transform duration-300">
                    <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                      WhatsApp
                    </span>
                    <span className="text-xs font-bold text-[#f2ede6] group-hover:text-white transition-colors truncate">
                      Chat on WhatsApp
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
              </a>
            </div>
          </div>

          {/* Right Column: The ONE Single Persistent 3D Conveyor (Widening on Scroll) */}
          <div
            ref={conveyorHolderRef}
            className="w-full lg:w-1/2 flex items-center justify-center relative z-10"
          >
            <ProjectConveyor
              ref={conveyorRef}
              initialPresent={0}
              heightClass="h-[520px] sm:h-[620px] lg:h-[680px]"
            />
          </div>
        </div>

        {/* Services Feature Cards (Fades in below the expanded conveyor) */}
        <div
          ref={servicesCardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 max-w-6xl mx-auto opacity-0 pointer-events-none translate-y-[20px] transition-transform duration-300 w-full"
        >
          {/* Meta Ads Card */}
          <div className="group relative p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-[var(--emerald-brand)]/50 hover:bg-white/[0.05] shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[var(--emerald-brand)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative z-10 w-12 h-12 rounded-2xl bg-[var(--emerald-subtle)] text-[var(--emerald-light)] flex items-center justify-center mb-5 border border-[var(--emerald-brand)]/30">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="relative z-10 text-lg font-bold text-[#f2ede6]">Meta Ads</h3>
            <p className="relative z-10 mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              Laser-focused audience targeting, creative testing engines, and attribution modeling to maximize ROAS.
            </p>
          </div>

          {/* SMM Card */}
          <div className="group relative p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-[var(--emerald-brand)]/50 hover:bg-white/[0.05] shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[var(--emerald-brand)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative z-10 w-12 h-12 rounded-2xl bg-[var(--emerald-subtle)] text-[var(--emerald-light)] flex items-center justify-center mb-5 border border-[var(--emerald-brand)]/30">
              <Megaphone className="w-6 h-6" />
            </div>
            <h3 className="relative z-10 text-lg font-bold text-[#f2ede6]">
              Social Media Marketing
            </h3>
            <p className="relative z-10 mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              Viral short-form content, consistent community cultivation, and high-engagement social branding.
            </p>
          </div>

          {/* Web Dev Card */}
          <div className="group relative p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-[var(--emerald-brand)]/50 hover:bg-white/[0.05] shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[var(--emerald-brand)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative z-10 w-12 h-12 rounded-2xl bg-[var(--emerald-subtle)] text-[var(--emerald-light)] flex items-center justify-center mb-5 border border-[var(--emerald-brand)]/30">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="relative z-10 text-lg font-bold text-[#f2ede6]">
              Website Development
            </h3>
            <p className="relative z-10 mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              Ultra-fast Next.js architecture, Lenis smooth scrolling, WebGL interactive micro-interactions, and conversion flow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
