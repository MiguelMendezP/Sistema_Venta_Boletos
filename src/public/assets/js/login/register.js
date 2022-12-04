const BASE_URL_USUARIO = "/admin/usuario";
const BASE_URL_ADMINISTRADOR = "/admin/administrador";
const $form = document.getElementById("formRegister");
const $inputs = document.querySelectorAll("#formRegister input");
const $btnRegistrar = document.getElementById("btnRegistrar");

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const campos = {
  nombre: false,
  contrasenia: false,
  correo: false,
}

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target, 'nombre');
      break;
    case "correo":
      validarCampo(expresiones.correo, e.target, 'correo');
      break;
    case "contrasenia":
      validarCampo(expresiones.password, e.target, 'contrasenia');
      validarContrasenia();
      break;
    case "contrasenia2":
      validarContrasenia();
      break;
  }
}

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document.getElementById(`grupo__${campo}`).classList.remove('input-field-incorrecto');
    document.getElementById(`grupo__${campo}`).classList.add('input-field-correcto');
    document.querySelector(`#grupo__${campo} .input-error`).classList.remove('input-error-activo');
    campos[campo] = true;
  } else {
    document.getElementById(`grupo__${campo}`).classList.add('input-field-incorrecto');
    document.getElementById(`grupo__${campo}`).classList.remove('input-field-correcto');
    document.querySelector(`#grupo__${campo} .input-error`).classList.add('input-error-activo');
    campos[campo] = false;
  }
}

const validarContrasenia = () => {
  const $contrasenia = document.getElementById("contrasenia");
  const $contrasenia2 = document.getElementById("contrasenia2");

  if ($contrasenia.value !== $contrasenia2.value) {
    document.getElementById('grupo__contrasenia2').classList.add('input-field-incorrecto');
    document.getElementById('grupo__contrasenia2').classList.remove('input-field-correcto');
    document.querySelector(`#grupo__contrasenia2 .input-error`).classList.add('input-error-activo');
    campos['contrasenia'] = false;
  } else {
    document.getElementById('grupo__contrasenia2').classList.remove('input-field-incorrecto');
    document.getElementById('grupo__contrasenia2').classList.add('input-field-correcto');
    document.querySelector(`#grupo__contrasenia2 .input-error`).classList.remove('input-error-activo');
    campos['contrasenia'] = true;
  }
}

$inputs.forEach((input) => {
  input.addEventListener('keyup', validarFormulario);
  input.addEventListener('blur', validarFormulario);
});


$btnRegistrar.addEventListener("click", (e) => {
  e.preventDefault();
  if (campos.nombre && campos.correo && campos.contrasenia) {
    existe();
  } else {
    document.getElementById('mensaje-existe').classList.remove('mensaje-existe-activo');
    document.getElementById('mensaje').classList.add('mensaje-activo');
  }
});

async function crearUsuario() {
  const formData = new FormData($form);
  formData.delete("contrasenia2");
  await http.post({ url: BASE_URL_USUARIO, body: formData });

  const button = document.createElement('button');
  button.type = 'button';
  button.innerText = 'Inicar Secion';
  button.className = "btnIniciarSecion";
  button.setAttribute("item-id", "btnIniciarSecion");
  button.addEventListener("click", actionFuntion = () => {
    location.href = "/";
  });
  document.getElementById("formRegister").appendChild(button);
}

async function existe() {
  const $correo = document.getElementById("correo").value;
  const rUsuarios = await http.get(BASE_URL_USUARIO);
  const rAdministradores = await http.get(BASE_URL_ADMINISTRADOR);
  let arrayCorreosAdmi = rAdministradores.map((rAdministradores) => rAdministradores.correo);
  let arrayCorreosUsu = rUsuarios.map((rUsuarios) => rUsuarios.correo);
  let correos = arrayCorreosAdmi.concat(arrayCorreosUsu);


  if (!correos.includes($correo)) {
    crearUsuario();

    $btnRegistrar.disabled = true;
    $btnRegistrar.style.backgroundColor = '#808080';

    document.getElementById('mensaje').classList.remove('mensaje-activo');
    document.getElementById('mensaje-existe').classList.remove('mensaje-existe-activo');
    document.getElementById('mensaje-exito').classList.add('mensaje-exito-activo');
  } else {
    document.getElementById('mensaje').classList.remove('mensaje-activo');
    document.getElementById('mensaje-existe').classList.add('mensaje-existe-activo');

  }

}


