Page({
  data: {
    map: {
      center: {
        lat: 39.92,
        lng: 116.46
      },
      markers: [{
        id: 1,
        latitude: 39.92,
        longitude: 116.46,
        title: 'title',
        iconPath: '/images/Koala.jpg',
        width: 30,
        height: 30
      }],
      polyline: [{
        points: [{
          longitude: 113.3245211,
          latitude: 23.10229
        }, {
          longitude: 113.324520,
          latitude: 23.21229
        }],
        color: "red",
        width: 2,
        dottedLine: true
      }],
      controls: [{
        id: 1,
        iconPath: '/images/Koala.jpg',
        position: {
          left: 0,
          top: 300 - 50,
          width: 50,
          height: 50
        },
        clickable: true
      }]
    }
  }
})