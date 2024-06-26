document.addEventListener("DOMContentLoaded", () => {
    const addressButton = document.getElementById("address-button");

    if (addressButton) {
        addressButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace

            // Abrir el enlace en una nueva pestaña
            window.open(addressButton.href, "_blank", "noopener,noreferrer");

            // Recargar la página actual
            window.location.reload();
        });
    }
});
