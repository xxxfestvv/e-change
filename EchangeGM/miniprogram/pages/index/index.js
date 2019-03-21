const app = getApp()
Page({
   data: {
     lists:[],//lists是书库,来源于collection:"unrec_books"
     statues:-1,//考虑作为一个状态值传到前台程序改变订单状态
  },
  reFresh: function() {
    var that = this;
    const db = wx.cloud.database();
    db.collection('unrec_books').get({ //unrec_book是指那些被扫码还未被管理员收到的书
       success(res) {
         that.setData({
           lists:res.data   //即将unrecord的书装载到lists中
         });
       }
    });
  },
  
  unrecp:function(e){
    var that = this;
    let un_obj=that.data.lists[e.target.dataset.id];
    const db=wx.cloud.database()
    db.collection('unrec_books').doc(un_obj._id).remove({   //用了collection"unrec_books"
      success: function(){
      wx.showToast({
      title:'更新订单状态',
      icon:'success',
      duration:1000,
    })
      },
      fail: function(){
      wx.showToast({
      title:'网络异常',
      icon:'none',
      duration:1000,
    })
      }
    });
    that.reFresh();
  },
  
  recped:function(e){
    var that = this;
    const db=wx.cloud.database();
    var book_obj = that.data.lists[e.target.dataset.id]
    db.collection('users').where({        //users就是储存用户信息的collection
      user_openid:book_obj.user_openid
    }).get({
      success:res=>{
        var points= res.data[0].points + book_obj.point;
        const db=wx.cloud.database();
        db.collection('users').doc(res.data[0]._id).update({   //用到了users这个集合，在unrec_books集合中添加上书人的openid后可在此处通过其openid获得他的真实id————res.data[0].id从而更新他的积分（point）
          data: {
            points:points
          },
          success: console.log,
          fail: console.error
        })
          },
    })
    db.collection('unrec_books').doc(book_obj._id).remove({  //用到了unrec_books这个集合
      success: function(){
      wx.showToast({
      title:'已将客户积分更新',
      icon:'success',
      duration:1000,
    })
      },
      fail: function(){
      wx.showToast({
      title:'网络异常',
      icon:'none',
      duration:1000,
    })
      }
    });
    that.reFresh();
},


  onLoad: function (options) {
    this.reFresh()
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
    this.reFresh()
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },


  onReachBottom: function () {
  },


  onShareAppMessage: function () {

  }
})