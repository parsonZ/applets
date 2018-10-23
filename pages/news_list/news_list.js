const app = getApp()
Page({
  data: {
    userInfo: null,
    defaultNewsPic: '/images/post/crab.png',
    defaultNewsDsc: '君不见，黄河之水天上来⑵，奔流到海不复回。 君不见，高堂明镜悲白发，朝如青丝暮成雪⑶。 人生得意须尽欢⑷，莫使金樽空对月。 天生我材必有用，千金散尽还复来。 烹羊宰牛且为乐，会须一饮三百杯⑸。 岑夫子，丹丘生⑹，将进酒，杯莫停⑺。 与君歌一曲⑻，请君为我倾耳听⑼。 钟鼓馔玉不足贵⑽，但愿长醉不复醒⑾。 古来圣贤皆寂寞，惟有饮者留其名。 陈王昔时宴平乐，斗酒十千恣欢谑⑿。 主人何为言少钱⒀，径须沽取对君酌⒁。 五花马⒂，千金裘，呼儿将出换美酒，与尔同销万古愁⒃。',
    posts: [
      '../../images/post/vr.png',
      '../../images/post/wx.png',
      '../../images/post/iqiyi.png'
    ]
  },
  onLoad(){
    this.setData({ userInfo: app.global.userInfo})
    this.data.userInfo['date'] = 'Tue Oct 23'
  }
})