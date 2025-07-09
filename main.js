/* let productos = [
    {"id": 1, 
    "nombre": "Consola Sony Playstation 5 Slim", 
    "precio": 800000, 
    "categoria":"consolas",
    "imagen": "https://nextgames.com.ar/img/Public/1040/producto-ps5-slim-lectora-3327.jpg",
    "activo": 1 },

    {"id": 2, 
    "nombre": "Consola Nintendo Switch", 
    "precio": 560000, 
    "categoria":"consolas",
    "imagen": "https://nextgames.com.ar/img/Public/1040-producto-71vwxeabq7l-sl1500-4403.jpg",
    "activo": 1 },

    {"id": 3, 
    "nombre": "Consola Xbox Series S", 
    "precio": 580600, 
    "categoria":"consolas",
    "imagen": "https://nextgames.com.ar/img/Public/1040-producto-serie-s-1-9840.jpg",
    "activo": 1 },

    {"id": 4, 
    "nombre": "UNCHARTED 4: El Desenlace del Ladron - PS5", 
    "precio": 50800, 
    "categoria":"juegos",
    "imagen": "https://juegosdigitalesargentina.com/files/images/productos/1618591826-uncharted-4-el-desenlace-del-ladron-ps5.jpg",
    "activo": 1 },

    {"id": 5, 
    "nombre": "God of War Ragnarok - PS4", 
    "precio": 65000, 
    "categoria":"juegos",
    "imagen": "https://nextgames.com.ar/img/Public/1040/18032-producto-81w7ixuhl-ac-sl1500.jpg",
    "activo": 1 },

    {"id": 6, 
    "nombre": "Metal Gear Solid Delta - Xbox", 
    "precio": 90000, 
    "categoria":"juegos",
    "imagen": "https://nextgames.com.ar/img/Public/1040/89479-producto-81aai5sdanl-ac-sl1500.jpg",
    "activo": 1 },

    {"id": 7, 
    "nombre": "Mario Kart World - Nintendo Switch 2", 
    "precio": 150000, 
    "categoria":"juegos",
    "imagen": "https://nextgames.com.ar/img/Public/1040/22038-producto-untitled.jpg",
    "activo": 1 },

    {"id": 8, 
    "nombre": "Resident Evil 4 Remake - PS5", 
    "precio": 50000, 
    "categoria":"juegos",
    "imagen": "https://nextgames.com.ar/img/Public/1040/32125-producto-untitled.jpg",
    "activo": 1 }
  ]; */

  let productos = []; /* Esto inicializa una variable productos como array vacío. Luego vamos a llenarlo con los productos que nos dé el backend. */

// Obtener productos desde el backend al iniciar
function obtenerProductosDesdeBackend() {
  fetch('http://localhost:3000/api/products') /* Este fetch hace una petición HTTP (GET) al backend, a la URL que está escuchando en el puerto 3000 y en la ruta /api/products. */
    .then(res => res.json())
    .then(data => {
      console.log("Respuesta del backend:", data);
      productos = data.payload;  

      if (window.location.pathname.includes("productos.html")) {
        mostrarProductos(productos);
      }
    })
    .catch(error => {
      console.error('Error al cargar productos desde el backend:', error);
    });
}


/* TODAS LAS PAGINAS FUNCIONES */
//FUNCION CAMBIAR TEMA
const botonTema = document.getElementById("boton-tema");

// Cambiar el texto del botón según el tema actual
function cambiarTextoTema() {
  let colorActual = document.body.classList.contains("tema-claro") ? "Light" : "Dark";
  botonTema.innerText = `Tema: ${colorActual}`;
}

// Cambiar el tema y guardar en localStorage
function cambiarColor() {
  if (document.body.classList.contains("tema-claro")) {
    document.body.classList.remove("tema-claro"); // volver a oscuro
    localStorage.setItem("boton-tema", "Dark");
  } else {
    document.body.classList.add("tema-claro"); // pasar a claro
    localStorage.setItem("boton-tema", "Light");
  }

  cambiarTextoTema();
}

// Al cargar la página: aplicar el tema guardado o el oscuro por defecto
document.addEventListener("DOMContentLoaded", () => {
  let temaGuardado = localStorage.getItem("boton-tema");

  if (temaGuardado === "Light") {
    document.body.classList.add("tema-claro");
  } else {
    document.body.classList.remove("tema-claro"); // aseguramos oscuro
    localStorage.setItem("boton-tema", "Dark");   // lo dejamos como default
  }

  cambiarTextoTema();
});

// Evento al hacer clic en el botón
botonTema.addEventListener("click", cambiarColor);





/////////////////////////////////////////////////////////////////////////////////////////
/* PAGINA DE BIENVENIDA FUNCIONES */
//FUNCION INGRESAR NOMBRE
function ingresar() {
  let nombreIngresado = document.getElementById('nombre-cliente').value; //Guardamos el valor ingresado por el cliente en la variable
    if (nombreIngresado.trim()) { //Validamos que no este vacio y eliminamos espacios
        sessionStorage.setItem('nombreCliente', nombreIngresado); //Guardamos el nombre usando session storage para que solo este guardado lo que dure la sesion
        console.log(`Hola ${nombreIngresado}`)
        window.location.href = 'productos.html'; //Dirige a la pagina de los productos
        vaciarCarrito();
    } else {
        alert('Por favor ingrese su nombre');
    }
  }


//////////////////////////////////////////////////////////////////
/*PAGINA DE PRODUCTOS*/
//FUNCION MOSTRAR PRODUCTOS
function mostrarProductos(productos) {
    const contenedor = document.querySelector(".contenedor-productos");
    contenedor.innerHTML = ""; // Limpiar antes de mostrar para evitar duplicados

    const productosActivos = productos.filter(producto => producto.activo == 1);

    productosActivos.forEach(juegos => { 
        const div = document.createElement("div");
        div.classList.add("card-producto");
        //Creo un nuevo div con el contenido de cada fruta recorrida en el forEach 
        div.innerHTML = ` 
        <img src="${juegos.imagen}" alt="${juegos.nombre}">
        <h3>${juegos.nombre}</h3>
        <p>$${juegos.precio}</p>
        <button data-id="${juegos.id}" class="agregar-carrito">Agregar al carrito</button> 
        <button data-id="${juegos.id}" class="eliminar-carrito">Eliminar del carrito</button> 
        `;

        const botonAgregarCarrito = div.querySelector(".agregar-carrito");
        botonAgregarCarrito.addEventListener("click", () => {
          agregarAlCarrito(juegos);
        });

        const botonEliminarCarrito = div.querySelector(".eliminar-carrito");
        botonEliminarCarrito.addEventListener("click", () => {
          carrito = carrito.filter(p => !(p.nombre === juegos.nombre && p.precio === juegos.precio));
          guardarCarritoEnStorage();
          mostrarModal(`Eliminaste "${juegos.nombre}" del carrito.`);
          mostrarCarrito();
        });



    contenedor.appendChild(div); //Agregamos al DOM como hijo.
  });
}

/* BOTONES ORDENAR */
/* Ordenar por nombre */
function ordenarPorNombre() {
    const juegosOrdenadas = [...productos].sort((a, b) => {
        return a.nombre.localeCompare(b.nombre); //Uso sort para ordenar de forma que use como metodo de comparacion el nombre de las freutas
    });
    mostrarProductos(juegosOrdenadas);
}

/* Ordenar por precio */
function ordenarPorPrecio() {
    const juegosOrdenadas = [...productos].sort((a, b) => a.precio - b.precio); //Lo mismo pero usando el precio.
    mostrarProductos(juegosOrdenadas);
}

//FUNCION AGREGAR AL CARRITO
let carrito = []

function agregarAlCarrito(producto) {
    carrito.push(producto);
    console.log("Carrito actualizado:", carrito);
    guardarCarritoEnStorage();
    mostrarModal(`Agregaste "${producto.nombre}" al carrito.`);

    // Mostrar carrito sólo si existe el contenedor (estamos en carrito.html)
    if (document.getElementById("items-carrito")) {
        mostrarCarrito();
    }
}




/////////////////////////////////////////////////////////////////////////////////////////
/* PAGINA DE CARRITO FUNCIONES */
//FUNCION MOSTRAR CARRITO
function mostrarCarrito() {
  const contenedorCarrito = document.getElementById("items-carrito");
  if (!contenedorCarrito) return;

  // Vaciar tbody para re-renderizar
  contenedorCarrito.innerHTML = "";

  if (carrito.length === 0) {
    // Si carrito vacío, mostramos mensaje
    const filaVacia = document.createElement("tr");
    const celdaVacia = document.createElement("td");
    celdaVacia.colSpan = 4;  // ocupa las 4 columnas
    celdaVacia.style.textAlign = "center";
    celdaVacia.textContent = "No hay elementos en el carrito.";
    filaVacia.appendChild(celdaVacia);
    contenedorCarrito.appendChild(filaVacia);

    // También ocultar total y botones o poner total en $0
    document.getElementById("precio-total").textContent = "Total: $0";
    return;
  }

  // Agrupar productos por nombre y precio
  const agrupado = {};
  carrito.forEach(producto => {
    const key = `${producto.nombre}-${producto.precio}`;
    if (!agrupado[key]) agrupado[key] = { ...producto, cantidad: 0 };
    agrupado[key].cantidad += 1;
  });

  const productosAgrupados = Object.values(agrupado);

  productosAgrupados.forEach(producto => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${producto.nombre}</td>
      <td style="text-align:center;">${producto.cantidad}</td>
      <td style="text-align:center;">$${producto.precio}</td>
      <td style="text-align:right;">
        <button class="sumar">+</button>
        <button class="restar">-</button>
        <button class="boton-eliminar">Eliminar todos</button>
      </td>
    `;

    // Listeners botones (igual que antes)
    const botonSumar = tr.querySelector(".sumar");
    if (botonSumar) {
      botonSumar.addEventListener("click", () => {
        carrito.push({ nombre: producto.nombre, precio: producto.precio });
        guardarCarritoEnStorage();
        actualizarContador();
        mostrarCarrito();
      });
    }

    const botonRestar = tr.querySelector(".restar");
    if (botonRestar) {
      botonRestar.addEventListener("click", () => {
        const i = carrito.findIndex(p => p.nombre === producto.nombre && p.precio === producto.precio);
        if (i !== -1) carrito.splice(i, 1);
        if (carrito.length === 0) {
          localStorage.removeItem("carrito");
          actualizarTotal();
        }
        mostrarCarrito();
        guardarCarritoEnStorage();
        actualizarContador();
      });
    }

    const botonEliminar = tr.querySelector(".boton-eliminar");
    if (botonEliminar) {
      botonEliminar.addEventListener("click", () => {
        carrito = carrito.filter(p => !(p.nombre === producto.nombre && p.precio === producto.precio));
        mostrarCarrito();
        guardarCarritoEnStorage();
        actualizarContador();
      });
    }

    contenedorCarrito.appendChild(tr);
  });

  actualizarTotal();
}




//ACTUALIZAR EL TOTAL DEL PRECIO (ESTEBAN)

function actualizarContador() {
  const contador = carrito.length;
  const contadorElemento = document.getElementById("contador-carrito");
  if (contadorElemento) {
    contadorElemento.innerText = contador;
  }
}



function actualizarTotal() {
    let total = 0;
    carrito.forEach(juegos => { //Uso el foreach para ir recorriendo el array de juegos, por cada fruta toma el precio y lo suma a Total
        total += juegos.precio;
    });

    document.getElementById("precio-total").innerText = `Total: $${total}`;
}

//BOTON ELIMINAR DEL CARRITO (ESTEBAN)

function eliminarProducto(indice) {
  carrito.splice(indice, 1);
  mostrarCarrito(); // Re-renderizo el carrito, para que muestre la version actualizada del carrito 
  console.log("Producto eliminado. Carrito:", carrito); // muestro en console tambnien que se elimino el producto seleccionado
    if (carrito.length === 0) { //si el carrito es igual a 0 (osea que no tiene productos) se elimina el carrito para que no se muestre
    localStorage.removeItem("carrito");
    actualizarTotal();
    }
  guardarCarritoEnStorage(); //aca estoy guardando el carrito en la funcion de LocalStorage, de forma que haya interacciones previas o actuales. 
}



/* STORAGE */
//GUARDAR CARRITO EN STORAGE
function guardarCarritoEnStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito)); //Transformo a JSON nuestro array
    console.log("Se guardo el carrito")
}

//CARGAR CARRITO EN STORAGE
/* function cargarCarritoDesdeStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado); //Cargo transformando nuestro Json en array. 
        mostrarCarrito(); 
    }
} */

function cargarCarritoDesdeStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
}

//VACIAR CARRITO
function vaciarCarrito() {
    carrito = []; // Vacía el array carrito
    mostrarCarrito(); // Actualiza la vista del carrito
    localStorage.removeItem("carrito"); // Borra el carrito guardado en localStorage
    eliminarProducto()
}

const botonVaciar = document.getElementById("vaciar-carrito");
if (botonVaciar) {
    botonVaciar.addEventListener("click", vaciarCarrito);
}

//FUNCIONES DE MODAL
function mostrarModal(mensaje) {
  const modal = document.getElementById("modal-confirmacion");
  const mensajeModal = document.getElementById("mensaje-modal");
  mensajeModal.textContent = mensaje;
  modal.style.display = "flex";

  //cerrar modal al hacer click fuera del contenido
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      cerrarModal();
    }
  });
}

function cerrarModal() {
  const modal = document.getElementById("modal-confirmacion");
  if (modal) {
    modal.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const nombreCliente = sessionStorage.getItem("nombreCliente");
  const saludo = document.getElementById("saludo-cliente");

  if (saludo && nombreCliente) {
    saludo.textContent = `¡Bienvenido, ${nombreCliente}!`;
  }
});

const botonConfirmar = document.getElementById("confirmar-compra");
if (botonConfirmar) {
  botonConfirmar.addEventListener("click", () => {
    vaciarCarrito();         // Borra el carrito y actualiza la vista
    actualizarContador();    // Resetea el número del contador
    alert("¡Gracias por tu compra!");
    window.location.href = "index.html";
  });
}



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!NO TE OLVIDES DE ACTUALIZAR EL CONTADOR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

/* FUNCION INIT */
function init() {
    const nombreCliente = sessionStorage.getItem("nombreCliente");
    const path = window.location.pathname;
  
    if (!nombreCliente && (path.includes("productos.html") || path.includes("carrito.html"))) {
      alert("Por favor ingrese su nombre");
      window.location.href = "index.html";
      return;
    }

    if(path.includes("carrito.html")){
    cargarCarritoDesdeStorage();
    mostrarCarrito();
    /* vaciarCarrito(); */ //Si activamos vaciar carrito de una, se resetea el carrito
    actualizarContador();

    }

    if(path.includes("productos.html")){
    cargarCarritoDesdeStorage();     // ⬅️ recupera el carrito si había algo
    actualizarContador();            // ⬅️ actualiza el número de productos en el ícono

    //Mostrar todo
    document.getElementById("ordenar-todo").addEventListener("click", () => {
      mostrarProductos(productos);
    });

  // ...


    //Mostrar consolas
    document.getElementById("ordenar-consolas").addEventListener("click", () => {
    let consolas = productos.filter(producto => producto.categoria == "consolas");
      mostrarProductos(consolas);
    });

    //Mostrar juegos
    document.getElementById("ordenar-juegos").addEventListener("click", () => {
    let juegos = productos.filter(producto => producto.categoria == "juegos");
      mostrarProductos(juegos);
    });
    
    mostrarProductos(productos);
    document.getElementById("ordenar-nombre").addEventListener("click", ordenarPorNombre);
    document.getElementById("ordenar-precio").addEventListener("click", ordenarPorPrecio);
    obtenerProductosDesdeBackend();

    //BOTON MODAL Y SUS LISTENER
    const btnCerrar = document.getElementById("cerrar-modal");
    if (btnCerrar) {
    btnCerrar.addEventListener("click", cerrarModal);
    }

    const modal = document.getElementById("modal-confirmacion");
    if (modal) {
      modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      cerrarModal();
    }
    });
    }

  }
} 

window.onload = init;