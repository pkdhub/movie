// pages/login/login.js
//1
const store=require("../../utils/store.js")
Page({
  data: {
     //3 取出数据
     userId:store.getItem("userId")
  },
  esix:function(){
    this.setData({
      userId: ''
    })
  },
  getUserInfo3:function(e){
    console.log(e)
    var user=e.detail.userInfo
    //console.log(user)
    wx.cloud.callFunction({
      name:"wxlogin",
      data:{user}
    }).then(res=>{
      // console.log(res)
      //2 存数据
      store.setItem("userId",res.result.userId)
      //3.跟新
      this.setData({
        userId:res.result.userId
      })
    })
  },
  onLoad: function (options) {

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