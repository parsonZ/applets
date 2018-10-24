import {
  local_database as local_posts_data
} from '../../data/posts-data.js'

Page({
  data: {
    post_content: local_posts_data,
    details: null,
    comments: local_posts_data,
    showComment: false,
    shareText: ['分享给微信好友', '分享至微博', '分享至朋友圈'],
    animationData: {}
  },
  onLoad(option) {
    const content = this.data.post_content;
    const details = content.find((value, index, arr) => {
      return value.postId == option.postid
    })

    this.setData({
      details: details
    })
  },
  onCollection() { //收藏
    const _this = this.data.details;
    const c = 'details.collected';
    if (_this.collected) {
      wx.showToast({
        title: '取消收藏成功',
        image: '../../images/icon/collection.png',
        success: res => {
          this.setData({
            [c]: 0
          })
        }
      })
    } else {
      wx.showToast({
        title: '收藏成功',
        image: '../../images/icon/collection.png',
        success: res => {
          this.setData({
            [c]: 1
          })
        }
      })
    }
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
        title: '正在加载评论...',
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
    }else{
      animation.height('0').step()
      this.setData({
        animationData: animation.export(),
        showComment: false
      })
    }
  }
})