// 小程序登录接口 , 判断当前用户的信息是否已经录入数据库
// 如果已经录入数据库,则直接返回用户的角色
// 如果未录入数据库 , 则需要跳转到初始化个人信息页面完成信息录入
const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init()
/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = (event, context) => {
  console.log('调用login')
  console.log(event)
  console.log(context)
  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  const wxContext = cloud.getWXContext()

  // 调用数据库 , 查询当前用户是否存在

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
