const api = {
  //正在热映 param: city, start, count
  getNowShowing: 'https://douban.uieee.com/v2/movie/in_theaters',
  //top 250 param: start, count
  getTopShowing: 'https://douban.uieee.com/v2/movie/top250',
  //电影搜索 param: q, tag, start, count
  getSearch: 'https://douban.uieee.com/v2/movie/search',
  //电影详情 param: 拼接id
  getDetails: 'https://douban.uieee.com/v2/movie/subject/',
  //获取电影tag
  getTags: 'https://movie.douban.com/j/search_tags?type=movie',
  //筛选电影 param: tags
  getFilterMovies: 'https://movie.douban.com/j/new_search_subjects'
}

export {
  api
}