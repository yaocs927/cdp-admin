(function ($) {

  function TipPanel(el) {
    // this.opts = $.extend({}, TipPanel.DEFAULT, opts);
    // var curTip = this.init(el);
    this.el = el;
    console.log(this.el)
    this.el.append('<div class="tipContent">' +
      '<div class="panel panel-default tip-panel">' +
      '<div class="panel-body">' +
      '<p>地址：123123123</p>' +
      '<p>地址：123123123</p>' +
      '<p>地址：123123123</p>' +
      '<p>地址：123123123</p>' +
      '</div>' +
      '</div>' +
      '</div>');
    // 更多内容 panel
    this.el.hover(function () {
      var cur_panel = $(this).find('.tipContent');
      var h = cur_panel.height();
      var w1 = cur_panel.width();
      var w2 = $(this).width();
      var xpos = Math.abs(Math.ceil((w2 - w1) / 2));
      cur_panel.css({
        top: -(h - 4) + 'px',
        left: xpos + 'px'
      })
      $(this).find('.tipContent').stop().fadeToggle();
    })

  }

  TipPanel.DEFAULT = {
    width: 100
  }

  TipPanel.prototype = {

  }
  TipPanel.init = function (els) {
    var _this = this;
    els.each(function () {
      new _this($(this));
    })
  }

  window['TipPanel'] = TipPanel;

})(jQuery);