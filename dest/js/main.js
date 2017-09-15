'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

var scrollToPos = function scrollToPos(scrollTo, durat, addDistance) {
  if ((typeof scrollTo === 'undefined' ? 'undefined' : _typeof(scrollTo)) === 'object') {
    scrollTo = $(scrollTo).offset().top + addDistance;
  }
  $('.arrow').click(function () {
    $("html, body").animate({
      scrollTop: scrollTo
    }, durat);
  });
};

//
// ANIMATIONS:
//
var isElementInViewport = function isElementInViewport(elem, animateSveralTimes) {
  var $elem = $(elem);

  var viewportTop = $('html').scrollTop() ? $('html').scrollTop() : $('body').scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  var elemTop = Math.round($elem.offset().top);
  var elemBottom = elemTop + $elem.height();

  if (animateSveralTimes) {
    if ($elem.hasClass('anim-again')) {
      var distanceToAnimElWhenNeccesToStart = 60;
      return elemTop - distanceToAnimElWhenNeccesToStart < viewportBottom && elemBottom + distanceToAnimElWhenNeccesToStart > viewportTop;
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

// 
var initElHeightByMaxWidth = function initElHeightByMaxWidth(elementsClass) {
  var elemsForChange = document.querySelectorAll('.' + elementsClass);
  var findHighestSize = function findHighestSize() {
    // **if elemsForChange box-sizing === border box ,    else {el.offsetHeight -findPadVert(el))**
    var workContentHeight = [].map.call(elemsForChange, function (el) {
      return el.offsetHeight;
    });
    return Math.max.apply(Math, _toConsumableArray(workContentHeight));
  };

  var pointsToResizeWisdth = [{ min: 0, max: 767 }, { min: 768, max: 991 }, { min: 992, max: 1199 }, { min: 1200, max: Infinity }];

  pointsToResizeWisdth.map(function (el, i) {
    return el.index = i;
  });

  var viewWidthNow = void 0;
  viewWidthNow = window.innerWidth;
  var findPoint = function findPoint() {
    var index = void 0;
    pointsToResizeWisdth.forEach(function (el) {
      if (el.min <= viewWidthNow && viewWidthNow <= el.max) {
        index = el.index;
        return;
      }
    });
    return index;
  };
  var point = findPoint();
  var maxSize = findHighestSize();

  var makeMaxSize = function makeMaxSize(elemsForChange, maxSize) {
    Array.prototype.forEach.call(elemsForChange, function (el) {
      el.style.height = maxSize + 'px';
    });
  };

  if (point !== 0) {
    makeMaxSize(elemsForChange, maxSize);
  }

  $(window).resize(function () {
    viewWidthNow = window.innerWidth;
    var pointNow = findPoint();

    if (point !== pointNow) {
      if (pointNow === 0) {
        $(elemsForChange).css('height', 'auto');
      } else {
        $(elemsForChange).css('height', 'auto');
        maxSize = findHighestSize();
        makeMaxSize(elemsForChange, maxSize);
      }
      point = pointNow;
    }
  });
};

$(function () {
  initHeightByOtherEl($('.jumbotron'), $(window), 0, $('.arrow__wrap'));
  scrollToPos($('.work__wrap'), 500, 4);
  initElHeightByMaxWidth('work__content');

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
  });
});