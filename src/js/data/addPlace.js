$(function () {
  $("#file-1").fileinput({
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
  $("#file-1").on('change', function (e) {
    console.log(e.currentTarget.files);
  })
});