const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config.js');

Page({
  data: {
    movieList: []
  },

  getMovieList: function () {
    wx.showLoading({
      title: '加载列表中...',
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
    wx.navigateTo({
      url: '/pages/movieDetails/movieDetails?id=' + dataPassed.id
    })
  },
})