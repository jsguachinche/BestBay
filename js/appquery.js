
cargarMovilQuery();

var confiltrado = document.getElementsByClassName('filtrado')[0];
function cargarMovil(){
    var bMarca = document.createElement('b');
    bMarca.setAttribute('class','tcol')
    bMarca.innerHTML = 'Marca';
    var ulMarca = document.createElement('ul');
    var liApple= document.createElement('li');
    liApple.innerHTML = ' <input type="checkbox" name="Apple" value="Apple"> Apple ';
    var liSam= document.createElement('li');
    liSam.innerHTML = ' <input type="checkbox" name="Samsung" value="Samsung"> Samsung ';
    var liLG= document.createElement('li');
    liLG.innerHTML = ' <input type="checkbox" name="LG" value="LG"> LG ';
    var liSony= document.createElement('li');
    liSony.innerHTML = ' <input type="checkbox" name="Sony" value="Sony"> Sony ';
    var liMoto= document.createElement('li');
    liMoto.innerHTML = ' <input type="checkbox" name="Motorola" value="Motorola"> Motorola ';
    ulMarca.appendChild(liApple);
    ulMarca.appendChild(liSam);
    ulMarca.appendChild(liLG);
    ulMarca.appendChild(liSony);
    ulMarca.appendChild(liMoto);
    confiltrado.appendChild(bMarca);
    confiltrado.appendChild(ulMarca);
}




function cargarMovilQuery(){
    var confiltradoQuery = $('.filtrado');
    $(confiltradoQuery).append('<b class="tcol">Marca<b><ul></ul>');
    var ulMarca = $(confiltradoQuery).append('<ul>');
    $(ulMarca).append('<li><input type="checkbox" name="Apple" value="Apple"> Apple</li>');
    $(ulMarca).append('<li><input type="checkbox" name="Samsung" value="Samsung"> Samsung</li>');
    $(ulMarca).append('<li><input type="checkbox" name="LG" value="LG"> LG</li>');
    $(ulMarca).append('<li><input type="checkbox" name="Sony" value="Sony"> Sony</li>');
    $(ulMarca).append('<li><input type="checkbox" name="Motorola" Motorola="Motorola"> Motorola</li>');
}