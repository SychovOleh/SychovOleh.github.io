const findMargVert = (el) => {
  return Number($(el).css('margin-top').replace('px', '')) + Number($(el).css('margin-bottom').replace('px', ''));
}
const findPadVert = (el) => {
  return Number($(el).css('padding-top').replace('px', '')) + Number($(el).css('padding-bottom').replace('px', ''));
}

const initHeightByOtherEl = (sizingEl, relativeWhich, offsetRelatMiddleView = 0, addingsToChangingEl = 0) => {
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
    relativeH -= addingsToChangingEl;
  }

  $(sizingEl).height(relativeH)
}
const scrollToPos = (scrollTo, durat) => {
  if (typeof scrollTo === 'object') {
    scrollTo = $(scrollTo).offset().top;
  }
  $('.arrow').click(function() {
    $("html, body").animate({
      scrollTop: scrollTo
    }, durat)
  })
}

// 
// 
// ANIMATIONS:
const isElementInViewport = (elem, animateSveralTimes) => {
    let $elem = $(elem);

    let viewportTop = ($('html').scrollTop()) ? $('html').scrollTop() : $('body').scrollTop();
    let viewportBottom = viewportTop + $(window).height();

    let elemTop = Math.round($elem.offset().top);
    let elemBottom = elemTop + $elem.height();

    if (animateSveralTimes) {
      if ($elem.hasClass('anim-again')) {
        return ((elemTop - 60 < viewportBottom) && (elemBottom + 60 > viewportTop));
      }
      $elem.addClass('anim-again')
    }

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
  }
  // Check if it's time to start the animation.
const checkAnimation = (animationTarget, animateSveralTimes) => {

  let $elem = $(animationTarget);

  // For playing animation every time when scroll to el again
  if (animateSveralTimes) {
    if ($elem.hasClass('animate') && !isElementInViewport($elem, true)) {
      $elem.removeClass('animate');
      $elem.css('opacity', '0')
    }
    if (isElementInViewport($elem, true)) {
      $elem.addClass('animate');
      $elem.css('opacity', '1')
    }
    return;
  }

  if ($elem.hasClass('animate')) { return };

  if (isElementInViewport($elem)) {
    $elem.addClass('animate');
    $elem.css('opacity', '1')
  } else {
    $elem.css('opacity', '0')
  }
}
$(window).scroll(() => {
  checkAnimation('.title-jun', true);
  checkAnimation(document.querySelector('.w1'));
  checkAnimation(document.querySelector('.w2'));
  checkAnimation(document.querySelector('.w3'));
  checkAnimation(document.querySelector('.w4'));
  checkAnimation(document.querySelector('.w5'));
  checkAnimation(document.querySelector('.w6'));
})

$(function() {
  initHeightByOtherEl($('.jumbotron'), $(window), 0, $('.arrow__wrap'))
  scrollToPos($('#work'), 600)

  //  Animations:
  let jumbo = document.querySelector('.title-jun');

  $(window).on('load', () => {
    checkAnimation(jumbo);
    checkAnimation(document.querySelector('.w1'));
    checkAnimation(document.querySelector('.w2'));
    checkAnimation(document.querySelector('.w3'));
    checkAnimation(document.querySelector('.w4'));
    checkAnimation(document.querySelector('.w5'));
    checkAnimation(document.querySelector('.w6'));
    $('body').addClass('loaded');
  })
})