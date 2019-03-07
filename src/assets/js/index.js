(function (window, undefined) {
  //检测平台
  var system = {
    win: false,
    mac: false,
    xll: false
  };
  var p = navigator.platform;
  system.win = p.indexOf("Win") == 0;
  system.mac = p.indexOf("Mac") == 0;
  system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);

  //手机版导航
  $('.header-phone').find('.menu-icon').click(function () {
    if ($('.nav-menu').is(":visible")) {
      $('.nav-menu').slideUp();
      $('body').css('overflow', 'auto');
    } else {
      $('.nav-menu').slideDown();
      $('body').css('overflow', 'hidden');
    }
  })

  // 当屏幕滑动一定距离时显示tab栏
  $(window).scroll(function (e) {
    //如果是pc端访问执行里面的逻辑
    if (system.win || system.mac || system.xll) {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 100) {
          $('.header-pc').css({
            "backgroundColor": "#fff",
            "borderBottom": '1px solid #e3e3e3'
          })
          $('.header-pc ul li a').css({"color": '#333'})
          $('.header-pc img').attr('src','assets/images/logo_black.png');
          $('.header-pc .apply-trial').css({
            "backgroundColor": "#0177FB",
            "color": '#fff'
          })
        } else if (scrollTop < 100) {
          $('.header-pc').css({
            "backgroundColor": "transparent",
            "borderBottom": 'none'
          })
          $('.header-pc ul li a').css({"color": '#fff'})
          $('.header-pc img').attr('src','assets/images/logo.png');
          $('.header-pc .apply-trial').css({
            "backgroundColor": "#fff",
            "color": '#0177FB'
          })
        }
    }
  })
})(window);