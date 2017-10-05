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

const scrollToPos = (scrollTo, durat, addDistance) => {
  if (typeof scrollTo === 'object') {
    scrollTo = $(scrollTo).offset().top + addDistance;
  }
  $('.arrow').click(function() {
    $('html, body').animate({
      scrollTop: scrollTo
    }, durat)
  })
}

//
// ANIMATIONS:
//
const isElementInViewport = (elem, animateSveralTimes) => {
    let $elem = $(elem);

    const viewportTop = ($('html').scrollTop()) ? $('html').scrollTop() : $('body').scrollTop();
    const viewportBottom = viewportTop + $(window).height();

    const elemTop = Math.round($elem.offset().top);
    const elemBottom = elemTop + $elem.height();

    if (animateSveralTimes) {
      if ($elem.hasClass('anim-again')) {
        const distanceToAnimElWhenNeccesToStart = 60;
        return ((elemTop - distanceToAnimElWhenNeccesToStart < viewportBottom) &&
          (elemBottom + distanceToAnimElWhenNeccesToStart > viewportTop));
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

// 
// ** I use bootstrap 3 in this page => reason why can't init 
const initElHeightByMaxWidth = (elementsClass) => {
  let elemsForChange = document.querySelectorAll('.' + elementsClass);
  const findHighestSize = () => {
    // **if elemsForChange box-sizing === border box ,    else {el.offsetHeight -findPadVert(el))**
    let workContentHeight = [].map.call(elemsForChange, el => el.offsetHeight)
    return Math.max(...workContentHeight)
  }

  let pointsToResizeWisdth = [{ min: 0, max: 767 },
    { min: 768, max: 991 },
    { min: 992, max: 1199 },
    { min: 1200, max: Infinity }
  ];

  pointsToResizeWisdth.map((el, i) => el.index = i)

  let viewWidthNow;
  viewWidthNow = window.innerWidth;
  const findPoint = () => {
    let index;
    pointsToResizeWisdth.forEach((el) => {
      if (el.min <= viewWidthNow && viewWidthNow <= el.max) {
        index = el.index;
        return
      }
    })
    return index
  }
  let point = findPoint()
  let maxSize = findHighestSize();

  const makeMaxSize = (elemsForChange, maxSize) => {
    Array.prototype.forEach.call(elemsForChange, (el) => {
      el.style.height = maxSize + 'px';
    })
  }

  if (point !== 0) {
    makeMaxSize(elemsForChange, maxSize)
  }

  $(window).resize(() => {
    viewWidthNow = window.innerWidth;
    let pointNow = findPoint();

    if (point !== pointNow) {
      if (pointNow === 0) {
        $(elemsForChange).css('height', 'auto');
      } else {
        $(elemsForChange).css('height', 'auto');
        maxSize = findHighestSize()
        makeMaxSize(elemsForChange, maxSize)
      }
      point = pointNow;
    }
  })

}


$(function() {
  initHeightByOtherEl($('.jumbotron'), $(window), 0, $('.arrow__wrap'))
  scrollToPos($('.work__wrap'), 500, 4)
  initElHeightByMaxWidth('work__content')

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
  })
})