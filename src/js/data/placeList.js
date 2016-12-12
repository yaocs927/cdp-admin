$(function () {
  $('#placeList-dataTables').DataTable({
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
    },
    "columnDefs": [{
      "targets": [0],
      "data": "id",
      "render": function (data, type, full) {
        return '<input type="checkbox">';
      }
    }, {
      "targets": [6],
      "data": "id",
      "render": function (data, type, full) {
        return '<span>' +
        '<button type="button" class="btn btn-info btn-sm" data-toggle="tooltip" data-placement="top" title="查看详情"><i class="fa fa-info-circle"></i></button>' +
        '<button type="button" class="btn btn-danger btn-outline btn-sm delete" title="删除" data-toggle="modal" data-target=".deleteConfirm"><i class="fa fa-trash-o"></i></button>' +
        '</span>';
      }
    }],
    "ajax": "./js/data/placeList.json",
    "columns": [{
      "data": "id"
    }, {
      "data": "name"
    }, {
      "data": "area"
    }, {
      "data": "num"
    }, {
      "data": "state"
    }, {
      "data": "weight"
    }]
    
  });
  // getPlaceList();
});

// 获取场地列表
function getPlaceList() {
  $.ajax({
    type: 'GET',
    url: './js/data/placeList.json',
    success: function (data) {
      var placeList = data.data;
      if (data.state === 200) {
        console.log(placeList)
        $.each(placeList, function (i, cur) {
          $('#getPlaceList').append('<tr data-id="' + cur.id + '">' +
            '<td><input type="checkbox"></td>' +
            '<td class="tip">' + cur.name +
            '<div class="tipContent">' +
            '<div class="panel panel-default tip-panel">' +
            '<div class="panel-body">' +
            '<p>地址：' + cur.address + '</p>' +
            '<p>面积：' + cur.area1 + '平方米</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</td>' +
            '<td>' + cur.area + '</td>' +
            '<td>' + cur.num + '人</td>' +
            '<td>已上线</td>' +
            '<td>' + cur.weight + '</td>' +
            '<td>' +
            '<span>' +
            '<button type="button" class="btn btn-info btn-sm" data-toggle="tooltip" data-placement="top" title="查看详情"><i class="fa fa-info-circle"></i></button>' +
            '<button type="button" class="btn btn-danger btn-outline btn-sm delete" title="删除" data-toggle="modal" data-target=".deleteConfirm"><i class="fa fa-trash-o"></i></button>' +
            '</span>' +
            '</td>' +
            '</tr>');
        });

      }
    }
  })
}