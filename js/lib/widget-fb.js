function loginFacebook() {

    var auth = firebase.auth();

    var provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider).then(function (result) {
        // User signed in!
        console.log(result);
        var nombre = result.additionalUserInfo.profile.first_name;
        localStorage.setItem("user", nombre)
        var h = document.getElementsByClassName('display-5')[0]
        h.innerHTML = '<b style="font-size:1.5em;text-align: center;">Bienvenido: </b>'+nombre + '<a href="#" onclick="logout()">  Cerrar sesión</a>';

    }).catch(function (error) {
        // An error occurred
    });
}