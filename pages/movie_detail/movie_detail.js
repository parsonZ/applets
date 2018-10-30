const app = getApp();

Page({
  data: {
    movieDetails: {}
  },
  onLoad(option) {
    const that = this;
    wx.showLoading({
      title: app.global.tipTitle,
      success() {
        that.getMovieDetails(option.id)
      }
    })
  },
  getMovieDetails(id) {
    const that = this
    let param = {
      url: app.global.api.getDetails + id
    }
    app.getAjax(param).then(res => {
      that.setData({
        movieDetails: res
      })
      wx.hideLoading()
    })
  },
  playMovies(){
    wx.navigateTo({
      url: '/pages/playMovie/playMovie?id=' + this.data.movieDetails.id,
    })
  }
})