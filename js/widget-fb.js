var FB;
window.fbAsyncInit = function () {
    FB.init({
        appId: '568070633526032',
        cookie: true,
        xfbml: true,
        version: 'v2.12.'
    });
    FB.AppEvents.logPageView();
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
    FB.logout(function(response) {
// Person is now logged out
    });
    
};
(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.12&appId=568070633526032&autoLogAppEvents=1';
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));