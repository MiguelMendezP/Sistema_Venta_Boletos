const formRegister = (() => {
    const $nombre = document.getElementById("nombre");
    const $password = document.getElementById("password");
    const $cpassword = document.getElementById("cpassword");
    const $email = document.getElementById("email");

    const _init = () => {
        _configureBtnCancelar();
        _configureBtnGuardar();
      };
    
      return {
        setData: _setData,
        setVisible: _setVisibleForm,
        init: _init,
      };
    })();
    
    formUsuario.init();