"use strict";

// VARIABLES ---------------------------------------------------------------------------

const contenedorProductos = document.querySelector('#contenedorProductos');
const actualizarTodas = document.querySelector('#actualizarTodas');
const iconoCarrito = document.querySelector('.botonCarrito');
const botonCarritoOriginal = iconoCarrito.innerHTML;
const eliminarDelCarrito = document.querySelector('.eliminarDelCarrito');
const botonesMarcas = document.querySelectorAll('.botonesMarcas');
const botonesCategorias = document.querySelectorAll('.botonesCategorias');
let cotizacionDolar;

// ARRAYS ---------------------------------------------------------------------------

const zapatillas = [];
let zapatillasBasket = [];
let carrito = [];

// FUNCIONES ---------------------------------------------------------------------------

function init() {
  precargarDatos();
  cargarCotizacionDolar();
  cargarTodosLosModelos(); //Añade los modelos que provienen de la API
  resultadoBusqueda(botonesMarcas, "marca");
  resultadoBusqueda(botonesCategorias, "categoria");
}

function almacenarDatos() {
  localStorage.setItem("Usuario", JSON.stringify(carrito));
}

function precargarDatos() {

  JSON.parse(localStorage.getItem("Usuario")) !== null ?
    carrito = JSON.parse(localStorage.getItem("Usuario")) :
    almacenarDatos();
}

function limpiarProductos() {
  contenedorProductos.innerHTML = '';
}

function generarCards(parametroCard) {

  parametroCard.forEach((zapatilla) => {

    if (zapatilla.nuevoPrecio !== undefined) {
      contenedorProductos.innerHTML += `
      <div class="col-lg-3 col-sm-6 bg-light card mt-3 mb-3 pb-3">
      <img src= ${zapatilla.img.src} class="img-fluid mt-2" alt="imagenProducto">
      <h2 class="text-center">${zapatilla.marca} ${zapatilla.modelo}</h2>
      <h3 class="text-center text-decoration-line-through">$${zapatilla.precio}</h3>
      <h3 class="text-center text-danger">$${zapatilla.nuevoPrecio} ${zapatilla.porcentajeDescuento}% OFF</h3>
      <button class="btn btn-primary mt-auto" onclick='agregarAlCarrito(${zapatilla.id})'>Agregar al carrito</button>
      </div>
      `;

    } else {
      contenedorProductos.innerHTML += `
      <div class="col-lg-3 col-sm-6 bg-light card mt-3 mb-3 pb-3">
      <img src= ${zapatilla.img.src} class="img-fluid mt-2" alt="imagenProducto">
      <h2 class="text-center">${zapatilla.marca} ${zapatilla.modelo}</h2>
      <h3 class="text-center">$${zapatilla.precio}</h3>
      <button class="btn btn-primary mt-auto" onclick='agregarAlCarrito(${zapatilla.id})'>Agregar al carrito</button>
      </div>
      `;
    }
  });
}

function cargarTodosLosModelos() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'the-sneaker-database.p.rapidapi.com',
      'X-RapidAPI-Key': 'f533083bc4msh51410bda77b71a6p125cecjsnce463cda1a98'
    }
  };

  fetch('https://the-sneaker-database.p.rapidapi.com/sneakers?limit=100', options)
    .then(response => response.json())
    .then(response => {
      //Se adaptan las propiedades de los objetos obtenidos de la API a la estructura que tenian los objetos originales del proyecto
      zapatillasBasket = response.results.filter(zapatillaBasket => {
      return  zapatillaBasket.brand === "Jordan" && zapatillaBasket.retailPrice > 0 && zapatillaBasket.image.original !== "" ;
      });
      zapatillasBasket.forEach(zapatillaBasket => {

        const precioEnPesos = parseInt(zapatillaBasket.retailPrice) * cotizacionDolar;

        const zapatillaDatosAdaptados = new calzado(`${zapatillaBasket.brand}`, `${zapatillaBasket.name}`, precioEnPesos, "Basket", `${zapatillaBasket.image.original}`)
        zapatillas.push(zapatillaDatosAdaptados);
      });
    })
    .then(() => todosLosModelos())
    .catch(todosLosModelos());
}

function resultadoBusqueda(botonera, parametroBusqueda) {

  botonera.forEach(boton => {
    boton.addEventListener('click', () => {

      const resultado = zapatillas.filter((zapatilla) => {
        return zapatilla[parametroBusqueda] === boton.innerText;
      });

      limpiarProductos();

      (resultado.length > 0) ?
      generarCards(resultado):
        contenedorProductos.innerHTML = ` <p class="h1 text-center mt-5">Lo sentimos, no encontramos lo que buscabas</p>`;
    });
  });
}

function todosLosModelos() {
  limpiarProductos();
  generarCards(zapatillas);
  checkearCarrito();
}

function mostrarOfertas() {

  const resultado = zapatillas.filter(zapatilla => {
    return zapatilla.porcentajeDescuento !== undefined;
  });

  limpiarProductos();
  generarCards(resultado);
}

function agregarAlCarrito(id) {

  const objetoCarrito = zapatillas.find(zapatilla => zapatilla.id === id);

  carrito.push(objetoCarrito);

  Toastify({
    text: `¡Agregaste ${objetoCarrito.marca} ${objetoCarrito.modelo} al carrito!`,
    duration: 1200,
    newWindow: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: false, // Prevents dismissing of toast on hover
    style: {
      background: "#062C30",
    },
  }).showToast();

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
      precioFinal += productoCarrito.precioDefinitivo;
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
        <td>$${productoCarrito.precioDefinitivo}</td>
        <td class ="d-flex justify-content-center"><button class="btn btn-danger eliminarDelCarrito" onclick="eliminarProducto(${productoCarrito.id})">X</button></td>
                                `
      elementosCarrito.appendChild(datosProducto)
    });
  } else {
    contenedorProductos.innerHTML = `<p class="h1 text-center mt-5">El carrito está vacío</p>`;
  }
}

function checkearCarrito() {

  if (carrito.length > 0) {
    iconoCarrito.innerHTML = `
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
         </svg>  ${carrito.length}`;
    iconoCarrito.classList.add("colorFondoCarritoLLeno");
  } else {
    iconoCarrito.innerHTML = botonCarritoOriginal;
    iconoCarrito.classList.remove("colorFondoCarritoLLeno");
  }
}

function vaciarCarrito(valorCotizacion) {
  carrito = [];
  carritoDeCompras();
  checkearCarrito()
  almacenarDatos();
}

function cargarCotizacionDolar() {
  fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
    .then(response => response.json())
    .then(response => {
      cotizacionDolar = parseInt(response[1].casa.venta); //Se pasa valor actual del dolar extraido de la API
    })
}


// METODO CONSTUCTOR Y OBJETOS --------------------------------------------------------------------------------

class calzado {
  constructor(marca, modelo, precio, categoria, imgOrigen, porcentajeDescuento) {
    this.marca = marca;
    this.modelo = modelo;
    this.precio = precio;
    this.categoria = categoria
    this.id = zapatillas.length;
    const imagen = new Image();
    imagen.src = imgOrigen;
    this.img = imagen;
    this.porcentajeDescuento = porcentajeDescuento;

    this.porcentajeDescuento !== undefined && porcentajeDescuento > 0 && porcentajeDescuento < 50 ?
      this.nuevoPrecio = ((100 - porcentajeDescuento) / 100) * this.precio : //Calcula nuevo precio basado en el porcentaje de descuento
      this.nuevoPrecio = undefined;

    this.nuevoPrecio !== undefined ? //Si no tiene descuento que asigne precio original como precio definitivo
      this.precioDefinitivo = this.nuevoPrecio :
      this.precioDefinitivo = this.precio;
  }
}

const cortez = new calzado("Nike", "Cortez", 15000, "Moda", "imagenes/nike cortez.png");
zapatillas.push(cortez);
const alleyoop = new calzado("Nike", "Alleyoop", 18000, "Skateboarding", "imagenes/nike aleyoop.jpg", 10);
zapatillas.push(alleyoop);
const blazer = new calzado("Nike", "Blazer", 14000, "Skateboarding", "imagenes/nike blazer.webp", );
zapatillas.push(blazer);
const runFalcon = new calzado("Adidas", "Run Falcon", 12000, "Running", "imagenes/adidas run falcon.webp", 20);
zapatillas.push(runFalcon);
const forumLow = new calzado("Adidas", "Forum Low", 20000, "Moda", "imagenes/adidas forum low.webp");
zapatillas.push(forumLow);
const superStar = new calzado("Adidas", "Superstar", 18000, "Skateboarding", "imagenes/adidas superstar.webp", );
zapatillas.push(superStar);
const royal = new calzado("Reebok", "Royal", 10000, "Moda", "imagenes/reebok royal.webp", 25);
zapatillas.push(royal);
const club = new calzado("Reebok", "Club", 11000, "Moda", "imagenes/reebok club.webp");
zapatillas.push(club);
const legacy = new calzado("Reebok", "Legacy", 15000, "Moda", "imagenes/reebok legacy.webp");
zapatillas.push(legacy);
