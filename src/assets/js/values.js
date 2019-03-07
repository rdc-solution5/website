(function (window, undefined) {
    var currnLink = document.location.href;
    var startPosition = 0;
    var startBarPosition;
    var startBarWidth = 68;
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
  
    //导航高亮
    $('.header-nav').find('li').each(function () {
      var link_length = $(this).children('a').attr('href').length;
      var links = $(this).children('a').attr('href');
      if (currnLink.indexOf(links) != -1) {
        $(this).addClass('active').siblings().removeClass('active');
      }
      //关于我们
      else if (currnLink.indexOf('about') != -1) {
        $(this).parent().find('li:last-child').addClass('active');
        $(this).parent().find('li:first-child').removeClass('active');
      }
    })
  
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
  
  
    // 缓动动画
    var timer
    function animate(obj, target) {
      clearInterval(timer);
      timer = setInterval(function () {
        var leader = obj.css('left').slice(0, -2) - 0;
        var step = (target - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step;
        obj.css('left', '' + leader + 'px')
        if (target === leader) {
          clearInterval(timer);
        }
      }, 15);
    }
  
    //页面滚动缓动动画
    var scrollTimer
    function scrollAnimate(target) {
      clearInterval(scrollTimer);
      scrollTimer = setInterval(function () {
        var leader = $(window).scrollTop()
        var step = (target - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step;
        window.scrollTo(0, leader)
        if (target === leader) {
          clearInterval(scrollTimer);
        }
      }, 15);
    }
  
    //初始化箭头的位置
    if ($('.tap-box>li:nth-child(1)').offset()) {
      var initArrowPosition = $('.tap-box>li:nth-child(1)').offset().left + 135;
      $('.arrow').css('left', initArrowPosition);
    }
    // 首页tab
    var startBarPositionSign = 0;
    $('.values-tap').on('click', function () {
      if (system.win || system.mac || system.xll) {
        var type = $(this).attr('data-type');
        startBarPositionSign = type;
        var endPositoin = $(this).offset().left + 135;
        $(this).css({
          "backgroundColor": '#fff',
          "boxShadow": '0 4px 12px #DAE8F8'
        })
        //tab样式
        $.each($(this).siblings(), function (i, el) {
          $(el).css({
            "backgroundColor": '#F1F4FB',
            "boxShadow": 'none'
          })
        })
        $('.arrow').show();
        $('.arrow').css('left', endPositoin)
        //内容切换
        $('.values-content-center').removeClass('values-content-active');
        if (type == 0) {
          $('.values-employee-box').addClass('values-content-active')
        } else if (type == 1) {
          $('.values-cio-box').addClass('values-content-active')
        } else {
          $('.values-it-box').addClass('values-content-active')
        }
      }
    })
  
    //页面滚动时出现导航 tab切换
    $('.scroll-tab').on('click', function () {
      var type = $(this).attr('data-sign');
      startBarPositionSign = type;
      var endBarPosition = parseInt($(this).offset().left);
      startBarWidth = $(this).width() + 8
      $('.bottom-bar').css('width', startBarWidth)
      $.each($('.tap-box li'), function (i, el) {
        if (i == type) {
          $(el).css({
            "backgroundColor": '#fff',
            "boxShadow": '0 4px 12px #DAE8F8'
          })
        } else {
          $(el).css({
            "backgroundColor": '#F1F4FB',
            "boxShadow": 'none'
          })
        }
      })
      startBarPosition = endBarPosition;
      animate($('.bottom-bar'), endBarPosition)
      var endPosition = $('.tap-box').children().eq(type).offset().left + 135
      $('.arrow').css('left', endPosition)
      $('.values-content-center').removeClass('values-content-active');
      if (type == 0) {
        $('.values-employee-box').addClass('values-content-active')
      } else if (type == 1) {
        $('.values-cio-box').addClass('values-content-active')
      } else {
        $('.values-it-box').addClass('values-content-active')
      }
      /* window.scrollTo(0, 1710); */
      scrollAnimate(2010)
    })
    $('.scroll-tab').hover(function () {
      var endBarHoverPosition = parseInt($(this).offset().left);
      $('.bottom-bar').css('width', $(this).width() + 8);
      animate($('.bottom-bar'), endBarHoverPosition);
    })
    $('.scroll-tab').mouseleave(function () {
      $('.bottom-bar').css('width', startBarWidth);
      animate($('.bottom-bar'), startBarPosition);
    })
    //轮播图
    $('#employee-slider').flexslider({
      directionNav: false,
      slideshowSpeed: 4000,
      animationDuration: 500
    })
    // 当屏幕滑动一定距离时显示tab栏
    var isShow = false
    $(window).scroll(function (e) {
      //如果是pc端访问执行里面的逻辑
      if (system.win || system.mac || system.xll) {
        if ($('.values-content-scroll-tap').offset()) {
          var scrollTop = $(window).scrollTop();
          if (scrollTop > 2010 && !isShow) {
            $('.values-content-scroll-tap').show();
            isShow = true;
            if ($('.tap-box>li:nth-child(1)').offset()) {
              startBarWidth = $('.scroll-tab').eq(startBarPositionSign).width() + 8
              $('.bottom-bar').css('width', startBarWidth)
              startBarPosition = $('.scroll-tab').eq(startBarPositionSign).offset().left;
              animate($('.bottom-bar'), startBarPosition)
            }
          } else if (scrollTop < 2010) {
            $('.values-content-scroll-tap').hide();
            isShow = false;
          }
        }
      }
    })
  })(window);