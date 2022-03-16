"use strict";

// VARIABLES ---------------------------------------------------------------------------

const zapatillas = [];

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
