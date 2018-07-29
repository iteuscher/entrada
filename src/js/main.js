
// **********************
// Smooth Scrolling
// **********************
// Select all links with hashes
$('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .not('[href="#testimonial1"]')
    .not('[href="#testimonial2"]')
    .not('[href="#testimonial3"]')
    .click(function (event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });


// **********************
// Smooth Scrolling pt 2
// **********************
$(document).ready(function () {

    var scrollLink = $('.scrolllink');

    // Smooth scrolling
    // scrollLink.click(function (e) {
    //     e.preventDefault();
    //     $('body,html').animate({
    //         scrollTop: $(this.hash).offset().top
    //     }, 1000);
    // });

    // Active link switching
    $(window).scroll(function () {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function () {

            var sectionOffset = $(this.hash).offset().top - 0;

            if (sectionOffset <= scrollbarLocation) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        })
    })
})



// ****************************
// Better Bootstrap NavBar
// https: //github.com/bootstrapstudio/bootstrap-better-nav
// ****************************
$(function () {

    var body = $('body');
    var navbarCollapse = $('.navbar-collapse');

    // Add the needed HTML elements for the plugin to work. 
    // All the elements are styled in navbar-sidemnu.css.
    body.append('<div class="side-menu-overlay"></div>');
    var overlay = $('.side-menu-overlay');

    body.append('<div id="side-menu"></div>');
    var sideMenu = $('#side-menu');

    sideMenu.append('<button id="side-menu-close" class="close"><span aria-hidden="true">×</span></button>')
    var sideMenuCloseBtn = sideMenu.find('.close');

    sideMenu.append('<div class="contents"></div>')
    var sideMenuContents = sideMenu.find('.contents');



    // This event is trigerred when the user clicks the navbar toggle button.

    navbarCollapse.on('show.bs.collapse', function (e) {
        // Stop the default navbar behaviour (don't open the collapse navigation).
        e.preventDefault();

        // Instead we copy the navbar contents and add them to our side menu.
        var menuContent = $(this).html();
        sideMenuContents.html(menuContent);

        // Animate the side menu into frame.
        slideIn();
    });


    // Hide the menu when the "x" button or a nav-link is clicked.
    $('.navmenulink').each(function(){
        $(this).on('click', function (e) {
            if (!navbarCollapse.is(":visible") && body.hasClass('side-menu-visible')) {
                console.log ("clicked!!")
                e.preventDefault();
                slideOut();
            }
        });
        console.log($(this));
    })


    sideMenuCloseBtn.on('click', function (e) {
        e.preventDefault();
        slideOut();
    });

    // Hide the menu when the overlay element is clicked.

    overlay.on('click', function (e) {
        slideOut();
    });

    // Listen for changes in the viewport size.
    // If the original navbar collapse is visible then the nav is expanded.
    // Hide/Show the menu accordingly.

    $(window).resize(function () {
        if (!navbarCollapse.is(":visible") && body.hasClass('side-menu-visible')) {
            sideMenu.show();
            overlay.show();
        } else {
            sideMenu.hide();
            overlay.hide();
        }
    });

    function slideIn() {
        body.addClass('overflow-hidden');
        sideMenu.show();
        setTimeout(function () {
            body.addClass('side-menu-visible');
            overlay.fadeIn();
        }, 50);
    }

    function slideOut() {
        body.removeClass('side-menu-visible');
        overlay.fadeOut();
        setTimeout(function () {
            sideMenu.hide();
            body.removeClass('overflow-hidden');
        }, 400);
    }
});



/*!
=========================================================
* Gaia Bootstrap Template - v1.0.1
=========================================================
* Product Page: https://www.creative-tim.com/product/gaia-bootstrap-template
* Copyright 2017 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/gaia-bootstrap-template/blob/master/LICENSE.md)
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

let $navbar = $('.navbar[color-on-scroll]');
scroll_distance = $navbar.attr('color-on-scroll') || 300;

let BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) !== -1) {
                return data[i].identity;
            }
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
            return;
        }

        var rv = dataString.indexOf("rv:");
        if (this.versionSearchString === "Trident" && rv !== -1) {
            return parseFloat(dataString.substring(rv + 3));
        } else {
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        }
    },

    dataBrowser: [
        { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
        { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" },
        { string: navigator.userAgent, subString: "Trident", identity: "Explorer" },
        { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: navigator.userAgent, subString: "Safari", identity: "Safari" },
        { string: navigator.userAgent, subString: "Opera", identity: "Opera" }
    ]

};


let gaia = {
    // misc: {
    //     navbar_menu_visible: 0
    // },
    // initRightMenu: function () {
    //     if (!navbar_initialized) {
    //         let $toggle = $('.navbar-toggle');
    //         $toggle.click(function () {

    //             if (gaia.misc.navbar_menu_visible == 1) {
    //                 $('html').removeClass('nav-open');
    //                 gaia.misc.navbar_menu_visible = 0;
    //                 $('#bodyClick').remove();
    //                 setTimeout(function () {
    //                     $toggle.removeClass('toggled');
    //                 }, 550);

    //             } else {
    //                 setTimeout(function () {
    //                     $toggle.addClass('toggled');
    //                 }, 580);

    //                 let div = '<div id="bodyClick"></div>';
    //                 $(div).appendTo("body").click(function () {
    //                     $('html').removeClass('nav-open');
    //                     gaia.misc.navbar_menu_visible = 0;
    //                     $('#bodyClick').remove();
    //                     setTimeout(function () {
    //                         $toggle.removeClass('toggled');
    //                     }, 550);
    //                 });

    //                 $('html').addClass('nav-open');
    //                 gaia.misc.navbar_menu_visible = 1;

    //             }
    //         });
    //         navbar_initialized = true;
    //     }
    // } ,

    checkScrollForTransparentNavbar: debounce(function () {
        if ($(document).scrollTop() > scroll_distance) {
            if (transparent) {
                transparent = false;
                $navbar.removeClass('navbar-transparent');
            }
        } else {
            if (!transparent) {
                transparent = true;
                $navbar.addClass('navbar-transparent');
            }
        }
    }, 17),

    // checkScrollForParallax: debounce(function () {
    //     $('.parallax').each(function () {
    //         var $elem = $(this);

    //         if (isElementInViewport($elem)) {
    //             var parent_top = $elem.offset().top;
    //             var window_bottom = $(window).scrollTop();
    //             var $image = $elem.children('.image');

    //             let oVal = ((window_bottom - parent_top) / 3);
    //             $image.css('transform', 'translate3d(0px, ' + oVal + 'px, 0px)');
    //         }
    //     });

    // }, 6),

    // checkScrollForContentTransitions: debounce(function () {
    //     $('.content-with-opacity').each(function () {
    //         var $content = $(this);

    //         if (isElementInViewport($content)) {
    //             var window_top = $(window).scrollTop();
    //             opacityVal = 1 - (window_top / 230);

    //             if (opacityVal < 0) {
    //                 opacityVal = 0;
    //                 return;
    //             } else {
    //                 $content.css('opacity', opacityVal);
    //             }

    //         }
    //     });
    // }, 6)
    //,

    // initGoogleMaps: function ($elem, lat, lng) {
    //     var myLatlng = new google.maps.LatLng(lat, lng);

    //     var mapOptions = {
    //         zoom: 13,
    //         center: myLatlng,
    //         scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
    //         disableDefaultUI: true,
    //         styles: [{ "featureType": "administrative", "elementType": "labels", "stylers": [{ "visibility": "on" }, { "gamma": "1.82" }] }, { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "visibility": "on" }, { "gamma": "1.96" }, { "lightness": "-9" }] }, { "featureType": "administrative", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "visibility": "on" }, { "lightness": "25" }, { "gamma": "1.00" }, { "saturation": "-100" }] }, { "featureType": "poi.business", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "hue": "#ffaa00" }, { "saturation": "-43" }, { "visibility": "on" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "labels", "stylers": [{ "visibility": "simplified" }, { "hue": "#ffaa00" }, { "saturation": "-70" }] }, { "featureType": "road.highway.controlled_access", "elementType": "labels", "stylers": [{ "visibility": "on" }] }, { "featureType": "road.arterial", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": "-100" }, { "lightness": "30" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "saturation": "-100" }, { "lightness": "40" }, { "visibility": "off" }] }, { "featureType": "transit.station.airport", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "gamma": "0.80" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "visibility": "off" }] }]
    //     }
    //     var map = new google.maps.Map($elem, mapOptions);

    //     var marker = new google.maps.Marker({
    //         position: myLatlng,
    //         title: "Hello World!"
    //     });

    //     // To add the marker to the map, call setMap();
    //     marker.setMap(map);
    // }
}

var transparent = true;

var fixedTop = false;

// var navbar_initialized = false;

var scroll;

scroll = (2500 - $(window).width()) / $(window).width();

var window_height;
var window_width;

var content_opacity = 0;
var content_transition = 0;
var no_touch_screen = false;

var scroll_distance = 500;

$(document).ready(function () {
    BrowserDetect.init();

    if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 9) {
        $('body').html(better_browser);
    }

    window_width = $(window).width();
    window_height = $(window).height();

    // burger_menu = $('.navbar').hasClass('navbar-burger') ? true : false;

    if (!Modernizr.touch) {
        $('body').addClass('no-touch');
        no_touch_screen = true;
    }

    // Init navigation toggle for small screens
    // if(window_width < 992 || burger_menu){
    //     gaia.initRightMenu();
    // }

    // if($('.content-with-opacity').length != 0){
    //     content_opacity = 1;
    // }

    // $('.google-map').each(function(){
    //     var lng = $(this).data('lng');
    //     var lat = $(this).data('lat');

    //     gaia.initGoogleMaps(this, lat, lng);
    // });

});

//activate collapse right menu when the windows is resized
// $(window).resize(function(){
//     if($(window).width() < 992){
//         gaia.initRightMenu();
//         //gaia.checkResponsiveImage();
//     }
//     if($(window).width() > 992 && !burger_menu){
//         $('nav[role="navigation"]').removeClass('navbar-burger');
//         gaia.misc.navbar_menu_visible = 1;
//         navbar_initialized = false;
//     }
// });

$(window).on('scroll', function () {

    gaia.checkScrollForTransparentNavbar();

    // if(window_width > 992){
    //     gaia.checkScrollForParallax();
    // }

    // if(content_opacity == 1 ){
    //     gaia.checkScrollForContentTransitions();
    // }

});

$('a[data-scroll="true"]').click(function (e) {
    var scroll_target = $(this).data('id');
    var scroll_trigger = $(this).data('scroll');

    if (scroll_trigger == true && scroll_target !== undefined) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $(scroll_target).offset().top - 50
        }, 1000);
    }

});

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};


function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round($elem.offset().top);
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}
var better_browser = '<div class="container"><div class="better-browser row"><div class="col-md-2"></div><div class="col-md-8"><h3>We are sorry but it looks like your Browser doesn\'t support our website Features. In order to get the full experience please download a new version of your favorite browser.</h3></div><div class="col-md-2"></div><br><div class="col-md-4"><a href="https://www.mozilla.org/ro/firefox/new/" class="btn btn-warning">Mozilla</a><br></div><div class="col-md-4"><a href="https://www.google.com/chrome/browser/desktop/index.html" class="btn ">Chrome</a><br></div><div class="col-md-4"><a href="http://windows.microsoft.com/en-us/internet-explorer/ie-11-worldwide-languages" class="btn">Internet Explorer</a><br></div><br><br><h4>Thank you!</h4></div></div>';
