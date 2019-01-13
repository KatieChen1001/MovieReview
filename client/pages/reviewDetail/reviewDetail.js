// pages/reviewDetail/reviewDetail.js
const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config.js');
const innerAudioContext = wx.createInnerAudioContext();

Page({

  data: {
    review: {
      commentId: "",
      movieId: ""
    }, 
    title: "",
    image: "",
    username: "",
    useravatar: "",
    content: "",
    type: "",
    saved: false
  },

  onLoad: function (options) {
    this.getReviewDetail(options.commentId);
  },

  playRecording() {
    innerAudioContext.autoplay = true;
    (innerAudioContext.src = this.data.content),
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

  // Get the content of the review
  getReviewDetail: function(id){
    qcloud.request({
      url: config.service.commentDetail + id,
      success: res => {
        let data = res.data.data
        this.setData({
          review: {
            commentId: data.id,
            movieId: data.movie_id
          },
          title: data.title,
          image: data.image,
          useravatar: data.useravatar,
          username: data.username,
          content: data.content,
          type: data.type
        })
      },
      fail: res => {
        console.log(res)
      }
    })
  },

  navToReviewEdit: function (){
    let id = this.data.review.movieId;
    wx.navigateTo({
      url: `/pages/addReview/addReview?id=${id}`,
    })
  },

  saveToFav(){

    this.setData({
      saved: true
    })
    let num = this.data.review;


    qcloud.request({
      url: config.service.addToFav,
      login: true,
      method: 'POST',
      data: this.data.review,
      success: result => {
        wx.hideLoading()

        let data = result.data
        
        if (!data.code) {
          wx.showToast({
            title: '已添加到收藏',
          });
        } else {
          wx.showToast({
            icon: 'none',
            title: '添加到收藏失败',
          })
        }
      },
      fail: res => {
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '添加到收藏失败',
        })
        console.log(res)
      }
    })
  }
})