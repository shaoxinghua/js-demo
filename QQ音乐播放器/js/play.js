(function (window) {
    function Player($audio) {
        return new Player.prototype.init($audio);
    }
    Player.prototype={
        constructor:Player,
        musicList:[],
        init:function ($audio) {
          this.$audio = $audio;
          this.audio = $audio.get(0);
        },
        currentIndex:-1,
        playMusic:function (index,music) {
            if(this.currentIndex==index){
                // 同一首音乐
                if(this.audio.paused){
                    this.audio.play();
                }else{
                    this.audio.pause();
                }
            }else{
                // 不是同一首
                this.$audio.attr('src',music.link_url);
                this.audio.play();
                this.currentIndex = index;
            }
        },
        preIndex:function () {
            var index = this.currentIndex-1;
            if(index<0){
               index  = this.musicList.length-1;
            }
            return index;
        },
        nextIndex:function () {
            var index = this.currentIndex + 1;
            if(index>this.musicList.length-1){
                index = 0;
            }
            return index;
        },
        changeMusic:function (index) {
            this.musicList.splice(index,1);

            // 判断删除的音乐是否是正在播放的音乐前面
            if(index<this.currentIndex){
                this.currentIndex = this.currentIndex-1;
            }
        },
        musicTimeUpdate:function (callBack) {
           var $this = this;
            this.$audio.on('timeupdate',function () {
                var duration = $this.audio.duration;
                var currentTime = $this.audio.currentTime;
                console.log(duration);
                console.log(currentTime);
                var timestr = $this.formate(duration,currentTime);
                callBack(duration,currentTime,timestr);
            });
        },
        formate:function (duration,currentTime) {
            var endMin = parseInt(duration/60);
            var endSed = parseInt(duration%60);
            if(endMin<10){
                endMin = '0'+endMin;
            }
            if(endSed<10){
                endSed = '0'+endSed;
            }

            var startMin = parseInt(currentTime/60);
            var startSed = parseInt(currentTime%60);
            if(startMin<10){
                startMin = '0'+startMin;
            }
            if(startSed<10){
                startSed = '0'+startSed;
            }
            return startMin+':'+startSed+'/'+endMin+':'+endSed;
        }
    }
    Player.prototype.init.prototype = Player.prototype;
    window.Player =Player;
})(window)