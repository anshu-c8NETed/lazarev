// ==================== LOCOMOTIVE SCROLL ====================
function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        tablet: { smooth: true },
        smartphone: { smooth: true }
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    return locoScroll;
}

// ==================== LOADING ANIMATION ====================
function loadingAnimation() {
    const tl = gsap.timeline();
    
    tl.from("#page1", {
        opacity: 0,
        duration: 0.2,
        delay: 0.2
    })
    .from("#page1", {
        transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
        borderRadius: "150px",
        duration: 2,
        ease: "expo.out"
    })
    .from("nav", {
        opacity: 0,
        delay: -0.2
    })
    .from("#page1 h1, #page1 p, #page1 div", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.2
    });
}

// ==================== NAVIGATION ANIMATIONS ====================
function navAnimation() {
    const nav = document.querySelector("nav");

    nav.addEventListener("mouseenter", function () {
        const tl = gsap.timeline();

        tl.to("#nav-bottom", {
            height: "21vh",
            duration: 0.5
        })
        .to(".nav-part2 h5", {
            display: "block",
            duration: 0.1
        })
        .to(".nav-part2 h5 span", {
            y: 0,
            stagger: {
                amount: 0.5
            }
        });
    });

    nav.addEventListener("mouseleave", function () {
        const tl = gsap.timeline();
        
        tl.to(".nav-part2 h5 span", {
            y: 25,
            stagger: {
                amount: 0.2
            }
        })
        .to(".nav-part2 h5", {
            display: "none",
            duration: 0.1
        })
        .to("#nav-bottom", {
            height: 0,
            duration: 0.2
        });
    });
}

// ==================== NAVBAR SCROLL EFFECT ====================
function navbarScrollEffect() {
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ==================== MOBILE MENU ====================
function mobileMenuAnimation() {
    const hamburger = document.querySelector("#hamburger");
    const mobileMenu = document.querySelector("#mobile-menu");
    const mobileClose = document.querySelector("#mobile-close");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    if (!hamburger || !mobileMenu) {
        console.log("Hamburger or mobile menu not found");
        return;
    }

    // Open menu
    hamburger.addEventListener("click", function(e) {
        e.stopPropagation();
        openMenu();
    });

    // Close menu - Close button
    if (mobileClose) {
        mobileClose.addEventListener("click", function(e) {
            e.stopPropagation();
            closeMenu();
        });
    }

    // Close menu - Nav links
    mobileLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            closeMenu();
            
            setTimeout(() => {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 400);
        });
    });

    // Close on escape key
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
            closeMenu();
        }
    });

    // Close when clicking outside menu
    document.addEventListener("click", function(e) {
        if (mobileMenu.classList.contains("active") && 
            !mobileMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            closeMenu();
        }
    });

    // Prevent menu from closing when clicking inside it
    mobileMenu.addEventListener("click", function(e) {
        e.stopPropagation();
    });

    // Open menu function
    function openMenu() {
        hamburger.classList.add("active");
        mobileMenu.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    // Close menu function
    function closeMenu() {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "auto";
    }
}

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
function smoothScrollLinks() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            // Only prevent default if not in mobile menu
            if (!this.classList.contains('mobile-nav-link')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// ==================== PAGE 2 ANIMATION ====================
function page2Animation() {
    const rightElems = document.querySelectorAll(".right-elem");

    rightElems.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            gsap.to(elem.childNodes[3], {
                opacity: 1,
                scale: 1
            });
        });
        
        elem.addEventListener("mouseleave", function () {
            gsap.to(elem.childNodes[3], {
                opacity: 0,
                scale: 0
            });
        });
        
        elem.addEventListener("mousemove", function (dets) {
            gsap.to(elem.childNodes[3], {
                x: dets.x - elem.getBoundingClientRect().x - 90,
                y: dets.y - elem.getBoundingClientRect().y - 215
            });
        });
    });
}

// ==================== PAGE 3 VIDEO ANIMATION ====================
function page3VideoAnimation() {
    const page3Center = document.querySelector(".page3-center");
    const video = document.querySelector("#page3 video");

    if (!page3Center || !video) return;

    page3Center.addEventListener("click", function () {
        video.play();
        gsap.to(video, {
            transform: "scaleX(1) scaleY(1)",
            opacity: 1,
            borderRadius: 0
        });
    });
    
    video.addEventListener("click", function () {
        video.pause();
        gsap.to(video, {
            transform: "scaleX(0.7) scaleY(0)",
            opacity: 0,
            borderRadius: "30px"
        });
    });
}

// ==================== PAGE 4 PROJECT HOVER ====================
function page4Animation() {
    const sections = document.querySelectorAll(".sec-right");

    sections.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            const video = elem.querySelector('video');
            if (video) {
                video.style.opacity = 1;
                video.play();
            }
        });
        
        elem.addEventListener("mouseleave", function () {
            const video = elem.querySelector('video');
            if (video) {
                video.style.opacity = 0;
                video.load();
            }
        });
    });
}

// ==================== PAGE 6 ANIMATIONS ====================
function page6Animations() {
    gsap.from("#btm6-part2 h4", {
        x: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#btm6-part2",
            scroller: "#main",
            start: "top 80%",
            end: "top 10%",
            scrub: true
        }
    });
}

// ==================== ANIMATE ON SCROLL ====================
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.right-elem, .section, .page5-elem');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ==================== CTA BUTTON ANIMATION ====================
function ctaButtonAnimation() {
    const ctaBtn = document.querySelector('#cta-btn');
    const becomeClientBtn = document.querySelector('#become-client');
    
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            const footer = document.querySelector('#footer');
            if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    if (becomeClientBtn) {
        becomeClientBtn.addEventListener('click', () => {
            const footer = document.querySelector('#footer');
            if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ==================== CURSOR EFFECT (Desktop Only) ====================
function customCursor() {
    if (window.innerWidth > 968) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animate() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animate);
        }
        animate();

        // Add hover effects
        const hoverElements = document.querySelectorAll('a, button, .right-elem, .page5-elem, .sec-right');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
}

// Add cursor styles dynamically
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid #0BA34E;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease, opacity 0.2s ease;
        opacity: 0.6;
    }
    .custom-cursor.hover {
        transform: scale(1.5);
        opacity: 1;
        background: rgba(11, 163, 78, 0.1);
    }
`;
document.head.appendChild(cursorStyle);

// ==================== PARALLAX EFFECT ====================
function parallaxEffect() {
    gsap.to("#page1 h1", {
        y: 50,
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
}

// ==================== INITIALIZE ALL FUNCTIONS ====================
function init() {
    // Check if on mobile
    const isMobile = window.innerWidth <= 968;
    
    if (!isMobile) {
        locomotiveAnimation();
        navAnimation();
        page6Animations();
        parallaxEffect();
    } else {
        navbarScrollEffect();
    }
    
    loadingAnimation();
    mobileMenuAnimation();
    smoothScrollLinks();
    page2Animation();
    page3VideoAnimation();
    page4Animation();
    animateOnScroll();
    ctaButtonAnimation();
    
    if (!isMobile) {
        customCursor();
    }
}

// Run when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Reinitialize on window resize with debounce
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const currentWidth = window.innerWidth;
        const wasMobile = window.wasMobile || false;
        const isMobile = currentWidth <= 968;
        
        // Reinit if switching between mobile/desktop
        if (isMobile !== wasMobile) {
            window.wasMobile = isMobile;
            location.reload(); // Reload for clean state
        }
    }, 250);
});

window.wasMobile = window.innerWidth <= 968;