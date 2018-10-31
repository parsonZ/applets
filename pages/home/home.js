const app = getApp();

Page({
  data: {
    lists: [],
    banners: [],
    limit: 5,
    index: 1,
    before: '',
    session: null
  },
  onLoad() {
    this.getBanner()
    this.getRecommand()
  },
  getBanner() {
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
  getRecommand(type) {
    let param = {
      url: app.global.api.getRecommand,
      limit: this.data.limit,
      before: this.data.before
    }
    let session = this.data.session;
    
    wx.showLoading({
      title: app.global.tipTitle,
      mask: true,
      success: () => {
        app.getAjax(param).then(res => {
          this.saveStorage(res.d.list)
          res.d.list.map(item => {
            const times = Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60); //分钟
            let str = '';
            if (times / 60 / 24 > 1) {
              str = Math.ceil(times / 60 / 24) + '天前'
            } else if (times / 60 > 1) {
              str = Math.ceil(times / 60) + '小时前'
            } else {
              str = times + '分钟前'
            }
            item['createdAt1'] = str;
            item.likedCount = this.data.session[item.objectId].like
            item.isLiked = this.data.session[item.objectId].isLiked
            this.data.lists.push(item)
            return item;
          })
          this.setData({
            lists: type == 'onPullDownRefresh' ? res.d.list : this.data.lists
          })
          wx.hideLoading()
          wx.stopPullDownRefresh();
        })
      }
    })
  },
  //settion 存储
  saveStorage(data) {
    const res = app.getSession('objectIds')
    if (res) {
      data.map(item => {
        if (!res[item.objectId]) {
          res[item.objectId] = {
            comments: [],
            like: item.likedCount,
            isLiked: false
          }
        }
      })
      app.setSession('objectIds', res)
      this.setData({
        session: res
      })
    } else {
      const obj = {}
      data.map(item => {
        obj[item.objectId] = {
          comments: [],
          like: item.likedCount,
          isLiked: false
        }
      })
      app.setSession('objectIds', obj)
      this.setData({
        session: obj
      })
    }
  },
  onPullDownRefresh() {
    this.setData({
      before: new Date().toISOString(),
      limit: this.data.lists.length
    })

    this.getRecommand('onPullDownRefresh')
  },
  onReachBottom() {
    const date = this.data.lists[this.data.lists.length - 1].createdAt;
    this.setData({
      before: date,
    })

    this.getRecommand('onReachBottom')
  },
  //图片预览
  previewImg(e) {
    const urls = e.currentTarget.dataset.urls;
    wx.previewImage({
      current: urls[0],
      urls: urls
    })
  },
  tabSwitch(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      index: index
    })
  },
  like(e) {
    const objid = e.currentTarget.dataset.objid;
    const session = this.data.session;

    session[objid].like += session[objid].isLiked ? -1 : 1;
    session[objid].isLiked = !session[objid].isLiked
    app.setSession('objectIds', session)

    this.data.lists.map((item, index) => {
      if (item.objectId == objid) {
        let s = 'lists[' + index + '].likedCount',
          c = 'lists[' + index + '].isLiked';
        this.setData({
          [s]: item.isLiked ? item.likedCount - 1 : item.likedCount + 1,
          [c]: !item.isLiked
        })
      }
    })
  }
})