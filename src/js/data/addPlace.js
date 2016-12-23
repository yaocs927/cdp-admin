// 常量
var CUR_PLACEID = null; // 当前新增的场地ID
var CUR_PLACE_ALBUMID = null; // 当前新增的场地相册ID
var STATUS_CODE_YES = 0; // ajax 成功状态码

$(function () {

  // 获取 城市/区域/商圈 列表
  getCategory_1('placeCity', 'city');
  getCategory_1('placeRegion', 'region');
  getCategory_1('placeCircle', 'circle');

  // 获取场地 类型/设施 列表
  getCategory_2('placeType', 'event');
  getCategory_2('placeFacility', 'amenity');


  // $.when(getCategory_1('placeCity', 'city')).then(function () {
  //   console.log('成功')
  // }, function () {
  //   console.log('失败')
  // }, function () {
  //   console.log('执行中')
  // })

  // 新增一条价目信息
  var num = 1;
  $('#addNewPriceInfoBtn').on('click', function () {
    // console.log($('#placePriceInfoWrap').children().length);
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
        '<input type="text" class="form-control price-name">' +
        '<p class="help-block small">请填入价格条目名称，最多10字。</p>' +
        '</div>' +
        '<div class="form-group">' +
        '<label class="control-label">价格条目简介</label>' +
        '<input type="text" class="form-control price-brief">' +
        '<p class="help-block small">请填入价格条目简介，最多30字。</p>' +
        '</div>' +
        '<div class="form-group">' +
        '<div class="row">' +
        '<div class="col-lg-4">' +
        '<label>价格</label>' +
        '<div class="input-group">' +
        '<input type="text" class="form-control price-price">' +
        '<span class="input-group-addon">元起</span>' +
        '</div>' +
        '</div>' +
        '<div class="col-lg-4">' +
        '<label>人数</label>' +
        '<div class="input-group">' +
        '<input type="text" class="form-control price-number">' +
        '<span class="input-group-addon">人</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label>营业时间（时刻）</label>' +
        '<div class="form-inline">' +
        '<select class="form-control price-start-time">' +
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
        '<select class="form-control mr5 price-day">' +
        '<option>今日</option>' +
        '<option>次日</option>' +
        '</select>' +
        '<select class="form-control mr5 price-end-time">' +
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
        '<div class="input-group">' +
        '<span class="input-group-addon">共</span>' +
        '<input type="text" class="form-control price-time-length">' +
        '<span class="input-group-addon">小时</span>' +
        '</div>' +
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
    initialCaption: '每次最多10张，格式为png或者jpg，大小不超过4M',
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
  });

  // 重置表单
  $('.resetFormConfirm').on('click', function () {
    window.location.reload();
  })

  // ==============================
  // 确认新增场地
  // ==============================

  $('#confirmAddPlaceBtn').on('click', function () {
    // 上传等待提示
    $('#releaseNewPlace').modal({
      keyboard: false,
      backdrop: 'static'
    }); 

    // 开始上传场地信息
    // addNewPlace();



    // 上传结束提示
    setTimeout(function () {
      $('#releaseNewPlaceInfo').text('发布成功！').attr('class', 'text-success');
      $('#releaseNewPlaceModalFooter').html('<button type="button" class="btn btn-primary btn-sm btn-outline" id="releaseNewPlaceBtn1" data-dismiss="modal">继续发布新场地</button><button type="button" class="btn btn-success btn-sm" id="releaseNewPlaceBtn2">查看场地列表</button>');
    }, 5000);


  });

  // 发布完操作
  $('#releaseNewPlace').on('click', '#releaseNewPlaceBtn2', function () {
    window.location.href = 'placeList.html'; // 发布完返回场地列表页
  });
  $('#releaseNewPlace').on('hide.bs.modal', function (e) {
    window.location.href = 'addPlace.html'; // 继续发布新场地
  })

});


// 获取 城市/区域/商圈 列表
function getCategory_1(id, category) {
  $.ajax({
    type: 'GET',
    url: '/categories',
    // data: {
    //   tag: category
    // },
    success: function (data) {
      var data = JSON.parse(data);
      if (data.errcode === STATUS_CODE_YES) {
        $.each(data.categories, function (i, cur) {
          $('#' + id).append('<option value="' + cur.id + '">' + cur.name + '</option>');
        })
      }
    }
  });
}

// 获取场地 类型/设施 列表
function getCategory_2(id, category) {
  $.ajax({
    type: 'GET',
    url: '/categories',
    // data: {
    //   tag: category
    // },
    success: function (data) {
      var data = JSON.parse(data);
      if (data.errcode === STATUS_CODE_YES) {
        $.each(data.categories, function (i, cur) {
          $('#' + id).find('.row').append('<div class="col-lg-3">' +
            '<div class="checkbox">' +
            '<label class="checkbox-inline">' +
            '<input type="checkbox" value="' + cur.id + '">' + cur.name +
            '</label>' +
            '</div>' +
            '</div>');
        })
      }
    }
  });
}

// 新增场地 接口
function addNewPlace() {
  var placeName = $.trim($('#placeName input[type="text"]').val()), // 场地名
    placeAddress = $.trim($('#placeAddress input[type="text"]').val()), // 场地地址
    placeNumber = $.trim($('#placeNumber input[type="text"]').val()), // 场地人数
    placeArea = $.trim($('#placeArea input[type="text"]').val()), // 场地面积
    placeKeyword = $.trim($('#placeKeyword input[type="text"]').val()); // 场地面积

  $.ajax({
    type: 'POST',
    url: '/services',
    data: {
      name: placeName,
      address: placeAddress,
      area: placeArea,
      keyword: placeKeyword,
      number: placeNumber
    },
    success: function (res) {
      if (res.errcode === STATUS_CODE_YES) {
        console.log('新增场地成功！')
        CUR_PLACEID = res.id;
        CUR_PLACE_ALBUMID = res.album;

        // 新增成功-添加其他信息
        addNewPlaceBrief(CUR_PLACEID);
        addNewPlaceCategory(CUR_PLACEID);
        addNewPlacePrice(CUR_PLACEID);
        addNewPlacePhoto(CUR_PLACE_ALBUMID);

        // 监控信息上传
        $.when(addNewPlaceBrief(CUR_PLACEID), addNewPlaceCategory(CUR_PLACEID), addNewPlacePrice(CUR_PLACEID), addNewPlacePhoto(CUR_PLACE_ALBUMID)).then(function () {
          $('#releaseNewPlaceInfo').text('发布成功！').attr('class', 'text-success');
          $('#releaseNewPlaceBtn').removeAttr('disabled').removeClass('btn-default').addClass('btn-success').text('确认');
        })

      } else {
        console.log('新增场地失败！ 状态码 errcode=' + res.errcode);
      }
    },
    error: function () {
      console.log('新增场地失败，服务器错误！');
    }
  });
}

// 新增场地简介 接口
function addNewPlaceBrief(pid) {
  var placeBrief = $('#placeBrief textarea').val(),
    name = '场地简介',
    view = '';

  $.ajax({
    type: 'POST',
    url: '/services/' + pid + '/briefs',
    data: {
      name: name,
      content: placeBrief,
      view: view
    },
    success: function (res) {
      if (res.errcode === STATUS_CODE_YES) {
        console.log('新增场地简介成功！');
      } else {
        console.log('新增场地简介失败！ 状态码 errcode=' + res.errcode);
      }
    },
    error: function () {
      console.log('新增场地简介失败，服务器错误！');
    }
  });
}

// 新增场地类型 接口
function addNewPlaceCategory(pid) {
  var placeCategoryIDs = [], // 总类型暂存数组
    cityID = $('#placeCity option:selected').val(), // 城市ID
    regionID = $('#placeRegion option:selected').val(), // 区域ID
    circleID = $('#placeCircle option:selected').val(), // 商圈ID
    typeElems = $('#placeType input[type=checkbox]:checked'),
    facilityElems = $('#placeFacility input[type=checkbox]:checked');

  placeCategoryIDs.push(cityID, regionID, circleID);

  $.each(typeElems, function (i, cur) {
    placeCategoryIDs.push($(cur).val()); // 活动类型ID
  });
  $.each(facilityElems, function (i, cur) {
    placeCategoryIDs.push($(cur).val()); // 设施ID
  });

  $.ajax({
    type: 'POST',
    url: '/services/' + pid + '/categories',
    data: placeCategoryIDs.join(','),
    success: function (res) {
      if (res.errcode === STATUS_CODE_YES) {
        console.log('新增场地类型成功！');
      } else {
        console.log('新增场地类型失败！ 状态码 errcode=' + res.errcode);
      }
    },
    error: function () {
      console.log('新增场地类型失败，服务器错误！');
    }
  });
}

// 新增场地价目 接口
function addNewPlacePrice(pid) {
  var placePriceList = $('#placePriceInfoWrap').children(); // 获取所有价目
  $.each(placePriceList, function (i, cur) { // 循环所有价目 并上传数据
    var addNewPlacePriceParas = {
      name: $(cur).find('.price-name').val(),
      brief: $(cur).find('.price-brief').val(),
      price: $(cur).find('.price-price').val(),
      number: $(cur).find('.price-number').val(),
      time: $(cur).find('.price-start-time option:selected').val(),
      length: $(cur).find('.price-time-length').val(),
      unit: 'CNY',
      float: '',
      view: ''
    }

    $.ajax({
      type: 'POST',
      url: '/services/' + pid + '/offers',
      data: addNewPlacePriceParas,
      success: function (res) {
        if (res.errcode === STATUS_CODE_YES) {
          console.log('新增场地价目成功！');
        } else {
          console.log('新增场地价目失败！ 状态码 errcode=' + res.errcode);
        }
      },
      error: function () {
        console.log('新增场地价目失败，服务器错误！');
      }
    });
  });
}

// 新增场地照片 接口
function addNewPlacePhoto(album_id) {
  var files,
    fileNameArr = [];
  $("#addPlaceImgFile").on('change', function (e) {
    files = e.currentTarget.files;
    // var filesArr = [];
    fileNameArr = [];

    $.each(files, function (i, cur) {
      var fileName = cur.name;
      var num = fileName.lastIndexOf('.');
      var fileNameMain = fileName.slice(0, num);
      fileNameArr.push(fileNameMain);

      // var fileObj = {
      //   name: fileNameMain,
      //   fileaa: files[i]
      // }
      // filesArr.push(fileObj);
    });
  });

  $.ajax({
    type: 'POST',
    url: '/albums/' + album_id + '/photos',
    data: {
      names: fileNameArr,
      photos: files
    },
    success: function (res) {
      if (res.errcode === STATUS_CODE_YES) {
        console.log('新增场地照片成功！');
      } else {
        console.log('新增场地照片失败！ 状态码 errcode=' + res.errcode);
      }
    },
    error: function () {
      console.log('新增场地照片失败，服务器错误！');
    }
  });
}