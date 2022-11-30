const BASE_URL_USUARIO = "/admin/usuario";
const BASE_URL_ADMINISTRADOR = "/admin/administrador";
const $btnIngresar = document.getElementById("btnIngresar");

//location.href="/busqueda"
//location.href="/admin"


$btnIngresar.addEventListener("click", () => {
    usuarios();
});

async function usuarios() {
    const rUsuarios = await http.get(BASE_URL_USUARIO);
    const rAdministradores = await http.get(BASE_URL_ADMINISTRADOR);
    var $correo = document.getElementById("correo").value;
    var $contrasenia = document.getElementById("contrasenia").value;

    let arrayCorreosUsu = rUsuarios.map((rUsuarios) => rUsuarios.correo);
    let arrayContraseniaUsu = rUsuarios.map((rUsuarios) => rUsuarios.contrasenia);
    let arrayCorreosAdmi = rAdministradores.map((rAdministradores) => rAdministradores.correo);
    let arrayContraseniaAdmi = rAdministradores.map((rAdministradores) => rAdministradores.contrasenia);
    let arrayAdministradorAdmi = rAdministradores.map((rAdministradores) => rAdministradores.administrador);

    var posUsuario = arrayCorreosUsu.indexOf($correo);
    var posAmin = arrayCorreosAdmi.indexOf($correo);
    console.log(rAdministradores);

    if (arrayCorreosAdmi.includes($correo) && arrayAdministradorAdmi[posAmin] == true) {
        if (arrayContraseniaAdmi[posAmin] == $contrasenia) {

            location.href = "/admin"

        } else {
            //Mandar alrta de contraseña mal
            console.log("contraseña mal ");
        }
    } else if (arrayCorreosUsu.includes($correo)) {
        if (arrayContraseniaUsu[posUsuario] == $contrasenia) {

            location.href = "/busqueda"

        } else {
            //Mandar alrta de contraseña mal
            console.log("contraseña mal usuario");
        }
    }

}
