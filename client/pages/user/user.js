// / pages/user / user.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')

Page({

  data: {
    userInfo: null,
    mine: true,
    fav: ""
  },

  // getIPosted(){
  //   this.
  // }, 

  getMyFav(){

  },

  onLoad: function (options) {
    this.checkSession({
      success: ({ userInfo }) => {
        this.setData({
          userInfo: userInfo
        })
      },
      error: ({res}) => { 
        console.log(res)
      }
    })
  },

  checkSession({ success, error }) {
    wx.checkSession({
      success: () => {
        this.doQcloudLogin({success, error})
      },
      error: (res) => {
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