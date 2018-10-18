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
    }
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