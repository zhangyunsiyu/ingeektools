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

  // 取所有集合中符合条件的数据(因为有默认 limit 100 条的限制,需要做特殊操作)
  const MAX_LIMIT = 100
  // 先取出集合记录总数
  const countResult = await equipmentCollection.count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  let query = _.eq('iphone').or(_.eq('android')).or(_.eq('ble'))
  // 封装查询条件(直接通过reduce直接拼接方法)
  for (let key in event.queryList) {
    query = event.queryList[key].reduce((acc, cur) => {
      if (!acc) {
        return _.eq(cur)
      } else {
        return acc.or(_.eq(cur))
      }
    }, null)
  }
  for (let i = 0; i < batchTimes; i++) {
    const promise = equipmentCollection.where({
      eq_type: query
    }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  // 等待所有数据读取完成
  const equipmentList = (await Promise.all(tasks)).reduce((acc, cur) => ({
    data: acc.data.concat(cur.data),
    errMsg: acc.errMsg,
  }))

  return {
    event,
    data: equipmentList,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}