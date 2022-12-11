const pagado = (() => {
    const $containerPagado = document.getElementById("containerPagado");

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
