(function ($) {
  var navbar = $('#jwc-navbar');
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
    if (window.scrollY !== 0 && !navbar.hasClass('show')) {
        navbar.addClass('show');
    } else if (window.scrollY === 0 && navbar.hasClass('show')) {
        navbar.removeClass('show');
    }
  });

  ["marketing", "design", "content"].forEach(function(major) {
  $.get('/count/' + major, function(res) {
    console.log(major + " " + res);
      $(".counter-" + major).text(res);
    });
  });

})(jQuery)
