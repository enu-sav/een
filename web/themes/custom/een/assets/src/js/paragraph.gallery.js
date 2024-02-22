/**
 * @file
 * "gallery" paragraph javascripts.
 */
(function ($, Drupal, once) {

  "use strict";

  Drupal.behaviors.paragraphGallery = {
    attach: function (context, settings) {

      once('paragraph-gallery', '.paragraph--type--gallery .field--name-field-images', context).forEach(function (item) {
        if (item) {
          lightGallery(item, {
            plugins: [lgThumbnail, lgFullscreen],
            selector: '.field__item > a',
            download: false,
            licenseKey: '605A035C-4289-4FC9-AC3D-15F950552E1B',
            speed: 500,
          });
        }
      });

      once('paragraph-gallery', '.paragraph--type--gallery', context).forEach(function () {

        var sliderFor = $('.field--name-field-images');

        sliderFor.slick({
          autoplay: false,
          autoplaySpeed: 9999999999,
          speed: 450,
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          infinite: false,
          touchMove: false,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1
              }
            },
          ]
        });

        $(window).resize(function(){
          sliderFor[0].slick.refresh();
        });
      });

    },
  };

})(jQuery, Drupal, once);
