import React from "react";
import "./Footer.css";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-copy">
          © {new Date().getFullYear()} M. Ali Yasin. All Rights Reserved.
        </p>

        <ul className="footer-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="footer-socials">
          <a href="https://github.com/MuhammadAlix" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/muhammadaliyasin" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
