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

//FUNCION MOSTRAR PRODUCTOS

function mostrarProductos(productos) {
    const contenedor = document.querySelector(".contenedor-productos");
    contenedor.innerHTML = ""; // Limpiar antes de mostrar para evitar duplicados

    productos.forEach(fruta => { 
        const div = document.createElement("div");
        div.classList.add("card-producto");
        //Creo un nuevo div con el contenido de cada fruta recorrida en el forEach 
        div.innerHTML = ` 
        <img src="${fruta.imagen}" alt="${fruta.nombre}">
        <h3>${fruta.nombre}</h3>
        <p>$${fruta.precio}</p>
        <button data-id="${fruta.id}">Agregar al carrito</button> 
        `;

    contenedor.appendChild(div); //Agregamos al DOM como hijo.
  });
}

//FUNCIONES ORDENAR POR NOMBRE Y PRECIOS

function ordenarPorNombre() {
    const frutasOrdenadas = [...productos].sort((a, b) => {
        return a.nombre.localeCompare(b.nombre); //Uso sort para ordenar de forma que use como metodo de comparacion el nombre de las freutas
    });
    mostrarProductos(frutasOrdenadas);
}

function ordenarPorPrecio() {
    const frutasOrdenadas = [...productos].sort((a, b) => a.precio - b.precio); //Lo mismo pero usando el precio.
    mostrarProductos(frutasOrdenadas);
}


function init() {
    mostrarProductos(productos);
    document.getElementById("ordenar-nombre").addEventListener("click", ordenarPorNombre);
    document.getElementById("ordenar-precio").addEventListener("click", ordenarPorPrecio);
  }

window.onload = init;