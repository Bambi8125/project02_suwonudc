$(function(){

    var visual = $('#bannerImg>ul>li');
    var button = $('.countList>li');
    var leftBtn = $('.btn .prev');
    var rightBtn = $('.btn .next');
    var current = 0;
    var setIntervalId01;

    timer();

    function timer() {
        setIntervalId01 = setInterval(function () {
            var prev = visual.eq(current);
            var pn = button.eq(current);
            move(prev, 0, '-100%');
            pn.removeClass('on');

            current++;

            if (current == visual.size()) {
                current = 0
            }

            var next = visual.eq(current);
            var pnn = button.eq(current);

            move(next, '100%', 0);
            pnn.addClass('on');

        }, 4000);
    };

    function move(tg, start, end) {
        tg.css('left', start).stop().animate({
            left: end
        }, {
            duration: 500,
            ease: 'easeOutCubic'
        });
    }

    //동그라미버튼 클릭했을때 버튼컬러 바꾸기
    button.on({
        click: function () {
            var tg = $(this);
            var i = tg.index();

            button.removeClass('on');
            tg.addClass('on');

            move1(i);
        }
    })

    //버튼을 클릭하면 해당배너가 보여지게
    function move1(i) {
        if (current == i) return // return 되면서 종료, 현재의 이미지가 순번과 같다면 종료

        var currentEl = visual.eq(current);
        var nextEl = visual.eq(i)

        currentEl.css({
            left: 0
        }).stop().animate({
            left: '-100%'
        }, 500)
        nextEl.css({
            left: '100%'
        }).stop().animate({
            left: 0
        }, 500)

        current = i;

    }

    // 호버시 이미지 멈추게
    $('.banner_right').on({
        mouseover: function () {
            clearInterval(setIntervalId01)
        },
        mouseout: function () {
            timer()
        }
    })

    //화살표 양쪽 버튼 클릭시 이동
    rightBtn.click(function () {
        var prev = visual.eq(current);
        var pn = button.eq(current);
        move(prev, 0, '-100%');
        pn.removeClass('on')
        current++;

        if (current == visual.size()) {
            current = 0
        }

        var next = visual.eq(current);
        var pnn = button.eq(current)

        move(next, '100%', 0);
        pnn.addClass('on')

        return false

    })

    leftBtn.click(function () {
        var prev = visual.eq(current);
        var pn = button.eq(current);
        move(prev, 0, '100%');
        pn.removeClass('on')

        current--;

        if (current == -visual.size()) {
            current = 0
        }

        var next = visual.eq(current);
        var pnn = button.eq(current)

        move(next, '-100%', 0);
        pnn.addClass('on')

        return false

    })





});