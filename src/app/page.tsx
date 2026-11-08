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

            {/* CTA Buttons: Conic Gradient Glow Button & Glass Outline */}
            <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="gradient-button group"
              >
                <span className="gradient-text tracking-[0.14em] uppercase text-xs sm:text-sm font-bold">
                  Start Scaling
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#4ecdc4] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/#services"
                className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#f2ede6] bg-white/[0.08] border border-white/25 hover:bg-white/20 hover:border-white/50 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.99]"
              >
                <span>Explore Services</span>
              </Link>
            </div>
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
