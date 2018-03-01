/**
 * esta es nuestra APIKEY publica
 */
var apikeyBB = 'A0iJvovzx1h8jN9IXhGSCwjm';

function Producto(orden, thumb, url, nombre, precio) {
    this.orden = orden
    this.thumb = thumb
    this.url = url
    this.nombre = nombre
    this.precio = precio
}

var productos = []

// Define global variable for the URL filter
var urlfilter = "";

var categoriaMovil = 'pcmcat209400050001';
var categoriaTV = 'abcat0101000';
var categoriaSalud = 'pcmcat242800050021';
// var categoria = categoriaMovil;
var url = '';

/*
$( document ).ready(function() {
    readBBJson(url);

})
*/

// {image:
// "https://img.bbystatic.com/BestBuy_US/images/products/5758/5758300_sa.jpg",
// color: "Sterling Silver", name: "Samsung - 75" Class (74.5" Diag.) - LED -
// Curved -… - Smart - 4K Ultra HD TV with High Dynamic Range", salePrice:
// 3999.99}

function precioDollarEuro(precio, pos) {
    precio = Math.round(precio * 100);
    $.ajax({
        url: 'https://forex.1forge.com/1.0.3/convert?from=USD&to=EUR&quantity=' + (precio) + '&api_key=BunYSIcXTAp38eCsdvLVzkflhfM7VPxH',
        beforeSend: function () {
            $('#loader').show();
        },
        success: function (data) {
            //console.warn(data);
            euros = data.value / 100;
            euros = Math.round(euros * 100) / 100
            productos[pos].precio = euros;
            if (pos < productos.length - 1) 
                precioDollarEuro(productos[pos + 1].precio, pos + 1)
            if (pos == productos.length - 1) 
                productListReact(productos, '#contItem');
            }
        ,
        async: true,
        error: function (request, errorType, errorMessage) {
            alert('Error: ' + errorType + ' log: ' + errorMessage);
        }
    });
}

function readBBJson(cat, value) {
    var searchvalue = "";
    if (cat == 0) {
        searchvalue = "Samsung";
        categoria = categoriaMovil
        ultimoTipoBusqueda = "Smartphone"
    }

    if (cat == 1) {
        searchvalue = "Samsung";
        categoria = categoriaTV
        ultimoTipoBusqueda = "TV"
        
    }

    if (cat == 2) {
        searchvalue = "Samsung";
        categoria = categoriaSalud;
        ultimoTipoBusqueda = "Fitness"
        
    }
    // categoria = categoriaSalud
    generaUrl(searchvalue, categoria, value);

    var request = $.ajax({type: 'GET', url: url, dataType: 'json'});

    request.done(function (msg) {
        var cont = 1;
        msg
            .products
            .forEach(element => {
                producto = new Producto(cont, element.thumbnailImage, element.url, element.name, element.salePrice);
                productos.push(producto);
                cont++;
            })
        conviertePrecios()
    });
}

function conviertePrecios() {

    //  precioDollarEuro(productos[0].precio, 0)
    productListReact(productos, '#contItem');
}

$('#filter-price')
    .on('change', function () {})

function generaUrl(searchvalue, cat, filteredValue) {
    value = $('#searchvalue').val();

    if (value == "") {
        value = searchvalue
    }

    if (filteredValue != null) {
        value = filteredValue
    }
    filterPrice = $('#filter-price').val();

    var sort = "";

    if (filterPrice == "PricePlusShippingHighest") {
        sort = "salePrice.desc"
    } else if (filterPrice == "PricePlusShippingLowest") {
        sort = "salePrice.asc"
    } else {
        sort = "salePrice.asc"

    }

    url = '';
    $('.tableBB tbody').empty();
    productos = []

    // Construct the request Replace MyAppID with your Production AppID
    if(value.substring(value.length-3,value.length)=='%20'){
        value = value.slice(0,-3);
    }
    url = 'https://api.bestbuy.com/v1/products((search='+value.split('%20').join('&search=')+')';
    url = url.replace('search=&','');
    url += '&(categoryPath.id=' + cat + '))';
    url += '?apiKey=' + apikeyBB;
    url += '&sort=' + sort;
    url += '&show=thumbnailImage,url,color,name,salePrice';
    url += '&facet=color';
    url += '&pageSize=100';
    url += '&format=json';
}

// url += urlfilter;
// https://api.bestbuy.com/v1/products((search=galaxy)&manufacturer=samsung&saleP
// rice>=100&salePrice<=500&color=black&(categoryPath.id=pcmcat209400050001))?api
// Key=A0iJvovzx1h8jN9IXhGSCwjm&sort=name.asc&show=name,salePrice,thumbnailImage,
// image,url&format=json var url =
// 'https://api.bestbuy.com/v1/products((search=Samsung&search=4G)';

/*
// Submit the request
s=document.createElement('script'); // create script element
s.src= url;
document.body.appendChild(s);

// Display the request as a clickable link for testing
document.write("<a href=\"" + url + "\">" + url + "</a>");
*/

/*
// Create a JavaScript array of the item filters you want to use in your request
var filterarray = [
    {"name":"MaxPrice",
     "value":"25",
     "paramName":"Currency",
     "paramValue":"USD"},
    {"name":"FreeShippingOnly",
     "value":"true",
     "paramName":"",
     "paramValue":""},
    {"name":"ListingType",
     "value":["AuctionWithBIN", "FixedPrice", "StoreInventory"],
     "paramName":"",
     "paramValue":""},
    ];


// Generates an indexed URL snippet from the array of item filters
function  buildURLArray() {
    // Iterate through each filter in the array
    for(var i=0; i<filterarray.length; i++) {
      //Index each item filter in filterarray
      var itemfilter = filterarray[i];
      // Iterate through each parameter in each item filter
      for(var index in itemfilter) {
        // Check to see if the paramter has a value (some don't)
        if (itemfilter[index] !== "") {
          if (itemfilter[index] instanceof Array) {
            for(var r=0; r<itemfilter[index].length; r++) {
            var value = itemfilter[index][r];
            urlfilter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value ;
            }
          }
          else {
            urlfilter += "&itemFilter\(" + i + "\)." + index + "=" + itemfilter[index];
          }
        }
      }
    }
}  // End buildURLArray() function

// Execute the function to build the URL filter
buildURLArray(filterarray);
*/
