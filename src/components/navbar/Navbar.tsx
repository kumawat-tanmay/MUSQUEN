"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";
import MagneticButton from "./MagneticButton";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Why Choose Us", href: "/#why-choose-us" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const capsuleRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navContainerRef = useRef<HTMLElement>(null);
  const hoverIndicatorRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  // Apple-Grade Unified Lens-Blur & Slide Entrance
  useGSAP(
    () => {
      if (!capsuleRef.current) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        capsuleRef.current,
        {
          y: -36,
          opacity: 0,
          scale: 0.98,
          filter: "blur(14px)",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
        }
      );

      if (navContainerRef.current) {
        const links = navContainerRef.current.querySelectorAll("a");
        tl.fromTo(
          links,
          {
            opacity: 0.4,
            y: -6,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.04,
            ease: "power2.out",
          },
          "-=0.6"
        );
      }

      if (logoRef.current && ctaRef.current) {
        tl.fromTo(
          [logoRef.current, ctaRef.current],
          {
            opacity: 0.5,
            y: -4,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.65"
        );
      }
    },
    { scope: navRef }
  );

  // Dynamic Scroll Listener for Liquid Glass State
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile drawer animation
  useEffect(() => {
    if (!mobileDrawerRef.current) return;

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.killTweensOf(mobileDrawerRef.current);
      gsap.fromTo(
        mobileDrawerRef.current,
        { opacity: 0, y: -20, display: "none" },
        {
          opacity: 1,
          y: 0,
          display: "block",
          duration: 0.35,
          ease: "power3.out",
        }
      );

      if (mobileLinksRef.current) {
        gsap.fromTo(
          mobileLinksRef.current.children,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.3,
            ease: "power2.out",
            delay: 0.08,
          }
        );
      }
    } else {
      document.body.style.overflow = "auto";
      gsap.to(mobileDrawerRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          if (mobileDrawerRef.current) mobileDrawerRef.current.style.display = "none";
        },
      });
    }
  }, [mobileMenuOpen]);

  // Synchronized Hover Pill Physics
  const handleLinkMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!navContainerRef.current || !hoverIndicatorRef.current) return;

    const navRect = navContainerRef.current.getBoundingClientRect();
    const linkRect = e.currentTarget.getBoundingClientRect();

    const targetX = linkRect.left - navRect.left;
    const targetWidth = linkRect.width;

    gsap.killTweensOf(hoverIndicatorRef.current);
    gsap.to(hoverIndicatorRef.current, {
      x: targetX,
      width: targetWidth,
      opacity: 1,
      duration: 0.25,
      ease: "power3.out",
    });
  };

  const handleNavMouseLeave = () => {
    if (!hoverIndicatorRef.current) return;
    gsap.killTweensOf(hoverIndicatorRef.current);
    gsap.to(hoverIndicatorRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <>
      {/* Fixed Sticky Header Container */}
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 md:px-8 pt-3 sm:pt-4 pointer-events-none transition-[opacity,transform] duration-300"
      >
        {/* Apple-Style Seamless Frosted Glass Capsule (100% BORDERLESS TRANSPARENT GLASS!) */}
        <div
          ref={capsuleRef}
          className={`pointer-events-auto relative flex items-center justify-between transition-[background-color,box-shadow,backdrop-filter] duration-500 rounded-full w-[98%] max-w-[1400px] px-4 sm:px-7 py-2.5 sm:py-3 border-0 border-none ${
            isScrolled
              ? "bg-black/35 shadow-2xl shadow-black/50"
              : "bg-white/[0.08] shadow-2xl shadow-black/30"
          }`}
          style={{
            backdropFilter: isScrolled
              ? "blur(16px) saturate(190%)"
              : "blur(12px) saturate(180%)",
            WebkitBackdropFilter: isScrolled
              ? "blur(16px) saturate(190%)"
              : "blur(12px) saturate(180%)",
            transform: "translate3d(0, 0, 0)",
            willChange: "transform",
          }}
        >
          {/* Brand Logo & Name */}
          <Link
            ref={logoRef}
            href="/"
            className="group flex items-center gap-3 relative z-10 transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden flex items-center justify-center p-1 transition-colors border-0 bg-white/10 backdrop-blur-md">
              <Image
                src="/musquen-logo.png"
                alt="Musquen Media"
                width={44}
                height={44}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-extrabold tracking-tight flex items-center gap-1.5 transition-colors text-[#f2ede6]">
                MUSQUEN
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-[var(--emerald-subtle)] text-[var(--emerald-brand)]">
                  MEDIA
                </span>
              </span>
              <span className="text-[11px] font-medium tracking-wide hidden sm:block transition-colors text-[#f2ede6]/65">
                Scale • Strategy • Web
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (100% BORDERLESS Transparent Glass!) */}
          <nav
            ref={navContainerRef}
            onMouseLeave={handleNavMouseLeave}
            className="hidden md:flex items-center relative p-1.5 rounded-full transition-colors border-0 bg-white/[0.06]"
          >
            {/* The Precision Sliding Pill */}
            <div
              ref={hoverIndicatorRef}
              className="absolute top-1.5 bottom-1.5 left-0 rounded-full pointer-events-none opacity-0 will-change-transform border-0 shadow-xs bg-white/20"
              style={{ width: 0 }}
            />

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onMouseEnter={handleLinkMouseEnter}
                className="relative z-10 px-5 py-2 text-xs lg:text-sm font-semibold rounded-full tracking-wide transition-colors text-[#f2ede6]/85 hover:text-[#f2ede6]"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action: Magnetic CTA & Mobile Toggle */}
          <div ref={ctaRef} className="flex items-center gap-2 sm:gap-4 relative z-10">
            {/* Magnetic CTA Button */}
            <div className="hidden sm:block">
              <MagneticButton pullStrength={0.25}>
                <Link
                  href="/#contact"
                  className="group relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[var(--emerald-brand)] hover:bg-[var(--emerald-dark)] transition-[background-color,transform,box-shadow] duration-200 shadow-md shadow-[var(--emerald-brand)]/25 hover:shadow-lg hover:shadow-[var(--emerald-brand)]/40 active:scale-95 border-0"
                >
                  <Sparkles className="w-4 h-4 text-white/90 group-hover:rotate-12 transition-transform" />
                  <span>Let&apos;s Talk</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </MagneticButton>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors border-0 bg-white/15 text-[#f2ede6] hover:bg-white/25"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        ref={mobileDrawerRef}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md pt-24 px-6 md:hidden"
        style={{ display: "none" }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileMenuOpen(false);
        }}
      >
        <div className="bg-black/75 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl max-w-sm mx-auto border-0 text-[#f2ede6]">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--emerald-brand)]">
              Navigation
            </span>
            <span className="text-[11px] text-zinc-400">Musquen Media</span>
          </div>

          <div ref={mobileLinksRef} className="flex flex-col gap-2 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-[#f2ede6]/90 hover:text-white transition-colors py-2 px-3 rounded-xl hover:bg-white/[0.08]"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-white/[0.08]">
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[var(--emerald-brand)] text-white font-semibold text-sm shadow-md hover:bg-[var(--emerald-dark)] transition-colors border-0"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
