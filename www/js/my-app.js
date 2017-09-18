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
    //  window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

//   window.plugins.OneSignal
//     .startInit("d4846f4e-f3ee-4e29-a68e-0432796aaf30")
//     .handleNotificationOpened(notificationOpenedCallback)
//     .endInit();
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
});


myApp.onPageInit('loading', function (page) {
});


// GOOGLE MAP
var currentLocationMap;
var directionsDisplay;
var directionsService;
var latStart, lngStart;
var start;

navigator.geolocation.getCurrentPosition(function (location) {
    latStart = location.coords.latitude;
    lngStart = location.coords.longitude;
    var start = new google.maps.LatLng(parseFloat(latStart), parseFloat(lngStart));
});

function StartMap() {
    directionsService = new google.maps.DirectionsService();
    // route planner
    directionsDisplay = new google.maps.DirectionsRenderer();
    currentLocationMap = new google.maps.LatLng(latStart, lngStart);  // DkIT
    var mapOptions = { zoom: 15, center: currentLocationMap };
    currentLocationMap = new google.maps.Map(document.getElementById('mapDiv'), mapOptions);
    directionsDisplay.setMap(currentLocationMap);

    //toBeFound();
    Finder();
    //calculateRoute();
}

function toBeFound() {
    var lodz = new google.maps.LatLng(latStart, lngStart);
    var myCity = new google.maps.Circle({
        center: lodz,
        radius: 500,
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0000FF",
        fillOpacity: 0.4
    });
    myCity.setMap(currentLocationMap);
} // toBeFound

function Finder() {
    var Street;
    var html = "<b>End: </b> <input type='text' id='end' required>";

    if (!$('#end').length) {
        $('#controlPanel').append(html);
    }

    $.ajax({
        url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latStart + ',' + lngStart + '&sensor=true',
        success: function (data) {
            //alert(data.results[0].formatted_address);
            street = data.results[0].formatted_address;
        }
    });

    // End get json parse from php

    var end = document.getElementById('end').value;
    var request = {
        origin: street,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
} // /finder
