"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const researchAreas = [
  {
    number: "01",
    title: "Genomics",
    description: "Comprehensive genomic profiling at unprecedented scale.",
    metric: "94.7%",
    metricLabel: "Accuracy",
    progress: 94.7,
    icon: "genomics",
  },
  {
    number: "02",
    title: "Molecular AI",
    description: "Proprietary models that predict biological behavior.",
    metric: "91.3%",
    metricLabel: "Prediction accuracy",
    progress: 91.3,
    icon: "molecular",
  },
  {
    number: "03",
    title: "Cell engineering",
    description: "Engineering cells with precision for therapeutic impact.",
    metric: "89.1%",
    metricLabel: "Success rate",
    progress: 89.1,
    icon: "cell",
  },
];

function ResearchIcon({ type }: { type: string }) {
  if (type === "genomics") {
    return (
      <svg
        className="research__icon"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path d="M15 5c8 5 8 11 0 16s-8 11 0 16 8 6 0 6" />
        <path d="M33 5c-8 5-8 11 0 16s8 11 0 16-8 6 0 6" />
        <path d="M16 10h16M13 17h22M13 24h22M13 31h22M16 38h16" />
      </svg>
    );
  }

  if (type === "molecular") {
    return (
      <svg
        className="research__icon"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <circle cx="10" cy="14" r="4" />
        <circle cx="38" cy="10" r="4" />
        <circle cx="24" cy="27" r="4" />
        <circle cx="11" cy="40" r="4" />
        <circle cx="38" cy="38" r="4" />

        <path d="M14 15l7 9M28 24l7-11M21 30l-7 7M28 30l7 6" />
      </svg>
    );
  }

  return (
    <svg
      className="research__icon"
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="17" />
      <circle cx="24" cy="24" r="11" />
      <path d="M24 13c4 4 6 8 6 12s-2 8-6 10" />
      <path d="M24 13c-4 4-6 8-6 12s2 8 6 10" />
      <path d="M14 20h20M14 28h20" />
    </svg>
  );
}

export default function Research() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".research-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      gsap.from(".research-progress", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} id="research" className="research">
      <div className="research__inner">
        <div className="research__header research-reveal">
          <span className="research__label">
            <span>03</span>
            Research & Technology
          </span>

          <span className="research__index">
            VIRELIS / 03
          </span>
        </div>

        <div className="research__content">
          <div className="research__intro">
            <h2 className="research__title research-reveal">
              Deep science.
              <br />
              Advanced
              <br />
              technology.
            </h2>

            <p className="research__description research-reveal">
              Our platform integrates multi-omics, AI/ML and high-throughput
              experimentation to accelerate biological discovery.
            </p>

            <a
              href="#capabilities"
              className="research__link research-reveal"
            >
              Explore our platform
              <span>→</span>
            </a>
          </div>

          <div className="research__list">
            {researchAreas.map((area) => (
              <article
                key={area.number}
                className="research__item research-reveal"
              >
                <div className="research__item-icon">
                  <ResearchIcon type={area.icon} />
                </div>

                <div className="research__item-content">
                  <div className="research__item-heading">
                    <div>
                      <span className="research__number">
                        {area.number}
                      </span>

                      <h3>{area.title}</h3>

                      <p>{area.description}</p>
                    </div>

                    <div className="research__metric">
                      <strong>{area.metric}</strong>
                      <span>{area.metricLabel}</span>
                    </div>
                  </div>

                  <div className="research__progress">
                    <div className="research-progress" style={{ width: `${area.progress}%`,  }} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}