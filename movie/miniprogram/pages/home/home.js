// pages/home/home.js
Page({
  data: {
  // list 电影列表 start 开始记录数 count 一页几行
  list:[],
  start:0,
  count:5,
  },
  loadMore: function () {
    wx.cloud.callFunction({
      name: "web1910page",
      data: {
        start: this.data.list.length,   //数组长度
        count: this.data.count          //5
      }
    }).then(res => {
      var rows = JSON.parse(res.result);
      //this.setData({list:rows.subjects})
      rows = this.data.list.concat(rows.subjects);
      this.setData({ list: rows });
      //5:在loadMore调用此函数
      //console.log(this.data.list)
    }).catch(err => { console.log(err) })
  },
  detail:function(e){
    var id=e.target.dataset.id;
    var url=`/pages/detail/detail?id=${id}`
    wx.navigateTo({
      url: url,
    })
  },
  onLoad: function (options) {
  this.loadMore()
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
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})