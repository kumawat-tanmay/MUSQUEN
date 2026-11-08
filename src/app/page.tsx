import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MessageCircle,
} from "lucide-react";
import HeroBlackHole from "@/components/hero/HeroBlackHole";
import AboutAndServicesSection from "@/components/sections/AboutAndServicesSection";

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

      {/* About Section & Widescreen Expanding Services Showcase */}
      <AboutAndServicesSection />

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

      {/* Contact Section (Cinematic Dark Glow & Direct Contact Hub) */}
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
          Reach out directly to partner with our growth, media, and web engineering teams.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:musqenmedia@gmail.com"
            className="group inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm font-bold tracking-[0.14em] uppercase bg-[var(--emerald-brand)] text-white hover:bg-[var(--emerald-dark)] shadow-xl shadow-[var(--emerald-brand)]/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Mail className="w-4 h-4" />
            <span>musqenmedia@gmail.com</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="https://wa.me/919079454032"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#f2ede6] bg-white/[0.08] border border-white/25 hover:bg-white/20 hover:border-white/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp: +91 90794 54032</span>
          </a>
        </div>
      </section>
    </div>
  );
}
