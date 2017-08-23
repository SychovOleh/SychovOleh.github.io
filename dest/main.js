// console.log($)
$(function() {
  // debugger
  let imgPaddWidth = Number($('.work__img').eq(0).css('padding-right').replace('px', '')) +
    Number($('.work__img').eq(0).css('padding-left').replace('px', ''));
  let contWidth = $('.work__img').eq(0).width();
  $('.work__img').css('height', (contWidth + imgPaddWidth) * .5625); // images aspect ratio 16:9
})