// pages/mymap/mymap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:0,
    latitude:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  wx.getLocation({
    type: "gcj02",  //定位方式
    success:(res)=>{   //定位成功
      this.setData({longitude:res.longitude})
      this.setData({latitude:res.latitude})
    },
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