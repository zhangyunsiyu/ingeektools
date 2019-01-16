// miniprogram/pages/checkingin/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checkingInData: {},
    avatarUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl,
      userName: app.globalData.registerUser.name
    })
    this.getChecking()
  },
  getChecking () {
    const _this = this
    wx.cloud.callFunction({
      name: 'getCheckingList',
      data: {
        name: app.globalData.registerUser.name
      }
    }).then(res => {
      console.log(app.globalData.registerUser.name)
      console.log(res.result)
      _this.setData({
        checkingInData: res.result.data.data[0]
      })
    }).catch(console.error)
  },
  // 底部导航
  tabChange({ detail }) {
    wx.redirectTo({
      url: `../${detail.key}/index`,
    })
  }
})