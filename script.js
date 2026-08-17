// ===== Menu hamburger (mobile) =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

// ===== Animation des barres de compétences =====
const skillBars = document.querySelectorAll(".skill-fill");



// ===== Lien actif dans le menu selon le scroll =====
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

// ===== Dark / Light Mode Toggle =====
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const heroSection = document.querySelector(".hero");

function updateHeroBackground(isLight) {
    if (isLight) {
        heroSection.style.backgroundImage = "url('images/background2.jpg')";
    } else {
        heroSection.style.backgroundImage = "url('images/background.jpg')";
    }
}

// عند فتح الصفحة، تحقق إذا كان المستخدم اختار وضع فاتح قبل هيك
if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
    themeToggle.textContent = "☀️";
    updateHeroBackground(true);
}

themeToggle.addEventListener("click", function () {
    body.classList.toggle("light-mode");
    const isLight = body.classList.contains("light-mode");

    updateHeroBackground(isLight);

    if (isLight) {
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
});

// ===== Effet 3D tilt sur les cartes (réutilisable) =====
function attachTiltEffect() {
    const tiltCards = document.querySelectorAll(".skill-item, .timeline-item");

    tiltCards.forEach(function (card) {
        card.addEventListener("mousemove", function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform =
                `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
            card.style.boxShadow =
                `${-rotateY * 2}px ${rotateX * 2}px 25px rgba(139, 92, 246, 0.35)`;
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "perspective(600px) rotateX(0) rotateY(0) scale(1)";
            card.style.boxShadow = "none";
        });
    });
}
// ===== CV Dropdown =====
const cvButton = document.getElementById("cvButton");
const cvMenu = document.getElementById("cvMenu");

cvButton.addEventListener("click", function (e) {
    e.stopPropagation();
    cvMenu.classList.toggle("active");
});

document.addEventListener("click", function () {
    cvMenu.classList.remove("active");
});
// ===== Chargement dynamique des compétences =====
fetch('skills-data.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const container = document.getElementById('skillsContainer');
        let html = '';

        for (const categorie in data) {
            html += `<h3 class="skills-subtitle">${categorie}</h3>`;
            html += `<div class="skills-grid">`;

            data[categorie].forEach(function (skill) {
                const badgeClass = skill.niveau === "Intermédiaire" ? "badge-intermediaire" : "badge-debutant";
                html += `
                    <div class="skill-item">
                        <span class="skill-name">${skill.nom}</span>
                        <span class="skill-badge ${badgeClass}">${skill.niveau}</span>
                    </div>
                `;
            });

            html += `</div>`;
        }

        container.innerHTML = html;
        attachTiltEffect();
    });

// ===== Chargement dynamique de l'expérience =====
fetch('experience-data.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const container = document.getElementById('experienceContainer');
        let html = '';

        data.forEach(function (exp) {
            html += `
                <div class="timeline-item">
                    <h3>${exp.titre}</h3>
                    <span class="timeline-date">${exp.organisation}</span>
                    <p>${exp.description}</p>
                </div>
            `;
        });

        container.innerHTML = html;
        attachTiltEffect();
    });