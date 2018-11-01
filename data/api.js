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
  getFilterMovies: 'https://movie.douban.com/j/new_search_subjects',
  //以下API来自掘金:
  //page, pageSize
  getBanner: 'https://banner-storage-ms.juejin.im/v1/web/page/aanner?position=topic-banner&platform=web&page=0&pageSize=20&src=web',
  //列表 param: limit,before
  getRecommand: 'https://short-msg-ms.juejin.im/v1/pinList/recommend?src=web',
  //获取评论 param: pageNum=1, pageSize=7 拼接objectId 5bda5230092dcb7eb99bf918
  getComment: 'https://hot-topic-comment-wrapper-ms.juejin.im/v1/comments/'
}

export {
  api
}