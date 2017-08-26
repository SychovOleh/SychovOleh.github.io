const heightSizingByPad = (sizingEl, regardingWhichEl, offsetRelatMiddleView = 0) => {
  let futureH = $(sizingEl).height();
  let regardingH = $(regardingWhichEl).height();
  let differH = regardingH - futureH;
  $(sizingEl).css({
    paddingTop: differH / 2 - offsetRelatMiddleView,
    paddingBottom: differH / 2 + offsetRelatMiddleView,
  }) 
}

$(function() {
  heightSizingByPad($('.jumbotron'), $(window), 20)
  let a = $('#work').offset().top;
})