// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 调用数据库获取所有设备列表
  const db = cloud.database() // 获取数据库
  const _ = db.command // 获取查询指令
  const usersCollection = db.collection('users') // 获取users集合

  const user = (await usersCollection.where({
    open_id: wxContext.OPENID
  }).get())

  return {
    event,
    data: user,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}