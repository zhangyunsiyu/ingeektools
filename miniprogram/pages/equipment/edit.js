// miniprogram/pages/equipment/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eq_name: '',
    eq_user: '',
    eq_type: '',
    eq_date: '',
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
   // 查询当前id的数据
   
  },

  // 绑定名称
  updatename(e) {
    this.setData({
      eq_name: e.value
    })
  },

  // 绑定用户名
  updateuser(e) {
    this.setData({
      eq_user: e.value
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
  addEq() {
    let list = {
      eq_name: this.data.eq_name,
      eq_user: this.data.eq_user,
      eq_type: this.data.eq_type,
      eq_date: this.data.eq_date,
    }
    const _this = this
    console.log('新增数据')
    wx.cloud.callFunction({
      name: 'editEquipment',
      data: {
        data: list
      },
    }).then(res => {
      console.log(res.result)
      wx.navigateTo({
        url: './index',
      })
    }).catch(console.error)
  }
})