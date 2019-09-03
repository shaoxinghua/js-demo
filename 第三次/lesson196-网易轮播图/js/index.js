window.onload = function (ev) {
    var slider = document.getElementsByClassName('slider')[0];
    var slider_main = document.getElementsByClassName('slider-main')[0];
    var pics = slider_main.children;
    var ctr = document.getElementsByClassName('slider-ctr')[0];
    var icons = document.getElementsByClassName('slider-icon');
    var isNow = 0;
    // 让图片归位
    for(var i =1;i<pics.length;i++){
        pics[i].style.left = '310px';
    }

    for(var j = 0;j<ctr.children.length;j++ ){
        ctr.children[j].num = j;
        ctr.children[j].onclick = function () {
            if(this.className ==='slider-prev'){
                // 左边按钮（上一个）
                /*
                        1.当前可视区域的图片快速右移;
                        2.上一张图片快速出现在可视区域的左边
                        3.让这张图片做动画进入
                       */
                buffer(pics[isNow],{'left':310});
                isNow--;
                if(isNow <0){
                    isNow =5;
                }
                pics[isNow].style.left ='-310px';
                buffer(pics[isNow],{'left':0});
            }else if(this.className ==='slider-next'){
                // 右边按钮（下一个）
                    /*
                     1.当前可视区域的图片快速左移;
                     2.下一张图片快速出现在可视区域的右边
                     3.让这张图片做动画进入
                     */
                autoplay();
            }else {
                /*
                    1.用当前点击的索引和选中索引对比
                    2.点击的 > 选中的, 相当于点击了右边的按钮
                    3.点击的 < 选中的, 相当于点击了左边的按钮
                   */
                 for(var i =0;i<icons.length;i++){
                      icons[i].className = 'slider-icon';
                 }
                 this.className = 'slider-icon current';

                 if(this.num-1>isNow){
                     buffer(pics[isNow],{'left':-310});
                     pics[this.num-1].style.left ='310px';
                 }else {
                     buffer(pics[isNow],{'left':310});
                     pics[this.num-1].style.left ='-310px';
                 }
                isNow =this.num-1;
                buffer(pics[isNow],{'left':0});

            }
        }
        }

    // 自动轮播图
    /*
    1.当前可视区域的图片快速左移;
    2.下一张图片快速出现在可视区域的右边
    3.让这张图片做动画进入
    */
    function autoplay() {
        buffer(pics[isNow],{'left':-310});
        isNow++;
        if(isNow >5){
            isNow =0;
        }
        pics[isNow].style.left ='310px';
        buffer(pics[isNow],{'left':0});
    }
    var timer = setInterval(autoplay,1000);

    slider.onmouseover = function () {
        clearInterval(timer);
    }
    slider.onmouseout = function () {
        timer = setInterval(autoplay,1000);
    }



    }



