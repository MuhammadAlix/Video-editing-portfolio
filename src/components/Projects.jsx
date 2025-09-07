import React, { useState, useRef, useEffect } from "react";
import "./Projects.css";

// Import local thumbnails
import thumbAnimation from "../assets/NutritionThumb.png";
import thumbFlashy from "../assets/ShowVideoThumbnail.png";
import thumbFilm from "../assets/COR.jpg";
import golfcup from "../assets/GolfCup.jpg";
import agency from "../assets/Agency.jpg";
import banner from "../assets/Banner.jpg";
import fatherDay from "../assets/FatherDay.jpg";
import leadership from "../assets/Leadership.jpg";

function Projects() {
  const projects = [
    {
      title: "Animation Video",
      desc: "An animation video for NutritionLabelPro website to drive more sales.",
      thumbnail: thumbAnimation,
      videoUrl: "https://www.youtube.com/embed/vFMocaUTk74?si=XPHfWnKWkzuyq8pf",
    },
    {
      title: "Flasy Gaming Edit",
      desc: "A collection of my best skillsets featuring beat sync, smooth transitions and smooth flow of video.",
      thumbnail: thumbFlashy,
      videoUrl: "https://www.youtube.com/embed/gatuNuubmws?si=2MglHNoPOh9Ex3UB",
    },
    {
      title: "City of Refuge (Los Angeles)",
      desc: "Edited and color graded a video to show the positive impact of City of Refuge and to elaborate the diversity of their culture.",
      thumbnail: thumbFilm,
      videoUrl: "https://www.youtube.com/embed/1N8UQ3u8_Jw?si=34uYqL7hAI6bi0_i",
    },
    {
      title: "Promotional Video (Leadership summit)",
      desc: "Edited a promotional video for the LeaderShip Summit hosted by a church in US.",
      thumbnail: leadership,
      videoUrl: "https://www.youtube.com/embed/SCiLHEvmPyQ?si=UN980du60euKeYTT",
    },
    {
      title: "Promotional Video (Charity Golf Tournament)",
      desc: "Edited a promotional video for a Charity Golf Tournament hosted by a church in US.",
      thumbnail: golfcup,
      videoUrl: "https://www.youtube.com/embed/8t0KDGTDnH0?si=Cz7Loh2vpJe73BqF",
    },
    {
      title: "Promotional Video (Marketing Agency)",
      desc: "Edited a promotional video for a marketing agency to showcase what services they offer.",
      thumbnail: agency,
      videoUrl: "https://www.youtube.com/embed/UOnnKStqMEk?si=UaRdSUIa56gQdrSA",
    },
    {
      title: "Banner Animation (From a Photoshop File)",
      desc: "Client had a photoshop project file for a Banner that he wanted me to animate.",
      thumbnail: banner,
      videoUrl: "https://www.youtube.com/embed/X9-rzvr998k?si=djq3CHJum8CEs_9W",
    },
    {
      title: "Promotional Video (Father and Mother's day activities)",
      desc: "Edited a fast paced with fast cuts to showcase different activities performed during the Father's day and Mother's Day at city of refuge.",
      thumbnail: fatherDay,
      videoUrl: "https://www.youtube.com/embed/5QTHaDEI2bQ?si=mV-c03XXNw80Xa4i",
    },
  ];

  const [activeProject, setActiveProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [videoOverlay, setVideoOverlay] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (!isMobile && sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section
      className="projects full-width"
      id="projects"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
    >
      <h2 className="projects-title">Projects</h2>

      <ul className="projects-list">
        {projects.map((project, index) => (
          <li
            key={index}
            className={`project-item ${
              activeProject?.title === project.title ? "active" : ""
            }`}
            onMouseEnter={() => !isMobile && setActiveProject(project)}
          >
            <span className="project-title">{project.title}</span>
            <p
              className={`project-desc ${
                isMobile || activeProject?.title === project.title ? "show" : ""
              }`}
            >
              {project.desc}
            </p>

            {/* Mobile: show thumbnails + button inline */}
            {isMobile && (
              <div className="inline-project">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="inline-thumbnail"
                />
                <button
                  className="watch-now"
                  onClick={() => setVideoOverlay(project.videoUrl)}
                >
                  ▶ Watch Now
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Desktop floating thumbnail */}
      {!isMobile && activeProject && (
        <div
          className={`floating-thumbnail ${hovered ? "visible" : ""}`}
          style={{ top: mousePos.y, left: mousePos.x }}
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className={`thumb-slide ${
                activeProject?.title === project.title ? "active" : ""
              }`}
            >
              <img src={project.thumbnail} alt={project.title} />
              {activeProject?.title === project.title && (
                <button
                  className="watch-now"
                  onClick={() => setVideoOverlay(project.videoUrl)}
                >
                  ▶ Watch Now
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Video Overlay */}
      {videoOverlay && (
        <div className="video-overlay" onClick={() => setVideoOverlay(null)}>
          <div
            className="video-container"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src={`${videoOverlay}&autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
