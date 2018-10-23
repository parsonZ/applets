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
      }
    })
  }
})