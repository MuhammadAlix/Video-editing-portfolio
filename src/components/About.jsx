import React from "react";
import "./About.css";

function About() {
  return (
    <section className="about" id="about">
      <div className="about-container">
        {/* Left Side - Your Info */}
        <div className="about-text">
          <h2>About Me</h2>
          <p>
            Hi, I’m Ali — a passionate <span className="highlight"> Video Editor </span> 
            and <span className="highlight">Animator</span>.  
            I love crafting engaging visuals and telling stories through motion.  
            With experience in editing, VFX, and animation, I aim to bring 
            creative ideas to life and make them impactful.
          </p>
          <p>
            Outside of editing, I’m always exploring new tools and 
            techniques to push my creativity further.
          </p>
        </div>

        {/* Right Side - Placeholder for Lottie */}
        <div className="about-animation">
          {/* 👇 Later we’ll drop your Lottie player here */}
          <div className="animation-placeholder">
            <p>🎬 Animation coming soon...</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
