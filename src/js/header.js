document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("mobile-menu-button");
    const closeMenuButton = document.getElementById("close-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    menuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
    });

    closeMenuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
    });
});