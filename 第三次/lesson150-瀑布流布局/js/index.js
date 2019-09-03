window.onload =function (ev) {
    var main = document.getElementsByClassName('main')[0];
    var allBox = document.getElementsByClassName('box');

    waterFull();

    var timer2 = null;
    window.onscroll = function (ev1) {
        clearTimeout(timer2);
        timer2 = setTimeout(function () {
            if(checkDownLoad()){
                // 创造数据
                var data = [
                    {'src':'images/img01.jpg'},
                    {'src':'images/img03.jpg'},
                    {'src':'images/img06.jpg'},
                    {'src':'images/img08.jpg'},
                    {'src':'images/img09.jpg'},
                    {'src':'images/img12.jpg'},
                    {'src':'images/img16.jpg'},
                    {'src':'images/img26.jpg'}
                ];

                for(var i = 0;i<data.length;i++){
                    var divBox = document.createElement('div');
                    divBox.className = 'box';
                    main.appendChild(divBox);

                    var divPic = document.createElement('div');
                    divPic.className = 'pic';
                    divBox.appendChild(divPic);

                    var im = document.createElement('img');
                    im.src = data[i].src;
                    divPic.appendChild(im);
                }
                waterFull();
            }
        },200);
    }

    var timer1 = null;
    window.onresize = function (ev1) {
        clearTimeout(timer1);
        timer1 = setTimeout(function () {
            waterFull();
        },200);

    }




    // 瀑布流布局
    function waterFull() {

        //1.父盒子（ main）居中
        var boxWidth = allBox[0].offsetWidth;
        // console.log(boxWidth);
        var screenWidth = document.documentElement.clientWidth;
        var cols = parseInt(screenWidth/boxWidth);
        // console.log(cols);
        main.style.width = boxWidth*cols +'px';
        main.style.margin = '0 auto';

        // 2.子盒子定位
        // 定义高度数组
        var heightArr =[];
        for(var i =0;i<allBox.length;i++){
            var boxHeight = allBox[i].offsetHeight;
            // console.log(boxHeight);
            if(i<cols){
                heightArr.push(boxHeight);
                allBox[i].style = '';
            }else {
                // 获得最小盒子的高度
                var minHeight = Math.min.apply(this,heightArr);
                // console.log(minHeight);
                // 获得最小盒子的索引
                var minIndex = index(heightArr,minHeight);
                // console.log(minIndex);

                allBox[i].style.position = 'absolute';
                allBox[i].style.left = minIndex*boxWidth +'px';
                allBox[i].style.top = minHeight+ 'px';
                heightArr[minIndex] += boxHeight;

            }
        }
    }

    // 获得最小数的索引
    function index(arr,value) {
        for(var i =0;i<arr.length;i++){
            if(arr[i]===value){
                return i;
            }
        }
    }

    // 判断是否加载图片
    function checkDownLoad() {
            // 获得最后一张图片的高度
        var lastBox = allBox[allBox.length-1];
        var lastBoxH = lastBox.offsetHeight*0.5+ lastBox.offsetTop;
            // console.log(lastBoxH);

            var screenHeight = document.documentElement.clientHeight;

        return lastBoxH <= screenHeight+document.documentElement.scrollTop;
    }
}