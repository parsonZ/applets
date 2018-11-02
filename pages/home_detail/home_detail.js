const app = getApp();

Page({
  data: {
    item: {},
    notShowMore: true,
    defaultImg: app.global.defaultImg.base64,
    pageSize: 10,
    pageNum: 1,
    isMore: true
  },
  onLoad(option) {
    this.setData({
      item: app.global.home_detail,
      ['item.comments']: [],//先清空下评论列表
    })
    this.getCommentsList()
  },
  getCommentsList (){
    let param = {
      url: app.global.api.getComment + this.data.item.objectId,
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
    }
    if(this.data.isMore){
      wx.showLoading({
        title: app.global.tipTitle,
        mask: true,
        success: () => {
          app.getAjax(param)
            .then(res => {
              res.d.comments.map(item => {
                item.createdAt = app.dateFormat(item.createdAt)
                this.data.item.comments.push(item)
                if (item.topComment && item.topComment.length) {
                  item.topComment.map(item1 => {
                    item1.createdAt = app.dateFormat(item1.createdAt)
                    return item1
                  })
                }
                return item;
              })

              this.setData({
                ['item.comments']: this.data.item.comments,
                pageNum: this.data.pageNum + 1
              })

              if (res.d.comments.length < this.data.pageSize) { //评论加载完毕
                this.setData({
                  isMore: false
                })
              }
              wx.hideLoading()
            })
        }
      })
    }
  },
  onReachBottom() {
    this.getCommentsList()
  },
  like(e) {
    //更新session
    const objid = e.currentTarget.dataset.objid;
    const session = app.getSession('objectIds')

    session[objid].like += session[objid].isLiked ? -1 : 1;
    session[objid].isLiked = !session[objid].isLiked
    app.setSession('objectIds', session)

    let s = 'item.likedCount',
        c = 'item.isLiked';
    this.setData({
      [s]: this.data.item.isLiked ? this.data.item.likedCount - 1 : this.data.item.likedCount + 1,
      [c]: !this.data.item.isLiked
    })
  },
  previewImg(e) {
    const urls = e.currentTarget.dataset.urls;
    wx.previewImage({
      current: urls[0],
      urls: urls
    })
  }
})