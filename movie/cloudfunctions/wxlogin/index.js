// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db=cloud.database()
  var result=await db.collection("user").where({openid:wxContext.OPENID})
  .limit(1).get()
  if(result.data.length==0){
     var params={
       ...event.user,
       openid:wxContext.OPENID
     }
     console.log(params)
     const userData=await db.collection("user").add({
       data:params
     })
    const result = await db.collection("user").where({
      openid:wxContext.OPENID
    }).limit(1).get()
    return {userId:result.data[0]._id}
  }else{
    return { userId: result.data[0]._id }    
  }



  

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   result:result
  // }
}