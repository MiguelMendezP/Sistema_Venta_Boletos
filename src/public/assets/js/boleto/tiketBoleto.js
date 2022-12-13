
const tiketBoleto = (() => {
    const $formTiket = document.getElementById("formTiket");
 
    const $btnRegresar = document.getElementById("btnRegresar");
    $btnRegresar.addEventListener("click", () => {
        tiketBoleto.setVisible(false);
        boleto.setVisible(true);
    });

    const $btnDescargar = document.getElementById("btnDescargar");
    $btnDescargar.addEventListener("click", () => {
        var $element = document.getElementById("a1");
        html2pdf()
            .set({
                margin: 1,
                filename: 'boleto.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 3, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a2",
                    orientation: 'portrait' // landscape o portrait
                }
            })
            .from($element)
            .save()
            .catch(err => console.log(err));
    });


    const _setVisible = (visible = true) => {
        if (visible) {
            $formTiket.classList.remove("hide");
            
        } else {
           
            $formTiket.classList.add("hide");
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
    };
})();

tiketBoleto.init();