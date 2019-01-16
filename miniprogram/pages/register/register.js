// miniprogram/pages/register/register.js
const { $Message } = require('../../dist/base/index');
const app = getApp()
Page({
  data: {
    current: 0,
    isBindUser: false,
    userindex: '',
    userindexId: ''
  },
  onShow: function () {
    const _this = this
    if (app.globalData.userindex || app.globalData.userindexId) {
      _this.setData({
        userindex: app.globalData.userindex,
        userindexId: app.globalData.userindexId
      })
      // 调取绑定接口
      wx.cloud.callFunction({
        name: 'register',
        data: {
          id: _this.data.userindexId
        },
      }).then(res => {
        console.log(res)
        _this.setData({
          current: 2
        })
        _this.login()
      }).catch(console.error)
      app.globalData.userindex = ''
      app.globalData.userindexId = ''
    }
  },
  login () {
    wx.cloud.callFunction({
      name: 'login',
    }).then(res => {
      console.log(res.result)
      if (res.result.data.data.length > 0) {
        app.globalData.registerUser = res.result.data.data[0]
      }
    }).catch(console.error)
  },
  getuserInfo(e) {
    // 获取用户信息并提交到全局函数
    app.globalData.userInfo = e.detail.userInfo
    if (app.globalData.userInfo) {
      this.setData({
        'current': 1
      })
    }
  },
  toUserIndex () {
    wx.navigateTo({
      url: "../userindex/userindex?fromPath=register",
    })
  },
  handleClick() {
    const addCurrent = this.data.current + 1;
    const current = addCurrent
    this.setData({
      'current': current
    })
    if (this.data.current > 2) {
      // 跳转到home页面
      wx.redirectTo({
        url: '../equipment/index',
      })
    }
  }
})