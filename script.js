// ===============================
// Mouse Glow Effect
// ===============================

const glow = document.querySelector(".cursor-glow");

if (glow) {
    document.addEventListener("mousemove", (e) => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    });
}

// ===============================
// Premium Hamburger Menu
// ===============================

const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("active");
        menuToggle.classList.toggle("active");

    });

}
// ==============================
// Scroll To Top Button
// ==============================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
// ==============================
// Live Tool Search
// ==============================

const searchInput = document.getElementById("toolSearch");
const toolCards = document.querySelectorAll(".tool-card");

if (searchInput) {

    searchInput.addEventListener("keyup", () => {

        const value = searchInput.value.toLowerCase();

        toolCards.forEach(card => {

            const text = card.textContent.toLowerCase();

            if (text.includes(value)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }

        });

    });

}
