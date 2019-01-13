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
  
  getList(){
    qcloud.request({
      url: config.service.getList,
      login: true,
      success: result => {
        let data = result.data
        if (!data.code) {
          let favComment = data.data.favComment
          let myComment = data.data.myComment

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