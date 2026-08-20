"use client";

import { useEffect, useRef } from "react";

type Particle = {
  t: number;
  strand: number;
  offset: number;
  size: number;
  alpha: number;
  speed: number;
  phase: number;
  tone: "green" | "white" | "blue";
};

const PARTICLE_COUNT = 1100;
const STRAND_COUNT = 9;

export default function InnovationField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;

    const particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticles = () => {
      particles.length = 0;

      for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        const strand = Math.floor(
          Math.random() * STRAND_COUNT,
        );

        particles.push({
          t: Math.random(),
          strand,
          offset: (Math.random() - 0.5) * 2,
          size: 0.45 + Math.random() * 1.55,
          alpha: 0.18 + Math.random() * 0.62,
          speed: 0.00005 + Math.random() * 0.00009,
          phase: Math.random() * Math.PI * 2,
          tone:
            Math.random() > 0.72
              ? "blue"
              : Math.random() > 0.42
                ? "green"
                : "white",
        });
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      for (let strand = 0; strand < STRAND_COUNT; strand += 1) {
        const strandOffset =
          (strand - (STRAND_COUNT - 1) / 2) * height * 0.025;

        ctx.beginPath();

        for (let step = 0; step <= 24; step += 1) {
          const progress = step / 24;
          const x = width * (0.02 + progress * 1.04);
          const baseY = height * 0.82 - progress * height * 0.72;
          const wave =
            Math.sin(
              progress * Math.PI * 2.2 +
              strand * 0.72 +
              time * 0.00018,
            ) *
            height *
            0.095;
          const y = baseY + wave + strandOffset;

          if (step === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const edgeFade = Math.sin((strand + 1) / (STRAND_COUNT + 1) * Math.PI);
        ctx.strokeStyle = `rgba(167, 199, 122, ${0.08 + edgeFade * 0.1})`;
        ctx.lineWidth = strand === Math.floor(STRAND_COUNT / 2) ? 1 : 0.55;
        ctx.stroke();
      }

      particles.forEach((particle) => {
        particle.t += particle.speed;

        if (particle.t > 1) {
          particle.t = 0;
        }
        const x =
          width * (0.02 + particle.t * 1.04);

        const baseY =
          height * 0.82 -
          particle.t * height * 0.72;

        const wave =
          Math.sin(
            particle.t * Math.PI * 2.2 +
            particle.strand * 0.72 +
            particle.phase * 0.15,
          ) *
          height *
          0.095;

        const detail =
          Math.sin(
            particle.t * Math.PI * 8 +
            particle.phase,
          ) *
          height *
          0.018;

        const strandOffset =
          (particle.strand -
            (STRAND_COUNT - 1) / 2) *
          height *
          0.025;

        const organicOffset =
          particle.offset *
          height *
          0.025;

        const y =
          baseY +
          wave +
          detail +
          strandOffset +
          organicOffset;

        const edgeFade = Math.min(
          1,
          particle.t * 7,
          (1 - particle.t) * 7,
        );

        const alpha =
          particle.alpha * edgeFade;

        let color = "";

        if (particle.tone === "green") {
          color = `rgba(157, 194, 111, ${alpha})`;
        } else if (particle.tone === "blue") {
          color = `rgba(135, 164, 181, ${alpha * 0.8})`;
        } else {
          color = `rgba(220, 225, 220, ${alpha})`;
        }

        if (particle.size > 1.35) {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, particle.size * 5,);

          if (particle.tone === "green") {
            glow.addColorStop(0, `rgba(157, 194, 111, ${alpha * 0.28})`,);
          } else if (particle.tone === "blue") {
            glow.addColorStop(0, `rgba(135, 164, 181, ${alpha * 0.2})`,);
          } else {
            glow.addColorStop(0, `rgba(220, 225, 220, ${alpha * 0.18})`,);
          }

          glow.addColorStop(1, "rgba(0, 0, 0, 0)",);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, particle.size * 5, 0, Math.PI * 2,);
          ctx.fill();
        }

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2,);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(draw);
    };
    resize();
    createParticles();
    window.addEventListener("resize", resize);
    animationFrame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize,);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="innovation-field" aria-label="Biological particle flow visualization" role="img" />
  );
}