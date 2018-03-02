function LogGoogle(){
    var config = {
        apiKey: "AIzaSyA7jek9LWz3xNyGDpYtNjHOcw3nn9I8oz0",
        authDomain: "bestbay-1519376497801.firebaseapp.com",
        databaseURL: "https://bestbay-1519376497801.firebaseio.com",
        projectId: "bestbay-1519376497801",
        storageBucket: "bestbay-1519376497801.appspot.com",
        messagingSenderId: "730955629296"
      };
      firebase.initializeApp(config);

      var auth = firebase.auth();
  
      var provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider).then(function (result) {
          // User signed in!
          console.log(result);
        //   var nombre = result.additionalUserInfo.profile.first_name;
        //  var h =  document.getElementsByClassName('display-5')[0]
        //  h.innerHTML = nombre + ' <i class="far fa-user" onclick="deslog()"></i>';

      }).catch(function (error) {
          // An error occurred
      });
}
