const app = getApp()
Page({
  data: {
    userInfo: null,
    defaultNewsPic: '/images/post/crab.png',
    defaultNewsDsc: 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest',
    posts: [
      '../../images/post/vr.png',
      '../../images/post/wx.png',
      '../../images/post/iqiyi.png'
    ]
  },
  onLoad(){
    this.setData({ userInfo: app.global.userInfo})
    this.data.userInfo['date'] = 'Tue Oct 23'
    console.log(this.data.userInfo)
  }
})