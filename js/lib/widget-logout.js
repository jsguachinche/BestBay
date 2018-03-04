function logout() {
 

  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    var h = document.getElementsByClassName('display-5')[0]
    h.innerHTML = '<b style="font-size:1.5em;text-align: center;">Conectarse desde: </b><div class="social btn" onclick="loginFacebook()"><i class="fab fa-facebook-square"></i></div><div class="social btn" onclick="loginGithub()"><i class="fab fa-github"></i></div><div class="social btn" onclick="loginTwitter()"><i class="fab fa-twitter-square"></i></div><div class="social btn" onclick="LogGoogle()"><i class="fab fa-google"></i></i></div>';
    localStorage.removeItem("user");
  }, function (error) {
    console.log(error);
    
  });
}


/* 

<b style="font-size:1.5em;text-align: center;">Conectarse desde: </b>
                <div class="social btn" onclick="loginFacebook()">
                    <i class="fab fa-facebook-square"></i>
                </div>
                <div class="social btn" onclick="loginGithub()">
                    <i class="fab fa-github"></i>
                </div>
                <div class="social btn" onclick="loginTwitter()">
                    <i class="fab fa-twitter-square"></i>
                </div>
                <div class="social btn" onclick="LogGoogle()">
                    <i class="fab fa-google"></i>
                    </i>
                </div>
*/