import {
  local_database as local_posts_data
} from '../../data/posts-data.js'
const app = getApp();
Page({
  data: {
    post_content: local_posts_data,
    details: null,
    comments: local_posts_data,
    showComment: false,
    shareText: ['分享给微信好友', '分享至微博', '分享至朋友圈'],
    animationData: {},
    is_music_play: false
  },
  onLoad(option) {
    const content = this.data.post_content;
    const details = content.find((value, index, arr) => {
      return value.postId == option.postid
    })

    wx.showLoading({
      title: app.global.tipTitle,
      success: res => {
        this.setData({
          details: details
        })
        wx.hideLoading()
      }
    })

    wx.onBackgroundAudioPlay(()=>{
      this.setData({
        is_music_play: true
      })
    })

    wx.onBackgroundAudioPause(() => {
      this.setData({
        is_music_play: false
      })
    })
  },
  onCollection() { //收藏
    const _this = this.data.details;
    const c = 'details.collected';
    wx.showToast({
      title: _this.collected ? '取消收藏' : '收藏成功',
      image: '../../images/icon/collection.png',
      success: res => {
        this.setData({
          [c]: _this.collected ? 0 : 1
        })
      }
    })
  },
  onShare() { //分享
    const _this_sharetext = this.data.shareText;
    const _this = this.data.details;
    const that = this;
    const c = 'details.shared';
    if (_this.shared) {
      wx.showToast({
        title: '已分享',
        image: '../../images/icon/share.png'
      })
    } else {
      wx.showActionSheet({
        itemList: _this_sharetext,
        success(res) {
          wx.showToast({
            title: '已' + _this_sharetext[res.tapIndex],
            icon: 'success'
          })
          that.setData({
            [c]: 1
          })
        },
        fail(res) {
          wx.showToast({
            title: '取消',
            icon: 'none'
          })
        }
      })
    }
  },
  onViewComments() { //查看评论
    const _this = this.data;
    const animation = wx.createAnimation()
    if (!_this.showComment) {
      wx.showLoading({
        title: app.global.tipTitle,
        mask: true
      })

      animation.height('100%').step()

      setTimeout(() => {
        wx.hideLoading({
          success: res => {
            this.setData({
              animationData: animation.export(),
              showComment: true
            })
          }
        })
      }, 2000)
    } else {
      animation.height('0').step()
      this.setData({
        animationData: animation.export(),
        showComment: false
      })
    }
  },
  onMusicControl(){
    const details = this.data.details;
    if (this.data.is_music_play){
      wx.pauseBackgroundAudio({
        complete: ()=>{
          this.setData({
            is_music_play: false
          })
        }
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl: details.music.url,
        title: details.music.title,
        coverImgUrl: details.music.coverImg,
        success: () => {
          this.setData({
            is_music_play: true
          })
        }
      })
    }
  }
})