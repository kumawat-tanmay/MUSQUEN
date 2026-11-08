import Link from "next/link";
import { ArrowUpRight, Target, Megaphone, Laptop, CheckCircle2 } from "lucide-react";
import HeroBlackHole from "@/components/hero/HeroBlackHole";
import ProjectConveyor from "@/components/about/ProjectConveyor";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-[#f2ede6]">
      {/* Interactive Cinematic Black Hole Hero Section */}
      <section
        id="home"
        className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
      >
        {/* 3D WebGL Background Canvas (Completely Fixed, Real-Time Moving Particles, No Ring) */}
        <HeroBlackHole />

        {/* Soft Cinematic Radial Vignette Framing the Event Horizon */}
        <div
          className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center p-4 sm:p-6"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.92) 90%)",
          }}
        >
          {/* Centered Typography Card (Ultra-Colossal Modern Scale) */}
          <div className="w-full max-w-[1360px] text-center pt-14 sm:pt-20 px-3 sm:px-6 pointer-events-auto">
            {/* Colossal Hero Title Card H1 */}
            <h1 className="text-[clamp(2.85rem,8.4vw,8.5rem)] font-black tracking-[-0.04em] text-[#f2ede6] uppercase leading-[0.9] sm:leading-[0.88] drop-shadow-2xl">
              Scale at the
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f2ede6] to-[#7ecba9]">
                Speed of Light.
              </span>
            </h1>

            {/* High-Impact Single-Line Proposition */}
            <p className="mt-8 sm:mt-10 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[#f2ede6]/85 max-w-2xl mx-auto tracking-wide">
              Algorithmic media buying and viral social architecture built to dominate markets.
            </p>

            {/* Minimalist Magnetic Apple Pill Buttons */}
            <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm font-bold tracking-[0.14em] uppercase bg-[#f2ede6] text-[#0b0705] hover:bg-white hover:shadow-2xl hover:shadow-[#57957E]/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Start Scaling</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/#services"
                className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#f2ede6] bg-white/[0.08] border border-white/25 hover:bg-white/20 hover:border-white/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section: Left Side Narrative & Right Side 3D Animated Conveyor Scroller */}
      <section
        id="about"
        className="py-32 px-6 max-w-7xl mx-auto border-t border-white/[0.08] w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Rich Agency Narrative Text */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--emerald-light)]">
              About Musquen Media
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mt-3 text-[#f2ede6] tracking-tight leading-[1.08]">
              Engineering Exponential Brand Velocity
            </h2>
            <p className="mt-6 text-zinc-400 leading-relaxed text-base font-light">
              We are a multidisciplinary team combining performance media buyers,
              creative strategists, and creative technologists built to position your
              brand at the apex of industry attention.
            </p>
            <p className="mt-4 text-zinc-400 leading-relaxed text-sm font-light">
              By fusing algorithmic paid acquisition, viral organic momentum, and bespoke 60 FPS
              immersive digital engineering, we turn ambitious brands into category-defining leaders.
            </p>

            {/* Performance Metrics Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-white/[0.08]">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-[#f2ede6] font-mono tracking-tight">
                  $25M+
                </span>
                <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider mt-1">
                  Ad Spend Managed
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-[var(--emerald-light)] font-mono tracking-tight">
                  4.2x
                </span>
                <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider mt-1">
                  Average ROAS
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-[#f2ede6] font-mono tracking-tight">
                  60 FPS
                </span>
                <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider mt-1">
                  Bespoke Web Systems
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-[var(--emerald-light)] font-mono tracking-tight">
                  100%
                </span>
                <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider mt-1">
                  Dedicated Growth Leads
                </span>
              </div>
            </div>

            {/* Direct Consultation Link */}
            <div className="mt-8">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2 text-xs font-bold tracking-[0.16em] uppercase text-[var(--emerald-light)] hover:text-white transition-colors"
              >
                <span>Partner With Our Team</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Shakuro 3D WebGL Conveyor Scroller */}
          <div className="lg:col-span-7 w-full">
            <ProjectConveyor />
          </div>
        </div>
      </section>

      {/* Services Showcase (Dark Glassmorphic Cards) */}
      <section
        id="services"
        className="py-32 px-6 max-w-6xl mx-auto border-t border-white/[0.08] w-full"
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--emerald-light)]">
            Core Verticals
          </span>
          <h2 className="text-3xl sm:text-5xl font-black mt-3 text-[#f2ede6] tracking-tight">
            Integrated Solutions Built for Scale
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* Why Choose Us Section (Obsidian Glass Tiles) */}
      <section
        id="why-choose-us"
        className="py-32 px-6 max-w-5xl mx-auto border-t border-white/[0.08] w-full"
      >
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--emerald-light)]">
            Our Advantage
          </span>
          <h2 className="text-3xl sm:text-5xl font-black mt-3 text-[#f2ede6] tracking-tight">
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
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all duration-200"
            >
              <CheckCircle2 className="w-5 h-5 text-[var(--emerald-light)] shrink-0" />
              <span className="text-sm font-semibold text-[#f2ede6]">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section (Cinematic Dark Glow & Direct CTA) */}
      <section
        id="contact"
        className="relative py-36 px-6 max-w-4xl mx-auto border-t border-white/[0.08] w-full text-center overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_center,rgba(87,149,126,0.15)_0%,transparent_70%)]" />

        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--emerald-light)]">
          Ready to Accelerate?
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mt-3 text-[#f2ede6] tracking-tight">
          Let&apos;s Build Something Extraordinary.
        </h2>
        <p className="mt-6 text-zinc-400 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
          Partner with our growth and engineering teams to transform your digital presence
          and command your industry.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="mailto:contact@musquen.media"
            className="group inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm font-bold tracking-[0.14em] uppercase bg-[var(--emerald-brand)] text-white hover:bg-[var(--emerald-dark)] shadow-xl shadow-[var(--emerald-brand)]/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Initiate Consultation</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
