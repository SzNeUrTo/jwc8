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
var current = -10;
setInterval(function(){
  var top = window.pageYOffset;
  if(current == top)
  return;
  if(top < ($('.whatis').offset().top-130) ){
    $('.navigation').animate({
      opacity: 0
    },400);
  }else{
    $('.navigation').animate({
      opacity: 100
    },400);
  }
  current = top;
},500);
