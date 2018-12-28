import { chineseToPinYin } from '../../assets/js/chineseToPinyin.js'
const app = getApp()
Page({
  data: {
    userList: [],
    fromPath: ''
  },
  onChange(event) {
    console.log(event.detail, 'click right menu callback data')
  },
  click(e) {
    // 选中的用户名抛到全局
    switch (this.data.fromPath) {
      case 'index':
        app.globalData.currentQuerys.user[0] = e.currentTarget.dataset.name
        break;
      case 'edit':
        app.globalData.userindex = e.currentTarget.dataset.name
        break
      case 'add':
        app.globalData.userindex = e.currentTarget.dataset.name
        break
      default:
    }
    wx.navigateBack({})
  },
  onLoad (option) {
    this.setData({
      fromPath: option.fromPath
    })
  },
  onReady() {
    const _this = this
    console.log('获取用户列表')
    wx.cloud.callFunction({
      name: 'getUserList',
    }).then(res => {
      console.log(res.result.data.data)
      _this.init(res.result.data.data)
    }).catch(console.error)
  },
  // 初始化
  init (userList) {
    let storeUser = new Array(26);
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    words.forEach((item, index) => {
      storeUser[index] = {
        key: item,
        list: []
      }
    })
    userList.forEach((item) => {
      item.pinyin = chineseToPinYin(item.name)
      let firstName = item.pinyin.substring(0, 1).toUpperCase();
      let index = words.indexOf(firstName);
      storeUser[index].list.push({
        name: item.name,
        id: item._id,
        key: firstName
      });
    })
    this.data.userList = storeUser;
    this.setData({
      userList: this.data.userList
    })
  }
});