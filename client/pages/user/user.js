const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config.js');

let userInfo;
Page({
  data: {
      userInfo: null
  },

  onLoad: function (options) {
    this.checkSession({
      success: ({userInfo}) => {
        this.setData({
          userInfo: userInfo
        })
      },
      error: () => {

      }
    })
  },

  checkSession({ success, error }) {
    wx.checkSession({
      success: () => {
        this.getUserInfo({ success, error })
      },
      fail: () => {
        error && error()
      }
    })
  },

  onTapLogin: function () {
    this.doQcloudLogin({
      success: ({ userInfo }) => {
        this.setData({
          userInfo: userInfo
        })
      }
    })
  },

  doQcloudLogin({ success, error }) {
    qcloud.login({
      success: result => {
        console.log(result);
        if (result) {
          let userInfo = result
          success && success({
            userInfo
          })
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          this.getUserInfo({ success, error })
        }
      },
      fail: () => {
        error && error()
      }
    })
  },

  getUserInfo({ success, error }) {
    if (!userInfo){
      qcloud.request({
        url: config.service.requestUrl,
        login: true,
        success: result => {
          console.log(result);
          let data = result.data

          if (!data.code) {
            let userInfo = data.data
            console.log(userInfo);
            success && success({
              userInfo
            })
          } else {
            error && error()
          }
        },
        fail: () => {
          error && error()
        }
      })
    } else {
      this.setData({
        userInfo:userInfo
      })
    }
    
  },


  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})