const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config.js');

Page({
  data: {
    movieList: []
  },

  getMovieList: function () {
    wx.showLoading({
      title: 'Loading...',
    })

    qcloud.request({
      url: config.service.movieList,
      success: (response) => {
        wx.hideLoading()

        let data = response.data

        if (!data.code) {
          this.setData({
            movieList: data.data
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: 'Loading Failed :/',
          })
        }
      },
      fail: function (err) {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: 'Loading Failed :/'
        })
        console.log(err);
      }
    })
  },

  onLoad: function (options) {
    this.getMovieList();
  },

  onTapViewDetail: function(event){
    let dataPassed = event.currentTarget.dataset;
    console.log(dataPassed);
    // wx.navigateTo({
    //   url: '/pages/movieDetails/movieDetails?title=' + dataPassed.title + "&img=" + dataPassed.image + "&intro=" + dataPassed.intro
    // })
    wx.navigateTo({
      url: '/pages/movieDetails/movieDetails?id=' + dataPassed.id
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