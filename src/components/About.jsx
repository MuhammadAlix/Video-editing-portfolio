import React from "react";
import Lottie from "lottie-react";
import "./About.css";
import animationData from "../assets/data.json";

function About() {
  return (
    <section className="about" id="about">
      <div className="about-container">
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

        <div className="about-animation">
          <Lottie animationData={animationData} loop={true} autoplay={true} style={{ width: 300, height: 300 }} />
        </div>
      </div>
    </section>
  );
}

export default About;
