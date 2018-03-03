
var apikey = 'jsguachi-JSGuachi-PRD-843252cae-6ff77db1'; // ebay
var apikeyForex = 'BunYSIcXTAp38eCsdvLVzkflhfM7VPxH'; // forex
var value;
var ultimoTipoBusqueda;

var productosEB = [];

function _cb_findItemsByKeywords(root) {
  var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];

  productosEB = [];
  
  $('.tableEB tbody').empty();
  for (var i = 0; i < items.length; ++i) {
    var item = items[i];

    var productoEB = new Producto(i+1, item.galleryURL, item.viewItemURL, item.title, item.sellingStatus[0].currentPrice[0].__value__, item.sellingStatus[0].currentPrice[0]["@currencyId"]);
    productosEB.push(productoEB);
  }


  productListReact(productosEB, '#contItem', '.tableEB tbody');

  $('.ContItem').append('<div id="pagination-1"></div>');

  /*paginado*/
  paginate({
    itemSelector: '.eb',
    paginationSelector: '#pagination-1',
    itemsPerPage: 10
  });
}

var filterarray = [
  {
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
  }
];

var urlfilter = "";

function buildURLArray() {
  // Iterate through each filter in the array
  for (var i = 0; i < filterarray.length; i++) {
    //Index each item filter in filterarray
    var itemfilter = filterarray[i];
    // Iterate through each parameter in each item filter
    for (var index in itemfilter) {
      // Check to see if the paramter has a value (some don't)
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
} // End buildURLArray() function

// Execute the function to build the URL filter
buildURLArray(filterarray);

$('.productos')
  .find('button')
  .click(function () {
    $('#title').hide();

    valueType = $(this).val();

    ultimoTipoBusqueda = valueType;

    var filterPrice = $('#filter-price').val();
    value = $('#searchvalue').val() + " " + valueType;

    if (value == "") {
      value = $(this).val();
    }
    // Construct the request Replace MyAppID with your Production AppID
    $('#results').empty();
    var filterPrice = $('#filter-price').val();
    var url = `http://svcs.ebay.com/services/search/FindingService/v1`;
    url += `?OPERATION-NAME=findItemsByKeywords`;
    url += `&SERVICE-VERSION=1.0.0`;
    url += `&SECURITY-APPNAME=${apikey}`;
    url += `&GLOBAL-ID=EBAY-ES`;
    url += `&RESPONSE-DATA-FORMAT=JSON`;
    url += `&callback=_cb_findItemsByKeywords`;
    url += `&REST-PAYLOAD`;
    url += `&keywords=${value}`;
    url += `&paginationInput.entriesPerPage=200`;
    url += `&sortOrder=${filterPrice}`

    $.ajax({
      url: url,
      jsonp: "callback",
      dataType: "jsonp",
      beforeSend: function () {
        $('.loader').addClass('is-active');
      },
      complete: function (element) {
        $('.loader').removeClass('is-active');
        // console.warn(element);
      },
      error: function (error, codigo, desc) {
        // alert(`Error: ${error} Codigo: ${codigo} Descripcion: ${desc}`);
      }
    });

  });

function peticionAJAX(e) {
  let v = e;
  let url = `https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=${apikey}&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=${v}&paginationInput.entriesPerPage=20&GLOBAL-ID=EBAY-ES&siteid=0`
  $.ajax({
    url: url,
    jsonp: "callback",
    dataType: "jsonp",
    beforeSend: function () {
      $('.loader').addClass('is-active');
    },
    complete: function (element) {
      $('.loader').removeClass('is-active');
      console.warn(element);
    },
    error: function (error, codigo, desc) {
      // alert(`Error: ${error} Codigo: ${codigo} Descripcion: ${desc}`);
    }
  });
}

function Login() { }

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

function filtrar() {
  ebayFiltrado();
  bestBuyFiltado();
}

function filtrarBusqueda() {

  var filtroFinal = "";

  if (ultimoTipoBusqueda == "Smartphone") {
    // var marca = [],   memoria = [],   ram = [],   conectividad = [],   color =
    // [],   os = []; Marca
    var arrayMarcaQuery = document.querySelectorAll("input[name='movilMarca']:checked");

    arrayMarcaQuery.forEach(e => {
      // marca.push(e.value);
      filtroFinal += e.value + " ";
    
    });
     
    // Memoria
    var arrayMemoriaQuery = document.querySelectorAll("input[name='movilMemoria']:checked");

    arrayMemoriaQuery.forEach(e => {
      // memoria.push(e.value);
      filtroFinal += e.value + " ";

    });
    if(filtroFinal.substring(-1)==''){
        filtroFinal = filtroFinal.substring(-1) + ' '
      }
    // Ram
    var arrayRamQuery = document.querySelectorAll("input[name='movilRam']:checked");

    arrayRamQuery.forEach(e => {
      // ram.push(e.value);
      filtroFinal += e.value + " ";

    });
    
    // Conectividad
    var arrayConectividadQuery = document.querySelectorAll("input[name='movilConectividad']:checked");

    arrayConectividadQuery.forEach(e => {
      // conectividad.push(e.value);
      filtroFinal += e.value + " ";

    });
    
    // Color
    var arrayColorQuery = document.querySelectorAll("input[name='movilColor']:checked");

    arrayColorQuery.forEach(e => {
      // color.push(e.value);
      filtroFinal += e.value + " ";

    });
   
    // OS
    var arrayOSQuery = document.querySelectorAll("input[name='movilOS']:checked");

    arrayOSQuery.forEach(e => {
      // os.push(e.value);
      filtroFinal += e.value + " ";

    });
    

  }
  if (ultimoTipoBusqueda == "TV") {
    var marca = [],
      pantalla = [],
      color = [],
      pulgadas = [],
      resolucion = [];

    // Marca
    var arrayMarcaQuery = document.querySelectorAll("input[name='tvMarca']:checked");

    arrayMarcaQuery.forEach(e => {
      // marca.push(e.value);
      filtroFinal += e.value + " ";

    });

    // pantalla
    var arrayPantallaQuery = document.querySelectorAll("input[name='tvPantalla']:checked");

    arrayPantallaQuery.forEach(e => {
      // pantalla.push(e.value);
      filtroFinal += e.value + " ";

    });
    // color
    var arrayColorQuery = document.querySelectorAll("input[name='tvColor']:checked");

    arrayColorQuery.forEach(e => {
      // color.push(e.value);
      filtroFinal += e.value + " ";

    });
    // pulgadas
    var arrayPulgadasQuery = document.querySelectorAll("input[name='tvPulgadas']:checked");

    arrayPulgadasQuery.forEach(e => {
      // pulgadas.push(e.value);
      filtroFinal += e.value + " ";

    });
    // resolucion
    var arrayResolucionQuery = document.querySelectorAll("input[name='tvResolucion']:checked");

    arrayResolucionQuery.forEach(e => {
      // resolucion.push(e.value);
      filtroFinal += e.value + " ";

    });

  } else {

    // var tipo = [] Marca
    var arrayTipoQuery = document.querySelectorAll("input[name='fitnessTipo']:checked");

    arrayTipoQuery.forEach(e => {
      // tipo.push(e.value);
      filtroFinal += e.value + " ";

    });
  }

  return filtroFinal;

}

function bestBuyFiltado() {
  value = encodeURI($('#searchvalue').val() + " " + filtrarBusqueda());

  if (ultimoTipoBusqueda == "Smartphone") {
    readBBJson(0, value);
  }

  if (ultimoTipoBusqueda == "TV") {
    readBBJson(1, value);
  }
  if (ultimoTipoBusqueda == "Health") {
    readBBJson(2, value);
  }
}

function ebayFiltrado() {
  // $('#title').hide();

  value = encodeURI($('#searchvalue').val() + " " + filtrarBusqueda());

  var filterPrice = $('#filter-price').val();
  // value = $('#searchvalue').val() + " " + valueType;

  if (value == "") {
    value = $(this).val();
  }
  // Construct the request Replace MyAppID with your Production AppID
  $('#results').empty();
  var filterPrice = $('#filter-price').val();
  var url = `http://svcs.ebay.com/services/search/FindingService/v1`;
  url += `?OPERATION-NAME=findItemsByKeywords`;
  url += `&SERVICE-VERSION=1.0.0`;
  url += `&SECURITY-APPNAME=${apikey}`;
  url += `&GLOBAL-ID=EBAY-ES`;
  url += `&RESPONSE-DATA-FORMAT=JSON`;
  url += `&callback=_cb_findItemsByKeywords`;
  url += `&REST-PAYLOAD`;
  url += `&keywords=${value}`;
  url += `&paginationInput.entriesPerPage=100`;
  url += `&sortOrder=${filterPrice}`;

  $.ajax({
    url: url,
    jsonp: "callback",
    dataType: "jsonp",
    beforeSend: function () {
      $('.loader').addClass('is-active');
    },
    complete: function (element) {
      $('.loader').removeClass('is-active');
      // console.warn(element);
    },
    error: function (error, codigo, desc) {
      // alert(`Error: ${error} Codigo: ${codigo} Descripcion: ${desc}`);
    }
  });

}