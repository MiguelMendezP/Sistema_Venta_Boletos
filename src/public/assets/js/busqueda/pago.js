const pago = (() => {
    const $containerPago = document.getElementById("containerPago");


    const _setVisible = (visible = true) => {
        if (visible) {
            $containerPago.classList.remove("hide");
        } else {
            $containerPago.classList.add("hide");
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

pago.init();


