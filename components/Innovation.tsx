"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InnovationField from "./InnovationField";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    number: "01",
    title: "Systems thinking",
    description: "Understanding biology as interconnected systems.",
  },
  {
    number: "02",
    title: "Data intelligence",
    description: "Turning vast biological data into actionable insight.",
  },
  {
    number: "03",
    title: "Human impact",
    description: "Designing solutions that create meaningful impact.",
  },
];

export default function Innovation() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".innovation-reveal", {
        y: 45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      gsap.from(".innovation-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
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
    <section
      ref={sectionRef}
      id="innovation"
      className="innovation"
    >
      <div className="innovation__inner">
        <div className="innovation__header innovation-reveal">
          <span className="section-label">
            <span className="section-label__number">02</span>
            Innovation
          </span>

          <span className="innovation__index">VIRELIS / 02</span>
        </div>

        <div className="innovation__main">
          <div className="innovation__copy">
            <h2 className="innovation__title innovation-reveal">
              Biology is complex.
              <br />
              <span>Clarity changes everything.</span>
            </h2>

            <p className="innovation__description innovation-reveal">
              We combine experimental expertise with computational
              intelligence to reveal patterns others miss.
            </p>
          </div>

          <div className="innovation__visual">
            <InnovationField />
          </div>
        </div>

        <div className="innovation__principles">
          {principles.map((principle) => (
            <article
              key={principle.number}
              className="innovation__principle innovation-reveal"
            >
              <div className="innovation__principle-top">
                <span className="innovation__principle-icon">
                  {principle.number}
                </span>

                <span className="innovation__principle-line" />
              </div>

              <h3>{principle.title}</h3>

              <p>{principle.description}</p>
            </article>
          ))}
        </div>

        <div className="innovation-line" />
      </div>
    </section>
  );
}