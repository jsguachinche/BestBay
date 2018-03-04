
var productosBB = []
var urlfilter = "";
var categoriaMovil = 'pcmcat209400050001';
var categoriaTV = 'abcat0101000';
var categoriaSalud = 'pcmcat242800050021';
var url = '';

/**
 * Función que llama a la API Forex para conseguir la conversión de euros a dolares. Llama a crear los productos en react y a la paginación.
 * @param {*} precio 
 */
function precioDollarEuro(precio) {
    $.ajax({
        url: 'https://forex.1forge.com/1.0.3/convert?from=USD&to=EUR&quantity=' + (precio) + '&api_key=BunYSIcXTAp38eCsdvLVzkflhfM7VPxH',
        beforeSend: function () {
            $('#loader').show();
        },
        success: function (data) {
            dollarEuro = data.value;
            for (var i = 0; i < productosBB.length; i++) {
                var euros = Math.round(productosBB[i].precio * dollarEuro * 100) / 100
                productosBB[i].precio = euros;
            }
            productListReact(productosBB, '#contItemBB', '.tableBB tbody');
            paginarBB();
        },
        async: true,
        error: function (request, errorType, errorMessage) {
            alert('Error: ' + errorType + ' log: ' + errorMessage);
            productListReact(productosBB, '#contItemBB', '.tableBB tbody');
            paginarBB();
        }
    });
}

/**
 * Función que llama a generar la URL de la petición y hace la petición a la API de BestBuy.
 * @param {*} cat 
 * @param {*} value 
 */
function readBBJson(cat, value) {
    if (cat == 0) {
        categoria = categoriaMovil
        ultimoTipoBusqueda = "smartphone"
    }
    if (cat == 1) {
        categoria = categoriaTV
        ultimoTipoBusqueda = "tv"
    }
    if (cat == 2) {
        categoria = categoriaSalud;
        ultimoTipoBusqueda = "fitness"
    }
    generaUrl(categoria, value);

    $.ajax({
        url: url,
        dataType: "json",
        beforeSend: function () {
            buscandoBB = true;
            $('.loader').addClass('is-active');
        },
        success: function (msg) {
            var cont = 1;
            msg.products.forEach(element => {
                producto = new Producto(cont, element.thumbnailImage, element.url, element.name, element.salePrice);
                productosBB.push(producto);
                cont++;
            })
            conviertePrecios();
            buscandoBB = false;
            if ((buscandoEB == false) && (buscandoBB == false))
            $('.loader').removeClass('is-active');
        },
        error: function (error, codigo, desc) {
            toastr.error('', 'Error conectando con BestBuy')
            buscandoBB = false;
        }
    });
}

/** 
 * Llama a la API que convierte los precios con el valor de un dolar.
*/
function conviertePrecios() {
    precioDollarEuro(1);
}

/** 
 * Se establecen las opciones del paginador.
*/
function paginarBB() {
    $('.ContItemBB').append('<div id="pagination-2"></div>');
    paginate({
        itemSelector: '.bb',
        paginationSelector: '#pagination-2',
        itemsPerPage: 10
    });
}

/**
 * Se paginan los productos según las opciones establecidas.
 * @param {*} options 
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
 * Se genera la URL para la petición según la categoria y los filtros aplicados.
 * @param {*} cat 
 * @param {*} filteredValue 
 */
function generaUrl(cat, filteredValue) {
    value = $('#searchvalue').val();

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
    productosBB = []

    var minPrice = '';
    var maxPrice = '';
  
    if ($('#desde').val() != undefined){
      minPrice = `&salePrice>=${$('#desde').val()}`;
    }
    
    if ($('#hasta').val() != undefined){
      maxPrice = `&salePrice<=${$('#hasta').val()}`;
    }

    arrayFiltros = filteredValue.split('%20');
    for (let i = arrayFiltros.length - 1; i >= 0; i--) {
        if (arrayFiltros[i] == '')
            arrayFiltros.splice(i, 1)
    }
    if (arrayFiltros.length == 0)
        url = 'https://api.bestbuy.com/v1/products(';
    else {
        url = 'https://api.bestbuy.com/v1/products((';
        for (let i = 0; i < arrayFiltros.length; i++) {
            url += '&search=' + arrayFiltros[i];
        }
        url += ')&'
        url = url.replace('&search', 'search');
    }
    url += '(categoryPath.id=' + cat + ')';
    url += minPrice;
    url += maxPrice;
    url += ')';
    url += '?apiKey=' + apikeyBB;
    url += '&sort=' + sort;
    url += '&show=thumbnailImage,url,name,salePrice';
    url += '&pageSize=100';
    url += '&format=json';
}
