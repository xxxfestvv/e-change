// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('book_changed').where({
    provider_id: event.provider_id,
    id: event.id,
  }).update({
    data: {
      place: event.place,
      state: 2
    }
  })
}