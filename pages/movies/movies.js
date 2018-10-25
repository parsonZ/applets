const app = getApp();

Page({
  data: {
    searchValue:'',
    moviesList: {
      now_showing: [],
      comming_soon: []
    }
  },
  onLoad(){
    const that = this;
    wx.showLoading({
      title: '正在加载...',
      success(){
        that.getNowShowing()
        that.getTopShowing()
        wx.hideLoading()
      }
    })
  },
  getNowShowing(){
    const that = this;
    let c = 'moviesList.now_showing'
    const promise = new Promise((resolve, reject) => {
      wx.request({
        url: app.global.api.getNowShowing,
        data: {
          city: '北京',
          start: 0,
          count: 5
        },
        header: {
          'content-type': 'application/xml'
        },
        success(res) {
          resolve(res.data)
        }
      })
    }).then(res => {
      that.setData({
        [c]: res.subjects
      })
    }).catch(err => console.log(err))
  },
  getTopShowing() {
    const that = this;
    let c = 'moviesList.comming_soon'
    const promise = new Promise((resolve, reject) => {
      wx.request({
        url: app.global.api.getTopShowing,
        data: {
          start: 0,
          count: 5
        },
        header: {
          'content-type': 'application/xml'
        },
        success(res) {
          resolve(res.data)
        }
      })
    })
    .then(res => {
      that.setData({
        [c]: res.subjects
      })
    }).catch(err => console.log(err))
  },
  onMoviesMore(e){
    const moviesType = e.currentTarget.dataset.type
    // moviesType : 0-now_showing  1-comming-soon
    wx.navigateTo({
      url: '/pages/movies_more/movies_more?type=' + moviesType,
    })
  },
  onMovieDetail(e){
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/movie_detail/movie_detail?id=' + id,
    })
  }
})