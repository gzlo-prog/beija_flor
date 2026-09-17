// Script Beija Flor Variedades
// Proyecto escolar - registro, login y pedidos

// ----- MENU -----
var btnMenu = document.getElementById("btnMenu");
var menu = document.getElementById("menu");
if (btnMenu && menu) {
  btnMenu.onclick = function () {
    menu.classList.toggle("abierto");
  };
}

// ----- HELPERS -----
function formatearPrecio(n) {
  return "$" + n.toLocaleString("es-AR");
}

function getUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios_beija") || "[]");
}

function guardarUsuarios(lista) {
  localStorage.setItem("usuarios_beija", JSON.stringify(lista));
}

function getUsuarioActual() {
  var email = localStorage.getItem("sesion_usuario");
  if (!email) return null;
  var usuarios = getUsuarios();
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email) return usuarios[i];
  }
  return null;
}

function getPedidos() {
  return JSON.parse(localStorage.getItem("pedidos_beija") || "[]");
}

function guardarPedidos(lista) {
  localStorage.setItem("pedidos_beija", JSON.stringify(lista));
}

function getAgotados() {
  return JSON.parse(localStorage.getItem("agotados_beija") || "{}");
}

function setAgotado(id, valor) {
  var mapa = getAgotados();
  mapa[id] = valor;
  localStorage.setItem("agotados_beija", JSON.stringify(mapa));
}

function estaAgotado(prod) {
  var mapa = getAgotados();
  if (mapa.hasOwnProperty(String(prod.id))) {
    return mapa[String(prod.id)] === true;
  }
  return prod.agotado === true;
}

function getExtra() {
  return JSON.parse(localStorage.getItem("productos_extra") || "[]");
}

function guardarExtra(lista) {
  localStorage.setItem("productos_extra", JSON.stringify(lista));
}

function getOcultos() {
  return JSON.parse(localStorage.getItem("productos_ocultos") || "[]");
}

function guardarOcultos(lista) {
  localStorage.setItem("productos_ocultos", JSON.stringify(lista));
}

function getTodosProductos() {
  var ocultos = getOcultos();
  var base = [];
  for (var i = 0; i < productos.length; i++) {
    if (ocultos.indexOf(productos[i].id) === -1) {
      base.push(productos[i]);
    }
  }
  var extra = getExtra();
  return base.concat(extra);
}

function buscarProductoPorId(id) {
  var todos = getTodosProductos();
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].id === id) return todos[i];
  }
  return null;
}





// ----- PRODUCTOS -----
function crearProducto(prod) {
  var sinStock = estaAgotado(prod);
  var agotado = sinStock ? '<span class="badge-agotado">Agotado</span>' : "";
  var botones = "";
  if (!sinStock) {
    botones = '<div class="producto-botones">' +
      '<button class="boton boton-verde" onclick="abrirCompra(' + prod.id + ')">Comprar</button>' +
      '<button class="boton boton-gris" onclick="alert(\'Ok, cancelado\')">Cancelar</button>' +
      '</div>';
  } else {
    botones = '<p style="color:#e74c3c;font-size:13px;margin-top:8px;">Sin stock por ahora</p>';
  }
  var foto = "";
  if (prod.img) {
    foto = '<img src="' + prod.img + '" alt="' + prod.nombre + '" class="foto-prod">';
  } else {
    foto = prod.emoji || "";
  }
  return '<div class="producto" data-cat="' + prod.categoria + '">' + agotado +
    '<div class="producto-img">' + foto + '</div>' +
    '<div class="producto-info">' +
    '<div class="producto-cat">' + prod.categoria + '</div>' +
    '<div class="producto-nombre">' + prod.nombre + '</div>' +
    '<div class="producto-precio">' + formatearPrecio(prod.precio) + '</div>' +
    botones + '</div></div>';
}

function mostrarProductos(filtro) {
  var cont = document.getElementById("listaProductos");
  if (!cont) return;
  var lista = getTodosProductos();
  if (filtro && filtro !== "todos") {
    lista = lista.filter(function (p) { return p.categoria === filtro; });
  }
  if (lista.length === 0) {
    cont.innerHTML = '<p class="sin-pedidos">No hay productos en esta categoría</p>';
    return;
  }
  var html = "";
  for (var i = 0; i < lista.length; i++) html += crearProducto(lista[i]);
  cont.innerHTML = html;
}

function iniciarFiltros() {
  var botones = document.querySelectorAll(".filtro");
  if (!botones.length) return;
  var params = new URLSearchParams(window.location.search);
  var catUrl = params.get("cat");
  for (var i = 0; i < botones.length; i++) {
    botones[i].onclick = function () {
      for (var j = 0; j < botones.length; j++) botones[j].classList.remove("activo");
      this.classList.add("activo");
      mostrarProductos(this.getAttribute("data-cat"));
    };
  }
  if (catUrl) {
    for (var k = 0; k < botones.length; k++) {
      if (botones[k].getAttribute("data-cat") === catUrl) {
        for (var m = 0; m < botones.length; m++) botones[m].classList.remove("activo");
        botones[k].classList.add("activo");
        mostrarProductos(catUrl);
        return;
      }
    }
  }
  mostrarProductos("todos");
}

// ----- COMPRA -----
var productoSeleccionado = null;

function abrirCompra(id) {
  var prod = buscarProductoPorId(id);
  if (!prod) return;
  productoSeleccionado = prod;
  document.getElementById("modalTitulo").innerText = "Pedir: " + prod.nombre;
  document.getElementById("modalTexto").innerText = "Precio: " + formatearPrecio(prod.precio);

  // si esta logueado, completar datos
  var u = getUsuarioActual();
  if (u) {
    document.getElementById("nombreCliente").value = u.nombre || "";
    document.getElementById("telCliente").value = u.telefono || "";
  } else {
    document.getElementById("nombreCliente").value = "";
    document.getElementById("telCliente").value = "";
  }
  document.getElementById("modalCompra").classList.add("mostrar");
}

function cerrarModal() {
  document.getElementById("modalCompra").classList.remove("mostrar");
  productoSeleccionado = null;
}

// ----- REGISTRO -----
function iniciarRegistro() {
  var form = document.getElementById("formRegistro");
  if (!form) return;
  form.onsubmit = function (e) {
    e.preventDefault();
    var nombre = document.getElementById("regNombre").value.trim();
    var email = document.getElementById("regEmail").value.trim().toLowerCase();
    var clave = document.getElementById("regClave").value;
    var tel = document.getElementById("regTel").value.trim();

    var usuarios = getUsuarios();
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email === email) {
        document.getElementById("errorReg").innerText = "Ese correo ya está registrado";
        document.getElementById("errorReg").style.display = "block";
        return;
      }
    }

    usuarios.push({ nombre: nombre, email: email, clave: clave, telefono: tel });
    guardarUsuarios(usuarios);

    document.getElementById("errorReg").style.display = "none";
    document.getElementById("okReg").style.display = "block";
    form.reset();
  };
}

// ----- LOGIN CLIENTE -----
function iniciarLoginCliente() {
  var form = document.getElementById("formLogin");
  if (!form) return;

  // si ya esta logueado, ir a mi cuenta
  if (localStorage.getItem("sesion_usuario")) {
    window.location.href = "mi-cuenta.html";
    return;
  }

  form.onsubmit = function (e) {
    e.preventDefault();
    var email = document.getElementById("loginEmail").value.trim().toLowerCase();
    var clave = document.getElementById("loginClave").value;
    var usuarios = getUsuarios();
    var encontrado = null;
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email === email && usuarios[i].clave === clave) {
        encontrado = usuarios[i];
        break;
      }
    }
    if (encontrado) {
      localStorage.setItem("sesion_usuario", email);
      window.location.href = "mi-cuenta.html";
    } else {
      document.getElementById("errorLogin").style.display = "block";
    }
  };
}

// ----- MI CUENTA -----
function iniciarMiCuenta() {
  if (!document.getElementById("cuentaNombre")) return;

  var u = getUsuarioActual();
  if (!u) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("cuentaNombre").innerText = u.nombre;
  document.getElementById("cuentaEmail").innerText = u.email;
  document.getElementById("cuentaTel").innerText = u.telefono || "No cargado";

  // pedidos de este usuario
  var pedidos = getPedidos();
  var mios = [];
  for (var i = 0; i < pedidos.length; i++) {
    if (pedidos[i].email === u.email) mios.push(pedidos[i]);
  }

  var cont = document.getElementById("misPedidos");
  if (mios.length === 0) {
    cont.innerHTML = '<p class="sin-pedidos" style="padding:20px 0;">Todavía no hiciste pedidos</p>';
  } else {
    var html = "";
    for (var j = mios.length - 1; j >= 0; j--) {
      var p = mios[j];
      html += '<div class="pedido"><h3>' + p.producto + '</h3>' +
        '<p><b>Precio:</b> ' + formatearPrecio(p.precio) + '</p>' +
        '<p class="fecha">' + p.fecha + '</p></div>';
    }
    cont.innerHTML = html;
  }

  var btnSalir = document.getElementById("btnCerrarSesion");
  if (btnSalir) {
    btnSalir.onclick = function () {
      localStorage.removeItem("sesion_usuario");
      window.location.href = "index.html";
    };
  }
}

// ----- ADMIN LOGIN -----
function iniciarAdminLogin() {
  var form = document.getElementById("formAdminLogin");
  if (!form) return;
  if (localStorage.getItem("sesion_admin") === "ok") {
    window.location.href = "admin.html";
    return;
  }
  form.onsubmit = function (e) {
    e.preventDefault();
    var user = document.getElementById("adminUser").value.trim();
    var clave = document.getElementById("adminClave").value;
    if (user === "admin" && clave === "beijaflor") {
      localStorage.setItem("sesion_admin", "ok");
      window.location.href = "admin.html";
    } else {
      document.getElementById("errorAdmin").style.display = "block";
    }
  };
}

// ----- ADMIN PANEL -----
function iniciarAdmin() {
  if (!document.getElementById("listaPedidos")) return;
  if (localStorage.getItem("sesion_admin") !== "ok") {
    window.location.href = "admin-login.html";
    return;
  }

  var pedidos = getPedidos();
  var lista = document.getElementById("listaPedidos");
  if (pedidos.length === 0) {
    lista.innerHTML = '<p class="sin-pedidos">Todavía no hay pedidos</p>';
  } else {
    var html = "";
    for (var i = pedidos.length - 1; i >= 0; i--) {
      var p = pedidos[i];
      html += '<div class="pedido">' +
        '<h3>' + p.producto + '</h3>' +
        '<p><b>Cliente:</b> ' + p.nombre + '</p>' +
        '<p><b>Teléfono:</b> ' + p.telefono + '</p>' +
        (p.email ? '<p><b>Email:</b> ' + p.email + '</p>' : '') +
        '<p><b>Precio:</b> ' + formatearPrecio(p.precio) + '</p>' +
        '<p class="fecha">' + p.fecha + '</p></div>';
    }
    lista.innerHTML = html;
  }

  var btnSalir = document.getElementById("btnSalirAdmin");
  if (btnSalir) {
    btnSalir.onclick = function (e) {
      e.preventDefault();
      localStorage.removeItem("sesion_admin");
      window.location.href = "index.html";
    };
  }

  var btnBorrar = document.getElementById("btnBorrarTodo");
  if (btnBorrar) {
    btnBorrar.onclick = function () {
      if (confirm("Seguro que queres borrar todo?")) {
        localStorage.removeItem("pedidos_beija");
        location.reload();
      }
    };
  }

  // lista de stock
  var contStock = document.getElementById("listaStock");
  if (contStock) {
    var todos = getTodosProductos();
    var htmlS = "";
    for (var s = 0; s < todos.length; s++) {
      var pr = todos[s];
      var sin = estaAgotado(pr);
      var estado = sin
        ? '<span class="estado-no">Agotado</span>'
        : '<span class="estado-ok">Disponible</span>';
      var textoBtn = sin ? "Poner disponible" : "Marcar agotado";
      var claseBtn = sin ? "boton boton-verde" : "boton boton-rojo";
      htmlS += '<div class="item-stock">' +
        '<span>' + pr.nombre + '</span>' +
        '<span>' + estado + '</span>' +
        '<button class="' + claseBtn + '" onclick="cambiarStock(' + pr.id + ')">' + textoBtn + '</button>' +
        '</div>';
    }
    contStock.innerHTML = htmlS;
  }

  // productos extra (los que agregaste)
  var contExtra = document.getElementById("listaExtra");
  if (contExtra) {
    var extras = getExtra();
    if (extras.length === 0) {
      contExtra.innerHTML = '<p class="sin-pedidos" style="padding:10px 0;">Todavía no agregaste productos nuevos</p>';
    } else {
      var htmlE = "";
      for (var e = 0; e < extras.length; e++) {
        var ex = extras[e];
        var mini = "";
        if (ex.img) {
          mini = '<img src="' + ex.img + '" alt="" style="width:40px;height:40px;object-fit:cover;border-radius:6px;margin-right:8px;vertical-align:middle;">';
        } else {
          mini = '<span style="margin-right:8px;">' + (ex.emoji || "📦") + '</span>';
        }
        htmlE += '<div class="item-stock">' +
          '<span>' + mini + ex.nombre + ' (' + ex.categoria + ') - ' + formatearPrecio(ex.precio) + '</span>' +
          '<button class="boton boton-rojo" onclick="eliminarExtra(' + ex.id + ')">Borrar</button>' +
          '</div>';
      }
      contExtra.innerHTML = htmlE;
    }
  }

  // ocultar productos base
  var contTodos = document.getElementById("listaTodosAdmin");
  if (contTodos) {
    var ocultos = getOcultos();
    var htmlT = "";
    for (var t = 0; t < productos.length; t++) {
      var pb = productos[t];
      var estaOculto = ocultos.indexOf(pb.id) !== -1;
      if (estaOculto) {
        htmlT += '<div class="item-stock">' +
          '<span>' + pb.nombre + ' <em style="color:#999;">(oculto)</em></span>' +
          '<button class="boton boton-verde" onclick="mostrarOculto(' + pb.id + ')">Mostrar de nuevo</button>' +
          '</div>';
      } else {
        htmlT += '<div class="item-stock">' +
          '<span>' + pb.nombre + '</span>' +
          '<button class="boton boton-gris" onclick="ocultarProducto(' + pb.id + ')">Ocultar</button>' +
          '</div>';
      }
    }
    contTodos.innerHTML = htmlT;
  }

  // form agregar producto (con foto)
  var formProd = document.getElementById("formNuevoProducto");
  if (formProd && !formProd._ya) {
    formProd._ya = true;
    formProd.onsubmit = function (ev) {
      ev.preventDefault();
      var nombre = document.getElementById("nuevoNombre").value.trim();
      var cat = document.getElementById("nuevaCat").value;
      var precio = parseInt(document.getElementById("nuevoPrecio").value, 10);
      var emoji = document.getElementById("nuevoEmoji").value.trim() || "📦";
      var inputFoto = document.getElementById("nuevaFoto");
      if (!nombre || !precio) {
        alert("Completá nombre y precio");
        return;
      }

      function guardarProducto(imgData) {
        var lista = getExtra();
        lista.push({
          id: Date.now(),
          nombre: nombre,
          categoria: cat,
          precio: precio,
          emoji: emoji,
          img: imgData || "",
          agotado: false
        });
        guardarExtra(lista);
        formProd.reset();
        var msg = document.getElementById("msgProductoOk");
        if (msg) {
          msg.style.display = "block";
          setTimeout(function () { msg.style.display = "none"; }, 2500);
        }
        iniciarAdmin();
      }

      // si hay foto, la leemos
      if (inputFoto && inputFoto.files && inputFoto.files[0]) {
        var archivo = inputFoto.files[0];
        // aviso si es muy pesada
        if (archivo.size > 800000) {
          alert("La foto es un poco pesada. Si podés, usá una más chica (menos de 1 MB).");
        }
        var lector = new FileReader();
        lector.onload = function (e) {
          guardarProducto(e.target.result);
        };
        lector.onerror = function () {
          alert("No se pudo leer la imagen");
          guardarProducto("");
        };
        lector.readAsDataURL(archivo);
      } else {
        guardarProducto("");
      }
    };
  }

}


// ----- CONTACTO -----
function iniciarContacto() {
  var form = document.getElementById("formConsulta");
  if (!form) return;
  form.onsubmit = function (e) {
    e.preventDefault();
    form.style.display = "none";
    document.getElementById("msgConsulta").style.display = "block";
  };
}

// ----- LINK CUENTA EN MENU -----
function actualizarMenu() {
  var link = document.getElementById("linkCuenta");
  if (!link) return;
  if (localStorage.getItem("sesion_usuario")) {
    link.innerText = "Mi cuenta";
    link.href = "mi-cuenta.html";
  } else {
    link.innerText = "Mi cuenta";
    link.href = "login.html";
  }
}

// ----- EVENTOS DEL MODAL -----

function cambiarStock(id) {
  var prod = buscarProductoPorId(id);
  var actual = prod ? estaAgotado(prod) : false;
  setAgotado(id, !actual);
  iniciarAdmin();
}

function eliminarExtra(id) {
  var lista = getExtra();
  var nueva = [];
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id !== id) nueva.push(lista[i]);
  }
  guardarExtra(nueva);
  iniciarAdmin();
}

function ocultarProducto(id) {
  var o = getOcultos();
  if (o.indexOf(id) === -1) {
    o.push(id);
    guardarOcultos(o);
  }
  iniciarAdmin();
}

function mostrarOculto(id) {
  var o = getOcultos();
  var n = [];
  for (var i = 0; i < o.length; i++) {
    if (o[i] !== id) n.push(o[i]);
  }
  guardarOcultos(n);
  iniciarAdmin();
}



document.addEventListener("DOMContentLoaded", function () {
  iniciarFiltros();
  iniciarRegistro();
  iniciarLoginCliente();
  iniciarMiCuenta();
  iniciarAdminLogin();
  iniciarAdmin();
  iniciarContacto();
  actualizarMenu();

  var btnConfirmar = document.getElementById("btnConfirmar");
  var btnCancelar = document.getElementById("btnCancelar");
  var btnCerrarMsg = document.getElementById("btnCerrarMensaje");

  if (btnCancelar) btnCancelar.onclick = cerrarModal;

  if (btnConfirmar) {
    btnConfirmar.onclick = function () {
      var nombre = document.getElementById("nombreCliente").value.trim();
      var telefono = document.getElementById("telCliente").value.trim();
      if (nombre === "" || telefono === "") {
        alert("Falta el nombre o el teléfono");
        return;
      }

      var u = getUsuarioActual();
      var pedidos = getPedidos();
      pedidos.push({
        id: Date.now(),
        producto: productoSeleccionado.nombre,
        precio: productoSeleccionado.precio,
        nombre: nombre,
        telefono: telefono,
        email: u ? u.email : "",
        fecha: new Date().toLocaleString("es-AR")
      });
      guardarPedidos(pedidos);

      cerrarModal();
      document.getElementById("mensajeExito").classList.add("mostrar");
    };
  }

  if (btnCerrarMsg) {
    btnCerrarMsg.onclick = function () {
      document.getElementById("mensajeExito").classList.remove("mostrar");
    };
  }
});
