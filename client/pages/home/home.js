// pages/home/home.js

const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config.js');
let allMovies = [];

Page({
  data: {
    movieList:[]
  },

  getMovieList: function(){
    wx.showLoading({
      title: 'Loading...',
    })

    qcloud.request({
      url: config.service.movieList,
      success: (response) => {
        wx.hideLoading()

        let data = response.data

        allMovies = data.data
        
        if(!data.code){
          this.setData({
            movieList: data.data
          })
          allMovies = data.data
        } else {
          wx.showToast({
            icon: 'none',
            title: '商品数据加载错误',
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

  onTapNavigateTo: function(){
    console.log(allMovies)
    wx.navigateTo({
      // 为避免在电影列表页面再次请求电影列表消耗更长时间 选择将主页请求获取的电影数据直接传给电影列表页
      // 在不同页面之间传递array的方法：JSON.stringify()
      url: '/pages/movieList/movieList?dataset=' + JSON.stringify(this.data.movieList),
    })
  },

  onLoad: function () {
    this.getMovieList();
  },

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