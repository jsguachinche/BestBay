var config = {
  apiKey: "AIzaSyA7jek9LWz3xNyGDpYtNjHOcw3nn9I8oz0",
  authDomain: "bestbay-1519376497801.firebaseapp.com",
  databaseURL: "https://bestbay-1519376497801.firebaseio.com",
  projectId: "bestbay-1519376497801",
  storageBucket: "bestbay-1519376497801.appspot.com",
  messagingSenderId: "730955629296"
};

firebase.initializeApp(config);


var nombre = localStorage.getItem("user");

if (nombre == null) {
  var h = document.getElementsByClassName('display-5')[0]
  h.innerHTML = '<b style="font-size:1.5em;text-align: center;">Conectarse desde: </b><div class="social btn" onclick="loginFacebook()"><i class="fab fa-facebook-square"></i></div><div class="social btn" onclick="loginGithub()"><i class="fab fa-github"></i></div><div class="social btn" onclick="loginTwitter()"><i class="fab fa-twitter-square"></i></div><div class="social btn" onclick="LogGoogle()"><i class="fab fa-google"></i></i></div>';
} else {
  var h = document.getElementsByClassName('display-5')[0]
  h.innerHTML = '<b style="font-size:1.5em;text-align: center;">Bienvenido: </b>' + nombre + '<a href="#" onclick="logout()">  Cerrar sesión</a>';
}


var apikey = 'jsguachi-JSGuachi-PRD-843252cae-6ff77db1'; // ebay
var apikeyBB = 'A0iJvovzx1h8jN9IXhGSCwjm'; //bestbuy
var apikeyForex = 'BunYSIcXTAp38eCsdvLVzkflhfM7VPxH'; // forex
var value;
var ultimoTipoBusqueda;
var buscandoEB = false;
var buscandoBB = false;
var productosEB = [];

/**
 * Tipo Producto, representa un producto de Ebay o BestBay, con las características que queremos dar al usuario.
 * @param {*} orden 
 * @param {*} thumb 
 * @param {*} url 
 * @param {*} nombre 
 * @param {*} precio 
 * @param {*} moneda 
 */
function Producto(orden, thumb, url, nombre, precio, moneda) {
  this.orden = orden;
  this.thumb = thumb;
  this.url = url;
  this.nombre = nombre;
  this.precio = precio;
  this.moneda = moneda;
  if (moneda == 'EUR')
    this.moneda = '€';
}

/**
 * Cuando el documento está preparado, se crea la URL de la llamada Ebay y se asignan los listener de los botones.
 */
$(document).ready(function () {
  // Execute the function to build the URL filter
  buildURLArray(filterarray);
  $('.productos').find('button').click(function () {
    filtrar(this);
  });
});

/**
 * Se hace una lista de objetos producto, se crean con react y se paginan. Este método es un callback de la llamada a la API, y recibe los resultados de la llamada.
 * @param {*} root 
 */
function _cb_findItemsByKeywords(root) {
  var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
  productosEB = [];

  $('.tableEB tbody').empty();
  for (var i = 0; i < items.length; ++i) {
    var item = items[i];
    var productoEB = new Producto(i + 1, item.galleryURL, item.viewItemURL, item.title, item.sellingStatus[0].currentPrice[0].__value__, item.sellingStatus[0].currentPrice[0]["@currencyId"]);
    productosEB.push(productoEB);
  }

  productListReact(productosEB, '#contItem', '.tableEB tbody');
  $('.ContItem').append('<div id="pagination-1"></div>');

  paginate({
    itemSelector: '.eb',
    paginationSelector: '#pagination-1',
    itemsPerPage: 10
  });
}

var filterarray = [{
  "name": `MaxPrice`,
  "value": `3000`,
  "paramName": `Currency`,
  "paramValue": `USD`
}, {
  "name": `MinPrice`,
  "value": `0.1`,
  "paramName": `Currency`,
  "paramValue": `USD`
}, {
  "name": `FreeShippingOnly`,
  "value": `true`,
  "paramName": "",
  "paramValue": ""
}, {
  "name": `ListingType`,
  "value": [
    `AuctionWithBIN`, `FixedPrice`, `StoreInventory`
  ],
  "paramName": "",
  "paramValue": ""
}];

var urlfilter = "";

/** 
 * Función que construye los filstros de la URL.
 */
function buildURLArray() {
  // Iterate through each filter in the array
  for (var i = 0; i < filterarray.length; i++) {
    var itemfilter = filterarray[i];
    for (var index in itemfilter) {
      // Para los filtros que tengan valor
      if (itemfilter[index] !== "") {
        if (itemfilter[index] instanceof Array) {
          for (var r = 0; r < itemfilter[index].length; r++) {
            var value = itemfilter[index][r];
            urlfilter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value;
          }
        } else {
          urlfilter += "&itemFilter\(" + i + "\)." + index + "=" + itemfilter[index];
        }
      }
    }
  }
}

/** 
 * Hace que solo sea posible seleccionar un checkbox de cada grupo.
 */
function unCheckbox() {
  $("input:checkbox").on('click', function () {
    var $box = $(this);
    if ($box.is(":checked")) {
      var group = "input:checkbox[name='" + $box.attr("name") + "']";
      $(group).prop("checked", false);
      $box.prop("checked", true);
    } else {
      $box.prop("checked", false);
    }
  });
}

/**
 * Se paginan los resultados de la búsqueda.
 * @param {1} options 
 */
function paginate(options) {
  var items = $(options.itemSelector);
  var numItems = items.length;
  var perPage = options.itemsPerPage;
  items
    .slice(perPage)
    .hide();
  $(options.paginationSelector).pagination({
    items: numItems,
    itemsOnPage: perPage,
    cssStyle: "compact-theme",
    onPageClick: function (pageNumber) {
      var showFrom = perPage * (pageNumber - 1);
      var showTo = showFrom + perPage;
      items
        .hide()
        .slice(showFrom, showTo)
        .show();
      return false;
    }
  });
}

/**
 * Se llama a los métodos de busqueda de las dos APIs.
 * @param {*} tipo 
 */
function filtrar(tipo) {

  valueType = $(tipo).val();
  if (tipo != undefined)
    ultimoTipoBusqueda = valueType;

  value = filtrarBusqueda();
  bestBuyFiltrado();
  value = ultimoTipoBusqueda + value;
  ebayFiltrado(tipo);

  unCheckbox()
}

/** 
 * Se crean los filtros para la URL según las opciones elegidas.
 */
function filtrarBusqueda() {

  var filtroFinal = "";

  var search = $('#searchvalue').val();
  var arraySearch = []
  arraySearch = search.split(' ');
  for (let i = arraySearch.length - 1; i >= 0; i--) {
    if (arraySearch[i] != '')
      filtroFinal += ('%20' + arraySearch[i]);
  }

  if (ultimoTipoBusqueda == "smartphone") {
    // var marca = [],   memoria = [],   ram = [],   conectividad = [],   color =
    // [],   os = []; Marca
    var arrayMarcaQuery = document.querySelectorAll("input[name='movilMarca']:checked");
    arrayMarcaQuery.forEach(e => {
      // marca.push(e.value);
      filtroFinal += '%20' + e.value;
    });

    // Memoria
    var arrayMemoriaQuery = document.querySelectorAll("input[name='movilMemoria']:checked");
    arrayMemoriaQuery.forEach(e => {
      // memoria.push(e.value);
      filtroFinal += '%20' + e.value;
    });

    // Ram
    var arrayRamQuery = document.querySelectorAll("input[name='movilRam']:checked");
    arrayRamQuery.forEach(e => {
      // ram.push(e.value);
      filtroFinal += '%20' + e.value;
    });

    // Conectividad
    var arrayConectividadQuery = document.querySelectorAll("input[name='movilConectividad']:checked");
    arrayConectividadQuery.forEach(e => {
      // conectividad.push(e.value);
      filtroFinal += '%20' + e.value;
    });

    // Color
    var arrayColorQuery = document.querySelectorAll("input[name='movilColor']:checked");
    arrayColorQuery.forEach(e => {
      // color.push(e.value);
      filtroFinal += '%20' + e.value;
    });

    // OS
    var arrayOSQuery = document.querySelectorAll("input[name='movilOS']:checked");
    arrayOSQuery.forEach(e => {
      // os.push(e.value);
      filtroFinal += '%20' + e.value;
    });
  }

  if (ultimoTipoBusqueda == "tv") {
    var marca = [],
      pantalla = [],
      color = [],
      pulgadas = [],
      resolucion = [];

    // Marca
    var arrayMarcaQuery = document.querySelectorAll("input[name='tvMarca']:checked");
    arrayMarcaQuery.forEach(e => {
      // marca.push(e.value);
      filtroFinal += '%20' + e.value;
    });

    // pantalla
    var arrayPantallaQuery = document.querySelectorAll("input[name='tvPantalla']:checked");
    arrayPantallaQuery.forEach(e => {
      // pantalla.push(e.value);
      filtroFinal += '%20' + e.value;
    });

    // color
    var arrayColorQuery = document.querySelectorAll("input[name='tvColor']:checked");
    arrayColorQuery.forEach(e => {
      // color.push(e.value);
      filtroFinal += '%20' + e.value;
    });

    // pulgadas
    var arrayPulgadasQuery = document.querySelectorAll("input[name='tvPulgadas']:checked");
    arrayPulgadasQuery.forEach(e => {
      // pulgadas.push(e.value);
      filtroFinal += '%20' + e.value;
    });

    // resolucion
    var arrayResolucionQuery = document.querySelectorAll("input[name='tvResolucion']:checked");
    arrayResolucionQuery.forEach(e => {
      // resolucion.push(e.value);
      filtroFinal += '%20' + e.value;
    });
  } else {
    // var tipo = [] Marca
    var arrayTipoQuery = document.querySelectorAll("input[name='fitnessTipo']:checked");
    arrayTipoQuery.forEach(e => {
      // tipo.push(e.value);
      filtroFinal += '%20' + e.value;
    });
  }
  return filtroFinal;
}

/** 
 * Se llama a la búsqueda de la API BestBuy, dependiendo de la categoría.
 */
function bestBuyFiltrado() {

  if (ultimoTipoBusqueda == "smartphone") {
    readBBJson(0, value);
  }

  if (ultimoTipoBusqueda == "tv") {
    readBBJson(1, value);
  }
  if (ultimoTipoBusqueda == "fitness") {
    readBBJson(2, value);
  }
}

/**
 * Se crea la URL y se aplical los filtros para EBay.
 * @param {*} tipo 
 */
function ebayFiltrado(tipo) {
  $('#title').hide();

  var minPrice = '';
  var maxPrice = '';

  if ($('#desde').val() != undefined){
    minPrice = `&itemFilter.name=MinPrice
    &itemFilter(0).value=${$('#desde').val()}
    &itemFilter(0).paramName=Currency
    &itemFilter(0).paramValue=EUR`;
  }
  
  if ($('#hasta').val() != undefined){
    maxPrice = `&itemFilter.name=MaxPrice
    &itemFilter(1).value=${$('#hasta').val()}
    &itemFilter(1).paramName=Currency
    &itemFilter(1).paramValue=EUR`;
  }
 

  $('#results').empty();
  var filterPrice = $('#filter-price').val();
  var url = `https://svcs.ebay.com/services/search/FindingService/v1`;
  url += `?OPERATION-NAME=findItemsByKeywords`;
  url += `&SERVICE-VERSION=1.0.0`;
  url += `&SECURITY-APPNAME=${apikey}`;
  url += `&GLOBAL-ID=EBAY-ES`;
  url += `&RESPONSE-DATA-FORMAT=JSON`;
  url += `&callback=_cb_findItemsByKeywords`;
  url += `&REST-PAYLOAD`;
  url += `&keywords=${value}`;
  url += minPrice;
  url += maxPrice;
  url += `&paginationInput.entriesPerPage=200`;
  url += `&sortOrder=${filterPrice}`

  $.ajax({
    url: url,
    jsonp: "callback",
    dataType: "jsonp",
    beforeSend: function () {
      buscandoEB = true;
      $('.loader').addClass('is-active');
    },
    complete: function (element) {
      buscandoEB = false;
      if ((buscandoEB == false) && (buscandoBB == false))
        $('.loader').removeClass('is-active');
    },
    fail: function (error, codigo, desc) {
      toastr.error('', 'Error conectando con Ebay')
      buscandoEB = false;
    }
  });
}