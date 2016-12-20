$(function () {
  var table = $('#user-dataTables').DataTable({
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
      url: '/users',
      dataSrc: function (data) {
        console.log(data)
        if (data.errcode === 0) {
          return data.users;
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
      "data": "id"
    }, {
      "data": "name"
    }, {
      "data": "mobile"
    }, {
      "data": "status"
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
      targets: [4],
      className: 'placeState changeTD',
      render: function (data, type, row, meta) {
        if (data === 1) {
          var cur_el = '<span class="text-success" data-state="' + data + '"><b>已上线</b></span><button type="button" class="btn btn-info btn-sm changeBtn" title="修改状态" data-toggle="modal" data-target=".changeStateConfirm">修改</i></button>';
        } else {
          var cur_el = '<span class="text-danger" data-state="' + data + '"><b>审核中</b></span><button type="button" class="btn btn-info btn-sm changeBtn" title="修改状态" data-toggle="modal" data-target=".changeStateConfirm">修改</i></button>'
        }
        return cur_el;
      }
    }, {
      targets: [5],
      orderable: false,
      render: function (data, type, row, meta) {
        return '<span class="operateBtn">' +
          '<button type="button" class="btn btn-info btn-sm" title="修改用户信息"><i class="glyphicon glyphicon-pencil"></i></button>' +
          '<button type="button" class="btn btn-danger btn-outline btn-sm deleteBtn" title="删除" data-toggle="modal" data-target=".deleteConfirm"><i class="glyphicon glyphicon-trash"></i></button>' +
          '</span>';
      }
    }],
    initComplete: function (data) {
      console.log('数据加载完成提示码: ' + data.json.errcode);
    }
  });

  // 删除数据
  $('body').on('click', '.deleteBtn', function () {
    var curid = $(this).parents('tr').attr('id');
    $('#deleteConfirmBtn').attr('data-curid', curid);
  });
  // 删去取消
  $('#deleteCancelBtn').on('click', function () {
    $('#deleteConfirmBtn').removeAttr('data-curid');
  });
  // 删除确认
  $('#deleteConfirmBtn').on('click', function () {
    var id = $(this).attr('data-curid');
    deleteData(id);
    $('.deleteConfirm').modal('hide');
    table.ajax.reload();
    $('#deleteConfirmBtn').removeAttr('data-curid');
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
