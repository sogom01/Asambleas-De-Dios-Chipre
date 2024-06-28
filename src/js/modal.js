document.addEventListener("DOMContentLoaded", function () {
    const pathname = window.location.pathname;

    if (pathname === "/" || pathname === "/about") {
        handleOpen();
    }

    document
        .querySelector("#modal-close-btn")
        .addEventListener("click", handleClose);
    document
        .querySelector("#modal-background")
        .addEventListener("click", handleClose);

    const video = document.querySelector("#modal-video");
    const progressBar = document.querySelector("#progress-bar");

    video.addEventListener("timeupdate", function () {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.style.width = progress + "%";
    });

    video.addEventListener("ended", function () {
        video.currentTime = 0;
        video.play();
    });
});

function handleClose() {
    document.querySelector("#modal").classList.add("hidden");
    const video = document.querySelector("#modal-video");
    if (video) {
        video.pause(); // Pausa el video
        video.currentTime = 0; // Reinicia el tiempo del video
    }
}

function handleOpen() {
    document.querySelector("#modal").classList.remove("hidden");
}