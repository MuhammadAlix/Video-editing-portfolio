import { useEffect } from "react";

export default function useSmoothScroll() {
    useEffect(() => {
        const links = document.querySelectorAll("a[href^='#']");
        const duration = 1200; // ms

        const easeInOutQuint = (t) =>
            t < 0.5
                ? 16 * t * t * t * t * t
                : 1 - Math.pow(-2 * t + 2, 5) / 2;


        function smoothScroll(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").slice(1);
            const target = document.getElementById(targetId);
            if (!target) return;

            const start = window.scrollY;
            const end = target.offsetTop;
            const distance = end - start;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const easedProgress = easeInOutQuint(progress);

                window.scrollTo(0, start + distance * easedProgress);

                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            requestAnimationFrame(animation);
        }

        links.forEach((link) => link.addEventListener("click", smoothScroll));
        return () =>
            links.forEach((link) => link.removeEventListener("click", smoothScroll));
    }, []);
}
