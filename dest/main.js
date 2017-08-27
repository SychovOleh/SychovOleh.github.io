const findMargVert = (el) => {
  return Number($(el).css('margin-top').replace('px', '')) + Number($(el).css('margin-bottom').replace('px', ''));
}
const findPadVert = (el) => {
  return Number($(el).css('padding-top').replace('px', '')) + Number($(el).css('padding-bottom').replace('px', ''));
}

const heightSizingByPad = (sizingEl, relativeWhich, offsetRelatMiddleView = 0, addingsToChangingEl = 0) => {
  // sizingEl: ELEMENT. That will change height
  // relativeWhich: ELEMENT or NUMBER(heght-size)
  // offsetRelatMiddleView: NUMBER. Shift sizingEl by vertical. if +N => shift top/ if -N => bot.
  // addingsToChangingEl: NUMBER. Shift to top or bot.
  let relativeH;
  if (typeof relativeWhich === 'number') {
    relativeH = relativeWhich;
  } else { relativeH = $(relativeWhich).height() }

  if (offsetRelatMiddleView === null) offsetRelatMiddleView = 0;

  if (typeof addingsToChangingEl === 'object') {
    addingsToChangingEl = $(addingsToChangingEl).height() +
      findPadVert(addingsToChangingEl) + findMargVert(addingsToChangingEl);
  }
  const futureH = $(sizingEl).height() + addingsToChangingEl;

  const differH = relativeH - futureH;
  $(sizingEl).css({
    paddingTop: differH / 2 - offsetRelatMiddleView,
    paddingBottom: differH / 2 + offsetRelatMiddleView,
  })
}

$(function() {
  heightSizingByPad($('.jumbotron'), $(window), 20)
    // let a = $('#work').offset().top;
})