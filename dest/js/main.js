'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var findMargVert = function findMargVert(el) {
  return Number($(el).css('margin-top').replace('px', '')) + Number($(el).css('margin-bottom').replace('px', ''));
};
var findPadVert = function findPadVert(el) {
  return Number($(el).css('padding-top').replace('px', '')) + Number($(el).css('padding-bottom').replace('px', ''));
};

var initHeightByOtherEl = function initHeightByOtherEl(sizingEl, relativeWhich) {
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

  $(sizingEl).height(relativeH);
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

// 
// 
// ANIMATIONS:
var isElementInViewport = function isElementInViewport(elem, animateSveralTimes) {
  var $elem = $(elem);

  var viewportTop = $('html').scrollTop() ? $('html').scrollTop() : $('body').scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  var elemTop = Math.round($elem.offset().top);
  var elemBottom = elemTop + $elem.height();

  if (animateSveralTimes) {
    if ($elem.hasClass('anim-again')) {
      return elemTop - 60 < viewportBottom && elemBottom + 60 > viewportTop;
    }
    $elem.addClass('anim-again');
  }

  return elemTop < viewportBottom && elemBottom > viewportTop;
};
// Check if it's time to start the animation.
var checkAnimation = function checkAnimation(animationTarget, animateSveralTimes) {

  var $elem = $(animationTarget);

  // For playing animation every time when scroll to el again
  if (animateSveralTimes) {
    if ($elem.hasClass('animate') && !isElementInViewport($elem, true)) {
      $elem.removeClass('animate');
      $elem.css('opacity', '0');
    }
    if (isElementInViewport($elem, true)) {
      $elem.addClass('animate');
      $elem.css('opacity', '1');
    }
    return;
  }

  if ($elem.hasClass('animate')) {
    return;
  };

  if (isElementInViewport($elem)) {
    $elem.addClass('animate');
    $elem.css('opacity', '1');
  } else {
    $elem.css('opacity', '0');
  }
};
$(window).scroll(function () {
  checkAnimation('.title-jun', true);
  checkAnimation(document.querySelector('.w1'));
  checkAnimation(document.querySelector('.w2'));
  checkAnimation(document.querySelector('.w3'));
  checkAnimation(document.querySelector('.w4'));
  checkAnimation(document.querySelector('.w5'));
  checkAnimation(document.querySelector('.w6'));
});

$(function () {
  initHeightByOtherEl($('.jumbotron'), $(window), 0, $('.arrow__wrap'));
  scrollToPos($('#work'), 600);

  //  Animations:
  var jumbo = document.querySelector('.title-jun');

  $(window).on('load', function () {
    checkAnimation(jumbo);
    checkAnimation(document.querySelector('.w1'));
    checkAnimation(document.querySelector('.w2'));
    checkAnimation(document.querySelector('.w3'));
    checkAnimation(document.querySelector('.w4'));
    checkAnimation(document.querySelector('.w5'));
    checkAnimation(document.querySelector('.w6'));
    $('body').addClass('loaded');
  });
});