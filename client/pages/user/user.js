// / pages/user / user.js
var qcloud = require('../../vendor/wafer2-client-sdk/index');
var config = require('../../config');
const innerAudioContext = wx.createInnerAudioContext();

Page({

  data: {
    userInfo: null,
    displayIPosted: false, 
    displayMyFav: true, // Default 展示用户收藏的评论内容
    isplaying: false,
    favList: [],
    myList: []
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
    wx.showLoading({
      title: '正在加载列表...',
    })
    qcloud.request({
      url: config.service.getList,
      login: true,
      success: result => {
        wx.hideLoading()

        let data = result.data
        console.log(data);
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
    console.log(filePath)
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
      console.log(res.errMsg);
      console.log(res.errCode);
      wx.showToast({
        icon: "none",
        title: "影评播放失败"
      });
    });
  },

  onLoad: function (options) {
    
    this.checkSession({
      success: ({ userInfo }) => {
        console.log(userInfo)
        this.setData({
          userInfo: userInfo
        })
      },
      error: ({res}) => { 
        console.log(res)
      }
    });

    this.getList();
  },

  checkSession({ success, error }) {
    wx.showLoading({
      title: '正在获取登录信息...',
    });
    wx.checkSession({
      success: () => {
        this.doQcloudLogin({success, error})
      },
      error: (res) => {
        wx.showToast({
          title: '获取登陆信息失败 :/',
        })
        console.log(res)
      }
    })
  },

  onTapLogin: function () {
    this.doQcloudLogin({
      success: ({ userInfo }) => {
        this.setData({
          userInfo: userInfo
        })
      },
      fail: ({res}) => {
        console.log(res)
      }
    })
  },

  doQcloudLogin({ success, error }) {
    // 调用 qcloud 登陆接口
    qcloud.setLoginUrl(config.service.loginUrl)
    qcloud.login({
      success: result => {
        wx.hideLoading();
        console.log(result)
        if (result) {
          let userInfo = result
          success && success({
            userInfo
          })
        } 
      },
      fail: result => {
        // error && error()
        console.log(result)
      }
    })
  }
})