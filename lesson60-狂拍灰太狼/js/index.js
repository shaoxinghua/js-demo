$(function () {
    // 点击游戏规则
    $('.rules').click(function () {
        $('.rule').stop().fadeIn(100);
    });
    // 点击关闭按钮
    $('.close').click(function () {
        $('.rule').stop().fadeOut(100);
    });


    // 点击开始按钮
    $('.start').click(function () {
        $(this).stop().fadeOut(100);
        // 调用处理进度条的方法
        progressHandler();
        // 调用处理灰太狼动画的方法
        startWolfAnmation();
    });

    // 点击重新开始按钮
    $('.restart').click(function () {
        $('.mask').stop().fadeOut(100);
        // 调用处理进度条的方法
        progressHandler();
        // 调用处理灰太狼动画的方法
        startWolfAnmation();
    });

    // 处理进度条的方法
    function progressHandler() {
        $('.progress').width(180);
        var timer = setInterval(function () {
            var pW = $('.progress').width();
            pW -= 1;
            if (pW <= 0) {
                clearInterval(timer);
                $('.mask').stop().fadeIn(100);

                // 停止动画
                stopWolfAnmation();
            }

            $('.progress').width(pW);
        }, 50);
    }

    // 处理灰太狼的方法
    var wolftimer;
    function startWolfAnmation() {
        // 定义两个数组保存所有灰太狼和小灰灰的图片
        var wolf_1=['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png','./images/h5.png','./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
        var wolf_2=['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png','./images/x5.png','./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
        // 定义一个数组保存所有可能出现的位置的图片
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];

        // 创建一个图片
        var $img = $("<img src='' class='wolfImg'>");
        var index = Math.round(Math.random()*8);
        $img.css({
            'position':'absolute',
            'left':arrPos[index].left,
            'top':arrPos[index].top
        });


        window.wolfIndex=0;
        window.wolfEnd=5;
        var wolf = Math.round(Math.random())==0 ? wolf_1:wolf_2;
         wolftimer = setInterval(function () {
            wolfIndex++;
            if(wolfIndex>wolfEnd){
                $img.remove();
                clearInterval(wolftimer);
                startWolfAnmation();
            }
            $img.attr('src',wolf[wolfIndex]);
        },300);

        $('.container').append($img);

        // 调用处理游戏规则的方法
        gameRules($img);
    }

    // 停止动画的方法
    function stopWolfAnmation() {
        $('.wolfImg').remove();
        clearInterval(wolftimer);
    }

    // 处理游戏规则的方法
    function gameRules($img) {
        $img.one('click',function(){
            window.wolfIndex=5;
            window.wolfEnd=9;
            var $src = $(this).attr('src');
            var $result = $src.indexOf('h')>0;
            if($result){
                $('.score').text(parseInt($('.score').text())+10);
            }else{
                $('.score').text(parseInt($('.score').text())-10);
            }
        });
    }
})