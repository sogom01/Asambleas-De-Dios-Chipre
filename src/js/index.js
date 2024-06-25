document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".sidebar-button");

    // Restablecer el estado de los botones cuando la página se vuelve visible
    document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "visible") {
            setTimeout(() => {
                buttons.forEach((button) => {
                    button.classList.remove("expanded");
                });
            }, 100); // Retraso breve para asegurarse de que el DOM se actualice correctamente
        }
    });

    // Manejar el estado de los botones al hacer clic
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            button.classList.remove("expanded");
        });

        button.addEventListener("mouseover", () => {
            button.classList.add("expanded");
        });

        button.addEventListener("mouseout", () => {
            if (!button.matches(":hover")) {
                button.classList.remove("expanded");
            }
        });
    });
});
