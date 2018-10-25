import { local_database } from '/data/posts-data.js'
import { api } from '/data/api.js';

App({
  global: {
    userInfo: null,
    newList: local_database,
    api: api
  },
  onLaunch(){
    
  }
})