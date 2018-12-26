//app.js
App({
  onLaunch: function () {
    const _this = this
    // 初始化云函数
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    // 获取用户信息(针对已经授权过的用户,直接获取用户信息)
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              _this.globalData.avatarUrl = res.userInfo.avatarUrl
              _this.globalData.userInfo = res.userInfo
              if (_this.userInfoCallback) {
                _this.userInfoCallback()
              }
            }
          })
        }
      }
    })
    this.globalData = {}
  }
})
