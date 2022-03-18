"use strict";

// VARIABLES ---------------------------------------------------------------------------

const zapatillas = [];
const contenedorProductos = document.querySelector('#contenedorProductos');

// FUNCIONES ---------------------------------------------------------------------------

class calzado {
  constructor(marca, modelo, precio, categoria) {
    this.marca = marca;
    this.modelo = modelo;
    this.precio = precio;
    this.categoria = categoria
    this.id = (zapatillas.length);
  }
}

// function cardsProductos() {
//
//   const card = Object.assign(document.createElement('div'), {
//     className: 'col-lg-3 col-sm-6 bg-light card mt-3 mb-3 pb-3'
//   });
//
//   card.innerHTML = `<img src="" class="img-fluid mt-2" alt="imagenProducto"><h2 class="text-center">${zapatilla.modelo}</h2><h3 class="text-center">$${zapatilla.precio}</h3>`
//
//   const contenedorProductos = document.querySelector("#contenedorProductos");
//
//   contenedorProductos.appendChild(card);
// }

function resultadoBusquedaMarcas() {

  document.querySelectorAll('.botonesMarcas').forEach(botonMarca =>{
  botonMarca.addEventListener('click', () => {

    const resultado = zapatillas.filter((zapatilla) => {
      return zapatilla.marca === botonMarca.innerText;
    })

contenedorProductos.innerHTML = '';

    resultado.forEach((zapatilla) => {
      const card = Object.assign(document.createElement('div'), {
        className: 'col-lg-3 col-sm-6 bg-light card mt-3 mb-3 pb-3'
      });

      card.innerHTML = `<img src="" class="img-fluid mt-2" alt="imagenProducto"><h2 class="text-center">${zapatilla.modelo}</h2><h3 class="text-center">$${zapatilla.precio}</h3>`

      const contenedorProductos = document.querySelector("#contenedorProductos");

      contenedorProductos.appendChild(card);
    })

  })
  })
}

function resultadoBusquedaCategorias() {

  document.querySelectorAll('.botonesCategorias').forEach(botonCategoria =>{
  botonCategoria.addEventListener('click', () => {

    const resultado = zapatillas.filter((zapatilla) => {
      return zapatilla.categoria === botonCategoria.innerText;
    })

contenedorProductos.innerHTML = '';

    resultado.forEach((zapatilla) => {
      const card = Object.assign(document.createElement('div'), {
        className: 'col-lg-3 col-sm-6 bg-light card mt-3 mb-3 pb-3'
      });

      card.innerHTML = `<img src="" class="img-fluid mt-2" alt="imagenProducto"><h2 class="text-center">${zapatilla.modelo}</h2><h3 class="text-center">$${zapatilla.precio}</h3>`

      const contenedorProductos = document.querySelector("#contenedorProductos");

      contenedorProductos.appendChild(card);
    })

  })
  })
}


function init() {
  resultadoBusquedaMarcas();
resultadoBusquedaCategorias();
}


// OBJETOS --------------------------------------------------------------------------------



const cortez = new calzado("Nike", "cortez", 15000, "Moda");
zapatillas.push(cortez);

const alleyoop = new calzado("Nike", "alleyoop", 18000, "Skateboarding");
zapatillas.push(alleyoop);

const blazer = new calzado("Nike", "blazer", 14000, "Skateboarding");
zapatillas.push(blazer);

const runFalcon = new calzado("Adidas", "run falcon", 12000, "Running");
zapatillas.push(runFalcon);

const forumLow = new calzado("Adidas", "forum Low", 20000, "Moda");
zapatillas.push(forumLow);

const superStar = new calzado("Adidas", "superstar", 18000, "Skateboarding");
zapatillas.push(superStar);

const royal = new calzado("Reebok", "royal", 10000, "Moda");
zapatillas.push(royal);

const club = new calzado("Reebok", "club", 11000, "Moda");
zapatillas.push(club);

const legacy = new calzado("Reebok", "legacy", 15000, "Moda");
zapatillas.push(legacy);
