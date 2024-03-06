/**
 * @file
 * Global javascripts.
 */

if (typeof Drupal !== 'undefined') {
  (function(Drupal, once) {
    'use strict';

    window.addEventListener('resize', function() {
      if (this.resizeTO) clearTimeout(this.resizeTO);
      this.resizeTO = setTimeout(function() {
        // Trigger a custom event named 'resizeEnd'
        var event = new Event('resizeEnd');
        window.dispatchEvent(event);
      }, 1);
    });

    /**
     * Sticky header from 768px
     */
    document.addEventListener('DOMContentLoaded', function() {
      window.addEventListener('scroll', function() {
        var top = window.pageYOffset || document.documentElement.scrollTop;
        var body = document.body;

        if (top >= 180) {
          body.classList.add('sticky-header');
        } else {
          body.classList.remove('sticky-header');
        }
      });
    });

    /**
     * Navigation button
     */
    var navigationToggle = document.getElementsByClassName('mn__icon')[0];
    navigationToggle.addEventListener('click', function() {
      document.body.classList.toggle('navigation-expanded');
      navigationToggle.classList.toggle('open-menu');
    });

    /**
     * Open external links and PDF files in new window
     */
    var externalLinks = document.querySelectorAll('.layout-container a[href^="http"]');
    externalLinks.forEach(function (link) {
      if (!link.href.includes(location.host)) {
        link.setAttribute('target', '_blank');
      }
    });

    var pdfLinks = document.querySelectorAll('a[href$=".pdf"]');
    pdfLinks.forEach(function (link) {
      link.setAttribute('target', '_blank');
    });

  })(Drupal, once);
}
