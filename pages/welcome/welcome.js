const app = getApp();

Page({
  data: {
    userInfo: {}
  },
  onLoad() {
    wx.getUserInfo({
      success: res => {
        this.setData({
          userInfo: res.userInfo
        })
        app.global.userInfo = res.userInfo;
      }
    })
  },
  start() {
    wx.switchTab({
      url: '/pages/home/home'
    })
  }
})