// ===== Dark / Light Mode Toggle =====
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// عند فتح الصفحة، تحقق إذا كان المستخدم اختار وضع فاتح قبل هيك
if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", function () {
    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
});
// ===== 1. Menu hamburger (mobile) =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

// ===== 2. Animation des barres de compétences =====
const skillBars = document.querySelectorAll(".skill-fill");

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            const targetWidth = entry.target.getAttribute("data-width");
            entry.target.style.width = targetWidth;
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(function (bar) {
    observer.observe(bar);
});

// ===== 3. Lien actif dans le menu selon le scroll =====
const sections = document.querySelectorAll("section, .hero");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(function (item) {
        item.classList.remove("active-link");
        if (item.getAttribute("href") === "#" + current) {
            item.classList.add("active-link");
        }
    });
});