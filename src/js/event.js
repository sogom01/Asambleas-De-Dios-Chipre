document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slider");
    const slides = document.querySelectorAll(".event-card");
    let currentSlide = 0;
    const totalSlides = slides.length;

    const updateSlider = (instant = false) => {
        if (instant) {
            slider.style.transition = "none";
        } else {
            slider.style.transition = "transform 0.5s ease-in-out";
        }
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;

        slides.forEach((slide, index) => {
            const progressShadow = slide.querySelector(".progress-shadow");
            progressShadow.style.width = "0%"; // Reiniciar el progreso de la sombra
            if (index === currentSlide) {
                setTimeout(() => {
                    progressShadow.style.transition = "width 5s linear";
                    progressShadow.style.width = "100%";
                }, 100); // Pequeño retraso para reiniciar la transición
            }
        });
    };

    const nextSlide = () => {
        if (currentSlide >= totalSlides - 1) {
            currentSlide = 0;
            updateSlider(true);
            setTimeout(() => {
                slider.style.transition = "transform 0.5s ease-in-out";
                currentSlide++;
                updateSlider();
            }, 20);
        } else {
            currentSlide++;
            updateSlider();
        }
    };

    const prevSlide = () => {
        if (currentSlide <= 0) {
            currentSlide = totalSlides - 1;
            updateSlider(true);
            setTimeout(() => {
                slider.style.transition = "transform 0.5s ease-in-out";
                currentSlide--;
                updateSlider();
            }, 20);
        } else {
            currentSlide--;
            updateSlider();
        }
    };

    document.getElementById("next").addEventListener("click", () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });

    document.getElementById("prev").addEventListener("click", () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });

    let slideInterval = setInterval(nextSlide, 5000);

    slider.addEventListener("touchstart", (e) => {
        const startX = e.touches[0].clientX;
        clearInterval(slideInterval);
        slider.addEventListener("touchmove", (e) => {
            const currentX = e.touches[0].clientX;
            const diffX = startX - currentX;
            if (Math.abs(diffX) > 50) {
                diffX > 0 ? nextSlide() : prevSlide();
                slideInterval = setInterval(nextSlide, 5000);
            }
        }, { once: true });
    });

    updateSlider();
});
