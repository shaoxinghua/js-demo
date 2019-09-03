(function (window) {
  function Progress($progressBar,$progressLine,$progressDot) {
      return    Progress.prototype.init($progressBar,$progressLine,$progressDot);
  }
  Progress.prototype = {
      constructor:Progress,
      init:function ($progressBar,$progressLine,$progressDot) {
        this.$progressBar = $progressBar;
        this.$progressLine = $progressLine;
        this.$progressDot = $progressDot;
      },
      progressClick:function () {
          $this = this;
          this.$progressBar.click(function (e) {
              // 获取初始位置（背景距离窗口的默认位置）
              var normalLeft =$(this).offset().left;
              // 获取点击位置距离窗口的距离
              var eLeft = e.pageX;

              $this.$progressLine.css('width',eLeft-normalLeft);
              $this.$progressDot.css('left',eLeft-normalLeft);
          })
      },
      progressMove:function () {
          $this = this;
          // 监听鼠标的按下事件
          this.$progressBar.mousedown(function () {
              // 获取初始位置（背景距离窗口的默认位置）
              var normalLeft =$(this).offset().left;
              // 监听鼠标的移动事件
              $(document).mousemove(function (e) {
                  // 获取点击位置距离窗口的距离
                  var eLeft = e.pageX;

                  $this.$progressLine.css('width',eLeft-normalLeft);
                  $this.$progressDot.css('left',eLeft-normalLeft);
              })
          })
          // 监听鼠标的抬起事件
          $(document).mouseup(function () {
              $(document).off('mousemove');
          })
      },
      setProgress:function (value) {
          if(value<0||value>100) return;
          this.$progressLine.css('width',value+"%");
          this.$progressDot.css('left',value+"%");
      }
  }
  Progress.prototype.init.prototype = Progress.prototype;
  window.Progress = Progress;
})(window)