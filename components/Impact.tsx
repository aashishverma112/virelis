"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  {
    value: "12.4M+",
    label: "Biological interactions mapped",
    icon: "network",
  },
  {
    value: "94%",
    label: "Average prediction accuracy",
    icon: "target",
  },
  {
    value: "36",
    label: "Active research programs",
    icon: "flask",
  },
  {
    value: "17",
    label: "Countries collaborating",
    icon: "globe",
  },
];

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      // Section reveal
      gsap.from(".impact-reveal", {
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

      // Metric number reveal
      gsap.from(".impact__number", {
        yPercent: 100,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
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
    <section
      ref={sectionRef}
      id="impact"
      className="bg-[var(--background)]"
    >
      <div className="mx-auto max-w-[1600px] px-8 md:px-12 lg:px-[72px]">
        <div className="impact-reveal flex items-center justify-between pt-8 md:pt-10">
          <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            <span className="text-[var(--green)]">05</span>
            Impact
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            VIRELIS / 05
          </span>
        </div>
        <div
          className="grid grid-cols-1 items-center gap-14 py-[90px] lg:grid-cols-[0.78fr_1.22fr] lg:gap-[70px] lg:py-[100px]">
          <div>
            <h2 className="impact-reveal m-0 max-w-[650px] font-[var(--font-instrument)] text-[clamp(52px,5vw,82px)] font-normal
                leading-[0.94] tracking-[-0.045em] text-[var(--foreground)]">
              Driving measurable
              <br />
              <span className="text-[var(--green)]">
                impact across
              </span>
              <br />
              the world.
            </h2>
            <p
              className=" impact-reveal mt-8 max-w-[410px] text-[12px] leading-[1.7] text-[var(--muted)] md:text-[13px]" >
              Better understanding creates better possibilities. Our work
              turns biological complexity into measurable progress.
            </p>
            <a href="#" className="impact-reveal mt-7 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.08em] text-[var(--green)]
                transition-opacity duration-300 hover:opacity-70">
              <span>View all impact stories</span>
              <span className="text-[15px] leading-none">→</span>
            </a>
          </div>

          {/* Metric cards */}
          <div className="impact__metrics">
            {metrics.map((metric) => (
              <article key={metric.label} className="impact__metric impact-reveal" >
                <div className="impact__metric-icon" aria-hidden="true">
                  {metric.icon === "network" && (
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="2.2" />
                      <circle cx="5" cy="7" r="1.5" />
                      <circle cx="19" cy="7" r="1.5" />
                      <circle cx="5" cy="17" r="1.5" />
                      <circle cx="19" cy="17" r="1.5" />
                      <path d="M10.2 10.8 6.2 8.2" />
                      <path d="M13.8 10.8 17.8 8.2" />
                      <path d="M10.2 13.2 6.2 15.8" />
                      <path d="M13.8 13.2 17.8 15.8" />
                    </svg>
                  )}

                  {metric.icon === "target" && (
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="7" />
                      <circle cx="12" cy="12" r="3" />
                      <circle cx="12" cy="12" r="1" />
                    </svg>
                  )}

                  {metric.icon === "flask" && (
                    <svg viewBox="0 0 24 24">
                      <path d="M9 3h6" />
                      <path d="M10 3v6l-5.2 9.2A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.7-2.8L14 9V3" />
                      <path d="M7.5 15h9" />
                    </svg>
                  )}

                  {metric.icon === "globe" && (
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="8" />
                      <path d="M4 12h16" />
                      <path d="M12 4c2.2 2.2 3.3 4.8 3.3 8s-1.1 5.8-3.3 8" />
                      <path d="M12 4c-2.2 2.2-3.3 4.8-3.3 8s1.1 5.8 3.3 8" />
                    </svg>
                  )}
                </div>
                <div className="impact__number-wrap">
                  <span className="impact__number">{metric.value}</span>
                </div>
                <p>{metric.label}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="border-t border-[var(--line)]" />
      </div>
    </section>
  );
}