// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});



function overlayPopup() {
    $('body').on('click', '.overlay', function () {
        $(".overlay").fadeOut(function(){$(this).remove();});
    });
    $(".page-on-center .page-content").append('<div class="overlay"></div>');
    $(".overlay").fadeIn();
}

function slidePopup(selector) {
    $(selector).on('click', function () {
        $('.slidePopup-js').slideDown(); // hide
    });
    $('body').on('click', '.overlay', function () {
        $('.slidePopup-js').slideUp(); // show
    });
}

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('categories', function (page) {
    $('.categorie-button').click(function () {
        $('.categorie-button').removeClass('active'); // remove all class active
        $(this).addClass('active'); // add class active
        slidePopup('.categorie-button'); //slideUp
        overlayPopup(); // black overlay
        $('body').on('click', '.overlay', function () {
            $('.categorie-button').removeClass('active'); // remove class active
        });        
    });
    slidePopup('.categorie-button');
})

