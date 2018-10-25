const app = getApp();

Page({
  data: {
    movies: []
  },
  onLoad(option) {
    if (option.type == '1'){
      this.getTopShowing()
    }else{
      this.getNowShowing()
    }
  },
  getNowShowing() {
    const that = this;
    const promise = new Promise((resolve, reject) => {
      wx.request({
        url: app.global.api.getNowShowing,
        data: {
          city: '北京',
          start: 0,
          count: 15
        },
        header: {
          'content-type': 'application/xml'
        },
        success(res) {
          resolve(res.data)
        }
      })
    })

    wx.showLoading({
      title: '正在加载...',
      success() {
        promise.then(res => {
          that.setData({
            movies: res.subjects
          })
        }).catch(err => console.log(err))
        wx.hideLoading()
      }
    })
  },
  getTopShowing() {
    const that = this;
    const promise = new Promise((resolve, reject) => {
      wx.request({
        url: app.global.api.getTopShowing,
        data: {
          start: 0,
          count: 15
        },
        header: {
          'content-type': 'application/xml'
        },
        success(res) {
          resolve(res.data)
        }
      })
    })

    wx.showLoading({
      title: '正在加载...',
      success() {
        promise.then(res => {
          that.setData({
            movies: res.subjects
          })
          console.log(that.data.moviesList)
        }).catch(err => console.log(err))
        wx.hideLoading()
      }
    })
  },
  onMovieDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/movie_detail/movie_detail?id=' + id,
    })
  }
})