(function ($) {
  var navbar = $('#jwc-navbar');
  var navbarm = $('#jwc-navbarm');
  var $document = $(document);
  var button = $('#jwc-m-navbar-btn');

  $document.ready(function() {
        if (navbar.hasClass('show')) {
          navbar.removeClass('show');
        }
    smoothScroll.init();
    $( '.swipebox' ).swipebox();
  });

  $document.scroll(function(e) {
    if (window.scrollY > 31 && !navbar.hasClass('show')) {
        navbar.addClass('show');
        navbarm.addClass('show');
    } else if (window.scrollY < 30 && navbar.hasClass('show')) {
        navbar.removeClass('show');
        navbarm.removeClass('show');
    }
  });
})(jQuery)
