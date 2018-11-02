import {
  local_database
} from '/data/posts-data.js'
import {
  api
} from '/data/api.js';
import {
  defaultImg
} from '/data/defaultImg.js'

App({
  global: {
    userInfo: null,
    newList: local_database,
    api: api,
    defaultImg: defaultImg,
    tipTitle: '正在加载...',
  },
  onLaunch() {

  },
  getAjax(param) {
    let data = {};
    for (let item of Object.keys(param)) {
      if (item != 'url') data[item] = param[item]
    }
    const promise = new Promise((resolve, reject) => {
      wx.request({
        url: param.url,
        data: data,
        header: {
          'content-type': 'application/xml',
          'X-Juejin-Src': 'web' //获取评论内容特有字段
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
      if (item != 'url') data[item] = param[item]
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
  },
  setSession(key, value) {
    wx.setStorage({
      key: key,
      data: value
    })
  },
  getSession(key) {
    return wx.getStorageSync(key);
  },
  dateFormat(date) {
    //格式化日期
    const times = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000 / 60);
    let str = '';
    if (times / 60 / 24 > 1) {
      str = Math.ceil(times / 60 / 24) + '天前'
    } else if (times / 60 > 1) {
      str = Math.ceil(times / 60) + '小时前'
    } else {
      str = times + '分钟前'
    }

    return str;
  },
  //获取地址字符串中的参数
  getUrlParams(url, name) {
    let pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
    let matcher = pattern.exec(url);
    let items = null;
    if (null != matcher) {
      try {
        items = decodeURIComponent(decodeURIComponent(matcher[1]));
      } catch (e) {
        try {
          items = decodeURIComponent(matcher[1]);
        } catch (e) {
          items = matcher[1];
        }
      }
    }
    return items;  
  } 
})