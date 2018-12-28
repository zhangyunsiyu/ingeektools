// miniprogram/pages/index/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    password: '',
    passwordList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  click (e) {
    let num = e.currentTarget.dataset.num
    if (num == 'reset') {
      this.data.passwordList = []
    } else if (num == 'del') {
      this.data.passwordList.pop()
    } else {
      this.data.passwordList.push(num)
    }
    this.data.password = this.data.passwordList.reduce((acc, cur)=>{
      return acc + '' + cur
    },'')
    this.setData({
      password: this.data.password
    })
    if (this.data.password == '1234'|| this.data.password == '2019') {
      app.globalData.userRole = this.data.password == '1234' ? 'normal' : 'admin'
      wx.redirectTo({
        url: '../equipment/index',
      })
    }
  }
})