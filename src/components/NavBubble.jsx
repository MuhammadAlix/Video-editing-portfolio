import React, { useState, useEffect } from "react";
import "./NavBubble.css";

function NavBubble() {
    const [sections, setSections] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Grab all section elements (by id)
        const sectionElements = document.querySelectorAll("section[id]");
        setSections([...sectionElements]);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = [...sectionElements].indexOf(entry.target);
                        setCurrentIndex(index);
                    }
                });
            },
            { threshold: 0.6 } // section is considered active when 60% visible
        );

        sectionElements.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const scrollToNext = () => {
        if (sections.length === 0) return;

        const currentSection = sections[currentIndex];
        const nextIndex = (currentIndex + 1) % sections.length;

        // On mobile: if section is very tall, manually scroll one full viewport down
        if (window.innerWidth < 768 && currentSection.offsetHeight > window.innerHeight * 1.5) {
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
        } else {
            sections[nextIndex].scrollIntoView({ behavior: "smooth" });
        }
    };


    return (
        <button className="nav-bubble" onClick={scrollToNext}>
            ↓
        </button>
    );
}

export default NavBubble;
