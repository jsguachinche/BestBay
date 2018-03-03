


var ProductoBBComponent = React.createClass({
  componentDidMount: function () {
    console.log('component did mount - stuff to clean up later');
  },
  render: function (props) {
    return (
      <tr className="tbSelector bb">
        <th score="row">{this.props.producto.orden}</th>
        <td>
          <img src={this.props.producto.thumb} className="img-thumbnail" />
        </td>
        <td>
          <a href={this.props.producto.url} title={this.props.producto.nombre} target="_blank">{this.props.producto.nombre}</a>
        </td>
        <td>Precio: {this.props.producto.precio}€</td>
      </tr>
    );
  },
  componentWillUnmount: function () {
    console.log('about to unmount - clean up stuff here');
  }
});

function productoBBReact(producto, element) {
  ReactDOM.render(
    <ProductoBBComponent producto={producto} />,
    element
  );
}


var ProductoEBComponent = React.createClass({
  componentDidMount: function () {
    console.log('component did mount - stuff to clean up later');
  },
  render: function (props) {
    return (
      <tr className="tbSelector eb">
        <th score="row">{this.props.producto.orden}</th>
        <td>
          <img src={this.props.producto.thumb} className="img-thumbnail" />
        </td>
        <td>
          <a href={this.props.producto.url} title={this.props.producto.nombre} target="_blank">{this.props.producto.nombre}</a>
        </td>
        <td>Precio: {this.props.producto.precio} {this.props.producto.tipoMoneda}</td>
      </tr>
    );
  },
  componentWillUnmount: function () {
    console.log('about to unmount - clean up stuff here');
  }
});

function productoEBReact(producto, element) {
  ReactDOM.render(
    <ProductoEBComponent producto={producto} />,
    element
  );
}

