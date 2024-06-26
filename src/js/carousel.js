import Hammer from "hammerjs";

document.addEventListener("DOMContentLoaded", () => {
    const carouselInner = document.getElementById("carousel-inner");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const indicators = Array.from(
        document.getElementsByClassName("carousel-indicator")
    );
    let currentIndex = 0;
    const totalImages = indicators.length;
    let slideInterval;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        if (carouselInner instanceof HTMLElement) {
            carouselInner.style.transform = `translateX(${offset}%)`;
        }
        indicators.forEach((indicator, index) => {
            const fill = indicator.querySelector(".fill");
            if (fill instanceof HTMLElement) {
                fill.style.width = index === currentIndex ? "100%" : "0%";
            }
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
    }

    prevButton.addEventListener("click", () => {
        prevImage();
        resetInterval();
    });

    nextButton.addEventListener("click", () => {
        nextImage();
        resetInterval();
    });

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextImage, 5000);
    }

    // Add touch functionality
    const hammer = new Hammer(carouselInner);
    hammer.on("swipeleft", () => {
        nextImage();
        resetInterval();
    });

    hammer.on("swiperight", () => {
        prevImage();
        resetInterval();
    });

    slideInterval = setInterval(nextImage, 5000);
    updateCarousel();
});