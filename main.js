// main.js

// Función principal para validar y enviar el formulario
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
        obtenerMensaje();
    }
}

// Validar campos no vacíos
function validarCampo(valor, errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    if (valor.trim() === '') {
        errorElement.innerHTML = 'El campo es obligatorio';
    } else {
        errorElement.innerHTML = '';
    }
}

// Validar formato de teléfono
function validarTelefono(telefono, errorElementId) {
    const telefonoRegex = /^[0-9]+$/;
    const errorElement = document.getElementById(errorElementId);
    if (telefonoRegex.test(telefono)) {
        errorElement.innerHTML = ''; // Número de teléfono válido, no hay mensaje de error
    } else {
        errorElement.innerHTML = 'Ingrese solo números en el teléfono';
    }
}

// Validar formato de email
function validarEmail(email, errorElementId) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorElement = document.getElementById(errorElementId);
    if (emailRegex.test(email)) {
        errorElement.innerHTML = ''; // Email válido, no hay mensaje de error
    } else {
        errorElement.innerHTML = 'Ingrese un email válido';
    }
}

// Validar campo "Tipo de Consulta"
function validarConsulta(consulta, errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    if (consulta === '') {
        errorElement.innerHTML = 'Seleccione una opción';
    } else {
        errorElement.innerHTML = '';
    }
}

// Verificar si todas las validaciones son exitosas
function validarFormulario() {
    const errores = document.querySelectorAll('.error-message');
    for (const error of errores) {
        if (error.innerHTML !== '') {
            return false; // Hay al menos un error, no enviar el formulario
        }
    }
    return true; // Todas las validaciones son exitosas, se puede enviar el formulario
}

// Función para obtener el mensaje de agradecimiento desde el archivo
function obtenerMensaje() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("mensaje").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "agradecimiento.txt", true);
    xhttp.send();
}

// Asociar la función validarYEnviarFormulario al evento submit del formulario
document.forms.form_registro.onsubmit = function() {
    validarYEnviarFormulario();
    return false; // Evitar el envío convencional del formulario
};
