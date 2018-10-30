import {
  local_database
} from '/data/posts-data.js'
import {
  api
} from '/data/api.js';

App({
  global: {
    userInfo: null,
    newList: local_database,
    api: api,
    tipTitle: '正在加载...'
  },
  onLaunch() {

  },
  getAjax(param) {
    let data = {};
    for (let item of Object.keys(param)) {
      if(item != 'url') data[item] = param[item]
    }
    const promise = new Promise((resolve, reject) => {
      wx.request({
        url: param.url,
        data: data,
        header: {
          'content-type': 'application/xml',
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject('ajax错误')
        }
      })
    })
    promise.catch(err => {
      console.log(err)
    })
    return promise
  },
  getMovies(param) {
    let data = {};
    for (let item of Object.keys(param)) {
      if(item != 'url') data[item] = param[item]
    }
    const promise = new Promise((resolve, reject) => {
      wx.request({
        url: param.url,
        data: data,
        header: {
          'content-type': 'application/xml'
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject('ajax错误')
        }
      })
    })
    promise.catch(err => {
      console.log(err)
    })
    return promise
  }
})