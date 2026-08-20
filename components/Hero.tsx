"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import BiologicalField from "./BiologicalField";
import Navbar from "./Navbar";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .from(".navbar", {
          y: -16,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".hero__eyebrow",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.35",
        )
        .from(
          ".hero__title",
          {
            y: 40,
            opacity: 0,
            duration: 1,
          },
          "-=0.35",
        )
        .from(
          ".hero__description",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.55",
        )
        .from(
          ".hero__actions",
          {
            y: 16,
            opacity: 0,
            duration: 0.65,
          },
          "-=0.45",
        )
        .from(
          ".hero__field-wrap",
          {
            opacity: 0,
            scale: 0.94,
            duration: 1.3,
          },
          "-=0.9",
        )
        .from(
          ".hero__footer",
          {
            opacity: 0,
            duration: 0.6,
          },
          "-=0.55",
        );
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={heroRef} id="top" className="hero">
      <div className="hero__inner">
        <div className="hero-reveal">
          <Navbar />
        </div>

        <div className="hero__content">
          <div>
            <div className="eyebrow hero__eyebrow">
              <span className="eyebrow__number">01</span>
              <span>Precision biology</span>
            </div>

            <h1 className="hero__title">
              Precision at the edge of <span>biology.</span>
            </h1>

            <p className="hero__description">
              We decode complex biological systems and engineer precise
              solutions for the life sciences.
            </p>

            <div className="hero__actions">
              <a href="#innovation" className="hero__button">
                <span>Explore our science</span>
                <span className="hero__button-arrow">→</span>
              </a>
            </div>
          </div>

          <div className="hero__field-wrap">
            <div className="biological-field__glow" />
            <BiologicalField />
            <span className="biological-field__label">
              Biological network / 01
            </span>
          </div>
        </div>

        <div className="hero__footer">
          <span>Virelis</span>
          <span className="hero__scroll-line">Scroll to discover</span>
        </div>
      </div>
    </section>
  );
}