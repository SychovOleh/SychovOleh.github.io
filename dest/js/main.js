'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var findMargVert = function findMargVert(el) {
  return Number($(el).css('margin-top').replace('px', '')) + Number($(el).css('margin-bottom').replace('px', ''));
};
var findPadVert = function findPadVert(el) {
  return Number($(el).css('padding-top').replace('px', '')) + Number($(el).css('padding-bottom').replace('px', ''));
};

var heightSizingByPad = function heightSizingByPad(sizingEl, relativeWhich) {
  var offsetRelatMiddleView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var addingsToChangingEl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  // sizingEl: ELEMENT. That will change height
  // relativeWhich: ELEMENT or NUMBER(heght-size)
  // offsetRelatMiddleView: NUMBER. Shift sizingEl by vertical. if +N => shift top/ if -N => bot.
  // addingsToChangingEl: NUMBER. Shift to top or bot.
  var relativeH = void 0;
  if (typeof relativeWhich === 'number') {
    relativeH = relativeWhich;
  } else {
    relativeH = $(relativeWhich).height();
  }

  if (offsetRelatMiddleView === null) offsetRelatMiddleView = 0;
  if ((typeof addingsToChangingEl === 'undefined' ? 'undefined' : _typeof(addingsToChangingEl)) === 'object') {
    addingsToChangingEl = $(addingsToChangingEl).height() + findPadVert(addingsToChangingEl) + findMargVert(addingsToChangingEl);
    relativeH -= addingsToChangingEl;
  }
  var futureH = $(sizingEl).height();

  var differH = relativeH - futureH;
  $(sizingEl).css({
    paddingTop: differH / 2 - offsetRelatMiddleView,
    paddingBottom: differH / 2 + offsetRelatMiddleView
  });
};
var scrollToPos = function scrollToPos(scrollTo, durat) {
  if ((typeof scrollTo === 'undefined' ? 'undefined' : _typeof(scrollTo)) === 'object') {
    scrollTo = $(scrollTo).offset().top;
  }
  $('.arrow').click(function () {
    $("html, body").animate({
      scrollTop: scrollTo
    }, durat);
  });
};

$(function () {
  heightSizingByPad($('.jumbotron'), $(window), 0, $('.arrow__wrap'));
  scrollToPos($('#work'), 600);
});