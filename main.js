// Obtener valores de los campos y realizar validaciones
function validarYEnviarFormulario() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;
    const consulta = document.getElementById("consulta").value;
    const asunto = document.getElementById("asunto").value;
    const descripcion = document.getElementById("descripcion").value;
    const password = document.getElementById("password").value;

    // Validaciones
    validarCampo(nombre, "error_nombre");
    validarCampo(apellido, "error_apellido");
    validarTelefono(telefono, "error_telefono");
    validarEmail(email, "error_email");
    validarConsulta(consulta, "error_consulta");
    validarCampo(asunto, "error_asunto");
    validarCampo(descripcion, "error_descripcion");
    validarCampo(password, "error_password");

    // Verificar si todas las validaciones son exitosas antes de enviar el formulario
    if (validarFormulario()) {
        // Realizar la solicitud AJAX
        enviarFormulario();
    }
}

// Función para enviar el formulario
function enviarFormulario() {
    // Ocultar el formulario
    document.getElementById("formulario").style.display = "none";

    // Mostrar el mensaje de agradecimiento
    document.getElementById("mensaje").style.display = "block";

    // Realizar la solicitud AJAX
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
        console.log("onreadystatechange");
        console.log(http.readyState); // si todo está bien un 4 o 200 sino un 400
        console.log(http.status);

        // Verificamos el estado
        if (http.readyState == 4 && http.status == 200) {
            // Actualiza el elemento HTML con la respuesta del servidor.
            document.getElementById("mensaje").innerHTML = http.responseText;
        }
    };

    // Leer el archivo
    http.open('GET', 'https://bochita08.github.io/agradecimiento.txt', true);
    http.send();
}
getMensaje();
// Asociar la función validarYEnviarFormulario al evento submit del formulario
document.forms.form_registro.onsubmit = function() {
    validarYEnviarFormulario();
    return false; // Evitar el envío convencional del formulario
};
