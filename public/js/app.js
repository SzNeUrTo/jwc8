(function(window, $, wow, Pace) {

  Pace.on('done', function() {
    setTimeout(function() {
      new wow().init();
      $('#pre-loader').fadeOut();
      $('.pace').hide();
    }, 500);
  });

  $(document).ready(function() {
    var countdown = $('#countdown');
    var days = $('#days');
    var hours = $('#hours');
    var minutes = $('#minutes');
    var seconds = $('#seconds');
    var prevMinute = 0;
    countdown
      .countdown('2016/3/14')
      .on('update.countdown', function(event) {
        days.text(event.offset.totalDays);
        hours.text(event.offset.hours);
        minutes.text(event.offset.minutes);
        seconds.text(event.offset.seconds);
      });
    $('.submit').on('click', sendData());
    $('.field').keypress(function(e){
      if(e.which == 13){
          e.preventDefault();
          sendData();
      }
    });
    function sendData(){
      var email = $('.field').val();
      var m = {email: email};
        $.ajax({
          url: './',
          dataType: 'json',
          type: 'POST',
          data: m,
          success: function(){
            $('.field').val("");
            console.log("send success");
          }
        });
    }
  });
})(window, window.jQuery, window.WOW, window.Pace);
