Page({
  data: {
    lists:[1]  //list是保存活动的库
  },
  nav_to:function(){
    wx.navigateTo({
      url:"index3?way=0",  //这是一次跳转，way参数是用来确定是从新建活动进入的还是从编辑进入的，编辑是1新建是0
    })
  },
  
  eli_nav_to:function(e){
    var that = this;
    var act_obj =JSON.stringify(that.data.lists[e.target.dataset.id]);
    wx.navigateTo({
      url:"index3?way=1&act_obj="+act_obj
    })
  },
  act_del:function(e){
    var that = this;
    const db = wx.cloud.database();
    db.collection('activities').doc(that.data.lists[e.target.dataset.id]._id).remove({});  //activities这个collection中包含了活动信息，图片id以及各种信息
    wx.reLaunch({
      url: 'index2',//同样是一次跳转，页面可能需要修改
    })
  },
  reFresh: function () {
    var that = this;
    const db = wx.cloud.database();
    db.collection('activities').get({  //需要修改
      success(res) {
        that.setData({
          lists: res.data
        });
      }
    });
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
    this.reFresh();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})