'use strict';

var customCarousel = {
    carousel: '.carousel',
    carouselList: '.carousel ul',
    carouselItem: '.carousel li',
    visibleItems: 3,
    animationSpeed: 700,
    breakpoints: {
        tablet: 700,
        mobile: 461
    },
    btnPrev: '.prev',
    btnNext: '.next',
    init: function() {
        var that = this;
        that.windowResize();
        that.eventClick();

        jQuery(window).resize(function() {
            that.windowResize();
            that.eventClick();
        });
    },
    windowResize: function (){
        var carouselWidth = Math.round($('.carousel').width());

        if(carouselWidth < customCarousel.breakpoints.mobile) {
            $(this.carouselItem).css('width', carouselWidth);
        } else if (carouselWidth < customCarousel.breakpoints.tablet) {
            $(this.carouselItem).css('width', carouselWidth/2);
        } else {
            $(this.carouselItem).css('width', carouselWidth/this.visibleItems);
        }
    },
    eventClick: function (){
        var carouselWidth = Math.round($('.carousel li').width());

        $(this.btnPrev).off().on('click', function(e){
            e.preventDefault();
            $(customCarousel.carouselItem).last().detach().prependTo($(customCarousel.carouselList));
            $(customCarousel.carouselList).css('margin-left', -carouselWidth);
            $(customCarousel.carouselList).animate({
                marginLeft: 0
            }, customCarousel.animationSpeed);
        });
        $(this.btnNext).off().on('click', function(e){
            e.preventDefault();
            $(customCarousel.carouselList).animate({
                marginLeft: -carouselWidth
            }, customCarousel.animationSpeed, function(){
                $(customCarousel.carouselItem).first().detach().appendTo($(customCarousel.carouselList));
                $(customCarousel.carouselList).css('margin-left', 0);
            });
        });
    }
};
jQuery(window).on('load', function(){
    customCarousel.init();
});