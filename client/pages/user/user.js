// / pages/user / user.js
const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config');
const innerAudioContext = wx.createInnerAudioContext();
const app = getApp();


Page({

  data: {
    userInfo: null,
    displayIPosted: false, 
    displayMyFav: true, // Default 展示用户收藏的评论内容
    isplaying: false,
    favList: [],
    myList: []
  },

  onShow: function () {
    app.checkSession({
      success: ({ userInfo }) => {
        wx.hideLoading();
        this.setData({
          userInfo
        })
      }
    })
  },

  onLoad: function (options) {
    this.getList();
  },

  getIPosted(){
    this.setData({
      displayMyFav: false,
      displayIPosted: true
    })
  },

  getMyFav(){
    this.setData({
      displayMyFav: true,
      displayIPosted: false
    })
  },

  onPullDownRefresh(){
    wx.showLoading({
      title: '刷新中...',
    })

    this.getList(()=> {
      wx.stopPullDownRefresh()
      wx.hideLoading();
      wx.showToast({
        title: '已刷新',
      })
    })
  },
  
  getList(callback){
    qcloud.request({
      url: config.service.getList,
      login: true,
      success: result => {
        let data = result.data
        if (!data.code) {
          let favComment = data.data.favComment
          console.log(favComment);
          let myComment = data.data.myComment
          console.log(myComment);
          this.setData({
            favList: favComment,
            myList: myComment
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '数据刷新失败',
          })
        }
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '数据刷新失败',
        })
      },
      complete: () => {
        typeof callback === 'function' && callback();
      }
    })
  },
  
  playRecording(event) {
    let content = event.currentTarget.dataset; 
    let filePath = content.content;
    innerAudioContext.autoplay = true;
    (innerAudioContext.src = filePath),
    innerAudioContext.onPlay(() => {
      this.setData({
        isPlaying: true
      });
    });
    innerAudioContext.onEnded(() => {
      this.setData({
        isPlaying: false
      });
    });
    innerAudioContext.onError(res => {
      wx.showToast({
        icon: "none",
        title: "影评播放失败"
      });
    });
  },

  onTapLogin: function () {
    app.doQcloudLogin({
      success: ({ userInfo }) => {
        wx.hideLoading();
        this.setData({
          userInfo: userInfo
        })
      },
      fail: ({res}) => {
        console.log(res)
      }
    })
  }
})