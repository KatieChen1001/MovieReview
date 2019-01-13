const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config.js');
const app = getApp();


Page({

  data: {
    userInfo: null,
    movieID: "",
    title: "",
    image: "",
    intro:"",
    addingReview: false,
    haveIReviewed: false,
    myList: [],
    myReviewForThisMovie: []
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
    if (this.data.haveIReviewed){
      console.log("i have reviewed it")
      let myComment = JSON.stringify(this.data.myReviewForThisMovie);
      wx.navigateTo({
        url: `/pages/reviewList/reviewList?display=${'mine'}&myComment=${myComment}`,
      })
    } else {
      this.setData({
        addingReview: true
      })
    }
    
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


  getList() {
    qcloud.request({
      url: config.service.getList,
      login: true,
      success: result => {
        let data = result.data;
        if (!data.code) {
          let myComment = data.data.myComment;
          let myreviewforthismovie = [];
          this.setData({
            myList: myComment
          });
          for (var i = 0; i < myComment.length; i++){
            if (myComment[i].movie_id == this.data.movieID){
              myreviewforthismovie.push(myComment[i]);
              this.setData({
                haveIReviewed: true
              })
            }
          }
          this.setData({
            myReviewForThisMovie: myreviewforthismovie
          })
          console.log(this.data.myReviewForThisMovie);
        } 
      },
      fail: () => { },
      complete: () => { },
    })
  },

  onLoad: function (options) {
    this.setData({
      movieID: options.id
    });
    this.getMovieDetail(options.id);
    this.getList();
  }
})