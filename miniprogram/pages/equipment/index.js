// miniprogram/pages/equipment/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 设备列表
    equipmentList: [],
    // 当前展示的查询条件(tag展示)
    currentQuerysTag: [],
    // 当前选择的查询条件
    currentQuerys: {
      type: ['iphone', 'android', 'ble']
    },
    // 当前设备类型列表
    equipmentType: [
      {
        index: 1,
        value: 'iphone',},
      {
        index: 2,
        value: 'android',},
      {
        index: 3,
        value: 'ble',}
    ],
    // 随机的颜色
    randomColor: ['red', 'blue', 'green','yellow'],
    // 控制变量类
    showLeftDrawer: false,
  },

  onLoad: function (options) {
    // 根据当前查询条件生成展示tag标签
    this.updateQueryTags()
    // 获取列表数据
    this.getDataList()
  },

  // 获取列表数据
  getDataList () {
    const _this = this
    console.log('获取数据')
    wx.cloud.callFunction({
      name: 'getEquipmentList',
      data: {
        queryList: _this.data.currentQuerys
      },
    }).then(res => {
      console.log(res.result)
      _this.setData({
        equipmentList: res.result.data.data
      })
    }).catch(console.error)
  },

  // 点击展开左侧抽屉面板
  toggleDrawer() {
    // 如果当前抽屉是打开的,则更新筛选条件并重新获取列表数据
    if (this.data.showLeftDrawer) {
      this.updateQueryTags()
      this.getDataList()
    }
    this.setData({
      showLeftDrawer: !this.data.showLeftDrawer
    })
  },

  // 点击选择设备类型
  queryTypeChange({ detail = {} }) {
    const index = this.data.currentQuerys.type.indexOf(detail.value);
    index === -1 ? this.data.currentQuerys.type.push(detail.value) : this.data.currentQuerys.type.splice(index, 1);
    this.setData({
      currentQuerys: this.data.currentQuerys
    })
  },

  // 更新筛选tags(tags的更新只跟currentQuerys有关)
  updateQueryTags () {
    let tagarray = []
    let randomcolor = 'default'
    for (let key in this.data.currentQuerys) {
      this.data.currentQuerys[key].map(item => {
        let randomIndex = parseInt(Math.random() * this.data.randomColor.length, 10)
        randomcolor = this.data.randomColor[randomIndex]
        tagarray.push({ color: randomcolor, value: item })
      })
    }
    this.setData({
      currentQuerysTag: tagarray
    })
  },
  
  // 跳转到添加页面
  toaddEqui () {
    wx.navigateTo({
      url: './add',
    })
  },

  // 跳转到编辑页面
  editor (e) {
    wx.navigateTo({
      url: `./add?${e.currentTarget.dataset.id}`,
    })
  }
})