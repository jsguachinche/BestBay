


function productListReact(productos, element) {
  var list = $('.tableBB tbody');

  // clean up any mounted React components
  $(element).find('.tbSelector').each(function () {
    ReactDOM.unmountComponentAtNode(this);
  });

  productos.forEach(function (producto) {
    var productoContainer = $('<span class="divProducto"></span>');

    // add product data to use in our React component
    productoContainer.data('producto', producto);

    list.append(productoContainer);
  });

    // replace the existing list if there is one
    var currentList = $(element).find('.tableBB tbody');
    if (currentList.length) {
      currentList.replaceWith(list);
    } else {
      $(element).append(list);
    }

  // attach our React components to the containers
  list.find('.divProducto').each(function () {
    var container = $(this);
    var producto = container.data('producto');

    /* React needs a plain, non-jQueryfied DOM 
     * element, so we can use plain "this"
     */
    productoReact(producto, this);
  });
}



