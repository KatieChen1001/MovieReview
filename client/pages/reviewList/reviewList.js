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
        console.log("commentList: ")
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

  // 点击播放录音
  playRecording(e) {
    let src = e.currentTarget.dataset.src
    console.log(src);
    innerAudioContext.autoplay = true
    innerAudioContext.src = src
    innerAudioContext.play()
  },

  viewReviewDetail(event){
    let dataPassed = event.currentTarget.dataset;
    console.log(dataPassed);
    let commentId = dataPassed.reviewid; 
    console.log(commentId);
    let movieId = this.data.movieId;
    wx.navigateTo({
      url: `/pages/reviewDetail/reviewDetail?movieId=${movieId}&commentId=${commentId}`,
    })
  },

  onLoad: function (options) {
    console.log(options);
    this.getReviewList(options.id);
    console.log(options.id);
    this.setData({
      movieId: options.id
    })
  }
})