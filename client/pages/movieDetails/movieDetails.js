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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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