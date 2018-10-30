const app = getApp();

Page({
  data: {
    movies: [],
    start: 0,
    count: 15,
    typeMovie: '',
    isMore: true,
    tagsArr: [],
    tags: [],
    isFilter: false,
    animationTag: {},

  },
  onLoad(option) {
    this.setData({
      typeMovie: option.type
    })
    if (option.type == 2) { //tag movie
      this.setData({
        isFilter: true
      })
      this.getTags()
    }
    this.getMoviesList()
  },
  onReady() {
    this.animation = wx.createAnimation();
  },
  getMoviesList() {
    if (this.data.isMore) {
      if (this.data.typeMovie == 1) {
        this.getTopShowing()
      } else if (this.data.typeMovie == 0) {
        this.getNowShowing()
      } else {
        this.getAllMovies()
      }
    }
  },
  getNowShowing() {
    const that = this;
    let param = {
      url: app.global.api.getNowShowing,
      city: '北京',
      start: that.data.start,
      count: that.data.count
    }
    wx.showLoading({
      title: app.global.tipTitle,
      success() {
        app.getAjax(param).then(res => {
          let arr = that.data.movies
          arr.push(...res.subjects)
          that.setData({
            movies: arr
          })
          if (res.subjects.length < that.data.count) {
            that.setData({
              isMore: false
            })
          }
          wx.hideLoading()
        })

      }
    })
  },
  getTopShowing() {
    const that = this;
    let param = {
      url: app.global.api.getTopShowing,
      start: that.data.start,
      count: that.data.count
    }
    wx.showLoading({
      title: app.global.tipTitle,
      success() {
        app.getAjax(param).then(res => {
          let arr = that.data.movies
          arr.push(...res.subjects)
          that.setData({
            movies: arr
          })
          if (res.subjects.length < that.data.count) {
            that.setData({
              isMore: false
            })
          }
          wx.hideLoading()
        })
      }
    })
  },
  getAllMovies(e) {
    if (e) {
      let tagId = e.currentTarget.dataset.id, arr = [];
      this.data.tagsArr.map((item) => {
        if (item.id == tagId) item.selected = !item.selected
        if (item.selected) arr.push(item.name)
        return item;
      })
      this.setData({
        tagsArr: this.data.tagsArr,
        tags: arr,
        start: 0,
        movies: [],
        isMore: true
      })
    }

    let param = {
      url: app.global.api.getFilterMovies,
      tags: this.data.tags.join(','),
      range: '0,10',
      start: this.data.start
    };
    wx.showLoading({
      title: app.global.tipTitle,
      success: () => {
        app.getAjax(param).then(res => {
          let arr = this.data.movies
          arr.push(...res.data)
          this.setData({
            movies: !this.isScroll ? res.data : arr
          })

          if (res.data.length < 20) {
            this.setData({
              isMore: false
            })
          }
        })
        wx.hideLoading()
      }
    })
  },
  getTags() {
    let param = {
      url: app.global.api.getTags
    }
    app.getAjax(param).then(res => {
      let arr = [];
      for (let [index, item] of res.tags.entries()) {
        arr.push({
          name: item,
          id: index,
          selected: false
        })
      }
      this.animation.translateY(0).step()
      this.setData({
        tagsArr: arr,
        animationTag: this.animation.export()
      })
    })
  },
  onMovieDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/movie_detail/movie_detail?id=' + id,
    })
  },
  onReachBottom() {
    this.setData({
      start: this.data.start + this.data.count
    })
    this.isScroll = true
    this.getMoviesList()
  }
})