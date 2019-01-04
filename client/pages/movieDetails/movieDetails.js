const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config.js');


Page({

  data: {
    movieID: "",
    title: "",
    image: "",
    intro:""
  },

  getMovieDetail: function(id){
    this.setData({
      movieID: id
    })
    qcloud.request({
      url: config.service.movieDetail + id,
      success: res => {
        console.log(res.data.data);
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

  onLoad: function (options) {
    this.setData({
      movieID: options.id
    })
    this.getMovieDetail(options.id);
  }
})