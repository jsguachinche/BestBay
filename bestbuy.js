/**
 * esta es nuestra APIKEY publica
 */
var apikeyBB = 'A0iJvovzx1h8jN9IXhGSCwjm';

function Producto(orden, thumb, url, nombre, precio, moneda) {
    this.orden = orden;
    this.thumb = thumb;
    this.url = url;
    this.nombre = nombre;
    this.precio = precio;
    this.moneda = moneda;
}

var productos = []

// Define global variable for the URL filter
var urlfilter = "";

var categoriaMovil = 'pcmcat209400050001';
var categoriaTV = 'abcat0101000';
var categoriaSalud = 'pcmcat242800050021';

var url = '';
var dollarEuro = 1;

function precioDollarEuro(precio) {
    $.ajax({
        url: 'https://forex.1forge.com/1.0.3/convert?from=USD&to=EUR&quantity=' + (precio) + '&api_key=BunYSIcXTAp38eCsdvLVzkflhfM7VPxH',
        beforeSend: function () {
            $('#loader').show();
        },
        success: function (data) {
            dollarEuro = data.value;
            for (var i = 0; i < productos.length; i++) {
                var euros = Math.round(productos[i].precio * dollarEuro * 100) / 100
                productos[i].precio = euros;
            }
            productListReact(productos, '#contItemBB', '.tableBB tbody');
            paginarBB();
        },
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


    generaUrl(searchvalue, categoria, value);

    var request = $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json'
    });

    request.done(function (msg) {
        var cont = 1;
        msg
            .products
            .forEach(element => {
                producto = new Producto(cont, element.thumbnailImage, element.url, element.name, element.salePrice);
                productos.push(producto);
                cont++;
            })
        conviertePrecios();

    });
}

function conviertePrecios() {
    precioDollarEuro(1);
}

function paginarBB() {
    $('.ContItemBB').append('<div id="pagination-2"></div>');
    paginate({
        itemSelector: '.bb',
        paginationSelector: '#pagination-2',
        itemsPerPage: 10
    });
}

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
    if (value.substring(value.length - 3, value.length) == '%20') {
        value = value.slice(0, -3);
    }
    url = 'https://api.bestbuy.com/v1/products((search=' + value.split('%20').join('&search=') + ')';
    url = url.replace('search=&', '');
    url += '&(categoryPath.id=' + cat + '))';
    url += '?apiKey=' + apikeyBB;
    url += '&sort=' + sort;
    url += '&show=thumbnailImage,url,color,name,salePrice';
    url += '&facet=color';
    url += '&pageSize=100';
    url += '&format=json';
}