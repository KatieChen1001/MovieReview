// pages/home/home.js

const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config.js');

Page({
  data: {
    posterMovie:{}
  },

  getAMovie() {
    let movieId = Math.floor(Math.random() * (15 - 1) + 1)
    wx.showLoading({
      title: 'Loading',
    })

    qcloud.request({
      url: config.service.movieDetail + movieId,
      success: res => {
        wx.hideLoading()

        let data = res.data
        console.log(data)
        if (!data.code) {
          // this.getMovieComment(movieId)
          this.setData({
            posterMovie: data.data
            // movieId
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '加载失败',
            image: '../../image/error.svg'
          })

          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/hot_movie/hot_movie',
            })
          }, 2000)
        }
      },
      fail: res => {
        wx.hideLoading()

        console.log(res)

        wx.showToast({
          icon: 'none',
          title: 'Loading Failed'
        })
      }
    })
  },

  onTapNavigateTo: function(){
      wx.navigateTo({
        url: '/pages/movieList/movieList'
      })
  },

  onTapNavigateToMine: function () {
    wx.navigateTo({
      url: '/pages/user/user'
    })
  },

  onLoad: function () {
    this.getAMovie();
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