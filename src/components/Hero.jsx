import React, { useState, useEffect } from "react";
import "./Hero.css";

function Hero() {
  const roles = ["video editor", "animator"];
  const [index, setIndex] = useState(0);
  const [letters, setLetters] = useState(roles[0].split(""));
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        const nextIndex = (index + 1) % roles.length;
        setIndex(nextIndex);
        setLetters(roles[nextIndex].split(""));
        setIsExiting(false);
      }, 600);
    }, 3000);

    return () => clearInterval(interval);
  }, [index, roles]);

  // Mouse move gradient + parallax
  useEffect(() => {
    const hero = document.querySelector(".hero");
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 100;
      const y = (e.clientY / innerHeight) * 100;
    };
      // Gradient follow
    const animate = () => {
      // Smoothly interpolate toward target
      currentX += (targetX - currentX) * 0.05; // 0.05 = "easing speed"
      currentY += (targetY - currentY) * 0.05;

      hero.style.setProperty("--mouse-x", `${currentX}%`);
      hero.style.setProperty("--mouse-y", `${currentY}%`);

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="hero" className="hero">
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
        <a href="#projects" className="btn">View My Work</a>
      </div>
    </section>
  );
}

export default Hero;
