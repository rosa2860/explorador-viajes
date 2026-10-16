/* =========================================
EXPLORADOR DE VIAJES
Archivo principal de la aplicación
========================================= */
/* =========================================
REFERENCIAS DEL DOM
========================================= */

//IMPORTS
import { getCountries } from './api/countriesAPI.js';
import { mostrarCargando, mostrarError, renderizarPaises, actualizarContador } from './ui/ui.js';

import { procesarPaises } from './utils/filters.js';  

/* =========================================
ESTADO DE LA APLICACIÓN
========================================= */
let countries = [];

const destinationsContainer = document.querySelector('#destinations-container');
const resultsCount = document.querySelector('#results-count');
const initialMessage = document.querySelector('#initial-message');
const searchInput = document.querySelector('#search-input');
const continentFilter = document.querySelector('#continent-filter');
const sortFilter = document.querySelector('#sort-filter');

//APLICAR FILTROS
function aplicarFiltros(){

  //Valor de mi input
  const texto = searchInput.value;

  //valor continente
  const contienent =continentFilter.value;

  //valor criterio de orden
  const criterioOrden = sortFilter.value;

  //
  const resultado = procesarPaises(countries, texto, contienent, criterioOrden);

  //Renderizar paises
  renderizarPaises(resultado, destinationsContainer);

  actualizarContador(resultado.length, resultsCount);
}

//nueva funcion, que se llama registrar eventos
//REGISTRAR EVENTOS
function registrarEventos(){

  //Creo mi primer evento
  searchInput.addEventListener('input', aplicarFiltros);

  //Evento continente
  continentFilter.addEventListener('change', aplicarFiltros);

  //Evento orden
  sortFilter.addEventListener('change', aplicarFiltros);
}

/* =========================================
INICIALIZACIÓN DE LA APLICACIÓN
========================================= */
async function init() {
  console.log('Explorador de Viajes iniciado');
  //resultsCount.textContent = `1 destino`;

  //MOSTRAR RESULTADOS DE LA CARGA
  mostrarCargando(destinationsContainer);

 // mostrarCargando(destinationsContainer);
  //OBTENER DATOS DE LA API
  countries = await getCountries();
  console.log('paises obtenidos:', countries);



  //Validar paises
  if(countries.length === 0){
    mostrarError(destinationsContainer);
    actualizarContador(0, resultsCount);
    return;
  }
    //RENDERIZAR DESTINOS
    //renderizarPaises(countries, destinationsContainer);

    //ACTUALIZAR CONTADOR
    //actualizarContador(countries.length, resultsCount);

    //REGISTRAR EVENTOS


    aplicarFiltros();
    
    //Registrar eventos
    registrarEventos();
  
}

/* =========================================
INICIAR APLICACIÓN
========================================= */
init();
