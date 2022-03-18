"use strict";

// VARIABLES ---------------------------------------------------------------------------

const zapatillas = [];
const contenedorProductos = document.querySelector('#contenedorProductos');

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


// FUNCIONES ---------------------------------------------------------------------------


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

        card.innerHTML = `<img src= ${zapatilla.img.src} class="img-fluid mt-2" alt="imagenProducto"><h2 class="text-center">${zapatilla.modelo}</h2><h3 class="text-center">$${zapatilla.precio}</h3>`

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

      card.innerHTML = `<img src= ${zapatilla.img.src} class="img-fluid mt-2" alt="imagenProducto"><h2 class="text-center">${zapatilla.modelo}</h2><h3 class="text-center">$${zapatilla.precio}</h3>`

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
