$(function () {

  // 新增一条价目信息
  var num = 1;
  $('#addNewPriceInfoBtn').on('click', function () {
    console.log($('#placePriceInfoWrap').children().length);
    var len = $('#placePriceInfoWrap').children().length
    num += 1;
    if (len >= 7) {
      alert('最多添加7条价目');
    } else {
      $('#placePriceInfoWrap').append('<div class="panel panel-default place-price-info-wrap-sub">' +
        '<div class="panel-heading" id="priceInfoTitle_' + num + '">' +
        '<h4 class="panel-title">' +
        '<a class="collapsed" data-toggle="collapse" data-parent="#placePriceInfoWrap" href="#priceInfo_' + num + '">价目</a>' +
        '<span class="pull-right priceInfoDeleteBtn"><input type="button" class="btn btn-danger btn-outline btn-sm" value="删除"></span>' +
        '</h4>' +
        '</div>' +
        '<div id="priceInfo_' + num + '" class="panel-collapse collapse">' +
        '<div class="panel-body">' +
        '<div class="form-group">' +
        '<label class="control-label">价格条目名称</label>' +
        '<input class="form-control" type="text">' +
        '<p class="help-block small">请填入价格条目名称，最多10字。</p>' +
        '</div>' +
        '<div class="form-group">' +
        '<label class="control-label">价格条目简介</label>' +
        '<input class="form-control" type="text">' +
        '<p class="help-block small">请填入价格条目简介，最多30字。</p>' +
        '</div>' +
        '<div class="form-group">' +
        '<div class="row">' +
        '<div class="col-lg-4">' +
        '<label>价格</label>' +
        '<div class="input-group">' +
        '<input type="text" class="form-control">' +
        '<span class="input-group-addon">起</span>' +
        '</div>' +
        '</div>' +
        '<div class="col-lg-4">' +
        '<label>人数</label>' +
        '<div class="input-group">' +
        '<input type="text" class="form-control">' +
        '<span class="input-group-addon">人</span>' +
        '</div>' +
        '</div>' +
        '<div class="col-lg-4">' +
        '<label>条目展示顺序</label>' +
        '<div class="input-group">' +
        '<span class="input-group-addon">第</span>' +
        '<input type="text" class="form-control">' +
        '<span class="input-group-addon">条</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label>营业时间（时刻）</label>' +
        '<div class="form-inline">' +
        '<select class="form-control">' +
        '<option>01:00</option>' +
        '<option>02:00</option>' +
        '<option>03:00</option>' +
        '<option>04:00</option>' +
        '<option>05:00</option>' +
        '<option>06:00</option>' +
        '<option>07:00</option>' +
        '<option>08:00</option>' +
        '<option>09:00</option>' +
        '<option>10:00</option>' +
        '<option>11:00</option>' +
        '<option>12:00</option>' +
        '<option>13:00</option>' +
        '<option>14:00</option>' +
        '<option>15:00</option>' +
        '<option>16:00</option>' +
        '<option>17:00</option>' +
        '<option>18:00</option>' +
        '<option>19:00</option>' +
        '<option>20:00</option>' +
        '<option>21:00</option>' +
        '<option>22:00</option>' +
        '<option>23:00</option>' +
        '<option>24:00</option>' +
        '</select> ~ ' +
        '<select class="form-control mr5">' +
        '<option>今日</option>' +
        '<option>次日</option>' +
        '</select>' +
        '<select class="form-control">' +
        '<option>01:00</option>' +
        '<option>02:00</option>' +
        '<option>03:00</option>' +
        '<option>04:00</option>' +
        '<option>05:00</option>' +
        '<option>06:00</option>' +
        '<option>07:00</option>' +
        '<option>08:00</option>' +
        '<option>09:00</option>' +
        '<option>10:00</option>' +
        '<option>11:00</option>' +
        '<option>12:00</option>' +
        '<option>13:00</option>' +
        '<option>14:00</option>' +
        '<option>15:00</option>' +
        '<option>16:00</option>' +
        '<option>17:00</option>' +
        '<option>18:00</option>' +
        '<option>19:00</option>' +
        '<option>20:00</option>' +
        '<option>21:00</option>' +
        '<option>22:00</option>' +
        '<option>23:00</option>' +
        '<option>24:00</option>' +
        '</select>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>')
    }
  });

  $('#placePriceInfoWrap').on('click', '.priceInfoDeleteBtn', function () {
    console.log($('#placePriceInfoWrap').children().length);
    var len = $('#placePriceInfoWrap').children().length;
    if (len < 2) {
      $('#deleteInfoEmptyTip').modal();
    } else {
      $(this).parents('.place-price-info-wrap-sub').remove();
    }
  });


  // 上传图片
  $("#addPlaceImgFile").fileinput({
    showUpload: false,
    enctype: 'multipart/form-data',
    previewFileType: 'any',
    language: 'zh',
    browseLabel: '图片多选',
    browseClass: 'btn btn-primary',
    allowedFileExtensions: ['jpg', 'png'], // 限制文件后缀名为jpg,png,gif
    allowedPreviewTypes: ['image'], // 允许预览的文件类型
    allowedFileTypes: ['image'], // 限制文件类型为图片
    maxFileCount: 10, // 限制最多3张图片
    maxFileSize: 4000, // 限制图片大小，最大1024KB
    initialCaption: '最多10张，格式为png或者jpg，大小不超过4M',
    layoutTemplates: {
      main1: '{preview}\n' +
        '<div class="input-group {class}">\n' +
        '   {caption}\n' +
        '   <div class="input-group-btn">\n' +
        '       {remove}\n' +
        '       {browse}\n' +
        '   </div>\n' +
        '</div>',
      footer: '<div class="file-thumbnail-footer">\n' +
        '    <div class="file-caption-name">{caption}{size}</div>\n' +
        '</div>'
    }
  })
  $("#addPlaceImgFile").on('change', function (e) {
    console.log(e.currentTarget.files);
  })
});