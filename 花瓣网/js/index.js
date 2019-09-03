window.onload = function (ev) {
    bannerAutoPlay();

    // 自动轮播
    function bannerAutoPlay() {
        var slider_ban = document.getElementsByClassName('slider-banner')[0];
        var ul = slider_ban.children[0];
        var allis = ul.children;

        var c = 0;
        setInterval(function () {
            c++;
            if (c >= allis.length) {
                c = 0;
            }
            for (var i = 0; i < allis.length; i++) {
                // console.log(allis[i]);
                buffer(allis[i], {'opacity': 0});
            }
            buffer(allis[c], {'opacity': 1});
        }, 2000);

    }

    // 吸顶效果
    var top_nav = document.getElementsByClassName('top-nav')[0];
    // var type = document.getElementsByClassName('type-title')[0];
    // console.log(tab.offsetTop);
    var el = document.getElementsByClassName('elevator')[0];
    // console.log(el);
    window.onscroll = function (ev1) {
        if (scroll().top >=150) {
            top_nav.style.display = 'block';
            el.style.display = 'block';
        } else {
            top_nav.style.display = 'none';
            el.style.display = 'none';
        }


        // 动态加载图片
        if(checkDownLoad()){
            autoCreateImg();
            waterFull();
        }

        // 回到顶部

        el.onclick = function () {
            // alert(0);
            buffer(document.documentElement,{scrollTop:0},null);
        }

    }

    // tab选项卡
    var tab_h = document.getElementsByClassName('tab-header')[0];
    var allis = tab_h.children[0].children;
    var doms = document.getElementsByClassName('dom');
    // console.log(allis);
    for (var i = 0; i < allis.length; i++) {
        (function (i) {
            allis[i].onclick = function () {
                for (var j = 0; j < allis.length; j++) {
                    allis[j].className = '';
                    doms[j].style.display = 'none';
                }
                this.className = 'current';
                doms[i].style.display = 'block';
            }
        })(i);
    }

    // 动态创建标签
    autoCreateImg();
    function autoCreateImg() {
        var json = [
            {txt: '当我们正在为生活疲于奔命的时候，生活已经离我们而去。——约翰·列侬', pic: 'images/0.jpg'},
            {txt: '活在世上，不必什么都知道，只知道最好的就够了。——王小波', pic: 'images/1.jpg'},
            {txt: '世界上任何书籍都不能带给你好运，但是它们能让你悄悄变成你自己。——黑塞', pic: 'images/2.jpg'},
            {txt: '很多人不需要再见，只是路过而已。——《彼岸花》', pic: 'images/3.jpg'},
            {txt: '人生最困难的三件事：保守秘密，忘掉所受的创伤，充分利用余暇。——吉罗', pic: 'images/4.jpg'},
            {txt: '有些人是离开后，才会发觉那个人是最喜欢的。——《东邪西毒》', pic: 'images/5.jpg'},
            {txt: '我总是在日暮时分,书影与书影之间,宁静的悲哀里,最想念你。——亦舒', pic: 'images/6.jpg'},
            {txt: '再长的路，一步步地能走完，再短的路，不迈开双脚也无法到达。', pic: 'images/7.jpg'},
            {txt: '哪里会有人喜欢孤独，不过是不喜欢失望。——村上春树', pic: 'images/8.jpg'},
            {txt: '人时已尽，人世很长，我在中间，应当休息。——顾城', pic: 'images/9.jpg'},
            {txt: '信任的深浅，不在于会不会对你笑，而在于愿不愿意在你面前哭。', pic: 'images/10.jpg'},
            {txt: '有一种旅行，不为跋涉千里的向往，只为漫无目的的闲逛，不为人山人海的名胜，只为怡然自乐的街景...', pic: 'images/11.jpg'},
            {txt: '人都会孤独，但唯独他，可以越过这尘世的热闹，一眼明白这世间所有的繁华不过是他身边的过眼云烟。', pic: 'images/12.jpg'},
            {txt: '不乱于心，不困于情。不畏将来，不念过往。如此，安好。', pic: 'images/13.jpg'},
            {txt: '每一个人都需要这样一个朋友：当以为自己再也笑不出来的时候，他能让你开怀大笑！', pic: 'images/14.jpg'},
            {txt: '咖啡苦与甜，不在于怎么搅拌，而在于是否放糖；一段伤痛，不在于怎么忘记，而在于是否有勇气重新开始。', pic: 'images/15.jpg'},
            {txt: '其实我不是一定要等你，只是等上了，就等不了别人了。——《朝露若颜》', pic: 'images/16.jpg'},
            {txt: '一切都是瞬间，一切都会过去，一切过去了的都会变成亲切的怀念。——普希金', pic: 'images/17.jpg'},
            {txt: '多少人曾爱慕你年轻时的容颜，可知谁愿承受岁月无情的变迁', pic: 'images/18.jpg'},
            {txt: '不在任何东西面前失去自我，哪怕是教条，哪怕是别人的目光，哪怕是爱情。——《成为简·奥斯汀》', pic: 'images/19.jpg'},
            {txt: '你如果认识从前的我，也许你会原谅现在的我。——张爱玲', pic: 'images/20.jpg'},
            {txt: '简约不是少，而是没有多余。足够也不是多，而是刚好你在。', pic: 'images/21.jpg'},
            {txt: '若只是喜欢 何必夸张成爱。——林夕', pic: 'images/22.jpg'},
            {txt: '梦里出现的人，醒来时就该去见她，生活就是这么简单。——《新桥恋人》', pic: 'images/23.jpg'},
            {txt: '与众不同的你是幸运的，何必让自己变得与别人一样。', pic: 'images/24.jpg'},
            {txt: '阳光温热，岁月静好，你还不来，我怎敢老。', pic: 'images/25.jpg'},
            {txt: '一个人知道自己为什么而活，就能忍受任何生活。——尼采', pic: 'images/26.jpg'},
            {txt: '我们已经出发了太久，以至于我们忘了为什么要出发。——纪伯伦', pic: 'images/27.jpg'},
            {txt: '水来，我在水中等你；火来，我在灰烬中等你。——《你是我的独家记忆》', pic: 'images/28.jpg'},
            {txt: '天下就没有偶然，那不过是化了妆的，戴了面具的必然。——钱钟书', pic: 'images/29.jpg'}
        ];
        var pull = document.getElementsByClassName('pull')[0];
        var str, pic, txt, strHtml;

        for (var j = 0; j < json.length; j++) {
            pic = json[j].pic;
            txt = json[j].txt;
            str = pull.innerHTML;
            strHtml = "<div class=\"box\">\n" +
                "                        <div class=\"pic\">\n" +
                "                            <img src=" + pic + " alt=\"\">\n" +
                "                            <div class=\"cover\"></div>\n" +
                "                        </div>\n" +
                "                        <p>" + txt + "</p>\n" +
                "                        <div class=\"btn-box\">\n" +
                "                            <a class=\"collect\" href=\"#\">采集</a>\n" +
                "                            <a  class=\"like\" href=\"#\">\n" +
                "                                <span class=\"heart\"></span>\n" +
                "                            </a>\n" +
                "                        </div>\n" +
                "                    </div>";
            // console.log(strHtml);
            str += strHtml;
            pull.innerHTML = str;
        }

        var box = pull.children;
        for (var i = 0; i < box.length; i++) {
            // console.log(box[j]);
            box[i].onmouseover = function () {
                this.lastElementChild.style.display = 'block';
                this.firstElementChild.lastElementChild.style.display = 'block';
            };
            box[i].onmouseout = function () {
                this.lastElementChild.style.display = 'none';
                this.firstElementChild.lastElementChild.style.display = 'none';
            };
        }
    }





    // 瀑布流布局
    setTimeout(function () {
        waterFull();
    },200);
    var allBox = document.getElementsByClassName('box');
    function waterFull() {


        var boxWidth = allBox[0].offsetWidth;
        // console.log(boxWidth);
        var screenWidth = document.documentElement.clientWidth;
        var cols = parseInt(screenWidth/boxWidth);
        // console.log(cols);
        var xyMargin =16;

        // 2.子盒子定位
        // 定义高度数组
        var heightArr =[];
        for(var i =0;i<allBox.length;i++){
            var boxHeight = allBox[i].offsetHeight+xyMargin;
            // console.log(boxHeight);
            if(i<cols){
                heightArr.push(boxHeight);
                allBox[i].style.position = 'absolute';
                allBox[i].style.left = i*(boxWidth+xyMargin) +'px';
                allBox[i].style.top = xyMargin+ 'px';


            }else {
                // 获得最小盒子的高度
                var minHeight = Math.min.apply(this,heightArr);
                // console.log(minHeight);
                // 获得最小盒子的索引
                var minIndex = index(heightArr,minHeight);
                // console.log(minIndex);

                allBox[i].style.position = 'absolute';
                allBox[i].style.left = minIndex*(boxWidth+xyMargin) +'px';
                allBox[i].style.top = minHeight+xyMargin+ 'px';
                heightArr[minIndex] += boxHeight;

            }
        }

        // 更新父盒子的高度

        var h =allBox[allBox.length-1].offsetTop+allBox[allBox.length-1].offsetHeight;
        var pull = document.getElementsByClassName('pull')[0];
        pull.style.height = h+'px';
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


    // 登录
  var header_r = document.getElementsByClassName('header-right')[0];
    var hbtn = header_r.lastElementChild;
    var mask = document.getElementsByClassName('mask')[0];
    var close = mask.children[0].firstElementChild;
    // console.log(close);

    hbtn.onclick = function () {
        mask.style.display = 'block';
    };

    close.onclick = function () {
        mask.style.display ='none';
    }


}
