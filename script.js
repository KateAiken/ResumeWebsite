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


// Replace this URL with your actual "Publish to Web" Link from Google Docs
const googleDocUrl = "https://docs.google.com/document/d/e/2PACX-1vT10tTGj19srPENEazrCNa6Rg0JREAPhcrCeRtxPXe4zjkKlpQsoYgdM3_-UMG2NTbQlExHc6WeIm8E/pub";

async function loadGoogleDocSections() {
    try {
        // 1. Fetch the published document HTML
        const response = await fetch(googleDocUrl);
        const htmlText = await response.text();

        // 2. Parse the HTML text into a readable format
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        // 3. Find all Heading 1 tags in the document
        const headings = doc.querySelectorAll('h2');

        headings.forEach(heading => {
            // Clean up the text to match your HTML IDs (e.g., "About Section" becomes "about-section")
            const targetId = heading.textContent.trim().toLowerCase().replace(/\s+/g, '-');
            const targetContainer = document.getElementById(targetId);

            if (targetContainer) {
                //targetContainer.innerHTML = ''; // Clear the "Loading..." text

                // Grab all paragraphs following this heading until the next heading
                let nextSibling = heading.nextElementSibling;
                while (nextSibling && nextSibling.tagName !== 'H2' && nextSibling.tagName !== 'H1') {
                    // Clone the paragraph element to keep formatting like bold or links
                    targetContainer.appendChild(nextSibling.cloneNode(true));
                    nextSibling = nextSibling.nextElementSibling;
                }
            }
        });
    } catch (error) {
        console.error("Error loading text from Google Doc:", error);
    }
}

// Run the function when the webpage finishes loading
window.addEventListener('DOMContentLoaded', loadGoogleDocSections);