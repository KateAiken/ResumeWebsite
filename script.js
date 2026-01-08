// Load header
fetch("header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header").innerHTML = data;
    })
    .catch(error => console.error("Header load error:", error));

// Load footer
fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    })
    .catch(error => console.error("Footer load error:", error));

document.addEventListener("keydown", (e) => {
    const cards = document.querySelectorAll(".scroll-card");
    const slider = document.getElementById("slider");

    const cardWidth = cards[0].offsetWidth + window.innerWidth * 0.35;
    let currentIndex = Math.round(slider.scrollLeft / cardWidth);

    if (e.key === "ArrowRight") {
        currentIndex = Math.min(currentIndex + 1, cards.length - 1);
    }

    if (e.key === "ArrowLeft") {
        currentIndex = Math.max(currentIndex - 1, 0);
    }

    slider.scrollTo({
        left: currentIndex * cardWidth,
        behavior: "smooth"
    });
});

const cards = document.querySelectorAll(".scroll-card");
const slider = document.getElementById("slider");

function updateActiveCard() {
    const sliderCenter = slider.scrollLeft + slider.offsetWidth / 2;

    let closestCard = null;
    let closestDistance = Infinity;

    cards.forEach(card => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(sliderCenter - cardCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestCard = card;
        }
    });

    cards.forEach(card => card.classList.remove("active"));
    if (closestCard) closestCard.classList.add("active");
}

/* Update on scroll + initial load */
slider.addEventListener("scroll", updateActiveCard);
window.addEventListener("load", updateActiveCard);



const dotsContainer = document.getElementById("progressDots");

/* Create dots */
cards.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("progress-dot");

    dot.addEventListener("click", () => {
        const targetLeft =
            cards[index].offsetLeft -
            (slider.offsetWidth - cards[index].offsetWidth) / 2;

        slider.scrollTo({
            left: targetLeft,
            behavior: "smooth"
        });
    });

    dotsContainer.appendChild(dot);
});

/* Update active dot */
function updateActiveDot() {
    const sliderCenter = slider.scrollLeft + slider.offsetWidth / 2;

    let activeIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(sliderCenter - cardCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            activeIndex = index;
        }
    });

    document.querySelectorAll(".progress-dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === activeIndex);
    });
}

/* Sync on scroll + load */
slider.addEventListener("scroll", updateActiveDot);
window.addEventListener("load", updateActiveDot);


const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

leftArrow.addEventListener("click", () => {
    slider.scrollBy({
        left: -slider.offsetWidth,
        behavior: "smooth"
    });
});

rightArrow.addEventListener("click", () => {
    slider.scrollBy({
        left: slider.offsetWidth,
        behavior: "smooth"
    });
});
