function loginGithub() {
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

    var provider = new firebase.auth.GithubAuthProvider();
    auth.signInWithPopup(provider).then(function (result) {
        // User signed in!
        console.log(result);

    }).catch(function (error) {
        // An error occurred
    });
}