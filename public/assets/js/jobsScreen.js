$(document).ready(function(){
    console.log('JS FILE LOADED!!! ready to do ajax calls to hit up routes and grab some data!!!');

    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $('#wrapper').toggleClass("menuDisplayed");
    });

});

