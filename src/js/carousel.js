document.addEventListener("DOMContentLoaded", () => {
    const carouselInner = document.getElementById("carousel-inner");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    let currentIndex = 1;
    const totalImages = carouselInner.children.length - 2; // Excluir los duplicados

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
        if (currentIndex >= totalImages) {
            currentIndex++;
            updateCarousel();
            setTimeout(() => {
                currentIndex = 1;
                updateCarousel(true);
            }, 500); // Dar tiempo a la transición para completar
        } else {
            currentIndex++;
            updateCarousel();
        }
    }

    function prevImage() {
        if (currentIndex <= 0) {
            currentIndex--;
            updateCarousel();
            setTimeout(() => {
                currentIndex = totalImages;
                updateCarousel(true);
            }, 500); // Dar tiempo a la transición para completar
        } else {
            currentIndex--;
            updateCarousel();
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

    // Integrar Hammer.js para manejo de gestos
    const hammer = new Hammer(carouselInner);
    hammer.on("swipeleft", () => {
        nextImage();
        resetInterval();
    });
    hammer.on("swiperight", () => {
        prevImage();
        resetInterval();
    });

    let slideInterval = setInterval(nextImage, 5000);
    updateCarousel();
});
