const app = getApp();

Page({
  data: {
    searchValue: '',
    moviesList: {
      now_showing: [],
      comming_soon: []
    },
    searchResult: [],
    isSearchMode: false,
    animationData: {},
    animationInput: {}
  },
  onLoad() {
    const that = this;
    wx.showLoading({
      title: app.global.tipTitle,
      success() {
        that.getNowShowing()
        that.getTopShowing()
      }
    })
  },
  onReady() {
    this.animation = wx.createAnimation();
  },
  getNowShowing() {
    const that = this;
    let c = 'moviesList.now_showing'
    let param = {
      url: app.global.api.getNowShowing,
      city: '北京',
      start: 0,
      count: 5
    }
    app.getAjax(param).then(res => {
      that.setData({
        [c]: res.subjects
      })
      wx.hideLoading()
    })
  },
  getTopShowing() {
    const that = this;
    let c = 'moviesList.comming_soon'
    let param = {
      url: app.global.api.getTopShowing,
      start: 0,
      count: 5
    }

    app.getAjax(param).then(res => {
      that.setData({
        [c]: res.subjects
      })
    })
  },
  onMoviesMore(e) {
    const moviesType = e.currentTarget.dataset.type
    // moviesType : 0-now_showing  1-comming-soon 2-筛选
    wx.navigateTo({
      url: '/pages/movies_more/movies_more?type=' + moviesType,
    })
  },
  onMovieDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/movie_detail/movie_detail?id=' + id,
      success: res => {
        this.setData({
          isSearchMode: false,
          searchResult: []
        })
      }
    })
  },
  searchMovies(e) {
    const that = this;
    let param = {
      url: app.global.api.getSearch,
      q: e.detail.value
    }
    
    wx.showLoading({
      title: '正在搜索...',
      success() {
        app.getAjax(param).then(res => {
          that.setData({
            searchResult: res.subjects,
          })
          wx.hideLoading()
        })
      }
    })
  },
  bindfocus() {
    this.animation.currentTransform = [];
    this.animation.width('320rpx').step()
    this.setData({
      isSearchMode: true,
      animationInput: this.animation.export()
    })

    this.animation.currentTransform = [];
    this.animation.translateY(0).opacity(1).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  closeSearchInput() {
    this.animation.currentTransform = [];
    this.animation.width('100rpx').step()
    this.setData({
      isSearchMode: false,
      searchValue: '',
      searchResult: [],
      animationInput: this.animation.export()
    })

    this.animation.currentTransform = [];
    this.animation.translateY('50rpx').opacity(0).step()
    this.setData({
      animationData: this.animation.export()
    })
  }
})