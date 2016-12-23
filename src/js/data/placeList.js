$(function () {
  var table = $('#placeList-dataTables').DataTable({
    pageLength: 50, // 每页数据量
    language: { // 国际化
      emptyTable: '暂无对应的数据',
      info: '第 _START_ 条到 _END_ 条，共 _TOTAL_ 条',
      infoEmpty: '暂无数据',
      infoFiltered: '(从 _MAX_ 条总数据筛选出)',
      lengthMenu: '每页 _MENU_ 条',
      loadingRecords: '努力加载中......',
      search: '搜索：',
      searchPlaceholder: '请输入关键字',
      paginate: {
        previous: '上一页',
        next: '下一页',
        first: '第一页',
        last: '最后一页'
      },
      zeroRecords: '没有匹配的关键字，请检查关键字！',
      processing: '正在处理数据中......'
    },
    order: [],
    ajax: {
      url: '/services',
      dataSrc: function (data) {
        if (data.errcode === 0) {
          return data.services;
        } else {
          alert('数据加载错误，请刷新页面！');
        }
      },
      error: function () {
        alert('服务器未正常响应，请刷新页面！');
      }
    },
    deferRender: true,
    rowId: 'id',
    columns: [{
      "data": "id"
    }, {
      "data": "name"
    }, {
      "data": "number"
    }, {
      "data": "status"
    }, {
      "data": "weight"
    }, {
      "data": "id"
    }],
    columnDefs: [{
      targets: [0],
      orderable: false,
      render: function (data, type, full) {
        return '<input type="checkbox" class="selectCur">';
      }
    }, {
      targets: [1],
      className: 'tip',
      render: function (data, type, row, meta) {
        return data + '<div class="tipContent">' +
          '<div class="panel panel-default tip-panel">' +
          '<div class="panel-body">' +
          '<p>地址：' + row.address + '</p>' +
          '<p>面积：' + row.area + '平方米</p>' +
          '<p>关键词：' + row.keyword + '</p>' +
          '</div>' +
          '</div>' +
          '</div>';
      }
    }, {
      targets: [3],
      className: 'placeState changeTD',
      render: function (data, type, row, meta) {
        if (data === 1) {
          var cur_el = '<span class="text-success" data-state="' + data + '"><b>公开</b></span><button type="button" class="btn btn-info btn-sm changeBtn" title="修改状态" data-toggle="modal" data-target=".changeStateConfirm">修改</i></button>';
        } else if (data === 2) {
          var cur_el = '<span class="text-warning" data-state="' + data + '"><b>私密</b></span><button type="button" class="btn btn-info btn-sm changeBtn" title="修改状态" data-toggle="modal" data-target=".changeStateConfirm">修改</i></button>'
        } else if (data === 0) {
          var cur_el = '<span class="text-danger" data-state="' + data + '"><b>删除</b></span><button type="button" class="btn btn-info btn-sm changeBtn" title="修改状态" data-toggle="modal" data-target=".changeStateConfirm">修改</i></button>'
        } else {
          var cur_el = '<span class="text-info" data-state="' + data + '"><b>审核</b></span><button type="button" class="btn btn-info btn-sm changeBtn" title="修改状态" data-toggle="modal" data-target=".changeStateConfirm">修改</i></button>'
        }
        return cur_el;
      }
    }, {
      targets: [4],
      // orderable: false,
      className: 'placeWeight changeTD',
      render: function (data, type, row, meta) {
        var cur_el = '<span class="text-primary"><b>' + data + '</b></span><button type="button" class="btn btn-info btn-sm changeBtn" title="修改权重" data-toggle="modal" data-target=".changeWeightConfirm">修改</i></button>';
        return cur_el;
      }
    }, {
      targets: [5],
      orderable: false,
      render: function (data, type, row, meta) {
        return '<span class="operateBtn">' +
          '<a href="../src/placeDetail.html?id=' + row.id + '" class="btn btn-info btn-sm" title="查看详情"><i class="glyphicon glyphicon-list-alt"></i></a>' +
          '<button type="button" class="btn btn-danger btn-outline btn-sm deleteBtn" title="删除" data-toggle="modal" data-target="#deleteConfirmModal"><i class="glyphicon glyphicon-trash"></i></button>' +
          '</span>';
      }
    }],
    initComplete: function (data) {
      console.log('数据加载完成提示码: ' + data.json.errcode);
    }
  });

  // ==================
  // 删除数据
  // ==================
  $('body').on('click', '.deleteBtn', function () {
    var curid = $(this).parents('tr').attr('id');
    $('#deleteConfirmBtn').attr('data-curid', curid);
  });
  // 删除确认
  $('#deleteConfirmBtn').on('click', function () {
    $('#deleteConfirmBtnGroup').html('<button type="button" class="btn btn-primary" id="deleteConfirmBtn" disabled="disabled">删除中...</button>')
    var id = $(this).attr('data-curid');
    deleteData(id);
    $.when(deleteData(id)).then(function () {
      $('#deleteConfirmModal').modal('hide');
    })
    table.ajax.reload();
  });
  // 模态框关闭
  $('#deleteConfirmModal').on('hide.bs.modal', function () {
    $('#deleteConfirmBtnGroup').html('<button type="button" class="btn btn-link" id="deleteCancelBtn" data-dismiss="modal">取消</button><button type="button" class="btn btn-primary" id="deleteConfirmBtn">确认</button>')
  });

  // 修改状态
  $('.dataList tbody').on('click', '.changeBtn', function () {
    var cur_state = $(this).siblings('span').attr('data-state');
    var cur_radio = $('#changeStateRadio').find('input[type=radio][value=' + cur_state + ']')
    cur_radio.prop('checked', true);
    cur_radio.parent('label').addClass('active');
  });
  // 取消修改
  $('#changeStateCancelBtn').on('click', function () {
    $('#changeStateRadio').find('input[type=radio]').prop('checked', false);
    $('#changeStateRadio').find('input[type=radio]').parent('label').removeClass('active');
  });
  // 确认修改
  $('#changeStateConfirmBtn').on('click', function () {
    var cur_stateNum = $('#changeStateRadio').find('input[type=radio]:checked').attr('value');
    changeState(cur_stateNum);
    table.ajax.reload();
    // $('#changeStateRadio').find('input[type=radio]').prop('checked', false);
    $('#changeStateRadio').find('input[type=radio]').parent('label').removeClass('active');
  });

  // 修改权重
  $('.dataList tbody').on('click', '.changeBtn', function () {
    var cur_weight = $(this).siblings('span').text();
    var cur_radio = $('#changeWeightRadio').find('input[type=radio][value=' + cur_weight + ']')
    cur_radio.prop('checked', true);
    cur_radio.parent('label').addClass('active');
  });
  // 取消修改
  $('#changeWeightCancelBtn').on('click', function () {
    $('#changeWeightRadio').find('input[type=radio]').prop('checked', false);
    $('#changeWeightRadio').find('input[type=radio]').parent('label').removeClass('active');
  });
  // 确认修改
  $('#changeWeightConfirmBtn').on('click', function () {
    var cur_weightNum = $('#changeWeightRadio').find('input[type=radio]:checked').attr('value');
    changeState(cur_weightNum);
    table.ajax.reload();
    // $('#changeStateRadio').find('input[type=radio]').prop('checked', false);
    $('#changeWeightRadio').find('input[type=radio]').parent('label').removeClass('active');
  });

});


// 删除
function deleteData(id) {

}

// 修改状态
function changeState(num) {

}