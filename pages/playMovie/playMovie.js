const app = getApp();

Page({
  data: {
    movieDetails: {},
    url: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
  },
  onLoad(option){
    this.getMoiveDetails(option.id)
  },
  getMoiveDetails(id){
    let param = {
      url: app.global.api.getDetails + id
    }

    wx.showLoading({
      title: app.global.tipTitle,
      success: () => {
        app.getAjax(param).then(res => {
          console.log(res)
          this.setData({
            movieDetails: res
          })
          wx.hideLoading()
        })
      }
    })
  }
})