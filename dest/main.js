(function() {
  const jumboSizing = () => {
    let viewH = $(window).height();
    let jumboH = $('.jumbotron').height();
    let differH = viewH - jumboH;
    $('.jumbotron').css({
      paddingTop: differH / 2 - 20,
      paddingBottom: differH / 2 + 20,
    })
  }
  window.jumboSizing = jumboSizing;

})()

$(function() {
  jumboSizing();
})