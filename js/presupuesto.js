/* ===============================
   VALIDACIÓN DEL FORMULARIO
================================ */
function validarFormulario() {
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();
    const politica = document.getElementById("politica").checked;

    const regexNombre = /^[A-Za-z]{1,15}$/;
    const regexApellidos = /^[A-Za-z\s]{1,40}$/;
    const regexTelefono = /^[0-9]{9}$/;
    const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!regexNombre.test(nombre)) {
        alert("Nombre inválido. Solo letras y máximo 15 caracteres.");
        return false;
    }

    if (!regexApellidos.test(apellidos)) {
        alert("Apellidos inválidos. Solo letras y máximo 40 caracteres.");
        return false;
    }

    if (!regexTelefono.test(telefono)) {
        alert("El teléfono debe tener 9 dígitos.");
        return false;
    }

    if (!regexEmail.test(email)) {
        alert("Correo electrónico no válido.");
        return false;
    }

    if (!politica) {
        alert("Debes aceptar la política de privacidad.");
        return false;
    }

    alert("Formulario enviado correctamente.");
    return true;
}

/* ===============================
   CÁLCULO DEL PRESUPUESTO
================================ */
document.addEventListener("DOMContentLoaded", () => {

    const producto = document.getElementById("producto");
    const plazo = document.getElementById("plazo");
    const total = document.getElementById("total");
    const extras = document.querySelectorAll('input[name="extras"]');

    function calcularPresupuesto() {
        const precioProducto = parseFloat(producto.value) || 0;
        const plazoValor = parseInt(plazo.value) || 0;

        if (!precioProducto) {
            total.value = "";
            return;
        }

        let extrasTotal = 0;
        extras.forEach(extra => {
            if (extra.checked) {
                extrasTotal += parseFloat(extra.value);
            }
        });

        let suma = precioProducto + extrasTotal;

        // Descuento por plazo
        if (plazoValor >= 6 && plazoValor <= 12) {
            suma *= 0.95;
        } else if (plazoValor >= 13) {
            suma *= 0.90;
        }

        total.value = suma.toFixed(2) + " €";
    }

    producto.addEventListener("change", calcularPresupuesto);
    plazo.addEventListener("input", calcularPresupuesto);
    extras.forEach(extra => extra.addEventListener("change", calcularPresupuesto));
});

 