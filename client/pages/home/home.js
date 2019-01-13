// pages/home/home.js

const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config.js');
const innerAudioContext = wx.createInnerAudioContext();

Page({
  data: {
    posterMovie:{},
    movieId: "", 
    hasReview: true,
    randomReview:{}
  },

  getAMovie() {
    let movieId = Math.floor(Math.random() * (15 - 1) + 1);
    this.setData({
      movieId: movieId
    })
    wx.showLoading({
      title: 'Loading',
    })

    qcloud.request({
      url: config.service.movieDetail + movieId,
      success: res => {
        wx.hideLoading()
        let data = res.data
        if (!data.code) {
          this.setData({
            posterMovie: data.data
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
        wx.showToast({
          icon: 'none',
          title: 'Loading Failed'
        })
      }
    })
  },

  getReview: function (id) {
    let reviewId = this.data.movieId;
    qcloud.request({
      url: config.service.comment + reviewId,
      success: res => {
        let data = res.data.data
        if (data.length == 0) {
          this.setData({
            hasReview: false
          })
        } else {
          let randomReviewnum = Math.floor(Math.random() * (data.length - 1));
          this.setData({
            randomReview: data[randomReviewnum]
          })
        }
      },
      fail: res => {
        console.log(res)
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


  toReviewDetail: function(event){
    let dataPassed = event.currentTarget.dataset;
    let commentId = dataPassed.commentid;
    wx.navigateTo({
      url: '/pages/reviewDetail/reviewDetail?commentId=' + commentId,
    })
  },

  toMovieDetail: function(){
    let movieId = this.data.movieId;
    wx.navigateTo({
      url: '/pages/movieDetails/movieDetails?id=' + movieId,
    })
  },

  onLoad: function () {
    this.getAMovie();
    this.getReview();
  }
})