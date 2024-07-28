document.addEventListener("DOMContentLoaded", () => {
    const carouselInner = document.getElementById("carousel-inner");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    let currentIndex = 1;
    const totalImages = carouselInner.children.length;
    let startX, moveX, endX;

    function updateCarousel(instant = false) {
        if (instant) {
            carouselInner.style.transition = "none";
        } else {
            carouselInner.style.transition = "transform 0.5s ease-in-out";
        }
        const offset = -currentIndex * 100;
        carouselInner.style.transform = `translateX(${offset}%)`;

        Array.from(carouselInner.children).forEach((item, index) => {
            const progressShadow = item.querySelector(".progress-shadow");
            progressShadow.style.width = "0%"; // Reiniciar el progreso de la sombra
            if (index === currentIndex) {
                setTimeout(() => {
                    progressShadow.style.transition = "width 5s linear";
                    progressShadow.style.width = "100%";
                }, 100); // Pequeño retraso para reiniciar la transición
            }
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
        if (currentIndex === totalImages - 1) {
            setTimeout(() => {
                currentIndex = 1;
                updateCarousel(true);
            }, 500);
        }
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
        if (currentIndex === 0) {
            setTimeout(() => {
                currentIndex = totalImages - 2;
                updateCarousel(true);
            }, 500);
        }
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

    carouselInner.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    carouselInner.addEventListener("touchmove", (e) => {
        moveX = e.touches[0].clientX;
    });

    carouselInner.addEventListener("touchend", () => {
        endX = moveX || startX;
        const diffX = startX - endX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextImage();
            } else {
                prevImage();
            }
            resetInterval();
        }
    });

    let slideInterval = setInterval(nextImage, 5000);
    updateCarousel();
});
