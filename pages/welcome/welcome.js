const app = getApp();

Page({
  data: {
    userInfo: null
  },
  onLoad(){
    wx.getUserInfo({
      success: res => {
        this.setData({
          userInfo: res.userInfo
        })
        app.global.userInfo = res.userInfo;
      }
    })
  }
})