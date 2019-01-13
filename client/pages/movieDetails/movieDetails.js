const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config.js');


Page({

  data: {
    movieID: "",
    title: "",
    image: "",
    intro:"",
    addingReview: false
  },

  getMovieDetail: function(id){
    this.setData({
      movieID: id
    })
    qcloud.request({
      url: config.service.movieDetail + id,
      success: res => {
        let data = res.data.data;
        this.setData({
          title: data.title,
          image: data.image,
          intro: data.description
        })
      },
      fail: res => {
        console.log(res)
      }
    })
  },

  addReview: function(){
    this.setData({
      addingReview: true
    })
  },

  cancelAddingReview: function(){
    this.setData({
      addingReview: false
    })
  },

  editTextReview: function(){
    
    let title = this.data.title;
    let image = this.data.image;
    let movieID = this.data.movieID;
    wx.redirectTo({
      url: `/pages/reviewEdit/reviewEdit?title=${title}&image=${image}&id=${movieID}&type=text`,
    })

    this.cancelAddingReview();
  },

  editAudioReview: function(){
    let title = this.data.title;
    let image = this.data.image;
    let movieID = this.data.movieID;
    wx.redirectTo({
      url: `/pages/reviewEdit/reviewEdit?title=${title}&image=${image}&id=${movieID}&type=audio`,
    })
    this.cancelAddingReview();
  },

  onLoad: function (options) {
    this.setData({
      movieID: options.id
    })
    this.getMovieDetail(options.id);
  }
})