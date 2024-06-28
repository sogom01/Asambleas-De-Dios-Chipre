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

    // iOS-specific video playback handling
    const playPromise = video.play();
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log('Video started successfully.');
            })
            .catch((error) => {
                console.log('Error starting video:', error);
                // Retry on user interaction
                video.addEventListener('click', () => {
                    video.play();
                });
            });
    }

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
        video.pause();
        video.currentTime = 0;
    }
}

function handleOpen() {
    document.querySelector("#modal").classList.remove("hidden");
    const video = document.querySelector("#modal-video");
    if (video) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                video.pause();
            });
        }
    }
}
