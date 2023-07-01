$(function () {

  // 헤더 뉴스 막대 슬라이드 위로 회전
  var currentNews = 0;
  var newsdata = $(".news_data>li");
  var news_up;

  function set() {
    news_up = setInterval(function () {
      var prevN = newsdata.eq(currentNews);
      move(prevN, 0, "-100%");
      currentNews++;
      if (currentNews == newsdata.size()) {
        currentNews = 0;
      }
      var nextN = newsdata.eq(currentNews);
      move(nextN, "100%", 0);
    }, 2500);
  }

  set();

  function move(target, start, end) {
    target.css("top", start).stop().animate({
        top: end,
      },
      800
    );
  }

  // 뉴스에 호버하면 일시정지
  $(".news_data").hover(
    function () {
      clearInterval(news_up);
    },
    function () {
      set();
    }
  );

  //날씨 정보
  $.getJSON('https://api.openweathermap.org/data/2.5/weather?lat=37.2992437&lon=126.9782357&appid=931cf418021445795381368f79037456&units=Metric', function (data) {

    var $cTemp = data.main.temp; /* 현재온도 */
    var now = new Date(Date.now());
    var b = now.getDay();
    switch (b) {
      case 0:
        c = "일"
        break

      case 1:
        c = "월"
        break

      case 2:
        c = "화"
        break

      case 3:
        c = "수"
        break

      case 4:
        c = "목"
        break

      case 5:
        c = "금"
        break

      case 6:
        c = "토"
        break
    }

    let weatherIcon = { /* 요일 가져오기 */
      '01': 'wi wi-day-sunny',
      '02': 'wi wi-day-cloudy',
      '03': 'wi wi-cloud',
      '04': 'wi wi-cloudy',
      '09': 'wi wi-day-rain-mix',
      '10': 'wi wi-showers',
      '11': 'wi wi-thunderstorm',
      '13': 'wi wi-snowflake-cold',
      '50': 'wi wi-smog'
    }

    var month = now.getMonth() + 1;
    var $cDate = month + "월 " + now.getDate() + "일 " + c + "요일 ";
    var $wIcon = (data.weather[0].icon).substr(0, 2);

    $('.ctemp').append($cTemp + '℃');
    $('.cicon').append('<i class="' + weatherIcon[$wIcon] + '"></i>');
    $('.date').prepend($cDate);

  })

  // 메인 메뉴 슬라이드 업다운
  $(".main_menu_list").mouseenter(function () {
    $(this).find(".sub_menu").stop().slideDown("slow");
  });

  $(".main_menu_list").mouseleave(function () {
    $(this).find(".sub_menu").stop().slideUp("fast");
  });


  // 내비게이션 스크롤 이동시 fixTop 클래스
  function navi1() {
    const header = document.querySelector('nav');
    const headerheight = header.clientHeight;
    document.addEventListener('scroll', onScroll, {
      passive: true
    });

    function onScroll() {
      const scrollposition = pageYOffset;
      const nav = document.querySelector('nav');
      if (headerheight <= scrollposition) {
        nav.classList.add('fixTop')
      } else {
        nav.classList.remove('fixTop');
      }
    }
  }
  navi1()

  //SNS icon 호버(말풍선)
  $("#banner_ico4>a").hover(
    function () {
      $(this).find("em").stop().css("visibility", "visible");
    },
    function () {
      $(this).find("em").stop().css("visibility", "hidden");
    }
  );

  // 미니배너(pop-up zone)
  // 자동으로 슬라이드
  slider1();

  function slider1() {
    popSlide = setInterval(function () {
      $(".popup").animate({
          marginLeft: "-100%",
        },
        function () {
          $(".popup").find("li:first-child").appendTo(".popup");
          $(".popup").css({
            marginLeft: "0",
          });
        }
      );
    }, 2000);
  }

  // 호버했을때 정지
  $(".pop_wrap").on({
    mouseover: function () {
      clearInterval(popSlide);
    },
    mouseout: function () {
      slider1();
    },
  });

  // 유관기관 홈페이지 링크 토글
  $("#links1>.dropdown_btn").on('click', function () {
    $("#dm1").stop().slideToggle("fast");
    $('.moreL').toggleClass("active");
  });

  // 패밀리사이트 링크 토글
  $("#links2>.dropdown_btn").on('click', function () {
    $("#dm2").stop().slideToggle("fast");
    $('.moreR').toggleClass("active");
  });

  //하단 링크 슬라이드 배너
  //배너 자동 회전
  var slide1 = $(".scBannerWrap>ul.scBanner");
  var slideListWidth1 = $(".scBannerWrap>ul.scBanner>li").width();
  var setInterval03;

  mainSlide1();

  function mainSlide1() {
    setInterval03 = setInterval(function () {
      slide1.stop().animate({
          left: -slideListWidth1,
        },
        500,
        function () {
          $("ul.scBanner>li:first").insertAfter("ul.scBanner>li:last");
          slide1.css("left", 0);
        }
      );
    }, 2000);
  }

  $(".scBanner, .arrowL, .arrowR").hover(
    function () {
      clearInterval(setInterval03);
    },
    function () {
      mainSlide1();
    }
  );

  //화살표버튼 클릭하면,
  //왼쪽에서 오른쪽으로 한 칸씩 이동
  function prev1_1() {
    $("ul.scBanner>li:last").insertBefore("ul.scBanner>li:first");
    slide1.css("left", -slideListWidth1);
    slide1.animate({
        left: 0,
      },
      500
    );
  }

  //오른쪽에서 왼쪽으로 한 칸씩 이동
  function next1_1() {
    $("ul.scBanner>li:first").insertAfter("ul.scBanner>li:last");
    slide1.css("left", slideListWidth1);
    slide1.animate({
        left: 0,
      },
      500
    );
  }

  $(".arrowR").click(function () {
    prev1_1();
  });
  $(".arrowL").click(function () {
    next1_1();
  });
});