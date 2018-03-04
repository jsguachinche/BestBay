var swC = true;
var swT = true;
var swF = true;

$(function () {
  $('#searchvalue').hide();
  $('#movil').click(function () {
    $('#searchvalue').show('slow');
      if (!swC) {
          $('.myCollapse').hide();
          swC = true;
          return;
      }
      if (swC) {
          $('.myCollapse').empty();
          $('.myCollapse').show('slow');
          collapseSM();
          swC = false;
      }
  });
  $('#tv').click(function () {
    $('#searchvalue').show('slow');
      if (!swT) {
          $('.myCollapse').hide();
          swT = true;
          return;
      }
      if (swT) {
          $('.myCollapse').empty();
          $('.myCollapse').show('slow');
          collapseTV();
          swT = false;
      }
  });
  $('#fitness').click(function () {
    $('#searchvalue').show('slow');
      if (!swF) {
          $('.myCollapse').hide();
          swF = true;
          return;
      }
      if (swF) {
          $('.myCollapse').empty();
          $('.myCollapse').show('slow');
          collapseFT()
          swF = false;
      }


  });
})

/** 
 * Se crean todos los filtros para móviles.
*/
function collapseSM() {
  let myCollapse = $('.myCollapse');
  myCollapse.append(`
  <div id="accordion" role="tablist" aria-multiselectable="true">
      <div class="card">
          <div class="card-header" role="tab" id="headingOne">
              <h5 class="mb-0 display-6">
              <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  PRECIO
              </a>
              </h5>
          </div>
          <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne">
              <div class="card-block filter">
                  <div class="collapse" id="collapse">
                      <div class="card card-block">
                          <p><label for="desde" class="col-form-label">Desde</label></p>
                          <p><input id="desde" type="number" class="col-sm" name="desde" min="1" max="2000" value="1"></p>
                          <p><label for="hasta" class="col-form-label">Hasta</label></p>
                          <p><input id="hasta" type="number" class="col-sm" name="hasta" min="1" max="2000" value="2000"></p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="card">
          <div class="card-header" role="tab" id="headingTwo">
              <h5 class="mb-0 display-6">
              <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  MARCA
              </a>
              </h5>
          </div>
          <div id="collapseTwo" class="collapse" role="tabpanel" aria-labelledby="headingTwo">
              <div class="card-block">
                  <p><input type="checkbox" id="movil" name="movilMarca" value="Apple"> Apple</p>
                  <p><input type="checkbox" id="movil" name="movilMarca" value="Samsung"> Samsung</p>
                  <p><input type="checkbox" id="movil" name="movilMarca" value="LG"> LG</p>
                  <p><input type="checkbox" id="movil" name="movilMarca" value="Sony"> Sony</p>
                  <p><input type="checkbox" id="movil" name="movilMarca" Motorola="Motorola"> Motorola</p>
              </div>
          </div>
      </div>
      <div class="card">
          <div class="card-header" role="tab" id="headingThree">
              <h5 class="mb-0 display-6">
              <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  M. INTERNA
              </a>
              </h5>
          </div>
          <div id="collapseThree" class="collapse" role="tabpanel" aria-labelledby="headingThree">
              <div class="card-block">
                  <p><input type="checkbox" name="movilMemoria" value="8GB"> 8GB</p>
                  <p><input type="checkbox" name="movilMemoria" value="16GB"> 16GB</p>
                  <p><input type="checkbox" name="movilMemoria" value="32GB"> 32GB</p>
                  <p><input type="checkbox" name="movilMemoria" value="64GB"> 64GB</p>
                  <p><input type="checkbox" name="movilMemoria" value="128GB"> 128GB</p>
                  <p><input type="checkbox" name="movilMemoria" value="256GB"> 256GB</p>
              </div>
          </div>
      </div>
      <div class="card">
          <div class="card-header" role="tab" id="headingFourth">
              <h5 class="mb-0 display-6">
              <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFourth" aria-expanded="false" aria-controls="collapseFourth">
                  M. RAM
              </a>
              </h5>
          </div>
          <div id="collapseFourth" class="collapse" role="tabpanel" aria-labelledby="headingFourth">
              <div class="card-block">
                  <p><input type="checkbox" name="movilRam" value="2GB"> 2GB</p>
                  <p><input type="checkbox" name="movilRam" value="3GB"> 3GB</p>
                  <p><input type="checkbox" name="movilRam" value="4GB"> 4GB</p>
                  <p><input type="checkbox" name="movilRam" value="6GB"> 6GB</p>
              </div>
          </div>
      </div>
      <div class="card">
          <div class="card-header" role="tab" id="headingFive">
              <h5 class="mb-0 display-6">
              <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                 CONECTIVIDAD
              </a>
              </h5>
          </div>
          <div id="collapseFive" class="collapse" role="tabpanel" aria-labelledby="headingFive">
              <div class="card-block">
                  <p><input type="checkbox" name="movilConectividad" value="3G"> 3G</p>
                  <p><input type="checkbox" name="movilConectividad" value="4G"> 4G</p>
              </div>
          </div>
      </div>
      <div class="card">
          <div class="card-header" role="tab" id="headingSix">
              <h5 class="mb-0 display-6">
              <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                 COLOR
              </a>
              </h5>
          </div>
          <div id="collapseSix" class="collapse" role="tabpanel" aria-labelledby="headingSix">
              <div class="card-block">
                  <p><input type="checkbox" name="movilColor" value="White"> Blanco</p>
                  <p><input type="checkbox" name="movilColor" value="Silver"> Gris</p>
                  <p><input type="checkbox" name="movilColor" value="Black"> Negro</p>
              </div>
          </div>
      </div>
      <div class="card">
          <div class="card-header" role="tab" id="headingSeven">
              <h5 class="mb-0 display-6">
              <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                 SISTEMA OPERATIVO
              </a>
              </h5>
          </div>
          <div id="collapseSeven" class="collapse" role="tabpanel" aria-labelledby="headingSeven">
              <div class="card-block">
                  <p><input type="checkbox" name="movilOS" value="Android"> Android</p>
                  <p><input type="checkbox" name="movilOS" value="IOS"> IOS</p>
              </div>
          </div>
      </div>
  </div>    
  `);
  myCollapse.append('<button type="button" class="btn btn-sm btn-block btn-outline-success" id="search" onclick="filtrar()">Filtrar</button>');
}

/** 
 * Se crean todos los filtros para televisión.
*/
function collapseTV() {
  let myCollapse = $('.myCollapse');
  myCollapse.append(`
  <div id="accordion" role="tablist" aria-multiselectable="true">
      <div class="card">
          <div class="card-header" role="tab" id="headingOne">
              <h5 class="mb-0 display-6">
              <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  PRECIO
              </a>
              </h5>
          </div>
          <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne">
              <div class="card-block filter">
                  <div class="collapse" id="collapse">
                      <div class="card card-block">
                          <p><label for="desde" class="col-form-label">Desde</label></p>
                          <p><input id="desde" type="number" class="col-sm" name="desde" min="1" max="2000" value="1"></p>
                          <p><label for="hasta" class="col-form-label">Hasta</label></p>
                          <p><input id="hasta" type="number" class="col-sm" name="hasta" min="1" max="2000" value="2000"></p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="card">
          <div class="card-header" role="tab" id="headingTwo">
              <h5 class="mb-0 display-6">
              <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  MARCA
              </a>
              </h5>
          </div>
          <div id="collapseTwo" class="collapse" role="tabpanel" aria-labelledby="headingTwo">
              <div class="card-block">
                  <p><input type="checkbox" name="tvMarca" value="Sharp"> Sharp</p>
                  <p><input type="checkbox" name="tvMarca" value="Samsung"> Samsung</p>
                  <p><input type="checkbox" name="tvMarca" value="LG"> LG</p>
                  <p><input type="checkbox" name="tvMarca" value="Sony"> Sony</p>
                  <p><input type="checkbox" name="tvMarca" Toshiba="Toshiba"> Toshiba</p>
              </div>
          </div>
      </div>
      <div class="card">
          <div class="card-header" role="tab" id="headingThree">
              <h5 class="mb-0 display-6">
              <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  TIPO DE PANTALLA
              </a>
              </h5>
          </div>
          <div id="collapseThree" class="collapse" role="tabpanel" aria-labelledby="headingThree">
              <div class="card-block">
                  <p><input type="checkbox" name="tvPantalla" value="LED"> LED</p>
                  <p><input type="checkbox" name="tvPantalla" value="Curvo"> Curvo</p>
                  <p><input type="checkbox" name="tvPantalla" value="OLED"> OLED</p>
              </div>
          </div>
      </div>
      <div class="card">
          <div class="card-header" role="tab" id="headingFourth">
              <h5 class="mb-0 display-6">
              <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFourth" aria-expanded="false" aria-controls="collapseFourth">
                  COLOR
              </a>
              </h5>
          </div>
          <div id="collapseFourth" class="collapse" role="tabpanel" aria-labelledby="headingFourth">
              <div class="card-block">
                  <p><input type="checkbox" name="tvColor" value="White"> Blanco</p>
                  <p><input type="checkbox" name="tvColor" value="Grey"> Gris</p>
                  <p><input type="checkbox" name="tvColor" value="Black"> Negro</p>
                  <p><input type="checkbox" name="tvColor" value="Red"> Rojo</p>
              </div>
          </div>
      </div>
      <div class="card">
          <div class="card-header" role="tab" id="headingFive">
              <h5 class="mb-0 display-6">
              <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                  PULGADAS
              </a>
              </h5>
          </div>
          <div id="collapseFive" class="collapse" role="tabpanel" aria-labelledby="headingFive">
              <div class="card-block">
                  <p><input type="checkbox" name="tvPulgadas" value="24\""> 24\"</p>
                  <p><input type="checkbox" name="tvPulgadas" value="28\""> 28\"</p>
                  <p><input type="checkbox" name="tvPulgadas" value="32\""> 32\"</p>
                  <p><input type="checkbox" name="tvPulgadas" value="42\""> 42\"</p>
                  <p><input type="checkbox" name="tvPulgadas" value="48\""> 48\"</p>
                  <p><input type="checkbox" name="tvPulgadas" value="60\""> 60\"</p>
              </div>
          </div>
      </div>
      <div class="card">
          <div class="card-header" role="tab" id="headingSix">
              <h5 class="mb-0 display-6">
              <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                 RESOLUCION
              </a>
              </h5>
          </div>
          <div id="collapseSix" class="collapse" role="tabpanel" aria-labelledby="headingSix">
              <div class="card-block">
                  <p><input type="checkbox" name="tvResolucion " value="480p"> 480p </p>
                  <p><input type="checkbox" name="tvResolucion value="720p"> 720p (HD)</p>
                  <p><input type="checkbox" name="tvResolucion" value="1080p"> 1080p (HD)</p>
                  <p><input type="checkbox" name="tvResolucion" value="4k"> 2160p (4K Ultra HD)</p>
              </div>
          </div>
      </div>
  </div>    
  `);
  myCollapse.append('<button type="button" class="btn btn-sm btn-block btn-outline-success" id="search" onclick="filtrar()">Filtrar</button>');
}

/** 
 * Se crean todos los filtros para  fitness.
*/
function collapseFT(){
  let myCollapse = $('.myCollapse');
  myCollapse.append(`
  <div id="accordion" role="tablist" aria-multiselectable="true">
      <div class="card">
          <div class="card-header" role="tab" id="headingOne">
              <h5 class="mb-0 display-6">
              <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  PRECIO
              </a>
              </h5>
          </div>
          <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne">
              <div class="card-block filter">
                  <div class="collapse" id="collapse">
                      <div class="card card-block">
                          <p><label for="desde" class="col-form-label">Desde</label></p>
                          <p><input id="desde" type="number" class="col-sm" name="desde" min="1" max="2000" value="1"></p>
                          <p><label for="hasta" class="col-form-label">Hasta</label></p>
                          <p><input id="hasta" type="number" class="col-sm" name="hasta" min="1" max="2000" value="2000"></p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="card">
          <div class="card-header" role="tab" id="headingTwo">
              <h5 class="mb-0 display-6">
              <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  TIPO
              </a>
              </h5>
          </div>
          <div id="collapseTwo" class="collapse" role="tabpanel" aria-labelledby="headingTwo">
              <div class="card-block">
                  <p><input type="checkbox" name="fitnessTipo" value="Shavers, Trimmers & Groomers"> Shavers, Trimmers & Groomers </p>
                  <p><input type="checkbox" name="fitnessTipo" value="Hair Care"> Hair Care</p>
                  <p><input type="checkbox" name="fitnessTipo" value="Oral Care"> Oral Care</p>
                  <p><input type="checkbox" name="fitnessTipo" value="Massagers & Spa"> Massagers & Spa</p>
                  <p><input type="checkbox" name="fitnessTipo" value="Skin Care"> Skin Care</p>
              </div>
          </div>
      </div>
  </div>    
  `);
  myCollapse.append('<button type="button" class="btn btn-sm btn-block btn-outline-success" id="search" onclick="filtrar()">Filtrar</button>');
}