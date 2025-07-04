let productos = [
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
  ];

/* PAGINA DE BIENVENIDA FUNCIONES */
//fijarse de que diga el nombre tambien en la pantalla de productos

//FUNCION INGRESAR NOMBRE
function ingresar() {
  let nombreIngresado = document.getElementById('nombre-cliente').value; //Guardamos el valor ingresado por el cliente en la variable
    if (nombreIngresado.trim()) { //Validamos que no este vacio y eliminamos espacios
        sessionStorage.setItem('nombreCliente', nombreIngresado); //Guardamos el nombre usando session storage para que solo este guardado lo que dure la sesion
        console.log(`Hola ${nombreIngresado}`)
        window.location.href = 'productos.html'; //Dirige a la pagina de los productos
    } else {
        alert('Por favor ingrese su nombre');
    }
  }


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


//////////////////////////////////////////////////////////////////
/*PAGINA DE PRODUCTOS*/
//FUNCION MOSTRAR PRODUCTOS
function mostrarProductos(productos) {
    const contenedor = document.querySelector(".contenedor-productos");
    contenedor.innerHTML = ""; // Limpiar antes de mostrar para evitar duplicados

    productos.forEach(juegos => { 
        const div = document.createElement("div");
        div.classList.add("card-producto");
        //Creo un nuevo div con el contenido de cada fruta recorrida en el forEach 
        div.innerHTML = ` 
        <img src="${juegos.imagen}" alt="${juegos.nombre}">
        <h3>${juegos.nombre}</h3>
        <p>$${juegos.precio}</p>
        <button data-id="${juegos.id}">Agregar al carrito</button> 
        `;

        const boton = div.querySelector("button");
        boton.addEventListener("click", () => {
        agregarAlCarrito(juegos);
        });

    contenedor.appendChild(div); //Agregamos al DOM como hijo.
  });
}
            

//FUNCIONES PARA ORDENAR Y MOSTRAR CATEGORIAS 

/* //Mostrar todo
document.getElementById("ordenar-todo").addEventListener("click", () => {
  mostrarProductos(productos);
});

//Mostrar consolas
document.getElementById("ordenar-consolas").addEventListener("click", () => {
  let consolas = productos.filter(producto => producto.categoria == "consolas");
  mostrarProductos(consolas);
});

//Mostrar juegos
document.getElementById("ordenar-juegos").addEventListener("click", () => {
  let juegos = productos.filter(producto => producto.categoria == "juegos");
  mostrarProductos(juegos);
}); */


function ordenarPorNombre() {
    const juegosOrdenadas = [...productos].sort((a, b) => {
        return a.nombre.localeCompare(b.nombre); //Uso sort para ordenar de forma que use como metodo de comparacion el nombre de las freutas
    });
    mostrarProductos(juegosOrdenadas);
}

function ordenarPorPrecio() {
    const juegosOrdenadas = [...productos].sort((a, b) => a.precio - b.precio); //Lo mismo pero usando el precio.
    mostrarProductos(juegosOrdenadas);
}

//FUNCION AGREGAR AL CARRITO Y CARRITO EN GENERAL 

let carrito = []

/* function agregarAlCarrito(producto) {
    carrito.push(producto);
    console.log("Carrito actualizado:", carrito);
    mostrarCarrito();
    guardarCarritoEnStorage()
} */

function agregarAlCarrito(producto) {
    carrito.push(producto);
    console.log("Carrito actualizado:", carrito);
    guardarCarritoEnStorage();

    // Mostrar carrito sólo si existe el contenedor (estamos en carrito.html)
    if (document.getElementById("items-carrito")) {
        mostrarCarrito();
    }
}

/* function mostrarCarrito() {
    const contenedorCarrito = document.getElementById("items-carrito");

    if (carrito.length === 0) { //agregue esta condicion para que en caso de que no haya ningun objeto en el carrito que pueda imprimir aunque sea esta frase.
        contenedorCarrito.innerHTML = '<p id="carrito-vacio">No hay elementos en el carrito.</p>';
        return;
    }

    contenedorCarrito.innerHTML = '';

    carrito.forEach((producto, index) => {
        const li = document.createElement("li");
        li.classList.add("bloque-item");

        li.innerHTML = `
        <div id=contenedor-carritos>
        <p class="nombre-item">${producto.nombre} - $${producto.precio} <p/>
        <button class="boton-eliminar" data-index="${index}">Eliminar</button>
        </div>
        `;

        const botonEliminar = li.querySelector("button");
        botonEliminar.addEventListener("click", () => {
        eliminarProducto(index); //llamo a la funcion eliminar producto (esta mas abajo)
        });

        contenedorCarrito.appendChild(li);

        actualizarTotal();
    });
} */

function mostrarCarrito() {
    const contenedorCarrito = document.getElementById("items-carrito");
    if (!contenedorCarrito) return;  // <--- Agregar esta línea para evitar error si no existe el contenedor

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p id="carrito-vacio">No hay elementos en el carrito.</p>';
        return;
    }

    contenedorCarrito.innerHTML = '';
    carrito.forEach((producto, index) => {
        const li = document.createElement("li");
        li.classList.add("bloque-item");

        li.innerHTML = `
        <div id=contenedor-carritos>
        <p class="nombre-item">${producto.nombre} - $${producto.precio} <p/>
        <button class="boton-eliminar" data-index="${index}">Eliminar</button>
        </div>
        `;

        const botonEliminar = li.querySelector("button");
        botonEliminar.addEventListener("click", () => {
        eliminarProducto(index); //llamo a la funcion eliminar producto (esta mas abajo)
        });

        contenedorCarrito.appendChild(li);
    });

    actualizarTotal();
}

//ACTUALIZAR EL TOTAL DEL PRECIO (ESTEBAN)

/* function actualizarContador() {
    const contador = carrito.length;
    document.getElementById("contador-carrito").innerText = contador;
} */

function actualizarTotal() {
    let total = 0;
    carrito.forEach(juegos => { //Uso el foreach para ir recorriendo el array de juegos, por cada fruta toma el precio y lo suma a Total
        total += juegos.precio;
    });

    document.getElementById("precio-total").innerText = `Total: $${total}`;
}

//BOTON ELIMINAR CARRITO (ESTEBAN)

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

//GUARDAR CARRITO EN STORAGE

function guardarCarritoEnStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito)); //Transformo a JSON nuestro array
    console.log("Se guardo el carrito")
}

function cargarCarritoDesdeStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado); //Cargo transformando nuestro Json en array. 
        mostrarCarrito(); 
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

function init() {
    const path = window.location.pathname;

    if(path.includes("carrito.html")){
    cargarCarritoDesdeStorage();
    mostrarCarrito();
    /* vaciarCarrito(); */ //Si activamos vaciar carrito de una, se resetea el carrito
    actualizarContador();
    }

    if(path.includes("productos.html")){
    //Mostrar todo
    document.getElementById("ordenar-todo").addEventListener("click", () => {
    mostrarProductos(productos);
    });

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
  }
} 

//ANTIGUO INIT
/* mostrarProductos(productos);
  /* cargarCarritoDesdeStorage(); */
  /* document.getElementById("ordenar-nombre").addEventListener("click", ordenarPorNombre);
  document.getElementById("ordenar-precio").addEventListener("click", ordenarPorPrecio); */

window.onload = init;