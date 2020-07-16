// pages/detail/detail.js
//创建云数据库对象:连接云数据库
const db = wx.cloud.database();
Page({
  data: {
    val2:"",    //用户输入留言
    val3: 4,     //用户评分
    id: 0,       //电影id
    info: [],    //接收电影详细信息
    image: [],    //保存预览图片地址[临时图片路径] 
    fileIDS:[]    //保存在云存储中文件地址
  },
  submit: function () {
    // 1.上传图片至云存储
    //2,。将评论 留言，图片地址添加到云数据库中
    wx.showLoading({  //加载提示框
      title:"评论发表中"
    });
    var rows=[]//保存promise对象
    if(this.data.image.length==0){
      wx.showToast({
        title:"请选择图片...",
      })
      return 
    }
    for (var i = 0; i < this.data.image.length; i++)    {
      //6:为每张创建 Promise对象完成上传一张
      rows.push(new Promise((resolve, reject) => {
        //6.1 获取当前图片名称
        var item = this.data.image[i];
        //6.2 获取后缀（折分/搜索/正则表达式）
        //123.jpg .jpg=>exec()=>[.png]
        var suffix = /\.\w+$/.exec(item)[0]
        //6.3 创建新文件名 时间+随机数
        var newFile = new Date().getTime();
        newFile += Math.floor(Math.random() * 9999);
        newFile += suffix;
        //6.4 上传一张图片
        wx.cloud.uploadFile({
          cloudPath: newFile, //新文件名
          filePath: item,     //原文件名 
          success: (res => {
            //6.5 在data属性添加数组 fileIds文件id
            //6.6 上传成功将fileID保存
            var fid = res.fileID;
            this.data.fileIDS.push(fid);
            //6.7 上传成功后执行 解析
            resolve();
          })
        })

      }));//push end 
    }//for end 
    Promise.all(rows).then(res=>{
      // console.log(7)
      var v3 = this.data.val3
      var v2=this.data.val2
      // console.log(v2)
      if(!v2){v2="这家伙很懒"}
      var fids=this.data.fileIDS
      console.log(v3+'_'+v2+"_"+fids);
      db.collection("web1910movie")
      .add({
        data:{
        content:v2,
        acore:v3,
        fids:fids,
        }
      }).then(res=>{
        wx.hideLoading()  //隐藏加载框
        wx.showToast({
          title: '评论发表成功',
        })
        this.setData({val2:""})
        this.setData({image:[]})
      })
    })
  },
  upload: function () {
    //功能:选中图片并且实现预览效果
    //1:在data添加属性image:预览图片
    //2:选中一张图片
    wx.chooseImage({
      count: 9,                               //选中图片数量
      sizeType: ["original", "compressed"],    //选中图片类型
      sourceType: ["album", "camera"],        //图片来源  
      success: (res) => {
        // console.log(res)
//      console.log(res.tempFilePaths);
        //临时图片路径
        this.setData({ image: res.tempFilePaths })
      },
    })
    //3:预览图片
  },
  onLoad: function (options) {
    //获取电影id
    var id = options.id;
    this.setData({ id: id })
    this.loadMore();
  },
  loadMore: function () {
    //功能:先获取电影id调用云函数web1910detail
    var id = this.data.id;
    //console.log("1:"+id)
    //1:调用云函数web1910detail
    wx.cloud.callFunction({
      name: "web1910detail",
      data: { id: id }
    }).then(res => {
      //console.log(res.result);
      //将字符串转换js对象
      var obj = JSON.parse(res.result);
      this.setData({ info: obj });
    })
      .catch(err => {
        console.log(err)
      })
    //2:传参数id
    //3:获取云函数返回结果
    //4:在data添加属性info 保存返回结果
    //5:在onload调用此函数
  },
  onChangeVal3: function (event) {
    //功能:修改用户评分
    this.setData({ val3: event.detail })
  },
  onChangeVal2: function (event) {
    //功能:用户输入内容
//  console.log("1" + event.detail);
    this.setData({ val2: event.detail })
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