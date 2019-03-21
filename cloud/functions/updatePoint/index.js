// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database() //获取云数据库
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('my_point').where({
      _openid: event.provider
    }).update({
      data: {
        point: _.inc(event.point)
      }
    })
  } catch (e) {
    console.error(e)
  }
}