document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("prayerForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const request = document.getElementById("request").value;

        const whatsappURL = `https://api.whatsapp.com/send?phone=573126691924&text=Nueva%20Petición%20de%20Oración%0A%0ANombre:%20${encodeURIComponent(name)}%0ATeléfono:%20${encodeURIComponent(phone)}%0APetición:%20${encodeURIComponent(request)}`;

        window.open(whatsappURL, "_blank");

        // Limpiar los campos del formulario
        form.reset();
    });
});

