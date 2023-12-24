function validarFormulario(){
    var nombre = document.getElementById("nombre").value.trim();
    var apellido = document.getElementById("apellido").value.trim();
    var direccion = document.getElementById("direccion").value.trim();
    var Ciudad = document.getElementById("Ciudad").value.trim();
    var codigopostal = document.getElementById("codigopostal").value.trim();
    var telefono = document.getElementById("telefono").value.trim();
    var Usuario = document.getElementById("Usuario").value.trim();
    var Contraseña = document.getElementById("Contraseña").value.trim();
    var mail = document.getElementById("mail").value.trim();

    // Espacios en blanco
    if (nombre === "" || apellido === "" || direccion === "" || telefono === "" || Ciudad === "" || codigopostal === "" || telefono === "" || Usuario === "" || Contraseña === "" || mail === "") {
        alert("Debe llenar todos los datos del formulario");
        return false;
    }

    // Condiciones de cómo se debe escribir correctamente dentro de los campos
    var nombreTest = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/.test(nombre);
    if (nombreTest === false) {
        alert("Ingrese su primer nombre correctamente");
        return false;
    }

    var apellidoTest = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/.test(apellido);
    if (apellidoTest === false) {
        alert("Ingrese su Apellido correctamente");
        return false;
    }

    var direccionTest = /^[a-zA-Z0-9À-ÿ\s\-,.#]+$/i.test(direccion);
    if (direccionTest === false) {
        alert("Ingrese su Dirección correctamente");
        return false;
    }

    var ciudadTest = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/.test(Ciudad);
    if (ciudadTest === false) {
        alert("Ingrese su Ciudad correctamente");
        return false;
    }

    var codigopostalTest = /^[0-9]{5}$/i.test(codigopostal);

    if (codigopostalTest === false) {
        alert("Ingrese su Código Postal correctamente (deben ser 5 dígitos numéricos)");
        return false;
    }

    var telefonoTest = /^\d{7,}$/g.test(telefono);

    if (telefonoTest === false) {
        alert("Ingrese un número de teléfono válido (al menos 7 dígitos)");
        return false;
    }

    var UsuarioTest = /^[a-zA-Z0-9_-]{4,20}$/.test(Usuario);

    if (UsuarioTest === false) {
        alert("Ingrese un nombre de usuario válido (4-20 caracteres alfanuméricos, guiones bajos o guiones)");
        return false;
    }

    var ContraseñaTest = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/.test(Contraseña);

    if (ContraseñaTest === false) {
        alert("La contraseña debe contener al menos 8 caracteres, incluyendo al menos una letra minúscula, una letra mayúscula, un número y un carácter especial.");
        return false;
    }
    var mailTest = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail);

    if (mailTest === false) {
        alert("Ingrese una dirección de correo electrónico válida");
        return false;
    }


}
