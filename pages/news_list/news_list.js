const app = getApp();

Page({
  data: {
    userInfo: null,
    posts: [
      '../../images/post/vr.png',
      '../../images/post/wx.png',
      '../../images/post/iqiyi.png'
    ],
    posts_content: []
  },
  onLoad(){
    wx.showLoading({
      title: '正在加载...',
      success: res => {
        this.setData({
          userInfo: app.global.userInfo,
          posts_content: app.global.newList
        })
        wx.hideLoading()
      }
    })
  },
  gotodetail(e){
    const postid = e.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '../../pages/news_detail/news_detail?postid='+postid,
    })
  }
})