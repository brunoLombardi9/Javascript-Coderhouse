"use strict";

// VARIABLES ---------------------------------------------------------------------------

const contenedorProductos = document.querySelector('#contenedorProductos');
const actualizarTodas = document.querySelector('#actualizarTodas');
const iconoCarrito = document.querySelector('.botonCarrito');
const botonCarritoOriginal = iconoCarrito.innerHTML;
const eliminarDelCarrito = document.querySelector('.eliminarDelCarrito');
const botonesMarcas = document.querySelectorAll('.botonesMarcas');
const botonesCategorias = document.querySelectorAll('.botonesCategorias');


// ARRAYS ---------------------------------------------------------------------------

const zapatillas = [];
let carrito = [];

// FUNCIONES ---------------------------------------------------------------------------

class calzado {
  constructor(marca, modelo, precio, categoria, imgOrigen) {
    this.marca = marca;
    this.modelo = modelo;
    this.precio = precio;
    this.categoria = categoria
    this.id = zapatillas.length;
    const imagen = new Image();
    imagen.src = imgOrigen;
    this.img = imagen;

  }
}

function generarCards(parametroCard) {
  parametroCard.forEach((zapatilla) => {
    const card = Object.assign(document.createElement('div'), {
      className: 'col-lg-3 col-sm-6 bg-light card mt-3 mb-3 pb-3'
    });

    card.innerHTML = `<img src= ${zapatilla.img.src} class="img-fluid mt-2" alt="imagenProducto">
    <h2 class="text-center">${zapatilla.modelo}</h2>
    <h3 class="text-center">$${zapatilla.precio}</h3>
    <button class="btn btn-primary" onclick='agregarAlCarrito(${zapatilla.id})'>Agregar al carrito</button>`

    const contenedorProductos = document.querySelector("#contenedorProductos");

    contenedorProductos.appendChild(card);
  });
}

function resultadoBusqueda(botonera, parametroBusqueda) {

  botonera.forEach(boton => {
    boton.addEventListener('click', () => {

      const resultado = zapatillas.filter((zapatilla) => {
        return zapatilla[parametroBusqueda] === boton.innerText;
      });

      contenedorProductos.innerHTML = '';

      if (resultado.length === 0) {

        contenedorProductos.innerHTML = `
        <p class="h1 text-center mt-5">Lo sentimos, no encontramos lo que buscabas</p>`;

      } else {
        generarCards(resultado);
      }
    });
  });
}

function todosLosModelos() {

  contenedorProductos.innerHTML = "";

  generarCards(zapatillas);

  checkearCarrito();
}

function agregarAlCarrito(id) {

  const objetoCarrito = zapatillas.find(zapatilla => zapatilla.id === id);

  carrito.push(objetoCarrito);

  checkearCarrito();

  almacenarDatos();
}

function eliminarProducto(id) {

  const objetoEliminado = zapatillas.find(zapatilla => zapatilla.id === id);

  carrito.splice(carrito.indexOf(objetoEliminado), 1);

  almacenarDatos();
  carritoDeCompras();
  checkearCarrito();
}

function carritoDeCompras() {

  if (carrito.length > 0) {

    let precioFinal = 0;

    carrito.forEach(productoCarrito => {
      precioFinal += productoCarrito.precio;
      return precioFinal;
    })

    contenedorProductos.innerHTML = `

  <div id="contenedorCarrito" class="col-12 d-flex justify-content-center mt-5">
  <table class="table table-bordered">
    <thead id="elementosCarrito">

    <tr>
      <th scope="col"></th>
      <th scope="col"></th>
      <th scope="col" class ="d-flex justify-content-center"><button id="vaciarCarrito" class="btn btn-danger" onclick="vaciarCarrito()">Vaciar Carrito</button></th>
    </tr>

      <tr>
        <th scope="col">Producto</th>
        <th scope="col">Precio</th>
        <th scope="col" class = "text-center">Total</th>
      </tr>
    </thead>
    <tbody >

      <tr>
        <th scope="row"></th>
        <td></td>
        <td class="h4 text-center">$${precioFinal}</td>
      </tr>

    </tbody>
  </table>
</div>`;

    const elementosCarrito = document.querySelector('#elementosCarrito');

    carrito.forEach(productoCarrito => {

      const datosProducto = document.createElement("tr");

      datosProducto.innerHTML = `
    <th scope="row">${productoCarrito.marca} ${productoCarrito.modelo}</th>
        <td>$${productoCarrito.precio}</td>
        <td class ="d-flex justify-content-center"><button class="btn btn-danger eliminarDelCarrito" onclick="eliminarProducto(${productoCarrito.id})">X</button></td>
                                `
      elementosCarrito.appendChild(datosProducto)
    })
  } else {
    contenedorProductos.innerHTML = `<p class="h1 text-center mt-5">El carrito está vacío</p>`;
  }
}

function almacenarDatos() {

  localStorage.setItem("Usuario", JSON.stringify(carrito));

}

function precargarDatos() {

  if (JSON.parse(localStorage.getItem("Usuario")) !== null) {
    carrito = JSON.parse(localStorage.getItem("Usuario"));
  }
}

function checkearCarrito() {

  if (carrito.length > 0) {
    iconoCarrito.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
          <path
            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>  ${carrito.length}`;
    iconoCarrito.classList.add("colorFondoCarritoLLeno");
  } else {
    iconoCarrito.innerHTML = botonCarritoOriginal;
    iconoCarrito.classList.remove("colorFondoCarritoLLeno");
  }
}

function vaciarCarrito() {
  carrito = [];
  carritoDeCompras();
  checkearCarrito()
  almacenarDatos();
}

function init() {
  precargarDatos();
  todosLosModelos();
  resultadoBusqueda(botonesMarcas, "marca");
  resultadoBusqueda(botonesCategorias, "categoria");
}


// OBJETOS --------------------------------------------------------------------------------

const cortez = new calzado("Nike", "Cortez", 15000, "Moda", "imagenes/nike cortez.png");
zapatillas.push(cortez);
const alleyoop = new calzado("Nike", "Alleyoop", 18000, "Skateboarding", "imagenes/nike aleyoop.jpg");
zapatillas.push(alleyoop);
const blazer = new calzado("Nike", "Blazer", 14000, "Skateboarding", "imagenes/nike blazer.webp");
zapatillas.push(blazer);
const runFalcon = new calzado("Adidas", "Run falcon", 12000, "Running", "imagenes/adidas run falcon.webp");
zapatillas.push(runFalcon);
const forumLow = new calzado("Adidas", "Forum Low", 20000, "Moda", "imagenes/adidas forum low.webp");
zapatillas.push(forumLow);
const superStar = new calzado("Adidas", "Superstar", 18000, "Skateboarding", "imagenes/adidas superstar.webp");
zapatillas.push(superStar);
const royal = new calzado("Reebok", "Royal", 10000, "Moda", "imagenes/reebok royal.webp");
zapatillas.push(royal);
const club = new calzado("Reebok", "Club", 11000, "Moda", "imagenes/reebok club.webp");
zapatillas.push(club);
const legacy = new calzado("Reebok", "Legacy", 15000, "Moda", "imagenes/reebok legacy.webp");
zapatillas.push(legacy);
