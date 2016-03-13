$('.sub-nav, .menu-logo').on('click', function(e){
  $('.sub-nav').css('text-decoration','none');
  $(this).css('text-decoration','underline');
  var className = "."+$(this).attr('id');
  var goto = $(className).offset();
  Animate(goto.top-100);
});
function Animate(top){
  $("html, body").animate({scrollTop:top},500,'swing',function(){
  });
}
