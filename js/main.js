const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const yearTarget = document.getElementById("current-year");
const revealItems = document.querySelectorAll("[data-reveal]");
const sections = document.querySelectorAll("main section[id]");
const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");
const skillCarousels = document.querySelectorAll("[data-carousel]");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("menu-open", isOpen);
    });

    navAnchors.forEach((anchor) => {
        anchor.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
        });
    });
}

if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
}

if (revealItems.length) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.18 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
}

if (sections.length) {
    const setActiveLink = () => {
        let currentId = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 140;
            if (window.scrollY >= sectionTop) {
                currentId = section.id;
            }
        });

        navAnchors.forEach((anchor) => {
            anchor.classList.toggle("active", anchor.getAttribute("href") === `#${currentId}`);
        });
    };

    setActiveLink();
    window.addEventListener("scroll", setActiveLink);
}

if (skillCarousels.length) {
    skillCarousels.forEach((carousel) => {
        const slides = Array.from(carousel.querySelectorAll(".skill-slide"));
        const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
        const prevButton = carousel.querySelector("[data-carousel-prev]");
        const nextButton = carousel.querySelector("[data-carousel-next]");
        let currentIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
        let autoRotateId = null;

        if (currentIndex < 0) {
            currentIndex = 0;
        }

        const setActiveSlide = (nextIndex) => {
            currentIndex = (nextIndex + slides.length) % slides.length;

            slides.forEach((slide, index) => {
                const isActive = index === currentIndex;
                slide.classList.toggle("is-active", isActive);
                slide.setAttribute("aria-hidden", String(!isActive));
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle("is-active", index === currentIndex);
                dot.setAttribute("aria-pressed", String(index === currentIndex));
            });
        };

        const startAutoRotate = () => {
            clearInterval(autoRotateId);
            autoRotateId = window.setInterval(() => {
                setActiveSlide(currentIndex + 1);
            }, 3500);
        };

        const stopAutoRotate = () => {
            clearInterval(autoRotateId);
        };

        prevButton?.addEventListener("click", () => {
            setActiveSlide(currentIndex - 1);
            startAutoRotate();
        });

        nextButton?.addEventListener("click", () => {
            setActiveSlide(currentIndex + 1);
            startAutoRotate();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                setActiveSlide(index);
                startAutoRotate();
            });
        });

        carousel.addEventListener("mouseenter", stopAutoRotate);
        carousel.addEventListener("mouseleave", startAutoRotate);
        carousel.addEventListener("focusin", stopAutoRotate);
        carousel.addEventListener("focusout", () => {
            window.setTimeout(() => {
                if (!carousel.contains(document.activeElement)) {
                    startAutoRotate();
                }
            }, 0);
        });

        setActiveSlide(currentIndex);
        startAutoRotate();
    });
}

if (contactForm && formNote) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        formNote.textContent = "Thanks for your message. This demo form is not connected yet, but you can email me directly at sinatlek026@gmail.com.";
        contactForm.reset();
    });
}
