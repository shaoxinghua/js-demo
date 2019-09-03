$(function () {
    // 0.初始化滚动条
    $(".content-list").mCustomScrollbar();
    // 播放器
    var $audio= $('audio');
    var player = new Player($audio);

    // 进度条
     var $progressBar = $('.music-progress-bar');
     var $progressLine = $('.music-progress-line');
     var $progressDot = $('.music-progress-dot');
     var progress = new Progress($progressBar,$progressLine,$progressDot);
      progress.progressClick();
      progress.progressMove();

    // 1.动态加载歌曲列表
    getPlayList();
    function getPlayList(){
        $.ajax({
            url:'./source/musiclist.json',
            dataType:'json',
            success:function (data) {
                player.musicList = data;
                var $ul = $('.content-list ul');
                $.each(data,function (index, ele) {
                    var $item = createItem(index,ele);
                    // console.log($item.get(0).index);
                    $ul.append($item);
                });
                initMusicInfo(data[0]);

            },
            error:function (e) {
                console.log(e);
            }

        })
    }

    // 初始化歌曲信息
    function initMusicInfo(music){
     $('.song-info-pic img').attr('src',music.cover);
     $('.song-info-name a').text(music.name);
     $('.song-info-singer a').text(music.singer);
     $('.song-info-ablum a').text(music.album);
     $('.music-progress-name').text(music.name+"/"+music.singer);
     $('.music-progress-time').text("00:00/"+music.time);
     $('.mask-bg').css('background',"url("+music.cover+") no-repeat 0 0")
    }

    // 2.监听鼠标的移入移出
    $('.content-list').delegate('.list-music','mouseenter',function () {
        // 显示子菜单
        $(this).find('.list-menu').stop().fadeIn(100);
        $(this).find('.list-time a').stop().fadeIn(100);
        // 隐藏时长
        $(this).find('.list-time span').stop().fadeOut(100);
    })
    $('.content-list').delegate('.list-music','mouseleave',function () {
        // 隐藏子菜单
        $(this).find('.list-menu').stop().fadeOut(100);
        $(this).find('.list-time a').stop().fadeOut(100);
        // 显示时长
        $(this).find('.list-time span').stop().fadeIn(100);
    });

    // 3.监听歌曲的点击
    $('.content-list').delegate('.list-music .list-check i','click',function () {
        $(this).toggleClass('list-checked');
    });

    // 4.播放图标的切换
    $('.content-list').delegate('.list-menu a:nth-child(1)','click',function () {
        var $item = $(this).parents('.list-music');

        // 4.1
        $(this).toggleClass('list-play2');
        $item.siblings().find('.list-menu a:nth-child(1)').removeClass('list-play2');

        // 4.2 同步底部的播放按钮
       if($(this).attr('class').indexOf('list-play2')!=-1){
           // 当前子菜单是播放状态
           $('.music-play').addClass('music-play2');
           // 让文字高亮
           $item.find('div').css('color','#fff');
           $item.siblings().find('div').css('color','rgba(255,255,255,.5)');
       }else{
           // 当前子菜单是暂停状态
           $('.music-play').removeClass('music-play2');
           // 让文字不高亮
           $item.find('div').css('color','rgba(255,255,255,.5)');
       }

       // 4.3 同步音乐序号
        $item.find('.list-number').toggleClass('list-number2');
        $item.siblings().find('.list-number').removeClass('list-number2')


        // 4.4 播放音乐
        player.playMusic($item.get(0).index,$item.get(0).music);

        initMusicInfo($item.get(0).music);
    })

    // 5.监听底部播放按钮的点击
    $('.music-play').click(function () {

        if(player.currentIndex == -1){
            // 从来没有播放过音乐，从0开始播放
            $('.list-music').eq(0).find('.list-menu a:nth-child(1)').trigger('click');
        }else {
            // 播放过音乐
            $('.list-music').eq(player.currentIndex).find('.list-menu a:nth-child(1)').trigger('click');
        }

        });

    // 6.监听底部上一首按钮的点击
    $('.music-pre').click(function () {
        $('.list-music').eq(player.preIndex()).find('.list-menu a:nth-child(1)').trigger('click');
    });
    // 7.监听底部下一首按钮的点击
     $('.music-next').click(function () {
         $('.list-music').eq(player.nextIndex()).find('.list-menu a:nth-child(1)').trigger('click');
     });

     // 8.监听删除按钮的点击
     $('.content-list').delegate('.list-time a','click',function () {
         var $item = $(this).parents('.list-music');
         // 判断当前音乐是否正在播放
         if($item.get(0).index==player.currentIndex){
             $('.music-next').trigger('click');
         }
         // 前台删数据
         $item.remove();
         // 后台删数据
         player.changeMusic($item.get(0).index);

         // 重新排序
         $('.list-music').each(function (index,ele) {
             ele.index = index;
             $(ele).find('.list-number').text(index+1);
         })

     });

     // 9.监听播放时间的同步

    player.musicTimeUpdate(function (duration,currentTime,timestr) {
        // 同步时间
        $('.music-progress-time').text(timestr);
        // 同步进度条
        // 计算播放比例
        var value = currentTime/duration*100;
        progress.setProgress(value);

    });




    // 创建播放列表的方法
    function createItem(index,music) {
        var $item =$(" <li class=\"list-music\">\n" +
            "                        <div class=\"list-check\">\n" +
            "                            <i></i>\n" +
            "                        </div>\n" +
            "                        <div class=\"list-number\">"+(index+1)+"</div>\n" +
            "                        <div class=\"list-name\">"+music.name+"\n" +
            "                            <div class=\"list-menu\">\n" +
            "                            <a href=\"javascript:;\" title=\"播放\"></a>\n" +
            "                            <a href=\"javascript:;\" title=\"添加\"></a>\n" +
            "                            <a href=\"javascript:;\" title=\"下载\"></a>\n" +
            "                            <a href=\"javascript:;\" title=\"分享\"></a>\n" +
            "                             </div>\n" +
            "                        </div>\n" +
            "                        <div class=\"list-singer\">"+music.singer+"</div>\n" +
            "                        <div class=\"list-time\">\n" +
            "                            <span>"+music.time+"</span>\n" +
            "                            <a href=\"javascript:;\" title=\"删除\"></a>\n" +
            "                        </div>\n" +
            "                    </li>");

        $item.get(0).index = index;
        $item.get(0).music = music;

        return $item;
    }






})
