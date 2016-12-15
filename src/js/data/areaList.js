$(function () {
  var table1 = $('#city-dataTables').DataTable({
    pageLength: 10, // 每页数据量
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
      // url: './js/data/placeList.json',
      url: '/categories',
      dataSrc: function (data) {
        if (data.errcode === 0) {
          return data.categories;
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
      "data": "id"
    }, {
      "data": "tag"
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
      orderable: false,
      render: function (data, type, row, meta) {
        return '<span class="operateBtn">' +
          '<a href="../src/placeDetail.html?id=' + row.id + '" class="btn btn-info btn-sm" title="查看详情"><i class="fa fa-info-circle"></i></a>' +
          '<button type="button" class="btn btn-danger btn-outline btn-sm deleteBtn" title="删除" data-toggle="modal" data-target=".deleteConfirm"><i class="fa fa-trash-o"></i></button>' +
          '</span>';
      }
    }],
    initComplete: function (data) {
      console.log('数据加载完成提示码: ' + data.json.errcode);
    }
  });

  var table2 = $('#district-dataTables').DataTable({
    pageLength: 10, // 每页数据量
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
      url: '/categories',
      dataSrc: function (data) {
        if (data.errcode === 0) {
          return data.categories;
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
      "data": "pid"
    }, {
      "data": "id"
    }, {
      "data": "tag"
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
      targets: [5],
      orderable: false,
      render: function (data, type, row, meta) {
        return '<span class="operateBtn">' +
          '<a href="../src/placeDetail.html?id=' + row.id + '" class="btn btn-info btn-sm" title="查看详情"><i class="fa fa-info-circle"></i></a>' +
          '<button type="button" class="btn btn-danger btn-outline btn-sm deleteBtn" title="删除" data-toggle="modal" data-target=".deleteConfirm"><i class="fa fa-trash-o"></i></button>' +
          '</span>';
      }
    }],
    initComplete: function (data) {
      console.log('数据加载完成提示码: ' + data.json.errcode);
    }
  });


  // ================
  // 单条数据删除
  // ================  
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
    // $('.dataList').find('tr[id=' + id + ']').remove();
    table1.ajax.reload();
    table2.ajax.reload();
    $('#deleteConfirmBtn').removeAttr('data-curid');
  });



});


// 删除
function deleteData(id) {

}