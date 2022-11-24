const terminal = (() => {
  const $bodyTable = document.getElementById("data");
  const BASE_URL = "/admin/terminal";
  const $containerTable = document.getElementById("containerTable");

  const _getData = async () => {
    const response = await http.get(BASE_URL);
    $bodyTable.innerHTML = "";
    //Error aqui
    for (let i = 0; i < response.length; i++) {
      const $row = _createRow(response[i], "idTerminal");
      $bodyTable.appendChild($row);
    }
  };

  const _actionButtonEditar = async (event) => {
    const $btn = event.target;
    const idTerminal = $btn.getAttribute("item-id");
    const response = await http.get(`${BASE_URL}?idTerminal=${idTerminal}`);
    formTerminal.setData(response[0], 'PUT');
    formTerminal.setVisible(true);
    terminal.setVisible(false);
  };

  const _actionButtonEliminar = async (event) => {
    const $btn = event.target;
    const idTerminal = $btn.getAttribute("item-id");
    const response = await http.delete({ url: `${BASE_URL}/${idTerminal}` });
    terminal.getData();
  };

  const _createRow = (item = {}, itemId = "") => {
    const $row = document.createElement("tr");
    for (const key in item) {
      const value = item[key];
      const $td = document.createElement("td");
      if (key !== "url_imagen") {
        $td.innerText = value;
      } else {
        const $img = document.createElement("img");
        $img.setAttribute("src", `/api/v1/file?filePath=${value}`);
        $img.classList.add("img-icon");
        $td.appendChild($img);
      }

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
      terminal.setVisible(false);
      formTerminal.setVisible(true);
      terminal.setData({}, 'POST')
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

terminal.init();
