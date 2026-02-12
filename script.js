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

});

