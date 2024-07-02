document.addEventListener("DOMContentLoaded", () => {
    const scheduleButton = document.getElementById("scheduleButton");
    const videoButton = document.getElementById("videoButton");
    const scheduleButtonMobile = document.getElementById("scheduleButtonMobile");
    const scheduleModal = document.getElementById("scheduleModal");
    const closeModalButton = document.getElementById("closeModalButton");
    const closeModalButtonVideo = document.getElementById("closeModalButtonVideo");

    scheduleButton.addEventListener("click", () => {
        scheduleModal.classList.remove("hidden");
    });

    closeModalButton.addEventListener("click", () => {
        scheduleModal.classList.add("hidden");
    });

    videoButton.addEventListener("click", () => {
        videoModal.classList.remove("hidden");
    });

    closeModalButtonVideo.addEventListener("click", () => {
        videoModal.classList.add("hidden");
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

    document.addEventListener("DOMContentLoaded", () => {
        const videoButton = document.getElementById("videoButton");
        const videoModal = document.getElementById("videoModal");
        const closeModalButtonVideo = document.getElementById("closeModalButtonVideo");
        const videoElement = videoModal.querySelector("video");

        videoButton.addEventListener("click", () => {
            videoModal.classList.remove("hidden");
            videoElement.play().catch(error => {
                console.error("Error attempting to play video:", error);
            });
        });

        closeModalButtonVideo.addEventListener("click", () => {
            videoModal.classList.add("hidden");
            videoElement.pause();
        });

        window.addEventListener("click", (event) => {
            if (event.target === videoModal) {
                videoModal.classList.add("hidden");
                videoElement.pause();
            }
        });
    });
});


