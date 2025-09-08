import React, { useState, useEffect, useRef } from "react";
import "./Hero.css";

export default function Hero() {
  const roles = ["video editor", "animator"];
  const [index, setIndex] = useState(0);
  const [letters, setLetters] = useState(roles[0].split(""));
  const [isExiting, setIsExiting] = useState(false);

  // --- role switch (keeps using functional updates so effect runs once) ---
  useEffect(() => {
    const interval = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIndex((prev) => {
          const next = (prev + 1) % roles.length;
          setLetters(roles[next].split(""));
          setIsExiting(false);
          return next;
        });
      }, 600);
    }, 3000);
    return () => clearInterval(interval);
  }, []); // roles array is static

  // --- pointer-driven gradient + parallax ---
  const heroRef = useRef(null);
  const rAFRef = useRef(null);

  // targets and current values for smooth lerp
  const target = useRef({ x: 50, y: 50, px: 0, py: 0 });
  const current = useRef({ x: 50, y: 50, px: 0, py: 0 });

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // helper to clamp 0..100
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    const onPointerMove = (e) => {
      // use clientX/clientY (pointer events cover mouse/touch/stylus)
      const clientX = e.clientX;
      const clientY = e.clientY;
      const rect = hero.getBoundingClientRect();
      const xPct = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
      const yPct = clamp(((clientY - rect.top) / rect.height) * 100, 0, 100);

      target.current.x = xPct;
      target.current.y = yPct;

      // parallax target (small px offsets, invert movement for depth)
      const maxShift = 18; // px max shift
      const px = (0.5 - xPct / 100) * maxShift;
      const py = (0.5 - yPct / 100) * (maxShift * 0.6);
      target.current.px = px;
      target.current.py = py;
    };

    const onPointerLeave = () => {
      // return to center
      target.current.x = 50;
      target.current.y = 50;
      target.current.px = 0;
      target.current.py = 0;
    };

    // animation loop (lerp)
    const ease = 0.08; // lerp speed (0.02 very slow, 0.2 snappy)
    const animate = () => {
      // lerp each value
      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;
      current.current.px += (target.current.px - current.current.px) * ease;
      current.current.py += (target.current.py - current.current.py) * ease;

      // apply to CSS vars on hero element
      hero.style.setProperty("--mouse-x", `${current.current.x}%`);
      hero.style.setProperty("--mouse-y", `${current.current.y}%`);
      hero.style.setProperty("--parallax-x", `${current.current.px}px`);
      hero.style.setProperty("--parallax-y", `${current.current.py}px`);

      rAFRef.current = requestAnimationFrame(animate);
    };

    // start
    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerleave", onPointerLeave);
    rAFRef.current = requestAnimationFrame(animate);

    return () => {
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-content">
        <h1>Hi, I'm Ali 👋</h1>
        <p>
          A passionate{" "}
          <span className="role">
            {letters.map((char, i) => (
              <span
                key={`${char}-${i}-${isExiting ? "out" : "in"}`}
                className={`letter ${isExiting ? "exit" : "enter"}`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {char}
              </span>
            ))}
          </span>
          .
        </p>
        <a href="#projects" className="btn">
          View My Work
        </a>
      </div>
    </section>
  );
}
