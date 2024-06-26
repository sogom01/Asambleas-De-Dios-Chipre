document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slider");
    const indicators = document.querySelectorAll(".progress-fill");
    let currentSlide = 0;
    const totalSlides = indicators.length;

    const updateSlider = () => {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle("bg-gray-400", index === currentSlide);
            indicator.style.width = index === currentSlide ? "100%" : "0%";
        });
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
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

    let startX = null;
    slider.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        clearInterval(slideInterval);
    });

    slider.addEventListener("touchmove", (e) => {
        if (startX === null) return;
        const currentX = e.touches[0].clientX;
        const diffX = startX - currentX;
        if (Math.abs(diffX) > 50) {
            diffX > 0 ? nextSlide() : prevSlide();
            startX = null;
            slideInterval = setInterval(nextSlide, 5000);
        }
    });

    updateSlider();
});