// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const db = cloud.database() // 获取数据库
  const equipmentCollection = db.collection('equipment') // 获取equipment集合
  try {
    return await equipmentCollection.add({
      // data 字段表示需新增的 JSON 数据
      data: event.data
    })
  } catch (e) {
    console.error(e)
  }
}