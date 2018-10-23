Page({
  getUserInfo(e){
    if (e.detail.userInfo) {
      wx.redirectTo({
        url: '/pages/welcome/welcome'
      })
    }
  },
  onLoad(){
    const promise = new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          resolve(res.authSetting)
        },
        fail(err) {
          reject(err)
        }
      })
    })

    promise.then(res => {
      if (res['scope.userInfo']) {
        wx.redirectTo({
          url: '/pages/welcome/welcome'
        })
      }
    }).catch(err => console.log(err))
  }
})