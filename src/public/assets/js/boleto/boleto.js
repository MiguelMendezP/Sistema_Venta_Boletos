const boleto = (() => {
    const $formContainer01 = document.getElementById("formContainer01");
    const $correoUsuario = document.getElementById("correoUsuario");
    const BASE_URL_PASAJERO = "/pasajero";
    const BASE_URL_USUARIO = "/admin/usuario";
    const BASE_URL_BOLETO = "/mis-boletos";
    const BASE_URL_SALIDA = "/admin/salida";

    function setData(idBoleto, nombre, origen, destino, num, fecha, hora, precio) {
        document.getElementById("nombre").innerHTML = nombre;
        document.getElementById("origen").innerHTML = origen;
        document.getElementById("destino").innerHTML = destino;
        document.getElementById("num").innerHTML = num;
        document.getElementById("fecha").innerHTML = fecha;
        document.getElementById("hora").innerHTML = hora;
        document.getElementById("numFolio").innerHTML = idBoleto;
        document.getElementById("precio").innerHTML = "$"+precio;
    }

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
                        var idBoleto = responseBoleto[i].idBoleto;
                        if(responseBoleto[i].noAsiento>=10){
                            var asiento = responseBoleto[i].noAsiento;
                        }else{
                            var asiento = "0"+responseBoleto[i].noAsiento;
                        }
                        var terminalO = responseSalida[j].terminal_salida;
                        var terminalD = responseSalida[j].terminal_destino;
                        var fecha = responseSalida[j].fecha +" a las "+responseSalida[j].hora;
                        var fecha = responseSalida[j].fecha
                        var hora = responseSalida[j].hora;
                        var precio = responseSalida[j].precio;

                        crearRecuadro(idBoleto, terminalO, terminalD, pasajero, fecha, hora, precio, asiento);
                        j = responseSalida.length;
                    }
                    j++;
                }
                j = 0;
            }
        }
    }

    document.addEventListener("click", (event) => {
        const clickedElement = event.target;
        if (clickedElement.matches('.btn')) {
            var idBoleto = (event.target.id).substring(5, (event.target.id).length);
            var nombre = document.getElementById("pasajero--"+idBoleto).innerHTML;
            var origen = document.getElementById("terminalO--"+idBoleto).innerHTML;
            var destino = document.getElementById("terminalD--"+idBoleto).innerHTML;
            var num = document.getElementById("numBol--"+idBoleto).innerHTML;
            var fecha = document.getElementById("fecha--"+idBoleto).innerHTML;
            var hora = document.getElementById("hora--"+idBoleto).innerHTML;
            var precio = document.getElementById("precio--"+idBoleto).innerHTML;

            setData(idBoleto, nombre, origen, destino, num, fecha, hora, precio)
            boleto.setVisible(false);
            tiketBoleto.setVisible(true);
        }
    });

    function crearElemento(tipoElem, id, clase, donde, text) {
        const $donde = document.getElementById(donde);
        const elem = document.createElement(tipoElem);
        elem.innerText = text
        elem.setAttribute("id", id);
        elem.setAttribute("class", clase);
        $donde.appendChild(elem);
    }

    function crearRecuadro(id, terminalO, terminalD, pasajero, fecha, hora, precio,asiento) {
        crearElemento("div", "c1--" + id, "c1", "form", null);
        crearElemento("div", "c2--" + id, "c2", "c1--" + id, null);
        crearElemento("p", null, "numBolText", "c2--" + id, "Asiento");
        crearElemento("p", "numBol--" + id, "numBol", "c2--" + id, asiento);
        crearElemento("div", "c21--" + id, "c21", "c2--" + id, null);
        crearElemento("div", "c211--" + id, null, "c21--" + id, null);
        crearElemento("h1", null, null, "c211--" + id, "Origen");
        crearElemento("p", "terminalO--" + id, null, "c211--" + id, terminalO);
        crearElemento("div", "c212--" + id, null, "c21--" + id, null);
        crearElemento("h1", null, null, "c212--" + id, "Destino");
        crearElemento("p", "terminalD--" + id, null, "c212--" + id, terminalD);
        crearElemento("div", null, null, "c21--" + id, null);
        crearElemento("div", "c22--" + id, "c22", "c2--" + id, null);
        crearElemento("div", "divFlex--" + id, "divFlex", "c22--" + id, null);
        crearElemento("p", null, null, "divFlex--" + id, "Pasajero(a):  ");
        crearElemento("p", "pasajero--" + id, null, "divFlex--" + id, pasajero);
        crearElemento("div", "divFlex2--" + id, "divFlex", "c22--" + id, null);
        crearElemento("p", null, null, "divFlex2--" + id, "Fecha: el dia ");
        crearElemento("p", "fecha--" + id, null, "divFlex2--" + id, fecha);
        crearElemento("div", "divFlex3--" + id, "divFlex", "c22--" + id, null);
        crearElemento("p", null, null, "divFlex3--" + id, "Hora: a las ");
        crearElemento("p", "hora--" + id, null, "divFlex3--" + id, hora + " horas");
        crearElemento("div", "divFlex4--" + id, "divFlex", "c22--" + id, null);
        crearElemento("p", null, null, "divFlex4--" + id, "Precio:  $");
        crearElemento("p", "precio--" + id, null, "divFlex4--" + id, precio + ".00");
        crearElemento("div", "c3--" + id, "c3", "c1--" + id, null);
        crearElemento("button", "btn--" + id, "btn", "c3--" + id, "Ver mi Boleto");
        crearElemento("p", null, null, "form", null);
    }


    const _setVisible = (visible = true) => {
        if (visible) {
            $formContainer01.classList.remove("hide");
            
        } else {
           
            $formContainer01.classList.add("hide");
        }
    };

    const _initElements = () => {
        crearBoleto();
    };

    return {
        init: () => {
            _initElements();
        },
        setVisible: _setVisible,
    };
})();

boleto.init();