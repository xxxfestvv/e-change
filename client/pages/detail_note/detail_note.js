var app = getApp()
var that

Page({
  /**
   * 页面的初始数据
   */
  data: {

    DataSource: [
      {
        isF: true,
        content: '作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介作品简介',
      }
    ]
  },



  //展开  收起
  change: function (e) {
    var that = this;
    var DataSource = that.data.DataSource;
    var row = DataSource[e.currentTarget.dataset.index];
    console.log("**********:" + row)
    row.isF = !row.isF;
    that.setData({
      DataSource: DataSource,
    })
  },

  gotohome: function() {
    wx.reLaunch({
      url: '../home/home'
    })
  },

  addtocar: function () {
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 1500,
      mask: false
    })
  }

})