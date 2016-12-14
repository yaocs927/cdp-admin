$(function () {
  // 表格插件
  $('#dataTables').DataTable({
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

  $('#dataTables1').DataTable({
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
  $('.dataList tbody').find("button[data-toggle='tooltip']").tooltip();

  // 列表更多内容 panel
  $('.dataList tbody').on('mouseover', '.tip', function () {
    var cur_panel = $(this).find('.tipContent');
    var h = cur_panel.height();
    var w1 = cur_panel.width();
    var w2 = $(this).width();
    var xpos = Math.abs(Math.ceil((w2 - w1) / 2));
    cur_panel.css({
      top: -(h - 4) + 'px',
      left: xpos + 'px'
    })
    $(this).find('.tipContent').stop().fadeIn();
    $(this).parent('tr').siblings('tr').find('.tipContent').stop().fadeOut();
  });
  $('.dataList tbody').on('mouseout', '.tip', function () {
    $(this).find('.tipContent').stop().fadeOut();
    // $(this).parent('tr').siblings('tr').find('.tipContent').stop().fadeOut();
  });

  // 选择数据
  // 全选
  $('.selectAll').on('click', function () {
    var cur_el = $(this).parents('thead').siblings('tbody').find('.selectCur');
    if ($(this).is(':checked') === true) {
      $(this).prop('checked', true);
      cur_el.prop('checked', true);
    } else {
      $(this).prop('checked', false);
      cur_el.prop('checked', false);
    }
  });
  // 选择当前行
  $('.dataList tbody').on('click', '.selectCur', function () {
    if ($(this).is(':checked') === true) {
      $(this).prop('checked', true);
    } else {
      $(this).prop('checked', false);
      $(this).parents('tbody').siblings('thead').find('.selectAll').prop('checked', false);
    }
  })


  //
  $('.dataList tbody').on('mouseover', '.changeTD', function () {
    $(this).find('.changeBtn').show();
  });
  $('.dataList tbody').on('mouseout', '.changeTD', function () {
    $(this).find('.changeBtn').hide();
  });



});


function deleteData(id) {

}