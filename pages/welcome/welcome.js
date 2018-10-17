Page({
  data: {
    swiperConfig: {
      urls: [
        '../../images/Koala.jpg',
        '../../images/Tulips.jpg'
      ],
      indicatorDots: true,
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