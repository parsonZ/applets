Page({
  data: {
    swiperConfig: {
      urls: [
        '../../images/Desert.jpg',
        '../../images/Koala.jpg',
        '../../images/Tulips.jpg'
      ],
      indicatorDots: true,
      indicatorColor: 'red',
      indicatorActiveColor: 'blue',
      autoPlay: true,
      circular: true
    }
  },
  scroll(){
    console.log('adhskj')
  }
})