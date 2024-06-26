document.addEventListener("DOMContentLoaded", () => {
    const scheduleButton = document.getElementById("scheduleButton");
    const scheduleButtonMobile = document.getElementById("scheduleButtonMobile");
    const scheduleModal = document.getElementById("scheduleModal");
    const closeModalButton = document.getElementById("closeModalButton");

    scheduleButton.addEventListener("click", () => {
        scheduleModal.classList.remove("hidden");
    });

    closeModalButton.addEventListener("click", () => {
        scheduleModal.classList.add("hidden");
    });

    window.addEventListener("click", (event) => {
        if (event.target === scheduleModal) {
            scheduleModal.classList.add("hidden");
        }
    });

    scheduleButtonMobile.addEventListener("click", () => {
        scheduleModal.classList.remove("hidden");
    });

    closeModalButton.addEventListener("click", () => {
        scheduleModal.classList.add("hidden");
    });

    window.addEventListener("click", (event) => {
        if (event.target === scheduleModal) {
            scheduleModal.classList.add("hidden");
        }
    });



    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMobileMenuButton = document.getElementById("close-menu-button");

    mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    closeMobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
    });
});
