"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Target,
  Megaphone,
  Laptop,
  Mail,
  PhoneCall,
  MessageCircle,
  Sparkles,
  CheckCircle2,
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
  return (
    <div className="relative w-full bg-black text-[#f2ede6]">
      {/* =========================================================================
          SECTION 1: ABOUT MUSQUEN MEDIA (50/50 Split Layout)
          Left: Agency Narrative & 2x2 Official Contact Grid
          Right: 3D Angled Conveyor Scroller
         ========================================================================= */}
      <section
        id="about"
        className="py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/[0.08] w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column (lg:col-span-6): Narrative & 2x2 Official Brand Contacts */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--emerald-light)]">
              About Musquen Media
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mt-3 text-[#f2ede6] tracking-tight leading-[1.08]">
              Engineering Exponential Brand Velocity
            </h2>
            <p className="mt-5 text-zinc-400 leading-relaxed text-sm sm:text-base font-light">
              We are an elite digital growth and creative technology firm engineered to position
              your brand at the center of industry gravity.
            </p>
            <p className="mt-3 text-zinc-400 leading-relaxed text-sm font-light">
              By uniting high-precision algorithmic media buying, viral social loop architecture,
              and bespoke 60 FPS immersive web systems, we systematically convert attention into
              sustainable enterprise scale.
            </p>

            {/* Performance Metric Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/[0.08]">
              <div>
                <span className="text-xl sm:text-2xl font-black text-[#f2ede6] font-mono">$25M+</span>
                <p className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider mt-0.5">Ad Spend Scaled</p>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-[var(--emerald-light)] font-mono">4.2x</span>
                <p className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider mt-0.5">Average ROAS</p>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-[#f2ede6] font-mono">60 FPS</span>
                <p className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider mt-0.5">Bespoke Systems</p>
              </div>
            </div>

            {/* Interactive Contact Hub: Exactly 2 Lines (2x2 Grid) with Official Brand Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 pt-6 border-t border-white/[0.08]">
              {/* Line 1 - Card 1: Official Instagram Brand Gradient */}
              <a
                href="https://www.instagram.com/musqenmedia/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#dc2743]/60 hover:bg-white/[0.06] transition-all duration-300"
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
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#EA4335]/60 hover:bg-white/[0.06] transition-all duration-300"
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
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#22C55E]/60 hover:bg-white/[0.06] transition-all duration-300"
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
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#25D366]/60 hover:bg-white/[0.06] transition-all duration-300"
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

          {/* Right Column (lg:col-span-6): Interactive 3D Conveyor (Angled Isometric View) */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <ProjectConveyor
              initialPresent={0}
              heightClass="h-[480px] sm:h-[580px] lg:h-[640px]"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SERVICES SHOWCASE (#services)
          Header + WIDESCREEN 3D CONVEYOR SHOWCASE (Straight-On Presentation Mode)
          + 3 Core Verticals Cards (Meta Ads, Social Media Marketing, Web Dev)
         ========================================================================= */}
      <section
        id="services"
        className="relative py-28 sm:py-36 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/[0.08] w-full"
      >
        {/* Ambient Emerald Glow in Background */}
        <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top,rgba(87,149,126,0.12)_0%,transparent_70%)]" />

        {/* Section Header (Always 100% visible, fully rendered) */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--emerald-subtle)] text-[var(--emerald-light)] text-xs font-bold uppercase tracking-[0.2em] mb-3 border border-[var(--emerald-brand)]/25 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Core Verticals & Live Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#f2ede6] tracking-tight">
            Integrated Solutions Built for Scale
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Drag, swipe, or scroll through our live 3D showcase below to explore our Meta Ads
            attribution engines, viral short-form ecosystems, and bespoke 60 FPS web architectures.
          </p>
        </div>

        {/* =========================================================================
            THE WIDESCREEN 3D CONVEYOR SHOWCASE
            Spans widescreen (max-w-6xl mx-auto) in straight-on presentation view (present = 1.0)
            Matching Shakuro's live showcase view!
           ========================================================================= */}
        <div className="w-full max-w-6xl mx-auto mb-16 sm:mb-20">
          <ProjectConveyor
            initialPresent={1}
            heightClass="h-[520px] sm:h-[620px] lg:h-[680px]"
          />
        </div>

        {/* =========================================================================
            3 CORE VERTICALS FEATURE CARDS
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
          {/* Card 1: Meta Ads */}
          <div className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-[var(--emerald-brand)]/50 hover:bg-white/[0.05] shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[var(--emerald-brand)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div>
              <div className="relative z-10 w-12 h-12 rounded-2xl bg-[var(--emerald-subtle)] text-[var(--emerald-light)] flex items-center justify-center mb-6 border border-[var(--emerald-brand)]/30">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="relative z-10 text-xl font-bold text-[#f2ede6]">Meta Ads Engineering</h3>
              <p className="relative z-10 mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                Laser-focused audience targeting, creative testing engines, and server-side attribution
                modeling engineered to maximize ROAS at scale.
              </p>

              <div className="mt-6 space-y-2 relative z-10">
                {[
                  "Algorithmic Media Buying",
                  "First-Party Conversion API",
                  "Automated Creative Testing Matrices",
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--emerald-light)] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] relative z-10">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--emerald-light)] hover:text-white transition-colors"
              >
                <span>Scale Paid Acquisition</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Social Media Marketing */}
          <div className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-[var(--emerald-brand)]/50 hover:bg-white/[0.05] shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[var(--emerald-brand)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div>
              <div className="relative z-10 w-12 h-12 rounded-2xl bg-[var(--emerald-subtle)] text-[var(--emerald-light)] flex items-center justify-center mb-6 border border-[var(--emerald-brand)]/30">
                <Megaphone className="w-6 h-6" />
              </div>
              <h3 className="relative z-10 text-xl font-bold text-[#f2ede6]">
                Social Media Marketing
              </h3>
              <p className="relative z-10 mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                High-velocity short-form loops, organic reach engines, and community cultivation
                engineered to turn passive viewers into brand advocates.
              </p>

              <div className="mt-6 space-y-2 relative z-10">
                {[
                  "Viral Short-Form Video Production",
                  "Omnichannel Distribution Strategy",
                  "Active Community & Follower Growth",
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--emerald-light)] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] relative z-10">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--emerald-light)] hover:text-white transition-colors"
              >
                <span>Amplify Brand Reach</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Website Development */}
          <div className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-[var(--emerald-brand)]/50 hover:bg-white/[0.05] shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[var(--emerald-brand)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div>
              <div className="relative z-10 w-12 h-12 rounded-2xl bg-[var(--emerald-subtle)] text-[var(--emerald-light)] flex items-center justify-center mb-6 border border-[var(--emerald-brand)]/30">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="relative z-10 text-xl font-bold text-[#f2ede6]">
                Full-Stack Web Development
              </h3>
              <p className="relative z-10 mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                Bespoke 60 FPS WebGL engineering, ultra-fast Next.js architecture, Lenis smooth
                scrolling, and high-conversion landing systems.
              </p>

              <div className="mt-6 space-y-2 relative z-10">
                {[
                  "60 FPS WebGL Interactive Shaders",
                  "Zero-Lag Smooth Scroll Architecture",
                  "High-Converting Funnel Engineering",
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--emerald-light)] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] relative z-10">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--emerald-light)] hover:text-white transition-colors"
              >
                <span>Build Modern Web Experience</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
