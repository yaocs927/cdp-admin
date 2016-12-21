function mockajax() {
  $.ajax({
    type: 'GET',
    url: '/categories',
    success: function (data) {
      var data = JSON.parse(data);
      console.log(data);
      // $('#testbox').text(data.name)
    }
  })
}

window.onload = function () {
  mockajax()
}