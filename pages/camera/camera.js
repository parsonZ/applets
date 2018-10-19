Page({
  data: {
    priviewSrc: '',
  },
  takePhoto (){
    const ctx = wx.createCameraContext(this);
    console.log(ctx)
    ctx.takePhoto({
      quality: 'high',
      success: src => {
        this.setData({
          priviewSrc: src.tempImagePath
        })
      }
    })
  }
})