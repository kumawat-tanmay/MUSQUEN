import Link from "next/link";
import { ArrowUpRight, Target, Megaphone, Laptop, CheckCircle2 } from "lucide-react";
import HeroBlackHole from "@/components/hero/HeroBlackHole";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      {/* Interactive Cinematic Black Hole Hero Section */}
      <section
        id="home"
        className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
      >
        {/* 3D WebGL Background Canvas (Completely Fixed, Real-Time Moving Particles, No Ring) */}
        <HeroBlackHole />

        {/* Soft Cinematic Radial Vignette (Matching Reference CodePen #start) */}
        <div
          className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center p-6"
          style={{
            background:
              "radial-gradient(ellipse at 50% 52%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.68) 58%, rgba(0,0,0,0.92) 85%)",
          }}
        >
          {/* Centered Typography Card (Matching CodePen .card) */}
          <div className="w-full max-w-[580px] text-center pt-8 sm:pt-12 pointer-events-auto">
            {/* Headline H1 (Letter-spaced, Light, Warm Off-White #f2ede6) */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.22em] text-[#f2ede6] uppercase leading-[1.18] drop-shadow-md">
              Universal Reach.
              <br />
              <span className="font-normal text-[#f2ede6] tracking-[0.24em]">
                Relentless Velocity.
              </span>
            </h1>

            {/* Sub-tag (Mono, Letter-spaced, Dim Off-White) */}
            <p className="mt-4 font-mono text-[11px] sm:text-xs tracking-[0.2em] text-[#f2ede6]/65 uppercase">
              Omnipresent Digital Acceleration • Performance Media & Web
            </p>

            {/* Body Description */}
            <p className="mt-6 text-sm sm:text-[15px] font-light leading-[1.72] text-[#f2ede6]/80 max-w-[490px] mx-auto">
              From precision paid acquisition and viral social loops to bespoke 60fps web
              engineering—we position your brand at the center of your industry&apos;s universe.
            </p>

            {/* Call To Action Buttons (Matching CodePen .btns .primary & outline) */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs font-semibold tracking-[0.16em] uppercase bg-[#f2ede6] text-[#0b0705] hover:bg-white hover:shadow-lg hover:shadow-[#ffb36b]/15 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/#services"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs font-semibold tracking-[0.16em] uppercase text-[#f2ede6] bg-transparent border border-[#f2ede6]/20 hover:bg-[#f2ede6]/[0.08] hover:border-[#f2ede6]/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Services</span>
              </Link>
            </div>

            {/* Micro Tagline */}
            <p className="mt-6 font-mono text-[10px] text-[#f2ede6]/40 tracking-wider">
              High-ROAS Meta Ads • Social Media Marketing • Next.js Web Development
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-28 px-6 max-w-5xl mx-auto border-t border-[var(--border-subtle)] w-full"
      >
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--emerald-brand)]">
            About Musquen Media
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 text-[var(--foreground)]">
            Engineering Exponential Brand Velocity
          </h2>
          <p className="mt-4 text-zinc-600 leading-relaxed text-sm sm:text-base">
            We are a multidisciplinary team combining performance media buyers,
            creative strategists, and creative technologists.
          </p>
        </div>
      </section>

      {/* Services Showcase */}
      <section
        id="services"
        className="py-28 px-6 max-w-6xl mx-auto border-t border-[var(--border-subtle)] w-full"
      >
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--emerald-brand)]">
            Core Verticals
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 text-[var(--foreground)]">
            Integrated Solutions Built for Scale
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Meta Ads Card */}
          <div
            id="services-meta-ads"
            className="p-8 rounded-3xl bg-white border border-[var(--border-subtle)] shadow-sm hover:shadow-xl hover:border-[var(--emerald-brand)]/30 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-[var(--emerald-subtle)] text-[var(--emerald-brand)] flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--foreground)]">Meta Ads</h3>
            <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
              Laser-focused audience targeting, creative testing engines, and attribution
              modeling to maximize ROAS.
            </p>
          </div>

          {/* SMM Card */}
          <div
            id="services-smm"
            className="p-8 rounded-3xl bg-white border border-[var(--border-subtle)] shadow-sm hover:shadow-xl hover:border-[var(--emerald-brand)]/30 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-[var(--emerald-subtle)] text-[var(--emerald-brand)] flex items-center justify-center mb-6">
              <Megaphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--foreground)]">
              Social Media Marketing
            </h3>
            <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
              Viral short-form content, consistent community cultivation, and
              high-engagement social branding.
            </p>
          </div>

          {/* Web Dev Card */}
          <div
            id="services-webdev"
            className="p-8 rounded-3xl bg-white border border-[var(--border-subtle)] shadow-sm hover:shadow-xl hover:border-[var(--emerald-brand)]/30 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-[var(--emerald-subtle)] text-[var(--emerald-brand)] flex items-center justify-center mb-6">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--foreground)]">
              Website Development
            </h3>
            <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
              Ultra-fast Next.js architecture, Lenis smooth scrolling, WebGL interactive
              micro-interactions, and conversion-optimized flow.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        id="why-choose-us"
        className="py-28 px-6 max-w-5xl mx-auto border-t border-[var(--border-subtle)] w-full"
      >
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--emerald-brand)]">
            Our Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 text-[var(--foreground)]">
            Why Partner With Musquen Media
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Data-Backed Attribution & Transparent Reporting",
            "Bespoke High-Converting Creative Assets",
            "Full-Stack Web Engineering with 60 FPS Performance",
            "Dedicated Growth Leads & Direct Communication",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[var(--border-subtle)]"
            >
              <CheckCircle2 className="w-5 h-5 text-[var(--emerald-brand)] shrink-0" />
              <span className="text-sm font-semibold text-zinc-800">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-28 px-6 max-w-3xl mx-auto border-t border-[var(--border-subtle)] w-full text-center mb-20"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--emerald-brand)]">
          Ready to Accelerate?
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold mt-2 text-[var(--foreground)]">
          Let&apos;s Build Something Extraordinary.
        </h2>
        <p className="mt-4 text-zinc-500 text-sm sm:text-base">
          Scroll back up or explore the navbar to experience the smooth Lenis scroller
          and relativistic black hole simulation.
        </p>
      </section>
    </div>
  );
}
