const app = getApp();

Page({
  data: {
    lists: [],
    banners: [],
    limit: 5,
    index: 1,
    before: '',
    session: null,
    defaultImg: app.global.defaultImg.base64
  },
  onLoad() {
    this.getBanner()
    this.getRecommand()
  },
  onShow() {
    //获取一遍session
    const session = app.getSession('objectIds');
    this.data.lists.map((item, index) => {
      if (this.currentObjid == item.objectId){
        let s = 'lists[' + index + '].likedCount',
            c = 'lists[' + index + '].isLiked',
            v = 'lists[' + index +'].showComments';
        this.setData({
          [s]: session[item.objectId].like,
          [c]: session[item.objectId].isLiked,
          [v]: false
        })
      }
    })
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
            //格式化日期
            item['createdAt1'] = app.dateFormat(item.createdAt);
            
            item.pictures.map(item1 => {
              app.getUrlParams('w', item1)
            })
            
            //辅助评论功能
            item['showComments'] = false
            item['comments'] = []
            item['count'] = 0

            //获取session合并至列表
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
  },
  command(e){
    const objid = e.currentTarget.dataset.objid;
    const session = this.data.session;

    let param = {
      url: app.global.api.getComment + objid,
      pageNum: 1,
      pageSize: 5
    }

    wx.showLoading({
      title: app.global.tipTitle,
      mask: true,
      success: () => {
        app.getAjax(param)
        .then(res => {
          
          res.d.comments.map(item => {
            item.createdAt = app.dateFormat(item.createdAt)
            if (item.topComment && item.topComment.length) {
              item.topComment.map(item1 => {
                item1.createdAt = app.dateFormat(item1.createdAt)
                return item1
              })
            }
            return item;
          })

          this.data.lists.map((item, index) => {

            if (item.objectId == objid) {
              let s = 'lists[' + index + '].showComments'
              let c = 'lists[' + index + '].comments'
              let v = 'lists[' + index + '].count'
              this.setData({
                [s]: !item.showComments,
                [c]: res.d.comments,
                [v]: res.d.count
              })
            }

            return item;
          })
          wx.hideLoading()
        })
      }
    })
  },
  ondetails(e){
    const objid = e.currentTarget.dataset.objid;
    this.currentObjid = objid;
    wx.navigateTo({
      url: '/pages/home_detail/home_detail?objid=' + objid, 
      success: () => {
        this.data.lists.map(item => {
          if(item.objectId == objid) {
            app.global['home_detail'] = item
          }
        })
      }
    })
  }
})