const formBusqueda = (() => {
    const $form = document.getElementById("formBusqueda");
    const BASE_URL_TERMINAL = "/admin/terminal";

    const _llenarComboBox = async () => {
        const response = await http.get(BASE_URL_TERMINAL);
        let mapTerminales = response.map((response) => response.nombre);
        var $ciudadOrigen = document.getElementById("ciudadOrigen");
        var $ciudadDestino = document.getElementById("ciudadDestino");
        
        for (let i = 0; i < mapTerminales.length; i++) {
            $ciudadOrigen.options[i] = new Option(mapTerminales[i]);
            $ciudadDestino.options[i] = new Option(mapTerminales[i]);
        }
    }

    const _fecha_hora = () => {
        var $fecha = document.getElementById("fecha");
        var today = new Date();
        var fechaHoy = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        $fecha.setAttribute("value", fechaHoy);
        $fecha.setAttribute("min", fechaHoy);
    }

    const _init = () => {
        _llenarComboBox();
        _fecha_hora();
    };
    return {
        init: _init,
    };
})();

formBusqueda.init();