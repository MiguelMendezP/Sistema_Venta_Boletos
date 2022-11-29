const terminal = (() => {
    const $bodyTable = document.getElementById("data");
    const BASE_URL = "/admin/salida";
    const $containerTable = document.getElementById("containerTable");

    const _getData = async () => {
        const response = await http.get(BASE_URL);
        $bodyTable.innerHTML = "";
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
                    "hora": mapHora[i],
                    "terminal_salida": mapTerminal_salida[i],
                    "terminal_destino": mapTerminal_destino[i],
                    "precio": mapPrecio[i]
                };

                const $row = _createRow(salidasTable, "idTerminal");
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

    const _actionButton = async (event) => {
        const $btn = event.target;
        const idTerminal = $btn.getAttribute("item-id");
        //const response = await http.delete({ url: `${BASE_URL}/${idTerminal}` });
        console.log("Comprado");
    };









    const _initElements = () => {
        _getData();
    };

    return {
        init: () => {
            _initElements();
        },
    };
})();

terminal.init();


