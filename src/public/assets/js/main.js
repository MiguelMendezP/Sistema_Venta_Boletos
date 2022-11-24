const main = (() => {
  const $bodyTable = document.getElementById("data");
  const BASE_URL = "http://localhost:4000/api/v2/example";

  const _getData = async () => {
    debugger;
    const response = await http.get(BASE_URL);
    for (let index = 0; index < response.length; index++) {
      const $row = _createRow(response[index], "idStatus");
      $bodyTable.appendChild($row);
    }
  };

  const _actionButtonEditar = async (event) => {
    const $formStatus = document.getElementById("formStatus");
    $formStatus.setAttribute("method","PUT");
    const $btn = event.target;
    const idStatus = $btn.getAttribute("item-id");
    const response = await http.get(`${BASE_URL}/${idStatus}`);
    _setData(response[0]);
  };

  const _createRow = (item = {}, itemId = "") => {
    debugger;
    const $row = document.createElement("tr");
    for (const key in item) {
      const value = item[key];
      const $td = document.createElement("td");
      $td.innerText = value;
      $row.appendChild($td);
    }
    $row.appendChild(_createBtnAction(item[itemId], "Editar", _actionButtonEditar));
    $row.appendChild(_createBtnAction(item[itemId], "Eliminar"));
    return $row;
  };

  const _createBtnAction = (itemId = 0, labelBtn = "", _actionFuntion = () => {}) => {
    debugger;
    const $btn = document.createElement("button");
    $btn.innerText = labelBtn;
    $btn.className += "waves-effect waves-light btn red";
    $btn.setAttribute("item-id", itemId);
    $btn.addEventListener("click", _actionFuntion);
    return $btn;
  };

  const _setData = (item = {}) => {
    const $inputStatus = document.getElementById("status");
    const $inputDescription = document.getElementById("description");
    const { idStatus, description, status } = item;
    $inputDescription.value = description;
    $inputStatus.value = status;
  };

  const _initElements = () => {
    _getData();
  };

  return {
    init: () => {
      _initElements();
    },
  };
})();

main.init();
