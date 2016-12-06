$(function () {
  // 表格插件
  $('#dataTables-example').DataTable({
    responsive: true,
    "language": {
      "lengthMenu": "每页 _MENU_ 条",
      "info": "第 _START_ 条到 _END_ 条，共 _TOTAL_ 条",
      "paginate": {
        "previous": "上一页",
        "next": "下一页"
      },
      "zeroRecords": "没有匹配的关键字，请检查关键字！",
      "pageLength": 50
    }
  });
  // tooltip
  $("[data-toggle='tooltip']").tooltip();
  // 更多内容 panel
  $('.tip').hover(
    function () {
      var cur_panel = $(this).find('.tipContent');
      var h = cur_panel.height();
      var w1 = cur_panel.width();
      var w2 = $(this).width();
      var xpos = Math.abs(Math.ceil((w2 - w1) / 2));
      cur_panel.css({
        top: -(h - 4) + 'px',
        left: xpos + 'px'
      })
      $(this).find('.tipContent').fadeToggle();
    }
  )
});