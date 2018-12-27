// miniprogram/pages/equipment/index.js
const { $Message } = require('../../dist/base/index');
const app = getApp()
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
    // 动作面板选项
    actions: [{
      name: '删除',
      color: '#ed3f14'
    }],
    // 随机的颜色
    randomColor: ['red', 'blue', 'green','yellow'],
    // 待操作设备id
    todoId: '',
    // 控制变量类
    showLeftDrawer: false,
    showspin: false,
    showaction: false
  },

  onLoad: function (options) {
    this.setData({
      showspin: true
    })
    this.setData({
      currentQuerys: app.globalData.currentQuerys
    })
    // 根据当前查询条件生成展示tag标签
    this.updateQueryTags()
    // 获取列表数据
    this.getDataList()
  },
  onShow: function () {
    // 在onshow里面处理全局的查询条件
    this.setData({
      currentQuerys: app.globalData.currentQuerys
    })
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
        showspin: false,
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
      url: `./edit?id=${e.currentTarget.dataset.id}`,
    })
  },

  // 弹出确认删除页面
  openDeleteEqAction(e){
    let deletId = e.currentTarget.dataset.id
    this.setData({
      showaction: true,
      todoId: deletId
    })
  },

  // 删除页面选择取消
  handleCancel () {
    this.setData({
      showaction: false,
      todoId: ''
    })
  },

  // 点击删除选项
  handleClickItem () {
    const _this = this
    // 异步状态
    const action = [..._this.data.actions];
    action[0].loading = true;
    _this.setData({
      actions: action
    });
    // 删除当前设备
    let deletId = _this.data.todoId
    wx.cloud.callFunction({
      name: 'removeEquipement',
      data: {
        id: deletId
      },
    }).then(res => {
      console.log('删除设备成功')
      console.log(res)
      // 关闭按钮loding
      action[0].loading = false;
      // 关闭弹框并重置
      _this.setData({
        showaction: false,
        actions: action
      });
      // 全局通知
      $Message({
        content: '删除成功！',
        type: 'success'
      });
      // 重新加载列表
      _this.getDataList()
    }).catch(console.error)
  },

})