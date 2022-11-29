const formSalida = (() => {
  const $containerForm = document.getElementById("containerForm");
  const $form = document.getElementById("formSalida");
  const BASE_URL = "/admin/salida";
  const BASE_URL_TERMINAL = "/admin/terminal";
  //

  const _setData = (item = {}, typeRender = "POST") => {
    const $hora = document.getElementById("hora");
    const $fecha = document.getElementById("fecha");
    const $precio = document.getElementById("precio");
    const $ciudadOrigen = document.getElementById("ciudadOrigen");
    const $ciudadDestino = document.getElementById("ciudadDestino");
    const { idSalida, hora, fecha, precio, terminal_salida,terminal_destino } = item;
    $hora.value = hora;
    $fecha.value = fecha;
    $precio.value = precio;
    $ciudadOrigen.options[$ciudadOrigen.selectedIndex].text = terminal_salida;
    $ciudadDestino.options[$ciudadDestino.selectedIndex].text = terminal_destino;
    $form.setAttribute("method", typeRender);
    $form.setAttribute("item-id", idSalida);
    M.updateTextFields();
    
  };

  const _llenarComboBox  = async () => {
    const response = await http.get(BASE_URL_TERMINAL);
    let mapTerminales = response.map((response) => response.nombre);
    var $ciudadOrigen = document.getElementById("ciudadOrigen");
    var $ciudadDestino = document.getElementById("ciudadDestino");

    for (let i = 0; i < mapTerminales.length; i++) {
      $ciudadOrigen.options[i] = new Option(mapTerminales[i]);
      $ciudadDestino.options[i] = new Option(mapTerminales[i]);
    }
  }

  const _fecha_hora  =  () => {
    var $hora = document.getElementById("hora");
    var $fecha = document.getElementById("fecha");
    
    var today = new Date();
    var fecha = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var hora;

    if (today.getHours()<12) {
      hora = '0' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      $hora.setAttribute("value", hora);
    }else{
      hora = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      $hora.setAttribute("value", hora);
    }
  
    $fecha.setAttribute("value", fecha);
    $fecha.setAttribute("min", fecha);
  }

  const _configureBtnCancelar = () => {
    const $btnCancelar = document.getElementById("btnCancelar");
    $btnCancelar.addEventListener("click", () => {
      formSalida.setVisible(false);
      salida.setVisible(true);
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
    formSalida.setVisible(false);
    salida.setVisible(true);
    salida.getData();
  };

  const _update = async (formData) => {
    const itemId = $form.getAttribute("item-id");
    await http.post({url:`${BASE_URL}/update/${itemId}`,body: formData});
    formSalida.setVisible(false);
    salida.setVisible(true);
    salida.getData();
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
    _llenarComboBox();
    _fecha_hora();
  };

  return {
    setData: _setData,
    setVisible: _setVisibleForm,
    init: _init,  
  };
})();

formSalida.init();
