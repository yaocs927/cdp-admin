function mockajax() {
  $.ajax({
    type: 'GET',
    url: '/placeList',
    success: function (data) {
      // var data = JSON.stringify(data);
      console.log(data);
      // $('#testbox').text(data.name)
    }
  })
}

window.onload = function () {
  mockajax()
}