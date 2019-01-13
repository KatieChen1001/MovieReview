const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config.js');

Page({
  data: {
    movieList: []
  },

  getMovieList(callback) {
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
            title: 'Loading Failed :/'
          })
        }
      },
      fail: function (err) {
        wx.showToast({
          title: 'Loading Failed :/'
        })
        console.log(err);
      },
      complete: () => {
        wx.hideLoading()
        typeof callback === 'function' && callback();
      }
    })
  },

  onLoad: function (options) {
    this.getMovieList();
  },

  onPullDownRefresh(){
    wx.showLoading({
      title: '刷新中...',
    })

    this.getMovieList(() => {
      wx.stopPullDownRefresh()
      wx.hideLoading();
      wx.showToast({
        title: '已刷新',
      })
    })
  },

  onTapViewDetail: function(event){
    let dataPassed = event.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/movieDetails/movieDetails?id=' + dataPassed.id
    })
  },
})