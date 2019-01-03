// pages/reviewList/reviewList.js

const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config.js');
const innerAudioContext = wx.createInnerAudioContext();
Page({
  data: {
    movieId: "",
    commentList: []
  },

  getReviewList: function(id){
    qcloud.request({
      url: config.service.comment + id,
      success: res => {
        let data = res.data.data
        console.log(data);
        this.setData({
          commentList: data
        })
      },
      fail: res => {
        console.log(res)
      }
    })
  },

  /**
 * 如果影评是录音，点击播放录音
 */
  playRecording(e) {
    let src = e.currentTarget.dataset.src
    console.log(src);
    innerAudioContext.autoplay = true
    innerAudioContext.src = src
    innerAudioContext.play()
  },

  onLoad: function (options) {
    console.log(options);
    this.getReviewList(options.id);
    console.log(options.id);
    this.setData({
      movieId: options.id
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