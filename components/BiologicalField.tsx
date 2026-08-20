"use client";

import { useEffect, useRef } from "react";
type Particle = { x: number; y: number; z: number; size: number; speed: number; phase: number; green: boolean; };

export default function BiologicalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    const pointer = { x: 0.5, y: 0.5, active: false, };
    const particles: Particle[] = [];
    const particleCount = 430;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticles = () => {
      particles.length = 0;
      for (let index = 0; index < particleCount; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const core = Math.random() < 0.76;
        const lobe = Math.random();
        const center =
          lobe < 0.56 ? { x: 0.02, y: 0 } : lobe < 0.79 ? { x: -0.11, y: -0.09 } : { x: 0.12, y: 0.08 };
        if (core) {
          const spread = lobe < 0.56 ? 0.22 : 0.14;
          const gaussian = () => {
            let u = 0;
            let v = 0;
            while (u === 0) u = Math.random();
            while (v === 0) v = Math.random();
            return Math.sqrt(-2 * Math.log(u)) *
              Math.cos(Math.PI * 2 * v);
          };

          particles.push({
            x: center.x + gaussian() * spread,
            y: center.y + gaussian() * spread * 0.72,
            z: Math.random(),
            size:
              Math.random() < 0.08 ? 2.2 + Math.random() * 2.5 : 0.65 + Math.random() * 1.75, speed: 0.08 + Math.random() * 0.22,
            phase: Math.random() * Math.PI * 2,
            green: Math.random() > 0.68,
          });
        } else {
          const outerRadius =
            0.42 + Math.pow(Math.random(), 0.55) * 0.55;
          particles.push({
            x: Math.cos(angle) * outerRadius * 1.18,
            y: Math.sin(angle) * outerRadius * 0.72,
            z: Math.random(),
            size: 0.45 + Math.random() * 1.5,
            speed: 0.05 + Math.random() * 0.18,
            phase: Math.random() * Math.PI * 2,
            green: Math.random() > 0.62,
          });
        }
      }
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const centerX = width * 0.58;
      const centerY = height * 0.45;
      const scale = Math.min(width, height) * 0.92;
      const positions = particles.map((particle) => {
        const movement =
          Math.sin(time * 0.00035 * particle.speed + particle.phase) *
          0.025;
        let x = particle.x + movement;
        let y = particle.y + Math.cos(time * 0.00028 * particle.speed + particle.phase) * 0.025;
        if (pointer.active) {
          x += (pointer.x - 0.5) * 0.08 * (1 - particle.z);
          y += (pointer.y - 0.5) * 0.08 * (1 - particle.z);
        }

        const depth = 0.55 + particle.z * 0.7;
        return {
          x: centerX + x * scale * depth,
          y: centerY + y * scale * depth,
          size: particle.size * depth,
          opacity: 0.15 + particle.z * 0.7,
          green: particle.green,
        };
      });

      for (let index = 0; index < positions.length; index += 1) {
        const current = positions[index];
        for (
          let connectionIndex = index + 1;
          connectionIndex < positions.length;
          connectionIndex += 1
        ) {
          const target = positions[connectionIndex];
          const dx = current.x - target.x;
          const dy = current.y - target.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 62) {
            continue;
          }
          const opacity =
            (1 - distance / 62) *
            0.18 *
            Math.min(current.opacity, target.opacity);
          context.beginPath();
          context.moveTo(current.x, current.y);
          context.lineTo(target.x, target.y);
          context.strokeStyle = `rgba(167, 199, 122, ${opacity})`;
          context.lineWidth = 0.55;
          context.stroke();
        }
      }
      positions
        .sort((a, b) => a.size - b.size)
        .forEach((particle) => {
          const glowRadius = particle.size * 7;
          const glow = context.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            glowRadius,
          );

          if (particle.green) {
            glow.addColorStop(
              0, `rgba(167, 199, 122, ${particle.opacity * 0.42})`,);
            glow.addColorStop(
              1, "rgba(167, 199, 122, 0)",);
          } else {
            glow.addColorStop(
              0, `rgba(220, 225, 220, ${particle.opacity * 0.22})`,);

            glow.addColorStop(
              1, "rgba(220, 225, 220, 0)",);
          }

          context.fillStyle = glow;
          context.beginPath();
          context.arc(
            particle.x,
            particle.y,
            glowRadius,
            0,
            Math.PI * 2,
          );

          context.fill();
          context.beginPath();
          context.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2,
          );

          context.fillStyle = particle.green
            ? `rgba(167, 199, 122, ${particle.opacity})`
            : `rgba(224, 228, 222, ${particle.opacity})`;

          context.fill();
        });

      animationFrame = requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    resize();
    createParticles();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    animationFrame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      canvas.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="biological-field" aria-label="Biological network visualization" role="img" />
  );
}