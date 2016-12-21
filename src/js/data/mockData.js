// 使用 Mock
// var data = Mock.mock({
//   'list|10': [{
//     'id|+1': 1
//   }]
// });


Mock.mock('/categories', {
  errcode: 0,
  errmsg: '执行成功',
  token: '每个请求都会返回token，请替换旧的避免登录过期',
  'categories|5-10': [{
    'id|200-300': 1,
    name: '@FIRST',
    pid: 0,
    'tag|1': ['city', 'region', 'amenity', 'event', 'circle'],
    view: '@word'
  }]
});
// 输出结果


// console.log(JSON.stringify(data.list[0].id))