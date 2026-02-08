document.addEventListener("DOMContentLoaded", () => {

    /* Load header */
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
        })
        .catch(error => console.error("Header load error:", error));

    /* Load footer */
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        })
        .catch(error => console.error("Footer load error:", error));

    const cards = document.querySelectorAll(".scroll-card");
    const slider = document.getElementById("slider");
    const dotsContainer = document.getElementById("progressDots");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");

    if (!slider || cards.length === 0) return;

    /* Active card */
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

    slider.addEventListener("scroll", updateActiveCard);
    updateActiveCard();

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

    /* Active dot */
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

    slider.addEventListener("scroll", updateActiveDot);
    updateActiveDot();

    /* Arrows */
    leftArrow?.addEventListener("click", () => {
        slider.scrollBy({
            left: -slider.offsetWidth,
            behavior: "smooth"
        });
    });

    rightArrow?.addEventListener("click", () => {
        slider.scrollBy({
            left: slider.offsetWidth,
            behavior: "smooth"
        });
    });

});

// Get all buttons and panels
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        const target = button.getAttribute("data-tab");

        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabPanels.forEach(panel => panel.classList.remove("active"));

        // Activate clicked button and corresponding panel
        button.classList.add("active");
        document.getElementById(target).classList.add("active");
    });
});


const scrollContainer = document.querySelector('.horizontal-scroll').focus();
const leftBtn = document.querySelector('.slider-button.left');
const rightBtn = document.querySelector('.slider-button.right');

const scrollAmount = scrollContainer.clientWidth * 0.8;

// Arrow buttons
leftBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

rightBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

// Keyboard arrows (listen on document)
document.addEventListener('keydown', (event) => {
    if(event.key === "ArrowLeft") {
        scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if(event.key === "ArrowRight") {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
});
