const app = getApp();

Page({
  data: {
    movieDetails: {}
  },
  onLoad(option) {
    const that = this;
    wx.showLoading({
      title: '正在加载...',
      success() {
        that.getMovieDetails(option.id)
        wx.hideLoading()
      }
    })
  },
  getMovieDetails(id) {
    const that = this
    const promise = new Promise((resolve, reject) => {
        wx.request({
          url: app.global.api.getDetails + id,
          header: {
            'content-type': 'application/xml'
          },
          success(res) {
            resolve(res.data)
          }
        })
      })
      .then(res => {
        console.log(res)
        that.setData({
          movieDetails: res
        })
      }).catch(err => console.log(err))
  }
})