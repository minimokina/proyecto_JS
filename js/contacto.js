//Coordenadas de Materia Creativa
const negocioLat = 37.379446;
const negocioLng = -5.999090;

// Crear mapa
const map = L.map('map').setView([negocioLat, negocioLng], 16);

// Capa OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Marcador de Materia Creativa
L.marker([negocioLat, negocioLng])
    .addTo(map)
    .bindPopup("Materia Creativa")
    .openPopup();

// Variable para evitar rutas duplicadas
let controlRuta = null;

// Botón "Cómo llegar"
document.getElementById("botonRuta").addEventListener("click", function () {

    if (!navigator.geolocation) {
        alert("Tu navegador no soporta geolocalización.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function (position) {
            const clienteLat = position.coords.latitude;
            const clienteLng = position.coords.longitude;

            // Eliminar ruta anterior si existe
            if (controlRuta) {
                map.removeControl(controlRuta);
            }

            // Crear ruta
            controlRuta = L.Routing.control({
    waypoints: [
        L.latLng(clienteLat, clienteLng),
        L.latLng(negocioLat, negocioLng)
        ],
        routeWhileDragging: false,
        addWaypoints: false,
        language: 'es',
        show: true,
        container: document.getElementById('ruta')
        }).addTo(map);


            // Marcador del cliente
            L.marker([clienteLat, clienteLng])
                .addTo(map)
                .bindPopup("Tu ubicación")
                .openPopup();
        },
        function () {
            alert("No se pudo obtener tu ubicación.");
        }
    );
});
