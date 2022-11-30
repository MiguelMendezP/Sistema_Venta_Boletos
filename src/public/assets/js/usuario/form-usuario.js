const formUsuario = (() => {
  const $containerForm = document.getElementById("containerForm");
  const $form = document.getElementById("formUsuario");
  const BASE_URL = "/admin/usuario";
  //

  const _setData = (item = {}, typeRender = "POST") => {
    const $inputNombreUsuario = document.getElementById("nombreUsuario")
    const $inputCorreoUsuario = document.getElementById("correoUsuario");
    const $inputContraseniaUsuario = document.getElementById("contraseniaUsuario");
    const { idUsuario, nombre, correo, contrasenia,} = item;
    $inputNombreUsuario.value = nombre;
    $inputCorreoUsuario.value = correo;
    $inputContraseniaUsuario.value = contrasenia;
    $form.setAttribute("method", typeRender);
    $form.setAttribute("item-id", idUsuario);
    M.updateTextFields();
    
  };

  const _configureBtnCancelar = () => {
    const $btnCancelar = document.getElementById("btnCancelar");
    $btnCancelar.addEventListener("click", () => {
      formUsuario.setVisible(false);
      usuario.setVisible(true);
    });
  };

  const _configureBtnGuardar = () => {
    const $btnGuardar = document.getElementById("btnGuardar");
    $btnGuardar.addEventListener("click", () => {
    
      const method = $form.getAttribute("method");
      const formData = new FormData($form);
      if (method.toUpperCase() === "POST") {
        _create(formData);
      }

      if (method === "PUT") {
        _update(formData);
      }
    });
  };

  const _create = async (formData) => {
    await http.post({url:BASE_URL,body: formData});
    formUsuario.setVisible(false);
    usuario.setVisible(true);
    usuario.getData();
  };

  const _update = async (formData) => {
    const itemId = $form.getAttribute("item-id");
    await http.post({url:`${BASE_URL}/update/${itemId}`,body: formData});
    formUsuario.setVisible(false);
    usuario.setVisible(true);
    usuario.getData();
  };

  const _setVisibleForm = (visible = true) => {
    if (visible) {
      $containerForm.classList.remove("hide");
    } else {
      $containerForm.classList.add("hide");
    }
  };

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
