/*if (!('ontouchstart' in document.documentElement)) {

    $(window).on('load', function(){

        var elements = $('.page-header__top, ' +
                         '.message-block > *, ' +
                         '.section-block__heading, ' +
                         '.section-block__text, ' +
                         '.section-block__image, ' +
                         '.list-in-columns li, ' +
                         '.banner__heading, ' +
                         '.banner__text, ' +
                         '.banner__button, ' +
                         '.page-footer__item, ' +
                         '.page-footer__bottom, ' +
                         '.items-layout__item');

        elements.waypoint({
            handler: function(){
                $(this.element).css('visibility', 'visible');
                $(this.element).addClass('fadeInUp');
                this.destroy();
            },
            offset: 'bottom-in-view'
        });

    });

}*/

$(window).on('load', function () {

    /*
     Смена картинки и подписи рамы окна
     */
    var tiles = $('.section1__tile');
    var image = $('.section1__image-cell img');
    var name = $('.section1__image-caption');

    tiles.click(function(){
        tiles.removeClass('section1__tile_selected');
        $(this).addClass('section1__tile_selected');
        var imgSrc = $(this).attr('data-image');
        image.attr('src', 'images/' + imgSrc);
        var nameText = $(this).attr('data-name');
        name.html(nameText);
    });

    var wrap = $('.header__menu'),
        menu = $('.header__menu-list', wrap),
        hamburger = $('.header__hamburger'),
        breakpoint = 1221;

    hamburger.click(function () {
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
            wrap.css('height', 0);
        } else {
            $(this).addClass('is-active');
            wrap.css('height', menu.innerHeight());
        }
    });

    $(window).resize(function () {
        if ($(this).width() >= breakpoint) {
            wrap.css('height', '');
        } else if (hamburger.hasClass('is-active')) {
            wrap.css('height', menu.innerHeight());
        }
    });

    /*$('.layout-5__slider').cycle({
        'slides': '.layout-5__slide',
        'fx': 'scrollHorz',
        'swipe': true,
        'autoHeight': 'container',
        'pager': '.layout-5__articles-pager',
        'pagerActiveClass': 'pager-item_active',
        'pagerTemplate': '<div class="pager-item"></div>',
        'log': false,
        'speed': 600,
        'timeout': timeout,
        'easing': 'easeInOutSine'
    }).cycle('pause');

    $('.layout-7__slider').cycle({
        'slides': '.layout-7__slide',
        'fx': 'carousel',
        'swipe': true,
        'autoHeight': 'calc',
        'prev': '.layout-7__slider-btn_prev',
        'next': '.layout-7__slider-btn_next',
        'log': false,
        'speed': 600,
        'timeout': 1000,
        'easing': 'easeInOutSine'
    }).cycle('pause');*/

});