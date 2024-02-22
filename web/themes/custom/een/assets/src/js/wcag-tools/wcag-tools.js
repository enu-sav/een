/**
 * @file
 * WCAG tools
 */
(function (Drupal, once) {

  "use strict";

  Drupal.behaviors.headerProcess = {
    attach: function (context, settings) {

      once('header-process', 'header.header', context).forEach(function (item) {
        var wrapper = item;

        // Toggle mobile menu
        var mobileMenuToggle = wrapper.querySelector('.mn__icon.mn__icon--menu');
        if (mobileMenuToggle) {
          mobileMenuToggle.addEventListener('click', function () {
            if (mobileMenuToggle.classList.contains('open-menu')) {
              mobileMenuToggle.setAttribute('aria-expanded', true);
              mobileMenuToggle.setAttribute('aria-label', Drupal.t('The mobile menu is open'));
            }
            else {
              mobileMenuToggle.setAttribute('aria-expanded', false);
              mobileMenuToggle.setAttribute('aria-label', Drupal.t('The mobile menu is closed'));
            }
          });
        }
      });

    },
  };

  Drupal.behaviors.blackWhite = {
    attach: function (context, settings) {

      /** Black and white version **/
      once('wcag-icons-icon-black-white', '.wcag-icons .icon-black-white', context).forEach(function (item) {
        // Black and white version
        var blackWhiteIcon = item;
        var blackWhite = localStorage.getItem('black-white') || 'normal';

        if (blackWhite === 'black-white') {
          document.documentElement.classList.add('black-white');
          blackWhiteIcon.setAttribute('aria-pressed', true);
          blackWhiteIcon.setAttribute('aria-label', Drupal.t('wcag-accessible-version-of-the-site-is-turned-on'));
        }
        item.parentElement.addEventListener('click', function (event) {
          if (document.documentElement.classList.contains('black-white')) {
            document.documentElement.classList.remove('black-white');
            blackWhiteIcon.setAttribute('aria-pressed', false);
            blackWhiteIcon.setAttribute('aria-label', Drupal.t('wcag-accessible-version-of-the-site-is-turned-off'));
            localStorage.setItem('black-white', 'normal');
          }
          else {
            document.documentElement.classList.add('black-white');
            blackWhiteIcon.setAttribute('aria-pressed', true);
            blackWhiteIcon.setAttribute('aria-label', Drupal.t('wcag-accessible-version-of-the-site-is-turned-on'));
            localStorage.setItem('black-white', 'black-white');
          }
        });
      });

    },
  };

})(Drupal, once);
