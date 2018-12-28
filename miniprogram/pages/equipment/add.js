// miniprogram/pages/equipment/add.js
const { $Message } = require('../../dist/base/index');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    eq_name: '',
    eq_no: '',
    eq_user: '',
    eq_type: '',
    eq_date: '',
    eq_status: null,
    // 当前设备类型列表
    equipmentType: [
      {
        index: 1,
        value: 'iphone',
      },
      {
        index: 2,
        value: 'android',
      },
      {
        index: 3,
        value: 'ble',
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    if (app.globalData.userindex != '') {
      this.setData({
        eq_user: app.globalData.userindex
      })
      app.globalData.userindex = ''
    }
  },
  onHide: function () {
    app.globalData.userindex = ''
  },

  // 绑定名称
  updatename (e) {
    let value = e.detail.detail.value
    this.setData({
      eq_name: value
    })
  },

  // 绑定编号
  updateno(e) {
    let value = e.detail.detail.value
    this.setData({
      eq_no: value
    })
  },

  // 跳转到选择用户页面
  toUserIndex () {
    wx.navigateTo({
      url: "../userindex/userindex?fromPath=add",
    })
  },

  // 清除已经选择的使用者筛选条件
  clearUser() {
    this.data.eq_user = ''
    this.setData({
      eq_user: this.data.eq_user
    })
  },

  // 绑定用户名
  // updateuser (e) {
  //   let value = e.detail.detail.value
  //   this.setData({
  //     eq_user: value
  //   })
  // },

  // 点击选择设备类型
  typeChange({ detail = {} }) {
    this.setData({
      eq_type: detail.value
    })
  },
  // 点击选择日期
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      eq_date: e.detail.value
    })
  },

  // 新增设备
  addEq () {
    // 根据eq_user重置设备状态
    if (this.data.eq_user.trim() != '') {
      // 改变eq_status
      this.setData({
        eq_status: 1
      })
    } else {
      this.setData({
        eq_status: 0,
        eq_date: ''
      })
    }
    let list = {
      eq_name: this.data.eq_name,
      eq_no: this.data.eq_no,
      eq_user: this.data.eq_user,
      eq_type: this.data.eq_type,
      eq_status: this.data.eq_status,
      eq_date: this.data.eq_date,
    }
    const _this = this
    console.log('新增数据')
    console.log(list)
    wx.cloud.callFunction({
      name: 'addEquipment',
      data: {
        data: list
      },
    }).then(res => {
      console.log('新增数据成功')
      console.log(res)
      $Message({
        content: '新增设备成功',
        type: 'success'
      })
      wx.reLaunch({
        url: './index',
      })
    }).catch(console.error)
  }
})