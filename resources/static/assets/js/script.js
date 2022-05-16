//SCROLL MENU
$(document).ready(function(){
var scrollTop = 40;
$(window).scroll(function(){
    scrollTop = $(window).scrollTop();
    if (scrollTop >= 100) {
    $('#top_header').addClass("menu_fixed");
    } else  {
    $('#top_header').removeClass("menu_fixed");
    } 
});


$(document).ready(function () {
//Best Product Slider
$('.carousel1').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    dots:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:3
        }
    }
})

//Best Product Slider
$('.owlCarousel2').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    dots:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:4
        }
    }
})

//Header And Testominal
$('._1slider').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    dots:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})

//Product Details Slider
var action = false, clicked = false;
var Owl = {
    init: function () {
        Owl.carousel();
    },

    carousel: function () {
        var owl;
        $(document).ready(function () {

            owl = $('.jewelry-slider').owlCarousel({
                items: 1,
                center: true,
                nav: false,
                dots: true,
                loop: true,
                margin: 10,
                dotsContainer: '.test',
                navText: ['prev', 'next'],
            });

            $('.owl-next').on('click', function () {
                action = 'next';
            });

            $('.owl-prev').on('click', function () {
                action = 'prev';
            });

            $('.bookmarks').on('click', 'li', function (e) {
                owl.trigger('to.owl.carousel', [$(this).index(), 300]);
            });
        });
    }
};

$(document).ready(function () {
    Owl.init();
});




});