const usuario = (() => {
  const $bodyTable = document.getElementById("data");
  const BASE_URL = "/admin/administrador";
  const $containerTable = document.getElementById("containerTable");

  const _getData = async () => {
    const response = await http.get(BASE_URL);
    $bodyTable.innerHTML = "";
    for (let i = 0; i < response.length; i++) {
      const $row = _createRow(response[i], "idAdministrador");
      $bodyTable.appendChild($row);
    }
  };

  const _actionButtonEditar = async (event) => {
    const $btn = event.target;
    const idAdministrador = $btn.getAttribute("item-id");
    const response = await http.get(`${BASE_URL}?idAdministrador=${idAdministrador}`);
    formUsuario.setData(response[0], 'PUT');
    formUsuario.setVisible(true);
    usuario.setVisible(false);
  };

  const _actionButtonEliminar = async (event) => {
    const $btn = event.target;
    const idAdministrador = $btn.getAttribute("item-id");
    const response = await http.delete({ url: `${BASE_URL}/${idAdministrador}` });
    usuario.getData();
  };

  const _createRow = (item = {}, itemId = "") => {
    const $row = document.createElement("tr");
    for (const key in item) {
      const value = item[key];
      const $td = document.createElement("td");
      
      $td.innerText = value;
      $row.appendChild($td);

    }
    $row.appendChild(_createBtnAction(item[itemId], "Editar", _actionButtonEditar));
    $row.appendChild(_createBtnAction(item[itemId], "Eliminar", _actionButtonEliminar));
    return $row;
  };

  const _createBtnAction = (itemId = 0, labelBtn = "", _actionFuntion = () => { }) => {
    const $btn = document.createElement("button");
    $btn.innerText = labelBtn;
    $btn.className += "waves-effect waves-light btn red";
    $btn.setAttribute("item-id", itemId);
    $btn.addEventListener("click", _actionFuntion);
    return $btn;
  };

  const _setVisible = (visible = true) => {
    if (visible) {
      $containerTable.classList.remove("hide");
    } else {
      $containerTable.classList.add("hide");
    }
  };



  const _initElements = () => {
    _getData();
    _configureBtnNuevo();
  };

  const _configureBtnNuevo = () => {
    const $btnNuevo = document.getElementById("btnNuevo");
    $btnNuevo.addEventListener("click", () => {
      usuario.setVisible(false);
      formUsuario.setVisible(true);
      usuario.setData({}, 'POST')
    });
  };

  return {
    init: () => {
      _initElements();
    },
    setVisible: _setVisible,
    getData: _getData
  };
})();

usuario.init();
