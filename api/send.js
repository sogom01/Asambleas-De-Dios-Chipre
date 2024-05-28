---
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import SidebarButtonsContainer from "../components/SidebarButtonsContainer.astro";
import "../styles/global.css";
import "../styles/form.css";
import "../styles/sidebar-buttons.css";
---

    <html lang="es">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Peticiones de Oración - Iglesia Asambleas de Dios</title>
            <meta
                name="description"
                content="Página para enviar peticiones de oración en la Iglesia Asambleas de Dios en Chipre, Manizales."
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            />
        </head>
        <body
            class="bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 text-white"
        >
            <Header />
            <main
                class="flex flex-col items-center min-h-screen bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700"
            >
                <h1 class="text-3xl font-bold text-center mt-8 text-white">
                    Peticiones de Oración
                </h1>
                <div
                    class="max-w-xl w-full mx-auto bg-gray-800 rounded-lg shadow-lg mt-6 mb-8"
                >
                    <form id="prayerForm" class="space-y-4">
                        <div>
                            <label for="name" class="block text-white">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                class="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label for="phone" class="block text-white">Teléfono</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                class="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label for="request" class="block text-white">Petición</label>
                            <textarea
                                id="request"
                                name="request"
                                rows="4"
                                required
                                class="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>
                        <div>
                            <button
                                type="submit"
                                class="w-full p-3 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="sendButton"
                            >Enviar Petición</button
                            >
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
            <script>
                document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('prayerForm');
                form.addEventListener('submit', async function (event) {
                    event.preventDefault();
                const name = document.getElementById('name').value;
                const phone = document.getElementById('phone').value;
                const request = document.getElementById('request').value;

                try {
            const response = await fetch('/api/send', {
                    method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
              },
                body: JSON.stringify({name, phone, request})
            });

                if (response.ok) {
                    alert('Petición enviada con éxito');
            } else {
                    alert('Error al enviar la petición');
            }
          } catch (error) {
                    alert('Error al enviar la petición');
                console.error('Error:', error);
          }
        });
      });
            </script>
        </body>
    </html>
