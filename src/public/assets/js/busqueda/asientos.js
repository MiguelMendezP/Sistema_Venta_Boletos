const asientos = (() => {
    const BASE_URL_BOLETO = "/mis-boletos";
    const $containerAsientos = document.getElementById("containerAsientos");
    const $labels = document.querySelectorAll("#formAsientos label");

    $btnProcederPagarn = document.getElementById("btnProcederPagar");
    $btnProcederPagarn.addEventListener('click', () => {
        if (arrayAsientosSeleccionado.length == $iconValor.innerHTML) {
            asientos.setVisible(false);
            pago.setVisible(true);
        }
    });



    const validarSeleccionado = (e) => {
        switch (e.target.id) {
            case "seat--01":
                seleccionAsiento("img--01");
                break;
            case "seat--02":
                seleccionAsiento("img--02");
                break;
            case "seat--03":
                seleccionAsiento("img--03");
                break;
            case "seat--04":
                seleccionAsiento("img--04");
                break;
            case "seat--05":
                seleccionAsiento("img--05");
                break;
            case "seat--06":
                seleccionAsiento("img--06");
                break;
            case "seat--07":
                seleccionAsiento("img--07");
                break;
            case "seat--08":
                seleccionAsiento("img--08");
                break;
            case "seat--09":
                seleccionAsiento("img--09");
                break;
            case "seat--10":
                seleccionAsiento("img--10");
                break;
            case "seat--11":
                seleccionAsiento("img--11");
                break;
            case "seat--12":
                seleccionAsiento("img--12");
                break;
            case "seat--13":
                seleccionAsiento("img--13");
                break;
            case "seat--14":
                seleccionAsiento("img--14");
                break;
        }
    }

    
    var arrayAsientosOcupa = [];

    async function _asientosOcupados() {
        const responseBoleto = await http.get(BASE_URL_BOLETO);
        idSalida = viajes.dameIdSalida();
        for (let i = 0; i < responseBoleto.length; i++) {
            if(responseBoleto[i].idSalida == idSalida){

                $img = document.getElementById("img--0"+responseBoleto[i].noAsiento);
            $img.setAttribute("src", "/assets/img/ocupado.png");
            }
        }  
        console.log(arrayAsientosOcupa);
    }


    var arrayAsientosSeleccionado = [];
    const $iconValor = document.getElementById("iconValor");
    const seleccionAsiento = (img) => {
        $img = document.getElementById(img);
        if ($img.getAttribute("src") != "/assets/img/seleccionado.png" &&
            $img.getAttribute("src") != "/assets/img/ocupado.png") {
            if (arrayAsientosSeleccionado.length < $iconValor.innerHTML) {
                $img.setAttribute("src", "/assets/img/seleccionado.png");
                arrayAsientosSeleccionado.push(img);
                if (arrayAsientosSeleccionado.length == $iconValor.innerHTML) {
                    $btnProcederPagarn.style.backgroundColor = '#0084ff';
                    $btnProcederPagarn.disable = true;
                }

            } else {
                M.toast({ html: 'Agrega mas pasajeros' })
            }
        } else if ($img.getAttribute("src") != "/assets/img/ocupado.png") {

            $img.setAttribute("src", "/assets/img/asiento.png");
            arrayAsientosSeleccionado.splice(arrayAsientosSeleccionado.indexOf(img), 1);
            $btnProcederPagarn.style.backgroundColor = '#808080';
            $btnProcederPagarn.disable = false;
        }
    }

    $labels.forEach((label) => {
        label.addEventListener('click', validarSeleccionado);
    });


    const _setVisible = (visible = true) => {
        if (visible) {
            _asientosOcupados();
            $containerAsientos.classList.remove("hide");
            
        } else {
           
            $containerAsientos.classList.add("hide");
        }
    };

    const _initElements = () => {
        _setVisible(false);
    };

    return {
        init: () => {
            _initElements();
        },
        setVisible: _setVisible,
        arrayAsientosSeleccionado: arrayAsientosSeleccionado,
    };
})();

asientos.init();


