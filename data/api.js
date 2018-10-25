const api = {
  //正在热映 param: city, start, count
  getNowShowing: 'https://douban.uieee.com/v2/movie/in_theaters',
  //top 250 param: start, count
  getTopShowing: 'https://douban.uieee.com/v2/movie/top250',
  //电影搜索 param: q
  getSearch: 'https://douban.uieee.com/v2/movie/search',
  //电影详情 param: 拼接id
  getDetails: 'https://douban.uieee.com/v2/movie/subject/'
}

export {
  api
}