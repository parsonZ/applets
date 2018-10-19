Page({
  data: {
    swiperConfig: {
      urls: [
        '../../images/Koala.jpg',
        '../../images/Tulips.jpg'
      ],
      indicatorDots: false,
      indicatorColor: '#fff',
      indicatorActiveColor: 'blue',
      autoPlay: true,
      circular: true
    },
    movable: {
      x: 10,
      y: 20
    },
    icon: {
      types: ['success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'],
      size: 20,
      color: 'green'
    },
    audio: {
      poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      name: '此时此刻',
      author: '许巍',
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    },
    video: {
      src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
      danmuList: [{
        text: '第1秒出现的弹幕',
        color: 'red',
        time: 1
      }, {
          text: '第3秒出现的弹幕',
          color: 'red',
          time: 3
        }]
    }
  },
  onReady(){
    this.audioCtx = wx.createAudioContext('myAudio', this)
    this.videoCtx = wx.createVideoContext('myVideo', this)
  },
  scroll(){
    console.log('adhskj')
  },
  tap(){
    this.setData({
      movable: {
        x: 40,
        y: 40
      }
    })
  },
  getUser(detail){
    console.log(detail)
  },
  formSubmit(e){
    console.log(e.detail.value)
  }
})