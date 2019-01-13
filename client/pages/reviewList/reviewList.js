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
        this.setData({
          commentList: data
        })
      },
      fail: res => {
        console.log(res)
      }
    })
  },

  // 点击播放录音
  playRecording(event) {
    let content = event.currentTarget.dataset;
    let filePath = content.src;
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
      console.log(res.errMsg);
      console.log(res.errCode);
      wx.showToast({
        icon: "none",
        title: "影评播放失败"
      });
    });
  },

  viewReviewDetail(event){
    let dataPassed = event.currentTarget.dataset;
    let commentId = dataPassed.reviewid; 
    let movieId = this.data.movieId;
    wx.navigateTo({
      url: `/pages/reviewDetail/reviewDetail?movieId=${movieId}&commentId=${commentId}`,
    })
  },

  onLoad: function (options) {
    this.getReviewList(options.id);
    this.setData({
      movieId: options.id
    })
  }
})