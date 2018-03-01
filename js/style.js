$(function () {
    $('#movil').click(function () {
      cargarMovil();
      $('button').removeClass('btn-outline-danger').addClass('btn-outline-success');
      $(this).removeClass('btn-outline-success').addClass('btn-outline-danger');
      
      readBBJson(0);
    });
    $('#tv').click(function () {
      cargarTv()
      $('button').removeClass('btn-outline-danger').addClass('btn-outline-success');
      $(this).removeClass('btn-outline-success').addClass('btn-outline-danger');
      
      readBBJson(1);
    });
    $('#fitness').click(function () {
      CargarFitness();
      $('button').removeClass('btn-outline-danger').addClass('btn-outline-success');
      $(this).removeClass('btn-outline-success').addClass('btn-outline-danger');
      
      readBBJson(2);
    });
    $('.socials').find('svg').click(Login())
  })
  
  function cargarMovil() {
    var confiltradoQuery = $('.filtrado')[0];
    $(confiltradoQuery).empty();
  
    $(confiltradoQuery).append('<div id="ulPrecio">');
    var ulPrecio = $('#ulPrecio');
    $(ulPrecio).append('<h5 class="display-6 ct">PRECIO</h5>');
    $(ulPrecio).append('<label for="desde" class="col-2 col-form-label">Desde</label>')
    $(ulPrecio).append('<input type="number" class="col-sm" name="desde" min="1" max="2000" value="1">');
    $(ulPrecio).append('<label for="hasta" class="col-2 col-form-label">Hasta</label>')
    $(ulPrecio).append('<input type="number" class="col-sm" name="hasta" min="1" max="2000" value="2000">');
    $(ulPrecio).append('<label for="filter-price" class="col-2 col-form-label">Ordenar</label>')  
    // $(ulPrecio).append('<select class="form-control form-control-sm fg" id="filter-price"><option value="BestMatch">Mejores coincidencias</option><option value="PricePlusShippingHighest">Mayor</option><option value="PricePlusShippingLowest">Menor</option></select>');
    /* 
    
   <select class="form-control form-control-sm fg" id="filter-price">
                      <option value="BestMatch">Mejores coincidencias</option>
                      <option value="PricePlusShippingHighest">Mayor</option>
                      <option value="PricePlusShippingLowest">Menor</option>
                  </select>  
    */
  
    $(confiltradoQuery).append('<div id="ulMarca">');
    var ulMarca = $('#ulMarca');
    $(ulMarca).append('<h5 class="display-6 ct">MARCA</h5>');
    $(ulMarca).append('<p><input type="radio" id="movil" name="movilMarca" value="Apple"> Apple</p>');
    $(ulMarca).append('<p><input type="radio" id="movil" name="movilMarca" value="Samsung"> Samsung</p>');
    $(ulMarca).append('<p><input type="radio" id="movil" name="movilMarca" value="LG"> LG</p>');
    $(ulMarca).append('<p><input type="radio" id="movil" name="movilMarca" value="Sony"> Sony</p>');
    $(ulMarca).append('<p><input type="radio" id="movil" name="movilMarca" Motorola="Motorola"> Motorola</p>');
  
    $(confiltradoQuery).append('<div id="ulMemoria">');
    var ulMEmoria = $('#ulMemoria');
    $(ulMEmoria).append('<h5 class="display-6 ct">M. INTERNA</h5>');
    $(ulMEmoria).append('<p><input type="radio" name="movilMemoria" value="8GB"> 8GB</p>');
    $(ulMEmoria).append('<p><input type="radio" name="movilMemoria" value="16GB"> 16GB</p>');
    $(ulMEmoria).append('<p><input type="radio" name="movilMemoria" value="32GB"> 32GB</p>');
    $(ulMEmoria).append('<p><input type="radio" name="movilMemoria" value="64GB"> 64GB</p>');
    $(ulMEmoria).append('<p><input type="radio" name="movilMemoria" value="128GB"> 128GB</p>');
    $(ulMEmoria).append('<p><input type="radio" name="movilMemoria" value="256GB"> 256GB</p>');
  
    $(confiltradoQuery).append('<div id="ulRAM">');
    var ulRAM = $('#ulRAM');
    $(ulRAM).append('<h5 class="display-6 ct">RAM</h5>');
    $(ulRAM).append('<p><input type="radio" name="movilRam" value="2GB"> 2GB</p>');
    $(ulRAM).append('<p><input type="radio" name="movilRam" value="3GB"> 3GB</p>');
    $(ulRAM).append('<p><input type="radio" name="movilRam" value="4GB"> 4GB</p>');
    $(ulRAM).append('<p><input type="radio" name="movilRam" value="6GB"> 6GB</p>');
  
    $(confiltradoQuery).append('<div id="ulCon">');
    var ulCon = $('#ulCon');
    $(ulCon).append('<h5 class="display-6 ct">CONECTIVIDAD</h5>');
    $(ulCon).append('<p><input type="radio" name="movilConectividad" value="3G"> 3G</p>');
    $(ulCon).append('<p><input type="radio" name="movilConectividad" value="4G"> 4G</p>');
  
    $(confiltradoQuery).append('<div id="ulColor"> ');
    var ulColor = $('#ulColor');
    $(ulColor).append('<h5 class="display-6 ct">COLOR</h5>');
    $(ulColor).append('<p><input type="radio" name="movilColor" value="Blanco"> Blanco</p>');
    $(ulColor).append('<p><input type="radio" name="movilColor" value="Gris"> Gris</p>');
    $(ulColor).append('<p><input type="radio" name="movilColor" value="Negro"> Negro</p>');
  
    $(confiltradoQuery).append('<div id="ulSis"> ');
    var ulSis = $('#ulSis');
    $(ulSis).append('<h5 class="display-6 ct">SISTEMA OPERATIVO</h5>');
    $(ulSis).append('<p><input type="radio" name="movilOS" value="Android"> Android</p>');
    $(ulSis).append('<p><input type="radio" name="movilOS" value="IOS"> IOS</p>');
  
    $('.filtrado').append('<button type="button" class="btn btn-sm btn-block btn-outline-success" id="search" onclick="filtrar()">Filtrar</button>');
  
    $('#search').click(function () {
      $('input[type="radio"]').each(element => {
        if (element == true) {
          console.log(`el elemento ${element} está activado`);
        }
      })
    })
  }
  
  function cargarTv() {
    var confiltradoQuery = $('.filtrado')[0];
    $(confiltradoQuery).empty();
  
    $(confiltradoQuery).append('<div id="ulPrecio"> ');
    var ulPrecio = $('#ulPrecio');
    $(ulPrecio).append('<h5 class="display-6 ct">PRECIO</h5>');
    $(ulPrecio).append('<p>Desde <br><input type="number" name="Desde" min="1" max="3000" value="1"></p>');
    $(ulPrecio).append('<p>Hasta <br><input type="number" name="Hasta" min="2" max="3000" value="3000"></p>');
  
    $(confiltradoQuery).append('<div id="ulMarca">');
    var ulMarca = $('#ulMarca');
    $(ulMarca).append('<h5 class="display-6 ct">MARCA</h5>');
    $(ulMarca).append('<p><input type="radio" name="tvMarca" value="Sharp"> Sharp</p>');
    $(ulMarca).append('<p><input type="radio" name="tvMarca" value="Samsung"> Samsung</p>');
    $(ulMarca).append('<p><input type="radio" name="tvMarca" value="LG"> LG</p>');
    $(ulMarca).append('<p><input type="radio" name="tvMarca" value="Sony"> Sony</p>');
    $(ulMarca).append('<p><input type="radio" name="tvMarca" Toshiba="Toshiba"> Toshiba</p>');
  
    $(confiltradoQuery).append('<div id="ulTecP"> ');
    var ulTecP = $('#ulTecP');
    $(ulTecP).append('<h5 class="display-6 ct">TIPO DE PANTALLA</h5>');
    $(ulTecP).append('<p><input type="radio" name="tvPantalla" value="LED"> LED</p>');
    $(ulTecP).append('<p><input type="radio" name="tvPantalla" value="Curvo"> Curvo</p>');
    $(ulTecP).append('<p><input type="radio" name="tvPantalla" value="OLED"> OLED</p>');
  
    $(confiltradoQuery).append('<div id="ulColor"> ');
    var ulColor = $('#ulColor');
    $(ulColor).append('<h5 class="display-6 ct">COLOR</h5>');
    $(ulColor).append('<p><input type="radio" name="tvColor" value="Blanco"> Blanco</p>');
    $(ulColor).append('<p><input type="radio" name="tvColor" value="Gris"> Gris</p>');
    $(ulColor).append('<p><input type="radio" name="tvColor" value="Negro"> Negro</p>');
    $(ulColor).append('<p><input type="radio" name="tvColor" value="Rojo"> Rojo</p>');
  
    $(confiltradoQuery).append('<div id="ulPulgadas"> ');
    var ulPulgadas = $('#ulPulgadas');
    $(ulPulgadas).append('<h5 class="display-6 ct">PULGADAS</h5>');
    $(ulPulgadas).append('<p><input type="radio" name="tvPulgadas" value="20 - 39 "> 20 - 39 </p>');
    $(ulPulgadas).append('<p><input type="radio" name="tvPulgadas" value="30 - 39"> 30 - 39</p>');
    $(ulPulgadas).append('<p><input type="radio" name="tvPulgadas" value="40 - 49"> 40 - 49</p>');
    $(ulPulgadas).append('<p><input type="radio" name="tvPulgadas" value="50 - 60"> 50 - 60</p>');
  
    $(confiltradoQuery).append('<div id="ulResolu"> ');
    var ulResolu = $('#ulResolu');
    $(ulResolu).append('<h5 class="display-6 ct">RESOLUCIÓN</h5>');
    $(ulResolu).append('<p><input type="radio" name="tvResolucion " value="480p"> 480p </p>');
    $(ulResolu).append('<p><input type="radio" name="tvResolucion value="720p"> 720p (HD)</p>');
    $(ulResolu).append('<p><input type="radio" name="tvResolucion" value="1080p"> 1080p (HD)</p>');
    $(ulResolu).append('<p><input type="radio" name="tvResolucion" value="4k"> 2160p (4K Ultra HD)</p>');
  
    $('.filtrado').append('<button type="button" class="btn btn-sm btn-block btn-outline-success" id="search"  onclick="filtrar()">Filtrar</button>');
  }
  
  function CargarFitness() {
    var confiltradoQuery = $('.filtrado')[0];
    $(confiltradoQuery).empty();
  
    $(confiltradoQuery).append('<div id="ulPrecio"> ');
    var ulPrecio = $('#ulPrecio');
    $(ulPrecio).append('<h5 class="display-6 ct">PRECIO</h5>');
    $(ulPrecio).append('<label for="desde" class="col-2 col-form-label">Desde</label>')
    $(ulPrecio).append('<input type="number" class="col-sm" name="desde" min="1" max="2000" value="1">');
    $(ulPrecio).append('<label for="hasta" class="col-2 col-form-label">Hasta</label>')
    $(ulPrecio).append('<input type="number" class="col-sm" name="hasta" min="1" max="2000" value="2000">');
  
    $(confiltradoQuery).append('<div id="ulBestBuy"> ');
    var ulBestBuy = $('#ulBestBuy');
    $(ulBestBuy).append('<h5 class="display-6 ct">TIPO</h5>');
    $(ulBestBuy).append('<p><input type="radio" name="fitnessTipo" value="Shavers, Trimmers & Groomers"> Shavers, Trimmers & Groomers </p>');
    $(ulBestBuy).append('<p><input type="radio" name="fitnessTipo" value="Hair Care"> Hair Care</p>');
    $(ulBestBuy).append('<p><input type="radio" name="fitnessTipo" value="Oral Care"> Oral Care</p>');
    $(ulBestBuy).append('<p><input type="radio" name="fitnessTipo" value="Massagers & Spa"> Massagers & Spa</p>');
    $(ulBestBuy).append('<p><input type="radio" name="fitnessTipo" value="Skin Care"> Skin Care</p>');
  
    $('.filtrado').append('<button type="button" class="btn btn-sm btn-block btn-outline-success" id="search"  onclick="filtrar()">Filtrar</button>');
  }