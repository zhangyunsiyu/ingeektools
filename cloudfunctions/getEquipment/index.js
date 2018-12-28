// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 调用数据库获取所有设备列表
  const db = cloud.database() // 获取数据库
  const _ = db.command // 获取查询指令
  const equipmentCollection = db.collection('equipment') // 获取equipment集合
  // 查询条件
  // let query = _.eq(event.id)
  // 
  const equipment = (await equipmentCollection.where({
    _id: event.id
  }).get())

  return {
    event,
    data: equipment,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}