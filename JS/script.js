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

function resultadoBusquedaNike() {

  const botonNike = document.querySelector('#nike');
  botonNike.addEventListener('click', () => {

    const resultado = zapatillas.filter((zapatilla) => {
      return zapatilla.marca === "nike";
    })
    resultado.forEach((zapatilla) => {
      const card = Object.assign(document.createElement('div'), {
        className: 'col-lg-3 col-sm-6 bg-light card mt-3 mb-3 pb-3'
      });

      card.innerHTML = `<img src="" class="img-fluid mt-2" alt="imagenProducto"><h2 class="text-center">${zapatilla.modelo}</h2><h3 class="text-center">$${zapatilla.precio}</h3>`

      const contenedorProductos = document.querySelector("#contenedorProductos");

      contenedorProductos.appendChild(card);
    })

  })
}


function init() {
  resultadoBusquedaNike();
  // resultadoBusquedaAdidas();
  // resultadoBusquedaReebok();
}


// OBJETOS --------------------------------------------------------------------------------

// DECLARACION DE OBJETOS --------------------------------------------------------------------

const cortez = new calzado("nike", "cortez", 15000, "moda");
zapatillas.push(cortez);

const alleyoop = new calzado("nike", "alleyoop", 18000, "skateboarding");
zapatillas.push(alleyoop);

const blazer = new calzado("nike", "blazer", 14000, "skateboarding");
zapatillas.push(blazer);

const runFalcon = new calzado("adidas", "run falcon", 12000, "running");
zapatillas.push(runFalcon);

const forumLow = new calzado("adidas", "forum Low", 20000, "moda");
zapatillas.push(forumLow);

const superStar = new calzado("adidas", "superstar", 18000, "skateboarding");
zapatillas.push(superStar);

const royal = new calzado("reebok", "royal", 10000, "moda");
zapatillas.push(royal);

const club = new calzado("reebok", "club", 11000, "moda");
zapatillas.push(club);

const legacy = new calzado("reebok", "legacy", 15000, "moda");
zapatillas.push(legacy);
