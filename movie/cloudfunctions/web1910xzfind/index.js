// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
var rp=require("request-promise")  //第三方模块
// 云函数入口函数
exports.main = async (event, context) => {
  var url ="http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=20"
 try{ return rp(url)
 .then(res=>{return res})
 .catch(err=>{return err})
}
catch(e){
  console.log(e)
}
}