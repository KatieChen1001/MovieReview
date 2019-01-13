// pages/editReview/editReview.js
const qcloud = require("../../vendor/wafer2-client-sdk/index");
const config = require("../../config.js");
const recorderManager = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext();
const app = getApp();

Page({

  data: {
    movie: {},
    review: "",
    inPreviewMode: false,
    userInfo: null,
    type: "text",
    filePath: null, // 录音暂存地址
    isSpeaking: false,
    isPlaying: false
  },

  // ======================= 发表文字影评 ======================= // 
  publishText(event) {
    let content = this.data.review;
    let type = this.data.type;
    if (content) {
      wx.showLoading({
        title: "正在发表影评"
      });
    }
    qcloud.request({
      url: config.service.addComment,
      login: true,
      method: "POST",
      data: {
        content: content,
        movie_id: this.data.movie.id,
        type: type
      },
      success: res => {
        wx.hideLoading();
        let data = res.data;
        if (!data.code) {
          wx.showToast({
            title: "发表影评成功"
          });

          setTimeout(() => {
            let movie = this.data.movie;
            // 跳转影评列表界面
            wx.redirectTo({
              url: `/pages/reviewList/reviewList?id=${movie.id}`
            });
          }, 1500);
        }
      },
      fail: res => {
        wx.hideLoading();
        console.log(res);
        wx.showToast({
          icon: "none",
          title: "发表影评失败"
        });
      }
    })
  },

  // ======================= 编辑音频影评 ====================== //

  // 按住开始录音
  touchdown() {
    this.setData({
      isSpeaking: true
    });
    const options = {
      duration: 10000, // 指定录音的时长，单位 ms
      sampleRate: 16000, // 采样率
      numberOfChannels: 1, // 录音通道数
      encodeBitRate: 96000, // 编码码率
      format: "mp3", // 音频格式，有效值 aac/mp3
      frameSize: 50 // 指定帧大小，单位 KB
    };
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {});

    setTimeout(() => {
      //结束录音
      this.stopRecording();
    }, 10000);

    //错误回调
    recorderManager.onError(res => {
      console.log(res);
    });
  },

  touchup: function() {
    this.stopRecording();
  },

  //停止录音
  stopRecording() {
    this.setData({
      isSpeaking: false
    });
    recorderManager.stop();
    recorderManager.onStop(res => {
      console.log("停止录音", res.tempFilePath);
      const {
        tempFilePath
      } = res;
      this.setData({
        filePath: tempFilePath // 存储在文件暂存地址
      });
    });
  },

  playRecording() {
    innerAudioContext.autoplay = true;
    (innerAudioContext.src = this.data.filePath),
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

  uploadRecord(cb) {
    let recordPath = this.data.filePath;
    let record;
    if (recordPath) {
      wx.showLoading({
        title: "正在上传录音"
      });
      wx.uploadFile({
        url: config.service.uploadUrl,
        filePath: recordPath,
        name: "file",
        success: res => {
          let data = JSON.parse(res.data);

          if (!data.code) {
            wx.hideLoading();
            record = data.data.imgUrl;
          }

          wx.showLoading({
            title: "正在发表影评"
          });
          cb && cb(record);
        }
      });
    } else {
      cb && cb(record);
    }
  },

  publishAudio: function() {
    let type = this.data.type;
    this.uploadRecord(record => {
      qcloud.request({
        url: config.service.addComment,
        login: true,
        method: "POST",
        data: {
          content: record,
          type: type,
          movie_id: this.data.movie.id
        },
        success: result => {
          wx.hideLoading();
          let data = result.data;
          if (!data.code) {
            wx.showToast({
              title: "发表影评成功"
            });

            setTimeout(() => {
              let movie = this.data.movie;
              wx.redirectTo({
                url: `/pages/reviewList/reviewList?id=${movie.id}`
              });
            }, 1500);
          } else {
            wx.showToast({
              icon: "none",
              title: "发表影评失败"
            });
          }
        },
        fail: res => {
          wx.hideLoading();
          console.log(res)
          wx.showToast({
            icon: "none",
            title: "发表影评失败"
          });
        }
      });
    });
  },

  enterEditMode() {
    this.setData({
      inPreviewMode: false
    });
  },

  publishReview: function() {
    let type = this.data.type;
    if (type == "text") {
      this.publishText()
    } else if (type == "audio") {
      this.publishAudio()
    }
  },

  enterPreviewMode: function(e) {
    const review = e.detail.value.review;
    if (review) {
      this.setData({
        review: review,
        inPreviewMode: true
      });
    } else {
      this.setData({
        inPreviewMode: true
      });
    }
  },

  onLoad: function(options) {
    this.setData({
      movie: {
        title: options.title,
        image: options.image,
        id: options.id
      },
      type: options.type
    });

    app.checkSession({
      success: ({
        userInfo
      }) => {
        this.setData({
          userInfo
        });
      }
    })
  },

  onHide: function() {
    this.setData({
      review: "",
      inPreviewMode: false
    });
  }
});