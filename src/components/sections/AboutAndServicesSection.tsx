"use client";

import React, { useRef, useState, useEffect } from "react";
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
  CheckCircle2,
} from "lucide-react";
import ProjectConveyor, {
  ProjectConveyorHandle,
} from "@/components/about/ProjectConveyor";
import { reelSlides } from "@/data/reelSlides";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// =========================================================================
// TUNABLE CONSTANTS (Easily tweak dimensions, timing, and feel here)
// =========================================================================
export const PIN_SCROLL_HEIGHT = 80; // vh per Services slide during pin
export const TRANSITION_EASE = "power2.inOut"; // Easing for About -> Services travel
export const SCRUB = 0.8; // Scrub smoothing (0.6 - 1.0)
export const MAX_WIDESCREEN_WIDTH = 1360; // Max width in pixels (or 90vw)
export const TILT_ANGLES = {
  present0: 0.0, // 0.0 = full 3D isometric tilt (About view)
  present1: 1.0, // 1.0 = straight-on widescreen presentation (Services view)
};
export const MOBILE_BREAKPOINT = 768; // Screen width threshold for mobile layout

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

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function AboutAndServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const startSlotRef = useRef<HTMLDivElement>(null);
  const stageWrapperRef = useRef<HTMLDivElement>(null);
  const endSlotRef = useRef<HTMLDivElement>(null);
  const scrollerLayerRef = useRef<HTMLDivElement>(null);
  const conveyorRef = useRef<ProjectConveyorHandle>(null);

  // HUD state during pinned Phase 3
  const servicesSlides = reelSlides.filter((s) => s.section === "services");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [hudVisible, setHudVisible] = useState(false);

  // Coordinate references
  const startDocRect = useRef({ width: 500, height: 600, centerX: 0, centerY: 0 });
  const endPinnedViewportRect = useRef({ width: 1200, height: 650, centerX: 0, centerY: 0 });
  const travelProgressRef = useRef(0);
  const pinEndScrollRef = useRef(0);
  const isReducedMotionRef = useRef(false);

  useGSAP(
    () => {
      const startSlot = startSlotRef.current;
      const stageWrapper = stageWrapperRef.current;
      const endSlot = endSlotRef.current;
      const scrollerLayer = scrollerLayerRef.current;
      const conveyor = conveyorRef.current;

      if (!startSlot || !stageWrapper || !endSlot || !scrollerLayer) return;

      isReducedMotionRef.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const easeFunc = gsap.parseEase(TRANSITION_EASE);

      // ---------------------------------------------------------------------
      // Rect Caching: Run on init and every ScrollTrigger.refresh()
      // ---------------------------------------------------------------------
      const cacheRects = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        const startR = startSlot.getBoundingClientRect();
        const endR = endSlot.getBoundingClientRect();
        const stageR = stageWrapper.getBoundingClientRect();

        // 1. Document coordinates of startSlot in About
        startDocRect.current = {
          width: startR.width,
          height: startR.height,
          centerX: startR.left + startR.width / 2,
          centerY: startR.top + scrollY + startR.height / 2,
        };

        // 2. Viewport coordinates of endSlot when stageWrapper top is at 0
        endPinnedViewportRect.current = {
          width: endR.width,
          height: endR.height,
          centerX: endR.left + endR.width / 2,
          centerY: endR.top - stageR.top + endR.height / 2,
        };

        // Size the base layer to match startSlot base size
        if (scrollerLayer) {
          scrollerLayer.style.width = `${startR.width}px`;
          scrollerLayer.style.height = `${startR.height}px`;
        }

        conveyor?.resize(startR.width, startR.height);
      };

      cacheRects();
      ScrollTrigger.addEventListener("refresh", cacheRects);

      // ---------------------------------------------------------------------
      // Update Scroller Transform (Translate3d + Scale ONLY, 60 FPS)
      // ---------------------------------------------------------------------
      const updateScrollerTransform = () => {
        if (!scrollerLayer) return;

        const currentScrollY = window.scrollY || window.pageYOffset;

        // If reduced motion, keep static
        if (isReducedMotionRef.current) {
          const startR = startSlot.getBoundingClientRect();
          scrollerLayer.style.transform = `translate3d(${startR.left}px, ${startR.top}px, 0) scale(1, 1)`;
          return;
        }

        const easeP = easeFunc(travelProgressRef.current);

        // Start center in current viewport:
        const startViewportCenterX = startDocRect.current.centerX;
        const startViewportCenterY = startDocRect.current.centerY - currentScrollY;

        // Target center in pinned viewport:
        const targetCenterX = endPinnedViewportRect.current.centerX;
        const targetCenterY = endPinnedViewportRect.current.centerY;

        // Target scale:
        const targetScaleX =
          startDocRect.current.width > 0
            ? endPinnedViewportRect.current.width / startDocRect.current.width
            : 1;
        const targetScaleY =
          startDocRect.current.height > 0
            ? endPinnedViewportRect.current.height / startDocRect.current.height
            : 1;

        let curCenterX = lerp(startViewportCenterX, targetCenterX, easeP);
        let curCenterY = lerp(startViewportCenterY, targetCenterY, easeP);
        const curScaleX = lerp(1, targetScaleX, easeP);
        const curScaleY = lerp(1, targetScaleY, easeP);

        // Phase 4 Exit: After the pin ends, subtract downstream scroll
        if (pinEndScrollRef.current > 0 && currentScrollY > pinEndScrollRef.current) {
          const extraScroll = currentScrollY - pinEndScrollRef.current;
          curCenterY -= extraScroll;
        }

        // Apply GPU transform strictly using translate3d and scale
        const tx = curCenterX - startDocRect.current.width / 2;
        const ty = curCenterY - startDocRect.current.height / 2;

        scrollerLayer.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(
          2
        )}px, 0) scale(${curScaleX.toFixed(4)}, ${curScaleY.toFixed(4)})`;

        // Update presentation tilt uniform (0 to 1)
        conveyor?.setPresent(lerp(TILT_ANGLES.present0, TILT_ANGLES.present1, easeP));

        // Visibility & GPU boundary optimization
        const isOffscreen =
          curCenterY + (startDocRect.current.height * curScaleY) / 2 < -200 ||
          curCenterY - (startDocRect.current.height * curScaleY) / 2 >
            window.innerHeight + 200;

        scrollerLayer.style.opacity = isOffscreen ? "0" : "1";
        scrollerLayer.style.willChange =
          travelProgressRef.current > 0.01 && travelProgressRef.current < 0.99
            ? "transform"
            : "auto";
      };

      // ---------------------------------------------------------------------
      // SCROLLTRIGGER 1: Travel & Widen (About -> Services Transition)
      // ---------------------------------------------------------------------
      const st1 = ScrollTrigger.create({
        trigger: stageWrapper,
        start: "top 85%", // Starts as Services enters viewport
        end: "top top", // Ends exactly when Services stage top hits top of screen
        scrub: SCRUB,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          travelProgressRef.current = self.progress;
          updateScrollerTransform();

          // When close to services, show HUD
          if (self.progress > 0.85) {
            setHudVisible(true);
          } else {
            setHudVisible(false);
          }
        },
      });

      // ---------------------------------------------------------------------
      // SCROLLTRIGGER 2: Stage Pinning & Internal Services Slide Advance
      // ---------------------------------------------------------------------
      const totalServicesDuration =
        servicesSlides.length * (window.innerHeight * (PIN_SCROLL_HEIGHT / 100));

      const st2 = ScrollTrigger.create({
        trigger: stageWrapper,
        start: "top top",
        end: `+=${totalServicesDuration}`,
        pin: true,
        anticipatePin: 1,
        scrub: true,
        invalidateOnRefresh: true,
        onRefresh: (self) => {
          pinEndScrollRef.current = self.end;
        },
        onUpdate: (self) => {
          pinEndScrollRef.current = self.end;

          // Inside the pin, travel progress is 1.0
          travelProgressRef.current = 1.0;
          setHudVisible(true);

          // Internal slide offset scrub:
          // Slide indices: About = [0..3], Services = [4..7]
          // Base offset for Services = 4.0; scrub advances from 4.0 through 7.0
          const startServicesOffset = 4.0;
          const slideSpan = servicesSlides.length - 1; // 3 steps (4 to 7)
          const targetOffset = startServicesOffset + self.progress * slideSpan;

          conveyor?.setScrollOffset(targetOffset);

          // Update active slide for HUD (0..3)
          const curIndex = Math.min(
            servicesSlides.length - 1,
            Math.floor(self.progress * servicesSlides.length)
          );
          setActiveSlideIndex(curIndex);

          updateScrollerTransform();
        },
      });

      pinEndScrollRef.current = st2.end;

      // Ensure transform updates on smooth scroll ticks
      gsap.ticker.add(updateScrollerTransform);

      return () => {
        ScrollTrigger.removeEventListener("refresh", cacheRects);
        gsap.ticker.remove(updateScrollerTransform);
        st1.kill();
        st2.kill();
      };
    },
    { scope: containerRef }
  );

  const currentServiceSlide = servicesSlides[activeSlideIndex] || servicesSlides[0];

  return (
    <div ref={containerRef} className="relative w-full bg-black text-[#f2ede6]">
      {/* =========================================================================
          THE SINGLE FIXED SCROLLER OVERLAY LAYER
          Position: Fixed, Top: 0, Left: 0. Pointer events pass through container,
          active only on canvas. Z-index sits below HUD and section titles (z-20).
         ========================================================================= */}
      <div
        ref={scrollerLayerRef}
        className="fixed top-0 left-0 pointer-events-none z-20 origin-center select-none"
        style={{
          width: "520px",
          height: "640px",
          transform: "translate3d(-9999px, -9999px, 0)",
        }}
      >
        <ProjectConveyor ref={conveyorRef} initialPresent={0} />
      </div>

      {/* =========================================================================
          SECTION 1: ABOUT MUSQUEN MEDIA (#about)
          Left 50%: Narrative & 2x2 Official Brand Contacts
          Right 50%: startSlotRef (the empty sizing anchor for the scroller)
         ========================================================================= */}
      <section
        id="about"
        className="relative py-28 sm:py-36 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/[0.08] w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Narrative & 2x2 Official Contacts */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--emerald-light)]">
              About Musquen Media
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mt-3 text-[#f2ede6] tracking-tight leading-[1.08]">
              Engineering Exponential Brand Velocity
            </h2>
            <p className="mt-5 text-zinc-400 leading-relaxed text-sm sm:text-base font-light">
              We are an elite digital growth and creative engineering firm built to position your
              brand at the center of industry attention.
            </p>
            <p className="mt-3 text-zinc-400 leading-relaxed text-sm font-light">
              By uniting high-precision algorithmic media buying, viral social loop architecture,
              and bespoke 60 FPS immersive web systems, we systematically convert attention into
              sustainable enterprise scale.
            </p>

            {/* Performance Metric Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/[0.08]">
              <div>
                <span className="text-xl sm:text-2xl font-black text-[#f2ede6] font-mono">
                  $25M+
                </span>
                <p className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider mt-0.5">
                  Ad Spend Scaled
                </p>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-[var(--emerald-light)] font-mono">
                  4.2x
                </span>
                <p className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider mt-0.5">
                  Average ROAS
                </p>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-[#f2ede6] font-mono">
                  60 FPS
                </span>
                <p className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider mt-0.5">
                  Bespoke Systems
                </p>
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

          {/* Right Column: START SLOT (Invisible layout sizing anchor for the scroller) */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <div
              ref={startSlotRef}
              className="w-full h-[480px] sm:h-[580px] lg:h-[640px] pointer-events-none"
              aria-label="3D Work Reel Placeholder (Start Slot)"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SERVICES STAGE WRAPPER (#services)
          The element that gets PINNED by GSAP ScrollTrigger (ST2)
          Contains Heading, Subtext, END SLOT, and Slide HUD (sitting above scroller)
         ========================================================================= */}
      <div
        ref={stageWrapperRef}
        id="services"
        className="relative w-full min-h-screen flex flex-col justify-center py-20 px-4 sm:px-6 border-t border-white/[0.08] bg-black overflow-hidden"
      >
        {/* Ambient Emerald Glow in Background */}
        <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top,rgba(87,149,126,0.12)_0%,transparent_70%)]" />

        {/* Section Header: Sits above scroller in z-order (relative z-30) */}
        <div className="relative z-30 text-center max-w-3xl mx-auto mb-6 pointer-events-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--emerald-subtle)] text-[var(--emerald-light)] text-xs font-bold uppercase tracking-[0.2em] mb-3 border border-[var(--emerald-brand)]/25 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Core Verticals & Live Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#f2ede6] tracking-tight">
            Integrated Solutions Built for Scale
          </h2>
          <p className="mt-3 text-zinc-400 text-xs sm:text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Drag, swipe, or scroll to explore our live 3D portfolio across performance media,
            viral organic architectures, and ultra-fast web engineering.
          </p>
        </div>

        {/* END SLOT: The target centered widescreen slot (~90vw, max 1360px, ~65-70vh) */}
        <div className="relative w-full flex items-center justify-center my-3">
          <div
            ref={endSlotRef}
            className="w-[90vw] max-w-[1360px] h-[58vh] min-h-[460px] max-h-[680px] pointer-events-none"
            aria-label="Widescreen Services Showcase Slot (End Slot)"
          />
        </div>

        {/* LIVE SLIDE HUD: Sits above scroller in z-order (relative z-30) */}
        <div
          className={`relative z-30 max-w-xl mx-auto mt-4 px-6 py-2.5 rounded-full bg-black/75 border border-white/10 backdrop-blur-md flex items-center justify-between gap-4 transition-all duration-300 pointer-events-auto ${
            hudVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xs font-mono font-bold text-[var(--emerald-light)]">
              0{activeSlideIndex + 1} / 0{servicesSlides.length}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 truncate">
              {currentServiceSlide?.category || "Services"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#f2ede6] truncate">
            <span>{currentServiceSlide?.title}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: 3 CORE VERTICALS FEATURE CARDS
          Rendered naturally below the pinned stage. When stage unpins, these scroll
          smoothly into view.
         ========================================================================= */}
      <section className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full z-30 bg-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
          {/* Card 1: Meta Ads */}
          <div className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-[var(--emerald-brand)]/50 hover:bg-white/[0.05] shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[var(--emerald-brand)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div>
              <div className="relative z-10 w-12 h-12 rounded-2xl bg-[var(--emerald-subtle)] text-[var(--emerald-light)] flex items-center justify-center mb-6 border border-[var(--emerald-brand)]/30">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="relative z-10 text-xl font-bold text-[#f2ede6]">
                Meta Ads Engineering
              </h3>
              <p className="relative z-10 mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                Laser-focused audience targeting, creative testing engines, and server-side
                attribution modeling engineered to maximize ROAS at scale.
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
