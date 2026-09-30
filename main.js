document.addEventListener("DOMContentLoaded", () => {

    /* MOBILE MENU */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
            });

        });

    }


    /* NAVBAR */

    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {

        if (!navbar) return;

        if (window.scrollY > 30) {
            navbar.style.background = "rgba(5, 7, 11, 0.94)";
        } else {
            navbar.style.background = "rgba(5, 7, 11, 0.72)";
        }

    });


    /* REVEAL ANIMATIONS */

    const revealElements = document.querySelectorAll(
        ".hero-content, .hero-visual, .about-grid, .service-card, .project-card, .price-card, .testimonial, .contact-box"
    );

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {
        element.classList.add("reveal");
        observer.observe(element);
    });


    /* COUNTERS */

    const counters = document.querySelectorAll("[data-count]");

    const counterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;
                const target = Number(counter.dataset.count);

                let current = 0;

                const increment = Math.max(
                    1,
                    Math.ceil(target / 50)
                );

                const updateCounter = () => {

                    current += increment;

                    if (current >= target) {
                        current = target;
                    }

                    counter.textContent = current;

                    if (current < target) {
                        requestAnimationFrame(updateCounter);
                    }

                };

                updateCounter();

                counterObserver.unobserve(counter);

            });

        },
        {
            threshold: 0.6
        }
    );


    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    /* =====================================================
   PORTFOLIO FILTERS
===================================================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioProjects = document.querySelectorAll(".portfolio-project");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        portfolioProjects.forEach(project => {

            const category = project.dataset.category;

            if (filter === "all" || category === filter) {

                project.style.display = "";

                setTimeout(() => {
                    project.style.opacity = "1";
                    project.style.transform = "translateY(0)";
                }, 30);

            } else {

                project.style.opacity = "0";
                project.style.transform = "translateY(15px)";

                setTimeout(() => {
                    project.style.display = "none";
                }, 250);

            }

        });

    });

});


/* =====================================================
   PROJECT DATA
===================================================== */

const projectData = {

    bigminds: {

        title: "Bigminds Creates",

        category: "Brand Identity",

        client: "Bigminds Creates",

        type: "Branding",

        price: "From KSh 10,000",

        tools: "Illustrator • Photoshop • CorelDraw",

        image:
            "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=85",

        description:
            "A complete creative identity and digital presence designed to give Bigminds Creates a bold, professional and memorable visual direction."

    },


    zenmoi: {

        title: "Zen Moi Tent Supplier",

        category: "Web Design",

        client: "Zen Moi",

        type: "Business Website",

        price: "From KSh 25,000",

        tools: "HTML • CSS • JavaScript",

        image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",

        description:
            "A responsive business website focused on presenting tent products, services and company information through a modern and engaging interface."

    },


    glamhub: {

        title: "MM & D's GLAM HUB",

        category: "E-Commerce",

        client: "GLAM HUB",

        type: "E-Commerce",

        price: "From KSh 60,000",

        tools: "UI/UX • HTML • CSS • JavaScript",

        image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",

        description:
            "A modern beauty and cosmetics shopping experience designed around product discovery, visual presentation and a premium customer journey."

    },


    college: {

        title: "College Management System",

        category: "Web Application",

        client: "College",

        type: "Management System",

        price: "From KSh 60,000",

        tools: "Python • Flask • SQLite • HTML • CSS",

        image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=85",

        description:
            "A full management platform designed to centralize student records, academic information, administration and institutional workflows."

    },


    storyhub: {

        title: "Leonard Odongo Story Hub",

        category: "Bookstore",

        client: "Leonard Odongo",

        type: "Bookstore / E-Commerce",

        price: "From KSh 60,000",

        tools: "HTML • CSS • JavaScript • Flask • M-Pesa",

        image:
            "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=85",

        description:
            "A digital bookstore platform designed to showcase books, support online purchases and provide an administration system for managing content."

    },


    hms: {

        title: "Integrated Hospital Management",

        category: "Application",

        client: "Healthcare Organization",

        type: "Management System",

        price: "From KSh 100,000",

        tools: "Python • Flask • SQL • JavaScript",

        image:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85",

        description:
            "An integrated healthcare management platform covering patient management, appointments, records, billing, inventory and laboratory workflows."

    }

};


/* =====================================================
   PROJECT MODAL
===================================================== */

const projectModal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalClient = document.getElementById("modalClient");
const modalType = document.getElementById("modalType");
const modalPrice = document.getElementById("modalPrice");
const modalTools = document.getElementById("modalTools");


document.querySelectorAll(".project-view").forEach(button => {

    button.addEventListener("click", () => {

        const project = projectData[button.dataset.project];

        if (!project) return;

        modalImage.src = project.image;

        modalTitle.textContent = project.title;
        modalCategory.textContent = project.category;
        modalDescription.textContent = project.description;

        modalClient.textContent = project.client;
        modalType.textContent = project.type;
        modalPrice.textContent = project.price;
        modalTools.textContent = project.tools;

        projectModal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


function closeProjectModal() {

    projectModal.classList.remove("active");

    document.body.style.overflow = "";

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeProjectModal
    );

}


document.querySelector(".modal-backdrop")?.addEventListener(
    "click",
    closeProjectModal
);


document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        projectModal.classList.contains("active")
    ) {

        closeProjectModal();

    }

});

});