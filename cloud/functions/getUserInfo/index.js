// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'ebookchang-d96875',
  traceUser: true
})

// 云函数入口函数
exports.main = async (event, context) => {
  return event.userInfo
}