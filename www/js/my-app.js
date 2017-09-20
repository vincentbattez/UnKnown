window.FINDER;
/**
 * 
 * 
 * Initialize app
 * 
 * 
 */
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
        // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
        function fbLoginSuccess(){
            $("#status").html("LoggedIn");
        }
        
        function LoginToFB(){
            facebookConnectPlugin.login(["public_profile"], fbLoginSuccess, function (error) {
                $("#status").html("Authentication Failed");
            });
        }
        
        //pushBots code
        window.plugins.PushbotsPlugin.initialize("59ba99664a9efa9c0a8b4568", {"android":{"sender_id":"759226829532"}});

        window.plugins.OneSignal
            .startInit("d4846f4e-f3ee-4e29-a68e-0432796aaf30")
            .handleNotificationOpened(notificationOpenedCallback)
            .endInit();
    });
/**
 * 
 * 
 * FUNCTIONS
 * 
 * 
 */
//////////////////////////////////////////////////////////////////// GOOGLE MAP
    var currentLocationMap,
        directionsDisplay,
        directionsService,
        latStart, lngStart,
        start;
    navigator.geolocation.getCurrentPosition(function (location) {
        latStart = location.coords.latitude;
        lngStart = location.coords.longitude;
        var start = new google.maps.LatLng(parseFloat(latStart), parseFloat(lngStart));
    });
    function ratingColor() {
        var rateValue = $('.meetingRate').html();
        if (rateValue > 70) {
            $('.meetingRate').addClass('valid');
        } else {
            $('.meetingRate').addClass('error');
        }
    }
    function Finder() {
        $.ajax({
            url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latStart + ',' + lngStart + '&sensor=true',
            success: function (data) {
                street = data.results[0].formatted_address;
            }
        });
        // End get json parse from php
        // Distance
        var finder = new google.maps.LatLng(latStart, lngStart);      // Location of finder (me)
        var befound = new google.maps.LatLng(51.779749, 19.4477125);    // Location of befound
        var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
            origins: [finder],
            destinations: [befound],
            travelMode: 'WALKING',
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        }, function (response, status) {
            if (status !== 'OK') {
                alert('Error was: ' + status);
            } else {
                var originList = response.originAddresses;
                var destinationList = response.destinationAddresses;

                for (var i = 0; i < originList.length; i++) {
                    var results = response.rows[i].elements;
                    for (var j = 0; j < results.length; j++) {
                        $('#controlPanel-info').html('<strong class="duration">' + results[j].duration.text + ' </strong> <span class="distantion"> - ' + results[j].distance.text + '</span>');
                        if (!FINDER) {
                            $('#controlPanel-info').html('<span>His/Her meeting rate: <span class="meetingRate">60</span>%</span>');
                        }
                    }
                }
            }
        });
        var request = {
            origin: finder, // Me
            destination: befound, // be found
            travelMode: google.maps.TravelMode.WALKING // walking travel
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
        ratingColor();        
    } // /finder
    function toBeFound() {
        var found = new google.maps.LatLng(latStart, lngStart);
        var myCity = new google.maps.Circle({
            center: found,
            radius: 3500,
            strokeColor: "#677de7",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#C7D2E2",
            fillOpacity: 0.4
        });
        myCity.setMap(currentLocationMap);
        $('#controlPanel-info').html('<span>His/Her meeting rate: <span class="meetingRate">70</span>%</span>');
        ratingColor();
    } // toBeFound
    function StartMap() {
        directionsService = new google.maps.DirectionsService();
        // route planner
        directionsDisplay = new google.maps.DirectionsRenderer();
        currentLocationMap = new google.maps.LatLng(latStart, lngStart);  // DkIT
        var mapOptions = { zoom:12, center: currentLocationMap };
        currentLocationMap = new google.maps.Map(document.getElementById('mapDiv'), mapOptions);
        directionsDisplay.setMap(currentLocationMap);
        /**
         * IF Global variable = true (i'm finder) run Finder() fonction, else toBeFound();
         */
        FINDER ? Finder() : toBeFound();
    }
//////////////////////////////////////////////////////////////////// POPUP
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
/**
 * 
 * 
 * onPageInit
 * 
 * 
 */
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
        $('#finder').click(function (e) {
            window.FINDER = true;
            console.log(FINDER);
        });
        $('#found').click(function (e) {
            window.FINDER = false;
            console.log(FINDER);
        });
    });
    myApp.onPageInit('loading', function (page) {
        $(document).ready(function() {
            if(!FINDER)
                 $('body').find('.color-finder').removeClass('color-finder').addClass('color-found');
            StartMap(); // TODO : if finder find someone play this fonction
            setTimeout(function() {
                $('#mapDiv').css({
                    filter: 'blur(0px)'
                });
                $('.loading-div').fadeOut();
            }, 3000);
        });
    });
    myApp.onPageInit('finder-dont', function (page) {
        $(document).ready(function () {
            if (!FINDER)
                $('body').find('.color-finder').removeClass('color-finder').addClass('color-found');
            $('#mapDiv').remove();
            StartMap(); // TODO : if finder find someone play this fonction
        });
    });
    myApp.onPageInit('final', function (page) {
        $(document).ready(function () {
            if (!FINDER)
                $('body').find('.color-finder').removeClass('color-finder').addClass('color-found');
            $('#mapDiv').remove();
            StartMap(); // TODO : if finder find someone play this fonction
        });
    });
    myApp.onPageInit('found-here', function (page) {
            StartMap(); // TODO : if finder find someone play this fonction
            
    });
    myApp.onPageInit('finder-here', function (page) {
            StartMap(); // TODO : if finder find someone play this fonction

    });

    myApp.onPageInit('found-gesture', function (page) {
        $(document).ready(function () {
            if (!FINDER)
                $('body').find('.color-finder').removeClass('color-finder').addClass('color-found');
            $('#mapDiv').remove();
            StartMap(); // TODO : if finder find someone play this fonction
        });
    });
    myApp.onPageInit('finder-wait', function (page) {
        $(document).ready(function () {
            if (!FINDER)
                $('body').find('.color-finder').removeClass('color-finder').addClass('color-found');
            $('#mapDiv').remove();
            StartMap(); // TODO : if finder find someone play this fonction
        });
    });
    myApp.onPageInit('found-again', function (page) {
        $(document).ready(function () {
            if (!FINDER)
                $('body').find('.color-finder').removeClass('color-finder').addClass('color-found');
            $('#mapDiv').remove();
            StartMap(); // TODO : if finder find someone play this fonction
        });
    });
