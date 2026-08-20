"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    number: "01",
    title: "Decode",
    label: "01 / BIOLOGICAL DISCOVERY",
    description:
      "We decode complex biological systems to uncover key drivers of function and disease.",
  },
  {
    number: "02",
    title: "Design",
    label: "02 / INTERVENTION DESIGN",
    description:
      "We design precise interventions using AI, engineering and deep biological understanding.",
  },
  {
    number: "03",
    title: "Deliver",
    label: "03 / DEVELOPMENT",
    description:
      "We deliver solutions that advance human health with speed, reliability and precision.",
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".capabilities-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="capabilities"
    >
      <div className="capabilities__inner">

        {/* HEADER */}
        <div className="capabilities__header capabilities-reveal">
          <span className="capabilities__label">
            <span>04</span>
            Capabilities
          </span>

          <span className="capabilities__index">
            VIRELIS / 04
          </span>
        </div>

        {/* INTRO */}
        <div className="capabilities__content">

          <div className="capabilities__intro">
            <h2 className="capabilities__title capabilities-reveal">
              From insight
              <br />
              to <span>impact.</span>
            </h2>

            <p className="capabilities__description capabilities-reveal">
              Our end-to-end capabilities transform complex biology into
              real-world solutions.
            </p>
          </div>

          {/* BIOLOGICAL WAVE */}
          <div className="capabilities__visual-wrap capabilities-reveal">
            <div className="capabilities__visual">

              <svg
                className="capabilities__wave"
                viewBox="0 0 900 300"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="capabilityWaveGreen"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#6f914c" stopOpacity="0" />
                    <stop offset="25%" stopColor="#a7c77a" stopOpacity="0.65" />
                    <stop offset="55%" stopColor="#a7c77a" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#a7c77a" stopOpacity="0" />
                  </linearGradient>

                  <linearGradient
                    id="capabilityWaveBlue"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#5c8caf" stopOpacity="0" />
                    <stop offset="45%" stopColor="#5c8caf" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#5c8caf" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  className="capabilities__wave-line capabilities__wave-line--green"
                  d="M-20 205 C120 70 170 50 310 105 S500 260 640 140 S790 45 930 100"
                />

                <path
                  className="capabilities__wave-line capabilities__wave-line--green"
                  d="M-20 225 C130 95 190 80 325 125 S505 280 650 160 S800 70 930 120"
                />

                <path
                  className="capabilities__wave-line capabilities__wave-line--blue"
                  d="M-20 245 C130 120 190 110 330 145 S510 295 665 175 S810 95 930 145"
                />

                <path
                  className="capabilities__wave-line capabilities__wave-line--blue"
                  d="M-20 185 C115 45 185 35 300 90 S490 235 625 120 S790 25 930 85"
                />
              </svg>

              <div className="capabilities__wave-points">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <span className="capabilities__visual-label">
                BIOLOGICAL SYSTEM / 04
              </span>
            </div>
          </div>
        </div>

        {/* CAPABILITY CARDS */}
        <div className="capabilities__list">

          {capabilities.map((capability) => (
            <article
              key={capability.number}
              className="capability-item capabilities-reveal"
            >
              <div className="capability-item__header">
                <span className="capability-item__number">
                  {capability.number}
                </span>

                <span className="capability-item__label">
                  {capability.label}
                </span>

                <span className="capability-item__arrow">
                  ↗
                </span>
              </div>

              <div className="capability-item__icon">
                {capability.number === "01" && (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="7" />
                    <circle cx="12" cy="12" r="2.5" />
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                  </svg>
                )}

                {capability.number === "02" && (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="6" cy="15" r="2" />
                    <circle cx="18" cy="15" r="2" />
                    <path d="M12 7v3M10.5 11l-3 2.5M13.5 11l3 2.5" />
                  </svg>
                )}

                {capability.number === "03" && (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 3h6M10 3v5l-4 9a3 3 0 0 0 2.8 4h6.4A3 3 0 0 0 18 17l-4-9V3" />
                    <path d="M8 15h8" />
                  </svg>
                )}
              </div>

              <h3>{capability.title}</h3>

              <p>{capability.description}</p>

              <a href="#" className="capability-item__link">
                Learn more
                <span>→</span>
              </a>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
}