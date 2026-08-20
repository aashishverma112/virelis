"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PARTICLES = Array.from({ length: 180 }, (_, index) => {
  const angle = (index / 180) * Math.PI * 2;
  const radius = 0.35 + ((index * 37) % 100) / 100 * 0.65;

  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    size: 0.5 + ((index * 17) % 10) / 10,
    opacity: 0.2 + ((index * 23) % 70) / 100,
  };
});

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".final-cta-reveal", {
        y: 35,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      gsap.to(".final-cta__core", {
        scale: 1.18,
        opacity: 0.8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".final-cta__particles", {
        rotate: 360,
        duration: 45,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="final-cta"
    >
      <div className="final-cta__inner">

        <div className="final-cta__header final-cta-reveal">
          <span className="final-cta__label">
            <span>06</span>
            Contact
          </span>

          <span className="final-cta__index">
            VIRELIS / 06
          </span>
        </div>

        <div className="final-cta__content">

          <div className="final-cta__copy">

            <p className="final-cta__eyebrow final-cta-reveal">
              THE NEXT POSSIBILITY
            </p>

            <h2 className="final-cta__title final-cta-reveal">
              Let&apos;s build what
              <br />
              biology makes <span>possible.</span>
            </h2>

            <p className="final-cta__description final-cta-reveal">
              Partner with us to shape the future of life sciences.
            </p>

            <div className="final-cta__actions final-cta-reveal">
              <a href="#contact" className="final-cta__button">
                Start a conversation
                <span>→</span>
              </a>

              <a href="#careers" className="final-cta__secondary">
                Explore careers
                <span>→</span>
              </a>
            </div>

          </div>

          <div
            className="final-cta__particle-field"
            aria-hidden="true"
          >
            <div className="final-cta__particles">
              {PARTICLES.map((particle, index) => (
                <span
                  key={index}
                  style={{
                    "--x": particle.x,
                    "--y": particle.y,
                    "--size": `${particle.size}px`,
                    "--opacity": particle.opacity,
                  } as React.CSSProperties}
                />
              ))}
            </div>

            <div className="final-cta__core" />
          </div>

        </div>

        <div className="final-cta__footer final-cta-reveal">
          <span>VIRELIS</span>
          <span>PRECISION AT THE EDGE OF BIOLOGY</span>
          <span>© 2026 Virelis</span>
        </div>

      </div>
    </section>
  );
}