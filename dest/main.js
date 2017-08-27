const heightSizingByPad = (sizingEl, relativeWhich, offsetRelatMiddleView = 0, addingsToChangingEl = 0) => {
  if (typeof addingsToChangingEl === 'object') {
    addingsToChangingEl = $(addingsToChangingEl).height();
  }
  const futureH = $(sizingEl).height() + addingsToChangingEl;

  let relativeH;
  if (typeof relativeWhich === 'number') {
    relativeH = relativeWhich;
  } else { relativeH = $(relativeWhich).height() }

  const differH = relativeH - futureH;
  $(sizingEl).css({
    paddingTop: differH / 2 - offsetRelatMiddleView,
    paddingBottom: differH / 2 + offsetRelatMiddleView,
  })
}

$(function() {
  heightSizingByPad($('.header'), $(window), 20)
    // let a = $('#work').offset().top;
})