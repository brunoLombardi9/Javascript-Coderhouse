Javascript Coderhouse

El archivo script.js es donde se escribe el codigo principal del proyecto.
Se utilizan librerias de JS toastify, emailjs y bootstrap.

Elementos del DOM:
contenedorProductos:  es el contenedor donde se cargan las cards de los productos y el carrito.
actualizarTodas: es el boton "Zapatillas".
iconoCarrito: boton del carrito de compras.
eliminarDelCarrito: boton que se reenderiza dentro del carrito para eliminar un producto puntual .
botonesMarcas: node list que contiene los elementos del menu lateral de la seccion marcas.
botonesCategorias: node list que contiene los elementos del menu lateral de la seccion categorias.

--------------------------------------------------------------------------------------------------------


Variables:

botonCarritoOriginal:  variable donde se guarda el estado original del carrito de compras (se usa en la funcion checkearCarrito para que cuando el carrito este vacio se muestre de color verde y sin cantidad de productos).
cotizacionDolar: variable en la que se almacena cotizacion del dolar extraida de la API DolarSi.
resultadosPorPagina:  determina cantidad maxima de cards que se muestran por resultado de busqueda.
paginaActual: almacena el numero de pagina actual que muestran los resultados de busqueda.
numeroDePaginas: variable que guarda cuantas paginas devuelve el resultado de busqueda.


--------------------------------------------------------------------------------------------------
Arrays:

zapatillas: array que contiene todos los objetos de los productos.
arrayPaginacion: array que contiene los objetos que se muestran en la pagina actual.
totalDeResultados: array que contiene todos los resultados de las busquedas de productos.
zapatillasBasket: array que contiene los modelos que provienen de la API The sneaker database.
carrito: array que contiene los productos que se agregan al carrito de compras.
Objetos y metodo constructor:
Método calzado: recibe como parametros "marca", "modelo", "precio", "categoria", "ImgOrigen" y "porcentajeDescuento".
El metodo asigna la propiedad"id", que siempre es el lenght acutal del array zapatillas.
El parametro "porcentajeDescuento"es opcional, si se ingresa, el metodo valida si es un valor entre 0 y 50, en el caso de una entrada valida se genera la propiedad "nuevoPrecio", la cual se calcula restandole a "precio" el "procentajeDescuento".
Por ultimo, se genera la propiedad "precioDefinitivo", la cual es igual al "precio, salvo que se haya ingresado un valor valido de "porcentajeDescuento", en ese caso "precioDefinitivo" es igual a "nuevoPrecio".
Los objetos, cortez, alleyopp, blazer, runFalcon, forumLow, superStar, club y legacy son creados de forma manual, el resto de objetos provienen de la API The sneaker Database.

-----------------------------------------------------------------------------------------------------------------------
Funciones:

init: define las funciones que se ejecutan al cargar el sitio.


almacenarDatos: guarda en formato JSON el contenido del array carrito, guardandolo en el Local Storage.


precargarDatos: obtiene los datos provenientes del JSON generado en almacenarDatos.


limpiarProductos: elimina todo el contenido que se encuentra dentro del elemento "contenedorProductos".


evaluarResultados: genera los botones "anterior" y "siguiente" y marca el numero de pagina basandose en los siguientes criterios:
Si "paginaActual" es mayor que 1 y menor que "numeroDePaginas", genera ambos botones.
Si "paginaActual es igual "numeroDePaginas" y este ultimo es mayor a 1, genera solo el boton "anterior".
Si "paginaActual" es igual a 1 y tambien es menor a "numeroDePaginas", genera solo el boton "siguiente".


indicePaginacion: recibe los parametros "arrayBuscado" y "pagina"(opcional).
El parametro "pagina" es igual "paginaActual", de manera que si no se ingresa tome por defecto su valor actual, pero si se ingresa modifique la misma.
La funcion hace que al "arrayBuscado" se le aplique un slice que devuelve resultados basandose en la "pagina" y "resultadosPorPagina".


datosPaginacion: recibe "arrayAMostrar" como parametro, luego declara la variable "totalDeResultados" = "arrayAMostrar".
Declara "paginaActual" = 1 para que la busqueda siempre comience desde los primeros resultados a mostrar.
Declara "resultadosPaginasArray" para que sea igual al resultado devuelto por la funcion indicePaginacion, que en este caso recibe como parametro "arrayAMostrar".
Se declara como un array vacio la variable "arrayPaginacion” para despues llenar el array pusheando “resultadosPaginasArray”.
Se declara “numeroDePaginas” para que sea igual la cantidad de resultados dividido la cantidad de resultados.


generarCards: recibe como parametro “arrayARenderizar”, al cual se le aplica un forEach.
En cada caso dentro del forEach evalua lo siguiente:
Si la propiedad nuevoPrecio de la “zapatilla” no es undefined (significa que tiene descuento aplicado), renderiza la card del producto mostrando el porcentaje de descuento aplicado, el precio original y el precio final.
Si nuevoPRecio es undefined, entonces renderiza la card solo mostrando los datos de la zapatilla sin descuento.
Al finalizar, se llama a evaluarResultados para que se renderizen botones Anterior y siguiente.


resultadoBusqueda: recibe parametros "botonera" y "parametroBusqueda".
El parametro "botonera", hace referencia a un nodelist, que podria ser "botonesMarcas" o "botonesCategorias".
El "parametroBusqueda" puede ser "marca" o "categoria".
Al parametro "botonera", se le aplica forEach, donde el elemento "boton" dispara evento mediante addEventListener.
Esto hace que el evento solo tenga en cuenta los botones que formen parte del nodelist indicado.
Se define la variable "resultado", que es igual al resultado de filter sobre el array "zapatillas", el cual devuelve como resultados las zapatillas cuyo "parametroBusqueda" (puede ser marca o categoria), sea igual al texto del boton presionado en el menu. ej: "si se presiona el boton Nike, solo buscara las zapatillas cuya marca sea Nike".
Se declara la variable "resultadoBusquedaZapatilla", que es igual al resultado de datosPaginacion(resultado);
Se llama a funcion limpiarProductos para que el contenedor quede limpio y para finalizar, se evalua si totalDeResultados.length es mayor que 0, si esto se cumple entonces se llama funcion generarCards para generar las cards de los productos que se encuentran en "resultadoBusquedaZapatilla", de lo contrario se muestra mensaje que indica que no se encontraron resultados.


cargarTodosLosModelos: Se llama a la API The Sneaker Database mediante fetch, luego se gestionan promesas de manera que luego de obtener los datos de la API, “zapatillasBasket” sea igual a un array que contenga los resultados filtrados (se obtienen resultados solo que tengan imágenes, marca Jordan y que su precio sea mayor a 0).
Se aplica forEach a “zapatillasBasket” para aplicar metodo constructor a cada uno de sus objetos y asi adaptar los datos provenientes de la API a la estructura original del proyecto.
Al finalizar, se recibe otra promesa con la funcion todosLosModelos, para reenderizar todos los productos, en el caso de que haya error en alguna de las promesas anteriores, se ejecuta la misma funcion.


todosLosModelos: llama limpiarProductos para limpiar el contenedor, para luego renderizar todos los modelos en el mediante generarCards. Al final, ejecuta checkearCarrito para para verificar que tenga productos en el .
mostrarOfertas: mediante filter, busca dentro del array “zapatillas” aquellos resultados que tengan porcentajeDescuento distinto de undefined.
Limpia el contenedor con la funcion limpiarProductos y luego renderiza los resultados con generarCards.


agregarAlCarrito: recibe el parametro “id”. Se declara la variable objetoCarrito , este es igual al resultado del metodo find, que busca en el array “zapatillas” los modelos que coincidan con el numero de id proporcionado en el parametro.
Se declara la variable cantidadDeProductos, que es igual a al resultado del metodo filter, que busca en el array “carrito” los objetos que tengan el mismo “id” que el proporcionado en el parametro.
Al finalizar, se evalua si cantidadDeProductos es menor a 5, si esto se cumple entonces agrega el producto al carrito, de lo contrario no se agregrara el producto, esto se hace para poner un limite de unidades a llevar por cada producto.


eliminarProducto: Recibe como parametro “id”. Se declara la variable “objetoEliminado” , este es igual al resultado del metodo find, que busca en el array “zapatillas” los modelos que coincidan con el numero de id proporcionado en el parametro.
Se aplica el metodo splice sobre el array “carrito”, dandole como parametro el indice del “objetoEliminado”.
Se llama a la funcion almacenarDatos para que el estado de carrito quede almacenado en el Local Storage.
Se llama funcion carritoDeCompras para que se actualice el carrito con el contenido actualizado del mismo.
Se llama checkearCarrito para actualizar el estado del "iconoCarrito".


carritoDeCompras: Evalua si carrito.lenght es mayor 0, si es asi primero declara "precioFinal" en 0.
Aplica forEach al array "carrito", sumandole a "precioFinal" el "precioDefinitivo" de cada objeto dentro del array. Al final renderiza cuadro donde se visualizan los datos del carrito.
Si carrito.lenght no es mayor de 0, solo renderiza texto de carrito vacio.


checkearCarrito: Evalua si carrito.lenght es mayor a 0, renderiza el icono del carrito con el numero de productos en el y se le agrega la clase "colorFondoCarritoLLeno", que le a el color rojo.
Si carrito.length no es mayor a 0, deja el icono en su estado original.


vaciarCarrito: Declara "carrito" como array vacio, luego llama a la funcion carritoDeCompras para actualizar el carrito. Se llama funcion checkearCarrito para actualizar el "iconoCarrito" para finalizar la funcion almacenarDatos para actualizar el Local Storage.


cargarCotizacionDolar: Se llama a la API DolarSi mediante fetch, con la cual se declara la variable cotizacionDolar con el resultado obtenido de la API, mediante catch si no se pudiera consumir la api se fija el valor de cotizacionDolar en 210.


volverArriba: Se declara variable "index", haciendo referencia al documento html.
A "index" se le aplica la funcion scrollTo para ir hacia la parte superior del sitio.


avanzarRetroceder: recibe como parametro "accion".
Si "accion" es igual a "avanzar", le suma 1 a "paginaActual", si "accion" es igual a "retroceder", resta 1 a "paginaActual".
Declara "arrayPaginacion" como resultado de la funcion indicePaginacion, que recibe como parametros "resultadoBusqueda" y "paginaActual".
Se declara “numeroDePaginas” para que sea igual la cantidad de resultados dividido la cantidad de resultados.
Se llama funcion generarCards para renderizar "arrayPaginacion".
Se llama funcion volverArriba para que los botones lleven hacia la parte superior del sitio.
