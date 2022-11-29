const BASE_URL_USUARIO = "/admin/usuario";
const $btnIngresar = document.getElementById("btnIngresar");

//location.href="/busqueda"
//location.href="/admin"


$btnIngresar.addEventListener("click", () => {
    usuarios();
});

async function usuarios() {
    const response = await http.get( BASE_URL_USUARIO);
    var $correo = document.getElementById("correo").value;
    var $contrasenia = document.getElementById("contrasenia").value;
   
    let arrayCorreos = response.map((response) => response.correo);
    let arrayContrasenia = response.map((response) => response.contrasenia);
    console.log($contrasenia);
    if (arrayCorreos.includes($correo)) {
        if (arrayContrasenia[arrayCorreos.indexOf($correo)] == $contrasenia) {
            location.href="/admin"
        } else {
            //Mandar alrta de contraseña mal
            console.log("contraseña mal");
        }
    } else {
        console.log("correo mal");
    }
}
