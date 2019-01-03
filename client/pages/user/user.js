// / pages/user / user.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')

Page({

  data: {
    userInfo: null,
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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