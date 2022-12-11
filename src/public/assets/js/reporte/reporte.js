const BASE_URL_BOLETO = "/mis-boletos";
const BASE_URL_SALIDA = "/admin/salida";
const BASE_URL_TERMINALES = "/admin/terminal";

var parametros = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

async function cargarDatos() {

    const responseBoleto = await http.get(BASE_URL_BOLETO);
    const responseSalida = await http.get(BASE_URL_SALIDA);
    const $años = document.getElementById("años");
    var valores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < responseBoleto.length; i++) {
        for (let j = 0; j < responseSalida.length; j++) {
            if (responseBoleto[i].idSalida == responseSalida[j].idSalida &&
                responseSalida[j].fecha.substring(0, 4) == $años.value) {
                let pos = parseInt(responseSalida[j].fecha.substring(5, 7)) - 1;
                valores[pos] = valores[pos] + 1;
            }
        }
    }

    var myPlot = document.getElementById('grafico'),
        d3 = Plotly.d3,
        N = 16,
        x = d3.range(N),
        y = d3.range(N).map(d3.random.normal()),
        data = [{
            x: parametros,
            y: valores,
            type: "linear"
        }],
        layout = {
            hovermode: 'closest',
        };

    Plotly.newPlot('grafico', data, layout, { showSendToCloud: true });

    myPlot.on('plotly_click', function (data) {
        var pts = '';
        for (var i = 0; i < data.points.length; i++) {
            pts = 'x = ' + data.points[i].x + '\ny = ' +
                data.points[i].y.toPrecision(4) + '\n\n';
        }

        ventanaFlotante()
    });
}

async function cargarCompras() {
    var destinos = [];


    const responseBoleto = await http.get(BASE_URL_BOLETO);
    const responseSalida = await http.get(BASE_URL_SALIDA);
    const responseTerminales = await http.get(BASE_URL_TERMINALES);
    const $años = document.getElementById("años");
    var valoresD = [];

    for (let x = 0; x < responseTerminales.length; x++) {
        destinos.push(responseTerminales[x].nombre);
        valoresD.push(0);
    }
    console.log(destinos);

    for (let i = 0; i < responseBoleto.length; i++) {
        for (let j = 0; j < responseSalida.length; j++) {
            if (responseBoleto[i].idSalida == responseSalida[j].idSalida) {
                pos = destinos.indexOf(responseSalida[j].terminal_destino);
                valoresD[pos] = valoresD[pos] + 1;
            }
        }
    }

    data = [{
        x: destinos,
        y: valoresD,
        type: "linear"
    }],
        layout = {
            hovermode: 'closest',
        };
    Plotly.newPlot('grafico2', data, layout, { showSendToCloud: true });

}

function ventanaFlotante() {
    document.getElementById("ventana").style.display = "block"
    cargarCompras();
}

const $btnGenerar = document.getElementById("btnGenerar");
$btnGenerar.addEventListener("click", () => {
    cargarDatos()
});
const $cerrar = document.getElementById("cerrar");
$cerrar.addEventListener("click", () => {
    document.getElementById("ventana").style.display = "none"
});