// miniprogram/pages/equipment/add.js
const { $Message } = require('../../dist/base/index');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
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
    this.setData({
      id: options.id
    })
    // 查询当前设备的数据
    const _this = this
    console.log('获取当前设备详情')
    wx.cloud.callFunction({
      name: 'getEquipment',
      data: {
        id: _this.data.id
      },
    }).then(res => {
      console.log(res.result.data.data)
      let data = res.result.data.data[0]
      _this.setData({
        eq_name: data.eq_name || '',
        eq_no: data.eq_no || '',
        eq_user: data.eq_user || '',
        eq_type: data.eq_type || '',
        eq_date: data.eq_date || '',
      })
    }).catch(console.error)
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
  updatename(e) {
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

  // 清除已经选择的使用者筛选条件
  clearUser() {
    this.data.eq_user = ''
    this.setData({
      eq_user: this.data.eq_user
    })
  },

  // 绑定用户名
  // updateuser(e) {
  //   let value = e.detail.detail.value
  //   this.setData({
  //     eq_user: value
  //   })
  // },

  // 跳转到选择用户页面
  toUserIndex() {
    wx.navigateTo({
      url: "../userindex/userindex?fromPath=edit",
    })
  },

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

  // 提交编辑
  editEq() {
    // 重置设备状态
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
      eq_date: this.data.eq_date,
      eq_status: this.data.eq_status
    }
    const _this = this
    console.log('编辑数据')
    wx.cloud.callFunction({
      name: 'editEquipment',
      data: {
        id: _this.data.id,
        data: list
      },
    }).then(res => {
      console.log(res)
      $Message({
        content: '编辑设备成功',
        type: 'success'
      })
      wx.reLaunch({
        url: './index',
      })
    }).catch(console.error)
  }
})