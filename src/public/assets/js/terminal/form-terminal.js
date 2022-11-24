const formTerminal = (() => {
  const $containerForm = document.getElementById("containerForm");
  const $form = document.getElementById("formTerminal");
  const BASE_URL = "/admin/terminal";
  //

  const _setData = (item = {}, typeRender = "POST") => {
    console.log("Si entro");
    const $inputNombreTerminal = document.getElementById("nombreTerminal");
    const $inputCiudadTerminal = document.getElementById("ciudadTerminal");
    const $inputEstadoTerminal = document.getElementById("estadoTerminal");
    const { idTerminal, nombre, ciudad, estado} = item;
    $inputNombreTerminal.value = nombre;
    $inputCiudadTerminal.value = ciudad;
    $inputEstadoTerminal.value = estado;
    $form.setAttribute("method", typeRender);
    $form.setAttribute("item-id", idTerminal);
    M.updateTextFields();
    
  };

  const _configureBtnCancelar = () => {
    const $btnCancelar = document.getElementById("btnCancelar");
    $btnCancelar.addEventListener("click", () => {
      formTerminal.setVisible(false);
      terminal.setVisible(true);
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
    formTerminal.setVisible(false);
    terminal.setVisible(true);
    terminal.getData();
  };

  const _update = async (formData) => {
    const itemId = $form.getAttribute("item-id");
    await http.post({url:`${BASE_URL}/update/${itemId}`,body: formData});
    formTerminal.setVisible(false);
    terminal.setVisible(true);
    terminal.getData();
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

formTerminal.init();
