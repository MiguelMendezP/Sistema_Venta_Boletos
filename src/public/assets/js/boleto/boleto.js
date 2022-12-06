const boleto = (() => {
    const $correoUsuario = document.getElementById("correoUsuario");
    const BASE_URL_PASAJERO = "/pasajero";
    const BASE_URL_USUARIO = "/admin/usuario";
    const BASE_URL_BOLETO = "/mis-boletos";
    const BASE_URL_SALIDA = "/admin/salida";

    async function crearBoleto() {
        const responseUsuario = await http.get(BASE_URL_USUARIO);
        const responseBoleto = await http.get(BASE_URL_BOLETO);
        const responseSalida = await http.get(BASE_URL_SALIDA);
        const responsePasajero = await http.get(BASE_URL_PASAJERO);

        let mapUsuario_Correos = responseUsuario.map((responseUsuario) => responseUsuario.correo);

        var posidUsuario = mapUsuario_Correos.indexOf($correoUsuario.innerHTML.trim());
        var idUsuario = responseUsuario[posidUsuario].idUsuario;

        var j = 0;
        for (let i = 0; i < responseBoleto.length; i++) {
            if (responseBoleto[i].idUsuario == idUsuario && responsePasajero[i].idUsuario == idUsuario) {
                var pasajero = responsePasajero[i].nombre + " " + responsePasajero[i].apellido;

                while (j < responseSalida.length) {
                    if (responseBoleto[i].idSalida == responseSalida[j].idSalida) {
                        var terminalO = responseSalida[j].terminal_salida;
                        var terminalD = responseSalida[j].terminal_destino;
                        var fecha = responseSalida[j].fecha +" a las "+responseSalida[j].hora;
                        var precio = responseSalida[j].precio;

                        crearRecuadro(i, terminalO, terminalD, pasajero, fecha, precio);
                        j = responseSalida.length;
                    }
                    j++;
                }
                j = 0;
            }
        }
    }

    function crearElemento(tipoElem, id, clase, donde, text) {
        const $donde = document.getElementById(donde);
        const elem = document.createElement(tipoElem);
        elem.innerText = text
        elem.setAttribute("id", id);
        elem.setAttribute("class", clase);
        $donde.appendChild(elem);
    }

    function crearRecuadro(id, terminalO, terminalD, pasajero, fecha, precio) {
        crearElemento("div", "c1--" + id, "c1", "form", null);
        crearElemento("div", "c2--" + id, "c2", "c1--" + id, null);
        crearElemento("div", "c21--" + id, "c21", "c2--" + id, null);
        crearElemento("div", "c211--" + id, null, "c21--" + id, null);
        crearElemento("h1", null, null, "c211--" + id, "Origen");
        crearElemento("p", "terminalO--" + id, null, "c211--" + id, terminalO);
        crearElemento("div", "c212--" + id, null, "c21--" + id, null);
        crearElemento("h1", null, null, "c212--" + id, "Destino");
        crearElemento("p", "terminalD--" + id, null, "c212--" + id, terminalD);
        crearElemento("div", null, null, "c21--" + id, null);
        crearElemento("div", "c22--" + id, "c22", "c2--" + id, null);
        crearElemento("p", "terminalO--" + id, null, "c22--" + id, "Pasajero(a): " + pasajero);
        crearElemento("p", "terminalO--" + id, null, "c22--" + id, "Fecha: el dia " + fecha);
        crearElemento("p", "terminalO--" + id, null, "c22--" + id, "Precio: $" + precio + ".00");
        crearElemento("div", "c3--" + id, "c3", "c1--" + id, null);
        crearElemento("button", "btn--" + id, "btn", "c3--" + id, "Descargar Boleto");
        crearElemento("p", null, null, "form", null);
    }


    const _initElements = () => {
        crearBoleto();
    };

    return {
        init: () => {
            _initElements();
        },
    };
})();

boleto.init();