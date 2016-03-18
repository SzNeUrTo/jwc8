(function ($) {
  var navbar = $('#jwc-navbar');
  var navbarm = $('#jwc-navbarm');
  var $document = $(document);
  var button = $('#jwc-m-navbar-btn');
  var dropdownChoice = $('a[dropdown-choice]');

  $document.ready(function() {
    if (navbar.hasClass('show')) {
      navbar.removeClass('show');
    }

    smoothScroll.init();
    $( '.swipebox' ).swipebox();

    ["marketing", "design", "content"].forEach(function(major) {
      $.get('/count/' + major, function(res) {
        $(".counter-" + major).text(res);
      });
    });
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

  dropdownChoice.each(function(index, choice) {
    $(choice).click(function(e) {
      $('input[name="' + $(choice).attr('input') + '"]').val($(choice).attr('val'));
    });
  });

})(jQuery)
