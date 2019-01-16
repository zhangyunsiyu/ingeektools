// miniprogram/pages/redirect/redirect.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    percent:0,
    status: 'active'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.beforLogin()
    var cont = 10
    var timeout = setInterval(()=>{
      if (cont < 100) {
        cont += 5
        this.setData({
          percent: cont
        })
      } else {
        cont = 100
        this.setData({
          percent: cont,
        })
        clearInterval('timeout')
      }
    },100)
  },

  beforLogin () {
    const that = this
    wx.cloud.callFunction({
      name: 'login',
    }).then(res => {
      console.log(res.result)
      if (res.result.data) {
        // 控制进度条
        clearInterval(timeout)
        let cont = that.data.percent
        var timeout = setInterval(() => {
          if (cont < 100) {
            cont += 10
            this.setData({
              percent: cont
            })
          } else {
            cont = 100
            this.setData({
              percent: cont,
            })
            console.log('停止加载进度条')
            clearInterval(timeout)
            // 判断是否绑定过账号 , 如果绑定过则直接跳到首页 , 否则去注册
            if (res.result.data.data.length > 0) {
              app.globalData.registerUser = res.result.data.data[0]
              wx.redirectTo({
                url: '../equipment/index',
              })
            } else {
              wx.redirectTo({
                url: '../register/register',
              })
            }
          }
        }, 100)
      }
    }).catch(console.error)
  }


})