const pagado = (() => {
    const $containerPagado = document.getElementById("containerPagado");

    const $btnVerMisBoletos = document.getElementById("btnVerMisBoletos");
    $btnVerMisBoletos.addEventListener("click", () => {
        location.href = "/mis-boletos/view";
    });

    const _setVisible = (visible = true) => {
        if (visible) {
            $containerPagado.classList.remove("hide");
        } else {
            $containerPagado.classList.add("hide");

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

pagado.init();