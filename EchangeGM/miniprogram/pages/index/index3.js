Page({

  data: {
    name:'',
    time:'',
    place:'',
    info:'',
    temp_path:'../../images/act_pic.png',   //这是上传图片的那张图片的路径
    cloud_path:'',
    act_obj:{},
    way:2,
  },

  upload_pic: function(){
    var that = this;
   wx.chooseImage({
     count:1,
  success: chooseResult => {
    that.setData({
      temp_path: chooseResult.tempFilePaths[0]
    });
    wx.cloud.uploadFile({
      cloudPath: 'act_images/' + that.data.temp_path.substring(that.data.temp_path.length - 15), //这是在将选中的图片以独一无二的名称储存到库的文件夹act_images文件夹中
      filePath: that.data.temp_path,
      success: res => {
        that.setData({
          cloud_path: res.fileID   //返回fileID
        });
      }
    })
  },
});
    
  },

  names: function(e){
    this.setData({
      name:e.detail.value,
    })
  },
  times: function(e){
    this.setData({
      time:e.detail.value,
    })
  },
  places: function(e){
    this.setData({
      place:e.detail.value,
    })
  },
  infos: function(e){
    this.setData({
      info:e.detail.value,
    });
    
  },
  save:function(){
    if(this.data.way==1){
    var that=this;
    var path=that.data.cloud_path;
    const db=wx.cloud.database();
    db.collection('activities').doc(that.data.act_obj._id).update({  //用到了activities集合
      data:{
        act_info: that.data.info,
        name: that.data.name,
        place: that.data.place,
        time: that.data.time,
        img_id: path,
      },
    })
    }else{
      var that = this;
      const db=wx.cloud.database();
      var path = that.data.cloud_path;
      db.collection('activities').add({  //用到了activities集合
        data: {
          act_info: that.data.info,
          name: that.data.name,
          img_id: path,
          place: that.data.place,
          time: that.data.time,
          num:0,
        }
      })
    };
    wx.navigateBack({
      delta:1
    })
  },        

  onLoad: function (options) {
    this.setData({
      way:options.way,
    })
    if (options.way==1){
    var act_obj = JSON.parse(options.act_obj);  //将按编辑前进入的页面的传参转成对象
    this.setData({
      act_obj:act_obj,
      name:act_obj.name,
      place:act_obj.place,
      time:act_obj.time,
      info:act_obj.act_info,
    });
    wx.cloud.getTempFileURL({
      fileList:[act_obj.img_id],
      success: res => {
        this.setData({
      temp_path:res.fileList[0].tempFileURL
      
    }) 
  },
})
    }else{

    }
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },


  onPullDownRefresh: function () {

  },


  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})