// 使用 Mock
// var data = Mock.mock({
//   'list|10': [{
//     'id|+1': 1
//   }]
// });


Mock.mock('/placeList', {
  'list|1-3': [
    {'a': '1'},
    {'b': '2'},
    {'c': '3'}
  ]
});
// 输出结果


// console.log(JSON.stringify(data.list[0].id))