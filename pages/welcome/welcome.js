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
    }
  },
  scroll(){
    console.log('adhskj')
  }
})