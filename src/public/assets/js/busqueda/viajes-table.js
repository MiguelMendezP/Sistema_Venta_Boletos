const viajes = (() => {
    const $bodyTable = document.getElementById("data");
    const BASE_URL = "/admin/salida";
    const $containerTable = document.getElementById("containerTable");
    const $fecha_hora = document.getElementById("fecha_hora");
    const $origen = document.getElementById("origen");
    const $destino = document.getElementById("destino");
    const $viajeValor = document.getElementById("viajeValor");
    const $subtotalValor = document.getElementById("subtotalValor");
    const $ivaValor = document.getElementById("ivaValor");
    const $precioFinal = document.getElementById("precioFinal");
    const $btnProcederPagarn = document.getElementById("btnProcederPagar");

    const _getData = async () => {
        viajes.setVisible(true);
        const response = await http.get(BASE_URL);
        $bodyTable.innerHTML = "";
        let mapidSalida = response.map((response) => response.idSalida);
        let mapHora = response.map((response) => response.hora);
        let mapFecha = response.map((response) => response.fecha);
        let mapTerminal_salida = response.map((response) => response.terminal_salida);
        let mapTerminal_destino = response.map((response) => response.terminal_destino);
        let mapPrecio = response.map((response) => response.precio);

        const paramURL = window.location.search
        const parametrosURL = new URLSearchParams(paramURL);
        const $fecha = parametrosURL.get("fecha");
        const $terminal_salida = parametrosURL.get("terminal_salida");
        const $terminal_destino = parametrosURL.get("terminal_destino");

        for (let i = 0; i < response.length; i++) {
            if ($fecha == mapFecha[i] && $terminal_salida == mapTerminal_salida[i] && $terminal_destino == mapTerminal_destino[i]) {

                var salidasTable = {
                    "idSalida": mapidSalida[i],
                    "hora": mapHora[i],
                    "terminal_salida": mapTerminal_salida[i],
                    "terminal_destino": mapTerminal_destino[i],
                    "precio": mapPrecio[i]
                };
                const $row = _createRow(salidasTable, "idSalida");
                $bodyTable.appendChild($row);
            }
        }
    };


    const _createRow = (item = {}, itemId = "") => {
        const $row = document.createElement("tr");
        $row.appendChild(_createIcon());
        for (const key in item) {
            const value = item[key];
            const $td = document.createElement("td");
            $td.innerText = value;
            $row.appendChild($td);
        }
        $row.appendChild(_createBtnAction(item[itemId], "Seleccionar", _actionButton));
        return $row;
    };

    const _createIcon = () => {
        const $icon = document.createElement("i");
        $icon.innerText = "directions_bus";
        $icon.setAttribute("class", "material-icons prefix");
        return $icon;
    };

    const _createBtnAction = (itemId = 0, labelBtn = "", _actionFuntion = () => { }) => {
        const $btn = document.createElement("button");
        $btn.innerText = labelBtn;
        $btn.className += "waves-effect waves-light btn green";
        $btn.setAttribute("item-id", itemId);
        $btn.addEventListener("click", _actionFuntion);
        return $btn;
    };

    $iconValor = document.getElementById("iconValor");

    $iconMenos = document.getElementById("iconMenos");
    $iconMenos.addEventListener('click', () => {
        cantidadPasajeros = parseInt($iconValor.innerHTML) - 1;
        if (cantidadPasajeros >= 1) {
            $iconValor.innerHTML = cantidadPasajeros;
        }
    });
    $iconMas = document.getElementById("iconMas");
    $iconMas.addEventListener('click', () => {
        cantidadPasajeros = parseInt($iconValor.innerHTML) + 1;
        if (cantidadPasajeros <= 14) {
            $iconValor.innerHTML = cantidadPasajeros;
        }
    });
    datosDelViaje = [];
    const _mandarArray = () => {
        datosDelViaje.push($fecha_hora.innerHTML);
        datosDelViaje.push($origen.innerHTML);
        datosDelViaje.push($destino.innerHTML);
        datosDelViaje.push($viajeValor.innerText);
        datosDelViaje.push($subtotalValor.innerText);
        datosDelViaje.push($ivaValor.innerText);
        datosDelViaje.push($precioFinal.innerText);
        
        return datosDelViaje
    }
    dameIdSalida = 0;
    const _dameIdSalida = () => {

        return dameIdSalida
    }


    const _actionButton = async (event) => {
        const $btn = event.target;
        const idSalida = $btn.getAttribute("item-id");
        const response = await http.get(`${BASE_URL}?idSalida=${idSalida}`);
        let mapPrecio = response.map((response) => response.precio);
        let mapHora = response.map((response) => response.hora);
        let mapFecha = response.map((response) => response.fecha);
        let mapTerminal_salida = response.map((response) => response.terminal_salida);
        let mapTerminal_destino = response.map((response) => response.terminal_destino);

        var viajeValor = "$" + ((mapPrecio[0] * $iconValor.innerHTML) * .84).toFixed(2);
        var subtotalValor = "$" + ((mapPrecio[0] * $iconValor.innerHTML) * .84).toFixed(2);
        var ivaValor = "$" + ((mapPrecio[0] * $iconValor.innerHTML) * .16).toFixed(2);
        var precioFinal = "$" + (mapPrecio[0] * $iconValor.innerHTML)+".00";

        $fecha_hora.innerHTML = "Salida el "+mapFecha[0] + ", " + mapHora;
        $origen.innerHTML = "Origen: " + mapTerminal_salida;
        $destino.innerHTML = "Destino: " + mapTerminal_destino;
        $viajeValor.innerText = viajeValor;
        $subtotalValor.innerText = subtotalValor;
        $ivaValor.innerText = ivaValor;
        $precioFinal.innerText = precioFinal;


        viajes.setVisible(false);
        asientos.setVisible(true);
        $btnProcederPagarn.style.backgroundColor = '#808080';
        dameIdSalida = idSalida;
    };
    
    const _setVisible = (visible = true) => {
        if (visible) {
            $containerTable.classList.remove("hide");
        } else {
            $containerTable.classList.add("hide");
        }
    };

    const _initElements = () => {
        _getData();

    };

    return {
        init: () => {
            _initElements();
        },
        setVisible: _setVisible,
        mandarArray: _mandarArray,
        dameIdSalida:_dameIdSalida
    };
})();

viajes.init();


