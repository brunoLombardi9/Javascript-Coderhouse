"use strict";

// VARIABLES ---------------------------------------------------------------------------

const contenedorProductos = document.querySelector('#contenedorProductos');
const actualizarTodas = document.querySelector('#actualizarTodas');

// ARRAYS ---------------------------------------------------------------------------

const zapatillas = [];
const carrito = [];

// FUNCIONES ---------------------------------------------------------------------------


class calzado {
  constructor(marca, modelo, precio, categoria, imgOrigen) {
    this.marca = marca;
    this.modelo = modelo;
    this.precio = precio;
    this.categoria = categoria
    this.id = (zapatillas.length);
    const imagen = new Image();
    imagen.src = imgOrigen;
    this.img = imagen;
  }
}

function resultadoBusquedaMarcas() {

  document.querySelectorAll('.botonesMarcas').forEach(botonMarca => {
    botonMarca.addEventListener('click', () => {

      const resultado = zapatillas.filter((zapatilla) => {
        return zapatilla.marca === botonMarca.innerText;
      })

      contenedorProductos.innerHTML = '';

      resultado.forEach((zapatilla) => {
        const card = Object.assign(document.createElement('div'), {
          className: 'col-lg-3 col-sm-6 bg-light card mt-3 mb-3 pb-3'
        });

        card.innerHTML = `<img src= ${zapatilla.img.src} class="img-fluid mt-2" alt="imagenProducto"><h2 class="text-center">${zapatilla.modelo}</h2><h3 class="text-center">$${zapatilla.precio}</h3><button class="btn btn-primary agregarAlCarrito">Agregar al carrito</button>`

        const contenedorProductos = document.querySelector("#contenedorProductos");

        contenedorProductos.appendChild(card);
      })
    })
  })
}

function resultadoBusquedaCategorias() {

  document.querySelectorAll('.botonesCategorias').forEach(botonCategoria => {
    botonCategoria.addEventListener('click', () => {

      const resultado = zapatillas.filter((zapatilla) => {
        return zapatilla.categoria === botonCategoria.innerText;
      })

      contenedorProductos.innerHTML = '';

      resultado.forEach((zapatilla) => {
        const card = Object.assign(document.createElement('div'), {
          className: 'col-lg-3 col-sm-6 bg-light card mt-3 mb-3 pb-3'
        });

      card.innerHTML = `<img src= ${zapatilla.img.src} class="img-fluid mt-2" alt="imagenProducto"><h2 class="text-center">${zapatilla.modelo}</h2><h3 class="text-center">$${zapatilla.precio}</h3><button class="btn btn-primary agregarAlCarrito">Agregar al carrito</button>`

        const contenedorProductos = document.querySelector("#contenedorProductos");

        contenedorProductos.appendChild(card);
      })
    })
  })
}

function todosLosModelos() {
  contenedorProductos.innerHTML = "";

  zapatillas.forEach(zapatilla => {
    const card = Object.assign(document.createElement('div'), {
      className: 'col-lg-3 col-sm-6 bg-light card mt-3 mb-3 pb-3'
    });

  card.innerHTML = `<img src= ${zapatilla.img.src} class="img-fluid mt-2" alt="imagenProducto"><h2 class="text-center">${zapatilla.modelo}</h2><h3 class="text-center">$${zapatilla.precio}</h3><button class="btn btn-primary agregarAlCarrito">Agregar al carrito</button>`

    const contenedorProductos = document.querySelector("#contenedorProductos");

    contenedorProductos.appendChild(card);
  })
}

function mostrarTodasBoton() {
  actualizarTodas.addEventListener('click', () => {
    todosLosModelos();
  })
}

function agregarAlCarrito(){

  document.querySelectorAll('.agregarAlCarrito').forEach(botonCarrito => {
    botonCarrito.addEventListener('click', () => {

zapatillas.forEach(zapatilla =>{
  carrito.push(zapatilla)
  console.log(carrito);
})

      })
})
}
function init() {
  todosLosModelos();
  mostrarTodasBoton();
  resultadoBusquedaMarcas();
  resultadoBusquedaCategorias();
  agregarAlCarrito()
}


// OBJETOS --------------------------------------------------------------------------------

const cortez = new calzado("Nike", "Cortez", 15000, "Moda", "imagenes/nike cortez.png");
const alleyoop = new calzado("Nike", "Alleyoop", 18000, "Skateboarding", "imagenes/nike aleyoop.jpg");
const blazer = new calzado("Nike", "Blazer", 14000, "Skateboarding", "imagenes/nike blazer.webp");
const runFalcon = new calzado("Adidas", "Run falcon", 12000, "Running", "imagenes/adidas run falcon.webp");
const forumLow = new calzado("Adidas", "Forum Low", 20000, "Moda", "imagenes/adidas forum low.webp");
const superStar = new calzado("Adidas", "Superstar", 18000, "Skateboarding", "imagenes/adidas superstar.webp");
const royal = new calzado("Reebok", "Royal", 10000, "Moda", "imagenes/reebok royal.webp");
const club = new calzado("Reebok", "Club", 11000, "Moda", "imagenes/reebok club.webp");
const legacy = new calzado("Reebok", "Legacy", 15000, "Moda", "imagenes/reebok legacy.webp");

zapatillas.push(cortez, alleyoop, blazer, runFalcon, forumLow, superStar, royal, club, legacy);
