const app = getApp();

Page({
  data: {
    lists: [],
    banners: [],
    limit: 20,
    index: 1
  },
  onLoad(){
    this.getBanner()
    this.getRecommand()
  },
  getBanner(){
    let param = {
      url: app.global.api.getBanner,
    }
    wx.showLoading({
      title: app.global.tipTitle,
      success: () => {
        app.getAjax(param).then(res => {
          this.setData({
            banners: res.d.banner
          })
        })
      }
    })
  },
  getRecommand(){
    let param = {
      url: app.global.api.getRecommand,
      limit: this.data.limit,
      before: new Date().toISOString()
    }
    wx.showLoading({
      title: app.global.tipTitle,
      success: () => {
        app.getAjax(param).then(res => {
          res.d.list.map(item => {
            const times = Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60); //分钟
            if (times/60/24 > 1){
              return item.createdAt = Math.ceil(times / 60 / 24) + '天前'
            } else if (times / 60>1){
              return item.createdAt = Math.ceil(times / 60) + '小时前'
            }else{
              return item.createdAt = times + '分钟前'
            }
          })
          this.setData({
            lists: res.d.list
          })
          wx.hideLoading()
          wx.stopPullDownRefresh();
        })
      }
    })
  },
  onPullDownRefresh(){
    this.setData({
      before: new Date().toISOString()
    })

    this.getRecommand()
  },
  previewImg(e){//图片预览
    const urls = e.currentTarget.dataset.urls;
    wx.previewImage({
      current: urls[0], 
      urls: urls
    })
  },
  tabSwitch(e){
    const index = e.currentTarget.dataset.index;
    this.setData({
      index: index
    })
  }
})