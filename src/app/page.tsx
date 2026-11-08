import Link from "next/link";
import {
  ArrowUpRight,
  Target,
  Megaphone,
  Laptop,
  CheckCircle2,
  Mail,
  PhoneCall,
  MessageCircle,
} from "lucide-react";
import HeroBlackHole from "@/components/hero/HeroBlackHole";
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

      {/* About Section: 50 / 50 Split Layout with Real Contact Details & Borderless 3D Conveyor */}
      <section
        id="about"
        className="py-32 px-6 max-w-7xl mx-auto border-t border-white/[0.08] w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column (50%): Real Musquen Media Manifesto & Animated Contact Hubs */}
          <div className="flex flex-col justify-center">
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

          {/* Right Column (50%): 100% Borderless Shakuro 3D WebGL Conveyor */}
          <div className="w-full flex items-center justify-center">
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
