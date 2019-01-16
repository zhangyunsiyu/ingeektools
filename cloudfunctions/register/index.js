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
  // 查询条件
  let query = _.eq(event.id)
  // 
  try {
    await usersCollection.doc(event.id).update({
      // data 传入需要局部更新的数据
      data: {
        open_id: wxContext.OPENID
      }
    })
  } catch (e) {
    console.log(e)
  }

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}