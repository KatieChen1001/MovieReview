// pages/addReview/addReview.js
Page({

  data: {
    title: "",
    image: "",
    intro:""
    // title: "三傻大闹宝莱坞",
    // image: "https://movie-1257643707.cos.ap-guangzhou.myqcloud.com/p579729551.jpg",
    // intro: "本片根据印度畅销书作家奇坦·巴哈特（Chetan Bhagat）的处女作小说《五点人》（Five Point Someone）改编"
  },

  onLoad: function (options) {
    this.setData({
      title: options.title,
      image: options.image,
      intro: options.intro
    })
  },

  onTapNavigateTo: function(event){
    let dataPassed = event.currentTarget.dataset;
    console.log(dataPassed);
    wx.navigateTo({
      url: '/pages/reviewEdit/reviewEdit?title=' + dataPassed.title + "&img=" + dataPassed.image
    })
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