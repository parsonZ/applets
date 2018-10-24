import { local_database as local_posts_data } from '../../data/posts-data.js'

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
    this.setData({ 
      userInfo: app.global.userInfo,
      posts_content: local_posts_data
    })
  },
  gotodetail(e){
    const postid = e.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '../../pages/news_detail/news_detail?postid='+postid,
    })
  }
})